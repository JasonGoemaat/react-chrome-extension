import React from 'react';
import './Popup.css';

const chrome = window.chrome;

const openIndex = () => {
    chrome.tabs.create({ url: chrome.extension.getURL('first.html') })
}

export default () => {
    return (
        <div class="popup">
            <h1>Popup!</h1>
            <p><button className="link-button" onClick={openIndex}>Open first.html</button></p>
            <p><a href="https://www.google.com">Link with href</a></p>
        </div>
    )
}
