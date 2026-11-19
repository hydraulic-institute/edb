-----
title: E) Pump Principles
tabtitle: Pump Principles - Centrifugal Mixed and Axial flow | HI Data Tool 
date: September 21, 2026
description: Learn centrifugal pump operating principles including specific speed, suction specific speed, attainable efficiency, impeller types, and NPSHR and cavitation.
-----

# Pump Principles

The pump principles section focuses on rotodynamic pumps of centrifugal, mixed and axial flow types. Related to these categories of rotodynamic pumps, typical performance curve characteristics are discussed along with attainable pump efficiency, specific speed and the associated impeller profiles, net positive suction head (NPSH) and suction specific speed.
 
=atag=
### Specific Speed 
=atag=

**Specific speed** is an index of pump performance at the pump’s best efficiency point (BEP) rate of flow, with the maximum diameter impeller, and at a given rotational speed. 

Specific speed, Ns, is used with US customary units and defined in [Eq. 1.D.1](#eq1d1) as an index relating pump rotational speed, best efficiency point flow rate, and head per stage. 


<div class="equation-label"><a id="eq1d1"></a>Eq. 1.D.1</div>
$$ Ns = { {n·Q^{0.5} } \over {H^{0.75} } } $$ 

where:

- Ns = Specific Speed (U.S. Customary Units) 
- n = Rotational speed, in revolutions per minute 
- Q = Total Pump flow rate at best efficiency point (BEP) in gallons per minute
- H = Head per stage, in feet

Specific speed, n<sub>s</sub>, is used with metric units and is defined in [Eq. 1.D.2](#eq1d2) using the same relationship as [Eq. 1.D.1](#eq1d1), with flow rate expressed in cubic meters per second and head expressed in meters.

<div class="equation-label"><a id="eq1d2"></a>Eq. 1.D.2</div>
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
<a href="https://www.pumps.org/?s=ANSI%2FHI+14.1-14.2-2019+Rotodynamic+Pumps+for+Nomenclature+and+Definitions" target="_blank">ANSI/HI 14.1-14.2</a>.



[Fig. 1.D.1](#fig1d1) defines the relationship between specific speed and the approximate shape of rotodynamic pump performance curves. The figure compares metric and US customary specific speed ranges to typical centrifugal, mixed flow, and axial flow curve shapes.

![](./images/iD-1-Curve-Shape-Based-on-Specific-Speed.png#center "")
<div class="figure-label"><a id="fig1d1"></a>Fig. 1.D.1</div>

=^=
title: Rotodynamic Pump Efficiency Prediction
description: ANSI/HI 20.3 presents a simplified method to predict normally attainable efficiency levels at the best efficiency point for selected types of rotodynamic pumps when the rate of flow, total head per stage, net positive suction head available (NPSHA), and the service conditions are known.
image: ./images/HI-20.3-efficiency.png
url: https://www.pumps.org/?s=HI+20.3-Rotodynamic+Pump+Efficiency+Prediction
price: 50.00
hide_price: true
=^=

[Fig. 1.D.2](#fig1d2) defines the maximum practically attainable pump efficiency as a function of flow rate for selected rotodynamic pump types. This figure is useful when selecting hydraulics for an application based on the desired flow and head.

![](./images/specific-speed-eff.png#center "")
<div class="figure-label"><a id="fig1d2"></a>Fig. 1.D.2</div>

### Type Number
 **Type number**, K, is defined in [Eq. 1.D.3](#eq1d3) as a dimensionless form of specific speed calculated at the pump best efficiency point. Note, that to obtain a dimensionless value, the specified units of measure for each variable defined in [Eq. 1.D.3](#eq1d3) may be different than the units of measure assigned to that variable in other parts of the HI Data Tool.  Close attention to the units of measure for the variables in all calculations are advised.

=+=
<div class="equation-label"><a id="eq1d3"></a>Eq. 1.D.3</div>
$$ K = {{2·π·n·Q'^{0.5}} \over {(g·H')^{0.75}}} $$
=+=

where in U.S. Customary Units:

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

=atag=
### Suction Specific Speed
=atag=

**Suction Specific Speed** is an index of pump suction operating characteristics determined at the BEP flow rate with the maximum diameter impeller. It is an indicator of the NPSHR for a 3% drop in head (NPSH3) at a given rate of flow and rotational speed. [Eq. 1.D.4](#eq1d4) defines suction specific speed for U.S. customary units, while [Eq. 1.D.5](#eq1d5) defines suction specific speed for metric units.

As outlined in [Eq. 1.D.4](#eq1d4) for U.S. customary units and [Eq. 1.D.5](#eq1d5) for metric units, suction specific speed is a benchmark index that communicates the relative NPSH3 performance for the design flow rate (BEP) and rotational speed, which is useful to broadly classify the suction performance of pumps. There may be design tradeoffs for the higher suction specific speed such as NPSHR increasing at lower flow rates and earlier onset of suction recirculation. Suction recirculation occurs when flow in the inlet area of an impeller separates from the vanes and forms recirculating eddies, which can result in undesirable forces, noise, vibration, and cavitation. Both increasing NPSHR at lower flow rates and suction recirculation may limit the AOR of the pump. For additional information refer to <a href="https://www.pumps.org/what-we-do/standards/?pumps-search-product=9.6.1&hi-order=asc&hi-order-by=name" target="_blank">ANSI/HI 9.6.1</a> and <a href="https://www.pumps.org/what-we-do/standards/?pumps-search-product=9.6.3&hi-order=asc&hi-order-by=name" target="_blank">ANSI/HI 9.6.3</a>. 

Suction specific speed, Nss, is used with U.S. customary units, as shown in [Eq. 1.D.4](#eq1d4).

<div class="equation-label"><a id="eq1d4"></a>">Eq. 1.D.4</div>

$$ Nss = { {n·Q'^{0.5} } \over {NPSH3^{0.75} } } $$

where:

- Nss = Suction Specific Speed
- n = Rotational speed, in revolutions per minute
- Q' = best efficiency point flow rate per impeller eye in US gallons per minute 
    - =total flow rate for single suction impellers
    - =one half total flow rate for double suction impellers, 
- NPSH3 = Net positive suctions head required in feet that will cause the total head (or first stage head of multistage pumps) to be reduced by 3%

Suction Specific speed, S, is used with metric units, aas shown in [Eq. 1.D.5](#eq1d5)

<div class="equation-label"><a id="eq1d5"></a>">Eq. 1.D.5</div>

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
For more information on the suction specific speed definition refer to <a href="https://www.pumps.org/what-we-do/standards/?pumps-search-product=14.1-14.2" target="_blank">ANSI/HI 14.1-14.2</a>.




=atag=
### Impeller Types
=atag=

[Fig. 1.D.3](#fig1d3) defines common impeller types used in centrifugal, mixed flow, and axial flow pumps. The figure shows how impeller geometry changes as flow increases relative to developed head. As the flow increases with respect to the developed head, the larger the waterways become and the smaller the diameter becomes.

![](./images/impeller-types.png#center "")
<div class="figure-label"><a id="fig1d3"></a>Fig. 1.D.3</div>

[Fig. 1.D.4](#fig1d4) defines the three common impeller configurations: open, semi-open, and enclosed. Open impellers do not have a front or rear shroud; semi-open impellers have only one shroud; and enclosed impellers have both front and rear shrouds.

![](./images/impeller-configs.png#center "")
<div class="figure-label"><a id="fig1d4"></a>Fig. 1.D.4</div>

**Open impellers** are typically used on smaller pumps, axial flow pumps, and for specialty applications such as solids handling pumps. They are typically less expensive to 
manufacture and easier to clean but become inefficient as the pump wears. **Enclosed impellers** are more expensive to manufacture, more difficult to clean, and cannot pump
as many types of fluids as open impellers, but they are stronger and experience a much lower decrease in efficiency over the life of the pump. **Semi-open impellers** 
share some of the advantages and disadvantages of each. The reason for loss of efficiency in an open or semi-open impeller is that the distance between the vanes and 
the pump case surface increases over time due to wear. This allows for leakage back to suction, reducing efficiency. Another benefit of enclosed impellers is that 
setting axial distance doesn’t need to be as precise for this same reason.

=^=
title: Rotodynamic Pumps for Design and Application
description: The purpose of this standard is to provide guidance and recommendations for the general application and design of rotodynamic pumps. This standard provides accepted methods for the evaluation of the hydraulic performance and design of all related and supporting equipment. It does not include detailed hydraulic design methods. This standard recognizes and identifies application requirements, principal features, performance considerations, and the necessary precautions for proper use of rotodynamic pumps.
image: ./images/ANSI-14.3-design.png
url: https://www.pumps.org/?s=ANSI%2FHI+14.3-2019+Rotodynamic+Pumps+for+Design+and+Application
price: 240.00
hide_price: true
=^=

=atag=
### Net Positive Suction Head (NPSH)
=atag=

**NPSH** is the net positive suction head in <units us = "feet" metric = "meters"></units>. Impellers require a certain amount of head at suction beyond the vapor pressure of the pumped fluid in order to operate properly. This is due to the fact that there is a drop in pressure as the flow enters the eye of the impeller. If the flow’s pressure drops below the vapor pressure of the fluid being pumped, bubbles can form – a phenomenon called cavitation. These bubbles collapse with high energy and can cause damage to the surrounding parts of the pump through cavitation erosion. In addition to direct damage to the waterways, cavitation can cause higher vibration leading to damage to other parts of the pump, such as seals and bearings. [Fig. 1.D.5](#fig1d5) defines the pressure profile through a pump and illustrates how cavitation can occur when local pressure falls below the liquid vapor pressure resulting in cavitation.

![](./images/npsh-pic.png#center "")
<div class="figure-label"><a id="fig1d5"></a>Fig. 1.D.5</div>

The **net positive suction head available (NPSHA)**, which is the NPSH available at the pump site, is defined in [Eq. 1.D.6](#eq1d6) as the absolute suction head above the liquid vapor pressure head.

=+=
<div class="equation-label"><a id="eq1d6"></a>Eq. 1.D.6</div>
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
<a href="https://www.pumps.org/?s=ANSI%2FHI+9.6.1-2017+Rotodynamic+Pumps+Guideline+for+NPSH+Margin" target="_blank">ANSI/HI 9.6.1</a> establishes
recommended NPSHA above the published NPSHR that will lead to acceptable pump performance and service life.

[Fig. 1.D.6](#fig1d6) defines a typical NPSHR test curve. The figure shows that as NPSHA is reduced, the pump total head eventually begins to decrease; NPSH3 is identified where the first-stage total head has dropped by 3%. For this case, the NPSH3 is approximately 11 feet, as this is when the head drops 3% (from 200 feet to 194 feet).

![](./images/NPSHr-test.png#center "")
<div class="figure-label"><a id="fig1d6"></a>Fig. 1.D.6 NPSHR Breakdown Curve</div>

=atag=
### Submergence
=atag=

Submergence (S) is defined as the vertical distance from the free surface of the liquid pumped to the cdatum for the particular intake type as defined in <a href="https://www.pumps.org/?s=9.8+Rotodynamic+Pumps+for+Pump+Intake+&post_type=#page-title" target="_blank">ANSI/HI 9.8 Rotodynamic Pumps for Pump Intake Design</a>. The following is an excerpt regarding submergence and the reader is encouraged to refer to ANSI/HI 9.8 for full details on pump intake design. 

=^=
title: ANSI/HI 9.8 Rotodynamic Pumps for Pump Intake Design   
description: Learn standard intake designs for rotodynamic pumps handling clear and solids laden fluids, the criteria beyond which an intake must be validated by physical model, and techniques to improve problem intakes.  
image: /images/ANSI-9.8-intake.png
url:  https://www.pumps.org/?s=9.8+Rotodynamic+Pumps+for+Pump+Intake+&post_type=#page-title
price: 
hide_price: true
=^=

In addition to contributing to the NPSHA, a minimum submergence is also needed to prevent strong air core vortices from entering the pump or piping, such as illustrated in [Fig. 1.D.7](#fig1d7). 

![](./images/submergence1.png#center "")
<div class="figure-label"><a id="fig1d7"></a>Fig. 1.D.7 Type 5 and 6 Air Core Vorticies per ANSI/HI 9.8</div>

The minimum submergence required to prevent strong air core vortices is based in part on a dimensionless flow parameter, the Froud number, defined in [Eq. 1.D.7](#eq1d7).

=+=
<div class="equation-label"><a id="eq1d7"></a>Eq. 1.D.7 Froud number</div>
$$ F_{D} = {{V} \over {(g · D)^{0.5}}} $$
=+=

where: 

- F<sub>D</sub> is Froud number at D (dimensionless)
- V is velocity at the suction inlet = Flow/Area, based on D
- D is the outside diameter of the bell or inside diameter of pipe inlet (Refer to ANSI/HI 9.8)
- g is the gravitational acceleration

Minimum submergence per ANSI/HI 9.8 is provided in [Eq. 1.D.8](#eq1d8). Consistent units must be used for V, D, and g so that F<sub>D</sub> is dimensionless and the units for minimum submergence (S) are those used for D. Section 9.8.6 of <a href="https://www.pumps.org/?s=9.8+Rotodynamic+Pumps+for+Pump+Intake+&post_type=#page-title" target="_blank">ANSI/HI 9.8</a> provides further information on the background and development of this relationship. The minimum submergence (S) is illustrated in [Fig. 1.D.8](#fig1d8) for a vertical pump with a suction bell, and a pipe outlet with flared opening.

=+=
<div class="equation-label"><a id="eq1d8"></a>Eq. 1.D.8 Minimum submergence</div>
$$ S = D · (1 + 2.3·F_{D}) $$
=+=

![](./images/submergence_combined.png#center "")
<div class="figure-label"><a id="fig1d8"></a>Fig. 1.D.8 Type 5 and 6 Air Core Vorticies per ANSI/HI 9.8</div> 

Note that the minimum submergence may need to be increased to satisfy the pump NPSHR. Refer to sections <a href="/pump-fundamentals/pump-principles.html" target="_self">Rotodynamic Pump Principles</a>, and <a href="/pump-fundamentals/pump-curves.html" target="_self">Rotodynamic Pump Curves</a>.