    
   //DEPRECATED - MOVED TO BASE.JS
    $(window).resize(function() {
        check_each_dt();
    });

    $(window).on('pageshow',function()  {
        check_each_dt();
    });

    $("[data-bs-toggle]").on('click',function(e){
        check_each_dt();
    });
    
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

