// import * as my_module from 'init';

let toByte = (val) => {
  if (val > 255) {
      return 255;
  }
  if (val < 0)
      return 0;
  return val;
};

let processingBrightness = (imageData, brightness) => {
    imageData = imageData.data;
    for ( let i = 0; i < imageData.length; i += 4 ) {
        imageData[i] = toByte(imageData[i] + brightness);
        imageData[i+1] = toByte(imageData[i+2] + brightness);
        imageData[i+2] = toByte(imageData[i+2] + brightness);
    }
    return imageData;
};




let main = () => {
    $(document).on('click', '#brightnessButton', () => {
        let img = new Image();
        img.src = $('#img_src').attr('src');

        let canvas = document.getElementById('out-canvas');
        let ctx = canvas.getContext('2d');

        initCtx(canvas, img);

        let imageDataObject = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let imageData = imageDataObject.data;
        const pixelCount = imageData.length;

        console.log(imageDataObject);
        console.log(pixelCount);

        //let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //imageData = processingBrightness(imageData, $('slider').attr('value'));
        //ctx.putImageData(imageData, 0, 0);
    })
};


$(document).ready(main);
