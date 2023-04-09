
Vue.component("demo-input-slider", {
  props: ['value', 'label', 'min', 'max'],
  template: `
  <div class="row">
    <label class="col-sm-1">{{ label }}</label>
    <div class="col-sm-3">
      <input type="range" class="form-range" v-bind:value="value" v-bind:min="min" v-bind:max="max" v-on:input="$emit('update:value', $event.target.value)"></input>
    </div>
    <span class="col-sm-1">{{ value }}</span>
  </div>
  `
});

Vue.component('demo-system-curves', {
  props: ['units', 'title', 'chart_key'],
  data: function () {
      return {
        elevation: 10,
        min: 0,
        max: 10,
        lowerLevel: 5,
        upperLevel: 10,
        totalResistence: 5,
        atmospheres: 7,
        velocities: [0,1,2,3,4,5,6,7,8,9,10],
        chart: null
      };
  }, 
  template: `
    <div class="demonstrator">
      <div class="demo-inputs">
        <demo-input-slider v-bind:value.sync="lowerLevel" label="Lower Level" v-bind:min="min" v-bind:max="max" />
        <demo-input-slider v-bind:value.sync="upperLevel" label="Upper Level" v-bind:min="min" v-bind:max="max" />
        <demo-input-slider v-bind:value.sync="totalResistence" label="Resistence" v-bind:min="min" v-bind:max="max" />
        <demo-input-slider v-bind:value.sync="atmospheres" label="Atmospheres" min="0" max="25" />
      </div>
      <div class="demo-chart">
      </div>
    </div>
  `,
  mounted: function () {
    const chartElem = $(this.$el).children('.demo-chart')[0];
    const component = this;
    const series = this.getSeries();

    const options = {
      chart: {
        type: "rangeArea",
        animations: { enabled: false },
        toolbar: { show: false },
        height: 300,
        width: "50%"
      },
      series: series,
      dataLabels: {
        enabled: false
      },
      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w}) {
          return component.getTooltip(dataPointIndex);
        }
      },
      stroke: {
        curve: "straight",
        width: [2, 2, 0]
      },
      fill: {
        opacity: [1, 1, 0.10]
      },
      markers: {
        hover: { sizeOffset: 6 }
      },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
      },
      xaxis: {
        velocities: this.velocities,
        title: {
          text: "Rate of Flow"
        },
        labels: { 
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: { 
        min: 0,
        max: 140,
        decimalsInFloat: false,
        title: {
          text: "System Head Loss"
        },
        labels: {
          show: false
        }
      }
    };
      
    this.chart = new ApexCharts(chartElem, options);
    
    this.chart.render();
  },
  methods: {
    systemCalculator: function() {
      const values = {
        frictionHead: [],
        staticHead:[],
        totalHead:[]
      };
  
      const calcStaticHead = (atmospheres, upperLevel, lowerLevel, elevation) => {
        const value = (atmospheres * 2.31) + upperLevel - lowerLevel + elevation;
        return parseFloat(value);
      };
  
      const calcFrictionHead = (velocity, resistance) => {
        const value = resistance * (velocity / 4) ** 2;
        return value;
      }
  
      this.velocities.forEach(v => {
        const staticHead = calcStaticHead(
          parseFloat(this.atmospheres), 
          parseFloat(this.upperLevel), 
          parseFloat(this.lowerLevel), 
          parseFloat(this.elevation));
        const frictionHead = calcFrictionHead(v, parseFloat(this.totalResistence));
        const totalHead = staticHead + frictionHead;
  
        values.frictionHead.push(frictionHead.toFixed(2));
        values.staticHead.push(staticHead.toFixed(2));
        values.totalHead.push(totalHead.toFixed(2));  
      })

      return values;
    },
    getSeries: function() {
      const curveData = this.systemCurveData;
      const series = [];

      series.push({
        name: 'Total Head',
        type: 'line',
        data: this.velocities.map(v => ({ x: v, y: curveData.totalHead[v] }))
      });
      series.push({
        name: 'Static Head',
        type: 'line',
        data: this.velocities.map(v => ({ x: v, y: curveData.staticHead[v] })) 
      });
      series.push({
        name: 'Friction Head',
        type: 'rangeArea',
        data: this.velocities.map(v => ({ x: v, y: [ curveData.staticHead[v], curveData.totalHead[v] ] })) 
      });

      return series;
    },
    getTooltip: function(dataPointIndex) {
      const curveData = this.systemCurveData;
      return '<div>' +
        `<div><strong>Total Head: </strong><span>${curveData.totalHead[dataPointIndex]}</span></div>` +
        `<div><strong>Static Head: </strong><span>${curveData.staticHead[dataPointIndex]}</span></div>` +
        `<div><strong>Friction Head: </strong><span>${curveData.frictionHead[dataPointIndex]}</span></div>` +
      '</div>';
    },
    refreshChart: function() {
      const series = this.getSeries();
      this.chart.updateSeries(series);
    }
  },
  computed: {
    systemCurveData: {
      get() {
        return this.systemCalculator(this.velocities);
      }
    }
  },
  watch: {
    lowerLevel: function() {
      this.refreshChart();
    },
    upperLevel: function() {
      this.refreshChart();
    },
    totalResistence: function() {
      this.refreshChart();
    },
    atmospheres: function() {
      this.refreshChart();
    }
  }
});