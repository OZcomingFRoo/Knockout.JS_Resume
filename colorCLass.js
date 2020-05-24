function Color(r, g, b) {
    let obj = {
        topPos : ko.observable(0),
        leftPos : ko.observable(0),
        Red : ko.observable(r ? r : 0),
        Green : ko.observable(g ? g : 0),
        Blue : ko.observable(b ? b : 0)
    };

    const componentToHex = (c) => {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    const hexToRgb = (hex) => {
        // Array order [r , g , b]
        let rgbArray = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
            , (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16));
        this.Red(rgbArray[0]);
        this.Blue(rgbArray[1]);
        this.Blue(rgbArray[2]);
    }
    obj["val"] = ko.computed({
        read: () => {
            let colorFuckingVal = "rgb(" + obj.Red() + "," + obj.Green() + "," + obj.Blue() + ")";
            return colorFuckingVal;
        },
        write: (value) => { hexToRgb(value); },
        owner: this
    });

    return obj;
}

function wheelItemReOrder(arr) {
    const limit = 800;
    const course = limit * 2;
    const step = (course / arr.length);
    let top = 0, left = limit / 2;
    let topInc = true, leftInc = true;
    for (const item of arr) {
        item.leftPos(left);
        item.topPos(top);
        if ((topInc && top >= limit) || (!topInc && top <= 0)) {
            topInc = !topInc;
        }
        if ((leftInc && left >= limit) || (!leftInc && left <= 0)) {
            leftInc = !leftInc;
        }
        top += topInc ? step : (step * -1);
        left += leftInc ? step : (step * -1);
    }
}