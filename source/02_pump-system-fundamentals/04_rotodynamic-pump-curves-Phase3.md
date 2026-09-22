-----
title: D) Rotodynamic Pump Curves
tabtitle: Rotodynamic Centrifugal Pump Curves | Head, Power, Efficiency, NPSHR vs Flow, Affinity Rules, Impeller Trimming, Underfiling | HI Data Tool 
date: September 17, 2026
description: Demonstrates how centrifugal, mixed-flow and axial flow pump performance curves are drawn and interpreted, including total head, efficiency, input power, NPSHR, operating regions, affinity rules, parallel and series operation, and the effects of speed and impeller modifications on pump performance.
-----

# Rotodynamic Pump Curves 

Pump performance changes with flow rate and is shown by the **pump curve**. Pump curves present head, efficiency, net positive suction head required (NPSHR), and power across the operating flow range for a given rotational speed and impeller diameter.

The affinity rules indicate how the pump curve changes as a function of rotational speed. Additionally, impeller trimming alters the pump curve, which is commonly done for centrifugal and mixed flow pumps. Operating multiple pumps in parallel or in series results in a new composite pump curve that is a function of the individual pump curves.

Understanding the pump curve and how it changes with respect to speed, impeller trimming, and parallel and series operation is essential for proper pump selection. The flow rate, pump total head, pump input power and specific gravity of the liquid can be used to calculate pump efficiency. Liquid viscosity will affect the pump total head, flow, efficiency, NPSHR and power, which is not discussed here. Refer to <a href="https://www.pumps.org/what-we-do/standards/?pumps-search-product=9.6.7&hi-order=asc&hi-order-by=name" target="_blank">ANSI/HI 9.6.7</a> for effects of liquid viscosity on rotodynamic pump performance.

=atag=
### Pump Total Head Curve
=atag=

The **head versus flow curve** is the most commonly used curve to describe pump performance. Pump total head (H) is plotted on the y-axis in <units us = "feet (ft)" metric = "meters (m)"></units>. This is the measure of energy increase per unit weight of the liquid, imparted to the liquid by the pump, and is the difference between the total discharge head and the total suction head. On the x-axis is the flow rate, typically in <units us = "gallons per minute (GPM)" metric = "cubic meters per hour (m^3^/h)"/>.

Using head, the performance of the pump can be shown independent of the density or specific gravity of the fluid pumped. 

=/=
title: Head vs. Flow
data-us: pc-data.csv
data-metric: pc-data-metric.csv
x: 1
series: 2
series_title_index: 0
=/=
<div class="figure-label"><a id="fig1b1"></a>Fig. 1.B.1 Head versus flow rate curve</div>

=atag=
### Pump Efficiency Curve
=atag=

The **Pump efficiency versus flow curve** is shown as a percentage on most pump curves. It shows pump efficiency at various flow rates and the flow rate where efficiency is at a maximum is called the pump’s **best efficiency point (BEP)**. BEP is an important operating point that is further described later in this section. Pump efficiency is defined by [Eq. 1.B.3](#eq1b3) as the ratio of pump output power and pump input power.

<div class="equation-label"><a id="eq1b3"></a>Eq. 1.B.3 Pump efficiency</div>

=+=
$$ η_{p} = {P_{w} \over P_{p}}  $$
=+=

where:

- P<sub>w</sub> is pump output power <units us = "(hp)" metric = "(kW)"/>
- P<sub>p</sub> is pump input power <units us = "(hp)" metric = "(kW)"/>

=/=
title: Efficiency Curve
data-us: pc-data.csv
data-metric: pc-data-metric.csv
x: 1
series: 3
series_title_index: 0
=/=
<div class="figure-label"><a id="fig1b2"></a>Fig. 1.B.2 Pump efficiency curve</div>

=atag=
### Pump Input Power Curve
=atag=

The **pump input power curve** shows the amount of input power required for different flow rates. This is the power used to select the driver and can be determined by [Eq. 1.B.4](#eq1b4).

<div class="equation-label"><a id="eq1b4"></a>Eq. 1.B.4 Pump input power</div>

=+=
[units = us]
$$ P_p = {{Q · H· s} \over {3960 · η_{p}}} $$
=+=

=+=
[units = metric]
$$ P_p = {{Q · H · s} \over {366.6 · η_{p}}} $$
=+=

where:

- P<sub>p</sub> = pump input power, in <units us = "hp" metric = "kW"/>
- Q = rate of flow, in <units us = "gallons per minute" metric = "m^3^/h"/>
- H = total head, in <units us = "feet" metric = "meters"/>
- s = specific gravity
- η<sub>p</sub> = pump efficiency

Pump input power can also be determined if the amount of power absorbed by the fluid (pump output power, P<sub>w</sub>) and pump efficiency (η<sub>p</sub>) are known by rearranging the [Eq. 1.B.3](#eq1b3), as shown in [Eq. 1.B.5](#eq1b5).

<div class="equation-label"><a id="eq1b5"></a>Eq. 1.B.5 Pump input power from pump output power and efficiency</div>

=+=
$$ P_p = {P_{w} \over η_{p}}  $$
=+=

The pump input power curve is important because it is the power required at the pump shaft, which supports proper selection of the pump driver.

=/=
title: Pump Input Power Curve
data-us: pc-data-PIP.csv
data-metric: pc-data-metric-PIP.csv
x: 1
series: 4
series_title_index: 0
=/=
<div class="figure-label"><a id="fig1b3"></a>Fig. 1.B.3 Pump input power curve</div>

=atag=
### Net Positive Suction Head Required (NPSHR) Curve
=atag=

The **NPSHR curve** plots NPSHR for different flow rates. NPSHR is the minimum NPSH needed to achieve the specified performance 
at the specified flow rate, speed, and pumped liquid. NPSHR in combination with the system's available NPSH is an important considerations in pump selection. NPSHR is further defined in <a href="/pump-fundamentals/pump-principles.html" target="self">Rotodynamic Pump Principles</a>. 

=/=
title: NPSHR Curve
data-us: pc-data-npshr.csv
data-metric: pc-data-metric-npshr.csv
x: 1
series: 2
series_title_index: 0
=/=
<div class="figure-label"><a id="fig1b4"></a>Fig. 1.B.4 Net positive suction head required curve</div>

=atag=
### Operating Regions and Points
=atag=

![](./images/iB-5-Relative-Life-expectancy-Operating-Region-and-points.png#center "")
<div class="figure-label"><a id="fig1b5"></a>Fig. 1.B.5 Relative life expectancy, operating regions, and operating points</div>

**Best Efficiency Point (BEP):** A pump’s best efficiency point is defined as the flow rate and head at which the pump efficiency is the maximum at a given speed and impeller diameter. Typically, a pump is specified to have
its duty point, or designed operating point, at BEP. At BEP, a pump will have low vibration and noise when compared to other operating points. Also, there
is minimum recirculation within the impeller and shockless entry into the impeller. Shockless entry is when the flow entering the impeller matches the angle 
of the impeller vanes at entry.

**Preferred Operating Region (POR):** The preferred operating region (POR) is a range of rates of flow to either side of the BEP within which the hydraulic efficiency and the operational reliability of the pump are not substantially degraded. Flow induced vibrations and internal hydraulic loading is low in this region. Depending on the specific speed of the pump, which is further defined in the <a href="/pump-fundamentals/pump-principles.html" target="self">Rotodynamic Pump Principles</a> section, the POR can be anywhere from 90-110% of BEP flow to 70-120% of BEP flow.

**Allowable Operating Region (AOR):** The AOR is the flow range at the rated speed with the impeller supplied in which the pump may be allowed to operate, as limited by cavitation, heating, vibration, noise, shaft deflection, fatigue, and other similar criteria. It is the flow range at which the pump can be run with acceptable service life. The pump manufacturer should be consulted to define this region. Typically, operating intermittently within this region does not cause issues over the life of the pump. The graph above shows the various operating regions and the types of 
issues that can occur when operating outside of the POR and AOR.

**Shut-off Head and Pump Runout:** These points are important during manufacturer testing to fully define the shape of the pump curve. They are the furthest points to the left and right on the curve. Shut-off is the condition of zero flow rate where no liquid is flowing through the pump, but the pump is primed and running. Operating at this point for more than a few seconds can cause serious mechanical issues. Pump Runout is the point at which flow is at a maximum. Operating at this flow can cause cavitation, vibration and, in some pumps, overloading of the driver. These points are to be avoided when operating pumps.

 <a href="https://www.pumps.org/resources/pump-faqs/#what-is-the-bep-and-what-happens-to-a-pumping-system-when-a-pump-is-not-operated-at-the-bep-" target="_blank">Read more about the BEP, POR and AOR at HI’s Pump FAQs.</a>


=^=
title: Preferred and Allowable Operating Regions for Rotodynamic Pumps to Maximize Reliability - 1 Part Recorded Webinar
description: Learn how the Preferred Operating Region (POR) and Allowable Operating Region (AOR) are defined for centrifugal, mixed and axial flow pumps and their impact on efficiency and reliably.  Curve shape, hydraulic loading, temperature rise, vibration/noise, suction recirculation, priming, NPSH margin and more will be discussed related to a pumps AOR as well as methods to ensure operating in the AOR will be presented.  This webinar is a must for pump end users, application engineers, pump system designers, specifying engineers and pump service providers.
image: /images/recordedwebinar.png
url: https://training.pumps.org/products/preferred-and-allowable-operating-regions-for-rotodynamic-pumps-to-maximize-reliability-1-part-on-demand-webinar
price: 119.00
hide_price: true
=^=

=atag=
### Parallel and Series Pump Implications
=atag=

Two or more pumps in a system can be placed either in parallel or in series. In **parallel**, a system consists of two or more pumps that are configured such that each draws from the same suction reservoir, wet well, or header, and each discharges to the same discharge reservoir or header. In **series**, a system consists of two or more pumps that are configured such that the discharge of one pump feeds the suction of a subsequent pump.

**Pumps in Parallel**

Pumps operating in parallel allow the pumping system to deliver greater flows than is possible with just one such pump. To determine the composite pump curve of two or more pumps operating in parallel, at each head value, the flow rate of each pump must be added together to obtain the composite flow rate.

![](./images/iB-6-Pump-curves-in-parallel.png#center "")
<div class="figure-label"><a id="fig1b6"></a>Fig. 1.B.6 Pump curves for pumps operating in parallel</div>

The amount of increased flow that occurs within the system depends on both the shape of the system curve and the shape of the pump curves. The **composite pump curve** intersects the system curve at different operating points, yielding different flow rates. As more pumps are called to operate, the flow will increase accordingly, as shown in [Fig. 1.B.7](#fig1b7).

![](./images/iB-7-Pump-curves-in-parallel-with-System-Curve.png#center "")
<div class="figure-label"><a id="fig1b7"></a>Fig. 1.B.7 Pump curves in parallel with system curve</div>

It should be noted, however, that unless the system curve is completely flat, meaning friction and other dynamic losses are negligible, bringing a second pump on-line does not double the flow rate. The increased flow will be something less than double. How much less depends on the steepness of the system curve.

**Pumps in Series**

While pumps placed in parallel provide greater flow capabilities at the same head as one pump operating individually, pumps placed in series provide greater head capabilities at the same flow rate.

A composite pump curve representing pumps in series can be generated by adding the individual head values of the pumps for a given flow. Plotting this sum at various flow values will yield a composite pump curve for the group of pumps. [Fig. 1.B.8](#fig1b8) shows a composite pump curve for two and three identically sized pumps operating in series.

![](./images/iB-8-Pump-Curves-in-Series.png#center "")
<div class="figure-label"><a id="fig1b8"></a>Fig. 1.B.8 Pump curves for pumps operating in series</div>


Pumps operating in series allow the pumping system to deliver greater heads than is possible with just one such pump. This allows a pump station to be designed to satisfy systems that require large discharge pressures that may not be practical with one pump. Where certain applications require, it may also allow a pump station to address a wide variation in system pressures by staging the number of operating pumps. [Fig. 1.B.9](#fig1b9) shows how applying a configuration with pumps in series to a system with a steep system curve may allow the pumps to address different head requirements so long as inter-stage discharge piping is configured to permit it.

![](./images/iB-9-Pump-curves-in-series-with-System-Curve.png#center "")
<div class="figure-label"><a id="fig1b9"></a>Fig. 1.B.9 Pump curves in series with system curve</div>

=^=
title: Factory Performance Testing: Hydraulic, Mechanical and Hydrostatic – Recorded Webinar
description: Learn laboratory test standards for rotodynamic pumps, covering test procedures, setups, and arrangements along with data acquisition, acceptance grades, and instrumentation.
image: /images/recordedwebinar.png
url: https://training.pumps.org/products/factory-performance-testing-hydraulic-mechanical-and-hydrostaticrecorded-webinar
price: 119.00
hide_price: true
=^=

=atag=
### Affinity Rules
=atag=

Rotodynamic pump performance can be altered to meet a design point by adjusting the pump speed as described by the affinity rules. Pump affinity rules are fundamental principles, based on kinematic, dynamic, and geometric similarity, that govern the relationships of pump scaling and modeling. Application of the affinity rules to pump speed changes are described below, and you can refer to [ANSI/HI 14.6](http://www.pumps.org/standards) for more information on pump modeling and to [ANSI/HI 14.3](https://www.pumps.org/what-we-do/standards/?pumps-search-product=14.3&hi-order=asc&hi-order-by=name) regarding limitations in using the affinity rules.

Because the affinity rules are based on similarity, they are applied to determine the pump performance change with respect to rotational speed change. Under the assumption that changing the speed of a pump maintains the same efficiencies, the affinity rule equations show the relationships between pump parameters, flow (Q), head (H), and power (P), as a function of rotational speed (n) change.

<div class="equation-label"><a id="eq1b6a"></a>Eq. 1.B.6a Affinity rule for flow rate as a function of rotational speed</div>

=+=
$$ {Q_2 \over Q_1} = {n_2 \over n_1} $$
=+=

<div class="equation-label"><a id="eq1b6b"></a>Eq. 1.B.6b Affinity rule for head as a function of rotational speed</div>

=+=
$$ {H_2 \over H_1} = ({n_2 \over n_1})^2 $$
=+=

<div class="equation-label"><a id="eq1b6c"></a>Eq. 1.B.6c Affinity rule for power as a function of rotational speed</div>
=+=

$$ {P_2 \over P_1} = ({n_2 \over n_1})^3  $$
=+=


According to the affinity rules ([Eq. 1.B.6a](#eq1b6a) through [Eq. 1.B.6c](#eq1b6c)), changing speed results in a proportional change in flow rate, a squared change in head, and a cubed change in power consumption. It is important to understand that the affinity rules are applied to a point on the pump performance curve. The affinity rules are applied to both values associated with that point, such as flow rate and head or flow rate and power, to calculate a corresponding point at the new rotational speed, as shown in the worked example below.

=^=
title: Application Guideline for Variable Speed Pumping
description: This guideline has been created to provide pump industry professionals and the end user operators of pumps with the knowledge required to apply variable speed pumping so that it will result in improved energy efficiency and increased reliability. This intention of this guidebook is to educate the pumping industry and to ensure the safe, reliable, and efficient operation of the pumping equipment we all depend on every day.
image: ./images/variable-speed-pumping.jpg
url: https://www.pumps.org/?s=Application+Guideline+for+Variable+Speed+Pumping
price: 166.00
hide_price: true
=^=

**Affinity Rules Example - Rotational Speed Change**

The following worked example is done in U.S. customary units but can be applied Metric units.

A booster pump is designed to operate at 1800 GPM and 135 ft, with a speed of 1740 RPM. Due to fluctuating flows, the booster pump is equipped with a variable frequency drive (VFD), which reduces the pump speed by 10% during low-flow conditions. Using the pump curve below and the affinity rules, this example generates the pump curve for low-flow conditions at the reduced speed.

=|=
title: Data (Normal Conditions)
data: total-head-feet.csv
=|=

<div class="table-label"><a id="tbl1b1"></a>Tbl. 1.B.1 Data for normal operating conditions</div>

=/=

title: Normal Operating Conditions
data: total-head-feet.csv
x: 1
series: 2
series_title_index: 0
=/=

<div class="figure-label"><a id="fig1b10"></a>Fig. 1.B.10 Pump curve at normal operating conditions</div>

**Determine the Reduced Speed**

During low-flow conditions, the speed of the pump is reduced by 10%.

<div class="calculation-label"><a id="calc1b6a1"></a>Calc. 1.B.6a(1) Reduced rotational speed</div>

=+=
$$ n_2= n_1 · (1-0.10)= 1740 · (1-0.10)= 1566\,RPM $$
=+=

**Calculate New Flow Values**

Using [Eq. 1.B.6a](#eq1b6a), calculate the new flow values. Repeat the calculation until all points under the flow column are converted.

<div class="calculation-label"><a id="calc1b6a2"></a>Calc. 1.B.6a(2) New flow at first data point</div>

=+=
$$ {Q_2 \over Q_1} = {n_2 \over n_1} $$
$$ Q_2 = (Q_1=0) · ({1566 \over 1740})= 0\,GPM $$
=+=

<div class="calculation-label"><a id="calc1b6a3"></a>Calc. 1.B.6a(3) New flow at second data point</div>

=+=
$$ Q_2 = (Q_1=200) · ({1566 \over 1740})= 180\,GPM $$
=+=

<div class="calculation-label"><a id="calc1b6a4"></a>Calc. 1.B.6a(4) New flow at third data point</div>

=+=
$$ Q_2 = (Q_1=400) · ({1566 \over 1740})= 360\,GPM $$
=+=

**Calculate New Total Head Values**

Using [Eq. 1.B.6b](#eq1b6b), calculate the new total head values. Repeat the calculation until all points under the total head column are converted.

<div class="calculation-label"><a id="calc1b6b1"></a>Calc. 1.B.6b(1) New total head at first data point</div>

=+=
$$ {H_2 \over H_1} = ({n_2 \over n_1})^2 $$
$$ H_2 = (H_1=213)·({1566 \over 1740})^2= 173\,ft $$
=+=

<div class="calculation-label"><a id="calc1b6b2"></a>Calc. 1.B.6b(2) New total head at second data point</div>

=+=
$$ H_2 = (H_1=206)·({1566 \over 1740})^2= 167\,ft $$
=+=

<div class="calculation-label"><a id="calc1b6b3"></a>Calc. 1.B.6b(3) New total head at third data point</div>

=+=
$$ H_2 = (H_1=198)·({1566 \over 1740})^2= 160\,ft $$
=+=

**Plot Pump Curve for Low-Flow Conditions**

=|=
title: Data Low Flow (Reduced Speed) Conditions
data: total-head-feet-2.csv
=|=

<div class="table-label"><a id="tbl1b2"></a>Tbl. 1.B.2 Data for low-flow reduced-speed conditions</div>

=/=
title: Low Flow Reduced-Speed Conditions
data: total-head-feet-2.csv
x: 1
series: 2
series_title_index: 0
=/=

<div class="figure-label"><a id="fig1b11"></a>Fig. 1.B.11 Pump curve at low-flow reduced-speed conditions</div>

**Comparison of Normal Flow and Low-Flow Conditions**

![](./images/iB-12-Pump-curves-base-speed-and-reduced-speed.png#center "")

<div class="figure-label"><a id="fig1b12"></a>Fig. 1.B.12 Pump curves comparing base-speed and reduced-speed conditions</div>

=atag=
### Changes in Impeller Diameter
=atag=

Rotodynamic pump performance can be altered by changing the impeller diameter, and many centrifugal pumps have their performance represented as a function of impeller diameter to support the selection of the appropriate curve for a pump application to fit the desired system conditions. [Fig. 1.B.13](#fig1b13) illustrates the trimming of a radial flow impeller where it is cut straight across, and [Fig. 1.B.14](#fig1b14) is a representation of rotodynamic pump performance for a range of impeller diameters.

![](./images/pc-fig-1b13-radial-enclosed-impeller-trim.png#center "")

<div class="figure-label"><a id="fig1b13"></a>Fig. 1.B.13 Radial enclosed impeller trim illustrating removal of shrouds and vane material</div>

Trimming the impeller down in diameter will move the pump curve down. The same can be said for selecting a larger impeller; the curve will shift up. When sizing a pump for an application in which the pump is not connected to a variable speed controller, the impeller diameter is selected for the desired duty conditions. [Fig. 1.B.14](#fig1b14) shows a pump performance curve over an impeller trim range. There is a lot of information presented on this curve, which, when studied carefully, is useful in selecting the correct impeller trim for a rated point and determining other important factors such as required motor size and NPSHR.

- Head versus flow rate for each impeller diameter are represented by the blue curves.
- Lines of constant efficiency or iso-efficiency lines are represented by the green curves.
- Lines of constant power are represented by the red lines.
- Lines of constant NPSHR are represented by the orange dashed lines.
- The POR is represented by the yellow area, and the AOR is represented by the area between the black lines on the left and right side of the curve.

![](./images/pc-fig-1b14-impeller-trim-performance-curve.png#center "")

<div class="figure-label"><a id="fig1b14"></a>Fig. 1.B.14 Impeller trim curve illustrating performance change as a function of diameter at a constant rotational speed</div>

The impeller geometry changes with the pump specific speed, which may impact impeller trimming. Impeller trimming is typically applied to radial and mixed flow impellers, and the trimming methods may vary. Refer to [ANSI/HI 14.3](https://www.pumps.org/what-we-do/standards/?pumps-search-product=14.3&hi-order=asc&hi-order-by=name) for additional information and the impeller trimming section below.

=atag=
### Impeller Trimming and the Effect on Performance
=atag=

As noted in the preceding section, changing the impeller diameter will change pump performance. It is common to trim an impeller to meet a rated condition that is below the pump curve. Because changes in impeller diameter do not maintain similarity, the affinity rules are not intended to be applied for changes in impeller diameter. The information presented in [Fig. 1.B.14](#fig1b14) is representative of tested performance, and it can be noted that the efficiency does not remain constant as diameter changes and the relationship between head and flow with diameter change does not exactly match the affinity rules. However, affinity rules can be used for minor impeller diameter changes within 5% with acceptable accuracy. [Eq. 1.B.6a](#eq1b6a) through [Eq. 1.B.6c](#eq1b6c) can be modified for impeller diameter change by substituting impeller diameter (D) for rotational speed (n), as shown in the worked example below. If the diameter reduction exceeds 5% from the original, correction coefficients should be used for the diameter calculated using affinity rules, such as described in *Centrifugal and Axial Flow Pumps* by A.J. Stepanoff.

**Impeller Trimming Example**

The following worked example applies the affinity rules within the 5% impeller diameter limit and is done in U.S. customary units but can be applied to any units.

**Given Conditions**

A pump designed with a 10-5/8 in diameter impeller will be operating in a chemical process system at 2000 GPM at 80 ft. After installation and startup, it was found that the flow rate was 2100 GPM, and total head was 89 ft. The manufacturer recommends trimming the impeller to bring the flow rate down to the specified value. The following uses the affinity rules to determine the new impeller diameter and operating head.

**Calculate the New Impeller Diameter**

Substituting impeller diameter (D) for rotational speed (n) into the affinity rule equation for flow rate ([Eq. 1.B.6a](#eq1b6a)), we get [Eq. 1.B.7a](#eq1b7a) and the new impeller diameter can be calculated as shown in [Calc.1.B.7a](#calc1b7a). 

<div class="equation-label"><a id="eq1b7a"></a>Eq. 1.B.7a Affinity rule for flow rate as a function of impeller diameter</div>

=+=
$$ {Q_2 \over Q_1} = {D_2 \over D_1} $$
=+=

<div class="calculation-label"><a id="calc1b7a"></a>Calc. 1.B.7a New impeller diameter</div>

=+=
$$ D_2 = {Q_2 \over Q_1} · D_1 $$
=+=

=+=
$$ D_2 = {2000 \over 2100} · 10.625 = 10.12\,in $$
=+=

- Check if D<sub>2</sub> is within 5% of D<sub>1</sub>: 10.12/10.625 = 0.952. Confirmed.

**Calculate the New Head**

Substituting impeller diameter (D) for rotational speed (n) into the affinity rule equation for head ([Eq. 1.B.6b](#eq1b6b)), we get [Eq. 1.B.7b](#eq1b7b) and the new head can be calculated as shown in [Calc.1.B.7b](#calc1b7b). 

<div class="equation-label"><a id="eq1b7b"></a>Eq. 1.B.7b Affinity rule for head as a function of impeller diameter</div>

=+=
$$ {H_2 \over H_1} = ({D_2 \over D_1})^2 $$
=+=

<div class="calculation-label"><a id="calc1b7b"></a>Calc. 1.B.7b Head at new impeller diameter</div>

=+=
$$ H_2 = H_1 · ({D_2 \over D_1})^2 $$
=+=

=+=
$$ H_2 = 89 · ({10.12 \over 10.625})^2 = 81\,ft $$
=+=

With the impeller trimmed down to 10.12 in, the pump parameters, flow rate and head, now satisfy the process requirements. Also, as the trim comprises less than a 5% reduction of the original diameter, no further correction to the calculated diameter is necessary.

=atag=
### Alternate Impeller Trimming Methods
=atag=

It is common to trim a radial or mixed flow impeller to meet performance requirements. The information provided in the preceding *Changes in Impeller Diameter* section [Fig. 1.B.13](#fig1b13), provides details on expected performance changes as impeller diameter is changed. However, it should be noted that this is representative of a traditional trim where a radial flow impeller is cut consistently across the vanes and shrouds, as shown in [Fig. 1.B.13](#fig1b13), or for mixed flow impellers based on mean diameter change while maintaining the original angle.

There are instances where performance requirements are not met for flow, head, efficiency, power, head rise to shutoff, vibration, or curve shape and the curve needs to be adjusted to better meet multiple rated points. Different or alternate impeller trimming methods may be used to achieve performance requirements in these cases. The performance effects of these methods do not follow the affinity rules as similarly or uniformly along the pump performance curve range. The effect of these methods on performance is more empirical and is applied based on experience of the manufacturer.

The following is not a complete list, but it discusses some alternate impeller trimming modifications that may be applied by the manufacturer and are described here qualitatively because there are no consensus rules or relationships for the change in performance. If one of these modifications is made to meet a specification, it is important to precisely document the modification for future replacements.

**Impeller vane trimming:** An enclosed or semi-open impeller may have its vanes trimmed while leaving one or both shrouds in place. The reason for doing this may be to maintain the radial gap between the impeller shrouds and diffuser, when the shroud has a ring near the full diameter for thrust balance, or to increase the slope of the curve in a volute pump. This may result in slightly lower efficiency compared to trimming both the vanes and shrouds because of increased disk friction.

![](./images/pc-fig-1b15-vane-trimming-shroud-larger.png#center "")
<div class="figure-label"><a id="fig1b15"></a>Fig. 1.B.15 Vane trimming while leaving shroud larger</div>


![](./images/pc-fig-1b16-effect-vane-trimming-shroud-larger.png#center "")
<div class="figure-label"><a id="fig1b16"></a>Fig. 1.B.16 Qualitative effect of vane trimming and leaving shroud larger</div>

**Impeller shroud trimming:** Trimming the back shroud or both the front and back shroud while leaving the vanes at full diameter may be done to limit a pump curve that droops to shutoff. The head at shutoff or zero flow is strongly influenced by the velocity within the volute that is generated by the impeller rotation. Exposing the vane allows a larger component of the impeller tangential velocity to be imparted to the liquid within the volute at low flow, and the stagnation of this velocity at the casing throat within the volute increases the pressure measured at the pump outlet. A slight reduction in efficiency should be expected when the back shroud is trimmed, with a considerably greater reduction if both shrouds are trimmed.

![](./images/pc-fig-1b17-shroud-trimming-vanes-larger.png#center "")
<div class="figure-label"><a id="fig1b17"></a>Fig. 1.B.17 Shroud trimming while leaving vanes larger</div>

![](./images/pc-fig-1b18-effect-shroud-trimming-vanes-larger.png#center "")
<div class="figure-label"><a id="fig1b18"></a>Fig. 1.B.18 Qualitative effect of shroud trimming and leaving vanes larger</div>

**V-cutting the impeller vanes:** A V-cut involves machining a V-shaped notch or taper into the trailing edge of the impeller vane. The angle and depth of the V-cut will be carefully determined by the manufacturer based on the pump specific speed and desired hydraulic performance. It may be used on a double suction or end suction impeller when a standard diameter trim does not achieve the desired performance outcome. It results in more aggressively reducing flow and head at higher flow while preserving shutoff head. Additionally, it may be employed to preserve vane overlap to maintain NPSHR.

![](./images/pc-fig-1b19-v-cutting-vanes.png#center "")
<div class="figure-label"><a id="fig1b19"></a>Fig. 1.B.19 V-cutting vanes</div>

![](./images/pc-fig-1b20-effect-v-cutting-vanes.png#center "")
<div class="figure-label"><a id="fig1b20"></a>Fig. 1.B.20 Qualitative effect of V-cutting vanes</div>

**Angle trimming:** Mixed flow impellers have outlets that are angled where the front and rear shrouds are at different diameters, as shown in [Fig. 1.B.21](#fig1b21). For these impellers, trimming may require the angle to change. Decreasing the angle will flatten the pump curve, and increasing the angle will steepen the pump curve. For these impellers, trimming is done to achieve a mean diameter. Trimming impellers at an angle is typically done on vertical turbine pumps or pumps with Francis-vane impellers, but the angle trim could be applied to radial flow impellers.

![](./images/pc-fig-1b21-angle-trimming-impeller.png#center "")
<div class="figure-label"><a id="fig1b21"></a>Fig. 1.B.21 Mixed flow impeller defining angle (&theta;) and mean diameter (D<sub>RMS</sub>) for trimming (left), Impeller before trimming (center), Impeller after trimming with increased angle (right)</div>.

![](./images/pc-fig-1b22-effect-angle-trimming-increased-angle.png#center "")
<div class="figure-label"><a id="fig1b22"></a>Fig. 1.B.22 Qualitative effect of increasing angle (&theta;) when trimming impeller.</div>

=atag=
### Vane Trailing Edge Profiling
=atag=

**Underfiling** is a procedure performed on the impeller vane trailing edge where material is removed from the underside of the vane outlet, as illustrated in [Fig. 1.B.23](#fig1b23). A manufacturer may employ underfiling as a standard methodology to achieve consistent vane profiles or to achieve a desired performance or operational requirement. The effects of underfiling are presented qualitatively and should only be performed by the pump manufacturer. If underfiling is done to meet a specification, it is important to precisely document the modification for future replacements.

![](./images/pc-fig-1b23-impeller-underfiling.png#center "")
<div class="figure-label"><a id="fig1b23"></a>Fig. 1.B.23 Impeller underfiling</div>

![](./images/pc-fig-1b24-effect-underfiling-trailing-edge.png#center "")
<div class="figure-label"><a id="fig1b24"></a>Fig. 1.B.24 Qualitative effect of underfiling trailing edge of vane</div>

Underfiling helps to achieve uniform vane tip thickness and consistent vane-to-vane spacing, and results in increased area between the vanes, which can be used to adjust tested performance. It is most typically applied to rotodynamic pumps with low to moderate specific speeds, including mixed flow pump impellers. Underfiling flattens the performance curve, shifting BEP to higher flow rates with performance gains most noticeable to the right of BEP. Therefore, this may be employed to increase head and flow to meet a rated flow and total head. The pump input power will increase consistently with the increase in flow rate and total head.


**Overfiling** is a procedure performed on the impeller vane trailing edge where material is removed from the top side of the vane outlet, as illustrated in [Fig. 1.B.25](#fig1b25). The effects are discussed qualitatively and should only be performed by the pump manufacturer. If overfiling is done to meet a specification, it is important to precisely document the modification for future replacements.

![](./images/pc-fig-1b25-impeller-overfiling.png#center "")
<div class="figure-label"><a id="fig1b25"></a>Fig. 1.B.25 Impeller overfiling</div>

Overfiling does not increase the distance between vanes or exit area; therefore, it has minimal impact on hydraulic performance. The effect of overfiling thins a blunt trailing edge, which may limit the impeller vane pass pulsation and related vibration.

=atag=
### Summary of Impeller Trimming Vane Profile Modifications
=atag=

This summary table is presented qualitatively and the modifications within are recommended to be applied only by the manufacturer with specific knowledge of how each modification will affect pump performance.

| Modification | Typical purpose | General performance effect | 
|---|---|---|
|Vane and shroud trimming | Typical method for radial-flow enclosed and semi-open impellers | Done to reduce head and flow to meet rated point; limit to 5% when applying affinity rules |
| Vane trimming while leaving one or both shrouds larger | Maintain radial gap, support thrust-balance geometry, or alter curve slope | May reduce efficiency slightly because of increased disk friction | 
| Shroud trimming while leaving vanes larger | Address drooping pump curve near shutoff | Can increase shutoff head; may reduce efficiency | 
| V-cutting vanes | Adjust higher-flow performance while preserving shutoff head or vane overlap | Reduces flow and head more aggressively at higher flow | 
| Angle trimming | Trim to mean diameter for mixed flow or Francis-vane type geometry | Angle change may adjust curve slope; decreased angle tends to flatten curve; increased angle tends to steepen curve | 
| Underfiling | Increase vane passage area by removing material on underside of vane trailing edge | Shifts BEP toward higher flow and can increase head/flow to meet a rating | 
| Overfiling | Thins blunt trailing edge by removing material on the top side of vane trailing edge | Minimal hydraulic performance change; may reduce vane-pass pulsation and related vibration | 

### References

- ANSI/HI 14.3
- ANSI/HI 14.6
- *Centrifugal and Axial Flow Pumps* by A.J. Stepanoff
