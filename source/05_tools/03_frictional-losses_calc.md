-----
title: Frictional Loss Calculator
date: May 6th, 2020
description: Frictional loss calculator for piping constructed of various materials.
-----
## Calculator: Frictional Losses in Pipes
Instructions: To use this calculator, select the material and complete the subsequent drop down menus.  Further instructions and details are found below the Calculator.

<friction-loss-calculator/>

Frictional Resistance for incompressible viscous liquids, including water, in a pipe is computed as a loss in head.  The method outlined in <a href="/fluid-flow-III/general.html" target="blank">(See Section IIIA)</a>  describes the fundamental formulas and methodology for calculating pipe friction.

This Frictional Loss Calculator utilizes this methodology by generating a table with the following parameters:

-	Flowrate:  At, above, and below the users input flow
-	Fluid Velocity: The average fluid velocity inside the pipe
-	Velocity Head: Based on V<sup>2</sup>/2g
-	Reynolds Number
-	Flow Regime: Laminar or Turbulent
-	Friction Factor
-	Head loss

The calculator is suitable for for any fluid in a circular pipe of the same diameter as specified. Many materials and sizes are available for both piping and tubing selections with nominal internal diameters.  Friction loss (h<sub>f</sub>) is calculated based on pipes having a specific ε (absolute roughness) based on their material and manufacturing method in conjunction with the specified length of pipe. 
Additionally, ε/D (relative roughness) is also provided where (ε) is a linear measure of the absolute roughness of the pipe walls and (D) is the internal diameter of the pipe. Other fluid details such as the dynamic viscosity (cP) with the corresponding fluid specific gravity or the kinematic viscosity (cSt) alone are required to complete calculations <a href="/fluid-flow-III/general.html" target="blank">(See Section IIIA).</a> 

Further information on viscosity and commonly accepted viscosity values for liquids can be found in <a href="/fluid-properties-II/viscosity.html" target="blank"> Section IIC.</a> No Allowance has been made for abnormal conditions of interior surface due to manufacturing or installation defects, nor for deterioration or fouling.

Typical US or Metric units are both supported by choosing the user preference in banner on the upper right end of the webpage.

<!--=^=
title: Rotodynamic Pumps: Guideline for NPSH Margin - 1 Part Webinar
description: The Hydraulic Institute’s Net Positive Suction Head (NPSH) Margin committee has developed this in depth webinar, based on the American National Standard ANSI/HI 9.6.1 Rotodynamic Pumps – Guideline for NPSH Margin, to teach attendees how to calculate the available NPSH to the pump, what the pump requires, and important terminology
image: https://estore.pumps.org/GetImage.ashx?&maintainAspectRatio=true&maxHeight=300&maxWidth=300&Path=%7e%2fAssets%2fProductImages%2fRotodynamic_Pumps_Guidelines_for_NPSH_Margin.png
url: https://estore.pumps.org/Rotodynamic-Pumps-Guidelines-for-NPSH-Margin-1-Part-On-Demand-Webinar-P3105.aspx
price: 59.00
hide_price: true
=^=-->

