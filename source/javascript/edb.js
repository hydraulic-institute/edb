/* Handles hamburger button toggles */
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});


Vue.component('chart', {
    props: ['chart_key', 'title', 'chart'],
    data: function () {
        return {
            chart_data: null
        };
    },
    template: '<div><h1>CHART {{title}}</h1><pre>{{JSON.stringify(chart_data, null, 2)}}</pre></div>',
    mounted: function () {
        this.chart_data = JSON.parse(this.chart);
        const x_axis = this.chart_data.x.data;
        x_axis.unshift('x');
        columns = [x_axis];
        for (const series of this.chart_data.series) {
            const series_data = series.data;
            series_data.unshift(series.title);
            columns.push(series_data);
        }
        const x_title = this.chart_data.x.title;
        let config = {
            bindto: this.$el,

            data: {
                x: 'x',
                columns: columns,
            },
            axis: {
                x: {
                    label: {
                        text: x_title,
                        position: 'outer-center'
                    }
                }
            },
            tooltip: {
                format: {
                    title: function (d) {
                        return x_title + ": " + d
                    },

                }
            }
        }
        c3.generate(config);
    },
});


Vue.component('units', {
    props: ['units', 'us', 'metric'],
    data: function () {
        return {
            chart_data: null
        };
    }, //   
    template: '<span><span v-if="units==\'us\'" v-html="us_content"></span><span v-else v-html="metric_content"></span></span>',
    mounted: function () {
        console.log(this.units)
    },
    methods: {
        process_content: function (_content) {
            let content = _content.slice(0);
            const replacements = [{
                token: '^',
                tag: 'sup'
            }, {
                token: '_',
                tag: 'sub'
            }];

            for (const r of replacements) {
                let i = 0;
                let started = false;

                while (i < content.length) {
                    if (content[i] == r.token) {
                        if (started) {
                            content = content.slice(0, i) + `</${r.tag}>` + content.slice(i + 1);
                            started = false;
                        } else {
                            content = content.slice(0, i) + `<${r.tag}>` + content.slice(i + 1);
                            started = true;
                        }
                    }
                    i++;
                }
            }

            return content;
        }
    },
    computed: {
        us_content: function () {
            return this.process_content(this.us);
        },
        metric_content: function () {
            return this.process_content(this.metric);
        }
    }
});


Vue.component('friction-loss-calculator', {
    delimiters: ['${', '}'],
    data: function () {
        return {
            calculated: false,
            data: null,
            materials: null,
            sizes: null,
            schedules: null,
            material: null,
            nominal_size: null,

            schedule: null,
            entry: null,

            flow: null,
            length: null,
            viscosity: null
        };
    }, //   
    template: '#friction-loss-calculator-template',
    mounted: function () {
        console.log("Friction Loss Calculator mounted");
        axios.get("/statics/friction-loss-materials.json")
            .then((response) => {
                this.data = response.data;
                //console.log(JSON.stringify(this.materials, null, 2));
                this.materials = [];
                for (const m in this.data) this.materials.push(m);


            }).catch((err) => {
                console.log(err);
                console.error('Friction loss material data could not be downloaded.')
            })
    },
    methods: {
        calculate() {
            console.log("O :PBR <TTU")
        },
        Reynolds: function (flow) {
            if (!this.entry) return NaN;
            const id = this.entry[5];
            const velocity = flow / (Math.PI * Math.pow(id / 2, 2));
            return id * velocity / this.viscosity;
        },
    },
    computed: {

        results: function () {
            if (!this.entry) return [];
            const phi = (1 + Math.sqrt(5)) / 2;
            const id = this.entry[5];
            const eps = this.entry[6];
            const steps = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3];
            const results = [];
            for (const factor of steps) {
                const flow = this.flow * factor;
                const velocity = flow / (Math.PI * Math.pow(id / 2, 2));
                const Re = this.Reynolds(flow);
                const sample = {
                    flow: flow,
                    velocity: velocity,
                    reynolds: Re
                }
                const f_lam = 64 / Re;
                if (Re < 2000) {
                    sample.laminar = true;
                    sample.friction_loss = f_lam;
                    results.push(sample);
                } else {
                    const tol = f_lam / 100000;
                    let a = 0;
                    let b = 10;
                    let c = b - (b - a) / phi;
                    let d = a + (b - a) / phi;
                    let Fc = 1 / Math.sqrt(c) + 2 * Math.log(eps / (3.7 * id) + 2.52 / (Re * Math.sqrt(c)));
                    let Fd = 1 / Math.sqrt(d) + 2 * Math.log(eps / (3.7 * id) + 2.52 / (Re * Math.sqrt(d)));
                    let i = 0;

                    while (Math.abs(Fc - Fd) > tol) {
                        if (Fc < Fd) {
                            b = d;
                        } else {
                            a = c;
                        }
                        c = b - (b - a) / phi;
                        d = a + (b - a) / phi;
                        Fc = 1 / Math.sqrt(c) + 2 * Math.log(eps / (3.7 * id) + 2.52 / (Re * Math.sqrt(c)));
                        Fd = 1 / Math.sqrt(d) + 2 * Math.log(eps / (3.7 * id) + 2.52 / (Re * Math.sqrt(d)));
                        i = i++;
                    }

                    c = b - (b - a) / phi;
                    d = a + (b - a) / phi;

                    sample.friction_loss = (Fc + Fd) / 2;
                    sample.laminar = false;
                    results.push(sample);
                }
            }
            return results;
        }
    },
    watch: {
        material: function () {
            this.sizes = [];
            this.nominal_size = null
            if (this.material) {
                for (const m in this.data[this.material].nominal_sizes) this.sizes.push(m);
            } else {
                this.schedule = null;
                this.entry = null;
            }

        },
        nominal_size: function () {
            this.schedules = [];
            this.schedule = null;
            if (this.nominal_size) {
                for (const m in this.data[this.material].nominal_sizes[this.nominal_size].schedules) this.schedules.push(m);
            } else {

                this.entry = null;
            }

        },
        schedule: function () {
            if (this.schedule && this.nominal_size && this.material) {
                this.entry = this.data[this.material].nominal_sizes[this.nominal_size].schedules[this.schedule];
                console.log(this.entry);
            } else {
                this.entry = null;
            }
        }
    }
});



new Vue({
    el: '#vue',
    delimiters: ['${', '}'],
    data: {
        unit_set: 'us',
        // This will be loaded async
        needle: null,
        haystack: null,
        search_options: {
            threshold: 0.4,
            shouldSort: true,
            tokenize: true,
            keys: [{
                name: 'title',
                weight: 0.5
            }, {
                name: 'slug',
                weight: 0.3
            }, {
                name: 'text',
                weight: 0.2
            }],
            id: 'path'
        },
        fuse: null,
        search_results: undefined
    },
    watch: {
        unit_set: function () {
            setTimeout(() => {
                if (typeof (Event) === 'function') {
                    // modern browsers
                    window.dispatchEvent(new Event('resize'));
                } else {
                    // for IE and other old browsers
                    // causes deprecation warning on modern browsers
                    var evt = window.document.createEvent('UIEvents');
                    evt.initUIEvent('resize', true, false, window, 0);
                    window.dispatchEvent(evt);
                }
            }, 5)
        },
        needle: function () {
            if (!this.needle || !this.needle.trim()) {
                // Nothing in search box - kill the search results.
                this.search_results = undefined;
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("needle", "");
                }
                return;
            }
            if (this.haystack) {
                // Scroll to top of screen to ensure the search results appear where they should.

                this.search_results = this.fuse.search(this.needle);
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("needle", this.needle);
                }
            }
        }
    },
    mounted: function () {
        if (typeof (Storage) !== "undefined") {
            const stored = localStorage.getItem("unit-set");
            if (stored === 'us') {
                this.unit_set = 'us';
            } else if (stored === 'metric') {
                this.unit_set = 'metric';
            }
        } else {
            console.log("Local storage not available on this browser - unit sets will need to switch manually");
        }

        // Download the search topic JSON file...
        axios.get("/statics/haystack.json")
            .then((response) => {
                this.haystack = response.data;
                this.fuse = new Fuse(this.haystack, this.search_options);
                if (typeof (Storage) !== "undefined") {
                    this.needle = localStorage.getItem("needle")
                }
            }).catch((err) => {
                console.error('Search is disabled, could not load topic list');
            })



    },

    computed: {
        search_display() {
            return this.search_results !== undefined;
        },
        results_for_display() {
            if (this.search_display) {

                return this.search_results.map((r) => {
                    const paths = this.haystack.map(g => g.path);
                    const h = paths.indexOf(r);
                    return this.haystack[h];
                });

            } else {
                return []
            }
        },
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