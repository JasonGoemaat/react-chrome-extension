### How?

Following: https://medium.com/@gilfink/building-a-chrome-extension-using-react-c5bfe45aaf36


### CSP

The CSP doesn't seem to work using a hash for the inline script, so trying this: https://medium.com/@nrshahri/csp-cra-324dd83fe5ff

It says you can set environment variable 'INLINE_RUNTIME_CHUNK' to false...

Cool!  Adding a file called `.env` to the root directory with this content seems to work:

    INLINE_RUNTIME_CHUNK=false

