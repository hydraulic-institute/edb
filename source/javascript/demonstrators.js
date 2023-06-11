(() => {
  const calcSysCurveStaticHead = (atmospheres, upperLevel, lowerLevel, elevation) => {
    const value = (atmospheres * 2.31) + upperLevel - lowerLevel + elevation;
    return parseFloat(value);
  };

  const calcPumpSystemPlotStaticHead = (upperLevel, lowerLevel, elevation) => {
    const value = upperLevel - lowerLevel + elevation;
    return value;
  }

  const calcFrictionHead = (velocityIndex, resistance) => {
    const value = resistance * (velocityIndex / 4) ** 2;
    return value;
  }

  const calcPumpHead = (velocityIndex, speed, coefA, coefB, coefC) => {
    return Math.pow(speed,2)*coefA + speed*coefB*velocityIndex + coefC*Math.pow(velocityIndex,2);
  }

  const calcPumpSystemPlotValues = (
    velocities, upperLevel, lowerLevel, elevation, totalResistence, 
    speed, coefA, coefB, coefC) => {
      const values = {
        frictionHead: [],
        staticHead:[],
        totalHead:[],
        pumpHead: [],
        pumpHeadFullSpeed: []
      };

      const staticHead = calcPumpSystemPlotStaticHead(upperLevel, lowerLevel, elevation);
      velocities.forEach(v => {
        const frictionHead = calcFrictionHead(v, parseFloat(totalResistence));
        const totalHead = staticHead + frictionHead;
        const pumpHead = calcPumpHead(v, speed, coefA, coefB, coefC);
        const pumpHeadFullSpeed = calcPumpHead(v, 1, coefA, coefB, coefC);

        values.staticHead.push(staticHead.toFixed(2));
        values.frictionHead.push(frictionHead.toFixed(2));
        values.totalHead.push(totalHead.toFixed(2));
        values.pumpHead.push(pumpHead.toFixed(2));
        values.pumpHeadFullSpeed.push(pumpHeadFullSpeed.toFixed(2));
      });

      return values;
  }

  const calcSystemCurveValues = (velocities, atmospheres, upperLevel, lowerLevel, elevation, totalResistence) => {
    const values = {
        frictionHead: [],
        staticHead:[],
        totalHead:[]
      };

      const staticHead = calcSysCurveStaticHead(
        parseFloat(atmospheres), 
        parseFloat(upperLevel), 
        parseFloat(lowerLevel), 
        parseFloat(elevation)
      );

      velocities.forEach(v => {
        const frictionHead = calcFrictionHead(v, parseFloat(totalResistence));
        const totalHead = staticHead + frictionHead;
  
        values.frictionHead.push(frictionHead.toFixed(2));
        values.staticHead.push(staticHead.toFixed(2));
        values.totalHead.push(totalHead.toFixed(2));
    });

    return values;
  }
  
  window.CurveCalculators = {
    calcSysCurveStaticHead,
    calcPumpSystemPlotStaticHead,
    calcFrictionHead,
    calcSystemCurveValues,
    calcPumpSystemPlotValues
  }
})();

Vue.component("demo-tank", {
    template: "<div class='demo-canvas'></div>",
    props: {
        maxHeight: { 
            type: Number,
            default: 100
        },
        maxWidth: { 
            type: Number,
            default: 50
        },
        knobRadius: { 
            type: Number,
            default: 10
        },
        tankStroke: { 
            type:Number,
            default: 1
        },
        levelMin: {
            type: Number,
            default: 0
        },
        levelMax: { 
            type: Number,
            default: 10
        },
        value: { 
            type: Number,
            default: 0
        },
        showTicks: { 
            type: Boolean,
            default: true
        },
        orientation: {
            type: String,
            default: "vertical"
        },
        levelColor: {
            type: String,
            default: "#4863A0"
        },
        fillColor: {
          type: String,
          default: "#FFFFFF"
        },
        tankCornerRadius: {
          type: Number,
          default: 1
        },
        bottomColor: {
          type: String,
          default: "black"
        },
        leftColor: {
          type: String,
          default: "black"
        },
        rightColor: {
          type: String,
          default: "black"
        },
        topColor: {
          type: String,
          default: "black"
        },
        bottomOpacity: {
          type: Number,
          default: 1
        },
        leftOpacity: {
          type: Number,
          default: 1
        },
        rightOpacity: {
          type: Number,
          default: 1
        },
        topOpacity: {
          type: Number,
          default: 1
        }
    },
    data: function() {
        return {
            levelValue: 2, 
            settings: null,
            tank: null
        }
    },
    mounted: function() {
        const levelYSpacing = this.maxHeight / this.levelMax;
        const tickWidth = this.knobRadius + 6;
        const levelTickValues = _.range(this.levelMin, this.levelMax + 1);
        const stageNormalWidth = this.maxWidth + this.knobRadius + 2;
        const stageNormalHeight = this.maxHeight + (this.knobRadius * 2) + 2;

        const tank = {
            stage: new Konva.Stage({
                container: this.$el,
                width: this.isHorizontal ? stageNormalHeight : stageNormalWidth,
                height: this.isHorizontal ? stageNormalWidth : stageNormalHeight,
                visible: false
            }),
            layer: new Konva.Layer(),
            group: new Konva.Group({
            }),
            waterLevel: new Konva.Rect({
                fill: this.levelColor,
                x: this.knobRadius,
                opacity: 1.0,
                cornerRadius: [0,0,this.tankCornerRadius,this.tankCornerRadius]
            }),
            tank: new Konva.Rect({
                x: this.knobRadius,
                y: this.knobRadius,
                width: this.maxWidth,
                height: this.maxHeight,
                fill: this.fillColor,
                cornerRadius: [0,0,this.tankCornerRadius,this.tankCornerRadius],
                opacity: 0.80,
                stroke: "black",
                strokeWidth: this.tankStroke
            }),
            bottom: new Konva.Line({
              y: 0,
              x: 0,
              points: [ this.knobRadius, this.maxHeight, this.knobRadius+this.maxWidth, this.maxHeight ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.bottomColor,
              stroke: this.bottomColor,
              strokeWidth: 1,
              opacity: this.bottomOpacity
            }),
            top: new Konva.Line({
              y: 0,
              x: 0,
              points: [ this.knobRadius, this.knobRadius, this.knobRadius+this.maxWidth, this.knobRadius ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.topColor,
              stroke: this.topColor,
              strokeWidth: 1,
              opacity: this.topOpacity
            }),
            leftside: new Konva.Line({
              y: 0,
              x: 0,
              points: [ this.knobRadius, this.knobRadius, this.knobRadius, this.knobRadius+this.maxHeight ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.leftColor,
              stroke: this.leftColor,
              strokeWidth: 1,
              opacity: this.leftOpacity
            }),
            rightside: new Konva.Line({
              y: 0,
              x: 0,
              points: [ this.knobRadius + this.maxWidth, this.knobRadius, this.knobRadius + this.maxWidth, this.knobRadius+this.maxHeight ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.rightColor,
              stroke: this.rightColor,
              strokeWidth: 1,
              opacity: this.rightOpacity
            }),
            knob: new Konva.Circle({
                fill: "red",
                radius: this.knobRadius,
                draggable: true,
                opacity: .75,
                dragBoundFunc: (pos) => {
                    const maxVal = Math.max(
                        this.yPositionRange.min, 
                        Math.min(this.yPositionRange.max, this.isHorizontal ? pos.x : pos.y))
                    //const yVal = pos.y;
                    let newPos = {
                        y: maxVal,
                        x: this.tank.knob.absolutePosition().x
                    };

                    if (this.isHorizontal) {
                        newPos.y = this.tank.knob.absolutePosition().y;
                        newPos.x = maxVal;
                    }

                    return newPos;
                }
            }),
            ticks: levelTickValues.map(v => new Konva.Rect({
                name: (this.levelMax - v),
                x: this.knobRadius,
                y: this.knobRadius + (v * levelYSpacing) - 1,
                width: tickWidth,
                height: 1,
                fill: "black",
                opacity: this.showTicks ? 1 : 0
            }))
        };

        //TODO: Still needs a little work.  Build the open top tank if the top is transparent
        if (!this.topOpacity) {
          //This is an open top tank
          tank.group.add(tank.bottom);
          tank.group.add(tank.leftside);
          tank.group.add(tank.rightside);
          //tank.group.add(tank.top);
        }
        else {
          //This is a closed tank
          tank.group.add(tank.tank);
        }

        tank.group.add(tank.waterLevel);
        tank.group.add(tank.knob);
        tank.ticks.forEach(t => tank.group.add(t));
        
        tank.layer.add(tank.group);
        tank.stage.add(tank.layer);

        tank.container = tank.stage.container();
        tank.container.tabIndex = 1;

        tank.stage.show();
        if (this.isHorizontal) {
            window.myTank = tank;
            tank.group.rotate(90);
            tank.group.offsetY(stageNormalHeight);
        }

        tank.transform = tank.group.getTransform();

        this.tank = tank;

        const rectsIntersect = (r1, r2) => {
            return !(
                r2.x > r1.x + r1.width ||
                r2.x + r2.width < r1.x ||
                r2.y > r1.y + r1.height ||
                r2.y + r2.height < r1.y
              );
        }

        const knobOpacity = tank.knob.opacity();
        const setKnobFocusFill = () => {
            tank.knob.opacity(1)
        }
        const setKnobDefaultFill = () => {
            tank.knob.opacity(knobOpacity);
        }

        tank.knob.on("dragmove", (e) => {
            const knobRect = this.tank.knob.getClientRect();
            const tick = this.tank.ticks.find(t => rectsIntersect(t.getClientRect(), knobRect));
            if (tick) {
                this.levelValue = parseInt(tick.name());
            }
            setKnobFocusFill();
        });

        tank.knob.on("dragend", (e) => {
            this.renderTankLevel(this.levelValue);
            setKnobDefaultFill();
        });

        const defaultCursor = this.tank.stage.container().style.cursor;

        tank.knob.on("mouseenter", () => {
            this.tank.stage.container().style.cursor = "pointer";
        });

        tank.knob.on("mouseleave", () => {
            this.tank.stage.container().style.cursor = defaultCursor;
        });

        tank.layer.on("click", () => {
            const curYPos = this.tank.tank.getRelativePointerPosition().y;
            const level = this.levelMax - Math.round(curYPos / levelYSpacing);

            this.levelValue = level;
        });

        tank.container.addEventListener("keydown", (e) => {
            // 38 up, 40 down
            //e.preventDefault();

            const upKey = this.isHorizontal ? 39 : 38;
            const downKey = this.isHorizontal ? 37 : 40

            let increment = 0;
            if (e.keyCode == upKey) {
                increment = 1
                e.preventDefault();
            }
            else if (e.keyCode == downKey) {
                increment = -1
                e.preventDefault();
            }
            else {
                return;
            }

            const level = this.levelValue + increment;
            this.levelValue = Math.min(this.levelMax, Math.max(this.levelMin, level));
        })

        this.levelValue = this.value;
        this.renderTankLevel(this.levelValue);
    },
    methods: {
        calculateLevelPos: function(level) {
            const newHeight = level > 0 ? this.maxHeight * (level / this.levelMax) : 0;
            let position = { x: this.tank.waterLevel.x(), y: this.maxHeight - newHeight + this.knobRadius };
            position = this.tank.transform.point(position);
            const levelPosition = { x: position.x, y: position.y, newHeight: newHeight };

            return levelPosition;
        },
        renderTankLevel: function(level) {
            const levelPosition = this.calculateLevelPos(level);

            this.tank.waterLevel.absolutePosition(levelPosition);
            this.tank.knob.absolutePosition(levelPosition);
            this.tank.waterLevel.size({ width: this.maxWidth, height: levelPosition.newHeight});
        }
    },
    watch: {
        levelValue: function(newValue, oldValue) {
            this.renderTankLevel(newValue);

            this.$emit("input", newValue);
        }
    },
    computed: {
        yPositionRange: function() {
            const minPos = this.calculateLevelPos(this.levelMax);
            const maxPos = this.calculateLevelPos(this.levelMin);

            return {
                min: this.isHorizontal ? maxPos.x : minPos.y,
                max: this.isHorizontal ? minPos.x : maxPos.y
            }
        },
        isHorizontal: function() {
            return this.orientation === "horizontal";
        }
    }
});

Vue.component("demo-flow-line", {
    template: `<div></div>`,
    props: {
        width: {
            type: Number,
            default: 100
        },
        height: { 
            type: Number,
            default: 100
        },
        pointerWidth: { 
            type: Number,
            default: 10
        },
        direction: {
            type: String,
            default: "far"
        },
        orientation: {
            type: String,
            default: "horizontal"
        }
    },
    mounted: function() {
        const stage = new Konva.Stage({
            container: this.$el,
            height: this.height,
            width: this.width
        });

        const layer = new Konva.Layer();

        const line1 = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [
                0, this.height - (this.pointerWidth/2 + 5), 
                (this.width / 2) - 8, this.height - (this.pointerWidth/2 + 5),
            ],
            pointerLength: this.pointerWidth,
            pointerWidth: this.pointerWidth,
            fill: "black",
            stroke: "darkgrey",
            strokeWidth: 1
        });
        const line2 = new Konva.Line({
          x: 0,
          y: 0,
          points: [ (this.width / 2) + 5, this.height - (this.pointerWidth + 15),
              (this.width / 2) + 20, this.height - (this.pointerWidth + 15)
          ],
          pointerLength: this.pointerWidth,
          pointerWidth: this.pointerWidth,
          fill: "black",
          stroke: "black",
          strokeWidth: 1
      });
      const line3 = new Konva.Arrow({
        x: 0,
        y: 0,
        points: [ 
            (this.width / 2) + 20, this.height - (this.pointerWidth + 15),
            (this.width / 2) + 20, (this.pointerWidth / 2) + 2,
            this.width - 2, (this.pointerWidth / 2) + 2
        ],
        pointerLength: this.pointerWidth,
        pointerWidth: this.pointerWidth,
        fill: "black",
        stroke: "darkgrey",
        strokeWidth: 1
    });
      const circle1 = new Konva.Circle({
        x: (this.width / 2),
        y: this.height - 16,
        radius: 10,
        fill: "#FFFFFF",
        stroke: "black",
        strokeWidth: 1
      });
      const triangle1 = new Konva.RegularPolygon({
        x: (this.width / 2),
        y: this.height - 6,
        radius: 10,
        sides: 3,
        fill: "#FFFFFF",
        stroke: "black",
        strokeWidth: 1
      });

        layer.add(triangle1);
        layer.add(circle1);
        layer.add(line1);
        layer.add(line2);
        layer.add(line3);
        stage.add(layer);
    }
});

Vue.component("demo-system-curve-inputs", {
    template: `
    <div>  
    <div class="row mb-2">
      <div class="col" align="right">
        <div class="upper_tank_pressure">      
          <p class="mb-0 mt-2" style="font-size: smaller">Upper Tank Pressure</p>
          <demo-tank v-model="pressureValue" :orientation="'horizontal'" :max-width="10" :show-ticks="false" :level-max="25" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-4 mt-auto" style="min-width:30%">
        <p class="mt-5 mb-0" style="font-size: smaller" align="right">Lower Tank Level</p>
        <demo-tank v-model="lowerLevelValue" :corner-radius=10 :max-height="100" :top-opacity="0" :show-ticks="false" align="right"></demo-tank>
      </div>
      <div class="col-4 d-flex mt-auto" style="min-width:30%; justify-content:center;">           
        <demo-flow-line align="left" :length="100" :direction="'far'"></demo-flow-line>
      </div>
      <div class="col-4" style="min-width:30%">
        <p class="mt-0 mb-0" style="font-size: smaller" align="left">Upper Tank Level</p>
        <demo-tank v-model="upperLevelValue" :corner-radius=10 :max-height="100" :show-ticks="false" :fill-color="upperTankFillColor" style="margin-bottom: 90px;margin-left: 5px"></demo-tank>
      </div>
    </div>
    <div class="row mb-2 mt-1">
      <div class="col" align="center">
        <div class="resistance">      
          <p class="mb-0" style="font-size: smaller">Friction Losses</p>
          <p class="mb-0" style="font-size: x-small">(Major + Minor Losses)</p>
          <demo-tank v-model="resistanceValue":orientation="'horizontal'" :max-width="10" :show-ticks="false" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
        </div>
      </div>
    </div>
    </div>
    `,
    props: {
        rangeInputColor: { 
          type: String,
          default: "#848482"
        },
        upperTankFillColor: {
          type: String,
          default: "orange"
        },
        lowerLevel: {
          type: Number,
          default: 0
        },
        upperLevel: {
          type: Number,
          default: 0
        },
        resistance: {
          type: Number,
          default: 0
        },
        pressure: { 
          type: Number,
          default: 0
        }
    },
    data: function() {
        return {
          lowerLevelValue: 5,
          upperLevelValue: 6,
          resistanceValue: 2,
          pressureValue: 15
        }
    },
    mounted: function() {

    },
    watch: {
      lowerLevelValue: function(value) {
        this.$emit("update:lowerLevel", value)
      },
      upperLevelValue: function(value) {
        this.$emit("update:upperLevel", value)
      },
      resistanceValue: function(value) {
        this.$emit("update:resistance", value)
      },
      pressureValue: function(value) {
        this.$emit("update:pressure", value)
      },
    }
});

Vue.component("demo-input-slider", {
  props: ['value', 'label', 'min', 'max'],
  template: `
  <div class="row">
    <label class="col-sm-1">{{ label }}</label>
    <div class="col-sm-3">
      <input type="range" class="form-range" v-bind:value="value" v-bind:min="min" v-bind:max="max" v-on:input="$emit('update:value', parseInt($event.target.value))"></input>
    </div>
    <span class="col-sm-1">{{ value }}</span>
  </div>
  `
});

Vue.component('demo-system-curve', {
  props: ['init'],
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
  <table class="table">
    <tr class="demonstrator">
      <td colspan="5">
        <div  class="demo-inputs" style="min-width:50%">
          <demo-system-curve-inputs 
            :lower-level.sync="lowerLevel"
            :upper-level.sync="upperLevel"
            :resistance.sync="totalResistence"
            :pressure.sync="atmospheres"
          >
        </demo-system-curve-inputs>
        </div>
      </td>
      <td colspan="6">
        <div class="demo-chart" style="min-width=50%">
        </div>
      </td>
      <!--div class="demo-bar-chart col"> KK TODO
      </div-->
    </tr>
  </table>
  `,
  mounted: function () {
    const chartElem = $(this.$el).find('.demo-chart')[0];
    const component = this;
    const series = this.getSeries();

    const options = {
      chart: {
        type: "rangeArea",
        animations: { enabled: false },
        toolbar: { show: false },
        height: 300
      },
      series: series,
      dataLabels: {
        enabled: false
      },
      //colors: ["#FF8800", "#0000FF", "#FF8800"], 
      tooltip: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: [3, 3, 0]
      },
      fill: {
        opacity: [1, 0.25, 0.25],
      },
      markers: {
        hover: { sizeOffset: 6 }
      },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        borderColor: '#85929E',
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
        },
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
      return CurveCalculators.calcSystemCurveValues(
        this.velocities, 
        this.atmospheres, 
        this.upperLevel, 
        this.lowerLevel, 
        this.elevation,
        this.totalResistence
      )
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
        type: 'area',
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

Vue.component('demo-pump-curve', {
  props: ['init'],
  data: function () {
    return {
      elevation: 10,
      min: 0,
      max: 10,
      lowerLevel: 5,
      upperLevel: 10,
      totalResistence: 5,
      pumpSpeed: 95, // percentage
      velocities: [0,1,2,3,4,5,6,7,8,9,10],
      coefA: 70,
      coefB: -2,
      coefC: -0.4,
      chart: null
    };
  },
  template: `
  <table class="table">
    <tr class="demonstrator">
      <td colspan="5">
        <div  class="demo-inputs" style="min-width:50%">
          <demo-system-curve-inputs 
            :lower-level.sync="lowerLevel"
            :upper-level.sync="upperLevel"
            :resistance.sync="totalResistence"
          >
        </demo-system-curve-inputs>
        </div>
      </td>
      <td colspan="6">
        <div class="demo-chart" style="min-width=50%">
        </div>
      </td>
      <!--div class="demo-bar-chart col"> KK TODO
      </div-->
    </tr>
  </table>
  `,
  mounted: function() { 
    const chartElem = $(this.$el).find('.demo-chart')[0];
    const series = this.getSeries();

    const options = {
      chart: {
        type: "rangeArea",
        animations: { enabled: false },
        toolbar: { show: false },
        height: 300
      },
      series: series,
      dataLabels: {
        enabled: false
      },
      //colors: ["#FF8800", "#0000FF", "#FF8800"], 
      tooltip: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: [3, 3, 0]
      },
      fill: {
        opacity: [1, 0.25, 0.25],
      },
      markers: {
        hover: { sizeOffset: 6 }
      },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        borderColor: '#85929E',
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
        },
      },
      yaxis: { 
        min: 0,
        max: 140,
        decimalsInFloat: false,
        title: {
          text: "Head"
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
    calculations: function() {
      return CurveCalculators.calcPumpSystemPlotValues(
        this.velocities,
        this.upperLevel,
        this.lowerLevel,
        this.elevation,
        this.totalResistence,
        this.pumpSpeed / 100,
        this.coefA,
        this.coefB,
        this.coefC
      )
    },
    getSeries: function() {
      const curveData = this.pumpSystemCurveData;
      const series = [];

      series.push({
        name: 'Total Head',
        type: 'line',
        data: this.velocities.map(v => ({ x: v, y: curveData.totalHead[v] }))
      });
      series.push({
        name: 'Static Head',
        type: 'area',
        data: this.velocities.map(v => ({ x: v, y: curveData.staticHead[v] })) 
      });
      series.push({
        name: 'Friction Head',
        type: 'rangeArea',
        data: this.velocities.map(v => ({ x: v, y: [ curveData.staticHead[v], curveData.totalHead[v] ] })) 
      });
      series.push({
        name: 'Pump Head',
        type: 'line',
        data: this.velocities.map(v => ({ x: v, y: curveData.pumpHead[v] })) 
      });
      series.push({
        name: 'Full Speed Pump',
        type: 'line',
        data: this.velocities.map(v => ({ x: v, y: curveData.pumpHeadFullSpeed[v] })) 
      });

      return series;

    },
    getTooltip: function(dataPointIndex) {
      const curveData = this.pumpSystemCurveData;
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
    pumpSystemCurveData: {
      get() {
        return this.calculations(this.velocities);
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
    }
  }

})