-----
title:  E) Losses With Paper Stock
date: June 28th, 2019
description: Frictional losses of paper stock, pulp suspensions. Different consistencies.
-----

## Losses With Paper Stock

### I. Introduction

In any stock piping system, the pump provides flow
and develops hydraulic pressure (head) to overcome
the differential in head between two points. This
total head consists of pressure head,
static head, velocity head and total frictional head
produced by friction between the pulp suspension
and the pipe, bends, and fittings. The total frictional
head is the most difficult to determine because of the
complex, non-linear nature of the frictional loss curve.
This curve can be affected by many factors.

The following analytical method for determining
pipe frictional losses is based on the recently published
TAPPI Technical Information Sheet (TIS) 408-4 [1], 
and is applicable to stock consistencies
(oven-dried) from 2 to 6 percent. Normally,
stock consistencies of less than 2% (oven-dried)
are considered to have the same frictional losses
characteristic as water. This paper only applies to
systems using centrifugal pumps which is normal
for these consistencies. The method for determining
the frictional losses of pulp suspensions in pipe, as presented
here, is intended to supersede the various
methods previously issued.

### II. Background

Figure 1 and Figure 2 show typical frictional loss curves for two different 
consistencies (C<sub>2</sub> > C<sub>1</sub>) of chemical pulp and mechanical
pulp, respectively.

![](./images/fig1_2.png "")
<div class="figure-label">(Fig. 3.E.1)</div>

The frictional loss curve for chemical pulp can be conveniently divided
into three regions, as illustrated by the shaded areas of Figure 3.

![](./images/fig3_4.png "")
<div class="figure-label">(Fig. 3.E.2)</div>

Regions shown in Fig. 3 may be described as follows:

**Region 1**:
(Curve AB) is a linear region where frictional
loss for a given pulp is a function of
consistency, velocity, and pipe diameter.
The velocity at the upper limit of this
linear region (Point B) is designated
v<sub>max</sub>.

**Region 2**:
(Curve BCD) shows an initial decrease
in frictional losses (to Point C) after which
the frictional losses again increases. The
intersection of the pulp frictional loss
curve and the water frictional loss curve
(Point D) is termed the onset of drag
reduction. The velocity at this point is
designated v<sub>w</sub>.

**Region 3**:
(Curve DE) shows the frictional loss curve
for pulp fiber suspensions below the
water curve. This is due to a phenomenon
called drag reduction. [2]
describes the mechanisms which occur
in this region.

Regions 2 and 3 are separated by the frictional loss
curve for water, which is a straight line with a slope
approximately equal to 2.

The frictional loss curve for mechanical pulp, as illustrated
in Figure 4, is divided into only two regions:
Regions 1 and 3. For this pulp type, the frictional loss
curve crosses the water curve v<sub>w</sub> and there is no true
v<sub>max</sub>·

### III. Design Parameters

To determine the pipe frictional loss component for a specified design basis (usually daily mass flow rate),
the following parameters must be defined:

a) **Pulp Type** — Chemical or mechanical
pulp, long or short fibered, never
dried or dried and reslurried, etc.
This is required to choose the proper
coefficients which define the pulp
friction curve.

b) **Consistency, C (oven-dried)** — Often
a design constraint in an existing
system. NOTE: If air-dried consistency
is known, multiply by 0.9 to
convert to oven-dried consistency.

c) **Internal pipe diameter, D** — Lowering
D reduces initial capital investment,
but increases pump operating costs.
Once the pipe diameter is selected, it
fixes the velocity for a prespecified
mass flow rate.

d) **Bulk velocity, v** — Usually based on
a prespecified daily mass flow rate.
Note that both v and D are interdependent
for a constant mass flow
rate.

e) **Stock temperature, T** — Required to
adjust for the effect of changes in
viscosity of water (the suspending
medium) on pipe frictional losses.

f) **Freeness** — Used to indicate the
degree of refining or to define the
pulp for comparison purposes.

g) **Pipe material** — Important to specify
design correlations and compare design
values.

### IV. Pipe Friction Estimation Procedure

The bulk velocity (v) will depend on the daily mass
flow rate and the pipe diameter (D) selected. The
final value of v can be optimized to give the lowest
capital investment and operating cost with due consideration
of future demands or possible system
expansion.

The bulk velocity will fall into one of the regions
previously discussed. Once it has been determined
in which region the design velocity will occur, the
appropriate correlations for determining pipe frictional
loss value(s) may be selected. The following
describes the procedure to be used for estimating
pipe frictional losses in each of the regions.

**Region 1**: The upper limit of Region 1 in Figure 3
(Point B) is designated v<sub>max.</sub> The value
of v<sub>max</sub> is determined using Equation
(3.E.1) and data given in Table I.

=+=
<span class= equation-label >(Eq. 3.E.1)</span>
[units = us]
$$ v_{max} = {K'C^{σ}} (ft/s) $$
=+=

=+=
<span class= equation-label >(Eq. 3.E.1)</span>
[units = metric]
$$ v_{max} = 0.3048{K'C^{σ}} (m/s) $$
=+=

where:

- K' = numerical coefficient (constant for a given pulp), obtained from Table I
- C = consistency (oven-dried, expressed as a percentage, *not* decimally), 2-6% limit.
- σ = exponent (constant for a given pulp), obtained from Table I

The following is data for use with Equation (3.E.1) to determine velocity limit, v<sub>max</sub>·

=|=
title: Table I
data: Table1CSV.csv
=|=

NOTES:

1. Estimates for pulps based on published literature.
2. Original data obtained in stainless steel and PVC pipe.
3. Stainless steel may be hydraulically smooth although some manufacturing processes may destroy the surface and hydraulic smoothness is lost. PVC is taken to be hydraulically smooth pipe.
4. For cast iron and galvanized pipe, the K<sup>9</sup> values will be reduced. No systematic data are available for the effects of surface roughness.
5. If pulps are not identical to those shown, some engineering judgement is required.
6. Wood is New Zealand Kraft pulp.

If the proposed design velocity (v) is less than v<sub>max</sub>,
the value of flow resistance (Δh/L) may be calculated
using Equation (3.E.2) and data given in Table II
and the appendices.

=+=
<span class= equation-label >(Eq. 3.E.2)</span>
[units = us]
$$ Δh/L = FKv^{α}C^{β}D^{γ}\, (ft/100\, ft) $$
=+=

=+=
<span class= equation-label >(Eq. 3.E.2)</span>
[units = metric]
$$ Δh/L = 0.3048FKv^{α}C^{β}D^{γ}\, (m/100\, m) $$
=+=

where:

- F = factor to correct for temperature, pipe roughness, pulp type, freeness, or safety factor (refer to Appendix A)
- K = numerical coefficient (constant for a given pulp), obtained from Table II
- v = bulk velocity (ft/s)
- C = consistency (oven-dried, expressed as a percentage, *not* decimally), 2-6% limit
- D = pipe inside diameter (in), and
- α,β,γ = exponents (constant for a given pulp), obtained from Table II

For mechancial pulps, there is no true v<sub>max</sub>· The
upper limit of the correlation equation (Equation (3.E.2))
is also given by Equation (3.E.1) in this case, the upper
velocity is actually v<sub>w</sub>·

**Region 2**: The lower limit of Region 2 in Figure 3
(Point B) is v<sub>max</sub> and the upper limit
(Point 0) is v<sub>w</sub>. The velocity of the stock
at the onset of drag reduction is determined
using Equation (3.E.3).

=+=
<span class= equation-label >(Eq. 3.E.3)</span>
[units = us]
$$ v_{w} = 4.00C^{1.40} (ft/s) $$
=+=

=+=
<span class= equation-label >(Eq. 3.E.3)</span>
[units = metric]
$$ v_{w} = 1.2192C^{1.40} (m/s) $$
=+=

where:

- C = consistency (oven-dried,expressed as a percentage, not decimally).

If v is between v<sub>max</sub> and v<sub>w</sub>, Equation (3.E.2) may be
used to determine ΔH/L at the maximum point
(v<sub>max</sub>)· Because the system must cope with the
worst flow condition, ΔH/L at the maximum point
(v max) can be used for all design velocities between
v<sub>max</sub> and v<sub>w</sub>·

**Region 3**: A conservative estimate of frictional losses is
obtained by using the water curve.
(Δh/ L)<sub>w</sub> can be obtained from a Friction
Factor vs. Reynolds Number plot ([3],for example), or approximated
from the following equation (based on
the Blasius equation).

=+=
<span class= equation-label >(Eq. 3.E.4)</span>
[units = us]
$$ (Δh/L)_{w} = 0.58v^{1.75}D^{-1.25}\,(ft/100\, ft) $$
=+=

=+=
<span class= equation-label >(Eq. 3.E.4)</span>
[units = metric]
$$ (Δh/L)_{w} = 0.58v^{1.75}D^{-1.25}\,(m/100\, m) $$
=+=

where:

- v = bulk velocity (ft/s), and
- D = pipe diameter (in.)

Previously published methods for calculating pipe
frictional losses of pulp suspensions gave a very conservative
estimate of head loss. The method just described
gives a more accurate estimate of head loss
due to friction, and has been used successfully in
systems in North America and world-wide.

Pertinent equations, in addition to those herein
presented, are located in Appendix A. Example
problems are located in Appendix B.

-=^=
title: Preferred and Allowable Operating Regions for Rotodynamic Pumps to Maximize Reliability: 1-Part On-Demand Webinar
description: This webinar covers how the Preferred Operating Region (POR) and Allowable Operating Region (AOR) are defined for centrifugal, mixed and axial flow pumps and their impact on efficiency and reliably. Curve shape, hydraulic loading, temperature rise, vibration/noise, suction recirculation, priming, NPSH margin and more will be discussed related to a pumps AOR as well as methods to ensure operating in the AOR will be presented. This webinar is a must for pump end users, application engineers, pump system designers, specifying engineers and pump service providers.
image: https://a200661cdda2de08c184-8a545ee6d682984872a72f5ce2cc68be.ssl.cf2.rackcdn.com/hi_393becd30058bdaf236507781e2c8a19.png
url: https://training.pumps.org/products/preferred-and-allowable-operating-regions-for-rotodynamic-pumps-to-maximize-reliability-1-part-on-demand-webinar
price: 134.00
hide_price: true
-=^=

### V. Head Losses in Valves, Bends and Fittings

The frictional head losses of pulp suspensions in valves, bends
and fittings may be determined from the basic equation
for head loss, provided in <a href="/fluid-flow-III/general.html" target="_blank">Fluid Flow – General</a>.

Values of K for the flow of water through various
types of bends and fittings are tabulated in numerous
reference sources ([3], for example).
The loss coefficient for valves may be obtained from
the valve manufacturer.

The loss coefficient for pulp suspensions in a given
bend or fitting generally exceeds the loss coefficient
for water in the same bend or fitting. As an approximate
rule, the loss coefficient (K) increases 20 percent
for each 1 percent increase in oven-dried stock
consistency. Please note that this is an approximation;
actual values of K may differ, depending on the
type of bend or fitting under consideration (4).

The following is data for use with Equation (3.E.2) to determine head loss, ΔH/L.

=|=
title: Table II
data: Table2CSV.csv
=|=

NOTES:

1. Estimates for pulps based on published literature.
2. Original data obtained in stainless steel and PVC pipe (7, 8, 9).
3. No safety factors are included in the above correlations.
4. The frictional loss depends considerably on the condition of the inside of the pipe surface (10).
5. Wood is New Zealand Kraft pulp.

### Appendix A

The following gives supplemental information to that provided in the main text.

**1) Rate of flow, Q —**

=+=
[units = us]
<span class= equation-label >(Eq. 3.E.5)</span>
$$ Q = {{16.65(T.P.D.)}\over C} \, (gpm) $$
=+=

=+=
[units = metric]
<span class= equation-label >(Eq. 3.E.5)</span>
$$ Q = {{3.782(T.P.D.)}\over C} \, (m^{3}/h) $$
=+=

where:

- T.P.D. = mill capacity (short tons per day)

and

- C = consistency (oven-dried, expressed as a percentage, *not* decimally).


**2) Bulk velocity, v —**

=+=
[units = us]
<span class= equation-label >(Eq. 3.E.6)</span>
$$ v = {{0.321Q}\over A}\, (ft/s),\, or $$
=+=

=+=
[units = metric]
<span class= equation-label >(Eq. 3.E.6)</span>
$$ v = {{278Q}\over A}\, (m/s),\, or $$
=+=

=+=
[units = us]
<span class= equation-label >(Eq. 3.E.7)</span>
$$ v = {{0.4085Q}\over D^2}\, (ft/s) $$
=+=

=+=
[units = metric]
<span class= equation-label >(Eq. 3.E.7)</span>
$$ v = {{354Q}\over D^2}\, (m/s) $$
=+=

where:

- Q = rate of flow <units us = "(gpm)," metric = "(m^3^/h)"/>
- A = inside area of pipe <units us = "(in^2^), and" metric = "(mm^2^)"/>
- D = inside diameter of pipe <units us = "(in)" metric = "(mm)"/>

**3) Multiplication Factor, F (included in Equation (3.E.2)) —**

=+=
<span class= equation-label >(Eq. 3.E.8)</span>
$$ F = {F_1}*{F_2}*{F_3}*{F_4}*{F_5,} $$
=+=

where:

- F<sub>1</sub> = correction factor for temperature. Friction loss calculations are normally based on a reference pulp temperature of 95°F. The flow resistance may be increased or
decreased by 1 percent for each 1.8°F below or above 95°F, respectively. This may be expressed as follows (where T = pulp temperature <units us = "(°F)):" metric = "(°C)):"/>:

=+=
[units = us]
<span class= equation-label >(Eq. 3.E.9)</span>
$$ F_1 = 1.526 - 0.00556T $$
=+=

=+=
[units = metric]
<span class= equation-label >(Eq. 3.E.9)</span>
$$ F_1 = 1.34808 - 0.010008T $$
=+=

- F<sub>2</sub> = correction factor for pipe roughness. This
factor may vary due to manufacturing processes
of the piping, surface roughness, age, etc. Typical values for PVC and stainless
steel piping are listed below (please note that these are typical values; experience and/or additional data may modify the above factors):

=+=
$$ F_2 = 1.0\,for\,PVC\,piping $$
$$ F_2 = 1.25\,for\,stainless\,steel\,piping $$
=+=

- F<sub>3</sub> = correction factor for pulp type. Typical values are listed below (Note: This factor has been incorporated in
the numerical coefficient, K, for the pulps listed in Table II. When using Table II, F3 should not be used.):

=+=
$$ F_3 = 1.0\,for\,pulps\,that\,have\,never\,been\,dried\,and\,resulurried $$
$$ F_3 = 0.8\,for\,pulps\,that\,have\,been\,dried\,and\,resulurried $$
=+=

- F<sub>4</sub> = correction factor for beating. Data have shown
that progressive beating causes, initially, a
small decrease in frictional losses, followed by a
substantial increase. For a kraft pine pulp
initially at 725 CSF and F<sub>4</sub> = 1.0, beating
caused the freeness to decrease to 636 CSF
and F<sub>4</sub> to decrease to 0.96. Progressive beating
decreased the freeness to 300 CSF and
increased F<sub>4</sub> to 1.37 (see K values in Table
II). Some engineering judgement may be
required.
- F<sub>5</sub> = design safety factor. This is usually specified
by company policy with consideration
given to future requirements.

### Appendix B

The following is an example that illustrates the method for determining pipe frictional losses in each of the three regions shown in Figure 3.

### Example

<units us = "Determine the frictional loss (per 100 ft of pipe) for 2% oven-dried bleached kraft pine, dried and reslurred, through
6 inch schedule 40 stainless steel pipe (inside diameter = 6.065 in). The pulp temperature is 90°F, the flow rate 1100 U.S. GPM."
metric = "Determine the frictional loss (per 100 m of pipe) for 2% oven-dried bleached kraft pine, dried and reslurred, through
6 inch schedule 40 stainless steel pipe (inside diameter = 154.051 mm). The pulp temperature is 32.22°C, the flow rate 249.84 m^3^/h."/>

**Solution:**

a) The bulk velocity is:

=+=
[units = us]
$$ v = {{0.4085Q}\over{D^2}} $$
=+=

=+=
[units = metric]
$$ v = {{354Q}\over{D^2}} $$
=+=

=+=
[units = us]
$$ = {{0.4085(1100)}\over{6.065^2}} = 12.22 ft/s  $$
=+=

=+=
[units = metric]
$$ = {{354(249.84)}\over{154.051^2}} = 3.72 m/s  $$
=+=

b) It must be determined in which region (1, 2 or 3)
this velocity falls. To obtain an initial indication,
determine V<sub>max</sub>.

=+=
[units = us]
$$ v_{max} = K'C^{σ}, $$
=+=

=+=
[units = metric]
$$ v_{max} = 0.3048*K'C^{σ}, $$
=+=

and

- K' = 0.59 (from Table I),
- σ = 1.45 (from Table I),

=+=
[units = us]
$$ v_{max} = 0.59(2.0^{1.45}) = 1.61 ft/s. $$
=+=

=+=
[units = metric]
$$ v_{max} = 0.3048*0.59(2.0^{1.45}) = 0.49 m/s. $$
=+=

c) Since v exceeds v<sub>max</sub>, Region 1 (the linear region) is eliminated. To determine whether v lies in Region 2 or 3, the velocity at the onset
of drag reduction, v<sub>W</sub>, must be calculated.

=+=
[units = us]
$$ v_{w} = 4.00C^{1.40}, $$
=+=

=+=
[units = metric]
$$ v_{w} = 1.2192C^{1.40}, $$
=+=

=+=
[units = us]
$$ v_{w} = 4.00(2.0^{1.40}) = 10.56 ft/s. $$
=+=

=+=
[units = metric]
$$ v_{w} = 1.2192(2.0^{1.40}) = 3.22 m/s. $$
=+=

d) v exceeds v<sub>w</sub>, indicating that it falls in Region 3. The frictional loss is calculated as that of water flowing at
the same velocity.

=+=
[units = us]
$$ (Δh/L)_{w} = 0.58v^{1.75}D^{-1.25}\, $$
=+=

=+=
[units = metric]
$$ (Δh/L)_{w} = 0.58v^{1.75}D^{-1.25}\, $$
=+=

=+=
[units = us]
$$ = 0.58(12.22^{1.75})(6.065^{-1.25}) = 4.85\,ft\,head\,loss/100\,ft\,of\,pipe $$
=+=

=+=
[units = metric]
$$ = 0.58(12.22^{1.75})(6.065^{-1.25}) = 4.85\,m\,head\,loss/100\,m\,of\,pipe $$
=+=

This will be a conservative estimate, as the actual
frictional loss curve for pulp suspensions under these
conditions will be below the water curve.

### References
1. TAPPI Technical Information Sheet (TIS) 408-4. Technical
Association of the Pulp and Paper Industry, Atlanta. Georgia
(1981).
2. K. Molier and G. G. Duffy. TAPPI 61 , 1, 63 (1978).
3. Hydraulic Institute Engineering Data Book, First Edition.
Hydraulic Institute. Cleveland. Ohio (1979).
4. K. Molier and G. Elmquist. TAPPI 63, 3, 101 (1980).
5. W. Brecht and H. Heller. TAPPI 33, 9, 14A (1950).
6. R. E. Durst and L. C. Jenness. TAPPI 39, 5, 277 (1956).
7. K. Molier. G. G. Duffy and A. L. Titchener. APPITA 26, 4, 278
(1973).
8. G. G. Duffy and A. L. Tichener. TAPPI 57, 5, 162 (1974).
9. G. G. Duffy, K. Molier, P. F. W. Lee and S. W. A. Mine,
APPITA 27, 5, 327 (1974).
10. G. G. Duffy, TAPPI 59, 8, 124 (1976).
11. G. G. Duffy. Company Communications Goulds Pumps.
Inc. (1980-1981).
    





