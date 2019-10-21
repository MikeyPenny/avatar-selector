let avatars = [
    { "src": "public/images/img6.png", "id": 1 },
    { "src": "public/images/img5.png", "id": 2 },
    { "src": "public/images/img4.png", "id": 3 },
    { "src": "public/images/img3.png", "id": 4 },
    { "src": "public/images/img2.png", "id": 5 },
    { "src": "public/images/img1.png", "id": 6 }
];

$(document).ready(() => {

    $.each(avatars, (index, value) => {
        $(".avatar-collection")
        .append( `<li class="item"><img class="avatar avatar-item" index=${index} src=${value.src} data-id=${value.id} /></li>`);
    });

});