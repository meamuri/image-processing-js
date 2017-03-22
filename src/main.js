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

let initCtx = (canvas, img) => {
    let ctx = canvas.getContext('2d');

    let vRatio = canvas.width/ img.width;
    let hRatio = canvas.height/ img.height;
    let ratio = Math.min(hRatio, vRatio);
    let centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    let centerShift_y = ( canvas.height - img.height*ratio ) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.onload = () => {
        ctx.drawImage(img, 0,0, img.width, img.height,centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
        img.style.display = 'none';
    };
};


let main = () => {
    $(document).on('click', '#brightnessButton', () => {
        let img = new Image();
        img.src = $('#img_src').attr('src');

        let canvas = document.getElementById('out-canvas');
        let ctx = canvas.getContext('2d');

        initCtx(canvas, img);

        let imageDataObject = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageData = imageDataObject.data;

        console.log(imageData);

        //let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //imageData = processingBrightness(imageData, $('slider').attr('value'));
        //ctx.putImageData(imageData, 0, 0);
    })
};


$(document).ready(main);
