
$(document).ready(function() {
    setup_menu();
    $('#unit-menu').show();
    $('#mobile-menu').show();
    $('#fullpage-menu').show();
});

// $(window).on('pageshow',function() {
//     $('#unit-menu').show();
//     $('#mobile-menu').show();
//     $('#fullpage-menu').show();
//     $('#nav-accordion').show();
// });

MathJax.Hub.Queue(
    function () {
        var formulas = document.getElementsByClassName('formula');
        for (var i = 0; i < formulas.length; ++i) {
            var item = formulas[i];  
            item.style.visibility = 'visible';
        }
    }
);

function setup_menu() {      
    //Update the menu to show the active topic and any uncollapsed parents
    //Get the active window
    //Save the active window
    //What if search sets active window?
    let active_topic = $(".active_topic");
    let default_topic = $(".default_topic");
    let storage_active_topic = localStorage.getItem("active_topic");
    if (!storage_active_topic) {
        if (!active_topic.length) {
            storage_active_topic = default_topic[0].id;
        }
        else {
            storage_active_topic = active_topic[0].id;
        }
    }
    localStorage.setItem("active_topic", storage_active_topic);
    $("#"+storage_active_topic).addClass("active_topic");
    $("#"+storage_active_topic).addClass("is-active");
    //Set the dropdowns
    let expanded_sections = localStorage.nav_show;
    if (!expanded_sections) {
        let active_section = "#"+storage_active_topic.split("_")[0];
        localStorage.setItem("nav_show", JSON.stringify([active_section]));
        $(active_section+"-button").click();
    }
    else{
        expanded_sections = JSON.parse(expanded_sections);
        for (let section of expanded_sections) {
            $(section+"-button").click();
        }
    }
    $('.menu-section').bind('click', menu_click);
    $('.menu-topic').bind('click', menu_topic_click);
}

function menu_click(event) {
    //Save open menu items to local storage
    event.stopPropagation();
    event.stopImmediatePropagation();
    var target = $(this).attr('data-bs-target');
    console.log('target:', target);
    //target = target.replace("#", "");
    var is_expanded = ($(this).attr('aria-expanded') == "true")?true:false;
    console.log('is-expanded:', is_expanded);
    var show_stored = [];
    if (localStorage.nav_show) {
        show_stored = JSON.parse(localStorage.nav_show);
        console.log('Current: '+show_stored);
    }
    var index = show_stored.indexOf(target);
    if (!is_expanded) {
        if (index > -1) {
            show_stored.splice(index, 1);
            console.log("collapse");
        }
    }
    else {
        if (index == -1) {
            show_stored.push(target);
            console.log("expand");
        }
    }
    localStorage.setItem('nav_show', JSON.stringify(show_stored));
    console.log('Now: '+show_stored);
}

function menu_topic_click(event) {
    //Save open menu items to local storage
    event.stopPropagation();
    event.stopImmediatePropagation();
    var target = $(this).attr('id');
    console.log('topic:', target);
    localStorage.setItem("active_topic", target);
}