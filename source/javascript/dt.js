    
    $('*[id*=dt-data]').each(function() {
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
        let dt_id = $(this).data('id');
        let dt_name = '#datatable-'+dt_id;
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
    });

    $("[data-bs-toggle]").on('click',function(e){
        $('*[id*=dt-data]:visible').each(function() {
            let dt_name = '#datatable-'+$(this).data('id');
            $(dt_name).DataTable().columns.adjust();
        });
    });