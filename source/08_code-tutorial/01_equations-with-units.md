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