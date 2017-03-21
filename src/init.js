function renderImage(file) {
    // generate a new FileReader object
    let reader = new FileReader();
    // inject an image with the src url
    reader.onload = (event) => {
        the_url = event.target.result;
        $('#output-img').html("<img src='" + the_url + "' />")
    };
    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
}
// handle input changes
$("#upload-image").change(function() {
    console.log(this.files);

    // grab the first image in the FileList object and pass it to the function
    renderImage(this.files[0])
});

// With JQuery
$("#slider").slider();
$("#destroyEx5Slider").click(() => {
    // With JQuery
    $("#slider").slider('destroy');
});