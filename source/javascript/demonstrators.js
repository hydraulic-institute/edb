(() => {
  const calcSysCurveStaticHead = (atmospheres, upperLevel, lowerLevel, elevation) => {
    const value = (atmospheres * 2.31) + upperLevel - lowerLevel + elevation;
    return parseFloat(value);
  };

  const calcFrictionHead = (velocityIndex, resistance) => {
    const value = resistance * (velocityIndex / 4) ** 2;
    return value;
  }

  const calcPumpHead = (velocityIndex, speed, coefA, coefB, coefC) => {
    return Math.pow(speed,2)*coefA + speed*coefB*velocityIndex + coefC*Math.pow(velocityIndex,2);
  }

  const calcPumpSystemPlotValues = ( 
    velocities, speed, coefA, coefB, coefC) => {
      const values = {
        pumpHead: [],
        pumpHeadFullSpeed: []
      };

      velocities.forEach(v => {
        const pumpHead = calcPumpHead(v, speed, coefA, coefB, coefC);
        const pumpHeadFullSpeed = calcPumpHead(v, 1, coefA, coefB, coefC);

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
        },
        placement: {
          type: String,
          default: "lower"
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
                opacity: 1,
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
            //console.log("rendertank - placement "+this.placement+ JSON.stringify(levelPosition));
            let x_level=levelPosition.x
            if (!this.isHorizontal) {
              x_level=levelPosition.x+(this.tank.tank.width()/2);
            }
            this.tank.knob.absolutePosition({x:x_level, y:levelPosition.y, newHeight:levelPosition.newHeight});
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
            default: 120
        },
        height: { 
            type: Number,
            default: 120
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
        const elbow1 = new Konva.Line({
          x: 0,
          y: 0,
          points: [ (this.width / 2) + 20, this.height - (this.pointerWidth + 15),
              (this.width / 2) + 30, this.height - (this.pointerWidth + 15),
              (this.width /2) + 30, this.height - (this.pointerWidth + 25)
          ],
          stroke: "grey",
          strokeWidth: 8
      });
        const leftbowtie = new Konva.RegularPolygon({
          x: (this.width / 2) + 25,
          y: (this.pointerWidth / 2) + 2,
          radius: 5,
          sides: 3,
          fill: "#FFFFFF",
          stroke: "grey",
          strokeWidth: 1,
          rotation: -30,
        });
        const rightbowtie = new Konva.RegularPolygon({
          x: (this.width / 2) + 35,
          y: (this.pointerWidth / 2) + 2,
          radius: 5,
          sides: 3,
          fill: "#FFFFFF",
          stroke: "grey",
          strokeWidth: 1,
          rotation: 30,
        });
        const line1 = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [
                0, this.height - (this.pointerWidth + 5), 
                (this.width / 2) - circle1.radius(), this.height - (this.pointerWidth + 5),
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
              (this.width / 2) + 30, this.height - (this.pointerWidth + 15)
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
            (this.width / 2) + 30, this.height - (this.pointerWidth + 15),
            (this.width / 2) + 30, this.pointerWidth - 5,
            this.width - 2, this.pointerWidth - 5
        ],
        pointerLength: this.pointerWidth,
        pointerWidth: this.pointerWidth,
        fill: "black",
        stroke: "darkgrey",
        strokeWidth: 1
      });
      

        layer.add(triangle1);
        layer.add(circle1);
        layer.add(line1);
        layer.add(line2);
        layer.add(line3);
        layer.add(elbow1);
        layer.add(leftbowtie);
        layer.add(rightbowtie);
        stage.add(layer);
    }
});

Vue.component("demo-system-curve-inputs", {
    template: `
    <div class="wrap">  
    <div class="row mb-2">
      <div class="col-8"></div>
      <div class="col-4" align="left" id="upper-tank-pressure-id" style="padding: 0px;">
        <div class="upper_tank_pressure">      
          <p class="mb-0 mt-2" style="font-size: smaller">Upper Tank Pressure</p>
          <demo-tank v-model="pressureValue" :orientation="'horizontal'" :max-width="10" :show-ticks="false" :level-max="25" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-4 mt-auto" style="padding: 0;" id="lower-tank-level-id">
        <p class="mt-5 mb-0" style="font-size: smaller" align="right">Lower Tank Level</p>
        <demo-tank v-model="lowerLevelValue" :corner-radius=10 :max-height="100" :top-opacity="0" :show-ticks="false" :placement="lower" align="right"></demo-tank>
      </div>
      <div class="col-4 mt-auto" style="padding: 0;" id="demo-flow-line-id">           
        <demo-flow-line align="center" :direction="'far'"></demo-flow-line>
      </div>
      <div class="col-4" style="padding: 0;" id="upper-tank-level-id">
        <p class="mt-0 mb-0" style="font-size: smaller" align="left">Upper Tank Level</p>
        <demo-tank v-model="upperLevelValue" :corner-radius=10 :max-height="100" :show-ticks="false" :fill-color="upperTankFillColor" :placement="upper" style="margin-bottom: 90px; margin-left: 5px"></demo-tank>
      </div>
    </div>
    <div class="row mb-2 mt-1">
      <div class="col" align="center" id="friction-losses-id">
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
        lower: {
          type: String,
          default: "lower"
        },
        upper: {
          type: String,
          default: "upper"
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

Vue.component("demo-pump-system-plot-inputs", {
  template: `
  <div class="wrap">  
  <div class="row mb-2">
    <div class="col-8"></div>
    <div class="col-4" align="left" id="upper-tank-pressure-id" style="padding: 0px;">   
      <div class="upper_tank_pressure">
        <p class="mb-0 mt-2" style="font-size: smaller">Upper Tank Pressure</p>
        <demo-tank v-model="pressureValue" :orientation="'horizontal'" :max-width="10" :show-ticks="false" :level-max="25" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
      </div>
    </div>
  </div> 
  <div class="row mb-2">
    <div class="col-4 mt-auto" style="padding: 0;" id="lower-tank-level-id">
      <p class="mt-5 mb-0" style="font-size: smaller" align="right">Lower Tank Level</p>
      <demo-tank v-model="lowerLevelValue" :corner-radius=10 :max-height="100" :top-opacity="0" :show-ticks="false" :placement="lower" align="right"></demo-tank>
    </div>
    <div class="col-4 mt-auto" style="padding: 0;" id="demo-flow-line-id">           
      <demo-flow-line align="center" :direction="'far'"></demo-flow-line>
    </div>
    <div class="col-4" style="padding: 0;" id="upper-tank-level-id">
      <p class="mt-0 mb-0" style="font-size: smaller" align="left">Upper Tank Level</p>
      <demo-tank v-model="upperLevelValue" ::corner-radius=10 :max-height="100" :show-ticks="false" :fill-color="upperTankFillColor" :placement="upper" style="margin-bottom: 90px; margin-left: 5px"></demo-tank>
    </div>
  </div>
  <div class="row mb-2 mt-1">
    <div class="col" align="center" id="pump-speed-id">
      <div class="">      
        <p class="mb-0" style="font-size: smaller">Pump Speed (<strong><span v-text="pumpSpeed"></span>%</strong>)</p>
        <demo-tank v-model="pumpSpeedValue" :level-min="0" :level-max="70" :orientation="'horizontal'" :max-width="10" :max-height="200" :show-ticks="false" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
      </div>
    </div>
  </div>
  <div class="row mb-2 mt-1">
    <div class="col" align="center" id="friction-losses-id">
      <div class="resistance">
        <p class="mb-0" style="font-size: smaller">Friction Losses</p>
        <p class="mb-0" style="font-size: x-small">(Major + Minor Losses)</p>
        <demo-tank v-model="resistanceValue" :orientation="'horizontal'" :max-width="10" :show-ticks="false" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
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
      lower: {
        type: String,
        default: "lower"
      },
      upper: {
        type: String,
        default: "upper"
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
      pumpSpeed: { 
        type: Number,
        default: 95
      }
  },
  data: function() {
      return {
        lowerLevelValue: 5,
        upperLevelValue: 6,
        resistanceValue: 2,
        pumpSpeedValue: 45,
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
    pumpSpeedValue: function(value) {
      this.$emit("update:pumpSpeed", value + 50)
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
  <div class="container-fluid">
    <div class="row demonstrator">
      <div class="col-sm-12 col-md-5">
        <div  class="demo-inputs" style="">
          <demo-system-curve-inputs 
            :lower-level.sync="lowerLevel"
            :upper-level.sync="upperLevel"
            :resistance.sync="totalResistence"
            :pressure.sync="atmospheres"
          >
          </demo-system-curve-inputs>
        </div>
      </div>
      <div class="col-sm-12 col-md-7">
        <div class="demo-chart" style=""></div>
      </div>
    </div>
  </div>
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
      atmospheres: 7,
      pumpSpeed: 95, // percentage
      velocities: [0,1,2,3,4,5,6,7,8,9,10],
      coefA: 70,
      coefB: -2,
      coefC: -0.4,
      chart: null
    };
  },
  template: `
  <div class="container-fluid">
  <div class="row demonstrator">
    <div class="col-sm-12 col-md-5">
      <div  class="demo-inputs" style="">
          <demo-pump-system-plot-inputs
            :lower-level.sync="lowerLevel"
            :upper-level.sync="upperLevel"
            :resistance.sync="totalResistence"
            :pressure.sync="atmospheres"
            :pump-speed.sync="pumpSpeed"
          >
          </demo-pump-system-plot-inputs>
        </div>
      </div>
      <div class="col-sm-12 col-md-7">
        <div class="demo-chart" style=""></div>
      </div>
    </div>
  </div>
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
      tooltip: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: [3, 3, 0, 3, 3]
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
      const sys_values = CurveCalculators.calcSystemCurveValues(
        this.velocities, 
        this.atmospheres, 
        this.upperLevel, 
        this.lowerLevel, 
        this.elevation,
        this.totalResistence);

      const pump_values = CurveCalculators.calcPumpSystemPlotValues(
          this.velocities,
          this.pumpSpeed / 100,
          this.coefA,
          this.coefB,
          this.coefC
        );
      
      const values=Object.assign({}, sys_values, pump_values);
      return values;
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
        `<div><strong>Pump Head: </strong><span>${curveData.pumpHead[dataPointIndex]}</span></div>` +      
        `<div><strong>Full Speed Pump: </strong><span>${curveData.pumpHeadFullSpeed[dataPointIndex]}</span></div>` +      
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
    },
    pumpSpeed: function() {
      this.refreshChart();
    },
    atmospheres: function() {
      this.refreshChart();
    }
  }
});

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
        volume_data: {'bottomhead': {'desc': 'Volume in Bottom Head', 'type': 'Bottom Type', 'value': null, 'converted_value': null, 'varname': 'bottom_type'},
                      'endhead': {'desc': 'Volume in Ends', 'type': 'End Type', 'value': null,  'converted_value': null, 'varname': 'end_type'},
                      'cylindrical': {'desc': 'Volume in Cylindrical Section', 'type': '', 'value': null, 'converted_value': null},
                      'tophead': {'desc': 'Volume in Top Head', 'type': 'Top Type', 'value': null,  'converted_value': null, 'varname': 'top_type'},
                      'total_liquid': {'desc': 'Total Liquid Volume', 'type': '', 'value': null, 'converted_value': null },
                      'total_tank': {'desc': 'Total Tank Volume', 'type': '', 'value': null, 'converted_value': null}
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
        check_depth: 1,
        end_types: ['2:1 Elliptical','Hemispheric','Flat'],
        end_image_types: ['elliptical','hemispheric','flat'],
        top_type: null,
        bottom_type: null,
        end_type: null,
        length_unit: 'Feet',
        length_types: ['Inches','Feet','Meters','Millimeters'],
        length_multiplier: [1,0.083333,0.0254,25.4],
        conversion_unit: 'Cubic Feet',
        conversion_types: ['Cubic Inches', 'Cubic Feet', 'Cubic Meters', 'Gallons'],
        conversion_multiplier: [1,0.000579,0.0000164,0.004329],
        conversion_xmultiplier: {'Inches': {'Cubic_Inches': 1, 'Cubic_Feet': 0.000579,  'Cubic_Meters': 0.0000164, 'Gallons': 0.004329},
                              'Feet': {'Cubic_Inches': 1728, 'Cubic_Feet': 1,  'Cubic_Meters': 0.0283, 'Gallons': 7.480519},
                              'Meters': {'Cubic_Inches': 61023.7, 'Cubic_Feet': 35.315,  'Cubic_Meters': 1, 'Gallons': 264.172}
        },
        image_str: '',
        saved_props: ['d_diameter','a_length','h_filldepth','length_units','top_type','bottom_type'],
    }
  },
  template: '#tank-demo-template',
  mounted: function() {
    const v = this;
    v.top_type=v.end_types[0];
    v.bottom_type=v.end_types[1];
    v.end_type=v.end_types[1];
    //this.tank_data['top']=this.end_image_types;
    //this.tank_data['bottom']=this.end_image_types;
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
    do_page_calculate: function() {
      //Has anything changed?

      this.tank_data['tank_parts']={
        'vt':[this.bottom_type,this.top_type],
        'ht':[this.end_type],
        'st':[]
      };
      //Calculate the variables
      this.calculate_volumes();

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
      this.image_str='/images/'+out_image_str+'.png';
      
      //create volume strings and calculate based on values
      let str_array=this.tank_data['tank_volumes'][this.tank_key];
      this.volume_strings=[];
      //Set up array of strings to show
      for(var i=0;i<str_array.length;i++) {
        this.volume_strings.push(this.volume_data[str_array[i]]);
      }
    },
    //Vol of cylindrical section
    vol_vertical_cylinder: function() {
      return Math.PI*this.h_filldepth*Math.pow(this.d_diameter,2)/4
    },
    vol_spherical_tank: function() {
      if ((this.h_filldepth == null) || (this.d_diameter == null)) { return null; }
      var use_filldepth = parseFloat(this.h_filldepth);
      var use_diameter = parseFloat(this.d_diameter);
      this.volume_data['total_liquid']['value'] = this.format_number(1/3*Math.PI*Math.pow(use_filldepth,2)*(3*(use_diameter/2)-use_filldepth));
      this.volume_data['total_tank']['value'] = this.format_number(4/3*Math.PI*Math.pow((use_diameter/2),3));
      if (use_filldepth > use_diameter) { this.check_depth=0; }
      else { this.check_depth=1; }
      this.h_filldepth = this.format_number(use_filldepth);
      this.d_diameter = this.format_number(use_diameter);
      this.volume_data['total_liquid']['converted_value']=this.convert_val(this.volume_data['total_liquid']['value']);
      this.volume_data['total_tank']['converted_value']=this.convert_val(this.volume_data['total_tank']['value']);
    },
    calculate_volumes: function(event) {
      if (event && event.type=="Enter") { event.preventDefault(); }
      if (this.tank_key == 'st') {
        this.vol_spherical_tank();
      }
    },
    convert_val: function(in_val) {
      if (true) {
        var from_unit = this.length_unit;
        var to_unit = this.conversion_unit.split(' ').join('_');
        if ( to_unit.includes(from_unit)) { return in_val; }
        var use_from_unit = from_unit;
        if (from_unit == "Millimeters") { use_from_unit = "Meters"}
        var out_val = parseFloat(in_val) * this.conversion_xmultiplier[use_from_unit][to_unit];
        if (use_from_unit != from_unit) {
          out_val = out_val*1e-9;
        }
      }
      if (false) {
        var from_unit_index = this.length_types.indexOf(this.length_unit);
        var to_unit_index = this.conversion_types.indexOf(this.conversion_unit);
        var out_val = (parseFloat(in_val))/(Math.pow(this.length_multiplier[from_unit_index],3));
        out_val=out_val*this.conversion_multiplier[to_unit_index];
      }
      return this.format_number(out_val);
    },
    format_number: function(in_number) {
      return (parseFloat(in_number.toFixed(2))).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
  },
  computed: {
    percent_full: function() {
      if (!this.volume_data['total_liquid']['value'] || !this.volume_data['total_tank']['value']) {return null;}
      var calculation=100*parseFloat(this.volume_data['total_liquid']['value'])/parseFloat(this.volume_data['total_tank']['value']);
      return this.format_number(calculation);
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