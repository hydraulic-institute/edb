-----
title: Specific Speed
date:  June 18th, 2019
-----

# Specific Speed

Specific speed is an index of pump performance at the pump’s best efficiency point (BEP) rate of flow, with the maximum diameter impeller, and at a given rotative speed. Specific  speed is expressed by the following equation:

=+=
[units = us]
$$ Ns = { {n(Q)^{0.5} } \over {(H)^{0.75} } } $$
=+=

=+=
[units = metric]
$$ n_s = { {n(Q)^{0.5} } \over {(H)^{0.75} } } $$
=+=

wherein: 

- Ns = Specific Speed 
- n = Rotational speed, in revolutions per minute 
- Q = Total pump flow rate, in gallons per minute 
- H = Head per stage, in feet

- n<sub>s</sub> = Specific Speed 
- n = Rotational speed, in revolutions per minute 
- Q = Total pump flow rate, in cubic meters per second
- H = Head per stage, in meters

The user is cautioned to check carefully the basis of calculation of specific speed and suction specific speed before making comparisons because there are subtle but significant differences in methods used throughout industry and in related textbooks and literature.

When calculating specific speed using units of cubic meters per second for flow rate and meters for head per stage, 51.6 is the conversion factor for specific speed in US gallons per minute and feet (i.e., metric × 51.6 = US customary units.)

The usual symbol for specific speed  is:

=+=
[units = us]
$$ Ns $$
=+=

=+=
[units = metric]
$$ n_s $$
=+=

<units us = "When calculating the value for specific speed and suction specific speed, the unit of measurement used for rate of flow is defined in US gallons per minute (gpm)." 
metric= " When calculating the value for specific speed and suction specific speed, the unit of measurement used within this standard for rate of flow is cubic meters per second (m3/s).
An alternative method of calculating this value is to use (m3/h) as the unit of measurement for rate of flow, which then results in a value that is i.e., 60 times greater."/>

**Type Number** - Type number is a variation of specific speed. It is a dimensionless quantity calculated at the point
of best efficiency, which is defined by the following formula:

=+=
$$ K = {{2πnQ'^{0.5}} \over {(gH')^{0.75}}} = {{ωQ'^{0.5}} \over {(y')^{0.75}}} $$
=+=

where:

- Q’ = volume rate of flow per eye, in feet cubed per second
- H’ = head of first stage in feet
- n = rotative speed, in revolutions per minute
- g = gravitational acceleration, in feet per second squared
- ω = angular velocity, in radians per second
- y’ = specific energy, in British thermal unit per pound mass

- Q’ = volume rate of flow per eye, in meters cubed per second 
- H’ = head of first stage, in meters 
- n = rotative speed, in revolutions per minute
- g = gravitational acceleration, in meters per second squared 
- ω = angular velocity, in radians per second
- y’ = specific energy, in joule per kilogram 

# Suction Specific Speed

**Suction Specific Speed** - An index of pump suction operating characteristics. It is determined at the BEP rate of flow with the maximum diameter impeller. (Suction specific speed is an indicator of the net positive suction head required [NPSH3] for given values of capacity and also provides an assessment of a pump's susceptibility to internal recirculation.) Suction specific speed is expressed by the following equation:

=+=
[units = us]
$$ Nss = { {n(Q')^{0.5} } \over {(NPSH3)^{0.75} } } $$
=+=

=+=
[units = metric]
$$ S = { {n(Q')^{0.5} } \over {(NPSH3)^{0.75} } } $$
=+=


where:

- Nss = Suction Specific Speed
- n = Rotational speed, in revolutions per minute
- Q' = flow rate per impeller eye *OR* total flow rate for single suction impellers *OR* one half total flow rate for double suction impellers, in US gallons per minute
- NPSH3 = Net positive suctions head required in feet that will cause the total head (or first stage head of multistage pumps) to be reduced by 3%

- S = Suction Specific Speed
- n = Rotational speed, in revolutions per minute
- Q' = flow rate per impeller eye *OR* total flow rate for single suction impellers *OR* one half total flow rate for double suction impellers, in cubic meters per second
- NPSH3 = Net positive suctions head required in feet that will cause the total head (or first stage head of multistage pumps) to be reduced by 3%

Suction specific speed derived using cubic meters per second and meters, multiplied by a factor of 51.6, is equal to suction specific speed derived using US gallons per minute and feet. The US customary symbol N<sub>SS</sub> is sometimes used to designate suction specific speed.

The user is cautioned to check carefully the basis of calculation of specific speed and suction specific speed before making any comparisons because there are subtle but significant differences in methods used throughout industry and in related textbooks and literature.

# Affinity Rules

*This section will include examples, animations, and a calculator*

Affinity rules are used in turbomachinery to approximately calculate a centrifugal pump’s influence on capacity, head, and power consumption with changing speed or impeller diameter.  