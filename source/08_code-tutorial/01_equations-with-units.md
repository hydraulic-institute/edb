-----
title:   Unit switching equations
date:  June 14th, 2019
author:  Scott Frees
-----



# Unit Switching

Equations specific for US units of measure should have a `[units = us]` line directly above the `$$` LaTex equation.
See the underlying source code...

Equations specific for Metric units of measure should have a `[units = metric]` line directly above the `$$` LaTex equation.
This is case sensitive, and should be written exactly as specified.

Switch units to see this in action.

=+= 
[units = us]
$$ velo = { y_{ft} \over z_{sec} }$$
=+= 

=+= 
[units = metric]
$$ velo = { y_{meters} \over z_{sec} }$$
=+= 

Units are optional, leave out the `[units=something]` entirely to allow the equation to be shown for all units.

=+= 
$$ velo = { y_{distance} \over z_{time} }$$
=+= 

# Unit Element with Subscripts and Superscripts
When using the `<units>` element, you **cannot** embed `<sup>` and `<sub>`.  Surround the text with `^` or `_` symbols instead, and the app will render using the appropriate element.

<units us="ft^3^/min" metric="m_3_/min"/>

# Units in lists
Bullet and numbered lists support units of measure as well.

- The unit for distance is <units us="ft" metric="meters"/>.
- The unit for weight is <units us='lbs' metric="kg"/>

Numbered lists work well too:

1. Small distances are in <units us="inches" metric="cm"/>
2. Long distances are in <units us="miles" metric="km"/>