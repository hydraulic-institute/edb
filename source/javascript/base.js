
$(document).ready(function() {
    add_listeners();
    $('#unit-menu').show();
    $('#mobile-menu').show();
});

$(window).resize(function() {
    check_each_dt();
});

$(window).on('pageshow',function() {
    setup_menu();
    $('#fullpage').show();
    check_each_dt();
    //In case a search is requested, scroll to the first result
    let current_hash = "";
    let current_hash_class = "";
    let storage_active_topic = localStorage.getItem("active_topic");
    if (storage_active_topic) {
        storage_active_topic = JSON.parse(storage_active_topic);
        current_hash = storage_active_topic['hash'];
        if (current_hash.length > 0) {
            current_hash_class = "."+current_hash.split("#")[1]+'-tag';
        }
    }
    if ( $('.current_mark').length ) {
        $('.current_mark').get(0).scrollIntoView({block: "center"});
    }
    else {
        if (current_hash.length > 0) {
            let active_section = "#"+storage_active_topic['topic'].split("_")[0];
            $(active_section+"-button").click();
            $(current_hash_class).addClass("is-active");
            $(current_hash).get(0).scrollIntoView({behavior: "smooth", block: "center"});
        }
    }
});

$("[data-bs-toggle]").on('click',function(e){
    check_each_dt();
});

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

function canonicalPath(path) {
    if (!path || path === "/" || path === "/index.html") {
        return "/home/home.html";
    }
    return path;
}

function setup_menu() {      
    //Update the menu to show the active topic and any uncollapsed parents
    let current_location = window.location.pathname;
    let current_hash = window.location.hash;
    let active_topic = $(".active_topic");
    let default_topic = $(".default_topic");
    let current_topic = active_topic;
    if (!active_topic.length) {
        current_topic = default_topic;
    }  
    let current_topic_id = current_topic.attr('id');
    let current_topic_href = current_topic.attr('href'); 
    let current_path = canonicalPath(window.location.pathname);
    //If the current path is not the same as the current topic, update the current topic
    if (current_path != current_topic_href) {
        current_topic_id = pathToId(current_path);
        current_topic_href = current_path;
    }
    let storage_active_topic = localStorage.getItem("active_topic");
    if (!storage_active_topic) {
        storage_active_topic = {"topic":current_topic_id, "href":current_topic_href, "hash":current_hash};
        localStorage.setItem("active_topic", JSON.stringify(storage_active_topic));
    }
    else {
        storage_active_topic = JSON.parse(storage_active_topic);
        if (!('hash' in storage_active_topic)) {
            storage_active_topic['hash'] = ""; //If the hash is empty, set it to an empty string
        }
    }
    if (canonicalPath(storage_active_topic['href']) != canonicalPath(current_topic_href)) {
        if (current_location == "/") {
            if (storage_active_topic['hash'].length > 0) {
                window.location.href = canonicalPath(storage_active_topic['href']) + storage_active_topic['hash'];
            }
            else {
                window.location.href = canonicalPath(storage_active_topic['href']);
            }
            return;
        }
        else {
            storage_active_topic['href'] = current_topic_href;
            storage_active_topic['topic'] = current_topic_id;
            storage_active_topic['hash'] = current_hash;
            localStorage.setItem("active_topic", JSON.stringify(storage_active_topic));
        }
    }
    else {
        storage_active_topic['hash'] = current_hash;
        localStorage.setItem("active_topic", JSON.stringify(storage_active_topic));
    }

    let target_id = storage_active_topic['topic'];
    document.querySelectorAll("#"+target_id).forEach(el => el.classList.add("active_topic"));
    if (storage_active_topic['hash'].length > 0) {
        let hash_class = '.'+storage_active_topic['hash'].split("#")[1]+'-tag';
        $(hash_class).addClass("is-active");
    }
    else {
        document.querySelectorAll("#"+target_id).forEach(el => el.classList.add("is-active"));
    }

    //Set the dropdowns. HOME is a link, so only click accordion buttons.
    let active_section = "#"+storage_active_topic['topic'].split("_")[0];
    localStorage.setItem("nav_show",active_section);
    let sectionButton = $(active_section+"-button");
    if (sectionButton.is("button") && storage_active_topic['hash'].length == 0 && current_location != "/") {
        sectionButton.click();
    }
}

function add_listeners() {
    const els2 = document.querySelectorAll('.menu-topic');
    els2.forEach(el => el.addEventListener('click', menu_topic_click));
    //const els3 = document.querySelectorAll('.home-nav-button');
    //els3.forEach(el => el.addEventListener('click', home_nav_button_click));
}

function xhome_nav_button_click(event) {
    //If the button is not collapsed, just collapse it
    let myID = $(this).attr('id').split('-')[0];
    if (!$(myID+"-accordion").hasClass('collapsed')) {
        $(myID+"-accordion").collapse('hide');
    }
    else {
        $(myID+"-accordion").collapse('show');
    }
}

function menu_topic_click(event) {
    //Save open menu items to local storage
    //event.stopPropagation();
    //event.stopImmediatePropagation();
    let target = $(this).attr('id');
    let href = $(this).attr('href');
    let hash = "";
    if (href.includes("#")) {
        hash = "#"+href.split("#")[1];
        href = href.split("#")[0];
        //Update the target to the active topic
        target = $('.active_topic').attr('id');
    }
    let storage_active_topic = localStorage.getItem("active_topic");
    if (!storage_active_topic) {
        storage_active_topic = {"topic":target, "href":href, "hash":hash};
        localStorage.setItem("active_topic", JSON.stringify(storage_active));
    }
    else {
        storage_active_topic = JSON.parse(storage_active_topic);
    }
    let current_topic = storage_active_topic['topic'];
    if ((target == current_topic) && (hash == storage_active_topic['hash'])) {
        event.stopPropagation();
        event.preventDefault();
        return;
    }
    $('.menu-topic').removeClass("active_topic");
    $('.menu-topic').removeClass("is-active");
    if (!target) {
        target = pathToId(window.location.pathname);
        href = window.location.pathname;
        hash = window.location.hash;
        //Expand the new section 
        let section = "#"+target.split("_")[0];
        localStorage.setItem('nav_show', section);
        $(section+"-button").click();
    }

    $(this).addClass("active_topic");
    if (hash.length > 0) {
        let hash_class = '.'+hash.split("#")[1]+'-tag';
        $(hash_class).addClass("is-active");
    }
    else {
        $(this).addClass("is-active");
    }
    localStorage.setItem("active_topic", JSON.stringify({"topic":target, "href":href, "hash":hash}));
    if ($('.navbar-burger').is(':visible')) {
         $('.navbar-burger').removeClass('is-active');
         $('.navbar-menu').removeClass('is-active');
    }
}

function check_each_dt() {
    $('*[id*=dt-data]:visible').each(function() {
        let dt_id = $(this).data('id');
        let dt_name = '#datatable-'+dt_id;
        if (! $.fn.dataTable.isDataTable(dt_name)) {
            let config = $(this).data('config');
            let items = config.split(';');
            let config_obj = {};
            for (var item of items) {
                if (item.includes('fixedColumns')) {
                    config_obj[item.split(':')[0]] = {'start': parseInt(item.split(':')[1])};
                }
                else {
                    config_obj[item.split(':')[0]] = item.split(':')[1];
                }
            }
            new DataTable(dt_name,{
                ...config_obj,
                ...{
                    scrollY: '300px',
                    ordering: false,
                    paging: false,
                    searching: false,
                    responsive: true
                },
            });
        }
        else {
            $(dt_name).DataTable().columns.adjust();
        }
    });
}