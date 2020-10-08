"use strict";

let allcritters = [];


function HornedCritter(critter) {
    this.image = critter.image_url;
    this.title = critter.title;
    this.desc = critter.description
    this.tag = critter.keyword;
    this.horns = critter.horns;
    this.class = this.class;
    allcritters.push(this)
}

HornedCritter.prototype.render = function () {
    let template = $("#gallery-template").html();
    let html = Mustache.render(template, this);
    return html;
}

HornedCritter.prototype.makeClass = function () {
    let newTitle = "";
    let spliceTitle = this.title.replace("'", '');
    spliceTitle = spliceTitle.replace("#", '');
    spliceTitle = spliceTitle.split(' ');
    spliceTitle.forEach(function (value) {
        newTitle = newTitle + value;
    })
    this.class = newTitle;
}

HornedCritter.readJSON = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json',
    }

    $.ajax('data/page-2.json', ajaxSettings)
        .then(data => {
            data.forEach(item => {
                new HornedCritter(item);
            });
            let bucket = []  //before forEach or else it comes empty everytime
                allcritters.sort((a, b) => a.title > b.title ? 1 : -1);
                allcritters.forEach(critter =>{
                    critter.makeClass();
                    $('.gallery').append(critter.render())
                    if (!bucket.includes(critter.tag)) {//if ive seen it before, i dont run any code; doesnt display duplicates
                        bucket.push(critter.tag)
                        $('#filter').append(`<option value=${critter.tag}>${critter.tag}</option>`)
                    }

            });
        });
}

$('#filter').on('change', function () {
    console.log(this.value)
    let val = this.value
    $('section').hide()
    $(`.${val}`).show()
});

$('#sort').on('change', function () {
    if ($(this).val() === 'title') {
        $('.gallery').empty();
        allcritters.sort((a, b) => a.title > b.title ? 1 : -1);
        allcritters.forEach(critter => {
            $('.gallery').append(critter.render());

        })
    }
    else {
        $('.gallery').empty();
        allcritters.sort((a, b) => a.horns > b.horns ? 1 : -1)
        allcritters.forEach(critter => {
            $('.gallery').append(critter.render());
        })
    }
})


$(() => HornedCritter.readJSON());