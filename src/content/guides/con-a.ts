import type { CompanyGuide } from "./types";

// Compiled from public sources (firm careers pages, prep-site guides, candidate reports). Formats vary by office and year.
export const conA: CompanyGuide[] = [
  {
    companyId: "mckinsey",
    summary:
      "McKinsey screens with an application review and the Solve online game, then runs case-plus-experience interviews in two rounds. Each live interview commonly pairs a business case with a structured deep dive into your own past experiences. McKinsey's own interviewing page confirms the personal experience plus problem-solving (case) pairing and lists Solve as a separate assessment; round counts, timings and weighting below come from third-party reports and vary by office.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application and resume screen", format: "Online application with resume (and cover letter in some offices)", what: "Academic record, leadership and impact, and evidence of problem-solving. Offices set their own cycles, so check your campus and office deadlines early." },
          { name: "Solve (online game)", format: "Adaptive game with a few unpausable mini-scenarios; length and deadline are not published on the pages checked; prep sources report roughly 60 to 110 minutes", what: "Decision-making, information gathering and analysis under time pressure. No business knowledge needed. Sources differ on exact games and length, and results are weighed with the rest of your application." },
          { name: "First-round interviews", format: "Commonly two interviews of about 30 to 45 minutes each, by video or in person, with consultants or managers", what: "Each interview typically combines a case and a personal-experience segment. Interviewers assess structuring, quantitative reasoning and communication." },
          { name: "Final-round interviews", format: "Commonly two or three further case-plus-experience interviews with partners or senior associate partners", what: "Harder or more open cases, deeper probing of your stories, and a read on judgment and how you would be with clients and teams." },
          { name: "Decision and offer", format: "Usually communicated within days of the final round", what: "Feedback on the Solve score and interviews may be offered; ask your recruiter." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "The Personal Experience Interview is a dedicated segment of each interview in which the interviewer picks one experience and drills into it with follow-ups. McKinsey advises preparing two examples of impact for each area it assesses, with detail on the challenge and your own actions. Treat it as roughly as important as the case.",
          themes: ["Personal impact", "Leadership", "Entrepreneurial drive", "Inclusive teamwork", "Courage and resilience"],
          examples: [
            "Describe a time you led a group toward a goal when no one made you the leader.",
            "Tell me about a situation where you changed someone's mind who disagreed with you.",
            "Walk me through a moment you took initiative to start something new.",
            "Describe a time you faced a significant setback and how you responded.",
            "Tell me about a time you helped a struggling teammate succeed.",
          ],
        },
        technical: {
          share: "A substantial part of each client-facing interview (exact split not published)",
          topics: ["Business structuring", "Mental math and charts", "Market sizing", "Hypothesis-driven problem solving", "Synthesis and recommendation"],
          style:
            "McKinsey describes the case as a business problem testing analytical thinking, and alumni on its blog stress breaking problems down over memorised frameworks. Prep sources describe it as interviewer-led: the interviewer poses a series of linked questions, asks you to structure, analyze exhibits and calculate, and finishes by asking for a concise recommendation. Practice reacting to questions, not only driving a self-built framework.",
        },
        projects:
          "Expect sustained follow-up questions on one story: your exact role, what you decided, what you would do differently, and the measurable result. Prepare three or four detailed stories from different settings and be ready to go several layers deep on each.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Undergraduate analyst recruiting is usually run through campus and office-level cycles; the same Solve plus case-and-experience flow is commonly reported." },
          { roleId: "strategy-associate", notes: "Associate (MBA or advanced-degree) hires commonly report the same case-plus-experience structure with more business context expected in your examples." },
        ],
        prep: [
          "Treat Solve as a separate online step; check the official careers page and your recruiter for current format, and do not rely on forum details.",
          "Do cases with a partner who plays interviewer-led style and interrupts with the next question.",
          "Build a story bank of three or four experiences and rehearse deep follow-up probing on each, not just a polished first answer.",
          "Drill mental math, growth rates, percentages and reading charts quickly and accurately.",
          "End every case with a crisp, up-front recommendation and the next steps.",
          "Check your target office's application window and ask alumni for office-specific format changes.",
          "Be able to explain why consulting and why this firm in a few honest sentences.",
        ],
      },
    ],
    sources: [
      { label: "McKinsey careers: interviewing at McKinsey (official)", url: "https://www.mckinsey.com/careers/interviewing" },
      { label: "McKinsey careers blog: experience with the Problem Solving Game", url: "https://www.mckinsey.com/careers/meet-our-people/careers-blog/my-experience-with-the-mckinsey-problem-solving-game" },
      { label: "IGotAnOffer: McKinsey Solve guide", url: "https://igotanoffer.com/blogs/mckinsey-case-interview-blog/mckinsey-problem-solving-game" },
      { label: "Slidescience: McKinsey problem solving game", url: "https://slidescience.co/mckinsey-problem-solving-game/" },
      { label: "PrepLounge: McKinsey US interviewing process thread", url: "https://preplounge.com/en/consulting-forum/mckinsey-us-interviewing-process-22481" },
      { label: "Villanova connections: what the McKinsey game is", url: "https://connections.villanova.edu/blog/2025/01/25/what-is-the-mckinsey-game-and-how-to-solve-it-2024/" },
    ],
  },
  {
    companyId: "bcg",
    summary:
      "BCG's official country pages confirm an online application, an online assessment that varies by region (in the US a roughly 30 to 35 minute career assessment, then an online case for some), and case-led interviews, with case workshops offered to prepare. Round structure and the fit segment come mostly from third-party guides and vary by office.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application and resume screen", format: "Online application with resume", what: "Academics, leadership, and evidence of impact. Recruiting follows office-specific cycles, so verify dates with your campus or office." },
          { name: "Online assessment (Casey chatbot case)", format: "Online assessment whose form depends on region; BCG US lists a roughly 30 to 35 minute assessment sent soon after applying, with a 48-hour window, and an online case of about 35 minutes for select candidates", what: "Structuring, data analysis and reasoning. UK, Switzerland and Australia/NZ pages describe numerical, cognitive or online case variants instead, so confirm what your office uses." },
          { name: "Recruiter or phone screen", format: "Short call, in some offices", what: "Motivation, resume walk-through and basic fit." },
          { name: "First round", format: "Commonly two interviews of about 45 minutes with consultants or managers", what: "Each is reported as a short fit segment of roughly 10 minutes followed by a candidate-led case of about 30 minutes." },
          { name: "Final round", format: "Commonly two or three interviews with principals, partners or managing directors; a written case appears in some US reports", what: "More demanding cases, deeper fit, and judgment under ambiguity and pressure." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Fit questions are usually asked briefly at the start of case interviews, with a heavier fit emphasis in final rounds. Guides describe stories about impact, leadership and teamwork; weighting is lighter than the case in early rounds.",
          themes: ["Why consulting and why BCG", "Leadership", "Teamwork", "Impact and initiative", "Handling ambiguity"],
          examples: [
            "Tell me about yourself and why consulting.",
            "Describe a time you led others through a difficult situation.",
            "Give an example of something you achieved that you are proud of and why.",
            "Tell me about disagreeing with a team member and how it ended.",
            "What interests you about this firm compared with others?",
          ],
        },
        technical: {
          share: "Roughly three quarters of interview time in early rounds",
          topics: ["Case structuring", "Profitability", "Market sizing", "Data and chart interpretation", "Brainstorming", "Recommendation"],
          style:
            "Candidate-led cases: you propose a structure and decide the analyses while the interviewer supplies data when you ask. The firm is described as valuing creative, tailored structures over memorized frameworks.",
        },
        projects:
          "Interviewers may ask you to expand on a resume item during the fit segment. Know your role, decisions and results on each major experience, and prepare two or three leadership-type stories.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Undergraduate and early-career hiring commonly uses the online assessment, then the two-round case and fit structure." },
          { roleId: "strategy-associate", notes: "Associate and MBA candidates commonly report the same interview structure; written case exercises are reported in some US final rounds." },
        ],
        prep: [
          "Practice timed online cases and numerical tests; the exact assessment depends on your region.",
          "Rehearse candidate-led cases where you drive the structure and ask for the data you need.",
          "Avoid reciting a framework; adapt the structure to the specific question.",
          "Use BCG's case library and attend its case workshops or preparation calls where offered.",
          "Prepare a concise two-minute walk-through of your background and why BCG.",
          "Practice a short written or slide-based synthesis in case your final round includes one.",
          "Check your country's BCG careers page for the current assessment and interview lineup.",
        ],
      },
    ],
    sources: [
      { label: "BCG careers: application and interviews, Switzerland (official)", url: "https://careers.bcg.com/global/en/locations/switzerland/application-interviews" },
      { label: "BCG careers: ANZ graduate recruitment (official)", url: "https://careers.bcg.com/global/en/locations/australia-new-zealand/associate-recruitment" },
      { label: "BCG recruiting: candidate FAQs (official)", url: "https://recruiting.bcg.com/Talent_CandidateHelp/Candidate_FAQ.aspx" },
      { label: "Road to Offer: BCG case interview guide", url: "https://www.roadtooffer.com/blog/bcg-case-interview-guide" },
      { label: "Management Consulted: BCG online case", url: "https://managementconsulted.com/bcg-online-case/" },
      { label: "IGotAnOffer: BCG online case assessment", url: "https://igotanoffer.com/en/advice/bcg-online-case-assessment" },
      { label: "Strategy Case: BCG online case", url: "https://strategycase.com/bcgs-online-case/" },
      { label: "Leland: breaking down BCG interviews", url: "https://www.joinleland.com/library/a/breaking-down-bcg-interviews-what-to-expect-and-how-to-prepare" },
      { label: "IGotAnOffer: BCG case interview", url: "https://igotanoffer.com/blogs/mckinsey-case-interview-blog/bcg-case-interview" },
    ],
  },
  {
    companyId: "bain",
    summary:
      "Bain's careers page states that its process includes an application review, usually a recruiter call, and multiple interview rounds tailored to the role, which may include a questionnaire, behavioral interview and a case. Its page gives no timings or case format; candidate reports describe a short fit conversation plus a candidate-led case in each interview, with partners in the final round. Online testing appears in some offices but is inconsistently reported.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application review", format: "Online application", what: "Resume and fit with the firm's priorities. Cycles and deadlines depend on the office and campus." },
          { name: "Recruiter call or online test", format: "Short call; some candidates report a quantitative, cognitive or behavioral online test", what: "Motivation and basic fit. Reports about online tests differ by office and year, so confirm with your recruiter." },
          { name: "First round", format: "Commonly two interviews of about 30 to 45 minutes with consultants or managers", what: "Typically a few fit questions then a case in each session. Some offices report only one session with a fit focus." },
          { name: "Final round", format: "Commonly two or three interviews with managers and partners", what: "Harder cases, more senior fit evaluation, and in some countries a written case: analyze a document pack, build a few slides, then discuss them." },
          { name: "Feedback and offer", format: "Decision shortly after final round", what: "Bain says you are told how each interview went. Bain also warns it never interviews over instant messaging or asks for payments." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Commonly reported as a short opening segment of about 10 minutes covering background, why consulting and why Bain. Coaches suggest a few polished stories, but every interview is also read for cultural fit.",
          themes: ["Why consulting", "Why Bain", "Leadership", "Personal impact", "Teamwork and culture fit"],
          examples: [
            "Walk me through your background in a couple of minutes.",
            "What draws you to consulting and to this firm specifically?",
            "Describe a time you led without formal authority.",
            "Tell me about a project where your individual contribution made the difference.",
            "What are your strengths, and where do you want to grow?",
          ],
        },
        technical: {
          share: "Around three quarters of interview time",
          topics: ["Candidate-led cases", "Market sizing (often bottom-up)", "Profitability and growth", "Math and chart reading", "Written case (some offices)"],
          style:
            "Candidate-led: you structure, request data and recommend. Expect quantitative reasoning and a conversational style in which the interviewer reacts to your hypotheses.",
        },
        projects:
          "Fit questions often start from your resume. Prepare to explain your own role in each activity (not just the team's) and why you made the choices you did.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Undergraduate candidates commonly report a first round of two case-plus-fit interviews, then partner interviews." },
          { roleId: "strategy-associate", notes: "Associate consultant (MBA) hiring is reported to follow a similar case-and-fit pattern, sometimes with more senior interviewers earlier." },
        ],
        prep: [
          "Do many live practice cases and practice stating a clear hypothesis early.",
          "Rehearse a fast, accurate bottom-up market sizing.",
          "Write three or four stories centered on your own actions and impact, plus why consulting and why Bain.",
          "Ask your recruiter whether your office uses an online test or a written case.",
          "If a written case is possible, practice building a few slides from a dense document under time pressure.",
          "Network with alumni from your target office before applying; office culture is a major theme.",
        ],
      },
    ],
    sources: [
      { label: "Bain careers: interview preparation", url: "https://www.bain.com/careers/interview-prep/" },
      { label: "IGotAnOffer: Bain case interview", url: "https://igotanoffer.com/blogs/mckinsey-case-interview-blog/bain-case-interview?src=nav" },
      { label: "PrepLounge: preparing for Bain", url: "https://www.preplounge.com/en/articles/how-to-prepare-for-your-consulting-interview-at-bain" },
      { label: "PrepLounge: Bain first-round fit interview thread", url: "https://www.preplounge.com/consulting-forum/bain-first-round-fit-interview-16947" },
      { label: "PrepLounge: Bain rounds thread", url: "https://preplounge.com/en/consulting-forum/what-does-the-complete-application-process-look-like-for-an-undergrad-applying-to-bains-london-office-from-cambridge-2440" },
    ],
  },
  {
    companyId: "deloitte",
    summary:
      "Deloitte's US recruiting pages describe meeting the firm, applying, then typically two to three interview rounds (phone, video or in person) mixing behavioral, technical and case interviews depending on role, with offers usually in writing within about a week. Superday contents, case-project and presentation details come from anonymous candidate reports and vary by office and practice.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application and resume screen", format: "Online application, often through campus recruiting", what: "Resume, academics and interest in a specific offering or practice." },
          { name: "Online or video screen", format: "Some candidates report a recorded video interview or aptitude test", what: "Motivation and basic reasoning; not reported for every office." },
          { name: "First-round interviews", format: "Commonly a behavioral interview and one or more shorter cases of about 30 minutes", what: "Why consulting, why Deloitte, resume walk-through, and structured problem solving including estimation." },
          { name: "Superday or final round", format: "Reported formats include a half or full day of interviews, a longer case project, a client-style presentation, and a partner conversation", what: "Evaluates analysis, communication and presentation plus overall fit." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Deloitte's official tips recommend STAR-structured answers tied to your resume, with concrete examples and honest stories since interviewers probe follow-ups. Candidate reports describe a standalone behavioral interview with a manager or partner.",
          themes: ["Why consulting", "Why Deloitte over other firms", "Teamwork", "Client orientation", "Resume walk-through"],
          examples: [
            "Why consulting, and why Deloitte instead of another large firm?",
            "Walk me through your resume and the choices behind it.",
            "Tell me about a time you worked on a team with conflict.",
            "Describe a situation where you persuaded others to adopt your idea.",
          ],
        },
        technical: {
          share: "Roughly half, varying widely by office",
          topics: ["Guesstimates and market sizing", "Basic profitability or operations cases", "Case project with analysis and slides", "Math (some reports heavy)"],
          style:
            "Deloitte's official case guidance says it assesses structured reasoning, not one right answer: clarify the problem, state assumptions, summarise issues, recommend, then give next steps, and treat the interviewer as a client. Candidate reports add short interview cases and, in some superdays, an hour-long case project followed by a client-style presentation. Practice both the verbal case and a brief structured presentation.",
        },
        projects:
          "Interviewers commonly ask you to walk through your resume. Know why you chose each activity and what you contributed. Offering-specific roles (for example technology or human capital) may probe relevant skills.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst candidates commonly report a behavioral interview, a case, and a multi-part final day." },
          { roleId: "strategy-associate", notes: "For strategy and analytics style roles evidence is thin; expect case rounds similar in structure but confirm with recruiting." },
        ],
        prep: [
          "Prepare a clear, specific answer to why Deloitte versus other large firms.",
          "Use Deloitte's own case and scenario interview tips; practise market sizing and short profitability cases while thinking aloud.",
          "Practice making a short presentation from a case pack and handling questions.",
          "Learn which Deloitte offering you are applying to and what it does.",
          "Ask your recruiter about format: video screen, group exercise and superday content vary.",
        ],
      },
    ],
    sources: [
      { label: "Deloitte US careers: recruiting tips (official)", url: "https://www.deloitte.com/us/en/careers/join-deloitte/recruiting-tips.html" },
      { label: "Deloitte US careers: case and scenario interview tips (official)", url: "https://www.deloitte.com/us/en/careers/join-deloitte/recruiting-tips/case-and-scenario-interview-tips.html" },
      { label: "Glassdoor: Deloitte interview report (Canada)", url: "https://www.glassdoor.ca/Interview/Deloitte-Interview-E2763-RVW71027283.htm" },
      { label: "Glassdoor: Deloitte interview report", url: "https://www.glassdoor.com/Interview/Deloitte-Interview-E2763-RVW60116059.htm" },
      { label: "Glassdoor: Deloitte interview report (UK)", url: "https://www.glassdoor.co.uk/Interview/Deloitte-Interview-E2763-RVW39201853.htm" },
      { label: "Glassdoor: Deloitte interview report (Singapore)", url: "https://www.glassdoor.sg/Interview/Deloitte-Interview-E2763-RVW80991891.htm" },
      { label: "Glassdoor: Deloitte interview report (US)", url: "https://www.glassdoor.com/Interview/Deloitte-Interview-E2763-RVW37348605.htm" },
    ],
  },
  {
    companyId: "pwc-strategy-and",
    summary:
      "Strategy&'s UK graduate page describes a CV and personal statement plus online assessment, then two back-to-back first-round interviews (an unstructured case that opens with background and motivation, and a structured case from a real project with a slide pack), then a second-round assessment day. The US MBA page lists a round of three case-plus-behavioral interviews. Other details come from prep guides. Interviews pair behavioral questions with candidate-led cases, and some tracks add a video interview, group exercise or presentation. Sources are prep guides and a few candidate reports, so treat details as indicative.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application and resume screen", format: "Online application with resume and sometimes a cover letter", what: "Described as the most selective filter; academics, leadership and relevant experience matter." },
          { name: "Online assessment", format: "Aptitude and reasoning tests; first-round may include a recorded video interview", what: "Numerical and logical reasoning, plus recorded answers to questions or short case prompts in some tracks." },
          { name: "First-round interviews", format: "Commonly one or two interviews, each with a behavioral part (about 15 minutes) and a case", what: "UK first round per Strategy&: two roughly 45 minute cases, one unstructured with background questions and one structured with about 10 minutes to review slides. Prep sources add market sizing and profitability." },
          { name: "Second-round interviews", format: "Senior interviews, possibly with a group case or a prepared presentation", what: "Deeper case work and fit with managers and partners; Strategy& leans toward strategic cases." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Fit questions open or close each interview and cover teamwork and persuasion. Recruiters sometimes run a behavioral-only first conversation.",
          themes: ["Teamwork", "Persuasion and influence", "Leadership", "Why PwC or Strategy&", "Client service"],
          examples: [
            "Describe how you convinced a group to change direction.",
            "Tell me about leading a team through a tough deadline.",
            "Why do you want to be in strategy consulting, and why this firm?",
            "Give an example of a time you had to learn something quickly.",
          ],
        },
        technical: {
          share: "About half to two thirds of interview time",
          topics: ["Market sizing", "Profit and cost optimization", "Make-versus-buy, new product and M&A questions (Strategy&)", "Written or presented case (some offices)"],
          style:
            "Candidate-led cases where you set the approach. Strategy& cases lean more strategic, while PwC Consulting cases lean toward profit and cost questions. Some offices use a take-home deck presented to interviewers.",
        },
        projects:
          "Expect resume-based follow-ups in the behavioral portion. Prepare stories that show persuasion, leadership and teamwork with specifics.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Campus hires often report the four-step flow with aptitude testing and possible group exercises for earlier-year candidates." },
          { roleId: "strategy-associate", notes: "Strategy& associates commonly report more strategy-flavored cases; presentation tasks appear in some reports." },
        ],
        prep: [
          "Confirm with your recruiter whether your process includes a video interview, group case or presentation.",
          "Practice candidate-led profitability, cost and market-sizing cases.",
          "For Strategy& add practice with entry, M&A and make-versus-buy questions.",
          "Prepare persuasion and team-leadership stories with concrete outcomes.",
          "Rehearse recording concise video answers if a one-way screen is used.",
          "Be clear on the difference between PwC Consulting and Strategy& and which you are applying to.",
        ],
      },
    ],
    sources: [
      { label: "Strategy& UK: graduates and interns (official)", url: "https://www.strategyand.pwc.com/uk/en/careers/graduates-and-interns.html" },
      { label: "Strategy& US: MBA careers (official)", url: "https://www.strategyand.pwc.com/us/en/careers/mba.html" },
      { label: "IGotAnOffer: Strategy& PwC case interview", url: "https://igotanoffer.com/blogs/mckinsey-case-interview-blog/strategy-pwc-case-interview" },
      { label: "My Consulting Offer: PwC and Strategy& case interview", url: "https://www.myconsultingoffer.org/case-study-interview-prep/pwc-case-interview-strategy/" },
      { label: "Glassdoor: Strategy& interview report", url: "https://www.glassdoor.co.uk/Interview/Strategy-and-Interview-E875965-RVW8287828.htm" },
      { label: "Glassdoor: Strategy& interview report (2)", url: "https://www.glassdoor.co.uk/Interview/Strategy-and-Interview-E875965-RVW104960201.htm" },
    ],
  },
  {
    companyId: "ey-parthenon",
    summary:
      "EY's official pages show the process varies by country: the UK first round is two 25-minute consultant-led cases then a partner interview, the Netherlands adds a numerical test and three partner-level final interviews, and the US Associate Program mixes behavioral and case interviews with a decision typically within a week. Private equity and finance-flavored case emphasis comes from coaching sites.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application and resume screen", format: "Online application via EY careers", what: "Academics, leadership and relevant experience. Apply to EY-Parthenon specifically if you want strategy work rather than general advisory." },
          { name: "Recruiter or behavioral screen", format: "Often a phone or video conversation", what: "Motivation, resume and fit." },
          { name: "Second-round interview", format: "Varies by country (UK: two 25-minute cases; Netherlands: recruiter interview plus two cases); prep sites report behavioral plus a 30 to 45 minute case in some offices", what: "Structuring, quantitative reasoning and communication." },
          { name: "Final round", format: "Partner-level interviews (UK: one; Netherlands: three with associate partners or partners); prep sites report a written or group case in some offices", what: "Harder cases, judgment and client readiness." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral questions accompany cases and show up as a separate recruiter conversation. Reports stress collaboration and client-facing skills as well as analytic strength.",
          themes: ["Why strategy consulting", "Why EY-Parthenon", "Collaboration", "Drive and initiative", "Client orientation"],
          examples: [
            "Why EY-Parthenon rather than another strategy firm?",
            "Tell me about working with a difficult teammate.",
            "Describe a time you took ownership beyond your assigned role.",
            "Walk me through an experience that shows analytical rigor.",
          ],
        },
        technical: {
          share: "Roughly half or more of interview time",
          topics: ["Private equity and due diligence cases", "Market entry and growth", "Finance math (payback, IRR, EBITDA multiples)", "Market sizing", "Written case (some offices)"],
          style:
            "Candidate-led: build your own framework, request data and recommend. Reports say some cases take an investor's perspective with quicker, finance-flavored math. Frequency of PE cases varies by office.",
        },
        projects:
          "Expect resume questions in behavioral segments; prepare stories showing analytic work, teamwork and initiative, and any finance or transaction exposure.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Entry-level candidates commonly report two to three rounds; check whether your office adds a group or written case." },
          { roleId: "strategy-associate", notes: "Associate and MBA candidates should expect investor-oriented cases in offices with a transaction focus." },
        ],
        prep: [
          "Learn basic investment metrics: payback, IRR concept, EBITDA multiples and margins.",
          "Practice investor-perspective cases such as whether to acquire a business.",
          "Start case practice several weeks before the application deadline.",
          "Practice speaking your structure aloud and leading with the most important issues first.",
          "Prepare a sincere reason for choosing EY-Parthenon over other strategy firms.",
          "Ask your recruiter whether your office uses a written case.",
        ],
      },
    ],
    sources: [
      { label: "EY Netherlands: students and entry-level Parthenon (official)", url: "https://www.ey.com/en_nl/careers/parthenon/students-and-entry-level" },
      { label: "EY US: EY-Parthenon Associate Program (official)", url: "https://www.ey.com/en_us/careers/parthenon/associate-program" },
      { label: "EY US: interview tips (official)", url: "https://www.ey.com/en_us/careers/interview-tips" },
      { label: "IGotAnOffer: EY-Parthenon case interview", url: "https://igotanoffer.com/blogs/mckinsey-case-interview-blog/ey-parthenon-case-interview" },
      { label: "Casestar: EY-Parthenon consultant interview", url: "https://www.casestar.io/interviews/ey-parthenon/consultant" },
      { label: "Hacking the Case Interview: EY-Parthenon", url: "https://www.hackingthecaseinterview.com/pages/ey-parthenon-case-interview" },
      { label: "My Consulting Offer: EY and EY-Parthenon case interview", url: "https://www.myconsultingoffer.org/?p=153819" },
      { label: "Leland: EY-Parthenon case interview process", url: "https://www.joinleland.com/library/a/the-ultimate-guide-to-the-ey-parthenon-case-interview-process" },
    ],
  },
  {
    companyId: "kpmg",
    summary:
      "KPMG graduate consulting hiring varies by country and practice. KPMG member-firm pages (Sweden, Australia, Turkey, Nigeria, Cambodia) show a common pattern of online tests, an HR or manager interview, sometimes a case-study or group assessment day, and a final partner interview, but stages differ by country, unit and level. Consulting-specific case details come from prep sites.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Online application", format: "Register on the KPMG recruitment system for your country and apply", what: "Resume and eligibility; the first stage is online in most reports." },
          { name: "Online assessment", format: "Aptitude, reasoning and sometimes situational judgment tests", what: "Numerical and verbal reasoning and judgment; details vary by country." },
          { name: "Group or case-style exercise", format: "Group discussion or presentation-style session in some offices", what: "Teamwork, communication and structured thinking under time pressure." },
          { name: "Case interview", format: "Interview with a manager or senior consultant", what: "You analyze a business problem and present a recommendation; market sizing is commonly mentioned." },
          { name: "Partner or final interview", format: "Discussion with a partner, possibly a few short business cases and a culture-fit conversation", what: "Motivation, career goals and cultural fit." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Fit and motivation questions appear in a final interview with HR or a partner and alongside case discussions. Reports are limited, so ask your recruiter for the sequence.",
          themes: ["Motivation for consulting", "Teamwork", "Career goals", "Cultural fit", "Communication"],
          examples: [
            "Why consulting, and why this firm and practice?",
            "Tell me about a time you worked on a group project and what you contributed.",
            "Where do you see your career in a few years?",
            "Describe how you handled a tight deadline.",
          ],
        },
        technical: {
          share: "Varies; case work is a central stage but reports are thin",
          topics: ["Market sizing", "Basic business cases", "Presentation of findings", "Aptitude tests"],
          style:
            "Reports describe a hypothetical business problem you analyze and present, sometimes with typed answers or group presentation. Practicing structured cases and brief presentations is the safest preparation.",
        },
        projects:
          "Resume walk-through and motivation questions are commonly reported. Be ready to explain your experiences and how they relate to the practice you apply to.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Graduate programs commonly start with online testing, then an assessment-style day or interviews; confirm for your country." },
          { roleId: "strategy-associate", notes: "No distinct strategy-associate process was clearly documented; expect case interviews with managers and partners." },
        ],
        prep: [
          "Check the KPMG careers page for your country and program, since the stages differ widely.",
          "Practice numerical and verbal reasoning tests under time limits.",
          "Do a few group-presentation style exercises with peers.",
          "Practice market sizing and a simple structured case.",
          "Prepare why KPMG, why that practice, and your career goals.",
        ],
      },
    ],
    sources: [
      { label: "KPMG Sweden: preparing for your application and interview (official)", url: "https://kpmg.com/se/en/insights/career/prepare-for-your-job-application-and-interview.html" },
      { label: "KPMG Australia: graduate and student careers (official)", url: "https://kpmg.com/au/en/careers/graduates.html" },
      { label: "KPMG Cambodia: selection process (official)", url: "https://kpmg.com/kh/en/home/careers/2021-kpmg-graduate-recruiment-program1/our-selection-process.html" },
      { label: "PrepLounge: KPMG consulting firm profile", url: "https://www.preplounge.com/en/blog/consulting/firms/kpmg" },
      { label: "PrepLounge: KPMG interview", url: "https://www.preplounge.com/en/articles/interview-kpmg" },
      { label: "PrepLounge: KPMG case interview", url: "https://www.preplounge.com/en/articles/kpmg-case-interview" },
      { label: "Leland: KPMG management consulting case interviews", url: "https://joinleland.com/library/a/how-to-prepare-for-kpmg-management-consulting-case-interviews" },
      { label: "Glassdoor: KPMG interview report (Australia)", url: "https://www.glassdoor.com.au/Interview/KPMG-Interview-E2867-RVW102152484.htm" },
    ],
  },
  {
    companyId: "accenture",
    summary:
      "Accenture's careers pages say the usual first step is a phone screen and the rest depends on the role: phone, video or in-person interviews, sometimes an online skills or decision-making activity. It recommends STAR for behavioral interviews and describes case interviews as 45 to 60 minutes judged on structure and communication. Technology roles use a timed online coding assessment. Other stage details vary by region and come from prep sites.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application", format: "Online application and resume", what: "Basic eligibility, academics and interest in an Accenture business." },
          { name: "Online assessment", format: "Cognitive tests, often verbal and abstract reasoning, sometimes a situational judgment test", what: "Reasoning and judgment; the test provider and cut-offs change between hiring drives." },
          { name: "Behavioral interview", format: "Conversation with a recruiter or manager", what: "Cultural fit, motivation and past experiences." },
          { name: "Case interview or group exercise", format: "Business problem discussion, with a group exercise for some consulting roles", what: "Structuring, analysis and a clear actionable recommendation." },
          { name: "Final interview", format: "Managerial or client-facing round, then HR", what: "Overall fit and readiness for client work." },
        ],
        behavioral: {
          star: "expected",
          style:
            "Accenture's own guidance recommends STAR answers and practised, thoughtful responses. Behavioral content is a meaningful part of the process.",
          themes: ["Adaptability", "Innovation", "Teamwork", "Why Accenture", "Client orientation"],
          examples: [
            "Tell me about a time you adapted to a major change.",
            "Describe a project where you worked with a diverse team.",
            "Why Accenture, and why this area of the business?",
            "Give an example of solving a problem with an unconventional approach.",
          ],
        },
        technical: {
          share: "Varies by role; the case is described as the key stage for consulting roles",
          topics: ["Market sizing and estimation", "Business case analysis", "Data interpretation", "Technical topics for technology roles (coding, cloud, networking)"],
          style:
            "Accenture says case success depends on defining the problem, logical structure and communication rather than a single answer, and publishes a case workbook for practice. Technology roles can include a technical assessment and a separate technical interview.",
        },
        projects:
          "Interviewers ask about prior experience and why you want the role. Technology-track candidates should be ready to discuss projects and tools used.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Analyst programs commonly use online cognitive testing, behavioral interviews and a case or group exercise." },
          { roleId: "strategy-associate", notes: "Strategy-focused hiring evidence is thin; confirm the specific practice with your recruiter." },
        ],
        prep: [
          "Practice verbal and abstract reasoning tests under timed conditions.",
          "Prepare STAR stories on adaptability, teamwork and innovation.",
          "Practice market sizing and a structured business case ending in a recommendation.",
          "For technology roles review fundamentals in your target area.",
          "Check your portal for exact test sections, timers and stages, since they change.",
        ],
      },
      {
        group: "consulting",
        label: "Technology / other practice",
        stages: [
          { name: "Online assessments", format: "Cognitive plus technical assessment, sometimes a coding and communication test", what: "Applications, pseudocode, networking, security or cloud fundamentals depending on the drive." },
          { name: "Technical interview", format: "Interview with a technical lead", what: "Depth in your area and approach to problems." },
          { name: "Managerial or client-facing round", format: "Discussion with a manager", what: "Communication, teamwork and fit for client delivery." },
          { name: "HR interview", format: "Final conversation", what: "Motivation, logistics and expectations." },
        ],
        behavioral: {
          star: "expected",
          style: "STAR answers are recommended in the managerial and HR rounds.",
          themes: ["Teamwork", "Adaptability", "Motivation"],
          examples: [
            "Tell me about a technical project you owned.",
            "How do you handle changing requirements?",
            "Why are you interested in this role?",
          ],
        },
        technical: {
          share: "Large for technology tracks",
          topics: ["Coding or pseudocode", "Networking, security and cloud basics", "Common applications"],
          style: "Accenture describes a timed online coding assessment (about 30 to 90 minutes, no outside AI tools unless built in) followed by interviews; format differs by region.",
        },
        projects: "Be ready to discuss projects, tools and your exact contribution in detail.",
        prep: [
          "Review fundamentals for your chosen technology area.",
          "Practise in the HackerRank environment Accenture points to for its coding assessment.",
          "Prepare to explain one project end to end.",
        ],
      },
    ],
    sources: [
      { label: "Accenture careers: recruiting and hiring process (official)", url: "https://www.accenture.com/us-en/careers/explore-careers/area-of-interest/journey-to-accenture" },
      { label: "Accenture careers: how to prepare for a behavioral interview (official)", url: "https://www.accenture.com/us-en/blogs/blogs-careers/how-to-prepare-for-a-behavioral-interview" },
      { label: "Accenture case interview workbook (official PDF)", url: "https://www.accenture.com/content/dam/accenture/final/a-com-migration/manual/r2-2-r2-3/pdf/careers/pdf-14/Accenture-FY19-Case-Workbook.pdf" },
      { label: "PrepLounge: Accenture interview", url: "https://www.preplounge.com/en/articles/interview-accenture" },
      { label: "PrepLounge: Accenture application process", url: "https://www.preplounge.com/en/articles/accenture-application-process" },
      { label: "PrepLounge: Accenture firm profile", url: "https://www.preplounge.com/en/blog/consulting/firms/accenture" },
      { label: "Goodspace: Accenture interview questions", url: "https://goodspace.ai/interview-questions/accenture" },
      { label: "CareerTestPrep: Accenture aptitude test", url: "https://www.careertestprep.com/knowledge/accenture-aptitude-test" },
    ],
  },
  {
    companyId: "oliver-wyman",
    summary:
      "Oliver Wyman's careers pages describe a conversational fit interview about your background and goals plus interactive case interviews, and publish practice cases with hints and evaluation criteria. Its Latin America page lists a short fit interview then two rounds of two case interviews. Financial-services emphasis, numerical tests and case presentations come from third-party reports and vary by office.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application and resume screen", format: "Online application with resume and cover letter", what: "Described as the most competitive step; academics, leadership and quantitative strength." },
          { name: "Online numerical test", format: "Reportedly 20 to 30 minutes in some offices", what: "Numerical reasoning. Sources conflict on whether it is still used, so ask your recruiter." },
          { name: "First round", format: "Commonly one case and one behavioral interview with associates or engagement managers", what: "Structuring, math and communication, plus fit." },
          { name: "Final round or selection day", format: "Commonly one or two cases, a fit interview, and for some candidates a case presentation, each 30 to 45 minutes", what: "Senior-level assessment with principals or partners of analysis, judgment and fit." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "The firm describes the fit part as a conversation about your accomplishments, experiences, interests and career goals, where you can also ask questions. Reports suggest it is a dedicated interview rather than only an opener.",
          themes: ["Resume depth", "Why consulting", "Leading through difficulty", "Team conflict", "Resilience"],
          examples: [
            "Tell me about yourself and why consulting.",
            "Describe a time you faced adversity and how you responded.",
            "Tell me about managing conflict inside a team.",
            "What accomplishment are you proudest of and why?",
          ],
        },
        technical: {
          share: "Roughly half or more of the process",
          topics: ["Candidate-led cases", "Financial services topics (net interest margin, loss and combined ratios, return on equity)", "Market sizing", "Math and exhibit interpretation", "Case presentation (some candidates)"],
          style:
            "Candidate-led cases similar in style to other strategy firms. Oliver Wyman advises treating the interviewer as a client, collaborating, spotting priority issues quickly and opening your recommendation with a clear answer in 30 to 60 seconds. It provides sample cases on its website. Learn basic financial-services vocabulary in advance.",
        },
        projects:
          "Fit interviews are experience-driven and often start from the resume. Prepare detailed accounts of leadership and difficult moments, including your own decisions.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Undergraduate analysts commonly report the resume screen, possible numerical test and a two-round interview process." },
          { roleId: "strategy-associate", notes: "Associate candidates face a similar case-and-fit structure, with financial services and industry exposure helpful." },
        ],
        prep: [
          "Work through the firm's published sample cases (dairy farm, oil and gas pricing, supermarket pharmacy, autism device) and practise a 30 to 60 second recommendation.",
          "Learn core financial-services metrics before your first interview.",
          "Practice candidate-led cases and quick math.",
          "Prepare experience-based stories about adversity, leadership and team conflict.",
          "Ask whether a numerical test or case presentation applies to your office.",
          "Practice a short case presentation in case your final round includes one.",
        ],
      },
    ],
    sources: [
      { label: "Oliver Wyman careers: interview preparation (official)", url: "https://www.oliverwyman.com/jp/careers/entry-level/interview-preparation.html" },
      { label: "Oliver Wyman careers: dairy farm practice case (official)", url: "https://www.oliverwyman.com/careers/entry-level/interview-preparation/dairy-farm-case-interview.html" },
      { label: "Oliver Wyman careers: Latin America entry-level (official)", url: "https://www.oliverwyman.com/careers/entry-level/latin-america.html" },
      { label: "IGotAnOffer: Oliver Wyman case interview", url: "https://igotanoffer.com/blogs/mckinsey-case-interview-blog/oliver-wyman-case-interview" },
      { label: "Hacking the Case Interview: Oliver Wyman", url: "https://www.hackingthecaseinterview.com/pages/oliver-wyman-case-interview" },
      { label: "Final Round AI: Oliver Wyman interview process", url: "https://www.finalroundai.com/blog/oliver-wyman-interview-process" },
      { label: "PrepLounge: Oliver Wyman first round London thread", url: "https://www.preplounge.com/en/consulting-forum/oliver-wyman-first-round-london-2915?reply=1" },
      { label: "Glassdoor: Oliver Wyman interview report", url: "https://www.glassdoor.com.mx/Entrevista/Oliver-Wyman-Entrevista-E40206-RVW828620.htm" },
    ],
  },
  {
    companyId: "lek",
    summary:
      "L.E.K. says selected candidates attend several rounds mixing case studies and questions about your background, varying by region and level. L.E.K.'s interview preparation page says rounds mix experiential and case interviews, with quantitative and strategic cases both possible, and advises restating assumptions, structuring and stating hypotheses. Associate blog accounts mention psychometric or math tests. Round counts and the digital assessment come from older or third-party reports.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "consulting",
        label: "Business analyst / associate",
        stages: [
          { name: "Application and resume screen", format: "Online application via the L.E.K. site", what: "Academics, experience and interest in the firm. Verify office and campus deadlines." },
          { name: "Digital assessment", format: "Online games reported to test pattern recognition and simple math", what: "Reasoning skills; reported as added around 2020, so confirm it applies to you." },
          { name: "First round", format: "Commonly two to three interviews, each reported as case plus fit", what: "Often a market sizing and a candidate-led business case." },
          { name: "Final round", format: "Further case-and-fit interviews with senior staff, including partners", what: "Deeper fit and harder cases; count varies by region and level." },
        ],
        behavioral: {
          star: "helpful",
          style:
            "L.E.K. says interviews include questions about professional background. Fit is commonly attached to each case interview rather than held separately, with HR-style fit in some offices.",
          themes: ["Background and motivation", "Why consulting and why L.E.K.", "Teamwork", "Leadership", "Business interest"],
          examples: [
            "Walk me through your resume and how you got here.",
            "Why L.E.K. and why consulting?",
            "Tell me about a time you led others.",
            "What business topic or industry are you most curious about?",
          ],
        },
        technical: {
          share: "Majority of each interview",
          topics: ["Market sizing (often top-down)", "Candidate-led business case", "Quantitative analysis", "Recommendation"],
          style:
            "Usually a market-sizing exercise plus a structured candidate-led case; the interviewer may still steer. Older reports mention a GMAT-style test that may no longer apply.",
        },
        projects:
          "Expect resume-based questions about your background. Be ready to explain the motivation behind each major experience and what you learned.",
        roleNotes: [
          { roleId: "business-analyst", notes: "Associate and analyst entry roles are reported to follow the digital assessment then case-and-fit rounds, with variation by region." },
          { roleId: "strategy-associate", notes: "Experienced or MBA candidates commonly report additional fit rounds with directors and partners; process depends on level." },
        ],
        prep: [
          "Practice both a top-down market sizing and a structured candidate-led case.",
          "Prepare to link your background to why consulting and L.E.K.",
          "Try pattern-recognition and quick-math practice for the digital assessment.",
          "Read the firm's apply page and ask the recruiter about the exact steps for your region.",
          "Rehearse a clear recommendation at the end of every case.",
        ],
      },
    ],
    sources: [
      { label: "L.E.K. careers: interview preparation (official)", url: "https://www.lek.com/careers/apply/interview-preparation" },
      { label: "L.E.K. blog: London interview process (official)", url: "https://www.lek.com/careers/life-lek-blog/london-lek-interview-process-tom-adams" },
      { label: "L.E.K. Consulting: apply", url: "https://www.lek.com/apply" },
      { label: "Case Interview: L.E.K. profile", url: "https://caseinterview.com/lek-consulting" },
      { label: "PrepLounge: L.E.K. consulting thread", url: "https://www.preplounge.com/en/consulting-forum/lek-consulting-9684" },
      { label: "PrepLounge: L.E.K. first round thread", url: "https://www.preplounge.com/en/consulting-forum/lek-first-round-2688" },
      { label: "PrepLounge: preparing for L.E.K. thread", url: "https://www.preplounge.com/consulting-forum/anyone-preparing-for-lek-278" },
    ],
  },
];
