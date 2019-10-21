let avatars = [
    { "src": "public/images/img6.png", "id": 1 },
    { "src": "public/images/img5.png", "id": 2 },
    { "src": "public/images/img4.png", "id": 3 },
    { "src": "public/images/img3.png", "id": 4 },
    { "src": "public/images/img2.png", "id": 5 },
    { "src": "public/images/img1.png", "id": 6 }
];

$(document).ready(() => {

    loadAvatars();


    
    $('#avatar-selected').click(function() {
        $('.box').fadeToggle("slow", "linear");      
    });

    $('.avatar-item').on("click", loadHandler);

    $(document).mouseup(function(e) {
        let display = $('.box');
        let avatarSel = $('#avatar-selected')[0];
        
        if (e.target !== avatarSel && e.target !== display && display.has(e.target).length === 0)
                display.fadeToggle("slow", "linear");

    });

});

function loadAvatars() {
    
    let sessionValue = sessionStorage.getItem('src');

    if (sessionValue) {
        $("#avatar-selected").attr("src", sessionValue);
    }
    let select = $("#avatar-selected").attr("src");
    $.each(avatars, (index, value) => {
        
        if(select === value.src) {
            $(".avatar-collection")
            .append( `<li class="item"><img class="avatar avatar-item picked" index=${index} src=${value.src} data-id=${value.id} /></li>`);
        } else {
            $(".avatar-collection")
            .append( `<li class="item"><img class="avatar avatar-item" index=${index} src=${value.src} data-id=${value.id} /></li>`);
        }
             
    });  
}

function loadHandler(){
        
    let elem = $(this);
    let parent = $(this).parent();
    let srcData = $(this).attr("src");
    let index = $(this).attr("index");
    let top = (this.offsetTop - 2) + 'px';
    let left = (this.offsetLeft - 2) + 'px';
    $(this).addClass("no-hover");
    
    // step 1: trigger animation on clicked image
    // & append animated circle https://codepen.io/Chester/pen/QPoyjN 
    // https://codepen.io/lideo/pen/jawFy?editors=1100
    parent.append(`<div class="loading-circle" style="top: ${top}; left: ${left}" ></div>`);
    
    // Hide avatar dialog after loading animation 
    $('.box').delay(500).fadeToggle("slow", "linear").queue(function(){
        $(".loading-circle").remove();
        $(elem).removeClass("no-hover"); 
        
        // Replace avatar image with clicked image "src", using "id"
        $('#avatar-selected').attr("src", srcData);
        saveAvatarData(srcData);
        let avatarToggle = avatars.splice(index, 1)[0];
        avatars.unshift(avatarToggle);
        $('.item').detach();
        loadAvatars();
        $('.avatar-item').on("click", loadHandler);
        $(this).dequeue();
    });
}

function saveAvatarData(srcData) {
    sessionStorage.setItem('src', srcData);
    //sessionStorage.removeItem();
    //sessionStorage.clear();
}
