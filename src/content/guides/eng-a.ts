import type { CompanyGuide } from "./types";

export const engA: CompanyGuide[] = [
  {
    companyId: "spacex",
    summary:
      "SpaceX is described as extremely selective, with a fast, multi-step funnel: recruiter and hiring-manager screens, technical conversations with the team, then a long on-site or virtual loop. Technical depth and evidence of real hands-on building weigh heavily, alongside strong mission motivation. Most detail comes from candidate reports and prep blogs, not SpaceX itself.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (hardware and software)",
        stages: [
          {
            name: "Application and resume review",
            format: "Online application through the careers site",
            what: "Resume is screened for relevant projects, team experience (Formula SAE, rocketry, etc.) and fit with the posted role. Many roles require US-person status under export-control rules.",
          },
          {
            name: "Recruiter screen",
            format: "About 30-60 minute call",
            what: "Background, motivation, why SpaceX and logistics. Some candidates report basic technical questions even here, for example simple structures or machine-design checks.",
          },
          {
            name: "Hiring manager interview",
            format: "About 1 hour, phone or video",
            what: "Deeper discussion of your projects plus technical questions in your discipline, and a read on how you handle pressure and ambiguity.",
          },
          {
            name: "Team technical screens",
            format: "One to three calls with engineers on the team",
            what: "Fundamentals and problem solving. Software roles commonly report an online coding test or live coding; hardware roles report discipline questions and project deep dives.",
          },
          {
            name: "Final loop",
            format: "Several back-to-back sessions, commonly reported as 4-8, on site or virtual",
            what: "Mix of technical and behavioral interviews with team members and leads, sometimes with a project presentation. Missing multiple technical questions is reported to end the process.",
          },
          {
            name: "Decision and offer",
            format: "Recruiter call after the loop",
            what: "Reported total timelines range from about 3 weeks to 2 months, with most guides citing roughly 4-10 weeks.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral questions are mixed into technical interviews rather than isolated. Interviewers press for specifics about what you personally did, so a detailed STAR-like story works better than a polished summary.",
          themes: ["Why SpaceX and the mission", "Ownership and hands-on contribution", "Working under pressure", "Learning from failure", "First-principles thinking"],
          examples: [
            "Why do you want to work here rather than at another aerospace employer?",
            "What technical accomplishment are you proudest of, and what exactly did you do?",
            "Describe a time you failed on a project and what you changed.",
            "Tell me about working under a tight deadline with incomplete information.",
            "Where do you want your career to go over the next few years?",
          ],
        },
        technical: {
          share: "Most of the loop, commonly reported as the dominant factor",
          topics: [
            "Statics, beams, springs, vibration and machine design (mechanical)",
            "Thermodynamics, fluids and heat transfer",
            "Circuits, power and embedded systems (electrical)",
            "Data structures, networking and coding (software)",
            "Open-ended estimation and design reasoning",
          ],
          style:
            "Candidates describe graduate-level fundamentals questions, sometimes an unusual open-ended problem first and rapid-fire follow-ups after. Software roles add online coding assessments and system design.",
        },
        projects:
          "Expect heavy probing of resume projects: what you designed, what broke, how you tested it and what you would change. Team projects such as rockets, race cars or robots are valued only if you can state your own contribution and the numbers behind decisions. Be ready to redo calculations from memory.",
        roleNotes: [
          { roleId: "structures-engineer", notes: "Reported early questions on cantilever beams, springs and natural frequency. Be quick with hand calculations and failure modes before reaching for FEA." },
          { roleId: "propulsion-engineer", notes: "Expect fluids, thermodynamics and cycle questions plus how you would test and debug a hardware subsystem. Test-stand or hot-fire experience helps." },
          { roleId: "software-engineer", notes: "Commonly reported: online coding test, then data structures, networking and design rounds. Flight software teams may add embedded and real-time questions." },
          { roleId: "hardware-engineer", notes: "Be ready to defend a board or system you built, covering component choices, debugging and failure analysis." },
        ],
        prep: [
          "Review core fundamentals in your own discipline; commonly reported questions are graduate-level, not trivia.",
          "Prepare two or three projects you can explain from requirements through test, with your personal role stated clearly.",
          "Practice doing hand calculations and estimates out loud without tools.",
          "Have a specific, honest answer to why SpaceX; generic enthusiasm is reported as not enough.",
          "Check the job posting for US-person or citizenship requirements before investing time.",
          "Use STAR-style structure but stay detailed; interviewers follow up on specifics.",
          "Keep your answers accurate; one or two missed fundamentals are reported to be costly.",
        ],
      },
    ],
    sources: [
      { label: "ZeroG Talent: SpaceX interview process tips", url: "https://zerogtalent.com/blog/spacex-interview-process-tips-2025" },
      { label: "Final Round AI: SpaceX interview process", url: "https://www.finalroundai.com/blog/what-is-the-space-x-interview-process-a-complete-breakdown" },
      { label: "Glassdoor: SpaceX interview report", url: "https://www.glassdoor.ie/Interview/SpaceX-Interview-E40371-RVW50746200.htm" },
      { label: "4dayweek: SpaceX interview process", url: "https://4dayweek.io/interview-process/spacex" },
      { label: "InterviewPal: SpaceX process and questions", url: "https://www.interviewpal.com/blog/getting-a-job-offer-at-spacex-interview-process-and-top-questions-to-practice" },
      { label: "ZeroG Talent: SpaceX and ITAR", url: "https://zerogtalent.com/blog/spacex-hire-non-us-citizens-itar-2026" },
    ],
  },
  {
    companyId: "blue-origin",
    summary:
      "Blue Origin candidates commonly report a recruiter call, a hiring-manager or technical screen, and a final panel of several one-on-one interviews, sometimes after a presentation about your past work. The mix of behavioral and technical content depends heavily on the team. Evidence is anonymous and varied, so treat details as approximate.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering",
        stages: [
          {
            name: "Application",
            format: "Online application",
            what: "Resume screen against the posting. Many launch and engine roles are limited to US persons under export-control rules, so check the posting.",
          },
          {
            name: "Recruiter screen",
            format: "About 30 minute call",
            what: "Motivation for Blue Origin and a match of your skills to the posting.",
          },
          {
            name: "Hiring manager or technical screen",
            format: "Phone or video, typically 30-60 minutes",
            what: "Probing of your background and relevant technical knowledge; the scope depends on what the manager considers important for the team.",
          },
          {
            name: "Presentation (commonly reported)",
            format: "Slides to a panel, often 20-45 minutes",
            what: "You present a past project or research to a mixed audience of engineers, then field questions on your decisions.",
          },
          {
            name: "Panel of one-on-ones",
            format: "Commonly several 45 minute sessions, up to about 4 hours total",
            what: "A blend of behavioral and technical questions depending on who interviews you, from team members to leads.",
          },
          {
            name: "Decision",
            format: "Recruiter follow-up",
            what: "Reported timelines range from about 2 weeks to 2 months; some candidates mention poor communication after final rounds.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral questions appear in the recruiter call and throughout the panel, varying with the interviewer. Structured stories are useful, and motivation for the specific mission and team matters.",
          themes: ["Why Blue Origin and the mission", "Technical ownership", "Teamwork across disciplines", "Safety and rigor", "Handling setbacks"],
          examples: [
            "Why this company and this team?",
            "Walk me through your strongest technical project and your part in it.",
            "Describe a disagreement with a teammate over a design choice.",
            "Tell me about a test or analysis that did not go as planned.",
            "How do you make sure your work is correct before it moves downstream?",
          ],
        },
        technical: {
          share: "Roughly half or more of the panel, depending on the team",
          topics: [
            "Fundamentals in your discipline such as compressible flow, thermodynamics, structures or controls",
            "Design trade-offs and analysis methods",
            "Manufacturing and test considerations",
            "Software or embedded fundamentals for those roles",
          ],
          style:
            "Reported as fundamentals-oriented one-on-one questions plus discussion of your presentation; difficulty differs by interviewer.",
        },
        projects:
          "Projects are central. A presentation to a panel is commonly reported, so build a short deck covering problem, requirements, your analysis or design, results and lessons. Expect detailed follow-up questions on assumptions and what you would do differently.",
        roleNotes: [
          { roleId: "propulsion-engineer", notes: "Candidates report fundamental compressible-flow style questions. Review nozzle flow, isentropic relations and cycle basics." },
          { roleId: "structures-engineer", notes: "Expect load paths, failure modes and analysis validation; be able to explain how you checked FEA against hand calculations." },
          { roleId: "systems-engineer", notes: "Prepare examples of requirements flowdown, interface management and trade studies." },
        ],
        prep: [
          "Build and rehearse a 20-30 minute project presentation aimed at engineers outside your specialty.",
          "Review discipline fundamentals, including compressible flow if you target propulsion or aerodynamics.",
          "Prepare a specific answer on why Blue Origin and the team.",
          "Ask your recruiter for the format and length of each stage; reports vary.",
          "Confirm US-person requirements on the posting.",
          "Plan stamina for a multi-hour panel and follow up politely if communication stalls.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Blue Origin interview report", url: "https://www.glassdoor.com/Interview/Blue-Origin-Interview-E782684-RVW83929145.htm" },
      { label: "Glassdoor: Blue Origin interview report (panel)", url: "https://www.glassdoor.com/Interview/Blue-Origin-Interview-E782684-RVW97748528.htm" },
      { label: "Glassdoor: Blue Origin interview report", url: "https://www.glassdoor.ca/Interview/Blue-Origin-Interview-E782684-RVW88994887.htm" },
      { label: "Glassdoor: Blue Origin interview report", url: "https://www.glassdoor.com/Interview/Blue-Origin-Interview-E782684-RVW85941510.htm" },
      { label: "ZeroG Talent: space-industry hiring and ITAR", url: "https://zerogtalent.com/blog/spacex-hire-non-us-citizens-itar-2026" },
    ],
  },
  {
    companyId: "boeing",
    summary:
      "Early-career Boeing interviews are commonly reported as structured panels with roughly five scripted behavioral questions, often STAR-based, sometimes with online assessments or a technical component depending on team. Campus recruiting is a common entry. Evidence is mostly anonymous Glassdoor reports across many sites and years.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (early career)",
        stages: [
          {
            name: "Application or career fair",
            format: "Online application, often via campus recruiting",
            what: "Resume screen; many roles require US citizenship or export-control eligibility and some require clearance.",
          },
          {
            name: "Online assessment (sometimes)",
            format: "Recorded video questions or short games/skills tests",
            what: "Some candidates report HireVue-style recordings or aptitude exercises; not universal.",
          },
          {
            name: "Recruiter or phone screen",
            format: "About 30 minutes",
            what: "Background, interest in Boeing, location and availability.",
          },
          {
            name: "Panel interview",
            format: "Panel of engineers and managers, commonly 45-60 minutes, in person or video",
            what: "Standardized questions asked of every candidate, mostly behavioral, with notes taken. Technical content depends on the team.",
          },
          {
            name: "Offer and background check",
            format: "Recruiter call, then checks",
            what: "Background, export-control and any clearance processing follow the offer.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Reported as the core of early-career interviews: about five scripted questions, starting with an introduction, with little conversational back-and-forth. Complete, structured STAR answers are rewarded.",
          themes: ["Teamwork and conflict", "Problem solving", "Adapting to change", "Working under pressure", "Quality and integrity"],
          examples: [
            "Introduce yourself and why you want this role.",
            "Describe a time you solved a technical problem and how.",
            "Tell me about a disagreement with a teammate and how it resolved.",
            "Describe a time circumstances changed and you had to adjust.",
            "Give an example of staying effective under pressure.",
          ],
        },
        technical: {
          share: "Smaller for many panels; larger for design or analysis teams",
          topics: [
            "Core discipline fundamentals such as lift, structures, materials and controls",
            "Tools you list (CAD, MATLAB, FEA, programming languages)",
            "Project-based problem solving",
          ],
          style:
            "Often folded into resume-based questions; some reports describe a heavily technical interview and a few yes/no tool-experience checks.",
        },
        projects:
          "Moderate probing. Interviewers ask how coursework and projects prepared you and expect specifics on tools used. Know every skill on your resume well enough to answer a quick follow-up.",
        roleNotes: [
          { roleId: "design-engineer", notes: "Be ready for CAD and GD&T experience questions and how you balance weight, cost and manufacturability." },
          { roleId: "structures-engineer", notes: "Review stress, fatigue, materials and FEA basics; a mix of behavioral and fundamentals is commonly reported." },
          { roleId: "systems-engineer", notes: "Examples of requirements, verification and cross-team coordination are the strongest material." },
          { roleId: "quality-engineer", notes: "Quality and integrity stories are relevant given Boeing's emphasis; prepare an example of speaking up about a defect or shortcut." },
        ],
        prep: [
          "Prepare five or six STAR stories covering conflict, a technical problem, change, pressure and leadership.",
          "Practice a concise 60-second introduction.",
          "Review fundamentals for your discipline and the tools on your resume.",
          "Expect same questions for every candidate; answer completely rather than waiting for follow-ups.",
          "Check citizenship, export-control and clearance requirements on the posting.",
          "Have a concrete reason for the specific site and program you apply to.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Boeing engineer interview questions", url: "https://static.glassdoor.com.au/Interview/Boeing-Engineer-Interview-Questions-EI_IE102.0,6_KO7,15.htm" },
      { label: "Glassdoor: Boeing interview report", url: "https://www.glassdoor.com.hk/Interview/Boeing-Interview-E102-RVW671804.htm" },
      { label: "Glassdoor: Boeing interview report", url: "https://www.glassdoor.sg/Interview/Boeing-Interview-E102-RVW12146705.htm" },
      { label: "Glassdoor: Boeing interview report", url: "https://www.glassdoor.co.uk/Interview/Boeing-Interview-E102-RVW1495526.htm" },
      { label: "Taro: Boeing propulsion engineer experience", url: "https://www.jointaro.com/interviews/companies/boeing/work-experiences/propulsion-engineer-december-28-2020-5-c3c62ba4" },
    ],
  },
  {
    companyId: "lockheed-martin",
    summary:
      "Lockheed Martin entry-level engineering interviews are commonly reported as short and mostly behavioral, with a manager conversation and a team interview, plus technical coding for software roles. The company also runs a rotational Engineering Leadership Development Program. Many reports are older, so details vary by site.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (early career)",
        stages: [
          {
            name: "Application or campus event",
            format: "Online application, often through university recruiting",
            what: "Resume screen. Most roles need US citizenship; many need the ability to obtain a clearance.",
          },
          {
            name: "Phone or video screen",
            format: "About 30 minutes",
            what: "Background, interest in the work and logistics. Software roles may add a technical video interview on basic data structures and a medium-level coding problem.",
          },
          {
            name: "Manager and team interview",
            format: "Reported as about 30 minutes with a senior manager, then up to 90 minutes with two engineers",
            what: "Roughly five behavioral questions, resume follow-ups and questions about your knowledge of the site's work.",
          },
          {
            name: "Presentation (sometimes)",
            format: "Short talk on a project",
            what: "Reported in some graduate-engineer processes.",
          },
          {
            name: "Offer, screening and clearance",
            format: "Recruiter contact, background and drug screening",
            what: "Reported process lengths of roughly 2-4 weeks; clearance work continues after hire.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Behavioral questions dominate many entry-level interviews. Candidates report a friendly tone, about five questions and time to ask your own.",
          themes: ["Teamwork and workplace conflict", "Resume projects", "Interest in the mission and site", "Problem solving", "Integrity and reliability"],
          examples: [
            "Describe a time there was friction in a team and how you handled it.",
            "Walk through a project listed on your resume.",
            "Why defense and why this site or program?",
            "Tell me about a challenge where you had to learn something quickly.",
            "What do you know about what we build here?",
          ],
        },
        technical: {
          share: "Small for many hardware roles; larger for software",
          topics: [
            "Discipline fundamentals relevant to the posting",
            "Data structures and basic coding (software)",
            "Test or programming specifics for lab and test roles",
          ],
          style:
            "Often conversational and resume-driven. Software roles report a video coding interview; some reviewers report no technical questions at all.",
        },
        projects:
          "Reviewers repeatedly advise knowing your projects well, since resume items drive questions. Be ready to describe goals, your role and results for each.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Basic data structures and a medium coding problem are commonly reported, plus STAR behavioral discussion." },
          { roleId: "systems-engineer", notes: "Associate systems roles stress requirements and cross-team communication; prepare team and coordination stories." },
          { roleId: "hardware-engineer", notes: "Expect questions on lab experience, design and test of circuits or boards." },
          { roleId: "design-engineer", notes: "Project walkthroughs of CAD or mechanical design with tradeoffs are a reasonable focus." },
        ],
        prep: [
          "Prepare STAR stories on teamwork, conflict and learning fast.",
          "Know every resume item well enough to discuss in detail.",
          "Research the specific site, program and business area.",
          "Check citizenship and clearance language on the posting before applying.",
          "If targeting ELDP, review the official program page for current format and eligibility.",
          "Prepare questions for the engineers at the end.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Lockheed Martin interview report", url: "https://static.glassdoor.com.au/Interview/Lockheed-Martin-Interview-E404-RVW64646492.htm" },
      { label: "Glassdoor: Lockheed Martin interview questions", url: "https://static.glassdoor.at/Interview/Lockheed-Martin-Interview-Questions-E404_P658.htm" },
      { label: "Glassdoor: Lockheed Martin interview report", url: "https://www.glassdoor.com/Interview/Lockheed-Martin-Interview-E404-RVW248046.htm" },
      { label: "Lockheed Martin: early careers and leadership development", url: "https://lockheedmartin.com/en-us/careers/why-lm/leadership-development.html" },
      { label: "ZeroG Talent: Lockheed early careers", url: "https://zerogtalent.com/blog/lockheed-martin-early-careers-2026" },
    ],
  },
  {
    companyId: "northrop-grumman",
    summary:
      "Northrop Grumman engineering interviews are commonly reported as a recruiter contact, then a team or hiring-manager interview that is part behavioral and part resume-based technical discussion, sometimes ending in an on-site visit. New grads often enter via the Pathways rotational program. Timelines range from days to months.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (early career)",
        stages: [
          {
            name: "Application or career fair",
            format: "Online application, career fair or referral",
            what: "Resume review; recruiters pass resumes to interested groups. Most roles require US citizenship and clearance eligibility.",
          },
          {
            name: "Recruiter phone screen",
            format: "Short call",
            what: "Background, interest areas, location and clearance status.",
          },
          {
            name: "Team interview",
            format: "Video panel (reported with about four team members) or in person",
            what: "Questions on projects, problem solving, motivation and fit with the team's work.",
          },
          {
            name: "Manager or on-site interview",
            format: "In-person conversation, sometimes with a facility tour",
            what: "Final conversation with the team lead covering fit and expectations.",
          },
          {
            name: "Offer and clearance",
            format: "Recruiter contact",
            what: "Reports range from an on-the-spot offer at a conference to about three months overall.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Candidates describe project-centric behavioral questions where you explain approach, resources and how obstacles were overcome. STAR structure is commonly recommended.",
          themes: ["Project ownership and contribution", "Overcoming challenges", "Why Northrop Grumman and the mission", "Teamwork", "Interest areas"],
          examples: [
            "Describe a project in detail, including your own contribution.",
            "Tell me about a hard problem and how you got past it.",
            "Why this company and this part of the business?",
            "What kinds of work interest you most?",
            "Describe working in a team with differing opinions.",
          ],
        },
        technical: {
          share: "Moderate; varies by team",
          topics: [
            "Fundamentals relevant to the role (simulation, systems engineering, flight dynamics)",
            "C/C++ basics, arrays, linked lists (software)",
            "Walkthroughs of what you built and how it worked",
          ],
          style:
            "Largely conversational, built around your resume, with basic fundamentals checks.",
        },
        projects:
          "High emphasis. Interviewers ask you to explain what you built, how it worked and what you personally contributed. Prepare each major project with problem, approach, tools, results and lessons.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Reports mention C/C++ syntax, data structures and explaining systems you built." },
          { roleId: "systems-engineer", notes: "Expect questions on requirements, verification and systems thinking; Pathways has systems-leaning tracks." },
          { roleId: "gnc-engineer", notes: "Flight dynamics and simulation topics are reported for some roles; refresh controls and dynamics." },
          { roleId: "hardware-engineer", notes: "Be ready to discuss lab and design work in detail and relevant test equipment." },
        ],
        prep: [
          "Prepare detailed walkthroughs of two or three projects with your individual contribution.",
          "Have specific reasons for Northrop Grumman and the business sector you target.",
          "Review fundamentals tied to the posting's listed skills.",
          "Be ready to discuss citizenship and clearance eligibility.",
          "Use career fairs and referrals; they are reported to speed things up.",
          "Review the official Pathways page for current program details.",
          "Follow up politely; slow communication is a common complaint.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Northrop Grumman interview reports", url: "https://static.glassdoor.at/Interview/Northrop-Grumman-Interview-Questions-E488_P68.htm" },
      { label: "Interview Query: Northrop Grumman software engineer", url: "https://www.interviewquery.com/guides/northrop-grumman-software-engineer" },
      { label: "Glassdoor: Northrop Grumman Palmdale report", url: "https://www.glassdoor.com.mx/Entrevista/Northrop-Grumman-Entrevista-E488-RVW88151678.htm" },
      { label: "Northrop Grumman: Pathways program article", url: "https://www.northropgrumman.com/life-at-northrop-grumman/a-pathway-into-an-engineering-career" },
      { label: "ZeroG Talent: Northrop Pathways", url: "https://zerogtalent.com/blog/northrop-grumman-pathways-2026" },
    ],
  },
  {
    companyId: "rtx",
    summary:
      "RTX covers Raytheon, Pratt & Whitney and Collins Aerospace, so processes differ by business unit. Commonly reported steps are a recruiter or video screen, a hiring-manager and team conversation, and sometimes a multi-session super day. STAR behavioral questions tied to company values are reported as heavily weighted. Most evidence is older and Raytheon-site heavy.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (Raytheon, Pratt & Whitney, Collins)",
        stages: [
          {
            name: "Application",
            format: "Online application via the careers site",
            what: "Resume keyword screening for aerospace and defense skills. Most roles need US citizenship and the ability to obtain a clearance.",
          },
          {
            name: "Recorded or phone screen",
            format: "HireVue-style video or about 30 minutes by phone",
            what: "Motivation, background and early fit questions, sometimes with the hiring manager and an engineer.",
          },
          {
            name: "Team or panel interview",
            format: "Zoom panel or in-person with team and floor tour",
            what: "Project discussion, domain questions and behavioral questions.",
          },
          {
            name: "Super day (some sites)",
            format: "Multiple back-to-back sessions",
            what: "Several interviewers cover technical and behavioral areas in one visit.",
          },
          {
            name: "Offer and clearance",
            format: "Recruiter contact",
            what: "Reported averages of roughly 4 weeks from application to offer, longer when clearance is needed.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "One aggregator describes STAR questions mapped to the company's values as the heaviest-weighted part; treat this as commonly reported rather than confirmed.",
          themes: ["Company knowledge", "Project experience", "Teamwork", "Ethics and compliance", "Customer focus"],
          examples: [
            "What do you know about this business unit?",
            "Tell me about a challenge you faced and the result.",
            "How did your previous experience prepare you for this role?",
            "Describe a time you worked with others toward a shared goal.",
            "Give an example of choosing the right way over the fast way.",
          ],
        },
        technical: {
          share: "About half, varying by business unit",
          topics: [
            "Domain fundamentals (mechanical, electrical, systems, software)",
            "C/C++ and embedded concepts for software roles",
            "Manufacturing and process topics for process roles",
            "Turbine and engine basics for Pratt & Whitney roles",
          ],
          style:
            "Mostly conversational and project-based with domain questions from engineers.",
        },
        projects:
          "Candidates are commonly asked about past projects and jobs and how they transfer to the target environment. Prepare examples that connect your experience to the role's work.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Manufacturing sites ask how prior experience applies on a shop floor; prepare process improvement and quality examples." },
          { roleId: "software-engineer", notes: "Embedded or defense-oriented C/C++ questions are commonly reported." },
          { roleId: "systems-engineer", notes: "Raytheon programs stress requirements, test and integration; bring those stories." },
          { roleId: "thermal-engineer", notes: "Pratt & Whitney and Collins roles lean on heat transfer and thermodynamics fundamentals." },
        ],
        prep: [
          "Identify the business unit (Raytheon, Pratt & Whitney or Collins) and learn its products.",
          "Prepare STAR stories aligned with teamwork, integrity and customer focus.",
          "Match your resume wording to the posting.",
          "Have clear, honest answers on citizenship and clearance eligibility.",
          "Review domain fundamentals for the specific role.",
          "Practice video-recorded responses if a HireVue step is likely.",
        ],
      },
    ],
    sources: [
      { label: "ResumeAdapter: RTX interview questions", url: "https://www.resumeadapter.com/blog/rtx-raytheon-interview-questions" },
      { label: "CleverPrep: RTX interview guide", url: "https://www.cleverprep.com/companies/rtx" },
      { label: "Glassdoor: RTX manufacturing engineer interviews", url: "https://static-pc.glassdoor.de/Interview/RTX-Manufacturing-Engineer-Interview-Questions-EI_IE561.0,3_KO4,26_IP3.htm" },
      { label: "Glassdoor: RTX interview report", url: "https://www.glassdoor.co.nz/Interview/RTX-Interview-E561-RVW311865.htm" },
      { label: "Glassdoor: RTX interview report", url: "https://www.glassdoor.com.au/Interview/RTX-Interview-E561-RVW70452371.htm" },
    ],
  },
  {
    companyId: "general-dynamics",
    summary:
      "General Dynamics is a federation of businesses (Electric Boat, Gulfstream, Mission Systems, Land Systems and others), so processes vary by unit. Typical reports are a phone screen, a hiring-manager call and a panel or on-site, blending technical and behavioral questions over about 3-5 weeks. Clearance eligibility is a recurring theme. Evidence is thin and unit-specific data is scarce.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Engineering",
        stages: [
          {
            name: "Application",
            format: "Online application on the business unit's careers site",
            what: "Resume screen. Many defense roles require US citizenship and the ability to obtain a Secret-level clearance.",
          },
          {
            name: "Phone screen",
            format: "About 30-45 minutes",
            what: "Background, motivation, clearance eligibility and logistics.",
          },
          {
            name: "Hiring manager call",
            format: "Phone or video",
            what: "Discussion of experience, technical fundamentals and fit.",
          },
          {
            name: "Panel or on-site",
            format: "Reported as about 3 hours of Q&A, or an in-person behavioral assessment",
            what: "Mix of technical and non-technical questions with several team members.",
          },
          {
            name: "Decision and clearance",
            format: "Recruiter follow-up, typically about a week after final round",
            what: "Reported total of roughly 3-5 weeks; clearance processing continues after hire.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Candidates describe scenario questions asking what you did and how you reacted, plus interpersonal questions. Interviewers are generally described as prepared and approachable.",
          themes: ["Teamwork", "Reaction to difficult situations", "Process discipline", "Security and integrity", "Interest in the specific program"],
          examples: [
            "Describe a situation where things went wrong and how you responded.",
            "Tell me about working with someone with a very different style.",
            "How have you worked in a structured process such as Agile?",
            "Why this business unit and program?",
            "Are you eligible for a security clearance?",
          ],
        },
        technical: {
          share: "Roughly half, varying by business unit",
          topics: [
            "Discipline fundamentals (circuits, controls, mechanics, software)",
            "Requirements, trade studies and verification (systems)",
            "Design review milestones such as SRR, PDR and CDR",
          ],
          style:
            "Panel Q&A and resume discussion; technical depth depends on the role.",
        },
        projects:
          "Expect to describe your projects and role. Systems roles also look for cross-discipline coordination and requirements examples.",
        roleNotes: [
          { roleId: "systems-engineer", notes: "Postings for Electric Boat systems roles describe requirements, trade studies, interface management and design reviews; prepare examples of each." },
          { roleId: "hardware-engineer", notes: "Electric Boat electrical and test roles emphasise mil-spec design and testing; prepare lab or design examples." },
          { roleId: "design-engineer", notes: "Marine and land systems roles value mechanical design with structured documentation." },
        ],
        prep: [
          "Identify which General Dynamics business you are applying to and learn its products.",
          "Be ready to discuss clearance and citizenship status plainly.",
          "Prepare two or three project stories with your own contribution.",
          "Review fundamentals for your discipline and basics of the systems engineering lifecycle.",
          "Prepare behavioral stories about teamwork and setbacks.",
          "Ask your recruiter whether a panel or technical round is included.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: General Dynamics interview report", url: "https://www.glassdoor.com.hk/Interview/General-Dynamics-Interview-E276-RVW97580049.htm" },
      { label: "Glassdoor: General Dynamics interview report", url: "https://www.glassdoor.ca/Interview/General-Dynamics-Interview-E276-RVW21805873.htm" },
      { label: "CleverPrep: General Dynamics systems engineer", url: "https://www.cleverprep.com/companies/general-dynamics/systems-engineer" },
      { label: "CleverPrep: General Dynamics", url: "https://www.cleverprep.com/companies/general-dynamics" },
      { label: "Electric Boat: special missions systems engineer posting", url: "https://careers-gdeb.icims.com/jobs/14963/engineer-%e2%80%93-special-missions-systems/job" },
    ],
  },
  {
    companyId: "ge-aerospace",
    summary:
      "GE Aerospace early-career engineers often enter through the Edison Engineering Development Program (EEDP), a rotational program. Candidate reports describe an online test or behavioral recording, resume-based technical interviews, an HR round and sometimes a short presentation or group exercise. Evidence is sparse and mixed in location and year.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Engineering development program",
        stages: [
          {
            name: "Application or campus recruiting",
            format: "Online application, often via university",
            what: "Resume screen for the rotational program or a specific role. Check citizenship requirements for US roles.",
          },
          {
            name: "Online test or recorded interview",
            format: "Online assessment and behavioral questions on a video platform",
            what: "Reported behavioral recording focused on STAR-style questions.",
          },
          {
            name: "Technical interview",
            format: "Video or in person with engineers",
            what: "Resume-based questions on coursework and projects, such as stress concentration, fracture and finite element methods for mechanical candidates.",
          },
          {
            name: "HR or leadership interview",
            format: "Conversation with HR or program leaders",
            what: "Career goals, why the program and conflict-handling examples.",
          },
          {
            name: "Presentation or group exercise (sometimes)",
            format: "Short self-introduction talk, about 5 minutes, or a brief group session",
            what: "Reported time-limited presentation and a group element at the end of some processes.",
          },
          {
            name: "Offer",
            format: "Recruiter contact",
            what: "Reported timelines vary from one day on a campus visit to about five weeks.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Reports describe STAR-based behavioral questions, often on a recorded platform, plus questions on goals and why the development program.",
          themes: ["Leadership", "Conflict on a team", "Career goals", "Problem solving", "Why a rotational program"],
          examples: [
            "Describe a time you led or influenced a team.",
            "Tell me about a conflict in a team and your role.",
            "Why do you want a development program rather than a direct role?",
            "What technical problem have you solved and how?",
            "What are your goals for the next five years?",
          ],
        },
        technical: {
          share: "About a third to half",
          topics: [
            "Solid mechanics: stress concentration, fracture, FEA",
            "Thermodynamics, fluids and heat transfer for engine roles",
            "Materials, controls or software per discipline",
            "Experience-based problem-solving questions",
          ],
          style:
            "Resume-driven discussion; questions follow topics you list.",
        },
        projects:
          "High. Reports say questions were based on your resume, including previous technical and leadership experience and how you solved problems. Prepare to explain methods and numbers.",
        roleNotes: [
          { roleId: "structures-engineer", notes: "Reported topics include stress concentration, fracture and FEM; refresh them with concrete examples." },
          { roleId: "thermal-engineer", notes: "Turbomachinery employers lean on thermodynamics and heat transfer; expect applied questions." },
          { roleId: "propulsion-engineer", notes: "Brayton cycle, compressor and turbine basics are reasonable preparation for engine roles." },
          { roleId: "quality-engineer", notes: "Prepare process control, root cause and data-driven problem-solving examples." },
        ],
        prep: [
          "Check GE Aerospace's current early-career program page for format and eligibility.",
          "Prepare STAR stories for leadership and team conflict.",
          "Be ready to justify analysis and methods on every resume item.",
          "Practice a 5-minute self-introduction in case of a timed presentation.",
          "Rehearse recorded answers to behavioral questions.",
          "Refresh stress, fracture and thermo fundamentals relevant to engines.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: GE Aerospace interview report (Cincinnati)", url: "https://www.glassdoor.com.ar/Entrevista/GE-Aerospace-Entrevista-E8674-RVW43200591.htm" },
      { label: "Glassdoor: GE Aerospace interview report", url: "https://www.glassdoor.fr/Entretien/GE-Aerospace-Entretien-E8674-RVW96266805.htm" },
      { label: "Glassdoor: GE Aerospace interview report", url: "https://www.glassdoor.com.mx/Entrevista/GE-Aerospace-Entrevista-E8674-RVW2361136.htm" },
      { label: "Glassdoor: GE Aerospace interview report", url: "https://www.glassdoor.com.ar/Entrevista/GE-Aerospace-Entrevista-E8674-RVW70277675.htm" },
    ],
  },
  {
    companyId: "anduril",
    summary:
      "Anduril interviews are described as fast and mission-focused: a recruiter screen, a technical screen, then an on-site loop of about four sessions, with team matching sometimes at the end. Detailed sources cover software roles far better than hardware. Expect repeated questions about your projects and why defense.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter screen",
            format: "Short call",
            what: "Background, interest areas and why Anduril.",
          },
          {
            name: "Technical screen",
            format: "Live coding on video",
            what: "LeetCode-style easy-to-medium problems with open-ended follow-ups; precision and careful reasoning matter.",
          },
          {
            name: "Virtual or on-site loop",
            format: "About four interviews, reported around 4 hours",
            what: "Coding, system design framed around the company's domain, past-experience discussion and behavioral questions.",
          },
          {
            name: "Team matching and offer",
            format: "Recruiter and manager conversations",
            what: "Some candidates interview for a specific team; others are matched at the end. Candidates report quick turnarounds, often a day after each round.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Conversation keeps circling to your projects, your reasons for defense work and your conviction. Be careful and honest about the interests you state.",
          themes: ["Why Anduril and defense", "Ownership", "Speed and pragmatism", "Mission alignment", "Past project depth"],
          examples: [
            "Why do you want to work on defense technology?",
            "Walk me through a project you shipped and what you owned.",
            "Tell me about a decision you made with limited information.",
            "What kind of team and problems do you want to work on?",
            "Describe a time you debugged a stubborn failure.",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: [
            "Data structures and algorithms",
            "API and systems design for sensor and edge workloads",
            "Debugging and testing in real systems",
          ],
          style:
            "Shared-editor coding and design discussion.",
        },
        projects:
          "High. Interviews are described as conversational and anchored in your past experience, so be ready to go several layers deep on what you built.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Coding rounds plus system design framed around domain tradeoffs; API-focused questions are reported recently." },
          { roleId: "firmware-engineer", notes: "No firmware-specific loop found in sources; expect embedded fundamentals and debugging discussion, and confirm with your recruiter." },
          { roleId: "hardware-engineer", notes: "No hardware-specific reports found; likely domain questions and prototype walkthroughs, so verify with the recruiter." },
        ],
        prep: [
          "Practice easy-to-medium coding problems and explain your reasoning carefully.",
          "Prepare to discuss one project end to end including failures.",
          "Have a sincere answer on defense work and Anduril's mission.",
          "Think about which team interests you before the loop.",
          "Check US-person and clearance requirements on the posting.",
          "For hardware roles, ask the recruiter what the technical rounds cover.",
        ],
      },
    ],
    sources: [
      { label: "Exponent: Anduril interview process", url: "https://www.tryexponent.com/blog/anduril-interview-process" },
      { label: "Interview Query: Anduril software engineer", url: "https://www.interviewquery.com/guides/andurilindustries-software-engineer?exp_page=1" },
      { label: "Verve Copilot: Anduril interview guide", url: "https://www.vervecopilot.com/hot-blogs/anduril-jobs-interview-guide" },
      { label: "Taro: Anduril software engineer intern experience", url: "https://www.jointaro.com/interviews/companies/anduril/experiences/software-engineerinternship-costa-mesa-ca-october-1-2024-no-offer-positive-8338b058/" },
      { label: "interviewing.io: Anduril interview questions", url: "https://interviewing.io/anduril-interview-questions" },
      { label: "Glassdoor: Anduril interview report", url: "https://static.glassdoor.be/Interview/Anduril-Interview-E3546800-RVW89957915.htm" },
    ],
  },
  {
    companyId: "rocket-lab",
    summary:
      "Rocket Lab candidates commonly report a call with an engineering manager, a technical phone screen, sometimes a time-limited take-home design challenge, then a panel conversation. Process is described as direct but with unclear communication. Evidence is a small set of anonymous reports.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Engineering",
        stages: [
          {
            name: "Application",
            format: "Online application",
            what: "Resume screen. Reported timelines range from about one to four weeks overall. Many roles have US-person requirements, so check the posting.",
          },
          {
            name: "Manager intro call",
            format: "Phone or video",
            what: "Tell-me-about-yourself and what you know about Rocket Lab.",
          },
          {
            name: "Technical phone screen",
            format: "Phone or video with engineers",
            what: "Practical and fundamentals-based questions on your discipline.",
          },
          {
            name: "Take-home design challenge (some roles)",
            format: "Reported as about 48 hours",
            what: "A design problem you solve and later defend.",
          },
          {
            name: "Panel interview",
            format: "Reported as a two-interviewer session",
            what: "Detailed technical questioning, including topics at the edge of your experience.",
          },
          {
            name: "Decision",
            format: "Recruiter email or call",
            what: "Candidates frequently complain about slow feedback.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Light compared with technical content; the main behavioral probe is motivation and knowledge of the company.",
          themes: ["Why Rocket Lab", "Company knowledge", "Hands-on practicality", "Candour about knowledge limits"],
          examples: [
            "What do you know about Rocket Lab's launch and spacecraft businesses?",
            "Why do you want this role?",
            "Describe a hands-on build or test you took responsibility for.",
            "Tell me about something you did not know and how you learned it.",
          ],
        },
        technical: {
          share: "Most of the process",
          topics: [
            "Practical hardware skills (fasteners, torque, assembly)",
            "Design of launch vehicle structures and mechanisms",
            "Fundamentals in your discipline",
            "Design trade-offs from the take-home",
          ],
          style:
            "Practical, design-oriented questions and a possible take-home, followed by defense of your answers.",
        },
        projects:
          "Moderate to high. Interviewers want to confirm you really know your area, so be able to explain design choices and hands-on experience from projects.",
        roleNotes: [
          { roleId: "structures-engineer", notes: "A reported question asked how to design a second-stage thrust-vector-control structure; practice load and mounting reasoning." },
          { roleId: "design-engineer", notes: "Reports include practical mechanical questions such as torque wrench use; know assembly and fastening basics." },
          { roleId: "propulsion-engineer", notes: "Prepare engine and feed-system fundamentals plus test experience." },
        ],
        prep: [
          "Learn Rocket Lab's launch and spacecraft products.",
          "Prepare to defend a take-home design under follow-up questioning.",
          "Review practical mechanical skills: fasteners, torque, tolerancing.",
          "Be honest about what you do not know and show how you would find out.",
          "Ask your recruiter about timeline and format up front.",
          "Check the posting for citizenship and export-control rules.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Rocket Lab interview report", url: "https://www.glassdoor.com/Interview/Rocket-Lab-Interview-E1081355-RVW47980872.htm" },
      { label: "Glassdoor: Rocket Lab interview report", url: "https://www.glassdoor.com/Interview/Rocket-Lab-Interview-E1081355-RVW41826345.htm" },
      { label: "Glassdoor: Rocket Lab interview report", url: "https://www.glassdoor.co.nz/Interview/Rocket-Lab-Interview-E1081355-RVW90407312.htm" },
      { label: "Glassdoor: Rocket Lab interview report", url: "https://www.glassdoor.ie/Interview/Rocket-Lab-Interview-E1081355-RVW100967590.htm" },
    ],
  },
];
