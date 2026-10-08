import type { CompanyGuide } from "./types";

const pePrepCommon = [
  "Practice building a three-statement-linked LBO from a blank sheet, with only a laptop and a set time limit, then rehearse a short debrief of your recommendation.",
  "Drill paper LBOs: sources and uses, debt paydown, exit multiple and IRR/MOIC mental math, then be ready to flex one assumption live.",
];

export const ibC: CompanyGuide[] = [
  {
    companyId: "blackstone",
    summary:
      "Blackstone's private equity associate hiring is commonly reported to run through headhunters and compressed on-cycle timing for banking analysts, with technical rounds on LBO mechanics and deal walk-throughs and a long final day that includes a case. On the analyst side, public reporting says most of the class comes from the summer internship. Details come mostly from prep sites and are not firm-confirmed.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Private equity / alternatives",
        stages: [
          {
            name: "Headhunter outreach and resume screen",
            format: "Recruiter call plus resume review, often arranged through a search firm",
            what: "Checks bank, group, deal exposure and basic motivation. Commonly reported to begin within months of starting as a banking analyst.",
          },
          {
            name: "First-round technicals",
            format: "Reported as two roughly 45 minute interviews with associates and VPs",
            what: "LBO walk-through, valuation, accounting and detailed discussion of the deals on your resume in investment terms.",
          },
          {
            name: "Final day (superday)",
            format: "Commonly described as a long day of several back-to-back interviews, possibly with a case or scenario exercise",
            what: "Mix of deeper technical questions, an investment case or presentation, and fit interviews with senior investors up to MD level.",
          },
          {
            name: "Offer decision",
            format: "Phone call, often quickly after the final day",
            what: "On-cycle offers are commonly reported to come with very short acceptance windows.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Fit is usually blended into the technical rounds plus one or two dedicated conversations. Interviewers tend to test whether you can think like an investor and would be a good teammate under pressure.",
          themes: [
            "Why private equity rather than staying in banking",
            "Why Blackstone and this group",
            "Judgment and ownership on deals",
            "Handling pressure and feedback",
          ],
          examples: [
            "Why do you want to move into PE now and why this firm?",
            "Walk me through a deal you worked on and whether you would have invested.",
            "Describe a time you caught a significant mistake in your work.",
            "How do you handle disagreement with a senior team member?",
            "What do you think makes a great investor?",
          ],
        },
        technical: {
          share: "Commonly reported as the majority of the process",
          topics: [
            "LBO mechanics and returns drivers",
            "Paper LBO",
            "Valuation and accounting scenarios",
            "Deal structure and risk assessment",
            "Investment judgment on a business",
          ],
          style:
            "Verbal technicals and walk-throughs early, then an open-ended investment case on the final day asking for a structure, risks and a recommendation. Reports of an Excel test at Blackstone specifically are thin, so be ready for either format.",
        },
        projects:
          "Sources say to expect every deal on your resume to be discussed as an investor: thesis, valuation, financing, risks and what you would do differently. Prepare a one-page summary of each deal with the key numbers.",
        roleNotes: [
          {
            roleId: "private-equity",
            notes:
              "For associate roles, expect the heaviest weight on LBO modeling, deal experience and investment judgment. Candidates are typically two to three years into banking, though group and strategy differ across Blackstone.",
          },
          {
            roleId: "ib-analyst",
            notes:
              "Blackstone has publicly said most of its analyst class comes from its summer internship, so the direct analyst route is mainly campus-driven; internship applications are reported for roughly January to March of junior year.",
          },
        ],
        prep: [
          ...pePrepCommon,
          "Prepare a sharp, specific answer to why PE and why Blackstone, referencing its scale and the particular group you are targeting.",
          "Know three or four deals from your banking work cold: valuation, leverage, sponsor view and risks.",
          "Form an opinion on one or two public companies you would buy or avoid, with a concise thesis.",
          "Talk to your bank's recruiting contacts and a headhunter early; on-cycle timing is compressed and shifts year to year.",
          "Be ready to decide quickly if offers come with short deadlines.",
        ],
      },
    ],
    sources: [
      { label: "CleverPrep: Blackstone PE associate", url: "https://www.cleverprep.com/companies/blackstone/private-equity-associate" },
      { label: "Leland: How to ace your Blackstone PE interview", url: "https://joinleland.com/library/a/how-to-ace-your-blackstone-pe-interview" },
      { label: "Brandeis Global Careers: Blackstone interview", url: "https://globalcareers.brandeis.edu/blog/2026/04/30/how-to-ace-your-blackstone-interview/" },
      { label: "Fortune: Blackstone first-year analyst hiring", url: "https://fortune.com/2023/08/20/blackstone-first-year-analyst-job-getting-hired" },
      { label: "M&A Community: PE recruiting timeline", url: "https://mnacommunity.com/insights/private-equity-recruiting-timeline/" },
      { label: "Mergers and Inquisitions: On-cycle PE recruiting", url: "https://mergersandinquisitions.com/on-cycle-private-equity-recruiting/" },
    ],
  },
  {
    companyId: "kkr",
    summary:
      "KKR is commonly described as running headhunter-led, very fast on-cycle recruiting for banking analysts, with early technical interviews and a long in-person timed LBO modeling test at the final stage, followed by many short interviews with senior investors. Candidate reports are anonymous and vary by office and year.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Private equity / alternatives",
        stages: [
          {
            name: "Headhunter outreach and resume screen",
            format: "Recruiter call, resume review",
            what: "Screens bank, group and deal exposure. On-cycle processes are reported to compress from first call to offer into a few days.",
          },
          {
            name: "Technical interviews",
            format: "Commonly reported as one or two rounds with associates or VPs, partly behavioral",
            what: "LBO mechanics, valuation, market views and detailed walk-throughs of your deals.",
          },
          {
            name: "Timed LBO modeling test",
            format: "Reported at around two to three hours, in person, on a provided laptop, built from scratch; a debrief with a team member often follows",
            what: "Tests whether you can build and interpret a full model under time pressure and defend your assumptions. A London report mentions a full three-statement model plus LBO.",
          },
          {
            name: "Senior interviews",
            format: "Commonly described as multiple 30 minute conversations with MDs and partners, sometimes on the same day as the test",
            what: "Fit, motivation, judgment and your view on the case you just modeled.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral questions are mixed into the early technical rounds and dominate the senior conversations. Expect conversational probing rather than formal scripted questions.",
          themes: [
            "Why PE and why KKR",
            "Intellectual curiosity and market views",
            "Resilience under long hours and pressure",
            "Teamwork and communication with seniors",
          ],
          examples: [
            "Why leave banking for private equity and why KKR specifically?",
            "Which industry would you be excited to invest in and why?",
            "Tell me about a deal you were closest to and what the key risks were.",
            "Describe a time you pushed back on a senior colleague.",
            "How did you perform on the modeling test, and what would you change?",
          ],
        },
        technical: {
          share: "Commonly reported as the larger part, with the modeling test as the central filter",
          topics: [
            "LBO build from scratch",
            "Three-statement linkage",
            "Debt structure and returns",
            "Valuation",
            "Deal walk-throughs",
          ],
          style:
            "Verbal technicals first, then a timed Excel exercise (reported 2 to 3 hours) with an interviewer debrief. Some accounts mention a paper LBO format as well.",
        },
        projects:
          "Interviewers reportedly want each deal on your resume discussed in investment terms: thesis, valuation, leverage, risks. Be able to say how the sponsor or buyer should have thought about the deal.",
        roleNotes: [
          {
            roleId: "private-equity",
            notes:
              "The modeling test is the core gate; expect the debrief to probe assumptions and what would change your view. Format details differ between New York, London and Asia reports.",
          },
          {
            roleId: "ib-analyst",
            notes:
              "Most associate hires are reported to come from banking analyst classes via on-cycle headhunter processes, so your bank, group and deal experience matter at the resume stage.",
          },
        ],
        prep: [
          ...pePrepCommon,
          "Build a full model from a public company's filings on a clock, without macros or templates, and practice explaining it out loud.",
          "Practice using Excel without a mouse; some candidates report this constraint.",
          "Prepare why PE and why KKR answers that reference specific strategies, not just brand.",
          "Have a view on two or three industries, with a short investment thesis and risks for each.",
          "Line up headhunter relationships early since processes can run in days.",
        ],
      },
    ],
    sources: [
      { label: "CleverPrep: KKR PE associate", url: "https://www.cleverprep.com/companies/kkr/private-equity-associate" },
      { label: "Glassdoor: KKR interview report", url: "https://www.glassdoor.co.uk/Interview/KKR-Interview-E2865-RVW93881251.htm" },
      { label: "Glassdoor: KKR interview report (older)", url: "https://static.glassdoor.nl/Interview/KKR-Interview-E2865-RVW43668001.htm" },
      { label: "Wall Street Oasis: KKR associate interview", url: "https://www.wallstreetoasis.com/company/kkr-kohlberg-kravis-roberts/interview/associate-13" },
      { label: "Leland: On-cycle vs off-cycle PE recruiting", url: "https://www.joinleland.com/library/a/private-equity-interviews-on-cycle-vs-off-cycle" },
      { label: "Mergers and Inquisitions: On-cycle PE recruiting", url: "https://mergersandinquisitions.com/on-cycle-private-equity-recruiting/" },
    ],
  },
  {
    companyId: "apollo",
    summary:
      "Evidence on Apollo's associate process is thin and mostly from prep sites. It is commonly described as a recruiter screen, first-round interviews and a case study or modeling test, with Apollo's credit-heavy platform suggesting questions on the capital structure as well as equity returns. Treat details as leads to verify.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "investment-banking",
        label: "Private equity / alternatives",
        stages: [
          {
            name: "Recruiter or HR screen",
            format: "Phone call, often via a headhunter for associates",
            what: "Resume, bank and group background, and motivation for the specific Apollo strategy.",
          },
          {
            name: "First-round interviews",
            format: "Commonly reported as conversations with investment professionals",
            what: "Technical questions based on two to three years of banking (M&A, leveraged finance or restructuring) plus fit.",
          },
          {
            name: "Case study or modeling test",
            format: "Reported as a financial modeling test or LBO case; length not reliably documented, generic PE tests run about two hours",
            what: "Build and interpret a model, then give an investment recommendation. Credit-oriented teams may add credit analysis or document review.",
          },
          {
            name: "Final interviews",
            format: "Several conversations with senior team members",
            what: "Investment judgment, fit and strategy interest, such as hybrid value, credit or private equity.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Fit questions probe culture and motivation. Apollo hires across private equity, hybrid and credit platforms, so expect questions on why that particular strategy.",
          themes: [
            "Why Apollo and why this strategy",
            "Comfort with complexity and distressed or structured situations",
            "Judgment and intensity",
          ],
          examples: [
            "Why this Apollo strategy rather than traditional buyout?",
            "Walk through a deal you worked on, especially any leveraged finance or restructuring.",
            "How do you think about downside protection versus upside?",
            "Tell me about a time you worked through a tight deadline.",
          ],
        },
        technical: {
          share: "Likely the larger part, but not well documented",
          topics: [
            "LBO modeling",
            "Capital structure and debt analysis",
            "Valuation",
            "Downside and recovery thinking",
            "Investment recommendation",
          ],
          style:
            "Reported mix of verbal technicals and a case or model with a recommendation. Specifics of Apollo's own test are not publicly confirmed.",
        },
        projects:
          "Expect deals on your resume to be probed, with extra emphasis on capital structure, covenants and downside cases if you worked on leveraged finance or restructuring.",
        roleNotes: [
          {
            roleId: "private-equity",
            notes:
              "Commonly described as underwriting across the capital structure; be comfortable discussing debt instruments and structured equity, not only common equity returns.",
          },
          {
            roleId: "ib-analyst",
            notes:
              "One guide says full-time analyst roles come mainly through the internship pipeline or from banking analysts with two to three years of experience; campus summer programs are posted in the fall.",
          },
        ],
        prep: [
          ...pePrepCommon,
          "Learn the difference between Apollo's strategies (private equity, hybrid value, credit) and pick one with a clear reason.",
          "Review capital structure basics: seniority, covenants, recovery analysis and how a debt investor sees a company.",
          "Prepare a downside case for each deal you discuss.",
          "Verify the current process with a recruiter or current employees, since public detail is limited.",
        ],
      },
    ],
    sources: [
      { label: "CleverPrep: Apollo PE associate", url: "https://www.cleverprep.com/companies/apollo/private-equity-associate" },
      { label: "Growth Equity Interview Guide: Apollo overview", url: "https://growthequityinterviewguide.com/?p=10488" },
      { label: "Wall Street Oasis: Apollo interview process", url: "https://www.wallstreetoasis.com/forum/private-equity/apollo-interview-process" },
      { label: "Wall Street Oasis: PE case study examples", url: "https://www.wallstreetoasis.com/forum/private-equity/pe-case-study-interview-examples" },
      { label: "Apollo FY2023 Form 10-K (strategy descriptions)", url: "https://www.sec.gov/Archives/edgar/data/1858681/000185868124000031/apo-20231231.htm" },
    ],
  },
  {
    companyId: "carlyle",
    summary:
      "Public evidence on Carlyle's associate hiring is thin and secondary. It is commonly described as a team screen, technical rounds and a modeling test (LBO or paper LBO), with banking experience expected. Carlyle also hires across private equity, credit and real estate, so format may vary by group.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "investment-banking",
        label: "Private equity / alternatives",
        stages: [
          {
            name: "Screen",
            format: "Call with a team member or recruiter",
            what: "Background, bank and group, and why Carlyle and the specific business line.",
          },
          {
            name: "Technical rounds",
            format: "Commonly reported as one or more interviews with investment professionals",
            what: "M&A, leveraged finance or sector-coverage experience, LBO mechanics and deal discussions.",
          },
          {
            name: "Modeling test",
            format: "Reported as an LBO modeling test or case; paper LBO exercises with live tweaks are also mentioned. Exact time limits are not confirmed",
            what: "Tests core corporate finance and whether you can explain how returns move when assumptions change. A forum comment suggests real estate groups could use a real estate LBO.",
          },
          {
            name: "Final interviews",
            format: "Meetings with senior team members",
            what: "Fit, judgment and interest in the specific fund or sector.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Culture fit questions are reported alongside technicals. Expect team-oriented and motivation questions rather than elaborate scripted formats.",
          themes: [
            "Why PE and why Carlyle",
            "Teamwork and collaboration",
            "Interest in the specific sector or strategy",
          ],
          examples: [
            "Why Carlyle and why this group?",
            "Tell me about a deal you were proud of and your role.",
            "How do you work with colleagues across offices or functions?",
            "What would you do if you disagreed with the team view on an investment?",
          ],
        },
        technical: {
          share: "Likely about half or more, but poorly documented",
          topics: [
            "LBO modeling and paper LBO",
            "Sources and uses, debt schedules, cash sweep",
            "IRR and MOIC sensitivity",
            "Valuation",
          ],
          style:
            "Modeling or paper LBO with discussion of assumptions. Real estate or credit groups may adapt the case to their asset class.",
        },
        projects:
          "Prepare to discuss the deals you worked on, including your contribution and how assumptions drove the answer. If targeting real estate or credit, bring deals relevant to that area.",
        roleNotes: [
          {
            roleId: "private-equity",
            notes:
              "Candidates are typically expected to have two to three years of banking experience; check which Carlyle platform you are interviewing for since process may differ.",
          },
          {
            roleId: "ib-analyst",
            notes:
              "Summer analyst and two-year analyst programs exist in some offices per third-party postings, but details are dated; confirm on Carlyle's careers page.",
          },
        ],
        prep: [
          ...pePrepCommon,
          "Be able to explain how IRR changes when you change entry multiple, leverage, growth or exit timing.",
          "Review real estate LBO basics if interviewing for a real estate group.",
          "Research Carlyle's platform (global private equity, credit, investment solutions) and tailor your why-Carlyle answer.",
          "Ask your headhunter or contacts for the current format, as public information is limited.",
        ],
      },
    ],
    sources: [
      { label: "CleverPrep: Carlyle PE associate", url: "https://www.cleverprep.com/companies/carlyle/private-equity-associate" },
      { label: "CleverPrep: Carlyle PE analyst", url: "https://www.cleverprep.com/companies/carlyle/private-equity-analyst" },
      { label: "Wall Street Oasis: Carlyle RE LBO", url: "https://www.wallstreetoasis.com/forum/real-estate/carlyle-re-lbo" },
      { label: "Carlyle careers", url: "https://WWW.CARLYLE.COM/careers" },
      { label: "Wall Street Oasis: HIG associate interview (format benchmark)", url: "https://www.wallstreetoasis.com/company/hig-capital/interview/associate-19" },
    ],
  },
];
