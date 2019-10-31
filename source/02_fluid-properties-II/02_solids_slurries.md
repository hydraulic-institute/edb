-----
title: B) Solids and Slurries
date:  October 31st, 2019
description: Properties of solid mixtures and slurries. Determining specific gravity of mixture or slurry.
-----

## Solids and Slurries 

### Useful Formulas

a. The formula for specific gravity of a solids-liquids
mixture or slurry, S<sub>m</sub> is:

=+=
$$ S_{m} = {{S_{s} * S_{1}} \over {S_{s} + C_{w}(S_{1} - S{s})}} $$
=+=

Where:

- S<sub>m</sub> = specific gravity of mixture or slurry
- S<sub>1</sub> = specific gravity of liquid phase
- S<sub>s</sub> = specific gravity of solids phase
- C<sub>w</sub> = concentration of solids by weight
- C<sub>v</sub> = concentration of solids by volume

**Example:** If the liquid has a specific gravity of 1.2
and the concentration of solids by weight is 35% with
the solids having a specific gravity of 2.2 then:

=+=
$$ S_{m} = {{2.2 * 1.2} \over {2.2 + .35(1.2 - 2.2)}} = 1.43 $$
=+=

b. Basic relationships among concentration and
specific gravities of solid liquid mixtures are shown
below.

![](CSG.png "")

Where pumps are to be applied to mixtues which are both corrosive and abrasive, the predominant factor causing wear should be identified and the materials of construction selected accordingly. 
This often results in a compromise and in many cases can only be decided as a result of test or operational experience.
<a href="https://estore.pumps.org/Standards/Rotodynamic/Slurry.aspx" target="_blank">ANSI/HI 12.1-12.6 – Rotodynamic Centrifugal Slurry Pumps</a> contains more information regarding the operation 
and applications of slurry pumps.

For any slurry pump application a complete description
of the mixture components is required in order to select 
the correct type of pump and materials of construction.

=+=
$$ C_{w} = {weight\, of\, dry\, solids \over { weight\, of\, dry\, solids\, + weight\, of\, liquid\, phase }} $$
=+=

=+=
$$ C_{v} = {volume\, of\, dry\, solids \over { volume\, of\, dry\, solids\, + volume\, of\, liquid\, phase }} $$
=+=

A nomograph for the relationship of concentration
to specific gravity of dry solids in water is shown in
Figure IIB-5.

c. Slurry flow requirements can be determined from
the expression:

=+=
[units = us]
$$ Q_{m} = {{4 * dry\, solids\, (in\, tons\, per\, hour)} \over {C_{w} * S_{m}}} $$
=+=

=+=
[units = metric]
$$ Q_{m} = {{0.9085 * dry\, solids\, (in\, tons\, per\, hour)} \over {C_{w} * S_{m}}} $$
=+=

Where:

- Q<sub>m</sub> = slurry flow <units us = "(gallons per minute)" metric = "(m^3^/h)"/>
- 1 ton = 2000 lbs

Example: If 2,400 tons of dry solids is processed in 24
hours in water with a specific gravity of 1.0 and the
concentration of solids by weight is 30% with the
solids having a specific gravity of 2.7 then:

=+=
$$ S_{m} = {{2.7 * 1.0} \over {2.7 + .3(1 - 2.7)}} = 1.23 $$
=+=

=+=
[units = us]
$$ Q_{m} = {{4 * 100} \over {.3 * 1.23}} = 1,084\,GPM $$
=+=

=+=
[units = metric]
$$ Q_{m} = {{.9085 * 100} \over {.3 * 1.23}} = 246\,m^{3}/h $$
=+=

d. Abrasive wear:

Wear increases rapidly when the particle hardness
exceeds that of the metal surfaces being abraded.
Always select metals with a higher relative hardness
to that of the particle hardness. There is little to be
gained by increasing the hardness of the metal
unless it can be made to exceed that of the particles.
The effective abrasion resistance of any metal will
depend on its position on the mohs or knoop
hardness scale. The relationships of various common
ore minerals and metals is shown in Figure IIB-4.

Wear increases rapidly when the particle size increases.
The life of the pump parts can be extended
by choosing the correct materials of construction.

Sharp angular particles cause about twice the wear
of rounded particles.

Austinetic maganese steel is used when pumping
large dense solids where the impact is high.

Hard irons are used to resist erosion and to a lesser
extent impact wear.

Elastomeric materials are used when pumping concentrations
of fine material but total head is usually
restricted to about <units us = "100 ft. per stage." metric = "30 m per stage."/>

Castable ceramic materials have excellent resistance
to cutting erosion but impeller tip velocities
are usually restricted to <units us = "100 ft/s." metric = "30 m/s."/> 

Classification of pumps according to particle size is
shown in Figure IIB-6.

## Approximate Comparison of Hardness Values of Common Ores and Minerals

![](IIB-4.png "")

## Nomograph of the Relationship of Concentration to Specific Gravity in Aqueous Slurries

![](IIB-5.png "")

## Classification of Pumps According to Solid Size

![](IIB-6-new.jpg "")

## Vapor Pressure of Liquid H<sub>2</sub>

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

## Vapor Pressure of Helium

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

## Sources

**H<sub>2</sub>**

[Eric W. Lemmon, Mark O. McLinden and Daniel G. Friend, "Thermophysical Properties of Fluid Systems" in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, National Institute of Standards and Technology, Gaithersburg MD, 20899, https://doi.org/10.18434/T4D303, (retrieved July 31, 2019).](https://webbook.nist.gov/cgi/fluid.cgi?Action=Load&ID=C1333740&Type=SatP&Digits=5&THigh=59&TLow=26&TInc=1&RefState=DEF&TUnit=K&PUnit=MPa&DUnit=mol%2Fl&HUnit=kJ%2Fmol&WUnit=m%2Fs&VisUnit=uPa*s&STUnit=N%2Fm)

**Helium**

[Eric W. Lemmon, Mark O. McLinden and Daniel G. Friend, "Thermophysical Properties of Fluid Systems" in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, National Institute of Standards and Technology, Gaithersburg MD, 20899, https://doi.org/10.18434/T4D303, (retrieved July 31, 2019).](https://webbook.nist.gov/cgi/fluid.cgi?Action=Load&ID=C7440597&Type=SatP&Digits=5&THigh=9.2&TLow=4&TInc=.2&RefState=DEF&TUnit=K&PUnit=MPa&DUnit=mol%2Fl&HUnit=kJ%2Fmol&WUnit=m%2Fs&VisUnit=uPa*s&STUnit=N%2Fm)