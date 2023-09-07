(() => {
  const calcSysCurveStaticHead = (atmospheres, upperLevel, lowerLevel, elevation) => {
    //OR IS IT Upper-Lower+elevation???
    const value = (atmospheres * 2.31) + upperLevel - lowerLevel + elevation;
    return parseFloat(value);
  };

  const calcFrictionHead = (velocityIndex, resistance) => {
    const value = resistance * Math.pow((velocityIndex / 4),2);
    return value;
  }

  const calcFrictionHead_BarHeight = (totalResistance, speed, staticHead, coefA, coefB, coefC) => {
    const Q = calcIntersectionPointValue(1, totalResistance, speed, staticHead, coefA, coefB, coefC);
    return Math.pow(speed,2)*coefA + speed*coefB*Q + (coefC*Math.pow(Q,2)-staticHead);
  }

  const calcPumpHead = (velocityIndex, speed, coefA, coefB, coefC) => {
    return Math.pow(speed,2)*coefA + speed*coefB*velocityIndex + coefC*Math.pow(velocityIndex,2);
  }

  const calc_coefs = (which_pump, coefA, coefB, coefC) => {
    const coefs={'coefA': coefA, 'coefB': coefB, 'coefC':coefC};
    if (which_pump==1) {return coefs;}

    coefs['coefB']=coefB/which_pump;
    coefs['coefC']=coefC/Math.pow(which_pump,2);
    return coefs;
  }

  const calcPumpSystemPlotValues = ( 
    which_pump, velocities, speed, coefA, coefB, coefC) => {
      const values = {
        pumpHead: [],
        pumpHeadFullSpeed: []
      };
      const coefs=calc_coefs(which_pump, coefA, coefB, coefC);

      velocities.forEach(v => {
        const pumpHead = calcPumpHead(v, speed, coefs['coefA'], coefs['coefB'], coefs['coefC']); 
        values.pumpHead.push(parseFloat(pumpHead.toFixed(2)));
        //Only for 1 pump
        if (which_pump == 1) {
          const pumpHeadFullSpeed = calcPumpHead(v, 1, coefs['coefA'], coefs['coefB'], coefs['coefC']);
          values.pumpHeadFullSpeed.push(parseFloat(pumpHeadFullSpeed.toFixed(2)));
        }
      });
      return values;
  }

  const calcSystemCurveValues = (velocities, atmospheres, upperLevel, lowerLevel, elevation, totalResistance) => {
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
        const frictionHead = calcFrictionHead(v, parseFloat(totalResistance));
        const totalHead = staticHead + frictionHead;
  
        values.frictionHead.push(parseFloat(frictionHead.toFixed(2)));
        values.staticHead.push(parseFloat(staticHead.toFixed(2)));
        values.totalHead.push(parseFloat(totalHead.toFixed(2)));
    });

    return values;
  }

  const calcIntersectionPointValue = (which_pump, totalResistance, speed, staticHead, coefA, coefB, coefC) => {
      const coefs=calc_coefs(which_pump,coefA,coefB,coefC);
      const A=coefs['coefC']-totalResistance/Math.pow(4,2);
      const B=speed*coefs['coefB'];
      const C=coefs['coefA']*Math.pow(speed,2)-staticHead;
      const Q=((B*-1) - Math.sqrt(Math.pow(B,2)-(4*C*A)))/(2*A);
      return parseFloat(Q.toFixed(2));
  }

  const calcIncreases = (which_pump,totalResistance,speed,staticHead,coefA,coefB,coefC) => {
    const coefs=calc_coefs(which_pump,coefA,coefB,coefC);
    //Get info for Pump 1
    const Q=calcIntersectionPointValue(1,totalResistance,speed,staticHead,coefA,coefB,coefC);
    const pumpHead=calcPumpHead(Q,speed,coefA,coefB,coefC);
    console.log("Pump1: Q:"+Q+" H:"+pumpHead);
    //Get info for which_pump
    const Qprime=calcIntersectionPointValue(which_pump,totalResistance,speed,staticHead,coefA,coefB,coefC);
    const pumpHeadprime=calcPumpHead(Qprime,speed,coefs['coefA'],coefs['coefB'],coefs['coefC']);
    console.log("Pump: Q:"+Qprime+" H:"+pumpHeadprime);
    const values={
      headIncrease: parseInt(Math.ceil(((pumpHeadprime-pumpHead)/pumpHead)*100)),
      flowIncrease: parseInt(Math.ceil(((Qprime-Q)/Q)*100)),
      intersectionPointValues: [Q, Qprime],
      pumpHeadValues: [pumpHead, pumpHeadprime]
    }
    return values;
  }
  
  window.CurveCalculators = {
    calcSysCurveStaticHead,
    calcFrictionHead,
    calcSystemCurveValues,
    calcPumpSystemPlotValues,
    calcIntersectionPointValue,
    calcFrictionHead_BarHeight,
    calcIncreases
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
        },
        length_units: {
          type: Number,
          default: 10
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
        const calc_stageNormalWidth = this.maxWidth + this.knobRadius + 2;
        const stageNormalWidth = ((this.placement == "upper") ? calc_stageNormalWidth+20 : calc_stageNormalWidth);
        const calc_stageNormalHeight = this.maxHeight + (this.knobRadius * 2) + 2;
        const stageNormalHeight = ((this.placement == "upper") ? (2*calc_stageNormalHeight)-(this.knobRadius*2) : calc_stageNormalHeight);
    
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
            width_line: new Konva.Line({
              x: 0,
              y: 0,
              points: [this.knobRadius, this.knobRadius+(this.maxHeight*2),this.knobRadius+this.maxWidth, this.knobRadius+(this.maxHeight*2)],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: "blue",
              stroke: "blue",
              strokeWidth: 1
            }),
            height_line: new Konva.Arrow({
              x: 0,
              y: 0,
              points: [this.knobRadius+(this.maxWidth/2), this.knobRadius+(this.maxHeight*2),this.knobRadius+(this.maxWidth/2), this.knobRadius+this.maxHeight],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: "blue",
              stroke: "blue",
              strokeWidth: 1
            }),
            height_text: new Konva.Text({
              x: (this.knobRadius+(this.maxWidth/2)+3),
              y: (this.knobRadius+(this.maxHeight*2))*(3/4),
              fontSize: 10,
              fontFamily: 'Verdana',
              fill: 'black',
              align: 'center',
              text: this.length_units.toString()+" feet",
              listening: false,
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
        if (this.placement == "upper") {
          tank.group.add(tank.width_line);
          tank.group.add(tank.height_line);
          tank.group.add(tank.height_text);
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
            ////console.log("rendertank - placement "+this.placement+ JSON.stringify(levelPosition));
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
        <demo-tank v-model="upperLevelValue" :corner-radius=10 :max-height="100" :show-ticks="false" :fill-color="upperTankFillColor" :placement="upper" style="margin-left: 5px"></demo-tank>
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
        },
    },
    data: function() {
      return {
        lowerLevelValue:  0,
        upperLevelValue: 0,
        resistanceValue: 0,
        pressureValue: 0,
      }
    },
    created: function() {
      const v = this; 
      v.lowerLevelValue = v.lowerLevel;
      v.upperLevelValue = v.upperLevel;
      v.resistanceValue = v.resistance;
      v.pressureValue = v.pressure;
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
    <div v-if='!multiplePumps' class="col-8"></div>
    <div v-else class="col-6" id="parallel-pumps-id">
      <p class="mt-0 mb-0" style="font-size: smaller" align="left"><strong># Parallel Pumps</strong></p>
      <div class="row m-0">
        <div class="col-6" align="right">
          <input v-model='pumpCountValue' class="input" type="number" min="2" max="3"/>
        </div>
      </div>
    </div>
    <div v-if='!multiplePumps' class="col-4" align="left" id="upper-tank-pressure-id" style="padding: 0px;">   
      <div class="upper_tank_pressure">
        <p class="mb-0 mt-2" style="font-size: smaller">Upper Tank Pressure</p>
        <demo-tank v-model="pressureValue" :orientation="'horizontal'" :max-width="10" :show-ticks="false" :level-max="25" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
      </div>
    </div>
    <div v-else class="col" align="left">
      <p class="mt-0 mb-0" style="font-size: smaller" align="left"><strong>For the Same System</strong></p>
      <p class="mt-0 mb-0" style="font-size: smaller">Head Increase: <span v-text="headIncrease"></span>%</p>
      <p class="mt-0 mb-0" style="font-size: smaller">Flow Increase:  <span v-text="flowIncrease"></span>%</p>
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
      <demo-tank v-model="upperLevelValue" ::corner-radius=10 :max-height="100" :show-ticks="false" :fill-color="upperTankFillColor" :placement="upper" style="margin-left: 5px"></demo-tank>
    </div>
  </div>
  <div class="row mb-2 mt-1">
    <div class="col" align="center" id="pump-speed-id">
      <div class="">      
        <p class="mb-0" style="font-size: smaller">Pump Speed (<strong><span v-text="pumpSpeed"></span>%</strong>)</p>
        <demo-tank v-model="pumpSpeedValue" :level-min="0" :level-max="120" :orientation="'horizontal'" :max-width="10" :max-height="200" :show-ticks="false" :knob-radius="7" :level-color="rangeInputColor"></demo-tank>
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
        default: 0
      },
      pumpCount: {
        type: Number,
        default: 1
      },
      pressure: {
        type: Number,
        default: 0
      },
      multiplePumps: {
        type: Number,
        default: 0
      },
      flowIncrease: {
        type: Number,
        default: 0
      },
      headIncrease: {
        type: Number,
        default: 0
      }
  },
  data: function() {
      return {
        lowerLevelValue: 0,
        upperLevelValue: 0,
        resistanceValue: 0,
        pumpSpeedValue: 0,
        pressureValue: 0,
        pumpCountValue: 0,
      }
  },
  created: function() {
    const v = this; 
    v.lowerLevelValue = v.lowerLevel;
    v.upperLevelValue = v.upperLevel;
    v.resistanceValue = v.resistance;
    v.pumpSpeedValue = v.pumpSpeed;
    v.pressureValue = v.pressure;
    v.pumpCountValue = v.pumpCount;
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
      this.$emit("update:pumpSpeed", value)
    },
    pressureValue: function(value) {
      this.$emit("update:pressure", value)
    },
    pumpCountValue: function(value) {
      this.$emit("update:pumpCount", parseInt(value))
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
        lowerLevel: 0,
        upperLevel: 0,
        totalResistance: 0,
        pressure: 0,
        velocities: [0,1,2,3,4,5,6,7,8,9,10],
        chart: null
      };
  },
  created: function() {
    const v=JSON.parse(this.init);
    this.lowerLevel=parseInt(v.lowerTankLevel);
    this.upperLevel=parseInt(v.upperTankLevel);
    this.totalResistance=parseInt(v.overallResistance);
    this.pressure=parseInt(v.upperTankPressure);
  },
  template: `
  <div class="container-fluid">
    <div class="row demonstrator">
      <div class="col-sm-12 col-md-5">
        <div  class="demo-inputs" style="">
          <demo-system-curve-inputs 
            :lower-level.sync="lowerLevel"
            :upper-level.sync="upperLevel"
            :resistance.sync="totalResistance"
            :pressure.sync="pressure"
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
        height: 400
      },
      series: series,
      dataLabels: {
        enabled: false
      },
      colors: ['#FF3E30','#176BEF','#F7B529','#179C52','#85929E', '#4A235A'],
      
      tooltip: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: [2, 2, 0]
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
        borderColor: '#CDD4DB',
      },
      xaxis: {
        velocities: this.velocities,
        title: {
          text: "Flow Rate"
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
    systemCalculator: function() {
      //console.log("Calc CurveVals: pressure: "+this.pressure+" Upper: "+this.upperLevel+" Lower: "+this.lowerLevel+" Resistance: "+this.totalResistance);
      return CurveCalculators.calcSystemCurveValues(
        this.velocities, 
        this.pressure, 
        this.upperLevel, 
        this.lowerLevel, 
        this.elevation,
        this.totalResistance
      )
    },
    getSeries: function() {
      const curveData = this.systemCurveData;
      const series = [];

      series.push({
        name: 'System Curve',
        type: 'line',
        data: this.velocities.map(v => ({ x: v, y: curveData.totalHead[v] }))
      });
      series.push({
        name: 'Static Head',
        type: 'area',
        data: this.velocities.map(v => ({ x: v, y: (curveData.staticHead[v] - 1) })) 
      });
      series.push({
        name: 'Friction Head',
        type: 'rangeArea',
        data: this.velocities.map(v => ({ x: v, y: [ (curveData.staticHead[v]-1), curveData.totalHead[v] ] })) 
      });

      return series;
    },
    getTooltip: function(dataPointIndex) {
      const curveData = this.systemCurveData;
      return '<div>' +
        `<div><strong>System Curve: </strong><span>${curveData.totalHead[dataPointIndex]}</span></div>` +
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
        return this.systemCalculator();
      }
    }
  },
  watch: {
    lowerLevel: function() {
      console.log("LowerLevel changed to: "+this.lowerLevel);
      this.refreshChart();
    },
    upperLevel: function() {
      this.refreshChart();
    },
    totalResistance: function() {
      this.refreshChart();
    },
    pressure: function() {
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
      lowerLevel: 0,
      upperLevel: 0,
      totalResistance: 0,
      pressure: 0,
      pumpSpeed: 0, // percentage
      pumpCount: 1,
      multiplePumps: 0,
      pumpType: "system",
      velocities: [],
      coefA: 70,
      coefB: -2,
      coefC: -0.4,
      chart: null,
      flowIncrease: 0,
      headIncrease: 0,
      series_data: {
        "System Curve": {"type":"line", "color": "#FF3E30","stroke": 2, "opacity": 1},
        "Static Head":{"type":"area", "color": "#176BEF","stroke": 2, "opacity": 0.25}, 
        "Friction Head": {"type":"rangeArea", "color": "#F7B529","stroke": 0, "opacity": 0.25}, 
        "Operating Point": {"type":"line", "color":"#4A235A","stroke": 3, "opacity": 1}, 
        "Pump Curve (speed adjusted)": {"type":"line", "color":"#179C52","stroke": 2, "opacity": 1},
        "Pump Curve (base)": {"type":"line", "color": "#85929E","stroke": 2, "opacity": 1},
        "3 Parallel": {"type":"line", "color": "#B505AA","stroke": 2, "opacity": 1},
        "Series": {"type":"line", "color": "#90FF33","stroke": 4, "opacity": 1}
      },
      series_opacity: [],
      series_stroke: [],
      series_color: [],
      series_names: []
    };
  },
  created: function() {
    const v=JSON.parse(this.init);
    const keys=Object.keys(v);
    for (var val in this._data) {
      if (keys.includes(val)) {
        if (typeof this._data[val] == "string") {
          this._data[val] = v[val];
        }
        else {
          this._data[val] = parseInt(v[val]);
        }
      }
    }
    this.velocities=[...Array(this.max+1).keys()]
    this.multiplePumps=(this.pumpCount > 1?1:0);
    this.series_names=Object.keys(this.series_data);
    for (var val in this.series_data) {
      this.series_opacity.push(this.series_data[val]["opacity"]);
      this.series_stroke.push(this.series_data[val]["stroke"]);
      this.series_color.push(this.series_data[val]["color"]);
    }
  },
  template: `
  <div class="container-fluid">
  <div class="row demonstrator">
    <div class="col-sm-12 col-md-5">
      <div  class="demo-inputs" style="">
          <demo-pump-system-plot-inputs 
            :multiple-pumps="multiplePumps"
            :flow-increase="flowIncrease"
            :head-increase="headIncrease"
            :lower-level.sync="lowerLevel"
            :upper-level.sync="upperLevel"
            :resistance.sync="totalResistance"
            :pressure.sync="pressure"
            :pump-speed.sync="pumpSpeed"
            :pump-count.sync="pumpCount"
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
    const chart_data = this.series_data;

    const options = {
      chart: {
        type: "rangeArea",
        animations: { enabled: false },
        toolbar: { show: false },
        height: 400
      },
      series: series,
      colors: this.series_color,
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: this.series_stroke
      },
      fill: {
        opacity: this.series_opacity
      },
      markers: {
        hover: { sizeOffset: 6 }
      },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        borderColor: '#CDD4DB',
      },
      xaxis: {
        type: 'numeric',
        min: 0,
        max: this.max,
        decimalsInFloat: false,
        tickAmount: 10,
        title: {
          text: "Flow Rate"
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
        type: 'numeric',
        min: 0,
        max: this.pumpSystemCurveData.pumps[0].pumpHeadFullSpeed[0]+20,
        tickAmount: 10,
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
      console.log("upperLevel: "+this.upperLevel+" lowerLevel: "+this.lowerLevel+" Resistance: "+this.totalResistance+" Speed: "+this.pumpSpeed)
      const sys_values = CurveCalculators.calcSystemCurveValues(
        this.velocities, 
        this.pressure, 
        this.upperLevel, 
        this.lowerLevel, 
        this.elevation,
        this.totalResistance);

      const pumps=[];  
      for (var i=0;i<this.pumpCount;i++) {
        let values = CurveCalculators.calcPumpSystemPlotValues(
          i+1,
          this.velocities,
          this.pumpSpeed / 100,
          this.coefA,
          this.coefB,
          this.coefC
        );

        values['intersection_value'] = CurveCalculators.calcIntersectionPointValue(
          i+1,
          this.totalResistance,
          this.pumpSpeed / 100,
          sys_values.staticHead[0],
          this.coefA,
          this.coefB,
          this.coefC
        );
        pumps.push(values);
      }

      //TODO Bar Chart with this friction head height and static head height stacked
      const frictionHead_Height = CurveCalculators.calcFrictionHead_BarHeight(
        this.totalResistance,
        this.pumpSpeed / 100,
        sys_values.staticHead[0],
        this.coefA,
        this.coefB,
        this.coefC
      );
      console.log("Number of Pumps: "+this.pumpCount);
      const values=Object.assign({}, sys_values);
      values['pumps']=pumps;
      //const kval=JSON.stringify(values);
      //console.log(kval);

      if (this.pumpType == "parallel") {
        const increases=CurveCalculators.calcIncreases(this.pumpCount, this.totalResistance, this.pumpSpeed/100, sys_values.staticHead[0],this.coefA,this.coefB,this.coefC);
        this.headIncrease=increases['headIncrease'];
        this.flowIncrease=increases['flowIncrease'];
        values['increases']=increases;
      }
      else {
        this.headIncrease=0;
        this.flowIncrease=0;
      }
      return values;
    },

    getSeries: function() {
      const curveData = this.pumpSystemCurveData;
      const series = [];
      const names = {"system": ['Pump Curve (speed adjusted)'], "parallel": ['Pump Curve (speed adjusted)','Pump Curve (base)','3 Parallel']}

      series.push({
        name: 'System Curve',
        type: this.series_data['System Curve']['type'],
        data: this.velocities.map(v => ({ x: v, y: curveData.totalHead[v] }))
      });
      series.push({
        name: 'Static Head',
        type: this.series_data['Static Head']['type'],
        data: this.velocities.map(v => ({ x: v, y: (curveData.staticHead[v]-1) })) 
      });
      series.push({
        name: 'Friction Head',
        type: this.series_data['Friction Head']['type'],
        data: this.velocities.map(v => ({ x: v, y: [ (curveData.staticHead[v]-1), curveData.totalHead[v] ] })) 
      });

      const yval=Math.max(curveData.pumps[0].pumpHead[0],curveData.pumps[0].pumpHeadFullSpeed[0],curveData.totalHead[9]);
      var xval=isNaN(curveData.pumps[this.pumpCount-1].intersection_value)?0:curveData.pumps[this.pumpCount-1].intersection_value;
      xval=Math.min(xval,this.velocities.length);
      console.log("XVal:"+xval+" YVal:"+yval);
      series.push({
        name: 'Operating Point',
        type: this.series_data['Operating Point']['type'],
        data: [{x: xval, y: 0},{x: xval, y: yval}]
      });

      for ( var i=0;i<this.pumpCount;i++) {
        let name=names[this.pumpType][i];
        series.push({
          name: name,
          type: this.series_data[name]['type'],
          data: this.velocities.map(v => ({ x: v, y: curveData.pumps[i].pumpHead[v] })) 
        });
      }

      if (this.pumpType == "system") {
        series.push({
          name: 'Pump Curve (base)',
          type: this.series_data['Pump Curve (base)']['type'],
          data: this.velocities.map(v => ({ x: v, y: curveData.pumps[0].pumpHeadFullSpeed[v] })) 
        });
      }

      if (this.pumpType == "parallel") {
        series.push({
          name: 'Series',
          type: this.series_data['Series']['type'],
          data: [
            {x:curveData.increases.intersectionPointValues[0], y:curveData.increases.pumpHeadValues[0]},
            {x:curveData.increases.intersectionPointValues[1], y:curveData.increases.pumpHeadValues[1]}
          ]
        });
      }
      
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
    refreshChart: function(value=null) {
      const series = this.getSeries();
      this.chart.updateSeries(series);
      //Update the opacity and stroke
      if (value) {
        let out_opacity=[...this.series_opacity];
        let out_stroke=[...this.series_stroke];
        let out_color=[...this.series_color];
        if (value == 2) {
          //Series is last.  Third pump is next to last
          let index=Object.keys(this.series_data).length-2;
          out_opacity.splice(index,1);
          out_stroke.splice(index,1);
          out_color.splice(index,1);
        }
        this.chart.updateOptions({  
          colors: out_color,
          stroke: {
            curve: "straight",
            width: out_stroke,
          },
          fill: {
            opacity: out_opacity
          },
        })
      }
    }
  },
  computed: {
    pumpSystemCurveData: {
      get() {
        return this.calculations();
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
    totalResistance: function() {
      this.refreshChart();
    },
    pumpSpeed: function() {
      this.refreshChart();
    },
    pressure: function() {
      this.refreshChart();
    },
    pumpCount: function(value) {
      this.refreshChart(value);
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
                      'cylindrical': {'desc': 'Volume in Cylinder', 'type': '', 'value': null, 'converted_value': null},
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
        conversion_types: ['Cubic Millimeters', 'Cubic Inches', 'Cubic Feet', 'Cubic Meters', 'Gallons', 'Barrels (Oil)', 'Liters'],
        swap_conv: false,
        conversion_mapper: {'Millimeters': 'mm3', 'Inches': 'in3', 'Feet': 'ft3', 'Meters': 'm3', 'Gallons': 'USgallons', 'Barrels (Oil)': 'barrels (oil)', 'Liters': 'liter'},
        
        image_str: '',
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
    calculate_volumes: function(event) {
      if (event && event.type=="Enter") { event.preventDefault(); }
      if (!this.has_all_data() ) { return null;}
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
        //console.log("ST Vol");
        tot_liquid_volume=this.vol_spherical_tank(this.d_diameter, this.h_filldepth);
        tot_tank_volume=this.vol_spherical_tank(this.d_diameter,this.d_diameter);

        if (this.h_filldepth > this.d_diameter) { this.check_depth = 0;}
        else {this.check_depth = 1;}
      }
      if (this.tank_key == 'ht') {
        //console.log("HT Vol");
        //Horizontal Tank
        //console.log("Horizontal tank");
        this.volume_data['cylindrical']['value']=this.vol_horizontal_cylinder(this.d_diameter,this.h_filldepth,this.a_length);
        tot_liquid_volume=this.volume_data['cylindrical']['value'];
        this.volume_data['cylindrical']['value']=this.float_to_str(this.volume_data['cylindrical']['value']);
        this.volume_data['cylindrical']['converted_value']=this.convert_val(this.volume_data['cylindrical']['value']);
        tot_tank_volume=this.vol_horizontal_cylinder(this.d_diameter,this.d_diameter,this.a_length);

        //Both ends
        //console.log("Do Ends (calc for 1 and double for total)");
        this.volume_data['endhead']['value']=(2*this.vol_horizontal_elliptical_end(this.d_diameter,this.h_filldepth,use_end_type));
        tot_liquid_volume+=this.volume_data['endhead']['value'];
        this.volume_data['endhead']['value']=this.float_to_str(this.volume_data['endhead']['value']);
        this.volume_data['endhead']['converted_value']=this.convert_val(this.volume_data['endhead']['value']);
        tot_tank_volume+=(2*this.vol_horizontal_elliptical_end(this.d_diameter,this.d_diameter,use_end_type));

        if (this.h_filldepth > this.d_diameter) { this.check_depth = 0;}
        else {this.check_depth = 1;}
      }
      if (this.tank_key == 'vt') {
        //Vertical Tank
        //console.log("VT Vol");
        //Bottom Head
        //console.log("Bottom Head")
        var my_H_val=this.get_H_value(use_bot_type,this.d_diameter,this.h_filldepth,this.a_length,is_top=false);
        this.volume_data['bottomhead']['value']=this.vol_vertical_elliptical_end(this.d_diameter,my_H_val,this.a_length,use_bot_type,is_top=false);
        tot_liquid_volume=this.volume_data['bottomhead']['value'];
        this.volume_data['bottomhead']['value']=this.float_to_str(this.volume_data['bottomhead']['value']);
        this.volume_data['bottomhead']['converted_value']=this.convert_val(this.volume_data['bottomhead']['value']);
        var zbot=this.get_z_value(use_bot_type,this.d_diameter);
        tot_tank_volume=this.vol_vertical_elliptical_end(this.d_diameter,zbot,this.a_length,use_bot_type,is_top=false);

        //Cylinder 
        //console.log("Cylinder");
        var cyl_H_val=this.cylindrical_H_value(this.d_diameter,this.h_filldepth,this.a_length,use_bot_type);
        this.volume_data['cylindrical']['value']=this.vol_vertical_cylinder(this.d_diameter,cyl_H_val);
        tot_liquid_volume+=this.volume_data['cylindrical']['value'];
        this.volume_data['cylindrical']['value']=this.float_to_str(this.volume_data['cylindrical']['value']);
        this.volume_data['cylindrical']['converted_value']=this.convert_val(this.volume_data['cylindrical']['value']);
        tot_tank_volume+=this.vol_vertical_cylinder(this.d_diameter,this.a_length);

        //Top 
        //console.log("Top Head");
        my_H_val=this.get_H_value(use_top_type,this.d_diameter,this.h_filldepth,this.a_length,is_top=true);
        this.volume_data['tophead']['value']=this.vol_vertical_elliptical_end(this.d_diameter,my_H_val,this.a_length,use_top_type,is_top=true);
        tot_liquid_volume+=this.volume_data['tophead']['value'];
        this.volume_data['tophead']['value']=this.float_to_str(this.volume_data['tophead']['value']);
        this.volume_data['tophead']['converted_value']=this.convert_val(this.volume_data['tophead']['value']);
        var ztop=this.get_z_value(use_top_type,this.d_diameter);
        tot_tank_volume+=this.vol_vertical_elliptical_end(this.d_diameter,ztop,this.a_length,use_top_type,is_top=true);

        if (this.h_filldepth > (this.a_length + zbot + ztop)) { this.check_depth = 0;}
        else {this.check_depth = 1;}
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
      this.image_str='/images/'+out_image_str+'.jpg';
      
      //create volume strings and calculate based on values for the results section
      let str_array=this.tank_data['tank_volumes'][this.tank_key];
      this.volume_strings=[];
      //Set up array of strings to show
      for(var i=0;i<str_array.length;i++) {
        this.volume_strings.push(this.volume_data[str_array[i]]);
      }
    },
    convert_val: function(in_val) {
      var from_unit = this.conversion_mapper[this.length_unit];
      var to_unit = this.conversion_mapper[this.conversion_unit.replace('Cubic ','')];
      if ( to_unit == from_unit) { return in_val; }
      const standard = 1 / this.vol_conversions[from_unit];
      const conv_factor = (standard * this.vol_conversions[to_unit]);
      var out_val = this.str_to_float(in_val) * conv_factor;
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