$(function () {
  // Patchboard

  $("#patches input").change(function () {
    connectPin($(this));
  });

  // Oscillator 1

  $("#osc1Freq").knobKnob({
    min: 0,
    max: 8,
    value: 180,
    diameter: 100,
    label: 'frequency',
    color: 'green',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      var freq = 440 * Math.pow(2, v - 4)
      Vco1sin.set("freq.value", freq);
      Vco1ramp.set("freq.value", freq);
      $("#osc1FreqDisplay").text(Math.round(freq));
    }
  });

  $("#osc1Shape").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'shape',
    color: "blue",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      Vco1sin.set("table", tables.sin(v));
    }
  });

  $("#osc1SinLevel").knobKnob({
    min: 0,
    max: 10,
    diameter: 70,
    label: 'sin level',
    value: 60,
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Vco1sin.set("mul", v * 3 / 10);  // up to 3V p-p output
    }
  });

  $("#osc1RampLevel").knobKnob({
    min: 0,
    max: 10,
    diameter: 70,
    label: 'ramp level',
    value: 0,
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      Vco1ramp.set("mul", v * 4 / 10);  // up to 4V p-p output
    }
  });

  // Oscillator 2

  $("#osc2Freq").knobKnob({
    min: 0,
    max: 8,
    value: 180,
    diameter: 100,
    label: 'frequency',
    color: 'green',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      var freq = 440 * Math.pow(2, v - 4)
      Vco2square.set("freq.value", freq);
      Vco2triangle.set("freq.value", freq);
      $("#osc2FreqDisplay").text(Math.round(freq));
    }
  });

  $("#osc2Shape").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'shape',
    color: "blue",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Vco2square.set("table", tables.square(v));
      Vco2triangle.set("table", tables.triangle(v));
    }
  });

  $("#osc2SquareLevel").knobKnob({
    min: 0,
    max: 10,
    diameter: 70,
    label: 'squ level',
    value: 60,
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Vco2square.set("mul", v * 4 / 10);  // up to 4V p-p output
    }
  });

  $("#osc2TriangleLevel").knobKnob({
    min: 0,
    max: 10,
    diameter: 70,
    label: 'tri level',
    value: 0,
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      Vco2triangle.set("mul", v * 6 / 10);  // up to 6V p-p output
    }
  });

  // Oscillator 3
  $("#osc3Freq").knobKnob({
    min: 0,
    max: 14,
    value: 180,
    diameter: 100,
    label: 'frequency',
    color: 'green',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      var unroundedFreq = 4 * Math.pow(2, (v - 7))
      if (unroundedFreq < 1) {
        freq = Math.round(unroundedFreq * 40) / 40;
      } else if (unroundedFreq < 10) {
        freq = Math.round(unroundedFreq * 4) / 4;
      } else {
        freq = unroundedFreq;
      }

      Vco3square.set("freq.value", freq);
      Vco3triangle.set("freq.value", freq);
      $("#osc3FreqDisplay").text(freq > 10 ? Math.round(freq) : freq);
    }
  });

  $("#osc3Shape").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'shape',
    color: "blue",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Vco3square.set("table", tables.square(v));
      Vco3triangle.set("table", tables.triangle(v));
    }
  });

  $("#osc3SquareLevel").knobKnob({
    min: 0,
    max: 10,
    diameter: 70,
    label: 'squ level',
    value: 60,
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Vco3square.set("mul", v * 4 / 10);  // up to 4V p-p output
    }
  });

  $("#osc3TriangleLevel").knobKnob({
    min: 0,
    max: 10,
    diameter: 70,
    label: 'tri level',
    value: 0,
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      Vco3triangle.set("mul", v * 6 / 10);  // up to 6V p-p output
    }
  });

  // Noise Generator

  $("#noiseLevel").knobKnob({
    min: 0,
    max: 10,
    value: 60,
    diameter: 70,
    label: 'level',
    color: 'blue',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      NoiseGenerator.set("source.mul", v * 3 / 10);  // up to 3V p-p output
    }
  });

  $("#noiseShape").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'shape',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      NoiseGenerator.set("freq", 440 * Math.pow(2, v - 5));  // modulate filter frequency to simulate colored noise
    }
  });

  // Filter / Oscillator

  $("#filterFrequency").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'frequency',
    color: 'blue',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      FilterOscillator.set("cutoff", 440 * Math.pow(2, v - 5) + 80);
    }
  });

  $("#filterResponse").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'response',
    color: 'yellow',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      FilterOscillator.set("resonance", v * 4 / 10);  // 0-4 scale (4 = self-oscillation)
    }
  });

  $("#filterLevel").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'level',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      FilterOscillator.set("mul", v / 10);
    }
  });

  // Envelope Shaper

  $("#envAttack").knobKnob({
    min: 0.01,
    max: 1,
    value: 60,
    diameter: 70,
    label: 'attack',
    color: "red",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      EnvelopeShaper.set("attack", v);
      EnvelopeTrapezoid.set("attack", v);
    }
  });

  $("#envOn").knobKnob({
    min: 0,
    max: 2.5,
    value: 90,
    diameter: 70,
    label: 'on',
    color: "red",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      EnvelopeShaper.set("on", v);
      EnvelopeTrapezoid.set("on", v);
    }
  });

  $("#envDecay").knobKnob({
    min: 0.01,
    max: 15,
    value: 60,
    diameter: 70,
    label: 'decay',
    color: "red",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      EnvelopeShaper.set("release.value", v);
      EnvelopeTrapezoid.set("release.value", v);
    }
  });

  $("#envOff").knobKnob({
    min: 0.01,
    max: 10,
    value: 60,
    diameter: 70,
    label: 'off',
    color: "red",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      EnvelopeShaper.set("off", v);
      EnvelopeTrapezoid.set("off", v);
    }
  });

  $("#envTrapezoidLevel").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'trapezoid lvl',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      // max: -3V to +4V
      EnvelopeTrapezoid.synth.set("main.source.mul", v * 7/10);
      EnvelopeTrapezoid.synth.set("main.add", - v * 4/10);
    }
  });

  $("#envSignalLevel").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'signal lvl',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      EnvelopeShaper.synth.set("main.mul", v/10);
    }
  });

  // Ring Modulator

  $("#ringModLevel").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'level',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      RingModulator.set("source.mul", v / 10);
    }
  });

  // Reverb

  $("#reverbMix").knobKnob({
    min: 0,
    max: 10,
    value: 90,
    diameter: 70,
    label: 'mix',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      Reverb.set("mix", v / 10);
    }
  });

  $("#reverbLevel").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'level',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      JoystickX.set("source.mul", v / 5);  // up to 2V p-p
      JoystickX.set("source.add", - v / 10); 
    }
  });

  // Joystick controls

  $("#joystickXRange").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'x',
    color: "green",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) { 
      JoystickX.set("source.mul", v / 5);  // up to 2V p-p
      JoystickX.set("source.add", - v / 10); 
    }
  });

  $("#joystickYRange").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'y',
    color: "green",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      JoystickY.set("source.mul", - v / 5);  // up to 2V p-p
      JoystickY.set("source.add", - v / 2);
    }
  });

  // Channel Level + Pan

  $("#ch1level").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'level',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Output.set("left1.mul", v / 5);
      Output.set("right1.mul", v / 5);
    }
  });

  $("#ch1pan").knobKnob({
    min: 0,
    max: 10,
    value: 0,
    diameter: 70,
    label: 'pan',
    color: "green",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Output.set("left1.source.mul", 1 - v / 10);
      Output.set("right1.source.mul", v / 10);
    }
  });

  $("#ch2pan").knobKnob({
    min: 0,
    max: 10,
    value: 300,
    diameter: 70,
    label: 'pan',
    color: "green",
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Output.set("left2.source.mul", 1 - v / 10);
      Output.set("right2.source.mul", v / 10);
    }
  });

  $("#ch2level").knobKnob({
    min: 0,
    max: 10,
    value: 180,
    diameter: 70,
    label: 'level',
    startOffset: 30,
    endOffset: 30,
    turn: function (v) {
      Output.set("left2.mul", v / 5);
      Output.set("right2.mul", v / 5);
    }
  });

  // unfortunately, the trackpad JS causes too much buzz to use
  // TODO: figure out why!
  /*$("#joystick").trackPad({
    width: "140px",
    height: "140px",
    markerDiameter: "20px",
    markerColor: "#DDD"
  });*/

  // Storage banks

  function updateBankDisplay() {
    var storageIndicator = (localStorage["bank" + currentBank]) ? "Y" : " "
    display.setValue(storageIndicator + '    ' + ("0" + currentBank).slice(-2));
  }

  var display = new SegmentDisplay("bankDisplay");
  display.pattern         = "#    ##";
  display.displayAngle    = 6;
  display.digitHeight     = 20;
  display.digitWidth      = 14;
  display.digitDistance   = 2.5;
  display.segmentWidth    = 2;
  display.segmentDistance = 0.3;
  display.segmentCount    = 7;
  display.cornerType      = 3;
  display.colorOn         = "#e95d0f";
  display.colorOff        = "#4b1e05";
  display.draw();
  updateBankDisplay();


  $("#bankUp").click(function () {
    currentBank = (currentBank == 99) ? 0 : (currentBank + 1);
    updateBankDisplay();
  });
  $("#bankDown").click(function () {
    currentBank = (currentBank == 0) ? 99 : (currentBank - 1);
    updateBankDisplay();
  });

  $("#bankStore").click(function () {
    storeToBank();
    updateBankDisplay();
  });
  $("#bankLoad").click(function () {
    loadFromBank();
    updateBankDisplay();
  });
  $("#bankClear").click(function () {
    clearBank();
    updateBankDisplay();
  });
  $("#bankImportExport").click(function () {
    $("#memoryDialog textarea").val(saveState());
    $("#memoryDialog").show();
  });

  // Memory dialog

  $("#memoryImport").click(function () {
    loadState($("#memoryDialog textarea").val());
    $("#memoryDialog").hide();
  });

  $("#memoryDialogClose").click(function () {
    $("#memoryDialog").hide();
  });

  // Input Sources

  var corsEnabled;

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    corsEnabled = true;
    $("#inputSources").fadeIn();
    $("#corsStatus").hide();
  };
  xhr.open('GET', 'http://google.com/');
  xhr.send();
  
  setTimeout(function () {
    if (corsEnabled !== true) {
      corsEnabled = false;
      $("#corsStatus")
        .html("CORS is disabled, so SYNTHI-JS cannot access external audio files. You can enable CORS on Google Chrome with <a href='https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en' target='_blank'>this extension</a> (but disable it when you're not using SYNTHI-JS, because it can be a security risk).")
        .addClass("disabled")
        .removeClass("detecting");
    }
  }, 2000);

  $("#inputUrl1").on('keyup change', function() {
    InputCh1.set("buffer", {url: $(this).val()});
  });
  $("#inputUrl2").on('keyup change', function() {
    InputCh2.set("buffer", {url: $(this).val()});
  });

  $("#speed1").on('keyup change', function() {
    InputCh1.set("speed", parseFloat($(this).val()));
  });
  $("#speed2").on('keyup change', function() {
    InputCh2.set("speed", parseFloat($(this).val()));
  });

  $("#start1").on('keyup change', function() {
    InputCh1.set("start", parseFloat($(this).val()) / 100);
  });
  $("#start2").on('keyup change', function() {
    InputCh2.set("start", parseFloat($(this).val()) / 100);
  });

  $("#end1").on('keyup change', function() {
    InputCh1.set("end", parseFloat($(this).val()) / 100);
  });
  $("#end2").on('keyup change', function() {
    InputCh2.set("end", parseFloat($(this).val()) / 100);
  });

  // Set up masonry grid layout and fade in

  $('.grid').masonry({
    columnWidth: '.width1',
    itemSelector: '.panel'
  }).css("visibility", "visible")
    .hide()
    .fadeIn();
});