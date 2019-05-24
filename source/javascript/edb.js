Vue.component('chart', {
    props: ['chart_key', 'title', 'chart'],
    data: function () {
        return {
            chart_data: null
        };
    },
    template: '<div><h1>CHART {{title}}</h1><pre>{{JSON.stringify(chart_data, null, 2)}}</pre></div>',
    mounted: function () {
        console.log("Mounted a Chart");
        this.chart_data = JSON.parse(this.chart);
        console.log(this.chart_data);
        const x_axis = this.chart_data.x.data;
        x_axis.unshift('x')
        columns = [x_axis];
        for (const series of this.chart_data.series) {
            const series_data = series.data;
            series_data.unshift(series.title);
            columns.push(series_data);
        }
        console.log(x_axis)
        let config = {
            bindto: this.$el,

            data: {
                x: 'x',
                columns: columns
            }
        }
        c3.generate(config);
    },
});

new Vue({
    el: '#vue',
    delimiters: ['${', '}'],
    data: {
        unit_set: 'us'
    },

    mounted: function () {
        console.log("EDB mounted, loading unit set from local storage");

        if (typeof (Storage) !== "undefined") {
            const stored = localStorage.getItem("unit-set");
            console.log("Unit set currently set to " + stored);
            if (stored === 'us') {
                this.unit_set = 'us';
            } else if (stored === 'metric') {
                this.unit_set = 'metric';
            }
        } else {
            console.log("Local storage not available on this browser - unit sets will need to switch manually");
        }
    },

    computed: {
        us_visible() {
            return this.unit_set === 'us';
        },
        metric_visible() {
            return this.unit_set === 'metric';
        },
    },

    methods: {
        to_us() {
            this.unit_set = 'us';
            localStorage.setItem("unit-set", this.unit_set);
        },
        to_metric() {
            this.unit_set = 'metric';
            localStorage.setItem("unit-set", this.unit_set);
        }
    }
});