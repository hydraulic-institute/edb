-----
title: C) Combined Pump & System Curves 
date: May 26th, 2020
description: Pump and system curve interactions. Tutorial, demonstration, and worked examples.
hide_units: true
-----

# Combined Pump & System Curves 

### Tutorial

It is important to understand how the pump will interact with the system it is used in over a range of operating conditions. Combining the pump performance curve with the system curve will help 
show where the system will operate. In general, the system flow rate will be where the pump curve intersects the system curve. Pump and system curve interaction is covered
in <a href="https://estore.pumps.org/Standards/Rotodynamic/Design.aspx" target="_blank">ANSI/HI 14.3 – Rotodynamic Pumps for Design and Application</a>.

Knowing the shape of the system curve will help illustrate the pump operating conditions as the system conditions vary due to changes in valve position, parts of the system coming
on and off line, and upset conditions. Additionally, by overlaying the pump curves, it will help determinine if the pump is sized correctly to overcome the static and dynamic head of the system.


Using a pump and system curve will also help evaluate pump speed and impeller trimming. Both of which will change the pump curve and, therefore, where the system will operate. 
This will also help ensure the pump operation will be as close to the Best Efficiency Point (BEP) as possible to reduce energy consumption and increase pump reliability.

=^=
title: Pump System Optimization Guidebook (PSO)
description: This guidebook is intended to assist those who need to understand details of pump system optimization coupled with important capital equipment decisions. It presents practical information for those who have not had broad exposure to pumping systems and for those who wish to improve the systems for which they are responsible.
image: https://estore.pumps.org/GetImage.ashx?&maintainAspectRatio=true&maxHeight=300&maxWidth=300&Path=%7e%2fAssets%2fProductImages%2fPSOHalf.png
url: https://estore.pumps.org/Guidebooks/PSO.aspx
price: 205.00
=^=

### Reading a Pump and System Curve Plot

As the name implies, a **pump and system curve plot** consists of at least two curves. The system curve will show the static head of the system (the head required to overcome gravity at zero flow) 
and the dynamic head, which is the frictional losses at varying flow rates. The operating point is generally where the two curves intersect.

![](./reading-1.png "")

### Flow Rate Change Using Manual Throttling Valve

As a manual (or passive) valve is changed (opening or closing) it will change the system curve by affecting the K value. Closing a valve will add resistance to
the system over the entire range of flows (an opening will reduce resistance). This can be shown on the pump system plot with the system curve bending upward. 
Note the static head at zero flow will still be the same. Using the revised pump system plot, a new operating point can be determined.

![](./reading-2.png "")

### Changes in Pump Speed

Changing the pump speed will change the pump curve. This can be represented using the affinity or similarity rule (see <a href="/pump-fundamentals/pump-curves.html" target="_blank">Pump Curves</a>). 
As the pump is slowed the pump curve will be shifted down and to the left, getting closer to the plot origin.

With a system that has a manual throttling valve (active control valves are discussed later), changing the pump speed will change two things as
shown in the pump system plot – the system flow and the pump head generated. Slowing the pump down, as depicted in the chart, will reduce pump head 
produced and reduce the system flow. Note the static head at zero flow will still be the same.

![](./reading-3.png "")

### Changes in Impeller Size

In selecting the appropriate curve for a pump application to fit the desired system conditions, many centrifugal pumps can use <a href="/pump-fundamentals/pump-curves.html" target="_blank">different sized impellers</a> to shift the pump curve.
Trimming the impeller down in size will move the pump curve down much in the same way as reducing the speed of rotation.  The same can be said for selecting a larger impeller; the curve will shift up.  When sizing a pump for an application in which the pump is not hooked up to a variable speed controller, it is more appropriate
to size the impeller to your desired duty conditions.

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

![](./reading-4v3.png "")

### Changing the Setpoint on an Active Control Valve

Changing the **setpoint (*or control point*)** on an active control valve will change the operating point in the system. This will result in changing the frictional loss, the loss across the
control valve, and the head required on the pump. In the example here, the setpoint is changed so that the flow is decreased. Notice that with this decreased flow, the head 
required for the pump will increase.

![](./reading-5v3.png "")

### Changing the Pump Speed with an Active Control Valve

When the pump speed is changed and there is an active control valve in the system, the difference in head produced by the pump will be reflected in the difference in 
loss across the control valve, since the system flow rate has not changed.

![](./reading-6v3.png "")

### Pump Sizing in the Real World

Many real-world applications are designed for system curves that are provided as an envelope. This is due to varying head conditions caused by stormwater expectations, varying reservoir levels, 
piping conditions over time, or the use of pressurized tanks. Further discussion on this topic can be found in <a href="/pump-fundamentals/other-considerations.html" target="_blank">Other Considerations</a>.

### Parallel and Series System Implications

The overall effect on the system behavior when adding pumps in parallel depends on the type of system, i.e. the shape of the system curve. For friction dominated systems, (steep system curve) 
bringing additional parallel pumps online may not change the operating point (more flow or head) much. Conversely, adding more parallel pumps to a system that is dominated 
by static head (flatter system curve) will have a greater effect on the operating point.

![](./pumps-parallel.png "")

Since the head is additive for series pumps, the effect would also be different. Using more pumps on a friction dominated system will have a significant increase in head with a lesser increase in
flow. A static dominated system will be the opposite, there will be a significant increase in flow with a lesser increase in head.

![](./pumps-series.png "")

### Educational Demonstration (Parallel Pumps)

Content will be added soon.

### Worked Example (U.S. Customary Units Only)

Previously we developed a system curve for the system shown below for flows from 0 to 300 gpm. Using 4-inch pipe, the function in terms of gpm is the following.

=+=
$$\Delta h_{system} = 265{feet} + (7.75{E{-04})}{Q^2} $$
=+=

![](we-system.png "")

**Verifying the Pump Curve with the System**

We need this system to operate at 200 GPM. Based on the system curve previously determined, this would require 296 feet of head. Finding the perfect pump from a vendor,
we select some data points from the pump curve which are shown in the following table.

=|=
title: Pump Curve Data
data: qdH-us.csv
=|=

Using a second-order polynomial curve fit, we get the following pump curve equation:

=+=
$$ \Delta h_{pump} = 380 - {0.06Q}-{0.0018Q^2} $$
=+=

We can combine the system curve with the pump curve to get an overall understanding of how the system will operate.

![](pump-vs-system.png "")

Since this system does not have active control devices, the system will operate where the pump and system curves intersect, which is at <units us = "200 gpm and 296 feet." metric = "0.01262 m3/s and 90.22 m."/>

**System Deviations**

Both the pump and the system can deviate from this ideal design case. For example, the pump performance can degrade, or the system losses can increase with fouling
over time. If we combine the pump and system curves we can evaluate what will happen in various cases.

For example, let’s examine what happens with the tank level changes. With all other factors being held constant, this would change the static head of the system. 
The pump would also change its operating point in response. Since the operating point will be where the pump and system curves intersect, we can set the two equations
equal and solve for flow rate.

=+=
$$ \Delta h_{system} = \Delta h_{pump} $$
=+=

=+=
$$ \Delta h_{static} + {7.75e^{-4}}{Q^2} = 380 - {0.06Q} - {0.0018Q^2} $$
=+=

=+=
$$ (\Delta h_{static} - 380) + {0.06Q} + ({{7.75e^{-4}} + 0.0018})Q^2 = 0 $$
=+=


We can solve this equation using the quadratic formula: 

=+=
$$ Q = {{-b \pm \sqrt {b^2 - 4ac} } \over{2a}} $$
=+=

where:

- a = 7.75e<sup>-4</sup> + 0.0018
- b = 0.06  
- c = Δh<sub>static</sub> - 380

If, for example, the tank level rises 10 additional feet, the static head would increase
to 275 feet. Solving the above equation, we determine that the new flow rate into the tank would be 190.6 GPM.

Other cases (e.g. pipe or fitting resistances, pump speed, etc.) would require some corresponding factors to be 
left as variables in the equations so they can be changed. But the methodology would remain the same.



