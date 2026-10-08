import type { CompanyGuide } from "./types";

export const csC: CompanyGuide[] = [
  {
    companyId: "jane-street",
    summary:
      "Jane Street's own pages describe the software engineering path as a Zoom technical interview followed by in-person final rounds built around working through coding problems together. The firm says it avoids puzzles, mental math and probability for developers, and that the journey matters more than the final answer. Round counts and team matching come from third-party reports.",
    asOf: "2026-10",
    confidence: "high",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Application review", format: "A person reads each application; the firm aims to reply within about a week", what: "You are considered for all open roles, so you may be steered toward a different role or team than the one you applied to." },
          { name: "Technical interview", format: "First round over Zoom, with a shared editor (official); length around an hour per candidate reports", what: "Open-ended coding problems in a real language of your choice, not pseudocode. Expect extensions and follow-ups as you go." },
          { name: "Final rounds", format: "In person at an office (official); commonly reported as several coding sessions in one day", what: "Collaborative problem solving where interviewers care how you reason, communicate and take hints more than the finished snapshot. Exact counts are third-party reports." },
          { name: "Project conversation", format: "Discussion of a past project (reported mainly for more senior candidates)", what: "Why you made the decisions you did, what you would change, and honesty about what you do not know." },
          { name: "Decision and team matching", format: "Outcome usually communicated within about a week of interviewing (official blog)", what: "Hiring is centralized, so team placement is reported to happen after you pass; total timeline reports of about a month are self-reported." },
        ],
        behavioral: {
          star: "helpful",
          style: "No standalone behavioral interview is commonly described; collaboration and communication are judged inside every technical round, plus a project discussion for experienced candidates.",
          themes: ["collaboration without ego", "clear thinking aloud", "intellectual honesty", "ownership of past work", "curiosity"],
          examples: [
            "Walk us through a project you built and the design choices you would revisit.",
            "Tell us about a time you were wrong and how you found out.",
            "Describe a disagreement over a technical approach and how it ended.",
            "What part of your project do you understand least well?",
          ],
        },
        technical: {
          share: "Nearly all of the process",
          topics: ["basic data structures and your language's APIs", "building small programs (games, trees, caches), per third-party reports", "extensible code design", "functional programming is not required", "no math or probability for general software roles (official)"],
          style: "Live coding in a language of your choice; Jane Street says it prefers open-ended problems over algorithm trivia or puzzles with a trick answer. The problem evolving over the session is a third-party description.",
        },
        projects:
          "Mostly relevant through the project conversation (stronger emphasis at senior levels), but follow-ups go deep. Pick one project, know the trade-offs, and be ready to admit gaps.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Jane Street says OCaml experience is not needed and advises against trying it for the first time in the interview; use the language you know best. Quantitative trading and research interviews are separate and test different skills." },
        ],
        prep: [
          "Use Jane Street's own mock interview video and written walkthrough of a past question to see the style.",
          "Practice building small complete programs (a board game, an LRU cache, a tree structure) rather than only isolated puzzles.",
          "Write code that is easy to extend; interviewers add requirements mid-problem.",
          "Narrate your reasoning and use hints gracefully; collaboration is part of the grade.",
          "Pick your best language and know its standard library cold.",
          "Rehearse a project deep dive covering decisions, alternatives and mistakes.",
          "Build stamina with several back-to-back hour-long mock sessions.",
          "Do not spend your prep time on finance knowledge; it is reportedly not required for developers.",
        ],
      },
    ],
    sources: [
      { label: "Jane Street: Preparing for a software engineering interview (official)", url: "https://www.janestreet.com/preparing-for-a-software-engineering-interview/" },
      { label: "Jane Street: Interviewing (official)", url: "https://www.janestreet.com/join-jane-street/interviewing/" },
      { label: "Jane Street blog: What a dev interview is like (official)", url: "https://blog.janestreet.com/what-a-jane-street-dev-interview-is-like/" },
      { label: "Exponent: Jane Street SWE interview guide", url: "https://www.tryexponent.com/guides/jane-street-software-engineer-interview" },
      { label: "Everything Quant: SWE at Jane Street", url: "https://everythingquant.com/guides/software-engineering-at-jane-street/" },
    ],
  },
  {
    companyId: "citadel",
    summary:
      "Citadel's campus engineering guide (as summarized from search results; the page itself blocked direct fetching) describes four steps over roughly eight weeks, starting with a 45-minute video interview that mixes technical and behavioral questions, then a second round, with team-specific interviews only if a team shows interest. Interviews are language-agnostic. Details such as the online assessment come from third-party reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter screen", format: "15-30 min call", what: "Background, motivation and why finance. Citadel and Citadel Securities are separate entities, so confirm which one the role is in." },
          { name: "Online assessment (reported)", format: "Third-party reports describe about 75 min on HackerRank, 2-3 problems", what: "Algorithmic problems where passing nearly all test cases matters. Not confirmed on Citadel's pages I could read." },
          { name: "First-round interview", format: "About 45 min video interview (Citadel campus guide); Citadel Securities sends a CoderPad link", what: "Coding, data structures, algorithms and problem solving, with some behavioral questions; you may be asked to walk through your reasoning." },
          { name: "Second round", format: "Interviews with engineers; an older student page described three to five 60 min sessions, current format may differ", what: "Harder coding plus design and fundamentals; fit for a specific team is not assessed in the first two rounds per Citadel." },
          { name: "Leadership interview and team interviews", format: "Leadership conversation with a senior engineer (Citadel Securities intern page), then team interviews if a team is interested", what: "Hiring managers across teams review your feedback and resume; interested teams call you in. Overall campus timeline is stated as about eight weeks." },
        ],
        behavioral: {
          star: "helpful",
          style: "A smaller part of the process; handled in recruiter, hiring-manager or senior conversations, with vague answers about why finance seen as a weakness.",
          themes: ["ownership", "decisions under pressure", "why a trading firm rather than big tech", "intensity and pace", "learning from mistakes"],
          examples: [
            "Why do you want to work in finance instead of a standard software company?",
            "Tell me about a decision you made quickly with incomplete information.",
            "Describe the hardest technical problem you owned end to end.",
            "Tell me about feedback that changed how you work.",
          ],
        },
        technical: {
          share: "The large majority",
          topics: ["medium-to-hard DSA (DP, graphs, tries, sliding window)", "low-latency system design (order book, market data)", "C++ and concurrency where it is on your resume", "OS and networking fundamentals", "optimization and time/space trade-offs"],
          style: "Shared-editor coding with follow-ups that push on performance; design discussions center on throughput and latency.",
        },
        projects:
          "Expect questions about anything on your resume, especially low-level or performance work. Be ready to explain measured results and design choices.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Intern and new-grad candidates should expect the algorithm-heavy path; design depth grows with seniority. Quant researcher and trader loops reportedly add probability, statistics and market-style reasoning that the developer loop mostly omits." },
          { roleId: "firmware-engineer", notes: "Low-level work (C++, hardware-adjacent latency) is relevant to some infrastructure teams; commonly reported topics are memory, concurrency and networking. Reports specific to firmware roles are thin." },
        ],
        prep: [
          "Practice timed HackerRank-style sets: 2-3 problems in about 75 minutes.",
          "Always state a brute force and then optimize; show complexity.",
          "If you list C++, review memory management, templates and thread-safe structures such as ring buffers.",
          "Prepare a sincere, specific answer to why finance and why Citadel.",
          "Practice talking through a modest real-time systems design with latency numbers.",
          "Confirm with the recruiter whether the role is Citadel or Citadel Securities and which team.",
        ],
      },
    ],
    sources: [
      { label: "Citadel: Our campus engineering interview process (official)", url: "https://www.citadel.com/careers/career-perspectives/our-engineering-interview-process/" },
      { label: "Citadel Securities: Internship and new graduate engineering interview process (official)", url: "https://www.citadelsecurities.com/careers/career-perspectives/internship-and-new-graduates-engineering-interview-process/" },
      { label: "Citadel: FAQs, engineering at Citadel (official)", url: "https://www.citadel.com/careers/career-perspectives/faqs-engineering-at-citadel/" },
      { label: "TechPrep: Citadel interview process", url: "https://www.techprep.app/blog/citadel-interview-process" },
      { label: "Glassdoor: Citadel interview report", url: "https://www.glassdoor.ca/Interview/Citadel-Interview-E14937-RVW100926729.htm" },
    ],
  },
  {
    companyId: "two-sigma",
    summary:
      "Two Sigma's software engineer process is reported as coding-centered: an online or phone coding screen followed by several technical interviews, many with hard algorithm problems. I could not find an official Two Sigma interview-process page, so everything here rests on a few Glassdoor reports; round counts and design content are uncertain.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter contact", format: "Short call", what: "Background, interests and logistics; commonly the first step." },
          { name: "Online assessment", format: "HackerRank-style timed test (reported)", what: "Algorithm problems of roughly medium difficulty; one report mentions string decoding." },
          { name: "Technical phone screen", format: "About 60 min live coding", what: "A data-structure problem, sometimes hard LeetCode level, with 5 min of intro and time for your questions." },
          { name: "Final technical rounds", format: "Several 60 min interviews, possibly back-to-back, virtual or onsite", what: "Hard algorithmic problems (BFS/DFS, binary search, math), and some candidates report Python tasks like implementing a mock database class and optimizing it." },
          { name: "Team conversation and offer", format: "Conversation with team members, then decision", what: "Fit with team and role. Glassdoor suggests averages around four weeks, from a small sample." },
        ],
        behavioral: {
          star: "helpful",
          style: "Behavioral weight is not well documented. Expect short motivation and teamwork questions alongside technical rounds.",
          themes: ["intellectual curiosity", "teamwork", "interest in data and quantitative work", "learning from setbacks"],
          examples: [
            "Why Two Sigma, and why technology applied to investing?",
            "Describe a project where data shaped your decisions.",
            "Tell me about a time you worked through a hard bug as a team.",
          ],
        },
        technical: {
          share: "Most of the process",
          topics: ["data structures and algorithms", "graph search and binary search", "math-flavored problems", "Python for implementation-style tasks", "design for data-heavy systems (team dependent)"],
          style: "Live coding on a shared platform; reviewers report running out of time, so pacing matters.",
        },
        projects:
          "Expect resume-based questions, especially for data or systems projects. Prepare to explain choices and results clearly.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Quantitative researcher and modeler roles are reported to add statistics, probability and modeling tasks; the engineer loop stays coding-oriented." },
          { roleId: "ml-engineer", notes: "Data and ML-leaning teams likely probe modeling or data-pipeline experience on top of coding; specific evidence is thin, so verify with the recruiter." },
        ],
        prep: [
          "Practice hard-level graph, search and math problems under 45-60 minute limits.",
          "Get fluent in Python implementation tasks (classes, containers, optimization).",
          "Time-box: aim for a correct solution first, then optimize, since people report running out of time.",
          "Practice explaining your thought process aloud while coding.",
          "Prepare a project story involving data or performance work.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Two Sigma interview report", url: "https://www.glassdoor.com/Interview/Two-Sigma-Interview-E241045-RVW689752.htm" },
      { label: "Glassdoor: Two Sigma interview report 2", url: "https://www.glassdoor.com/Interview/Two-Sigma-Interview-E241045-RVW644309.htm" },
      { label: "Glassdoor: Two Sigma interview report 3", url: "https://www.glassdoor.co.uk/Interview/Two-Sigma-Interview-E241045-RVW103330214.htm" },
    ],
  },
  {
    companyId: "hrt",
    summary:
      "HRT's engineering blog describes a timed take-home coding test, about two technical phone interviews, then a full day of back-to-back interviews. It says the rounds probe programming quality, systems fundamentals, incremental problem solving and collaboration, and that it avoids sudden-insight puzzle questions. You pick C++ or Python at application, which changes the depth of low-level questions.",
    asOf: "2026-10",
    confidence: "high",
    tracks: [
      {
        group: "computer-science",
        label: "Software developer",
        stages: [
          { name: "Application and language choice", format: "Resume screen; you indicate C++ or Python for the software engineering track", what: "The language preference shapes later questions: C++ candidates are expected to know more about how computers work at a low level." },
          { name: "Take-home coding test", format: "Timed with a deadline, usually on HackerRank or Codility (official blog)", what: "HRT says the sample tests are not comprehensive, so check edge cases yourself; style matters less here than correctness." },
          { name: "Technical discussion (phone)", format: "About 45 min (official blog)", what: "A conversation on systems knowledge, data structures or problem solving." },
          { name: "Programming interview (phone)", format: "Team-specific; some roles require C++ or Python, others allow any language", what: "Live programming tailored to the team you are interviewing with." },
          { name: "Onsite", format: "Full day of back-to-back interviews, virtual or in person (official blog)", what: "Assesses idiomatic readable code, systems fundamentals (memory, I/O, processes), breaking down unfamiliar problems, and communication including how you take hints. Overall timelines of one to two months are third-party reports." },
        ],
        behavioral: {
          star: "helpful",
          style: "HRT's own guidance stresses collaboration, thinking aloud and explaining past work to interviewers who may not know your area; a distinct behavioral round is a third-party report.",
          themes: ["technical ownership", "handling disagreement", "depth in past projects", "curiosity", "collaboration"],
          examples: [
            "Walk through a complex project and the trade-offs you made.",
            "Tell me about a technical disagreement and how you handled it.",
            "Describe a time you had to dig deep into a performance issue.",
            "What are you hoping to learn at a trading firm?",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: ["competitive-programming style algorithms (graphs, DP, strings)", "OS, networking and concurrency fundamentals", "C++ internals and low-latency performance", "lock-free structures, cache effects (core developer)", "occasional design or case-study discussion"],
          style: "Live coding plus oral systems questions. HRT says common pitfalls include testing only the sample cases, silently backtracking, staying quiet when stuck, and not mentioning that you have seen a problem before.",
        },
        projects:
          "Project depth is checked in the behavioral and design conversations. Prepare two or three projects with measurable details and trade-offs.",
        roleNotes: [
          { roleId: "software-engineer", notes: "General SWE candidates see algorithms weighted more; core developers get more low-level systems. Algo developer and trader tracks are reported to add probability, expected-value and market reasoning." },
          { roleId: "firmware-engineer", notes: "Hardware-adjacent skills (networking, kernel and memory behavior, FPGA-adjacent work) may suit core and infrastructure teams, but public evidence for firmware-specific loops is thin." },
        ],
        prep: [
          "Practice timed take-home style problems and test your own edge cases rather than relying on the samples.",
          "Study OS and concurrency basics: threads versus processes, virtual memory, synchronization, I/O.",
          "If using C++, review low-level behavior and modern idioms; Python candidates still need virtual memory and systems basics.",
          "Think aloud, say when you have seen a problem, and flag any change of approach.",
          "Prepare to explain a past project to someone outside your specialty.",
          "Treat your recruiter's guidance as the source of truth; HRT says it overrides its blog posts.",
        ],
      },
    ],
    sources: [
      { label: "HRT: How to prepare for your software engineer interview (official)", url: "https://www.hudsonrivertrading.com/hrtbeat/interview-at-hrt/" },
      { label: "HRT: Engineering and interviewing at HRT (official)", url: "https://www.hudsonrivertrading.com/hrtbeat/engineering-and-interviewing-at-hrt/" },
      { label: "TechPrep: HRT interview process", url: "https://www.techprep.app/blog/hudson-river-trading-interview-process" },
      { label: "DesignGurus: HRT round by round", url: "https://www.designgurus.io/answers/detail/what-is-the-hudson-river-trading-interview-process-like-round-by-round" },
    ],
  },
  {
    companyId: "bloomberg",
    summary:
      "Bloomberg's engineering application pages (read via search summaries; the pages blocked direct fetching) describe a call with HR or an engineer, a 45-60 minute technical call, then in-house interviews of roughly an hour each with two engineers, lasting two hours to a full day. Bloomberg names data structures, algorithms, problem solving and communication as the four things it assesses. Some roles add a recorded video or coding assessment.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Initial call and optional assessment", format: "Call from HR or an engineer about your interests; some roles add a recorded video or coding assessment first", what: "Background and motivation. Talent Acquisition tells you if your role needs an assessment." },
          { name: "Technical call", format: "About 45-60 min, a Zoom interview for students", what: "Coding fluency, problem solving and CS fundamentals such as data structures and algorithms; the engineer also learns about your background." },
          { name: "In-house interviews", format: "Two hours to a full day; rounds of about an hour with two engineers from the team", what: "Open-ended coding, data structures, algorithms and design. You can usually pick your language and say whether you prefer paper, whiteboard or laptop. Students and new grads may also have a resume and projects discussion." },
          { name: "Manager or team conversation", format: "Conversation with the hiring manager or senior people (third-party reports)", what: "Past projects, teamwork and handling disagreement." },
          { name: "Offer", format: "Final conversation", what: "Logistics and offer; Glassdoor lists around 30 days average for engineers (self-reported)." },
        ],
        behavioral: {
          star: "helpful",
          style: "Often a panel or manager conversation; heavier for experienced or managerial candidates but still present for early-career.",
          themes: ["project ownership", "teamwork and disagreement", "handling stress", "interest in finance/data products", "difficult decisions"],
          examples: [
            "Tell me about a project you are proud of and your exact role.",
            "Describe a disagreement with a teammate and the outcome.",
            "Tell me about a stressful deadline and how you handled it.",
            "Why Bloomberg and why this team?",
          ],
        },
        technical: {
          share: "Majority of the loop",
          topics: ["arrays, strings, hash tables", "trees and graphs", "dynamic programming", "sorting and recursion", "system design (more for mid-level)", "concurrency and databases (team dependent)"],
          style: "Shared-document or whiteboard coding; candidates report stating a brute-force approach first, then improving it.",
        },
        projects:
          "Frequently discussed from the very first technical round. Be ready to describe one project in depth.",
        roleNotes: [
          { roleId: "software-engineer", notes: "New grads and interns are typically assessed on DSA fundamentals; system design depth rises with level. Specific intern pipeline details are not well covered in the sources I found." },
          { roleId: "ml-engineer", notes: "Bloomberg runs sizeable ML and NLP groups; expect the standard coding screen plus domain questions, though public reports on that loop are limited." },
        ],
        prep: [
          "Drill core DSA topics daily; medium to hard questions are reported.",
          "Always offer a brute-force solution, then optimize and test with edge cases.",
          "Practice coding without autocomplete or in a plain shared doc.",
          "Prepare a project summary of two to three minutes, then deeper follow-ups.",
          "Learn basic system design (APIs, caching, sharding) if you are above intern level.",
          "Write STAR stories on conflict, pressure and decisions.",
        ],
      },
    ],
    sources: [
      { label: "Bloomberg: Engineering student application process (official)", url: "https://www.bloomberg.com/company/careers/application-process/engineering-student/" },
      { label: "Bloomberg: Engineering experienced hire application process (official)", url: "https://www.bloomberg.com/company/careers/application-process/engineering-experienced-hire/" },
      { label: "Interview Kickstart: Bloomberg interview process", url: "https://interviewkickstart.com/blogs/companies/bloomberg-interview-process" },
      { label: "Glassdoor: Bloomberg interview report", url: "https://www.glassdoor.co.uk/Interview/Bloomberg-Interview-E3096-RVW7075389.htm" },
      { label: "Glassdoor: Bloomberg SWE interview questions", url: "https://static-pc.glassdoor.de/Interview/Bloomberg-Software-Engineer-Interview-Questions-EI_IE3096.0,9_KO10,27_IP2.htm" },
    ],
  },
  {
    companyId: "capital-one",
    summary:
      "Capital One's student pages describe an automated skills assessment, a first round (recruiter screen, a virtual test and a roughly 30-minute hiring-manager pre-screen, depending on program), then a virtual Power Day with job-fit, behavioral and often case interviews. Its AI and ML guide describes a Power Day of four hour-long interviews with equal weight. Coding details and team matching come from that guide and candidate reports.",
    asOf: "2026-10",
    confidence: "high",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Application and automated assessment", format: "Online application, then an automated test of job-related skills such as communication, customer focus and problem solving (official)", what: "Passing moves you to a recruiter review. Early-career hiring also runs through internships and campus recruiting." },
          { name: "First round", format: "Recruiter phone screen, a virtual test (sometimes about an hour) and a 30 min hiring-manager pre-screen, depending on program (official)", what: "For the AI/ML program, Capital One's guide describes a 70 min assessment with four data-structure and algorithm questions; CodeSignal for general SWE is a candidate report." },
          { name: "Power Day", format: "Virtual, video required (official); the AI/ML guide describes four hour-long interviews", what: "Technical coding (30 min live coding in that guide), a behavioral interview, a job-fit interview and, for many roles, a case; system design appears for some tech roles." },
          { name: "Decision", format: "Collective feedback", what: "The AI/ML guide says all four rounds carry equal weight. Capital One's student page does not describe the decision step; feedback after rejection is often not shared per reports." },
          { name: "Team matching", format: "Informal calls with other teams (reported)", what: "Some candidates report meet-and-greets after Power Day. Timeline ranges from a few weeks to two months in reports." },
        ],
        behavioral: {
          star: "expected",
          style: "A dedicated behavioral round using STAR-style questions, weighted equally with the technical and case segments in a day-based evaluation.",
          themes: ["teamwork", "ownership", "customer focus", "learning from failure", "leadership in school or projects"],
          examples: [
            "Tell me about a time you led a team through a difficult task.",
            "Describe a time you handled a conflict with a peer.",
            "Tell me about a mistake and what changed afterwards.",
            "Why technology at a bank-like company?",
          ],
        },
        technical: {
          share: "About one to two of the Power Day interviews plus the online assessment",
          topics: ["hash maps, arrays and strings", "object-oriented programming", "basic algorithm complexity", "case discussion on technology and customer problems", "system design for experienced candidates"],
          style: "Online timed assessment, then live coding in a 45 min interview; the case round is conversational rather than coded.",
        },
        projects:
          "Resume and project questions appear in behavioral and technical conversations. Prepare examples that show teamwork and results.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Early-career candidates typically enter through intern or associate pipelines; the format above is most commonly reported for them. Level and team change the mix." },
          { roleId: "ml-engineer", notes: "Machine learning tracks may include data-focused technical questions; Power Day structure is similar, but ML-specific evidence is thin." },
        ],
        prep: [
          "Practice CodeSignal-style sets under time pressure, saving effort for the harder last problems.",
          "Rehearse hash-map and OOP design problems with clean, tested code.",
          "Prepare STAR stories for teamwork, conflict and failure.",
          "Learn how a case round works: pick a technology, discuss customer value, risks and trade-offs.",
          "Research Capital One's cloud and data-driven approach so you can answer why this company.",
          "Ask your recruiter for the exact Power Day schedule since it varies by role and office.",
        ],
      },
    ],
    sources: [
      { label: "Capital One Careers: What to expect during your interview, students (official)", url: "https://www.capitalonecareers.com/what-to-expect-during-your-capital-one-interview-students-101" },
      { label: "Capital One Careers: Insider tips for AI and ML interviews (official)", url: "https://www.capitalonecareers.com/insider-tips-for-ai-and-machine-learning-interviews-tech-101-cdev" },
      { label: "Interview Query: Capital One SWE guide", url: "https://www.interviewquery.com/guides/capital-one-software-engineer" },
      { label: "Glassdoor: Capital One interview report", url: "https://static.glassdoor.at/Interview/Capital-One-Interview-E3736-RVW96895166.htm" },
      { label: "Glassdoor: Capital One interview report 2", url: "https://www.glassdoor.sg/Interview/Capital-One-Interview-E3736-RVW70607931.htm" },
      { label: "Blind: Capital One Power Day posts", url: "https://www.teamblind.com/company/Capital-One/posts/capital%20one%20power%20day?page=2" },
    ],
  },
  {
    companyId: "bytedance",
    summary:
      "ByteDance and TikTok engineering interviews are commonly described as a recruiter call, a HackerRank-style online test, then several live coding rounds and a final HR or behavioral conversation. The coding is medium to hard LeetCode-style and varies by team and interviewer. Evidence is mainly community write-ups, so details are loose.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Application and recruiter screen", format: "About 30 min call", what: "Background, interest, expectations and compensation. Referrals are common." },
          { name: "Online assessment", format: "Timed coding test, reported on HackerRank", what: "LeetCode-style algorithm problems." },
          { name: "Technical interviews", format: "Commonly 2-3 live video coding rounds", what: "Medium-to-hard problems; clean, optimized and scalable code is expected. Senior candidates add system design." },
          { name: "HR / behavioral round", format: "Final conversation", what: "Motivation, fit and logistics; some candidates report coding questions in this round too." },
          { name: "Decision", format: "Team and level review", what: "Overall guides cite about three technical rounds plus HR; timelines vary by team and region." },
        ],
        behavioral: {
          star: "helpful",
          style: "A brief closing conversation, plus short motivation questions in the other rounds; technical rounds dominate.",
          themes: ["motivation and fit", "ownership", "working at fast pace", "learning agility", "teamwork"],
          examples: [
            "Why ByteDance or TikTok and this team?",
            "Tell me about a fast-moving project and your contribution.",
            "Describe a time you learned a new technology quickly.",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: ["arrays, strings, graphs, trees, DP", "optimization and complexity", "system design (senior)", "team-specific domain (backend, recommendation, infrastructure)"],
          style: "Video call coding in a shared editor, often with follow-up variations; question quality varies by interviewer.",
        },
        projects:
          "Project discussion is common, particularly for internships and new grads, to gauge depth and relevance to the team.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Coding rounds are the main filter; internships frequently feed full-time offers, per community reports." },
          { roleId: "ml-engineer", notes: "Recommendation and ML teams likely add model and data questions to coding; public detail is limited, so confirm with the recruiter." },
        ],
        prep: [
          "Practice medium-to-hard problems and be able to optimize quickly.",
          "Code cleanly with edge-case tests, not just a working answer.",
          "Review one or two projects for relevance to the team you target.",
          "Check regional differences; processes differ across offices and entities.",
          "Plan for variation: rounds and questions depend on team and interviewer.",
        ],
      },
    ],
    sources: [
      { label: "1point3acres: ByteDance/TikTok SWE timeline", url: "https://www.1point3acres.com/interview/thread/1150020" },
      { label: "1point3acres: ByteDance onsite experience", url: "https://www.1point3acres.com/interview/thread/1018682" },
      { label: "1point3acres: ByteDance full-time onsite", url: "https://www.1point3acres.com/interview/thread/1041950" },
      { label: "NodeFlair: ByteDance SWE interview process", url: "https://nodeflair.com/blog/bytedance-software-engineer-interview-questions-and-process" },
      { label: "Glassdoor: TikTok interview report", url: "https://www.glassdoor.co.uk/Interview/TikTok-Interview-E2230881-RVW72464458.htm" },
    ],
  },
  {
    companyId: "atlassian",
    summary:
      "Atlassian publishes its engineering interview guide: a coding interview, a 60-minute system design discussion, a manager interview and a values interview, then an independent hiring committee. Early-career candidates take a role-specific assessment (such as an online coding test) and then a virtual loop of 3-4 interviews including leadership and values. Durations beyond system design and the Karat screen are third-party details.",
    asOf: "2026-10",
    confidence: "high",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, interest, location and expected level." },
          { name: "Assessment or technical screen", format: "Early careers: role-specific timed assessment such as an online coding test (official); some experienced-hire reports mention a Karat video screen", what: "Passing the assessment is required to continue for graduates and interns." },
          { name: "Coding interview", format: "Language of your choice (official); length about 60 min per third-party guides", what: "Data structures and code design; interviewers weigh how you reason about trade-offs such as readability versus optimization, and a missed detail will not sink you." },
          { name: "System design", format: "60 min discussion, not a coding exercise (official); more weight at mid and senior levels", what: "Structured questions based on Atlassian-style challenges: the clarifying questions you ask, reliability, cost, who you would consult, technology choices; follow-ups adapt to you." },
          { name: "Manager interview", format: "One-on-one with the hiring manager or a senior manager (official)", what: "Background, goals, a past project including collaborators and hurdles, and communication style. Saying when you do not know something is encouraged." },
          { name: "Values interview and hiring committee", format: "Informal conversation, often with someone outside engineering (official), about 45 min per guides; then an independent hiring committee", what: "Whether your mindset and actions reflect Atlassian's values. The committee reviews feedback and CV holistically, separate from the interviewers." },
        ],
        behavioral: {
          star: "expected",
          style: "A dedicated values interview, often with someone outside engineering, using behavioral and situational questions; Atlassian suggests STAR and drawing on any experience, not only work. Third-party guides call it a filter.",
          themes: ["open communication", "customer focus", "teamwork", "driving change", "balance and care"],
          examples: [
            "Tell me about giving tough feedback to a colleague.",
            "Describe a time you put the customer first at a cost.",
            "Tell me about a time you pushed for a change nobody asked for.",
            "Describe a time your team struggled and how you helped.",
          ],
        },
        technical: {
          share: "Roughly half or more of the rounds",
          topics: ["data structures and algorithms", "practical code design", "system design (level dependent)", "OS and networking basics in screen", "testing and code quality"],
          style: "Collaborative live sessions where you work with the interviewer; Atlassian says it values reasoning over perfectly polished code.",
        },
        projects:
          "Past work is covered through values and design discussions. Have concrete examples showing collaboration and impact.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Backend, frontend and full-stack candidates get different practical tasks. Internship and new-grad processes may be shorter; specific data was not found." },
          { roleId: "ml-engineer", notes: "Not well covered by the sources I found; expect the values round and a coding screen, with team-specific technical content." },
        ],
        prep: [
          "Write one STAR story for each of the five values and rehearse aloud.",
          "Practice code design tasks: split into classes, add tests, explain extension points.",
          "Revisit tree, graph and hash-map basics.",
          "Learn the Atlassian values wording from their careers materials and use your own examples.",
          "Prepare a short system design framework (requirements, scale, trade-offs).",
          "Ask the recruiter which assessment or screen applies to your role and level.",
        ],
      },
    ],
    sources: [
      { label: "Atlassian: Engineering interview guide (official)", url: "https://www.atlassian.com/company/careers/resources/interviewing/engineering" },
      { label: "Atlassian: Early careers interview guide (official)", url: "https://www.atlassian.com/company/careers/resources/applying/early-careers-interview-guide" },
      { label: "Atlassian blog: Culture fit interviews vs values alignment (official)", url: "https://www.atlassian.com/blog/leadership/culture-fit-interviews-vs-values-alignment" },
      { label: "TechPrep: Atlassian interview process", url: "https://www.techprep.app/blog/atlassian-interview-process" },
      { label: "Interview Query: Atlassian software engineer", url: "https://interviewquery.com/interview-guides/atlassian-software-engineer" },
    ],
  },
  {
    companyId: "coinbase",
    summary:
      "Coinbase's engineering process is commonly described as a recruiter call, a roughly 90-minute CodeSignal assessment, then a set of technical, design and behavioral interviews, followed by hiring-committee review over about 6-8 weeks. No official Coinbase process page was reachable (the careers page blocked fetching); this rests on third-party guides, and reports conflict on a take-home or work trial, so treat details as approximate.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Application review", format: "Resume screen", what: "Reviewers look for impact and relevant skills; a small share advance." },
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, interest in crypto and Coinbase's mission." },
          { name: "Online assessment", format: "Reported as about 90 min on CodeSignal", what: "Data structures, efficiency and code quality. One third-party guide describes a four-part exercise with incremental checkpoints, such as building an in-memory data structure; another mentions possible aptitude or behavioral screens." },
          { name: "Interview loop", format: "Reported as about four rounds: two longer coding, one system design, one shorter behavioral", what: "Practical coding, design (more for experienced hires), and a behavioral or cross-functional conversation. Some reports describe a work trial or practical assignment instead." },
          { name: "Offer review", format: "Hiring committee", what: "Feedback review and offer, with total process around 6-8 weeks per one source; Glassdoor shows around a month." },
        ],
        behavioral: {
          star: "helpful",
          style: "A shorter behavioral round and mission questions in the recruiter call; no distinct values panel was confirmed by sources.",
          themes: ["mission alignment", "interest in crypto", "ownership", "teamwork", "handling ambiguity"],
          examples: [
            "Why Coinbase and why crypto?",
            "Tell me about a project where requirements were unclear.",
            "Describe a time you improved a system's reliability or security.",
            "Tell me about working with a non-engineering partner.",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: ["algorithms and data structures", "clean, tested code", "system design for financial or high-reliability systems", "security and fraud awareness", "crypto fundamentals as a plus"],
          style: "CodeSignal screen, then screen-shared coding where you can often choose your environment; design on a whiteboard or document.",
        },
        projects:
          "Expect resume questions about impact and depth. Prepare one project with concrete numbers and trade-offs.",
        roleNotes: [
          { roleId: "software-engineer", notes: "New-grad and intern processes are not well documented in the sources found; expect the CodeSignal plus coding-interview shape." },
          { roleId: "ml-engineer", notes: "Risk and fraud teams may probe data and ML experience; evidence is limited, so confirm with the recruiter." },
        ],
        prep: [
          "Practice CodeSignal-style 90 minute sessions.",
          "Prepare a sincere answer on interest in crypto and the mission.",
          "Review basics of blockchain, payments and wallet security.",
          "Rehearse system design for reliable, security-sensitive services.",
          "Ask whether your loop includes a take-home or work trial, since sources conflict.",
        ],
      },
    ],
    sources: [
      { label: "DesignGurus: Coinbase engineering interview process", url: "https://www.designgurus.io/answers/detail/what-is-the-interview-process-for-coinbase-engineering" },
      { label: "Exponent: Coinbase SWE interview stages", url: "https://www.tryexponent.com/guides/coinbase/swe-interview/interview-stages" },
      { label: "4dayweek.io: Coinbase interview process", url: "https://4dayweek.io/interview-process/coinbase" },
      { label: "Glassdoor: Coinbase interview report", url: "https://www.glassdoor.ca/Interview/Coinbase-Interview-E779622-RVW13829314.htm" },
      { label: "Glassdoor: Coinbase interview report 2", url: "https://www.glassdoor.ca/Interview/Coinbase-Interview-E779622-RVW17917743.htm" },
    ],
  },
  {
    companyId: "doordash",
    summary:
      "DoorDash's engineering careers page (seen via search summary, and noted as dated) describes a 30-minute recruiter call, a 60-minute coding phone screen with an engineer, then a virtual onsite with coding, system design and behavioral questions depending on level. Its interview-prep blog stresses data structures, handling ambiguous prompts and debugging. Practical build and debugging rounds and team-specific variation are third-party reports.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, motivation and logistics such as compensation and timeline." },
          { name: "Hiring manager call", format: "Up to about 1 hour (third-party reports, some teams)", what: "Team fit and expectations; not on DoorDash's own page as I saw it." },
          { name: "Coding phone screen", format: "60 min with a DoorDash engineer (official careers page)", what: "You explain your thinking while solving; third-party reports describe a build or debugging task rather than a classic puzzle." },
          { name: "Virtual onsite: coding and debugging", format: "Virtual onsite rounds (official)", what: "Coding is official; third-party guides add a small service build modeled on delivery logistics and fixing bugs in unfamiliar code." },
          { name: "System design", format: "Part of the onsite depending on level (official); about 60-75 min per guides", what: "Backend candidates are asked about scalability (DoorDash blog); marketplace-style dispatch or tracking examples are third-party reports." },
          { name: "Behavioral and values", format: "Part of the onsite (official); often with the hiring manager per reports", what: "DoorDash's blog says a values interview covers past challenges and career intentions; ownership and leveling input are third-party reports." },
        ],
        behavioral: {
          star: "expected",
          style: "A dedicated ownership-focused round, where stories should include failures and trade-offs; input also informs leveling.",
          themes: ["ownership", "customer obsession", "bias for action", "handling trade-offs", "learning from failure"],
          examples: [
            "Tell me about a project you drove from idea to launch.",
            "Describe a time you made a trade-off that hurt something else.",
            "Tell me about a failure and what you changed.",
            "How have you put customers first in a technical decision?",
          ],
        },
        technical: {
          share: "About 70 percent",
          topics: ["practical coding (build a feature)", "debugging unfamiliar code", "data structures (heaps, graphs, tries, sliding windows)", "low-level and API design", "system design for logistics", "SQL for analytical or backend teams"],
          style: "Shared-environment coding with realistic problems; interviewers favor small targeted fixes over rewrites.",
        },
        projects:
          "Behavioral and hiring-manager rounds probe your end-to-end contributions, so prepare projects where you owned outcomes.",
        roleNotes: [
          { roleId: "software-engineer", notes: "Debugging and code-craft rounds are the distinctive ones; backend teams may add SQL. Sources I found do not describe new-grad or intern differences." },
          { roleId: "ml-engineer", notes: "Dispatch, pricing and ETA teams use ML; expect the practical coding rounds plus domain questions, though public detail is limited." },
        ],
        prep: [
          "Practice building a small, working service in 45-60 minutes with tests.",
          "Practice reading unfamiliar code and making minimal fixes.",
          "Prepare two or three ownership stories in STAR form, including one failure.",
          "Sketch designs for dispatch, live tracking and notifications.",
          "Refresh SQL aggregations and window functions for backend teams.",
          "Clarify with the recruiter which rounds apply for your team and level.",
        ],
      },
    ],
    sources: [
      { label: "DoorDash Careers: Engineering (official)", url: "https://careers.doordash.com/career-areas/engineering/" },
      { label: "DoorDash Careers: How to prepare for a technical interview (official)", url: "https://careers.doordash.com/blog/technical-interview-preparation/" },
      { label: "TechPrep: DoorDash interview process", url: "https://www.techprep.app/blog/doordash-interview-process" },
      { label: "Interview Query: DoorDash software engineer", url: "https://interviewquery.com/interview-guides/doordash-software-engineer" },
      { label: "interviewing.io: DoorDash interview questions", url: "https://interviewing.io/doordash-interview-questions" },
    ],
  },
];
