
Vue.component('tank-demo', {
    delimiters: ['${', '}'],
    props: {
      tank_type: { 
        type: String,
        default: ""
      }
    },
    data: function () {
      return {
          volume_data: {'bottomhead': {'desc': 'Volume in Bottom Head', 'type': 'Bottom Type', 'value': '', 'converted_value': '', 'varname': 'bottom_type'},
                        'endhead': {'desc': 'Volume in Ends', 'type': 'End Type', 'value': '',  'converted_value': '', 'varname': 'end_type'},
                        'cylindrical': {'desc': 'Volume in Cylinder', 'type': '', 'value': '', 'converted_value': ''},
                        'tophead': {'desc': 'Volume in Top Head', 'type': 'Top Type', 'value': '',  'converted_value': '', 'varname': 'top_type'},
                        'total_liquid': {'desc': 'Total Liquid Volume', 'type': '', 'value': '', 'converted_value': null },
                        'total_tank': {'desc': 'Total Tank Volume', 'type': '', 'value': '', 'converted_value': ''}
                      },
          volume_strings: [],
          volume_array: [],
          tank_types: ['Vertical','Horizontal','Spherical'],
          tank_data: {
            'tank_type': ['vt','ht','st'], 
            'tank_volumes': {'vt': ['bottomhead', 'cylindrical', 'tophead', 'total_liquid', 'total_tank'],
                          'ht': ['endhead', 'cylindrical','total_liquid','total_tank'], 
                          'st': ['total_liquid','total_tank']},
            'tank_parts': {'vt': [], 'ht': [], 'st': []},
          },
          tank_type_index: 0,
          tank_key: 'vt',
          d_diameter: null,
          a_length: null,
          h_filldepth: null,
          check_depth: '',
          end_types: ['2:1 Elliptical','Hemispheric','Flat'],
          end_image_types: ['elliptical','hemispheric','flat'],
          top_type: null,
          bottom_type: null,
          end_type: null,
          length_unit: 'Feet',
          length_types: ['Inches','Feet','Meters','Millimeters'],
          length_multiplier: [1,0.083333,0.0254,25.4],
          conversion_unit: 'Cubic Feet',
          conversion_types: ['Cubic Millimeters', 'Cubic Inches', 'Cubic Feet', 'Cubic Meters', 'Gallons', 'Barrels (Oil)', 'Liters'],
          swap_conv: false,
          conversion_mapper: {'Millimeters': 'mm3', 'Inches': 'in3', 'Feet': 'ft3', 'Meters': 'm3', 'Gallons': 'USgallons', 'Barrels (Oil)': 'barrels (oil)', 'Liters': 'liter'},
          
          image_str: '',
          error: '',
          volume_equations_data: {
                                'ht': [{'type':'Cylinder','image':'ht-flat.jpg', 'equation':'equation_horizontal_cylinder.jpg'},
                                       {'type': 'Sphere','image':'st.jpg','equation':'equation_sphere.jpg'},
                                       {'type': '2:1 Elliptical End', 'image':'2-1_elliptical_end.jpg','equation':'equation_2-1_elliptical_end.jpg'}
                                      ],
                                'vt': [{'type':'Vertical Cylinder','image':'vt-flat-flat.jpg', 'equation':'equation_vertical_cylinder.jpg'},
                                      {'type': 'Sphere','image':'st.jpg','equation':'equation_sphere.jpg'},
                                      {'type': '2:1 Elliptical Bottom', 'image':'2-1_elliptical_bottom.jpg','equation':'equation_2-1_elliptical_bottom.jpg'},
                                      {'type': '2:1 Elliptical Top', 'image':'2-1_elliptical_top.jpg','equation':'equation_2-1_elliptical_top.jpg'}
                                      ],
                                'st': [{'type':'Sphere', 'image':'st.jpg','equation':'equation_sphere.jpg'}],
                                'total_liquid': {'value': '', 'converted_value': ''},
                                'total_tank': {'value': '', 'converted_value': ''}
                                },
      }
    },
    template: '#tank-demo-template',
    mounted: function() {
      const v = this; 
      v.vol_conversions = {};
      //Conversions
      axios.get("/statics/unit-conversions.json")
          .then(function (response) {
              for (var i=0;i<response.data.length;i++) {
                if (response.data[i].measure.toLowerCase() == "volume") {
                  var data=response.data[i].units;
                  for (var j=0;j<data.length;j++) {
                    v.vol_conversions[data[j].label]=data[j].factor;
                  }
                  break;
                }
              }
          }).catch(function (err) {
              console.log(err);
              console.error('Unit conversion data could not be downloaded.')
          })
      
      v.top_type=v.end_types[0];
      v.bottom_type=v.end_types[1];
      v.end_type=v.end_types[1];
      for (var i=0;i<v.tank_types.length;i++) {
        if (v.tank_types[i].includes(v.tank_type)) {
          v.tank_type_index=i;
          v.tank_key=v.tank_data['tank_type'][i];
          break;
        }
      }
      v.do_page_calculate();
    },
    methods: {
      no_negative_no_comma: function (e) {
        if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode == 188) || //comma
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
      calculate_volumes: function() {
        if (!this.validate_data()) { return; }
        var tot_liquid_volume = 0;
        var tot_tank_volume = 0;
        var use_top_type = this.top_type.toLowerCase();
        var use_bot_type = this.bottom_type.toLowerCase();
        var use_end_type = this.end_type.toLowerCase();
        this.h_filldepth = parseFloat(this.h_filldepth);
        this.d_diameter = parseFloat(this.d_diameter);
        if (this.tank_key != 'st') { this.a_length = parseFloat(this.a_length); }
        //Vol of Sphere used by all
        if (this.tank_key == 'st') {
          if (!this.check_fill_depth(this.h_filldepth, this.d_diameter)) return;

          tot_liquid_volume=this.vol_spherical_tank(this.d_diameter, this.h_filldepth);
          tot_tank_volume=this.vol_spherical_tank(this.d_diameter,this.d_diameter);
        }
        if (this.tank_key == 'ht') {
          if (!this.check_fill_depth(this.h_filldepth, this.d_diameter)) return;
          //Horizontal Tank
          this.volume_data['cylindrical']['value']=this.vol_horizontal_cylinder(this.d_diameter,this.h_filldepth,this.a_length);
          tot_liquid_volume=this.volume_data['cylindrical']['value'];
          this.volume_data['cylindrical']['value']=this.float_to_str(this.volume_data['cylindrical']['value']);
          this.volume_data['cylindrical']['converted_value']=this.convert_val(this.volume_data['cylindrical']['value']);
          tot_tank_volume=this.vol_horizontal_cylinder(this.d_diameter,this.d_diameter,this.a_length);
  
          //Both ends
          this.volume_data['endhead']['value']=(2*this.vol_horizontal_elliptical_end(this.d_diameter,this.h_filldepth,use_end_type));
          tot_liquid_volume+=this.volume_data['endhead']['value'];
          this.volume_data['endhead']['value']=this.float_to_str(this.volume_data['endhead']['value']);
          this.volume_data['endhead']['converted_value']=this.convert_val(this.volume_data['endhead']['value']);
          tot_tank_volume+=(2*this.vol_horizontal_elliptical_end(this.d_diameter,this.d_diameter,use_end_type));
        }
        if (this.tank_key == 'vt') {
          //Vertical Tank
          //Bottom Head
          var ztop=this.get_z_value(use_top_type,this.d_diameter);
          var zbot=this.get_z_value(use_bot_type,this.d_diameter);
          if (!this.check_fill_depth(this.h_filldepth,(this.a_length + zbot + ztop))) { return; }

          var my_H_val=this.get_H_value(use_bot_type,this.d_diameter,this.h_filldepth,this.a_length,is_top=false);
          this.volume_data['bottomhead']['value']=this.vol_vertical_elliptical_end(this.d_diameter,my_H_val,this.a_length,use_bot_type,is_top=false);
          tot_liquid_volume=this.volume_data['bottomhead']['value'];
          this.volume_data['bottomhead']['value']=this.float_to_str(this.volume_data['bottomhead']['value']);
          this.volume_data['bottomhead']['converted_value']=this.convert_val(this.volume_data['bottomhead']['value']);
          tot_tank_volume=this.vol_vertical_elliptical_end(this.d_diameter,zbot,this.a_length,use_bot_type,is_top=false);
  
          //Cylinder 
          var cyl_H_val=this.cylindrical_H_value(this.d_diameter,this.h_filldepth,this.a_length,use_bot_type);
          this.volume_data['cylindrical']['value']=this.vol_vertical_cylinder(this.d_diameter,cyl_H_val);
          tot_liquid_volume+=this.volume_data['cylindrical']['value'];
          this.volume_data['cylindrical']['value']=this.float_to_str(this.volume_data['cylindrical']['value']);
          this.volume_data['cylindrical']['converted_value']=this.convert_val(this.volume_data['cylindrical']['value']);
          tot_tank_volume+=this.vol_vertical_cylinder(this.d_diameter,this.a_length);
  
          //Top 
          my_H_val=this.get_H_value(use_top_type,this.d_diameter,this.h_filldepth,this.a_length,is_top=true);
          this.volume_data['tophead']['value']=this.vol_vertical_elliptical_end(this.d_diameter,my_H_val,this.a_length,use_top_type,is_top=true);
          tot_liquid_volume+=this.volume_data['tophead']['value'];
          this.volume_data['tophead']['value']=this.float_to_str(this.volume_data['tophead']['value']);
          this.volume_data['tophead']['converted_value']=this.convert_val(this.volume_data['tophead']['value']);
          tot_tank_volume+=this.vol_vertical_elliptical_end(this.d_diameter,ztop,this.a_length,use_top_type,is_top=true);
        }
        
        //Final values
        this.volume_data['total_liquid']['value']=this.float_to_str(tot_liquid_volume);
        this.volume_data['total_tank']['value']=this.float_to_str(tot_tank_volume);
        this.volume_data['total_liquid']['converted_value']=this.convert_val(this.volume_data['total_liquid']['value']);
        this.volume_data['total_tank']['converted_value']=this.convert_val(this.volume_data['total_tank']['value']);
      },
      do_page_calculate: function() {
        //Has anything changed?
        this.tank_data['tank_parts']={
          'vt':[this.bottom_type,this.top_type],
          'ht':[this.end_type],
          'st':[]
        };
        //Calculate the variables
        this.calculate_volumes();
        //Find the image
        var out_image_str=this.tank_key;
        var tank_array=this.tank_data['tank_parts'][out_image_str];
        for(var j=0;j<tank_array.length;j++){
          var selection=tank_array[j].toLowerCase();
          selection=selection.split(' ');
          if (selection.length > 1) { selection=selection[1]; }
          else { selection=selection[0]; }
          for (var i=0;i<this.end_image_types.length;i++) {
            if (this.end_image_types[i].includes(selection)) {
              out_image_str+='-'+selection;
              break;
            }
          }
        };
        this.image_str='./images/'+out_image_str+'.jpg';
        
        //create volume strings and calculate based on values for the results section
        let str_array=this.tank_data['tank_volumes'][this.tank_key];
        this.volume_strings=[];
        //Set up array of strings to show
        for(var i=0;i<str_array.length;i++) {
          this.volume_strings.push(this.volume_data[str_array[i]]);
        }
      },
      clear_volume_data: function() {
        for (const val of Object.keys(this.volume_data)) {
          this.volume_data[val]['value']='';
          this.volume_data[val]['converted_value']='';
        }
        this.check_depth = '';
      },
      check_fill_depth: function(filldepth, diameter) {
        if (filldepth > diameter) { 
          this.clear_volume_data();
          this.check_depth = 'Too Full';
          return 0;
        }
        else {
          this.check_depth = 'OK';
          return 1;
        }
      },
      validate_data: function() {
        var do_check=((this.d_diameter && this.h_filldepth)?true:false);
        if (this.tank_key != 'st') {
            do_check = ((do_check && this.a_length)?true:false);
        }
        let error_val = '';
        if (!do_check ) { 
          //If all fields are empty, no error message.  Otherwise set an error message
          if ( !(( this.tank_key != 'st' && !this.d_diameter && !this.h_filldepth && !this.a_length) || (!this.d_diameter && !this.h_filldepth))) {
            error_val = 'Empty Inputs';
          }
          this.clear_volume_data() ;
        }
        this.error = error_val;
        return do_check;
      },
      convert_val: function(in_string) {
        if (!in_string.length) return '';
        var from_unit = this.conversion_mapper[this.length_unit];
        var to_unit = this.conversion_mapper[this.conversion_unit.replace('Cubic ','')];
        if ( to_unit == from_unit) { return in_string; }
        const standard = 1 / this.vol_conversions[from_unit];
        const conv_factor = (standard * this.vol_conversions[to_unit]);
        var out_val = this.str_to_float(in_string) * conv_factor;
        return this.float_to_str(out_val);
      },
      //Volume calculations
      vol_spherical_tank: function(in_diameter,in_depth) {
        var radius=in_diameter/2;
        var tot_vol = (Math.PI/3)*Math.pow(in_depth,2)*((3*radius)-in_depth);
        //console.log("Sphere Vol: "+tot_vol);
        return tot_vol;
      },
      vol_horizontal_cylinder: function(in_diameter,in_depth,in_length) {
        var radius=in_diameter/2;
        var tot_vol = (Math.acos((radius-in_depth)/radius))*Math.pow(radius,2);
        tot_vol = tot_vol - ((radius-in_depth)*Math.pow((2*radius*in_depth)-Math.pow(in_depth,2),0.5));
        tot_vol = tot_vol * in_length;
        //console.log("Horizontal Cylinder Vol: "+tot_vol);
        return tot_vol;
      },
      vol_vertical_cylinder: function(in_diameter, in_depth) {
        var tot_vol = Math.PI*(Math.pow(in_diameter,2)/4)*in_depth;
        //console.log("Vertival Cylinder Vol: "+tot_vol);
        return tot_vol;
      },
      vol_horizontal_elliptical_end: function(in_diameter,in_depth,end_type) {
        if (end_type.includes("flat")) {return 0;}
        //If c is elliptical, then set to 0.5
        const C=this.get_C_const(end_type);
        var tot_vol = Math.pow(in_diameter,3)*C*Math.PI/12;
        tot_vol = tot_vol * ((3*Math.pow((in_depth/in_diameter),2))-(2*Math.pow((in_depth/in_diameter),3)));
        //console.log("Horizontal Elliptical End Vol: "+tot_vol);
        return tot_vol;
      },
      vol_vertical_elliptical_end: function(in_diameter,in_depth,in_length,in_type,is_top=false) {
        if (in_type == "flat") { return 0;}
        //If c is elliptical, then set to 0.5
        const C=this.get_C_const(in_type);
        var tot_vol=0;
        //console.log("Vertical end is_top["+is_top+"] in_type ["+in_type+"] in_depth["+in_depth+"]");
        if (is_top)  {
          if (in_type == 'hemispheric') {
            // my_H_val=this.get_H_value(in_type,in_diameter,in_depth,in_length,is_top);
            var working=(in_diameter/2) + in_depth; 
            //console.log("Working: "+working);
            var working_vol = this.vol_spherical_tank(in_diameter,working);
            var half_sphere_vol = Math.PI*0.5*4/3*Math.pow(in_diameter/2,3);
            //console.log("Half sphere vol ["+half_sphere_vol+"]");
            tot_vol=working_vol - half_sphere_vol;
          }
          else { //elliptical TODO
            tot_vol = (Math.PI/12)*((3*Math.pow(in_diameter,2)*in_depth)-(Math.pow(in_depth,3)*4/Math.pow(C,2)));
          }
        }
        else { //bottom
          if (in_type == 'hemispheric') {
            tot_vol = this.vol_spherical_tank(in_diameter,in_depth);
          }
          else { //elliptical
            tot_vol = (Math.PI/6)*((in_diameter*Math.pow(in_depth,2)*3/C)-(Math.pow(in_depth,3)*2/Math.pow(C,2)));
          }
        }
        //console.log("Top ["+is_top+"] Vertical Elliptical Vol: "+tot_vol);
        return tot_vol;
      },
      //Utilities
      has_all_data: function() {
        var do_check=((this.d_diameter && this.h_filldepth)?true:false);
        if (this.tank_key != 'st') {
            do_check = ((do_check && this.a_length)?true:false);
        }
        return do_check;
      },
      get_C_const: function(in_type) {
        return ((in_type.includes('elliptical'))?0.5:1);
      },
      get_z_value: function(in_type, in_diameter) {
        var z_val=((in_type == "flat")?0:((in_type == "hemispheric")?in_diameter/2:0.25*in_diameter));
        //console.log("Z: "+z_val);
        return z_val;
      },
      get_H_value: function(in_type,in_diameter,in_depth,in_length,is_top=false) {
        if (in_type == "flat") {return 0;}
        if (is_top) {
          //Use Cylindrical H value
          let H_val=this.cylindrical_H_value(in_diameter,in_depth,in_length,in_type);
          if (H_val < in_length) {return 0;}
          return (in_depth-in_length-this.get_z_value(in_type,in_diameter));
        }
        else {
          return Math.min(in_depth,this.get_z_value(in_type,in_diameter));
        }
      },
      cylindrical_H_value: function(in_diameter,in_depth,in_length,in_type) {
        var c_val=Math.max(0,Math.min(in_length,(in_depth-this.get_z_value(in_type,in_diameter))));
        //console.log("Cylindrical H Value ["+c_val+"]");
        return c_val;
      },
      str_to_float: function(in_string) {
        if (typeof(in_string) == 'string') {
          return parseFloat(in_string.replaceAll(',',''));
        }
        return in_string;
      },
      float_to_str: function(in_number) {
        if (isNaN(in_number)) return '';
        if (typeof(in_number) == 'number') {
          return (parseFloat(in_number.toFixed(2))).toLocaleString(undefined, { minimumFractionDigits: 2 });
        }
        return in_number;
      }
    },
    computed: {
      percent_full: function() {
        if (!this.volume_data['total_liquid']['value'] || !this.volume_data['total_tank']['value']) {return null;}
        var calculation=100*(this.str_to_float(this.volume_data['total_liquid']['value'])/this.str_to_float(this.volume_data['total_tank']['value']));
        return this.float_to_str(calculation);
      }
    }, 
  
    watch:{
      conversion_unit: function() {
        this.calculate_volumes();
      },
      length_unit: function() {
        this.calculate_volumes();
      },
      bottom_type: function() {
        this.do_page_calculate();
      },
      top_type: function() {
        this.do_page_calculate();
      },
      end_type: function() {
        this.do_page_calculate();
      },
    }
  });