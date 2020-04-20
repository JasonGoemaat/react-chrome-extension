## create-react-app & yarn

I created the project running `yarn create react-app`.  I use yarn because hey, it's great.
It's also installed locally and used in the scripts in `package.json`.

## make runtime script inline

React normally creates an inline script, but extensions don't like that due to their
content security policy.  I could not figure out how to get it to work using hashes
and the `content_security_policy` in the manifest.  Luckily you can set an environment
variable to tell the create-react scripts to make it a separate js file.  So
I created `.env` in the project root with this:

    INLINE_RUNTIME_CHUNK=false

## replace `manifest.json`

React creates a `manifest.json` that is a web app manifest used to change how an installed
application works on a device, but that is the file that chrome uses for its extension.
We *need* to use it for the chrome extension, but we can change the location of the *app* manifest.

So I renamed `public/manifest.json` to `public/app-manifest.json` and changed
this line in `public/index.html`:

```html
<link rel="manifest" href="%PUBLIC_URL%/app-manifest.json" />
```

Then I created a chrome extension manifest as `public/manifest.json`.

## scripts/post.js

The chrome manifest can let you specify certain pages for things like the chrome new tab
or the extension popup.  However it must be an html file you specify, urls that you could
route to or hashes don't work for these cases.  Also for background scripts, you need
to specify the js files.  I could not figure out how to get the react scripts to process
other html files or modify the manifest.json.  Also I wanted to up the manifest version
easily on each build so reloading during development after making changes.

To do this I created `scripts/post.js` which should be run after a build.  It will copy the
`<link rel="stylesheet">` elements in the head of `index.html` and the `<script></script>`
elements in the body of `index.html` to any other html files you specify when running it.
I added a `post` script in `package.json` so you can run it with `yarn post`, and an
`all` script that will run build then post.