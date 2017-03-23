let toByte = (val) => {
  if (val > 255) {
      return 255;
  }
  if (val < 0)
      return 0;
  return val;
};


let main = () => {
    function workWithImage(canvas, brightness) {
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i]     = toByte(brightness + data[i]);
            data[i + 1] = toByte(brightness + data[i + 1]);
            data[i + 2] = toByte(brightness + data[i + 2]);
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function refreshImage(canvas) {
        let img = new Image();
        img.src = $('#img_src').attr('src');
        initCtx(canvas, img);
    }

    $(document).on('click', '#brightnessButton', () => {
        let canvas = document.getElementById('out-canvas');
        refreshImage(canvas);

        let brightness = Number($('#slider').attr('value'));
        workWithImage(canvas, brightness);
    })
};


$(document).ready(main);
