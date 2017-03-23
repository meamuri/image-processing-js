function initCtx(canvas, img) {
    canvas.attr('width', img.width);
    canvas.attr('height', img.height);
    let ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.drawImage(img, 0,0, img.width, img.height);
}

function renderImage(file, canvas_in, canvas_out) {
    let reader = new FileReader();
    // inject an image with the src url
    reader.onload = (event) => {
        let img = new Image();
        img.src = event.target.result;
        initCtx(canvas_in, img);
        initCtx(canvas_out, img);
    };
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
}


function initAll() {
    function workWithImage(brightness) {
        let toByte = (val) => {
            if (val > 255) {
                return 255;
            }
            if (val < 0)
                return 0;
            return val;
        };

        let ctx = canvas_in[0].getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas_in[0].width, canvas_in[0].height);
        let data = imageData.data;

        let correctBrightness = () => {
            for (let i = 0; i < data.length; i += 4) {
                data[i]     = toByte(brightness + data[i]);
                data[i + 1] = toByte(brightness + data[i + 1]);
                data[i + 2] = toByte(brightness + data[i + 2]);
            }
        };
        correctBrightness();
        ctx = canvas_out[0].getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

    let canvas_in = $('#in-canvas');
    let canvas_out = $('#out-canvas');
    let slider = $("#slider");
    let brightness = slider.attr('value');

    slider.slider();
    slider.on("slide", function(slideEvt) {
        $(this).attr('value', slideEvt.value);
        brightness = slideEvt.value;
        workWithImage(brightness);
    });

    // handle input changes
    $("#upload-image").change( function() {
        // grab the first image in the FileList object and pass it to the function
        renderImage(this.files[0], canvas_in, canvas_out);
    });
    
}
