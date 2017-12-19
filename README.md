# Adverting


//-------------------------------------------
//---------------USAGE
//-------------------------------------------

1.First way - on link
https://evgenbabenko.github.io/works/ad/build/index.html


2.Second way - in developer tools (F12) -> tab Console -> copy/paste that code

var tag = document.createElement('script');
tag.src = 'https://evgenbabenko.github.io/works/ad/build/js/init.js';
document.body.appendChild(tag);


3.The third way - in developer tools (F12) -> tab Console -> copy/paste that code

function init() {
  'use strict';

  if (document.readyState === 'complete') {
    ready();
  } else {
    document.addEventListener("DOMContentLoaded", ready);
  }

  function ready() {
    let iframe = document.createElement('iframe');

    iframe.style.width = '970px';
    iframe.style.height = '250px';
    iframe.style.border = 'none';
    iframe.src = 'https://evgenbabenko.github.io/works/ad/build/index.html';
    iframe.style.display = 'block';
    iframe.style.position = 'absolute';
    iframe.style.top = '20px';
    iframe.style.left = '50px';

    document.body.appendChild(iframe);
  }
}
init();