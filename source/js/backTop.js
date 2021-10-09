(function (window, document, undefined) {
  var timer = null;

  function returnTop() {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
      var oTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (oTop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop =
          oTop - 50;
        timer = requestAnimationFrame(fn);
      } else {
        cancelAnimationFrame(timer);
      }
    });
  }

  var hearts = [];
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      }
    );
  })();
  init();

  function init() {
    addCss(
      ".heart{z-index:9999;width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
    );
    attachEvent();
    gameloop();
    addMenuEvent();
  }

  function gameloop() {
    for (var i = 0; i < hearts.length; i++) {
      if (hearts[i].alpha <= 0) {
        document.body.removeChild(hearts[i].el);
        hearts.splice(i, 1);
        continue;
      }
      hearts[i].y--;
      hearts[i].scale += 0.004;
      hearts[i].alpha -= 0.013;
      hearts[i].el.style.cssText =
        'left:' +
        hearts[i].x +
        'px;top:' +
        hearts[i].y +
        'px;opacity:' +
        hearts[i].alpha +
        ';transform:scale(' +
        hearts[i].scale +
        ',' +
        hearts[i].scale +
        ') rotate(45deg);background:' +
        hearts[i].color;
    }
    requestAnimationFrame(gameloop);
  }

  /**
   * 给logo设置点击事件
   *
   * - 回到顶部
   * - 出现爱心
   */
  function attachEvent() {
    var old = typeof window.onclick === 'function' && window.onclick;
    var logo = document.getElementById('logo');
    if (logo) {
      logo.onclick = function (event) {
        returnTop();
        old && old();
        createHeart(event);
      };
    }
  }

  function createHeart(event) {
    var d = document.createElement('div');
    d.className = 'heart';
    hearts.push({
      el: d,
      x: event.clientX - 5,
      y: event.clientY - 5,
      scale: 1,
      alpha: 1,
      color: randomColor()
    });
    document.body.appendChild(d);
  }

  function addCss(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(css));
    } catch (ex) {
      style.styleSheet.cssText = css;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function randomColor() {
    // return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    return '#F44336';
  }

  function addMenuEvent() {
    var menu = document.getElementById('menu-main-post');
    if (menu) {
      var toc = document.getElementById('toc');
      if (toc) {
        menu.onclick = function () {
          if (toc) {
            if (toc.style.display == 'block') {
              toc.style.display = 'none';
            } else {
              toc.style.display = 'block';
            }
          }
        };
      } else {
        menu.style.display = 'none';
      }
    }
  }
})(window, document);
