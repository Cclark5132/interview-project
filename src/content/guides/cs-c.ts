import type { CompanyGuide } from "./types";

export const csC: CompanyGuide[] = [
  {
    companyId: "jane-street",
    summary:
      "Jane Street's developer loop is centralized and coding-focused: a short screen, then a long day of collaborative coding rounds where one problem keeps growing. Reports consistently say the developer track skips the puzzles, mental math and probability that the trading side is known for. You are matched to a team after you pass.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Application and recruiter call", format: "Resume review, then roughly 20-30 min call", what: "Background, motivation and logistics. The recruiter may steer you toward a particular team or role family." },
          { name: "Technical screen", format: "About 60 min video call, one interviewer, shared code editor", what: "One coding problem in your strongest language, extended with follow-up requirements. London reports have mentioned an online coding test first." },
          { name: "Onsite loop", format: "Full day (commonly reported as 3-4 coding sessions of about an hour, often with two interviewers)", what: "Practical programming problems that build on a single solution as constraints change. Interviewers watch design, correctness and how you take hints." },
          { name: "Project conversation", format: "Discussion of a past project (reported mainly for more senior candidates)", what: "Why you made the decisions you did, what you would change, and honesty about what you do not know." },
          { name: "Team matching and offer", format: "Decision after the loop", what: "Since hiring is centralized, team placement happens after you pass. Glassdoor-style data suggests roughly a month overall." },
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
          topics: ["data structures and algorithms", "building small programs (games, trees, caches)", "extensible code design", "functional or typed-language comfort helps but is not required", "occasional probability questions reported for other tracks only"],
          style: "Live coding in a shared editor in a language of your choice; the problem evolves over the session. Guides report no separate system design round and no brainteasers for the developer loop.",
        },
        projects:
          "Mostly relevant through the project conversation (stronger emphasis at senior levels), but follow-ups go deep. Pick one project, know the trade-offs, and be ready to admit gaps.",
        roleNotes: [
          { roleId: "software-engineer", notes: "OCaml is not expected; Jane Street teaches it after you join. Be very strong in one mainstream language. Trader and researcher interviews differ: they are widely reported to lean on probability, mental math, market-style games and reasoning puzzles." },
        ],
        prep: [
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
      { label: "Exponent: Jane Street SWE interview guide", url: "https://www.tryexponent.com/guides/jane-street-software-engineer-interview" },
      { label: "eFinancialCareers: Jane Street interview", url: "https://www.efinancialcareers.com/news/2020/08/jane-street-interview" },
      { label: "Everything Quant: SWE at Jane Street", url: "https://everythingquant.com/guides/software-engineering-at-jane-street/" },
      { label: "interviewing.io: Jane Street interview questions", url: "https://interviewing.io/jane-street-interview-questions" },
      { label: "Jobrise: Jane Street SWE interview", url: "https://jobrise.io/en/blog/jane-street-software-engineer-interview-2026/" },
    ],
  },
  {
    companyId: "citadel",
    summary:
      "Citadel's developer process is commonly described as fast and algorithm-heavy: recruiter call, a timed HackerRank assessment, live coding screens, then a multi-round virtual final. Teams vary, from low-latency infrastructure to data platforms, so later rounds shift with the team. Evidence comes largely from third-party prep sites and sparse Glassdoor posts.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter screen", format: "15-30 min call", what: "Background, motivation and why finance. Citadel and Citadel Securities are separate entities, so confirm which one the role is in." },
          { name: "Online assessment", format: "Commonly reported as about 75 min on HackerRank, 2-3 problems", what: "Algorithmic problems where passing nearly all test cases matters." },
          { name: "Technical phone screens", format: "One or two 45-60 min live pair-coding sessions, e.g. CoderPad", what: "Data structures and complexity optimization; interviewers care about how you improve a first solution." },
          { name: "Final rounds / superday", format: "Commonly 3-4 back-to-back virtual interviews", what: "Harder coding, some design or domain-knowledge questions (OS, language internals, concurrency), sometimes finance-flavored extensions of a solved problem." },
          { name: "Leadership or team conversation", format: "30-45 min with a senior person", what: "Projects, judgment, and motivation for a high-intensity environment. Timelines are reported at about a month." },
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
      { label: "TechPrep: Citadel interview process", url: "https://www.techprep.app/blog/citadel-interview-process" },
      { label: "Jobrise: Citadel SWE interview", url: "https://jobrise.io/en/blog/citadel-software-engineer-interview-2026/" },
      { label: "Glassdoor: Citadel interview report", url: "https://www.glassdoor.ca/Interview/Citadel-Interview-E14937-RVW100926729.htm" },
      { label: "Glassdoor: Citadel interview report 2", url: "https://www.glassdoor.ca/Interview/Citadel-Interview-E14937-RVW95651254.htm" },
    ],
  },
  {
    companyId: "two-sigma",
    summary:
      "Two Sigma's software engineer process is reported as coding-centered: an online or phone coding screen followed by several technical interviews, many with hard algorithm problems. Public information is thin and partly dated, so details such as round counts and design content are uncertain.",
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
      "Hudson River Trading's developer process is described as competition-style and systems-heavy: an online assessment, a live coding screen and a long onsite with coding, low-level systems and behavioral rounds. Core developer tracks lean toward performance and C++. Evidence is mostly prep-site summaries and Blind anecdotes.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software developer",
        stages: [
          { name: "Application review", format: "Resume screen", what: "Routes you toward a general software engineering or core developer track." },
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, motivation, location and timeline." },
          { name: "Online assessment", format: "Timed HackerRank, commonly 3-4 problems", what: "From warm-up questions to competition-style hard problems; reading all problems first is a commonly given tip." },
          { name: "Technical phone screen", format: "About 60 min live coding in a shared editor", what: "A medium-to-hard problem where edge cases, complexity and your reasoning are judged." },
          { name: "Onsite", format: "Commonly 4-6 interviews in a day, mostly New York", what: "Algorithm coding, systems and CS fundamentals, a design or project discussion and a behavioral conversation. Timeline is reported at one to two months overall." },
        ],
        behavioral: {
          star: "helpful",
          style: "A conversation with a senior engineer or trader, focused more on technical ownership and project depth than polished culture answers.",
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
          style: "Live coding where flawless implementation counts, plus oral CS-fundamentals questions; core developer interviews include more systems material.",
        },
        projects:
          "Project depth is checked in the behavioral and design conversations. Prepare two or three projects with measurable details and trade-offs.",
        roleNotes: [
          { roleId: "software-engineer", notes: "General SWE candidates see algorithms weighted more; core developers get more low-level systems. Algo developer and trader tracks are reported to add probability, expected-value and market reasoning." },
          { roleId: "firmware-engineer", notes: "Hardware-adjacent skills (networking, kernel and memory behavior, FPGA-adjacent work) may suit core and infrastructure teams, but public evidence for firmware-specific loops is thin." },
        ],
        prep: [
          "Practice timed contest-style problems, particularly graphs, DP and strings.",
          "Study OS and concurrency basics: threads versus processes, virtual memory, synchronization.",
          "If using C++, review amortized container costs and modern C++ features.",
          "Write bug-free code on the first pass; off-by-one errors are costly.",
          "Prepare a project walkthrough with trade-offs and measurements.",
          "Confirm with your recruiter which track (general SWE, core developer, algo) you are in.",
        ],
      },
    ],
    sources: [
      { label: "TechPrep: HRT interview process", url: "https://www.techprep.app/blog/hudson-river-trading-interview-process" },
      { label: "Quantt: HRT interview", url: "https://www.quantt.co.uk/resources/hudson-river-trading-interview" },
      { label: "DesignGurus: HRT round by round", url: "https://www.designgurus.io/answers/detail/what-is-the-hudson-river-trading-interview-process-like-round-by-round" },
      { label: "TraderMath: HRT interview guide", url: "https://www.tradermath.org/knowledge-base/hudson-river-trading-interview-guide" },
      { label: "Blind: HRT interview threads", url: "https://www.teamblind.com/company/Hudson-River-Trading/posts/hudson-river-trading-interview?page=1" },
      { label: "1point3acres: HRT SWE intern video interview", url: "https://www.1point3acres.com/interview/thread/936658" },
    ],
  },
  {
    companyId: "bloomberg",
    summary:
      "Bloomberg's software engineer hiring is a classic sequence: recruiter call, one or two technical phone rounds, then an onsite or virtual loop of coding, design and behavioral conversations, ending with a manager or HR conversation. Data structures and your own projects get the most attention. Glassdoor suggests about a month on average.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter screen", format: "Phone call", what: "Background, motivation for Bloomberg, and logistics." },
          { name: "Technical phone screen", format: "One or two remote rounds of about 30-60 min in a shared editor", what: "Core data-structure and algorithm problems, sometimes a project intro; interviewers reportedly give hints." },
          { name: "Onsite or virtual loop", format: "Commonly 3-5 interviews", what: "Coding on trees, graphs, DP and similar topics; senior candidates also get system design. Whiteboard-style coding has been reported." },
          { name: "Behavioral / team round", format: "Panel or manager conversation", what: "Past projects, teamwork and handling disagreement; meeting the hiring manager or director." },
          { name: "HR wrap-up and offer", format: "Final conversation", what: "Logistics and offer; Glassdoor lists around 30 days average for engineers (self-reported)." },
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
      { label: "Interview Kickstart: Bloomberg interview process", url: "https://interviewkickstart.com/blogs/companies/bloomberg-interview-process" },
      { label: "Glassdoor Q&A: Bloomberg SWE interview process", url: "https://api.glassdoor.com/answers/what-is-the-interview-process-for-bloomberg-software-engineer" },
      { label: "Glassdoor: Bloomberg interview report", url: "https://www.glassdoor.co.uk/Interview/Bloomberg-Interview-E3096-RVW7075389.htm" },
      { label: "Glassdoor: Bloomberg SWE interview questions", url: "https://static-pc.glassdoor.de/Interview/Bloomberg-Software-Engineer-Interview-Questions-EI_IE3096.0,9_KO10,27_IP2.htm" },
    ],
  },
  {
    companyId: "capital-one",
    summary:
      "Capital One typically uses a timed online coding assessment followed by a single-day 'Power Day' of back-to-back interviews. Reports mix coding, a business-style case and behavioral questions, with all interviewers' feedback weighed together. Candidates also describe a later team-matching step.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Application and recruiter contact", format: "Online application, sometimes a recruiter call or campus event", what: "Resume screen and basic fit. Early-career hiring also runs through internships and campus recruiting." },
          { name: "Online assessment", format: "Timed coding test, reported on CodeSignal", what: "LeetCode-style questions, around four, with the latter ones noticeably harder." },
          { name: "Power Day", format: "One day, roughly 3-4 interviews of about 45 min", what: "Candidates describe a technical coding round, a case or tech-concept discussion, a behavioral round, and sometimes system design for experienced roles." },
          { name: "Decision", format: "Collective feedback", what: "Reports suggest interviewers must broadly agree. Feedback is often not shared after rejection." },
          { name: "Team matching", format: "Conversations with teams", what: "Some candidates report meeting teams after passing Power Day. Timeline ranges from a few weeks to two months." },
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
      "Atlassian's engineering interview combines a technical screen, practical coding and design rounds, and a dedicated values interview that candidates treat as a filter. The process is typically virtual and takes 3-6 weeks. Third-party guides agree on the overall shape but differ on details such as the screen format.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, interest, location and expected level." },
          { name: "Technical screen", format: "Often third-party (Karat) video session, in some reports", what: "Quick fundamentals questions (OS, networking) then one or two coding problems; a redo is sometimes allowed." },
          { name: "Coding and data structures", format: "About 60 min live", what: "Trees, graphs, strings, hash maps; graded on code quality, naming and testing." },
          { name: "Code design / craft", format: "About 60 min", what: "A realistic build task (for example a tracking feature or a UI component) assessing structure and extensibility." },
          { name: "System design", format: "About 60 min (more at mid and senior levels)", what: "Scalable systems often tied to collaboration or ticketing-style products." },
          { name: "Values round and hiring committee", format: "45-60 min behavioral interview with someone from another team, then committee review", what: "Alignment with Atlassian's five stated values; strong technical results reportedly do not offset a weak values round." },
        ],
        behavioral: {
          star: "expected",
          style: "A dedicated values interview with a non-engineering-team interviewer, widely described as decisive; expect to bring specific stories tied to each value.",
          themes: ["open communication", "customer focus", "teamwork", "driving change", "balance and care"],
          examples: [
            "Tell me about giving tough feedback to a colleague.",
            "Describe a time you put the customer first at a cost.",
            "Tell me about a time you pushed for a change nobody asked for.",
            "Describe a time your team struggled and how you helped.",
          ],
        },
        technical: {
          share: "About 60-70 percent of rounds",
          topics: ["data structures and algorithms", "practical code design", "system design (level dependent)", "OS and networking basics in screen", "testing and code quality"],
          style: "Collaborative live sessions where you work with the interviewer; some reports mention take-home tasks.",
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
          "Ask the recruiter whether a Karat screen or take-home is used for your role.",
        ],
      },
    ],
    sources: [
      { label: "TechPrep: Atlassian interview process", url: "https://www.techprep.app/blog/atlassian-interview-process" },
      { label: "Interview Query: Atlassian guide", url: "https://interviewquery.com/interview-guides/atlassian" },
      { label: "Interview Query: Atlassian software engineer", url: "https://interviewquery.com/interview-guides/atlassian-software-engineer" },
      { label: "Final Round AI: Atlassian interview process", url: "https://www.finalroundai.com/blog/atlassian-interview-process" },
      { label: "Ophy AI: Atlassian interview guide", url: "https://ophyai.com/blog/company-guides/atlassian-interview-guide" },
    ],
  },
  {
    companyId: "coinbase",
    summary:
      "Coinbase's engineering process is commonly described as a recruiter call, a roughly 90-minute CodeSignal assessment, then a set of technical, design and behavioral interviews, followed by hiring-committee review over about 6-8 weeks. Many public reports are old, and a few conflict (for example on a take-home or work trial), so treat details as approximate.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Application review", format: "Resume screen", what: "Reviewers look for impact and relevant skills; a small share advance." },
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, interest in crypto and Coinbase's mission." },
          { name: "Online assessment", format: "About 90 min on CodeSignal", what: "Data structures, efficiency and code quality; there is a window to schedule it." },
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
      { label: "4dayweek.io: Coinbase interview process", url: "https://4dayweek.io/interview-process/coinbase" },
      { label: "Glassdoor: Coinbase interview report", url: "https://www.glassdoor.ca/Interview/Coinbase-Interview-E779622-RVW13829314.htm" },
      { label: "Glassdoor: Coinbase interview report 2", url: "https://www.glassdoor.ca/Interview/Coinbase-Interview-E779622-RVW17917743.htm" },
    ],
  },
  {
    companyId: "doordash",
    summary:
      "DoorDash's engineering loop favors practical work: a recruiter call, a technical screen that often resembles real engineering rather than puzzles, then a virtual onsite with coding, debugging, design and an ownership-focused behavioral round. Hiring has been reported to be decentralized, so the exact loop varies by team. Expect about 3-6 weeks.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          { name: "Recruiter screen", format: "About 30 min call", what: "Background, motivation and logistics such as compensation and timeline." },
          { name: "Hiring manager call", format: "Up to about 1 hour (reported for some teams)", what: "Team fit and expectations; hiring is reported to be team-specific." },
          { name: "Technical phone screen", format: "About 60 min in a shared coding environment", what: "Often a build or debugging task rather than a classic puzzle; follow-ups change constraints." },
          { name: "Code craft and debugging", format: "Virtual onsite rounds", what: "Build a small service modeled on delivery logistics, and fix bugs in unfamiliar code with targeted changes." },
          { name: "System design", format: "About 60-75 min", what: "Scalable marketplace-style systems such as dispatch, tracking or notifications; usually more weight at mid and senior levels." },
          { name: "Behavioral and ownership", format: "Often with the hiring manager", what: "End-to-end ownership, tradeoffs and customer focus; reportedly used partly for leveling." },
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
      { label: "TechPrep: DoorDash interview process", url: "https://www.techprep.app/blog/doordash-interview-process" },
      { label: "Interview Query: DoorDash software engineer", url: "https://interviewquery.com/interview-guides/doordash-software-engineer" },
      { label: "Prepfully: DoorDash SWE interview", url: "https://prepfully.com/interview-guides/doordash-software-engineer-interview" },
      { label: "interviewing.io: DoorDash interview questions", url: "https://interviewing.io/doordash-interview-questions" },
      { label: "Ophy AI: DoorDash interview guide", url: "https://ophyai.com/blog/company-guides/doordash-interview-guide" },
    ],
  },
];
