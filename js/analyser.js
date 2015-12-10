// 音频分析器
define(['util'], function (util) {

var audio = util.getById('music'),
    audioContext = new AudioContext(),
    analyser = audioContext.createAnalyser(),
    analyser2 = audioContext.createAnalyser(),
    audioSource = audioContext.createMediaElementSource(audio);

var monitors = {};
monitors.monitor0 = 0;
monitors.monitor1 = 0;
monitors.monitor2 = 0;

analyser.fftSize = 256;
analyser2.fftSize = 32;

var timeDomainData = new Uint8Array(analyser2.fftSize);
var freqByteData = new Uint8Array(analyser.frequencyBinCount);


// 连接音频源跟分析器
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

audioSource.connect(analyser2);
analyser2.connect(audioContext.destination);

// 获取数据
function getData() {

    analyser2.getByteFrequencyData(timeDomainData);
    var total = 0;
    for(var i = 0; i < timeDomainData.length; i++) {
        total += timeDomainData[i];
    }
    var avg = total / timeDomainData.length;

    if(avg >= 77){
      this.setMonitorState("monitor0", 1);
      this.setMonitorState("monitor1", 1);
      this.setMonitorState("monitor2", 1);
    }

    if(avg > 74 && avg < 77){
      this.setMonitorState("monitor0", 0);
      this.setMonitorState("monitor1", 1);
      this.setMonitorState("monitor2", 0);
    }

    if(avg <= 74){
      this.setMonitorState("monitor0", 0);
      this.setMonitorState("monitor1", 0);
      this.setMonitorState("monitor2", 0);
    }
    //console.log(avg);
    // return dataArray;

    analyser.getByteFrequencyData(freqByteData);
    freqByteData[0] = 1;
    freqByteData[1] = 2;
    freqByteData[2] = 3;
    freqByteData[3] = monitors.monitor0;
    freqByteData[4] = monitors.monitor1;
    freqByteData[5] = monitors.monitor2;
    // console.log(freqByteData);
    return freqByteData;
}

// 获取fftSize
function getFftSize() {
    return analyser.fftSize;
}

function setMonitorState(monitorName, state){
  monitors[monitorName] = state;
}

return {
    getData: getData,
    getFftSize: getFftSize,
    setMonitorState: setMonitorState
};

});
