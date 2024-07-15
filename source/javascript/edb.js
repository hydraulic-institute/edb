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



const G = 32.174;

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
        let y_axis = null;
        for (const series of this.chart_data.series) {
            const series_data = series.data;
            series_data.unshift(series.title);
            columns.push(series_data);
            y_axis = series.title;
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
                },
                y: {
                    label: {
                        show: true,
                        text: y_axis,
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
        sigfigs(n) {
            n = Math.abs(String(n).replace(".", "")); //remove decimal and make positive
            if (n == 0) return 0;
            while (n != 0 && n % 10 == 0) n /= 10; //kill the 0s at the end of n

            return Math.floor(Math.log(n) / Math.log(10)) + 1; //get number of digits
        },
        swap() {
            const t = this.unit_from;
            this.unit_from = this.unit_to;
            this.unit_to = t;
        },
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
                this.to = (standard * this.unit_to.factor).toPrecision(this.sig_fig_output);
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
            this.to = this.to.toPrecision(this.sig_fig_output);
        }
    },
    computed: {
        sig_fig_output() {
            const input = this.sigfigs(this.from);
            return Math.max(6, input + 2);
        }
    },
    watch: {
        unit: function () {
            if (this.unit) {
                this.unit_from = this.unit.units[0];
                if ('default_to' in this.unit) {
                    this.unit_to = this.unit.default_to;
                } else {
                    this.unit_to = this.unit.units[1];
                }
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

Vue.component('viscosity-converter', {
    delimiters: ['${', '}'],
    data: function () {
        return {
            units: [],
            from_value: null,
            to_value: null,
            from_unit: null,
            to_unit: null,
            sg: 1,
            steps: [],
            show_steps: false,
            kinematic_warning: null

        };
    }, //   
    template: '#viscosity-converter-template',
    mounted: function () {
        const v = this;
        axios.get("/statics/viscosity.json")
            .then(function (response) {
                v.units = response.data;
                v.from_unit = v.units.filter(v => v.category == "D")[0];
                v.to_unit = v.units.filter(v => v.category == "K")[0];
                v.from_value = 1
            }).catch(function (err) {
                console.log(err);
                console.error('Viscosity unit data could not be downloaded.')
            })
    },
    methods: {
        swap() {
            const tmp = this.from_unit;
            this.from_unit = this.to_unit;
            this.to_unit = tmp;
        },
        sigfigs(n) {
            n = Math.abs(String(n).replace(".", "")); //remove decimal and make positive
            if (n == 0) return 0;
            while (n != 0 && n % 10 == 0) n /= 10; //kill the 0s at the end of n

            return Math.floor(Math.log(n) / Math.log(10)) + 1; //get number of digits
        },
        ssu(cst) {
            return 4.6324 * cst + ((1 + 0.03264 * cst) / ((3930.2 + 262.7 * cst + 23.97 * cst * cst + 1.646 * cst * cst * cst) * 1e-5));
        },
        dd() {
            const input = parseFloat(this.from_value);
            const centipoise = (input * this.from_unit.toPrime).toPrecision(this.output_sig_fig);
            if (this.from_unit.id != 1)
                this.steps.push(`${input} ${this.from_unit.label} x ${this.from_unit.toPrime} = ${centipoise} Centipoise`);

            const output = (centipoise / this.to_unit.toPrime).toPrecision(this.output_sig_fig);
            if (this.to_unit.id != 1)
                this.steps.push(`${centipoise} Centipoise / ${this.to_unit.toPrime} = ${output} ${this.to_unit.label}`);
            this.to_value = output;
        },
        dk() {
            const input = parseFloat(this.from_value);
            //-----------------------------------
            // Find significant figures of input
            const centipoise = (input * this.from_unit.toPrime).toPrecision(this.output_sig_fig);
            if (this.from_unit.id != 1)
                this.steps.push(`${input} ${this.from_unit.label} x ${this.from_unit.toPrime} = ${centipoise} Centipoise`);
            const centistoke = (centipoise / parseFloat(this.sg)).toPrecision(this.output_sig_fig);
            this.steps.push(`${centipoise} Centipoise / ${this.sg} = ${centistoke} Centistoke`);

            //-----------------------------------
            // Set precision with significant figures
            let output;
            if (this.to_unit.toPrime === "ssu100") {
                output = this.ssu(centistoke).toPrecision(this.output_sig_fig);
            } else {
                output = (centistoke / this.to_unit.toPrime).toPrecision(this.output_sig_fig);
            }
            if (this.to_unit.id != 5)
                this.steps.push(`${centistoke} Centistoke / ${this.to_unit.toPrime} = ${output} ${this.to_unit.label}`);
            this.to_value = output;

            if (this.to_unit.hasOwnProperty('cSt_cuttoff') && this.to_unit.cSt_cuttoff_max && centistoke > this.to_unit.cSt_cuttoff_max) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke < ${this.to_unit.cSt_cuttoff_max}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
            }
            if (this.to_unit.hasOwnProperty('cSt_cuttoff_min') && this.to_unit.cSt_cuttoff_min && centistoke < this.to_unit.cSt_cuttoff_min) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke > ${this.to_unit.cSt_cuttoff_min}.  The input you entered (${centistoke}) is below this limit, consider using a different unit of measure`;
            }
        },
        kk() {
            const input = parseFloat(this.from_value);
            //-----------------------------------
            // Find significant figures of input
            const centistoke = (input * this.from_unit.toPrime).toPrecision(this.output_sig_fig);
            if (this.from_unit.id != 5)
                this.steps.push(`${input} ${this.from_unit.label} x ${this.from_unit.toPrime} = ${centistoke} Centistoke`);

            //-----------------------------------
            // Set precision with significant figures
            let output;
            if (this.to_unit.toPrime === "ssu100") {
                output = this.ssu(centistoke).toPrecision(this.output_sig_fig);
            } else {
                output = (centistoke / this.to_unit.toPrime).toPrecision(this.output_sig_fig);
            }
            if (this.to_unit.id != 5)
                this.steps.push(`${centistoke} Centistoke / ${this.to_unit.toPrime} = ${output} ${this.to_unit.label}`);
            this.to_value = output;

            if (this.to_unit.hasOwnProperty('cSt_cuttoff') && this.to_unit.cSt_cuttoff_max && centistoke > this.to_unit.cSt_cuttoff_max) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke < ${this.to_unit.cSt_cuttoff_max}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
            }
            if (this.to_unit.hasOwnProperty('cSt_cuttoff_min') && this.to_unit.cSt_cuttoff_min && centistoke < this.to_unit.cSt_cuttoff_min) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke > ${this.to_unit.cSt_cuttoff_min}.  The input you entered (${centistoke}) is below this limit, consider using a different unit of measure`;
            }
        },
        kd() {
            const input = parseFloat(this.from_value);
            //-----------------------------------
            // Find significant figures of input
            const centistoke = (input * this.from_unit.toPrime).toPrecision(this.output_sig_fig);
            if (this.from_unit.id != 5)
                this.steps.push(`${input} ${this.from_unit.label} x ${this.from_unit.toPrime} = ${centistoke} Centistoke`);

            if (this.to_unit.hasOwnProperty('cSt_cuttoff') && this.to_unit.cSt_cuttoff && centistoke > this.to_unit.cSt_cuttoff) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke < ${this.to_unit.cSt_cuttoff}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
            }
            const centipoise = (input * parseFloat(this.sg)).toPrecision(this.output_sig_fig);
            this.steps.push(`${input} Centistokes * ${this.sg} = ${centipoise} Centipoise`);
            const output = (centipoise / this.to_unit.toPrime).toPrecision(this.output_sig_fig);
            if (this.to_unit.id != 1)
                this.steps.push(`${centipoise} Centipoise / ${this.to_unit.toPrime} = ${output} ${this.to_unit.label}`);
            this.to_value = output;
        },
        calculate() {
            this.steps = [];
            this.kinematic_warning = null;
            if (this.to_unit && this.from_unit) {
                if (this.from_unit.category == 'D' && this.to_unit.category == 'D') {
                    this.dd();
                } else if (this.from_unit.category == 'D' && this.to_unit.category == 'K') {
                    this.dk();
                } else if (this.from_unit.category == 'K' && this.to_unit.category == 'K') {
                    this.kk();
                } else if (this.from_unit.category == 'K' && this.to_unit.category == 'D') {
                    this.kd();
                } else {
                    console.error('Invalid unit conversion');
                }

            }
            // else units aren't fully specified.
            console.log("Calculating " + this.from_unit.label + " to " + this.to_unit.label);
        }
    },
    computed: {
        output_sig_fig() {
            const input = parseFloat(this.from_value);
            const sigfig = this.sigfigs(input);
            return Math.max(6, sigfig + 2);
        },
        show_sg: function () {
            if (this.from_unit && this.to_unit) {
                return this.from_unit.category != this.to_unit.category;
            } else {
                return false;
            }
        }
    },
    watch: {
        to_unit: function () {
            this.calculate();
        },
        from_value: function () {
            this.calculate();
        },
        from_unit: function () {
            this.calculate();
        },
        sg: function () {
            this.calculate();
        },
    }
});

var appView = new Vue({
    el: '#vue',
    delimiters: ['${', '}'],
    data: {
        unit_set: 'us',
        isChecked: false,
        // This will be loaded async
        needle: null,
        haystack: null,
        search_options: {
            threshold: 0.2,
            shouldSort: true,
            includeScore: true,
            tokenize: true,
            includeMatches: true,
            keys: [{
                name: 'title',
                weight: 0.5
            }, {
                name: 'slug',
                weight: 0.2
            }, {
                name: 'text',
                weight: 0.3
            }],
            id: 'path'
        },
        fuse: null,
        paths: [],
        search_results: undefined,
        marks: [],
        mark_index: 0
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

            } else if (this.haystack) {
                // Scroll to top of screen to ensure the search results appear where they should.
                //console.log('needle ' + this.needle);
                this.search_results = this.fuse.search(this.needle);
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("needle", this.needle);
                }
            }
            this.mark_search();


        }
    },
    mounted: function () {
        if (typeof (Storage) !== "undefined") {
            const stored = localStorage.getItem("unit-set");
            if (stored === 'us') {
                this.unit_set = 'us';
                this.isChecked = false;
            } else if (stored === 'metric') {
                this.unit_set = 'metric';
                this.isChecked = true;
            }
            else {
                this.unit_set = 'us';
                localStorage.setItem("unit-set",'us');
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
                v.paths = v.haystack.map(function (g) {
                    //console.log('path '+g.path);
                    return g.path;
                });
                //console.log("new fuse search");
                if (typeof (Storage) !== "undefined") {
                    v.needle = localStorage.getItem("needle")
                    //console.log('needle '+v.needle);
                }
            }).catch(function (err) {
                console.error('Search is disabled, could not load topic list');
                console.error(err);
            })

        // Scroll selected topic into view
        const active = document.getElementsByClassName("active_topic");
        //console.log('active '+active.length);
        for (const element of active) {
            element.scrollIntoView({
                block: "center"
            });
        }

    },

    computed: {
        search_display() {
            //console.log('search_display '+this.search_results !== undefined);
            return this.search_results !== undefined;
        },
        results_for_display() {
            const v = this;
            if (this.search_display) {
                //console.log('results_for_display');
                return this.search_results.map(function (r) {
                    const h = v.paths.indexOf(r.item);
                    const hit = v.haystack[h];
                    //console.log('hit path ['+hit.path+' ] title ['+hit.title+'] slug ['+hit.slug+']');
                    return hit;
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
        handle_unit_toggle() {
            console.log("Got ToggleChecked:", this.isChecked);
            if (this.isChecked) {
                this.to_metric();
            } else {
                this.to_us();
            }   
        },
        to_us() {
            this.isChecked = false;
            this.unit_set = 'us';
            localStorage.setItem("unit-set", this.unit_set);
            this.$root.$emit('unit-change', 'us');
        },
        to_metric() {
            this.isChecked = true;
            this.unit_set = 'metric';
            localStorage.setItem("unit-set", this.unit_set);
            this.$root.$emit('unit-change', 'metric');
        },
        jump_to_mark() {
            const existing = document.querySelectorAll(".current_mark");
            existing.forEach(function (e) {
                e.classList.remove("current_mark");
            });
            if (this.marks[this.mark_index]) {
                //window.scrollBy(0, -100)
                this.marks[this.mark_index].classList.add("current_mark");
                var parent = this.marks[this.mark_index].closest('table');
                if (parent) {
                    $('html').scrollTop(parent.offsetTop)
                }
                this.marks[this.mark_index].scrollIntoView({block: "center"});  
                //console.log('jump to mark ' + this.mark_index);
            }
        },
        mark_jump_back() {
            this.mark_index--;
            this.jump_to_mark();
        },
        mark_jump_next() {
            this.mark_index++;
            this.jump_to_mark();
        },
        mark_search() {
            const markInstance = new Mark(document.querySelector("#content"));
            const v = this;
            v.marks = [];
            v.mark_index = 0;
            markInstance.unmark({
                done: function () {
                    //console.log('mark_search');
                    if (v.search_display) {
                        markInstance.mark(v.needle, {
                            separateWordSearch: true,
                            done: function () {
                                v.marks = document.querySelectorAll("mark");
                                //console.log('mark_search done');
                                v.jump_to_mark();
                            }
                        });
                    }
                }
            });



        }
    }
});