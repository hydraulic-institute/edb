-----
title: A) Water
date: April 19th, 2024
description: Properties of water (liquid and vapor); saturation properties, density, specific gravity, specific volume, enthalpy, entropy, and viscosity.
-----

## Water Properties 

**Specific gravity**, also referred to as **relative density**, is the ratio of the densities of one fluid at a known temperature and pressure to a reference fluid at a specific
temperature and pressure. In most cases, the reference fluid is water at atmospheric pressure. The most common reference temperatures in the standards and literature are
<units us = "39.2 °F" metric = "4 °C at which water is the most dense, 60 °F, and 68 °F. Generally, scientific research and common fluids use 39.2 °F while engineering
and petroleum applications use 60 °F." metric = "4 °C at which water is the most dense, 15.56 °C, and 20 °C. Generally, scientific research and common fluids use 4 °C  while engineering
and petroleum applications use 15.56 °C."/>

The values for specific gravity of water based on these common reference temperatures are listed in the table below. 

=|=
title: Water Properties at Various Temperatures
data-us: SpecificGravity-US.csv
data-metric: SpecificGravity-Metric.csv
fixed-columns: 1
=|=
<div class="table-label">Tbl. 2.A.1</div>


=/=
title: Specific Gravity vs. Temperature for Water
data-us: SpecificGravity-US.csv
data-metric: SpecificGravity-Metric.csv
fixed-columns: 1
x: 1
series: 6
series_title_index: 0
=/=




## Water Saturation Properties 



=|=
title: Sat. Properties for Water (Liquid)
data-us: liquid-water-US.csv
data-metric: liquid-water-metric.csv
fixed-columns: 1
=|=
<div class="table-label">Tbl. 2.A.2</div>

=|=
title: Sat. Properties for Water (Vapor)
data-us: vapor-water-US.csv
data-metric: vapor-water-metric.csv
fixed-columns: 1
=|=
<div class="table-label">Tbl. 2.A.3</div>

=/=
title: Water Vapor Saturation Curve  
data-us: vapor-water-US.csv
data-metric: vapor-water-metric.csv
fixed-columns: 1
x: 1
series: 2
series_title_index: 0
=/=

=^=
title: Pump and System Fundamentals Live Course
description: Educate and train pump engineers, technical sales, pump system owners, designers, and operators on the fundamentals of pump and system design, including system hydraulics and calculations, pump and system curves, system components, factors affecting reliably and energy consumption, and control. 
image: https://a200661cdda2de08c184-8a545ee6d682984872a72f5ce2cc68be.ssl.cf2.rackcdn.com/hi_6ce03fc70274b2d8f6015f6a52b4f7ae.png
url: https://training.pumps.org/pump-and-system-fundamentals-course 
price: 700.00
hide_price: true
=^=

## Auxiliary Data

### Reference States, Default for Fluid

**Enthalpy**

H = <units us = "19771.296 Btu/lb-mole at 80.3 °F and 0.15 psia" metric="2551.014 kJ/kg at 26.9 °C and 0.010 bar"/>

**Entropy**

S = <units us = "39.198 Btu/lb-mole·R at 80.3 °F and 0.15 psia" metric = "9.104 J/g·K at 26.9 °C and 0.010 bar"/>


=|=
title: Additional Water Properties
data-us: auxiliary-us.csv
data-metric: auxiliary-metric.csv
scrolling: false
=|=
<div class="table-label">Tbl. 2.A.4</div>


### Equation of State
The uncertainty in density of the equation of state is 0.0001% at 1 atm in the liquid phase, 
and 0.001% at other liquid states at pressures up to <units us = "1450 psi and temperatures to 761.4 R." metric = "10 MPa  and temperatures to 423 K."></units> In the vapor phase, the uncertainty is 0.05% or less. The uncertainties rise at higher temperatures and/or pressures but are generally less than 0.1% in density except at extreme conditions.

The uncertainty in pressure in the critical region is 0.1%. 

The uncertainty of the speed of sound is 0.15% in the vapor and 0.1% or less in the liquid and increases near the critical region and at high temperatures and pressures. 

The uncertainty in isobaric heat capacity is 0.2% in the vapor and 0.1% in the liquid, with increasing values in the critical region and at high pressures. 

The uncertainties of saturation conditions are 0.025% in vapor pressure, 0.0025% in saturated liquid density, and 0.1% in saturated vapor density. The uncertainties in the saturated densities increase substantially as the critical region is approached. 

### Reference for Data
[Eric W. Lemmon, Mark O. McLinden and Daniel G. Friend, "Thermophysical Properties of Fluid Systems" in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, National Institute of Standards and Technology, Gaithersburg MD, 20899, https://doi.org/10.18434/T4D303, (retrieved February 19, 2019).](https://webbook.nist.gov/cgi/fluid.cgi?Action=Load&ID=C7732185&Type=SatP&Digits=5&THigh=705.1&TLow=32&TInc=20&RefState=DEF&TUnit=F&PUnit=psia&DUnit=lbm%2Fft3&HUnit=Btu%2Flb-mole&WUnit=ft%2Fs&VisUnit=cP&STUnit=lb%2Fin)

