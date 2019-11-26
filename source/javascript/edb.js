/* Handles hamburger button toggles */
document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function (el) {
            el.addEventListener('click', function () {

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
            if (!_content) return "";
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

Vue.component('unit-value', {
    delimiters: ['${', '}'],
    props: ['value', 'metric_factor', 'precision'],
    template: '<span>${converted_value}</span>',
    mounted: function () {

    },
    computed: {
        converted_value: function () {
            return (this.active_factor * this.value).toFixed(this.active_precision);
        },
        active_precision: function () {
            if (this.precision === undefined) {
                return 3;
            } else {
                return this.precision;
            }
        },
        active_factor: function () {
            if (this.metric_factor === undefined) {
                return 1;
            } else {
                return this.metric_factor;
            }
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
            viscosity: null,
            local_loading: false
        };
    }, //   
    template: '#friction-loss-calculator-template',
    mounted: function () {
        console.log("Friction Loss Calculator mounted");
        const v = this;
        axios.get("/statics/friction-loss-materials.json")
            .then(function (response) {
                v.data = response.data;
                //console.log(JSON.stringify(this.materials, null, 2));
                v.materials = [];
                for (const m in v.data) v.materials.push(m);
                v.local_loading = true;
                Vue.set(v, 'material', localStorage.getItem('material'));
                console.log(localStorage.getItem('nominal_size'));
                Vue.set(v, 'nominal_size', localStorage.getItem('nominal_size'));
                Vue.set(v, 'schedule', localStorage.getItem('schedule'));
                Vue.set(v, 'flow', localStorage.getItem('flow'));
                Vue.set(v, 'length', localStorage.getItem('length'));
                Vue.set(v, 'viscosity', localStorage.getItem('viscosity'));
                Vue.nextTick(function () {
                    v.local_loading = false;
                });


            }).catch(function (err) {
                console.log(err);
                console.error('Friction loss material data could not be downloaded.')
            })
    },
    methods: {

        Reynolds: function (flow) {
            if (!this.entry) return NaN;
            const id = this.entry[5];
            const velocity = (flow * 0.4085) / (id * id);
            return id * velocity / this.viscosity;
        },
    },
    computed: {

        results: function () {
            if (!this.entry) return [];
            if (!this.flow) return [];
            if (!this.viscosity) return [];
            if (this.viscosity <= 0) return [];
            const phi = (1 + Math.sqrt(5)) / 2;
            const id = this.entry[5];
            const eps = this.entry[6];
            const steps = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3];
            const results = [];
            for (const factor of steps) {
                const flow = this.flow * factor;
                const velocity = (flow * 0.4085) / (id * id);
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
        },
        results_revision: function () {
            if (!this.entry) return [];
            if (!this.flow) return [];
            if (!this.viscosity) return [];

            const SG = 1;
            const specific_weight = SG * 62.43;
            const WT = 0.25;
            const D = (this.nominal_size - WT * 2) / 12;
            const A = Math.PI * D * D / 4;
            const epsilon = this.entry[6];
            const steps = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3];
            const results = [];
            for (const factor of steps) {
                // converting to ft3/sec
                const flow = this.flow * factor * 0.1336806 / 60;
                const velocity = flow / A;
                const kyn_viscosity = 0.00067197 * this.viscosity / specific_weight;
                const Re = velocity * D / kyn_viscosity;
                const sample = {
                    flow: this.flow * factor,
                    velocity: velocity,
                    reynolds: Re,
                    reference: Math.abs(factor - 1) < 0.001
                }
                const f_lam = 64 / Re;
                if (Re < 2000) {
                    // Laminar

                    sample.laminar = true;
                    sample.friction_loss = f_lam;
                    results.push(sample);
                } else {

                    let fi = 1 / 100000;
                    let f = fi;

                    const f1calc = function (f) {
                        return 1 / Math.sqrt(f);
                    }
                    const f2calc = function (f) {
                        return -2 * Math.log(epsilon / (3.7 * D) + 2.51 / (Re * Math.sqrt(f))) / Math.log(10);
                    }
                    let f1 = f1calc(f);
                    let f2 = f2calc(f);
                    let diff = f1 - f2

                    while (diff > 1 / 1000) {
                        f = f + fi
                        f1 = f1calc(f);
                        f2 = f2calc(f);
                        diff = f1 - f2;
                    }

                    sample.friction_loss = f;
                    sample.laminar = false;
                    results.push(sample);
                }
            }

            localStorage.setItem('material', this.material);
            localStorage.setItem('nominal_size', this.nominal_size);
            localStorage.setItem('schedule', this.schedule);
            localStorage.setItem('flow', this.flow);
            localStorage.setItem('length', this.length);
            localStorage.setItem('viscosity', this.viscosity);
            return results;
        }
    },
    watch: {
        material: function () {
            this.sizes = [];
            if (!this.local_loading) {
                console.log("Setting nominal size to null");
                this.nominal_size = null;
            }

            if (this.material) {
                for (const m in this.data[this.material].nominal_sizes) this.sizes.push(m);
            } else {
                this.schedule = null;
                this.entry = null;
            }

        },
        nominal_size: function () {

            this.schedules = [];
            if (!this.local_loading) {
                this.schedule = null;
            }
            if (this.nominal_size) {
                for (const m in this.data[this.material].nominal_sizes[this.nominal_size].schedules) this.schedules.push(m);
            } else {

                this.entry = null;
            }

        },
        schedule: function () {

            if (this.schedule && this.nominal_size && this.material) {
                this.entry = this.data[this.material].nominal_sizes[this.nominal_size].schedules[this.schedule];
            } else {
                this.entry = null;
            }
        }
    }
});

Vue.component('converter', {
    delimiters: ['${', '}'],
    data: function () {
        return {
            units: [],
            unit: null,
            from: 1,
            to: 1,
            unit_from: null,
            unit_to: null
        };
    }, //   
    template: '#converter-template',
    mounted: function () {
        const v = this;
        axios.get("/statics/unit-conversions.json")
            .then(function (response) {
                v.units = response.data;
            }).catch(function (err) {
                console.log(err);
                console.error('Unit conversion data could not be downloaded.')
            })
    },
    methods: {
        recalculate: function () {
            const special = isNaN(this.unit_from.factor) || isNaN(this.unit_to.factor);
            if (special) {
                switch (this.unit.measure) {
                    case 'Temperature':
                        this.recalc_temperature();
                        break;
                }

            } else {
                const standard = this.from / this.unit_from.factor;
                this.to = (standard * this.unit_to.factor).toFixed(this.unit.decimals);
            }
        },
        recalc_temperature() {
            let celsius;
            switch (this.unit_from.factor) {
                case 'C':
                    celsius = parseFloat(this.from);
                    break;
                case 'F':
                    celsius = (parseFloat(this.from) - 32) / 1.8;
                    break;
                case 'K':
                    celsius = parseFloat(this.from) - 273.15;
                    break;
                case 'R':
                    celsius = (parseFloat(this.from) - 491.67) / 1.8;
                    break;
            }
            switch (this.unit_to.factor) {
                case 'C':
                    this.to = celsius;
                    break;
                case 'F':
                    this.to = celsius * 1.8 + 32;
                    break;
                case 'K':
                    this.to = celsius + 273.15;
                    break;
                case 'R':
                    this.to = celsius * 1.8 + 491.67
                    break;
            }
            this.to = this.to.toFixed(this.unit.decimals);
        }
    },
    computed: {},
    watch: {
        unit: function () {
            if (this.unit) {
                this.unit_from = this.unit.units[0];
                this.unit_to = this.unit.units[1];
                this.recalculate();
            }
        },
        from: function () {
            this.recalculate();
        },
        unit_from: function () {
            this.recalculate();
        },
        unit_to: function () {
            this.recalculate();
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

            setTimeout(function () {
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

        const v = this;
        // Download the search topic JSON file...
        axios.get("/statics/haystack.json")
            .then(function (response) {
                v.haystack = response.data;
                v.fuse = new Fuse(v.haystack, v.search_options);
                if (typeof (Storage) !== "undefined") {
                    v.needle = localStorage.getItem("needle")
                }
            }).catch(function (err) {
                console.error('Search is disabled, could not load topic list');
                console.error(err);
            })



    },

    computed: {
        search_display() {
            return this.search_results !== undefined;
        },
        results_for_display() {
            const v = this;
            if (this.search_display) {

                return this.search_results.map(function (r) {
                    const paths = v.haystack.map(function (g) {
                        return g.path;
                    });
                    const h = paths.indexOf(r);
                    return v.haystack[h];
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