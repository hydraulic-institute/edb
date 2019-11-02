-----
title: A) Water
date:  July 9th, 2019
description: Properties of water (liquid and vapor); saturation properties, density, specific gravity, specific volume, enthalpy, entropy, and viscosity.
-----

## Water Properties 

=|=
title: Water Properties at Various Temperatures
data-us: water-properties-us.csv
data-metric: water-properties-metric.csv
=|=


=/=
title: Specific Gravity vs. Temperature for Water
data-us: water-properties-other.csv
data-metric: water-properties-orig.csv
x: 2
series: 5
series_title_index: 0
=/=




## Water Saturation Properties 



=|=
title: Sat. Properties for Water (Liquid)
data-us: liquid-water-us.csv
data-metric: liquid-water-metric.csv
=|=

=|=
title: Sat. Properties for Water (Vapor)
data-us: vapor-water-us.csv
data-metric: vapor-water-metric.csv
=|=

=/=
title: Water Vapor Saturation Curve  
data-us: vapor-water-us.csv
data-metric: vapor-water-metric.csv
x: 1
series: 2
series_title_index: 0
=/=

## Auxiliary Data

### Reference States, Default for Fluid

**Enthalpy**
H = <units us = "19771.296 Btu/lb-mole at 80.3 °F and 0.15 psia" metric="2551.014 kJ/kg at 26.9 °C and 0.010 bar"></units>

**Entropy**
S = <units us = "39.198 Btu/lb-mole*R at 80.3 °F and 0.15 psia" metric = "9.104 J/g*K at 26.9 °C and 0.010 bar"></units>


=|=
title: Additional Fluid Properties
data-us: auxiliary-us.csv
data-metric: auxiliary-metric.csv
=|=


### Equation of State
The uncertainty in density of the equation of state is 0.0001% at 1 atm in the liquid phase, 
and 0.001% at other liquid states at pressures up to <units us = "1450 psi and temperatures to 761.4 R. 
In the vapor phase, the uncertainty is 0.05% or less. The uncertainties rise at higher temperatures and/or pressures, but 
are generally less than 0.1% in density except at extreme conditions."
metric = "10 MPa  and temperatures to 423 K. In the vapor phase, the uncertainty is 0.05% or less. The uncertainties rise at higher temperatures and/or pressures, but are generally less than 0.1% in density except at extreme conditions."/>

The uncertainty in pressure in the critical region is 0.1%. 

The uncertainty of the speed of sound is 0.15% in the vapor and 0.1% or less in the liquid, and increases near the critical region and at high temperatures and pressures. 

The uncertainty in isobaric heat capacity is 0.2% in the vapor and 0.1% in the liquid, with increasing values in the critical region and at high pressures. 

The uncertainties of saturation conditions are 0.025% in vapor pressure, 0.0025% in saturated liquid density, and 0.1% in saturated vapor density. The uncertainties in the saturated densities increase substantially as the critical region is approached. 

## Source
[Eric W. Lemmon, Mark O. McLinden and Daniel G. Friend, "Thermophysical Properties of Fluid Systems" in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, National Institute of Standards and Technology, Gaithersburg MD, 20899, https://doi.org/10.18434/T4D303, (retrieved February 19, 2019).](https://webbook.nist.gov/cgi/fluid.cgi?Action=Load&ID=C7732185&Type=SatP&Digits=5&THigh=705.1&TLow=32&TInc=20&RefState=DEF&TUnit=F&PUnit=psia&DUnit=lbm%2Fft3&HUnit=Btu%2Flb-mole&WUnit=ft%2Fs&VisUnit=cP&STUnit=lb%2Fin)
