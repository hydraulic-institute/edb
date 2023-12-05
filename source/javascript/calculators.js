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
          if (!this.length) {
            console.log("No Pipe length")
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
              console.log('STEP ['+ factor+']');
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

                  let kcount=0;
                  while (diff > 1 / 1000) {
                      f = f + fi
                      f1 = f1calc(f);
                      f2 = f2calc(f);
                      diff = f1 - f2;
                      kcount++;
                      if (!(kcount %  1000) )
                        console.log(kcount+" ITERATIONS - "+ diff);
                  }
                  console.log(kcount+" FINAL ITERATIONS");
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
          bearing_spacing_5: false,
          A:.00030322,
          B: .003395,
          EXP: 1.8927,
          metric_conv: .001636,
          precision: 1,
          saved_props: ['shaft_diameter','rpm_value','length','bearing_spacing_5','mech_friction_loss','mech_friction'],
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
          if (this.bearing_spacing_5) {
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
        console.log("value bearing spacing");
          if (this.units != 'metric') return value;
          else {
              if (value) { return 1.5;}
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
      bearing_spacing_5: function () {
          this.calculate();
      },
      length: function() {
          this.calculate();
      }
  }
});

Vue.component('atmospheric-pressure-calculator', {
    delimiters: ['${', '}'],
    props: {
        show_table: { 
          type: Boolean,
          default: false
        },
      },
    data: function() {
        return {
            data_table: {
                'Pb': {'metric': {'val':101325, 'units': 'Pa'}, 'us': {'val':29.9213, 'units': 'inHg'}, 'desc': 'Reference pressure'},
                'Tb': {'metric': {'val':288.15, 'units': 'K'}, 'us': {'val':288.15, 'units': 'K'}, 'desc': 'Reference temperature'},
                'Lb': {'metric': {'val':-0.0065, 'units': 'K/m'}, 'us': {'val':-0.00198, 'units': 'K/ft'}, 'desc': 'Temperature lapse rate'},
                'hb': {'metric': {'val':0, 'units': 'm'}, 'us': {'val':0, 'units': 'ft'}, 'desc': 'Height of reference pressure'},
                'R*': {'metric': {'val':8.3144598, 'units': 'J/(mol-K)'}, 'us': {'val':89494.6, 'units': 'lg-ft^2/(lb_mol-K-s^2)'}, 'desc': 'Universal gas constant'},
                'g0': {'metric': {'val':9.80665, 'units': 'm/s^2'}, 'us': {'val':32.1741, 'units': 'ft/s^2'}, 'desc': 'Acceleration due to gravity'},
                'M': {'metric': {'val':0.0289644, 'units': 'kg/mol'}, 'us': {'val':28.9644, 'units': 'lg/lg_mol'}, 'desc': "Molar mass of earth's air"}
            },
            table_data: [],
            elevation_data: {
                'us': {
                    'mercury': {"desc": "Inches of mercury (inHg)*","sea_level":"29.9"},
                    'pressure': {"desc": "Pounds per square inch (psi)*","sea_level":"14.7",},
                    'height': {"desc": "Feet of water (ft)*","sea_level":"33.9"}
                },
                'metric': {
                    'mercury': {"desc": "Millimeters of mercury (mmHg)*","sea_level":"760.0"},
                    'pressure': {"desc": "Kilopascals (kPa)*","sea_level":"101.3"},
                    'height': {"desc": "Meters of water (m)*","sea_level":"10.3"}
                },
            },
            calc_data: [],
            constants: {},
            entry: 0,
            elevation: 2000,
            max_elevation_str: "",
            units_measure_ft_m: "",
            err_msg:"",
            max_elevation: {'us': {'val': 36000, 'str': 'feet'}, 'metric':{'val':10900, 'str': 'meters'}}
        };
    },
    template: '#atmospheric-pressure-calculator-template',
    created: function () {
        if (typeof (Storage) !== "undefined") {
            this.load_inputs();
        } else {
            console.log("Local storage not available on this browser - unit sets will need to switch manually");
        }
    },
    mounted: function () {
        const v = this;
        this.$root.$on('unit-change', (value) => {
            console.log("unit change");
            this.page_units = value;
            this.do_page_load();
        });
        this.do_page_load();
    },
    methods: {
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
            this.page_units = localStorage.getItem("unit-set");
            console.log(this.page_units);
        },

        do_page_load: function() { 
            this.constants=this.getConstantsForPage();
            this.calculate();
            this.max_elevation_str=this.max_elevation[this.page_units]['val'].toLocaleString()+' '+this.max_elevation[this.page_units]['str'];
            this.units_measure_ft_m=this.max_elevation[this.page_units]['str'];
        },

        collectTableData: function() {
            this.table_data=[];
            for (var key in this.data_table) {
                let units_str=this.data_table[key][this.page_units]['units'].replaceAll('^2','\u00B2');
                this.table_data.push({'var': key, 'val': this.data_table[key][this.page_units]['val'], 'units': units_str, 'desc': this.data_table[key]['desc']});
            }
        },

        fixed: function(in_val) {
            return parseFloat(this.fixed_str(in_val));
        },

        fixed_str: function(in_val) {
            return (Math.round(parseFloat(in_val) * 100) / 100).toFixed(1);
        },

        getConstantsForPage: function() {
            let out_obj={};
            for (var key in this.data_table) {
                out_obj[key]=this.data_table[key][this.page_units]['val'];
            }
            return out_obj;
        },
        calculateValues: function() {
            let out_data={'val': '-', 'delta': '-'};
            let out_obj={'mercury': {...out_data}, 'pressure': {...out_data}, 'height': {...out_data}, 'error': ""};
            if ( this.elevation > this.max_elevation[this.page_units]['val'] ) {
                out_obj['error']="Elevation must be less than "+this.max_elevation[this.page_units]['val'].toLocaleString()+" "+this.max_elevation[this.page_units]['str'];
                console.log('Empty Values - invalid elevation');
                return out_obj;
            }
            let power_val=(-this.constants['g0']*this.constants['M'])/(this.constants['R*']*this.constants['Lb']);
            let calculation=this.constants['Pb']*Math.pow(((this.constants['Tb']+(this.elevation - this.constants['hb'])*this.constants['Lb'])/this.constants['Tb']),power_val);
            if (this.page_units == "us") {
                out_obj['mercury']['val']=calculation;
                out_obj['pressure']['val']=this.fixed(out_obj['mercury']['val']*0.4911541264);
                out_obj['height']['val']=this.fixed(out_obj['mercury']['val']/0.882647547);
            }
            else {
                out_obj['pressure']['val']=calculation/1000;
                out_obj['mercury']['val']=this.fixed(out_obj['pressure']['val']/0.133322047);
                out_obj['height']['val']=this.fixed(out_obj['pressure']['val']*0.101974787);
            }
            for (var key in out_obj) {
                if (key == 'error') continue;
                out_obj[key]['val']=this.fixed_str(out_obj[key]['val']);
                out_obj[key]['delta']=this.fixed_str(this.fixed(this.elevation_data[this.page_units][key]['sea_level']) - out_obj[key]['val']);
            }            
            console.log("M: "+out_obj['mercury']['val']+" P:"+out_obj['pressure']['val']+" H:"+out_obj['height']['val']);
            console.log("Md: "+out_obj['mercury']['delta']+" Pd:"+out_obj['pressure']['delta']+" Hd:"+out_obj['height']['delta']);
            return out_obj;
        },

        value_elevation: function(value) {
            if (this.page_units != 'metric') return value;
            else return value * 0.3048;
        },

        calculate() {
            this.calc_data=[];
            let result=this.calculateValues();
            let obj=this.elevation_data[this.page_units];
            let i=0;
            for (var idx in obj) {
                this.calc_data[i++]=Object.assign({},obj[idx],result[idx]);
            }
            this.err_msg=result['error'];
            this.entry += 1;
        },
    },
    watch: {
        elevation: function() { 
            console.log(this.elevation);
            this.calculate();
        },
    }
  });