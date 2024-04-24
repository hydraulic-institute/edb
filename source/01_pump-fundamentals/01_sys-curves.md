-----
title: A) System Curves
date: April 19th, 2024
description: Contains a system curves tutorial, demonstration, and worked examples.
-----
# System Curves 

### Tutorial

The total head at any given flow rate consists of two parts: **static head** and **frictional head**. The frictional head loss consists of major losses (piping) and minor head losses (component losses). 
Each of these is described in further detail below. A **system curve** shows the total system head required over a range of flow rates.

### Pressure and Head Relationship
Head is the expression of the energy content of a liquid in reference to any arbitrary datum. It is expressed in units of energy per unit weight of liquid. The measuring unit for head is <units us = "feet" metric = "meters"></units> of liquid.

Pressure and head have a liquid have a physical relationship as outlined in equation 1.A.1. These equations utilize a conversion constant and specific gravity (s), which is defined in equation 1.A.2. It is common to use head because the performance of the pump can be shown independent of the specific gravity or density of the fluid pumped.

<div class="equation-label">Eq. 1.A.1</div>
=+=
[units = us]
$$ H =  {{2.31 · p} \over s} $$
=+=
=+=
[units = metric]
$$ H =  {{0.102 · p} \over s} $$
=+=

where:

- H = head in <units us = "feet (ft)" metric = "meters (m)"/>
- p = pressure in <units us = "pounds per square inch (psi)" metric = "kilopascals (kPa)"/>
- s = specific gravity (unitless), see equation 1.A.2

Specific gravity (s) is calculated by equation 1.A.2 and values of specific gravity for water and other liquids can be found in section II.

<div class="equation-label">Eq. 1.A.2</div>
=+=
$$ s = {ρ_{pumped fluid} \over ρ_{water}}  $$
=+=

where:

- ρ = density, typically in <units us = "lbm/ft^3" metric = "kg/m^3"/>

### Static Head
**Static head** consists of both the elevation and pressure difference between the supply and destination of the system. This typically does not depend on velocity and is therefore constant for the system curve. This can be calculated using equation 1.A.3.

<div  class="equation-label"><a id="eq1a3"></a>Eq. 1.A.3</div >
=+=
$$ \Delta h_{stat} = (z_{destination} - z_{supply}) + {(p_{destination} - p_{supply}) \over \rho ·g} $$
=+=

where:
<!-- Delta special character is &#x0394; -->
- &#x0394;h<sub>stat</sub> is differential static head, <units us = "feet" metric = "meters"/>
- z is elevation, in <units us = "feet (ft)" metric = "meters"/>
- p is pressure, in <units us = "psi" metric = "kPa"/>
- ρ is fluid density, in <units us = "lbm/ft^3" metric = "kg/m^3"/>
- g is gravitational acceleration, <units us = "32.2 ft/s^2" metric = "9.81 m/s^2"/>

This equation is based on the supply and destination being tanks or where the velocity of the fluid can be considered zero. If the pressure measurements are taken with a gage where the velocity is not negligible then the velocity pressure (or dynamic pressure) must be added to the pressure gage reading as indicated in equation 1.A.4.

<div  class="equation-label">Eq. 1.A.4</div >
=+=
$$ p = p_{gauge} + 0.5 · \rho · v^2 = {p_{gauge} + \rho · Q^2 \over 2 · A^2} $$
=+=

where:

- p<sub>gauge</sub> is pressure measurement at the gage, in <units us = "psi" metric = "kPa"/>
- ρ is fluid density, in <units us = "lbm/ft^3" metric = "kg/m^3"/>
- v is fluid velocity, in <units us = "ft/s" metric = "m/s"/>
- Q is volumetric flow rate, in <units us = "ft^3^/s" metric = "m^3^/s"/>
- A is pipe cross sectional area, in <units us = "ft^2" metric = "m^2"/>

Since the velocity can be different between the two gage measurements, each of the pressures should be converted separately based on the conditions at the gage before using them in equation 1.A.3. Therefore, the pressure at the supply and destination can be defined as detailed in equations 1.A.5 and 1.A.6.

<div  class="equation-label">Eq. 1.A.5</div >
=+=
$$ p_{supply} = {p_{supply,gauge} + \rho · Q_{supply}^2\over 2 · A_{supply}^2} $$
=+=

<div  class="equation-label">Eq. 1.A.6</div >
=+=
$$ p_{destination} = {p_{destination,gauge} + \rho · Q_{destination}^2 \over 2 · A_{destination}^2} $$
=+=

Note that if the supply and destination are at the same pressure, as is the case when they are open tanks, then the static head is simply the difference in the liquid elevation.

For the following discussion in this section, it is assumed that the supply and destination are tanks which have negligible velocity.

### Frictional Head

The **head loss due to friction** will vary based on flow rate (velocity) and can be calculated for the system components, such as piping, valves, elbows and bends, and end-use equipment, etc. These losses typically vary proportionally to the square of the velocity.

### Major Losses

Frictional head losses in pipes can be calculated using the Darcy-Weisbach equation. The Darcy-Weisbach friction factor, *f*, can be determined using the Colebrook-White equation
(defined in <a href="/fluid-flow-III/general.html" target="_blank">Fluid Flow – General</a>).

These equations will approximate the Moody diagram. The friction factor is based on the Reynolds Number (Re), the 
pipe diameter (D), and the pipe roughness (ε). The pipe roughness is dependent on the type of pipe being used. Other aspects,
such as age, fouling, and coatings will also affect the pipe roughness. An example table of typical values 
for steel pipe materials an be found <a href="/piping-materials-IV/steel-pipe.html" target="_blank">here</a>. For other pipe materials, see section IV.

The Hazen-Williams equation is another method to 
determine pipe losses. These values are only valid for water and do not account for temperature or viscosity. 
These values are a function of pipe material only and are not dependent on Reynolds Number.

### Minor Losses

Minor losses in a piping system occur when fluid passes through a fitting, valve, area change, or enters or exits a tank, etc. Any system component that obstructs or changes the 
direction or pressure of the flow can be considered a minor loss. These are categorized differently than the pipe frictional loss (or major loss). These minor losses can be the
dominant system loss. 

The loss created by the component is often characterized by a constant, K, and tabulated for several types of components. Head loss is determined by the
equation defined in <a href="/fluid-flow-III/general.html" target="_blank">Fluid Flow – General</a>
(K values are also tabulated here).

=^=
title: Basic System Hydraulics - 1 Part On-Demand Webinar
description: It’s important to be able to visualize pump curves and system curves to understand their interaction. Learn the basics of system hydraulics in this 1-part webinar.
image: https://www.pumps.org/wp-content/uploads/2022/02/On-Demand-for-EDL-1-e1645114699527.png
url: https://training.pumps.org/products/basic-system-hydraulics-pump-system-curves-energy-consumption-control-methods-1-part-on-demand-webinar
price: 119.00
hide_price: true
=^=

### System Curve

Based on these concepts, the total system head at any given flow rate is the sum of the static head and frictional head losses in the system. It, therefore, can be represented using the equation 1.A.7 (where the velocity at the supply and destination is negligible, e.g. they are tanks):

<div  class="equation-label"><a id="eq1a7"></a>Eq. 1.A.7</div >
=+=
$$ \Delta h_{system} = (z_{destination}-z_{supply}) + {(p_{destination}-p_{supply}) \over \rho ·g} + {({fL \over D} + ΣK) · {v^2 \over 2·g}} $$
=+=
where:
<!-- Delta special character is &#x0394; -->
- &#x0394;h<sub>system</sub> is system head, <units us = "feet" metric = "meters"/>
- z is elevation, in <units us = "feet" metric = "meters"/>
- p is pressure, in <units us = "psi" metric = "kPa"/>
- ρ is fluid density, in <units us = "lbm/ft^3" metric = "kg/m^3"/>
- g is gravitational acceleration, <units us = "32.2 ft/s^2" metric = "9.81 m/s^2"/>
- f is friction factor
- L is pipe length, in <units us = "feet" metric = "meters"/>
- D is pipe inside diameter, in <units us = "feet" metric = "meters"/>
- v is average velocity in pipe, in <units us = "ft/s" metric = "m/s"/>
A system curve is a graphical representation of the relationship between flow rate and the associated static and frictional head losses. It is generated by calculating the static head and the frictional head losses at various flow rates and plotting them on a common set of axes.

### Shape of the System Curve

In some systems the frictional losses will be the majority of overall head loss. These systems will have a steeper system curve.

<center>
![](./images/iA-1-Friction-Dominated-System-Curve.png "")
![](./images/elev-changes.png "")
</center>
<div class="figure-label">Fig. 1.A.1</div>

In other systems the elevation change, or static head, will be the majority of the overall head loss. The system curve in this case will start at a higher
value at zero flow and will tend to be flatter.

<center>
![](./images/iA-2-Static-Dominated-System-Curve.png "")
![](./images/large-elev.png "")
</center>
<div class="figure-label">Fig. 1.A.2</div>

It is important to accurately characterize the system curve to select the correct pump for various operating conditions as the operating point of your system will be dependent
on the intersection between the system curve and the pump curve.

### System Curve Application

Real-world applications tend to consider a range or family of system curves. This would bracket the range of liquid levels,
operating pressures, valve arrangements, etc. 

=^=
title: Introduction to Vibration in Rotodynamic Pumps: 1-Part On-Demand Webinar
description: This webinar presents an introduction to vibration analysis of rotodynamic pumps and will provide basic concepts of vibration analysis and provide some guidelines to help the diagnostic process of dynamic behavior on rotodynamic pumps and their systems. The focus is on centrifugal pumps of all types regarding their typical vibration issues such as imbalance, misalignment, rubs, looseness, etc.  Troubleshooting methods and fixes are discussed with real life case histories.
image: https://www.pumps.org/wp-content/uploads/2022/02/On-Demand-for-EDL-1-e1645114699527.png
url: https://training.pumps.org/products/introduction-to-vibration-in-rotodynamic-pumps-1-part-on-demand-webinar 
price: 159.99
hide_price: true
=^=

### Educational Demonstration System Curve
This demonstrator shows qualitatively how various parameters affect the system curve. Slide the toggle to change system parameters and see how the system curve varies.

=d=
title:
kind: pump-curve
type: system
pumpCount: 0
lowerLevel: 5
upperLevel: 5
upperPressure: 10
totalResistance: 5
=d=
<div class="demo-label">Demo. 1.A.1</div>

### Worked Example (U.S. & Metric Units)

<units us = "Consider the system in Fig. 1.A.3 and develop a system curve for the flows from 0 to 300 GPM." metric = "Metric values in the worked example are converted from US units in Fig. 1.A.3. Consider the system in Fig. 1.A.3 and develop a system curve for the flows from 0 to 68.14 m^3^/h"/>

![](./images/we-system.png#center "")
<div class="figure-label">Fig. 1.A.3</div>

**Determine the Static Head**

Using the static head calculation in [Eq. 1.A.3](#eq1a3), and since both tanks have the same surface pressure, the static head is only dependent on the difference in surface elevation.

<div class="calculation-label">Calc. 1.A.1</div >
=+=
[units = us]
$$\Delta h_{stat} = (z_{destination}-z_{supply}) = (289\,{ft}-24\,{ft}) = 265\,{ft}$$
=+=
=+=
[units = metric]
$$ \Delta h_{stat} = (z_{destination}-z_{supply}) = (88.09\,{m}-7.315\,{m}) = 80.77\,{m} $$
=+=

**Determine the Pipe Friction and Properties**

To simplify this example, we will consider the friction factor to be constant at 0.02. In general, the friction factor would vary as the flow rate (velocity) varies. Additionally, the flow would be laminar for low velocities. These considerations should be taken into account when calculating the pipe losses.

<units us = "A 4-inch, schedule 40 steel pipe has an inner diameter of 4.026 inches (0.3355 feet). The overall pipe length in this example is 1255 feet." metric = "A 4-inch, schedule 40 steel pipe has an inner diameter of 102.26 mm (0.10226 m). The overall pipe length in this example is 382.5 meters."/>

**Determine the Minor or Component Loss**

The losses for the components can be found in tables. In this example we have the following:

- Regular flanged elbow (2), K = 0.31 each
- Swing check valve, K = 2.0
- Wedge-disc gate valve, K = 0.17
- Sudden enlargement, K = 1.0

This gives a total K factor equal to 3.79

Using the combined frictional loss equation in [Eq. 1.A.7](#eq1a7), we can determine the head loss in <units us = "(feet)" metric = "(meters)"/> as a function of velocity in <units us = "(ft/s)" metric = "(m/s)"/>

<div class="calculation-label">Calc. 1.A.2</div >
=+=
[units = us]
$$ \Delta h_f = {({fL \over D} + ΣK) · ({v^2 \over 2·g})} = {({0.02 × 1255ft \over 0.3355ft} + 3.79) · ({v^2 \over 2 × 32.2 {ft/s^2}})} = 1.22·v^2$$
=+=
=+=
[units = metric]
$$ \Delta h_f = {({fL \over D} + ΣK) · ({v^2 \over 2·g})} = {({0.02 × 382.52m \over 0.10226m} + 3.79) · ({v^2 \over 2 × 9.81 {m/s^2}})}= 4.01·v^2 $$
=+=

**Determine the System Curve**

The system curve can be calculated by varying the flow rate (velocity) using the above values. Combining the static and frictional losses (pipe friction and minor losses) we have equation 1.A.8 describing system head as a function of static head and friction head, which the susequent calculations utilize to calculate system head as a function of velocity. 

<div class="equation-label">Eq. 1.A.8</div >
=+=
$$ \Delta h_{system} = \Delta h_{stat} + \Delta h_{f} $$
=+=

<div class="calculation-label">Calc. 1.A.3(a)</div >
=+=
[units = us]
$$\Delta h_{system} = 265{ft} + 1.22·v^2$$
=+=
=+=
[units = metric]
$$\Delta h_{system} = 80.77{m} + 4.01·v^2$$
=+=

<units us = "The following can be used to convert a flow rate (Q) in gpm (gallons per minute) to a velocity in ft/s (with the pipe diameter D in inches)."
metric = "The following can be used to convert a flow rate (Q) in m^3^/h (cubic meters per hour) to a velocity in m/s (with the pipe diameter D in meters)."/>

<div class="calculation-label">Calc. 1.A.3(b)</div >
=+=
[units us]
$$ v = 0.320833·Q·({4 \over \pi ·D^2}) $$
=+=
=+=
[units metric]
$$ v = 0.000278·Q·({4 \over \pi ·D^2}) $$
=+=

Substituting this in for velocity and using the 4-inch pipe <units us ="(ID = 4.026 inches) we get the following as the system curve equation as a function of flow rate in gpm." metric ="(ID = 0.10226 m) we get the following as the system curve equation as a function of flow rate in m^3/h."/> 

<div class="calculation-label"><a id="calc1a3c"></a>Calc. 1.A.3(c)</div >
=+=
[units us]
$$ \Delta h_{system} = 265{ft} + {{{7.75e^{-4}}}·{Q^2}} $$
=+=
=+=
[units metric]
$$ \Delta h_{system} = 80.77{m} + {({4.59e^{-03})}·{Q^2}} $$
=+=

This, then, gives the following system curve data. This is a system that is dominated by the static head (there is a lift of <units us = "265 feet compared to little loss in piping and components)." metric = "80.77 meters compared to little loss in piping and components)."/> 

=/=
title: Velocity 
data-us: datapoints_us.csv
data-metric: datapoints_metric.csv
x: 1
series: 2
series_title_index: 0
=/=
<div class="figure-label">Fig. 1.A.4</div>

=/=
title: System Curve 
data-us: datapoints_us.csv
data-metric: datapoints_metric.csv
x: 1
series: 3
series_title_index: 0
=/=
<div class="figure-label">Fig. 1.A.5</div>

=|=
title: System Curve Data 
data-us: datapoints_us.csv
data-metric: datapoints_metric.csv
=|=