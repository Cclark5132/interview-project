import type { CompanyGuide } from "./types";

export const ibA: CompanyGuide[] = [
  {
    companyId: "goldman-sachs",
    summary:
      "Goldman reviews applications on a rolling basis, then sends a short video interview, then a final round of a few interviews. Official pages describe two to five final-round interviews depending on division; candidate reports for banking commonly describe three short back-to-back sessions. Fit and motivation carry a lot of weight, with valuation and accounting saved mostly for the final round.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          {
            name: "Online application",
            format: "Resume and program questions through the careers portal, reviewed on a rolling basis",
            what: "Screens for academics, experience and division interest. Goldman says it reviews throughout the season, so applying early helps because seats fill ahead of stated deadlines.",
          },
          {
            name: "Video interview",
            format: "Recorded or short video round; the careers site describes a 30-minute video meeting, while candidate reports describe timed one-way prompts",
            what: "Mostly motivation and judgment: why banking, a deal you followed, how you would handle a client request that conflicts with firm policy. Format varies by office and year, so read your invitation carefully.",
          },
          {
            name: "Final round (superday)",
            format: "Commonly three back-to-back interviews of about 20-30 minutes, virtual or in person, with team members across seniority",
            what: "Blend of fit, resume walk-through and technicals (three statements, valuation basics, a deal discussion). Official guidance says two to five interviews depending on division.",
          },
          {
            name: "Decision",
            format: "Offer call or email, typically within days to a couple of weeks",
            what: "Summer analyst offers in the US are generally made well ahead of the summer, and strong interns can convert to a full-time analyst role.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral and motivation questions make up the bulk of the video round and a large share of the final round. Structured stories help, but interviewers also test whether you sound sincere about this specific firm.",
          themes: ["Why banking and why Goldman", "Teamwork and integrity", "Resilience under pressure", "Client judgment", "Interest in markets"],
          examples: [
            "Walk me through your resume and why you moved toward finance.",
            "Why Goldman Sachs and why this division rather than another bank?",
            "Describe a time you disagreed with a teammate and how it resolved.",
            "What would you do if a client asked for something against firm policy?",
            "Tell me about a recent deal or market story you followed and your view on it.",
          ],
        },
        technical: {
          share: "Roughly a third of the final round, lighter in the video stage",
          topics: ["Three-statement linkages", "Enterprise vs equity value", "DCF walk-through", "Comps and precedents", "Basic M&A accretion/dilution", "Deal and market awareness"],
          style:
            "Conversational questions rather than a written modeling test; depth is basic-to-intermediate for undergraduates and increases with the seniority of the interviewer. Expect follow-ups on whatever you claim to know.",
        },
        projects:
          "Interviewers are said to go line by line through the resume, so be ready to discuss any internship, club or class project in detail, including numbers and your specific role. Prepare one or two current deals or a stock idea you can defend.",
        roleNotes: [
          {
            roleId: "markets-trader",
            notes:
              "Sales and trading candidates report a video round with at least one technical or market question, then a final round heavy on market views, current news and why trading over banking. Probability and mental math can appear.",
          },
        ],
        prep: [
          "Apply as soon as the portal opens for your office; review is rolling and classes fill early.",
          "Practice timed video answers out loud and rehearse concise answers to why banking and why Goldman.",
          "Build one clean DCF walk-through and be able to discuss two recent deals Goldman advised on.",
          "Know every line of your resume well enough to explain results, tradeoffs and your own contribution.",
          "Network with analysts at the firm early; coffee chats help you pick a division and sharpen your why-firm answer.",
          "Read the daily market news and form a short opinion on rates, equities and one sector.",
          "Check eligibility for early-insight or diversity programs, which can create an earlier path into recruiting.",
        ],
      },
    ],
    sources: [
      { label: "Goldman Sachs students: prepare", url: "https://www.goldmansachs.com/careers/students/prepare" },
      { label: "Goldman Sachs 2027 Summer Analyst Programme (EMEA)", url: "https://www.goldmansachs.com/careers/students/programs/emea/summer-analyst-programme.html" },
      { label: "Goldman Sachs New Analyst Program (Americas)", url: "https://www.goldmansachs.com/careers/students/programs-and-internships/americas/new-analyst-program" },
      { label: "Exponent: Goldman IB summer analyst interview", url: "https://www.tryexponent.com/guides/goldman-sachs-investment-banking-summer-analyst-interview" },
      { label: "Wall Street Oasis: Goldman IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/goldman-sachs/interview/investment-banking-summer-analyst-63" },
      { label: "Wall Street Oasis: Goldman S&T summer analyst interview", url: "https://www.wallstreetoasis.com/company/goldman-sachs/interview/sales-and-trading-summer-analyst-4" },
    ],
  },
  {
    companyId: "jpmorgan",
    summary:
      "JPMorgan runs a rolling application, a short recorded video interview, then a superday of a few back-to-back interviews. Its official pages say assessments vary by role and that offers follow a review of the whole application. Most seats for the summer class are commonly reported to fill within the first couple of months after applications open.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          {
            name: "Application",
            format: "Online form with program-specific questions; rolling review",
            what: "Prep sites report the summer analyst application opening around late December to early January and filling on a rolling basis. JPMorgan advises limiting yourself to a few summer programs.",
          },
          {
            name: "Recorded video interview",
            format: "One-way video, commonly about three questions on a timer, with a completion deadline around a week",
            what: "Reported prompts cover why JPMorgan, why investment banking and a situation where you synthesized information. Some candidates also report game-style assessments.",
          },
          {
            name: "Optional first-round call",
            format: "Short screening conversation with a banker",
            what: "Not universal; many candidates reportedly go from video straight to the superday.",
          },
          {
            name: "Superday",
            format: "Typically three, sometimes up to five, back-to-back interviews of roughly 25-30 minutes, on video or in person",
            what: "Reported pattern: one technical-heavy interview, one mixed, and a final behavioral conversation with a senior banker.",
          },
          {
            name: "Offer",
            format: "Rolling offers, often within two to three weeks after the superday",
            what: "Offers are extended on a rolling basis; reported response windows are about a week.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral questions dominate the video round and the senior-banker conversation. JPMorgan encourages measurable results when describing accomplishments, which fits structured stories.",
          themes: ["Why investment banking", "Why JPMorgan", "Analytical thinking", "Teamwork", "Distinctive background"],
          examples: [
            "Why do you want banking and why at JPMorgan specifically?",
            "Describe a time you pulled together information from several sources to make a decision.",
            "What sets you apart from other candidates?",
            "Tell me about a time you led or influenced a team.",
            "Which sector or group interests you and why?",
          ],
        },
        technical: {
          share: "Around a third of the superday, with one interview often mostly technical",
          topics: ["DCF walk-through", "Enterprise value mechanics", "Financial statement effects", "Comps", "Market and deal discussion"],
          style:
            "Verbal, conceptual questions for the most part; some reports mention brain teasers and market discussion. Depth is moderate for undergraduates.",
        },
        projects:
          "Expect questions on your resume items and any finance experience, with follow-ups on numbers and your role. Prepare a view on a recent deal or sector you can discuss intelligently.",
        roleNotes: [
          {
            roleId: "markets-trader",
            notes:
              "Markets roles are recruited through separate applications. Evidence here is thin; expect more market views, current-events questions and quantitative reasoning than in banking.",
          },
        ],
        prep: [
          "Apply in the first days of the window; the class is reported to fill on a rolling basis.",
          "Practice recorded answers with a timer, including a tight why-JPMorgan answer tied to a group or deal.",
          "Be fluent on enterprise value, the DCF and how the statements link.",
          "Quantify your resume bullets so follow-up questions are easy.",
          "Use JPMorgan early-career events such as Inside the Industry or sophomore programs, which can fast-track interviews.",
          "Do coffee chats to learn group differences before the superday.",
        ],
      },
    ],
    sources: [
      { label: "J.P. Morgan: how we hire", url: "https://careers.jpmorgan.com/us/en/advice" },
      { label: "J.P. Morgan: how we hire FAQ", url: "https://careers.jpmorgan.com/us/en/how-we-hire/faqs" },
      { label: "J.P. Morgan: Inside the Industry program", url: "https://careers.jpmorgan.com/us/en/students/programs/inside-the-industry" },
      { label: "Exponent: JPMorgan IB summer analyst interview", url: "https://www.tryexponent.com/guides/jpmorgan-investment-banking-summer-analyst-interview" },
      { label: "Leland: JP Morgan interview guide", url: "https://site.joinleland.com/library/a/jp-morgan-interview" },
      { label: "Wall Street Oasis: JPMorgan IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/jpmorgan/interview/investment-banking-summer-analyst" },
    ],
  },
  {
    companyId: "morgan-stanley",
    summary:
      "Morgan Stanley is commonly reported to use a quick HireVue, one or two early rounds, then a superday, and the full timeline can be long and uneven. Interviewers are said to probe follow-ups to test depth rather than breadth. Details differ by division and region.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          {
            name: "Application",
            format: "Online application, reviewed on a rolling basis",
            what: "Prep guides say the class fills while the window is still open, so early submission is advised.",
          },
          {
            name: "HireVue",
            format: "One-way video, commonly 3-5 questions with about 30 seconds of prep and 1.5 minutes per answer, deadline within days",
            what: "Mostly behavioral on leadership and teamwork, with an occasional light technical or markets question such as equity vs debt.",
          },
          {
            name: "First-round call",
            format: "About 20-45 minutes with an analyst, associate or sometimes a VP",
            what: "Behavioral plus light technicals; some reports mention two interviewers.",
          },
          {
            name: "Superday",
            format: "Reports range from three to six back-to-back interviews of 30-45 minutes, with breakout rooms when virtual; some report a group exercise",
            what: "Fit with analysts and associates, technicals with VPs and commercial awareness with senior bankers.",
          },
          {
            name: "Offer",
            format: "Timelines reported from 2-4 weeks to up to a few months",
            what: "Candidates describe a slow, variable process; follow up politely with your recruiter.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral fit is tested in the HireVue, the first call and with each superday interviewer, who choose their own questions.",
          themes: ["Leadership", "Teamwork", "Why Morgan Stanley", "Why banking", "Handling pressure"],
          examples: [
            "Walk me through your resume.",
            "Why Morgan Stanley over other banks?",
            "Describe a time you led a group through a hard problem.",
            "How do you handle tight deadlines and competing priorities?",
            "Tell me about a deal or market development you have been following.",
          ],
        },
        technical: {
          share: "Light in early rounds, perhaps a third of the superday",
          topics: ["Accounting linkages", "DCF and WACC", "Valuation methods", "Equity vs debt financing", "Strategic vs financial buyers", "Market awareness"],
          style:
            "Verbal Q&A; interviewers reportedly ask follow-ups until they find the edge of your knowledge, so understand why, not just how.",
        },
        projects:
          "Resume items are fair game, especially anything finance-related. Be prepared to go deep on one deal or stock idea.",
        roleNotes: [
          {
            roleId: "markets-trader",
            notes:
              "Sales and trading reports describe a short HireVue, a call with a desk contact, then 3-4 half-hour superday interviews. Expect stock pitches, trade ideas, news, and probability or brain-teaser questions.",
          },
        ],
        prep: [
          "Submit early and complete the HireVue promptly within the deadline.",
          "Rehearse 90-second answers; use the single retry only if you must.",
          "Know DCF inputs and why each moves value; practice answering the follow-up why.",
          "Prepare a clear why-Morgan-Stanley tied to specific groups or deals.",
          "Practice a group-exercise mindset: collaborative, concise and structured.",
          "Stay patient on timing and keep your recruiter informed of competing deadlines.",
        ],
      },
      {
        group: "investment-banking",
        label: "Sales & trading / markets",
        stages: [
          { name: "HireVue", format: "About three questions, some retakes reported", what: "Behavioral and a market-view prompt such as where a major index heads over the next year." },
          { name: "Desk or VP call", format: "About 30 minutes", what: "Why Morgan Stanley and why trading, resume and sometimes probability questions." },
          { name: "Superday", format: "Three to four half-hour interviews, in person or virtual", what: "Stock pitch, trade ideas, current news and brain teasers." },
        ],
        behavioral: {
          star: "helpful",
          style: "Short, direct questions on motivation and experiences, with emphasis on competitiveness and judgment.",
          themes: ["Why trading", "Market interest", "Composure under pressure"],
          examples: [
            "Why sales and trading rather than banking?",
            "Pitch me a stock you like.",
            "What is happening in markets this week and how would you trade it?",
          ],
        },
        technical: {
          share: "A large share of the superday",
          topics: ["Market views", "Stock pitch", "Probability and mental math", "Rates and macro basics"],
          style: "Conversational with live follow-ups; evidence is from older and anecdotal reports.",
        },
        projects: "Have two investment ideas and a view on the major asset classes ready.",
        prep: [
          "Follow markets daily and keep a watch list.",
          "Prepare a stock pitch with a thesis, valuation and risks.",
          "Practice dice and expected-value problems.",
        ],
      },
    ],
    sources: [
      { label: "Wall Street Oasis: Morgan Stanley IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/morgan-stanley/interview/investment-banking-summer-analyst-65" },
      { label: "Exponent: Morgan Stanley IB summer analyst interview", url: "https://www.tryexponent.com/guides/morgan-stanley-investment-banking-summer-analyst-interview" },
      { label: "IGotAnOffer: Morgan Stanley HireVue", url: "https://igotanoffer.com/en/advice/morgan-stanley-hirevue-interview" },
      { label: "Leland: Morgan Stanley HireVue questions", url: "https://site.joinleland.com/library/a/morgan-stanley-hirevue-questions-and-how-to-answer-them" },
      { label: "Wall Street Oasis: Morgan Stanley sales & trading summer analyst", url: "https://www.wallstreetoasis.com/company/morgan-stanley/interview/sales-trading-summer-analyst-3" },
    ],
  },
  {
    companyId: "citi",
    summary:
      "Citi is commonly reported to review applications on a rolling basis, screen with a timed video interview, then run one or two live rounds before a superday of about three interviews. Evidence is mostly from prep guides and Glassdoor reports, and regional offices run separate processes.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Online application", format: "Standard submission, rolling review", what: "Guides say most of the class is filled months before the formal deadline, so apply early." },
          { name: "Video screen", format: "Timed recorded responses", what: "Reportedly scored before a banker sees your name; the exact format is not well documented for Citi." },
          { name: "First-round interview", format: "About 30-45 minutes one-on-one with an analyst, associate or VP", what: "Mix of behavioral and technical questions." },
          { name: "Superday", format: "Reports range from three 30-minute Zoom rooms to five or six round-robin interviews", what: "Interviewers from VP to MD level; one candidate described rotations of technical, leadership and behavioral segments." },
          { name: "Offer", format: "Not well documented", what: "Timing varies by office; confirm with your recruiter." },
        ],
        behavioral: {
          star: "helpful",
          style: "Every round mixes behavioral, technical and markets questions, with interviewers picking their own focus.",
          themes: ["Why Citi", "Why banking", "Leadership", "Knowledge of the firm"],
          examples: [
            "Tell me about yourself and why banking.",
            "Why Citi and what do you know about its history and strengths?",
            "Describe a leadership experience and its outcome.",
            "What recent market event interested you?",
          ],
        },
        technical: {
          share: "Roughly a third of each interview",
          topics: ["Valuation methods", "Accounting basics", "DCF", "Market awareness"],
          style: "Verbal questions; depth varies by interviewer.",
        },
        projects: "Know your resume deeply and be ready to discuss any experience with numbers and your role.",
        prep: [
          "Apply as early as possible.",
          "Ask current analysts or seniors about the superday format for your office.",
          "Learn Citi's global footprint and where its banking franchise is strongest.",
          "Prepare behavioral stories for leadership and teamwork.",
          "Review accounting and valuation basics.",
        ],
      },
    ],
    sources: [
      { label: "Exponent: Citigroup IB summer analyst interview", url: "https://www.tryexponent.com/guides/citigroup-investment-banking-summer-analyst-interview" },
      { label: "Glassdoor: Citi interview review", url: "https://clear.glassdoor.nl/Interview/Citi-Interview-E8843-RVW3668517.htm" },
      { label: "Glassdoor: Citi interview review (2)", url: "https://www.glassdoor.ca/Interview/Citi-Interview-E8843-RVW596194.htm" },
    ],
  },
  {
    companyId: "bank-of-america",
    summary:
      "Bank of America recruiting is described as starting with networking, followed by a HireVue, sometimes a live filter round at certain schools, and then a superday. Evidence is anecdotal and varies by school and year. Applications reportedly open around December to January with most offers early.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Networking", format: "Coffee chats and events", what: "One guide says bankers log conversations with notes, so chats can influence screening." },
          { name: "Application and HireVue", format: "One-way video, about 30 seconds prep and 2-3 minutes per answer", what: "Behavioral and motivation, including why BofA." },
          { name: "Filter round", format: "Live interview about a week later at some schools", what: "Not universal." },
          { name: "Superday", format: "Reports range from 2-3 to 4-5 interviews of 30-45 minutes, on Zoom, Teams or in person", what: "Conversational but rigorous on technicals, plus fit." },
          { name: "Offer", format: "Offers reportedly mostly in the first month, remaining seats fill through spring", what: "Rolling." },
        ],
        behavioral: {
          star: "helpful",
          style: "Conversational fit interviews; networking impressions can carry into the process.",
          themes: ["Why BofA", "Why banking", "Deal ownership", "Market interest"],
          examples: [
            "Tell me about yourself.",
            "Why investment banking and why Bank of America?",
            "Walk me through a project or deal from your past experience, including numbers.",
            "What recent deals or market trends caught your attention?",
          ],
        },
        technical: {
          share: "A substantial portion of the superday",
          topics: ["Valuation", "Accounting", "Deal knowledge", "Market trends"],
          style: "Verbal and conversational.",
        },
        projects: "Know the financials, your role and the outcome of any deal or project on your resume.",
        prep: [
          "Start networking early and keep notes on each contact.",
          "Apply the week applications open.",
          "Prepare a why-BofA tied to its platform and sector strengths.",
          "Read market news and recent BofA-advised deals.",
          "Practice HireVue answers on camera.",
        ],
      },
    ],
    sources: [
      { label: "SuperdayAI: Bank of America superday", url: "https://www.superdayai.com/banks/bank-of-america/superday" },
      { label: "Exponent: Bank of America IB summer analyst interview", url: "https://www.tryexponent.com/guides/bank-of-america-investment-banking-summer-analyst-interview" },
      { label: "Wall Street Oasis: BofA first-year analyst interview", url: "https://www.wallstreetoasis.com/company/bank-of-america-merrill-lynch/interview/first-year-analyst" },
      { label: "Wall Street Oasis: BofA superday thread", url: "https://www.wallstreetoasis.com/forum/investment-banking/bofa-superday" },
      { label: "IGotAnOffer: IB superday interviews", url: "https://igotanoffer.com/en/advice/investment-banking-superday-interviews" },
    ],
  },
  {
    companyId: "barclays",
    summary:
      "Barclays is commonly reported to use an online assessment, a values-oriented video interview, then a superday of three or four short interviews. Candidates stress fit and motivation, with some conceptual technicals. Details differ by region.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Online assessment", format: "Timed numerical, logical and situational tests in some regions", what: "Failing the cutoff reportedly ends the process; one candidate described a test heavy in corporate finance." },
          { name: "Video interview", format: "Commonly 5-7 questions, about a minute of prep and 1-2 minutes to answer, one attempt", what: "Reportedly scored against firm values; not always required for banking." },
          { name: "Superday", format: "Three or four 30-minute interviews with analysts to MDs", what: "Mix of behavioral, markets and conceptual technicals, such as DCF, LBO and a stock pitch." },
          { name: "Offer", format: "Reported within a day or two to a few days after a good superday", what: "Overall process length from weeks to a couple of months." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit is described by candidates as the most important element.",
          themes: ["Barclays values", "Why Barclays", "Teamwork", "Resilience"],
          examples: [
            "Why Barclays and this group?",
            "Tell me about a time you worked under pressure in a team.",
            "How do your values align with the bank's?",
            "Walk me through your resume.",
          ],
        },
        technical: {
          share: "About a third",
          topics: ["DCF", "LBO concepts", "Stock pitch", "Markets"],
          style: "Conceptual and conversational.",
        },
        projects: "Be ready to discuss your resume and a stock or deal you can pitch.",
        prep: [
          "Check whether your program requires the online test or video.",
          "Study Barclays' stated values and map your stories to them.",
          "Practice timed video answers.",
          "Prepare a stock pitch and a conceptual DCF/LBO walkthrough.",
          "Network with Barclays bankers to refine your group interest.",
        ],
      },
    ],
    sources: [
      { label: "Wall Street Oasis: Barclays IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/barclays/interview/investment-banking-summer-analyst" },
      { label: "Wall Street Oasis: Barclays IB analyst FT interview", url: "https://www.wallstreetoasis.com/company/barclays-capital/interview/investment-banking-analyst-ft" },
      { label: "Intervyo: Barclays HireVue guide", url: "https://www.intervyo.co.uk/firms/barclays/hirevue" },
      { label: "The Interview Guys: Barclays HireVue questions", url: "https://blog.theinterviewguys.com/?p=18779" },
    ],
  },
  {
    companyId: "ubs",
    summary:
      "UBS is commonly reported to use a HireVue, a phone or video first round, then a superday whose format varies widely by year and office. Referrals and networking appear to matter. All evidence is anecdotal.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Application and assessments", format: "Online; some candidates report personality or situational tests", what: "Initial screening." },
          { name: "HireVue", format: "Reports of five to eight questions, about 30-90 seconds prep, 2 minutes each; some mention a week to complete", what: "Mainly behavioral with occasional market questions." },
          { name: "First-round call", format: "About 40 minutes by phone", what: "Fit, why IB, basic technicals such as a DCF walk-through or comps." },
          { name: "Superday", format: "Reported anywhere from three 20-minute interviews to six 30-minute interviews", what: "Mix varies from mostly behavioral to mostly technical; MDs often ask market questions." },
          { name: "Offer", format: "Process commonly four to eight weeks", what: "Anecdotal." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit and motivation dominate, with market views from senior interviewers.",
          themes: ["Why UBS", "Why IB", "Market awareness"],
          examples: [
            "Why UBS and why you?",
            "Tell me about a news story you found interesting.",
            "What is happening in markets right now?",
          ],
        },
        technical: {
          share: "Varies from none to most of the superday",
          topics: ["DCF", "Comps multiples", "Market hypotheticals"],
          style: "Verbal; associates and analysts ask textbook-style questions.",
        },
        projects: "Prepare to discuss experiences and a news item in depth.",
        prep: [
          "Use alumni or contacts for referrals; several reports credit them.",
          "Practice HireVue with a timer.",
          "Review standard DCF and comps questions.",
          "Form views on current markets.",
        ],
      },
    ],
    sources: [
      { label: "Wall Street Oasis: UBS IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/ubs/interview/investment-banking-summer-analyst" },
      { label: "Wall Street Oasis: UBS IB summer analyst (2)", url: "https://www.wallstreetoasis.com/company/ubs-ag/interview/investment-banking-summer-analyst-41" },
      { label: "Final Round AI: UBS interview process", url: "https://www.finalroundai.com/blog/ubs-interview-process" },
      { label: "Glassdoor: UBS interview review", url: "https://www.glassdoor.com.hk/Interview/UBS-Interview-E3419-RVW8609707.htm" },
    ],
  },
  {
    companyId: "deutsche-bank",
    summary:
      "Deutsche Bank's process reportedly differs by region: UK and APAC candidates complete online tests and a recorded interview before a final assessment center, while US candidates reportedly go to a live division interview and a superday. Evidence is thin and partly dated.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Application", format: "Online", what: "Initial screening." },
          { name: "Online test and recorded interview (UK/APAC)", format: "Situational test and recorded video, per one guide", what: "US candidates reportedly skip these." },
          { name: "Live division interview (US)", format: "Interview with the hiring division", what: "Fit and light technicals." },
          { name: "Superday / assessment center", format: "Superday in the US; in London a candidate described three 45-minute interviews covering competency, a case study and technicals", what: "Final decision." },
        ],
        behavioral: {
          star: "helpful",
          style: "A US candidate said interviews were mostly resume and fit, with why IB and why DB seen as the key questions.",
          themes: ["Why DB", "Why IB", "Market awareness"],
          examples: [
            "Why investment banking?",
            "Why Deutsche Bank?",
            "How are banks doing at the moment?",
          ],
        },
        technical: {
          share: "Small to moderate; region-dependent",
          topics: ["DCF and WACC", "CAPM", "Valuation limits for banks", "Rates impact on DCF", "Mental math"],
          style: "Verbal; a guide notes interviewers like to test where a method breaks down.",
        },
        projects: "Evidence is limited; expect resume-based discussion.",
        prep: [
          "Confirm the process steps for your region.",
          "Prepare strong why-IB and why-DB answers.",
          "Know when a DCF or EV/EBITDA fails, such as for banks.",
          "Practice mental math if applying in the UK.",
          "Follow banking sector news.",
        ],
      },
    ],
    sources: [
      { label: "Exponent: Deutsche Bank IB summer analyst interview", url: "https://www.tryexponent.com/guides/deutsche-bank-investment-banking-summer-analyst-interview" },
      { label: "Glassdoor: Deutsche Bank interview review", url: "https://static.glassdoor.at/Interview/Deutsche-Bank-Interview-E3150-RVW6019091.htm" },
      { label: "Glassdoor: Deutsche Bank interview review (2)", url: "https://static.glassdoor.ch/Interview/Deutsche-Bank-Interview-E3150-RVW2494027.htm" },
    ],
  },
  {
    companyId: "rbc-capital-markets",
    summary:
      "Public evidence on RBC Capital Markets analyst recruiting is thin. Reports suggest a multi-interview superday mixing valuation case work, behavioral and technical questions, with strong emphasis on why RBC and why a specific office or group.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Application", format: "Online application via careers site or campus portal", what: "Initial screening." },
          { name: "Early screening", format: "Not well documented", what: "Check your invitation for assessments or a call." },
          { name: "Superday", format: "One older report described three 40-minute interviews: valuation case, behavioral, technical/brainteaser", what: "Format may have changed." },
          { name: "Decision", format: "One recent candidate described a one-week process", what: "Anecdotal." },
        ],
        behavioral: {
          star: "helpful",
          style: "Questions on why RBC, why the office and why IB.",
          themes: ["Why RBC", "Why this group or city", "Why IB"],
          examples: [
            "Why RBC and this role?",
            "Why this city or sector team?",
            "Why investment banking?",
          ],
        },
        technical: {
          share: "Unclear; roughly a third is a fair assumption",
          topics: ["DCF", "M&A", "LBO", "Comps", "Valuation case study"],
          style: "Mix of conversation and a case; evidence is limited.",
        },
        projects: "Expect resume questions; prepare a sector view.",
        prep: [
          "Confirm office and group focus, such as energy in Houston.",
          "Know basic DCF, comps, M&A and LBO.",
          "Prepare a clear why-RBC.",
          "Network with RBC bankers and alumni.",
        ],
      },
    ],
    sources: [
      { label: "Wall Street Oasis: RBC IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/rbc-capital-markets/interview/investment-banking-summer-analyst" },
      { label: "Wall Street Oasis: RBC global markets superday thread", url: "https://www.wallstreetoasis.com/forum/trading/rbc-global-markets-superday" },
      { label: "Glassdoor: RBC interview review", url: "https://www.glassdoor.co.in/Interview/RBC-Interview-E3358-RVW103400615.htm" },
    ],
  },
  {
    companyId: "wells-fargo",
    summary:
      "Wells Fargo is commonly reported to begin with a recorded behavioral interview, sometimes a short live call, then a superday of about three interviews, two technical and one behavioral. Reports call technicals fairly deep but less intense than elite boutiques. Evidence is anecdotal.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "HireVue", format: "Recorded behavioral round, about 4-7 questions with a deadline", what: "A major cut." },
          { name: "First-round call", format: "Roughly 15-30 minutes, sometimes with two bankers", what: "Resume and motivation; skipped for some." },
          { name: "Superday", format: "Commonly three 30-minute interviews, two technical and one behavioral; some report four or five", what: "Virtual or in person." },
          { name: "Offer", format: "Process can finish within weeks", what: "A separate earlier summit track exists for some candidates." },
        ],
        behavioral: {
          star: "helpful",
          style: "Leadership, teamwork and market awareness; seniority of interviewer varies.",
          themes: ["Why Wells Fargo", "Leadership", "Communication", "Following markets"],
          examples: [
            "Why Wells Fargo?",
            "Describe a leadership experience.",
            "How do you stay current on the markets?",
          ],
        },
        technical: {
          share: "About two thirds of the superday",
          topics: ["DCF and free cash flow", "Working capital", "Terminal value (Gordon growth)", "Commercial banking link"],
          style: "Verbal, sometimes a paper DCF.",
        },
        projects: "Be able to explain the bank's commercial banking tie to IB and your resume.",
        prep: [
          "Prepare a strong HireVue.",
          "Be ready to build a basic DCF on paper.",
          "Know Wells Fargo's corporate and investment banking platform.",
          "Check for summit or early programs.",
        ],
      },
    ],
    sources: [
      { label: "Exponent: Wells Fargo IB summer analyst interview", url: "https://www.tryexponent.com/guides/wells-fargo-investment-banking-summer-analyst-interview" },
      { label: "SuperdayAI: Wells Fargo superday", url: "https://www.superdayai.com/banks/wells-fargo/superday" },
      { label: "PrepLounge: Wells Fargo interview", url: "https://www.preplounge.com/en/articles/interview-wells-fargo" },
      { label: "Glassdoor: Wells Fargo interview review", url: "https://static.glassdoor.com.mx/Interview/Wells-Fargo-Interview-E8876-RVW98736217.htm" },
    ],
  },
];
