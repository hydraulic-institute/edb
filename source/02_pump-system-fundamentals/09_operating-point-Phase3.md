-----
title: I) Operating Point 
tabtitle: Operating Point | HI Data Tool 
date: August 31, 2026
description: Determine the pump system operating point and the effect of parallel and series pumping, variable speed pumping, and piping and control valve changes.
hide_units: true
-----

# Operating Point

=atag=
Pump and System Curve
=atag=

It is important to understand how the pump will interact with the system it is used in over a range of operating conditions. Combining the pump performance curve with the system curve will help show where the system will operate. In general, the system flow rate will be where the pump curve intersects the system curve. Pump and system curve interaction is also covered in <a href="https://www.pumps.org/what-we-do/standards/?pumps-search-product=14.3&hi-order=asc&hi-order-by=name" target="_blank">ANSI/HI 14.3</a>.

Knowing the shape of the system curve will help illustrate the pump operating conditions as the system conditions vary due to changes in valve position, parts of the system coming on and offline, and upset conditions. By overlaying the pump and system curves to determine the operating point(s) will help determine if the pump is sized correctly for the system. This will also help ensure the pump operation will be as close to the Best Efficiency Point (BEP) as possible to reduce energy consumption and increase pump reliability.

<!--=^=
title: Pump System Optimization Guidebook (PSO)
description: This guidebook is intended to assist those who need to understand details of pump system optimization coupled with important capital equipment decisions. It presents practical information for those who have not had broad exposure to pumping systems and for those who wish to improve the systems for which they are responsible.
image: https://www.pumps.org/wp-content/uploads/2021/10/PSOHalf.png
url: https://www.pumps.org/product/pump-system-optimization-a-guide-for-improved-energy-efficiency-reliability-and-profitability/
price: $225.00
=^=-->

### Reading a Pump and System Curve Plot

As the name implies, a **pump and system curve plot** consists of at least two curves. The system curve will show the static head of the system and the frictional head losses that vary with the rate of flow. The operating point is where the two curves intersect.

![](./images/iC-1-Pump-and-system-Curve.png#center "")
<div class="figure-label"><a id="fig1i1"></a>Fig. 1.I.1 Pump and system curve plot</div>

=atag= 
Throttling
=atag=

### Flow Rate Change Using Manual Throttling Valve
As a manual positioned or passive throttling valve (active control valves are discussed later) is opened or closed, it will change the system curve by changing the head loss across the valve. Closing a valve will add resistance to the system over the entire range of flows. Conversely, opening it will reduce resistance. This can be shown in [Figure 1.I.2](#fig1i2) with the system curve bending upward with the valve throttled intersecting the pump curve at a higher head and lower flow rate. Note the static head at zero flow is unchanged. Using the revised pump system plot, a new operating point can be determined.

![](./images/iC-2-Pump-and-system-Curve-valve-closed.png#center "")
<div class="figure-label"><a id="fig1i2"></a>Fig. 1.I.2 Pump and system curve with valve throttled</div>

=^=
title: Variable Speed Pumping – On-Demand Training  
description: Learn how variable speed operation changes the pump performance, the system operating point as it interacts with the system curve, and the effect on energy and life cycle cost.  
image: https://www.pumps.org/wp-content/uploads/2022/02/On-Demand-for-EDL-1-e1645114699527.png
url: https://training.pumps.org/products/variable-speed-pumping-on-demand-training
price: 119.00
hide_price: true
=^=

=atag=
Varying Speed
=atag=

### Changes in Pump Speed
Changing the pump speed will change the pump curve. This can be represented using the affinity or similarity rule (see [Pump Curves](./rotodynamic-pump-curves-phase3.html)). As the pump is slowed, the pump curve shifts down and to the left, getting closer to the plot origin.

With a system that has a manual throttling valve, changing the pump speed will change two things as shown in the pump system plot – the system flow and the pump head generated. Slowing the pump down, as depicted in [Figure 1.I.3](#fig1i3), will reduce pump head and reduce the system flow. Note the static head at zero flow will still be the same.

![](./images/iC-3-Pump-and-system-Curve-valve-closed-reduced-speed.png#center "")
<div class="figure-label"><a id="fig1i3"></a>Fig. 1.I.3 Pump and system curve with valve throttled and speed reduction</div>

### Educational Demonstration: Pump and System Curve
[Demo 1.I.1](#demo1i1) shows qualitatively how various parameters affect the pump curve, system curve, and operating point. Slide the toggle to change the pump speed and system parameters to see how the pump curve, system curve and resulting operating point vary.

=d=
title:
kind: pump-curve
pumpType: plot
lowerLevel: 5
upperLevel: 5
pressure: 0
totalResistance: 5
pumpSpeed: 75
pumpSpeedMin: 50
pumpSpeedMax: 110
=d=
<div class="demo-label"><a id="demo1i1"></a>Demo. 1.I.1 Pump speed and system parameter effect on operating point</div>

=atag=
Control valve
=atag=

### Active Control Valves
An **active control valve** is one that continually changes position (loss) to maintain a set flow or set pressure. It is important to note that there is no human intervention involved.
Since they continuously vary their position (and head loss) to maintain a flow or pressure, there is no single valve position over a range of system flows. Since there are many system flows, there are many valve positions and losses. Because of this, active control valves are not normally included in the system curve. However, they are shown on the pump system plot as the difference between the two curves at the operating point. In other words, a system with an active control valve will not operate at the intersection of the pump and system curves since the control valve will fix the system at a certain point. 

[Figure 1.I.4](#fig1i4) is an example of a control valve set to maintain a certain flow through the system. The control valve can open or close (modulate) to regulate the flow. This will change the head loss across the valve and will affect the pump operating point.

This pump system plot shows two things. First, with the control valve in the system, the pump head required is the sum of the static head, frictional losses, and the loss across the control valve. It also shows that the flow in the system is less than the flow in the system without the control valve.

The plot also is useful in determining the margin available on the control valve. Having sufficient, but not excessive, pressure drop across most control valves is required so the valve can properly control to the setpoint.

![](./images/iC-4-Pump-and-system-Curve-with-Valve-head.png#center "")
<div class="figure-label"><a id="fig1i4"></a>Fig. 1.I.4 Pump and system curve with active control valve head loss</div>

### Changing the Setpoint on an Active Control Valve
Changing the **setpoint (*or control point*)** on an active control valve will change the operating point in the system.  In [Figure 1.I.5](#fig1i5), the setpoint is changed so that the valve closes and the flow is decreased. The additional control valve head loss causes the flow rate to decrease, and the pump developed head to increase. Notice that at the lower flow rate the static head is unchanged, the friction head has decreased due to the reduced flow rate and the control valve head loss makes up the balance of the total head. 

![](./images/iC-5-Pump-and-system-Curve-with-Valve-head-2.png#center "")
<div class="figure-label"><a id="fig1i5"></a>Fig. 1.I.5 Pump and system curve with additional active control valve head loss</div>

### Changing the Pump Speed with an Active Control Valve
When the pump speed is changed and there is an active control valve in the system, the difference in head produced by the pump will be reflected in the difference in loss across the control valve, since the system flow rate has not changed. This is illustrated in [Figure 1.I.6](#fig1i6) compared to [Figure 1.I.4](#fig1i4).

![](./images/iC-6-Pump-and-system-Curves-variable-speed-valve-head-loss.png#center "")
<div class="figure-label"><a id="fig1i6"></a>Fig. 1.I.6 Pump and system curve with active control valve and variable speed</div>

=^=
title: Pump & System Fundamentals – On-Demand Curriculum   
description: Learn the fundamentals of pumps and systems at your own pace with 12 hour long modules covering pump curves, system curves, power, efficiency, NPSHA, pump total head, POR, AOR, selection, motors, VFDs, seals, bearings, and couplings. 
image: https://www.pumps.org/wp-content/uploads/2022/02/On-Demand-for-EDL-1-e1645114699527.png
url: https://training.pumps.org/products/pump-and-system-fundamentals-on-demand-training-curriculum-2
price: 119.00
hide_price: true
=^=

### Educational Demonstration: Pump and System Curve with Control Valve
[Demo 1.I.2](#demo1i2) shows qualitatively how various parameters affect the pump curve, system curve, control valve head, and operating point. Slide the toggle to change the pump speed, control valve position and system parameters to see how the pump curve, system curve, control valve head, and resulting operating point vary.

=d=
title:
kind: pump-curve
pumpType: fcv
lowerLevel: 5
upperLevel: 5
pressure: 0
totalResistance: 5
pumpSpeed: 75
pumpSpeedMin: 50
pumpSpeedMax: 110
valveFlowSetting: 35
=d=
<div class="demo-label"><a id="demo1i2"></a>Demo. 1.I.2 Pump speed, system parameter and control effect on operating point illustrating control valve head loss</div>

=atag=
Pump Sizing
=atag= 

### Undersized or Oversized Pumps
It is important to note that as the flow increases, the developed pump head decreases and the system head losses increase. Oversized or undersized pumps will have curves that do not intersect at the rated flow and head. For rotodynamic pumps, throttling a discharge valve is sometimes used to increase the head and lower the flow rate, or the operating point may be able to be adjusted by installing a different impeller. For rotodynamic and positive displacement pumps, varying the speed or selecting a different pump are options to adjust the operating point.

### Changes in Impeller Size
Within limits, the operating point can be changed by replacing the impeller with a larger or smaller impeller. Changing impeller diameter is a step change in either direction and does not provide continuously variable operation like varying the pump speed can. See <a href="./rotodynamic-pump-curves-phase3.html" target="_blank">rotodynamic pump curves</a> for additional information on the effect of changing the impeller diameter. 

### Pump Sizing in the Real World
Many real-world applications are designed for system curves that are provided as an envelope. This is due to varying head conditions, such as caused by anticipated stormwater conditions, varying reservoir levels, changing piping conditions over time, or tanks with varying pressures. [Figure 1.I.7](#fig1i7) is an example of a system curve envelope that dictates all the conditions seen. It is up to the system designer to specify the important points the selected pumps need to hit.

![](./images/iC-7-System-Curves-for-Varying-Conditions.png#center "")
<div class="figure-label"><a id="fig1i7"></a>Fig. 1.I.7 System curve with changing static and friction head</div>

=atag=
Parallel Pumping
=atag=

### Parallel and Series Pumping
Operating pumps in parallel or series changes the representative performance curve for each additional pump operated (see [Pump Curves](./rotodynamic-pump-curves-phase3.html)). The use of pumps in parallel or series can be used to vary operating points. 

[Figure 1.I.8](#fig1i8) is an example of 3 identical pumps in parallel being sized to cover a system curve with varying head conditions. When selecting the appropriate pumps in a situation like this, the use of variable speed control allows coverage of operating points below the pump curves, making it possible to reach duty conditions that exist within the curve envelope. It is important to remember that at any given time, the only point to dictate pump performance is where the present system curve will intersect the pump curve.

![](./images/iC-8-Pump-System-Curves-for-1-to-3-pumps-with-two-levels.png#center "")
<div class="figure-label"><a id="fig1i8"></a>Fig. 1.I.8 Parallel pumps with changing static head system</div>

As illustrated in [Figure 1.I.9](#fig1i9) the overall effect on the operating point when adding pumps in parallel depends on the shape of the system curve. Adding more parallel pumps to a system that is dominated by static head (flatter system curve) will have a greater effect on the operating point. However, for systems with more friction (steeper system curve), additional parallel pumps may not change the operating point much. Each identical pump added in parallel theoretically shares the total flow equally; therefore, adding additional pumps in the steep system example may not change the operating point much, but it will reduce the flow that each pump contributes and could reduce the individual pump flow below its minimum flow condition. 

![](./images/iC-9-Pump-Curves-Parallel-with-Steep-and-Flat-System-Curves.png#center "")
<div class="figure-label"><a id="fig1i9"></a>Fig. 1.I.9 Operating point change for parallel pumps with different shapped system curves</div>

=atag=
Series Pumping
=atag=

For series pumping, since the head is additive at a flow rate, using more pumps on a friction dominated system will have a significant increase in head with a lesser increase in flow. In a static head dominated system adding pumps in series will result in a significant increase in flow with a lesser increase in head. This is illustrated in [Figure 1.I.10](#fig1i10).

![](./images/iC-10-Pump-Curves-Series-with-Steep-and-Flat-System-Curves.png#center "")
<div class="figure-label"><a id="fig1i10"></a>Fig. 1.I.10 Series pumps with steep and flat system curves</div>

For both parallel and series pumping, attention to the pump and system curves is important. For parallel pumping, if the individual pump performance curves don’t have heads that match or if too many pumps are operated, one or more of the pumps can be operated below their minimum flow condition. For series pumping, it is important to note that the total flow rate is the same for each pump and the suction pressure and discharge pressure increase for each subsequent pump. Therefore, when multiple pumps are operated in series it is possible to run all the pumps past their runout condition, the first pump could have insufficient NPSH margin at higher flows, and the pressure rating of the subsequent pumps could be exceeded.  

### Educational Demonstration: Parallel Pumps and System Curve 
[Demo 1.I.3](#demo1i3) shows qualitatively how various parameters affect the parallel pump curve, system curve and operating point. Slide the toggle to change the number of **identical** pumps operating in parallel, pump speed and system parameters to see how the pump curve, system curve and resulting operating point vary.

=d=
title:
kind: pump-curve
pumpType: parallel
lowerLevel: 5
upperLevel: 5
pressure: 0
totalResistance: 5
pumpSpeed: 75
pumpSpeedMin: 50
pumpSpeedMax: 110
pumpCount: 3
pumpCountMax: 5
maxVelocities: 30
=d=
<div class="demo-label"><a id="demo1i3"></a>Demo. 1.I.3 Parallel pump, speed, and system parameter effect on operating point</div>

=atag=
Determining Operating Point
=atag=

### Worked Example (U.S. Customary Units Only)
Figure 1.B.6 is reproduced here from the [system curve](./sys-curves-phase3.html) section, where it was used to develop a system curve. The equation that described the system curve is Calc. 1.B.4(c) which is also reproduced here. 

[Calc. 1.B.4(c)](./sys-curves-phase3.html#calc1b4c) previously derived and repeated here

=+=
$$\Delta h_{system} = 265{ft} + ({7.75e^{-4}}·Q^2) $$
=+=

![](./images/we-system.png#center "")
<div class="figure-label">Fig. 1.B.6 System example used to derive Calc. 1.B.4c and repeated here</div>

**Verifying the Pump Curve with the System**

If we need this system to operate at 200 gpm, based on the system curve described by [Calc. 1.B.4(c)](./sys-curves-phase3.html#calc1b4c), this would require 296 feet of head. Finding the perfect pump from a vendor, we select some data points from the pump curve which are shown in [Table 1.I.1](#tbl1i1).

=|=
title: Pump Curve Data
data: qdH-us.csv
scrolling: false
=|=
<div class="table-label"><a id="tbl1i1"></a>Tbl. 1.I.1 Pump curve data</div>

Using a second-order polynomial curve fit, we get the pump curve [Equation 1.I.1](#eq1i1)

<div class="equation-label"><a id="eq1i1"></a>Eq. 1.I.1 Polynomial fit of table data</div>
=+=
$$ \Delta h_{pump} = 380 - (0.06·Q)-(0.0018·Q^2) $$
=+=

We can combine the system curve with the pump curve to get an overall understanding of how the system will operate.

![](./images/iC-11-Pump-and-System-Curve.png#center "")
<div class="figure-label"><a id="fig1i11"></a>Fig. 1.I.11 Pump operating point</div>

Since this system does not have active control devices, the system will operate where the pump and system curves intersect, which is at 200 gpm and 296 feet.

**System Deviations**

Both the pump and the system can deviate from this ideal design case. For example, the pump performance can degrade, or the system losses can increase with fouling over time. If we combine the pump and system curves, we can evaluate what will happen in various cases.

For example, consider what happens when the tank level changes. With all other factors being held constant, this would change the static head of the system. The pump would also change its operating point in response. Since the operating point will be where the pump and system curves intersect, we can set the two equations equal as shown in [Calc 1.I.1a](#calc1i1a) and [Calc 1.I.1b](#calc1i1b), and then solve for flow rate as shown in [Calc 1.I.1c](#calc1i1c) using the quadratic formula.

<div class="calculation-label"><a id="calc1i1a"></a>Calc. 1.I.1(a)</div>
=+=
$$ \Delta h_{static} + ({7.75e^{-4}}·{Q^2}) = 380 - (0.06·Q) - (0.0018·Q^2) $$
=+=

<div class="calculation-label"><a id="calc1i1b"></a>Calc. 1.I.1(b)</div>
=+=
$$ (\Delta h_{static} - 380) + (0.06·Q) + ({{7.75e^{-4}} + 0.0018})·Q^2 = 0 $$
=+=

We can solve this equation using the quadratic formula: 

<div class="calculation-label"><a id="calc1i1c"></a>Calc. 1.I.1(c)</div>
=+=
$$ Q = {{-b \pm \sqrt {b^2 - 4·a·c} } \over{2·a}} $$
=+=

where:

- a = 7.75e<sup>-4</sup> + 0.0018
- b = 0.06  
- c = Δh<sub>static</sub> - 380

If, for example, the tank level rises by 10 additional feet, the static head would increase to 275 feet. Solving the above equation, we determine that the new flow rate into the tank would be 190.6 gpm.

Other cases (e.g., pipe or fitting resistances, pump speed, etc.) would require some corresponding factors to be left as variables in the equations so they can be changed. But the methodology would remain the same.



