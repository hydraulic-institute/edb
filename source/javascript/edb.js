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

Vue.component('friction-loss-calculator', {
    delimiters: ['${', '}'],
    data: function () {
        return {
            units: "-",
            calculated: false,
            data: null,
            materials: null,
            sizes: null,

            material: null,
            nominal_size: null,

            selector: null,
            selectors: null,
            selection: null,
            entry: null,

            flow: null,
            length: null,
            viscosity: 1,
            sg: 1,
            vka: 'kinematic',
            input_dynamic_v: 1,
            input_kinematic_v: 1,

            local_loading: false,

            saved_props: ['input_dynamic_v', 'input_kinematic_v', 'material', 'nominal_size', 'selection', 'flow', 'length', 'viscosity', 'sg', 'vka'],
        };
    }, //   
    template: '#friction-loss-calculator-template',
    mounted: function () {
        const v = this;
        this.$root.$on('unit-change', (value) => {
            this.units = value;
        });

        if (typeof (Storage) !== "undefined") {
            const stored = localStorage.getItem("unit-set");
            this.units = stored;
        } else {
            console.log("Local storage not available on this browser - unit sets will need to switch manually");
        }

        axios.get("/statics/friction-loss-materials-full.json")
            .then(function (response) {
                v.data = response.data;
                //console.log(JSON.stringify(this.materials, null, 2));
                v.materials = [];
                for (const m in v.data) v.materials.push(m);
                v.load_inputs();
            }).catch(function (err) {
                console.log(err);
                console.error('Friction loss material data could not be downloaded.')
            })
    },
    methods: {
        no_negative: function (e) {
            if (!((e.keyCode > 95 && e.keyCode < 106) ||
                (e.keyCode > 47 && e.keyCode < 58) ||
                e.keyCode == 190 || // period
                e.keyCode == 110 || // decimal point
                e.keyCode == 27 || // escape
                e.keyCode == 46 || // delete
                e.keyCode == 8)) { // backspace
                e.preventDefault();
                return false;
            }
        },
        load_inputs: function () {
            this.local_loading = true;
            for (const prop of this.saved_props) {
                if (localStorage.getItem(prop)) {
                    Vue.set(this, prop, localStorage.getItem(prop));
                }
            }
            if (!this.vka || this.vka == 'null') this.vka = 'kinematic';
            const v = this;
            Vue.nextTick(function () {
                v.local_loading = false;
            });
        },
        save_inputs: function () {
            for (const prop of this.saved_props) {
                localStorage.setItem(prop, this[prop]);
            }
            if (!this.vka) localStorage.setItem('vka', 'kinematic');
        },
        value_flowrate: function (value) {
            if (this.units == 'us') return value;
            else return value / 4.40286764029913; // convert to cubic meters / hr
        },
        value_velocity: function (value) {
            if (this.units == 'us') return value;
            else return value * 0.3048; // convert to m/sec
        },
        value_length_long: function (value) {
            if (this.units == 'us') return value;
            else return value * 0.3048; // convert to meters
        },
        value_length_short: function (value, digits) {
            const d = digits === undefined ? 2 : digits
            if (this.units == 'us') return value;
            else return (value * 25.4).toFixed(d); // convert in to mm
        },
        value_length_ft_mm: function (value, digits) {
            const d = digits === undefined ? 2 : digits
            if (this.units == 'us') return value;
            else return (value * 25.4 * 12).toFixed(d); // convert ft to mm
        },
        Reynolds: function (flow) {
            if (!this.entry) return NaN;
            const id = this.inner_diameter;
            const velocity = (flow * 0.4085) / (id * id);
            return id * velocity / this.absolute_viscosity;
        },
        head_loss: function (friction_factor, velocity_head) {
            return friction_factor * this.input_length_feet * 12 / this.inner_diameter * velocity_head;
        }
    },
    computed: {
        units_flowrate: function () {
            if (this.units == 'us') return 'gpm';
            else return 'm3/hr'
        },
        units_length_long: function () {
            if (this.units == 'us') return 'ft';
            else return 'm'
        },
        units_length_mid: function () {
            if (this.units == 'us') return 'in';
            else return 'cm'
        },
        units_length_short: function () {
            if (this.units == 'us') return 'in';
            else return 'mm'
        },
        units_length_ftmm: function () {
            if (this.units == 'us') return 'ft';
            else return 'mm'
        },
        units_velocity: function () {
            if (this.units == 'us') return 'ft/sec';
            else return 'm/sec'
        },
        input_flowrate_gpm: function () {
            if (this.units == 'us') return this.flow;
            else return this.flow * 4.40286764029913; // convert to meters
        },
        input_length_feet: function () {
            if (this.units == 'us') return this.length;
            else return this.length / 0.3048; // convert to meters
        },

        kinematic_viscosity: function () {
            // Returns viscosity in cSt
            if (this.vka == 'absolute') {
                // Convert from cP to cSt
                console.log("Converting from Cp to Cst");
                const kv = (this.viscosity / this.sg);
                console.log(kv + " " + this.vka);
                return kv;
            } else {
                // Already in cSt
                return this.viscosity;
            }
        },
        absolute_viscosity: function () {
            // returns viscosity in cP
            if (this.vka == 'absolute') {
                // Already in cP
                return this.viscosity;

            } else {
                // Convert from Cst to Cp
                return this.viscosity * this.sg;
            }
        },
        specific_weight: function () {
            return this.sg * 62.43;
        },
        inner_diameter: function () {
            if (this.entry) {
                return this.entry.id;
            }
        },
        epsilon: function () {
            if (this.entry) {
                return this.entry.epsilon;
            }
        },
        outer_diameter: function () {
            let x = this.nominal_size;
            if (this.entry) {
                return this.entry.od;
            }
        },
        specified: function () {
            return this.entry != null && (this.selector == null || (this.selector != null && this.selection != null));
        },
        results_revision: function () {
            if (!this.entry) {
                console.log("No entry");
                return [];
            }
            if (!this.flow) {
                console.log("No flow");
                return [];
            }
            if (!this.viscosity) {
                console.log("No viscosity");
                return [];
            }

            const D = this.inner_diameter / 12;
            const A = Math.PI * (D * D) / 4;
            const steps = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3];
            const results = [];
            for (const factor of steps) {
                // converting to ft3/sec
                const flow = this.input_flowrate_gpm * factor * 0.1336806 / 60;
                const velocity = flow / A;

                // kinematic viscosity is entered as cSt (mm2/sec), needs to 
                // be converted to ft2/second for the Re c alculation.
                const kv_ft_sec = this.kinematic_viscosity / 92903.04;
                const Re = velocity * D / kv_ft_sec;
                const sample = {
                    flow: this.input_flowrate_gpm * factor,
                    velocity: velocity,
                    velocity_head: velocity * velocity / (2 * G),
                    reynolds: Re.toFixed(0),
                    reference: Math.abs(factor - 1) < 0.001
                }

                const f_lam = 64 / Re;
                if (Re < 2000) {
                    // Laminar
                    sample.friction_loss = f_lam;
                    sample.laminar = true;
                } else {

                    // Turbulent
                    let fi = 1 / 100000;
                    let f = fi;
                    const v = this;
                    const f1calc = function (f) {
                        return 1 / Math.sqrt(f);
                    }
                    const f2calc = function (f) {
                        return -2 * Math.log(v.epsilon / (3.7 * D) + 2.51 / (Re * Math.sqrt(f))) / Math.log(10);
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
                }
                sample.head_loss = this.head_loss(sample.friction_loss, sample.velocity_head);

                if (factor == 1) {
                    console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
                    console.log("Full precision printout 100% flowrate");
                    console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
                    console.log("Flowrate (gpm):          " + sample.flow);
                    console.log("Reynolds:                " + sample.reynolds);
                    console.log("Fluid velocity (ft/sec)  " + sample.velocity);
                    console.log("Inner Diameter (in):     " + this.inner_diameter);
                    console.log("Length (ft):             " + this.length);
                    console.log("Velocity head (ft):      " + sample.velocity_head);
                    console.log("Friction factor (f):     " + sample.friction_loss);
                    console.log("Head loss (hf):          " + sample.head_loss);
                    console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
                }
                results.push(sample);
            }

            this.save_inputs();
            return results;
        }
    },
    watch: {
        input_dynamic_v: function () {
            console.log("Input dynamic changed - " + this.vka);
            if (this.vka == 'absolute') {
                // User input mode is dynamic, update _kinematic_v
                this.input_kinematic_v = this.input_dynamic_v / this.sg;
                this.viscosity = this.input_dynamic_v;
                console.log(" - set viscosity");
            }
        },
        input_kinematic_v: function () {
            console.log("Input kinematic changed - " + this.vka);
            if (this.vka != 'absolute') {
                // User input mode is dynamic, update _kinematic_v
                this.input_dynamic_v = this.input_kinematic_v * this.sg;
                this.viscosity = this.input_kinematic_v;
                console.log(" - set viscosity");
            }
            console.log("===========================");
            console.log("Viscosity:         " + this.viscosity);
            console.log("Dynamic Visocity   " + this.absolute_viscosity);
            console.log("Kinematic Visocity " + this.kinematic_viscosity);
            console.log("===========================");
        },
        sg: function () {
            if (this.vka == 'absolute') {
                this.input_kinematic_v = this.input_dynamic_v / this.sg;
            }

        },
        material: function () {
            this.sizes = [];
            this.selection = null;
            this.entry = null;
            if (!this.local_loading) {
                console.log("Setting nominal size to null");
                this.nominal_size = null;
            }

            if (this.material) {
                for (const m in this.data[this.material].nominal_sizes) {
                    this.sizes.push(m);
                }
                console.log("Material set, pushing nominal sizes");
            } else {
                console.log("Selector and entry not set - no material");
                this.selector = null;
                this.entry = null;
            }

        },
        nominal_size: function () {


            // When nominal size is selected, build a list of selector values, if the 
            // material selected supports selectors.
            this.selectors = [];
            const mat = this.data[this.material];
            this.selector = mat.selector ? mat.selector : null;

            if (this.selector && this.nominal_size) {
                let pipes = mat.nominal_sizes[this.nominal_size]
                if (pipes) {
                    for (const m of pipes.map(function (p) {
                        return p.selector;
                    })) {
                        this.selectors.push(m);
                    }
                    console.log("Entry set to first selection");
                    this.entry = pipes[0];
                }
            } else if (this.nominal_size) {
                // There is only one listing for each nominal size, so just select it.
                console.log("Entry set to only size");
                const pipes = mat.nominal_sizes[this.nominal_size]
                if (pipes) {
                    this.entry = pipes[0];
                }
            }
            console.log("Nominal size not yet selected");
            console.log(this.selector)
            console.log(this.nominal_size)
        },
        selection: function () {
            // Selection has changed, if it is changing to null - skip.
            // otherwise, pick the pipe.
            if (this.selection) {
                const mat = this.data[this.material];
                const pipes = mat.nominal_sizes[this.nominal_size]
                const v = this;
                this.entry = pipes.filter(function (p) {
                    return v.selection === p.selector;
                })[0];
                console.log("Pipe selected by selector");
                console.log(this.entry);
            }
            if (!this.selection && this.selector) {
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
            this.steps.push(`${centipoise} Centipoise / ${this.sg} = ${centistoke} Centisoke`);

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

            if (this.to_unit.cSt_cuttoff_max && centistoke > this.to_unit.cSt_cuttoff_max) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke < ${this.to_unit.cSt_cuttoff_max}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
            }
            if (this.to_unit.cSt_cuttoff_min && centistoke < this.to_unit.cSt_cuttoff_min) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke > ${this.to_unit.cSt_cuttoff_min}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
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

            if (this.to_unit.cSt_cuttoff_max && centistoke > this.to_unit.cSt_cuttoff_max) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke < ${this.to_unit.cSt_cuttoff_max}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
            }
            if (this.to_unit.cSt_cuttoff_min && centistoke < this.to_unit.cSt_cuttoff_min) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke > ${this.to_unit.cSt_cuttoff_min}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
            }
        },
        kd() {
            const input = parseFloat(this.from_value);
            //-----------------------------------
            // Find significant figures of input
            const centistoke = (input * this.from_unit.toPrime).toPrecision(this.output_sig_fig);
            if (this.from_unit.id != 5)
                this.steps.push(`${input} ${this.from_unit.label} x ${this.from_unit.toPrime} = ${centistoke} Centistoke`);

            if (this.to_unit.cSt_cuttoff && centistoke > this.to_unit.cSt_cuttoff) {
                this.kinematic_warning = `Warning:  ${this.to_unit.label} is only valid for Centistoke < ${this.to_unit.cSt_cuttoff}.  The input you entered (${centistoke}) is above this limit, consider using a different unit of measure`;
            }
            const centipoise = (input * parseFloat(this.sg)).toPrecision(this.output_sig_fig);
            this.steps.push(`${input} Centisokes * ${this.sg} = ${centipoise} Centipoise`);
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


Vue.component('mechanical-friction-loss-calculator', {
    delimiters: ['${', '}'],
    data: function () {
        return {
            units: "-",
            shaft_diameter: null,
            shaft_min: 0.5,
            shaft_max: 7,
            rpm_value: null,
            rpm_min: 450,
            rpm_max: 3600,
            msg: {},
            length: 100,
            mech_friction_loss: '',
            mech_friction: '',
            bearing_spacing: 10,
            A:.00030322,
            B: .003395,
            EXP: 1.8927,
            metric_conv: .001636,
            precision: 1,
            saved_props: ['shaft_diameter','rpm_value','length','bearing_spacing','mech_friction_loss','mech_friction'],
        };
    },
    template: '#mechanical-friction-loss-calculator-template',
    mounted: function () {
        const v = this;
        this.$root.$on('unit-change', (value) => {
            console.log("unit change");
            this.units = value;
            this.do_page_load();
        });
        if (typeof (Storage) !== "undefined") {
            this.load_inputs();
        } else {
            console.log("Local storage not available on this browser - unit sets will need to switch manually");
        }
        this.do_page_load();
    },
    methods: {
        calculate() {
            let conversion=1;
            const base_us_length=100;
            const base_metric_length=30.5;
            const float_shaft_diameter = parseFloat(this.shaft_diameter);
            const float_rpm_value = parseFloat(this.rpm_value);
            const float_length = parseFloat(this.length);
            const float_bearing_spacing = parseFloat(this.bearing_spacing);
            //Validate
            let invalid=false;
            if (!this.validate(float_shaft_diameter,"shaft",this.shaft_min,this.shaft_max)) 
                invalid=true;
            if (!this.validate(float_rpm_value,"rpm",this.rpm_min,this.rpm_max)) 
                invalid=true;
            if (!float_length)
                invalid=true;
            if (invalid) { 
                this.mech_friction_loss=null;
                this.mech_friction=null;
                return;  
            }
            var length_calc=float_length/base_us_length;
            if (this.units == 'metric') {
                conversion=this.metric_conv;
                length_calc = float_length/base_metric_length;
            }
            this.mech_friction_loss=((this.A * float_rpm_value) + this.B) * Math.pow(float_shaft_diameter, this.EXP);
            if (float_bearing_spacing == 5) {
                this.mech_friction_loss*=2;
            }
            this.mech_friction_loss = (this.mech_friction_loss * conversion);
            this.mech_friction = (this.mech_friction_loss * length_calc).toFixed(this.precision);
            this.mech_friction_loss = this.mech_friction_loss.toFixed(this.precision);
            this.save_inputs();
        },
        
        no_negative: function (e) {
            if (!((e.keyCode > 95 && e.keyCode < 106) ||
                (e.keyCode > 47 && e.keyCode < 58) ||
                e.keyCode == 190 || // period
                e.keyCode == 110 || // decimal point
                e.keyCode == 27 || // escape
                e.keyCode == 46 || // delete
                e.keyCode == 8 || // backspace
                e.keyCode == 9) ) { //tab
                e.preventDefault();
                return false;
            }
        },
        load_inputs: function () {
            this.local_loading = true;
            for (const prop of this.saved_props) {
                if (localStorage.getItem(prop)) {
                    Vue.set(this, prop, localStorage.getItem(prop));
                }
            }
            this.units = localStorage.getItem("unit-set");
        },
        do_page_load: function() { 
            this.mech_friction_loss=null;
            this.mech_friction=null;
            if (this.units != 'metric') {this.shaft_min=0.5; this.shaft_max=7;}
            else {this.shaft_min=12; this.shaft_max=175;}
            this.calculate();
        },
        save_inputs: function () {
            for (const prop of this.saved_props) {
                localStorage.setItem(prop, this[prop]);
            }
        },
        value_friction_loss: function(value) {
            if (this.units != 'metric') return value;
            else return value * this.metric_conv;
        },
        value_bearing_spacing: function(value) {
            if (this.units != 'metric') return value;
            else {
                if (value == 5) { return 1.5;}
                return 3;
            } 
        },
        value_length_long: function (value) {
            if (this.units != 'metric') return value;
            else return value * 0.3048; // convert to meters
        },
        value_length_short: function (value, digits) {
            const d = digits === undefined ? 2 : digits
            if (this.units != 'metric') return value;
            else return (value * 25.4).toFixed(d); // convert in to mm
        },
        value_length_ft_mm: function (value, digits) {
            const d = digits === undefined ? 2 : digits
            if (this.units != 'metric') return value;
            else return (value * 25.4 * 12).toFixed(d); // convert ft to mm
        },
        validate: function (value,item,min,max) {
            if (!value || (value < min) || (value > max)) {
                this.msg[item]="Entry must be between "+min+" and "+max;
                return false;
            }
            else { 
                this.msg[item]="";
                return true;
            }
        },
    },
    computed: {
        units_measure_in_mm: function () {
            if (this.units != 'metric') return 'in';
            else return 'mm';
        },
        units_friction_loss: function() {
            if (this.units != 'metric') return 'hp/100ft';
            else return 'kW/30.5m';
        },
        units_measure_ft_m: function() {
            if (this.units != 'metric') return 'ft';
            else return 'm';
        },
        units_friction: function() {
            if (this.units != 'metric') return 'hp';
            else return 'kW';
        }
    },
    watch: {
        shaft_diameter: function() { 
            this.calculate();
        },
        rpm_value: function () { 
            this.calculate();
        },
        bearing_spacing: function () {
            this.calculate();
        },
        length: function() {
            this.calculate();
        }
    }
})

var appView = new Vue({
    el: '#vue',
    delimiters: ['${', '}'],
    data: {
        unit_set: 'us',
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
            } else if (stored === 'metric') {
                this.unit_set = 'metric';
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
                if (typeof (Storage) !== "undefined") {
                    v.needle = localStorage.getItem("needle")
                }
            }).catch(function (err) {
                console.error('Search is disabled, could not load topic list');
                console.error(err);
            })

        // Scroll selected topic into view
        const active = document.getElementsByClassName("active_topic");
        for (const element of active) {
            element.scrollIntoView({
                block: "center"
            });
        }

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
                    const h = paths.indexOf(r.item);
                    const hit = v.haystack[h];

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
        to_us() {
            this.unit_set = 'us';
            localStorage.setItem("unit-set", this.unit_set);
            this.$root.$emit('unit-change', 'us');
        },
        to_metric() {
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
                this.marks[this.mark_index].scrollIntoView();
                window.scrollBy(0, -100)
                this.marks[this.mark_index].classList.add("current_mark");
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
                    if (v.search_display) {
                        markInstance.mark(v.needle, {
                            separateWordSearch: true,
                            done: function () {
                                v.marks = document.querySelectorAll("mark");
                                v.jump_to_mark();
                            }
                        });
                    }
                }
            });



        }
    }
});