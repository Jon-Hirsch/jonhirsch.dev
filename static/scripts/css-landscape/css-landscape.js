"use strict";
cssLandscape();

function cssLandscape() {
  var viewPort = document.createElement("div");
  viewPort.className += " viewPort";
  viewPort.innerHTML =
    '<link rel="stylesheet" type="text/css" href="/scripts/css-landscape/css-landscape.css"> ' +
    '<div class="container">' +
    '<div class="layer layer1"></div>' +
    '<div class="layer layer2"></div>' +
    '<div class="layer layer3"></div>' +
    '<div class="layer layer4"></div>' +
    '<div class="layer layer5"></div>' +
    '<div class="layer layer6"></div>' +
    '<div class="layer layer7"></div>' +
    "</div>";

  document.getElementById("css-landscape-container").appendChild(viewPort);
  var containerWidth = 600;
  var layers = viewPort.querySelectorAll(".layer");
  var currentSegment = 0;
  var highestSegment = 2;
  var lowestSegment = -2;
  var startTime = null;
  var lastUpdate = null;
  var relativePos = 0;
  generateSegment(0);
  generateSegment(1);
  generateSegment(2);
  generateSegment(-1);
  generateSegment(-2);

  window.requestAnimationFrame(move);

  function move(timestamp) {
    if (!startTime) {
      startTime = timestamp;
      lastUpdate = timestamp;
    }
    if (timestamp - lastUpdate > 16.7) {
      //limit the animation to 60 fps
      for (var i = 0; i < layers.length; i++) {
        relativePos--;
        layers[i].style.left = (relativePos / 10) * (i + 1) + "px";
      }
      lastUpdate = timestamp;

      currentSegment = ((relativePos / containerWidth) * -1) | 0;
      if (currentSegment >= highestSegment - 2) {
        highestSegment++;
        generateSegment(highestSegment);
      } else if (currentSegment <= lowestSegment + 2) {
        lowestSegment--;
        generateSegment(lowestSegment);
      }
    }

    window.requestAnimationFrame(move);
  }

  function generateSegment(segment) {
    var numMountains = Math.round(Math.random() * 1 + 2);
    var chunkWidth = containerWidth / numMountains;
    for (var i = 0; i < numMountains; i++) {
      var mountain = CreateMountain();
      var left = Math.round(Math.random() * (chunkWidth - 10) + chunkWidth * i);
      left += containerWidth * segment;
      mountain.style.left = left + "px";
      var index = Math.round(Math.random() * 5);
      layers[index].appendChild(mountain);
    }

    for (var i = 0; i < numMountains; i++) {
      var cloud = CreateCloud();
      var left = Math.round(Math.random() * (chunkWidth - 10) + chunkWidth * i);
      cloud.style.top = Math.round(Math.random() * 35 + 5) + "%";
      left += containerWidth * segment;
      cloud.style.left = left + "px";
      var index = Math.round(Math.random() * 5);
      layers[index].appendChild(cloud);
    }

    var numHills = Math.round(Math.random() * 1 + 2);
    chunkWidth = (containerWidth * 1.5) / numHills;
    for (var i = 0; i < numHills; i++) {
      var hill = CreateHill();
      var left = Math.round(Math.random() * -40 - 10);
      left = (left / 100) * containerWidth;
      left += chunkWidth * i;
      left += containerWidth * segment;
      hill.style.left = left + "px";

      layers[6].appendChild(hill);
    }
  }
  function CreateHill() {
    var hill = document.createElement("div");
    var width = Math.round(Math.random() * 40 + 110);
    var height = Math.round(Math.random() * 20 + 40);
    hill.className = "hill";

    hill.style.width = (width / 100) * containerWidth + "px";
    hill.style.height = height + "px";

    return hill;
  }

  function CreateMountain() {
    var mountain = document.createElement("div");
    var snow = document.createElement("div");
    var size = Math.round(Math.random() * 200 + 150); //generate a size between 150 and 350
    var skew = Math.round(Math.random() * 8); //generate the skew of the mountain (controls width/height ratio);
    var snowSize = Math.round(Math.random() * 20 + 30); //generate the amount of snow covering the mountain

    mountain.className = "mountain";
    snow.className = "snow";

    mountain.style.width = size + "px";
    mountain.style.height = size + "px";
    mountain.style.webkitTransform =
      "rotate(45deg) skewX(-" + skew + "deg) skewY(-" + skew + "deg)";
    mountain.style.msTransform =
      "rotate(45deg) skewX(-" + skew + "deg) skewY(-" + skew + "deg)";
    mountain.style.transform =
      "rotate(45deg) skewX(-" + skew + "deg) skewY(-" + skew + "deg)";
    mountain.style.bottom = size / -2 + "px";
    snow.style.width = snowSize + "%";
    snow.style.height = snowSize + "%";

    mountain.appendChild(snow);
    return mountain;
  }

  function CreateCloud() {
    var cloud = document.createElement("div");
    var subClouds = Math.round(Math.random() * 7 + 5);
    var width = Math.round(Math.random() * 50 + 65);
    var height = ((Math.random() * 20 + 30) / 100) * width;

    cloud.style.position = "absolute";
    cloud.style.zIndex = Math.round(Math.random() * 3);
    cloud.style.width = width + "px";
    cloud.style.height = height + "px";
    cloud.style.opacity = (Math.random() * 0.5 + 9.5) / 10;
    var subCloud;
    var thirdWidth = width / 3;
    for (var i = 0; i < subClouds; i++) {
      subCloud = document.createElement("div");
      if (i == 0) {
        subCloud.className = "cloud center";
        subCloud.style.width = height + "px";
        subCloud.style.webkitTransform =
          "translate(-50%) scaleX(1." + Math.round(Math.random() * 5) + ")";
        subCloud.style.msTransform =
          "translate(-50%) scaleX(1." + Math.round(Math.random() * 5) + ")";
        subCloud.style.transform =
          "translate(-50%) scaleX(1." + Math.round(Math.random() * 5) + ")";
      } else if (i == 1) {
        subCloud.style.height = Math.random() * 28 + 70 + "%";
        subCloud.style.width = thirdWidth + "px";
        subCloud.className = "cloud left";
        subCloud.style.left = "10%";
      } else if (i == 2) {
        subCloud.style.height = Math.random() * 28 + 70 + "%";
        subCloud.style.width = thirdWidth + "px";
        subCloud.className = "cloud right";
        subCloud.style.right = "10%";
      } else {
        var subWidth = Math.round(((Math.random() * 45 + 40) / 100) * height);
        subCloud.style.height = subWidth + "px";
        subCloud.style.width = subWidth + "px";
        if (i % 2 == 0) {
          subCloud.className = "cloud left";
          subCloud.style.left = Math.random() * 10 + "%";
        } else {
          subCloud.className = "cloud right";
          subCloud.style.right = Math.random() * 10 + "%";
        }

        subCloud.style.webkitTransform =
          "scaleX(1." + Math.round(Math.random() * 5) + ")";
        subCloud.style.msTransform =
          "scaleX(1." + Math.round(Math.random() * 5) + ")";
        subCloud.style.transform =
          "scaleX(1." + Math.round(Math.random() * 5) + ")";
      }

      cloud.appendChild(subCloud);
    }
    return cloud;
  }
}
