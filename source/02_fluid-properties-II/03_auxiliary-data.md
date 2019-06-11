-----
title:   Auxiliary Data
author: Scott Frees
date:  May 30th, 2019
-----

# Saturation Properties for Water Auxiliary Data

## Reference States, default for fluid

**Enthalpy**
H = <units us = "19771.296093 Btu/lb-mole at 80.3 F and 0.15 psia" metric="2551.013479 kJ/kg at 26.9 C and 0.010 bar."/>

**Entropy**
S = <units us = "39.198189 Btu/lb-mole*R at 80.3 F and 0.15 psia." metric = "9.103679 J/g*K at 26.9 C and 0.010 bar.">


=|=
title: Additional Fluid Properties
data-us: auxiliary-us.csv
data-metric: auxiliary-metric.csv
=|=


## Equation of States
The uncertainty in density of the equation of state is 0.0001% at 1 atm in the liquid phase, and 0.001% at other liquid states at pressures up to 10 MPa and temperatures to 423 K. In the vapor phase, the uncertainty is 0.05% or less. The uncertainties rise at higher temperatures and/or pressures, but are generally less than 0.1% in density except at extreme conditions. 

The uncertainty in pressure in the critical region is 0.1%. 

The uncertainty of the speed of sound is 0.15% in the vapor and 0.1% or less in the liquid, and increases near the critical region and at high temperatures and pressures. 

The uncertainty in isobaric heat capacity is 0.2% in the vapor and 0.1% in the liquid, with increasing values in the critical region and at high pressures. 

The uncertainties of saturation conditions are 0.025% in vapor pressure, 0.0025% in saturated liquid density, and 0.1% in saturated vapor density. The uncertainties in the saturated densities increase substantially as the critical region is approached. 


# Source
[Eric W. Lemmon, Mark O. McLinden and Daniel G. Friend, "Thermophysical Properties of Fluid Systems" in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, National Institute of Standards and Technology, Gaithersburg MD, 20899, https://doi.org/10.18434/T4D303, (retrieved February 19, 2019).](https://webbook.nist.gov/cgi/fluid.cgi?Action=Load&ID=C7732185&Type=SatP&Digits=5&THigh=705.1&TLow=32&TInc=20&RefState=DEF&TUnit=F&PUnit=psia&DUnit=lbm%2Fft3&HUnit=Btu%2Flb-mole&WUnit=ft%2Fs&VisUnit=cP&STUnit=lb%2Fin)