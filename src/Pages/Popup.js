import React from 'react';

const chrome = window.chrome;

const openIndex = () => {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html') })
}

export default () => {
    return (
        <div>
            <h1>Popup!</h1>
            <p><a onClick={openIndex}>Open index.html</a></p>
            <p><a href="https://www.google.com">Link with href</a></p>
        </div>
    )
}
