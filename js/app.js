'use strict';

function HornedCritter(critter) {
    this.image = critter.image_url;
    this.title = critter.title;
    this.desc = critter.description
    this.tag = critter.keyword;
    this.horns = critter.horns;
    this.class = this.class;
}

HornedCritter.prototype.render = function() {
    let $galleryClone = $('.gallery-temp').clone();
    $('main').append($galleryClone);

    $galleryClone.find('h2').text(this.title);
    $galleryClone.find('img').attr('src', this.image);
    $galleryClone.find('p').text(this.desc);
    $galleryClone.removeClass('gallery-temp');
    $galleryClone.attr('class', this.class);
}

HornedCritter.prototype.makeClass = function() {
    let newTitle = "";
    let spliceTitle = this.title.replace("'",'');
    spliceTitle = spliceTitle.replace("#",'');
    spliceTitle = spliceTitle.split(' ');
    spliceTitle.forEach(function(value) {
        newTitle = newTitle + value;
        console.log(newTitle)
   })
   this.class = newTitle;
}



HornedCritter.readJSON = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    $.ajax('data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach( item => {
                let critter = new HornedCritter(item);
                critter.makeClass();
                critter.render();
                $('select').append(`<option value=${critter.class}>${critter.title}</option>`);
            })
        })
}

$('select').on('change', function() {
    if($('select option:selected').text() === 'View All') {
        $('section').show();
    } else {
        $('section').hide();
        $(`.${$('select option:selected').val()}`).show();
    }
  })

$(() => HornedCritter.readJSON());