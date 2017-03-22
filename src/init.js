function renderCanvas(img) {
    let canvas = document.getElementById('out-canvas'); //$('#out-canvas');
    let ctx = canvas.getContext('2d');

    let vRatio = canvas.width/ img.width;
    let hRatio = canvas.height/ img.height;
    let ratio = Math.min(hRatio, vRatio);
    let centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    let centerShift_y = ( canvas.height - img.height*ratio ) / 2;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    img.onload = () => {
        ctx.drawImage(img, 0,0, img.width, img.height,centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
        // ctx.drawImage(img, 0,0);
        img.style.display = 'none';
    };
}

function renderImage(file) {
    // generate a new FileReader object
    let reader = new FileReader();
    // inject an image with the src url
    reader.onload = (event) => {
        the_url = event.target.result;
        $('#input-div').html("<img id='img_src' src='" + the_url + "' />");
        // $('#input-img').src = the_url;

        img = new Image();
        img.src = the_url;
        $('#output-div').html("<canvas id='out-canvas' " +
            "width='" + img.width + "'" +
            "height='" + img.height+ "'" +
            "></canvas>");

        renderCanvas(img);
    };
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);

}
// handle input changes
$("#upload-image").change(function() {
    // console.log(this.files);
    // grab the first image in the FileList object and pass it to the function
    renderImage(this.files[0])
});

// With JQuery
$("#slider").slider();
$("#destroyEx5Slider").click(() => {
    // With JQuery
    $("#slider").slider('destroy');
});