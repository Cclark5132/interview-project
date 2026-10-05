import type { CaseDef } from "./types";

export const financeCases: CaseDef[] = [
  {
    t: "Case: Harlan Packaging DCF",
    opening:
      "Harlan Packaging is a mature, family-controlled maker of corrugated boxes with steady demand from food and e-commerce customers. A client is considering buying a minority stake and wants an intrinsic valuation. You are asked to value the whole company with a discounted cash flow.",
    d: 2,
    discipline: "investment-banking",
    tp: "ib-valuation",
    stages: [
      {
        title: "Structure the DCF",
        kind: "structure",
        prompt:
          "Walk me through how you would build a DCF for Harlan. What are the components, and what information would you want before you start?",
        data: [
          { label: "Historical financials", content: "Revenue has grown 2% to 3% a year for ten years. EBITDA margin has stayed between 14% and 16%. Capex runs close to depreciation plus a little growth spend." },
          { label: "Management projections", content: "Five-year unlevered free cash flow plan is available (see the next stage). Management expects growth to fade toward inflation." },
          { label: "Capital structure", content: "Net debt of $400m, 50m diluted shares. Target capital structure for WACC purposes is roughly 30% debt and 70% equity." },
          { label: "Industry and risk profile", content: "Cyclical but low beta (about 0.8). Customers are diversified and contracts reprice with containerboard costs." },
        ],
        ideal:
          "Forecast unlevered free cash flow (EBIT less taxes, plus D&A, less capex and increases in working capital) for an explicit period of about five years, long enough for the business to reach a steady state. Discount at WACC, built from a CAPM cost of equity, an after-tax cost of debt and target weights. Add a terminal value using either a perpetuity growth rate or an exit multiple, and cross-check one against the other. Sum the present values to get enterprise value, subtract net debt (and other claims such as pensions or minorities) to reach equity value, and divide by diluted shares. Because terminal value is most of the total for a mature company, run sensitivities on WACC and growth, and sanity check implied multiples against comps.",
        c: [
          "Defines unlevered FCF and its build from EBIT",
          "Chooses a 5 year explicit forecast, with justification",
          "Derives WACC with CAPM and target capital structure",
          "Explains terminal value via perpetuity growth and/or exit multiple",
          "Bridges enterprise value to equity value and per share value",
          "Plans sensitivity analysis and a cross-check against comparables",
        ],
        k: [
          "Mature business means terminal value dominates, so the growth and WACC assumptions drive the answer",
          "Discount unlevered cash flows at WACC, and subtract net debt only after reaching enterprise value",
        ],
        m: [
          "Discounting levered cash flows at WACC or mixing equity and enterprise value",
          "Using a terminal growth rate above long-run GDP",
        ],
      },
      {
        title: "Read the forecast",
        kind: "analysis",
        prompt:
          "Here is management's plan. Before we run numbers, what do you make of these projections and what would you challenge?",
        exhibit:
          "Harlan Packaging - unlevered free cash flow ($m)\nYear         1     2     3     4     5\nRevenue    900   927   955   983  1013\nEBITDA     135   139   143   148   152\nCapex      -45   -46   -48   -49   -51\nFCF         80    84    88    92    96\nFCF growth       5.0%  4.8%  4.5%  4.3%\nHistorical revenue CAGR: 2.5%. EBITDA margin: 15.0% each year.",
        data: [
          { label: "Working capital detail", content: "Net working capital is about 11% of revenue. Incremental NWC is included in the FCF figures above." },
        ],
        ideal:
          "The revenue forecast is in line with the 2% to 3% history, and a constant 15% EBITDA margin is plausible for a mature business, so the top line looks reasonable. FCF grows 4% to 5% a year while revenue grows only 3%, which implies margin or capex leverage. Checking, EBITDA less capex grows faster than revenue because capex is a declining share of revenue, so I would test whether capex is too low to sustain the asset base. The plan looks conservative on growth but I would question capex and the terminal year: the final year FCF of 96 must be a normalised, steady-state number, with capex roughly equal to depreciation plus growth investment. I would ask for the tax rate and D&A split, and I would build a downside case with a margin squeeze from input costs.",
        c: [
          "Compares revenue growth with the 2.5% historical CAGR",
          "Notes the constant 15% margin and asks whether it is realistic through a cycle",
          "Spots FCF growing faster than revenue and traces it to capex",
          "Questions whether final year FCF is normalised for the terminal value",
          "Proposes a downside or sensitivity case",
        ],
        k: [
          "Terminal year cash flow must be normalised because it is capitalised into perpetuity",
          "Margin and capex are the key judgement calls in a mature, capital intensive business",
        ],
        m: [
          "Accepting management projections without any challenge",
          "Treating revenue growth alone as the driver of value",
        ],
      },
      {
        title: "Enterprise value",
        kind: "math",
        prompt:
          "Use WACC of 9.0% and a terminal growth rate of 2.5%. Discount the five years of FCF at year end and compute the Gordon growth terminal value on year 5 FCF. What is Harlan's enterprise value, in $m?",
        ideal:
          "PV of the five FCFs at 9% is 80/1.09 + 84/1.09^2 + 88/1.09^3 + 92/1.09^4 + 96/1.09^5 = about 339.6. Terminal value at year 5 is 96 x 1.025 / (0.09 - 0.025) = 98.4 / 0.065 = about 1,513.8. Discounting that back five years at 9% (divide by 1.5386) gives about 983.9. Enterprise value is 339.6 + 983.9 = about 1,323.5 ($m). Terminal value is about 74% of the total, which is typical for a mature company and why the WACC and growth sensitivity matters. The implied EV / year 1 EBITDA is about 9.8x, which we can compare to peers.",
        c: [
          "Discounts each FCF at 9% to the right year",
          "Computes terminal value as FCF x (1+g) / (WACC - g)",
          "Discounts terminal value by five years, not four",
          "Adds PV of FCF and PV of terminal value",
          "Notes terminal value is roughly three quarters of EV",
        ],
        k: [
          "Gordon growth uses next year's cash flow, so year 5 FCF is grown by g",
          "Terminal value is discounted with the year 5 factor",
        ],
        m: [
          "Forgetting to grow the final cash flow by g",
          "Not discounting the terminal value",
        ],
        answer: { value: 1323.5, unit: "$m", tolerance: 0.02 },
      },
      {
        title: "Value per share",
        kind: "math",
        prompt:
          "Using enterprise value from your last step, bridge to equity. Net debt is $400m and there are 50m diluted shares. What is the implied value per share, in dollars?",
        ideal:
          "Equity value equals enterprise value less net debt: 1,323.5 - 400 = 923.5 ($m). Dividing by 50m diluted shares gives about $18.47 per share. A common error is to subtract debt before discounting or to forget other claims, so I would also check pensions, leases and minority interests. This is an intrinsic value on a control-neutral basis, so for a minority stake I would consider whether a discount for lack of control or marketability applies, and I would show a range from sensitivities on WACC of 8% to 10% and growth of 2% to 3%.",
        c: [
          "Subtracts net debt from enterprise value",
          "Divides by diluted shares",
          "Reaches about $18.47 per share",
          "Mentions other claims such as pensions or minorities",
        ],
        k: [
          "Equity value is a residual after all senior claims",
          "A minority stake may deserve a discount, unlike a control sale",
        ],
        m: [
          "Using basic rather than diluted shares",
          "Adding net debt instead of subtracting it",
        ],
        answer: { value: 18.47, unit: "$ per share", tolerance: 0.02 },
      },
      {
        title: "Recommend a range",
        kind: "synthesis",
        prompt:
          "The client asks: is $18.47 a number we can defend, and what range would you present for the stake? Give me a recommendation and the risks.",
        ideal:
          "I would present a range rather than a point estimate: roughly $16 to $21 per share, from WACC of 8.5% to 9.5% and terminal growth of 2.0% to 3.0%, with the base case at $18.47. I would triangulate with trading comps and precedent transactions on EV/EBITDA, since a DCF of a mature company with 74% of value in the terminal period is highly sensitive. Key risks are containerboard input cost spikes squeezing the 15% margin, capex being understated, and cyclical volume in e-commerce. For a minority stake the client should also price in lack of control and limited liquidity, so a bid at a discount to the DCF midpoint is defensible. I would recommend proceeding to diligence on capex and margin durability before committing.",
        c: [
          "Presents a valuation range with explicit sensitivity bounds",
          "Cross-checks the DCF against comps and precedents",
          "Names terminal value dependence as a key weakness",
          "Identifies margin, capex and cyclical volume risks",
          "Adjusts for minority and liquidity discounts",
          "Gives a clear next step",
        ],
        k: [
          "A DCF is only as good as its terminal assumptions, so triangulate",
          "The bid should reflect the specific rights, such as control and liquidity, that the client acquires",
        ],
        m: [
          "Presenting a single point estimate as certain",
          "Ignoring that the client is buying a minority stake",
        ],
      },
    ],
  },
  {
    t: "Case: Corvane Industrial Supply comps valuation",
    opening:
      "Corvane Industrial Supply is a regional distributor of fasteners and safety equipment owned by a founder who is considering selling. Your team has two days to produce a quick comps-based valuation range for the first meeting.",
    d: 1,
    discipline: "investment-banking",
    tp: "ib-valuation",
    stages: [
      {
        title: "Choose the approach",
        kind: "structure",
        prompt:
          "How would you value Corvane using trading comparables? Describe how you would select peers, pick a multiple and get to a value per share.",
        data: [
          { label: "Company profile", content: "Regional distributor, $620m revenue, low-single-digit growth, about 9% EBITDA margin. Net debt $150m. 20m shares." },
          { label: "Peer universe", content: "Five listed US and Canadian industrial distributors, all larger than Corvane, some with national scale." },
          { label: "Quality of earnings notes", content: "LTM reported EBITDA is $54m and includes a $6m one-time restructuring charge." },
        ],
        ideal:
          "Select peers on business mix (industrial distribution), size, growth, margins and geography, then pull enterprise value and LTM or NTM EBITDA from filings and consensus. Use EV/EBITDA as the primary multiple because it is capital structure neutral and distributors have comparable depreciation; EV/EBIT or P/E can cross-check. Calculate the median and mean, look at the range, and consider whether Corvane deserves a premium or discount for its smaller size and regional focus. Adjust Corvane's EBITDA for non-recurring items, apply the chosen multiple to get enterprise value, subtract net debt for equity value and divide by diluted shares for a per share value. Finish with a football field and sensible commentary on size discount.",
        c: [
          "Selects peers on business, size, growth and margin",
          "Uses EV/EBITDA as the primary multiple and justifies it",
          "Normalises Corvane EBITDA for one-time items",
          "Applies a multiple to get EV then subtracts net debt",
          "Divides by diluted shares for per share value",
          "Considers size or liquidity discounts to peers",
        ],
        k: [
          "Enterprise value multiples are applied to metrics before interest, equity multiples to metrics after",
          "Peers are only comparable if the metric is cleaned of one-offs on both sides",
        ],
        m: [
          "Applying an EV multiple and forgetting to subtract net debt",
          "Using revenue multiples for a business with very different margins from peers",
        ],
      },
      {
        title: "Interpret the comps",
        kind: "analysis",
        prompt:
          "Here are the peers. Which multiple would you use, and does anything about the set concern you?",
        exhibit:
          "Peer              EV ($m)  LTM EBITDA  EV/EBITDA  Rev growth\nAlder Supply        4,400     550         8.0x        3%\nBrandt Industrial   6,300     700         9.0x        4%\nCastor Fasteners    1,900     200         9.5x        3%\nDelmar Safety       3,150     300        10.5x        6%\nEverton National    8,800     800        11.0x        7%\nCorvane (adjusted)       n.a.        60          n.a.        2%",
        ideal:
          "The peer multiples range from 8.0x to 11.0x with a median of 9.5x and a mean of 9.6x, so the set is fairly tight with no extreme outliers. The two highest multiples (Delmar and Everton) also have the highest growth at 6% to 7%, versus Corvane at 2%, which tells me the higher multiples are earned by growth. Corvane is also much smaller than every peer. I would therefore anchor on the median 9.5x and consider the low to middle of the range (8.0x to 9.5x) as the main band, with an argument for a size and growth discount. I would also adjust Corvane's EBITDA: reported 54 plus the 6 restructuring charge gives 60 of adjusted EBITDA, which is what the table shows.",
        c: [
          "Computes the median of 9.5x and notes the range 8.0x to 11.0x",
          "Links high multiples to higher growth",
          "Observes Corvane is smaller and slower growing than peers",
          "Reconciles adjusted EBITDA of 60 from 54 plus 6 one-time",
          "Proposes a defensible band, centred near the median or below",
        ],
        k: [
          "Multiples correlate with growth and scale, so the median is a starting point not an answer",
          "Add back one-time charges only if they are genuinely non-recurring",
        ],
        m: [
          "Using the highest multiple to flatter the seller without justification",
          "Using reported EBITDA of 54 without adjustment, or adjusting only one side",
        ],
      },
      {
        title: "Implied enterprise value",
        kind: "math",
        prompt:
          "Apply the median peer multiple to Corvane's adjusted LTM EBITDA. What is the implied enterprise value, in $m?",
        ideal:
          "The median of 8.0x, 9.0x, 9.5x, 10.5x and 11.0x is 9.5x. Multiplying by adjusted EBITDA of 60 gives an enterprise value of 570 ($m). As a sense check, the low end of the range (8.0x) implies 480 and the high end (11.0x) implies 660, so 570 sits in the middle of that 480 to 660 range. The implied EV is about 0.92x revenue of 620, which is reasonable for a distributor with a 9% to 10% margin.",
        c: [
          "Identifies the median multiple as 9.5x",
          "Applies it to adjusted EBITDA of 60, not 54",
          "Reaches EV of 570",
          "Gives a low and high range from the peer set",
        ],
        k: [
          "The median is less sensitive to outliers than the mean",
          "Use the same EBITDA definition for target and peers",
        ],
        m: [
          "Using the mean multiple or unadjusted EBITDA",
          "Applying the multiple to revenue",
        ],
        answer: { value: 570, unit: "$m", tolerance: 0.01 },
      },
      {
        title: "Implied share price",
        kind: "math",
        prompt:
          "Corvane has $150m of net debt and 20m shares. What is the implied equity value per share at the enterprise value you just computed, in dollars?",
        ideal:
          "Equity value is enterprise value less net debt: 570 - 150 = 420 ($m). Dividing by 20m shares gives $21.00 per share. At the low multiple of 8.0x the value would be (480 - 150) / 20 = $16.50 and at 11.0x it would be (660 - 150) / 20 = $25.50, which illustrates how leverage amplifies changes in multiple into larger swings in equity value. Net debt is 26% of EV at the midpoint so the equity is fairly sensitive. I would check the share count for options and convertibles before finalising.",
        c: [
          "Subtracts net debt of 150 from EV",
          "Divides equity value of 420 by 20m shares",
          "Reaches $21.00",
          "Shows how a range of multiples translates into a per share range",
        ],
        k: [
          "Leverage amplifies multiple changes into larger equity value changes",
          "Share count should be fully diluted for options and convertibles",
        ],
        m: [
          "Forgetting to subtract net debt",
          "Dividing enterprise value by shares",
        ],
        answer: { value: 21, unit: "$ per share", tolerance: 0.01 },
      },
      {
        title: "Advise the founder",
        kind: "synthesis",
        prompt:
          "The founder thinks the business is worth 11x like Everton. How do you advise him, and what range do you take to the first meeting?",
        ideal:
          "I would explain that Everton earns 11x through scale and 7% growth, while Corvane is a fraction of the size and grows at 2%, so the fair anchor is the median or slightly below. A sensible range is 8.5x to 10.0x adjusted EBITDA, implying EV of roughly 510 to 600 and a per share value of about $18 to $22.50. I would point to the strengths we can use to justify the upper end: regional density, stable margins and any customer concentration data. To bridge the gap, I would say that a competitive process with strategic buyers, who can pay for synergies, is the route to a higher price than trading comps imply, rather than quoting a high multiple now. Risks include the quality of the 6 add-back and the founder's reliance on the business.",
        c: [
          "Explains why 11x is not a fair anchor for Corvane",
          "Offers a defined multiple range with the implied EV and price",
          "Identifies positives that support the upper end",
          "Suggests a competitive process or strategic buyers as a route to a higher price",
          "Flags the risk around the add-back and other diligence points",
        ],
        k: [
          "Resetting seller expectations early is part of the adviser role",
          "Comps give a trading value, whereas a sale process can capture control and synergy value",
        ],
        m: [
          "Agreeing with the seller to win the mandate",
          "Presenting a range with no link to the evidence",
        ],
      },
    ],
  },
  {
    t: "Case: Sell-side pitch for Calder Cold Chain",
    opening:
      "Calder Cold Chain is a temperature-controlled logistics operator owned by a regional private equity fund. The fund is choosing a sell-side adviser and has asked three banks to pitch how they would position and run a sale. You are on the pitch team.",
    d: 2,
    discipline: "investment-banking",
    tp: "ib-ma",
    tp2: "ib-valuation",
    stages: [
      {
        title: "Positioning strategy",
        kind: "structure",
        prompt:
          "How would you position Calder to maximise value in a sale, and how would you structure the process? What do you want to know first?",
        data: [
          { label: "Business overview", content: "Operates 38 cold storage sites, 600 trucks, 70% contracted revenue with grocery and pharma customers, EBITDA $40m growing 12% a year." },
          { label: "Competitive landscape", content: "Fragmented market. Two large strategic competitors have been acquiring regionally. Several infrastructure and PE funds are active." },
          { label: "Seller objectives", content: "The fund wants a full exit within 9 months, maximum price, and is willing to accept some deferred consideration if the price is meaningfully higher." },
        ],
        ideal:
          "Start by understanding the seller's objectives and the equity story: contracted revenue, pharma exposure, high growth and a roll-up platform in a fragmented market. Position Calder as a scalable platform rather than a standalone logistics operator, and prepare a robust data room, vendor due diligence and normalised financials. Segment the buyer universe into strategics, who can pay for synergies, infrastructure and PE funds, who pay on standalone returns, and perhaps a few non-obvious buyers. Run a competitive two-round auction with a teaser, CIM, management presentations and a tight timeline to create tension, and consider a dual track with a recapitalisation as a fall back. Agree what the fund will accept on structure such as earn-outs or deferred consideration.",
        c: [
          "Clarifies seller objectives such as timing and price versus certainty",
          "Builds an equity story around contracted revenue and growth",
          "Segments strategic and financial buyers",
          "Proposes a competitive multi-round auction with a timeline",
          "Prepares diligence materials and normalised numbers",
          "Mentions a fallback such as dual track or recap",
        ],
        k: [
          "Competition between bidders is the biggest driver of price",
          "Different buyer types value the asset differently so the story must be tailored",
        ],
        m: [
          "Running a narrow bilateral process with one buyer",
          "Pitching only on price multiples without an equity story",
        ],
      },
      {
        title: "Who can pay the most",
        kind: "analysis",
        prompt:
          "Here is the buyer universe. Who would you expect to pay the most, and how should that shape the process?",
        exhibit:
          "Buyer type        Example   Ability to pay                         Synergies\nStrategic A       Frostline  Cash rich, 3.0x leverage               $8m pre-tax run-rate\nStrategic B       Polaris    Stretched balance sheet                $5m run-rate\nInfrastructure    NorthArc   Long-hold, 12% return target           none\nPE sponsor        Ridgeway   Cost of equity 20%, 5.0x debt capacity  none\nStandalone: Calder EBITDA $40m, comparable trading multiple 10.0x\nStrategic A one-time cost to achieve synergies: $15m\nTax rate 25%. Capitalise after-tax synergies at 10% (perpetuity).",
        ideal:
          "Strategic A should pay the most because it has the largest synergies ($8m pre-tax), the financial capacity and no need for the return a sponsor demands. Financial buyers can only pay for standalone cash flows: Ridgeway needs a 20% return, so it will underwrite less than a 10.0x trading multiple unless leverage and growth are high, while NorthArc, with a 12% return target, can be competitive on long-dated cash flows. Strategic B has fewer synergies and a stretched balance sheet and will probably be a stalking horse. I would shape the process so Strategic A and NorthArc compete against each other, make sure Strategic A cannot pre-empt the process, and share synergy evidence with strategics carefully so they pay away part of it. Standalone value of 400 is the floor, with strategic synergies on top.",
        c: [
          "Identifies Strategic A as the highest payer and explains why",
          "Notes sponsors pay for standalone cash flows and require high returns",
          "Recognises the infrastructure fund as a credible alternative",
          "Treats standalone value at 10x EBITDA = 400 as a floor",
          "Plans the process to create competition and avoid pre-emption",
        ],
        k: [
          "Synergies, not standalone cash flows, are what lets a strategic outbid a sponsor",
          "A seller wants the buyer to share part of the synergy value in the price",
        ],
        m: [
          "Assuming all buyers value the business the same way",
          "Ignoring costs to achieve when valuing synergies",
        ],
      },
      {
        title: "Strategic bid ceiling",
        kind: "math",
        prompt:
          "Strategic A expects to give away 50% of the net synergy value to win. Net synergy value is after-tax run-rate synergies capitalised as a perpetuity at 10%, less the $15m cost to achieve. Standalone value is 10.0x EBITDA. What is Strategic A's likely bid for the enterprise, in $m?",
        ideal:
          "Standalone value is 10.0 x 40 = 400. After-tax synergies are 8 x (1 - 25%) = 6, capitalised at 10% is 60. Subtracting the one-time cost to achieve of 15 gives net synergy value of 45. If Strategic A pays away half, the premium is 22.5, so the bid is 400 + 22.5 = 422.5 ($m). That is about 10.6x EBITDA. The seller wants to push the strategic to share more than 50%, so competitive tension from NorthArc and Strategic B matters: every extra 10 percentage points of synergy share is worth 4.5.",
        c: [
          "Computes standalone value of 400",
          "Taxes synergies to 6 and capitalises at 10% to 60",
          "Deducts the 15 cost to achieve for net value of 45",
          "Applies the 50% share to get a bid of 422.5",
          "Converts the bid to an implied multiple of about 10.6x",
        ],
        k: [
          "Synergy value is net of tax and one-time cost to achieve",
          "How much synergy a buyer pays away depends on competitive tension",
        ],
        m: [
          "Capitalising pre-tax synergies",
          "Forgetting to deduct costs to achieve",
        ],
        answer: { value: 422.5, unit: "$m", tolerance: 0.01 },
      },
      {
        title: "Pitch recommendation",
        kind: "synthesis",
        prompt:
          "Wrap up what you will tell the fund: expected price range, how we run the process and the main risks.",
        ideal:
          "I would tell the fund that standalone value is around 400 (10x) and that a well-run process with two or more motivated strategics and an infrastructure bidder can reach roughly 420 to 450, or 10.5x to 11.25x EBITDA, with the upper end requiring strategics to pay away more than half of the synergies. The process should be a two-round auction over about 4 to 5 months to meet the 9-month timeline, with vendor diligence, a clear growth and pharma story, and early engagement with Strategic A and NorthArc. Key risks are customer concentration in grocery, the quality of the 12% growth forecast, antitrust scrutiny for a strategic buyer, and financing markets. Offering a limited earn-out against the growth plan can bridge valuation gaps, and a dual-track recap provides a fallback.",
        c: [
          "Gives a specific price range grounded in the standalone and synergy numbers",
          "Describes a competitive auction timeline that fits the seller's 9 months",
          "Names the most credible bidders and how to engage them",
          "Identifies risks such as concentration, forecast credibility and antitrust",
          "Offers a structural tool such as an earn-out to bridge gaps",
          "Keeps a fallback option",
        ],
        k: [
          "The process design, not just the valuation, wins the mandate",
          "Antitrust and financing certainty affect which bid is really best",
        ],
        m: [
          "Promising a headline price with no support",
          "Ignoring execution risks such as antitrust for strategic bidders",
        ],
      },
    ],
  },
  {
    t: "Case: Stock or cash for Medora Foods",
    opening:
      "Penrose Brands, a listed consumer goods company, wants to acquire Medora Foods, a smaller listed peer. The board wants to know whether to pay in cash funded by new debt or in Penrose stock, and how each affects earnings per share.",
    d: 3,
    discipline: "investment-banking",
    tp: "ib-ma",
    stages: [
      {
        title: "Frame the financing decision",
        kind: "structure",
        prompt:
          "How would you think about whether Penrose should pay for Medora with cash or stock? What would you analyse?",
        data: [
          { label: "Acquirer profile", content: "Penrose: net income $300m, 100m shares, EPS $3.00, share price $60 (P/E 20x). Existing net debt is 1.5x EBITDA." },
          { label: "Target profile", content: "Medora: net income $40m, 20m shares, price $30. Offer at a 30% premium." },
          { label: "Financing market", content: "New debt available at a 6.0% pre-tax interest rate. Tax rate 25%. Rating agencies tolerate leverage up to 3.0x EBITDA." },
          { label: "Synergies", content: "Management believes there are cost synergies but they are unquantified. Ignore them for the base analysis." },
        ],
        ideal:
          "Compare the two on EPS accretion or dilution, leverage and credit rating, ownership dilution, and strategic signalling. Cash funded by debt is cheaper when the after-tax cost of debt is below the target's earnings yield at the offer price, and stock is accretive when the acquirer's P/E exceeds the offer P/E. I would build pro forma EPS for each, test leverage against the rating threshold, and consider that stock shares risk with Medora shareholders and leaves balance sheet capacity, while cash concentrates risk on Penrose but avoids dilution and benefits from the tax deduction on interest. Also consider market reaction, the price of Penrose shares, a mixed consideration, and synergies as upside to the base case. Governance points include the shareholder vote required for large share issuance.",
        c: [
          "Defines accretion and dilution and builds pro forma EPS",
          "Compares after-tax cost of debt with target earnings yield",
          "Compares acquirer P/E with offer P/E for stock deals",
          "Considers leverage and rating constraints",
          "Considers ownership dilution and risk sharing with target holders",
          "Mentions a mix of cash and stock and synergies as upside",
        ],
        k: [
          "The cheaper currency is the one with the lower cost relative to the earnings acquired",
          "EPS accretion is not value creation, so also look at leverage and risk",
        ],
        m: [
          "Treating EPS accretion as proof the deal creates value",
          "Forgetting the interest tax shield when analysing the cash case",
        ],
      },
      {
        title: "Compare the rules of thumb",
        kind: "analysis",
        prompt:
          "Before computing EPS, use these deal terms to predict which structure is better and why.",
        exhibit:
          "Offer price per Medora share: $39.00 (30% premium to $30.00)\nMedora shares: 20.0m   -> Equity purchase price: $780m\nOffer P/E: 780 / 40 = 19.5x\nPenrose P/E: 20.0x\nMedora earnings yield at offer: 40 / 780 = 5.13%\nAfter-tax cost of new debt: 6.0% x (1 - 25%) = 4.50%\nPenrose share price: $60.00",
        ideal:
          "Both structures should be accretive in the base case. For stock, the acquirer P/E of 20.0x is above the offer P/E of 19.5x, so Penrose is issuing relatively expensive shares to buy cheaper earnings, which is marginally accretive. For cash, the 5.13% earnings yield on the target is above the 4.50% after-tax cost of debt, so debt financing is accretive by a larger margin: the spread of 0.63% on 780 is about 4.9m of extra net income. Therefore cash is more accretive, but it adds 780 of debt, and I would check whether that keeps leverage under the 3.0x rating tolerance. The accretion in both cases is small, below 2%, so the decision should rest on risk and strategy rather than EPS.",
        c: [
          "Uses P/E comparison to predict stock accretion",
          "Compares 5.13% earnings yield with 4.50% after-tax cost of debt",
          "Predicts cash is more accretive than stock",
          "Notes the accretion is small",
          "Raises the leverage constraint for the cash case",
        ],
        k: [
          "Debt is cheaper than equity on an after-tax basis, but it raises financial risk",
          "Small accretion means the decision should depend on risk and strategy",
        ],
        m: [
          "Comparing pre-tax cost of debt with the earnings yield",
          "Ignoring the leverage limit",
        ],
      },
      {
        title: "All-cash pro forma EPS",
        kind: "math",
        prompt:
          "Assume Penrose pays $780m entirely with new debt at 6.0%, tax 25%, no synergies and no other adjustments. What is pro forma EPS, in dollars?",
        ideal:
          "New interest is 780 x 6% = 46.8 pre-tax, or 35.1 after tax at 25%. Pro forma net income is 300 + 40 - 35.1 = 304.9. Shares are unchanged at 100m, so pro forma EPS is $3.049, which is about 1.6% accretive versus $3.00. The leverage check matters: the additional 780 of debt could push net debt well above the 3.0x EBITDA rating tolerance, and a downgrade would raise the cost of all debt.",
        c: [
          "Computes interest of 46.8 and after-tax cost of 35.1",
          "Adds target net income of 40 to Penrose 300",
          "Keeps the share count at 100m",
          "Reaches EPS of about $3.05, around 1.6% accretive",
        ],
        k: [
          "The interest tax shield reduces the after-tax cost of debt",
          "A cash deal does not change the acquirer's share count",
        ],
        m: [
          "Using pre-tax interest of 46.8",
          "Forgetting to add the target's net income",
        ],
        answer: { value: 3.049, unit: "$ EPS", tolerance: 0.005 },
      },
      {
        title: "All-stock pro forma EPS",
        kind: "math",
        prompt:
          "Now assume Penrose pays entirely in new shares issued at $60.00. What is pro forma EPS, in dollars?",
        ideal:
          "New shares issued are 780 / 60 = 13.0m, so total shares are 113.0m. Pro forma net income is 300 + 40 = 340 with no financing cost. EPS is 340 / 113 = $3.0088, about 0.3% accretive. So the cash deal gives $3.049 and the stock deal $3.009, and the gap reflects the cheaper after-tax cost of debt versus issuing equity at a 20x P/E (an equity cost of 5.0% earnings yield). The stock option keeps leverage unchanged and shares synergy risk with Medora holders, but dilutes ownership by about 11.5%.",
        c: [
          "Computes shares issued as 780 / 60 = 13.0m",
          "Total shares 113.0m and net income 340",
          "Reaches EPS of about $3.009",
          "Compares with the cash case and explains the difference",
        ],
        k: [
          "Equity at a 20x P/E costs about 5.0% in earnings yield, above the 4.5% after-tax cost of debt",
          "Stock leaves the balance sheet intact but dilutes ownership",
        ],
        m: [
          "Issuing shares at the offer price per Medora share",
          "Forgetting to include target net income",
        ],
        answer: { value: 3.0088, unit: "$ EPS", tolerance: 0.005 },
      },
      {
        title: "Advise the board",
        kind: "synthesis",
        prompt:
          "Make the recommendation to the Penrose board: cash, stock or a mix, with the key risks.",
        ideal:
          "EPS accretion is small either way, about 1.6% for cash and 0.3% for stock, so the structure should be chosen on balance sheet and risk. I would recommend a mix, for example about 60% debt and 40% stock, which keeps leverage inside the 3.0x rating limit, keeps most of the accretion, and shares integration risk with Medora's holders. If leverage with all-cash financing stays comfortably below 3.0x and the board is confident in the synergies, cash is more attractive for existing shareholders because it avoids dilution and uses cheap, tax-deductible debt. The main risks are failing to deliver synergies, a rating downgrade, a fall in the Penrose share price before closing in a stock deal, and Medora shareholder acceptance of a 30% premium. Synergies unlock larger accretion that I would present as upside.",
        c: [
          "Compares accretion in the two cases with numbers",
          "Recommends a structure with a clear rationale",
          "Considers a mixed consideration to manage leverage",
          "Identifies rating, integration and share price risks",
          "Treats synergies as upside rather than part of the base case",
        ],
        k: [
          "Structure should follow balance sheet capacity and risk appetite, not just EPS",
          "Stock deals transfer risk to target holders, cash deals keep the upside with the acquirer",
        ],
        m: [
          "Recommending all-cash purely because it has the highest EPS",
          "Ignoring the leverage threshold",
        ],
      },
    ],
  },
  {
    t: "Case: Tarnow Plastics buyout",
    opening:
      "A mid-market private equity fund is evaluating a take-private of Tarnow Plastics, a stable maker of moulded components for appliances. The deal team asks you to assess whether a leveraged buyout works and what return it would earn.",
    d: 3,
    discipline: "investment-banking",
    tp: "ib-lbo",
    stages: [
      {
        title: "What makes a good LBO",
        kind: "structure",
        prompt:
          "What makes a company a good LBO candidate, and how would you test whether Tarnow works as a buyout?",
        data: [
          { label: "Company financials", content: "LTM EBITDA $100m. Capex is about 3% of revenue. Revenue $900m, steady, with 60% of sales under multi-year contracts." },
          { label: "Market multiples", content: "Peer EV/EBITDA is about 8.0x. Financing markets would support up to 5.0x total debt at around 9% blended interest." },
          { label: "Sponsor requirements", content: "The fund targets at least 20% IRR and 2.5x MOIC over a 5 year hold." },
          { label: "Value creation plan", content: "EBITDA to grow from 100 to 140 by year 5 through pricing, procurement and bolt-ons." },
        ],
        ideal:
          "A good LBO candidate has stable, predictable cash flows, low capex, a strong market position, a defensible business with limited cyclicality, an asset base to support debt, and clear levers such as margin improvement or bolt-ons, plus a sensible entry multiple. To test Tarnow, build a sources and uses and an operating model, set debt at a sensible multiple and check coverage ratios (EBITDA/interest, FCF/debt service), then forecast cash flow available to pay down debt. Assume an exit multiple at or below entry, compute exit equity as exit enterprise value minus remaining net debt, then calculate MOIC and IRR against the 20% and 2.5x hurdles. Sensitise on entry price, leverage, exit multiple and EBITDA growth because returns in an LBO come from EBITDA growth, deleveraging and multiple change.",
        c: [
          "Lists characteristics of a good LBO candidate",
          "Builds sources and uses and sets leverage",
          "Checks coverage and free cash flow after interest",
          "Computes exit equity as EV less net debt",
          "Calculates MOIC and IRR against the hurdle",
          "Names the three drivers of return and sensitises them",
        ],
        k: [
          "Returns come from EBITDA growth, debt paydown and multiple expansion, with leverage amplifying them",
          "Credit capacity is determined by cash flow coverage, not just the debt multiple",
        ],
        m: [
          "Relying on multiple expansion to hit the return target",
          "Ignoring fees and the minimum cash needed in the business",
        ],
      },
      {
        title: "Sources, uses and credit",
        kind: "analysis",
        prompt:
          "Here is the proposed financing and cash flow. Is the debt package sensible, and what is the equity cheque?",
        exhibit:
          "Entry: 8.0x LTM EBITDA of 100 -> Enterprise value 800\nSources                    Uses\nTotal debt (5.0x)    500    Purchase of enterprise   800\nSponsor equity       324    Fees and expenses         24\nTotal                824    Total                    824\n\nYear                         1     2     3     4     5\nEBITDA                     110   120   128   134   140\nFCF available for debt     40    45    50    55    60\nInterest at 9% on opening debt: year 1 = 45 -> EBITDA / interest = 2.4x",
        ideal:
          "Uses total 824 (enterprise value 800 plus 24 of fees), debt funds 500, so the equity cheque is the 324 plug, about 39% of the capital structure, which is a healthy equity cushion. Leverage of 5.0x is at the top end for a mid-market company, and year 1 EBITDA / interest of 2.4x is thin but acceptable for a stable, contract-backed business with 3% capex. FCF after interest and capex of 40 in year 1 is low relative to 500 of debt, so deleveraging is slow: cumulative paydown over five years is 250, about half the debt. I would test the package against a downside where EBITDA falls 15%, and think about covenants and a revolver for liquidity. The structure works if the EBITDA plan is delivered.",
        c: [
          "Derives equity of 324 as the plug from uses of 824 less debt of 500",
          "Notes equity is about 39% of the capitalisation",
          "Assesses year 1 coverage of 2.4x as thin but workable",
          "Notes cumulative debt paydown of 250 over five years",
          "Proposes a downside test and a liquidity buffer",
        ],
        k: [
          "Fees are a real use of funds and raise the equity cheque",
          "Slow deleveraging means returns depend on EBITDA growth more than paydown",
        ],
        m: [
          "Forgetting fees in the equity cheque",
          "Judging leverage only by the multiple and not by coverage",
        ],
      },
      {
        title: "Money multiple",
        kind: "math",
        prompt:
          "Assume exit at the entry multiple of 8.0x year 5 EBITDA, and all FCF in the table is used to repay debt. What is the sponsor's MOIC on the 324 equity cheque, as a multiple?",
        ideal:
          "Exit enterprise value is 8.0 x 140 = 1,120. Debt repaid over five years is 40 + 45 + 50 + 55 + 60 = 250, so remaining debt is 500 - 250 = 250 (assuming no cash build beyond that). Exit equity is 1,120 - 250 = 870. MOIC is 870 / 324 = 2.69x, above the 2.5x hurdle. Returns decompose into EBITDA growth (40 x 8 = 320 of EV growth), debt paydown (250) and no multiple expansion, less the 24 of fees, so the case does not depend on a rising multiple.",
        c: [
          "Computes exit EV of 1,120",
          "Sums debt paydown to 250 and net debt at exit to 250",
          "Computes exit equity of 870",
          "Divides by 324 to get 2.69x",
          "Decomposes value creation into EBITDA growth and deleveraging",
        ],
        k: [
          "Exit equity is enterprise value less net debt at exit",
          "Using the entry multiple at exit is a conservative base case",
        ],
        m: [
          "Using 800 of equity instead of 324",
          "Forgetting that debt falls over the hold period",
        ],
        answer: { value: 2.69, unit: "x MOIC", tolerance: 0.02 },
      },
      {
        title: "Annualised return",
        kind: "math",
        prompt:
          "Using the same exit equity and equity cheque, what is the IRR over the five-year hold, as a percentage? Assume no interim dividends.",
        ideal:
          "With a single cash outflow and a single inflow, IRR = MOIC^(1/5) - 1 = (870 / 324)^(0.2) - 1 = 2.685^0.2 - 1, which is about 21.8% to 21.9%. This clears the 20% hurdle with only a small cushion. A one turn lower exit multiple (7.0x) would give exit equity of 730 and an IRR near 17.6%, below the fund's target, so the investment is sensitive to the exit multiple and to the EBITDA plan.",
        c: [
          "Uses IRR = MOIC^(1/years) - 1 for a single in and out cash flow",
          "Reaches about 21.8%",
          "Compares to the 20% hurdle",
          "Runs a downside such as a 7.0x exit",
        ],
        k: [
          "With no interim distributions IRR is derived directly from the money multiple and hold period",
          "The cushion above the hurdle is thin, so the multiple matters",
        ],
        m: [
          "Dividing MOIC minus one by five (simple average)",
          "Using the wrong number of years",
        ],
        answer: { value: 21.8, unit: "% IRR", tolerance: 0.03 },
      },
      {
        title: "Investment recommendation",
        kind: "synthesis",
        prompt:
          "Would you recommend the fund pursue this deal at 8.0x? What conditions, risks and levers would you highlight to the investment committee?",
        ideal:
          "The base case clears the hurdles with 2.69x and 21.8% IRR at a flat exit multiple, so I would recommend proceeding, but with limited room to pay up since the cushion over 20% is thin. Returns rely heavily on delivering EBITDA growth from 100 to 140, so diligence must focus on whether the pricing, procurement and bolt-on plan is credible and on contract renewal rates. Key risks are leverage of 5.0x with 2.4x coverage if appliance demand falls, resin input cost volatility, and a lower exit multiple. Levers to improve returns are a more modest purchase price, a covenant-lite financing, a dividend recap or faster bolt-ons. I would set a walk-away price (about 8.0x) and require a downside case in which the business still services its debt and returns at least 1.0x of capital.",
        c: [
          "Makes a clear go or no-go recommendation tied to the hurdles",
          "Recognises the thin cushion over 20% IRR",
          "Flags EBITDA plan delivery as the key diligence item",
          "Names risks such as leverage, input costs and exit multiple",
          "Suggests levers like price, financing structure or bolt-ons",
          "Sets a walk-away price and downside criterion",
        ],
        k: [
          "Disciplined entry price matters more than financial engineering",
          "A downside case that still services debt is a precondition for 5.0x leverage",
        ],
        m: [
          "Approving on base case alone with no downside",
          "Assuming multiple expansion to justify a higher price",
        ],
      },
    ],
  },
  {
    t: "Case: Tessara Retail restructuring",
    opening:
      "Tessara Retail is a 120-store apparel chain with falling sales and a debt maturity in nine months. You are advising the company's board. It can negotiate with lenders, seek a sale, file for Chapter 11 or liquidate. The board wants to understand creditor recoveries to decide the path.",
    d: 3,
    discipline: "investment-banking",
    tp: "ib-valuation",
    tp2: "ib-markets",
    stages: [
      {
        title: "Frame the options",
        kind: "structure",
        prompt:
          "How would you approach advising a company in this position? What are the options and what do you need to know first?",
        data: [
          { label: "Liquidity", content: "Cash $20m, revolver fully drawn, burn about $4m a month. The term loan matures in nine months." },
          { label: "Capital structure", content: "Revolver $100m and term loan $250m (both first lien, pari passu). Senior unsecured notes $200m. Total debt $550m." },
          { label: "Operating performance", content: "LTM EBITDA $50m, down from $90m two years ago. Same-store sales falling 8%. 30 stores are loss making." },
          { label: "Asset values", content: "Inventory, owned real estate and brand estimated at $210m net liquidation value before wind-down costs." },
        ],
        ideal:
          "First establish the liquidity runway and key deadlines, since 4m a month of burn against 20m of cash gives about five months, shorter than the nine months to maturity. Then value the business on a going-concern basis using a distressed multiple on realistic EBITDA and compare it with liquidation value, because creditors will compare the two. Map the capital structure by priority, calculate recoveries by class, and identify the fulcrum security, the class that is first not fully covered and would own the reorganised equity. The options are an out-of-court exchange or amend-and-extend, a sale of the business or assets, a Chapter 11 reorganisation with debtor-in-possession financing, or a liquidation. I would also look at operating fixes such as closing the 30 loss-making stores and negotiating leases, and engage creditor groups early.",
        c: [
          "Calculates the liquidity runway against the maturity",
          "Compares going-concern value to liquidation value",
          "Maps the capital structure by priority and identifies the fulcrum",
          "Lists the main paths: exchange, sale, Chapter 11, liquidation",
          "Considers operational restructuring such as store closures",
          "Mentions early engagement with creditors and DIP financing",
        ],
        k: [
          "Creditors will accept a reorganisation only if recoveries beat liquidation",
          "The fulcrum security determines who controls the restructuring outcome",
        ],
        m: [
          "Valuing the company on healthy-peer multiples",
          "Ignoring priority of claims when thinking about recoveries",
        ],
      },
      {
        title: "Read the waterfall",
        kind: "analysis",
        prompt:
          "Here is the claims structure and two valuation views. What does it tell you about who is in charge of this restructuring?",
        exhibit:
          "Claims ($m)                    Amount   Priority\nRevolver                         100    First lien\nTerm loan                        250    First lien (pari passu)\nTotal first lien                 350\nSenior unsecured notes           200    Unsecured\nTotal debt                       550\n\nGoing concern: LTM EBITDA 50 x distressed multiple 5.5x\nLiquidation: net asset value 210 less wind-down costs 15\nAssume no DIP financing, and ignore professional fees.",
        ideal:
          "Even on a going-concern basis, enterprise value of about 275 does not cover the 350 of first-lien claims, let alone the 200 of unsecured notes, which are therefore out of the money in both scenarios. The first-lien lenders are the fulcrum: they are the class impaired first, so they would receive the reorganised equity and control the process. The unsecured noteholders have little leverage except nuisance value, a possible small equity or warrant recovery, and the threat of litigation or delay. The first-lien lenders compare roughly 78.6 cents on the dollar going concern with a much lower liquidation recovery, so they have a strong incentive to support a reorganisation or sale as a going concern, provided the cash burn is funded. Management and the board need to provide liquidity (DIP) to bridge.",
        c: [
          "Notes EV of about 275 is below first-lien claims of 350",
          "Concludes unsecured notes are out of the money",
          "Identifies first-lien lenders as the fulcrum",
          "Compares going concern recovery to liquidation recovery",
          "Recognises liquidity funding as the practical constraint",
        ],
        k: [
          "The class that is partially covered holds the economic power in a restructuring",
          "Going concern value must exceed liquidation value for a reorganisation to make sense",
        ],
        m: [
          "Assuming junior creditors have negotiating power equal to their claim",
          "Thinking equity holders retain value when senior debt is impaired",
        ],
      },
      {
        title: "Going concern recovery",
        kind: "math",
        prompt:
          "Value the business at 5.5x LTM EBITDA of $50m. First-lien claims share pro rata. What recovery rate do first-lien lenders get on a going-concern basis, as a percentage?",
        ideal:
          "Enterprise value is 5.5 x 50 = 275. First-lien claims are 100 + 250 = 350, and the pari passu lenders share pro rata, so the recovery is 275 / 350 = 78.6%. The term loan receives about 196.4 of value and the revolver about 78.6. Unsecured notes recover nothing since value is exhausted before reaching them. Note this ignores administrative and professional fees, which in practice reduce recoveries by several percentage points, and assumes that the distressed multiple of 5.5x is achievable on 50 of EBITDA when sales are falling 8%.",
        c: [
          "Computes EV of 275 using the distressed multiple",
          "Sums first-lien claims of 350",
          "Computes recovery of 78.6%",
          "States unsecured notes recover zero",
          "Caveats fees and the quality of EBITDA",
        ],
        k: [
          "Pari passu claims share value pro rata to claim size",
          "Distressed multiples and declining EBITDA make the going concern value uncertain",
        ],
        m: [
          "Giving the revolver full recovery ahead of the term loan despite pari passu ranking",
          "Spreading recoveries across the unsecured notes",
        ],
        answer: { value: 78.6, unit: "% recovery", tolerance: 0.02 },
      },
      {
        title: "Liquidation recovery",
        kind: "math",
        prompt:
          "Now compute the first-lien recovery in a liquidation: net asset value of $210m less $15m of wind-down costs, shared pro rata. What recovery rate is that, as a percentage?",
        ideal:
          "Net proceeds are 210 - 15 = 195, and first-lien claims are 350, so the recovery is 195 / 350 = 55.7%. That is about 22.9 percentage points lower than the going-concern recovery of 78.6%, or about 80 million less value (275 versus 195). This gap is the value of keeping the business operating, and it is the lenders' incentive to back a reorganisation or sale. The unsecured notes again recover nothing. In practice liquidation values are also reduced by lease rejection claims and fire-sale discounts on inventory, so 55.7% is probably optimistic.",
        c: [
          "Nets wind-down costs against asset value to reach 195",
          "Divides by 350 of first-lien claims",
          "Reaches 55.7%",
          "Compares with going concern recovery and quantifies the gap",
          "Notes that real liquidation recoveries are often lower",
        ],
        k: [
          "The gap between going concern and liquidation is the lenders' incentive to restructure",
          "Wind-down costs and lease claims reduce liquidation proceeds",
        ],
        m: [
          "Forgetting to deduct wind-down costs",
          "Dividing by total debt of 550 rather than first-lien claims",
        ],
        answer: { value: 55.7, unit: "% recovery", tolerance: 0.02 },
      },
      {
        title: "Recommend a path",
        kind: "synthesis",
        prompt:
          "What do you tell the board to do? Compare the paths and give a recommendation with the risks.",
        ideal:
          "I would recommend a dual-track process: negotiate a consensual restructuring with the first-lien lenders, who recover 78.6% in a going concern versus 55.7% in liquidation, while running a quick marketing process for the whole business or its stronger stores. The practical plan is a prepackaged or pre-negotiated Chapter 11 with DIP financing to fund the five-month runway, closing the 30 loss-making stores, rejecting burdensome leases, and converting the first-lien debt into reorganised equity and a smaller take-back loan. Unsecured noteholders get at most a small equity or warrant share, so we should expect a fight and plan for a quick, court-supervised process. The main risks are that sales keep falling, which would erode going concern value toward liquidation, the lenders refusing to fund DIP, supplier and landlord reaction, and execution timing. I would advise the board to act now because the runway is shorter than the maturity.",
        c: [
          "Recommends a path grounded in the recovery numbers",
          "Proposes a DIP-funded Chapter 11 with first-lien lenders converting to equity",
          "Addresses operational fixes: store closures and leases",
          "Explains the treatment and likely objections of unsecured noteholders",
          "Identifies risks of continued sales decline and liquidity",
          "Stresses urgency because runway is shorter than the maturity",
        ],
        k: [
          "Recoveries by class drive which restructuring path is feasible",
          "Operational fixes protect the going concern value that all creditors depend on",
        ],
        m: [
          "Recommending an out-of-court amendment with no liquidity plan",
          "Ignoring the directors' duties to creditors in the zone of insolvency",
        ],
      },
    ],
  },
  {
    t: "Case: Veridan Analytics IPO or sale",
    opening:
      "Veridan Analytics is a fast-growing healthcare data software company owned by its founders and two venture funds. It has received an unsolicited all-cash offer from a strategic buyer, and the board is also considering an IPO. They have asked for your advice.",
    d: 2,
    discipline: "investment-banking",
    tp: "ib-markets",
    tp2: "ib-ma",
    stages: [
      {
        title: "Frame IPO versus sale",
        kind: "structure",
        prompt:
          "How would you compare an IPO with a sale to the strategic buyer? What factors matter and what do you need to know?",
        data: [
          { label: "Financial profile", content: "Revenue $200m growing 35%, positive adjusted EBITDA margin of 8%, net cash roughly zero. 100m shares outstanding." },
          { label: "Strategic offer", content: "All-cash offer valuing the equity at $1,250m. Buyer wants exclusivity for 30 days. Advisory fees about 1.5%." },
          { label: "Public market conditions", content: "Recent healthcare software IPOs have priced at 15% discounts to fair value and averaged a first-day gain of 12%. Comparable listed companies imply fair value of $1,400m for the equity." },
          { label: "Shareholder preferences", content: "Venture funds want liquidity within 18 months. Founders want to stay involved and care about independence." },
        ],
        ideal:
          "Compare on value, certainty, timing, cost, liquidity and strategic goals. A sale offers certainty, immediate cash and typically a control premium, but ends independence and caps the upside. An IPO may lead to higher valuation at fair value plus growth, raises primary capital, and keeps independence, but it costs a 6% to 7% underwriting spread plus an IPO discount, exposes the company to market windows, brings lock-ups and ongoing public company costs, and only partially sells down holders. I would value both on a like for like basis: net proceeds to current holders today, plus the value of the retained stake. Also assess the stakeholder preferences, risk of a delay, regulatory approval for a strategic sale and a dual-track process that uses the IPO preparation as leverage in negotiating the sale price.",
        c: [
          "Compares value, certainty, timing, cost and control",
          "Identifies IPO costs: underwriting spread and pricing discount",
          "Notes sale benefits: certainty, immediate cash, control premium",
          "Values both on a like-for-like basis to the existing holders",
          "Considers shareholder objectives and liquidity needs",
          "Suggests dual-track to maximise leverage",
        ],
        k: [
          "The IPO is not a clean exit because holders retain market risk through lock-ups",
          "A credible IPO alternative increases the price a strategic is willing to pay",
        ],
        m: [
          "Comparing the headline sale price with the IPO price without adjusting for fees and discount",
          "Ignoring non-financial objectives such as independence",
        ],
      },
      {
        title: "Market evidence",
        kind: "analysis",
        prompt:
          "Review the recent IPO data. What does it tell you about pricing and the risk for Veridan?",
        exhibit:
          "Recent healthcare software IPOs (last 12 months)\nCompany      Priced vs fair value   Day 1    Day 90 vs offer   Gross spread\nAxion Soft         -18%             +14%        +22%              6.5%\nBelmar Data        -12%              +9%         -6%              6.5%\nCortex Health      -15%             +16%        +31%              6.5%\nDynamo Care        -20%             +20%        -15%              7.0%\nAverage            -16%            +14.8%       +8.0%\nVeridan assumptions: priced at 15% below fair value of $14.00 per share, 6.5% gross spread, primary raise $300m",
        ideal:
          "IPOs have priced at an average 16% discount, with day 1 gains of about 15% that mostly recover the discount, but the 90 day performance is mixed, with two of four trading below the offer price. That tells me the discount is a real cost to existing holders only to the extent it is not recovered: new investors capture it. The assumed 15% discount is in line with the market, and the 6.5% spread is standard. The risk is volatility between pricing and the lock-up expiry, so the value to holders depends on market conditions over the next six to twelve months and not on the day 1 pop. For the like for like comparison I would use fair value after raising primary capital, as the market's trading value, but I would stress that value with a lower fair value in a weaker market.",
        c: [
          "Calculates the average discount of about 16% and day 1 gain of about 15%",
          "Notes mixed 90 day performance with two trading below offer",
          "Explains the discount as a transfer to new investors",
          "Notes the 6.5% spread is a straightforward cost",
          "Raises market risk through the lock-up period",
        ],
        k: [
          "A day 1 pop shows the discount left money on the table for the company",
          "Existing holders bear market risk during the lock-up and in later sales",
        ],
        m: [
          "Treating the first-day return as profit to existing holders",
          "Ignoring poor 90 day performance in some comparables",
        ],
      },
      {
        title: "New shares issued",
        kind: "math",
        prompt:
          "Fair value is $14.00 per share on 100m shares. The IPO prices at a 15% discount, and the company raises $300m of primary proceeds. How many new shares are issued, in millions?",
        ideal:
          "The IPO price is 14.00 x (1 - 15%) = $11.90 per share. To raise $300m gross the company issues 300 / 11.90 = 25.21m new shares. Total shares after the offering are about 125.21m, so existing holders own about 79.9% of the company. After the 6.5% spread, net proceeds are 300 x 0.935 = $280.5m. The IPO discount also means the company issues about 3.8m more shares than it would at fair value (300 / 14 = 21.4m), which is the dilution cost of the discount.",
        c: [
          "Computes the IPO price of $11.90",
          "Divides the gross raise of $300m by the price",
          "Reaches about 25.2m new shares",
          "Computes net proceeds of 280.5 after the spread",
          "Compares with the shares needed at fair value to show discount dilution",
        ],
        k: [
          "Shares are issued on gross proceeds at the offer price, while the company receives net proceeds",
          "A discounted price means more shares and more dilution for the same raise",
        ],
        m: [
          "Dividing by the fair value of $14.00",
          "Dividing net proceeds rather than gross proceeds by the offer price",
        ],
        answer: { value: 25.21, unit: "m shares", tolerance: 0.01 },
      },
      {
        title: "Value to existing holders",
        kind: "math",
        prompt:
          "Suppose after the IPO the market values the company at fair value of $1,400m plus the net IPO proceeds. What is the value of the existing holders' 100m shares, in $m? (Ignore lock-up risk and costs of being public.)",
        ideal:
          "Post IPO equity value is 1,400 + 280.5 net proceeds = 1,680.5. Total shares are 100 + 25.21 = 125.21m, so the trading price is 1,680.5 / 125.21 = $13.42 per share. Existing holders' 100m shares are worth about $1,342m. Compared with the strategic offer of 1,250 less 1.5% fees, or 1,231.25 of net cash today, the IPO route gives about 111m (9%) more value on paper. But this is not cash, it is subject to a lock-up and market risk and holders would need to sell down, and the sale is certain. A 10% drop in fair value would reduce the IPO value to about 1,230m, roughly equal to the net sale proceeds.",
        c: [
          "Computes post-IPO equity value of 1,680.5",
          "Divides by 125.21m shares to get about $13.42",
          "Values existing 100m shares at about 1,342",
          "Compares with net sale proceeds of 1,231.25",
          "Notes the IPO value is not certain and tests a 10% lower fair value",
        ],
        k: [
          "Value to existing holders is their share of a combined pie after the discount and fees",
          "A paper gain with market risk is not equivalent to cash today",
        ],
        m: [
          "Comparing IPO equity value of 1,680 with the sale price directly",
          "Ignoring the 1.5% advisory fee on the sale",
        ],
        answer: { value: 1342.1, unit: "$m", tolerance: 0.01 },
      },
      {
        title: "Board recommendation",
        kind: "synthesis",
        prompt:
          "What do you advise the board: take the offer, go public, or something else? Give the reasoning and the risks.",
        ideal:
          "I would advise a dual-track process. The IPO route offers about 1,342 of value on paper versus 1,231 net cash from the offer, roughly 9% more, but it is exposed to market conditions, lock-ups of 180 days, and a 90 day performance that has been mixed. The offer provides certainty and satisfies the venture funds' liquidity need within 18 months. Using the IPO preparation, including a confidential filing, as leverage, I would go back to the buyer and ask for a price closer to the fair value of 1,400 or more, with a control premium that a strategic can justify through synergies. If they improve to roughly 1,400 or above, I would recommend accepting, because the certainty is worth the difference. If they do not and markets are open, the IPO retains upside and independence for the founders. Key risks are exclusivity locking out the alternative, regulatory risk on a sale and a market downturn during the IPO.",
        c: [
          "Compares net values: roughly 1,342 IPO versus 1,231 sale",
          "Weighs certainty against paper value and market risk",
          "Recommends a dual track and using the IPO as leverage",
          "Sets a target price for the sale, for example about 1,400",
          "Addresses holders' different preferences, funds versus founders",
          "Identifies risks of exclusivity, regulatory approval and a market downturn",
        ],
        k: [
          "Creating competitive tension is worth more than choosing between two options",
          "Different shareholders have different time horizons that shape the decision",
        ],
        m: [
          "Recommending the IPO because the paper value is higher without discussing risk",
          "Agreeing to exclusivity without a better price",
        ],
      },
    ],
  },
  {
    t: "Case: Ostrava Components acquisition accounting",
    opening:
      "Brindle Industries is acquiring Ostrava Components, a private maker of precision parts, for $600m in cash, funded with $400m of new term debt and $200m of existing cash. The CFO asks you to walk through how the deal flows through the three financial statements and what it does to earnings.",
    d: 2,
    discipline: "investment-banking",
    tp: "ib-accounting",
    tp2: "ib-ma",
    stages: [
      {
        title: "Walk the three statements",
        kind: "structure",
        prompt:
          "Walk me through how this acquisition affects the income statement, balance sheet and cash flow statement of Brindle, at closing and in the first year.",
        data: [
          { label: "Target balance sheet", content: "Ostrava book equity $250m. Assets are fairly stated except PP&E and intangibles (see fair value data)." },
          { label: "Fair value adjustments", content: "PP&E written up by $50m (10 year remaining life, straight-line). New identified intangibles (customer relationships) valued at $80m, amortised over 8 years. Tax rate 25%." },
          { label: "Financing terms", content: "$400m term debt at 7.0% interest. Cash used earns 3.0% pre-tax. Ostrava EBIT before purchase accounting effects: $70m." },
        ],
        ideal:
          "At closing, the balance sheet records the target's assets and liabilities at fair value, including write-ups of PP&E and new intangibles, a deferred tax liability on those write-ups, and the residual as goodwill. Brindle's cash falls by 200 and debt rises by 400, and the equity of the target is eliminated. In the first year, the income statement picks up Ostrava's earnings, plus incremental depreciation and amortisation from the write-ups, new interest expense on 400 of debt and lost interest income on 200 of cash, all taxed. On the cash flow statement, D&A from the write-up is non-cash and added back, the deferred tax liability unwinds as the write-ups are depreciated, the acquisition shows as an investing outflow of 600 (net of cash acquired), and the debt raise appears in financing. Goodwill is not amortised but is tested for impairment annually.",
        c: [
          "Describes purchase price allocation with fair value write-ups",
          "Creates a deferred tax liability on the write-ups",
          "Computes goodwill as the residual",
          "Lists the income statement effects: target EBIT, extra D&A, interest, lost interest income",
          "Notes D&A is a non-cash add-back and the investing and financing flows",
          "States goodwill is tested for impairment rather than amortised",
        ],
        k: [
          "Goodwill is a plug after allocating the price to fair-valued net assets and the deferred tax liability",
          "The balance sheet balances because cash and debt changes offset the assets acquired",
        ],
        m: [
          "Amortising goodwill in the income statement",
          "Forgetting the deferred tax liability on the write-ups",
        ],
      },
      {
        title: "Purchase price allocation",
        kind: "analysis",
        prompt:
          "Here is a draft allocation schedule for the closing balance sheet. Review it and explain the logic of each line.",
        exhibit:
          "Purchase price                                   600.0\nOstrava book equity                              250.0\n+ PP&E write-up                                   50.0\n+ Identified intangibles                          80.0\n- Deferred tax liability (25% x 130)             (32.5)\n= Fair value of net identifiable assets          347.5\nGoodwill = 600.0 - 347.5                         252.5\n\nBrindle closing adjustments: cash -200, debt +400, goodwill +252.5",
        ideal:
          "The schedule starts from the target's book equity of 250, steps up PP&E by 50 and adds 80 of identified intangibles, since acquirers must recognise intangible assets at fair value separately from goodwill. Because the write-ups increase book values but not the tax bases in a stock deal, a deferred tax liability of 25% x 130 = 32.5 is recorded, reducing net identifiable assets to 347.5. Goodwill is the excess of price over those net assets, 252.5. The adjustments to Brindle show cash down by 200 and debt up by 400, matching the 600 of consideration. The deal balances: assets rise by net identifiable assets plus goodwill and fall by cash, funded by new debt. One check I would make is that existing target goodwill is eliminated and that the 80 of intangibles is supported by a valuation, as goodwill that is too large attracts impairment risk and scrutiny.",
        c: [
          "Starts from book equity and adds fair value write-ups",
          "Computes deferred tax liability as 25% x 130 = 32.5",
          "Arrives at net identifiable assets of 347.5",
          "Derives goodwill of 252.5 as the residual",
          "Checks that cash and debt adjustments match the 600 price",
        ],
        k: [
          "The DTL arises because the book values are stepped up but tax bases are not",
          "Goodwill is the leftover after fair valuing everything identifiable",
        ],
        m: [
          "Adding the DTL instead of subtracting it",
          "Including existing target goodwill in net identifiable assets",
        ],
      },
      {
        title: "Goodwill created",
        kind: "math",
        prompt:
          "Recompute goodwill from the purchase price and the fair value data yourself. What goodwill is recorded, in $m?",
        ideal:
          "Net identifiable assets at fair value are book equity 250 plus PP&E write-up 50 plus intangibles 80 less the deferred tax liability of 25% x (50 + 80) = 32.5, which totals 347.5. Goodwill is the purchase price of 600 minus 347.5, which is 252.5 ($m). If the DTL were ignored, goodwill would be understated at 220, so the DTL raises goodwill by 32.5. Goodwill of 252.5 represents about 42% of the price, so impairment risk is meaningful if Ostrava underperforms.",
        c: [
          "Sums book equity and write-ups to 380",
          "Calculates DTL as 25% x 130 = 32.5",
          "Net identifiable assets of 347.5",
          "Goodwill of 252.5 as price minus net assets",
        ],
        k: [
          "Recording a DTL increases goodwill because it reduces net identifiable assets",
          "Large goodwill relative to price creates impairment exposure",
        ],
        m: [
          "Leaving out the DTL and reporting goodwill of 220",
          "Using the purchase price less book equity only",
        ],
        answer: { value: 252.5, unit: "$m", tolerance: 0.01 },
      },
      {
        title: "Year one earnings impact",
        kind: "math",
        prompt:
          "In year one, Ostrava contributes EBIT of $70m before purchase accounting. Add the extra depreciation on the PP&E write-up and amortisation of the intangibles, interest of 7.0% on the $400m new debt, and lost interest of 3.0% on the $200m cash used. Tax is 25%. What is the incremental net income to Brindle, in $m?",
        ideal:
          "Extra depreciation is 50 / 10 = 5 and extra amortisation is 80 / 8 = 10, so 15 in total. Interest on new debt is 400 x 7% = 28, and lost interest income on cash is 200 x 3% = 6. Pre-tax income contribution is 70 - 15 - 28 - 6 = 21. Tax at 25% is 5.25, so incremental net income is 15.75 ($m). On the cash flow statement, operating cash flow from the deal would be about 15.75 + 15 of non-cash D&A - 3.75 of DTL unwind (25% x 15), or about 27, before working capital and capex. The deal is modestly accretive to earnings in year one, but the return on the 600 price is only about 2.6% on net income, so the case depends on synergies and growth.",
        c: [
          "Computes incremental D&A of 5 + 10 = 15",
          "Computes interest of 28 and lost interest income of 6",
          "Pre-tax contribution of 21 and tax of 5.25",
          "Net income of 15.75",
          "Explains the cash flow differences: D&A add back and DTL unwind",
        ],
        k: [
          "Purchase accounting reduces reported earnings through additional D&A even though cash is unaffected",
          "Financing costs include both interest paid and interest income forgone",
        ],
        m: [
          "Forgetting the lost interest on cash used",
          "Applying tax to EBIT only and not the full pre-tax contribution",
        ],
        answer: { value: 15.75, unit: "$m", tolerance: 0.02 },
      },
      {
        title: "CFO takeaways",
        kind: "synthesis",
        prompt:
          "Summarise for the CFO: what the deal does to the financial statements, whether it creates value, and what to watch.",
        ideal:
          "At closing, Brindle's balance sheet gains 252.5 of goodwill, 130 of write-ups, and a 32.5 DTL, with cash down 200 and debt up 400, so leverage rises noticeably. In year one, net income rises by about 15.75, with reported earnings depressed by 15 of extra D&A and 34 of financing costs, but operating cash flow is higher than earnings because of the non-cash charges. The deal is accretive but the earnings yield of about 2.6% on 600 is below the 7% cost of debt, so value creation depends on synergies, growth in the target's EBIT and margin improvement. Items to watch are covenant headroom after adding 400 of debt, impairment risk on goodwill that is 42% of the price, integration costs that were excluded, and the sustainability of the 70 of EBIT. I would recommend presenting both GAAP earnings and cash EPS to investors to explain the effect of purchase accounting.",
        c: [
          "Summarises the balance sheet effects: goodwill, write-ups, DTL, cash and debt",
          "States the year one net income effect of about 15.75",
          "Explains the difference between earnings and cash flow",
          "Assesses value creation relative to the cost of debt and the price paid",
          "Lists watch items: leverage covenants, goodwill impairment, integration costs",
        ],
        k: [
          "Accounting accretion does not prove value creation if returns are below the cost of capital",
          "Purchase accounting shifts earnings down but cash flow remains intact",
        ],
        m: [
          "Judging the deal only by EPS in year one",
          "Ignoring goodwill impairment and covenant risk",
        ],
      },
    ],
  },
];
