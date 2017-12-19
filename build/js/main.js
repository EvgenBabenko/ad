// jshint esversion: 6


//onclick new blank
var followTo = document.querySelector('.followTo');
followTo.onclick = function() {
  window.open();
};


//close Ad and remove node from DOM
function closeAd() {
  var main = document.querySelector('.main');
  main.remove();
}


//Slider control
function onSlider() {
  var range1 = document.getElementById('range-1');

  // number of frame is 58, but slider range setup from 0 to 100
  var numberOfFrame = 58;
  var step = range1.max / numberOfFrame;
  var positionSlider = parseInt(range1.value, 10);

  var positionSprite = Math.round(positionSlider / step);

  var sprite = document.querySelector('.phone-sprite');
  sprite.style.backgroundPositionY = positionSprite * -221 + 'px';

  animationSelector(positionSlider);
}


//-------------------------------------------
//---------------Animation selector
//-------------------------------------------


//Change states from selector
function animationSelector(value) {
  console.log(value);

  var text = document.querySelector('.text');
  var internals = document.querySelector('.internals');
  var highlights = document.querySelector('.highlights');
  var yt_player = document.querySelector('#yt-player');

  if (value === 0) {
    yt_player.style.opacity = '1';
    yt_player.style.pointerEvents = 'all';
    internals.style.opacity = '0';
    internals.style.transition = '0s';
    highlights.style.opacity = '1';
    stopRain();

    //YTPlayer state
    //see more on 
    //https://developers.google.com/youtube/iframe_api_reference?hl=ru#Playback_status
    if (player.getPlayerState() === 2) {
      player.playVideo();
    }

  } else if (value >= 49 && value < 51) {
    internals.style.opacity = '0';
    internals.style.transition = '0s';
    yt_player.style.opacity = '0';
    yt_player.style.pointerEvents = 'none';
    highlights.style.opacity = '0';
    flashLight();
    stopRain();

  } else if (value >= 4 && value < 37) {
    internals.style.opacity = '0';
    internals.style.transition = '0s';
    yt_player.style.opacity = '0';
    yt_player.style.pointerEvents = 'none';
    text.style.backgroundImage = 'url(img/text_2.png)';
    highlights.style.opacity = '0';
    startRain();

  } else if (value >= 37 && value < 78) {
    internals.style.opacity = '0';
    internals.style.transition = '0s';
    yt_player.style.opacity = '0';
    yt_player.style.pointerEvents = 'none';
    text.style.backgroundImage = 'url(img/text_3.png)';
    highlights.style.opacity = '0';
    stopRain();

  } else if (value >= 78 && value < 100) {
    yt_player.style.opacity = '0';
    yt_player.style.pointerEvents = 'none';
    text.style.backgroundImage = 'url(img/text_4.png)';
    internals.style.opacity = '0';
    internals.style.transition = '0s';
    highlights.style.opacity = '0';
    stopRain();

  } else if (value === 100) {
    yt_player.style.opacity = '0';
    yt_player.style.pointerEvents = 'none';
    internals.style.opacity = '1';
    internals.style.transition = '1s';
    highlights.style.opacity = '0';
    stopRain();
    setTimeout(function() {
      highlightInternals();
    }, 1000);

  } else {
    internals.style.opacity = '0';
    internals.style.transition = '0s';
    highlights.style.opacity = '0';
    text.style.backgroundImage = 'url(img/text_1.png)';
    yt_player.style.opacity = '0';
    yt_player.style.pointerEvents = 'none';
    player.pauseVideo();
    stopRain();
  }

}


//-------------------------------------------
//---------------FLASH
//-------------------------------------------


//Create flash light
var flashStatus = false;

function flashLight() {

  if (!flashStatus) {
    flashStatus = true;
    newFlash();
  } else {
    return;
  }

  function newFlash() {
    var flash = document.querySelector('.flash');
    flash.style.opacity = '1';
    flash.style.transform = 'scale(0.5, 0.5)';
    var intialScale = 0.5;

    var flashLightID = setInterval(flashAnimation, 8);

    function flashAnimation() {
      if (intialScale >= 2.5) {
        flash.style.opacity = '0';
        flashStatus = false;
        clearInterval(flashLightID);
      } else {
        intialScale += 0.1;
        flash.style.transform = 'scale(' + intialScale + ',' + intialScale + ')';
      }
    }
  }
}


//-------------------------------------------
//---------------Highlight
//-------------------------------------------

//Create highlight internals
function highlightInternals() {
  var cardHighlight = document.querySelector('.card-highlight');
  var left = -150;

  var highlightInternalsID = setInterval(newHighlightInternals, 0);

  function newHighlightInternals() {
    if (left === 45) {
      clearInterval(highlightInternalsID);
    } else {
      left += 5;
      cardHighlight.style.left = left + 'px';
    }
  }
}



//-------------------------------------------
//---------------RAIN
//-------------------------------------------


var raining = false;
var createDropID;
var slipDownID;
var stopRainID;
var tag = document.querySelector('.rain');

function stopRain() {
  if (raining) {
    clearInterval(createDropID);
    clearTimeout(stopRainID);
    clearInterval(slipDownID);
    tag.style.opacity = '0';
    while (tag.firstChild) {
      tag.removeChild(tag.firstChild);
    }
    console.log('stop rain');
    raining = false;

  } else {
    return;
  }
}

function startRain() {
  if (!raining) {
    // debugger
    raining = true;
    tag.style.opacity = '1';
    console.log('start rain');

    createDropID = setInterval(createDrop, 300);

    stopRainID = setTimeout(stopRain, 10000);
  } else {
    return;
  }
}

function createDrop() {
  // debugger
  var rainDrop = document.createElement('div');

  var dropClass = random(1, 4);

  var newClass = 'raindrop_' + dropClass;
  rainDrop.className = newClass;
  document.querySelector('.rain').appendChild(rainDrop);

  var duration = random(10, 60);
  var translateX = random(0, 470);
  var translateY = random(0, 200);
  var skewX = 0;
  var skewY = 0;
  var scaleX = random(0.8, 1.2) + 5;
  var scaleY = scaleX;
  var opacity = 0;
  rainDrop.style.transform = 'matrix(' + scaleX + ',' + skewY + ',' + skewX + ',' + scaleY + ',' + translateX + ',' + translateY + ')';
  rainDrop.style.opacity = opacity;
  console.log(rainDrop.style.transform);


  dropDownID = setInterval(dropDown, 0);

  function dropDown() {
    if (scaleX <= 1) {
      clearInterval(dropDownID);
    } else {
      console.log('scaleX', scaleX);
      scaleX -= 0.5;
      scaleY = scaleX;
      opacity += 0.1;
      rainDrop.style.opacity = opacity;
      rainDrop.style.transform = 'matrix(' + scaleX + ',' + skewY + ',' + skewX + ',' + scaleY + ',' + translateX + ',' + translateY + ')';
    }
  }



  var slipDownID = setInterval(slipDown, duration);
  // slipDownDelayId = setTimeout(function() {
  //   slipDownID = setInterval(slipDown, duration);
  // }, 500);

  function slipDown() {
    if (translateY >= 255) {
      console.log('translateY >= 255', translateY >= 255, translateY);
      // clearTimeout(slipDownDelayId);
      clearInterval(slipDownID);
    } else {
      console.log('translateY', translateY);
      translateY += 2;
      rainDrop.style.transform = 'matrix(' + scaleX + ',' + skewY + ',' + skewX + ',' + scaleY + ',' + translateX + ',' + translateY + ')';
    }
  }
}


//return number from min to max, including both [min; max]
//work with not an integer
function random(min, max) {
  if (min ^ 0 === min && max ^ 0 === max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else

  //technique - multiply and divide
    return (Math.floor((Math.random() * (max - min + 0.1) * 10)) / 10) + min;
}



//-------------------------------------------
//---------------YT_PLAYER
//-------------------------------------------

// See more
// https://developers.google.com/youtube/iframe_api_reference


function createYTPlayer() {

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

createYTPlayer();

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    width: '363',
    height: '202',
    videoId: '9xKR8Vcjias',
    playerVars: {
      controls: 1,
      rel: 0,
      autoplay: 1,
      showinfo: 0
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

  let phone = document.querySelector('.phone-wrapper');
  let slider = document.querySelector('.slider-wrapper');
  var topPhone = 260;
  phone.style.top = topPhone + 'px';

  var topslider = 366;
  slider.style.top = topslider + 'px';


  var slidingPhoneID = setInterval(slidingPhone, 0);
  var slidingSliderID;

  setTimeout(function() {
    slidingSliderID = setInterval(slidingSlider, 0);
  }, 1000);

  function slidingPhone() {
    if (topPhone <= 14) {
      phone.style.top = 14 + 'px';

      clearInterval(slidingPhoneID);
      event.target.pauseVideo();
      event.target.mute();

      setTimeout(function() {
        player.playVideo();
      }, 500);

      var text = document.querySelector('.text');
      text.style.opacity = '1';
      text.style.backgroundImage = 'url(img/text_1.png)';

      setTimeout(showBlock, 1000, document.querySelector('.text-slider'));

      setTimeout(showBlock, 2000, document.querySelector('.cta'));

    } else {
      topPhone -= 3;
      phone.style.top = topPhone + 'px';
    }
  }

  function slidingSlider() {
    if (topslider <= 120) {
      slider.style.top = 120 + 'px';

      clearInterval(slidingSliderID);

    } else {
      topslider -= 3;
      slider.style.top = topslider + 'px';
    }
  }


  function showBlock(container) {
    container.style.opacity = '1';
  }

}