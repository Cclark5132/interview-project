import type { CompanyGuide, Track } from "./types";

// Compiled from public sources (candidate reports, prep sites, career pages); formats vary by office and year.
type TrackInput = Omit<Track, "group">;
const ib = (t: TrackInput): Track => ({ group: "investment-banking", ...t });

const NET =
  "Networking matters at every firm in this group: classes are small and mostly filled from target and semi-target schools, so coffee chats with analysts and alumni often decide who gets a first-round slot.";

export const ibB: CompanyGuide[] = [
  {
    companyId: "jefferies",
    summary:
      "Jefferies is a large independent investment bank with a strong leveraged finance and middle-market franchise. Its careers pages describe a 10-week summer program that feeds full-time offers and a selective, multi-round interview process ending in a Superday, but give no round-by-round detail. Round lengths and question content come from candidate reports and vary by office.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst",
        stages: [
          { name: "Networking and application", format: "Coffee chats plus online application through the careers portal", what: "Resume, transcript and sometimes a cover letter; contacts made early help you get noticed. Applications are by group and office." },
          { name: "Online assessment", format: "Video or written screen (varies by office)", what: "Commonly reported as a HireVue-style recorded interview or aptitude test; not universal." },
          { name: "First round", format: "About 30 min phone or video with an analyst, associate or VP", what: "Mix of walk-through technicals (DCF, LBO, accounting) and why banking / why Jefferies." },
          { name: "Superday", format: "Roughly 3 to 6 back-to-back interviews of 20 to 30 min, some two-on-one", what: "Associates, VPs, directors and MDs; some interviews technical, others almost entirely fit. A mini case or deal discussion appears in some offices." },
          { name: "Offer", format: "Call from the group or HR", what: "Several candidates report decisions within days of the superday. Overall length reported from two weeks to a couple of months." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit carries real weight; some superday rounds are almost entirely personality and culture. Interviewers test whether your interest in Jefferies and its sectors is specific.",
          themes: ["Why Jefferies versus bulge brackets", "Why banking", "Understanding of hours and pace", "Market awareness", "Teamwork under pressure"],
          examples: [
            "Walk me through your resume and why you chose banking.",
            "What makes Jefferies different from the large banks or other boutiques?",
            "Tell me about a time you worked under a tight deadline with a team.",
            "What market trend or recent deal have you been following?",
            "Why this office or industry group?",
          ],
        },
        technical: {
          share: "Roughly a third to half, heavier in first round and with MD/director interviews on accounting",
          topics: ["Three statement linkages", "DCF walk-through", "Enterprise vs equity value", "LBO basics", "Leveraged finance and credit concepts", "Recent market and macro"],
          style: "Verbal walk-throughs; occasional paper math or mini case. Candidates report no formal modeling test for most analyst roles.",
        },
        projects:
          "Expect resume probing on finance coursework, internships and clubs, and a request for a recent deal or stock idea. Have one deal, one company view and one macro talking point rehearsed.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Groups and offices recruit separately, so tailor why-group answers; leveraged finance knowledge is a useful differentiator." },
          { roleId: "markets-trader", notes: "Sales and trading is a distinct recruiting track at Jefferies with market-focused questions; this guide covers banking only." },
          { roleId: "equity-research", notes: "Equity research recruits separately; no official detail on its process was found." },
        ],
        prep: [
          NET,
          "Prepare a sharp, specific answer to why Jefferies rather than a bulge bracket.",
          "Be able to walk through the three statements, DCF and a simple LBO without notes.",
          "Read up on leveraged finance and a few recent Jefferies-advised deals.",
          "Prepare for both heavily technical and heavily fit interviewers in the same superday.",
          "Remember Jefferies says it looks for enthusiasm, strong academics, analytical skill and attention to detail, and apply only through its official careers site.",
          "Follow markets daily and form a view on rates, M&A activity and one sector.",
          "Ask your campus contact which format your office uses; reports vary.",
        ],
      }),
    ],
    sources: [
      { label: "Jefferies: students and graduates", url: "https://www.jefferies.com/careers/students-and-graduates/" },
      { label: "Superday AI: Jefferies superday", url: "https://www.superdayai.com/banks/jefferies/superday" },
      { label: "Wall Street Oasis: Jefferies summer analyst IBD interview", url: "https://www.wallstreetoasis.com/company/jefferies-company/interview/summer-analyst-investment-banking-division" },
      { label: "Wall Street Oasis: Jefferies first year analyst interview", url: "https://www.wallstreetoasis.com/company/jefferies/interview/first-year-analyst" },
      { label: "Glassdoor: Jefferies interview questions", url: "https://static-pc.glassdoor.de/Interview/Jefferies-Interview-Questions-E1546_P12.htm" },
      { label: "GetSmartResume: Jefferies summer analyst guide", url: "https://www.getsmartresume.com/article/jefferies-summer-analyst-associate-program" },
    ],
  },
  {
    companyId: "evercore",
    summary:
      "Evercore is an elite independent advisory firm known for demanding technical interviews. Candidates commonly report a live first round with a junior banker, sometimes a second Zoom round with an associate, then a superday of several back-to-back sessions with mixed seniority.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst",
        stages: [
          { name: "Networking and application", format: "Coffee chats, then online application by office and group", what: "Resume screen; one guide says there is typically no online test or recorded video, going straight to live interviews." },
          { name: "First round", format: "15 to 30 min call with an analyst or associate", what: "Reports split between mostly behavioral and mostly technical." },
          { name: "Second round (not always)", format: "Zoom with an associate", what: "Medium-to-high difficulty technical questions plus fit." },
          { name: "Superday", format: "About 4 to 6 interviews of ~30 min, associates through MDs", what: "Valuation, accounting, M&A scenarios and fit; bring pen for paper math." },
          { name: "Offer", format: "Phone call", what: "Candidate reports range from two weeks to a few months end to end; summer programs recruit on a rolling basis on an early calendar." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit questions are standard but interviewers value specifics about deals and markets over generic enthusiasm.",
          themes: ["Why Evercore", "Why banking", "Knowledge of the firm and deals", "Resume depth", "Interest in markets"],
          examples: [
            "Tell me about yourself and how it led you to advisory banking.",
            "What do you know about Evercore's business and recent transactions?",
            "Why do you want to be an analyst rather than work in another area of finance?",
            "Describe a time you handled a demanding workload.",
          ],
        },
        technical: {
          share: "Commonly reported as roughly half or more; reputation for hard technicals",
          topics: ["Accounting and three statements", "Valuation methods", "DCF and WACC", "LBO and accretion/dilution", "Case-style M&A questions", "Mental math"],
          style: "Verbal and on paper; questions are reused year to year but interviewers push follow-ups to test understanding.",
        },
        projects:
          "Resume items are probed, particularly finance experience and any deals studied. Prepare a pitch-quality view of a recent deal and be ready to defend its logic.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Hiring is by office and sometimes group; the advisory and restructuring practices recruit similarly." },
          { roleId: "equity-research", notes: "Evercore ISI is a separate research business with its own process; this guide covers banking." },
        ],
        prep: [
          NET,
          "Drill accounting and valuation until follow-up questions on why feel easy.",
          "Practice DCF, LBO and merger math on paper with a pen.",
          "Prepare two or three recent Evercore-advised deals and your view on why they made sense.",
          "Rehearse a tight, specific why-Evercore answer.",
          "Review older reported question themes, but expect twists.",
        ],
      }),
    ],
    sources: [
      { label: "Superday AI: Evercore superday", url: "https://www.superdayai.com/banks/evercore/superday" },
      { label: "Exponent: Evercore IB summer analyst interview", url: "https://www.tryexponent.com/guides/evercore-investment-banking-summer-analyst-interview" },
      { label: "Wall Street Oasis: Evercore IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/evercore/interview/investment-banking-summer-analyst-19" },
      { label: "PrepLounge: Evercore interview", url: "https://www.preplounge.com/en/articles/interview-evercore" },
    ],
  },
  {
    companyId: "lazard",
    summary:
      "Lazard hires analysts through a short process: a first round with junior bankers and a superday with senior bankers, with an online or video step in some regions. Sources describe a generalist approach where summer analysts cover M&A and restructuring and pick a group later, though evidence is mostly third-party.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst (M&A, restructuring and liability management)",
        stages: [
          { name: "Networking and application", format: "Coffee chats, online application by office", what: "Small classes make referrals and informational calls valuable." },
          { name: "Online step (region dependent)", format: "Timed aptitude test or recorded interview", what: "Reported as standard in the UK and inconsistent in the US." },
          { name: "First round", format: "Short call with an analyst or associate", what: "Why IB, why Lazard, a recent deal, and core technicals." },
          { name: "Superday", format: "About 5 to 6 interviews with senior bankers", what: "Technical depth including M&A structures and sometimes restructuring scenarios; brain teasers or cases reported." },
          { name: "Offer", format: "Call from the group", what: "Rolling process; the lateral and summer calendars differ by office." },
        ],
        behavioral: {
          star: "helpful",
          style: "Standard motivation questions plus leadership and pressure examples; guides advise STAR-style structure.",
          themes: ["Why Lazard", "Why banking", "Leading through pressure", "Awareness of deals", "Fit with a small team"],
          examples: [
            "Why Lazard instead of a bulge bracket or another boutique?",
            "Tell me about a recent Lazard deal and why it interested you.",
            "Describe leading a team through a stressful situation.",
            "What would your teammates say about working with you?",
          ],
        },
        technical: {
          share: "Commonly reported as substantial, especially in the superday",
          topics: ["DCF walk-through", "Accretion/dilution", "Strategic rationale of a deal", "Capital structure and distress drivers", "Debt-for-equity swaps and covenant resets", "Recovery and haircuts"],
          style: "Verbal, with occasional mini cases or brain teasers; restructuring depth depends on the group.",
        },
        projects:
          "Expect questions on deals or distressed situations you follow. Prepare to explain a company's capital structure and what a fix might look like.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Summer analysts reportedly join as generalists and choose a group later; restructuring and liability management can come up even for M&A candidates." },
        ],
        prep: [
          NET,
          "Learn the basics of restructuring: priority of claims, debt-for-equity swaps, and out-of-court amendments.",
          "Prepare a specific recent Lazard deal with your view of the rationale.",
          "Practice DCF and accretion/dilution walk-throughs.",
          "Build STAR stories on leadership and pressure.",
          "Verify the US vs UK online steps with your campus contact.",
        ],
      }),
    ],
    sources: [
      { label: "Road to Offer: Lazard interview questions", url: "https://www.roadtooffer.com/blog/lazard-interview-questions" },
      { label: "Exponent: Lazard IB summer analyst interview", url: "https://www.tryexponent.com/guides/lazard-investment-banking-summer-analyst-interview" },
      { label: "Wall Street Oasis: Lazard IB analyst interview", url: "https://www.wallstreetoasis.com/company/lazard-middle-market/interview/lazard-investment-banking-analyst" },
      { label: "Tech Interview: Lazard guide", url: "https://www.techinterview.org/companies/lazard-interview-guide/" },
      { label: "Superday AI: Lazard", url: "https://www.superdayai.com/banks/lazard" },
    ],
  },
  {
    companyId: "moelis",
    summary:
      "Moelis recruits summer analysts by group and office with an online assessment, one or two technical first rounds and a fit-heavy superday. Details come from third-party guides and a few candidate reports, so treat the specifics as approximate.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst",
        stages: [
          { name: "Networking and application", format: "Online application; campus guidance may limit multiple applications", what: "One guide says the calendar opens around December of sophomore year; deadlines vary by school." },
          { name: "Online assessment", format: "Work-style and cognitive test", what: "Reported as a Suited-type score for US and UK applicants; required before advancing." },
          { name: "First round", format: "One or two ~30 min interviews with analyst or associate", what: "Mostly technical: valuation and accounting." },
          { name: "Superday", format: "3 to 5 back-to-back 30 min interviews", what: "Bankers of varied seniority; centered on fit, with technical follow-ups." },
          { name: "Offer", format: "Phone call", what: "Program is 10 weeks with a training week on modeling and valuation." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit-centered superday; candidates report needing to stand out with a differentiated story.",
          themes: ["Tell me about yourself", "Why Moelis", "Why banking", "Differentiation", "Interest in the group"],
          examples: [
            "Walk me through your background and why advisory.",
            "Why Moelis specifically?",
            "What sets you apart from other applicants?",
            "Which sector interests you and why?",
          ],
        },
        technical: {
          share: "Majority of the first round; smaller share of the superday",
          topics: ["Valuation methods", "Accounting and three statements", "Liquidation valuation", "Conceptual IRR", "Basic LBO"],
          style: "Verbal walk-throughs; older reports mention building the statements out loud.",
        },
        projects:
          "Resume and experiences are discussed in the fit portion. Be ready to discuss a recent deal and why you follow it.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Moelis also has a well-known restructuring practice; restructuring awareness helps but is not reported as required for all analysts." },
        ],
        prep: [
          NET,
          "Apply early; overlapping interview timelines can force you to choose.",
          "Be fluent on valuation and accounting before the first round.",
          "Craft a differentiated why-Moelis answer.",
          "Take the online assessment seriously and practice similar tests.",
          "Prepare to discuss a deal and a sector in detail.",
        ],
      }),
    ],
    sources: [
      { label: "Exponent: Moelis IB summer analyst interview", url: "https://www.tryexponent.com/guides/moelis-investment-banking-summer-analyst-interview" },
      { label: "GetSmartResume: Moelis summer analyst guide", url: "https://www.getsmartresume.com/article/moelis-summer-analyst-associate-program" },
      { label: "Wall Street Oasis: Moelis summer analyst interview", url: "https://www.wallstreetoasis.com/company/moelis-company/interview/summer-analyst-90" },
      { label: "Finbound: Moelis internship application guide", url: "https://www.finbound.org/blog/moelis-summer-internship-application-guide" },
    ],
  },
  {
    companyId: "pjt-partners",
    summary:
      "PJT Partners is a small elite firm whose restructuring and liability management practice is among the best known. Reports describe separate applications by business, an assessment, one or two junior interviews, then a superday of about four to five sessions.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst (advisory, restructuring and liability management)",
        stages: [
          { name: "Networking and application", format: "Separate applications per business (strategic advisory, restructuring)", what: "Very small classes; networking and referrals matter." },
          { name: "Assessment", format: "Online or case-based (varies by office)", what: "A London report described a modeling case; the US varies." },
          { name: "First round", format: "One or two interviews with junior bankers", what: "Mix of behavioral and technical, with restructuring questions common." },
          { name: "Superday", format: "About 4 to 5 interviews of ~30 min, analysts through partners", what: "Market, behavioral and technical; some candidates report extra interviews or a case afterward." },
          { name: "Offer", format: "Call", what: "Process reported as about two weeks in some offices." },
        ],
        behavioral: {
          star: "helpful",
          style: "Experience-based and fit questions; some superdays are mostly behavioral.",
          themes: ["Why PJT", "Why restructuring or advisory", "Resilience", "Market knowledge", "Work ethic"],
          examples: [
            "Why PJT and why this business?",
            "Tell me about a hard situation you managed with limited information.",
            "What is a market theme affecting restructuring or M&A right now?",
            "Why do you fit a small team?",
          ],
        },
        technical: {
          share: "Commonly reported as large for RX candidates; detailed valuation for M&A candidates",
          topics: ["Accounting effects across statements", "Valuation", "Capital structure and priority of claims", "Chapter 11 basics", "Liability management transactions", "Recovery analysis"],
          style: "Verbal, sometimes with a case or modeling exercise.",
        },
        projects:
          "Expect resume probing and discussion of recent PJT deals or restructurings. Prepare a view on a distressed company if applying to RX.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Restructuring emphasis shows up even for M&A candidates given the firm's heritage; RX candidates face deeper bankruptcy questions." },
        ],
        prep: [
          NET,
          "Study bankruptcy basics: Chapter 11 process, DIP financing, priority of claims.",
          "Learn how liability management exercises work in general terms.",
          "Review how a change like depreciation flows through all three statements.",
          "Follow recent PJT deals and restructurings in the news.",
          "Decide which business you are applying to and why.",
        ],
      }),
    ],
    sources: [
      { label: "Superday AI: PJT Partners superday", url: "https://www.superdayai.com/banks/pjt-partners/superday" },
      { label: "Exponent: PJT IB summer analyst interview", url: "https://www.tryexponent.com/guides/pjt-partners-investment-banking-summer-analyst-interview" },
      { label: "Wall Street Oasis: PJT superday insights", url: "https://www.wallstreetoasis.com/forum/investment-banking/pjt-superday-insights" },
      { label: "Glassdoor: PJT Partners interview (NY, Jan 2026)", url: "https://static.glassdoor.co.uk/Interview/PJT-Partners-Interview-E1198567-RVW102461425.htm" },
    ],
  },
  {
    companyId: "centerview",
    summary:
      "Centerview is an ultra-selective advisory boutique with a very small analyst class and a lean process: a screen, a first round, and one in-person superday. Sources suggest technical questions emphasise reasoning about changing assumptions, and recruiting starts early through networking.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst",
        stages: [
          { name: "Networking and outreach", format: "Alumni calls, sophomore events", what: "One source says candidates are identified as early as freshman or sophomore year from a narrow school set." },
          { name: "Screen", format: "Short call with an analyst", what: "Background, why Centerview and basic fit questions." },
          { name: "First round", format: "Back-to-back ~30 min interviews", what: "One technical and one behavioral per one guide." },
          { name: "Superday", format: "One in-person day, about 5 interviews with two interviewers each", what: "Technicals, brainteasers, market sizing and situational prompts." },
          { name: "Offer", format: "Call", what: "Rolling process with no published deadline; seats fill early." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit-focused early rounds with questions about the firm's strategy and your background.",
          themes: ["Why Centerview", "Knowledge of firm strategy", "Judgment", "Intellectual curiosity"],
          examples: [
            "Tell me about yourself.",
            "What do you know about Centerview and how it differs from larger banks?",
            "Which recent transaction interested you and why?",
            "What is your view on a current market trend?",
          ],
        },
        technical: {
          share: "Mixed; some sources say brainteasers and sizing outweigh classic finance",
          topics: ["Assumption-change reasoning", "Brainteasers", "Market sizing", "Accounting and valuation basics", "Transaction math (UK exercise reported)"],
          style: "Live and spoken in the US per one guide; a UK-style written analytical exercise is reported separately.",
        },
        projects:
          "Resume and deals you follow are probed. Be ready to give opinions on recent transactions, not just describe them.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Class sizes reported around 30 to 40 (unverified), so expect extremely competitive odds." },
        ],
        prep: [
          NET,
          "Practice answering technicals out loud, explaining effects when one input changes.",
          "Prepare a clear opinion on one or two recent deals.",
          "Practice mental math and structured brainteasers.",
          "Study Centerview's advisory-only model and notable mandates.",
          "Start early; do not wait for a posted deadline.",
        ],
      }),
    ],
    sources: [
      { label: "Exponent: Centerview IB summer analyst interview", url: "https://www.tryexponent.com/guides/centerview-partners-investment-banking-summer-analyst-interview" },
      { label: "Wall Street Oasis: Centerview IB analyst interview", url: "https://www.wallstreetoasis.com/company/centerview-partners/interview/investment-banking-analyst" },
      { label: "GetSmartResume: Centerview summer analyst guide", url: "https://www.getsmartresume.com/article/centerview-summer-analyst" },
      { label: "Intervyo: Centerview assessment centre", url: "https://www.intervyo.co.uk/firms/centerview/assessment-centre" },
      { label: "Superday AI: Centerview", url: "https://www.superdayai.com/banks/centerview" },
    ],
  },
  {
    companyId: "perella-weinberg",
    summary:
      "Perella Weinberg Partners (PWP) runs a fast, demanding process: an application and recruiter or banker screen, sometimes a first round, then an in-person superday. Reports stress mental math, brainteasers and deeper-than-standard technicals; PWP also has a restructuring practice.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst (advisory and restructuring)",
        stages: [
          { name: "Events and application", format: "Recruiting webinars, then portal application", what: "PWP lists the global summer analyst role opening around October for the following cycle plus a prep program for younger students." },
          { name: "Online assessment (some regions)", format: "Verbal and numerical test", what: "Reported for some US and European candidates." },
          { name: "Recruiter or banker screen", format: "15 to 45 min call", what: "Fit, markets, core technicals; the first contact may be an external recruiter." },
          { name: "First round (not always)", format: "About an hour", what: "Motivation and technicals; one candidate called it not very technical." },
          { name: "Superday", format: "4 to 8 interviews of 30 to 45 min, usually in New York", what: "Technicals, mental math, brainteasers, deal discussion and fit; a partner may be included." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit and motivation alongside deal discussion; timing can be quick after the screen.",
          themes: ["Why PWP", "Why advisory", "Deal knowledge", "Composure under pressure"],
          examples: [
            "Why Perella Weinberg and not a larger bank?",
            "Walk me through a deal you have followed.",
            "How do you handle being asked something you do not know?",
            "What are you hoping to learn in your first two years?",
          ],
        },
        technical: {
          share: "Commonly reported as heavy, with unaided mental math",
          topics: ["Accounting and valuation", "Why a mechanism gives a result", "Mental math without a calculator", "Brainteasers", "Basic LBO and modeling", "Restructuring basics for RX"],
          style: "Spoken, no calculator or paper in some reports.",
        },
        projects:
          "Deal discussion is explicitly part of the process; know a transaction and its structure well.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Advisory and restructuring may be recruited separately; confirm for your office." },
        ],
        prep: [
          NET,
          "Practice mental division and multiplication of large numbers.",
          "Go beyond rote technicals; be ready to explain the why.",
          "Prepare brainteasers and market sizing.",
          "Know PWP's recent advisory work.",
          "Respond quickly to recruiter outreach since timelines are short.",
        ],
      }),
    ],
    sources: [
      { label: "Superday AI: Perella Weinberg superday", url: "https://www.superdayai.com/banks/perella-weinberg/superday" },
      { label: "Exponent: PWP IB summer analyst interview", url: "https://www.tryexponent.com/guides/perella-weinberg-investment-banking-summer-analyst-interview" },
      { label: "Wall Street Oasis: PWP phone interview", url: "https://www.wallstreetoasis.com/forum/investment-banking/perella-weinberg-phone-interview-summer-analyst" },
      { label: "Bentley Career Edge: PWP 2027 US Advisory Summer Analyst", url: "https://careeredge.bentley.edu/blog/2025/12/15/hot-opportunity-alert-perella-weinberg-2027-us-advisory-summer-analyst/" },
      { label: "GetSmartResume: PWP summer analyst guide", url: "https://www.getsmartresume.com/article/perella-weinberg-partners-summer-analyst" },
    ],
  },
  {
    companyId: "houlihan-lokey",
    summary:
      "Houlihan Lokey's early-careers pages describe a written application, a telephone interview with a recruiter or the business, then in-person interviews over one or more days, with feedback for anyone reaching that stage. Those pages are strongest for Europe; the US interview technicals, live case and accounting test come from candidate reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst (corporate finance, financial restructuring)",
        stages: [
          { name: "Networking and application", format: "Campus portal application by segment", what: "Interns are placed in one of three segments; the internship is the main full-time pipeline per a guide." },
          { name: "Telephone interview", format: "HL says a recruiter or member of the business calls successful applicants; candidates report about 30 min with a VP or associate", what: "Basic technicals and interest in the segment." },
          { name: "First round", format: "30 to 45 min video", what: "DCF, accretion/dilution, LBO intuition; restructuring candidates get waterfall-style questions." },
          { name: "In-person interviews / superday", format: "HL says a series of office interviews over one or several days; candidates report 4 to 8 interviews of ~30 min, some two-on-one", what: "Technicals, fit, brainteasers; candidates report a possible case study, accounting test and team event." },
          { name: "Offer", format: "Call", what: "Candidates report 1 to 3 weeks end to end." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit questions probe why Houlihan Lokey, why the segment and why the office.",
          themes: ["Why Houlihan versus bulge bracket", "Why restructuring", "Interest in distressed work", "Why this office"],
          examples: [
            "Why Houlihan Lokey and why this segment?",
            "Why restructuring rather than M&A?",
            "Tell me about a time you worked with limited guidance.",
            "What is your view on the current credit environment?",
          ],
        },
        technical: {
          share: "Majority of interviews, especially for restructuring",
          topics: ["DCF and WACC", "Accounting", "Recovery waterfall", "Chapter 7 vs Chapter 11", "Structural subordination", "PIK interest and liability management", "Distressed valuation"],
          style: "Verbal, sometimes a short written modeling or accounting test and a mini case.",
        },
        projects:
          "Resume is discussed but technical preparation dominates; expect to discuss a distressed situation or deal if applying to RX.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Corporate Finance, Financial Restructuring and Financial and Valuation Advisory recruit separately. HL says it uses its summer internship to assess talent, and strong interns may return for full-time analyst training in New York." },
        ],
        prep: [
          NET,
          "For RX, learn recovery waterfalls and Chapter 11 thoroughly.",
          "Practice quick three-statement projections and a simple DCF.",
          "Prepare why Houlihan with reference to its segments.",
          "Expect a possible written test or case at the superday, per candidate reports.",
          "Tailor your written application to HL; its pages say distinct individuals stand out.",
          "Follow a distressed credit story in the news.",
        ],
      }),
    ],
    sources: [
      { label: "Houlihan Lokey: early careers", url: "https://hl.com/careers/early-careers/" },
      { label: "Houlihan Lokey: how to apply", url: "https://hl.com/careers/early-careers/how-to-apply/" },
      { label: "Superday AI: Houlihan Lokey superday", url: "https://www.superdayai.com/banks/houlihan-lokey/superday" },
      { label: "Wall Street Oasis: Houlihan Lokey restructuring interview", url: "https://www.wallstreetoasis.com/company/houlihan-lokey/interview/houlihan-lokey-restructuring" },
      { label: "Road to Offer: Houlihan Lokey interview questions", url: "https://www.roadtooffer.com/blog/houlihan-lokey-interview-questions" },
      { label: "Finbound: Houlihan Lokey internship guide", url: "https://www.finbound.org/blog/houlihan-lokey-summer-internship-application-guide" },
      { label: "Wall Street Oasis: HL restructuring summer analyst", url: "https://www.wallstreetoasis.com/company/houlihan-lokey/interview/restructuring-summer-analyst-7" },
    ],
  },
  {
    companyId: "rothschild",
    summary:
      "Rothschild and Co's careers site describes a first-round interview on your experiences and motivation (online or in person), then an assessment centre with a senior interview, a group exercise and a case study. The summer analyst programme is a common route, with classroom training in accounting, valuation and modelling. That page is dated, and UK written and online steps come from third parties.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst (global advisory, M&A and restructuring)",
        stages: [
          { name: "Application", format: "CV plus written motivation questions (UK)", what: "Why Rothschild, why banking, what an analyst does." },
          { name: "Online assessment", format: "Situational judgment and basic numerical", what: "Reported for London internships; other tests mentioned." },
          { name: "Group exercise (London)", format: "Online ~45 min group of four", what: "Commercial awareness and teamwork." },
          { name: "First-round interview", format: "Rothschild says online or in person at an office", what: "Experiences, skills and motivation; candidates report accounting, valuation, recent deals and market views." },
          { name: "Assessment centre", format: "Rothschild describes a senior-colleague interview, a collaborative group exercise and a case study; candidates report about 4 to 5 interviews", what: "Tests analytical thinking, communication and teamwork. Third parties report MDs and VPs and a 3 week to 2 month process." },
        ],
        behavioral: {
          star: "helpful",
          style: "Firm-specific motivation weighs heavily; behavioral questions cover ownership, influence and conflict.",
          themes: ["Why Rothschild", "Why this division", "Ownership", "Conflict handling", "Differentiation from peers"],
          examples: [
            "Why Rothschild rather than Lazard or a bulge bracket?",
            "Tell me about a time you influenced a group.",
            "Why this sector or division?",
            "Describe a conflict in a team and what you did.",
          ],
        },
        technical: {
          share: "About a third to half",
          topics: ["Enterprise vs equity value", "DCF, comps, precedents", "Accounting", "Brainteasers", "Market and deal knowledge"],
          style: "Verbal; market-knowledge round is separate from technicals per one guide.",
        },
        projects:
          "Be ready on recent deals and your interest in a sector, and on your written application answers.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Process differs between London/Paris and New York; the UK has more written and online stages. The firm advises knowing high-profile deals in the news, including ones it works on, and a ready why-Rothschild answer." },
        ],
        prep: [
          NET,
          "Draft strong written motivation answers if applying in the UK.",
          "Prepare a comparative why-Rothschild versus peers.",
          "Follow recent market news and a sector you can discuss.",
          "Practice DCF and valuation walk-throughs.",
          "Prepare for online situational and numerical tests, a group exercise and a case study.",
          "Prepare varied examples of skills, including from outside academics, as the firm recommends.",
        ],
      }),
    ],
    sources: [
      { label: "Rothschild & Co: graduates", url: "https://www.rothschildandco.com/en/careers/students-and-graduates/graduates/" },
      { label: "Rothschild & Co: internships", url: "https://www.rothschildandco.com/en/careers/students-and-graduates/internships/" },
      { label: "JobMentis: Rothschild interview", url: "https://www.jobmentis.com/en/interviews/rothschild" },
      { label: "PrepLounge: Rothschild & Co", url: "https://www.preplounge.com/en/blog/finance/investment-banking/firms/rothschild-co" },
      { label: "Wall Street Oasis: Rothschild interview questions", url: "https://www.wallstreetoasis.com/company/rothschild/interview" },
      { label: "GetSmartResume: Rothschild classic M&A analyst", url: "https://www.getsmartresume.com/article/rothschild-classic-ma-analyst" },
      { label: "Superday AI: Rothschild", url: "https://www.superdayai.com/banks/rothschild" },
    ],
  },
  {
    companyId: "william-blair",
    summary:
      "William Blair's site describes a nine-week summer analyst program for students entering their final year, run in several offices, with rolling application review and placement directly into a sector or solutions group. Its applicant guidance names DCF, valuation methods and the three statements as the minimum. Interview rounds are known only from a few older candidate reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst",
        stages: [
          { name: "Networking and application", format: "Campus recruiting application", what: "William Blair says the nine-week program (June start) is for students entering their final year, applications are reviewed on a rolling basis, schools it does not visit are still considered, and success can lead to a full-time offer. Offices include Atlanta, Boston, Charlotte, Chicago, London, Los Angeles, New York and San Francisco." },
          { name: "Recruiter screen (reported)", format: "About 30 min call per candidate reports", what: "Mostly behavioral; not described on the firm's pages." },
          { name: "First round", format: "Phone or Zoom with an analyst or associate", what: "Motivation and basic technicals." },
          { name: "Superday", format: "Several interviews in the office, up to 8 in older reports", what: "Fit and technicals with the team; London candidates mention a case study." },
          { name: "Offer", format: "Call", what: "Timing commonly reported as varying by office." },
        ],
        behavioral: {
          star: "helpful",
          style: "Fit-heavy with standard motivation and teamwork questions.",
          themes: ["Why William Blair", "Why banking", "Why this sector", "Teamwork and deadlines"],
          examples: [
            "Why William Blair?",
            "Why investment banking and this sector?",
            "Tell me about handling pressure and deadlines.",
            "Which companies or deals have you been following?",
          ],
        },
        technical: {
          share: "Light to moderate, varies by report",
          topics: ["Net working capital", "Depreciation across statements", "Valuation methods", "DCF and LBO", "Paper LBO (some reports)"],
          style: "Verbal; difficulty reported as ranging from basic to demanding.",
        },
        projects:
          "Expect questions on market trends and companies or transactions you follow.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "The firm says analysts go straight into a sector, channel or solutions group rather than a generalist pool; in Chicago a placement process runs in the months before the internship, so group interest matters." },
          { roleId: "equity-research", notes: "William Blair is also known for equity research, which recruits separately from banking." },
        ],
        prep: [
          NET,
          "Study DCF, valuation methods and the three statements, which the firm names as the minimum, plus LBO basics.",
          "Prepare a concise personal pitch and questions for interviewers, as the firm recommends.",
          "Have a specific why-William Blair tied to its sectors and platform.",
          "Follow deals in two sectors.",
          "Verify the current rounds with the campus recruiting team, since interview format is not published.",
        ],
      }),
    ],
    sources: [
      { label: "William Blair: investment banking programs", url: "https://www.williamblair.com/investment-banking-careers/programs/" },
      { label: "William Blair: what applicants need to know", url: "https://www.williamblair.com/Careers/Campus-Recruiting/Investment-Banking/What-Applicants-Need-to-Know.aspx" },
      { label: "William Blair: campus recruiting IB", url: "https://www.williamblair.com/Careers/Campus-Recruiting/Investment-Banking" },
      { label: "Glassdoor: William Blair interview report", url: "https://image4.glassdoor.co.in/Interview/William-Blair-Interview-E4537-RVW78188565.htm" },
      { label: "Dataford: William Blair financial analyst experiences", url: "https://dataford.io/interview-guides/william-blair/financial-analyst/experiences" },
    ],
  },
  {
    companyId: "baird",
    summary:
      "Baird is a Milwaukee-founded employee-owned middle-market advisory firm. Its careers site gives a dated US undergraduate calendar: sophomore networking, applications open about two weeks in late December, phone or campus interviews in January-February, and Super Days in late February. Question content comes from a few anonymous Glassdoor reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      ib({
        label: "Investment banking analyst",
        stages: [
          { name: "Networking and application", format: "Baird says sophomores often start conversations with bankers in Q4; applications open in late December for about two weeks via BairdCareers.com or Handshake", what: "Targets sophomores for a summer internship after junior year; MBA associate internship recruiting runs earlier (September application)." },
          { name: "Phone or campus interview", format: "Baird says phone and/or campus interviews run in January-February; one report describes recorded answers to prepared questions", what: "Screens fit and basic knowledge." },
          { name: "First round", format: "About 30 min", what: "Behavioral with a VP or a split of technical and behavioral." },
          { name: "Super Day", format: "Baird says late February with 1-2 weeks notice; candidate reports describe 4 to 5 interviews of ~30 min, some two-on-one", what: "Associates, VPs, directors and an MD; some LBO-heavy per reports. Baird cites about 45 percent intern conversion on an older page, with no guarantee." },
          { name: "Other steps", format: "Personality test or writing exercise", what: "Reported occasionally." },
        ],
        behavioral: {
          star: "helpful",
          style: "Standard motivation questions with extra attention to understanding the lifestyle and hours.",
          themes: ["Why banking", "Why Baird", "Understanding of hours", "Teamwork"],
          examples: [
            "Tell me about yourself.",
            "Why Baird?",
            "Do you understand the hours of this job and why you still want it?",
            "Why this sector or office?",
          ],
        },
        technical: {
          share: "Commonly reported as roughly half in the first round; varies",
          topics: ["DCF", "LBO walk-through", "Free cash flow", "Three statements", "Relative valuation", "Sell-side M&A process"],
          style: "Verbal walk-throughs.",
        },
        projects:
          "Expect to explain sell-side process knowledge and any deal or transaction experience.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Middle-market focus; sector and office fit matter. London and Frankfurt differ: London finalists get a Super Day with a case study and junior-banker time." },
          { roleId: "private-equity", notes: "Baird has a private equity arm but it is a separate process; this guide covers banking." },
        ],
        prep: [
          NET,
          "Know DCF and LBO well enough to walk through quickly.",
          "Be able to describe a sell-side M&A process step by step.",
          "Have a real reason for choosing Baird and its region.",
          "Prepare a straight answer on hours and lifestyle.",
          "Start networking in your sophomore fall and watch for the late-December application window.",
          "Confirm the current dates and format with your campus contact since Baird's page may be dated.",
        ],
      }),
    ],
    sources: [
      { label: "Baird careers: Global Investment Banking intern program (US)", url: "https://www.bairdcareers.com/internships/global-investment-banking-intern-program-us/" },
      { label: "Baird careers: how we hire", url: "https://www.bairdcareers.com/how-we-hire/" },
      { label: "Glassdoor: Baird interview report 1", url: "https://www.glassdoor.co.uk/Interview/Baird-Interview-E19350-RVW54480449.htm" },
      { label: "Glassdoor: Baird interview report 2", url: "https://www.glassdoor.co.uk/Interview/Baird-Interview-E19350-RVW95262989.htm" },
      { label: "Glassdoor: Baird interview report 3", url: "https://www.glassdoor.ca/Interview/Baird-Interview-E19350-RVW79375003.htm" },
    ],
  },
  {
    companyId: "guggenheim",
    summary:
      "Guggenheim Securities posts summer analyst roles by group and city. Its own pages describe a sophomore FOCUS program that makes participants eligible for a job interview the following summer, and a restructuring group building a dedicated recruiting track. The screen-then-superday structure comes from third-party guides and varies by office and year.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      ib({
        label: "Investment banking analyst",
        stages: [
          { name: "Networking and application", format: "Postings by group and city, rolling review", what: "One guide says roles post around January with deadlines varying by posting." },
          { name: "Written assessment (some offices)", format: "Online", what: "Reported for Chicago." },
          { name: "Phone screen (reported)", format: "10 to 30 min with recruiter, associate or MD per third-party guides", what: "Tell me about yourself plus finance technicals." },
          { name: "Superday", format: "3 to 5 back-to-back ~30 min one-on-ones", what: "Mix of behavioral and technical; occasionally a reception the night before." },
          { name: "Offer", format: "Call", what: "Sources do not give reliable timelines." },
        ],
        behavioral: {
          star: "helpful",
          style: "Some superdays are fully behavioral; others include rapid-fire questions about deals and why banking.",
          themes: ["Why Guggenheim", "Why banking", "Resume walk-through", "Market views"],
          examples: [
            "Walk me through your resume.",
            "Why Guggenheim and this city or group?",
            "Which two companies might merge and why?",
            "What makes you a good fit for a small deal team?",
          ],
        },
        technical: {
          share: "Varies from none to most of the superday",
          topics: ["Three statement linkages", "Simple valuation", "DCF", "M&A rationale"],
          style: "Verbal.",
        },
        projects:
          "Resume walk-through is expected. Tie your why-Guggenheim answer to a specific hub or product.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Process runs separately by group and city. Guggenheim runs a sophomore FOCUS program and early events whose participants are eligible for a summer interview; its restructuring group is launching a separate recruiting track for analysts and associates." },
        ],
        prep: [
          NET,
          "Rehearse a clean resume walk-through.",
          "Review three-statement linkages and simple valuation.",
          "Prepare a specific why-Guggenheim answer.",
          "Practice quick deal-idea questions.",
          "Check the exact posting for your group and city, and ask about the FOCUS program if you are a sophomore.",
        ],
      }),
    ],
    sources: [
      { label: "Guggenheim: investment banking sophomore FOCUS program", url: "https://guggenheimpartners.com/firm/diversity-and-inclusion/investment-banking-sophomore-focus" },
      { label: "Exponent: Guggenheim IB summer analyst interview", url: "https://www.tryexponent.com/guides/guggenheim-securities-investment-banking-summer-analyst-interview" },
      { label: "Finbound: Guggenheim summer internship guide", url: "https://www.finbound.org/blog/guggenheim-summer-internship-application-guide" },
      { label: "Wall Street Oasis: Guggenheim IB summer analyst", url: "https://www.wallstreetoasis.com/company/guggenheim-partners/interview/investment-banking-summer-analyst-6" },
      { label: "Dataford: Guggenheim experiences", url: "https://dataford.io/interview-guides/guggenheim-partners/financial-analyst/experiences" },
    ],
  },
];
