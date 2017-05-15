function initCtx(img, canvas_in, canvas_out) {
    let ctx_in = canvas_in[0].getContext('2d');
    let ctx_out = canvas_out[0].getContext('2d');

    img.onload = () => {
        canvas_in.attr('width', img.width);
        canvas_in.attr('height', img.height);
        canvas_out.attr('width', img.width);
        canvas_out.attr('height', img.height);

        ctx_in.clearRect(0, 0, img.width, img.height);
        ctx_in.drawImage(img, 0,0, img.width, img.height);
        ctx_out.clearRect(0, 0, img.width, img.height);
        ctx_out.drawImage(img, 0,0, img.width, img.height);
        img.style.display = 'none';
    };

}

function renderImage(file, canvas_in, canvas_out) {
    let reader = new FileReader();
    // inject an image with the src url
    reader.onload = (event) => {
        let the_url = event.target.result;

        let img = new Image();
        img.src = the_url;

        initCtx(img, canvas_in, canvas_out);
    };
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
}


function workWithImage(p, canvas_in, canvas_out, work) {
    let ctx = canvas_in[0].getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas_in[0].width, canvas_in[0].height);
    let ctx_out = canvas_out[0].getContext('2d');

    work(p, imageData);
    ctx_out.putImageData(imageData, 0, 0);
}


function initAll() {
    let canvas_in = $('#in-canvas');
    let canvas_out = $('#out-canvas');

    let slider_brightness = $("#slider");
    let slider_saturation = $("#saturation");
    let slider_contrast = $("#contrast");

    slider_brightness.slider();
    slider_saturation.slider();
    slider_contrast.slider();

    let brightness = slider_brightness.attr('value');
    let saturation = slider_saturation.attr('value');
    let contrast = slider_contrast.attr('value');

    slider_brightness.on("slide", function(slideEvt) {
        $(this).attr('value', slideEvt.value);
        brightness = slideEvt.value;
        workWithImage(brightness, canvas_in, canvas_out, workWithBrightness);
    });

    slider_contrast.on("slide", (slideEvt) => {
        $(this).attr('value', slideEvt.value);
        contrast = slideEvt.value;
        workWithImage(contrast, canvas_in, canvas_out, workWithContrast);
    });

    slider_saturation.on("slide", (slideEvt) => {
        $(this).attr('value', slideEvt.value);
        saturation = slideEvt.value;
        workWithImage(saturation, canvas_in, canvas_out, workWithSaturation);
    });

    // handle input changes
    $("#upload-image").change( function() {
        // grab the first image in the FileList object and pass it to the function
        renderImage(this.files[0], canvas_in, canvas_out);
    });

    let checked = false;
    $("#cmn-toggle-1").on("change", (evnt) => {
        checked = !checked;
        if (checked) {
            workWithImage(undefined, canvas_in, canvas_out, workWithSaturation);
            return;
        }
        let ctx = canvas_in[0].getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas_in[0].width, canvas_in[0].height);
        let ctx_out = canvas_out[0].getContext('2d');
        ctx_out.putImageData(imageData, 0, 0);
    });

}