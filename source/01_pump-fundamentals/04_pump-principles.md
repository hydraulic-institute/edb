-----
title: D) Pump Principles
tabtitle: Pump Principles - Centrifugal Mixed and Axial flow | HI Data Tool 
date: July 19th, 2024
description: Learn centrifugal pump operating principles including specific speed, suction specific speed, attainable efficiency, impeller types, and NPSHR and cavitation.
-----

## Pump Principles

### Specific Speed 

**Specific speed** is an index of pump performance at the pump’s best efficiency point (BEP) rate of flow, with the maximum diameter impeller, and at a given rotational speed. 

Specific speed, Ns, is used with US customary units and is expressed by the following equation: 


<div class="equation-label">Eq. 1.D.1</div>
$$ Ns = { {n·Q^{0.5} } \over {H^{0.75} } } $$ 

where:

- Ns = Specific Speed (US Customary) 
- n = Rotational speed, in revolutions per minute 
- Q = Total Pump flow rate at best efficiency point (BEP) in gallons per minute
- H = Head per stage, in feet

Specific speed, n<sub>s</sub>, is used with metric customary and is expressed by the following equation:

<div class="equation-label">Eq. 1.D.2</div>
$$ n_s = { {n·Q^{0.5} } \over {H^{0.75} } } $$


where:

- n<sub>s</sub> = Specific Speed (Metric)  
- n = Rotational speed, in revolutions per minute 
- Q = Total Pump flow rate at best efficiency point (BEP) in cubic meters per second 
- H = Head per stage in meters



When converting specific speed values between the US and metric convention, 51.6 is the conversion factor (51.6 · n<sub>s</sub>  = Ns)

An alternate definition for specific speed is also used based on flow rate per impeller eye (Q’) rather than total flow rate.  When applying this alternative method to the 
double suction impeller pump, the resultant value of specific speed is less by a factor of 0.707 times less.
The user is cautioned to check carefully the basis of calculation of specific speed and suction specific speed before making comparisons because there are subtle but significant 
differences in methods used throughout industry and in related textbooks and literature.  For more information on the specific speed definition refer to 
<a href="https://www.pumps.org/product/ansi-hi-14-1-14-2-2019-rotodynamic-pumps-for-nomenclature-definitions/" target="_blank">ANSI/HI 14.1-14.2</a>.



Fig. 1.D.1 illustrates the approximate shape of performance curves based on the specific speed in metric and (US) units.

![](./images/iD-1-Curve-Shape-Based-on-Specific-Speed.png#center "")
<div class="figure-label">Fig. 1.D.1</div>

=^=
title: Rotodynamic Pump Efficiency Prediction
description: ANSI/HI 20.3 presents a simplified method to predict normally attainable efficiency levels at the best efficiency point for selected types of rotodynamic pumps when the rate of flow, total head per stage, net positive suction head available (NPSHA), and the service conditions are known.
image: https://www.pumps.org/wp-content/uploads/2022/01/FINAL-HI20.3-CoverFrontBlackBorder-4.6.21-600x776.jpg
url: https://www.pumps.org/product/hi-20-3-2020-rotodynamic-pump-efficiency-prediction/
price: 50.00
hide_price: true
=^=

Below is a graph that shows the maximum practically attainable efficiency for different flow rates. This proves useful in selection of hydraulics for 
particular applications, based on desired flow and head.

![](./images/specific-speed-eff.png#center "")
<div class="figure-label">Fig. 1.D.2</div>

### Type Number
**Type number** is a variation of impeller specific speed. Type number is a dimensionless quantity calculated at the point of best efficiency. 
Note, that to obtain a dimensionless value, the specified units of measure for each variable below may be different than the units of measure assigned 
to that variable in other parts of the HI DATA TOOL.  Close attention to the units of measure for the variables in all calculations are advised.  

Type number is  defined by the following formula:

=+=
<div class="equation-label">Eq. 1.D.3</div>
$$ K = {{2·π·n·Q'^{0.5}} \over {(g·H')^{0.75}}} $$
=+=

where in US Units:

- K = type number
- Q’ = best efficiency point flow rate per impeller eye in cubic feet per second
- H’ = best efficiency point head of first stage in feet
- n = rotational speed, in revolutions per second
- g = gravitational acceleration in feet per second squared

where in Metric Units:

- K = type number
- Q’ = best efficiency point flow rate per impeller eye in cubic meters per second
- H’ = best efficiency point head of first stage in meters
- n = rotational speed, in revolutions per second
- g = gravitational acceleration in meters per second squared


### Suction Specific Speed

**Suction Specific Speed** is an index of pump suction operating characteristics.
It is determined at the BEP flow rate with the maximum diameter impeller.
Suction specific speed is an indicator of the NPSHR for a 3% drop in head (NPSH3) at a given
rate of flow and rotational speed.


Suction specific speed Nss, is used with US customary units, and is expressed by the following equation:

<div class="equation-label">Eq. 1.D.4</div>

$$ Nss = { {n·Q'^{0.5} } \over {NPSH3^{0.75} } } $$

where:

- Nss = Suction Specific Speed
- n = Rotational speed, in revolutions per minute
- Q' = best efficiency point flow rate per impeller eye in US gallons per minute 
    - =total flow rate for single suction impellers
    - =one half total flow rate for double suction impellers, 
- NPSH3 = Net positive suctions head required in feet that will cause the total head (or first stage head of multistage pumps) to be reduced by 3%

Suction Specific speed, S, is used with metric customary units, and is expressed by the following equation:

<div class="equation-label">Eq. 1.D.5</div>

$$ S = { {n·Q'^{0.5} } \over {NPSH3^{0.75} } } $$


where:

- S = Suction Specific Speed
- n = Rotational speed, in revolutions per minute
- Q' = best efficiency point flow rate per impeller eye in cubic meters per second 
    - =total flow rate for single suction impellers
    - =one half total flow rate for double suction impellers, 
- NPSH3 = Net positive suctions head required in feet that will cause the total head (or first stage head of multistage pumps) to be reduced by 3%

When converting suction specific speed values between the US and metric convention, 51.6 is the conversion factor ( 51.6 x S  = Nss )

The user is cautioned to check carefully the basis of calculation of specific speed and suction specific speed before making any 
comparisons because there are subtle but significant differences in methods used throughout industry and in related textbooks and literature. 
For more information on the suction specific speed definition refer to <a href="https://www.pumps.org/product/ansi-hi-14-1-14-2-2019-rotodynamic-pumps-for-nomenclature-definitions/" target="_blank">ANSI/HI 14.1-14.2</a>.


![](./images/stable-window.png#center "")
<div class="figure-label">Fig. 1.D.3</div>

### Impeller Types

There are many different impeller types (pictured below) based on desired performance characteristics and type of fluid pumped. The main types of impellers are shown below. 
As the flow increases with respect to the developed head, the larger the waterways become and the smaller the diameter becomes.

![](./images/impeller-types.png#center "")
<div class="figure-label">Fig. 1.D.4</div>

The three configurations (Fig 1.D.5) for an impeller are open, semi-open, and enclosed. Open impellers do not have a front or rear shroud. Semi-open impellers only have a
rear shroud. Enclosed impellers have a front and rear shroud.

![](./images/impeller-configs.png#center "")
<div class="figure-label">Fig. 1.D.5</div>

**Open impellers** are typically used on smaller pumps, axial flow pumps, and for specialty applications such as solids handling pumps. They are typically less expensive to 
manufacture and easier to clean but become inefficient as the pump wears. **Enclosed impellers** are more expensive to manufacture, more difficult to clean, and cannot pump
as many types of fluids as open impellers, but they are stronger and experience a much lower decrease in efficiency over the life of the pump. **Semi-open impellers** 
share some of the advantages and disadvantages of each. The reason for loss of efficiency in an open or semi-open impeller is that the distance between the vanes and 
the pump case surface increases over time due to wear. This allows for leakage back to suction, reducing efficiency. Another benefit of enclosed impellers is that 
setting axial distance doesn’t need to be as precise for this same reason.

=^=
title: Rotodynamic Pumps for Design and Application
description: The purpose of this standard is to provide guidance and recommendations for the general application and design of rotodynamic pumps. This standard provides accepted methods for the evaluation of the hydraulic performance and design of all related and supporting equipment. It does not include detailed hydraulic design methods. This standard recognizes and identifies application requirements, principal features, performance considerations, and the necessary precautions for proper use of rotodynamic pumps.
image: https://www.pumps.org/wp-content/uploads/2021/10/143web.jpg
url: https://www.pumps.org/product/ansi-hi-14-3-2019-rotodynamic-pumps-for-design-and-application/
price: 240.00
hide_price: true
=^=

### Net Positive Suction Head (NPSH)

**NPSH** is the net positive suction head in <units us = "feet" metric = "meters"></units>. Impellers require a certain amount of head at suction beyond the vapor pressure of the pumped
fluid in order to operate properly. This is due to the fact that there is a drop in pressure as the flow enters the eye of the impeller. If the flow’s pressure drops 
below the vapor pressure of the fluid being pumped, bubbles can form – a phenomenon called cavitation. These bubbles collapse with high energy and can cause damage to
the surrounding parts of the pump through cavitation erosion. In addition to direct damage to the waterways, cavitation can cause higher vibration leading to damage 
to other parts as the pump such as seals and bearings. Below is a simplified graph showing the pressure of a fluid as it moves through a pump, with the bottom graph
showing the fluid reaching a pressure below that of its vapor pressure, causing cavitation.

![](./images/npsh-pic.png#center "")
<div class="figure-label">Fig. 1.D.6</div>

The **net positive suction head available (NPSHA)**, which is the NPSH available at the pump site, is defined as:

=+=
<div class="equation-label">Eq. 1.D.6</div>
$$ NPSHA = {h_{sa}} - {h_{vp}}={h_{atm}+h_{s}-h_{vp}} $$
=+=

where:

- h<sub>sa</sub> = Total suction head absolute in <units us = "feet" metric = "meters"/>
- h<sub>atm</sub> = Atmospheric pressure in head in <units us = "feet" metric = "meters"/>
- h<sub>s</sub> = Total suction head in <units us = "feet" metric = "meters"/>
- h<sub>vp</sub> = Absolute vapor pressure of fluid in head in <units us = "feet" metric = "meters"/>

A pump’s **net positive suction head required (NPSHR)** is important, as it allows a pump user to determine the amount of NPSHA needed at their pump site to ensure pump
performance is met. The occurrence of visible cavitation, increase of noise and vibration due to cavitation, beginning of head or efficiency drop, and cavitation 
erosion can occur when margin above NPSHR is present. NPSH3 is the value of NPSHR when the first-stage total head drops by 3% due to cavitation. 
<a href="https://www.pumps.org/product/ansi-hi-9-6-1-2017-rotodynamic-pumps-guideline-for-npsh-margin/" target="_blank">ANSI/HI 9.6.1</a> establishes
recommended NPSHA above the published NPSHR that will lead to acceptable pump performance and service life.

Below is a common graph seen when testing a pump for NPSHR. This shows that as NPSHA is reduced, there is a point at which the head starts to drop off. On this test,
the NPSH3 is approximately 11 feet, as this is when the head drops 3% - in this case from 200 feet to 194 feet.

![](./images/NPSHr-test.png#center "")
<div class="figure-label">Fig. 1.D.7</div>

