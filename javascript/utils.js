var Utils = {
  transformReelToJSON: function (reel) {
    var resultString = '<br/>[',
      elementWithoutSpaces;

    reel.forEach(function (element) {
        var indexOfElement = element.indexOf('SYM');

        if (indexOfElement > -1) {
          // if element contains other chars before "SYM", delete them
          if (indexOfElement !== 0) {
            element = element.slice(indexOfElement);
          }

          // if element has more than 5 chars, delete chars with index >=5. For example: "SYM11..//" ----> "SYM11"
          if (element.length > 5) {
            element = element.slice(0, 5);
          }
          //clear elements from spaces
          elementWithoutSpaces = element.trim();
          resultString = resultString.concat('"').concat(elementWithoutSpaces).concat('",');
        }
      }
    );

    //remove the last coma
    resultString = resultString.slice(0, -1);
    resultString = resultString.concat('],');

    return resultString;
  },

  getReelData: function (reel, separator) {
    var array = reel.split(separator);

    //If last element doesn't contain "SYM", delete it
    if (array[array.length - 1].indexOf('SYM') === -1) {
      array.pop();
    }

    return array;
  },

  getReels: function (data, firstSeparator, lastSeparator) {
    var firstPosition = 0,
      secondPosition = 0,
      reels = [];

    while (true) {
      var reel,
        startPos = data.indexOf(firstSeparator, firstPosition),
        endPos = data.indexOf(lastSeparator, secondPosition);

      if (startPos == -1 && endPos == -1) break;
      reel = data.slice(startPos, endPos);
      reels.push(reel);
      firstPosition = startPos + 1;
      secondPosition = endPos + 1;
    }
    return reels;
  },

  findNumberOfSymbols: function (element, data) {
    return data.split(element).length - 1;
  }
};