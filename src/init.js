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

function renderImage(file) {
    // generate a new FileReader object
    let reader = new FileReader();
    // inject an image with the src url
    reader.onload = (event) => {
        let the_url = event.target.result;
        $('#input-div').html("<img id='img_src' src='" + the_url + "' />");

        let img = new Image();
        img.src = the_url;
        let canvas = $('#out-canvas');
        canvas.attr('width', img.width);
        canvas.attr('height', img.height);

        initCtx(document.getElementById('out-canvas'), img);
    };
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
}

// handle input changes
$("#upload-image").change( function() {
    // grab the first image in the FileList object and pass it to the function
    renderImage(this.files[0]);
});

let slider = $("#slider");
slider.slider();
slider.on("slide", function(slideEvt) {
    $(this).attr('value', slideEvt.value);
});
