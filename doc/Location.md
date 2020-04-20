# Example

```js
console.log('Running INDEX.JS');
const chrome = window.chrome;
if (chrome && chrome.runtime && chrome.runtime.id) {
  console.log('running in chrome extension with id:', chrome.runtime.id);
  if (chrome.extension.getBackgroundPage() === window) {
    console.log('running in background page');
  } else {
    console.log('not running in background page');
  }
  console.log('location.protocol:', location.protocol); // 'chrome-extension:'
  console.log('location.host (extension id):', location.host); // same as extension id
  console.log('location.origin:', location.origin); // 'chrome-extension:{id}'
  console.log('location.pathname', location.pathname); // '/_generated_background_page.html
}
```