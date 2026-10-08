import type { CompanyGuide } from "./types";

export const engB: CompanyGuide[] = [
  {
    companyId: "tesla",
    summary:
      "Tesla's public interview guide is general: recruiters reach out when they want to interview you, questions can be technical where relevant, and the interviewer may value your thought process over a correct answer. Stage-by-stage detail (recruiter call, hiring manager and engineer interviews, sometimes a panel) rests on candidate reports and varies by team.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (new grad / intern)",
        stages: [
          {
            name: "Online application",
            format: "Resume submitted on the careers site, sometimes with a profile link",
            what: "A resume screen against the posting. Tesla's intern guidance says recruiters reach out when they want to interview you and cannot contact every applicant, so tailor the resume to the specific group and its product.",
          },
          {
            name: "Recruiter screen",
            format: "Roughly 30 minute phone call",
            what: "Covers your background, motivation for Tesla and which team interests you. Some candidates describe it as mostly behavioral, others as light conversation.",
          },
          {
            name: "Optional assessment",
            format: "Timed test or short assignment, role dependent",
            what: "Reported for some roles, particularly software and test positions. Many mechanical and electrical candidates report no separate test.",
          },
          {
            name: "Hiring manager / engineer call",
            format: "30 to 60 minute video or phone interview, often one or two of them",
            what: "Technical fundamentals plus a deep dive into your projects. Mechanical candidates report statics, materials and beam questions worked live; electrical candidates report circuit problems.",
          },
          {
            name: "Panel or on-site (some roles)",
            format: "Multi-hour session with several engineers, possibly a presentation",
            what: "More technical questions from different people, and in some cases a talk about past work. Not every team runs this stage.",
          },
          {
            name: "Decision",
            format: "Recruiter follow-up",
            what: "Reported timelines range from about two weeks to a couple of months depending on interviewer availability.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral content varies by interviewer; candidates place it in the recruiter call or spread across rounds. Tesla's own prep guide suggests thinking through questions such as your hardest challenge and why Tesla. Concise, specific stories work well.",
          themes: ["Motivation for Tesla and the mission", "Hands-on problem solving", "Persistence under pressure", "Ownership and pace"],
          examples: [
            "Walk me through yourself and why this team interests you.",
            "Describe a hard technical problem you pushed through and what you personally did.",
            "Tell me about a time you had to move quickly with incomplete information.",
            "Why Tesla rather than a traditional automaker?",
            "Describe a project that failed or missed a target and what you changed.",
          ],
        },
        technical: {
          share: "Most of the interview time for engineering roles, commonly reported",
          topics: ["Statics and strength of materials", "Fluids and thermodynamics basics", "Circuits and power electronics fundamentals", "Manufacturing and DFM", "Coding basics for test or software-leaning roles"],
          style:
            "Conversational problem solving with the interviewer pressing on reasoning. Tesla's guide says a compelling thought process can matter more than a correct answer and that vague questions may test whether you state assumptions. Fundamentals from coursework are fair game.",
        },
        projects:
          "Candidates say to expect detailed probing of resume projects: what you designed, your analysis, trade-offs and what failed. Student team work such as Formula SAE, solar car or robotics is directly relevant. Be ready to explain every line of your resume.",
        roleNotes: [
          { roleId: "design-engineer", notes: "Expect mechanical fundamentals plus design reasoning on a part or assembly from your own portfolio, including manufacturing considerations." },
          { roleId: "hardware-engineer", notes: "Circuit analysis, power electronics and debugging stories are commonly reported for electrical roles." },
          { roleId: "process-engineer", notes: "Questions lean toward manufacturing process, throughput and root-cause problem solving; plant exposure helps." },
        ],
        prep: [
          "Review statics, mechanics of materials, thermo/fluids or circuits at the level of an undergraduate exam; you may solve problems live.",
          "Prepare a two-minute and a ten-minute version of each major project, including numbers, trade-offs and failures.",
          "Research the specific team's product and recent public news so your interest sounds concrete.",
          "Have a crisp answer for why Tesla and why this team.",
          "Think out loud and state assumptions; Tesla's own guide says reasoning can matter more than a perfect answer.",
          "Read Tesla's interview preparation guide and tailor your resume to the job description.",
          "Manufacturing Development Program applicants: Tesla describes information sessions and interviews, then a Trainee offer.",
          "Bring examples of real hands-on work such as builds, tests or debugging, not only coursework.",
          "Ask the recruiter what each round will cover, since formats differ by team.",
        ],
      },
    ],
    sources: [
      { label: "Tesla: Preparing for your interview (official guide)", url: "https://digitalassets.tesla.com/tesla-contents/image/upload/preparing-for-your-interview_en" },
      { label: "Tesla careers: Intern resources (official)", url: "https://www.tesla.com/careers/intern-resources" },
      { label: "Tesla careers: Manufacturing Development Program (official)", url: "https://www.tesla.com/careers/manufacturing-development-program" },
      { label: "Glassdoor Tesla interview report", url: "https://www.glassdoor.com/Interview/Tesla-Interview-E43129-RVW100831001.htm" },
      { label: "Glassdoor Tesla interview report (2)", url: "https://www.glassdoor.com/Interview/Tesla-Interview-E43129-RVW74692593.htm" },
      { label: "EV Careers: Tesla interview processes", url: "https://ev.careers/blog/interview-questions-processes-at-tesla-motors" },
      { label: "MentorCruise: Tesla recruitment process", url: "https://mentorcruise.com/blog/tesla-recruitment-and-selection-process-how-to-get-hired-at-tesla/" },
      { label: "University of Miami career blog: Tesla interview", url: "https://customcareer.miami.edu/blog/2026/05/14/get-a-job-at-tesla-interview-process-and-top-questions/" },
    ],
  },
  {
    companyId: "rivian",
    summary:
      "Rivian's public candidate guidance describes a recruiter screen, team interviews (one-on-one, panel, presentation or group, varying by team) and a team debrief. Reports from candidates add a technical screen, a hiring manager conversation and a final loop, with project presentations common for hardware roles. The finer detail is anonymous and indicative.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (hardware / mechanical / electrical)",
        stages: [
          {
            name: "Application and recruiter screen",
            format: "About 30 minute call",
            what: "Background, interest in electric vehicles, location, work authorization and timing. Expect a direct why-Rivian question.",
          },
          {
            name: "Technical screen",
            format: "30 to 60 minute video call with an engineer",
            what: "Fundamentals for your discipline. Electrical candidates report MOSFET switching and amplifier basics; mechanical candidates report design-criteria questions and DFM/DFA topics.",
          },
          {
            name: "Hiring manager interview",
            format: "30 to 45 minute conversation",
            what: "Fit with the team's current problems, project history and motivation. Sometimes run as a behavioral round.",
          },
          {
            name: "Project presentation",
            format: "Presentation of a past project followed by Q&A (reported for mechanical roles)",
            what: "You present a project showing design, analysis and problem solving; the team asks why you made specific choices and how it would change at scale.",
          },
          {
            name: "Final loop",
            format: "Several interviews on video or on site, half technical and half behavioral in some reports",
            what: "Mixed technical depth, values-based behavioral questions and cross-team fit. Some electrical roles add a take-home or on-site exercise.",
          },
          {
            name: "Offer",
            format: "Recruiter call",
            what: "Reported timelines run from about a week to six weeks.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Reports describe structured behavioral questions tied to company values and team fit. Rivian's candidate guidance suggests framing answers as problem, solution and impact (what the challenge was, what you did, what resulted) and avoiding confidential details from past employers.",
          themes: ["Why electric vehicles and why Rivian", "Team fit", "Decision making on past projects", "Root-cause problem solving", "Values alignment"],
          examples: [
            "Why do you want to work on electric vehicles?",
            "Tell me about a design decision you made and the alternatives you rejected.",
            "Describe a time you traced a failure to its root cause.",
            "What would you bring to this team in your first six months?",
            "Give an example of working through disagreement on a technical team.",
          ],
        },
        technical: {
          share: "Roughly half or more of the loop for hardware roles",
          topics: ["Circuit and power electronics basics", "Design criteria and material choices", "DFM and DFA", "Root-cause analysis", "Vehicle systems awareness"],
          style:
            "Discipline-specific questions in conversation plus a project talk. Some roles have a take-home or on-site technical exercise.",
        },
        projects:
          "Projects are central. Several reports describe presenting a past project and defending decisions, trade-offs and scale-up. Know your own designs, test data and what you would redo.",
        roleNotes: [
          { roleId: "design-engineer", notes: "Mechanical design candidates report sub-system design reasoning (for example what to consider for a sunroof or glass) and DFM/DFA questions." },
          { roleId: "hardware-engineer", notes: "Power electronics, schematic review and discussing your own board or circuit projects are commonly reported." },
          { roleId: "software-engineer", notes: "Software loops reportedly include a medium-difficulty coding round in a shared editor, then design and behavioral rounds." },
        ],
        prep: [
          "Build a 10 to 15 minute project talk with a clear problem, your contribution, analysis, results and lessons.",
          "Review DFM/DFA, tolerance basics and material selection for mechanical roles.",
          "Review MOSFET switching, amplifiers, and basic power electronics for electrical roles.",
          "Structure stories as problem, solution, impact (Rivian's suggested format); STAR works the same way.",
          "Ask your recruiter which interview formats your team uses; Rivian says they differ by role.",
          "Have a specific answer to why EVs and why Rivian beyond brand interest.",
          "Talk through reasoning aloud during technical rounds.",
        ],
      },
    ],
    sources: [
      { label: "Rivian support: Careers (official)", url: "https://rivian.com/support/careers" },
      { label: "Rivian careers site (official)", url: "https://careers.rivian.com/careers-home/" },
      { label: "DesignGurus: Rivian interview process", url: "https://www.designgurus.io/answers/detail/what-is-the-rivian-interview-process-like-round-by-round" },
      { label: "Blind: Rivian mechanical design engineer interview", url: "https://www.teamblind.com/post/rivian-mechanical-design-engineer-interview-doe05fj7" },
      { label: "CleverPrep: Rivian mechanical engineer", url: "https://www.cleverprep.com/companies/rivian/mechanical-engineer" },
      { label: "CleverPrep: Rivian electrical engineer", url: "https://www.cleverprep.com/companies/rivian/electrical-engineer" },
      { label: "Glassdoor Rivian interview (Vancouver, 2024)", url: "https://www.glassdoor.com.mx/Entrevista/Rivian-Entrevista-E630579-RVW100194297.htm" },
    ],
  },
  {
    companyId: "ford",
    summary:
      "Ford's careers site presents the College Graduate program as a rotational path of 24 to 36 months, and says exceptional interns may be offered a place in it. It does not publish interview steps; candidate reports describe a short screen, then manager interviews mixing behavioral and technical questions, sometimes with a Dearborn site visit. Those reports are anecdotal and dated in places.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (college hire)",
        stages: [
          {
            name: "Career fair or online application",
            format: "Campus event or online submission, sometimes with a ranked list of preferred departments",
            what: "Candidates report ranking top engineering areas of interest; departments then review the resume and ranking to choose who to interview.",
          },
          {
            name: "Initial screen",
            format: "15 to 45 minute phone or video call, possibly with one or two engineers",
            what: "Background, interest in Ford, department fit and willingness to relocate to Michigan.",
          },
          {
            name: "Main interview",
            format: "Around 60 to 90 minutes with a hiring manager or panel of managers, video or on campus",
            what: "A blend of behavioral and technical questions drawing on past experience; reports mention roughly equal numbers of each.",
          },
          {
            name: "Site visit (some candidates)",
            format: "Day at Dearborn-area facility with interviews and a tour",
            what: "Additional interviews and a look at the work environment. Not described by everyone.",
          },
          {
            name: "Offer / program placement",
            format: "Recruiter contact",
            what: "Reported timelines range from days to several months. Ford's careers site describes the Ford College Graduate program as rotational assignments lasting 24 to 36 months depending on skill team.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Interviewers reportedly want concrete situations backed by data and results. Conflict, adversity and teamwork are the staples.",
          themes: ["Teamwork and conflict", "Overcoming obstacles", "Technical judgment with data", "Interest in Ford and the department", "Leadership and communication"],
          examples: [
            "Describe a disagreement with a teammate and how you resolved it.",
            "Tell me about a difficult problem you overcame and the result.",
            "Where do you see your career going at Ford?",
            "Give an example where data changed your decision.",
            "Why this department and why Ford?",
          ],
        },
        technical: {
          share: "Around half of the main interview, commonly reported",
          topics: ["Discipline fundamentals from coursework", "Past technical experience and tools", "Manufacturing or product development basics", "Problem solving"],
          style:
            "Experience-based technical questions in conversation rather than formal tests; you are asked to draw on projects and internships.",
        },
        projects:
          "Expect questions on internships, co-ops and team projects. Prepare two or three experiences with measurable outcomes and be ready to explain technical details.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Manufacturing engineering is a prominent college-hire track, entered via rotations across plant functions; plant or internship exposure is valued." },
          { roleId: "design-engineer", notes: "Product development candidates should be ready to explain design and test work from projects, internships or student teams." },
          { roleId: "quality-engineer", notes: "Quality and launch-type roles emphasise problem solving and data-driven stories." },
        ],
        prep: [
          "Research Ford's current vehicles and the department you ranked first.",
          "Prepare three STAR stories with numbers: teamwork, conflict, technical challenge.",
          "Be ready to say whether you will relocate to Michigan and why.",
          "Review core coursework for your discipline.",
          "If you interned at Ford, ask about converting to the College Graduate program early.",
          "Check the current Ford careers site for program length and eligibility, as archived pages are dated.",
        ],
      },
    ],
    sources: [
      { label: "Ford careers: Students and graduates (official)", url: "https://www.careers.ford.com/students-graduates" },
      { label: "Ford careers: Recent graduate programs (official)", url: "https://www.careers.ford.com/en/programs/recent-graduate-programs.html" },
      { label: "Jointaro: Ford PD engineer interview", url: "https://www.jointaro.com/interviews/companies/ford/work-experiences/pd-engineer-november-6-2017-4-821e31b1" },
      { label: "Jointaro: Ford mechanical engineer interview", url: "https://www.jointaro.com/interviews/companies/ford/work-experiences/mechanical-engineer-dearborn-mi-october-15-2014-4-074634f8/" },
      { label: "Glassdoor Ford interview report", url: "https://static.glassdoor.com.br/Interview/Ford-Motor-Company-Interview-E263-RVW5488194.htm" },
      { label: "Binghamton career tools: Ford College Graduate Program", url: "https://careertools.binghamton.edu/experiences/ford-college-graduate-program/" },
      { label: "Archived Ford College Graduate Program page", url: "https://ophelia.sdsu.edu:8443/ford/03-20-2022/careers/programs/students-and-recent-graduates/ford-college-graduate-program.html" },
    ],
  },
  {
    companyId: "gm",
    summary:
      "GM's careers site says internship interviews are typically structured interviews with team leaders, sometimes with a skills assessment, and its TRACK rotational program typically uses one 60-minute interview with two business leaders (plus a technical assessment in some technical areas). Answers should use specific past examples in STAR form. Candidates additionally report recorded video interviews and site visits, which GM's pages did not confirm.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (early career)",
        stages: [
          {
            name: "Application / career fair",
            format: "Online application or campus recruiting",
            what: "Resume screen; some candidates interview on campus the night after the career fair.",
          },
          {
            name: "Recruiter call",
            format: "Short phone interview",
            what: "Job preferences, interest, work authorization and some behavioral questions.",
          },
          {
            name: "Recorded video interview",
            format: "Several timed questions answered on camera, with limited retries",
            what: "Basic STAR-style behavioral prompts. Reports mention about two minutes per answer and up to three attempts per question.",
          },
          {
            name: "Live manager interviews",
            format: "One to two hour-long video or on-site interviews with a manager and team leads",
            what: "Mostly behavioral and resume-based, around five to eight questions, with some technical follow-up on projects and tools.",
          },
          {
            name: "Final visit (some paths)",
            format: "Two-day process in the Detroit area with a facility tour",
            what: "Reported for some campus pipelines and older cycles; may be virtual now.",
          },
          {
            name: "Offer",
            format: "Recruiter call",
            what: "Timelines reported from two to three weeks up to about three months.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Behavioral questions dominate. Interviewers ask for specific past situations; the recorded round tests concise structured answers.",
          themes: ["Teamwork and conflict", "Mistakes and recovery", "Handling differing opinions", "Time management", "Why GM and the auto industry"],
          examples: [
            "Describe working with someone you would not have chosen and how it went.",
            "Tell me about a mistake you made and how you handled it.",
            "How have you resolved a disagreement with a coworker on a technical approach?",
            "How do you manage competing deadlines?",
            "Why do you want to work at GM?",
          ],
        },
        technical: {
          share: "Small to moderate; often discussed through your resume rather than tested",
          topics: ["Projects and tools on your resume", "Discipline basics", "Manufacturing or validation concepts", "Coding or debugging for software roles"],
          style:
            "Resume-driven discussion; software-leaning roles add coding or debugging rounds. Some reports mention no technical test at all.",
        },
        projects:
          "Candidates report being asked about projects, work experience and the tools they used. Be ready to go deep on every item listed.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Manufacturing engineering early-career track is a common entry; expect behavioral interviews and possibly plant-focused questions." },
          { roleId: "quality-engineer", notes: "Validation and quality roles lean on test, data and problem-solving stories." },
          { roleId: "ml-engineer", notes: "ML and software roles reportedly include coding, debugging and behavioral rounds." },
        ],
        prep: [
          "Prepare six to eight STAR stories covering teamwork, conflict, failure and leadership.",
          "Practice recording yourself answering in under two minutes.",
          "Know GM's recent vehicles, EV strategy and the business area you are applying to.",
          "Re-read your resume and be ready to explain each project and tool.",
          "Have a clear reason for choosing automotive and GM.",
          "Confirm with the recruiter whether the final round is virtual or on site, and whether a skills assessment or recorded video step applies to your posting.",
          "Read GM's How We Hire page and interview toolkit; the toolkit is from 2022, so check it against what your recruiter tells you.",
        ],
      },
    ],
    sources: [
      { label: "GM careers: How we hire (official)", url: "https://search-careers.gm.com/en/how-we-hire/" },
      { label: "GM careers: Early careers internship program (official)", url: "https://search-careers.gm.com/en/early-careers/internship-program/" },
      { label: "GM careers: TRACK rotation program (official)", url: "https://search-careers.gm.com/en/early-careers/track-program/" },
      { label: "GM interview preparation toolkit (official, 2022)", url: "https://search-careers.gm.com/media/euri3exg/gm-interview-toolkit-2022-translated.pdf" },
      { label: "VMI Career Services: Career Perspective, General Motors", url: "https://sites.vmi.edu/careerservices/?p=156" },
      { label: "Jointaro: GM validation engineer interview (2025)", url: "https://www.jointaro.com/interviews/companies/general-motors/work-experiences/validation-engineer-warren-mi-march-5-2025-3-ee0ac11a/" },
      { label: "Jointaro: GM manufacturing engineering interview", url: "https://www.jointaro.com/interviews/companies/general-motors/work-experiences/manufacturing-engineering-arlington-tx-june-2-2022-5-3b532631/" },
      { label: "Jointaro: GM validation engineer interview (May 2025)", url: "https://www.jointaro.com/interviews/companies/general-motors/work-experiences/validation-engineer-warren-mi-may-16-2025-3-d48c9dd3/" },
      { label: "Nodeflair: GM manufacturing engineer early career", url: "https://nodeflair.com/companies/general-motors/interviews/manufacturing-engineer-early-career-track" },
    ],
  },
  {
    companyId: "caterpillar",
    summary:
      "Caterpillar's careers pages say interviews are behavioral (STAR style), with advice to prepare several examples and speak about your own contribution. Its UK early-careers postings list online application, online assessments, a video interview and an assessment centre. US entry-level reports describe campus or phone screens then manager interviews, mostly behavioral; these are anecdotal and vary by site.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (campus / early career)",
        stages: [
          {
            name: "Career fair and application",
            format: "Campus event plus online application",
            what: "Meeting a campus recruiter is the usual entry; some candidates interview on campus soon after.",
          },
          {
            name: "Recruiter or manager screen",
            format: "Phone call",
            what: "Background, interest in the role and the job's responsibilities.",
          },
          {
            name: "Behavioral interviews",
            format: "Two back-to-back 30 to 60 minute interviews, sometimes a panel of three managers",
            what: "Reportedly about 80 percent behavioral in some panels, with a technical flavor in the questions. Managers score candidates against criteria.",
          },
          {
            name: "On-site day (some candidates)",
            format: "Around three 45 minute interviews at a site such as Peoria",
            what: "Additional manager interviews and a look at the workplace.",
          },
          {
            name: "Offer",
            format: "Recruiter contact",
            what: "Reported from one week to a few weeks; some campus hires get an offer right after the campus interview.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Caterpillar's recruiter guidance says it uses the STAR behavioral format, advises having several distinct examples, and asks you to say \"I\" rather than \"we\" so your own contribution is clear. Expect examples from internships and projects.",
          themes: ["Accountability of teammates", "Leadership of a project", "Innovation and process improvement", "Handling frustration or failure", "Why Caterpillar"],
          examples: [
            "A teammate was not delivering on time; what did you do?",
            "Describe leading a project and how you kept it on track.",
            "Tell me about a time you improved a process.",
            "Describe an attempt that failed and what you learned.",
            "Why Caterpillar and why this role?",
          ],
        },
        technical: {
          share: "Smaller share than behavioral; about 20 percent in some reports",
          topics: ["Fundamentals of your discipline applied to machines", "Practical mechanical application questions", "Your project and internship details"],
          style:
            "Application-oriented conversation rather than formal whiteboard exams. Some tech-track roles add online tests.",
        },
        projects:
          "Panels expect in-depth discussion of projects and internship work. Prepare specifics on your role, decisions and measurable results.",
        roleNotes: [
          { roleId: "design-engineer", notes: "Expect applied mechanical questions on heavy-equipment style problems such as loads, hydraulics or materials, framed through your projects." },
          { roleId: "process-engineer", notes: "Manufacturing roles lean on process improvement and cross-functional stories." },
          { roleId: "systems-engineer", notes: "Controls and electronics roles are discussed through projects; confirm format with the recruiter." },
        ],
        prep: [
          "Prepare STAR stories on leadership, failure, team conflict and process improvement.",
          "Be ready to explain internship work in detail.",
          "Know Caterpillar's product lines and the business you are applying to.",
          "Practice answering to a panel, taking notes of who asked what.",
          "Use \"I\" rather than \"we\" and keep several different examples ready, as Caterpillar's recruiters advise.",
          "If you apply to a UK placement or graduate scheme, expect online assessments, a video interview and an assessment centre; check the posting.",
          "Review applied fundamentals for your field in the context of machinery.",
          "Prepare a genuine answer on why Caterpillar and the location.",
        ],
      },
    ],
    sources: [
      { label: "Caterpillar careers: How to ace your Caterpillar interview (official)", url: "https://careers.caterpillar.com/en/life-at-caterpillar/career-blogs/how-to-ace-your-caterpillar-interview/" },
      { label: "Caterpillar careers: How to ace your virtual interview (official)", url: "https://careers.caterpillar.com/en/life-at-caterpillar/career-blogs/how-to-ace-your-virtual-interview/" },
      { label: "Caterpillar UK placement posting with selection steps (official)", url: "https://careers.caterpillar.com/en/jobs/r0000396146/design-and-development-engineering-12-month-placement-scheme/" },
      { label: "Glassdoor Caterpillar interview (South Milwaukee)", url: "https://www.glassdoor.co.in/Interview/Caterpillar-Interview-E137-RVW7596040.htm" },
      { label: "Glassdoor Caterpillar interview report", url: "https://www.glassdoor.co.uk/Interview/Caterpillar-Interview-E137-RVW661725.htm" },
      { label: "Glassdoor Caterpillar interview report (2)", url: "https://www.glassdoor.co.uk/Interview/Caterpillar-Interview-E137-RVW2328000.htm" },
      { label: "Clave Prep: Caterpillar hiring process guide", url: "https://claveprep.com/blog/caterpillar-hiring-process-guide-2026" },
      { label: "University of Michigan event: Caterpillar recruiting overview", url: "https://events.umich.edu/event/137535" },
    ],
  },
  {
    companyId: "john-deere",
    summary:
      "Deere's public pages say little about interview steps beyond noting that interviews may be face to face, by phone or by video and may include behavioral or technical assessments. Candidate reports describe a phone screen, a hiring manager conversation and one-hour competency-based behavioral interviews with two interviewers. Engineering technical content is poorly documented, so ask your recruiter.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (early career)",
        stages: [
          {
            name: "Online application",
            format: "Careers site application",
            what: "Resume screen against the posting; campus recruiting is also common for early-career roles.",
          },
          {
            name: "Phone screen",
            format: "Short call with a recruiter",
            what: "Background and interest in the role.",
          },
          {
            name: "Hiring manager conversation",
            format: "Video or phone call",
            what: "Discusses the company, the team's work and your background; a chance to ask about the team.",
          },
          {
            name: "Final behavioral interviews",
            format: "Two one-hour sessions, each with two interviewers",
            what: "About five STAR-style questions per session, each aimed at a named competency such as accountability.",
          },
          {
            name: "Offer",
            format: "Recruiter contact",
            what: "Timing not well documented; check with the recruiter.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Competency-based. Interviewers want a specific situation and expect you to bring out the competency being tested. Detailed answers are valued.",
          themes: ["Accountability", "Fast decision making", "Handling difficult situations", "Teamwork", "Results"],
          examples: [
            "Describe a time you made a mistake and what you did about it.",
            "Tell me about a decision you had to make quickly.",
            "Describe a difficult situation with a coworker and how you handled it.",
            "Share an accomplishment you completed through your own effort.",
            "Why Deere and this role?",
          ],
        },
        technical: {
          share: "Not clearly documented; likely modest for early-career roles",
          topics: ["Discipline basics", "Your project and internship work"],
          style:
            "Unclear from sources. Assume technical discussion arises through your projects and ask the recruiter whether a technical round exists.",
        },
        projects:
          "Not strongly documented, but interviewers ask for detailed, specific examples. Prepare project stories with clear roles and results.",
        roleNotes: [
          { roleId: "design-engineer", notes: "No role-specific reports found; prepare equipment-relevant projects and design examples." },
          { roleId: "process-engineer", notes: "Plant-based roles likely stress improvement and teamwork stories; no direct reports found." },
        ],
        prep: [
          "Map six STAR stories to common competencies such as accountability, collaboration and decision making.",
          "State the competency explicitly in your answer.",
          "Prepare for two-person panels by addressing both interviewers.",
          "Research Deere's product lines and technology direction.",
          "Prepare questions about the team for the hiring manager chat.",
          "Ask your recruiter about technical or case components.",
        ],
      },
    ],
    sources: [
      { label: "John Deere careers FAQ (official; no stage detail)", url: "https://www.deere.com/en/our-company/john-deere-careers/faq/" },
      { label: "John Deere recruiting privacy statement (official; mentions interview and assessment types)", url: "https://www.deere.com/assets/pdfs/common/our-company/careers/privacy-statement-canada-en.pdf" },
      { label: "John Deere students and recent graduates (official)", url: "https://about.deere.com/en-us/careers/students-and-recent-graduates" },
      { label: "Glassdoor John Deere interview report", url: "https://www.glassdoor.co.uk/Interview/John-Deere-Interview-E195-RVW636605.htm" },
      { label: "Glassdoor John Deere interview (Waterloo, IA)", url: "https://www.glassdoor.es/Entrevista/John-Deere-Entrevista-E195-RVW94282808.htm" },
      { label: "Glassdoor John Deere interview (Dubuque, IA)", url: "https://www.glassdoor.es/Entrevista/John-Deere-Entrevista-E195-RVW77077841.htm" },
    ],
  },
  {
    companyId: "boston-dynamics",
    summary:
      "Boston Dynamics' own FAQ says the process is an online application, resume review, interviews and possibly technical assessments or presentations depending on role and level, taking a few weeks to a few months. Candidate reports fill in a recruiter call, technical screens and a multi-round loop with a work presentation. Most detail covers software roles; mechanical evidence is thin.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Robotics engineering (hardware and software)",
        stages: [
          {
            name: "Recruiter screen",
            format: "About 30 minute call",
            what: "Interest in robotics, hands-on experience and, for software, comfort with C++ and Python.",
          },
          {
            name: "Hiring manager or technical screen",
            format: "45 to 60 minute video call",
            what: "Software: live coding in a shared editor. Hardware: reported statics questions solved on the fly and discussion of design work.",
          },
          {
            name: "Onsite or virtual loop",
            format: "Three to four interviews over one or two days",
            what: "Algorithms or discipline fundamentals, a robotics-oriented design discussion, behavioral questions, and an optional domain round by team.",
          },
          {
            name: "Technical presentation",
            format: "About 20 minute talk, reported at an older onsite",
            what: "You present previous work and field questions from engineers. Aggregators suggest presentations are common but verify per role.",
          },
          {
            name: "Final conversation",
            format: "Hiring manager call",
            what: "Mutual interest and fit. Overall process commonly runs around three weeks to a month.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Behavioral questions focus on past work and how you debug problems across hardware and software under pressure. Less formal than large-manufacturer panels.",
          themes: ["Hands-on robotics experience", "Debugging under pressure", "Cross-discipline collaboration", "Curiosity and drive"],
          examples: [
            "Tell me about a robot or hardware system you built or debugged.",
            "Describe a time hardware and software issues interacted and how you found the cause.",
            "What attracts you to legged robots or mobile manipulation?",
            "Describe a project that did not work first time.",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: ["Statics and dynamics", "Mechanism and actuator design", "Controls, perception or planning basics", "C++/Python coding for software roles", "Sensor data processing and pathfinding"],
          style:
            "Live problem solving, shared-editor coding for software, whiteboard fundamentals for mechanical, plus a project talk.",
        },
        projects:
          "Strong emphasis. Reports describe presenting past work and being quizzed in depth. Hands-on student-team, lab or robotics projects are the best material.",
        roleNotes: [
          { roleId: "design-engineer", notes: "A recent mechanical design report mentions on-the-spot statics questions and a preference for candidates with robotics experience." },
          { roleId: "gnc-engineer", notes: "Controls, perception and planning depth is reported for robotics loops; be ready for dynamics and estimation topics." },
          { roleId: "software-engineer", notes: "C++ and Python coding with robotics-flavored problems, plus design discussion on telemetry or fleet systems." },
          { roleId: "firmware-engineer", notes: "Embedded and hardware-software debugging stories fit the reported behavioral themes." },
        ],
        prep: [
          "Prepare a 15 to 20 minute talk on your best hardware or robotics project, with failures and data.",
          "Refresh statics and dynamics so you can solve problems live.",
          "Review C++ and Python basics if applying to software or firmware.",
          "Be ready to discuss a hardware-software integration bug you solved.",
          "Study the company's public robots and their design challenges.",
          "Ask the recruiter for the exact structure for your team; the company says assessments or presentations depend on position and level.",
          "For internships, watch for postings in the new year (10 to 12 week internships or 6 month co-ops, per the careers page).",
        ],
      },
    ],
    sources: [
      { label: "Boston Dynamics FAQ (official)", url: "https://bostondynamics.com/faq/" },
      { label: "Boston Dynamics careers (official)", url: "https://bostondynamics.com/careers/" },
      { label: "TechPrep: Boston Dynamics interview process", url: "https://www.techprep.app/blog/boston-dynamics-interview-process" },
      { label: "DesignGurus: Boston Dynamics interview process", url: "https://www.designgurus.io/answers/detail/what-is-the-boston-dynamics-interview-process-like-round-by-round" },
      { label: "Blind: Boston Dynamics interview experience", url: "https://www.teamblind.com/post/interview-working-experience-at-boston-dynamics-8yedxrhy" },
      { label: "Glassdoor Boston Dynamics interview (UK)", url: "https://www.glassdoor.co.uk/Interview/Boston-Dynamics-Interview-E261553-RVW85624974.htm" },
      { label: "Glassdoor Boston Dynamics interview (CA)", url: "https://www.glassdoor.ca/Interview/Boston-Dynamics-Interview-E261553-RVW21095443.htm" },
    ],
  },
  {
    companyId: "honeywell",
    summary:
      "Honeywell's own recruiters advise researching its businesses and demonstrating its core behaviors, and candidates report STAR-style questions and resume and project deep dives. Early-career paths may include online tests, campus career fair interviews, panels and facility tours. Process varies widely by business unit and country.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (early career)",
        stages: [
          {
            name: "Application or career fair",
            format: "Online application or short career-fair interview",
            what: "Resume screen; some candidates describe quick speed-dating style conversations at fairs.",
          },
          {
            name: "Online assessment (some roles)",
            format: "Timed online tests",
            what: "More likely for early-career or technical tracks; content varies by region.",
          },
          {
            name: "Recruiter or hiring manager interview",
            format: "Phone or video",
            what: "Questions tied to the job description and your background.",
          },
          {
            name: "Panel interview and site visit",
            format: "Interview with an HR contact and engineers, sometimes after a facility tour",
            what: "Behavioral and technical questions on projects, clubs and coursework.",
          },
          {
            name: "Offer",
            format: "Phone call",
            what: "Reported timelines from about one to five weeks.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Honeywell recruiter guidance points candidates to show which of the company's behaviors they exemplify. Candidates recommend STAR for most questions.",
          themes: ["Company behaviors and values", "Teamwork", "Problem solving", "Motivation for the business", "Project ownership"],
          examples: [
            "Tell me about a project or club role from your resume and what you contributed.",
            "Describe a time you solved a problem under constraints.",
            "How did the requirements in this job description match your experience?",
            "What went wrong in one of your projects and what did you do?",
            "Which Honeywell business interests you and why?",
          ],
        },
        technical: {
          share: "Moderate; heavier for technical specialist roles",
          topics: ["Discipline fundamentals", "Problem solving", "Domain standards (for aerospace roles)", "Project details"],
          style:
            "Panel questions plus project walk-throughs; some regions use aptitude, technical and HR rounds.",
        },
        projects:
          "Panels reportedly ask about resume projects and clubs. Prepare each in detail, including your role, tools and outcome.",
        roleNotes: [
          { roleId: "hardware-engineer", notes: "Embedded, avionics and controls businesses suggest circuit and systems fundamentals; confirm with the recruiter." },
          { roleId: "systems-engineer", notes: "Aerospace roles reportedly stress strong basics and domain standards." },
          { roleId: "project-engineer", notes: "Questions often connect job-description requirements to your experience." },
        ],
        prep: [
          "Read Honeywell's recruiter advice and study its business segments.",
          "Map your stories to the company's published behaviors.",
          "Re-read the job posting and prepare examples for each requirement.",
          "Practice STAR answers about projects and clubs.",
          "Prepare questions, including one on next steps.",
          "Ask whether a leadership or rotational program applies to your posting.",
        ],
      },
    ],
    sources: [
      { label: "Honeywell: how to land your dream job", url: "https://www.honeywell.com/us/en/news/2019/10/how-to-land-your-dream-job" },
      { label: "Clave Prep: Honeywell hiring process guide", url: "https://claveprep.com/blog/honeywell-hiring-process-guide-2026" },
      { label: "Glassdoor Honeywell interview (university)", url: "https://www.glassdoor.ca/Interview/Honeywell-Interview-E28-RVW233094.htm" },
      { label: "Indeed: Honeywell interviews", url: "https://in.indeed.com/cmp/Honeywell/faq/interviews" },
    ],
  },
  {
    companyId: "siemens",
    summary:
      "Siemens' US pages say recruiters review applications, then interviews may be an on-demand recorded video, a scheduled video or phone call, or an on-site meeting, with online tests or an assessment day for some roles; the process takes several weeks. Its graduate programme adds CV screening, an interview and an assessment centre. Round-by-round detail (aptitude tests, panel, HR) comes from mostly non-US candidate reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering (graduate / early career)",
        stages: [
          {
            name: "Online application",
            format: "Careers portal",
            what: "Resume screen; highlight projects, technical skills and innovation examples.",
          },
          {
            name: "Online assessment",
            format: "Aptitude, technical or game-based tests",
            what: "Reports describe aptitude, logic and technical sets, and a game-based assessment for some early-career hires.",
          },
          {
            name: "Technical interview",
            format: "Panel or single interviewer, 30 to 60 minutes",
            what: "Fundamentals for your discipline, explained on paper, plus questions about your final-year or project work.",
          },
          {
            name: "Managerial / assessment centre",
            format: "Panel or group and individual exercises",
            what: "Fit, problem solving and communication; some candidates report a behavioral round and panel in the same stage.",
          },
          {
            name: "HR round and offer",
            format: "Conversation then offer",
            what: "Motivation and career goals. Reported timelines around three to four weeks.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Questions focus on you, your motivation and your goals; STAR is recommended in some review summaries.",
          themes: ["Why Siemens", "Career goals", "Innovation mindset", "Teamwork", "Curiosity about emerging technology"],
          examples: [
            "Why do you want to work at Siemens?",
            "How does Siemens fit into your career goals?",
            "Describe yourself and your main interests.",
            "Tell me about a team project and your part in it.",
          ],
        },
        technical: {
          share: "Large share; tests and technical interview are usually central",
          topics: ["Electrical machines and transformers (EEE)", "Electronics and control basics", "Project-specific questions", "Data structures and algorithms for software roles"],
          style:
            "Written aptitude/technical tests plus explaining concepts in depth by hand; panel-dependent.",
        },
        projects:
          "Reviewers frequently mention project-based questions, including final-year work. Know the details and theory behind each project.",
        roleNotes: [
          { roleId: "hardware-engineer", notes: "Electrical candidates report motors, transformers and electronics basics." },
          { roleId: "software-engineer", notes: "Digital software roles reportedly include data structures, algorithms and CS fundamentals." },
          { roleId: "systems-engineer", notes: "Automation and controls roles likely draw on fundamentals and project work; verify via the posting." },
        ],
        prep: [
          "Review core fundamentals for your branch and practice explaining them by hand.",
          "Know your final-year or capstone project thoroughly.",
          "Prepare a sincere why-Siemens answer tied to a specific business.",
          "Practice aptitude and logic tests.",
          "Prepare STAR stories for assessment-centre style discussions; Siemens' software early-talent page recommends the STAR format.",
          "Do not use AI to generate answers live; Siemens' guidelines permit AI for polishing and research but not during interviews or assessments.",
          "Check your country's graduate page for the exact stages, since sources here are mostly non-US.",
        ],
      },
    ],
    sources: [
      { label: "Siemens US: How to apply (official)", url: "https://www.siemens.com/en-us/company/jobs/how-to-apply/" },
      { label: "Siemens US: Frequently asked questions (official)", url: "https://www.siemens.com/en-us/company/jobs/faq/" },
      { label: "Siemens US: Student and early career programs (official)", url: "https://www.siemens.com/us/en/company/jobs-careers/early-career-programs.html" },
      { label: "Siemens Graduate Programs (official)", url: "https://www.siemens.com/en-us/company/jobs/growth-careers/siemens-graduate-program/" },
      { label: "Glassdoor Siemens interview report", url: "https://clear.glassdoor.nl/Interview/Siemens-Interview-E3510-RVW4508711.htm" },
      { label: "Glassdoor Siemens interview (Nuremberg, 2023)", url: "https://static.glassdoor.com.hk/Interview/Siemens-Interview-E3510-RVW103640656.htm" },
      { label: "CleverPrep: Siemens interview guide", url: "https://www.cleverprep.com/companies/siemens" },
      { label: "Indeed UK: Siemens interviews", url: "https://uk.indeed.com/cmp/Siemens/faq/interviews" },
    ],
  },
  {
    companyId: "3m",
    summary:
      "3M's candidate pages describe an initial phone screen followed by one or more in-person interviews, one-on-one or panel, usually with the hiring manager and possibly peers, direct reports or HR. Behavioral \"tell me about a time\" questions are expected and the company stresses authenticity. Campus-specific and technical detail comes from older candidate reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "engineering",
        label: "Engineering / science (early career)",
        stages: [
          {
            name: "Career fair or application",
            format: "Campus event or online application",
            what: "Resume screen; a former intern advises meeting recruiters at career fairs.",
          },
          {
            name: "Recruiter phone screen",
            format: "Short call",
            what: "Background, interests and logistics.",
          },
          {
            name: "Campus or first-round interview",
            format: "Short on-campus or phone interview",
            what: "Reported as fairly basic: discussion of your research and some behavioral questions.",
          },
          {
            name: "Panel interviews",
            format: "Several 45 to 60 minute interviews with managers, team members and HR",
            what: "Deeper experience, problem solving and fit. Some candidates give a presentation of previous work.",
          },
          {
            name: "Offer",
            format: "Recruiter call",
            what: "Timelines reported from a couple of weeks to about seven weeks in older reports.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Reviewers describe STAR-based behavioral questions about adversity and team challenges. 3M's recruiting content urges authenticity rather than telling interviewers what you think they want.",
          themes: ["Overcoming challenges", "Working with difficult teams", "Breadth of skills", "Authenticity", "Fit with the business"],
          examples: [
            "Describe a time your team hit an obstacle and what you did.",
            "Tell me about a difficult situation and how you handled it.",
            "How have you worked with someone hard to collaborate with?",
            "Which 3M business and products interest you?",
          ],
        },
        technical: {
          share: "Moderate; highly dependent on role",
          topics: ["Your research and project work", "Materials, chemical or process fundamentals for relevant roles", "Problem solving", "Communication of technical work"],
          style:
            "Experience-driven discussion, sometimes a technical presentation of earlier work.",
        },
        projects:
          "Campus candidates report questions on their research and past projects. If you present, practice a clear short talk with outcomes.",
        roleNotes: [
          { roleId: "process-engineer", notes: "Manufacturing and process roles probably center on past plant or lab experience; details are limited." },
          { roleId: "quality-engineer", notes: "Expect behavioral and applied problem-solving questions; role-specific reports are scarce." },
          { roleId: "design-engineer", notes: "Product development candidates may discuss materials and projects; confirm format with the recruiter." },
        ],
        prep: [
          "Prepare STAR stories on obstacles, difficult teammates and results.",
          "Be ready to present research or a major project clearly.",
          "Research 3M's business groups and product families.",
          "Be authentic rather than guessing what interviewers want to hear; 3M recruiters call phrases like \"team player\" overused, so give a real example instead.",
          "Quantify results, and ask the hiring manager whether to bring a presentation or work samples; bring photo ID for secured sites.",
          "Use career fairs and internships as the main route in.",
          "Prepare questions about the team and rotational opportunities.",
        ],
      },
    ],
    sources: [
      { label: "3M careers: Application to interview, what the hiring process is like (official)", url: "https://www.3m.com/3M/en_US/careers-us/stay-connected/insights-for-candidates/full-story/?storyid=00d48a6b-b988-4b54-bc1c-c8cccaeca737" },
      { label: "3M careers: Preparing for a 3M interview checklist (official)", url: "https://www.3m.com/3M/en_US/careers-us/stay-connected/insights-for-candidates/full-story/?storyid=a831acd3-1f70-4951-bdf7-2102a3c163df" },
      { label: "3M careers: Bringing your authentic self to an interview (official)", url: "https://www.3m.com/3M/en_US/careers-us/stay-connected/insights-for-candidates/full-story/?storyid=d314f0a0-072a-4f5b-bb11-f9c80931a975" },
      { label: "Gradcracker: 3M blogs", url: "https://www.gradcracker.com/hub/17/3m/blogs" },
      { label: "Glassdoor 3M interview report", url: "https://www.glassdoor.co.uk/Interview/3M-Interview-E446-RVW269821.htm" },
      { label: "Glassdoor 3M interview (Saint Paul, 2011)", url: "https://www.glassdoor.sg/Interview/3M-Interview-E446-RVW7046525.htm" },
      { label: "Scoutify: 3M interview", url: "https://scoutify.com/companies/3m-company/interview/" },
    ],
  },
];
