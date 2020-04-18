/**
 * Here I do two things:
 * 
 * 1) Increment the version in manifest.json in the public and build directories (so chrome sees a new version)
 * 2) For any args, copy the script elements from index.html to the end of the body
 */

const fs = require('fs');

// increment version number
let json = fs.readFileSync('./public/manifest.json', { encoding: 'utf8' });
const manifest = JSON.parse(json);
const versionParts = manifest.version.split('.');
versionParts[2] = Number(versionParts[2]) + 1;
manifest.version = versionParts.join('.');
json = JSON.stringify(manifest, null, 2);
fs.writeFileSync('./public/manifest.json', json, { encoding: 'utf8' });
fs.writeFileSync('./build/manifest.json', json, { encoding: 'utf8' });

// copy index.html to other files in build directory
let scripts = null;
const getScripts = () => {
    if (scripts === null) {
        const html = fs.readFileSync('./build/index.html', { encoding: 'utf8' });
        let pos = html.indexOf('<body>'); // ignore scripts in <head>
        pos = html.indexOf('<script src=', pos + 6);
        let pos2 = html.lastIndexOf('</script>');
        scripts = html.substring(pos, pos2 + 9);
    }
    return scripts;
}

let rxScripts = /(<script src="\/static[^"]*"><\/script>)/gm
let rxStylesheets = /<link href="\/static[^"]*" rel="stylesheet">/gm

process.argv.slice(2).forEach(arg => {
    const inpath = `./public/${arg}.html`;
    const outpath = `./build/${arg}.html`;
    if (fs.existsSync(inpath)) {
        let s = fs.readFileSync(inpath, { encoding: 'utf8' });
        const pos = s.indexOf('</body>');
        s = s.substring(0, pos) + getScripts() + s.substring(pos);
        fs.writeFileSync(outpath, s, { encoding: 'utf8' });
        console.log('Copied scripts to:', outpath);
    } else {
        console.log(`ERROR: '${path}' NOT FOUND`);
    }
});
