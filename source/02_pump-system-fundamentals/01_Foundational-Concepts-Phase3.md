-----
title: A) Foundational Concepts
tabtitle: Pump System Foundational Concepts | HI Data Tool 
date: August 31, 2026
description: Describes head and pressure related to liquid pumping systems, why head is used for centrifugal pumps, how fluid properties affect pressure and head and the equations for how head and pressure relate, velocity head, velocity or dynamic pressure and frictional head losses from minor losses in fittings and valves and major losses in pipe. 
-----
# Foundational Pump System Concepts
There are several foundational concepts that one needs to understand when working with pumps. These include: 
- The relationship between head and pressure in a pump system. 
- Why head is used when discussing rotodynamic pump systems and why positive displacement pumps may use pressure.
- What is meant by "Total" head or pressure and the static and dynamic components that represent the total head or pressure.
- How properties of the fluid will affect pressure and head.
- How fluid velocity will affect pressure and head.
- What causes head or pressure losses in a pump system.


**Note**: All concepts and equations on this page apply to incompressible fluid flow.
=atag=
Pressure and Head
=atag=
### What are Pressure and Head?

Head (h) expresses the energy per unit weight relative to a reference condition and is expressed in <units us = "feet (ft)" metric = "meters (m)"/> of the liquid being pumped relative to a defined datum elevation.

Pressure (p) is the force acting on a given area typically expressed in <units us = "pounds per square inch (psi)" metric = "pascals (Pa)"/>. It is energy density or energy per unit volume in the liquid.

### Why is Head used in Pump Systems?
Positive displacement pumps commonly use pressure to describe their performance. However, for rotodynamic pumps, developed head and piping-system frictional head losses are independent of liquid density making head the more convenient basis for pump-system calculations. If pressure were to be used, the representative performance would vary with liquid density per [Eq. 1.A.1a](#eq1a1a) and [Eq. 1.A.1b](#eq1a1b). Head may not be intuitive at first, but it is the most useful way of calculating and expressing the energy contained in pump piping systems, which enables the performance of the pump and the energy requirements of the system to be expressed independently of liquid density for incompressible flow. 

### How are Head and Pressure Related?
Pressure and head are directly related in pump systems. Head is energy per unit weight and pressure is energy per unit volume, which relates them directly when the liquid density is considered. Pressure is a common measurement in pump systems and is often used to calculate head. Assuming static conditions (no flow or velocity), the column height of liquid or elevation head (Z) produces pressure at a given point in the system based on the liquid’s density or specific gravity, which is shown [Fig. 1.A.1](#fig1a1) per [Eq. 1.A.1a](#eq1a1a) and [Eq. 1.A.1b](#eq1a1b).

<center>

![](./images/PF-01-FC-01-Illustration-of-static-pressure-and-pressure-head.png "") 

</center>

<div class="figure-label"><a id="fig1a1"></a>Fig. 1.A.1 Illustration of static pressure gauge reading and pressure head relationship with respect to elevation head (Z) with specific gravity of 1.0</div>

=atag=
Pressure and Head Equations
=atag=

<div class="equation-label"><a id="eq1a1a"></a>Eq. 1.A.1a </div>

=+=

[units us]
$$ h = {32.2 \over 1}·{144 \over 1}·{p_{g} \over {ρ·g}}$$

=+=

=+=

[units metric]
$$ h = {{p_{g}} \over ρ·g} $$

=+=

<div class="equation-label"><a id="eq1a1b"></a>Eq. 1.A.1b </div>

=+=

[units us]
$$ p_{g} = {{ρ·g·h}·{1 \over 32.2}}·{1 \over 144}  $$

=+=

=+=

[units metric]
$$ p_{g} = {ρ·g·h} $$

=+=

Where:
<!-- Had to do it this way because we had 2 us-only bullets -->
<ul>
<li>Z is elevation head (height of the liquid column) <units us = "(ft)" metric = "(m)"/></li>
<li>p<sub>g</sub> is static pressure gauge reading <units us="(psi)" metric="(Pa)"/></li>
<li>h is pressure head <units us="(ft)" metric="(m)"/></li>
<li>ρ is density of the liquid <units us="(lbm/ft^3)" metric="(kg/m^3)"/></li>
<li>g is acceleration due to gravity <units us="(ft/s^2)" metric="(m/s^2)"/></li>
<li v-if='unit_set=="us"'>144 is to convert between square inches (in<sup>2</sup>) and square feet (ft<sup>2</sup>)</li>
<li v-if='unit_set=="us"'>32.2 is to convert mass to force</li>
</ul>

It is also common to express the pressure and head relationship using specific gravity (s), which is the relative density of the liquid to water at standard conditions. Specific gravity is defined by [Eq. 1.A.2](#eq1a2), and values of specific gravity for water and other liquids can be found in the fluid properties section [Link].
<div class="equation-label"><a id="eq1a2"></a>Eq. 1.A.2 </div>

=+=
$$ s = {ρ_{L} \over ρ_{w}} $$
=+=

where:

- s is specific gravity
- ρ<sub>L</sub> is density of the liquid
- ρ<sub>w</sub> is density of water at standard conditions

Using specific gravity and a unit-conversion constant, head can be calculated from pressure as outlined in [Eq. 1.A.3](#eq1a3).

<div class="equation-label"><a id="eq1a3"></a>Eq. 1.A.3 </div>

=+=
$$ h = {{C_{units}·p} \over s} $$
=+=

Where:

- h<sub>g</sub> is pressure head <units us = "ft" metric = "m"/>
- p<sub>g</sub> is static pressure gauge reading <units us = "psi" metric = "Pa"/>
- s is specific gravity (dimensionless)
- C<sub>units</sub> is the unit-conversion factor to achieve head units <units us = "2.31" metric = "1.02×10^-4"/>

=atag=
Total Head and Pressure
=atag=

### What is Total Head and Total pressure?
The total energy at a specific location or point in the system includes both potential (static) and kinetic (dynamic or velocity) energy and the terms total head or total pressure are used. As described in the Bernoulli equation in the System Curve section [Link], in pumping systems there is a need to understand the total energy at a specific location or the total differential that the pump is required to develop. Total head and total pressure at a location in the pump system include energy due to liquid elevation (Z), static pressure (p<sub>g</sub>), and velocity. They represent the energy at that location if the flow were brought to a stop (to zero velocity) without any energy losses. Total head (h<sub>t</sub>, [Eq. 1.A.6](#eq1a6)) at a specific location in the system includes both static head (h<sub>stat</sub>, [Eq. 1.A.4](#eq1a4)) and dynamic head, which is referred to as velocity head (h<sub>v</sub>, [Eq. 1.A.5](#eq1a5)). Total pressure (p<sub>t</sub> also known as stagnation pressure, [Eq. 1.A.8](#eq1a8)) at a specific location in the system is the same concept as total head but in units of pressure, including both static pressure (p<sub>g</sub>) and velocity pressure (p<sub>v</sub>) as known as dynamic pressure, [Eq. 1.A.7](#eq1a7).

<div class="equation-label"><a id="eq1a4"></a>Eq. 1.A.4 </div>

=+=

$$ h_{stat}=Z+h_{g} $$

=+=

<div class="equation-label"><a id="eq1a5"></a>Eq. 1.A.5 </div>

=+=

$$ h_{v} = {v^2 \over {2·g}} $$

=+=

<div class="equation-label"><a id="eq1a6"></a>Eq. 1.A.6 </div>

=+=

$$ h_{t}= h_{stat}+ h_{v} $$

=+=

<div class="equation-label"><a id="eq1a7"></a>Eq. 1.A.7 </div>

=+=

[units us]
$$ p_{v} = {1 \over 144} · {1 \over 32.2} · {1 \over {2}} · ρ ·v^2 $$

=+=

=+=

[units metric]
$$ p_{v} = {1 \over {2}} · ρ · v^2 $$

=+=

<div class="equation-label"><a id="eq1a8"></a>Eq. 1.A.8 </div>

=+=

$$ p_{t}= p_{v}+ p_{g} $$

=+=
Where:
<!-- Had to do it this way because we had 2 us-only bullets -->
<ul>
<li>h<sub>t</sub> is total head at a specific location <units us = "(ft)" metric = "(m)"/></li>
<li>h<sub>stat</sub> is static head <units us = "(ft)" metric = "(m)"/></li>
<li>h<sub>v</sub> is velocity head <units us = "(ft)" metric = "(m)"/></li>
<li>Z is elevation head (height of the liquid column) <units us = "(ft)" metric = "(m)"/></li>
<li>h<sub>g</sub> is pressure head <units us = "(ft)" metric = "(m)"/></li>
<li>p<sub>t</sub> is total or stagnation pressure <units us = "(psi)" metric = "(Pa)"/></li>
<li>p<sub>g</sub> is static pressure <units us = "(psi)" metric = "(Pa)"/></li>
<li>p<sub>v</sub> is velocity pressure <units us = "(psi)" metric = "(Pa)"/></li>
<li>v is velocity <units us = "(ft/s)" metric = "(m/s)"/></li>
<li>g is acceleration due to gravity <units us = "(ft/s^2)" metric = "(m/s^2)"/></li>
<li>ρ is density <units us = "(lbm/ft^3)" metric = "(kg/m^3)"/></li>
<li v-if='unit_set=="us"'>144 is to convert between square inches (in<sup>2</sup>) and square feet (ft<sup>2</sup>)</li>
<li v-if='unit_set=="us"'>32.2 is to convert mass to force</li>
</ul>

=atag=
Pump Total Head
=atag=

### What is Pump Total Head?

The discussion in the preceding section that explains total head and pressure a locations in a pump system, can be used to understand pump total head (H) or total differential pressure  (&#x0394;p<sub>t</sub>) requirements. The pump total head is the head required by the system and for the pump to develop at a given flow rate. When considering the total head at two locations upstream and downstream of the pump, the pump total head can be determined when viscous head losses (h<sub>f</sub>) to the pump flanges are considered and a common elevation datum is set. As such, Pump total head may be defined as the energy (work) increase per unit weight of the liquid imparted by the pump, and is the difference between total discharge head (h<sub>d</sub>) and total suction head (h<sub>s</sub>). The total suction head and total discharge head are referenced to the pump suction and discharge flanges, respectively, and a common elevation datum. 

=atag=
Head losses
=atag=

### What are Major and Minor Losses in Pipe Systems?
Viscous head losses are the losses in energy, expressed as head, caused by fluid friction as liquid flows through a piping system. These losses are split into major losses and minor losses. Major losses represent pipe friction, and minor losses represent losses in fittings, such as elbows, tees, reducers, expansions, valves, entrances and exits. These are referred to as head losses or frictional head losses (h<sub>f</sub>) and are described in detail in the fluid flow section [Link] and the system curve section.





