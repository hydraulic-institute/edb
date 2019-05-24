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