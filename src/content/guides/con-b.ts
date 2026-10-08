import type { CompanyGuide } from "./types";

// Compiled from public prep sites and anonymous candidate reports; no firm publishes a full interview spec.
export const conB: CompanyGuide[] = [
  {
    companyId: "kearney",
    summary:
      "Kearney is commonly described as running two interview rounds with two to three conversations each, mixing case and fit. Cases are reported to lean operational, and business analyst candidates in some offices report a written or Excel and slides exercise. Details vary by office and year.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / consultant",
        stages: [
          { name: "Application and resume screen", format: "Online application, often via campus recruiting", what: "Resume shortlisting is selective; one report describes several hundred applicants cut to a few dozen for interviews." },
          { name: "First-round interviews", format: "Commonly two interviews of about an hour, on video or in person", what: "Each typically opens with 10 to 15 minutes of fit and motivation, then a case of about 30 minutes, with time for your questions." },
          { name: "Written or analytical case (some offices)", format: "Roughly 90 minutes including preparation, then a short presentation", what: "Some reports describe analysing data in Excel and building slides, then presenting findings to an interviewer." },
          { name: "Final round with partners and directors", format: "Two to three interviews, fit plus case", what: "Senior interviewers test judgement, communication and whether they would want you on their team." },
          { name: "Offer", format: "Recruiter call", what: "Reported timelines range widely, from about one week to several weeks depending on office and cycle." },
        ],
        behavioral: {
          star: "expected",
          style:
            "Fit is built into every round and can even come mid-case. Prep sites say Kearney weights it substantially, with an emphasis on humility, collaboration and drive, and the firm's stated values.",
          themes: ["Why consulting and why Kearney", "Teamwork and humility", "Handling uncertainty", "Initiative and grit", "Client or stakeholder influence"],
          examples: [
            "Why do you want consulting, and why this firm rather than a larger strategy brand?",
            "Describe a time you had to act without clear direction or complete information.",
            "Tell me about a disagreement in a team and how you moved forward.",
            "When did you go beyond your role to get a result?",
            "What would colleagues say is your biggest area for growth?",
          ],
        },
        technical: {
          share: "Roughly half or more of each interview, based on commonly reported formats",
          topics: ["Operations and cost cases", "Profitability and supply chain basics", "Chart and table interpretation", "Mental math", "Excel and slides (written case, some offices)"],
          style:
            "Largely interviewer-guided business cases with quantitative sections, plus a written exercise in some offices. Reports say operational understanding helps.",
        },
        projects:
          "Expect walk-throughs of leadership roles, internships and projects, mainly as raw material for fit answers. Prepare two or three stories you can reshape for several values and know the numbers behind your claims.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Business analyst reports mention case rounds plus, in some offices, a written case with Excel and slides. Confirm the exact format with your recruiter." },
          { roleId: "strategy-associate", notes: "Associate-level candidates are reported to face the same case and fit mix, with more weight on structuring and a clear recommendation." },
        ],
        prep: [
          "Practise operational cases (cost reduction, supply chain, procurement) as well as profitability and market entry.",
          "Prepare a specific answer to why Kearney, drawing on its operations heritage and recent work.",
          "Get fast at charts and mental math; time yourself.",
          "Have four to five STAR stories mapped to humility, collaboration, boldness and resilience.",
          "If told about a written case, rehearse building a short Excel analysis and a three-slide summary against the clock.",
          "Ask your recruiter which office you are interviewing with and how its rounds are run.",
          "Practise moving between fit and case smoothly, since fit questions can appear mid-case.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Kearney interview report (written case, partner round)", url: "https://www.glassdoor.ca/Interview/Kearney-Interview-E13437-RVW3487729.htm" },
      { label: "Glassdoor: Kearney interview report", url: "https://www.glassdoor.co.in/Interview/Kearney-Interview-E13437-RVW764834.htm" },
      { label: "My Consulting Offer: Kearney interview guide", url: "https://www.myconsultingoffer.org/case-study-interview-prep/at-kearney-interview" },
      { label: "Hacking the Case Interview: Kearney behavioral interview", url: "https://www.hackingthecaseinterview.com/pages/kearney-behavioral-interview" },
      { label: "Strategycase: Kearney fit interview", url: "https://strategycase.com/kearney-fit-interview/" },
      { label: "IGotAnOffer: Kearney case interview", url: "https://app.igotanoffer.com/blogs/mckinsey-case-interview-blog/at-kearney-case-interview" },
    ],
  },
  {
    companyId: "roland-berger",
    summary:
      "Roland Berger is a European-headquartered strategy firm. Prep sources describe a resume screen, sometimes an online reasoning test, then roughly two case interviews and a fit interview, finishing with senior interviewers. Hiring is run office by office, so format and timing differ.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Consultant / strategy associate",
        stages: [
          { name: "Application and resume screen", format: "Online application with CV and cover letter", what: "Screening for academics, analytical track record and, per prep sites, a preference for international experience." },
          { name: "Online reasoning test (some candidates)", format: "Timed numerical and logical test", what: "Used by some offices to filter before interviews; not every candidate reports it." },
          { name: "First-round interviews", format: "Video or in person; commonly a fit interview plus a case", what: "Tests structuring, numeracy and personal fit with the firm." },
          { name: "Second-round interviews", format: "Often two interviews back-to-back with principals or partners", what: "More cases plus fit, sometimes a written or group presentation depending on the office." },
          { name: "Offer", format: "Call from recruiting", what: "Prep sources put the whole process at around six to eight weeks, though individual reports vary." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "A dedicated fit or personality interview is commonly reported, with fit threaded through the case rounds too. Sources list entrepreneurial thinking, analytical strength, empathy and teamwork as what the firm looks for.",
          themes: ["Why Roland Berger and why consulting", "Entrepreneurial initiative", "Teamwork and empathy", "International or cross-cultural experience", "Motivation for your target office"],
          examples: [
            "Why strategy consulting, and why a European-rooted firm?",
            "Describe something you started or drove yourself.",
            "Tell me about working with people from a different culture or country.",
            "Give an example of leading a team through a disagreement.",
            "Which industries interest you, and why?",
          ],
        },
        technical: {
          share: "Most of the interview time, usually two case interviews in the process",
          topics: ["Profitability and growth", "Market entry and M&A", "Data-driven decisions with exhibits", "Market sizing", "Industry topics (financial services, automotive, industrials)"],
          style:
            "Candidate-led business cases where you structure the problem, request data and give a recommendation. One reported case asked whether a bank should adopt a robo-advisory tool.",
        },
        projects:
          "Interviewers use your CV to open fit discussion, particularly international experience and initiative. Be ready to explain choices and results in each item, and to link them to why this firm.",
        roleNotes: [
          { roleId: "strategy-associate", notes: "The consultant and associate entry tracks follow a case-heavy path with senior interviewers at the end; expect a clear recommendation to matter." },
          { roleId: "business-analyst", notes: "Entry analyst hiring is run locally; ask your office about format since written exercises and tests vary." },
        ],
        prep: [
          "Check which office you are applying to and what its rounds look like; formats differ by country.",
          "Practise leading cases yourself instead of waiting for prompts.",
          "Brush up on numerical and logical reasoning tests in case your office uses one.",
          "Build a concrete answer to why Roland Berger, including its European positioning and sectors.",
          "Prepare stories showing entrepreneurial drive and teamwork.",
          "Be ready to discuss international or cross-cultural experience if you have it.",
          "Rehearse concise recommendations with next steps and risks.",
        ],
      },
    ],
    sources: [
      { label: "Hacking the Case Interview: Roland Berger", url: "https://www.hackingthecaseinterview.com/pages/roland-berger-case-interview" },
      { label: "My Consulting Offer: Roland Berger interview guide", url: "https://www.myconsultingoffer.org/case-study-interview-prep/roland-berger-interview/" },
      { label: "IGotAnOffer: Roland Berger case interview", url: "https://igotanoffer.com/blogs/mckinsey-case-interview-blog/roland-berger-case-interview" },
      { label: "Glassdoor: Roland Berger interview report (Munich)", url: "https://www.glassdoor.es/Entrevista/Roland-Berger-Entrevista-E35272-RVW75975922.htm" },
      { label: "Glassdoor: Roland Berger interview report", url: "https://www.glassdoor.es/Entrevista/Roland-Berger-Entrevista-E35272-RVW103456546.htm" },
    ],
  },
  {
    companyId: "alvarez-marsal",
    summary:
      "Alvarez & Marsal hires analysts into groups such as turnaround and restructuring, transaction advisory and disputes and investigations. Third-party sources describe two to three rounds mixing behavioral questions with candidate-led, finance-flavoured cases, with format varying by group and office.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Analyst / consultant (restructuring and turnaround)",
        stages: [
          { name: "Application and resume screen", format: "Online or campus application", what: "Screening for academics, finance or accounting exposure and interest in the specific practice." },
          { name: "Recruiter or behavioral screen", format: "One or two interviews of 30 to 60 minutes by phone or video", what: "Motivation, background, and why A&M and this group." },
          { name: "Online reasoning test (some offices)", format: "Numerical and verbal test", what: "Reported in some locations only." },
          { name: "Main interview block", format: "Commonly three to six back-to-back interviews", what: "Blend of cases and behavioral questions with managers and directors; some candidates report a modeling test." },
          { name: "Senior round", format: "Partner or managing director interviews, possibly a meal", what: "Final fit and judgement check at some offices." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral rounds come first and weigh heavily for analysts, with pressure tolerance, ownership and communication in focus.",
          themes: ["Why A&M and why this practice", "Working under pressure", "Ownership and hands-on delivery", "Teamwork with senior stakeholders", "Interest in distressed or turnaround situations"],
          examples: [
            "Why restructuring or advisory rather than classic strategy?",
            "Describe a time with a tight deadline and many demands.",
            "Tell me about taking responsibility for a result that was not going well.",
            "How do you handle feedback from a demanding senior colleague?",
            "What do you know about a recent company turnaround?",
          ],
        },
        technical: {
          share: "Large share of the main interview block, varying by group",
          topics: ["Liquidity and cash flow", "Operational turnaround and cost", "Basic accounting and financial statements", "Capital structure basics", "Due diligence or forensic topics for those groups"],
          style:
            "Candidate-led cases reported to emphasise finance and operations; you are expected to ask for data and drive the analysis. Expect some accounting questions and, for some candidates, a modeling exercise. One office reported a practical case with data gathering and a short deck.",
        },
        projects:
          "Expect probing on finance, accounting or quantitative work on your CV. Be ready to explain what you personally did and how you handled messy data or pressure.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst candidates are commonly reported to see behavioral screening first and then a block mixing cases and fit; know your target group's focus." },
          { roleId: "strategy-associate", notes: "Associate roles tend to add more senior interviewers and deeper financial or operational judgement; verify scope with the recruiter." },
        ],
        prep: [
          "Learn the basics of financial statements and how to read a cash position.",
          "Practise a simple 13-week cash flow idea and what drives liquidity.",
          "Follow a few recent restructurings and be able to discuss causes and fixes.",
          "Identify which A&M group you are applying to and tailor your why-A&M answer.",
          "Practise cases where you drive and ask for data, not just respond.",
          "Prepare stories about pressure, ownership and teamwork.",
          "Brush up on Excel basics in case a modeling test appears.",
        ],
      },
    ],
    sources: [
      { label: "Management Consulted: Alvarez & Marsal interview", url: "https://managementconsulted.com/alvarez-marsal-interview/" },
      { label: "Hacking the Case Interview: A&M case interview", url: "https://www.hackingthecaseinterview.com/pages/alvarez-marsal-case-interview" },
      { label: "Road to Offer: A&M case interview guide", url: "https://www.roadtooffer.com/blog/alvarez-marsal-case-interview-guide" },
      { label: "PrepLounge: A&M interview process", url: "https://www.preplounge.com/en/consulting-forum/alvarez-marsal-interview-process-7042" },
      { label: "PrepLounge: difficulty of A&M analyst cases", url: "https://www.preplounge.com/de/consulting-forum/difficulty-of-alvarez-marsal-cases-7114" },
    ],
  },
  {
    companyId: "fti-consulting",
    summary:
      "FTI Consulting hires into segments such as corporate finance and restructuring, forensic and litigation, economic consulting and strategic communications. Sources describe a screen (a recorded video for some US candidates) followed by an interview block of behavioral and case rounds; cases are reported to involve data and financial exhibits.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Analyst / consultant (restructuring and advisory)",
        stages: [
          { name: "Application", format: "Online or campus application", what: "Resume screen by segment; you generally apply to a specific business line." },
          { name: "Initial screen", format: "Phone, video call or a recorded video platform in some US reports", what: "Background, motivation and basic fit." },
          { name: "Behavioral interview", format: "One or more conversations with a manager or above", what: "Why FTI, why consulting, plus experience questions." },
          { name: "Superday / interview block", format: "Commonly three to six interviews on video or in person", what: "Case studies and further behavioral questions." },
          { name: "Offer", format: "Recruiter call", what: "Timelines are reported to range from a few weeks to over a month and some candidates found it disorganised." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Expect standard fit questions on motivation and background, with some prep sites advising you to connect stories to FTI's stated values. Weight appears comparable to the case.",
          themes: ["Tell me about yourself", "Why FTI and why this segment", "Integrity and judgement", "Teamwork", "Resilience"],
          examples: [
            "Walk me through your background and what led to consulting.",
            "Why FTI rather than another advisory firm?",
            "Describe a time you made a difficult call with limited information.",
            "Tell me about a team project and your role in it.",
            "How would you handle disagreement with a client or colleague?",
          ],
        },
        technical: {
          share: "One or more cases in the process; sources describe near-certain case exposure",
          topics: ["Charts and data tables", "Financial statement analysis", "Market share and profitability decline", "Structured problem solving"],
          style:
            "Candidate-led cases of roughly 30 to 60 minutes where you interpret exhibits and talk through your reasoning. Some reports mention financial statements as case material.",
        },
        projects:
          "Moderate probing of finance, accounting, economics or analytics experience; be able to explain methods you used and what changed because of your work.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst interviews are reported as screening plus behavioral rounds and a multi-interview block with case work; the exact path depends on the segment." },
          { roleId: "strategy-associate", notes: "Advisory associate hiring mixes cases with behavioral rounds; evidence for specifics is limited so confirm with your recruiter." },
        ],
        prep: [
          "Decide which FTI segment you want and prepare a specific reason.",
          "Practise reading charts and financial tables and summarising the so-what.",
          "Review how to analyse declining market share or margin problems.",
          "Prepare a crisp tell-me-about-yourself under two minutes.",
          "If a recorded video screen is used, practise timed answers on camera.",
          "Have stories ready for integrity, teamwork and pressure.",
          "Ask the recruiter how many rounds and what formats to expect, since reports differ.",
        ],
      },
    ],
    sources: [
      { label: "Management Consulted: FTI Consulting interview", url: "https://managementconsulted.com/fti-consulting-interview/" },
      { label: "PrepLounge: FTI Consulting interview guide", url: "https://www.preplounge.com/en/articles/interview-fti-consulting" },
      { label: "Interview Query: FTI business analyst", url: "https://www.interviewquery.com/guides/fti-consulting-business-analyst" },
      { label: "Glassdoor: FTI Consulting interview report", url: "https://www.glassdoor.es/Entrevista/FTI-Consulting-Entrevista-E6069-RVW3394996.htm" },
      { label: "Glassdoor: FTI Consulting interview report (London)", url: "https://www.glassdoor.com.mx/Entrevista/FTI-Consulting-Entrevista-E6069-RVW72514743.htm" },
    ],
  },
  {
    companyId: "huron",
    summary:
      "Huron is a consulting firm with a strong healthcare and higher-education footprint. Prep sources and candidate reports describe an HR screen, a manager conversation, and one or more case interviews, often with healthcare flavour and quantitative work. The sequence varies by office and practice.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Analyst / consultant (healthcare, education, business)",
        stages: [
          { name: "Application", format: "Online or campus application", what: "Resume review, often with a practice-area preference." },
          { name: "HR phone screen", format: "Short call", what: "Motivation, logistics and basic fit." },
          { name: "Manager interview", format: "One-on-one phone or video", what: "Background, why Huron, and early assessment of structure and communication." },
          { name: "Case interview", format: "Around 30 minutes with a manager", what: "Business or operational case with some math." },
          { name: "Final round or superday", format: "Panel plus individual interviews with associates and above", what: "More fit and case work; healthcare-specific cases have been reported." },
        ],
        behavioral: {
          star: "expected",
          style:
            "Candidates describe real weight on fit and values, with questions about Huron's mission and your suitability. Reports say behaviorals are pressed in detail.",
          themes: ["Why Huron", "Fit with mission and values", "Leadership", "Teamwork", "Interest in healthcare or education"],
          examples: [
            "Why Huron, and what about our work appeals to you?",
            "What makes you a fit for this role?",
            "Describe a time you led a group toward a goal.",
            "Tell me about a conflict on a team and how you handled it.",
            "Why are you interested in healthcare or higher education?",
          ],
        },
        technical: {
          share: "Cases appear in most rounds per one prep source",
          topics: ["Operational cost savings", "Revenue and profitability math", "Healthcare economics", "Excel-based calculation", "Structured thinking"],
          style:
            "Roughly 30-minute cases reported as moderate, with reasoning prized over a perfect answer. One candidate was expected to do math in Excel and felt paper calculations looked less confident.",
        },
        projects:
          "Be prepared to connect your experience to Huron's industries and explain your role in group work clearly.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst candidates report an HR screen, a manager call, a case and a final round; practice-specific cases (such as healthcare) are common." },
          { roleId: "strategy-associate", notes: "Evidence is limited for associate-level specifics; expect case plus fit with higher expectations on structuring." },
        ],
        prep: [
          "Learn the basics of healthcare and higher-education economics and recent pressures on both.",
          "Practise cost-savings and revenue math in a spreadsheet as well as on paper.",
          "Read Huron's mission and values and craft a specific why-Huron answer.",
          "Prepare leadership and teamwork stories in STAR form.",
          "Explain your reasoning aloud; interviewers reportedly care about approach.",
          "Ask which practice you would interview with so you can tailor your prep.",
        ],
      },
    ],
    sources: [
      { label: "Hacking the Case Interview: Huron case interview", url: "https://www.hackingthecaseinterview.com/pages/huron-case-interview" },
      { label: "Dataford: Huron business analyst experiences", url: "https://dataford.io/interview-guides/huron-consulting-group/business-analyst/experiences" },
      { label: "Fishbowl: Huron interview questions", url: "https://www.fishbowlapp.com/company/huron/interview-questions" },
      { label: "Wall Street Oasis: Huron senior analyst interview", url: "https://www.wallstreetoasis.com/company/huron-consulting-group/interview/senior-analyst" },
      { label: "Glassdoor: Huron interview report", url: "https://www.glassdoor.com.mx/Entrevista/Huron-Consulting-Group-Entrevista-E35223-RVW3236884.htm" },
    ],
  },
  {
    companyId: "zs-associates",
    summary:
      "ZS is a consulting and analytics firm focused on pharma, life sciences and healthcare. Reports from campus drives describe an online aptitude test, a data-heavy written case, then technical or puzzle interviews and an HR round. Most accounts are from India campuses between roughly 2018 and 2024, so US-office practice may differ.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business technology analyst / business analyst",
        stages: [
          { name: "Application or campus shortlist", format: "Online or on-campus", what: "Resume screening and eligibility checks." },
          { name: "Aptitude test", format: "Timed online test, about 50 minutes in one report", what: "Quant, verbal, data interpretation, logic and computer fundamentals." },
          { name: "Case study", format: "Roughly 12 to 20 pages of data and questions with limited time", what: "Interpret data, structure a messy problem and recommend." },
          { name: "Technical or analytical interview", format: "Video or in person", what: "Case follow-ups, puzzles, guesstimates, resume probing; SQL or programming basics for technology roles." },
          { name: "HR or final round", format: "Interview with a senior person", what: "Fit, values and long-term interest." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "The HR round tests alignment of your values and goals with the firm and interest in consulting. Resume-based questions run through the technical rounds too.",
          themes: ["Why ZS and consulting", "Long-term goals", "Teamwork", "Learning agility", "Interest in healthcare and analytics"],
          examples: [
            "Why consulting rather than a pure technology role?",
            "What interests you about pharma or healthcare analytics?",
            "Describe a time you learned something quickly to deliver.",
            "Tell me about a project where you used data to make a decision.",
            "Where do you see yourself in a few years?",
          ],
        },
        technical: {
          share: "Majority of the process: test, case and technical interviews",
          topics: ["Data interpretation", "Guesstimates and puzzles", "Business case reasoning", "SQL or programming basics (technology roles)", "Reasoning aloud under time pressure"],
          style:
            "A document-based case with several data sets and a few questions in a short window, followed by discussion of your approach. Finishing everything is reportedly unrealistic, so prioritisation matters.",
        },
        projects:
          "Interviewers probe your resume and walk through how you handled the case. Be ready to defend each project and explain any SQL, coding or analytics you list.",
        roleNotes: [
          { roleId: "business-analyst", notes: "The business technology analyst and business analyst paths are reported as test, data-heavy case, technical or puzzle interview, then HR." },
          { roleId: "strategy-associate", notes: "Little direct evidence for associate-level steps; expect similar case and analytics emphasis." },
        ],
        prep: [
          "Practise timed data-interpretation and quant aptitude questions.",
          "Do written, data-heavy cases where you skim the whole pack first, then plan answers.",
          "Practise guesstimates and logic puzzles aloud.",
          "Refresh SQL and programming fundamentals if you list them.",
          "Learn basics of the pharma value chain and sales analytics.",
          "Keep your logic and assumptions consistent across rounds.",
          "Check with your campus office or recruiter about the current process for your region.",
        ],
      },
    ],
    sources: [
      { label: "GeeksforGeeks: ZS BTA on-campus experience", url: "https://www.geeksforgeeks.org/?p=489202" },
      { label: "GeeksforGeeks: ZS BTA virtual 2020 experience", url: "https://www.geeksforgeeks.org/?p=488028" },
      { label: "Interview Query: ZS Associates business analyst", url: "https://www.interviewquery.com/guides/zs-associates-business-analyst" },
      { label: "PrepInsta: ZS interview experiences", url: "https://prepinsta.com/interview-preparation/zs-interview-experience/" },
      { label: "Glassdoor: ZS Associates interview report", url: "https://www.glassdoor.com.au/Interview/ZS-Associates-Interview-E115506-RVW686145.htm" },
    ],
  },
  {
    companyId: "guidehouse",
    summary:
      "Guidehouse serves public sector, healthcare and commercial clients. The public evidence is thin: candidate reports describe a recruiter call, two or three interviews that lean on fit and experience, and in some cases a case study or take-home exercise. Background checks, and clearances for government work, can add time.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "consulting",
        label: "Analyst / consultant",
        stages: [
          { name: "Application", format: "Online or referral", what: "Resume screen by practice or business line." },
          { name: "Recruiter screen", format: "Phone call", what: "Background, motivation, field knowledge and logistics." },
          { name: "Interviews with leaders", format: "One or two interviews, often with a director", what: "Heavy on prior experience, motivation and fit." },
          { name: "Case or exercise (commonly reported)", format: "Live case or take-home", what: "Tests structure and judgement." },
          { name: "Final interview and checks", format: "Often a partner or senior leader; background check afterward", what: "Final fit; government-related roles may need further clearance." },
        ],
        behavioral: {
          star: "expected",
          style:
            "Reports describe fit and experience as the main focus, with candidates using STAR-style answers.",
          themes: ["Why consulting", "Meeting deadlines", "Teamwork", "Client-facing skills", "Fit with the practice's work"],
          examples: [
            "Why do you want a career in consulting?",
            "Describe a project that had a strict deadline.",
            "Tell me about a time you worked with a difficult teammate.",
            "Why this practice area?",
            "Walk me through your experience relevant to this role.",
          ],
        },
        technical: {
          share: "Smaller than at strategy firms; a case or exercise in some processes",
          topics: ["Structured problem solving", "Basic analysis and data interpretation", "Practice-area knowledge (public sector, health, energy, finance)"],
          style:
            "Some candidates report a take-home case or a case discussion with a director; others report none. Skills or aptitude tests appeared in some reports.",
        },
        projects:
          "Interviewers spend meaningful time on your past work and whether it matches the role. Link experiences to the practice's clients and issues.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Business analyst reports describe a recruiter screen, two director interviews and a case study, with a strong fit focus." },
        ],
        prep: [
          "Learn the specific practice you are applying to and its client types.",
          "Prepare STAR stories for deadlines, teamwork and client work.",
          "Practise a basic structured case and a short written analysis.",
          "Craft a clear why-consulting and why-Guidehouse answer.",
          "Ask the recruiter about stages, assessments and clearance timing.",
        ],
      },
    ],
    sources: [
      { label: "Interview Query: Guidehouse business analyst", url: "https://www.interviewquery.com/guides/guidehouse-business-analyst" },
      { label: "Glassdoor: Guidehouse interview report", url: "https://www.glassdoor.com/Interview/Guidehouse-Interview-E2188107-RVW75099433.htm" },
      { label: "Glassdoor: Guidehouse interview report (second)", url: "https://www.glassdoor.com/Interview/Guidehouse-Interview-E2188107-RVW68057723.htm" },
      { label: "Indeed: Guidehouse hiring process FAQ", url: "https://www.indeed.com/cmp/Guidehouse/faq/hiring-process" },
      { label: "Scoutify: Guidehouse interview", url: "https://scoutify.com/companies/guidehouse/interview/" },
    ],
  },
  {
    companyId: "slalom",
    summary:
      "Slalom is a business and technology consultancy that hires through local markets. Prep guides describe a recruiter screen, a behavioral and short-case round, a collaborative or take-home case, and a leader conversation, while older candidate reports describe three simpler rounds. Evidence conflicts, so confirm the process for your role.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "consulting",
        label: "Consultant (business, data and technology)",
        stages: [
          { name: "Recruiter screen", format: "Phone or video call", what: "Background, motivation, market (office) and role fit." },
          { name: "Behavioral and short case", format: "Conversation with a senior consultant or principal", what: "Experience stories plus a brief case to see how you think." },
          { name: "Case study or take-home", format: "Collaborative case or presentation, 15 to 20 minutes in one guide", what: "Common for data and technology roles; tests insight and communication." },
          { name: "Leadership interview", format: "Director or managing director", what: "Fit with the market, values and consulting readiness." },
          { name: "Offer", format: "Recruiter call", what: "Guides cite three to five weeks, with one source citing around 43 days." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Fit is substantial and conversational. Guides say Slalom values a clear point of view and dislikes robotic structure.",
          themes: ["Collaboration", "Client orientation", "Ambiguity", "Why Slalom's local-market model", "Technology interest"],
          examples: [
            "Why consulting, and why Slalom rather than a larger firm?",
            "Tell me about a time you worked closely with a client or stakeholder.",
            "Describe handling an unclear problem.",
            "Which technology or data topic are you most excited about?",
            "Describe a team conflict and the outcome.",
          ],
        },
        technical: {
          share: "Moderate: a short case and, for some roles, a take-home or hands-on test",
          topics: ["Business case structuring", "Technology trade-offs", "Data analytics tasks", "Platform knowledge for technical roles"],
          style:
            "Candidate-led cases of about 30 to 40 minutes; older reviews describe consulting-style technology discussion rather than deep technical grilling, and some engineering candidates report coding take-homes.",
        },
        projects:
          "Expect detailed discussion of technology or analytics projects, including trade-offs you made and what you would do differently.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst and consultant paths are reported as recruiter, fit with short case, take-home or collaborative case, then leadership interview." },
          { roleId: "strategy-associate", notes: "Strategy-style roles are uncommon at Slalom; expect case work tied to digital or operations topics. Evidence is thin." },
        ],
        prep: [
          "Ask the recruiter which stages apply to your market and role.",
          "Practise conversational cases rather than rigid frameworks.",
          "Prepare a take-home format: lead with the recommendation, then two or three strong insights.",
          "Study the platforms or practice (data, cloud, Salesforce, etc.) listed in the job.",
          "Prepare stories about client or stakeholder collaboration.",
          "Research your local Slalom market and its clients.",
        ],
      },
    ],
    sources: [
      { label: "Hacking the Case Interview: Slalom", url: "https://www.hackingthecaseinterview.com/pages/slalom-case-interview" },
      { label: "Final Round AI: Slalom interview process", url: "https://www.finalroundai.com/blog/slalom-interview-process" },
      { label: "Glassdoor: Slalom interview report", url: "https://www.glassdoor.co.uk/Interview/Slalom-Interview-E31102-RVW19756664.htm" },
      { label: "Glassdoor: Slalom interview report (second)", url: "https://www.glassdoor.com.hk/Interview/Slalom-Interview-E31102-RVW7675136.htm" },
      { label: "Glassdoor: Slalom interview questions", url: "https://clear.glassdoor.nl/Interview/Slalom-Interview-Questions-E31102_P311.htm" },
    ],
  },
  {
    companyId: "capgemini-invent",
    summary:
      "Capgemini Invent is the strategy, design and transformation arm of Capgemini. Public evidence is thin and comes from a small number of mostly European candidate reports: a recruiter or competency interview, then a case or group assessment day with a presentation, then one-to-one interviews. Formats differ by country and role.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "consulting",
        label: "Consultant / analyst",
        stages: [
          { name: "Application", format: "Online application", what: "CV screen; some countries include online tests." },
          { name: "Recruiter or competency interview", format: "Phone or video, up to an hour", what: "CV walk-through, motivation and competencies; English level checked in some countries." },
          { name: "Hiring manager discussion", format: "Short conversation, in some reports with portfolio or case introduction", what: "Skills match and early case discussion." },
          { name: "Assessment day or case round", format: "Group case study and presentation in some London reports", what: "Observes teamwork and client-style presentation." },
          { name: "One-to-one interview", format: "Often with a senior person; may include lunch with staff", what: "Review of case and presentation, plus competency questions." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Competency questions appear in the first interview and the final one-to-one. Values questions on how you identify with the company are reported.",
          themes: ["Why Capgemini Invent", "Values fit", "Teamwork in groups", "Digital interest", "Motivation to consult"],
          examples: [
            "Why should we hire you over other candidates?",
            "How do your values match the firm's?",
            "Tell me about a time you contributed in a group under time pressure.",
            "What excites you about digital transformation?",
            "Describe a project you are proud of and your part in it.",
          ],
        },
        technical: {
          share: "Case or group exercise is the main differentiator; technical depth depends on the role",
          topics: ["Digitalisation and transformation cases", "Group problem solving", "Presentation to a mock client", "Role-specific technology questions"],
          style:
            "Group case studies with a presentation have been reported in the UK, and a digitalisation case in Germany. Technology roles may include questions on tools such as automated deployment.",
        },
        projects:
          "Expect a detailed CV or portfolio walk-through and follow-up questions on your role in each experience.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst-level evidence is limited; expect competency interviews and a case or group exercise, depending on the country." },
          { roleId: "strategy-associate", notes: "Strategy-style associate hiring is not well documented; ask your recruiter about case type and group exercises." },
        ],
        prep: [
          "Confirm your country's process and whether there is a group assessment day.",
          "Practise team case exercises and timeboxed presentations.",
          "Prepare to articulate why Capgemini Invent's design and transformation focus appeals to you.",
          "Learn a few digital transformation and sustainability topics.",
          "Prepare competency stories and one tied to company values.",
          "Plan time carefully during group prep; running out of time was cited as a problem.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Capgemini Invent interview report (assessment day)", url: "https://www.glassdoor.co.uk/Interview/Capgemini-Invent-Interview-E589990-RVW14087932.htm" },
      { label: "Glassdoor: Capgemini Invent interview report", url: "https://www.glassdoor.com/Interview/Capgemini-Invent-Interview-E589990-RVW16585328.htm" },
      { label: "Glassdoor: Capgemini Invent interview report (recent)", url: "https://www.glassdoor.co.uk/Interview/Capgemini-Invent-Interview-E589990-RVW87055028.htm" },
      { label: "Glassdoor: Capgemini Invent interview report (third)", url: "https://www.glassdoor.co.uk/Interview/Capgemini-Invent-Interview-E589990-RVW86454940.htm" },
    ],
  },
  {
    companyId: "west-monroe",
    summary:
      "West Monroe is a Chicago-founded management and technology consultancy. Candidate reports describe a talent screen (a recorded video screen for some), behavioral interviews with several levels, and a case with a manager. Cases are reported as moderate, and the evidence base is small.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "consulting",
        label: "Analyst / consultant (technology and digital)",
        stages: [
          { name: "Application", format: "Online or campus application", what: "Resume screen; many early-career hires come through campus." },
          { name: "Talent acquisition screen or recorded video", format: "Call or HireVue-style video", what: "Background and motivation; one candidate heard back two to three weeks later." },
          { name: "Behavioral interviews", format: "Conversations with a senior consultant, senior manager and partner in one report", what: "Resume walk-through and experience questions." },
          { name: "Case interview", format: "With a manager", what: "Moderate business case with quick math; one candidate described a conversational format." },
          { name: "Decision", format: "Recruiter call", what: "Reported timelines range from about five weeks to two months." },
        ],
        behavioral: {
          star: "expected",
          style:
            "Behavioral conversations are a major part and run across several levels. Reports mention client-facing and problem-solving stories.",
          themes: ["Difficult client situations", "Problem solving", "Resume walk-through", "Teamwork", "Why West Monroe"],
          examples: [
            "Tell me about a time you dealt with a difficult client or stakeholder.",
            "Describe tackling a hard problem and how you solved it.",
            "Walk me through your resume and the choices behind it.",
            "Why West Monroe and why consulting?",
            "Describe a time you worked in a team to deliver something.",
          ],
        },
        technical: {
          share: "One case within the process, plus skills discussion for some roles",
          topics: ["Business case structure", "Quick calculations", "Analyses you would run", "Technology and digital project topics"],
          style:
            "Reported as straightforward to moderate. One candidate was asked to explain analyses and write up evaluation criteria rather than perform them.",
        },
        projects:
          "Resume and project discussion is a reported part of behavioral rounds; be ready to describe your role and the outcome.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst paths are reported as screen, behavioral interviews and a manager-led case; formats vary by office and role." },
        ],
        prep: [
          "Research West Monroe's industries and its technology and digital project types.",
          "Practise cases with quick math and clear written or spoken reasoning.",
          "Prepare behavioral stories on clients, difficult problems and teamwork.",
          "If a recorded video round is used, practise timed responses.",
          "Ask your recruiter about format by office and role.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: West Monroe interview report", url: "https://clear.glassdoor.nl/Interview/West-Monroe-Interview-E118343-RVW8847410.htm" },
      { label: "Glassdoor: West Monroe interview report (second)", url: "https://clear.glassdoor.nl/Interview/West-Monroe-Interview-E118343-RVW31849766.htm" },
      { label: "Glassdoor: West Monroe interview report (third)", url: "https://clear.glassdoor.nl/Interview/West-Monroe-Interview-E118343-RVW36204416.htm" },
      { label: "Fishbowl: West Monroe case interview thread", url: "https://www.fishbowlapp.com/post/i-have-a-west-monroe-case-interview-coming-up-can-anyone-provide-some-insight-on-what-i-should-expect-or-any-other-tips" },
    ],
  },
];
