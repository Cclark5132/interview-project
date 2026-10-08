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
      "Citi's early-careers site describes applying through a Citi-specific Workday account, a first one-on-one conversation about your background and goals, and a final stage that depends on program and location: several interviews, an assessment or a case study. Anything finer, such as superday length or technical depth, comes from candidate reports and varies by office.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Online application", format: "Workday application using a Citi-specific account; summer analyst roles reportedly open around September of the prior year", what: "Citi says summer programs target penultimate-year students and a full-time analyst posting listed a 3.3 GPA minimum. Early ID programs give an expedited interview path." },
          { name: "Video screen (reported)", format: "Timed recorded responses reported by candidates", what: "Not described on Citi's pages I saw; check your invitation." },
          { name: "First-round interview", format: "One-on-one conversation (candidates report 30-45 minutes with an analyst, associate or VP)", what: "Citi says this explores your background and whether your goals fit Citi; candidates report a behavioral and technical mix." },
          { name: "Final stage", format: "Citi says multiple interviews, an assessment or a case study depending on program and location; candidate reports range from three Zoom rooms to five or six interviews", what: "Interviewers from VP to MD level; one candidate described rotations of technical, leadership and behavioral segments." },
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
        roleNotes: [
          { roleId: "ib-analyst", notes: "Citi's recruiters advise reading financial press regularly, testing your video setup, bringing a notebook and being yourself rather than guessing what assessors want." },
        ],
        prep: [
          "Apply as early as possible through the Citi-specific Workday account.",
          "Ask current analysts or seniors about the final-round format for your office.",
          "Learn Citi's global footprint and where its banking franchise is strongest.",
          "Prepare behavioral stories for leadership and teamwork.",
          "Review accounting and valuation basics.",
        ],
      },
    ],
    sources: [
      { label: "Citi early careers", url: "https://jobs.citi.com/early-careers" },
      { label: "Citi: interview advice and tips", url: "https://careers.citigroup.com/students-and-graduates/interview-advice.html" },
      { label: "Exponent: Citigroup IB summer analyst interview", url: "https://www.tryexponent.com/guides/citigroup-investment-banking-summer-analyst-interview" },
      { label: "Glassdoor: Citi interview review", url: "https://clear.glassdoor.nl/Interview/Citi-Interview-E8843-RVW3668517.htm" },
      { label: "Glassdoor: Citi interview review (2)", url: "https://www.glassdoor.ca/Interview/Citi-Interview-E8843-RVW596194.htm" },
    ],
  },
  {
    companyId: "bank-of-america",
    // stages 2-4 follow BofA's student application-process page
    summary:
      "Bank of America's student site says most applications have two parts, a resume with competency questions and a HireVue video interview, both due by the deadline, reviewed on a rolling basis. First and second rounds run by phone, on campus or in an office, then a business-area final round, sometimes with a group or presentation element. The 'superday' label and finer details are candidate-reported.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Networking", format: "Coffee chats and events", what: "One guide says bankers log conversations with notes, so chats can influence screening." },
          { name: "Application and HireVue", format: "Resume with competency questions plus an on-demand HireVue video, both required by the deadline; BofA offers a practice question first", what: "Behavioral and motivation, including why BofA. Assessment often starts before the deadline, so apply early." },
          { name: "First and second rounds", format: "BofA says these happen by phone, on campus or at an office, and some programs use on-demand video early; candidates report a live filter round at some schools", what: "Conducted by HR, business managers and possibly peers; not universal." },
          { name: "Final round (superday)", format: "BofA describes a business-area round, typically competency-based, sometimes with a group or presentation exercise; candidates report 2-5 interviews of 30-45 minutes", what: "Conversational but rigorous on technicals, plus fit. Format varies by business." },
          { name: "Decision", format: "BofA says to expect word in about two to four weeks depending on role and applicant volume", what: "Rolling; candidates report most offers early in the cycle." },
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
          "Practice HireVue answers on camera in a well-lit, quiet room, and use the practice question.",
          "Only use BofA's approved interview platforms (HireVue, Teams, Webex, Zoom) as a scam check.",
        ],
      },
    ],
    sources: [
      { label: "Bank of America: student application process", url: "https://careers.bankofamerica.com/en-us/students/application-process" },
      { label: "Bank of America campus: joining the team", url: "https://campus.bankofamerica.com/content/bamlcampus/en/our-process.html" },
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
      "Barclays' early-careers page describes three steps: a rolling application (one full-time or internship application per year globally), online assessments to finish within about five days, then an assessment centre of two or three stages including a motivational interview with a leader. Analyst-level interviews are scored on three to five competencies disclosed beforehand. Specific technicals come from candidate reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Application", format: "Rolling, first come first served; only your first application in a year is considered", what: "Barclays says applying early helps and that all schools are assessed against the same criteria." },
          { name: "Online assessments", format: "Barclays suggests about 60 minutes and a five-calendar-day window, doable on a phone; practice tests available", what: "Candidate reports describe numerical, logical and situational tests; one described a test heavy in corporate finance. Failing reportedly ends the process." },
          { name: "Video interview (reported)", format: "Candidates report 5-7 questions with about a minute of prep and one attempt", what: "Reportedly scored against firm values; not always required for banking." },
          { name: "Assessment centre / superday", format: "Barclays says in person or virtual, two or three stages including a motivational interview with leadership; candidates report three or four 30-minute interviews", what: "Barclays says analyst-level candidates are assessed on 3-5 competencies announced beforehand, with part of the interview on role-specific skills. Candidates report DCF, LBO and stock-pitch questions." },
          { name: "Offer", format: "Reported within days to a few days after a good final round", what: "Overall process length from weeks to a couple of months, per candidates." },
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
          "Check whether your program requires the online test or video, and finish within the five-day window.",
          "Read Barclays' analyst competency framework and map a story to each competency listed for your interview.",
          "Back examples with evidence; Barclays advises avoiding clichés and unprovable claims.",
          "Practice timed video answers.",
          "Prepare a stock pitch and a conceptual DCF/LBO walkthrough.",
          "Network with Barclays bankers to refine your group interest.",
        ],
      },
    ],
    sources: [
      { label: "Barclays: early careers application process", url: "https://search.jobs.barclays/internship-graduate-application" },
      { label: "Barclays: hints and tips", url: "https://search.jobs.barclays/hints-and-tips" },
      { label: "Barclays: analyst competency framework (PDF)", url: "https://home.barclays/content/dam/home-barclays/documents/careers/preparing-to-apply/Candidate-Competency-Guide-BA1-BA4.pdf" },
      { label: "Wall Street Oasis: Barclays IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/barclays/interview/investment-banking-summer-analyst" },
      { label: "Wall Street Oasis: Barclays IB analyst FT interview", url: "https://www.wallstreetoasis.com/company/barclays-capital/interview/investment-banking-analyst-ft" },
      { label: "Intervyo: Barclays HireVue guide", url: "https://www.intervyo.co.uk/firms/barclays/hirevue" },
      { label: "The Interview Guys: Barclays HireVue questions", url: "https://blog.theinterviewguys.com/?p=18779" },
    ],
  },
  {
    companyId: "ubs",
    summary:
      "UBS's own pages describe CV-based rolling applications, online assessments (verbal, numerical, inductive and a Culture Match, due within seven days, no retakes), a pre-recorded video interview with no retakes, then final interviews with a future line manager and peers or senior leaders. Question content and superday length are only known from candidate reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Application", format: "CV (usually no cover letter), reviewed on a rolling basis; US Graduate Talent Program allows at most three applications per academic year", what: "Show interests, achievements and experience; UBS recommends applying early." },
          { name: "Online assessments", format: "Verbal, numerical and inductive reasoning plus UBS Culture Match depending on business area; seven days to finish, no retakes", what: "Must be done independently; UBS bars AI help on assessments and video answers." },
          { name: "Pre-recorded video interview", format: "UBS says you may get a link after passing assessments; no retakes. Candidate reports describe five to eight timed questions", what: "Mainly behavioral with occasional market questions. UBS's page does not name the vendor." },
          { name: "First-round call (reported)", format: "Candidates report about 40 minutes by phone", what: "Fit, why IB, basic technicals such as a DCF walk-through or comps; not described by UBS." },
          { name: "Final interviews", format: "UBS says virtual or in person with your future line manager and possibly peers or senior leaders; candidate reports range from three 20-minute to six 30-minute interviews", what: "Mix varies from mostly behavioral to mostly technical; MDs often ask market questions." },
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
          "Learn UBS's core competencies and tell experiences as stories with examples, as UBS advises; use its practice assessments first.",
          "Practice the video interview with a timer; there are no retakes.",
          "Review standard DCF and comps questions.",
          "Form views on current markets.",
        ],
      },
    ],
    sources: [
      { label: "UBS: how we hire", url: "https://www.ubs.com/global/en/careers/how-we-hire.html" },
      { label: "UBS: Graduate Talent Program", url: "https://www.ubs.com/global/en/careers/early-careers/graduate-talent-program.html" },
      { label: "UBS: early careers FAQ", url: "https://www.ubs.com/global/en/careers/early-careers/faq.html" },
      { label: "Wall Street Oasis: UBS IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/ubs/interview/investment-banking-summer-analyst" },
      { label: "Wall Street Oasis: UBS IB summer analyst (2)", url: "https://www.wallstreetoasis.com/company/ubs-ag/interview/investment-banking-summer-analyst-41" },
      { label: "Final Round AI: UBS interview process", url: "https://www.finalroundai.com/blog/ubs-interview-process" },
      { label: "Glassdoor: UBS interview review", url: "https://www.glassdoor.com.hk/Interview/UBS-Interview-E3419-RVW8609707.htm" },
    ],
  },
  {
    companyId: "deutsche-bank",
    summary:
      "Deutsche Bank's own early-careers site lays out one structure for internships and graduate roles: a short application, online assessments, a virtual interview, a final assessment centre or super day, then an outcome. Details such as the pre-recorded video versus a live virtual interview depend on region and division.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Research and application", format: "Short online form with a CV; DB advises applying to a single role in one country", what: "You pick one division after researching how the bank is organised. Eligibility (for example penultimate-year students for internships) is checked first." },
          { name: "Online assessments", format: "Situational judgement, behavioural questionnaire and ability tests, with roughly four days to finish each set", what: "DB recommends using the practice tests first. These tests act as a filter before any human interview." },
          { name: "Virtual interview", format: "Pre-recorded video in the UK, Germany and APAC; elsewhere it may be a live virtual meeting with the hiring division", what: "You explain your motivation and the skills you would bring. DB states about six weeks can pass between applying and being invited." },
          { name: "Assessment centre or super day", format: "Usually a full day, typically in person; the invitation email gives details", what: "DB describes competency assessments, case studies and a technical interview. One London candidate report mentions three 45-minute interviews on competency, a case and technicals." },
          { name: "Outcome", format: "DB says it calls with the result within about a week, gives feedback, and allows two weeks to decide", what: "Early insight programmes can give early access to the internship process." },
        ],
        behavioral: {
          star: "helpful",
          style: "The video interview and competency interviews centre on motivation and examples of skills. DB points to its stated values and competencies, so structured stories fit well.",
          themes: ["Why Deutsche Bank", "Why this division", "Competency examples", "Market awareness"],
          examples: [
            "Why investment banking and why Deutsche Bank?",
            "Tell me about a time you worked in a team toward a deadline.",
            "How are banks doing at the moment?",
            "Why this division rather than another one at DB?",
          ],
        },
        technical: {
          share: "Moderate; a technical interview plus a case study at the final stage",
          topics: ["DCF and WACC", "CAPM", "Valuation limits for banks", "Rates impact on DCF", "Case-study reasoning"],
          style: "Verbal technical interview plus a case at the assessment centre. A third-party guide notes interviewers like to probe where a method breaks down.",
        },
        projects: "Expect resume and motivation discussion; the case study tests structured thinking more than prior projects.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "The official process applies across divisions; confirm the exact assessments and video format for your region and division in the job description." },
        ],
        prep: [
          "Apply to one role only and confirm the stages for your region on the DB early-careers FAQ.",
          "Do the practice online tests before opening the real ones, and set aside quiet time inside the window.",
          "Prepare strong why-IB and why-DB answers tied to a division.",
          "Know when a DCF or EV/EBITDA fails, such as for banks, and practise a short case out loud.",
          "Follow banking sector news.",
        ],
      },
    ],
    sources: [
      { label: "Deutsche Bank early careers: your application", url: "https://careers.db.com/students-graduates/your-application/" },
      { label: "Deutsche Bank early careers: FAQ", url: "https://careers.db.com/students-graduates/your-application/faq/" },
      { label: "Deutsche Bank early careers: students and graduates", url: "https://careers.db.com/students-graduates/" },
      { label: "Exponent: Deutsche Bank IB summer analyst interview", url: "https://www.tryexponent.com/guides/deutsche-bank-investment-banking-summer-analyst-interview" },
      { label: "Glassdoor: Deutsche Bank interview review", url: "https://static.glassdoor.at/Interview/Deutsche-Bank-Interview-E3150-RVW6019091.htm" },
    ],
  },
  {
    companyId: "rbc-capital-markets",
    summary:
      "RBC Capital Markets' careers pages describe an online application, in some cases three online assessments, a roughly 30-minute first-round interview, then a final round in the office or virtually. Insight programmes can fast-track you. Public detail on the final round is thin, so rely on your invitation and campus contacts.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Application", format: "Online resume (sometimes with a cover letter combined in one PDF)", what: "Screened for fit with the program, office and group; qualified applicants may be contacted to review the resume in more detail." },
          { name: "Online assessments", format: "Three online assessments for some roles; UK Spring Insight route uses psychometric tests and a phone interview", what: "A filter before a first interview; not required for every program." },
          { name: "First-round interview", format: "About 30 minutes by phone, video or in person", what: "RBC says this covers technical ability, interpersonal skills, long-term potential and cultural fit." },
          { name: "Final round", format: "Back to the office or a virtual meeting for final assessments", what: "RBC's materials do not spell out the format. An older RBC-published piece refers to a 'Super Day'; one older candidate report described a valuation case, a behavioral and a technical interview." },
        ],
        behavioral: {
          star: "helpful",
          style: "First-round and final conversations weigh motivation and culture fit alongside technical ability.",
          themes: ["Why RBC", "Why this group or city", "Why IB", "Interpersonal skills"],
          examples: [
            "Why RBC and this role?",
            "Why this city or sector team?",
            "Why investment banking?",
          ],
        },
        technical: {
          share: "Unclear; a share of the first round and final round",
          topics: ["DCF", "M&A", "LBO", "Comps", "Valuation case study"],
          style: "Conversation plus a possible valuation case; official sources give no format, so treat the case as a possibility.",
        },
        projects: "Expect resume questions; prepare a sector view tied to the group.",
        roleNotes: [
          { roleId: "ib-analyst", notes: "Recruiting is by program and office (for example Capital Markets programs in New York or Canada's analyst program with virtual first and in-person final rounds)." },
        ],
        prep: [
          "Read the specific program page and posting for your office; processes differ by country.",
          "Know basic DCF, comps, M&A and LBO.",
          "Prepare a clear why-RBC and why-group answer.",
          "Consider RBC's insight or advisory programs, which can fast-track you into the interview stage.",
          "Network with RBC bankers and alumni.",
        ],
      },
    ],
    sources: [
      { label: "RBC Capital Markets: Discovery Day and Spring Insight programs", url: "https://www.rbccm.com/en/careers/discoveryprograms" },
      { label: "RBC Capital Markets: full-time careers", url: "https://www.rbccm.com/en/careers/full-time" },
      { label: "RBC jobs: RBC Analyst Program (Canada)", url: "https://jobs.rbc.com/ca/en/rbc-analyst-program" },
      { label: "Wall Street Oasis: RBC IB summer analyst interview", url: "https://www.wallstreetoasis.com/company/rbc-capital-markets/interview/investment-banking-summer-analyst" },
    ],
  },
  {
    companyId: "wells-fargo",
    summary:
      "Wells Fargo's careers site gives only a generic four-step process (apply, review, interview, offer) and says interviews vary by group, with behavioral questions prepared using a situation-behavior-outcome method. The recorded-interview-then-superday pattern, with two technical rounds and one behavioral, comes from candidate reports and prep sites, not the firm.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "investment-banking",
        label: "Investment banking analyst",
        stages: [
          { name: "Recorded interview (reported)", format: "Candidates report a recorded behavioral round of about 4-7 questions with a deadline", what: "Reported as a major cut; not described on Wells Fargo's own pages." },
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
          "Prepare behavioral answers using Wells Fargo's own situation-behavior-outcome structure, and prepare questions to ask.",
          "Prepare a strong recorded interview if your invitation includes one.",
          "Be ready to build a basic DCF on paper.",
          "Know Wells Fargo's corporate and investment banking platform.",
          "Check for summit or early programs.",
        ],
      },
    ],
    sources: [
      { label: "Wells Fargo: our hiring process", url: "https://www.wellsfargojobs.com/en/life-at-wells-fargo/our-hiring-process/" },
      { label: "Wells Fargo: prepare for a behavioral-based interview", url: "https://www.wellsfargojobs.com/en/resources/behavioral-based-interview/" },
      { label: "Wells Fargo: early careers", url: "https://www.wellsfargojobs.com/en/early-careers/" },
      { label: "Exponent: Wells Fargo IB summer analyst interview", url: "https://www.tryexponent.com/guides/wells-fargo-investment-banking-summer-analyst-interview" },
      { label: "SuperdayAI: Wells Fargo superday", url: "https://www.superdayai.com/banks/wells-fargo/superday" },
      { label: "PrepLounge: Wells Fargo interview", url: "https://www.preplounge.com/en/articles/interview-wells-fargo" },
      { label: "Glassdoor: Wells Fargo interview review", url: "https://static.glassdoor.com.mx/Interview/Wells-Fargo-Interview-E8876-RVW98736217.htm" },
    ],
  },
];
