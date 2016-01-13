var form = document.getElementById('input');

function parseInputData(evt) {
    var inputData,
        reels,
        result = '[',
        reelsInformation = {};

    evt.preventDefault();

    inputData = document.getElementById('inputData').value;

    if (!checkData(inputData)) return;

    reels = Utils.getReels(inputData, '{', '}');

    reels.forEach(function (reel, reelNumber) {
        var str,
            reelData = Utils.getReelData(reel, ',');

        str = Utils.transformReelToJSON(reelData);
        result = result.concat(str);
        reelsInformation[reelNumber] = reelData.length;
    });

    result = result.slice(0, -1);
    result = result.concat('<br/>]');
    showResult(result);
    showReelsInformation(reels.length, reelsInformation);
}

function checkData(data) {
    var divider = ',',
        numberOfFirstSymbol = Utils.findNumberOfSymbols('{', data),
        numberOfSecondSymbol = Utils.findNumberOfSymbols('}', data);

    if (data.indexOf(divider) === -1 || data.indexOf('SYM') === -1) {
        showErrorMessage('You entered an incorrect data!');
        return null;
    }

    if (numberOfFirstSymbol === 0 || numberOfFirstSymbol !== numberOfSecondSymbol) {
        showErrorMessage('You entered not full reelset. Check if there are all symbols: "{" and "}"');
        return null;
    }
    return true;
}

function showErrorMessage(message) {
    alert(message);
}

function showResult(result) {
    document.getElementById('result').innerHTML = 'Result: <br/>' + result;
}

function showReelsInformation(numberOfReels, reels) {
    var reelsInfo = '',
        reelNumber,
        str = '';

    for (reelNumber in reels) {
        str = 'Reel '.concat(reelNumber).concat(':  ').concat(reels[reelNumber])
            .concat(' elements').concat('<br/>');
        reelsInfo = reelsInfo.concat(str);
    }
    document.getElementById('ReelsInformation').innerHTML =
        'Number of reels: '.concat(numberOfReels).concat('<br/>').concat(reelsInfo);
}

form.addEventListener('click', parseInputData, false);


