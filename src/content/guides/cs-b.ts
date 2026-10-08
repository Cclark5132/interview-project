import type { CompanyGuide } from "./types";

// Compiled from public candidate reports, prep sites and employer pages (research done 2026-10). Not insider information.
export const csB: CompanyGuide[] = [
  {
    companyId: "databricks",
    summary:
      "Databricks is commonly reported to run a recruiter screen, one or two coding screens and a virtual onsite of roughly four to five rounds covering coding, a concurrency round, system design and behavioral. No official process page was found, so details come from candidate reports and prep sites and vary by team and level.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / new grad",
        stages: [
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, interests, role and location fit, and a walkthrough of the process. Some candidates report a hiring manager chat as well." },
          { name: "Coding phone screen", format: "About 60 min, shared editor", what: "One or two algorithm problems, commonly reported as medium difficulty and sometimes harder. Interviewers reportedly ask for complexity analysis early and care about readable code." },
          { name: "Virtual onsite: coding rounds", format: "Two rounds of about 45-60 min", what: "Data structure and algorithm problems, implementation-heavy tasks and data-transformation style questions." },
          { name: "Virtual onsite: concurrency", format: "About 60 min coding", what: "Commonly reported for software engineers: write correct multithreaded code, such as a bounded blocking queue or thread pool, and reason about races." },
          { name: "Virtual onsite: system design", format: "About 60 min, often a shared document", what: "Distributed-systems flavored design, for example a fault-tolerant key-value store scaled from one machine to many. Some new grads report it; others do not." },
          { name: "Behavioral / hiring manager", format: "About 45-60 min", what: "Motivation, past projects and internships, scope and complexity of your work, and fit with company values." },
          { name: "Decision and offer", format: "Recruiter follow-up", what: "Guides cite roughly 4 to 8 weeks end to end. Team matching practices vary." },
        ],
        behavioral: {
          star: "helpful",
          style: "One dedicated round, plus questions woven into the recruiter and manager conversations. Prep sites say culture and values fit carry real weight, but no official weighting is published.",
          themes: ["Ownership", "Scope and complexity of past work", "Customer focus", "Learning quickly", "Why Databricks"],
          examples: [
            "Describe the hardest technical problem in a project or internship and how you broke it down.",
            "Tell me about a time you owned something end to end with unclear requirements.",
            "How did you handle a disagreement about a technical approach?",
            "Why this company and this kind of data-infrastructure work?",
          ],
        },
        technical: {
          share: "Most of the loop, roughly three to four of five rounds",
          topics: ["Data structures and algorithms", "Concurrency and multithreading", "Distributed system design", "Basic SQL (reported for some new grad roles)", "Spark or database internals (suggested by prep sites, not confirmed)"],
          style: "Live coding in a shared editor, and design discussion often in a shared document rather than a drawing tool, per prep guides. Correct, clean code and clear reasoning are emphasized.",
        },
        projects:
          "Reports mention project and internship discussion mainly in the behavioral round and sometimes in screens. Be ready to explain your design choices, scale, trade-offs and what you would change, especially for anything involving data or systems work.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Expect the concurrency round to be the distinctive piece. Practice writing thread-safe structures in your strongest language." },
          { roleId: "ml-engineer", notes: "ML-specific loops were not well documented in the sources found; expect the same coding core plus team-specific questions. Confirm with your recruiter." },
        ],
        prep: [
          "Practice LeetCode medium problems and talk through complexity before writing code.",
          "Implement a bounded blocking queue, a thread pool and a rate limiter, and explain every lock you use.",
          "Review core distributed-systems ideas: partitioning, replication, consistency and failure handling.",
          "Practice sketching a design in a plain text or document editor, not just a whiteboard.",
          "Brush up on SQL and skim Spark basics, but do not over-invest in product trivia.",
          "Prepare two or three project stories with concrete scope and trade-offs.",
          "Ask your recruiter exactly which rounds apply to your role and location.",
        ],
      },
    ],
    sources: [
      { label: "Techprep: Databricks interview process", url: "https://www.techprep.app/blog/databricks-interview-process" },
      { label: "Exponent: Databricks interview process", url: "https://tryexponent.com/blog/databricks-interview-process" },
      { label: "Blind: Databricks virtual interview for new grads", url: "https://www.teamblind.com/post/databricks-virtual-interview-for-new-grads-wqmuxjyj" },
      { label: "Blind: Databricks new grad SQL prep", url: "https://www.teamblind.com/post/databricks-new-grad-need-to-prepare-sql-refuxu7r" },
      { label: "techinterview.org: What the Databricks engineering interview tests", url: "https://www.techinterview.org/post/3233476801/databricks-engineering-interview/" },
      { label: "Final Round AI: Databricks interview process", url: "https://www.finalroundai.com/blog/databricks-interview-process" },
    ],
  },
  {
    companyId: "palantir",
    summary:
      "Palantir's loop is commonly reported as short and communication-heavy: a recruiter or behavioral call, a coding screen, a decomposition or learning style round where you structure a vague problem, and a hiring manager conversation. Evidence is anecdotal (candidate posts and prep sites); no official process page was found.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / new grad",
        stages: [
          { name: "Online assessment (some tracks)", format: "Timed, online", what: "A London new-grad report describes two easy-to-medium algorithm problems plus a REST API design question. Not every candidate reports one." },
          { name: "Recruiter / behavioral call", format: "15-30 min phone", what: "Background, projects, why Palantir, and what else you are considering." },
          { name: "Technical screen", format: "30-60 min, shared editor", what: "LeetCode-style problem with an engineer, often involving hash maps, lists or scheduling logic." },
          { name: "Decomposition / learning round", format: "About 60 min, open-ended", what: "A vague problem document, unfamiliar codebase or broken API to work through. Reports say interviewers say little, so you must drive." },
          { name: "Hiring manager / team round", format: "30-60 min", what: "Motivation, judgment, resume deep dive, and how you work with others and handle ambiguity." },
          { name: "Decision", format: "Recruiter follow-up", what: "Timelines range from about one week to about four weeks in reports." },
        ],
        behavioral: {
          star: "helpful",
          style: "Spread across the recruiter call and manager round and also observed during technical rounds. Communication, engagement and willingness to ask pointed questions are reported to matter a lot.",
          themes: ["Why Palantir and its mission", "Handling ambiguity", "Communication", "Resume ownership", "Curiosity and asking questions"],
          examples: [
            "Why do you want to work at this company and on this kind of problem?",
            "Walk me through a project on your resume and a decision you would revisit.",
            "Tell me about a time you had to figure out something with little guidance.",
            "How do you react when you disagree with the value of the work you are given?",
          ],
        },
        technical: {
          share: "Roughly half, with unusual weight on open-ended problem solving",
          topics: ["Data structures and algorithms", "Problem decomposition", "Reading and modifying unfamiliar code", "API and basic system design", "Debugging"],
          style: "Live coding plus an unstructured decomposition or code-learning exercise where you propose the framing and narrate trade-offs.",
        },
        projects:
          "Candidates warn that anything on your resume is fair game. Be prepared to explain why you built it, what was hard, and your exact contribution.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Reports mention separate software engineer and forward-deployed tracks; confirm which loop your posting uses." },
          { roleId: "ml-engineer", notes: "No reliable ML-specific loop was found; expect the same general engineering structure and ask your recruiter." },
        ],
        prep: [
          "Practice talking aloud from the first minute; do not wait for hints.",
          "Rehearse turning a vague prompt into requirements, assumptions, a plan and a first version.",
          "Practice reading an unfamiliar codebase and making a small improvement under time pressure.",
          "Solve medium problems involving hash maps, lists and scheduling.",
          "Review REST API design basics.",
          "Prepare a sincere, specific answer on why Palantir.",
          "Be ready to defend every line of your resume.",
        ],
      },
    ],
    sources: [
      { label: "Interview Query: Palantir software engineer guide", url: "https://www.interviewquery.com/guides/palantir-technologies-software-engineer" },
      { label: "Blind: Palantir new grad interview", url: "https://www.teamblind.com/post/palantir-new-grad-interview-moctwnvq" },
      { label: "Blind: Are Palantir interviews really that hard", url: "https://www.teamblind.com/post/are-palantir-interviews-really-that-impossible-to-crack-qjyxgzar" },
      { label: "Taro: Palantir new grad experience (2024)", url: "https://www.jointaro.com/interviews/companies/palantir/experiences/software-engineer-new-grad-new-york-ny-september-1-2024-no-offer-positive-df37be07/" },
      { label: "1Point3Acres: Palantir new grad onsite", url: "https://www.1point3acres.com/interview/thread/821175" },
      { label: "Jobrise: Palantir software engineer interview 2026", url: "https://jobrise.io/en/blog/palantir-software-engineer-interview-2026/" },
    ],
  },
  {
    companyId: "openai",
    summary:
      "OpenAI publishes an interview guide on its site stating that it is not credential-driven, values mission alignment, collaboration and fast ramp-up, and tells candidates in advance whether AI tools are allowed in a given round. Third-party reports describe a recruiter call, coding and design screens, and a 4-5 round loop with a project deep dive; details vary by team.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / ML engineer",
        stages: [
          { name: "Application and resume review", format: "Online, about a week", what: "Recruiting reviews your resume for fit with the specific role and replies by email." },
          { name: "Intro call", format: "Recruiter or hiring manager call", what: "Background, motivation and interest in the work; team and level fit." },
          { name: "Technical screens", format: "Reportedly one or two 60 min rounds", what: "Commonly a practical coding round and sometimes a system design round, sometimes on the same day. Some reports mention a take-home instead or in addition." },
          { name: "Onsite loop", format: "Commonly 4-5 interviews, video by default", what: "Coding, system design, a deep dive on a past project, and one or two behavioral conversations." },
          { name: "Decision and team match", format: "Recruiter follow-up", what: "Reports suggest roughly 3-6 weeks once interviews start." },
        ],
        behavioral: {
          star: "helpful",
          style: "One or two dedicated conversations plus follow-ups inside the project deep dive. OpenAI's guide names collaboration, communication, openness to feedback and mission alignment as priorities.",
          themes: ["Mission and safety motivation", "Collaboration", "Receiving feedback", "Ownership", "Ramping up in a new area"],
          examples: [
            "Why do you want to work on this mission and what concerns you about the field?",
            "Describe learning an unfamiliar domain quickly to deliver something.",
            "Tell me about feedback that changed how you worked.",
            "How did you work through a conflict on a team project?",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: ["Practical coding (streaming output, rate limiting, small systems)", "Data structures and algorithms", "System design", "Project deep dive", "ML fundamentals for ML roles"],
          style: "Live coding in an editor, design discussion and a project walk-through. Interviewers reportedly watch code quality, trade-offs and how you adapt when requirements change. AI-tool rules differ by round.",
        },
        projects:
          "Third-party guides call the project deep dive among the most revealing rounds: what you built, why, the decisions and how you worked with others. Be able to go several layers deep on any project you list.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Reported problems skew practical (build a small service or component) with occasional harder algorithmic questions." },
          { roleId: "ml-engineer", notes: "Loops for research-oriented and applied roles are reported to differ; expect more ML depth and paper or experiment discussion. Evidence is thin, so confirm with your recruiter." },
        ],
        prep: [
          "Read OpenAI's interview guide on its careers site before you start.",
          "Ask your recruiter which rounds allow AI tools and which test unaided work.",
          "Practice realistic build tasks (webhook delivery, rate limiting, diffing streamed text) along with standard algorithms.",
          "Prepare one project you can defend in depth, including failures and metrics.",
          "Write clean, tested code and narrate trade-offs; expect requirement changes mid-round.",
          "Form an honest, specific view on the mission and responsible AI deployment.",
          "For ML roles, review training, evaluation and debugging of models you have built.",
        ],
      },
    ],
    sources: [
      { label: "OpenAI interview guide", url: "https://openai.com/interview-guide/" },
      { label: "IGotAnOffer: OpenAI software engineer interview", url: "https://igotanoffer.com/en/advice/openai-software-engineer-interview" },
      { label: "Exponent: OpenAI software engineer interview", url: "https://www.tryexponent.com/guides/openai-software-engineer-interview" },
      { label: "interviewing.io: OpenAI interview questions", url: "https://interviewing.io/openai-interview-questions" },
      { label: "Interview Query: OpenAI software engineer", url: "https://www.interviewquery.com/guides/openai-software-engineer?exp_page=1" },
    ],
  },
  {
    companyId: "anthropic",
    summary:
      "Third-party guides and press coverage describe Anthropic's process as multi-stage: recruiter call, an online coding assessment, a hiring manager screen, a technical loop and a culture or values conversation, then references and team matching. Anthropic's own candidate AI guidance was retrieved and covers AI-use rules only, so stage detail is secondhand and varies by role.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / ML engineer",
        stages: [
          { name: "Resume screen and recruiter call", format: "Online plus about 30 min call", what: "Motivation, background, role and level fit, and team interests." },
          { name: "Online coding assessment", format: "About 90 min (commonly reported CodeSignal)", what: "Timed coding tasks. Anthropic's candidate guidance says take-home assessments should be done without AI unless the task says otherwise." },
          { name: "Hiring manager screen", format: "About 1 hour", what: "Experience, technical depth and how you approach problems." },
          { name: "Technical loop", format: "Reportedly 4-5 rounds of about 55 min", what: "Coding, design discussion, past-project deep dives and trade-off reasoning." },
          { name: "Culture / values interview", format: "Conversation, interviewer may come from any team", what: "Press coverage says it probes values, worldview and how seriously you take AI risks." },
          { name: "References, team match, offer", format: "Reported 2-4+ weeks", what: "Whole process is reported at roughly 4 weeks to over 3 months." },
        ],
        behavioral: {
          star: "helpful",
          style: "Reported as a separate culture round that can carry real weight, plus questions inside technical rounds. Structure answers but sound genuine rather than rehearsed.",
          themes: ["Mission and AI safety views", "Intellectual curiosity", "Collaboration", "Handling disagreement", "Careful engineering judgment"],
          examples: [
            "What draws you to this company and what do you think of AI risks?",
            "Describe a time you changed your mind after new evidence.",
            "Tell me about a project where you traded speed for safety or quality.",
            "How do you work with people who see a problem differently?",
          ],
        },
        technical: {
          share: "Majority of the loop",
          topics: ["Coding with open-ended, practical problems", "Robust, safe code", "System design", "Project deep dive", "ML knowledge for ML roles"],
          style: "Guides say problems are open-ended and reward first-principles reasoning and correct, robust code over puzzle speed. Candidate guidance reportedly expects live interviews to reflect your own thinking.",
        },
        projects:
          "Reports mention deep dives on past work and trade-off reasoning. Choose projects where you made real decisions and can discuss alternatives, failure modes and results.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Titles are reported as Member of Technical Staff across technical roles; most roles reportedly do not require prior AI experience." },
          { roleId: "ml-engineer", notes: "Expect added ML depth and possibly different assessments; sources on this were thin, so ask your recruiter." },
        ],
        prep: [
          "Check the careers page and your recruiter email for the current assessment rules and AI-use policy.",
          "Practice timed online coding tasks that favor correctness and clean structure.",
          "Rehearse explaining trade-offs and edge cases while coding.",
          "Form and be able to articulate your own considered view on AI safety, without scripted talking points.",
          "Prepare project stories with decisions, alternatives and measurable outcomes.",
          "Write your own first draft of application materials; Anthropic encourages using Claude to refine and to practice, but not to invent experience, and says live interviews allow no AI unless stated.",
          "Expect a long timeline and stay in contact with your recruiter.",
        ],
      },
    ],
    sources: [
      { label: "Anthropic: candidate AI guidance", url: "https://www.anthropic.com/candidate-ai-guidance" },
      { label: "IGotAnOffer: Anthropic software engineer interview", url: "https://igotanoffer.com/en/advice/anthropic-software-engineer-interview" },
      { label: "Exponent: Anthropic software engineer guide", url: "https://www.tryexponent.com/guides/anthropic-software-engineer-interview-guide" },
      { label: "1Point3Acres: Anthropic technical phone screen", url: "https://www.1point3acres.com/interview/thread/1157414" },
      { label: "1Point3Acres: Anthropic onsite", url: "https://www.1point3acres.com/interview/thread/1178509" },
      { label: "Gigazine: Anthropic recruiting coverage", url: "https://gigazine.net/gsc_news/en/20260601-anthropic-recruiting" },
      { label: "Design Gurus: Anthropic interview process", url: "https://www.designgurus.io/answers/detail/what-is-the-anthropic-interview-process-like-round-by-round" },
    ],
  },
  {
    companyId: "salesforce",
    summary:
      "Salesforce new-grad hiring is commonly reported as an online assessment followed by a couple of 45-minute interviews, one technical and one behavioral tied to company values, with a final panel or techno-managerial round in some regions. Salesforce's university-recruiting page confirms phone and onsite formats and gives preparation tips, but no stage list; the stages here come from a small set of Glassdoor reports, some dated.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / new grad (AMTS)",
        stages: [
          { name: "Application / campus shortlist", format: "Online or campus program", what: "Resume screening; early-career programs run through university channels in some regions." },
          { name: "Online assessment", format: "About 60 min, HackerRank-style, proctored", what: "Reports describe about three LeetCode-style problems of mixed difficulty." },
          { name: "Recruiter or manager call", format: "About 30 min", what: "Background, interest and mostly behavioral conversation." },
          { name: "Technical interview", format: "About 45 min", what: "Easy-to-medium coding, concept questions and sometimes a low-level object design task such as an elevator scheduler." },
          { name: "Behavioral / values interview", format: "About 45 min", what: "STAR-style stories against core values and culture fit." },
          { name: "Final round (varies)", format: "Panel or techno-managerial", what: "Older US reports describe several concurrent panels; recent India reports describe a project and temperament interview." },
        ],
        behavioral: {
          star: "expected",
          style: "A dedicated round, reportedly centered on Salesforce's core values. Weighted comparably to a technical round in the loops described.",
          themes: ["Trust", "Customer success", "Teamwork", "Innovation", "Equality and inclusion"],
          examples: [
            "Tell me about a time you earned someone's trust on a team.",
            "Describe building something with a user or customer in mind.",
            "How did you handle a teammate who was not contributing?",
            "Why Salesforce and this team?",
          ],
        },
        technical: {
          share: "About half of the interview rounds",
          topics: ["Arrays, strings, hash maps, sliding window, intervals", "OOP and low-level design", "Basic system design (varies)", "CS fundamentals"],
          style: "Shared-editor or whiteboard-style coding, with design discussion and project questions. Reports found no consistent large-scale system design round at new-grad level.",
        },
        projects:
          "A techno-managerial or final round is reported to dig into your projects and how you work in a team. Know your tech choices and your own contribution.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Platform, Slack, MuleSoft and Tableau teams may run slightly different loops; ask your recruiter." },
          { roleId: "ml-engineer", notes: "No official or reliable ML-specific loop was found in the pages checked; expect the same coding screen plus team-dependent ML questions, and ask your recruiter." },
        ],
        prep: [
          "Practice timed easy-to-medium problems on sliding window, hash maps and intervals.",
          "Do a few object-oriented design exercises, such as an elevator or parking lot class design.",
          "Read Salesforce's stated values and map real stories to each.",
          "Prepare three to four STAR stories on teamwork, conflict and customer impact.",
          "Expect a proctored assessment with camera and full-screen rules.",
          "Be ready to explain your projects end to end.",
          "Salesforce suggests reviewing its values and products and exploring Trailhead; for phone interviews, have a quiet space, your resume and the job description at hand.",
        ],
      },
    ],
    sources: [
      { label: "Salesforce: navigating your interview (university recruiting)", url: "https://www.salesforce.com/company/careers/university-recruiting/navigating-your-interview/" },
      { label: "Glassdoor: Salesforce interview review (2025 SF)", url: "https://www.glassdoor.co.nz/Interview/Salesforce-Interview-E11159-RVW99704702.htm" },
      { label: "Glassdoor: Salesforce new grad review", url: "https://www.glassdoor.com/Interview/Salesforce-Interview-E11159-RVW26132875.htm" },
      { label: "Glassdoor: Salesforce interview review", url: "https://www.glassdoor.com/Interview/Salesforce-Interview-E11159-RVW24400656.htm" },
      { label: "Glassdoor: Salesforce interview review (Singapore)", url: "https://www.glassdoor.sg/Interview/Salesforce-Interview-E11159-RVW98723441.htm" },
    ],
  },
  {
    companyId: "adobe",
    summary:
      "Adobe is commonly reported to use a recruiter screen, one or more technical rounds with coding and sometimes design, and a behavioral or hiring-manager conversation, often as a team panel in one day. Evidence is mainly Glassdoor and prep sites across many years and countries, so details vary by team.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / new grad",
        stages: [
          { name: "Application and online assessment", format: "Online", what: "Some candidates report a coding assessment before the first call; campus processes may add a written test." },
          { name: "Recruiter call", format: "About 30 min", what: "Resume walkthrough, motivation and a few light behavioral questions." },
          { name: "Technical interviews", format: "One to three rounds of about 45-60 min", what: "Data structure and algorithm problems, sometimes a hybrid coding and design round; ML questions appear on some teams." },
          { name: "Hiring manager conversation", format: "30-60 min", what: "Team fit, projects and working style." },
          { name: "Panel day (some teams)", format: "Rounds in one day, split by team", what: "A US new-grad report describes coding, hybrid and behavioral panels on the same day." },
          { name: "Decision", format: "Recruiter follow-up", what: "Glassdoor averages suggest about three to four weeks; prep guides say two to six." },
        ],
        behavioral: {
          star: "expected",
          style: "Competency-based questions tied to company values, often asked in the recruiter call and again in a final or manager round.",
          themes: ["Collaboration", "Innovation", "Handling disagreement", "Customer focus", "Why Adobe"],
          examples: [
            "Describe a disagreement with a coworker and how you resolved it.",
            "Tell me about a time you worked across functions toward a customer outcome.",
            "How do you act when requirements are unclear?",
            "What interests you in this team's products?",
          ],
        },
        technical: {
          share: "About half to two thirds",
          topics: ["Data structures and algorithms", "OOP and CS fundamentals", "System design (more common above entry level)", "ML basics for ML-related teams"],
          style: "Coding with explanation of your thought process, sometimes on a whiteboard-style editor. Interviewers are reported to probe depth beyond a working answer.",
        },
        projects:
          "Project discussion appears in recruiter and manager rounds. Know the tech stack, your role and measurable results.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Loops are team-specific, so the number and order of rounds differ across Creative Cloud, Document Cloud and Experience Cloud groups." },
          { roleId: "ml-engineer", notes: "A recent report mentions general ML knowledge questions alongside coding; evidence is thin." },
        ],
        prep: [
          "Practice array, string, hash map and tree problems and explain your reasoning aloud.",
          "Prepare four STAR stories covering teamwork, conflict, ambiguity and customer impact.",
          "Use Adobe products and think about how you would improve one.",
          "Review OOP and basic design problems; practice one or two classic design prompts.",
          "Ask your recruiter whether your team uses a panel day.",
          "Be ready for a clear answer to why Adobe.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Adobe interview review (new grad panel)", url: "https://www.glassdoor.com.hk/Interview/Adobe-Interview-E1090-RVW81934601.htm" },
      { label: "Glassdoor: Adobe interview review", url: "https://www.glassdoor.com.hk/Interview/Adobe-Interview-E1090-RVW23155186.htm" },
      { label: "Interview Query: Adobe software engineer guide", url: "https://www.interviewquery.com/interview-guides/adobe-software-engineer" },
      { label: "Prepfully: Adobe software engineer", url: "https://prepfully.com/interview-guides/adobe-software-engineer" },
      { label: "Final Round AI: Adobe interview process", url: "https://www.finalroundai.com/blog/adobe-interview-process" },
      { label: "AlgoMonster: Adobe interview guide", url: "https://algo.monster/interview-guides/adobe" },
    ],
  },
  {
    companyId: "oracle",
    summary:
      "Oracle new-grad loops, especially Oracle Cloud Infrastructure (OCI), are commonly reported as a recruiter call, a CoderPad-style technical screen and a half- or full-day onsite of three to five rounds mixing coding and behavioral. No official Oracle process page was retrieved; evidence is mostly older anonymous posts and prep guides, and round counts vary by team and region.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software developer / new grad (OCI)",
        stages: [
          { name: "Recruiter call", format: "About 30 min", what: "Classes, projects, background and logistics; recruiters batch calls and then choose who advances." },
          { name: "Technical phone screen", format: "About 60 min, CoderPad", what: "Reported as around three easy-to-medium coding problems." },
          { name: "Onsite coding rounds", format: "Two to three 60 min rounds", what: "Similar-difficulty coding problems, with data structures, SQL or backend concepts depending on team." },
          { name: "Behavioral / hiring manager", format: "Part of onsite, sometimes over lunch", what: "Workplace scenarios, values and team fit; about half an hour of one OCI round was reported to be behavioral." },
          { name: "Decision", format: "Recruiter follow-up", what: "Timelines are not consistently reported." },
        ],
        behavioral: {
          star: "expected",
          style: "At least one behavioral segment in the loop, and candidates are advised to know the organization's values. Weight appears moderate but real.",
          themes: ["Teamwork", "Ownership", "Handling conflict", "Learning quickly", "Fit with team values"],
          examples: [
            "Tell me about a team project where something went wrong.",
            "Describe a situation where you had to learn a tool quickly.",
            "How do you handle a coworker who disagrees with your approach?",
            "Why cloud infrastructure and why this team?",
          ],
        },
        technical: {
          share: "Majority, roughly two thirds",
          topics: ["Data structures and algorithms", "SQL and databases", "Backend and OS concepts", "System design (reported by some, not for all new grads)"],
          style: "Live coding in a shared editor like CoderPad, with talk-through of complexity.",
        },
        projects:
          "Recruiter and early rounds ask about classes and projects. Expect questions on what you built and the languages and concepts behind it.",
        roleNotes: [
          { roleId: "software-engineer", notes: "OCI teams are reported to have a longer onsite than other Oracle groups; one commenter said no system design for new grads, though a recent review mentions it." },
          { roleId: "ml-engineer", notes: "No reliable evidence found for ML-specific loops; guides say Oracle interviews vary by team and role, so confirm the format with your recruiter." },
        ],
        prep: [
          "Practice easy-to-medium problems in a plain shared editor without autocomplete.",
          "Review SQL, OS and database fundamentals.",
          "Read Oracle and OCI's stated values and prepare matching STAR stories.",
          "Learn a basic system design approach in case your team asks.",
          "Ask the recruiter how many rounds to expect, as reports range from three to five.",
          "Plan for a long onsite day and pace your energy.",
        ],
      },
    ],
    sources: [
      { label: "Exponent: Oracle interview process", url: "https://www.tryexponent.com/blog/oracle-interview-process" },
      { label: "Final Round AI: Oracle interview process", url: "https://www.finalroundai.com/blog/oracle-interview-process" },
      { label: "LeetCode: Oracle OCI new grad experience", url: "https://leetcode.com/discuss/interview-experience/887983/oracle-oci-new-grad-experience-october-2020" },
      { label: "Blind: Oracle OCI round 1 phone screen", url: "https://www.teamblind.com/post/oracle-oci-round-1-phone-screen-7levki2n" },
      { label: "Blind: New grad onsite 5 rounds", url: "https://www.teamblind.com/post/new-grad-on-site-will-take-6-hours-5-rounds-break-vefok2ux" },
      { label: "LeetCode: Oracle OCI software engineer Zoom interview", url: "https://leetcode.com/discuss/career/888786/oracle-oci-software-engineer-zoom-interview" },
      { label: "Glassdoor: Oracle interview review", url: "https://www.glassdoor.co.nz/Interview/Oracle-Interview-E1737-RVW96300439.htm" },
    ],
  },
  {
    companyId: "ibm",
    summary:
      "IBM's career guidance page outlines application, expert screening, one or two online assessments (coding, video or English, depending on role), then phone, video, in-person or assessment-center interviews and a decision. Candidate reviews add HackerRank-style coding and technical plus manager or HR rounds. The process differs by country and business unit.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / entry level",
        stages: [
          { name: "Application and resume screen", format: "Online; status trackable in the candidate portal", what: "IBMers with expertise in your field review your application, skills and experience." },
          { name: "Online assessment", format: "One or two assessments depending on role: coding, video or English language (per IBM); reviews describe HackerRank-style tests", what: "Reviews describe coding scored on hidden test cases, from two problems in 45 minutes to longer sessions." },
          { name: "Interview", format: "Phone, video, in person or an assessment center, per IBM; reviews say about 30-60 min", what: "Interviews are structured around past behavior and outcomes. Reviews describe a team manager or engineer asking about experience, basic coding and behavior." },
          { name: "Technical interview(s)", format: "One or two rounds", what: "Data structures, OOP, databases, OS and project questions; some live coding." },
          { name: "HR / manager round", format: "Short call", what: "Fit, expectations and logistics." },
          { name: "Background check and offer", format: "Post-interview", what: "Reported as a standard step; total time varies from weeks to months." },
        ],
        behavioral: {
          star: "helpful",
          style: "Mixed into manager and HR conversations rather than a separate loop in most reports, with lighter weight than coding for engineering roles.",
          themes: ["Teamwork", "Client or customer focus", "Learning", "Motivation for IBM", "Adaptability"],
          examples: [
            "Tell me about a team project and your role in it.",
            "Describe a time you had to pick up a new technology.",
            "How do you handle shifting priorities?",
            "Why this business area at IBM?",
          ],
        },
        technical: {
          share: "Majority of the evaluation",
          topics: ["Arrays, hash maps, strings", "Data structures and algorithms", "OOP and databases", "OS fundamentals", "Web framework basics (some reports)"],
          style: "Auto-graded online coding followed by live coding or discussion on a collaborative platform.",
        },
        projects:
          "Candidates report interviewers asking detailed questions about the resume and technologies used. Revise any language or tool you list.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Interview structure differs by country; India campus and US/Canada reports look different, so check with your recruiter." },
          { roleId: "ml-engineer", notes: "IBM's guidance does not describe an ML-specific loop, and none was found elsewhere; expect the same assessment steps plus domain questions and confirm with your recruiter." },
        ],
        prep: [
          "Practice HackerRank-style problems with hidden tests, including edge cases and performance.",
          "Review arrays, hash maps, string parsing and sliding window patterns.",
          "Revise OOP, databases and OS basics.",
          "Prepare to discuss every item on your resume in detail.",
          "Prepare STAR stories for teamwork and learning.",
          "Follow up with your recruiter, as communication is reportedly inconsistent.",
          "Use AI for preparation such as mock interviews if you like, but IBM says it is not allowed during live interviews or assessments.",
          "Be ready to discuss short-, mid- and long-term goals, as IBM lists this as a possible question.",
        ],
      },
    ],
    sources: [
      { label: "IBM Careers: career guidance", url: "https://www.ibm.com/careers/career-guidance" },
      { label: "Glassdoor: IBM interview review", url: "https://www.glassdoor.co.nz/Interview/IBM-Interview-E354-RVW13126980.htm" },
      { label: "Glassdoor: IBM interview review (UK)", url: "https://www.glassdoor.co.uk/Interview/IBM-Interview-E354-RVW102026819.htm" },
      { label: "Glassdoor: IBM interview review (HackerRank)", url: "https://www.glassdoor.ie/Interview/IBM-Interview-E354-RVW94250228.htm" },
      { label: "Glassdoor: IBM interview review (Canada)", url: "https://www.glassdoor.ca/Interview/IBM-Interview-E354-RVW52063764.htm" },
      { label: "Taro: IBM software engineer experience", url: "https://www.jointaro.com/interviews/companies/ibm/work-experiences/software-engineer-atlanta-ga-june-19-2016-3-6fd67dc9/" },
    ],
  },
  {
    companyId: "snowflake",
    summary:
      "Snowflake's careers site describes four engineering stages: a roughly 30 minute initial screen, 60 minute technical interviews on coding and/or system design, a panel of three to five 60 minute sessions, then a team debrief and decision. It says steps vary by team, and a new-grad-specific loop is not described. Candidate reports add CoderPad-style screens.",
    asOf: "2026-10",
    confidence: "high",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Initial screen", format: "About 30 min call with a recruiter and/or hiring manager (per Snowflake)", what: "Covers your technical skills. Snowflake says you may meet your future manager early, so use it to ask about the role and process." },
          { name: "Technical interviews", format: "60 min each (per Snowflake); candidate reports often mention CoderPad", what: "Live coding and/or system design, plus assessments. Reports mention trees and graphs, medium to hard in some cases, with complexity analysis expected." },
          { name: "Panel interviews", format: "Three to five 60 min sessions (per Snowflake); a 30 min tech talk may be included depending on level and role", what: "Meetings with several team members covering technical, expertise, system design, behavioral and collaboration topics." },
          { name: "Decision", format: "Team debrief, usually within a few days of the final round (per Snowflake)", what: "Reference and background checks follow local labor law. Snowflake quotes two to four weeks overall; third-party guides say longer." },
        ],
        behavioral: {
          star: "helpful",
          style: "One behavioral round in reported onsites, with manager conversations covering motivation. Weight is not published.",
          themes: ["Ownership", "Collaboration", "Handling ambiguity", "Interest in data infrastructure"],
          examples: [
            "Tell me about a technically difficult project and your part in it.",
            "Describe working through disagreement with a teammate.",
            "What interests you about cloud data platforms?",
            "Tell me about a time you made a mistake and recovered.",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: ["Trees and graphs", "Complexity analysis", "System design (level dependent)", "Databases and SQL basics"],
          style: "Live coding in a shared editor with clear complexity discussion.",
        },
        projects:
          "Project discussion is likely in screens and the behavioral round, though sources give little detail. Prepare to explain your own contribution.",
        roleNotes: [
          { roleId: "software-engineer", notes: "The number and order of interviews are reported to differ from team to team." },
          { roleId: "ml-engineer", notes: "Snowflake's page describes engineering roles generally, not ML-specific loops, and no reliable ML report was found; confirm with your recruiter." },
        ],
        prep: [
          "Drill tree and graph problems and state time and space complexity every time.",
          "Practice in CoderPad or a plain shared editor.",
          "Learn basic SQL and how a database or query engine works at a high level.",
          "Prepare a short, honest project story and an interest in data platforms.",
          "Ask your recruiter whether your role includes a design round or a tech talk.",
          "Read Snowflake's guidance on when and how AI may be used in interviews before you start.",
        ],
      },
    ],
    sources: [
      { label: "Snowflake Careers: get hired", url: "https://careers.snowflake.com/us/en/gethired" },
      { label: "interviewing.io: Snowflake interview process", url: "https://interviewing.io/snowflake-interview-questions" },
      { label: "Prepfully: Snowflake software engineer", url: "https://prepfully.com/interview-guides/snowflake-software-engineer-interview" },
      { label: "Glassdoor: Snowflake interview review", url: "https://www.glassdoor.com/Interview/Snowflake-Interview-E928471-RVW11045849.htm" },
      { label: "Glassdoor: Snowflake interview review (recent)", url: "https://www.glassdoor.com/Interview/Snowflake-Interview-E928471-RVW102272781.htm" },
      { label: "LeetCode: Snowflake SWE intern offer", url: "https://leetcode.com/discuss/interview-experience/2044158/snowflake-software-engineer-intern-us-summer-2022-offer" },
    ],
  },
  {
    companyId: "intuit",
    summary:
      "Intuit new-grad hiring is commonly reported as an online assessment, a recruiter call, one or more technical rounds and a behavioral or HR conversation, with some recent reports mentioning a take-home build and questions about how you use AI tools. Evidence is mostly anonymous reviews across years and countries.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer / new grad",
        stages: [
          { name: "Online assessment", format: "Timed, HackerRank-style or asynchronous video", what: "Algorithm problems, and in some recent reports SQL and a regex task; older reports mention four questions." },
          { name: "Recruiter call", format: "About 30 min", what: "Background and motivation; one 2026 report says it covered how you used AI in a project." },
          { name: "Technical interview", format: "45-60 min", what: "Practical data structure problems, projects, OOP, and in India reports DBMS and CS fundamentals." },
          { name: "Take-home (some)", format: "Build challenge", what: "A recent UK report describes a take-home build before the final technical interview." },
          { name: "Final technical / behavioral", format: "One or two rounds", what: "Further coding or design discussion plus behavioral and values questions." },
          { name: "Decision", format: "Recruiter follow-up", what: "Glassdoor data suggests about three weeks on average; one guide says four to six." },
        ],
        behavioral: {
          star: "expected",
          style: "Behavioral and personality questions are mixed into technical rounds and recruiter calls, plus an HR or final conversation. Prep advice stresses customer focus and innovation.",
          themes: ["Customer obsession", "Innovation", "Teamwork", "Ownership", "Responsible AI use"],
          examples: [
            "Tell me about a time you focused on a user's real problem.",
            "Describe a project where you used AI tools and how you checked the output.",
            "Share a time you disagreed with a teammate.",
            "Why Intuit and which products interest you?",
          ],
        },
        technical: {
          share: "About half to two thirds",
          topics: ["Arrays and everyday data-structure problems", "SQL", "OOP", "DBMS and OS fundamentals", "Python or regex tasks (some)"],
          style: "Auto-graded or asynchronous online tasks, then live coding and resume-based technical questions; a take-home appears in some reports.",
        },
        projects:
          "Resume and project questions are reported in technical and behavioral rounds. Be ready to explain any AI-assisted code you submitted, including what it did and where you verified it.",
        roleNotes: [
          { roleId: "software-engineer", notes: "India reports lean toward CS fundamentals and DBMS; US reports lean toward practical coding and behavioral." },
          { roleId: "ml-engineer", notes: "No reliable ML-specific loop found in sources; ask your recruiter." },
        ],
        prep: [
          "Practice medium array and string problems plus SQL queries.",
          "Review DBMS, OS and OOP basics.",
          "Know Intuit's products (TurboTax, QuickBooks, Credit Karma, Mailchimp) and the customer problems they solve.",
          "Prepare to explain how you use AI tools responsibly and verify results.",
          "Build STAR stories around customer impact and innovation.",
          "Confirm with your recruiter whether a take-home is part of your process.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Intuit interview review (San Jose)", url: "https://www.glassdoor.com.au/Interview/Intuit-Interview-E2293-RVW8318923.htm" },
      { label: "Glassdoor: Intuit interview review (2026 UK)", url: "https://www.glassdoor.co.uk/Interview/Intuit-Interview-E2293-RVW101490508.htm" },
      { label: "Blind: Intuit new grad", url: "https://www.teamblind.com/post/intuit-new-grad-avsvy2vq" },
      { label: "Interview Query: Intuit software engineer guide", url: "https://www.interviewquery.com/interview-guides/intuit-software-engineer" },
      { label: "Glassdoor: Intuit interview review (Canada)", url: "https://www.glassdoor.ca/Interview/Intuit-Interview-E2293-RVW99162157.htm" },
    ],
  },
];
