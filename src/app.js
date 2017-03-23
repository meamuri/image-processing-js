function initCtx(canvas, img) {
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
}

function workWithImage(canvas, brightness) {

    let toByte = (val) => {
        if (val > 255) {
            return 255;
        }
        if (val < 0)
            return 0;
        return val;
    };

    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let correctBrightness = () => {
        for (let i = 0; i < data.length; i += 4) {
            data[i]     = toByte(brightness + data[i]);
            data[i + 1] = toByte(brightness + data[i + 1]);
            data[i + 2] = toByte(brightness + data[i + 2]);
        }
    };
    correctBrightness();
    ctx.putImageData(imageData, 0, 0);
}

function renderImage(file) {
    let reader = new FileReader();
    // inject an image with the src url
    reader.onload = (event) => {
        let the_url = event.target.result;
        $('#input-img').attr('src', the_url);

        let img = new Image();
        img.src = the_url;

        let canvas = $('#out-canvas');
        canvas.attr('width', img.width);
        canvas.attr('height', img.height);

        initCtx(canvas[0], img);
    };
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
}


function initAll() {
    let canvas = document.getElementById('out-canvas');
    let slider = $("#slider");
    let brightness = slider.attr('value');

    slider.slider();
    slider.on("slide", function(slideEvt) {
        $(this).attr('value', slideEvt.value);
        brightness = slideEvt.value;
    });

    // handle input changes
    $("#upload-image").change( function() {
        // grab the first image in the FileList object and pass it to the function
        renderImage(this.files[0]);
        workWithImage(canvas, brightness);
    });

    $(document).on('click', '#brightnessButton', function() {
        workWithImage(canvas, brightness);
    })
}
