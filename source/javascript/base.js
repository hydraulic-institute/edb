
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

function setup_menu() {      
    //Update the menu to show the active topic and any uncollapsed parents
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
    let active_section = "#"+storage_active_topic['topic'].split("_")[0];
    localStorage.setItem("nav_show",active_section);
    $(active_section+"-button").click();
}

function add_listeners() {
    const els2 = document.querySelectorAll('.menu-topic');
    els2.forEach(el => el.addEventListener('click', menu_topic_click));
}

function menu_topic_click(event) {
    //Save open menu items to local storage
    //event.stopPropagation();
    //event.stopImmediatePropagation();
    let target = $(this).attr('id');
    let href = $(this).attr('href');
    let current_topic = JSON.parse(localStorage.active_topic)['topic'];
    if (target == current_topic) {
        event.stopPropagation();
        event.preventDefault();
        return;
    }
    $('.menu-topic').removeClass("active_topic");
    $('.menu-topic').removeClass("is-active");
    if (!target) {
        target = pathToId(window.location.pathname);
        href = window.location.pathname;
        //Expand the new section 
        let section = "#"+target.split("_")[0];
        localStorage.setItem('nav_show', section);
        $(section+"-button").click();
    }
    $("#"+target).addClass("is-active");
    $("#"+target).addClass("active_topic");
    localStorage.setItem("active_topic", JSON.stringify({"topic":target, "href":href}));

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