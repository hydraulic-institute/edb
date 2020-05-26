-----
title: D) Other Fluids
date: May 12th, 2020
description: Properties of other fluids.
hide_units: true
-----

## Properties of Other Fluids 

### Degrees A.P.I. vs. Specific Gravity for Oil          

The relation of Degrees A.P.I. to Specific Gravity (g) is expressed by the following formula:

=+=
<span class= equation-label >(2.5)</span>
$$ {Degrees\,A.P.I. = {141.5 \over g} - 131.5} $$
=+=

=+=
$$ {g = {141.5 \over {131.5 + Degrees\,A.P.I.}}} $$
=+=

The following tables are based on the weight of 1 gallon (U.S.) of oil with a volume of 231 cubic inches at 60°F in air at 760 mm pressure 
and 50% humidity. Assumed weight of 1 gallon of water at 60°F in air is 8.32828 pounds.

To determine the resulting specific gravity by mixing oils of different specific gravities:

=+=
<span class= equation-label >(2.6)</span>
$$ {D = {{md_{1} + nd_{2}} \over {m+n}}} $$
=+=

where:

- D = density or specific gravity of mixture
- m = proportion of oil of d<sub>1</sub> density
- n = proportion of oil of d<sub>2</sub> density
- d<sub>1</sub> = specific gravity of m oil
- d<sub>2</sub> = specific gravity of n oil


=|=
title: Degrees A.P.I. vs. Specific Gravity
data: IIB1-1.csv
=|=

=|=
data: IIB1-2.csv
=|=

### Temperature-Volume Relation for Oil

![](temp-vol-oil.png "")

### Specific Gravities vs. Degrees Baumé

*Calculated from the formula, specific gravity 60°/60° F = 140 / (130 + Deg. Bé)*

=|=
title: Spec. Gravities at 60°/60° F. Corresp. to Deg. Bé for Liquids Lighter than Water
data: IIB2-1.csv
=|=

*Calculated from the formula, specific gravity 60°/60° F = 145 / (145 - Deg. Bé)*

=|=
title: Spec. Gravities at 60°/60° F. Corresp. to Deg. Bé for Liquids Heavier than Water
data: IIB2-2.csv
=|=

### Brix Viscosities of Sucrose Solutions at Various Temperatures

**Degree Brix** is the measure of concentration of sugar in aqueous solution. Degree Brix is the percentage of sucrose by weight in aqueous solution. 
One-Degree Brix equals 1 gram of sugar into 100 grams of sugar solution. The Degree Brix can be represented in symbolic way as °Bx. This designation of
Degree Brix is only valid for pure sucrose solutions. If the solution contains dissolved solids other than pure sucrose, then the °Bx only approximates the
dissolved solid content.

Sucrose is common sugar. It is a disaccharide, a molecule composed of two monosaccharides: glucose and fructose. Sucrose is produced
naturally in plants, from which table sugar is refined. It has molecular formula C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>. For human consumption, sucrose is extracted from sugarcane or sugar beet. 

The measurement of sugar solution i.e. Degree Brix is required in many food processing industries including sugar production, fruit juice processing, soft drink production
and many other food processing areas where sweeteners are involved.


### Relation of Viscosity of Aqueous Sucrose Solution with Temperature and Degree Brix

The Degree Brix is a concentration of sucrose into aqueous solution. However, the relation between Degree Brix, temperature, specific gravity and viscosity is established [1]. Based on this circular, 
the graphs of viscosity in centipoise versus temperature and Degree Brix are established.  From the graphical representation. it is easier to understand the behavior of sucrose solution against temperature
and value of Degree Brix. The exact value of viscosity can be found by interpolating the adjacent graphs of Degree Brix with respect to temperature.

Viscosity is inversely proportional to temperature and directly proportional to Degree Brix. From the graph, it can be observed that as the temperature increases keeping Brix value constant, the 
corresponding viscosity value is decreasing. On other hand keeping temperature constant, the viscosity increases as Degree Brix increases.

### Measurement of Brix

One traditional method to measure the °Brix is by constant weight hydrometer. The constant weight hydrometer works on the law of buoyancy. The hydrometer is floated in a fluid and the density (specific gravity)
of the fluid is determined by the fluid level on the scale of the stem. A hydrometer measures the density of the solution to determine the °Brix.

**Coriolis Brix principle:** The Coriolis meter’s density measurement works on the principle that the period of oscillation of the flow tubes. Performing the same primary measurement as hydrometer, the Coriolis 
meter determines the °Brix as a function of the specific gravity of the solution. 

### Charts

-	The following charts represent the value of viscosity of sucrose solution in centipoise (cP) at various temperature for various Brix values.
-	[1] All the values are taken from National Bureau of Standards Circular 440 issued on July 31, 1958 United States Department of Commerce by considering viscosity of water at 20°C is 0.010020 poise.
-	On the X-axis temperature is plotted in °C whereas on Y-axis viscosity of sucrose in aqueous solution is plotted in centipoise (cP) and the graph is plotted for various degree Brix values ranging from 20° Brix to 75° Brix.
-	The below graphs represents the exponentially decreasing nature.
-	From the graph it can be seen that, viscosity is directly proportional to degrees of Brix value and it is inversely proportional to the temperature.

![](Brix1.png "")

![](Brix2.png "")

![](Brix3.png "")

![](Brix4.png "")

![](Brix5.png "")

![](Brix6.png "")

### Vapor Pressure of Liquid H<sub>2</sub> [2]

=|=
title: Data Points
data-us: VP-H2.csv
data-metric: VP-H2-met.csv
=|=

=/=
title: Liquid Hydrogen Vapor Pressure Plot 
data-us: VP-H2.csv
data-metric: VP-H2-met.csv
x: 1
series: 2
series_title_index: 0
=/=

### Vapor Pressure of Helium [3]

=|=
title: Data Points
data-us: VP-helium.csv
data-metric: VP-helium-met.csv
=|=

=/=
title: Helium Vapor Pressure Plot 
data-us: VP-helium.csv
data-metric: VP-helium-met.csv
x: 1
series: 2
series_title_index: 0
=/=

*(Based on water having 1.00 specific gravity at 68°F., corresponding to a weight of 62.344 lb./cu. ft., and 1 psi equalling 2.310 feet.)*

### References
1. J. F. Swindells, C. F. Snyder, R. C. Hardy, and P. E. Golden, Viscosities of Sucrose Solution at Various Temperatures National Bureau of Standards Circular 440, p. 3 (1958).
2. [Eric W. Lemmon, Mark O. McLinden and Daniel G. Friend, "Thermophysical Properties of Fluid Systems" in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, National Institute of Standards and Technology, Gaithersburg MD, 20899, https://doi.org/10.18434/T4D303, (retrieved July 31, 2019).](https://webbook.nist.gov/cgi/fluid.cgi?Action=Load&ID=C1333740&Type=SatP&Digits=5&THigh=59&TLow=26&TInc=1&RefState=DEF&TUnit=K&PUnit=MPa&DUnit=mol%2Fl&HUnit=kJ%2Fmol&WUnit=m%2Fs&VisUnit=uPa*s&STUnit=N%2Fm)
3. [Eric W. Lemmon, Mark O. McLinden and Daniel G. Friend, "Thermophysical Properties of Fluid Systems" in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, National Institute of Standards and Technology, Gaithersburg MD, 20899, https://doi.org/10.18434/T4D303, (retrieved July 31, 2019).](https://webbook.nist.gov/cgi/fluid.cgi?Action=Load&ID=C7440597&Type=SatP&Digits=5&THigh=9.2&TLow=4&TInc=.2&RefState=DEF&TUnit=K&PUnit=MPa&DUnit=mol%2Fl&HUnit=kJ%2Fmol&WUnit=m%2Fs&VisUnit=uPa*s&STUnit=N%2Fm)