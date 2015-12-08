define(['analyser', 'util'], function (analyser, util) {
var start, now, onOff, twinkleCount = 0;
var $toplayer = $('#toplayer');
var cover = 'e0.jpg';
var canvas = util.getById('visual-canvas'),
    ctx = canvas.getContext('2d'),
    data,
    len = 0,
    i = 0,
    initOrNot = false,
    p,
    particles = [], // 粒子
    // colors = ['105, 210, 231',
    //     '27, 103, 107',
    //     '190, 242, 2',
    //     '235, 229, 77',
    //     '0, 205, 172',
    //     '22, 147, 165',
    //     '249, 212, 35',
    //     '255, 78, 80',
    //     '231, 32, 78',
    //     '12, 202, 186',
    //     '255, 0, 111'
    // ],
    colors = [
        '74, 167, 167',
        '147, 184, 73',
        '168, 0, 48',
        '221, 221, 194',
        '141,31,31',
        '52,80,43'
    ],
    ws = new WebSocket(util.websocket); // 颜色集

// 绘制
function draw(socketData) {
    ctx.save();
    now = new Date().getTime();
    if(window.log){
      console.log(now - start);
    }

    //if(socketData !== undefined){
    //console.log(window.clientMode)
    if(window.clientMode === true){
      if(socketData !== undefined){
        //console.log("socketData is defined");
        //var array = JSON.parse("[" + socketData + "]");
        data = socketData;
      }
    }else{
      //console.log("socketData is NOT defined");
      data = analyser.getData();
      try{
        //console.log(data.toString());
        ws.send(data.toString());
      }catch(err){
        console.log(err);
        //do Nothing
      }
    }

    if (data !== undefined) {
      if(data[onOff] === 1){
        $toplayer.hide();
      }else{
        $toplayer.show();
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (i = 0, len = data.length; i < len; i = i + 5) {
          p = particles[i];
          if (p.size === 0 ) {
              p.size = data[i];
              p.x = Math.random() * canvas.width;
              p.y = Math.random() * canvas.height;
              //left 1 right 2 up 3 down 4
              p.direction = Math.floor((Math.random() * 4) + 1);
          } else {
              //See if the circle is growing
              if (p.size < data[i]) {
                  p.size += Math.floor((data[i] - p.size) / 5);
                  p.opacity = p.opacity + 0.02;

                  if(p.direction === 1 &&  p.x > 0){
                    p.x = p.x -1;
                  }
                  if(p.direction === 2 &&  p.x < canvas.width){
                    p.x = p.x + 1;
                  }
                  if(p.x < 0){
                    p.direction = 2;
                  }
                  if(p.x > canvas.width){
                    p.direction = 1;
                  }

                  if(p.direction === 3 &&  p.y > 0){
                    p.y = p.y -1;
                  }
                  if(p.direction === 4 &&  p.y < canvas.height){
                    p.y = p.y + 1;
                  }
                  if(p.y < 0){
                    p.direction = 4;
                  }
                  if(p.y > canvas.height){
                    p.direction = 3;
                  }


                  if (p.opacity > 1) {
                      p.opacity = 1;
                  }
              } else {
                  p.size -= Math.floor((p.size - data[i]) / 5);
                  if (data[i] === 0) {
                      p.opacity = 0;
                  } else {
                      p.opacity = p.opacity - 0.0175;
                      if (p.opacity < 0) {
                          p.opacity = 0;
                          p.x = Math.random() * canvas.width;
                          p.y = Math.random() * canvas.height;
                      }
                  }
              }
          }
          var emptyColor = p.color;
          var color = p.color.replace('0)', p.opacity + ')');
          // ctx.fillStyle = color;
          // ctx.beginPath();
          // ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI, true);
          // ctx.closePath();
          // ctx.fill();
          drawCircle(p.x,p.y,p.size,color, emptyColor);

      }
      ctx.restore();
    }

}

function drawCircle(cx,cy,size,color, emptyColor){

  var grd = ctx.createRadialGradient(cx, cy, size/2, cx, cy, size);
  grd.addColorStop(0, emptyColor);
  grd.addColorStop(1, color);
  ctx.fillStyle = grd;
  // ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, size, 0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
}

function init() {
    start = new Date().getTime();
    var $toplayer = $('#toplayer');
    window.log = true;
    onOff = getUrlParams()["onOff"];

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 0);
      analyser.setMonitorState("monitor1", 0);
      analyser.setMonitorState("monitor2", 0);
    },0);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 1);
      analyser.setMonitorState("monitor1", 0);
      analyser.setMonitorState("monitor2", 0);
    },5000);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 1);
      analyser.setMonitorState("monitor1", 1);
      analyser.setMonitorState("monitor2", 0);
    },6600);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 1);
      analyser.setMonitorState("monitor1", 1);
      analyser.setMonitorState("monitor2", 1);
    },7600);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 1);
      analyser.setMonitorState("monitor1", 0);
      analyser.setMonitorState("monitor2", 1);
    },8400);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 0);
      analyser.setMonitorState("monitor1", 1);
      analyser.setMonitorState("monitor2", 0);
    },10194);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 1);
      analyser.setMonitorState("monitor1", 0);
      analyser.setMonitorState("monitor2", 1);
    },11000);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 0);
      analyser.setMonitorState("monitor1", 1);
      analyser.setMonitorState("monitor2", 0);
    },11950);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 1);
      analyser.setMonitorState("monitor1", 0);
      analyser.setMonitorState("monitor2", 1);
    },13646);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 0);
      analyser.setMonitorState("monitor1", 1);
      analyser.setMonitorState("monitor2", 0);
    },14522);

    setTimeout(function(){
      analyser.setMonitorState("monitor0", 1);
      analyser.setMonitorState("monitor1", 1);
      analyser.setMonitorState("monitor2", 1);
    },15257);

    setTimeout(function(){
      var x = 1;
      twinkleCount = 0;
      twinkle(x);
    },18898);

    setTimeout(function(){
      var x = 1;
      twinkleCount = 0;
      twinkle(x);
    },32778);

    function twinkle(x){
      setTimeout(function(){
        var y;
        if(x === 0){
          x = 1;
          y = 0;
        }else{
          x = 0;
          y = 1;
        }
        analyser.setMonitorState("monitor0", x);
        analyser.setMonitorState("monitor1", y);
        analyser.setMonitorState("monitor2", x);

        if(twinkleCount < 10){
          twinkleCount++;
          twinkle(x);
        }else{
          analyser.setMonitorState("monitor0", 1);
          analyser.setMonitorState("monitor1", 1);
          analyser.setMonitorState("monitor2", 1);
        }
      }, 300);

    }

    ///Beginning
    // setTimeout(function(){$toplayer.show()},0);
    // setTimeout(function(){$toplayer.hide()},5000);
    // setTimeout(function(){$toplayer.show()},6600);
    // setTimeout(function(){$toplayer.hide()},7600);
    // setTimeout(function(){$toplayer.show()},8400);
    // setTimeout(function(){$toplayer.hide()},10194);
    // setTimeout(function(){$toplayer.show()},11000);
    // setTimeout(function(){$toplayer.hide()},11950);
    // setTimeout(function(){$toplayer.show()},13646);
    // setTimeout(function(){$toplayer.hide()},14522);
    // setTimeout(function(){$toplayer.show()},15257);
    //slide
    // setTimeout(function(){$toplayer.hide()},17163);
    //main
    // setTimeout(function(){$toplayer.show()},18898);
    // setTimeout(function(){$toplayer.hide()},22404);
    // setTimeout(function(){$toplayer.show()},25771);
    // setTimeout(function(){$toplayer.hide()},29349);
    // setTimeout(function(){$toplayer.show()},32778);
    //first word
    // setTimeout(function(){$toplayer.hide()},46609);
    //
    // setTimeout(function(){$toplayer.show()},74424);
    // setTimeout(function(){$toplayer.hide()},77898);
    // setTimeout(function(){$toplayer.show()},81492);


    ws.onopen = function()
    {
       // Web Socket is connected, send data using send()
       console.log("Websocket Connected");
    };

    ws.onmessage = function (evt)
    {
       //var received_msg = evt.data;
       //ws.send("");
       //console.log(audio);
       if(window.clientMode === true){
         //console.log(evt.data);
         if (evt.data !== undefined) {
           var hiFreq = getUrlParams()["hi"];
           var loFreq = getUrlParams()["lo"];
           var array = JSON.parse("[" + evt.data + "]");
           //console.log("High=" + hiFreq + " | Low=" + loFreq)
           array.forEach(function(item, i) { if (item <= loFreq || item >= hiFreq) array[i] = 0; });
           //console.log(array);
           draw(array);
         }
       }
    };

    ws.onclose = function()
    {
       console.log("Websocket Closed");
    };

    util.setBg(0);
    var i, len = analyser.getFftSize() / 2,
        width = canvas.width,
        height = canvas.height,
        colorNum = colors.length;
    for (i = 0; i < len; i++) {
        particles[i] = {
            x: Math.random() * width,
            y: Math.random() * height,
            color: 'rgba(' + colors[Math.floor(Math.random() * colorNum)] + ', 0)',
            size: 0,
            opacity: Math.random() + 0.2
        };
    }
    initOrNot = true;
}

function getUrlParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function isInit() {
    return initOrNot;
}

function enable() {
    util.showCanvas();
}

function disable() {
    util.hideCanvas();
}

return {
    draw: draw,
    init: init,
    isInit: isInit,
    cover: cover,
    enable: enable,
    disable: disable
};

});
