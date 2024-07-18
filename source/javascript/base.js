
$(document).ready(function() {
    add_listeners();
    $('#unit-menu').show();
    $('#mobile-menu').show();
});

$(window).on('pageshow',function() {
    setup_menu();
    $('#fullpage').show();
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

function pathToId(path) {
    let parts = path.split("/");
    parts.splice(0,1);
    let id = parts.join("_");
    id = id.replace(".html","");
    return id;
}

function setup_menu() {      
    //Update the menu to show the active topic and any uncollapsed parents
    //Get the active window
    //Save the active window
    //What if search sets active window?
    if ($('.navbar-burger').is(':visible')) {
        return;
    }
    let active_topic = $(".active_topic");
    let default_topic = $(".default_topic");
    let current_topic = active_topic;
    if (!active_topic.length) {
        current_topic = default_topic;
    }  
    let current_topic_id = current_topic.attr('id');
    let current_topic_href = current_topic.attr('href'); 
    let current_path = window.location.pathname;
    //If the current path is not the same as the current topic, update the current topic
    if ((current_path != current_topic_href) && (current_path != "/")) {
        current_topic_id = pathToId(current_path);
        current_topic_href = current_path;
    }
    let storage_active_topic = localStorage.getItem("active_topic");
    if (!storage_active_topic) {
        storage_active_topic = {"topic":current_topic_id, "href":current_topic_href};
        localStorage.setItem("active_topic", JSON.stringify(storage_active_topic));
    }
    else {
        storage_active_topic = JSON.parse(storage_active_topic);
    }
    if (storage_active_topic['href'] != current_topic_href) {
        if (window.location.pathname == "/") {
            window.location.href = storage_active_topic['href'];
            return;
        }
        else {
            storage_active_topic['href'] = current_topic_href;
            storage_active_topic['topic'] = current_topic_id;
            localStorage.setItem("active_topic", JSON.stringify(storage_active_topic));
        }
    }
    //Set the active topic
    $("#"+storage_active_topic['topic']).addClass("active_topic");
    $("#"+storage_active_topic['topic']).addClass("is-active");

    //Set the dropdowns
    let expanded_sections = localStorage.nav_show;
    $('.menu-section').unbind('click');
    if (!expanded_sections) {
        let active_section = "#"+storage_active_topic['topic'].split("_")[0];
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
}

function add_listeners() {
    const els = document.querySelectorAll('.menu-section');
    els.forEach(el => el.addEventListener('click', menu_click));
    const els2 = document.querySelectorAll('.menu-topic');
    els2.forEach(el => el.addEventListener('click', menu_topic_click));
}

function menu_click(event) {
    //Save open menu items to local storage
    //event.stopPropagation();
    //event.stopImmediatePropagation();
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
    //event.stopPropagation();
    //event.stopImmediatePropagation();
    $('.menu-topic').removeClass("active_topic");
    $('.menu-topic').removeClass("is-active");
    let target = $(this).attr('id');
    let href = $(this).attr('href');
    if (!target) {
        target = pathToId(window.location.pathname);
        href = window.location.pathname;
        let expanded_sections = localStorage.nav_show;
        expanded_sections = JSON.parse(expanded_sections);
        //Expand the new section 
        let section = "#"+target.split("_")[0];
        if (expanded_sections.indexOf(section) == -1) {
            expanded_sections.push(section);
            localStorage.setItem('nav_show', JSON.stringify(expanded_sections));
        }
        $('.menu-section').unbind('click');
        for (let section of expanded_sections) {
            $(section+"-button").click();
        }
        $('.menu-section').bind('click', menu_click);
    }
    $("#"+target).addClass("is-active");
    $("#"+target).addClass("active_topic");
    localStorage.setItem("active_topic", JSON.stringify({"topic":target, "href":href}));
}