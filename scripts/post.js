/**
 * Here I do two things:
 * 
 * 1) Increment the version in manifest.json in the public and build directories (so chrome sees a new version)
 * 2) For any args, copy the script elements from index.html to the end of the body
 */

const fs = require('fs');

// increment version number in manifests (public and build)
let json = fs.readFileSync('./public/manifest.json', { encoding: 'utf8' });
const manifest = JSON.parse(json);
const versionParts = manifest.version.split('.');
versionParts[2] = Number(versionParts[2]) + 1;
manifest.version = versionParts.join('.');
json = JSON.stringify(manifest, null, 2);
fs.writeFileSync('./public/manifest.json', json, { encoding: 'utf8' });
fs.writeFileSync('./build/manifest.json', json, { encoding: 'utf8' });

// get scripts and stylesheets from `index.html` since they've been
// processed by webpack
const parts = (() => {
    const rxScripts = /(<script src="\/static\/js\/[^"]*"><\/script>)/gm
    const rxStylesheets = /<link href="\/static\/css\/[^"]*" rel="stylesheet">/gm
    
    const html = fs.readFileSync('./build/index.html', { encoding: 'utf8' });
    const scripts = html.match(rxScripts).join();
    const stylesheets = html.match(rxStylesheets).join();
    return { scripts, stylesheets };
})();

process.argv.slice(2).forEach(arg => {
    const inpath = `./public/${arg}.html`;
    const outpath = `./build/${arg}.html`;
    if (fs.existsSync(inpath)) {
        let s = fs.readFileSync(inpath, { encoding: 'utf8' });

        let pos = s.indexOf('</head>');
        s = s.substring(0, pos) + parts.stylesheets + s.substring(pos);

        pos = s.indexOf('</body>');
        s = s.substring(0, pos) + parts.scripts + s.substring(pos);

        fs.writeFileSync(outpath, s, { encoding: 'utf8' });
        console.log('Copied scripts and stylesheets to:', outpath);
    } else {
        console.log(`ERROR: '${path}' NOT FOUND`);
    }
});
