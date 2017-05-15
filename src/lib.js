const toByte = (val) => {
    if (val > 255) {
        return 255;
    }
    if (val < 0)
        return 0;
    return val;
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l){
    let r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        let hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r, g, b];
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r, g, b){
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min) {
        h = s = 0; // achromatic
    } else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function workWithSaturation(saturation, imageData) {
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let hsl = rgbToHsl(data[i], data[i+1], data[i+2]);
        let h = hsl[0];
        let s = hsl[1];
        let l = hsl[2];
        s *= 2;
        let rgb = hslToRgb(h, s, l);
        data[i] = rgb[0]; data[i+1] = rgb[1]; data[i+2] = rgb[2];
    }
}

function workWithContrast(contrast, imageData) {
    let data = imageData.data;

    let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    for (let i = 0; i < data.length; i += 4) {
        data[i]     = toByte(factor * (data[i] - 128) + 128);
        data[i + 1] = toByte(factor * (data[i + 1] - 128) + 128);
        data[i + 2] = toByte(factor * (data[i + 2] - 128) + 128);
    }
}

function workWithBrightness(brightness, imageData) {
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i]     = toByte(brightness + data[i]);
        data[i + 1] = toByte(brightness + data[i + 1]);
        data[i + 2] = toByte(brightness + data[i + 2]);
    }
}