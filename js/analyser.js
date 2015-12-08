// 音频分析器
define(['util'], function (util) {

var audio = util.getById('music'),
    audioContext = new AudioContext(),
    analyser = audioContext.createAnalyser(),
    audioSource = audioContext.createMediaElementSource(audio);

var monitors = {};
monitors.monitor0 = 0;
monitors.monitor1 = 0;
monitors.monitor2 = 0;

analyser.fftSize = 512;
//var dataArray = new Uint8Array(analyser.fftSize);
var freqByteData = new Uint8Array(analyser.frequencyBinCount);

// 连接音频源跟分析器
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

// 获取数据
function getData() {
    // analyser.getByteTimeDomainData(dataArray);
    // console.log(dataArray);
    // return dataArray;
    analyser.getByteFrequencyData(freqByteData);
    freqByteData[0] = monitors.monitor0;
    freqByteData[1] = monitors.monitor1;
    freqByteData[2] = monitors.monitor2;
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
