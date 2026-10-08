import type { CompanyGuide } from "./types";

export const engD: CompanyGuide[] = [
  {
    companyId: "bechtel",
    summary:
      "Bechtel publishes a short early-career path: resume screen, a situational strengths assessment (US/UK), a recruiter pre-screen, then a hiring manager interview. Candidate reports describe resume-driven technical and competency questions, with extra written or group stages in some countries.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Early-career engineer (intern / new grad)",
        stages: [
          { name: "Application and resume screen", format: "Online application, ideally via campus or career fair contact", what: "Recruiters compare your degree, experience and discipline against the posting. Bechtel advises a resume of two pages or fewer and applying only to roles that match your degree." },
          { name: "Situational strengths assessment", format: "Online test for US and UK candidates, followed by a personal feedback report", what: "Judgment-style scenarios about how you would act at work. It is a screen for fit, not a technical exam." },
          { name: "Recruiter pre-screen", format: "Phone call with university relations", what: "Covers coursework, past experience, campus involvement, location and timing. A chance to ask about role requirements." },
          { name: "Hiring manager interview", format: "Video or on-site conversation, often about an hour", what: "Technical fundamentals tied to your resume and projects plus motivation and behavioral questions. Some UK reports describe separate technical and competency interviews, and some India campus reports add a written test and group discussion." },
          { name: "Offer", format: "Recruiter follow-up", what: "Offers for interns and new grads are usually tied to project or office placement; expect questions on location flexibility and start date." },
        ],
        behavioral: {
          star: "expected",
          style:
            "Competency-style questions about past experiences, run by recruiters and the hiring manager. Some UK candidates were told the competencies in advance. Weight is substantial because technical questions are mostly drawn from your own background.",
          themes: ["Receiving feedback", "Handling competing priorities", "Learning fast", "Conflict in a team", "Motivation for construction and infrastructure"],
          examples: [
            "Tell me about feedback that was hard to hear and what you changed afterward.",
            "Describe a project where you balanced more than one priority at once.",
            "Give an example of picking up an unfamiliar skill on a short timeline.",
            "Walk me through a disagreement on a team and how it got resolved.",
            "Why do you want to work on large projects, and why this business line?",
          ],
        },
        technical: {
          share: "Roughly half of the hiring manager conversation, mostly anchored to your resume",
          topics: ["Discipline fundamentals (thermal, structural, civil or process as applicable)", "Capstone or final-year project", "Internship tasks and tools", "Basic project delivery concepts"],
          style: "Conversational technical questions from the hiring manager; reports mention questions on a final-year project and thermal engineering basics. No coding-style tests were reported.",
        },
        projects:
          "Heavily probed. Several reports say questions began from the resume or final-year project. Be ready to explain your role, decisions, numbers and what you would change, and to describe any tools or codes you used.",
        roleNotes: [
          { roleId: "project-engineer", notes: "Expect questions on schedule, cost, coordination across disciplines and working with field teams. Large-project exposure and teamwork stories carry weight." },
          { roleId: "design-engineer", notes: "Know the design basics for your discipline, standards you used in coursework, and how you checked your calculations." },
          { roleId: "process-engineer", notes: "Review mass and energy balances, P&IDs and heat-exchanger basics for plant and LNG-type work." },
        ],
        prep: [
          "Read the hiring process page on Bechtel's site and complete the situational strengths test thoughtfully; it comes before any human contact.",
          "Trim your resume to two pages and be able to defend every line in detail.",
          "Prepare five or six STAR stories: feedback, deadline pressure, conflict, fast learning, a challenging project, safety or quality.",
          "Rehearse a two-minute walkthrough of your capstone or biggest project, including the numbers.",
          "Refresh fundamentals for your degree discipline; the technical part is conversational but specific.",
          "Be clear about location and travel flexibility; project assignments can mean relocation.",
          "Have a concrete answer for why Bechtel and which sector (infrastructure, energy, nuclear, mining).",
        ],
      },
    ],
    sources: [
      { label: "Bechtel hiring process (official)", url: "https://bechtel.com/about/life-at-bechtel/hiring-process" },
      { label: "Glassdoor Bechtel interview report (UK graduate)", url: "https://www.glassdoor.co.uk/Interview/Bechtel-Interview-E2731-RVW5016039.htm" },
      { label: "Glassdoor Bechtel interview report", url: "https://www.glassdoor.co.in/Interview/Bechtel-Interview-E2731-RVW102057880.htm" },
      { label: "Glassdoor Bechtel project engineer interviews", url: "https://static.glassdoor.co.in/Interview/Bechtel-Project-Engineer-Interview-Questions-EI_IE2731.0,7_KO8,24.htm" },
    ],
  },
  {
    companyId: "aecom",
    summary:
      "AECOM graduate hiring commonly combines an HR screen, a technical interview tied to your projects, and a competency discussion, with online reasoning tests or an assessment day in some regions. Evidence is self-reported and varies a lot by country.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Graduate engineer (civil, environmental, mechanical)",
        stages: [
          { name: "Online application", format: "Careers portal, often tied to a graduate scheme or campus event", what: "Resume and sometimes a cover letter; screening for degree, discipline and location." },
          { name: "Online tests or video screen", format: "Numerical reasoning and personality tests, or a recorded video, depending on region", what: "Reported in several regions, mostly outside the US; treat as possible rather than universal." },
          { name: "HR screen", format: "Short phone or video call", what: "Background, interest in the role, location and start date." },
          { name: "Technical interview", format: "About an hour with one or two engineers", what: "Discipline questions and a detailed walk through your capstone, coursework and internships." },
          { name: "Competency interview or assessment day", format: "Panel conversation, sometimes a group exercise at an assessment centre", what: "Teamwork, leadership, problem-solving and working under pressure." },
          { name: "Offer and checks", format: "Recruiter call, background check", what: "Reports mention background checks and sometimes drug screening; total time often a month or two." },
        ],
        behavioral: {
          star: "expected",
          style: "Competency-based questions, frequently from two interviewers, with many follow-ups on your CV. Roughly equal in weight to the technical conversation.",
          themes: ["Teamwork", "Leadership", "Problem-solving", "Client and deadline pressure", "Interest in sustainability and infrastructure"],
          examples: [
            "Tell me about yourself and how your experience relates to this role.",
            "Describe a time you led others on a group project.",
            "Give an example of a hard problem you solved and your part in it.",
            "Share a time you handled a tight deadline with several demands.",
            "Why consulting and design work rather than contracting or industry?",
          ],
        },
        technical: {
          share: "About half of the interview time",
          topics: ["Discipline fundamentals (geotechnical, structural, water, transportation or environmental)", "Capstone design project", "Design software and codes used", "Numerical reasoning if tested"],
          style: "Face-to-face or video questions based on your resume; reports include discipline-specific questions such as ground and excavation support concepts. Written tests appear in some regions only.",
        },
        projects:
          "Core of the technical discussion. Reports repeatedly mention capstone or final-year project questions. Know the design basis, your calculations, alternatives considered and results.",
        roleNotes: [
          { roleId: "design-engineer", notes: "Likely the default role: expect discipline fundamentals, design standards and software familiarity." },
          { roleId: "project-engineer", notes: "Emphasis on coordination, deadlines, client communication and tracking scope and budget." },
          { roleId: "systems-engineer", notes: "Relevant mainly for transportation and infrastructure technology teams; be ready to discuss requirements and integration." },
        ],
        prep: [
          "Practice numerical reasoning tests in case your region uses them.",
          "Know your capstone or internship project well enough to answer five layers of follow-up questions.",
          "Prepare STAR examples for teamwork, leadership and problem-solving.",
          "Review core fundamentals in your discipline and any codes you cited in coursework.",
          "Study AECOM's current projects and sectors so your why-AECOM answer is specific.",
          "Ask your recruiter whether there is an assessment day and what it contains.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor AECOM graduate engineer interviews", url: "https://static.glassdoor.ie/Interview/AECOM-Graduate-Engineer-Interview-Questions-EI_IE5632.0,5_KO6,23.htm" },
      { label: "Glassdoor AECOM interview report (UK)", url: "https://www.glassdoor.co.uk/Interview/AECOM-Interview-E5632-RVW6078724.htm" },
      { label: "Glassdoor AECOM interview report (AU)", url: "https://www.glassdoor.com.au/Interview/AECOM-Interview-E5632-RVW2526362.htm" },
      { label: "Glassdoor AECOM interview report", url: "https://www.glassdoor.co.in/Interview/AECOM-Interview-E5632-RVW8690085.htm" },
    ],
  },
  {
    companyId: "jacobs",
    summary:
      "Jacobs graduate hiring, per limited candidate reports, uses an online or recorded screen, then group or panel work and a one-to-one competency interview with a couple of technical questions. Formats differ by office and country, and sample sizes are small.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Graduate engineer",
        stages: [
          { name: "Online application", format: "Careers portal", what: "Resume and basic eligibility screening for a graduate programme or intern role." },
          { name: "Recorded video or online screen", format: "Self-recorded video introduction or short online test (reported in the UK)", what: "Early motivation and communication check; some candidates were surprised they could re-record." },
          { name: "Group exercise or presentation", format: "Assessment-style session, around 15 to 30 minutes of group work (older UK report)", what: "Teamwork on a short design-type problem, such as a sustainable housing brief, followed by a presentation." },
          { name: "One-to-one or panel interview", format: "About an hour with a section lead and another engineer", what: "Mostly competency and motivation questions with a small number of technical questions." },
          { name: "Offer", format: "Recruiter contact", what: "Timing varies from weeks to a couple of months depending on office." },
        ],
        behavioral: {
          star: "expected",
          style: "Competency-based, with interviewers following up on your answers in depth. Carries most of the weight in the final interview.",
          themes: ["Why Jacobs and why engineering", "Sustainability", "Teamwork and disagreement", "Innovation", "Time management"],
          examples: [
            "Why this role, and how much does sustainability matter to you?",
            "Tell me about a team disagreement and how it ended.",
            "Give an example of an innovative solution you came up with.",
            "Describe how you managed your time during a heavy workload.",
            "Why Jacobs over other consultancies?",
          ],
        },
        technical: {
          share: "A minority of the final interview, with more in any written or group stage",
          topics: ["Discipline basics", "Project and coursework experience", "Short problem solving in group tasks"],
          style: "A few technical questions inside a competency interview; some offices add a skills test or group design task.",
        },
        projects:
          "Moderately probed. Reviewers say interviewers dug into the details of your answers, so choose project examples you can explain thoroughly.",
        roleNotes: [
          { roleId: "design-engineer", notes: "Expect questions on design approach and fundamentals for your discipline." },
          { roleId: "project-engineer", notes: "Show examples of planning, coordination and managing deliverables." },
          { roleId: "process-engineer", notes: "For water, chemical or industrial teams, review process basics and flow diagrams." },
        ],
        prep: [
          "Practice talking to a camera in case there is a recorded screen.",
          "Write specific answers for why Jacobs and which sector interests you.",
          "Prepare STAR stories on teamwork, innovation, time management and conflict.",
          "Be ready to collaborate and present in a short group task.",
          "Refresh discipline fundamentals for a couple of technical questions.",
          "Check your office's process with the recruiter, since reports vary widely.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor Jacobs graduate engineer interviews", url: "https://api.glassdoor.com/Interview/Jacobs-Graduate-Engineer-Interview-Questions-EI_IE913.0,6_KO7,24.htm" },
      { label: "Glassdoor Jacobs interview report (UK)", url: "https://static.glassdoor.co.uk/Interview/Jacobs-Interview-E913-RVW19059171.htm" },
      { label: "Glassdoor Jacobs interview report", url: "https://www.glassdoor.ie/Interview/Jacobs-Interview-E913-RVW87200278.htm" },
    ],
  },
  {
    companyId: "kiewit",
    summary:
      "Kiewit hires heavily from campus career fairs and internships. Candidate reports describe a recruiter or video screen, a call with field leadership, and an in-person interview with project managers, focused on personality, resilience and basic construction knowledge. Most public reports are older.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Field or project engineer (intern / new grad)",
        stages: [
          { name: "Career fair or application", format: "Campus event or online application", what: "Recruiters collect resumes; some candidates were offered an interview the next day." },
          { name: "Recorded or live screen", format: "HireVue-style recorded questions, or a recruiter phone call", what: "Basic motivation, availability and willingness to work on a jobsite." },
          { name: "Call with local leadership", format: "Phone call with a superintendent or similar", what: "Discusses project work and what field life looks like." },
          { name: "In-person or panel interview", format: "Visit to an office or site; panels of two to six people reported", what: "Mix of open behavioral questions and technical questions about construction practices, drawings and materials." },
          { name: "Offer", format: "Recruiter call", what: "Timelines reported from a few days to two months. Placement depends on project needs and often means travel or relocation." },
        ],
        behavioral: {
          star: "helpful",
          style: "Often conversational or panel-style, probing how you handle people, adversity and responsibility. Questions can be fairly open-ended.",
          themes: ["Hard work and resilience", "Teamwork with crews", "Overcoming obstacles", "Pride in accomplishments", "Knowledge of Kiewit"],
          examples: [
            "Tell us about yourself and what you know about the company.",
            "What accomplishment are you most proud of and why?",
            "Describe the hardest obstacle you have overcome.",
            "How do you work with people who have far more field experience than you?",
            "Why field work rather than an office role?",
          ],
        },
        technical: {
          share: "Smaller part of early rounds; larger when you meet project managers",
          topics: ["Construction materials and quantities", "Bridge or structural basics", "Reading drawings", "Scheduling and cost basics"],
          style: "Practical questions from project managers, for example how structural elements work or how to order materials. Not a formal exam in most reports.",
        },
        projects:
          "Moderate. Interviewers like hands-on experience such as prior internships, trades work or site jobs. Be ready to describe what you did physically and how it contributed.",
        roleNotes: [
          { roleId: "project-engineer", notes: "The typical entry path: field engineer duties include quantities, subcontractor coordination, schedules and documentation. Be ready for questions on cost and schedule." },
          { roleId: "design-engineer", notes: "Applies to estimating or engineering groups; know basic design concepts and how they link to constructability." },
        ],
        prep: [
          "Attend campus career fairs and follow up quickly; offers can come fast.",
          "Practice recorded video answers on camera with a time limit.",
          "Show interest in field work, travel and relocation, and say so plainly.",
          "Review basics: concrete, steel, earthwork, reading plans and quantity take-offs.",
          "Prepare stories about hard work, safety attitude and working with crews.",
          "Research Kiewit's markets and recent projects.",
          "Ask your school whether the FE/EIT exam is expected after hire.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor Kiewit interview report", url: "https://www.glassdoor.ie/Interview/Kiewit-Corporation-Interview-E2935-RVW831714.htm" },
      { label: "Glassdoor Kiewit interview report (UK)", url: "https://www.glassdoor.co.uk/Interview/Kiewit-Corporation-Interview-E2935-RVW831714.htm" },
      { label: "Glassdoor Kiewit interview report (Canada, FR)", url: "https://fr.glassdoor.ca/Entretien/Kiewit-Corporation-Entretien-E2935-RVW5328156.htm" },
      { label: "Glassdoor Kiewit interview questions", url: "https://static.glassdoor.com.mx/Interview/Kiewit-Corporation-Interview-Questions-E2935_P184.htm" },
    ],
  },
  {
    companyId: "dow",
    summary:
      "Dow recruits through campus career fairs and info sessions, with interviews that skew toward behavioral STAR questions plus some technical or research discussion. Onsite rounds for interns or new grads can include presentations and several one-to-one or panel conversations.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Chemical / process / mechanical engineer (intern / new grad)",
        stages: [
          { name: "Career fair and application", format: "Campus event, info session, online application", what: "Resume submitted; Dow advises tailoring your resume to each role." },
          { name: "Screening interview", format: "On-campus or video, about 40 to 45 minutes", what: "Reported as roughly 60 percent behavioral and 40 percent research or project discussion." },
          { name: "HR qualification call", format: "Phone call", what: "Reported at some sites: basic fit, location, availability." },
          { name: "Site or onsite interviews", format: "Hiring manager plus panel or several one-to-ones; sometimes a presentation", what: "Technical and behavioral mix. Some candidates gave a 45 minute presentation with Q&A; others met three or four engineers." },
          { name: "Offer", format: "Recruiter call", what: "Timing varies; some candidates were held in a pool and toured several sites before an offer." },
        ],
        behavioral: {
          star: "expected",
          style: "Structured STAR-type questions, often the majority of the screening interview, covering skills such as problem-solving, teamwork and emotional intelligence.",
          themes: ["Safety", "Teamwork", "Problem-solving", "Leadership", "Dealing with challenges and failure"],
          examples: [
            "What was your biggest challenge and how did you handle it?",
            "Tell me about working with a difficult teammate.",
            "Describe a failure and what you learned.",
            "How would you make sure safety rules are followed, personally and as a leader?",
            "Why chemical engineering, and why Dow?",
          ],
        },
        technical: {
          share: "About 30 to 40 percent in screening, more in site interviews",
          topics: ["Distillation", "Fluid flow and piping basics", "Heat transfer", "Troubleshooting from a process diagram", "Software skills such as CAD"],
          style: "Basic fundamentals questions, research or project discussion, and occasionally a diagram-based troubleshooting question (for example a leak on a tank and piping system).",
        },
        projects:
          "Substantial, especially for research-oriented candidates. Be able to explain your research or internship in plain language and to a technical audience, with results.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Core role. Expect separations, reactors, heat and mass balances, and plant troubleshooting scenarios." },
          { roleId: "quality-engineer", notes: "Know basic statistics, root cause tools and how you would respond to an out-of-spec result." },
          { roleId: "design-engineer", notes: "Mechanical candidates may be asked about CAD tools and equipment or piping design basics." },
        ],
        prep: [
          "Attend the career fair and info session; many candidates were interviewed from that contact.",
          "Prepare STAR stories, including a safety-related example.",
          "Review distillation, fluid flow and heat transfer fundamentals.",
          "Practice a 10 to 15 minute presentation of your research or internship, plus Q&A.",
          "Read Dow's stated values and connect answers to them.",
          "Be flexible on site and relocation; assignments may be at plants such as Midland or the Gulf Coast.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor Dow interview report (campus)", url: "https://www.glassdoor.com/Interview/Dow-Interview-E207-RVW2438369.htm" },
      { label: "Glassdoor Dow interview report (college)", url: "https://static.glassdoor.fr/Interview/Dow-Interview-E207-RVW12192539.htm" },
      { label: "Glassdoor Dow interview report (STAR, diagram)", url: "https://www.glassdoor.co.uk/Interview/Dow-Interview-E207-RVW41818747.htm" },
      { label: "Dow early career job-hunt guide", url: "https://www.jobteaser.com/es/companies/dow/newsfeed/f0b8bb4b-61fd-4c2b-a3e7-780c29c85401-mastering-the-job-hunt-our-guide-for-early-career-job-seekers" },
    ],
  },
  {
    companyId: "exxonmobil",
    summary:
      "ExxonMobil recruits mostly through universities. Reports describe campus interviews led by behavioral questions, then a callback with a sequence of interviews with managers and engineers, plus an aptitude assessment for some roles. Interviews emphasize individual contribution and communication.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineer (intern / new grad, chemical, mechanical, civil)",
        stages: [
          { name: "Campus application", format: "University recruiting portal, career fair", what: "Resume, sometimes a cover letter, submitted in advance. Online applications outside campus channels are less common per reports." },
          { name: "Preliminary assessment", format: "Online aptitude or technical tests, role and location dependent", what: "Emailed after resume screen when required; check spam folders." },
          { name: "First interview", format: "On campus or phone, often about an hour with an alumnus or engineer", what: "Mostly behavioral STAR questions about your internships and teamwork, with some open technical questions." },
          { name: "Second-round / callback", format: "Phone, video or onsite day with about four to five 45 minute interviews", what: "Interviews with managers and engineers, some technical, and a chat with a department head; focus on fit with the team." },
          { name: "Review and offer", format: "Group recommendation, manager confirmation", what: "Interviewers jointly review and a manager confirms. Timelines range from days to a couple of months." },
        ],
        behavioral: {
          star: "expected",
          style: "Long structured behavioral interviews emphasizing your own actions and results. Exxon says its leadership interviews look at your ability to work in teams and across disciplines.",
          themes: ["Teamwork across disciplines", "Individual accomplishment", "Leadership", "Communication to non-experts", "Why ExxonMobil over other energy companies"],
          examples: [
            "Describe a team project where you took responsibility and the results.",
            "How would you explain a technical idea to someone outside engineering?",
            "Tell me about a challenge during an internship.",
            "Why ExxonMobil rather than a competitor?",
            "Give an example of leading without formal authority.",
          ],
        },
        technical: {
          share: "Moderate: some questions in rounds one and two, heavier in onsite engineering interviews",
          topics: ["Distillation and hydraulics", "Basic reactions", "Discipline fundamentals", "Research presentation for graduate candidates"],
          style: "Open-ended fundamentals questions, plus a research or thesis presentation to a panel for PhD and MS candidates.",
        },
        projects:
          "High. Interviewers question internships and project roles closely; focus on what you did personally rather than the team.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Refinery and chemical plant roles lean on distillation, hydraulics and reactions; expect field-oriented fundamentals." },
          { roleId: "project-engineer", notes: "Expect scheduling, cost and cross-functional teamwork questions; capital project roles value coordination." },
          { roleId: "systems-engineer", notes: "Relevant to integrated facilities; discuss requirements, interfaces and troubleshooting." },
        ],
        prep: [
          "Apply through your campus recruiting channel as early as possible.",
          "Watch for assessment emails after your resume screen.",
          "Prepare STAR stories that spotlight your individual contribution.",
          "Practice explaining a technical topic to a non-technical person.",
          "Refresh unit operations and fluid basics if aiming at refinery or plant roles.",
          "Have a thought-out answer on why ExxonMobil and why the energy industry.",
          "Expect relocation and rotational-style assignments, and be ready to discuss flexibility.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor ExxonMobil interview report", url: "https://www.glassdoor.co.nz/Interview/ExxonMobil-Interview-E237-RVW2333861.htm" },
      { label: "Glassdoor ExxonMobil interview report (CA)", url: "https://www.glassdoor.ca/Interview/ExxonMobil-Interview-E237-RVW1171567.htm" },
      { label: "Glassdoor ExxonMobil internship interviews", url: "https://static.glassdoor.co.nz/Interview/ExxonMobil-Internship-Interview-Questions-EI_IE237.0,10_KO11,21.htm" },
      { label: "Glassdoor ExxonMobil interview report (campus, assessment)", url: "https://www.glassdoor.ie/Interview/ExxonMobil-Interview-E237-RVW2700180.htm" },
    ],
  },
  {
    companyId: "chevron",
    summary:
      "Chevron intern hiring is often fast: a career fair contact, then a short interview with engineers using STAR-style and resume questions. Public evidence is thin, with some roles reportedly including an aptitude test and central recruiting review.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Engineering intern / new grad",
        stages: [
          { name: "Career fair or application", format: "Campus event or online portal", what: "Resume screen; some candidates scheduled an interview for the next day." },
          { name: "Aptitude test", format: "Online test, reported for some roles", what: "An IQ or aptitude-style assessment appears in a couple of reports; not confirmed for all roles." },
          { name: "Engineer interview", format: "One-on-one or small panel with two engineers, about 30 to 60 minutes", what: "STAR-style questions and a walk through resume projects." },
          { name: "Central review", format: "Recruiting team decision", what: "Feedback goes to a central recruiting group that decides at the end of the cycle." },
          { name: "Offer", format: "Recruiter contact", what: "Timing ranges from days for internships to about a month overall." },
        ],
        behavioral: {
          star: "expected",
          style: "Short, resume-linked behavioral discussion with practicing engineers; much of the evaluation rides on this conversation.",
          themes: ["Technical problem-solving on projects", "Learning from challenges", "Motivation and company knowledge", "Teamwork"],
          examples: [
            "Describe a time you applied technical skills on a project.",
            "Pick a challenge on your resume and explain how you handled it.",
            "Tell me about being challenged and what you learned.",
            "Why should we choose you for this internship?",
            "What do you know about Chevron and its businesses?",
          ],
        },
        technical: {
          share: "Smaller part of early interviews, integrated into resume discussion",
          topics: ["Discipline fundamentals", "Project technical detail", "Basic facilities or process concepts"],
          style: "Conversational technical questions from engineers; no formal coding or case exercise was reported.",
        },
        projects:
          "High. Reported questions center on projects and experiences on your resume; be ready to dive into technical details.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Expect process and facilities fundamentals for refinery or upstream facilities roles." },
          { roleId: "project-engineer", notes: "Facilities engineering intern roles emphasize project work on your resume and coordination." },
          { roleId: "quality-engineer", notes: "Be ready to discuss inspection, reliability or compliance work from any internship." },
        ],
        prep: [
          "Be at the career fair and ready for a same-day or next-day interview.",
          "Prepare STAR stories grounded in resume projects.",
          "Know your project data well enough to explain it simply.",
          "Research Chevron's business segments and a recent project or initiative.",
          "Practice an aptitude test in case one is required.",
          "Highlight safety awareness and willingness to work at field sites or relocate.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor Chevron interview report", url: "https://www.glassdoor.com/Interview/Chevron-Interview-E13524-RVW35974707.htm" },
      { label: "Glassdoor Chevron interview report (2)", url: "https://www.glassdoor.com/Interview/Chevron-Interview-E13524-RVW34948375.htm" },
      { label: "Glassdoor Chevron interview report (3)", url: "https://www.glassdoor.com/Interview/Chevron-Interview-E13524-RVW93037607.htm" },
    ],
  },
  {
    companyId: "procter-gamble",
    summary:
      "P&G opens with online assessments, including a values-based situational test and timed reasoning screens, then interviews that are consistently behavioral, with a structured Context-Action-Result style. Plant roles add a site tour and final interview. Formal consulting-style cases are not clearly reported for engineering.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Process / manufacturing engineer",
        stages: [
          { name: "Application", format: "Online application or campus event", what: "Resume and screening questions." },
          { name: "Online assessments", format: "Values-based situational test (reported as PEAK) and a timed reasoning screen; some regions use a longer global reasoning exam", what: "Numerical, logical and figural reasoning, plus scenario judgment aligned with P&G values. Failing typically ends the process, often without feedback." },
          { name: "Phone screen", format: "Short HR or recruiter call", what: "Background and motivation; skill assessment reported in some 2026 accounts." },
          { name: "Main interview", format: "About 45 to 60 minutes with a few structured questions", what: "Around six behavioral questions answered in a structured format, probing leadership, teamwork and problem-solving." },
          { name: "Site visit and final interview", format: "Plant tour plus one or two additional interviews with two interviewers each", what: "More behavioral questions on your experience and fit with the site; reports of a 4-month process on one engineer page, though timing varies." },
          { name: "Offer", format: "Recruiter call", what: "Timing differs widely by location and role." },
        ],
        behavioral: {
          star: "expected",
          style: "Highly structured and central. Interviewers repeat similar questions across rounds to check consistency, and look for concrete examples with results.",
          themes: ["Leadership", "Teamwork", "Problem-solving", "Handling difficulty", "P&G values and culture"],
          examples: [
            "Tell me about a time you led others toward a goal.",
            "Describe a problem you solved and how you decided what to do.",
            "Give an example of working with someone with a different view.",
            "Tell me about a difficult situation and what you did.",
            "Describe a time you took initiative beyond your assigned duties.",
          ],
        },
        technical: {
          share: "Small, mostly in the form of resume discussion and any role skill assessment",
          topics: ["Reasoning tests", "Discipline fundamentals", "Manufacturing and troubleshooting concepts"],
          style: "No formal engineering case reported; the reasoning tests act as the quantitative screen and interviews probe technical understanding through your experience.",
        },
        projects:
          "Interviewers cover your experience thoroughly across rounds. Prepare to describe results, your role and how you led.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Typical plant role: expect talk of continuous improvement, troubleshooting a line and working with operators." },
          { roleId: "quality-engineer", notes: "Know statistical process control and root cause analysis, and how you would handle a quality escape." },
          { roleId: "project-engineer", notes: "Manufacturing capital and packaging line projects: scope, schedule and cross-team work." },
          { roleId: "systems-engineer", notes: "Possible on automation or supply-chain-linked teams; discuss systems thinking and integration." },
        ],
        prep: [
          "Practice timed numerical, logical and figural reasoning tests.",
          "Read P&G's stated values before the situational assessment.",
          "Build six to eight concrete stories organized as context, action, result, with measurable outcomes.",
          "Rehearse concise answers; interviewers want focus, not long narrations.",
          "Expect to tour a plant and talk with site engineers; prepare plant-floor questions.",
          "Be flexible on location and openness to rotational assignments.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor P&G interview report (reasoning tests)", url: "https://www.glassdoor.co.uk/Interview/Procter-and-Gamble-Interview-E544-RVW636862.htm" },
      { label: "Glassdoor P&G interview report (PEAK assessment)", url: "https://www.glassdoor.ie/Interview/Procter-and-Gamble-Interview-E544-RVW73017982.htm" },
      { label: "Glassdoor P&G interview report (2026)", url: "https://static.glassdoor.at/Interview/Procter-and-Gamble-Interview-E544-RVW56286572.htm" },
      { label: "Glassdoor P&G interview report (earlier)", url: "https://static.glassdoor.com.br/Interview/Procter-and-Gamble-Interview-E544-RVW8814181.htm" },
    ],
  },
];
