-----
title: C) Combined Pump & System Curves 
tabtitle: Pump System Operating Point | HI Data Tool 
date: July 19th, 2024
description: Determine the pump system operating point and the effect of parallel and series pumping, variable speed pumping, and piping and control valve changes.
hide_units: true
-----

# Combined Pump & System Curves 

### Tutorial

It is important to understand how the pump will interact with the system it is used in over a range of operating conditions. Combining the pump performance curve with the system curve will help 
show where the system will operate. In general, the system flow rate will be where the pump curve intersects the system curve. Pump and system curve interaction is covered
in <a href="https://www.pumps.org/what-we-do/standards/?pumps-search-product=14.3&hi-order=asc&hi-order-by=name" target="_blank">ANSI/HI 14.3</a>.

Knowing the shape of the system curve will help illustrate the pump operating conditions as the system conditions vary due to changes in valve position, parts of the system coming
on and offline, and upset conditions. Additionally, by overlaying the pump curves, it will help determine if the pump is sized correctly to overcome the static head and frictional head losses of the system.


Using a pump and system curve will also help evaluate pump speed and impeller trimming. Both of which will change the pump curve and, therefore, where the system will operate. 
This will also help ensure the pump operation will be as close to the Best Efficiency Point (BEP) as possible to reduce energy consumption and increase pump reliability.

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
<div class="figure-label">Fig. 1.C.1</div>

### Flow Rate Change Using Manual Throttling Valve

As a manual (or passive) valve is changed (opening or closing) it will change the system curve by affecting the K value. Closing a valve will add resistance to
the system over the entire range of flows (an opening will reduce resistance). This can be shown on the pump system plot with the system curve bending upward. 
Note the static head at zero flow will still be the same. Using the revised pump system plot, a new operating point can be determined.

![](./images/iC-2-Pump-and-system-Curve-valve-closed.png#center "")
<div class="figure-label">Fig. 1.C.2</div>

=^=
title: Variable Speed Pumping – On-Demand Training  
description: Learn how variable speed operation changes the pump performance, the system operating point as it interacts with the system curve, and the effect on energy and life cycle cost.  
image: https://www.pumps.org/wp-content/uploads/2022/02/On-Demand-for-EDL-1-e1645114699527.png
url: https://training.pumps.org/products/variable-speed-pumping-on-demand-training
price: 119.00
hide_price: true
=^=

### Changes in Pump Speed

Changing the pump speed will change the pump curve. This can be represented using the affinity or similarity rule (see <a href="/pump-fundamentals/pump-curves.html" target="_blank">Pump Curves</a>). 
As the pump is slowed the pump curve will be shifted down and to the left, getting closer to the plot origin.

With a system that has a manual throttling valve (active control valves are discussed later), changing the pump speed will change two things as
shown in the pump system plot – the system flow and the pump head generated. Slowing the pump down, as depicted in the chart, will reduce pump head 
produced and reduce the system flow. Note the static head at zero flow will still be the same.

![](./images/iC-3-Pump-and-system-Curve-valve-closed-reduced-speed.png#center "")
<div class="figure-label">Fig. 1.C.3</div>

### Changes in Impeller Size

In selecting the appropriate curve for a pump application to fit the desired system conditions, many centrifugal pumps can use <a href="/pump-fundamentals/pump-curves.html" target="_blank">different sized impellers</a> to shift the pump curve.
Trimming the impeller down in size will move the pump curve down much in the same way as reducing the speed of rotation.  The same can be said for selecting a larger impeller; the curve will shift up.  When sizing a pump for an application in which the pump is not hooked up to a variable speed controller, it is more appropriate
to size the impeller to your desired duty conditions.

### Educational Demonstration: Pump and System Curve
Demo 1.C.1 shows qualitatively how various parameters affect the pump curve, system curve and operating point. Slide the toggle to change the pump speed and system parameters to see how the pump curve, system curve and resulting operating point vary.

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
<div class="demo-label">Demo. 1.C.1</div>

### Active Control Valves

An **active control valve** is one that continually changes position (loss) to maintain a set flow or set pressure. It is important to note that there is no human intervention involved.
Since they continuously vary their position (and head loss) to maintain a flow or pressure, there is no single valve over a range of system flows. Since there are many system flows, there are 
many valve positions and losses. Because of this, active control valves are not normally included in the system curve. However, they are shown on the pump system plot as the difference between 
the two curves at the operating point. In other words, a system with an active control valve will not operate at the intersection of the pump and system curves since the control valve will fix
the system at a certain point. 

The plot below is an example of a control valve set to maintain a certain flow through the system. The control valve can open or close (modulate) to regulate the flow. 
This will change the head loss across the valve and will affect the pump operating point.

This pump system plot shows two things. First, with the control valve in the system, the pump head required is the sum of the static head, frictional losses and the loss across the control valve. 
It also shows that the flow in the system is less than the flow in the system without the control valve.

The plot also is useful in determining the margin available on the control valve. Having sufficient, but not excessive, pressure drop across most control valves is required so the valve can properly control 
to the setpoint.

![](./images/iC-4-Pump-and-system-Curve-with-Valve-head.png#center "")
<div class="figure-label">Fig. 1.C.4</div>

### Changing the Setpoint on an Active Control Valve

Changing the **setpoint (*or control point*)** on an active control valve will change the operating point in the system. This will result in changing the frictional loss, the loss across the
control valve, and the head required on the pump. In the example here, the setpoint is changed so that the flow is decreased. Notice that with this decreased flow, the head 
required for the pump will increase.

![](./images/iC-5-Pump-and-system-Curve-with-Valve-head-2.png#center "")
<div class="figure-label">Fig. 1.C.5</div>

### Changing the Pump Speed with an Active Control Valve

When the pump speed is changed and there is an active control valve in the system, the difference in head produced by the pump will be reflected in the difference in 
loss across the control valve, since the system flow rate has not changed.

![](./images/iC-6-Pump-and-system-Curves-variable-speed-valve-head-loss.png#center "")
<div class="figure-label">Fig. 1.C.6</div>

=^=
title: Pump & System Fundamentals – On-Demand Curriculum   
description: Learn the fundamentals of pumps and systems at your own pace with 12 hour long modules covering pump curves, system curves, power, efficiency, NPSHA, pump total head, POR, AOR, selection, motors, VFDs, seals, bearings, and couplings. 
image: https://www.pumps.org/wp-content/uploads/2022/02/On-Demand-for-EDL-1-e1645114699527.png
url: https://training.pumps.org/products/pump-and-system-fundamentals-on-demand-training-curriculum-2
price: 119.00
hide_price: true
=^=

### Educational Demonstration: Pump and System Curve with Control Valve
Demo 1.C.2 shows qualitatively how various parameters affect the pump curve, system curve, control valve head and operating point. Slide the toggle to change the pump speed, control valve position and system parameters to see how the pump curve, system curve, control valve head and resulting operating point vary.

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
<div class="demo-label">Demo. 1.C.2</div>

### Pump Sizing in the Real World

Many real-world applications are designed for system curves that are provided as an envelope. This is due to varying head conditions caused by stormwater expectations, varying reservoir levels, 
piping conditions over time, or the use of pressurized tanks. The below is an example of a system curve envelope which dictates all the conditions seen. It is up to the system designer to specify
the important points the selected pumps need to hit.

![](./images/iC-7-System-Curves-for-Varying-Conditions.png#center "")
<div class="figure-label">Fig. 1.C.7</div>

For many situations, the use of pumps in parallel or pumps in series can be used to define minimum and maximum conditions considering the use of a Variable Speed Controller in order to cover the
points below the pump curves. Below is an example of 3 identical pumps in parallel being sized to cover a system curve with varying head conditions.

![](./images/iC-8-Pump-System-Curves-for-1-to-3-pumps-with-two-levels.png#center "")
<div class="figure-label">Fig. 1.C.8</div>


When selecting the appropriate pump in a situation like this, the use of a Variable Speed Controller is expected which means it is possible to reach duty conditions
that exist within the curve envelope.  Using affinity rules will allow the engineer to calibrate the Variable Speed Controller to cause the pumps to hit any desired
duty condition within the curve envelope.  It is important to remember that at any given time, the only point to dictate pump performance is where the present system
curve will intersect the pump curve.

### Undersized or Oversized Pumps

It is important to note that as the flow increases, the pump head produced will decrease as the system flow losses increases. Oversized or undersized pumps will have curves that do not
intersect at the required flow rate or will not cross at all. This will show that a different pump should be selected.

### Parallel and Series System Implications

The overall effect on the system behavior when adding pumps in parallel depends on the type of system, i.e. the shape of the system curve. For friction dominated systems, (steep system curve) 
bringing additional parallel pumps online may not change the operating point (more flow or head) much. Conversely, adding more parallel pumps to a system that is dominated 
by static head (flatter system curve) will have a greater effect on the operating point.

![](./images/iC-9-Pump-Curves-Parallel-with-Steep-and-Flat-System-Curves.png#center "")
<div class="figure-label">Fig. 1.C.9</div>

Since the head is additive for series pumps, the effect would also be different. Using more pumps on a friction dominated system will have a significant increase in head with a lesser increase in
flow. A static dominated system will be the opposite, there will be a significant increase in flow with a lesser increase in head.

![](./images/iC-10-Pump-Curves-Series-with-Steep-and-Flat-System-Curves.png#center "")
<div class="figure-label">Fig. 1.C.10</div>

### Educational Demonstration: Parallel Pumps and System Curve 
Demo 1.C.3 shows qualitatively how various parameters affect the parallel pump curve, system curve and operating point. Slide the toggle to change the number of **identical** pumps operating in parallel, pump speed and system parameters to see how the pump curve, system curve and resulting operating point vary.

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
<div class="demo-label">Demo. 1.C.3</div>


### Worked Example (U.S. Customary Units Only)

Previously we developed a system curve for the system shown below for flows from 0 to 300 gpm. Using 4-inch pipe, the function in terms of gpm is the following.

[Calc. 1.A.3(c)](./sys-curves.html#calc1a3c)
=+=
$$\Delta h_{system} = 265{feet} + ({7.75e^{-4}}·Q^2) $$
=+=

![](./images/we-system.png#center "")
<div class="figure-label">Fig. 1.C.11</div>

**Verifying the Pump Curve with the System**

We need this system to operate at 200 GPM. Based on the system curve previously determined, this would require 296 feet of head. Finding the perfect pump from a vendor,
we select some data points from the pump curve which are shown in the following table.

=|=
title: Pump Curve Data
data: qdH-us.csv
scrolling: false
=|=
<div class="table-label">Tbl. 1.C.1</div>

Using a second-order polynomial curve fit, we get the following pump curve equation:

<div class="equation-label">Eq. 1.C.12</div>
=+=
$$ \Delta h_{pump} = 380 - (0.06·Q)-(0.0018·Q^2) $$
=+=

We can combine the system curve with the pump curve to get an overall understanding of how the system will operate.

![](./images/iC-11-Pump-and-System-Curve.png#center "")
<div class="figure-label">Fig. 1.C.12</div>

Since this system does not have active control devices, the system will operate where the pump and system curves intersect, which is at 200 gpm and 296 feet.

**System Deviations**

Both the pump and the system can deviate from this ideal design case. For example, the pump performance can degrade, or the system losses can increase with fouling
over time. If we combine the pump and system curves, we can evaluate what will happen in various cases.

For example, let’s examine what happens with the tank level changes. With all other factors being held constant, this would change the static head of the system. 
The pump would also change its operating point in response. Since the operating point will be where the pump and system curves intersect, we can set the two equations
equal and solve for flow rate.

<div class="equation-label">Eq. 1.C.13</div>
=+=
$$ \Delta h_{system} = \Delta h_{pump} $$
=+=

<div class="calculation-label">Calc. 1.C.13(a)</div>
=+=
$$ \Delta h_{static} + ({7.75e^{-4}}·{Q^2}) = 380 - (0.06·Q) - (0.0018·Q^2) $$
=+=

<div class="calculation-label">Calc. 1.C.13(b)</div>
=+=
$$ (\Delta h_{static} - 380) + (0.06·Q) + ({{7.75e^{-4}} + 0.0018})·Q^2 = 0 $$
=+=


We can solve this equation using the quadratic formula: 

<div class="calculation-label">Calc. 1.C.13(c)</div>
=+=
$$ Q = {{-b \pm \sqrt {b^2 - 4·a·c} } \over{2·a}} $$
=+=

where:

- a = 7.75e<sup>-4</sup> + 0.0018
- b = 0.06  
- c = Δh<sub>static</sub> - 380

If, for example, the tank level rises 10 additional feet, the static head would increase
to 275 feet. Solving the above equation, we determine that the new flow rate into the tank would be 190.6 GPM.

Other cases (e.g. pipe or fitting resistances, pump speed, etc.) would require some corresponding factors to be 
left as variables in the equations so they can be changed. But the methodology would remain the same.



