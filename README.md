## Purpose

This template lets you create a chrome extension using react.  It shares the same codebase
for:

1. Testing using `yarn start` or creating a web page using `index.html`
2. Creating other pages for the extension such as popups or the new tab page
3. The extension background scripts

## Running

The normal react `yarn start` works to load `index.html` and the default `App.js`.

To create the extension, run `yarn build`, which runs 'react-scripts build' then 'yarn post'.
The extension will be in the 'build' directory.  You can load it in chrome by
going to [`chrome://extensions`](chrome://extensions).  Click on the 'Developer mode'
toggle in the top-right of the window and you'll see a new row of buttons at the top.
Click on 'Load unpacked' and navigate to the 'build' directory.  The extension should
then load.

If you make changes and want to see them in your extension you have to:

1. Run `yarn build` again - this will rebuild and increment the manifest version number
2. Go to [`chrome://extensions`](chrome://extensions) and use the refresh button, or
remove and re-add the extension.

## How it works

The `index.js` file that bootstraps react needs to detect where it is running.
The existing script shows how to do that and logs different things to the console
depending on where it is running:

```js
const chrome = window.chrome;
if (chrome && chrome.runtime && chrome.runtime.id) {
  console.log('running in chrome extension with id:', chrome.runtime.id);
  if (chrome.extension.getBackgroundPage() === window) {
    console.log('running in background page');
  } else {
    console.log('not running in background page');
  }
} else {
    console.log('not running as a chrome extension');
}
```

## Creating a page

To create a page accessible in the extension manifest such as popup (already created here), you need to create
the html.  This file will not be processed by webpack so the links in index.html file that use `%PUBLIC_URL%` will not
work, though the `post` script will copy the styles and scripts to it from `index.html`.  Here is `popoup.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React Extension Popup</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="popup"></div>
  </body>
</html>
```

Notice I changed the 'id' of the div from 'root' to 'popup'.  This lets me bootstrap different
component(s) in `index.js` based on what id(s) are found, so add the criteria and render for the
other page there:

```js
if (document.getElementById('root')) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
} else if (document.getElementById('popup')) {
  ReactDOM.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    document.getElementById('popup')
  );
}
```

You'll need to modify the 'post' script in package.json to include your new page as an argument too.  This
will tell it to copy the scripts from index.html to that new page:

```json
"post": "node scripts/post.js popup"
```

## Docs

* [Creating](doc/Creating.md)
* [Location](doc/Location.md)
* [Usage](doc/Usage.md)
