-----
title: G) Positive Displacement Pump Principles
tabtitle: Pump Principles - Rotary and Reciprocating pumps | HI Data Tool 
date: August 31, 2026
description: Update
-----

# Positive Displacement Pump Principles

This section explains how positive displacement (PD) pumps establish flow, why actual delivery differs from theoretical displacement, and the inlet pressure, discharge pressure, over-pressure-protection, and torque conditions required for safe operation. These principles apply to both reciprocating and rotary pumps which are discussed in the following sections.

### Positive Displacement (PD) Pump Overview

PD pumps include **rotary** and **reciprocating** types. They transfer liquid by repeatedly trapping and displacing a defined volume from suction to discharge. Each pumping cycle creates a change in chamber volume or moves a bounded volume of liquid toward the discharge. Theoretical flow is determined by pump displacement and operating speed. Actual delivered flow can be lower because of internal leakage, called slip, and can also be affected by inlet conditions, fluid properties, clearances, and wear.

A PD pump does not create a fixed discharge pressure independently of the system. Instead, it develops the differential pressure required to move the flow through the connected system, within it's design limits. If the discharge path is restricted or closed, the pump continues to displace liquid and pressure can rise rapidly. Suitable overpressure protection is therefore an essential part of every PD pumping system.

=atag=
Reciprocating pumps
=atag=
### Reciprocating Pumps
**Reciprocating pumps** use linear motion of pistons, plungers, diaphragms, or bellows to draw liquid into and discharge liquid from one or more pumping chambers. Inlet and discharge valves control the direction of flow as chamber volume increases and decreases to limit back flow. The resulting flow is inherently cyclic, so pulsation, acceleration pressure, inlet piping, valve behavior, and pressure protection are important application considerations.

The reciprocating categories introduced in the [PD Pump Types](./positive-displacement-pump-types-phase3) section are air-operated, direct acting (steam), power, and controlled-volume metering pumps. Although their drives and pumping elements differ, each relies on repeated filling and emptying of a defined pumping chamber volume. Displacement is normally expressed per stroke or per complete pumping cycle.

=atag=
Rotary Pumps
=atag=
### Rotary Pumps
**Rotary pumps** introduced in the [PD Pump Types](./positive-displacement-pump-types-phase3) section use rotating elements such as gears, screws, vanes, pistons, flexible member, or lobes within a pumping chamber. These elements form moving cavities or sealed volumes that carry liquid from inlet to outlet. Rotary pumps generally use close running clearances and do not use separate inlet and outlet valves as part of the basic pumping principle.

The continuous rotation of the pumping elements usually produces a steadier flow than a reciprocating mechanism, but the flow is still created by successive displacement events and may contain pulsation. Rotor geometry, clearances, timing, number of pumping elements, speed, viscosity, and differential pressure all influence delivered flow and operating behavior.

### Rotor Types
In rotary pumps, the rotor or rotating assembly establishes the moving boundaries that form and transport pumping chambers. Rotor types vary and the form determines how the chamber opens to the inlet, becomes isolated, travels through the pump, and opens to the discharge. The detailed rotor arrangements used by sliding-vane, axial-piston, flexible-member, lobe, gear, circumferential-piston, and screw pumps are described in the [PD Pump Types](./positive-displacement-pump-types-phase3) section.

Some pumps use a single rotor working against the casing or another stationary member. Others use two or more rotors that may mesh, run at close clearance, or be synchronized by external timing gears. Flexible members may deform to create changing chamber volume, while rigid rotors depend on their shape and close running clearances.

Rotor design influences displacement, sealing, pulsation, allowable speed, shear, solids-handling capability, and sensitivity to viscosity and wear. Timed rotors do not rely on direct contact to maintain relative position; untimed pumps may use direct engagement between rotors or another means of transferring torque. These design differences also establish the principal leakage paths that contribute to slip.

### Displacement and Flow Rate

=atag=
Displacement and Flow
=atag=

**Displacement** is the volume that can theoretically be moved by the pump during one pumping cycle. Theoretical displacement is a geometric quantity. It is established by chamber dimensions and the motion of the pumping elements, without deducting internal leakage or losses caused by incomplete filling. For a rotary pump, displacement is normally stated as the volume displaced per revolution of the pump shaft. For a reciprocating pump, it is more naturally stated per stroke or per complete cycle and may be based on one or more pumping chambers.

**Theoretical flow rate** is the pump displacement multiplied by the number of pumping cycles per unit time. For rotary pumps, this relationship is commonly expressed using displacement per revolution and rotational speed. For reciprocating pumps, it is expressed using displacement per stroke or cycle and the corresponding stroke or cycle rate.

**Actual flow rate** delivered is the liquid volume delivered per unit time under the stated operating conditions. It is lower than theoretical flow rate due to liquid leaking through internal clearances (slip) and when the pumping chamber does not fill completely. At a fixed displacement, theoretical flow rate increases with speed, but the actual flow rate is affected by slip, inlet conditions, liquid properties, and operating limits.

**fixed-displacement** pumps move essentially the same theoretical volume during each cycle. Its flow is therefore controlled mainly by speed. Some rotary and reciprocating pumps can have variable-displacement. 

**Variable-displacement** ppumps change the theoretical volume moved per cycle by changing the geometry or effective stroke of the pumping mechanism. They are commonly rated at their maximum displacement, and delivered flow can be varied by changing displacement, speed or both within the design and operating limits.

### What is Slip?
=atag=
Slip and Volumetric Efficiency
=atag= 

Slip is the quantity of liquid that leaks through a pump's internal clearances per unit time instead of contributing to delivered flow. The leakage is generally from a region of higher pressure toward a region of lower pressure. Slip causes actual flow to be lower than theoretical flow and is one of the principal contributors to reduced volumetric efficiency.

The amount of slip depends on the size and geometry of the leakage paths, differential pressure, liquid viscosity and other liquid characteristics, pump speed, temperature, and the condition of internal components. Increasing differential pressure generally increases leakage. Higher viscosity generally reduces leakage through a given clearance, although viscosity also affects inlet losses and the ability of the pumping chamber to fill.

Leakage paths differ by pump type. Rotary pumps may leak across rotor-to-casing, rotor-to-rotor, or axial clearances. Reciprocating pumps may lose delivered volume through inlet or discharge valves and around pistons, plungers, seals, or other chamber boundaries. Wear that enlarges these paths can increase slip and reduce delivered flow.

### Volumetric Efficiency
Pump volumetric efficiency is defined in [Eq. 1.G.1](#eq1g1). It compares actual delivered pump flow with theoretical flow at the same displacement and speed. Volumetric efficiency equals actual flow divided by theoretical flow expressed as a percent. The relationship provides a convenient measure of how effectively the pump converts geometric displacement into delivered liquid volume.

<div class="equation-label"><a id="eq1g1"></a>Eq. 1.G.1 Volumetric efficiency</div>

=+=
[units us]

$$ η_{v} = {231 · Q \over D · n}  $$
=+=

=+=
[units metric]

$$ η_{v} = {10^6 · Q \over 60 · D · n}  $$
=+=

Where:

- Q is flow rate <units us = "(gpm)" metric = "(m<sup>3</sup>/h)"/>
- D is pump displacement per revolution <units us = "(in<sup>3</sup>)" metric = "(cm<sup>3</sup>)"/>
- n is rotational speed (rpm)

Volumetric efficiency is reduced by slip and can also be reduced when the pumping chamber does not fill completely. It can therefore vary with differential pressure, viscosity, clearances, speed, inlet pressure, liquid vapor pressure, entrained gas, temperature, and pump wear. The operating conditions associated with a stated volumetric efficiency should be identified.

Volumetric efficiency is a flow-efficiency measure. It is not the same as pump efficiency, which also includes mechanical and other power losses. A pump can maintain high volumetric efficiency while still experiencing significant mechanical loss, or it can operate mechanically well while delivering less flow because of leakage or incomplete filling.

=atag=
Net Positive Inlet Pressure
=atag=

### Net Positive Inlet Pressure (NPIP)

Net positive inlet pressure available (**NPIPA**) in [Eq. 1.G.2](#eq1g2), describes the pressure available at the pump inlet above the liquid vapor pressure, evaluated on an absolute-pressure basis.

In reciprocating systems, the instantaneous pressure at the pump inlet can be affected by cyclic flow and the associated acceleration pressure in the suction piping. In rotary systems, inlet piping losses, speed, viscosity, and the time available for chamber filling can be important. In either case, inlet conditions should be evaluated at the pump connection and for the actual liquid temperature and vapor pressure.

<div class="equation-label"><a id="eq1g2"></a>Eq. 1.G.2 Volumetric efficiency</div>

=+=

$$ NPIPA = p_{s}+p_{atm}-p_{vp}-p_{acc} $$
=+=

Where:

- *p*<sub>s</sub> is inlet gauge pressure <units us = "(psig)" metric = "(kPa)"/>
- *p*<sub>atm</sub> local atmospheric pressure <units us = "(psi)" metric = "(kPa)"/>
- *p*<sub>vp</sub> is liquid absolute vapor pressure <units us = "(psia)" metric = "(kPa abs)"/>
- *p*<sub>acc</sub> is **reciprocating pump** acceleration pressure <units us = "(psi)" metric = "(kPa)"/> 
- **Note:** *p*<sub>acc</sub> is not applied to **rotary pumps**.

Net positive inlet pressure required (**NPIPR**), is the inlet-pressure margin above vapor pressure required for the pumping chamber to fill while it is open to the inlet at the applicable speed, differential pressure, liquid, and operating conditions.

NPIPA must meet or exceed the manufacturer's NPIPR for the selected operating condition. When inlet pressure is insufficient, liquid may vaporize or the pumping chamber may not fill completely. The resulting effects can include reduced flow, noise, rough operation, cavitation, vibration, accelerated wear, and damage.

### How are NPIP and NPSH related?

NPIP and net positive suction head (NPSH), describe related inlet-pressure margins using different units. NPIP is expressed as pressure, while NPSH expresses the corresponding energy per unit weight as a height of liquid. The available and required forms should not be mixed: NPIPA is compared with NPIPR, and NPSHA is compared with NPSHR.

The relationship between NPIP and NPSH is shown in [Eq. 1.G.3](#eq1g3).

<div class="equation-label"><a id="eq1g3"></a>Eq. 1.G.3 NPIP and NPSH</div>
=+=
[units us]

$$ NPIP = 0.433 ·NPSH·s$$
=+=

=+=
[units metric]

$$ NPIP = 9.8 ·NPSH·s$$
=+=
Where:

- NPIP is net positive inlet pressure <units us = "(psi)" metric = "(kPa)"/>
- NPSH is net positive suction pressure <units us = "(ft)" metric = "(n)"/>
- *s* is specific gravity

=atag=
Over Pressure Protection
=atag=

### Why is Over Pressure Protection Is Required?

A positive displacement pump continues to displace liquid when the discharge path is restricted or closed. Because liquid is only slightly compressible, pressure can rise rapidly until a component fails, the driver stalls, or a protective device opens. The pump and the connected piping system therefore require pressure protection for every operating condition, including startup, shutdown, blocked discharge, and unintended valve closure.

### Pressure Relief Valves and Bypass Arrangements

A relief valve may be integral to the pump or installed externally in the discharge system. The selected arrangement must protect both the pump and the piping or equipment that can be isolated from the relief path. The relief path, set pressure, capacity, and return location should be appropriate for the pump's maximum flow, operating speed, liquid, temperature, and system design.

An integral relief or bypass valve commonly recirculates liquid from the discharge side to the suction side within the pump. It can protect the pump from a short-duration pressure excursion, but it may not protect downstream piping and is generally not suitable for extended operation against a closed discharge. Internal recirculation converts input power to heat and can rapidly increase the temperature of both the liquid and the pump.

An external relief valve can be arranged to return liquid to a vessel or another safe location. When discharge is recycled to the pump inlet, the design should prevent excessive temperature rise and ensure adequate inlet conditions. A control or operating valve is not a substitute for a relief or bypass valve.

=atag=
Torque
=atag=

### Starting or Breakaway Torque

Starting or breakaway torque is the turning force required to initiate shaft rotation. It may be higher than the torque required after the pump is running because stationary seals, close clearances, liquid viscosity, settled solids, static differential pressure, and the position of the pumping elements can resist initial motion. The driver and coupling must provide sufficient torque to start the pump under the most demanding anticipated condition.

### Running Torque

Running torque is the turning force required to maintain rotation at the selected speed, differential pressure, viscosity, and mechanical condition. For a given displacement and differential pressure, a PD pump behaves approximately as a constant-torque machine over its normal operating-speed range. Required torque increases as differential pressure increases and can also be affected by viscosity, friction, pump wear, and mechanical losses.

### Constant-Torque Behavior and Power

Because torque remains approximately constant at a fixed differential pressure, the power required by the pump increases with speed. A reduction in speed reduces pump flow and power required but does not proportionally reduce the torque required to overcome the same differential pressure. This Constant Torque behavior is important when selecting motors, variable-speed drives, gear reducers, couplings, and torque-limiting devices.

### Driver Sizing

The driver should be sized for the highest torque and power that can occur within the permitted operating range, including startup and relief-valve operation where applicable. Driver selection should account for maximum displacement, maximum operating speed, maximum allowable differential pressure, liquid viscosity and temperature, mechanical efficiency, service factor, and transient conditions. The complete drive train should be evaluated so that no component becomes the unintended means of overpressure protection.

Pump curves and performance data should be used to confirm the manufacturer's torque and power requirements at the intended duty point. The relationship among displacement, speed, differential pressure, torque, and power is developed further in [PD Pump Curves](./positive-displacement-pump-curves-phase3) section.


