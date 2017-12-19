// jshint esversion: 6

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