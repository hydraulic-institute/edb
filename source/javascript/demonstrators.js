(() => {
  const calcStaticHead = (atmospheres, upperLevel, lowerLevel, elevation) => {
    //OR IS IT Upper-Lower+elevation???
    const value = (atmospheres * 2.31) + upperLevel - lowerLevel + elevation;
    return parseFloat(value);
  };

  const calcFrictionHead = (velocity, resistance) => {
    const value = resistance * Math.pow((velocity / 4),2);
    return value;
  }

  const calcFrictionHead_BarHeight = (totalResistance, speed, staticHead, coefA, coefB, coefC) => {
    const Q = calcQValue(1, totalResistance, speed, staticHead, coefA, coefB, coefC);
    return Math.pow(speed,2)*coefA + speed*coefB*Q + (coefC*Math.pow(Q,2)-staticHead);
  }

  const calcPumpHead = (velocity, speed, coefA, coefB, coefC) => {
    return Math.pow(speed,2)*coefA + speed*coefB*velocity + coefC*Math.pow(velocity,2);
  }

  const calc_coefs = (which_pump, coefA, coefB, coefC) => {
    const coefs={'coefA': coefA, 'coefB': coefB, 'coefC':coefC};
    if (which_pump==1) {return coefs;}

    coefs['coefB']=coefB/which_pump;
    coefs['coefC']=coefC/Math.pow(which_pump,2);
    return coefs;
  }

  const calcPumpSystemPlotValues = ( 
    which_pump, velocities, speed, max_speed, coefA, coefB, coefC) => {
      const values = {
        pumpHead: [],
        pumpHeadFullSpeed: [],
        pumpHeadMaxSpeed: []
      };
      const coefs=calc_coefs(which_pump, coefA, coefB, coefC);

      velocities.forEach(v => {
        const pumpHead = calcPumpHead(v, speed, coefs['coefA'], coefs['coefB'], coefs['coefC']); 
        values.pumpHead.push(parseFloat(pumpHead.toFixed(2)));
        //Only for 1 pump
        if (which_pump == 1) {
          const pumpHeadFullSpeed = calcPumpHead(v, 1, coefs['coefA'], coefs['coefB'], coefs['coefC']);
          values.pumpHeadFullSpeed.push(parseFloat(pumpHeadFullSpeed.toFixed(2)));
          const pumpHeadMaxSpeed = calcPumpHead(v,max_speed,coefs['coefA'], coefs['coefB'], coefs['coefC']);
          values.pumpHeadMaxSpeed.push(parseFloat(pumpHeadMaxSpeed.toFixed(2)));
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

      const staticHead = calcStaticHead(
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

  const calcQValue = (which_pump, totalResistance, speed, staticHead, coefA, coefB, coefC) => {
      const coefs=calc_coefs(which_pump,coefA,coefB,coefC);
      const A=coefs['coefC']-totalResistance/Math.pow(4,2);
      const B=speed*coefs['coefB'];
      const C=coefs['coefA']*Math.pow(speed,2)-staticHead;
      console.log("[A]:"+A+" [B]:"+B+" [C]:"+C);
      const Q=((B*-1) - Math.sqrt(Math.pow(B,2)-(4*C*A)))/(2*A);
      return parseFloat(Q.toFixed(2));
  }

  const calcParallelPumpData = (pump_type, which_pump,totalResistance,speed,staticHead,coefA,coefB,coefC) => {
    const coefs=calc_coefs(which_pump,coefA,coefB,coefC);
    const values={
      headIncrease: 0,
      flowIncrease: 0,
      series_x: [],
      series_y: [],
    };
    //Get info for Pump 1
    if (pump_type == "parallel") {
      const Q=calcQValue(1,totalResistance,speed,staticHead,coefA,coefB,coefC);
      const pumpHead=calcPumpHead(Q,speed,coefA,coefB,coefC);
      console.log("Pump1: Q:"+Q+" H:"+pumpHead);
      //Get info for which_pump
      const Qprime=calcQValue(which_pump,totalResistance,speed,staticHead,coefA,coefB,coefC);
      const pumpHeadprime=calcPumpHead(Qprime,speed,coefs['coefA'],coefs['coefB'],coefs['coefC']);
      console.log("Pump: Q:"+Qprime+" H:"+pumpHeadprime);
      values['headIncrease']=parseInt(Math.ceil(((pumpHeadprime-pumpHead)/pumpHead)*100));
      values['flowIncrease']=parseInt(Math.ceil(((Qprime-Q)/Q)*100));
      values['series_x']=[Q,Qprime];
      values['series_y']=[pumpHead, pumpHeadprime];
    }
    return values;
  }
  
  window.CurveCalculators = {
    calcStaticHead,
    calcPumpHead,
    calcFrictionHead,
    calcSystemCurveValues,
    calcPumpSystemPlotValues,
    calcQValue,
    calcFrictionHead_BarHeight,
    calcParallelPumpData
  }
})();

Vue.component("demo-tank", {
    template: "<div class='demo-canvas'></div>",
    props: {
        title: {
          type: String,
          default: ""
        }, 
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
            levelValue: null, 
            settings: null,
            tank: null,
            Min: 0,
            Max: 10,
            knobWidth: 10,
            knobHeight: 5,
            knobStart: 0,
            knobSize: 0
        }
    },
    mounted: function() {
        console.log(this.title);
        //Set the Max based off of 0 min
        this.Max=this.levelMax-this.levelMin;
        const levelYSpacing = this.maxHeight / this.Max;
        //console.log("levelYSpacing: "+levelYSpacing);
        this.knobWidth = this.maxWidth/2;
        const tickWidth = ((this.orientation == "horizontal")? this.maxWidth + this.knobWidth : this.maxWidth + this.knobHeight);
        const levelTickValues = _.range(this.Min, this.Max+1);
        console.log("tick values:"+levelTickValues);
        const calc_stageNormalWidth = this.maxWidth + this.knobWidth + 2;
        const stageNormalWidth = ((this.placement == "upper") ? calc_stageNormalWidth+20 : calc_stageNormalWidth);
        const calc_stageNormalHeight = this.maxHeight + (this.knobRadius * 2) + 2;
        const stageNormalHeight = ((this.placement == "upper") ? (2*calc_stageNormalHeight)-(this.knobHeight*2) : calc_stageNormalHeight);
        console.log("Stage Width: "+stageNormalWidth+" Stage Height: "+stageNormalHeight);

        this.knobStart = (this.orientation == "horizontal")? -this.knobWidth : this.knobWidth/2;
        this.knobSize = (this.orientation == "horizontal")? this.knobWidth*2 : this.knobWidth*1.25;
        this.knobSide = (this.placement == "upper") ? 1 : -1;

        console.log("Knob Start: "+this.knobStart+" Knob Size: "+this.knobSize+" knobWidth: "+this.knobWidth+" knobHeight: "+this.knobHeight+" knobSide: "+this.knobSide);
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
                x: this.knobWidth, 
                opacity: 1,
                cornerRadius: [0,0,this.tankCornerRadius,this.tankCornerRadius]
            }),
            tank: new Konva.Rect({
                x: this.knobWidth,
                y: this.knobHeight,
                width: this.maxWidth,
                height: this.maxHeight,
                fill: this.fillColor,
                cornerRadius: [0,0,this.tankCornerRadius,this.tankCornerRadius],
                opacity: 0.80,
                stroke: "black",
                strokeWidth: this.tankStroke
            }),
            bottom: new Konva.Line({
              points: [ 
                this.knobWidth, this.maxHeight+this.knobHeight, 
                this.knobWidth+this.maxWidth, 
                this.knobHeight+this.maxHeight 
              ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.bottomColor,
              stroke: this.bottomColor,
              strokeWidth: 1,
              opacity: this.bottomOpacity
            }),
            top: new Konva.Line({
              points: [ 
                this.knobWidth, this.knobHeight,
                this.knobWidth+this.maxWidth, this.knobHeight 
              ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.topColor,
              stroke: this.topColor,
              strokeWidth: 1,
              opacity: this.topOpacity
            }),
            leftside: new Konva.Line({
              points: [ 
                this.knobWidth, this.knobHeight, 
                this.knobWidth, this.knobHeight + this.maxHeight 
              ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.leftColor,
              stroke: this.leftColor,
              strokeWidth: 1,
              opacity: this.leftOpacity
            }),
            rightside: new Konva.Line({
              points: [ 
                this.knobWidth+this.maxWidth, this.knobHeight, 
                this.knobWidth + this.maxWidth, this.knobHeight+this.maxHeight 
              ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: this.rightColor,
              stroke: this.rightColor,
              strokeWidth: 1,
              opacity: this.rightOpacity
            }),
            horizontal_knob: new Konva.RegularPolygon({
                fill: "red",
                x:this.knobStart,
                y:this.knobHeight,
                radius: 7,
                sides: 3,
                rotation: -30,
                draggable: true,
                opacity: 1,
                dragBoundFunc: (pos) => {
                    const maxVal = Math.max(
                        this.yPositionRange.min, 
                        Math.min(this.yPositionRange.max,  pos.x))
                    //const yVal = pos.y;
                    let newPos = {
                        y: maxVal,
                        x: this.tank.horizontal_knob.absolutePosition().x
                    };

                    newPos.y = this.tank.horizontal_knob.absolutePosition().y;
                    newPos.x = maxVal;

                    return newPos;
                }
            }),
            knob: new Konva.Shape({
              width: this.knobSize * this.knobSide,
              height: this.knobHeight,
              title: this.title,
              start: this.knobStart * this.knobSide,
              sceneFunc: (context, shape) => {
                const attrs = shape.getAttrs();
                var counterclockwise = false;
                if (attrs.width < 0) {
                  counterclockwise = true;
                }
                console.log("title: "+attrs.title+" Width: "+attrs.width+" Height: "+attrs.height+" Start: "+attrs.start);
                context.beginPath();
                context.moveTo(attrs.start, 0);
                context.lineTo(attrs.width, -10);
                context.arc(attrs.width, 0, 10, 1.5 * Math.PI, 0.5 * Math.PI, counterclockwise);
                context.closePath();
                // (!) Konva specific method, it is very important
                context.fillStrokeShape(shape);
              },
              fill: 'red',
              opacity: 1,
              draggable: true,
              dragBoundFunc: (pos) => {
                const maxVal = Math.max(
                    this.yPositionRange.min, 
                    Math.min(this.yPositionRange.max, pos.y))
                //const yVal = pos.y;
                let newPos = {
                    y: maxVal,
                    x: this.tank.knob.absolutePosition().x
                };


                return newPos;
              }
            }),
            width_line: new Konva.Line({
              x: 0,
              y: 0,
              points: [
                this.knobWidth, this.knobHeight+(this.maxHeight*2),
                this.knobWidth+this.maxWidth, this.knobHeight+(this.maxHeight*2)
              ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: "blue",
              stroke: "blue",
              strokeWidth: 1
            }),
            height_line: new Konva.Arrow({
              x: 0,
              y: 0,
              points: [
                this.knobWidth+(this.maxWidth/2), this.knobHeight+(this.maxHeight*2),
                this.knobWidth+(this.maxWidth/2), this.knobHeight+this.maxHeight
              ],
              pointerLength: this.pointerWidth,
              pointerWidth: this.pointerWidth,
              fill: "blue",
              stroke: "blue",
              strokeWidth: 1
            }),
            height_text: new Konva.Text({
              x: (this.knobWidth+(this.maxWidth/2)+3),
              y: (this.knobHeight+(this.maxHeight*2))*(3/4),
              fontSize: 10,
              fontFamily: 'Verdana',
              fill: 'black',
              align: 'center',
              text: this.length_units.toString()+" feet",
              listening: false,
            }),

            ticks: levelTickValues.map(v => new Konva.Rect({
                name: (this.Max - v),
                x: this.knobWidth,
                y: (v * levelYSpacing) - 1,
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
        if (this.isHorizontal) {
          tank.group.add(tank.horizontal_knob);
        }
        else {
          tank.group.add(tank.knob);
        }
       
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
          let intersects =  !(
                r2.x > r1.x + r1.width ||
                r2.x + r2.width < r1.x ||
                r2.y > r1.y + r1.height ||
                r2.y + r2.height < r1.y
              );
          //console.log('Rect1: '+JSON.stringify(r1));
          //console.log('Rect2: '+JSON.stringify(r2));
          //console.log('Intersects: '+intersects);
  
          return intersects;
        }

        const defaultCursor = this.tank.stage.container().style.cursor;

        // Vertical Tank
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
            else {
              console.log("Could not find tick:"+knobRect);
            }
            //setKnobFocusFill();
        });

        tank.knob.on("dragend", (e) => {
            this.renderTankLevel(this.levelValue);
            //setKnobDefaultFill();
        });

        tank.knob.on("mouseenter", () => {
            this.tank.stage.container().style.cursor = "pointer";
        });

        tank.knob.on("mouseleave", () => {
            this.tank.stage.container().style.cursor = defaultCursor;
        });

        ///////////////////////////////////////
        // Horizontal Tank
        const HknobOpacity = tank.horizontal_knob.opacity();
        const setHKnobFocusFill = () => {
            tank.horizontal_knob.opacity(1)
        }
        const setHKnobDefaultFill = () => {
            tank.horizontal_knob.opacity(knobOpacity);
        }

        tank.horizontal_knob.on("dragmove", (e) => {
            const knobRect = this.tank.horizontal_knob.getClientRect();
            const tick = this.tank.ticks.find(t => rectsIntersect(t.getClientRect(), knobRect));
            if (tick) {
                this.levelValue = parseInt(tick.name());
            }
            else {
              console.log("Could not find tick:"+knobRect);
            }
            //setHKnobFocusFill();
        });

        tank.horizontal_knob.on("dragend", (e) => {
            this.renderTankLevel(this.levelValue);
            //setHKnobDefaultFill();
        });

        tank.horizontal_knob.on("mouseenter", () => {
            this.tank.stage.container().style.cursor = "pointer";
        });

        tank.horizontal_knob.on("mouseleave", () => {
            this.tank.stage.container().style.cursor = defaultCursor;
        });
        //////////////////////////////////

        tank.layer.on("click", (event) => {
          let curYPos;
          try {
            curYPos = this.tank.tank.getRelativePointerPosition().y;
          } catch (e) {
            //console.log('Click Use Event');
            curYPos = event.evt.offsetY - this.knobHeight;
          }
          //console.log("Click Cur Y Pos: "+curYPos);
            const level = this.Max - Math.round(curYPos / levelYSpacing);

            this.levelValue = level;
            console.log("Click Level: "+level);
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
            this.levelValue = Math.min(this.Max, Math.max(this.Min, level));
        })
        //Need to set the level based off of 0 min, so subtract the levelMin passed in
        this.levelValue = this.value - this.levelMin;
        console.log('Level Value: '+this.levelValue);
        this.renderTankLevel(this.levelValue);
    },
    methods: {
        calculateLevelPos: function(level) {
            const newHeight = level > 0 ? Math.min(this.maxHeight * (level / this.Max) + (this.knobHeight/2),this.maxHeight) : 0;
            let position = { x: this.tank.waterLevel.x(), y: this.maxHeight - newHeight + this.knobHeight };
            position = this.tank.transform.point(position);
            const levelPosition = { x: position.x, y: position.y, newHeight: newHeight };
            console.log(this.title+" Level: "+JSON.stringify(levelPosition));
            return levelPosition;
        },
        renderTankLevel: function(level) {
            const levelPosition = this.calculateLevelPos(level);

            this.tank.waterLevel.absolutePosition(levelPosition);
            console.log("rendertank - placement "+this.placement+ JSON.stringify(levelPosition));
            let x_level=levelPosition.x
            if (!this.isHorizontal) {
              x_level=levelPosition.x+(this.tank.tank.width()/2);
            }
            if (this.isHorizontal) {
              this.tank.horizontal_knob.absolutePosition({x:x_level, y:levelPosition.y, newHeight:levelPosition.newHeight});
            }
            else {
              this.tank.knob.absolutePosition({x:x_level, y:levelPosition.y, newHeight:levelPosition.newHeight});
            }
            this.tank.waterLevel.size({ width: this.maxWidth, height: levelPosition.newHeight});
        }
    },
    watch: {
        levelValue: function(newValue, oldValue) {
          //console.log("New Level for "+this.title+": "+newValue);
            this.renderTankLevel(newValue);
            //Since we base everything off of 0 min, lets add the levelMin back in for emitting
            let emitValue=newValue+this.levelMin;
            this.$emit("input", emitValue);
        }
    },
    computed: {
        yPositionRange: function() {
            const minPos = this.calculateLevelPos(this.Max);
            const maxPos = this.calculateLevelPos(this.Min);

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
        },
        pumpType: {
          type: String,
          default: "system"
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
          radius: 7,
          sides: 3,
          fill: (this.pumpType=="fcv"?"#90FF33":"#FFFFFF"),
          stroke: "grey",
          strokeWidth: 1,
          rotation: -30,
        });
        const rightbowtie = new Konva.RegularPolygon({
          x: (this.width / 2) + 35,
          y: (this.pointerWidth / 2) + 2,
           radius: 7,
          sides: 3,
          fill: (this.pumpType=="fcv"?"#90FF33":"#FFFFFF"),
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


Vue.component("demo-pump-inputs", {
  template: `
  <div class="wrap"> 
  <p><i>Use the red knobs to adjust settings</i></p> 
  <div class="row mb-2">
    <div v-if='pumpType === "plot"' class="col-8"></div>
    <div v-else-if='pumpType === "system"' class="col-12" align="right" id="upper-tank-pressure-id" style="padding: 0px;">
      <div class="upper_tank_pressure">      
        <p class="mb-0 mt-2" style="font-size: smaller">Upper Tank Pressure</p>
        <demo-tank v-model="upperPressureValue" :title="'upper tank pressure'" :orientation="'horizontal'" :max-width="10" :show-ticks="false" :level-max="25" :level-color="rangeInputColor"></demo-tank>
      </div>
    </div>
    <div v-else-if='pumpType === "parallel"' class="col-6" id="parallel-pumps-id">
      <div class="">      
        <p class="mb-0" style="font-size: smaller"># Parallel Pumps  (<strong><span v-text="pumpCount"></span></strong>)</p>
        <demo-tank v-model="pumpCountValue" :title="'parallel pumps'" :level-min="1" :level-max="pumpCountMax" :orientation="'horizontal'" :max-width="10" :max-height="100" :show-ticks="false"  :level-color="rangeInputColor"></demo-tank>
      </div>
    </div>
    <div v-else-if='pumpType === "fcv"' class="col-12" id="flow-valve-setting-id">
      <div class="">      
        <p class="mb-0" style="font-size: smaller">Valve Flow Setting (<strong><span v-text="valveFlowSetting"></span>)</strong></p>
        <demo-tank v-model="valveFlowSettingValue" :title="'valve flow setting'" :levelMax="100" :orientation="'horizontal'" :max-width="10" :max-height="100" :show-ticks="false" :level-color="rangeInputColor"></demo-tank>
      </div>
    </div>
    <div v-if='pumpType === "parallel"' class="col" align="left">
      <p class="mt-0 mb-0" style="font-size: smaller" align="left"><strong>For the Same System</strong></p>
      <p class="mt-0 mb-0" style="font-size: smaller">Head Increase: <span v-text="headIncrease"></span>%</p>
      <p class="mt-0 mb-0" style="font-size: smaller">Flow Increase:  <span v-text="flowIncrease"></span>%</p>
    </div>
    <div v-else class="col"></div>
  </div> 
  <div class="row mb-2">
    <div class="col-4 mt-auto" style="padding: 0;" id="lower-tank-level-id">
      <p class="mt-5 mb-0" style="font-size: smaller" align="right">Lower Tank Level</p>
      <demo-tank v-model="lowerLevelValue" :title="'lower tank level'" :corner-radius=10 :max-height="100" :top-opacity="0" :show-ticks="false" :placement="lower" align="right"></demo-tank>
    </div>
    <div class="col-4 mt-auto" style="padding: 0;" id="demo-flow-line-id">         
      <demo-flow-line align="center" :direction="'far'" :pump-type="pumpType"></demo-flow-line>
    </div>
    <div class="col-4" style="padding: 0;" id="upper-tank-level-id">
      <p class="mt-0 mb-0" style="font-size: smaller" align="left">Upper Tank Level</p>
      <demo-tank v-model="upperLevelValue" :title="'upper tank level'" :corner-radius=10 :max-height="100" :show-ticks="false" :fill-color="upperTankFillColor" :placement="upper" style="margin-left: 5px"></demo-tank>
    </div>
  </div>
  <div v-if='pumpType != "system"'class="row mb-2 mt-1">
    <div class="col" align="center" id="pump-speed-id">
      <div class="">      
        <p class="mb-0" style="font-size: smaller">Pump Speed (<strong><span v-text="pumpSpeed"></span>%</strong>)</p>
        <demo-tank v-model="pumpSpeedValue" :title="'pump speed'" :level-min="pumpSpeedMin" :level-max="pumpSpeedMax" :orientation="'horizontal'" :max-width="10" :max-height="200" :show-ticks="false" :level-color="rangeInputColor"></demo-tank>
      </div>
    </div>
  </div>
  <div class="row mb-2 mt-1">
    <div class="col" align="center" id="friction-losses-id">
      <div class="resistance">
        <p class="mb-0" style="font-size: smaller">Friction Losses</p>
        <p class="mb-0" style="font-size: x-small">(Major + Minor Losses)</p>
        <demo-tank v-model="resistanceValue" :title="'friction losses'" :orientation="'horizontal'" :max-width="10" :show-ticks="false" :level-color="rangeInputColor"></demo-tank>
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
      pumpSpeedMin: { 
        type: Number,
        default: 0
      },
      pumpSpeedMax: { 
        type: Number,
        default: 0
      },
      pumpCount: {
        type: Number,
        default: 1
      },
      pumpCountMax: {
        type: Number,
        default: 3
      },
      upperPressure: {
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
      },
      pumpType: {
        type: String,
        default: "system"
      },
      valveFlowSetting: {
        type: Number,
        default: 35
      },
      errorMessage: {
        type: String,
        default: ""
      }
  },
  data: function() {
      return {
        lowerLevelValue: 0,
        upperLevelValue: 0,
        resistanceValue: 0,
        pumpSpeedValue: 0,
        upperPressureValue: 0,
        pumpCountValue: 0,
        valveFlowSettingValue: 0
      }
  },
  created: function() {
    const v = this; 
    v.lowerLevelValue = v.lowerLevel;
    v.upperLevelValue = v.upperLevel;
    v.resistanceValue = v.resistance;
    v.pumpSpeedValue = v.pumpSpeed;
    v.upperPressureValue = v.upperPressure;
    v.pumpCountValue = v.pumpCount;
    v.valveFlowSettingValue = v.valveFlowSetting;
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
    upperPressureValue: function(value) {
      this.$emit("update:upperPressure", value)
    },
    pumpCountValue: function(value) {
      this.$emit("update:pumpCount", parseInt(value))
    },
    valveFlowSettingValue: function(value) {
      this.$emit("update:valveFlowSetting", parseInt(value))
    },
  }
});

Vue.component("demo-input-slider", {
  props: ['value', 'label', 'min', 'max'],
  template: `
  <div class="row">
    <span class="col-sm-1">{{ label }}</span>
    <div class="col-sm-3">
      <input type="range" class="form-range" v-bind:value="value" v-bind:min="min" v-bind:max="max" v-on:input="$emit('update:value', parseInt($event.target.value))"></input>
    </div>
    <span class="col-sm-1">{{ value }}</span>
  </div>
  `
});


Vue.component('demo-pump-curve', {
  props: ['init'],
  data: function () {
    return {
      elevation: 10,
      min: 0,
      maxVelocities: 10,
      lowerLevel: 0,
      upperLevel: 0,
      totalResistance: 0,
      upperPressure: 0,
      pumpSpeed: 0, // percentage
      pumpSpeedMin: 0,
      pumpSpeedMax: 100,
      pumpCount: 1,
      pumpCountMax: 3,
      multiplePumps: 0,
      pumpType: "system",
      allPumpTypes: ["system", "plot", "parallel", "fcv"],
      valveFlowSetting: 0,
      velocities: [],
      coefA: 70,
      coefB: -2,
      coefC: -0.4,
      chart: null,
      flowIncrease: 0,
      headIncrease: 0,
      series_data: {
        "System Curve": {"type":"line", "color": "#FF3E30","stroke": 2, "opacity": 1, "markers": 0},
        "Static Head":{"type":"area", "color": "#176BEF","stroke": 2, "opacity": 0.25, "markers": 0}, 
        "Friction Head": {"type":"rangeArea", "color": "#F7B529","stroke": 0, "opacity": 0.25, "markers": 0}, 
        "Operating Point": {"type":"line", "color":"#4A235A","stroke": 3, "opacity": 1, "markers": 0}, 
        "Pump Curve (speed adjusted)": {"type":"line", "color":"#179C52","stroke": 2, "opacity": 1, "markers": 0},
        "Pump Curve (base)": {"type":"line", "color": "#85929E","stroke": 2, "opacity": 1, "markers": 0},
        //This is the same as the base but only for parallel pumps
        "2 Parallel": {"type":"line", "color": "#B505AA","stroke": 2, "opacity": 1, "markers": 0},
        "Series": {"type":"line", "color": "#90FF33","stroke": 4, "opacity": 1, "markers": 4, 
                    "label": {"parallel":"Head/Flow Difference","fcv":"Control Valve Head"}}
      },
      series_opacity: [],
      series_stroke: [],
      series_color: [],
      series_names: [],
      errorMessage: ""
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
  },
  template: `
  <div class="container-fluid">
  <div class="row demonstrator">
    <div class="col-sm-12 col-md-5">
      <div  class="demo-inputs" style="">
          <demo-pump-inputs 
            :pump-type="pumpType"
            :multiple-pumps="multiplePumps"
            :flow-increase="flowIncrease"
            :head-increase="headIncrease"
            :lower-level.sync="lowerLevel"
            :upper-level.sync="upperLevel"
            :resistance.sync="totalResistance"
            :upper-pressure.sync="upperPressure"
            :pump-speed.sync="pumpSpeed"
            :pump-speed-min="pumpSpeedMin"
            :pump-speed-max="pumpSpeedMax"
            :pump-count.sync="pumpCount"
            :pump-count-max="pumpCountMax"
            :valve-flow-setting.sync="valveFlowSetting"
          >
          </demo-pump-inputs>
        </div>
      </div>
      <div class="col-sm-12 col-md-7">
        <div class="demo-chart" style=""></div>
      </div>
    </div>
  </div>
  `,
  mounted: function() { 
    this.velocities=[...Array(this.maxVelocities+1).keys()]
    this.multiplePumps=(this.pumpCount > 1?1:0);
    this.series_names=Object.keys(this.series_data);
    for (var val in this.series_data) {
      this.series_opacity.push(this.series_data[val]["opacity"]);
      this.series_stroke.push(this.series_data[val]["stroke"]);
      this.series_color.push(this.series_data[val]["color"]);
    }

    const chartElem = $(this.$el).find('.demo-chart')[0];
    const series = this.getSeries();
    let y_max=this.pumpSystemCurveData.totalHead[this.maxVelocities];
    let x_max=Math.round(this.maxVelocities/10)*10;
    if (this.pumpCount) {
      y_max=Math.max(this.pumpSystemCurveData.pumps[0].pumpHeadFullSpeed[0],this.pumpSystemCurveData.pumps[0].pumpHeadMaxSpeed[0]);
    }
    y_max=Math.ceil(y_max/10)*10;

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
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        borderColor: '#CDD4DB',
      },
      xaxis: {
        type: 'numeric',
        min: 0,
        max: x_max,
        tickAmount: 10,
        decimalsInFloat: 0,
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
        max: y_max,
        tickAmount: y_max/10,
        decimalsInFloat: false,
        title: {
          text: "Head"
        },
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
      }
    };
      
    this.chart = new ApexCharts(chartElem, options);
    
    this.chart.render();
    
    if (this.pumpCount < 3) {
      this.check_colors();
    }
  },
  methods: {
    check_colors: function() {
      let out_opacity=[...this.series_opacity];
      let out_stroke=[...this.series_stroke];
      let out_color=[...this.series_color];
      if (this.pumpCount < 3) {
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
        }
      });
    },

    setErrorMessage: function() {
      if (!this.errorMessage.length) {
        this.chart.removeAnnotation('errorMessage');
        return;
      }
      let x_val=this.pumpSystemCurveData.data.opPoint_x[0];
      let y_val = 0.9 * this.chart.axes.w.config.yaxis[0].max;
      this.chart.addPointAnnotation( {
            id: 'errorMessage',
            marker: {
              size: 0
            },
            x: x_val,
            y: y_val,
            label: {
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
                fontSize: '12px',
                padding: {
                  left: 5,
                  right: 5,
                  top: 5,
                  bottom: 5,
                }
              },
              text: this.errorMessage,
            }
          }
        );
    },

    getSeriesData: function(in_data) {
      function hasNull(element, index, array) {
        return isNaN(element.x) || isNaN(element.y) || element.x===null || element.y===null;
      }
      if (!Array.isArray(in_data)) { return in_data;}

      for (let in_obj of in_data) {
        if (hasNull(in_obj)) { return []; }
      }
      return in_data;
    },

    calculations: function() {
      this.errorMessage="";
      console.log("=====================================");
      console.log("upperLevel: "+this.upperLevel+" lowerLevel: "+this.lowerLevel+" Resistance: "+this.totalResistance+" Speed: "+this.pumpSpeed, " upperPressure: "+this.upperPressure);
      console.log("pumpType: "+this.pumpType);
      if (this.pumpType == "parallel") {
        console.log(" pumpCount: "+this.pumpCount+" pumpCountMax: "+this.pumpCountMax);
      }
      if (this.pumpType == "fcv") {
        console.log(" valveSetting: "+this.valveFlowSetting);
      }
      console.log("pumpSpeedMin: "+this.pumpSpeedMin+" pumpSpeedMax: "+this.pumpSpeedMax);
      const sys_values = CurveCalculators.calcSystemCurveValues(
        this.velocities, 
        this.upperPressure, 
        this.upperLevel, 
        this.lowerLevel, 
        this.elevation,
        this.totalResistance);
      console.log("StaticHead: "+sys_values['staticHead']);
      console.log("FrictionHead: "+sys_values['frictionHead']);
      console.log("TotalHead: "+sys_values['totalHead']);


      const pumps=[];  
      for (var i=0;i<this.pumpCount;i++) {
        let values = CurveCalculators.calcPumpSystemPlotValues(
          i+1,
          this.velocities,
          this.pumpSpeed / 100,
          this.pumpSpeedMax / 100,
          this.coefA,
          this.coefB,
          this.coefC
        );
        if (this.pumpCount > 1) {
          console.log("Pump["+(i+1)+"]");
        }
        console.log("PumpHead: "+values['pumpHead']);
        if (i==0) {
          console.log("PumpHead @ FullSpeed [100%]: "+values['pumpHeadFullSpeed']);
          console.log("PumpHead @ MaxSpeed ["+this.pumpSpeedMax+"%]: "+values['pumpHeadMaxSpeed']);
        }
        values['qValue'] = CurveCalculators.calcQValue(
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
      /*const frictionHead_Height = CurveCalculators.calcFrictionHead_BarHeight(
        this.totalResistance,
        this.pumpSpeed / 100,
        sys_values.staticHead[0],
        this.coefA,
        this.coefB,
        this.coefC
      );*/

      const values=Object.assign({}, sys_values);
      values['pumps']=pumps;
      
      if ( this.pumpCount ) {
        values['data']={
          'headIncrease': this.headIncrease,
          'flowIncrease': this.flowIncrease,
          'opPoint_x': [],
          'opPoint_y': [],
          'series_x': [],
          'series_y': []
        };
        //Vertical Line (Operating Point Chart) Handling
        if (this.pumpType == "parallel") {
          values['data']=CurveCalculators.calcParallelPumpData(this.pumpType, this.pumpCount, this.totalResistance, this.pumpSpeed/100, sys_values.staticHead[0],this.coefA,this.coefB,this.coefC);
          if (this.pumpType == "parallel") {
            this.headIncrease=values['data']['headIncrease'];
            this.flowIncrease=values['data']['flowIncrease'];
            //console.log("headIncrease:"+this.headIncrease+" flowIncrease:"+this.flowIncrease);
          }
        }
        console.log("Operating Point Calculation - PumpHead[0]: "+pumps[0]['pumpHead'][0]+" FullSpdPumpHead[0]: "+pumps[0]['pumpHeadFullSpeed'][0]+" TotalHead["+this.maxVelocities+"]: "+sys_values['totalHead'][this.maxVelocities]);
        values['data']['opPoint_x']=[];
        values['data']['opPoint_y']=[];
        if (!isNaN(pumps[this.pumpCount-1].qValue)) {
          if (this.pumpType == "parallel") {
            values['data']['opPoint_y']=[0,pumps[0]['pumpHeadFullSpeed'][0]];
          }
          else {
            values['data']['opPoint_y']=[0,(Math.max(pumps[0]['pumpHead'][0],pumps[0]['pumpHeadFullSpeed'][0],sys_values['totalHead'][this.maxVelocities]))];
          }

          if (this.pumpType != "fcv") {        
            var xval=isNaN(pumps[this.pumpCount-1].qValue)?0:pumps[this.pumpCount-1].qValue;
            console.log("QVal:"+pumps[this.pumpCount-1].qValue);
            xval=Math.min(xval,this.maxVelocities);
            if (xval >= 0) {
              values['data']['opPoint_x']=[xval,xval];
            }
          }
          else { 
            values['data']['series_x']=[];
            values['data']['series_y']=[];
            //FCV handling
            const fcv_Q=parseFloat((this.valveFlowSetting/10).toFixed(1));
            values['data']['opPoint_x']=[fcv_Q,fcv_Q];
            console.log("Operating Point - Q: "+fcv_Q+" Op_PointX: "+values['data']['opPoint_x']+" Op_PointY: "+values['data']['opPoint_y']);

            //FCV Line (Series chart)
            values['data']['series_x']=[fcv_Q,fcv_Q];
            //FCV = Pump Head using Q for velocity -FH using Q - SH at 0
            const phQ=CurveCalculators.calcPumpHead(fcv_Q, this.pumpSpeed/100,this.coefA,this.coefB,this.coefC);
            const fhQ=CurveCalculators.calcFrictionHead(fcv_Q,this.totalResistance);
            let fcv = phQ - fhQ - sys_values['staticHead'][0];
            console.log("FCV: "+fcv)
            
            console.log("PH-Q: "+phQ+" FH-Q: "+fhQ+" SH[0]: "+sys_values['staticHead'][0]);
            if (fcv < 0) { this.errorMessage="Control Valve Failed"; }
            const y0=(fcv>0?phQ:0);
            const y1=(fcv>0?(fhQ+sys_values['staticHead'][0]):0);
            values['data']['series_y']=[y0,y1];
            console.log("FCV Line - ["+values['data']['series_x'][0]+","+values['data']['series_y'][0]+"]-["+values['data']['series_x'][1]+","+values['data']['series_y'][1]+"]");
          }
        }
        
        console.log("Operating Point - X:"+values['data']['opPoint_x']+" Y:"+values['data']['opPoint_y']);
        //if ('series_x' in values['data']) { console.log("Series_X:"+values['data']['series_x']+" Series_Y:"+values['data']['series_y']); }
      }
      return values;
    },

    getSeries: function() {
      const curveData = this.pumpSystemCurveData;
      const series = [];
      const names = {"plot": ['Pump Curve (speed adjusted)'], "parallel": ['Pump Curve (speed adjusted)','2 Parallel'], "fcv":['Pump Curve (speed adjusted)']}

      series.push({
        name: 'System Curve',
        type: this.series_data['System Curve']['type'],
        data: this.velocities.map(v => ({ x: v, y: curveData.totalHead[v] }))
      });

      series.push({
        name: 'Static Head',
        type: this.series_data['Static Head']['type'],
        data: this.velocities.map(v => ({ x: v, y: (curveData.staticHead[v] - 0.3) })) 
      });

      series.push({
        name: 'Friction Head',
        type: this.series_data['Friction Head']['type'],
        data: this.velocities.map(v => ({ x: v, y: [ (curveData.staticHead[v]-0.3), curveData.totalHead[v] ] })) 
      });

      if (this.pumpCount) {
        series.push({
          name: 'Operating Point',
          type: this.series_data['Operating Point']['type'],
          data: this.getSeriesData([ 
            {x: curveData.data.opPoint_x[0], y: curveData.data.opPoint_y[0]},
            {x: curveData.data.opPoint_x[1], y: curveData.data.opPoint_y[1]}
          ])
        });

        //Pump Curves
        //x axis needs to be based on max pumphead of last pump
        for ( var i=0;i<this.pumpCount;i++) {
          let name=names[this.pumpType][i];
          if (!name) {
            //Only plot the last pump, not all of them
            name=this.pumpCount.toString() + " Parallel";
            i=this.pumpCount-1;
          }
          series.push({
            name: name,
            type: 'line',
            data: this.velocities.map(v => ({ x: v, y: curveData.pumps[i].pumpHead[v] })) 
          });
        }

        if ((this.pumpType == "plot") || (this.pumpType == "fcv")) {
          series.push({
            name: 'Pump Curve (base)',
            type: this.series_data['Pump Curve (base)']['type'],
            data: this.velocities.map(v => ({ x: v, y: curveData.pumps[0].pumpHeadFullSpeed[v] })) 
          });
        }

        if (((this.pumpType == "parallel") && (this.pumpCount > 1)) || (this.pumpType == "fcv")) {
          series.push({
            name: this.series_data['Series']['label'][this.pumpType],
            type: this.series_data['Series']['type'],
            data: this.getSeriesData([
              {x:curveData.data.series_x[0], y:curveData.data.series_y[0]},
              {x:curveData.data.series_x[1], y:curveData.data.series_y[1]}
            ])
          });
        }
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
        this.check_colors();
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
    upperPressure: function() {
      this.refreshChart();
    },
    pumpCount: function(value) {
      this.refreshChart(value);
    },
    valveFlowSetting: function() {
      this.refreshChart();
    },
    errorMessage: function() {
      this.setErrorMessage();
    }
  }
});
