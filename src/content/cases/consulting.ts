import type { CaseDef } from "./types";

export const consultingCases: CaseDef[] = [
  // ---------------------------------------------------------------- 1
  {
    t: "Case: Brightwave Dairy profit squeeze",
    opening:
      "Brightwave Dairy is a regional producer of yogurt sold in single-serve cups through supermarkets. Over the last two years its revenue has grown, yet profit has fallen. The CEO has asked you to find out why and what to do about it.",
    d: 1,
    discipline: "consulting",
    tp: "case-structuring",
    tp2: "case-math",
    stages: [
      {
        title: "Structure the problem",
        kind: "structure",
        prompt:
          "Take a minute to organise your thoughts. How would you structure an analysis of why Brightwave's profit has declined while revenue has grown? Tell me your framework and which information you would like first.",
        data: [
          { label: "Client's business model", content: "Brightwave buys raw milk from about 120 farms, processes it in one plant, fills cups and sells to 4 supermarket chains plus independents. 85% of volume is branded, 15% is private label." },
          { label: "Competitors", content: "Two national brands hold about 55% of the regional market. Private-label yogurt from supermarkets holds about 20%. Brightwave holds about 12%." },
          { label: "Product mix", content: "Plain and fruit yogurt cups make up 90% of volume. A premium Greek line (10% of volume) launched in 2023." },
          { label: "Cost structure", content: "Variable costs are milk, packaging and distribution. Fixed costs are plant labour, depreciation, marketing and overhead." },
        ],
        ideal:
          "I would split profit into revenue and cost and then drill down. Revenue is volume times price, by product line and customer channel, so I would test whether growth came from volume while price per cup was squeezed by mix or discounting. Costs split into variable (milk, packaging, distribution, per cup) and fixed (plant, marketing, overhead); I would check which moved most, for example milk price inflation. I would also look at external factors: competitors, retailer power and input prices. My hypothesis is that unit cost grew faster than price. First I would like volume, price and cost per cup for the last two years.",
        c: [
          "Starts from the profit = revenue - cost identity and splits revenue into price x volume",
          "Separates variable cost per unit from fixed cost",
          "Considers mix across product lines and customers (branded vs private label, Greek vs regular)",
          "Includes external factors such as input prices, competitor and retailer behaviour",
          "States a hypothesis and the first data requested",
        ],
        k: [
          "Revenue growth with falling profit means margin per unit fell or fixed cost rose more than contribution",
          "A MECE profit tree lets you isolate the driver quickly instead of guessing",
        ],
        m: [
          "Listing generic buckets (market, company, competition) without linking them to profit",
          "Asking for all data at once instead of prioritising the trend by unit economics",
        ],
      },
      {
        title: "Read the trend data",
        kind: "analysis",
        prompt:
          "Here are the headline numbers for 2022 and 2024. What do you take from them, and what would you like to dig into next?",
        exhibit:
          "                         2022     2024\nVolume (M cups)          36       40\nAvg price ($/cup)        1.45     1.50\nVariable cost ($/cup)    0.80     0.95\nFixed cost ($M)          11.0     12.0\nProfit ($M)              12.4     10.0",
        data: [
          { label: "Breakdown of variable cost per cup", content: "                 2022   2024\nMilk             0.50   0.62\nPackaging        0.14   0.16\nDistribution     0.16   0.17\nTotal            0.80   0.95" },
          { label: "Reason for fixed cost increase", content: "Plant labour wages up 6%, plus $0.6M extra marketing for the Greek launch." },
          { label: "Milk price trend", content: "Regional raw milk price rose about 24% between 2022 and 2024. Brightwave has no hedging or long-term contracts." },
        ],
        ideal:
          "Volume grew 11% and price 3%, so revenue went from about 52 to 60 million dollars, but variable cost per cup rose 19%, from 0.80 to 0.95. Contribution per cup fell from 0.65 to 0.55 dollars, a 15% drop, which more than offset the extra volume. Fixed cost increased by 1 million but is a smaller factor. The main driver is milk, up from 0.50 to 0.62 per cup, which accounts for 0.12 of the 0.15 increase. The company only passed through about a third of the cost increase in price. Next I would test pricing power and ask whether milk contracts or cost savings can offset this.",
        c: [
          "Computes contribution per cup falling from 0.65 to 0.55",
          "Notes volume +11%, price +3%, variable cost +19%",
          "Identifies milk as the largest driver (0.12 of the 0.15 increase)",
          "Observes that price increases only partially passed through cost inflation",
          "Notes fixed cost increase is minor by comparison",
        ],
        k: [
          "Unit contribution rather than revenue explains profit when volume rises",
          "Cost pass-through is limited by competitor and retailer power, which shapes the recommendation",
        ],
        m: [
          "Concluding that growth is good because revenue rose",
          "Focusing on fixed costs, which explain only 1 of the roughly 2.4 million dollar decline from 2022",
        ],
      },
      {
        title: "Break-even volume",
        kind: "math",
        prompt:
          "Using 2024 price, variable cost per cup and fixed cost from the table, what annual volume does Brightwave need to break even? Give your answer in millions of cups.",
        exhibit:
          "2024: price $1.50 per cup, variable cost $0.95 per cup, fixed cost $12.0M per year.",
        ideal:
          "Contribution per cup in 2024 is 1.50 minus 0.95, which is 0.55 dollars. Break-even volume equals fixed cost divided by contribution per cup, so 12.0 million divided by 0.55 is about 21.8 million cups. Current volume is 40 million cups, so Brightwave sits about 45% above break-even, which means a healthy safety margin on volume but not on unit margin. The business is not at risk of losses today, but each further cent of cost inflation per cup removes 0.4 million dollars of profit at current volume.",
        c: [
          "Contribution per cup = 1.50 - 0.95 = 0.55",
          "Break-even = fixed cost / contribution = 12.0 / 0.55",
          "Result of about 21.8 million cups",
          "Compares with current 40 million cups (about 45% margin of safety)",
        ],
        k: [
          "Break-even uses contribution margin, not price",
          "Sensitivity to cost per cup matters more than volume at this point",
        ],
        m: [
          "Dividing fixed cost by price instead of contribution",
          "Mixing units (million cups vs cups) in the division",
        ],
        answer: { value: 21.82, unit: "million cups", tolerance: 0.03 },
      },
      {
        title: "Cost reduction target",
        kind: "math",
        prompt:
          "The CEO wants profit back to the 2022 level of 12.4 million dollars without touching price, volume or fixed cost. By how many dollars per cup must variable cost fall from its 2024 level?",
        exhibit:
          "2024 volume: 40 million cups. 2024 profit: $10.0M. Target profit: $12.4M (2022 level).",
        ideal:
          "The profit gap is 12.4 minus 10.0, so 2.4 million dollars. At 40 million cups, each cent of variable cost saved is worth 0.4 million dollars, so I need 2.4 divided by 40, which is 0.06 dollars per cup. That is a 6.3% cut on the 0.95 cost, equal to bringing cost per cup back from 0.95 to 0.89. It is ambitious but plausible through packaging redesign, milk contract renegotiation or a modest price increase on the premium line, so I would combine levers rather than rely on one.",
        c: [
          "Profit gap = 12.4 - 10.0 = 2.4 million",
          "Required saving per cup = 2.4M / 40M cups",
          "Result of 0.06 dollars per cup",
          "Expresses as about 6% of current variable cost",
          "Suggests which levers could deliver it",
        ],
        k: [
          "With volume fixed, per-unit savings translate linearly into profit",
          "A sanity check against the cost breakdown shows the target is feasible only with several levers",
        ],
        m: [
          "Forgetting to convert million cups to a per-cup figure",
          "Targeting 2.4 million of savings in fixed cost without checking feasibility",
        ],
        answer: { value: 0.06, unit: "$ per cup", tolerance: 0.03 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "The CEO meets the board tomorrow. Give a concise recommendation on how to restore profit, with the main risks and your next steps.",
        ideal:
          "Profit fell because variable cost per cup rose by 15 cents, mostly milk, while price rose only 5 cents. To restore the 2.4 million dollars I recommend a three-part plan: first, renegotiate and diversify milk supply with longer fixed-price contracts, targeting about 3 cents per cup; second, take targeted price increases on the branded and premium lines where brand loyalty is strongest, worth about 2 to 3 cents per cup; third, reduce packaging cost per cup by 1 to 2 cents through lighter cups and bulk purchasing. Risks include retailers delisting after price increases, private label taking share and supplier push-back. Next steps are a pricing test in one retail chain, a procurement tender for milk, and a monthly unit cost dashboard.",
        c: [
          "Names root cause: unit cost inflation, mainly milk, not passed through to price",
          "Gives a multi-lever plan with sized impact (procurement, pricing, packaging)",
          "Quantifies the target of 6 cents per cup or 2.4 million dollars",
          "States risks such as retailer pushback, private-label substitution, supplier resistance",
          "Proposes concrete next steps with owners or timing",
        ],
        k: [
          "A recommendation must connect the diagnosis, a quantified plan and risks",
          "Pricing and cost levers should be sequenced to protect volume while margin recovers",
        ],
        m: [
          "Recommending growth in volume as the fix when contribution per cup is falling",
          "Listing actions without sizing them against the 2.4 million gap",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 2
  {
    t: "Case: VoltRiver fast-charging market entry",
    opening:
      "VoltRiver is a successful operator of public electric-vehicle fast-charging stations in a neighbouring country. It is considering entering Marenia, a country of about 8 million people where EV adoption is rising. The board wants to know whether to enter and how large the opportunity is.",
    d: 2,
    discipline: "consulting",
    tp: "case-strategy",
    tp2: "market-sizing",
    stages: [
      {
        title: "Structure the entry decision",
        kind: "structure",
        prompt:
          "How would you structure the analysis of whether VoltRiver should enter Marenia? Present your framework and tell me which information you would request first.",
        data: [
          { label: "VoltRiver's capabilities", content: "Operates 600 fast chargers at home. Strong site-acquisition team, in-house software and a loyalty app with 400,000 users. Has 90 million dollars of capital available for expansion." },
          { label: "Marenia EV market", content: "400,000 EVs on the road today, growing about 30% per year. Government subsidy for EV purchase is guaranteed for 4 more years." },
          { label: "Regulation", content: "Public chargers need a grid-connection permit (typically 9 to 12 months). Government offers a 30% capex grant for chargers outside of the 3 largest cities." },
          { label: "Competitor landscape", content: "Three networks operate today; see the exhibit in the next step for details." },
        ],
        ideal:
          "I would look at market attractiveness, the ability to win and the economics of entry. Attractiveness: current and future EV fleet, share of drivers without home charging, charging demand per vehicle, and regulation and subsidies. Ability to win: competitor positions, their prices and utilisation, VoltRiver's cost advantage, site access and brand. Economics: capex per charger, utilisation needed to break even, ramp-up and payback. Finally entry mode: greenfield build, partnership with a retailer or acquisition of a weak network, plus risks such as grid permits and price competition. First I would like the current EV fleet and competitor data to size demand.",
        c: [
          "Covers market attractiveness (size, growth, regulation)",
          "Covers competitive position and VoltRiver's right to win",
          "Includes entry economics (capex, utilisation, payback)",
          "Considers entry modes (greenfield, partnership, acquisition)",
          "Mentions risks such as permits, price war and demand uncertainty",
        ],
        k: [
          "A market entry framework needs both market and company-fit views before economics",
          "Entry mode choice depends on speed and capital intensity",
        ],
        m: [
          "Using a generic 4Ps list without a decision logic",
          "Focusing only on market size without checking whether VoltRiver can win",
        ],
      },
      {
        title: "Assess the competition",
        kind: "analysis",
        prompt:
          "Here is the picture of the incumbent networks in Marenia. What does it tell you about how attractive the market is, and where could VoltRiver find a way in?",
        exhibit:
          "Network     Fast chargers   Share of chargers   Price ($/kWh)   Avg utilisation   Network reliability\nGridOne     260             52%                 0.46            11%               82%\nEcoVolt     140             28%                 0.42            14%               91%\nPlugCity    100             20%                 0.50            9%                76%\nTotal       500             100%",
        data: [
          { label: "Where chargers are located", content: "78% of chargers are in the 3 largest cities. Highways and mid-sized towns have only 14% of chargers but 30% of long-distance EV trips." },
          { label: "Customer complaints", content: "Top complaints: broken chargers (45%), queueing at peak (25%), complex payment (20%)." },
        ],
        ideal:
          "The market is concentrated in three players, but none is dominant on quality: GridOne has the most chargers, but reliability of 82% and utilisation of 11% suggest the leader is not very efficient; EcoVolt is best on reliability and utilisation at a lower price. Utilisation of 9 to 14% is low, which hints at oversupply in the big cities, so a head-on entry there would be risky. The gap is highway and mid-sized town locations, where only 14% of chargers serve 30% of long-distance trips, plus quality: complaints about broken chargers and payment are exactly VoltRiver's strengths in reliability and software. I would enter with highway and mid-size town sites, possibly with the 30% capex grant.",
        c: [
          "Notes three-player market with fragmented quality and low utilisation (9% to 14%)",
          "Notes reliability gap (76% to 91%) and the importance of broken chargers in complaints",
          "Identifies geographic gap: highways and mid-sized towns underserved",
          "Links gap to VoltRiver's strengths (reliability, software, app)",
          "Mentions the capex grant outside big cities",
        ],
        k: [
          "Low utilisation in cities suggests oversupply, so white space matters more than share",
          "Entry strategy should target a differentiated segment instead of matching incumbents",
        ],
        m: [
          "Concluding the market is unattractive because of low utilisation, without looking at segments",
          "Ignoring reliability and location data in the exhibit",
        ],
      },
      {
        title: "Size the charging demand",
        kind: "math",
        prompt:
          "To size the opportunity, estimate the annual number of public charging sessions generated by EV drivers who do not have home charging. Give the answer in millions of sessions per year.",
        exhibit:
          "EVs on the road: 400,000. Share of EV owners without home charging: 40%. These drivers use public chargers 1.5 times per week on average. Assume 52 weeks per year. (Ignore sessions by drivers with home charging.)",
        ideal:
          "Drivers without home charging are 400,000 times 40%, so 160,000 drivers. Each uses public charging 1.5 times per week, or 78 sessions per year, so total demand is 160,000 times 78, which is 12.48 million sessions per year. This is a floor, because drivers with home charging also use public chargers on long trips, and the fleet is growing 30% per year, so in two years the same calculation would give about 21 million sessions. The estimate is a good basis for sizing the number of chargers.",
        c: [
          "Drivers without home charging = 400,000 x 40% = 160,000",
          "Sessions per driver per year = 1.5 x 52 = 78",
          "Total = about 12.5 million sessions per year",
          "Notes this is a conservative floor, excluding home-charging drivers' trips",
          "Mentions fleet growth of 30% per year",
        ],
        k: [
          "Market sizing multiplies a segment population by a usage rate",
          "A growing fleet means the number is a lower bound for network planning",
        ],
        m: [
          "Using the entire fleet instead of the non-home-charging segment",
          "Forgetting to annualise weekly sessions",
        ],
        answer: { value: 12.48, unit: "million sessions per year", tolerance: 0.03 },
      },
      {
        title: "Chargers needed",
        kind: "math",
        prompt:
          "VoltRiver aims for a 25% share of those sessions. If each charger delivers 10 sessions per day, 365 days a year, how many chargers does it need?",
        exhibit:
          "Annual sessions in the segment: 12.48 million. Target share: 25%. Each charger: 10 sessions per day, 365 days per year.",
        ideal:
          "A 25% share of 12.48 million sessions is 3.12 million sessions. One charger delivers 10 times 365, so 3,650 sessions per year, so VoltRiver needs 3.12 million divided by 3,650, around 855 chargers. That is more than the 600 it runs at home and well above the 500 existing in Marenia, which seems high, so I would stage the rollout and begin with 150 to 200 highway chargers, then expand as utilisation proves out. At 10 sessions per day, utilisation is high relative to the 9 to 14% of incumbents, so the assumption should be tested.",
        c: [
          "Target sessions = 12.48M x 25% = 3.12M",
          "Annual sessions per charger = 10 x 365 = 3,650",
          "Chargers needed = 3.12M / 3,650, about 855",
          "Flags that 855 is larger than the whole current network and phasing is needed",
          "Questions the 10 sessions per day assumption vs current low utilisation",
        ],
        k: [
          "Supply must be sized from demand and per-unit capacity",
          "Sanity checks against the existing network reveal whether the assumption is realistic",
        ],
        m: [
          "Using 12.48 million without applying the 25% share",
          "Dividing by daily instead of annual capacity",
        ],
        answer: { value: 854.8, unit: "chargers", tolerance: 0.05 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "Summarise your recommendation to the VoltRiver board: enter or not, how, and what could go wrong.",
        ideal:
          "I recommend entering Marenia, but in a staged way. The EV fleet is growing 30% per year, demand from drivers without home charging is at least 12 million sessions annually and incumbents are weak on reliability and mid-sized-town coverage. Entry should focus on highway and mid-sized town sites using the 30% capex grant, with an initial 150 to 200 chargers, rather than 855, and expand when utilisation exceeds a threshold. Risks are grid permit delays of 9 to 12 months, a price war by incumbents, the end of subsidies after four years and an optimistic utilisation assumption. Next steps are to secure permits and sites with two retail partners, build a business case with utilisation scenarios and test the app offering with early adopters.",
        c: [
          "Gives a clear enter recommendation with conditions",
          "Cites demand and competitor evidence (12 million sessions, reliability gap)",
          "Specifies how to enter (segment, staging, capex grant)",
          "Lists risks: permits, price war, subsidy end, utilisation assumption",
          "Proposes concrete next steps",
        ],
        k: [
          "A staged entry limits capital at risk while the demand assumption is tested",
          "Differentiated positioning is safer than competing on price against incumbents",
        ],
        m: [
          "Recommending a full 855-charger rollout without validating utilisation",
          "Skipping risks or next steps",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 3
  {
    t: "Case: Lumina Analytics subscription pricing",
    opening:
      "Lumina Analytics sells dashboard software to mid-sized retailers on a monthly subscription. It has 5,000 customers on a single plan at 200 dollars per month and has not raised prices in four years. The CEO is considering a price increase and wants your advice.",
    d: 2,
    discipline: "consulting",
    tp: "case-strategy",
    tp2: "case-math",
    stages: [
      {
        title: "Structure the pricing question",
        kind: "structure",
        prompt:
          "How would you approach the question of whether and how much Lumina should raise its price? Describe your framework and the information you would ask for.",
        data: [
          { label: "Cost structure", content: "Variable cost (hosting, support) is about 40 dollars per customer per month. Fixed costs are about 3 million dollars per year for engineering and sales." },
          { label: "Competitor pricing", content: "Competitor A: 260 dollars per month with more features. Competitor B: 180 dollars per month with fewer integrations. Two small entrants at 120 to 150 dollars." },
          { label: "Customer segments", content: "60% small retailers (under 20 stores), 40% larger chains (20+ stores). Larger chains use 3x more dashboards and support." },
          { label: "Customer value", content: "Customer surveys indicate average value of 2 to 4 times the subscription cost, mostly from reduced stock-outs." },
        ],
        ideal:
          "I would use the three Cs of pricing: costs, customers and competitors. On cost, check unit contribution and what price covers the cost and the fixed base. On customers, understand willingness to pay by segment, the value delivered and switching costs, because larger chains may behave differently to small retailers. On competitors, benchmark features and price to see where Lumina sits. I would then quantify the trade-off between higher price per customer and customer losses, find the break-even loss rate and test price points. Finally consider alternatives to a flat increase: tiering, usage-based pricing and grandfathering. Please share competitor prices and customer segments first.",
        c: [
          "Uses cost, customer, competitor perspectives",
          "Segments customers by size and willingness to pay",
          "Plans to quantify the break-even customer loss from a price rise",
          "Considers price structure alternatives such as tiers or usage-based pricing",
          "Considers rollout approach, such as grandfathering and testing",
        ],
        k: [
          "Price increases are profitable if customer loss is below the break-even loss rate",
          "Pricing should be linked to delivered value, not only to cost plus margin",
        ],
        m: [
          "Fixating on cost-plus pricing",
          "Treating all customers as one homogeneous group",
        ],
      },
      {
        title: "Interpret the price test",
        kind: "analysis",
        prompt:
          "Lumina ran a price test with three cohorts. What does it tell you, and what do you want to compute next?",
        exhibit:
          "Cohort   New price   Customers notified   Cancelled after notice (net of normal churn)\nA        $200        1,000                0.0%\nB        $215        1,000                4.0%\nC        $230        1,000                10.0%\n\nNote: cancellations measured over the 90 days after notice.",
        data: [
          { label: "Cancellations by segment", content: "At 230 dollars: small retailers 14% cancelled, larger chains 3% cancelled." },
          { label: "Reasons given for cancelling", content: "Price too high relative to cheaper tools (62%), moving to in-house spreadsheets (25%), other (13%)." },
        ],
        ideal:
          "Losses rise non-linearly: 4% at 215 dollars, which is a 7.5% increase, and 10% at 230, a 15% increase, so the cancellation rate grows faster than the price. That suggests the 230 dollar price crosses a threshold for price-sensitive customers. The segment data matter most: small retailers cancel at 14% against only 3% for larger chains, so a uniform increase hits small customers harder, and a segmented or tiered approach looks better. Next I would compute the break-even customer loss for 230 dollars, given the 40 dollar variable cost, then compare with the 10% observed loss. Also check the longer-term churn after 90 days.",
        c: [
          "Notes cancellation rises from 0% to 4% to 10% as price rises",
          "Computes the price increase as 7.5% and 15%",
          "Spots segment difference (14% small vs 3% large)",
          "Suggests tiering or targeting increase to the less sensitive segment",
          "Proposes break-even analysis as next step",
        ],
        k: [
          "Elasticity differs by segment, so the average hides the best action",
          "A 90-day window may understate or overstate long-run churn",
        ],
        m: [
          "Using only the average loss without segmenting",
          "Concluding 230 dollars is wrong without comparing the loss with the break-even rate",
        ],
      },
      {
        title: "Break-even customer loss",
        kind: "math",
        prompt:
          "If the price rises from 200 to 230 dollars, what share of customers can Lumina lose before total contribution falls below today's level? Give a percentage.",
        exhibit:
          "Current price $200 per month; proposed price $230 per month; variable cost $40 per customer per month. Fixed costs unchanged.",
        ideal:
          "Today each customer yields 200 minus 40, so 160 dollars of contribution. At 230 dollars each remaining customer yields 190. To hold contribution constant, the customer count can drop to 160 divided by 190, which is 84.2% of today's base, so the break-even loss is about 15.8%. The test shows 10% cancellations at 230, below the break-even 15.8%, so the increase looks profitable with a cushion of about 6 points, though segment differences and long-term churn must be watched.",
        c: [
          "Current contribution per customer = 200 - 40 = 160",
          "New contribution per customer = 230 - 40 = 190",
          "Break-even loss = 1 - 160/190 = about 15.8%",
          "Compares to the observed 10% loss in the test",
        ],
        k: [
          "Break-even loss depends on contribution margin, not on price alone",
          "A high margin business tolerates more customer loss from a price increase",
        ],
        m: [
          "Using revenue instead of contribution, which gives 13%",
          "Computing price increase / new price = 13% and treating it as the answer",
        ],
        answer: { value: 15.8, unit: "%", tolerance: 0.03 },
      },
      {
        title: "Profit impact",
        kind: "math",
        prompt:
          "Assume the 230 dollar price leads to 10% of the 5,000 customers cancelling. What is the change in annual contribution, in millions of dollars?",
        exhibit:
          "5,000 customers today at $200 per month; variable cost $40 per customer per month. New price $230; 10% of customers cancel. 12 months per year.",
        ideal:
          "Current annual contribution is 5,000 times 160 times 12, which is 9.6 million dollars. After the increase, 4,500 customers remain at 190 dollars of contribution, so 4,500 times 190 times 12 is 10.26 million. The change is a gain of 0.66 million dollars per year, about 7%. This is a modest gain compared with the revenue effect, since revenue rises from 12.0 to 12.4 million dollars, so the risk of long-term churn and competitor reactions should be weighed. A segmented approach, raising prices mainly for large chains, would lift the gain further.",
        c: [
          "Current contribution = 5,000 x 160 x 12 = 9.6M",
          "New contribution = 4,500 x 190 x 12 = 10.26M",
          "Change = +0.66M per year",
          "Notes the gain is only about 7% and sensitive to the churn assumption",
        ],
        k: [
          "The profit change combines a price gain and a volume loss",
          "Sensitivity to churn is the main risk in the business case",
        ],
        m: [
          "Using revenue difference (0.4M) instead of contribution difference",
          "Forgetting to annualise monthly figures",
        ],
        answer: { value: 0.66, unit: "$M per year", tolerance: 0.03 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "What would you recommend to the CEO regarding the price increase? Include risks and next steps.",
        ideal:
          "I recommend a differentiated increase rather than a flat 230 dollars. The test shows the flat increase is profitable, adding about 0.66 million dollars, because the 10% cancellation rate is below the 15.8% break-even. But small retailers cancel at 14% while large chains cancel only at 3%, so I would raise large-chain prices to 230 dollars or introduce a premium tier, and keep small customers at 200 to 215 dollars with a lighter plan. I would grandfather existing customers for three months and offer annual contracts for a discount. Risks include competitor A undercutting, higher churn after 90 days and damage to the brand with smaller retailers. Next steps are a segment-level test over six months and tracking long-run churn monthly.",
        c: [
          "Recommends a segmented or tiered price increase",
          "Backs the recommendation with break-even and test results",
          "Quantifies the gain (about 0.66M) and the cushion between 10% and 15.8%",
          "Lists risks: competitor reaction, long-term churn, brand damage",
          "Gives next steps (segment testing, churn tracking, communication plan)",
        ],
        k: [
          "Segment differences in elasticity are the most important lever",
          "Pricing changes should be reversible and monitored through churn metrics",
        ],
        m: [
          "Recommending the highest price tested without considering segment effects",
          "Ignoring long-term churn beyond the 90-day test window",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 4
  {
    t: "Case: Acquiring Harborline Logistics",
    opening:
      "A private equity fund, Northgate Partners, is considering buying Harborline Logistics, a regional trucking and warehousing company. The owner is asking 135 million dollars. Northgate has hired you to assess whether it is a good deal and what a fair price is.",
    d: 3,
    discipline: "consulting",
    tp: "case-strategy",
    tp2: "case-math",
    stages: [
      {
        title: "Structure the due diligence",
        kind: "structure",
        prompt:
          "How would you structure your due diligence on Harborline? Lay out your approach and tell me what you would ask for first.",
        data: [
          { label: "Business overview", content: "Harborline owns 320 trucks and 4 warehouses in the north of the country. Revenue is split 65% contract haulage, 25% warehousing, 10% spot haulage. Founded 22 years ago, owner-managed." },
          { label: "Buyer's investment criteria", content: "Northgate targets a 20% annual return over 5 years. It typically values logistics assets at 7.5x EBITDA." },
          { label: "Customer base", content: "About 60 customers. The top customer is a food retailer representing 38% of revenue, with a contract ending in 14 months." },
          { label: "Industry trends", content: "Driver shortage pushes wages up 5 to 7% per year. Diesel is about 20% of costs. Demand growth is about 3% per year." },
        ],
        ideal:
          "I would assess the deal on four axes. Market and strategic fit: industry growth, competitive position, driver shortage and fuel exposure. Business quality: customer concentration, contract terms, fleet age, utilisation and margins by segment. Financial quality: normalised EBITDA, one-off items, working capital, debt and capex needs. Value and deal: valuation versus multiples and synergies, how Northgate reaches its 20% return, and risks such as the top customer's contract expiry and owner dependence. Early requests would be the P&L with adjustments and the customer contracts. I would be sceptical until the true earnings are known.",
        c: [
          "Covers market and competitive position",
          "Covers customer concentration and contract risk",
          "Covers financial quality: normalised EBITDA, capex, working capital, debt",
          "Covers valuation and return requirements, including synergies",
          "Mentions management or owner dependence",
        ],
        k: [
          "Due diligence should test the assumptions behind the asking price, mainly the sustainable earnings",
          "Customer concentration and contract renewal drive risk more than industry growth",
        ],
        m: [
          "Only checking the financial statements and ignoring commercial risks",
          "Accepting reported EBITDA at face value",
        ],
      },
      {
        title: "Interpret financial and operational data",
        kind: "analysis",
        prompt:
          "Here is a summary of Harborline's recent performance. What stands out, and what concerns would you want to investigate?",
        exhibit:
          "                          Year -2   Year -1   Last year\nRevenue ($M)              180       188       196\nReported EBITDA ($M)      14.6      15.2      18.0\nEBITDA margin             8.1%      8.1%      9.2%\nAvg truck age (years)     5.1       6.0       6.9\nDriver turnover           22%       26%       31%\nTop customer share        34%       36%       38%",
        data: [
          { label: "Explanation of last year's EBITDA jump", content: "Last year's EBITDA includes a 2.5 million dollar one-off insurance settlement. The owner also pays himself 2.2 million dollars versus about 1.0 million dollars for a market-rate manager. The main warehouse is rented from the owner's family company at 0.7 million dollars below the market rent." },
          { label: "Capex history", content: "Capex was 7 million dollars a year two years ago, 5 million last year and 3 million this year, versus about 8 million needed to maintain a fleet of this size." },
        ],
        ideal:
          "Reported EBITDA jumped from 15.2 to 18.0 million dollars, a 18% increase on 4% revenue growth, which is suspicious. The one-off insurance settlement of 2.5 million explains most of that, and the underlying margin is about 8.1%, unchanged. At the same time the business looks to be harvested: truck age is rising from 5.1 to 6.9 years, capex fell from 7 to 3 million dollars against a need of about 8 million, and driver turnover is up from 22% to 31%. Customer concentration is rising, and the top customer's contract ends in 14 months. So quality of earnings is weaker than headline numbers suggest, and I would normalise EBITDA and consider deferred capex as a debt-like item.",
        c: [
          "Flags the EBITDA jump as out of line with revenue growth",
          "Identifies the one-off 2.5M insurance gain",
          "Notes underinvestment: fleet age, capex 3M vs about 8M needed",
          "Notes driver turnover and customer concentration trends",
          "Proposes normalising EBITDA and treating deferred capex as a valuation issue",
        ],
        k: [
          "Quality of earnings matters more than headline EBITDA when applying a multiple",
          "Underinvestment boosts current cash flow but transfers cost to the buyer",
        ],
        m: [
          "Reading margin improvement as operational excellence",
          "Ignoring related-party items like owner salary and rent",
        ],
      },
      {
        title: "Normalised EBITDA",
        kind: "math",
        prompt:
          "Adjust last year's reported EBITDA for the one-off gain, the owner's salary and the below-market related-party rent. What is the normalised EBITDA, in millions of dollars?",
        exhibit:
          "Reported EBITDA: $18.0M. One-off insurance settlement included: $2.5M. Owner salary $2.2M vs market-rate manager $1.0M. Warehouse rent is $0.7M below market (related party).",
        ideal:
          "Start with reported EBITDA of 18.0 million. Remove the one-off insurance gain, which is minus 2.5. The owner is paid 2.2 against a market cost of 1.0, so adding back the excess increases EBITDA by 1.2. The warehouse rent is 0.7 below market, which flatters EBITDA, so I deduct 0.7. Normalised EBITDA is 18.0 minus 2.5 plus 1.2 minus 0.7, which is 16.0 million dollars. At the asking price of 135 million this is a multiple of 8.4 times versus Northgate's usual 7.5 times.",
        c: [
          "Starts from reported EBITDA of 18.0",
          "Removes the one-off gain of 2.5",
          "Adds back the excess owner salary of 1.2 (not the full 2.2)",
          "Deducts the below-market rent benefit of 0.7",
          "Reaches 16.0 and relates it to the 135M asking price (about 8.4x)",
        ],
        k: [
          "Adjustments must be symmetric: add back costs that would disappear, deduct benefits that would not continue",
          "The normalised figure, not the reported one, drives valuation",
        ],
        m: [
          "Adding back the full owner salary instead of the excess over market pay",
          "Treating the below-market rent as an add-back instead of a deduction",
        ],
        answer: { value: 16.0, unit: "$M", tolerance: 0.02 },
      },
      {
        title: "Maximum price with synergies",
        kind: "math",
        prompt:
          "Northgate owns another logistics business and expects 3.0 million dollars of annual EBITDA synergies from the deal. Northgate is willing to share half of the capitalised value of synergies with the seller. Using normalised EBITDA and the 7.5x multiple, what is the maximum price Northgate should pay, in millions of dollars?",
        exhibit:
          "Normalised EBITDA: $16.0M. Valuation multiple: 7.5x. Run-rate synergies: $3.0M EBITDA. Share of synergy value paid to seller: 50%.",
        ideal:
          "Stand-alone value is 16.0 times 7.5, which is 120 million dollars. Synergies of 3.0 million capitalised at the same 7.5 times are worth 22.5 million. Paying half, 11.25 million, gives a maximum price of 131.25 million dollars. That is below the 135 million asking price by about 3.75 million, and before adjusting for the 5 million annual capex underinvestment, so I would negotiate for a lower price or a price adjustment for deferred capex, and would not pay up to the ceiling without comfort on the top customer contract.",
        c: [
          "Stand-alone value = 16.0 x 7.5 = 120M",
          "Synergy value = 3.0 x 7.5 = 22.5M",
          "Pays half of synergies: 11.25M",
          "Maximum price = 131.25M, below the 135M ask",
          "Notes the capex shortfall and customer contract as reasons to bid lower",
        ],
        k: [
          "A buyer should not pay away all synergies, as it creates no value for itself",
          "Price should also reflect deferred capex and key customer risks",
        ],
        m: [
          "Using reported EBITDA instead of the normalised number",
          "Adding the full synergy value to the price",
        ],
        answer: { value: 131.25, unit: "$M", tolerance: 0.03 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "The fund's investment committee meets tomorrow. What do you recommend, with the main risks and next steps?",
        ideal:
          "I recommend not paying the 135 million asking price, but continuing negotiations at a lower value of around 110 to 125 million dollars, with protections. Normalised EBITDA is 16 million, not 18, so the ask is 8.4 times, above the 7.5 times usual. Even with synergies the ceiling is about 131 million, and the fleet needs around 5 million dollars more capex per year than recent spending, which should reduce price or be treated as debt. Key risks are the top customer, 38% of revenue and expiring in 14 months, driver turnover at 31% and fuel and wage inflation. I would make the deal conditional on a contract extension with the top customer, a price reduction for deferred capex, and an earn-out. Next steps are customer calls, a fleet inspection and a model of the 20% return case.",
        c: [
          "Clear recommendation (renegotiate rather than accept 135M)",
          "Uses normalised EBITDA of 16M and the 131M ceiling",
          "Addresses capex underinvestment and price adjustment or debt-like treatment",
          "Names risks: customer concentration and contract expiry, driver turnover, cost inflation",
          "Suggests structure such as earn-out or conditions and concrete next steps",
        ],
        k: [
          "Deal structure (conditions, earn-out) can bridge valuation disagreement and manage risk",
          "Return targets should be tested on normalised earnings and required reinvestment",
        ],
        m: [
          "Giving a yes or no without linking to the valuation work",
          "Overlooking the expiry of the top customer's contract",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 5
  {
    t: "Case: Copper Kettle coffee growth plan",
    opening:
      "Copper Kettle is a chain of 100 coffee shops in the Midlands region with 80 million dollars of annual revenue. The founders want to grow revenue by 25% within two years. They are asking you to help decide how.",
    d: 2,
    discipline: "consulting",
    tp: "case-strategy",
    tp2: "case-math",
    stages: [
      {
        title: "Structure the growth options",
        kind: "structure",
        prompt:
          "How would you structure the question of how Copper Kettle can grow revenue by 25% in two years? Present your framework and the data you want.",
        data: [
          { label: "Current business", content: "100 shops, average revenue of 0.8 million dollars per shop per year. 70% of sales are coffee and drinks, 30% food. Mostly high-street locations; no delivery or online business." },
          { label: "Financial position", content: "Cash available for growth: about 15 million dollars. Debt is low. Group EBITDA margin is 11%." },
          { label: "Market", content: "Out-of-home coffee market growing about 4% per year. Competitors include two national chains and many independents." },
        ],
        ideal:
          "I would split growth into organic growth from existing stores and new sources. For existing shops: same-store sales through traffic, ticket size via food attach and pricing, and extended hours. New sources: new shops in the region, new regions, new channels such as delivery, retail packs or office coffee, and new formats like drive-through kiosks. Then inorganic growth through acquisition of independents. For each option I would size the revenue potential, investment, timeline and risk, and check fit with the two-year horizon, since new shops take time. I would first request same-store trends and new-store performance.",
        c: [
          "Separates existing-store growth from new-store growth",
          "Includes new channels or products (delivery, retail, food)",
          "Considers inorganic options (acquisition)",
          "Evaluates each option on size, investment, timing and risk",
          "Links to the 25% target and the two-year constraint",
        ],
        k: [
          "A growth framework should size each lever to see if the target is reachable",
          "Time to ramp and cash constraints limit which levers can deliver in two years",
        ],
        m: [
          "Listing growth ideas without sizing them",
          "Ignoring the time horizon and capital limit",
        ],
      },
      {
        title: "Analyse store performance",
        kind: "analysis",
        prompt:
          "Here is how the stores perform by opening year. What can we learn about growth levers?",
        exhibit:
          "Opening cohort    Stores   Revenue/store ($M)   Store margin   Same-store sales growth\nBefore 2015       35       0.85                 20%            2.0%\n2015-2019         40       0.80                 19%            3.5%\n2020-2024         25       0.72                 15%            6.0%",
        data: [
          { label: "New store economics", content: "A new store costs 600,000 dollars to fit out, reaches steady state revenue of 0.9 million dollars after about 12 months and earns an 18% store-level margin on that." },
          { label: "Cannibalisation", content: "Where a new shop opens within 1 km of an existing one, the existing shop loses about 8% of sales." },
        ],
        ideal:
          "Newer stores have lower revenue per store, 0.72 versus 0.85 million, and lower margins, 15% versus 20%, but they are growing fastest at 6% a year, so they are still ramping up. Mature stores grow at 2%, roughly in line with inflation, so the old estate will not deliver 25% alone. Weighted same-store growth is about 3.5%, so existing shops add roughly 7% over two years, leaving a gap of about 18 percentage points. That gap must come from new shops or channels. Newer sites have weaker economics, so site selection is key, and cannibalisation must be avoided. I would investigate why recent stores lag: locations or maturity.",
        c: [
          "Observes that older stores have higher revenue and margins",
          "Observes that newer cohorts grow faster, suggesting ramp-up",
          "Estimates that same-store growth alone (about 3% a year) falls well short of 25%",
          "Identifies need for new stores or channels",
          "Mentions site quality and cannibalisation",
        ],
        k: [
          "Cohort analysis separates maturity effects from location quality",
          "The growth gap after existing-store growth defines how many new units are needed",
        ],
        m: [
          "Assuming new stores will match old store performance without evidence",
          "Ignoring cannibalisation of nearby stores",
        ],
      },
      {
        title: "New store payback",
        kind: "math",
        prompt:
          "What is the payback period of a new store in years, using steady-state revenue and store margin? Ignore the ramp-up year.",
        exhibit:
          "Fit-out cost per new store: $600,000. Steady-state revenue: $0.9M per year. Store-level margin: 18%.",
        ideal:
          "Annual store profit at steady state is 0.9 million times 18%, so 162,000 dollars. Payback is 600,000 divided by 162,000, which is about 3.7 years. That is acceptable but not fast for a business with 15 million dollars of growth capital, and it ignores the ramp-up year and cannibalisation, so true payback is closer to 4.5 years. It supports opening stores, but only in strong locations, and shows why add-on channels with less capex could be more attractive.",
        c: [
          "Annual profit per store = 0.9M x 18% = 162k",
          "Payback = 600k / 162k = about 3.7 years",
          "Notes that ramp-up and cannibalisation lengthen true payback",
          "Compares with available capital",
        ],
        k: [
          "Payback is a simple measure of capital efficiency for new units",
          "Simple metrics ignore ramp-up, which matters in a two-year plan",
        ],
        m: [
          "Using revenue instead of store profit in the denominator",
          "Confusing store margin with group EBITDA margin",
        ],
        answer: { value: 3.7, unit: "years", tolerance: 0.03 },
      },
      {
        title: "Stores needed to hit the target",
        kind: "math",
        prompt:
          "Existing stores grow revenue 3% a year for two years. How many new stores, each at 0.9 million dollars of revenue, are needed for total revenue to reach 100 million dollars? Assume all new stores are at steady state by then.",
        exhibit:
          "Current revenue: $80M. Target revenue: $100M (+25%). Existing estate growth: 3% per year for 2 years. New store revenue: $0.9M each at steady state.",
        ideal:
          "Existing estate revenue after two years is 80 times 1.03 squared, which is about 84.9 million dollars. The gap to 100 million is about 15.1 million. Each new store gives 0.9 million, so I need 15.1 divided by 0.9, around 17 stores. At 600,000 dollars each that is about 10 million dollars of capex, within the 15 million available. However, to be at steady state in two years, they must open within the first year, which is demanding for permits and site selection, and cannibalisation of around 8% on nearby shops could add a couple of stores.",
        c: [
          "Existing revenue in two years = 80 x 1.03^2 = about 84.9M",
          "Revenue gap = 100 - 84.9 = about 15.1M",
          "Stores needed = 15.1 / 0.9, about 17",
          "Checks capex (about 10M) against 15M available",
          "Flags timing and cannibalisation risk",
        ],
        k: [
          "Compounding growth must be applied before computing the gap",
          "Feasibility depends on both capital and execution speed",
        ],
        m: [
          "Applying 3% growth once instead of compounding for two years",
          "Dividing the full 20M target gap by 0.9",
        ],
        answer: { value: 16.8, unit: "stores", tolerance: 0.05 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "Wrap up with a growth recommendation to the founders, including risks and next steps.",
        ideal:
          "I recommend a blended plan rather than relying only on new stores. Existing stores deliver about 5 million dollars of the 20 million growth gap through same-store growth. About 17 new stores would close the rest alone at roughly 10 million dollars of capex and a 3.7-year simple payback, but it is demanding in two years. So I would open 10 to 12 stores in the best-performing catchments, and add a food and delivery push in existing shops, plus an office coffee channel to cover about 3 to 4 million dollars. Risks include weaker new sites, cannibalisation, execution capacity and thinner margins, since recent stores earn 15%. Next steps are site screening using the cohort data, a pilot of delivery in 10 stores, and monthly tracking of ramp-up against plan.",
        c: [
          "Recommends a combination of levers, not a single option",
          "Quantifies contribution of existing stores, new stores and channels",
          "Refers to capex, payback and capital constraint",
          "Lists risks: site quality, cannibalisation, execution speed, margin dilution",
          "Provides concrete next steps (site screening, pilots, tracking)",
        ],
        k: [
          "A growth plan should show how levers add up to the target",
          "Piloting new channels reduces the risk of a large capital commitment",
        ],
        m: [
          "Concluding with an unsized list of ideas",
          "Ignoring execution capacity in a two-year window",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 6
  {
    t: "Case: Meridian Mutual claims cost reduction",
    opening:
      "Meridian Mutual is a mid-sized property insurer. Its claims-processing department costs more than competitors' and the new CFO wants to cut cost by at least 25% over three years without hurting customer satisfaction. You are asked to advise.",
    d: 2,
    discipline: "consulting",
    tp: "case-structuring",
    tp2: "case-math",
    stages: [
      {
        title: "Structure the cost reduction",
        kind: "structure",
        prompt:
          "How would you structure the work to reduce claims-processing costs by 25%? Tell me your framework and the first data you would ask for.",
        data: [
          { label: "Department overview", content: "3 million claims per year, mostly small property and motor claims. About 1,000 claims FTEs in 4 sites, loaded cost 60,000 dollars per FTE per year." },
          { label: "Benchmark", content: "Best-in-class insurers process a claim at about 60% of Meridian's cost per claim." },
          { label: "IT landscape", content: "Three legacy claims systems from past acquisitions. Document intake is mostly by email and post, keyed in manually." },
        ],
        ideal:
          "I would break total cost into volume times cost per claim and then split cost per claim by process step and by cost type. Steps: intake, validation, adjudication, payment and fraud review. Cost types: labour, IT, outsourcing and overhead. For each I would identify levers: reduce volume of claims needing handling through self-service and prevention, reduce effort per claim via automation and simpler processes, reduce cost per hour through location and sourcing, and organisational layers. I would use the benchmark to size the gap, then prioritise levers by saving, investment and risk to service levels. First data needed: cost and time by process step.",
        c: [
          "Decomposes cost into volume x cost per claim, then by process step",
          "Splits by cost type (labour, IT, outsourcing, overhead)",
          "Lists lever families: automation, process simplification, sourcing, organisation",
          "Uses benchmarking to size the opportunity",
          "Includes service quality as a constraint and an implementation view",
        ],
        k: [
          "Cost programmes should start from drivers by process step, not from a headcount target",
          "Levers must be prioritised on savings, one-off cost and risk",
        ],
        m: [
          "Jumping to layoffs without understanding drivers",
          "Ignoring customer satisfaction as a constraint",
        ],
      },
      {
        title: "Analyse the cost drivers",
        kind: "analysis",
        prompt:
          "Here is the breakdown of effort by process step. What does it suggest about where to focus?",
        exhibit:
          "Process step      Share of effort   Share of claims affected   Automatable (est.)\nIntake & keying   30%               100%                       70%\nValidation        20%               100%                       50%\nAdjudication      30%               100%                       20%\nPayment           8%                100%                       80%\nFraud review      12%               15%                        30%",
        data: [
          { label: "Handling time per claim", content: "Currently 30 minutes of staff time per claim on average. A claim handled by the proposed automation platform needs about 5 minutes of staff time for exceptions." },
          { label: "Customer satisfaction drivers", content: "Speed of payout is the first driver of satisfaction; 70% of customers say they would like to upload photos and documents online." },
        ],
        ideal:
          "Intake and keying and adjudication each take 30% of effort and validation 20%, so these three represent 80%. The biggest automation potential is in intake, 70% automatable, validation at 50% and payment at 80%, which together cover 58% of effort with a high automatable share, so I would automate intake first via online upload and OCR, then validation rules. Adjudication has the largest cost but only 20% is automatable, so improving it needs skills and triage, rather than technology. Fraud review touches only 15% of claims, so a risk-based model is better. These also match customer wishes for speed and uploads, so cost savings and satisfaction align. I would focus on intake, validation and payment first.",
        c: [
          "Identifies intake, validation and adjudication as 80% of effort",
          "Spots highest automatable share in intake (70%), validation (50%) and payment (80%)",
          "Notes adjudication is large but harder to automate",
          "Links the automation levers to customer desire for faster, online claims",
          "Suggests risk-based approach for fraud review",
        ],
        k: [
          "Prioritise where large effort and high automatability overlap",
          "Cost reduction and customer experience can be aligned if the process is redesigned end to end",
        ],
        m: [
          "Automating payment first just because it is most automatable although it is only 8% of effort",
          "Ignoring the customer insights",
        ],
      },
      {
        title: "Staffing after automation",
        kind: "math",
        prompt:
          "Today, 3 million claims take 30 minutes of staff time each. Suppose 40% of claims go through the automation platform, needing 5 minutes of staff time each, while the rest stay manual at 30 minutes. One FTE provides 1,500 productive hours per year. How many FTEs can be saved?",
        exhibit:
          "Claims: 3.0M per year. Manual time: 30 min per claim. Automated claims: 40% of volume at 5 min per claim. Productive hours per FTE: 1,500 per year. Loaded cost per FTE: $60,000.",
        ideal:
          "Today the workload is 3 million times 0.5 hours, which is 1.5 million hours, or 1,000 FTEs at 1,500 hours. After automation, 60% of claims stay manual: 1.8 million claims times 0.5 hours is 0.9 million hours. The 40% automated, 1.2 million claims at 5 minutes, take 0.1 million hours. Total is 1.0 million hours, or about 667 FTEs. So about 333 FTEs are saved, a one-third reduction, worth about 20 million dollars a year at 60,000 each. That already exceeds the 25% target, so the plan should allow some buffer for ramp-up and exceptions.",
        c: [
          "Current workload = 3.0M x 0.5h = 1.5M hours (1,000 FTE)",
          "Manual: 1.8M claims x 0.5h = 0.9M hours",
          "Automated: 1.2M claims x (5/60)h = 0.1M hours",
          "After = 1.0M hours, about 667 FTE; savings about 333 FTE",
          "Compares 33% reduction with the 25% target",
        ],
        k: [
          "Workload in hours divided by productive hours per FTE gives headcount",
          "Savings come from both the automated share and lower time per automated claim",
        ],
        m: [
          "Assuming automated claims need zero staff time",
          "Forgetting to convert minutes to hours",
        ],
        answer: { value: 333.3, unit: "FTEs saved", tolerance: 0.03 },
      },
      {
        title: "Business case payback",
        kind: "math",
        prompt:
          "The automation platform needs a one-off investment of 24 million dollars and costs 4 million dollars per year to run. Using the FTE savings and the loaded cost per FTE, what is the payback period in years?",
        exhibit:
          "FTE savings: 333.3 FTEs. Loaded cost per FTE: $60,000. Platform run cost: $4M per year. One-off investment: $24M.",
        ideal:
          "Gross annual saving is 333.3 FTEs times 60,000 dollars, which is 20 million dollars. Subtracting 4 million of run cost gives a net saving of 16 million per year. Payback is 24 divided by 16, so 1.5 years. This is attractive, but the savings only start once people are released and processes are live, so realistic payback is closer to 2.5 to 3 years after counting the ramp, severance and change management costs. Even so, it fits well within the three-year horizon of the CFO's target.",
        c: [
          "Gross saving = 333.3 x 60k = 20M per year",
          "Net saving = 20M - 4M run cost = 16M",
          "Payback = 24M / 16M = 1.5 years",
          "Notes ramp-up, severance and change costs lengthen realistic payback",
        ],
        k: [
          "Net savings must deduct run costs, not only compare with investment",
          "Timing of benefits relative to cost drives actual payback",
        ],
        m: [
          "Dividing investment by gross saving (1.2 years)",
          "Leaving out severance and transition costs entirely in the discussion",
        ],
        answer: { value: 1.5, unit: "years", tolerance: 0.03 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "Present your recommendation to the CFO, including risks and next steps.",
        ideal:
          "I recommend a three-year programme centred on automating intake, validation and payment, with a roughly one-third reduction in claims workload that more than meets the 25% target. The platform costs 24 million dollars one-off and 4 million a year, saving about 20 million gross, so payback is about 1.5 years on paper. I would also consolidate three legacy systems, improve adjudication skills and triage, and introduce risk-based fraud review. Risks include implementation delays, disruption to service during migration, labour relations and optimistic automation rates. Mitigate through a pilot in one site, phased migration, redeployment and natural attrition before layoffs, and customer satisfaction as a gate. Next steps are vendor selection, a six-month pilot and a detailed transition plan.",
        c: [
          "Clear recommendation: automate intake, validation and payment",
          "States the quantified benefits and payback",
          "Includes complementary levers (systems consolidation, adjudication, fraud triage)",
          "Names risks (execution, service disruption, labour, automation rate assumptions)",
          "Gives mitigation and next steps (pilot, phased rollout, satisfaction gate)",
        ],
        k: [
          "A phased rollout with customer-satisfaction gates protects service while delivering savings",
          "Benefits and costs should be shown with timing, not only as a total",
        ],
        m: [
          "Recommending headcount cuts without a process or technology plan",
          "Presenting savings without risks or timeline",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 7
  {
    t: "Case: Tidewater Brewing bottling capacity",
    opening:
      "Tidewater Brewing is a craft brewery with one bottling line. A new supermarket contract has pushed demand beyond what the line can fill. The operations director wants to know whether the line can cope or whether the brewery needs to invest.",
    d: 1,
    discipline: "consulting",
    tp: "case-math",
    tp2: "case-structuring",
    stages: [
      {
        title: "Structure the capacity question",
        kind: "structure",
        prompt:
          "How would you structure the analysis of whether Tidewater has enough bottling capacity for the new demand? Tell me your approach and what you want to know.",
        data: [
          { label: "Current operation", content: "One bottling line running 2 shifts of 8 hours, 5 days a week. Rated speed is 600 bottles per minute." },
          { label: "New demand", content: "Weekly demand with the new contract will be 2.6 million bottles. Current demand is about 1.9 million per week." },
          { label: "Investment option", content: "A second line would cost about 6 million dollars and take 9 months to install. Adding a third shift costs a 25% wage premium on night work." },
        ],
        ideal:
          "I would compare demand with capacity and then look at ways to close any gap. Demand: weekly volume now and with the new contract, seasonality and peaks. Capacity: rated line speed times scheduled hours, then reduced by real efficiency losses, which I would break down into availability (downtime, changeovers), performance (slow running) and quality (rejects). If a gap remains, options are to raise efficiency, add shifts or days, outsource or invest in a second line, each assessed on cost, speed and risk. I would first ask for current output and efficiency data.",
        c: [
          "Compares demand with capacity",
          "Breaks capacity into rated speed x scheduled time x efficiency",
          "Splits efficiency losses into availability, performance and quality",
          "Lists options: efficiency, extra shifts or days, outsourcing, second line",
          "Mentions seasonality or peaks, cost and timing of each option",
        ],
        k: [
          "Effective capacity is lower than rated capacity because of real-world losses",
          "Cheap operational fixes should be assessed before capital investment",
        ],
        m: [
          "Assuming capacity equals rated speed times hours",
          "Jumping straight to buying a second line",
        ],
      },
      {
        title: "Understand the efficiency losses",
        kind: "analysis",
        prompt:
          "Here is the current efficiency picture for the line. What does it tell you?",
        exhibit:
          "Scheduled time: 2 shifts x 8 hours x 5 days = 80 hours per week\nRated speed: 600 bottles per minute\n\nOEE component          Value\nAvailability           82%\nPerformance            88%\nQuality                97%\nOverall (OEE)          70%\n\nTop downtime causes (share of lost time): changeovers 40%, unplanned breakdowns 35%, waiting for cans/bottles or labels 25%.",
        ideal:
          "The line runs at 70% overall effectiveness, which is the product of 82% availability, 88% performance and 97% quality. Availability is the largest loss, 18 points, mostly from changeovers at 40% and breakdowns at 35% of lost time. Quality is already high at 97%, so little to gain there. Performance, 88%, may reflect micro-stops or slow running. With world-class OEE around 85%, there is room, but the new volume needs a large jump. Quick wins are shorter changeovers through scheduling similar products together, preventive maintenance and better material availability. At current efficiency, weekly output is about 2.0 million bottles against 2.6 million demand.",
        c: [
          "Reads OEE as availability x performance x quality = 70%",
          "Identifies availability as the biggest loss and changeovers and breakdowns as drivers",
          "Notes quality is already high",
          "Computes or estimates current weekly output (about 2.0M bottles)",
          "Proposes operational levers such as SMED, preventive maintenance, scheduling",
        ],
        k: [
          "Improvement effort should target the largest loss category",
          "Operational improvements have limits, so the size of the demand gap decides whether investment is needed",
        ],
        m: [
          "Ignoring that OEE is a product, not an average",
          "Trying to improve quality, which is already near ceiling",
        ],
      },
      {
        title: "OEE required",
        kind: "math",
        prompt:
          "With the current 2 shifts of 8 hours, 5 days a week, and 600 bottles per minute rated speed, what overall efficiency (OEE) would the line need to deliver 2.6 million bottles per week? Give a percentage.",
        exhibit:
          "Rated speed: 600 bottles/min. Scheduled time: 16 hours per day x 5 days. Demand: 2,600,000 bottles per week.",
        ideal:
          "Rated capacity per week is 600 bottles per minute times 60 minutes times 80 hours, which is 2.88 million bottles. Demand is 2.6 million, so required OEE is 2.6 divided by 2.88, around 90.3%. The line runs at 70%, and world-class benchmark is 85%, so required efficiency is beyond best practice, and hence efficiency programmes alone will not close the gap. I would add a third shift or weekend running, which provides about 40 hours more of scheduled time, or invest in a second line for sustained growth.",
        c: [
          "Rated weekly capacity = 600 x 60 x 80 = 2.88M bottles",
          "Required OEE = 2.6M / 2.88M",
          "Result of about 90%",
          "Compares to current 70% and the 85% world-class benchmark",
          "Concludes that extra scheduled time or capacity is needed",
        ],
        k: [
          "Required efficiency vs benchmark shows whether process improvement can close the gap",
          "Adding scheduled time is the faster lever, a second line is the structural lever",
        ],
        m: [
          "Computing capacity with 8 hours a day instead of 16",
          "Forgetting to convert bottles per minute to per hour",
        ],
        answer: { value: 90.3, unit: "%", tolerance: 0.02 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "What do you recommend to the operations director? Include risks and next steps.",
        ideal:
          "I recommend meeting the new contract through added scheduled time, not through a second line yet. Required OEE is about 90%, above the 85% best-practice level and far above today's 70%, so efficiency work alone cannot do it. A third shift or a Saturday shift adds a lot of hours, and at 70 to 80% OEE gives well over the 2.6 million needed, at the cost of a 25% night wage premium. In parallel, run a changeover and maintenance programme to lift OEE toward 78%, which reduces the extra hours needed. If demand growth proves lasting beyond the contract, then evaluate the 6 million dollar second line, which takes 9 months. Risks are staff availability for night shifts, equipment wear, and contract volumes not materialising. Next steps are a labour plan, costing of shift options and a changeover workshop.",
        c: [
          "Recommends adding shifts or days as the immediate lever",
          "Uses the OEE gap (90% required vs 70% actual vs 85% world class) to justify",
          "Pairs it with a changeover and maintenance efficiency programme",
          "Defers the second line pending demand durability",
          "Lists risks and next steps (labour, costs, contract certainty)",
        ],
        k: [
          "Flexible capacity (shifts) is better when future demand is uncertain, a line is for durable growth",
          "Efficiency gains reduce the cost of extra shifts, so both should be pursued",
        ],
        m: [
          "Recommending the 6 million dollar line without testing cheaper options",
          "Ignoring labour cost and availability for night shifts",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 8
  {
    t: "Case: Eastfield Food Bank efficiency",
    opening:
      "Eastfield Food Bank is a non-profit that collects surplus food and distributes it to 90 local pantries. Donations are flat, while demand from families has risen 30% in two years. The board wants to serve more people without a bigger budget and has asked for your help.",
    d: 1,
    discipline: "consulting",
    tp: "case-structuring",
    tp2: "case-math",
    stages: [
      {
        title: "Structure the problem",
        kind: "structure",
        prompt:
          "How would you structure the work to help Eastfield serve more people within the same budget? Tell me your framework and what you want to know first.",
        data: [
          { label: "Operations", content: "Food arrives from supermarkets, farms and public drives into one warehouse, is sorted by 12 staff and 150 volunteers and delivered to pantries by 5 trucks. Annual operating budget is 2.6 million dollars." },
          { label: "Funding", content: "55% grants, 30% individual donations, 15% in-kind support. Grants are fixed through next year." },
          { label: "Demand", content: "Pantries report running out of food on 2 days per week on average. Unmet need estimated at 25% above current distribution." },
        ],
        ideal:
          "I would treat it as a supply, process and funding problem. Supply: pounds of food received by source, and whether sources can grow without cost, such as farm gleaning and supermarket partnerships. Process: how much of the food received actually reaches families, looking at spoilage, sorting time, storage and transport efficiency. Cost: cost per meal and breakdown between labour, logistics and facilities. Demand and distribution: whether food goes where need is highest and in the right mix. Finally funding: options to raise more money. Without extra budget, the best levers are reducing waste and raising output per dollar. First I would ask for food in, food out and spoilage figures.",
        c: [
          "Covers supply (sources, volume), process (sorting, storage, transport) and distribution",
          "Includes cost per meal as the key efficiency metric",
          "Considers waste and spoilage",
          "Considers demand targeting and funding options",
          "Prioritises levers that need no extra budget",
        ],
        k: [
          "Non-profits should use a unit-cost metric (cost per meal) to measure efficiency",
          "Reducing waste is the cheapest way to increase output",
        ],
        m: [
          "Focusing only on fundraising",
          "Ignoring process losses between receiving and serving food",
        ],
      },
      {
        title: "Interpret the operating data",
        kind: "analysis",
        prompt:
          "Here is the food flow and cost data for last year. What stands out?",
        exhibit:
          "Food received:            3.6 million lb\nSpoiled or discarded:     8% of food received\nWeight per meal:          1.2 lb\nOperating budget:         $2.6M\n\nSpoilage by food type:    Fresh produce 26% (of produce received)\n                          Dairy 6%\n                          Dry goods 1%\nShare of food received:   Produce 25%, Dairy 15%, Dry goods 60%",
        data: [
          { label: "Causes of produce spoilage", content: "Produce arrives in large batches on Mondays; cold storage fits only 40% of it; pantries pick up on Thursdays and Fridays." },
          { label: "Distribution schedule", content: "5 trucks run Wednesday to Friday only. They sit idle on Monday and Tuesday." },
        ],
        ideal:
          "About 8% of the 3.6 million pounds spoils, so roughly 288,000 pounds are lost. The exhibit shows the loss is concentrated in produce, where 26% spoils compared with 1% for dry goods. Produce is 25% of volume, which accounts for around 234,000 pounds of loss, 6.5% of the total received and over 80% of the spoilage. The causes are operational: batches arrive on Monday, cold storage covers only 40% of it, and trucks run only Wednesday to Friday, so produce waits for days. Fixes are cheap compared with fundraising: more cold storage, extending truck use to Monday and Tuesday for produce, and scheduling deliveries to spread arrivals. That would raise output without raising the budget.",
        c: [
          "Quantifies spoilage (about 288,000 lb) and its concentration in produce",
          "Links produce spoilage to storage capacity and the Monday-batch to Friday-pickup mismatch",
          "Notes trucks idle on Monday and Tuesday",
          "Proposes operational fixes (cold storage, scheduling, truck use)",
        ],
        k: [
          "Concentrated losses give a targeted lever rather than across-the-board cuts",
          "Idle assets (trucks) can solve a bottleneck (perishables) at low cost",
        ],
        m: [
          "Treating the 8% spoilage as evenly spread across food types",
          "Proposing more donations without addressing waste",
        ],
      },
      {
        title: "Meals served today",
        kind: "math",
        prompt:
          "How many meals did Eastfield actually distribute last year, after spoilage? Give the answer in millions of meals.",
        exhibit:
          "Food received: 3.6 million lb. Spoiled or discarded: 8% of food received. One meal = 1.2 lb of food.",
        ideal:
          "Food distributed is 3.6 million pounds times 92%, which is 3.312 million pounds. At 1.2 pounds per meal this is 2.76 million meals. With a budget of 2.6 million dollars, the cost per meal is about 94 cents. This is the baseline against which any efficiency improvements can be compared, and shows the spoilage cost, as the 8% discarded represents 0.24 million meals.",
        c: [
          "Distributed pounds = 3.6M x (1 - 8%) = 3.312M lb",
          "Meals = 3.312M / 1.2 = 2.76M",
          "Cost per meal = 2.6M / 2.76M, about 0.94 dollars",
          "Notes lost meals due to spoilage (about 0.24M)",
        ],
        k: [
          "Meals served depend on food received net of waste",
          "Cost per meal links operations to budget",
        ],
        m: [
          "Using total received pounds without subtracting spoilage",
          "Multiplying by 1.2 rather than dividing by it",
        ],
        answer: { value: 2.76, unit: "million meals", tolerance: 0.02 },
      },
      {
        title: "Value of cutting spoilage",
        kind: "math",
        prompt:
          "Suppose better storage and scheduling cut spoilage from 8% to 3% of food received, at no extra operating cost. How many additional meals per year would Eastfield distribute?",
        exhibit:
          "Food received: 3.6 million lb. Spoilage today: 8%. Target spoilage: 3%. One meal = 1.2 lb.",
        ideal:
          "With 3% spoilage, 97% of 3.6 million pounds is distributed, which is 3.492 million pounds, or 2.91 million meals. Today it is 2.76 million, so the gain is 150,000 additional meals per year, equal to about 5% more meals. Equivalently, 5% of 3.6 million is 180,000 pounds divided by 1.2. That covers a fifth of the estimated 25% unmet need, at no change in operating cost, and lowers cost per meal from about 94 to 89 cents. It is valuable but not enough alone, so additional levers are needed to meet the full demand.",
        c: [
          "Extra pounds = 3.6M x 5% = 180,000 lb",
          "Extra meals = 180,000 / 1.2 = 150,000",
          "Expresses as about 5% more meals",
          "Compares with the 25% unmet need (about one fifth of it)",
        ],
        k: [
          "A 5 percentage point reduction in waste converts directly into output at zero marginal cost",
          "Operational savings help but must be combined with other levers to meet the full need",
        ],
        m: [
          "Applying the 5% to meals served instead of food received",
          "Forgetting to convert pounds to meals",
        ],
        answer: { value: 150000, unit: "meals per year", tolerance: 0.02 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "What would you tell the board? Include your recommendation, risks and next steps.",
        ideal:
          "I recommend a no-regret efficiency plan first. Cutting spoilage from 8% to 3% yields about 150,000 more meals, around 5%, by adding cold storage for Monday produce, using idle Monday and Tuesday truck capacity for produce delivery and smoothing arrivals. Second, work with produce suppliers to stagger deliveries and with pantries on pickup times. Third, close the remaining gap, about 20% of the 25% unmet need, with new low-cost food sources such as farm gleaning and supermarket partnerships, with volunteer logistics support and with targeted funding for storage capital. Risks: capital cost of cold storage, volunteer reliability, and suppliers changing donation patterns. Next steps are costing the storage, a pilot with Monday produce routing and tracking cost per meal and spoilage monthly.",
        c: [
          "Prioritises low-cost operational fixes (spoilage, storage, trucks)",
          "Quantifies impact (150,000 meals, about 5%) and the remaining gap",
          "Adds supply and partnership levers for the remaining gap",
          "Lists risks (capex, volunteer reliability, donor behaviour)",
          "Specifies next steps and KPIs (cost per meal, spoilage rate)",
        ],
        k: [
          "Sequencing no-regret operational levers before fundraising builds donor confidence",
          "KPIs such as cost per meal keep a non-profit accountable for efficiency",
        ],
        m: [
          "Promising to meet all unmet need through efficiency alone",
          "Omitting how progress will be tracked",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 9
  {
    t: "Case: Aurelia Appliances compact dishwasher launch",
    opening:
      "Aurelia Appliances makes kitchen appliances and is considering launching a compact, countertop smart dishwasher aimed at small apartments. The product head wants to know how large the opportunity is and whether the launch makes financial sense.",
    d: 3,
    discipline: "consulting",
    tp: "market-sizing",
    tp2: "case-strategy",
    stages: [
      {
        title: "Structure the opportunity",
        kind: "structure",
        prompt:
          "How would you structure the assessment of this launch? Present your framework, including how you would size the market, and tell me what you want to ask.",
        data: [
          { label: "The product", content: "Countertop dishwasher, fits 4 place settings, no plumbing required (manual water fill). Planned retail price 450 dollars. Unit cost 330 dollars." },
          { label: "Existing market", content: "Full-size dishwashers dominate. 2 small competitors sell countertop models at 380 to 520 dollars. Aurelia has strong brand presence among urban 25-40 year olds." },
          { label: "Household data", content: "The country has 20 million households. 30% live in apartments under 60 square metres. 40% of those have no dishwasher." },
          { label: "Launch investment", content: "One-off launch cost (tooling, marketing, channel set-up): 4.2 million dollars." },
        ],
        ideal:
          "I would split this into market size, competitive attractiveness and economics. For size, a top-down funnel: total households, those in small apartments, those without a dishwasher, then those who would consider and afford a 450 dollar countertop unit, giving potential units, and then the share Aurelia can win and the annual rate at which the market adopts. A bottom-up check could use competitor sales. For attractiveness: customer needs, competitor products, channels and Aurelia's brand strength. For economics: unit contribution, one-off costs, break-even volume and payback, with scenario ranges. I would also look at risks such as product fit, cannibalisation of Aurelia's own range and channel access. Please share household data to begin.",
        c: [
          "Builds a funnel from households to addressable units",
          "Proposes a bottom-up cross-check, such as competitor sales",
          "Covers customer need, competition and channels",
          "Covers unit economics, launch cost, break-even and payback",
          "Mentions risks such as cannibalisation or product fit",
        ],
        k: [
          "Market sizing needs explicit, testable assumptions at each funnel step",
          "A launch decision depends on both market size and unit economics",
        ],
        m: [
          "Using total households as the market",
          "Sizing the market without testing willingness to pay",
        ],
      },
      {
        title: "Interpret the customer research",
        kind: "analysis",
        prompt:
          "Aurelia ran a survey of small-apartment households without a dishwasher. What does the data suggest for sizing and positioning?",
        exhibit:
          "Question (n = 1,200)                                 Share of respondents\nWould consider a countertop dishwasher               42%\n...at 300 dollars                                    34%\n...at 450 dollars                                    15%\n...at 600 dollars                                    5%\nMain barrier: no space / too small for plates        38%\nMain barrier: water use / running cost worries       24%\nMain barrier: price                                  22%\nMain barrier: cleaning performance doubts            16%",
        data: [
          { label: "Survey notes", content: "Share figures at each price are those who said they would definitely or probably buy at that price. Stated intent usually overstates actual purchase; Aurelia's past launches converted about 60% of stated intent, but the 15% figure has already been discounted by the research team." },
        ],
        ideal:
          "Only 42% would consider the product, and purchase intent falls steeply with price: 34% at 300 dollars, 15% at 450, 5% at 600. At 450 dollars, 15% is willing to buy, which is the figure for market sizing. Demand is quite price elastic, so the price point is critical. Barriers are mainly physical and practical, not just price: 38% worry about space and 24% about water and running cost, so product design and message matter, such as compact size, efficient water use and the plumbing-free proposition. Positioning around small spaces and low water use could raise willingness to buy. Because the research team already discounted the 15%, I would use it directly with sensitivity, and test 399 dollars as a price alternative.",
        c: [
          "Identifies 15% purchase intent at 450 dollars as the sizing input",
          "Notes steep drop in intent with price (34% to 15% to 5%)",
          "Identifies non-price barriers (space, water use, cleaning performance)",
          "Suggests positioning and design implications",
          "Mentions that stated intent overstates actual purchase and suggests sensitivity",
        ],
        k: [
          "Price elasticity from survey data determines both the market size and the optimal price point",
          "Understanding barriers shows whether product, price or message is the lever",
        ],
        m: [
          "Using the 42% consideration figure as the buyer share",
          "Ignoring the non-price barriers",
        ],
      },
      {
        title: "Size the addressable market",
        kind: "math",
        prompt:
          "How many households are potential buyers at the 450 dollar price? Use the household funnel and the survey result for the 450 dollar price point. Give units.",
        exhibit:
          "Households: 20 million. Share in apartments under 60 sq m: 30%. Share of those without a dishwasher: 40%. Share willing to buy at $450: 15%.",
        ideal:
          "Start with 20 million households. 30% are in small apartments, which is 6 million. 40% of those have no dishwasher, so 2.4 million households. At 450 dollars, 15% are willing to buy, giving 360,000 potential buyer households, so the addressable market is about 360,000 units. This is a one-time pool, since appliances last years, so it is spread over the adoption period. At 450 dollars of price, that is about 162 million dollars of retail value in total, which is modest but sufficient for a niche product line.",
        c: [
          "20M x 30% = 6M apartment households",
          "6M x 40% = 2.4M without dishwasher",
          "2.4M x 15% = 360,000 potential buyers",
          "Notes this is a one-time pool of units over the adoption period",
          "Computes value at the price (about 162M dollars retail)",
        ],
        k: [
          "Each funnel step multiplies a share; errors compound, so assumptions should be labelled",
          "A durable product means the addressable pool is a stock, not an annual flow",
        ],
        m: [
          "Treating 360,000 as annual demand",
          "Skipping the no-dishwasher filter",
        ],
        answer: { value: 360000, unit: "units", tolerance: 0.02 },
      },
      {
        title: "Payback of the launch",
        kind: "math",
        prompt:
          "Assume the 360,000-unit pool is bought evenly over 6 years and Aurelia wins a 25% share. With a contribution of 120 dollars per unit (price 450 less unit cost 330) and 4.2 million dollars of one-off launch cost, how many years does it take to recoup the launch cost?",
        exhibit:
          "Addressable pool: 360,000 units over 6 years (even pace). Aurelia share: 25%. Unit price $450; unit cost $330. One-off launch cost: $4.2M.",
        ideal:
          "The market buys 360,000 divided by 6, which is 60,000 units a year. With a 25% share Aurelia sells 15,000 units per year. Contribution per unit is 450 minus 330, so 120 dollars, giving 1.8 million dollars of contribution a year. The launch cost of 4.2 million is recovered in 4.2 divided by 1.8, around 2.3 years. Over six years, cumulative contribution is 10.8 million dollars, against 4.2 million of launch cost, a net gain of 6.6 million. The result is positive but depends heavily on share and price, so a downside case at 15% share would stretch payback to about 3.9 years.",
        c: [
          "Annual market = 360,000 / 6 = 60,000 units",
          "Aurelia volume = 25% x 60,000 = 15,000 units per year",
          "Annual contribution = 15,000 x 120 = 1.8M",
          "Payback = 4.2M / 1.8M, about 2.3 years",
          "Runs a sensitivity on share (a 15% share gives about 3.9 years)",
        ],
        k: [
          "Payback depends on annual volume, which is the product of pool, pace and share",
          "A sensitivity analysis shows whether the case survives a weaker share",
        ],
        m: [
          "Using the total 360,000 pool instead of the annual flow",
          "Using price instead of unit contribution",
        ],
        answer: { value: 2.33, unit: "years", tolerance: 0.03 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "Give a recommendation to the product head on whether to launch, including risks and next steps.",
        ideal:
          "I recommend launching, with a staged approach. The addressable pool is around 360,000 units at 450 dollars, and at a 25% share Aurelia sells about 15,000 units a year, recovers its 4.2 million dollar launch cost in about 2.3 years and earns about 6.6 million net over six years. Key assumptions to protect are the share and the price, since intent falls from 15% to 5% between 450 and 600 dollars. Risks are overstated survey intent, a competitor response with lower price, barriers on space and water use, cannibalisation of Aurelia's own larger products, and the one-off pool limiting repeat sales. Next steps are a limited online launch in two cities, a test of 399 versus 450 dollars, design work on water use, and developing accessories and consumables for recurring revenue.",
        c: [
          "Clear launch recommendation with a staged rollout",
          "Cites the 360,000 pool, 15,000 units a year, payback of 2.3 years",
          "Identifies key assumptions: share and price",
          "Lists risks: survey overstatement, competition, barriers, cannibalisation, one-off pool",
          "Specifies next steps: limited launch, price test, design, recurring revenue ideas",
        ],
        k: [
          "A limited launch buys information on the share and price assumptions before full commitment",
          "Durable-goods markets need a plan for the post-adoption period, such as accessories",
        ],
        m: [
          "Recommending launch without addressing the sensitivity to share and price",
          "Treating the survey intent as certain demand",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 10
  {
    t: "Case: Kestrel Outdoor turnaround",
    opening:
      "Kestrel Outdoor is a regional retailer of sporting and camping equipment with 60 stores and an online shop. It has lost money for two years and has 14 million dollars of cash left. Its lender has told the CEO that, unless there is a credible turnaround plan, it will not renew the credit line. You have been asked to build the plan.",
    d: 3,
    discipline: "consulting",
    tp: "case-strategy",
    tp2: "case-structuring",
    stages: [
      {
        title: "Structure the turnaround",
        kind: "structure",
        prompt:
          "How would you structure the work to build a turnaround plan for Kestrel? Present your framework and tell me where you would start.",
        data: [
          { label: "Company overview", content: "60 stores averaging 1.6 million dollars revenue in 2024, plus an online shop with about 12 million dollars revenue. Total revenue 108 million dollars. Private-label products are 15% of sales." },
          { label: "Financial position", content: "Cash: 14 million dollars. Debt: 25 million dollars with annual debt service of 3 million dollars. Credit line up for renewal in 9 months." },
          { label: "Market", content: "Outdoor retail is growing 2% a year but shifting online. Two national chains and a discounter have taken share in the region." },
        ],
        ideal:
          "A turnaround needs two parallel tracks. First, stabilise cash: determine the runway, identify the quick cash levers such as inventory reduction, supplier terms, capex freeze and non-core asset sales, and open a dialogue with the lender. Second, diagnose and fix the profit: where are the losses, by store, category and channel. I would build a store-level P&L to separate profitable from loss-making stores, review gross margin and inventory, analyse the cost base, and assess the commercial proposition, including online and private label. Then define the options, such as closing stores, renegotiating leases, changing assortment, and sequence them by cash impact and speed. Lastly, set up governance and a credible plan for the lender. I would start with the runway and store-level profitability.",
        c: [
          "Separates short-term cash stabilisation from structural profit fix",
          "Calls for store-level P&L and analysis by category and channel",
          "Lists levers: store closures, lease renegotiation, inventory, assortment, costs",
          "Includes lender or stakeholder management",
          "Considers online and private label as strategic options",
        ],
        k: [
          "In a turnaround, liquidity is the binding constraint, so cash comes before strategy",
          "Granular store-level data reveals which losses are fixable and which are structural",
        ],
        m: [
          "Starting with a long-term strategy before understanding the cash runway",
          "Analysing the company only in aggregate",
        ],
      },
      {
        title: "Diagnose the losses",
        kind: "analysis",
        prompt:
          "Here is a summary of the P&L and the store performance. What does it tell you about where the problem lies?",
        exhibit:
          "Kestrel summary (last year, $M)\nRevenue                      108.0\nGross margin                 31%\nStore operating costs        30.48\nHQ and e-commerce costs       6.00\n\nStore groups                 Stores   Revenue/store ($M)   Store operating cost/store ($M)\nStrong                       30       1.9                  0.45\nAverage                      22       1.5                  0.50\nWeak                          8       1.5                  0.70\n\nNote: online revenue ($12M) is included in the total and not in the store groups.",
        data: [
          { label: "Weak stores: leases", content: "The 8 weak stores are in declining malls. Their leases run 3 to 6 more years. Exiting a lease costs about 0.9 million dollars per store in one-off charges." },
          { label: "Transfer of sales on closure", content: "Experience from past closures: about 25% of a closed store's revenue moves to nearby Kestrel stores or online, with no extra operating cost." },
        ],
        ideal:
          "Total revenue of 108 million at a 31% gross margin gives 33.5 million of gross profit, but store and HQ costs total 36.5 million, so EBITDA is about minus 3 million dollars. The losses are concentrated: eight weak stores with the same revenue as average stores, 1.5 million, but operating costs of 0.70 against 0.50, which is a 0.2 million dollar penalty each, so they lose about 0.235 million each at a 31% gross margin. Strong stores make good money: 1.9 million revenue gives 0.59 gross profit against 0.45 costs. So the issue is not the whole chain but a tail of weak, high-cost mall stores, plus HQ costs that look heavy relative to a 12 million dollar online business. Closing weak stores looks like the first lever, but one-off lease exit costs matter given limited cash.",
        c: [
          "Computes EBITDA of about minus 3 million dollars from the exhibit",
          "Identifies that weak stores have higher cost, not lower revenue",
          "Shows strong stores are profitable at store level",
          "Notes HQ and e-commerce cost of 6 million dollars as another lever to examine",
          "Flags lease exit costs and transfer of sales as factors for closure decisions",
        ],
        k: [
          "The problem is concentrated in a tail of stores, so a targeted fix beats across-the-board cuts",
          "Closures must be judged on contribution after transfer effects and one-off costs",
        ],
        m: [
          "Concluding the whole chain should shrink",
          "Ignoring one-off lease exit costs when considering the cash position",
        ],
      },
      {
        title: "Current EBITDA",
        kind: "math",
        prompt:
          "Using the summary P&L, what is Kestrel's EBITDA for last year, in millions of dollars? Use a negative number for a loss.",
        exhibit:
          "Revenue $108.0M. Gross margin 31%. Store operating costs $30.48M. HQ and e-commerce costs $6.00M.",
        ideal:
          "Gross profit is 108 times 31%, which is 33.48 million dollars. Total operating costs are 30.48 plus 6.00, which is 36.48 million. EBITDA is 33.48 minus 36.48, so minus 3.0 million dollars. After 3 million of annual debt service the cash burn is about 6 million dollars per year, so with 14 million of cash the business has roughly two years before cash runs out, less once seasonality and working capital swings are counted, and the lender's renewal in 9 months is a real constraint.",
        c: [
          "Gross profit = 108 x 31% = 33.48M",
          "Operating costs = 30.48 + 6.00 = 36.48M",
          "EBITDA = -3.0M",
          "Adds debt service of 3M to estimate burn of about 6M per year",
          "Relates burn to the 14M cash runway (about 2 years) and the lender timeline",
        ],
        k: [
          "EBITDA is before debt service, so cash burn is larger than the EBITDA loss",
          "Runway must account for seasonality and the lender's renewal deadline",
        ],
        m: [
          "Using revenue minus costs without applying the gross margin",
          "Forgetting debt service when estimating runway",
        ],
        answer: { value: -3.0, unit: "$M", tolerance: 0.03 },
      },
      {
        title: "Impact of closing the weak stores",
        kind: "math",
        prompt:
          "Suppose Kestrel closes the 8 weak stores. What is the annual EBITDA improvement in millions of dollars, counting both the avoided store losses and the transferred sales? Ignore one-off costs.",
        exhibit:
          "8 weak stores: revenue $1.5M each, store operating cost $0.70M each, gross margin 31%. After closure, 25% of the closed stores' revenue transfers to other Kestrel channels at the same 31% gross margin and no extra operating cost.",
        ideal:
          "Each weak store earns 1.5 times 31%, which is 0.465 million of gross profit, against 0.70 of operating cost, so loses 0.235 million. Eight stores lose 1.88 million. If closed, that loss is avoided. In addition 25% of the 12 million of closed-store revenue, 3 million, moves to other channels at 31%, adding 0.93 million. The total EBITDA improvement is 2.81 million dollars, bringing EBITDA to about minus 0.19 million, almost break-even. One-off lease exit costs would be 8 times 0.9, so 7.2 million dollars, using half of the 14 million of cash, so cash must be managed carefully and lease negotiations should be tried first.",
        c: [
          "Per-store gross profit = 1.5 x 31% = 0.465M; store loss = 0.235M",
          "Avoided losses = 8 x 0.235 = 1.88M",
          "Transferred sales = 25% x 12M = 3M, gross profit 0.93M",
          "Total improvement = 2.81M, leaving EBITDA near -0.19M",
          "Notes one-off exit cost of 7.2M and its cash impact",
        ],
        k: [
          "Closure value = avoided store-level loss plus margin on transferred sales",
          "One-off exit costs consume liquidity, which is the binding constraint in a turnaround",
        ],
        m: [
          "Counting store revenue as lost profit rather than gross profit",
          "Forgetting the transferred sales or the one-off lease costs",
        ],
        answer: { value: 2.81, unit: "$M per year", tolerance: 0.03 },
      },
      {
        title: "Recommendation",
        kind: "synthesis",
        prompt:
          "Present your turnaround recommendation to the CEO and the lender, including risks and next steps.",
        ideal:
          "I recommend a two-track plan. Track one protects cash: freeze non-essential capex, cut inventory and negotiate supplier terms to free several million dollars, and open talks with landlords to exit or reduce rent on the eight weak stores before paying full exit costs. Track two fixes profit: close the 8 weak stores to improve EBITDA by about 2.8 million to roughly break-even, then trim HQ cost of 6 million, and grow online and private-label share to push margin higher. Together this should bring EBITDA to a clear positive of 2 to 3 million dollars within 18 months. Risks include one-off exit costs of up to 7.2 million, lower sales transfer than the assumed 25%, supplier credit tightening and brand impact. Next steps are landlord negotiations, a 13-week cash forecast shared with the lender, and a monthly turnaround scorecard.",
        c: [
          "Clear two-track plan: cash stabilisation and profit improvement",
          "Quantifies the closure benefit (2.8M improvement to near break-even)",
          "Addresses one-off exit costs and landlord negotiation",
          "Includes additional levers: HQ cost, online, private label, inventory",
          "Lists risks and next steps including lender communication and cash forecast",
        ],
        k: [
          "A credible lender plan combines near-term cash visibility with a structural profit fix",
          "Sequencing matters: negotiate before paying exit costs, protect the runway first",
        ],
        m: [
          "Presenting only closures with no cash plan or lender dialogue",
          "Ignoring the liquidity impact of one-off exit costs",
        ],
      },
    ],
  },
];
