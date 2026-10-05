import type { CaseDef } from "./types";

export const engineeringCases: CaseDef[] = [
  // 1. Mechanical: cracked shaft
  {
    t: "Case: Cracked gearbox output shaft at Harlow Conveyors",
    opening:
      "Harlow Conveyors runs a bulk-material conveyor driven by a gearbox. Three output shafts have fractured in the last 14 months, each after roughly 8 to 11 months of service. You are the failure analysis engineer. Management wants a root cause and a fix that does not require redesigning the whole gearbox.",
    d: 2,
    discipline: "mechanical",
    tp: "fatigue-failure",
    tp2: "machine-design",
    stages: [
      {
        title: "Structure the investigation",
        kind: "structure",
        prompt:
          "How would you structure the investigation? Say what you would ask for and what you would look at on the failed parts before forming a hypothesis.",
        data: [
          { label: "Operating conditions", content: "Shaft speed 90 rpm, 16 hours a day. Torque is steady at about 2.1 kN.m with start-stop cycles about 12 times a day. A belt-tracking issue causes a side load on the overhung sprocket." },
          { label: "Fracture surface observations", content: "Crack started at the shoulder fillet where the 40 mm shaft steps up to a 50 mm bearing seat. Beach marks fan out from one point on the surface. A small final-fracture zone, about 10 percent of the area. No signs of corrosion pits." },
          { label: "Material and geometry", content: "Medium-carbon steel, 40 mm diameter at the fillet, fillet radius 2 mm, ground finish. Hardness uniform, within specification." },
          { label: "What has been tried", content: "Each failure was treated as a one-off. The shaft was replaced with an identical part from the same supplier. No design change." }
        ],
        ideal:
          "Start by classifying the failure mode from the fracture surface rather than guessing. Beach marks, a single origin and a small final-fracture zone point to high-cycle fatigue under low nominal stress, not overload. Then ask about the loading (rotating bending from the overhung side load gives fully reversed stress even if torque is steady), the geometry at the origin (a sharp 2 mm fillet is a stress concentrator), surface finish, material certificates, and any change in the process. Collect the time to failure to estimate the number of cycles and plan to check hardness and chemistry. Build the hypothesis that a fillet-origin rotating-bending fatigue crack is the cause, then quantify with a stress calculation before recommending a fix.",
        c: [
          "Classify the failure mode first (fatigue vs overload vs corrosion) from the fracture surface",
          "Interpret beach marks, single origin and small final-fracture zone as high-cycle fatigue at low nominal stress",
          "Ask about loading: steady torque but a side load produces fully reversed bending in a rotating shaft",
          "Identify the fillet as the likely stress concentration and ask about radius and surface finish",
          "Request material certificates, hardness and chemistry to rule out a bad batch",
          "Count cycles to failure from rpm and operating hours to judge the stress level"
        ],
        k: [
          "Same-part replacement repeated a design weakness, so the root cause is in design or loading, not the supplier",
          "Rotating shaft with a fixed side load sees one fully reversed bending cycle per revolution"
        ],
        m: [
          "Jumping to bolt-on fixes (bigger shaft everywhere) without identifying the failure mode",
          "Treating steady torque as steady stress and ignoring the rotating bending"
        ]
      },
      {
        title: "Interpret the evidence",
        kind: "analysis",
        prompt:
          "Here are the lab results and service history. What do they tell you about the cause and the stress level?",
        exhibit:
          "Shaft  Service months  Cycles (approx)   Origin location      Final fracture zone\n  A       8.5           1.9e7          fillet, side load     10 pct\n  B      10.5           2.3e7          fillet, side load      9 pct\n  C       9.0           2.0e7          fillet, side load     11 pct\n\nHardness: 245 HB, uniform.   Surface: ground, Ra 0.8 um.\nBending moment at the fillet from sprocket side load: 600 N.m (fully reversed per revolution).\nFillet geometry: D/d = 50/40, r/d = 0.05, theoretical Kt for bending about 2.1.\nNotch sensitivity at this radius and material: q about 0.85.\nCorrected endurance limit of the shaft (surface, size, reliability applied): 170 MPa.",
        ideal:
          "All three failures start at the same fillet with the same fracture signature and similar cycle counts near 2e7, so this is systematic fatigue and not a defective batch. The hardness is uniform and in specification, which supports that. The cycles to failure are above 1e7, so the nominal stress is not wildly high; the fillet concentrates it. With Kt of 2.1 and notch sensitivity 0.85 the fatigue stress concentration factor is about 1.9, and the local alternating stress will be close to the corrected endurance limit, which explains failure in the 1e7 to 2e7 range. Next step is to compute the nominal bending stress and the safety factor against the endurance limit.",
        c: [
          "Same origin, same signature and similar cycle count across three shafts means a systematic cause",
          "Uniform in-spec hardness argues against a material or heat-treatment defect",
          "Failure above 1e7 cycles indicates local stress near the endurance limit, i.e. high-cycle fatigue",
          "Kf = 1 + q(Kt - 1) is the right correction, not full Kt, because of notch sensitivity",
          "Plan a nominal stress calculation using d = 40 mm and M = 600 N.m, then compare with 170 MPa",
          "Suggest checking sprocket side load source (belt tracking) as the driver of bending"
        ],
        k: [
          "Wear-out at 2e7 cycles close to the endurance knee implies the safety factor is near or below 1",
          "Fatigue strength, not static yield, is the governing criterion for the shaft"
        ],
        m: ["Comparing the stress to yield strength and concluding the shaft is safe", "Using Kt directly with no notch sensitivity"]
      },
      {
        title: "Nominal bending stress",
        kind: "math",
        prompt:
          "Compute the nominal bending stress amplitude at the 40 mm section for a 600 N.m fully reversed moment, ignoring the stress concentration. Use sigma = 32 M / (pi d^3). Give MPa.",
        ideal:
          "For a solid round section the section modulus is pi d^3 / 32, so sigma = 32 x 600 / (pi x 0.04^3) = 19200 / 2.0106e-4, about 95.5 MPa. This is the nominal amplitude before any concentration factor. It is well below yield for a medium-carbon steel, which is why the failure is a fatigue problem rather than an overload problem, and it is about 56 percent of the 170 MPa corrected endurance limit before the fillet is considered.",
        c: [
          "Use S = pi d^3 / 32 with d in metres",
          "32 x 600 / (pi x 0.04^3) gives about 95.5 MPa",
          "State that this is the nominal stress without the concentration factor",
          "Compare to the 170 MPa endurance limit as a fraction",
          "Keep units consistent (N.m and m give Pa)"
        ],
        k: ["Nominal stress alone looks safe, which is why the problem was missed", "The result is the amplitude since the load is fully reversed (mean stress zero)"],
        m: ["Using d in mm with N.m and getting a result off by orders of magnitude", "Using pi d^3 / 16 which is the torsion formula"],
        answer: { value: 95.5, unit: "MPa", tolerance: 0.03 }
      },
      {
        title: "Safety factor at the fillet",
        kind: "math",
        prompt:
          "Apply the fatigue stress concentration factor from the exhibit (Kt = 2.1, q = 0.85) to the nominal stress you found, then compute the fatigue safety factor against the 170 MPa corrected endurance limit. Give the dimensionless safety factor.",
        ideal:
          "Kf = 1 + 0.85 x (2.1 - 1) = 1.935. The local alternating stress is 1.935 x 95.5 = 184.8 MPa. With fully reversed loading the safety factor is Se / sigma_a = 170 / 184.8, about 0.92. A factor below 1 means the shaft is designed to fail by fatigue, and a life of order 1e7 to 2e7 cycles is consistent with being just above the knee. The design had effectively no margin, so it is a design error and not bad luck.",
        c: [
          "Kf = 1 + q (Kt - 1) = 1.935",
          "Local alternating stress about 184.8 MPa",
          "Fully reversed so mean stress is zero and n = Se / sigma_a",
          "Safety factor about 0.92, below 1, explaining the failures",
          "Interpret n below 1 as a design with no fatigue margin"
        ],
        k: ["The fillet concentration moves the shaft from comfortably safe to over the endurance limit", "A target safety factor of 1.5 to 2 would need a much lower local stress"],
        m: ["Applying Kt (2.1) and getting n of 0.85", "Forgetting to apply Kf and reporting n of 1.78"],
        answer: { value: 0.92, unit: "", tolerance: 0.03 }
      },
      {
        title: "Recommend the fix",
        kind: "synthesis",
        prompt:
          "What do you recommend to stop the failures, what are the trade-offs, and how would you verify the fix works?",
        ideal:
          "Root cause: high-cycle fatigue from rotating bending at an under-sized 2 mm fillet, with a safety factor of about 0.92. Fastest fix: increase the fillet radius (for example to 5 mm, which cuts Kt to about 1.6) with an undercut relief or stress-relief groove if the bearing seat needs a sharp corner, add a shot-peened or rolled fillet, and fix the belt-tracking issue that creates the side load. Option two is a larger shaft diameter, which is more expensive and ripples into bearing and seal choices. Verify by recalculating n (target at least 1.5), strain-gauge measuring the actual bending moment in service, running a rotating-beam test on the new geometry, and introducing a scheduled crack inspection (magnetic particle) while the fix proves out. Risks: bearing seat shoulder height becomes too small for the larger radius, and peening can distort a ground surface.",
        c: [
          "Name fatigue at the fillet as the root cause with the 0.92 safety factor as evidence",
          "Increase fillet radius or add a relief groove to reduce Kt",
          "Use surface treatment such as shot peening or fillet rolling",
          "Fix the source of side load (belt tracking) to reduce the bending moment",
          "Verification: recompute with target n of 1.5 or more, strain-gauge the real load, fatigue test, NDT inspections",
          "Trade-offs: bearing shoulder height, cost, delivery time, possible distortion"
        ],
        k: ["Reduce stress at the source and at the concentration, and measure rather than assume the loading", "Interim inspections protect safety until the fix is proven"],
        m: ["Recommending only a stronger material, which barely changes fatigue strength of steels at a given hardness", "No verification plan"]
      }
    ]
  },

  // 2. Mechanical: enclosure thermal
  {
    t: "Case: Thermal design of a sealed outdoor controller enclosure",
    opening:
      "A start-up is shipping a sealed, fanless outdoor controller. In pilot units installed in summer, the main power module shuts down on over-temperature. The enclosure is a painted aluminium box. You are asked to find out whether the thermal design can be saved without adding a fan.",
    d: 2,
    discipline: "mechanical",
    tp: "heat-transfer",
    stages: [
      {
        title: "Frame the thermal problem",
        kind: "structure",
        prompt: "How would you frame the thermal problem and what would you ask for before calculating anything?",
        data: [
          { label: "Operating conditions", content: "Outdoor, shaded mounting, ambient up to 35 C. Sealed to IP66, so no ventilation holes. Total internal dissipation 90 W." },
          { label: "Constraints", content: "Fanless is a hard requirement. Component limit: the power module case must stay below 85 C. Box is fixed at 0.6 m2 total external surface area, painted with emissivity about 0.9." },
          { label: "What has been tried", content: "Engineers added a thermal pad between the power module and the lid. Over-temperature trips still happen at 35 C ambient." },
          { label: "Measured data", content: "In the field, wall temperature measured about 50 C and the power module reached 90 C at 35 C ambient." }
        ],
        ideal:
          "Treat it as a heat path problem: heat flows from the component to internal air or the lid, through the wall, and to ambient by natural convection and radiation. I would ask for the power dissipation breakdown (which part generates the heat), the allowed temperature at the hottest component, ambient design point, enclosure area and finish, sun loading if any, and measurements at each point of the chain to see which resistance dominates. Build a thermal resistance network: component to case, case to internal air, internal air to wall, wall to ambient, and check whether the problem is the external film or internal spreading. Then size each segment, compare with the 85 C limit, and propose the cheapest fix at the dominant resistance.",
        c: [
          "Draw the heat path from component to ambient as a series of thermal resistances",
          "Ask for the dissipation, hot component limit and design ambient",
          "Account for both natural convection and radiation on the outside surface",
          "Consider solar load for an outdoor box",
          "Use measurements along the path to find the dominant resistance",
          "Check which segment (internal or external) a fix would act on"
        ],
        k: ["A thermal pad only helps the component-to-lid segment, not the outer film", "Radiation matters for painted surfaces in natural convection and must be included"],
        m: ["Considering only convection and ignoring radiation", "Adding a fan despite the stated constraint"]
      },
      {
        title: "Read the thermal measurements",
        kind: "analysis",
        prompt: "Here are the field measurements. Where is the heat path limiting, and does the external side look reasonable?",
        exhibit:
          "Point                       Temp (C)\nAmbient                        35\nExternal wall (average)        50\nInternal air (hot spot)        59\nPower module case              90\n\nTotal dissipation: 90 W, of which the power module is 12 W.\nExternal surface 0.6 m2.  Natural convection h_conv about 5 W/m2K.  Radiation h_rad about 5 W/m2K (painted, e = 0.9).\nWall-to-internal-air resistance: about 0.1 K/W.\nPower module to internal air: about 2.8 K/W.",
        ideal:
          "The external wall is only 15 K above ambient, which is what you would expect for a 0.6 m2 box dissipating 90 W with a combined film coefficient near 10 W/m2K, so the outside is behaving as predicted. Internal air is 9 K above the wall, again matching 90 W through 0.1 K/W. The big jump is the 31 K step from internal air to the power module case, which is the module dissipating 12 W through a 2.8 K/W path. The limiting segment is internal, between the component and the sealed air, so adding surface area outside would help little while improving the conduction path from the module to the lid would help a lot. The measured 90 C module case is therefore explained by the three temperature steps stacking.",
        c: [
          "External wall rise of 15 K is consistent with 90 W over 0.6 m2 at about 10 W/m2K",
          "Internal air to wall step of 9 K agrees with 90 W x 0.1 K/W",
          "The largest step is 31 K from internal air to the module case",
          "Conclusion: component-to-air resistance of 2.8 K/W is the problem",
          "Radiation is as large as convection, so the finish matters",
          "Fix should target conduction from the module to the enclosure, not external area"
        ],
        k: ["A series network adds the temperature rises, so find the largest step", "Component-to-air is poorly coupled because still air in a sealed box is a poor medium"],
        m: ["Blaming the external convection when the outside is behaving as predicted", "Ignoring that the 12 W module is the hot spot, not the 90 W total"]
      },
      {
        title: "Wall temperature rise",
        kind: "math",
        prompt:
          "Using the exhibit values, compute the steady-state rise of the external wall above ambient: 90 W, 0.6 m2, h_conv = 5 and h_rad = 5 W/m2K acting in parallel on the outer surface. Give kelvin.",
        ideal:
          "Convection and radiation act in parallel from the same surface, so the combined coefficient is 10 W/m2K. Q = h A dT gives dT = 90 / (10 x 0.6) = 15 K, so the wall is at 50 C when ambient is 35 C. If you wrongly used convection alone, you would get 30 K, which would mean painting the box and exposing it to radiation is worth 15 K of wall temperature. This result matches the measurement, which validates the model.",
        c: [
          "Parallel mechanisms: h_total = h_conv + h_rad = 10 W/m2K",
          "dT = Q / (h A) = 90 / (10 x 0.6)",
          "Result is 15 K, giving a 50 C wall",
          "Compare with the measured 50 C to validate the model",
          "Note convection alone would give 30 K"
        ],
        k: ["Modelling validation by comparison with data builds trust before the design change", "Radiation is as important as convection for natural convection on painted metal"],
        m: ["Adding the two coefficients incorrectly or forgetting area", "Reporting the wall temperature (50 C) instead of the rise"],
        answer: { value: 15, unit: "K", tolerance: 0.03 }
      },
      {
        title: "Module case temperature",
        kind: "math",
        prompt:
          "Now compute the power module case temperature at 35 C ambient: wall from your result, internal air above wall by 90 W x 0.1 K/W, and the module 12 W x 2.8 K/W above internal air. Give degrees Celsius.",
        ideal:
          "Wall = 35 + 15 = 50 C. Internal air = 50 + 90 x 0.1 = 59 C. Module case = 59 + 12 x 2.8 = 59 + 33.6 = 92.6 C. That is 7.6 K above the 85 C limit and consistent with the 90 C field reading, and at hotter ambient it would be worse. The margin must be recovered by lowering the 2.8 K/W path: for instance to 1.9 K/W or less would give 59 + 22.8 = 81.8 C, a 3 K margin, and a bonded heat spreader to the lid is the natural way.",
        c: [
          "Wall temperature 50 C from the previous result",
          "Internal air = 50 + 90 x 0.1 = 59 C",
          "Module = 59 + 12 x 2.8 = 92.6 C",
          "7.6 K above the 85 C limit",
          "Compute the required resistance to reach 85 C or lower"
        ],
        k: ["Series resistance chain: sum the temperature steps", "The internal path is where an improvement is cheapest"],
        m: ["Using 90 W through the 2.8 K/W path instead of 12 W", "Forgetting the internal air rise"],
        answer: { value: 92.6, unit: "C", tolerance: 0.02 }
      },
      {
        title: "Recommend a design fix",
        kind: "synthesis",
        prompt: "What design changes would you recommend, with trade-offs and a verification plan?",
        ideal:
          "The module is 7.6 K over the limit and the dominant resistance is internal. Recommendation: mount the module directly onto the lid with a thermally conductive interface and a copper or aluminium heat spreader, replacing the 2.8 K/W air path with roughly 1 K/W, which would put the module near 59 + 12 = 71 C. Add external fins or a bonded heat sink on the lid area above the module to lower the lid temperature locally and keep the paint high emissivity. Consider a sun shield for outdoor solar load, which can add many kelvin of wall temperature. Trade-offs: extra mass and cost, mechanical stress on the module from rigid mounting, and keeping IP66 sealing. Verify with a thermal chamber test at 35 C ambient (add margin for 40 C and solar load), thermocouples at the module, lid and air, and reliability checks for long-term pad pump-out.",
        c: [
          "Reduce the component-to-lid resistance with direct conductive mounting",
          "Quantify the expected module temperature after the change",
          "Keep high-emissivity paint and consider fins or a sun shield",
          "Account for solar loading and a higher design ambient",
          "Verification: thermal chamber test with thermocouples and margin",
          "Trade-offs: cost, mass, sealing, mounting stress"
        ],
        k: ["Spend effort where the resistance is largest", "Design to a margin, not to the exact limit, because ambient and sun vary"],
        m: ["Adding a fan despite the constraint", "Increasing the box size without addressing the internal path"]
      }
    ]
  },

  // 3. Aerospace: satellite power budget
  {
    t: "Case: Power budget for a small Earth-observation satellite",
    opening:
      "A team is designing a small satellite in a low Earth orbit with a 96-minute period. Early analysis suggests the solar array and battery are oversized relative to the mass budget, but the electrical lead is not sure. You are asked to size the power subsystem and judge the mass trade-offs.",
    d: 3,
    discipline: "aerospace",
    tp: "spacecraft-systems",
    stages: [
      {
        title: "Define the power problem",
        kind: "structure",
        prompt: "What do you need to know to size a solar array and battery, and how would you structure the work?",
        data: [
          { label: "Orbit", content: "Circular LEO, period 96 minutes, eclipse 35 minutes per orbit, sunlit 61 minutes." },
          { label: "Loads", content: "Sunlit average load 220 W (payload imaging on). Eclipse average load 180 W (payload standby, heaters on)." },
          { label: "Power system efficiencies", content: "Battery discharge path efficiency 0.90. Battery charge path efficiency 0.85. Array end-of-life degradation already included in the required array power." },
          { label: "Battery constraint", content: "Maximum depth of discharge 30 percent for a 5-year mission to protect cycle life (about 28,000 cycles)." },
          { label: "Constraints", content: "Array power must cover loads and recharge the battery every orbit. Power system mass target is below 18 kg." }
        ],
        ideal:
          "Break it into the energy balance per orbit. In eclipse the battery supplies the load, so the energy is load x eclipse duration, divided by discharge efficiency. In sunlight the array must supply the sunlit load plus recharge the battery, with the recharge energy including the charge efficiency. Size the battery from the eclipse energy and the allowed depth of discharge, since cycle life drives it in LEO, and size the array from the average power over the sunlit period. I would ask for orbit parameters, the load profile, efficiencies, depth of discharge limits, end-of-life degradation, and mass targets. Then check pointing losses and temperature effects, and check margin against the mass budget.",
        c: [
          "Energy-balance per orbit: eclipse energy from the battery, sunlit energy from the array",
          "Include charge and discharge efficiencies",
          "Battery sizing from depth of discharge and cycle life (5 years of LEO cycling)",
          "Array sizing at end of life, including degradation and the sunlit duration",
          "Ask for eclipse duration, load profile and mass budget",
          "Include a design margin and check sun angle and temperature effects"
        ],
        k: ["In LEO the battery is cycled about 5,500 times a year, so DoD sets the capacity, not the energy alone", "Array power must be sized on the sunlit fraction, which is shorter than the orbit"],
        m: ["Sizing the array on orbit-average power ignoring the eclipse recharge", "Ignoring efficiencies"]
      },
      {
        title: "Read the load and orbit budget",
        kind: "analysis",
        prompt: "Here is the preliminary budget. What stands out, and which assumptions would you challenge before sizing?",
        exhibit:
          "Mode           Sunlit load (W)   Eclipse load (W)\nPayload imaging       95               0 (standby 15)\nBus avionics          55              55\nComms (avg)           30              30\nADCS                  25              25\nHeaters/thermal       15              55\nTotal                220             180\n\nOrbit period: 96 min.  Eclipse: 35 min.  Sunlit: 61 min.\nEfficiencies: discharge 0.90, charge 0.85.\nMax DoD 30 percent.",
        ideal:
          "The eclipse load of 180 W is almost as high as the sunlit load, which is unusual: heaters rise from 15 W to 55 W because the spacecraft cools in eclipse, and the 55 W bus avionics is a fixed load. That is the main driver for battery size and array size. The imaging payload is only on in sunlight, which is good. I would challenge the heater duty (can insulation or a duty-cycled strategy reduce it), whether payload standby really needs 15 W, and whether comms can be moved to sunlit passes. Every watt in eclipse costs more than one watt of array because of the round-trip efficiency (0.9 x 0.85 = 0.765) and the shorter sunlit window. Before sizing, the cheapest mass saving is on the eclipse load.",
        c: [
          "Eclipse load 180 W is high relative to sunlit 220 W; heaters drive the difference",
          "Round-trip battery efficiency is 0.9 x 0.85 = 0.765",
          "Reducing eclipse load saves both battery and array mass",
          "Challenge heater duty, payload standby and comms scheduling",
          "Imaging payload is sunlit only, which is favourable",
          "Compute eclipse energy as the sizing driver"
        ],
        k: ["Eclipse watts are more expensive than sunlit watts because they pass through the battery", "Load scheduling is cheaper than extra hardware"],
        m: ["Ignoring the heater increase in eclipse", "Treating loads as flat across the orbit"]
      },
      {
        title: "Battery capacity",
        kind: "math",
        prompt:
          "Compute the minimum battery capacity in Wh. Eclipse load 180 W for 35 minutes, discharge efficiency 0.90, maximum depth of discharge 30 percent. Give watt-hours of nameplate capacity.",
        ideal:
          "Eclipse energy delivered to the load: 180 W x 35/60 h = 105 Wh. The battery must supply 105 / 0.90 = 116.7 Wh of stored energy. At a maximum depth of discharge of 30 percent, nameplate capacity is 116.7 / 0.30 = 388.9 Wh, about 389 Wh. Note that this is nearly 4 times the energy of one eclipse, because the 30 percent DoD limit exists to achieve cycle life. Relaxing DoD to 40 percent would cut capacity to 292 Wh but shorten life, and adding extra margin on top would raise mass. A lithium-ion cell pack at roughly 150 Wh/kg would weigh about 2.6 kg at this capacity.",
        c: [
          "Eclipse energy = 180 W x 35/60 h = 105 Wh",
          "Divide by discharge efficiency 0.90 for 116.7 Wh from the battery",
          "Divide by DoD 0.30 to get 388.9 Wh",
          "Express the sensitivity to DoD and margin",
          "Estimate pack mass at a representative specific energy"
        ],
        k: ["Cycle life, not energy, drives the capacity in LEO", "Efficiency and DoD both inflate the nameplate rating"],
        m: ["Forgetting the depth-of-discharge limit and reporting 117 Wh", "Using the full 96-minute orbit instead of the 35-minute eclipse"],
        answer: { value: 388.9, unit: "Wh", tolerance: 0.03 }
      },
      {
        title: "Required array power",
        kind: "math",
        prompt:
          "Compute the end-of-life array power needed (W). The array supplies 220 W of sunlit load for 61 minutes and recharges the battery with the energy it delivered in eclipse: battery output 116.7 Wh, charge efficiency 0.85. Average the total energy over the 61-minute sunlit period.",
        ideal:
          "Sunlit load energy = 220 W x 61/60 h = 223.7 Wh. Recharge energy needed from the array = 116.7 / 0.85 = 137.3 Wh. Total array energy per orbit = 361.0 Wh over 61/60 h, so required array power is 361.0 / 1.0167 = 355 W at end of life. Beginning-of-life array power would be higher by the degradation margin (for example 355 / 0.85 = 418 W). Sizing on orbit-average power would give only about 225 W, which would flatten the battery within days. Reducing the eclipse load by 20 W would save about 15 W of array and about 43 Wh of battery, again showing that loads dominate mass.",
        c: [
          "Sunlit load energy 220 x 61/60 = 223.7 Wh",
          "Recharge energy 116.7 / 0.85 = 137.3 Wh",
          "Total 361.0 Wh over 61/60 h gives about 355 W",
          "This is the end-of-life value; BOL is larger by degradation",
          "Show that orbit-average sizing would be badly undersized"
        ],
        k: ["The array only works for about 63 percent of the orbit, so power is higher than the average", "Charge efficiency inflates the recharge energy"],
        m: ["Dividing by the full 96 minutes", "Forgetting to add the sunlit load and only counting recharge"],
        answer: { value: 355, unit: "W", tolerance: 0.03 }
      },
      {
        title: "Decide and de-risk",
        kind: "synthesis",
        prompt: "What do you recommend for the power subsystem, what trade-offs and risks remain, and how would you verify?",
        ideal:
          "Recommend a battery of about 390 Wh nameplate (or a standard pack of 400 Wh with margin) and an array delivering at least 355 W at end of life, which at about 15 percent degradation implies roughly 420 W at beginning of life. Cut eclipse load first: improve insulation and heater control, put the payload into a deeper standby, and shift comms to sunlit passes; a 20 W cut reduces both battery and array. Trade-off: a higher DoD saves battery mass but shortens life; deployable panels add mass and complexity but meet the power need. Risks include eclipse season changes (beta angle), battery capacity fade, sun-pointing losses, and a single-string battery failure. Verify with an orbit-resolved power simulation across beta angles, a battery cycle test, an array I-V characterisation at temperature, and a margin policy of about 20 percent at the PDR stage.",
        c: [
          "Give battery size (about 390 Wh) and array size (355 W EOL, higher BOL)",
          "Reduce eclipse loads first, quantifying the savings",
          "Discuss DoD vs life trade-off and deployable array complexity",
          "Identify risks: beta angle variation, capacity fade, pointing loss, single-point failures",
          "Verification: orbit-resolved simulation, battery cycle testing, array characterisation",
          "State a margin policy for the design review"
        ],
        k: ["Reduce demand before adding supply; each eclipse watt is multiplied by efficiencies", "Beta-angle and aging change the worst case over the mission"],
        m: ["Ignoring degradation and aging", "Recommending the average-power array size"]
      }
    ]
  },

  // 4. Electrical: buck converter overheating
  {
    t: "Case: Overheating buck converter in an industrial sensor hub",
    opening:
      "An industrial sensor hub uses a 24 V to 5 V buck converter delivering 4 A. In the field, the converter's catch diode runs very hot and a handful of units have failed. Your team lead asks you to diagnose the cause and propose a fix without changing the board's footprint too much.",
    d: 2,
    discipline: "electrical",
    tp: "power-electronics",
    tp2: "analog-electronics",
    stages: [
      {
        title: "Clarify the converter",
        kind: "structure",
        prompt: "What would you ask about the converter and how would you approach finding the source of the heat?",
        data: [
          { label: "Operating conditions", content: "Vin 24 V nominal, Vout 5 V at 4 A full load. Ambient up to 50 C. Switching frequency 500 kHz." },
          { label: "Topology and parts", content: "Asynchronous buck with a high-side MOSFET (Rds(on) 25 mOhm, rise plus fall time 35 ns total) and a Schottky catch diode (Vf 0.5 V at 4 A) in a small SMA package. Inductor 10 uH." },
          { label: "Constraints", content: "Same PCB footprint area preferred. Cost increase under 1 dollar per unit. Efficiency target above 92 percent." },
          { label: "What has been tried", content: "A bigger copper pour under the diode reduced its temperature by only 5 C." }
        ],
        ideal:
          "Approach it as a loss budget. List the loss mechanisms in an asynchronous buck: high-side MOSFET conduction, MOSFET switching, diode conduction, inductor copper and core losses, and gate-drive. Compute each from the operating point to see which component dissipates the most. Ask for the duty cycle (Vout/Vin), the currents, the diode forward drop, the package thermal resistance and the measured temperatures. The duty cycle here is low (about 21 percent), so the diode conducts about 79 percent of the time, which makes it the likely dominant loss. Verify with measurements: probe the switch node and compare an efficiency measurement against the loss estimate. Then consider alternatives: synchronous rectification, a better diode, or reduced current through the diode.",
        c: [
          "Build a loss budget across MOSFET conduction, switching, diode, inductor",
          "Compute the duty cycle D = Vout / Vin = 0.208",
          "Recognize the diode conducts (1 - D) of the time at low duty cycles",
          "Ask for package thermal resistance and measured temperatures",
          "Consider synchronous rectification as the main alternative",
          "Plan an efficiency measurement to validate the loss estimate"
        ],
        k: ["At a large step-down ratio the catch diode, not the switch, carries most of the average current", "Loss budgets focus effort on the biggest term"],
        m: ["Assuming the MOSFET is the hot component because it is the switch", "Looking only at the layout and not the topology"]
      },
      {
        title: "Interpret the measurements",
        kind: "analysis",
        prompt: "Here are bench measurements. What do they say about where the losses are and how healthy the converter is?",
        exhibit:
          "Measurement (24 V in, 4.0 A out, 25 C ambient)\n  Efficiency               88.8 percent\n  Input power              22.5 W\n  Output power             20.0 W\n  Total loss               2.5 W\n  Diode case temp           96 C   (SMA, theta_ja about 45 K/W)\n  MOSFET case temp          52 C\n  Inductor temp             60 C\n  Switch node waveform     clean edges, 35 ns total transition time, no ringing\n  Inductor ripple current  about 0.8 A peak to peak",
        ideal:
          "Total loss of 2.5 W matches an efficiency near 89 percent. The diode is at 96 C versus 52 C for the MOSFET, so the diode carries by far the largest share of the loss, roughly 1.6 W by the temperature rise (the rise of about 70 K at 45 K/W gives around 1.5 W). The MOSFET and inductor are cool, so conduction and switching losses in the MOSFET look small. Clean switching edges say the problem is not a ringing or shoot-through issue. The ripple is about 0.8 A p-p on 4 A, which is sensible. The conclusion is that the diode's conduction loss is the dominant term and no amount of copper area will fix a 1.5 W source in a small SMA package when ambient reaches 50 C. A rectifier with much lower voltage drop is needed.",
        c: [
          "Total loss of 2.5 W matches 88.8 percent efficiency",
          "Diode temperature rise of about 70 K at 45 K/W indicates about 1.5 W",
          "MOSFET and inductor are cool, so they are not the problem",
          "Clean edges rule out ringing or shoot-through",
          "Ripple of about 0.8 A is reasonable",
          "More copper cannot fix a 1.5 W loss in an SMA package"
        ],
        k: ["Temperatures give an independent check on the loss budget", "The low duty cycle puts most current through the diode"],
        m: ["Blaming switching losses without checking the edge data", "Concluding that heat sinking alone will solve it"]
      },
      {
        title: "Inductor ripple current",
        kind: "math",
        prompt:
          "Compute the peak-to-peak inductor ripple current in amps from Vin = 24 V, Vout = 5 V, L = 10 uH, f = 500 kHz, ideal buck with D = Vout/Vin. Use delta I = (Vin - Vout) D / (L f).",
        ideal:
          "D = 5/24 = 0.2083. Delta I = (24 - 5) x 0.2083 / (10e-6 x 500e3) = 3.958 / 5 = 0.79 A peak to peak. That is about 20 percent of the 4 A load, a conventional design target (20 to 40 percent), so the inductor is well chosen and the converter stays in continuous conduction. The peak inductor current is about 4.4 A, which is comfortably below the inductor's saturation rating if it is at least 5 A. This also confirms that the ripple is not the source of the heating, and it is needed to compute the RMS diode and MOSFET currents.",
        c: [
          "D = Vout / Vin = 0.208",
          "Delta I = (Vin - Vout) D / (L f)",
          "Result about 0.79 A p-p, about 20 percent of 4 A",
          "Continuous conduction at full load and peak current about 4.4 A",
          "Check the inductor saturation rating"
        ],
        k: ["Ripple ratio between 20 and 40 percent is typical", "Ripple only slightly changes the RMS current, so the diode loss is average-current driven"],
        m: ["Using Vin instead of Vin minus Vout", "Forgetting to convert uH and kHz units"],
        answer: { value: 0.79, unit: "A", tolerance: 0.03 }
      },
      {
        title: "Diode power dissipation",
        kind: "math",
        prompt:
          "Compute the average power dissipated in the catch diode in watts, using Vf = 0.5 V at the load current of 4 A, the duty cycle D = 5/24, and a diode conduction fraction of (1 - D). Ignore reverse leakage.",
        ideal:
          "The diode conducts the full load current during the off-time, a fraction of 1 - 5/24 = 0.792 of each period. Average diode current is 4 x 0.792 = 3.17 A. Pdiode = Vf x I_avg = 0.5 x 3.17 = 1.58 W. At 45 K/W this is a 71 K rise, so at 50 C ambient the diode reaches about 121 C, close to or beyond a 125 C rating, which explains the failures. The MOSFET conduction loss for comparison is about 0.08 W, and switching loss about 0.84 W, so the diode is about 63 percent of the total of roughly 2.5 W.",
        c: [
          "Diode off-time fraction is 1 - D = 0.792",
          "Average diode current about 3.17 A",
          "Pdiode = 0.5 V x 3.17 A = 1.58 W",
          "At 45 K/W the rise is about 71 K, giving about 121 C at 50 C ambient",
          "Compare with the MOSFET conduction (about 0.08 W) and switching (about 0.84 W) losses"
        ],
        k: ["Diode loss scales with Vf and the off-time fraction", "Thermal limits explain the failures at high ambient"],
        m: ["Using the full 4 A for the whole period (2.0 W)", "Using D rather than 1 - D"],
        answer: { value: 1.58, unit: "W", tolerance: 0.03 }
      },
      {
        title: "Fix and verify",
        kind: "synthesis",
        prompt: "What fix do you recommend, what are the trade-offs and risks, and how would you verify it?",
        ideal:
          "Replace the Schottky with synchronous rectification: use a low-side MOSFET (for example 10 mOhm Rds(on)), which dissipates about (1 - D) x Irms^2 x Rds = 0.79 x 16.05 x 0.010 = 0.13 W instead of 1.58 W, taking total loss from about 2.5 W to about 1.1 W and efficiency to roughly 95 percent. That needs a synchronous controller (or a converter IC with an integrated low-side switch), dead-time control to prevent shoot-through, and a small cost increase that is likely under 1 dollar. Alternative with less change: a lower-Vf diode in a larger package (for example a PowerDI with 0.35 V) cuts loss to about 1.1 W but remains hot. Verify with an efficiency sweep, thermal imaging at 50 C ambient, switch-node waveform inspection for shoot-through, a load-transient test, and an accelerated life test at maximum ambient. Risks: gate-drive timing, EMI changes, and body-diode conduction during dead time.",
        c: [
          "Recommend synchronous rectification with a low-Rds(on) low-side MOSFET",
          "Quantify the new loss at roughly 0.13 W instead of 1.58 W",
          "State the expected efficiency improvement toward 95 percent",
          "Mention dead-time control and shoot-through risk",
          "Offer the lower-Vf diode as a fallback with a smaller improvement",
          "Verification: efficiency sweep, thermal imaging, waveforms, life test"
        ],
        k: ["The right fix attacks the dominant loss term directly", "Synchronous rectification trades a small cost and complexity for large thermal margin"],
        m: ["Recommending only a heat sink or a larger copper pour", "Ignoring dead time and shoot-through in the synchronous design"]
      }
    ]
  },

  // 5. Civil: retaining wall
  {
    t: "Case: Retaining wall check before a new loading dock",
    opening:
      "A town plans to turn the area behind a 4 m high gravity retaining wall into a truck loading dock. The wall was designed 30 years ago for a lawn. You are asked to check whether the existing wall is still adequate for sliding and overturning with the new surcharge.",
    d: 2,
    discipline: "civil",
    tp: "geotechnical",
    tp2: "structural-analysis",
    stages: [
      {
        title: "Set up the stability check",
        kind: "structure",
        prompt: "What failure modes would you check and what information do you need?",
        data: [
          { label: "Wall geometry", content: "Concrete gravity wall, 4 m high, weight 192 kN per metre of wall, resultant acting 1.0 m from the toe." },
          { label: "Soil properties", content: "Granular backfill, unit weight 18 kN/m3, friction angle 30 degrees, so Ka by Rankine is 1/3. Horizontal ground behind the wall, no groundwater assumed." },
          { label: "New loading", content: "Uniform surcharge of 10 kPa from the loading dock slab and truck traffic (design value)." },
          { label: "Base interface", content: "Coefficient of base friction 0.45 between concrete and foundation soil." },
          { label: "Design criteria", content: "Minimum factor of safety 1.5 for sliding and 2.0 for overturning. Bearing capacity check is separate." }
        ],
        ideal:
          "Identify the external stability modes of a gravity retaining wall: sliding along the base, overturning about the toe, bearing capacity (and global slope stability if there is a slope). For each I need driving forces and resisting forces. Driving force is the active earth thrust from the backfill, plus the surcharge-induced thrust. Resisting is the wall weight times the friction coefficient for sliding and the weight times its lever arm to the toe for overturning. Gather geometry, soil unit weight and friction angle, groundwater conditions, surcharge value and the design codes' minimum factors of safety. Use Rankine active earth pressure with Ka = tan^2(45 - phi/2). Then compute the thrust, the factors of safety, and flag any that fall below the criteria.",
        c: [
          "List external stability modes: sliding, overturning, bearing, global stability",
          "Use Rankine active earth pressure, Ka = tan^2(45 - phi/2)",
          "Include the surcharge as an additional rectangular pressure",
          "Ask about groundwater and drainage behind the wall",
          "State the criteria (1.5 sliding, 2.0 overturning)",
          "Define driving versus resisting forces for each mode"
        ],
        k: ["Surcharge adds both force and a higher line of action (at mid-height), so overturning worsens more than sliding", "Drainage failure would dramatically increase the load and must be checked"],
        m: ["Using the at-rest instead of active pressure without justification", "Forgetting the surcharge moment arm is H/2, not H/3"]
      },
      {
        title: "Review the load take-down",
        kind: "analysis",
        prompt: "Here is the preliminary force table. What do you notice about how the surcharge changes the picture?",
        exhibit:
          "Item                         Force (kN/m)   Arm about toe (m)   Moment (kN.m/m)\nWall weight W (resisting)         192           1.00               192.0\nActive earth thrust, soil          48           1.333               64.0   (H/3 = 1.333 m)\nSurcharge thrust (q=10 kPa)      13.33          2.00                26.7   (H/2 = 2.0 m)\n\nSoil thrust formula: Pa = 0.5 Ka gamma H^2    (Ka = 1/3, gamma = 18, H = 4)\nSurcharge thrust: Ka q H\nBase friction mu = 0.45",
        ideal:
          "The soil thrust is 48 kN/m and the surcharge adds 13.3 kN/m, a 28 percent increase in horizontal force, but it adds 26.7 kN.m/m of overturning moment compared with 64.0 from the soil, a 42 percent increase, because the surcharge thrust acts at mid-height. So overturning worsens faster than sliding. Before the surcharge, overturning FS would be 192 / 64 = 3.0 and sliding FS about 86.4 / 48 = 1.8, both comfortable. The new loading takes the sliding FS toward 1.4, below the criterion of 1.5. The weakest mode should be identified by calculation, and drainage and base friction assumptions are the sensitive inputs.",
        c: [
          "Surcharge adds 13.3 kN/m, about 28 percent more thrust",
          "It adds 26.7 kN.m/m, about 42 percent more overturning moment",
          "Original FS values: overturning 3.0 and sliding about 1.8",
          "Surcharge thrust acts at H/2, not H/3",
          "Sliding is the likely governing mode after the surcharge",
          "Sensitive inputs: friction coefficient and drainage"
        ],
        k: ["A uniform surcharge acts at mid-height, so it affects moments more than forces", "Check which mode governs before spending money on a fix"],
        m: ["Assuming the surcharge acts at the base thrust location", "Not computing the original FS to show what changed"]
      },
      {
        title: "Active soil thrust",
        kind: "math",
        prompt:
          "Compute the Rankine active thrust from the soil alone, per metre of wall, using Ka = 1/3, unit weight 18 kN/m3, and height 4 m. Give kN/m.",
        ideal:
          "Pa = 0.5 x Ka x gamma x H^2 = 0.5 x (1/3) x 18 x 16 = 48 kN/m. This thrust acts at H/3 = 1.33 m above the base, giving an overturning moment of 64 kN.m/m. The pressure diagram is triangular: zero at the top, and Ka gamma H = 24 kPa at the base. This is the starting point for the sliding and overturning checks. If the drain failed and the backfill saturated, the thrust would rise sharply because of the hydrostatic water pressure, so a drainage check is important.",
        c: [
          "Pa = 0.5 Ka gamma H^2",
          "Ka = 1/3 for phi = 30 degrees",
          "48 kN/m acting at H/3",
          "Base pressure Ka gamma H = 24 kPa",
          "Mention drainage and water pressure as the risk"
        ],
        k: ["Earth pressure is triangular, so the resultant is at one third of the height", "Active pressure assumes the wall can move slightly away from the soil"],
        m: ["Using H instead of H squared", "Forgetting the 0.5 factor and getting 96 kN/m"],
        answer: { value: 48, unit: "kN/m", tolerance: 0.03 }
      },
      {
        title: "Sliding factor of safety",
        kind: "math",
        prompt:
          "Compute the factor of safety against sliding including the surcharge, FS = mu W / (Pa + Ps), with mu = 0.45, W = 192 kN/m, Pa = 48 kN/m and Ps = Ka q H = 13.33 kN/m. Give the dimensionless factor.",
        ideal:
          "Resisting friction = 0.45 x 192 = 86.4 kN/m. Driving force = 48 + 13.33 = 61.33 kN/m. FS = 86.4 / 61.33 = 1.41, below the 1.5 criterion. Overturning, by comparison, is 192 / (64 + 26.7) = 2.12, which passes the 2.0 criterion with little margin. So sliding governs, and the wall as built is inadequate for the dock. Options include a shear key, passive-resistance contribution if reliable, reducing the surcharge by moving the truck lane away, or tying back the wall.",
        c: [
          "Resisting force mu W = 86.4 kN/m",
          "Driving force 48 + 13.33 = 61.33 kN/m",
          "FS about 1.41, below 1.5, so it fails the criterion",
          "Overturning FS about 2.12 passes narrowly",
          "Sliding governs, so the fix targets the base"
        ],
        k: ["The governing mode determines the fix", "A small increase in load takes an adequate design below the criterion"],
        m: ["Using the soil thrust only, giving 1.8", "Computing the overturning FS instead"],
        answer: { value: 1.41, unit: "", tolerance: 0.03 }
      },
      {
        title: "Decision and mitigation",
        kind: "synthesis",
        prompt: "What do you recommend to the town, and how would you verify the solution?",
        ideal:
          "The wall fails the sliding criterion (1.41 against 1.5) and just passes overturning (2.12 against 2.0), so as built it should not carry the dock traffic. Options: add a concrete shear key under the base, which engages passive resistance and typically raises sliding FS by 0.2 or more; set the truck lane back so the surcharge is less than 10 kPa near the wall (a reduced surcharge or a setback of about half the wall height helps); install tie-backs or soil nails; or rebuild with a wider base. Also verify drainage (weep holes, drain behind wall), bearing pressure at the toe, and global stability. Trade-offs: a shear key requires excavation under the existing base, while a setback costs dock area. Verify by geotechnical investigation to confirm phi and gamma, a drainage inspection, calculation of the revised FS, and monitoring with survey targets after the dock opens. Risks: lower than assumed friction, groundwater, and vibration from heavy trucks.",
        c: [
          "State clearly that the wall fails sliding (1.41 < 1.5) and barely passes overturning",
          "Offer options: shear key, setback, tie-backs, rebuild",
          "Check drainage, bearing and global stability",
          "Recommend a geotechnical investigation to confirm soil parameters",
          "Verification: revised FS calculation, survey monitoring",
          "Discuss trade-offs: excavation under wall versus loss of dock area"
        ],
        k: ["Cheapest effective measure may be a setback of the surcharge", "Parameters such as friction and drainage drive the result, so verify them in the field"],
        m: ["Declaring the wall safe because overturning passes", "Ignoring drainage"]
      }
    ]
  },

  // 6. Chemical: reactor runaway
  {
    t: "Case: Runaway investigation in a semi-batch esterification reactor",
    opening:
      "A fine-chemicals plant had a near miss: during a cooling water outage, the temperature in a 5 m3 semi-batch reactor rose from 80 C to the relief set point within minutes. No release occurred, but the plant manager wants to know how it nearly ran away and what must change before the process restarts.",
    d: 3,
    discipline: "chemical",
    tp: "reaction-engineering",
    tp2: "process-safety",
    stages: [
      {
        title: "Frame the incident",
        kind: "structure",
        prompt: "How would you structure the investigation of this near miss?",
        data: [
          { label: "Process description", content: "Exothermic reaction run at 80 C. Reactant B is fed over 4 hours into a heel of reactant A and solvent. Normal fed rate is steady. Solvent boils at 110 C at atmospheric pressure." },
          { label: "Reaction data", content: "Heat of reaction -120 kJ/mol. Total reactant concentration 3.0 mol per kg of reaction mass. Mixture heat capacity 2.4 kJ/kg.K." },
          { label: "Event timeline", content: "Cooling water pump tripped at hour 2. Operators noticed temperature rising after 3 minutes. Feed continued for 6 more minutes before an operator stopped it." },
          { label: "Accumulation data", content: "Reaction calorimetry showed that when the feed is running, about 40 percent of the added reactant B is unreacted at any moment at 80 C, because the reaction is slow at that temperature." },
          { label: "Safeguards", content: "Relief valve set at 120 C equivalent pressure, high-temperature alarm at 95 C, manual feed trip. No automatic feed interlock." }
        ],
        ideal:
          "Treat it as a thermal runaway scenario analysis. Establish the potential energy (heat of reaction and adiabatic temperature rise), how much energy is accumulated at the moment of cooling loss (unreacted reagent), the maximum temperature of the synthesis reaction (MTSR) compared to the solvent boiling point and relief set pressure, and the time to reach them. Also review the process safeguards: alarms, interlocks and the operator response timeline. Ask for reaction calorimetry, the dosing profile and the cooling capacity. A key concept is feed-controlled versus kinetics-controlled operation: if accumulation is high, losing cooling is catastrophic because the stored reactant can all react at once. Then propose engineering controls (automatic feed stop, lower accumulation by higher temperature or catalyst dosing, quench or dump) rather than relying only on operator action.",
        c: [
          "Define the potential energy: adiabatic temperature rise from heat of reaction",
          "Quantify accumulation of unreacted reagent when cooling is lost",
          "Compute the MTSR and compare with solvent boiling and relief set points",
          "Use the timeline to assess the time-to-action and the safeguards",
          "Distinguish feed-controlled from accumulation-controlled behavior",
          "Prefer engineered safeguards to administrative ones"
        ],
        k: ["Accumulation, not just heat of reaction, determines the severity of a cooling failure", "Process safety uses layers of protection that must work independently"],
        m: ["Blaming the operator for the 6-minute delay without questioning the design", "Considering only the heat of reaction and not the accumulation"]
      },
      {
        title: "Interpret the calorimetry and trend",
        kind: "analysis",
        prompt: "What do the trend and calorimetry tell you about why the temperature rose so quickly, and what is concerning about the safeguards?",
        exhibit:
          "Time (min after pump trip)   T reactor (C)   Feed running?\n   0                           80             yes\n   3                           84             yes\n   6                           92             yes\n   9                          105             stopped by operator\n  12                          118             no\n  15                          124             relief opens briefly\n\nHigh temperature alarm 95 C at about minute 7.\nCalorimetry: accumulation 40 percent of dosed B at 80 C.\nCooling jacket duty before trip: 85 kW.",
        ideal:
          "The temperature continued to rise by 13 K after the feed was stopped, between minutes 9 and 15 the rise was about 19 K, showing the accumulated reagent kept reacting. This is the signature of high accumulation: stopping the feed does not stop the heat release. The alarm at 95 C came at minute 7, and the operator stopped feed at minute 9, but 9 minutes of feed continued after the cooling loss. The relief opened at about 124 C. The concerning safeguards: there is no automatic feed trip, the alarm is just 15 K above operating temperature in a system that gains 2 to 4 K per minute, and the margin to the solvent boiling point is only 30 K. Safe operation relies on an operator seeing the problem within minutes, which is not robust.",
        c: [
          "Temperature keeps rising after the feed stop, evidence of accumulated unreacted reagent",
          "Rise rate of 2 to 4 K per minute gives little operator time",
          "Alarm at 95 C and manual trip with no automatic interlock",
          "Only 30 K margin to the solvent boiling point",
          "Relief opening at about 124 C shows the last layer was used",
          "Conclude the system depends on the operator rather than engineered controls"
        ],
        k: ["Temperature that continues to rise after a feed stop indicates accumulation", "The time between alarm and consequence defines whether operator response can be credited"],
        m: ["Concluding the alarm was fine because it activated", "Ignoring the post-stop rise"]
      },
      {
        title: "Adiabatic temperature rise",
        kind: "math",
        prompt:
          "Compute the adiabatic temperature rise in kelvin if all the reagent reacted with no cooling: heat of reaction 120 kJ/mol, 3.0 mol per kg of reaction mass, cp 2.4 kJ/kg.K. Give kelvin.",
        ideal:
          "Heat released per kg of reaction mass is 120 x 3.0 = 360 kJ/kg. Dividing by cp = 2.4 kJ/kg.K gives delta T_ad = 150 K. That means starting from 80 C a full adiabatic reaction would reach 230 C, far above the solvent boiling point of 110 C and any reasonable reactor rating, so the process has substantial potential energy and the safeguards must be robust. This calculation ignores solvent evaporation, which would absorb some energy but also generate pressure.",
        c: [
          "Energy per kg: 120 kJ/mol x 3.0 mol/kg = 360 kJ/kg",
          "Divide by cp 2.4 kJ/kg.K to get 150 K",
          "Starting at 80 C the adiabatic final temperature would be 230 C",
          "Compare with solvent boiling point of 110 C",
          "Note that evaporation would absorb energy but make pressure"
        ],
        k: ["Adiabatic rise is the measure of worst-case severity", "High potential energy demands independent protection layers"],
        m: ["Using cp in J and forgetting to convert", "Forgetting the concentration and using ΔH/cp = 50 K"],
        answer: { value: 150, unit: "K", tolerance: 0.03 }
      },
      {
        title: "Maximum temperature of the synthesis reaction",
        kind: "math",
        prompt:
          "Compute the MTSR in degrees Celsius: process temperature 80 C plus the accumulated fraction (40 percent) of the adiabatic rise you just found. Give degrees Celsius.",
        ideal:
          "MTSR = Tp + X_acc x delta T_ad = 80 + 0.40 x 150 = 140 C. That is 30 K above the solvent boiling point (110 C), so solvent will boil, building pressure, and the relief set pressure becomes the last barrier. This agrees with the near-miss, where the temperature reached about 124 C before relief opened and reflux started to remove heat. The process is therefore in a bad safety class: even with just the accumulated 40 percent the temperature exceeds the boiling point. To be considered safe, the MTSR should be below the boiling point with margin, which requires accumulation of 20 percent or less (80 + 0.2 x 150 = 110 C) and ideally lower.",
        c: [
          "MTSR = Tp + X x delta T_ad = 80 + 0.4 x 150",
          "Result 140 C, 30 K above the solvent boiling point",
          "Link to the observed 124 C near miss",
          "Target accumulation of 20 percent or less to bring MTSR to 110 C or lower",
          "State that MTSR above the boiling point means the relief is the last barrier"
        ],
        k: ["Accumulation is the lever that process changes can control", "MTSR compared to boiling point and decomposition temperature classifies the hazard"],
        m: ["Adding the full adiabatic rise (230 C)", "Mixing up fractions and using 0.6 instead of 0.4"],
        answer: { value: 140, unit: "C", tolerance: 0.03 }
      },
      {
        title: "Corrective actions",
        kind: "synthesis",
        prompt: "What changes would you require before restart, and how would you verify they work?",
        ideal:
          "Reduce the hazard at the source: lower reagent accumulation by raising the process temperature slightly or adding a catalyst so that B reacts as it is fed, targeting MTSR below the boiling point (accumulation of 20 percent or less, so 110 C or lower). Add an independent automatic interlock: the feed stops on cooling-flow loss or temperature above 88 C, with a dump or quench option, and keep the 95 C alarm as a second layer. Add redundant cooling water pump or emergency cooling water supply, and size the relief for the credible scenario with two-phase flow in line with a DIERS-style analysis. Run a HAZOP and a layers-of-protection analysis to confirm risk is reduced to the target. Verify with reaction calorimetry at the new conditions, a dynamic simulation of the cooling failure, a function test of the interlock, and operator training on the revised procedure. Risks include reduced yield at the new temperature and false trips.",
        c: [
          "Reduce accumulation so MTSR is below the solvent boiling point",
          "Add an automatic feed interlock on cooling loss and temperature",
          "Add redundancy to cooling water or emergency cooling",
          "Review relief sizing with a two-phase flow method",
          "Run HAZOP and layers-of-protection analysis",
          "Verification: calorimetry, simulation, interlock function test, training"
        ],
        k: ["Inherently safer design (less accumulation) is better than adding alarms", "Safeguards must be independent and tested"],
        m: ["Relying on more operator training as the main fix", "Increasing the relief size without addressing accumulation"]
      }
    ]
  },

  // 7. Industrial: line bottleneck
  {
    t: "Case: Bottleneck on the Brightwell cabinet assembly line",
    opening:
      "Brightwell makes steel cabinets on a five-station line. Customers want 60 units per hour but the line seems to make fewer. The plant manager is about to buy a second cutting machine. You are asked to find the real constraint before money is spent.",
    d: 1,
    discipline: "industrial",
    tp: "lean-manufacturing",
    tp2: "operations-research",
    stages: [
      {
        title: "Frame the throughput problem",
        kind: "structure",
        prompt: "How would you approach finding the constraint, and what data would you ask for?",
        data: [
          { label: "Demand", content: "Customer demand is 60 units per hour (480 per 8-hour shift). Line works one shift, 3600 seconds per hour of scheduled time." },
          { label: "Station data", content: "Cut: 40 s/unit, 1 machine. Weld: 55 s/unit, 2 machines. Paint: 30 s/unit, 1 booth. Assembly: 48 s/unit, 1 cell. Pack: 25 s/unit, 1 station." },
          { label: "Availability", content: "Cut 92 percent, Weld 90 percent, Paint 95 percent, Assembly 85 percent, Pack 98 percent (includes breakdowns and changeovers)." },
          { label: "Current output", content: "Measured output averages about 64 units per hour with a best hour of 66, with WIP piling up in front of assembly." }
        ],
        ideal:
          "Use a theory-of-constraints approach: the line's throughput equals the capacity of its slowest station, so compute each station's effective capacity as machines times 3600 divided by cycle time, times availability, and compare with the demand rate (takt time of 60 s). Ask for cycle times, number of parallel machines, availability, changeover time and WIP locations. A queue of WIP in front of a station is a strong visual clue to the bottleneck. Check whether the demand is met at each station and what actions are possible: reduce cycle time, increase availability, add capacity. Before buying a cutting machine, check whether cutting is actually the constraint.",
        c: [
          "Throughput of a serial line equals the slowest station capacity",
          "Compute capacity = machines x 3600 / cycle time x availability",
          "Compare with the takt time of 60 s (60 units per hour)",
          "Use WIP accumulation as an indicator of the bottleneck",
          "Consider cycle time, availability and changeover as levers",
          "Check the proposed purchase against the actual constraint"
        ],
        k: ["Improving a non-bottleneck does not increase throughput", "Effective capacity includes availability, not just cycle time"],
        m: ["Using nominal cycle times and ignoring availability", "Buying capacity at the station that is most visible rather than the constraint"]
      },
      {
        title: "Compare station capacities",
        kind: "analysis",
        prompt: "Here are capacities per station. What do you conclude and what about the purchase proposal?",
        exhibit:
          "Station    Cycle(s)  Machines  Avail   Capacity (units/h)\nCut          40        1       0.92        82.8\nWeld         55        2       0.90       117.8\nPaint        30        1       0.95       114.0\nAssembly     48        1       0.85        63.8\nPack         25        1       0.98       141.1\n\nDemand: 60 units/h    WIP queue observed in front of: Assembly\nCapacity = machines x 3600 / cycle x availability",
        ideal:
          "Assembly has the lowest capacity at about 63.8 units per hour, matching the observed output of 64 and the queue in front of it. Cut already has 82.8 units per hour, so a second cutting machine would add capacity where it is not needed and would only add WIP. Demand is 60 per hour, so assembly is just above demand on paper, with only about 6 percent margin; any extra downtime will lose orders. The weld station has two machines and ample capacity. The recommendation is to reject the second cutting machine and focus on assembly: improve its availability through changeover reduction (SMED), preventive maintenance and better material kitting, or reduce its cycle time. Raising availability from 85 to 95 percent lifts assembly capacity to 71.3 units per hour, with cut next at 82.8.",
        c: [
          "Assembly is the bottleneck at about 63.8 units per hour",
          "The WIP queue in front of assembly confirms it",
          "Cut at 82.8 units per hour does not need a second machine",
          "Margin over the demand of 60 is only about 6 percent",
          "Levers: SMED, preventive maintenance, kitting, cycle-time reduction",
          "Next constraint after assembly is Cut at 82.8"
        ],
        k: ["Capital should go to the constraint, and only until the next constraint emerges", "A small margin over demand is fragile with a stochastic line"],
        m: ["Approving the cutting machine because cut looks slow at 40 s", "Ignoring the availability numbers"]
      },
      {
        title: "Bottleneck throughput",
        kind: "math",
        prompt:
          "Compute the effective capacity of the Assembly cell in units per hour: cycle time 48 s, one cell, availability 85 percent, 3600 s per hour. Give units per hour.",
        ideal:
          "Nominal rate is 3600 / 48 = 75 units per hour. With 85 percent availability, the effective capacity is 75 x 0.85 = 63.75 units per hour, about 63.8. This matches the measured average of 64 per hour. The slack above the demand of 60 per hour is 3.75 units per hour (6 percent), meaning even a small additional downtime will cause shortfalls. This is also the line throughput because assembly is the slowest station.",
        c: [
          "Nominal rate 3600 / 48 = 75 units per hour",
          "Apply availability 0.85 to get 63.75",
          "Matches the measured line rate of about 64",
          "Margin over demand only 3.75 units per hour",
          "This value is the line throughput"
        ],
        k: ["Availability has the same effect on capacity as a cycle time increase", "Model validated against measured throughput"],
        m: ["Forgetting availability and reporting 75", "Using minutes in place of seconds"],
        answer: { value: 63.75, unit: "units per hour", tolerance: 0.03 }
      },
      {
        title: "Work in process by Little's law",
        kind: "math",
        prompt:
          "The average time a unit spends in the whole line is 3.2 hours (a lot of it queueing at assembly). Using Little's law with the line throughput of 63.75 units per hour, compute the average WIP in units.",
        ideal:
          "Little's law states WIP = throughput x cycle time (time in system). WIP = 63.75 x 3.2 = 204 units. Touch time is only 40 + 55 + 30 + 48 + 25 = 198 seconds, about 3.3 minutes, so over 98 percent of the 3.2 hours is waiting. That is a lot of money tied up and a quality risk if defects are found late. Reducing the queue in front of assembly through a CONWIP card limit of, say, 60 units would cut lead time to about 0.94 hours at the same throughput.",
        c: [
          "WIP = throughput x time in system (Little's law)",
          "63.75 x 3.2 gives 204 units",
          "Touch time of about 198 s means over 98 percent of lead time is waiting",
          "Cap WIP with a pull system (CONWIP or kanban)",
          "Lead time at 60 WIP would be about 0.94 hours"
        ],
        k: ["Lead time can be reduced massively with no loss in throughput by capping WIP", "Little's law holds for any stable system"],
        m: ["Dividing instead of multiplying", "Using touch time as the time in system"],
        answer: { value: 204, unit: "units", tolerance: 0.03 }
      },
      {
        title: "Recommend the plan",
        kind: "synthesis",
        prompt: "What should the plant manager do instead of buying a second cutting machine, and how would you verify progress?",
        ideal:
          "Do not buy the cutting machine. Focus on assembly, which caps the line at 63.75 units per hour. First reduce its downtime and changeover (SMED on tooling and fixtures, TPM for the cell) to raise availability from 85 to 95 percent, which lifts capacity to 71.25 units per hour at almost no capital. Add a pull-based WIP cap in front of assembly to cut lead time from 3.2 hours to under 1 hour. Look at cycle-time reduction too, for example moving a 4 s sub-task upstream to Weld which has spare capacity. Re-run the capacity calculation after each change, as the constraint moves to Cut at 82.8 units per hour, which gives about 38 percent headroom over demand. Verify by tracking OEE and throughput by station daily, watching the queue length, and measuring on-time delivery. Risks: shifting the problem without noticing, quality drift when pushing speed, and operator buy-in.",
        c: [
          "Reject the second cutting machine",
          "Focus on assembly availability (SMED, TPM) to reach 95 percent",
          "Quantify the new capacity at 71.25 units per hour",
          "Introduce a WIP cap to reduce lead time",
          "Consider shifting work to stations with spare capacity",
          "Verification: OEE tracking, queue length and delivery performance"
        ],
        k: ["The constraint moves; re-evaluate after each improvement", "Low-cost operational fixes come before capital purchases"],
        m: ["Improving cut first", "No metrics to verify improvement"]
      }
    ]
  },

  // 8. Aerospace: orbit raise
  {
    t: "Case: Orbit raising budget for a 300 kg satellite",
    opening:
      "A 300 kg satellite is released into a 500 km circular orbit but its mission needs a 700 km circular orbit. The team has a monopropellant thruster and has to decide whether the propellant tank is large enough. You are asked to check the manoeuvre and the propellant need.",
    d: 2,
    discipline: "aerospace",
    tp: "orbital-mechanics",
    tp2: "propulsion",
    stages: [
      {
        title: "Define the manoeuvre",
        kind: "structure",
        prompt: "How would you structure this orbit-raising analysis, and what information do you need?",
        data: [
          { label: "Orbit parameters", content: "Start: circular at 500 km altitude. Target: circular at 700 km altitude. Earth radius 6378 km, mu = 398,600 km3/s2, so the radii are 6878 km and 7078 km." },
          { label: "Spacecraft", content: "Wet mass at start of manoeuvre 300 kg. Monopropellant thruster with Isp 220 s. Propellant tank capacity 18 kg usable." },
          { label: "Constraints", content: "Thrust is high enough that burns are short relative to the orbit, so impulsive burns are acceptable. Additional 5 percent propellant reserve is required for attitude control and errors." },
          { label: "Timing", content: "Manoeuvre can take up to one orbit, so a two-burn Hohmann transfer is acceptable." }
        ],
        ideal:
          "Choose a Hohmann transfer between coplanar circular orbits as the minimum-energy, two-burn solution, consistent with the one-orbit time allowance. The first burn at the lower orbit raises apogee to the target radius, the second at apogee circularises. Compute the delta-v from the vis-viva equation at each burn, sum them, then use the rocket equation to find the propellant mass with the stated Isp. Check the result against the tank capacity including the 5 percent reserve. I would also ask about whether burns are impulsive (here yes), thruster misalignment and the effect of a finite burn, and the plane change (none). Verify results with a quick check of the orbital period, transfer time and a sanity check on the delta-v magnitude.",
        c: [
          "Choose a Hohmann transfer for coplanar circular orbits",
          "Use vis-viva to compute velocities at the burn points",
          "Sum the two delta-v values",
          "Use the rocket equation with Isp to find the propellant",
          "Compare with tank capacity including the 5 percent reserve",
          "Check assumptions: impulsive burns, no plane change"
        ],
        k: ["Hohmann minimizes delta-v for a two-impulse transfer between coplanar circular orbits", "Propellant depends exponentially on delta-v through the rocket equation"],
        m: ["Using the circular velocity difference directly as delta-v", "Forgetting that mass at start matters and using dry mass"]
      },
      {
        title: "Check circular and transfer speeds",
        kind: "analysis",
        prompt: "Here are the key orbital speeds. What do they say about the two burns?",
        exhibit:
          "Orbit                     Radius (km)   Speed (km/s)\nCircular 500 km             6878         7.6127\nCircular 700 km             7078         7.5044\nTransfer perigee (6878)     6878         7.6670\nTransfer apogee (7078)      7078         7.4504\n\nTransfer semi-major axis a = (6878 + 7078)/2 = 6978 km\nvis-viva: v = sqrt(mu (2/r - 1/a))",
        ideal:
          "The first burn raises speed from 7.6127 km/s to 7.6670 km/s at perigee, a gain of about 54 m/s. At apogee the transfer orbit speed is 7.4504 km/s and the circular speed is 7.5044 km/s, so the second burn adds about 54 m/s. The two burns are almost equal because the orbits are close together in radius, giving a total of about 108 m/s. Note the paradox that the satellite ends up slower in the higher orbit (7.5044 versus 7.6127 km/s) even though it needed a net prograde push; the burn increases energy while kinetic energy falls as potential energy rises. This is a small manoeuvre, so the propellant should be modest, around 5 percent of the wet mass.",
        c: [
          "Burn 1 is about 54 m/s at perigee",
          "Burn 2 is about 54 m/s at apogee",
          "Total delta-v about 108 m/s",
          "Higher orbit has lower speed even though energy increased",
          "Burns are nearly equal because the radii are close",
          "Expect propellant fraction near 5 percent of the wet mass"
        ],
        k: ["Both burns are prograde and add energy", "For close orbits the delta-v is small, so the propellant budget is likely modest"],
        m: ["Subtracting circular speeds (7.6127 - 7.5044) and calling it delta-v", "Burning retrograde at apogee"]
      },
      {
        title: "Total delta-v",
        kind: "math",
        prompt:
          "Compute the total Hohmann delta-v in m/s for 6878 km to 7078 km using mu = 398,600 km3/s2. Give m/s.",
        ideal:
          "Delta-v1 = sqrt(mu(2/r1 - 1/a)) - sqrt(mu/r1) = 7.6670 - 7.6127 = 0.05435 km/s. Delta-v2 = sqrt(mu/r2) - sqrt(mu(2/r2 - 1/a)) = 7.5044 - 7.4504 = 0.05397 km/s. Sum = 0.10832 km/s = 108.3 m/s. The transfer takes half the transfer-orbit period, pi sqrt(a^3/mu) = 2,900 seconds, about 48 minutes, within the one-orbit allowance.",
        c: [
          "Use vis-viva at both burns",
          "Delta-v1 about 54.4 m/s",
          "Delta-v2 about 54.0 m/s",
          "Total about 108.3 m/s",
          "Transfer time about 48 minutes"
        ],
        k: ["Hohmann delta-v is a sum of two small differences of large numbers, so carry enough digits", "Transfer takes half an orbit of the transfer ellipse"],
        m: ["Rounding the speeds too early and getting a large error", "Forgetting the second burn"],
        answer: { value: 108.3, unit: "m/s", tolerance: 0.03 }
      },
      {
        title: "Propellant mass",
        kind: "math",
        prompt:
          "Using the total delta-v of 108.3 m/s, Isp = 220 s, g0 = 9.80665 m/s2 and an initial mass of 300 kg, compute the propellant mass in kg from the rocket equation. Give kg (before the 5 percent reserve).",
        ideal:
          "Exhaust velocity = Isp x g0 = 220 x 9.80665 = 2157.5 m/s. Mass ratio = exp(108.3 / 2157.5) = exp(0.05020) = 1.0515. Propellant = m0 (1 - 1/1.0515) = 300 x 0.04897 = 14.7 kg. Adding the 5 percent reserve gives 15.4 kg, which fits within the 18 kg tank with 2.6 kg of margin, about 17 percent. The margin is thin if the mission later needs a drag make-up burn or a safe de-orbit manoeuvre, which is another consideration for the decision.",
        c: [
          "ve = Isp g0 = 2157.5 m/s",
          "Mass ratio exp(dv/ve) about 1.0515",
          "Propellant about 14.7 kg",
          "With 5 percent reserve about 15.4 kg",
          "Compare with the 18 kg tank: margin about 2.6 kg"
        ],
        k: ["Rocket equation is exponential, but for small delta-v it is nearly linear", "Margin must account for end-of-life disposal and drag"],
        m: ["Using linear approximations with the wrong base mass", "Using Isp in seconds as velocity without g0"],
        answer: { value: 14.7, unit: "kg", tolerance: 0.03 }
      },
      {
        title: "Decision and risks",
        kind: "synthesis",
        prompt: "Is the tank sufficient, and what would you recommend and monitor?",
        ideal:
          "Yes, the 18 kg tank covers the 14.7 kg manoeuvre plus the 5 percent reserve (15.4 kg), but the remaining 2.6 kg is only about 17 percent margin and also has to cover station-keeping, drag make-up and end-of-life disposal. Recommend flying the Hohmann transfer with a two-burn plan, then using in-flight tracking to trim the final burn. Consider alternatives: a higher-Isp thruster would drastically reduce propellant (at Isp 300 s the mass drops to 10.8 kg), at a cost in power and complexity, or accept a slightly lower final altitude. Risks: thruster performance degradation (Isp lower than quoted), blowdown pressure effects reducing thrust, burn errors that need correction burns, and attitude-control propellant use. Verify with a Monte Carlo of burn errors and Isp uncertainty, a propellant gauging method, and an end-of-life disposal budget.",
        c: [
          "Confirm sufficiency with the quantified margin (about 2.6 kg)",
          "Highlight the other demands on the remaining propellant",
          "Offer alternatives such as a higher-Isp thruster or a smaller target altitude",
          "Identify risks: Isp degradation, burn errors, blowdown",
          "Verification: Monte Carlo of burn errors and Isp, propellant gauging",
          "Plan for end-of-life disposal propellant"
        ],
        k: ["Mission margin is consumed by later needs, not just the first manoeuvre", "Uncertainty in Isp and burn execution should be analysed statistically"],
        m: ["Calling the design safe without considering the other propellant demands", "Ignoring thruster performance degradation"]
      }
    ]
  },

  // 9. Civil: floor beam retrofit
  {
    t: "Case: Floor beam capacity check for a new CNC machine",
    opening:
      "A small workshop wants to install a 20 kN CNC machine at the middle of a first-floor span carried by simply supported steel beams. You are asked to check the beam for strength and deflection before the machine is delivered.",
    d: 1,
    discipline: "civil",
    tp: "structural-analysis",
    tp2: "structural-design",
    stages: [
      {
        title: "Structure the check",
        kind: "structure",
        prompt: "How would you approach this check, and what would you ask?",
        data: [
          { label: "Beam data", content: "Steel I-beam, simply supported over 6 m. Section modulus S = 5.5e-4 m3 (550 cm3), second moment of area I = 1.2e-4 m4 (12,000 cm4), E = 200 GPa, yield strength 250 MPa." },
          { label: "Existing loads", content: "Uniformly distributed load of 8 kN/m including beam self weight, floor and live load as currently used." },
          { label: "New load", content: "CNC machine 20 kN acting as a point load at midspan (static weight including base). Vibration neglected for this first check." },
          { label: "Criteria", content: "Allowable bending stress 150 MPa (0.6 Fy for the workshop's allowable-stress approach). Deflection limit span/360." }
        ],
        ideal:
          "A structural check needs three things: the load path and combined load case, the strength check (bending moment and stress against the allowable), and the serviceability check (deflection against span/360). For a simply supported beam, the maximum bending moment from a uniform load is wL^2/8 and from a midspan point load is PL/4; both peak at midspan, so they can be added. The maximum stress is M/S. Deflection also superposes: 5wL^4/(384EI) plus PL^3/(48EI). I would confirm the support conditions, whether the floor spreads the load to adjacent beams (conservatively ignore it), the machine's dynamic loading and vibration, and whether the existing load of 8 kN/m was measured or assumed. Then compute and compare with the criteria.",
        c: [
          "Superpose the uniform and point load effects at midspan",
          "Bending moment from uniform load wL^2/8 and from point load PL/4",
          "Stress check sigma = M / S against the allowable",
          "Deflection check using the 5wL^4/(384EI) and PL^3/(48EI) formulas",
          "Ask about support conditions and load spreading to neighbouring beams",
          "Flag vibration and dynamic loads from the machine as a separate check"
        ],
        k: ["Both loads peak at midspan, so the worst-case moment is the sum", "A static check does not cover machine-induced vibration"],
        m: ["Using wL^2/8 for the point load", "Ignoring serviceability and checking only strength"]
      },
      {
        title: "Review the load and moment table",
        kind: "analysis",
        prompt: "Here is the hand-calculated summary. Does anything look off, and what does it imply?",
        exhibit:
          "Case                     Load           Mmax (kN.m)   Midspan deflection (mm)\nExisting UDL           8 kN/m, L=6 m       36.0            5.63\nCNC point load         20 kN at midspan    30.0            3.75\nCombined                                   66.0            9.38\n\nSection: S = 5.5e-4 m3, I = 1.2e-4 m4, E = 200 GPa\nCriteria: allowable stress 150 MPa, deflection limit L/360 = 16.7 mm",
        ideal:
          "The numbers are consistent: 8 x 36 / 8 = 36 kN.m and 20 x 6 / 4 = 30 kN.m, a total of 66 kN.m, and the deflections add to about 9.4 mm. The CNC machine adds 83 percent to the bending moment of the existing load, which is a substantial addition, and it adds about 3.75 mm to the deflection. The check is not yet complete: stress is not yet computed, so I would compute it, and the deflection limit of 16.7 mm shows a comfortable margin of about 44 percent. A caution: the table covers static loads only; a CNC machine can excite floor vibration and a stiff steel beam can still feel lively. I would also confirm that the new point load does not exceed the bearing and web-crippling capacity at the supports.",
        c: [
          "Existing moment 36 kN.m and new point load moment 30 kN.m are correct",
          "Machine adds about 83 percent to the moment",
          "Deflection total about 9.4 mm against the 16.7 mm limit",
          "Stress still needs to be computed and compared with 150 MPa",
          "Static check only; vibration must be assessed separately",
          "Also check supports, web crippling and connections"
        ],
        k: ["Serviceability appears fine, so strength is the next check", "Adding a heavy point load changes the bending moment far more than the uniform load suggests"],
        m: ["Accepting the table without verifying the formulas", "Declaring the beam safe on deflection alone"]
      },
      {
        title: "Bending stress",
        kind: "math",
        prompt:
          "Compute the maximum bending stress in MPa for the combined midspan moment of 66 kN.m with S = 5.5e-4 m3. Give MPa.",
        ideal:
          "Stress = M / S = 66,000 N.m / 5.5e-4 m3 = 120 MPa. This is 80 percent of the allowable 150 MPa (utilisation 0.80) and 48 percent of yield (250 MPa), so the beam passes the strength check with a 20 percent reserve on stress. Without the CNC machine, the stress was 36,000 / 5.5e-4 = 65.5 MPa, so the machine nearly doubles the utilisation. The next steps are to check deflection and local effects, and the effect of vibration.",
        c: [
          "sigma = M / S",
          "66,000 / 5.5e-4 = 120 MPa",
          "Utilisation 0.80 of the 150 MPa allowable",
          "Machine increases stress from 65.5 to 120 MPa",
          "Strength passes with a reserve of 20 percent"
        ],
        k: ["Utilisation ratio communicates the margin simply", "Local checks at supports still apply"],
        m: ["Using kN.m with m3 without conversion", "Using yield in place of the allowable"],
        answer: { value: 120, unit: "MPa", tolerance: 0.03 }
      },
      {
        title: "Midspan deflection",
        kind: "math",
        prompt:
          "Compute the total midspan deflection in mm: 5wL^4/(384EI) for the 8 kN/m UDL plus PL^3/(48EI) for the 20 kN point load, L = 6 m, E = 200 GPa, I = 1.2e-4 m4. Give mm.",
        ideal:
          "UDL deflection: 5 x 8,000 x 6^4 / (384 x 2e11 x 1.2e-4) = 5.184e7 / 9.216e9 = 5.625 mm. Point load: 20,000 x 6^3 / (48 x 2e11 x 1.2e-4) = 4.32e6 / 1.152e9 = 3.75 mm. Total = 9.375 mm, about L/640, against a limit of L/360 = 16.7 mm. So the beam passes with a margin of about 44 percent. If the machine were dynamic, additional deflection would apply, and precision machining might need a stricter limit such as L/1000 = 6 mm, which this beam would not meet at 9.4 mm (L/640).",
        c: [
          "UDL deflection 5wL^4/(384EI) = 5.625 mm",
          "Point load deflection PL^3/(48EI) = 3.75 mm",
          "Total 9.375 mm which is about L/640",
          "Compare with L/360 = 16.7 mm and pass",
          "Note stricter limits may apply for precision machining"
        ],
        k: ["Deflections superpose in a linear elastic model", "Equipment may require a stricter criterion than generic floor limits"],
        m: ["Using mm for L and getting absurd results", "Using the wrong coefficient for the point load (using 384 instead of 48)"],
        answer: { value: 9.375, unit: "mm", tolerance: 0.03 }
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt: "Can the machine go in? What conditions would you attach, and how would you verify?",
        ideal:
          "Conditionally yes: stress is 120 MPa against a 150 MPa allowable (0.80) and deflection is 9.4 mm against 16.7 mm, so the beam passes static strength and serviceability with the machine at midspan. Conditions: confirm that the 8 kN/m existing load is not exceeded (limit stored material), check the support bearing, web crippling and end connections for the new 20 kN plus the existing reaction (about 34 kN at each support, using 24 + 10), and assess vibration with the machine operating, because the machine may excite floor frequencies. If the machine needs precision (for example tolerance of 0.01 mm), place it on an isolated pad or at ground level. Alternatives: place the machine nearer a support, which sharply cuts the moment, or add a stiffener beam. Verify by measuring floor response during commissioning, using accelerometers or a dial gauge, and by an annual inspection. Risks: dynamic effects, overloading by future changes, and corrosion of the existing steel.",
        c: [
          "Conditional approval based on utilisation 0.80 and deflection of 9.4 mm",
          "Check bearing, web crippling and end connections",
          "Assess vibration from machine operation",
          "Consider moving the machine closer to a support or adding a stiffener",
          "Commissioning verification with measurements",
          "Risks: future overload, corrosion, precision requirements"
        ],
        k: ["Static strength is necessary but not sufficient for sensitive equipment", "Placement strongly influences the demand on a beam"],
        m: ["Giving unconditional approval", "Ignoring the supports"]
      }
    ]
  },

  // 10. Computer engineering: firmware intermittent bug
  {
    t: "Case: Intermittent timestamp glitch in motor-controller firmware",
    opening:
      "A 16-bit microcontroller drives a pump motor. Every hour or so, the logged timestamp jumps ahead by about a minute and the speed-control loop momentarily thinks its sample interval is huge, causing a visible stumble. It cannot be reproduced on the bench. You are the firmware engineer asked to find the root cause.",
    d: 3,
    discipline: "computer-engineering",
    tp: "embedded-systems",
    tp2: "hardware-debug",
    stages: [
      {
        title: "Structure the debugging",
        kind: "structure",
        prompt: "How would you approach an intermittent bug like this, and what would you ask for?",
        data: [
          { label: "Architecture", content: "16-bit MCU at 16 MHz, bare-metal super-loop plus a 1 kHz timer interrupt. The ISR increments a 32-bit millisecond counter named tick_ms. The main loop reads tick_ms to compute the control-loop interval and for logging." },
          { label: "Symptoms", content: "Roughly every hour (about 26 events per day on units that log every read) the timestamp jumps by about 65.5 seconds. The loop interval spikes to the same value. The firmware does not crash or reset." },
          { label: "Code detail", content: "The main loop reads tick_ms in plain C (uint32_t t = tick_ms). On this 16-bit CPU the compiler emits two 16-bit loads. A function call and a debug print are between the high and low word loads in some build configurations, about 40 microseconds of gap." },
          { label: "Read rate", content: "The control loop reads tick_ms 500 times per second." },
          { label: "What has been tried", content: "Hardware was swapped, watchdog added, and noise filters on the supply, none made a difference." }
        ],
        ideal:
          "Start from the signature: a jump of almost exactly 65.5 seconds is 65,536 ms, which is 2^16 milliseconds. That strongly suggests a 16-bit boundary effect, not noise or a hardware fault, and explains why hardware swaps did nothing. On a 16-bit CPU a 32-bit variable is read in two parts, and if the ISR increments the counter between the two reads, the low word may have rolled over while the high word is old, producing a value off by 65,536. That is a torn read, a classic race between an ISR and main-loop code. The event requires the interrupt to land inside the gap and the low word to wrap at that tick, so it is rare, matching a glitch every hour or so. I would confirm by reviewing the generated assembly, estimating the probability, and writing a test that forces the interrupt in the gap. The fix is to make the read atomic.",
        c: [
          "Notice the jump equals 65,536 ms, a 16-bit boundary signature",
          "Identify a torn read of a 32-bit variable shared with an ISR on a 16-bit CPU",
          "Explain why it is rare: the interrupt must land in the gap and the low word must wrap",
          "Rule out hardware, noise and watchdog causes given the evidence",
          "Check the compiler assembly to confirm two separate loads",
          "Plan a deterministic reproduction by forcing the interrupt in the gap"
        ],
        k: ["Numerical signatures in the error often reveal the mechanism", "Shared multi-word variables between ISR and main need atomic access"],
        m: ["Chasing hardware or EMI causes", "Adding delays or retries without understanding the race"]
      },
      {
        title: "Analyze the log excerpt",
        kind: "analysis",
        prompt: "Here is an excerpt from the log around one event. What does it confirm?",
        exhibit:
          "t_read(ms)   dt_loop(ms)   note\n  196,601         2          ok\n  196,603         2          ok\n  196,605         2          ok\n  262,143     65,538          GLITCH (true time about 196,607)\n  196,609   huge (wraps)     rejected by sanity filter\n  196,611         2          ok\n\nBoundary values: 196,607 = 0x0002FFFF, 196,608 = 0x00030000.\nGlitch value 262,143 = 0x0003FFFF: low word read before the tick (0xFFFF), high word read after the tick (0x0003).\nGlitch size = 262,143 - 196,607 = 65,536 ms.",
        ideal:
          "The glitch is exactly 65,536 ms ahead of the true time (262,143 versus 196,607), which is a torn read at a low-word wrap. The true counter was 0x0002FFFF, one tick before the low word rolls from 0xFFFF to 0x0000 with a carry into the high word. The reader loaded the low word (0xFFFF) first, the tick fired, and then it loaded the already-incremented high word (0x0003), producing 0x0003FFFF. Every other sample in the excerpt is fine, so it is not general corruption. The hypothesis predicts that all glitches in the log occur next to multiples of 65,536 ms, which is a checkable pattern, and that a reversed load order would give a jump backwards instead of forwards.",
        c: [
          "Glitch is exactly 65,536 ms ahead of the true time",
          "The event occurs next to a low-word rollover (0xFFFF to 0x0000)",
          "Other samples are normal, so no general corruption",
          "Torn read explanation: words read on opposite sides of the carry",
          "Check that all logged glitches cluster at multiples of 65,536 ms",
          "Predict that reversing the load order would give a jump backwards"
        ],
        k: ["Events cluster at the boundary, which discriminates this cause from random corruption", "A hypothesis should predict a checkable pattern in other logs"],
        m: ["Treating the glitch as a random bit flip", "Ignoring the proximity to the rollover"]
      },
      {
        title: "Frequency of glitches",
        kind: "math",
        prompt:
          "Estimate the expected number of torn-read glitches per day: reads occur 500 times per second, the interrupt arrives every 1 ms, the vulnerable gap is 40 microseconds (so the probability the interrupt lands in the gap is 40 us / 1000 us), and only 1 in 65,536 ticks causes a low-word wrap. Give events per day.",
        ideal:
          "Probability per read that a tick lands in the gap = 40e-6 / 1e-3 = 0.04. Probability that this tick is a low-word wrap = 1 / 65,536. So the probability per read is 0.04 / 65,536 = 6.1e-7. At 500 reads per second the rate is 3.05e-4 events per second; over 86,400 seconds that is 26.4 events per day. This is the same order as the rate observed in the field (a glitch about every 55 minutes), supporting the hypothesis. The dependence on gap size is linear, so shrinking the gap to 1 microsecond would cut the rate 40-fold but not eliminate it, which is why a correct atomic read is the right solution.",
        c: [
          "P(tick in gap) = 40 us / 1 ms = 0.04",
          "P(wrap) = 1 / 65,536",
          "Per read probability about 6.1e-7",
          "Rate = 500 reads/s x 6.1e-7 = 3.05e-4 per second",
          "About 26.4 events per day"
        ],
        k: ["Rare races occur at predictable rates when the pieces are quantified", "Reducing the window does not remove the bug; it only reduces the rate"],
        m: ["Forgetting the wrap probability and getting 1,728 events a day", "Using milliseconds and microseconds inconsistently"],
        answer: { value: 26.4, unit: "events per day", tolerance: 0.04 }
      },
      {
        title: "Counter rollover horizon",
        kind: "math",
        prompt:
          "While reviewing, you notice tick_ms is a 32-bit unsigned millisecond counter. After how many days does it overflow (2^32 milliseconds)? Give days.",
        ideal:
          "2^32 ms = 4,294,967,296 ms = 4,294,967 s = 49.71 days. After that the counter wraps to zero. Interval arithmetic using unsigned subtraction (now minus last) remains correct across the wrap, but absolute comparisons (if now greater than deadline) break, so any code that uses comparisons on timestamps could misbehave after 49.7 days of uptime, which is a second latent bug that field units will eventually hit. The right pattern is to compute elapsed time as (uint32_t)(now - start) and compare that with a duration. This is also a reminder to test long uptime behavior using a fast-forwarded tick in the test harness.",
        c: [
          "2^32 ms is about 4.295e9 ms",
          "Divide by 86,400,000 ms per day for 49.71 days",
          "Unsigned subtraction handles wraparound for intervals",
          "Absolute comparisons break at the wrap",
          "Test with a fast-forwarded counter"
        ],
        k: ["Latent time bugs appear only at long uptime", "Unsigned elapsed-time arithmetic is wrap-safe"],
        m: ["Confusing with the 16-bit wrap at 65.5 seconds", "Using seconds instead of milliseconds per day"],
        answer: { value: 49.71, unit: "days", tolerance: 0.02 }
      },
      {
        title: "Fix and prevent recurrence",
        kind: "synthesis",
        prompt: "What fix do you propose, what are the trade-offs, and how would you verify it and prevent similar bugs?",
        ideal:
          "Make the read atomic. Options: disable interrupts around the read of tick_ms (short critical section, a few cycles, minimal jitter on a 1 kHz tick); or use a read-retry loop that reads the high word, the low word and the high word again until the two high reads match, which needs no interrupt masking; or maintain the counter such that the main loop reads a snapshot written by the ISR atomically. Mark the variable volatile and wrap the read in an accessor function. Trade-offs: the critical section is simple but can delay other interrupts by a few microseconds; the retry loop is lock-free but needs care. For the 49.7-day wrap use wrap-safe elapsed-time arithmetic. Verify by a stress test that forces the interrupt inside the gap using a debug hook or a fast tick, running with the tick starting near a wrap (0xFFFF0000), and a soak test of multiple days. Prevent recurrence with a code review checklist for shared variables wider than the native word, a static-analysis rule, and a unit test using a simulated interrupt. Risks: the 40 microsecond gap also reveals poor structure, so remove the debug print between the loads.",
        c: [
          "Atomic access using a critical section or a retry loop",
          "Use volatile and an accessor function for the shared variable",
          "Wrap-safe elapsed-time arithmetic for the 49.7-day rollover",
          "Verification: force the interrupt in the gap and start the counter near a wrap",
          "Soak test over several days",
          "Prevention: review checklist, static analysis, simulated-interrupt unit tests"
        ],
        k: ["Rare races need deterministic stress tests, not just soak tests", "Fix the class of bug, not just the instance"],
        m: ["Only removing the debug print and shrinking the window", "Leaving the variable non-volatile"]
      }
    ]
  },

  // 11. CS: URL shortener
  {
    t: "Case: Designing a URL shortener for a marketing platform",
    opening:
      "A marketing platform wants its own short-link service. Links are created by customers through an API and clicked by the public. Leadership expects 100 million new links per month and heavy click traffic. You are asked to design the service and size it.",
    d: 1,
    discipline: "computer-science",
    tp: "systems-design",
    tp2: "databases",
    stages: [
      {
        title: "Clarify requirements",
        kind: "structure",
        prompt: "What questions would you ask, and how would you structure the design?",
        data: [
          { label: "Functional requirements", content: "Create a short link for a long URL (optional custom alias, optional expiry). Redirect to the long URL. Basic click counts." },
          { label: "Scale", content: "100 million new links per month, links kept for 5 years. Read-to-write ratio of 100 to 1. Peak traffic is 5 times the average." },
          { label: "Record size", content: "About 500 bytes per link record (long URL, metadata, owner)." },
          { label: "Non-functional", content: "Redirect p99 latency under 50 ms in region, availability 99.99 percent, short codes should not be guessable in sequence." }
        ],
        ideal:
          "Start with functional scope (create, redirect, expiry, custom aliases, analytics) and non-functional goals (latency, availability, scale, retention). Then do capacity estimation: write rate from 100 million per month, read rate from the 100-to-1 ratio, peak factor 5, storage from links times record size over 5 years, and the code length from the keyspace needed. The API has two paths: a write path that generates a unique code and stores the mapping, and a read path that is a cache-friendly key-value lookup returning an HTTP redirect (301 or 302 with the trade-off that 301 is cached by browsers and reduces analytics accuracy). The data model is a key-value mapping from code to URL, so a horizontally partitioned key-value or NoSQL store, with a cache in front, fits well. I would also discuss abuse handling (malicious URLs) and analytics as an asynchronous pipeline so redirects stay fast.",
        c: [
          "Clarify functional scope and non-functional goals first",
          "Estimate write QPS, read QPS and storage",
          "Decide how short codes are generated and the code length required",
          "Design a read path based on cache plus key-value store",
          "Discuss 301 versus 302 redirects and the analytics trade-off",
          "Handle analytics asynchronously and consider abuse protection"
        ],
        k: ["Read-heavy workloads suit caching and replication", "Capacity estimates drive the choice of storage and sharding"],
        m: ["Jumping to technologies before clarifying scale", "Putting analytics writes on the redirect critical path"]
      },
      {
        title: "Evaluate code generation options",
        kind: "analysis",
        prompt: "Here are three candidate approaches for creating short codes. Which would you choose and why?",
        exhibit:
          "Option A: hash (MD5 / SHA) of the long URL, take first 7 base62 chars\n   + deterministic, same URL gives same code\n   - collisions need check and retry; duplicates by different owners clash\nOption B: auto-increment counter in one database, base62 encode\n   + no collisions, short codes\n   - single point of contention; sequential codes are guessable\nOption C: range allocation: a coordinator hands each app server a block of 1,000,000 IDs; server encodes ID with a keyed permutation then base62\n   + no collisions, no per-write coordination, not guessable\n   - needs a small coordinator service and loses unused ranges on crash\n\nKeyspace: 62^6 = 5.68e10, 62^7 = 3.52e12.\nTotal links in 5 years: 6.0e9.",
        ideal:
          "Option C is the best fit. Hashing (A) needs collision handling and ties a code to the URL, which breaks per-customer links. A single counter (B) works at 39 writes per second on average but is a single point of failure and gives guessable codes. Range allocation (C) removes per-write coordination: each app server consumes IDs locally from a block, and a coordinator (or a database with an atomic increment) is only hit once per million links. A keyed permutation over the ID or a format-preserving encryption obscures the sequence so codes are not enumerable. Crashed servers lose unused ranges, which is irrelevant given that 6 billion links use only about 10 percent of the 62^6 keyspace, so 6 characters is enough and 7 gives plenty of room. Custom aliases need a uniqueness check using a conditional write to the store.",
        c: [
          "Option C range allocation with a keyed permutation avoids collisions and enumeration",
          "Hashing needs collision handling and does not support multiple customers with the same URL",
          "Counter works at this write rate but is a bottleneck and guessable",
          "Lost ranges are acceptable relative to the keyspace",
          "Total links of 6 billion fit in 6 base62 characters; 7 gives headroom",
          "Custom aliases require atomic uniqueness checks"
        ],
        k: ["Match the design to scale and to non-functional requirements like unguessability", "Keyspace size should be compared with expected volume rather than guessed"],
        m: ["Choosing hashing without discussing collisions", "Ignoring the guessability requirement"]
      },
      {
        title: "Storage over five years",
        kind: "math",
        prompt:
          "Compute total storage in terabytes for the link records: 100 million new links per month for 5 years, 500 bytes per record. Use 1 TB = 1e12 bytes. Give TB.",
        ideal:
          "Links over 5 years = 100e6 x 12 x 5 = 6.0e9. Storage = 6.0e9 x 500 B = 3.0e12 B = 3.0 TB. With replication factor 3 the raw storage is 9 TB, and indexes and overhead might add 30 to 50 percent, so plan around 12 to 14 TB raw. This is small enough to fit on a modest cluster of key-value nodes, and the working set (hot links) is far smaller, so caching can serve nearly all reads from memory. The estimate tells us sharding is for throughput and availability rather than for raw capacity.",
        c: [
          "6.0e9 links over 5 years",
          "500 B each gives 3.0 TB",
          "Include replication factor of 3 and index overhead",
          "Storage is modest, so the design drivers are throughput and availability",
          "Working set is much smaller than the total, which supports caching"
        ],
        k: ["Back-of-envelope estimates reveal what actually constrains the design", "Replication multiplies the footprint"],
        m: ["Forgetting to multiply by 12 months", "Confusing TB and TiB in a way that changes the order of magnitude"],
        answer: { value: 3.0, unit: "TB", tolerance: 0.03 }
      },
      {
        title: "Peak redirect throughput",
        kind: "math",
        prompt:
          "Compute the peak redirect (read) rate in requests per second: average write rate from 100 million links per month (30-day month), reads are 100 times writes, peak is 5 times average. Give requests per second.",
        ideal:
          "A 30-day month has 2,592,000 seconds. Average writes = 100e6 / 2.592e6 = 38.6 per second. Average reads = 100 x 38.6 = 3,858 per second. Peak reads = 5 x 3,858 = 19,290 per second. A single well-tuned cache node can serve tens of thousands to hundreds of thousands of simple lookups per second, so with a cache hit ratio around 95 percent the database sees only about 1,000 reads per second at peak. Several stateless redirect servers behind a load balancer are needed for availability, not raw capacity. Writes at roughly 39 per second (about 190 at peak) are trivial.",
        c: [
          "Seconds in the month 2.592e6",
          "Average writes about 38.6 per second",
          "Average reads about 3,858 per second",
          "Peak reads about 19,290 per second",
          "With a cache hit rate of 95 percent the database sees about 1,000 reads per second"
        ],
        k: ["Cache hit ratio turns a high read rate into a low database load", "Capacity needs are modest; availability and latency shape the design"],
        m: ["Forgetting the peak factor", "Using 365 days or 12 months incorrectly for the monthly rate"],
        answer: { value: 19290, unit: "requests per second", tolerance: 0.03 }
      },
      {
        title: "Present the design",
        kind: "synthesis",
        prompt: "Summarize your design, trade-offs, risks and how you would validate it.",
        ideal:
          "Architecture: a global load balancer routes to stateless redirect servers, each with an in-memory LRU cache backed by a regional distributed key-value store (code to URL), replicated across zones. Creation requests go to API servers that take IDs from locally leased blocks, encode them with a keyed permutation in base62 (6 to 7 characters), and write the mapping with a conditional put. Redirects return 302 when analytics accuracy matters (301 lowers load but is cached by browsers). Click events are published to a queue and aggregated asynchronously. Expiry is handled by a TTL on records and a lazy check on read. Capacity: about 3 TB data (9 TB replicated), peak about 19,000 reads per second, hot-set cached for under 5 ms response. Risks and mitigations: hot links (replicate cache entries or use a CDN), abuse and phishing (URL scanning, rate limits), coordinator failure (servers keep a buffer of IDs), and cache stampede (request coalescing). Validate with load tests at 2 times peak, chaos tests of node loss, and monitoring of p99 latency and cache hit rate.",
        c: [
          "Clear architecture: load balancer, stateless redirect tier, cache, replicated key-value store",
          "ID block leasing and keyed permutation for creation",
          "Redirect type decision (301 versus 302) and asynchronous analytics",
          "Capacity summary: 3 TB, about 19,000 reads per second at peak",
          "Risks and mitigations: hot keys, abuse, coordinator failure, cache stampede",
          "Validation: load test, chaos testing, SLO monitoring"
        ],
        k: ["Keep the hot path simple and cache-friendly", "Validate against the stated SLOs with load and failure tests"],
        m: ["Over-engineering with unneeded sharding of a small dataset", "No plan for abuse"]
      }
    ]
  },

  // 12. CS: notification service
  {
    t: "Case: Notification service backlog after a provider outage",
    opening:
      "A consumer app sends push notifications through a queue-based service. During a 10-minute promotional burst, a provider outage caused a backlog of 12 million messages that took too long to clear, and many users received stale offers. You are asked to size the worker fleet and redesign how the service handles bursts and backlogs.",
    d: 3,
    discipline: "computer-science",
    tp: "systems-design",
    tp2: "testing-reliability",
    stages: [
      {
        title: "Frame the reliability problem",
        kind: "structure",
        prompt: "How would you structure the analysis and what do you need to know?",
        data: [
          { label: "Traffic", content: "A promotional burst sends 50 million notifications in 10 minutes (600 seconds). Normal traffic is much lower, about 2,000 per second." },
          { label: "Workers", content: "Each worker process sustains 400 messages per second, using 20 concurrent outbound calls with a 50 ms provider latency. Autoscaling takes about 4 minutes to add capacity." },
          { label: "Provider limits", content: "The push provider accepts batches of up to 500 messages per request and rate limits at 10,000 requests per second." },
          { label: "Business rules", content: "Promotional messages expire after 15 minutes of validity. Transactional messages (security codes, order status) expire after 2 minutes and have priority over promotions." },
          { label: "Incident facts", content: "Provider returned 503 errors for 12 minutes, and the service retried immediately. After the outage a backlog of 12 million messages remained. Fleet capacity after recovery was 30,000 messages per second while new traffic continued at 18,000 per second." }
        ],
        ideal:
          "Separate three problems: peak capacity for the planned burst, behavior under downstream failure, and prioritisation with message expiry. I would ask for the traffic profile, per-worker throughput, provider limits and error behaviour, the message validity windows, and current retry policy. Then size the steady-state fleet from the burst rate with headroom, check against the provider's batching and rate limits, and model the drain time of the backlog from the capacity minus the incoming rate. On resilience, immediate retries without backoff amplify load on a failing dependency, so I would propose exponential backoff with jitter, a circuit breaker, and a dead-letter queue. On prioritisation, use separate queues or priority lanes so transactional messages are never stuck behind promotional ones, plus a time-to-live check at dequeue so stale promotions are dropped.",
        c: [
          "Split the problem into capacity, failure handling, and prioritisation or expiry",
          "Compute burst rate and the fleet required, with headroom",
          "Check provider batching and rate limits",
          "Model backlog drain time as capacity minus arrival rate",
          "Replace immediate retries with backoff, jitter, circuit breaker and dead-letter queue",
          "Use priority lanes and TTL checks so stale promotions are dropped"
        ],
        k: ["Retry storms amplify downstream failures", "Backlog drain time depends on the spare capacity, not total capacity"],
        m: ["Only adding more workers without addressing retries or priority", "Delivering stale promotional messages"]
      },
      {
        title: "Interpret queue metrics",
        kind: "analysis",
        prompt: "Here are metrics from the incident. What went wrong, and what does the data tell you about design flaws?",
        exhibit:
          "Minute   Arrivals/s   Processed/s   Provider 5xx   Queue depth (M)   Worker count\n  0       83,000       30,000          0 pct            0.0              75\n  2       83,000       30,000          0 pct            6.4              75\n  4       83,000       31,000          2 pct           12.7              90 (scaling)\n  6       83,000       12,000         60 pct           21.2              90\n 10       83,000        4,000         95 pct           37.0              90\n 14       18,000        3,000         98 pct           40.6              90\n 16       18,000        3,000         98 pct           12.0              90  (28.6M expired promos purged by hand)\n 20       18,000       30,000          0 pct           12.0              90  (provider recovered; goodput limited to 30,000/s by provider ramp-up)\n\nRetry policy: immediate retry, max 5 attempts.\nTransactional and promotional share one queue. No expiry check at dequeue.",
        ideal:
          "The fleet was never sized for the burst: 83,000 arrivals per second against 30,000 processed per second built a queue of about 12 million in four minutes before autoscaling even landed (it takes about 4 minutes). When the provider started returning errors, the immediate retries (up to 5 attempts) multiplied calls into a failing dependency and processed throughput fell from about 31,000 to 4,000 per second. The queue reached about 40 million, and transactional messages like security codes were stuck behind promotions in the same queue. There was no automatic expiry, so operators had to purge 28.6 million expired promotions by hand. After recovery the service had 30,000 per second capacity against 18,000 arrivals, leaving 12,000 per second spare to drain the remaining 12 million messages, which takes 1,000 seconds (about 17 minutes), longer than the 15-minute promo validity, so many were stale on delivery. Design flaws: no load-shedding or rate-shaping at the source, reactive autoscaling too slow for a scheduled burst, immediate retries, and a shared queue without priorities or expiry.",
        c: [
          "Fleet capacity of 30,000 per second was far below the arrival of 83,000 per second",
          "Autoscaling lag of 4 minutes let the queue grow to about 12 million",
          "Immediate retries amplified the provider failure and cut throughput",
          "Shared queue stuck transactional messages behind promotions",
          "Drain time of about 17 minutes exceeded the 15-minute validity",
          "No expiry check at dequeue and no rate shaping at the source"
        ],
        k: ["Predictable bursts should use scheduled or pre-warmed capacity or spread the sends", "Backlog drain time must be compared with message TTL"],
        m: ["Blaming only the provider outage", "Treating autoscaling as sufficient for a known burst"]
      },
      {
        title: "Workers for the burst",
        kind: "math",
        prompt:
          "The planned burst is 50 million messages in 600 seconds. Each worker sustains 400 messages per second. How many workers are needed to process the burst at its rate with 30 percent headroom? Give a whole number of workers (round to nearest).",
        ideal:
          "Burst rate = 50e6 / 600 = 83,333 messages per second. Workers at zero headroom = 83,333 / 400 = 208.3. With 30 percent headroom: 208.3 x 1.3 = 270.8, so about 271 workers. The incident fleet was 75 workers (30,000 / 400), which was only 36 percent of what was needed at zero headroom. Because autoscaling takes 4 minutes, the extra 196 workers must be pre-warmed on a schedule before the promotion, or the sends should be spread over 30 minutes (28,000 per second, about 70 workers). The provider batching limit gives 83,333 / 500 = 167 requests per second, far below its 10,000 per second cap, so the provider limit is not the constraint if batching is used.",
        c: [
          "Burst rate 50e6 / 600 = 83,333 per second",
          "Without headroom 208.3 workers",
          "With 30 percent headroom about 271 workers",
          "Compare with the 75 workers actually running",
          "Alternative: spread the burst over longer time to cut the fleet"
        ],
        k: ["Spreading the load is often cheaper than provisioning for the peak", "Batching removes the provider rate limit from the critical path"],
        m: ["Forgetting headroom", "Dividing by 60 instead of 600"],
        answer: { value: 271, unit: "workers", tolerance: 0.02 }
      },
      {
        title: "Backlog drain time",
        kind: "math",
        prompt:
          "After the provider recovered, 12 million messages were queued. Capacity was 30,000 per second and new arrivals were 18,000 per second. How long to drain the backlog, in seconds?",
        ideal:
          "Net drain rate = 30,000 - 18,000 = 12,000 messages per second. Drain time = 12,000,000 / 12,000 = 1,000 seconds, about 16.7 minutes. This exceeds the 15-minute validity for promotions, so the oldest messages would be stale, and it far exceeds the 2-minute validity for transactional messages, which is unacceptable. Doubling the fleet to 60,000 per second would cut it to 12e6 / 42,000 = 286 seconds. Priority lanes with a reserved transactional capacity and TTL-based dropping at dequeue would deliver the important messages first, regardless of the backlog.",
        c: [
          "Net drain rate 12,000 per second",
          "Drain time 12e6 / 12,000 = 1,000 s (16.7 minutes)",
          "Exceeds the 15-minute promotional validity and the 2-minute transactional validity",
          "Doubling capacity would reduce it to about 286 s",
          "Priority and TTL drop reduce harm regardless of drain time"
        ],
        k: ["Spare capacity, not total capacity, sets the drain time", "TTL and priority limit user harm in a backlog"],
        m: ["Using total capacity of 30,000 and getting 400 seconds", "Ignoring arrivals while draining"],
        answer: { value: 1000, unit: "seconds", tolerance: 0.03 }
      },
      {
        title: "Redesign and rollout",
        kind: "synthesis",
        prompt: "What redesign would you propose, with trade-offs, risks and how you would verify it?",
        ideal:
          "Redesign in layers. Ingest: separate priority queues (transactional, promotional) with reserved worker capacity for transactional and a TTL check at dequeue that drops expired promotions into a counter instead of sending. Smooth the load: the campaign scheduler spreads sends over a window (for example 30 minutes) using rate shaping, and pre-warms about 70 to 280 workers on a schedule rather than relying on reactive autoscaling. Resilience: batch calls of 500, exponential backoff with jitter, a circuit breaker per provider with automatic failover to a secondary provider, and a dead-letter queue with replay. Idempotency keys prevent duplicate sends on retry. Observability: alert on queue age (not just depth), drain-time estimates, and provider error rate. Trade-offs: spreading sends delays some users slightly, a secondary provider adds cost and routing complexity, and dropping expired messages reduces reach but protects trust. Verification: load test at 100 million messages, fault injection returning 503s from the provider, a game day with a simulated outage, and tracking of delivery-latency percentiles by priority. Risks include duplicate notifications on failover and a coordinator becoming a bottleneck.",
        c: [
          "Priority queues with reserved capacity and TTL drop at dequeue",
          "Rate-shape campaigns and pre-warm capacity",
          "Backoff with jitter, circuit breaker, secondary provider, dead-letter queue",
          "Idempotency keys to avoid duplicate sends",
          "Alert on queue age and estimated drain time",
          "Verification: load test, fault injection and game days"
        ],
        k: ["Design for failure of the dependency and for known bursts, not the average case", "Queue age is a better health signal than queue depth"],
        m: ["Only scaling the fleet", "Retries without idempotency, causing duplicates"]
      }
    ]
  }
];
