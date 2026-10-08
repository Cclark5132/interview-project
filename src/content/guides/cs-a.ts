import type { CompanyGuide } from "./types";

// Compiled from public sources (candidate reports, prep sites, some official pages). Not insider information.
export const csA: CompanyGuide[] = [
  {
    companyId: "google",
    summary:
      "Google is commonly reported to run a recruiter conversation, one or two technical screens, then a multi-interview loop whose notes go to a hiring committee rather than a single decision-maker. Team matching usually happens around or after committee approval, so a pass does not always mean a quick offer. Google's own site describes structured, rubric-based interviewing.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter conversation",
            format: "Short phone or video call",
            what: "Covers your background, interests, location and level, and explains the upcoming steps. Ask what the loop will contain for your specific role.",
          },
          {
            name: "Online assessment or technical screen",
            format: "Some candidates report a timed coding test; others a live coding call of about 45 minutes in a shared editor",
            what: "Algorithmic problem solving at roughly medium difficulty, with attention to time and space complexity and clear reasoning out loud.",
          },
          {
            name: "Onsite or virtual loop",
            format: "Commonly reported as around four or five interviews, mostly coding plus one behavioral",
            what: "Several coding rounds on data structures and algorithms, with follow-ups that tighten constraints. A behavioral round probes collaboration, ambiguity and how you handle setbacks.",
          },
          {
            name: "Hiring committee review",
            format: "Offline; no candidate interaction",
            what: "A committee reads the written interview packet and decides on hire, no hire or more evidence. Interviewers do not make the final call, so consistent strong signal across rounds matters.",
          },
          {
            name: "Team matching",
            format: "Calls with hiring managers of interested teams",
            what: "Reports disagree on whether matching precedes or follows committee review; many describe it after approval. Both you and a manager must want the fit, and approvals can lapse if no match is found.",
          },
          {
            name: "Offer",
            format: "Recruiter call and written offer",
            what: "Level and compensation are set from the packet and committee view. Timelines are commonly reported at one to three months overall, with wide variation.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Usually one dedicated behavioral round in the loop (often discussed as the 'Googleyness' or leadership part), plus soft signals in every round. Coding performance carries most of the weight for engineering roles.",
          themes: ["Collaboration and teamwork", "Comfort with ambiguity", "Handling conflict and feedback", "Learning from failure", "Taking initiative without authority"],
          examples: [
            "Describe a time a teammate disagreed with your technical approach and how you resolved it.",
            "Tell me about a project where the requirements kept shifting.",
            "When did you help someone else succeed at the expense of your own time?",
            "Describe a mistake you made on a team and what changed afterward.",
          ],
        },
        technical: {
          share: "Most of the loop, commonly three or four of the roughly five interviews",
          topics: ["Arrays, strings, hash maps", "Trees and graphs (BFS/DFS)", "Heaps, backtracking, dynamic programming", "Complexity analysis", "Testing and edge cases", "Basic system design for experienced candidates"],
          style:
            "Shared editor or document, often without code execution, with one problem per round plus follow-ups. Interviewers use rubrics and take detailed notes. New grads typically skip a dedicated system design round; experienced candidates usually get one.",
        },
        projects:
          "Moderate. Projects mostly come up in the recruiter call and the behavioral conversation rather than as a long deep dive. Be ready to explain your own contribution, a design decision and a bug you fixed.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "Level is calibrated from interview signal, not just your title, and the committee can propose a different level than you applied for. Candidates report that the DSA bar is the main gate.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "I found little reliable public detail on ML-specific Google loops. Expect the coding rounds above plus team-dependent ML fundamentals; ask the recruiter which rounds replace a coding slot.",
          },
        ],
        prep: [
          "Practice medium-difficulty problems in a plain editor without autocomplete or running code, and state time and space complexity every time.",
          "Narrate your approach before coding and test with a small example and edge cases afterward.",
          "Cover graphs, trees, heaps and DP specifically; reports cite BFS, heaps and backtracking.",
          "Prepare four to six teamwork and ambiguity stories using a clear situation-action-result shape.",
          "Ask your recruiter whether team matching happens before or after committee review, and how long approval stays valid.",
          "Do mock interviews with another person; talking while solving is a separate skill.",
          "If you have a referral, use it at the application stage; it helps visibility but not the loop outcome.",
        ],
      },
    ],
    sources: [
      { label: "Google Careers: our hiring process", url: "https://www.google.com/about/careers/applications/how-we-hire/" },
      { label: "Google Careers: interview tips", url: "https://www.google.com/about/careers/applications/interview-tips" },
      { label: "Google Careers: preparing to apply", url: "https://www.google.com/about/careers/applications/stories/applying-to-google" },
      { label: "Google re:Work: structured interviewing", url: "https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices" },
      { label: "IGotAnOffer: Google team matching", url: "https://igotanoffer.com/en/advice/google-team-matching" },
      { label: "Blind: Google team match advice", url: "https://www.teamblind.com/post/google-team-match-advice-51srfcnq" },
      { label: "Glassdoor: Google interview report", url: "https://www.glassdoor.com/Interview/Google-Interview-E9079-RVW3745419.htm" },
    ],
  },
  {
    companyId: "meta",
    summary:
      "Meta is commonly described as a recruiter call, a live coding screen (sometimes preceded by a proctored online assessment), then a multi-round loop with coding, behavioral and, for experienced hires, system design. After the loop, feedback is reviewed and strong candidates go through team matching. Meta is reported to tell candidates the round types in advance.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter screen",
            format: "About 20 to 30 minutes by phone",
            what: "Reviews your experience, project ownership and focus area, and walks through the process. Use it to ask which rounds are in your loop.",
          },
          {
            name: "Online assessment (some candidates)",
            format: "Proctored timed coding test, reported on CodeSignal",
            what: "Reported more often earlier in the pipeline or for early-career roles; not every candidate gets one.",
          },
          {
            name: "Technical screen",
            format: "Live coding with an engineer, typically two problems with follow-ups",
            what: "Standard algorithmic problems at speed. Interviewers watch clarity, correctness and how you handle edge cases. A second technical screen is reported for some candidates.",
          },
          {
            name: "Full loop",
            format: "Virtual or onsite, several interviews in one or two days",
            what: "Multiple coding rounds, a behavioral round, and system design for mid-level and above. A newer AI-assisted coding round is being reported by some candidates.",
          },
          {
            name: "Review and team matching",
            format: "Offline review, then manager conversations",
            what: "Feedback goes to a review committee; strong candidates talk to teams before the offer. Level is decided from the loop.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "One dedicated behavioral round, commonly reported as testing communication, collaboration and how you handle conflict and setbacks. It is a real signal but coding rounds dominate the loop.",
          themes: ["Conflict resolution", "Handling setbacks and failure", "Working with cross-functional partners", "Impact and ownership", "Giving and receiving feedback"],
          examples: [
            "Describe a time you disagreed with a peer and how you reached a decision.",
            "Tell me about your highest-impact project and what you personally did.",
            "What was a failure that changed how you work?",
            "How did you handle a deadline you realized was unrealistic?",
          ],
        },
        technical: {
          share: "Most of the loop; commonly two coding rounds plus system design or a second coding mix depending on level",
          topics: ["Arrays and strings", "Trees and graphs", "Heaps, queues, linked lists", "Dynamic programming", "Complexity analysis", "System design (experienced)"],
          style:
            "Shared editor with execution or a close equivalent. Speed matters: interviewers are reported to expect clean, working solutions and often a second problem. Follow-ups probe complexity and variations.",
        },
        projects:
          "Light to moderate. Past work shows up in the recruiter call and the behavioral round; there is no long resume walk-through reported. Prepare a clear story of one project you owned.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "New grads are commonly reported to face coding and behavioral rounds with lighter or no system design; experienced candidates add design. Confirm with your recruiter.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "I did not find reliable public detail on Meta ML engineer loops. Expect the coding core plus team-specific ML or ML system design; ask the recruiter for the round list.",
          },
        ],
        prep: [
          "Practice solving two medium problems in about 40 minutes; pace is a recurring theme in reports.",
          "Clarify the prompt, explain your plan, code cleanly, then dry-run an example every time.",
          "If you forget an API detail, state your assumption and ask rather than stalling.",
          "Try one practice session with an AI assistant in the loop, since a newer round is reported.",
          "Prepare behavioral stories about conflict and setbacks with concrete outcomes.",
          "For experienced roles, practice system design trade-offs and adapting your design when requirements change.",
          "Use the round list from your recruiter to focus; Meta is reported to share this in advance.",
        ],
      },
    ],
    sources: [
      { label: "Formation: what to expect in Meta SWE interviews", url: "https://formation.dev/blog/how-to-pass-meta-software-engineering-interviews" },
      { label: "Exponent: Meta software engineer interview", url: "https://www.tryexponent.com/guides/meta-software-engineer-interview" },
      { label: "Interview Query: Meta software engineer", url: "https://www.interviewquery.com/guides/meta-software-engineer" },
      { label: "1Point3Acres: Meta full-time SWE phone screen and onsite", url: "https://www.1point3acres.com/interview/thread/1155931" },
      { label: "1Point3Acres: Meta SWE virtual onsite", url: "https://www.1point3acres.com/interview/thread/1054018" },
      { label: "Glassdoor: Meta software engineer interview questions", url: "https://static.glassdoor.fr/Interview/Meta-Software-Engineer-Interview-Questions-EI_IE40772.0,4_KO5,22_IP38.htm" },
    ],
  },
  {
    companyId: "amazon",
    summary:
      "Amazon software roles are commonly reported to start with a timed online assessment, then a loop of coding and behavioral interviews that includes a Bar Raiser from another team. Behavioral questions are tied to the Leadership Principles and carry heavy weight in every round. Amazon's own pages say technical roles spend roughly half the process on technical assessment.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software development engineer",
        stages: [
          {
            name: "Application and recruiter contact",
            format: "Online application; recruiter email or short call",
            what: "Resume screen against the job description. Referrals and campus events can help get noticed.",
          },
          {
            name: "Online assessment",
            format: "Timed, proctored test; reports describe two coding problems plus work-simulation and work-style sections",
            what: "Medium-to-hard coding under time pressure. The non-coding sections are commonly underestimated by candidates who only practice algorithms.",
          },
          {
            name: "Technical phone screen (some candidates)",
            format: "About an hour on video with a shared editor",
            what: "One or two coding problems plus a few Leadership Principle questions. Reported more for experienced hires or some new-grad pipelines.",
          },
          {
            name: "Interview loop",
            format: "Virtual or onsite, commonly three to five interviews of about an hour, one with a Bar Raiser",
            what: "Each interviewer pairs a coding or design topic with Leadership Principle questions. The Bar Raiser is a trained interviewer from outside the team who holds the hiring bar.",
          },
          {
            name: "Debrief and decision",
            format: "Interviewers submit written feedback; a debrief follows",
            what: "The hiring team decides with strong input from the Bar Raiser. Level (such as SDE I versus II) is set here.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Leadership Principles questions appear in every interview, not just one round. Amazon's own guidance says to prepare several stories per principle, use data, say what you did rather than the team, and keep each answer to about two to three minutes.",
          themes: ["Customer Obsession", "Ownership", "Dive Deep", "Bias for Action", "Earn Trust", "Learn and Be Curious", "Deliver Results"],
          examples: [
            "Tell me about a time you took on work that was outside your job description.",
            "Describe a time you got critical feedback and what you did with it.",
            "Give an example of a decision you made with incomplete data.",
            "When did you dig into the details of a problem others had accepted at the surface?",
            "Describe a deadline you hit under real pressure and what you cut.",
          ],
        },
        technical: {
          share: "Roughly half of the process for technical roles, per Amazon",
          topics: ["Arrays, strings, hash maps", "Trees and graphs", "Heaps and sorting", "Dynamic programming", "Object-oriented design (some loops)", "System design (more common above entry level)"],
          style:
            "Shared online editor with an interviewer, one problem and follow-ups per round. Reports say new-grad loops lean on coding, while system design appears for experienced candidates; sources conflict, so confirm with your recruiter.",
        },
        projects:
          "Moderate. Interviewers often use your resume to anchor behavioral questions, so be ready to give metrics, your exact role and trade-offs for every bullet.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "The Bar Raiser can veto and is reported to ask the hardest coding problem and the deepest principle probing. Level calibration (new grad versus SDE II) is decided in the debrief.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "Amazon lists separate applied scientist and ML roles with ML-specific rounds; I did not verify the details for ML engineers, so check the posting and recruiter for an ML breadth or design round.",
          },
        ],
        prep: [
          "Write down 8 to 12 STAR stories and map each to two or three Leadership Principles; use the job description to choose emphasis.",
          "Quantify results in each story and say 'I' for your contributions.",
          "Practice medium and hard coding under a timer, since the assessment is time-boxed.",
          "Rehearse each story aloud to 2 to 3 minutes and prepare follow-up answers for 'what would you do differently'.",
          "Expect a principle question in every round, including the coding ones, often at the start or end.",
          "Brush up object-oriented design and basic scalability concepts in case your team asks.",
          "Ask your recruiter exactly how many rounds and whether design is included for your level.",
        ],
      },
    ],
    sources: [
      { label: "Amazon: guide to the interview process", url: "https://www.aboutamazon.com/news/workplace/amazon-interview-guide" },
      { label: "Amazon: using Leadership Principles in your interview", url: "https://www.aboutamazon.com/news/workplace/amazon-leadership-principles-interview" },
      { label: "Amazon: 11 interview tips from recruiters", url: "https://www.aboutamazon.com/news/workplace/recruiters-offer-their-best-tips-for-interviewing-at-amazon" },
      { label: "Amazon Jobs: SDM interview prep", url: "https://amazon.jobs/content/en/how-we-hire/sdm-interview-prep" },
      { label: "Simplify: Amazon SWE interview guide for new grads", url: "https://simplify.jobs/blog/amazon-swe-interview-new-grads" },
      { label: "1Point3Acres: Amazon new grad SDE phone screen", url: "https://www.1point3acres.com/interview/thread/1081295" },
      { label: "Glassdoor: Amazon interview report (2025)", url: "https://static.glassdoor.nl/Interview/Amazon-Interview-E6036-RVW99031153.htm" },
    ],
  },
  {
    companyId: "microsoft",
    summary:
      "Microsoft is commonly reported to use a short phone or screening step followed by a loop of roughly three to four interviews, often with live coding in each. The mix of behavioral, design and a team lead conversation varies by org and location. Reports for new grads describe moderate difficulty with a strong emphasis on clear coding and communication.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Application and recruiter screen",
            format: "Resume review, then a short call",
            what: "Checks background, interest area and logistics. Campus and referral routes are common for early-career roles.",
          },
          {
            name: "Phone or video screen",
            format: "Roughly 45 to 60 minutes in a shared coding environment",
            what: "A coding problem at easy-to-medium level plus brief discussion of a project. Some candidates report skipping straight to a loop.",
          },
          {
            name: "Interview loop",
            format: "Commonly three to four interviews of about 45 to 60 minutes, virtual or onsite",
            what: "Each round usually includes live coding; some include behavioral discussion, design for certain teams, and for some candidates a bar-raiser style interviewer.",
          },
          {
            name: "Hiring manager or team lead chat",
            format: "Final conversation, reported by some candidates",
            what: "Fit with the team, motivation, and a project discussion. Final decisions are typically team-driven.",
          },
          {
            name: "Offer",
            format: "Recruiter call",
            what: "Timelines are reported at about four to eight weeks overall, with wide variance by org.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Reports vary: some loops have no explicit behavioral questions, others have a dedicated behavioral round. Project and teamwork questions blend into technical rounds, and a growth mindset theme is commonly cited.",
          themes: ["Growth mindset and learning", "Collaboration", "Handling technical challenges", "Customer and impact focus", "Ownership of a project"],
          examples: [
            "Tell me about a college or work project and a hard technical problem inside it.",
            "Describe a time you received feedback you disagreed with.",
            "How did you learn a new technology quickly for a deadline?",
            "Give an example of helping a teammate who was stuck.",
          ],
        },
        technical: {
          share: "Most of the loop; every round commonly includes coding",
          topics: ["Linked lists, trees and BSTs", "Hash maps and caches (LRU is frequently reported)", "Strings and arrays", "Recursion", "Object-oriented design", "Light design for new grads"],
          style:
            "Shared editor or whiteboard-style video session with one or two problems per round. Interviewers watch communication and testing as much as the final answer. Design depth increases with experience.",
        },
        projects:
          "Moderate. Past projects and a hard challenge you solved are commonly asked, especially for new grads; prepare a technical walk-through.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "Process differs a lot between orgs such as cloud, gaming and Office; ask the recruiter for the loop plan. Candidates sometimes report a 'bar-raiser' style final round.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "No dependable public detail found for Microsoft ML engineer loops. Expect the coding core plus team-specific ML questions; verify with your recruiter.",
          },
        ],
        prep: [
          "Practice classic data structure problems such as LRU cache, BST operations and linked list manipulation.",
          "Talk through your approach, write clean code, and test with examples; communication is evaluated.",
          "Prepare a project deep dive including trade-offs and what you would change.",
          "Prepare a couple of growth-mindset stories about learning and feedback.",
          "Ask the recruiter which team and org you are interviewing for and whether design is included.",
          "Review object-oriented design basics in your main language.",
        ],
      },
    ],
    sources: [
      { label: "Blind: Microsoft new grad SWE", url: "https://www.teamblind.com/post/microsoft-new-grad-swe-hr52ppna" },
      { label: "Nora: Microsoft new grad SWE interview guide", url: "https://interview.norahq.com/interview-guides/microsoft-new-grad-swe-interview-guide-2025" },
      { label: "Glassdoor: Microsoft interview report", url: "https://www.glassdoor.ca/Interview/Microsoft-Interview-E1651-RVW58104082.htm" },
      { label: "Glassdoor: Microsoft interview report (Taipei)", url: "https://www.glassdoor.com.au/Interview/Microsoft-Interview-E1651-RVW22838251.htm" },
      { label: "Glassdoor: Microsoft interview report 3", url: "https://www.glassdoor.sg/Interview/Microsoft-Interview-E1651-RVW14263944.htm" },
    ],
  },
  {
    companyId: "apple",
    summary:
      "Apple hiring is team-driven, so the process varies widely: commonly a recruiter call, one or more technical phone screens, then an onsite of several interviews with different engineers and the hiring manager. Apple publishes no official interview guide, and the reports I found span many years, so treat this as a loose pattern rather than a fixed format.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter call",
            format: "About 30 minutes by phone",
            what: "Background, interest in the team and role, and logistics. Often the recruiter or a manager screens for fit with a specific team.",
          },
          {
            name: "Technical phone screen",
            format: "About 40 to 60 minutes, sometimes with the hiring manager",
            what: "One algorithm problem and/or questions on your main language and fundamentals. Some reports include a take-home or live front-end exercise depending on team.",
          },
          {
            name: "Onsite or virtual loop",
            format: "Several interviews with different engineers, often a half to full day",
            what: "Coding (whiteboard or IDE), design or domain depth for the team, and project discussion. Reports of a lunch with a manager exist.",
          },
          {
            name: "Hiring manager and stakeholder conversations",
            format: "Final interviews with the manager and partner teams",
            what: "Fit, collaboration style and motivation. The team makes the decision, so impressions here matter.",
          },
          {
            name: "Offer",
            format: "Recruiter call",
            what: "Timelines are commonly reported at a few weeks, though some candidates report longer.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "No codified framework is publicly documented. Behavioral content is typically conversational and project-focused, with 'tell me about your project' and motivation questions throughout. Apple culture themes such as craft and privacy are discussed by candidates but not officially tied to interview scoring.",
          themes: ["Passion for the product", "Ownership of a project", "Collaboration with design and other teams", "Attention to detail", "Why Apple and this team"],
          examples: [
            "Walk me through a project you are proud of and what you built yourself.",
            "Why do you want to work on this specific team?",
            "Describe a time you improved quality on something small but important.",
            "How did you handle disagreement with a designer or product partner?",
          ],
        },
        technical: {
          share: "Most of the loop, but the mix depends heavily on the team",
          topics: ["Algorithms and data structures", "Language depth (Swift, Objective-C, Java, C++ or similar by team)", "System design for experienced roles", "Domain topics such as iOS, backend or front-end", "Debugging"],
          style:
            "Reports mention whiteboard algorithms, live coding in an IDE and team-specific technical discussion. Because teams run their own loops, rounds can differ a lot between candidates.",
        },
        projects:
          "Substantial. Project and 'tell me about your work' discussions are commonly reported, so know the details, decisions and trade-offs of everything on your resume.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "Match your preparation to the job description: backend roles skew to systems and Java-style questions, front-end or iOS roles to platform and UI-specific coding.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "I did not find dependable public detail on Apple ML engineer loops. Expect team-specific ML fundamentals and coding; ask the recruiter and review the posting.",
          },
        ],
        prep: [
          "Read the job posting closely and prepare the specific language or platform it names.",
          "Practice standard algorithm problems on a whiteboard or plain editor as well as in an IDE.",
          "Prepare a deep, honest walk-through of two projects including mistakes and trade-offs.",
          "Prepare a concrete, specific answer to why this team and product.",
          "Ask the recruiter what each interview in your loop will cover since formats differ by team.",
          "Expect to talk to the hiring manager early, so have a short, clear pitch of your background.",
        ],
      },
    ],
    sources: [
      { label: "Taro: Apple software engineer interview (2025)", url: "https://www.jointaro.com/interviews/companies/apple/work-experiences/software-engineer-new-york-ny-september-19-2025-5-7ac598dd/" },
      { label: "Taro: Apple software engineer interview (Oct 2025)", url: "https://www.jointaro.com/interviews/companies/apple/work-experiences/software-engineer-new-york-ny-october-21-2025-4-1e32aa93/" },
      { label: "Taro: Apple software engineer interview (2021)", url: "https://www.jointaro.com/interviews/companies/apple/work-experiences/software-engineer-new-york-ny-march-1-2021-5-f29c7826/" },
      { label: "Glassdoor: Apple interview report", url: "https://www.glassdoor.com/Interview/Apple-Interview-E1138-RVW36859496.htm" },
      { label: "Glassdoor: Apple interview report 2", url: "https://www.glassdoor.com.au/Interview/Apple-Interview-E1138-RVW11494394.htm" },
    ],
  },
  {
    companyId: "nvidia",
    summary:
      "NVIDIA software hiring is commonly reported as a recruiter screen, one or two coding screens (sometimes on HackerRank), then a team-specific virtual onsite. C and C++ fluency, systems fundamentals and sometimes CUDA or parallelism awareness feature more than at typical web-focused employers. Evidence is mostly anecdotal and details vary a lot by team.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter screen",
            format: "Short phone call",
            what: "Background, team interests and logistics. NVIDIA has many distinct teams, so your preferred area is discussed early.",
          },
          {
            name: "Online assessment or coding test",
            format: "Timed coding on a platform such as HackerRank, reported for some new-grad candidates",
            what: "Reports range from an easy question to hard heap or DP problems, and one candidate recalled a clustering-algorithm implementation.",
          },
          {
            name: "Technical phone screen",
            format: "Live coding call with an engineer",
            what: "Algorithms and data structures, often in C or C++, plus fundamentals questions.",
          },
          {
            name: "Virtual onsite",
            format: "Commonly four or five interviews",
            what: "Coding, a domain deep dive based on the team (for example graphics, AI or CUDA), system or API design basics, and a conversation with a manager.",
          },
          {
            name: "Team conversations and offer",
            format: "Additional 30 to 45 minute calls with potential managers",
            what: "Used to find the best fit among teams. Scheduling can be slow; one new-grad candidate reported about three months end to end.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "A smaller share of the process than at consumer-software firms. Typically a conversation with the hiring manager about teamwork, motivation and your projects, not a scored principle-by-principle round.",
          themes: ["Technical curiosity", "Owning hard problems", "Collaboration across hardware and software", "Learning fast", "Motivation for the team"],
          examples: [
            "Tell me about the hardest technical problem you worked on and how you debugged it.",
            "Why are you interested in GPU or accelerated computing work?",
            "Describe a time you had to learn an unfamiliar system quickly.",
            "How did you split work on a group project?",
          ],
        },
        technical: {
          share: "Most of the loop",
          topics: ["Data structures and algorithms", "C and C++ (memory, OOP)", "Operating systems and concurrency basics", "Parallel programming and GPU architecture basics", "CUDA kernels for relevant teams", "API and system design basics"],
          style:
            "LeetCode-style coding in a shared editor, with C/C++ commonly requested, followed by domain questions tied to the team. Candidates report that interviewers want practical trade-offs, not buzzwords.",
        },
        projects:
          "Moderate to substantial. Expect to explain university or work projects in technical detail, especially anything involving systems, performance or parallelism.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "Difficulty and focus depend on the team: driver, compiler, library and application teams all differ. Read the posting for the languages and domain it names.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "Teams around deep learning libraries and frameworks are reported to mix coding with CUDA and ML systems questions. Evidence is thin; confirm the loop with your recruiter.",
          },
        ],
        prep: [
          "Refresh C++ fundamentals: memory management, pointers, templates and OOP.",
          "Learn the basics of GPU parallelism and write a simple CUDA kernel such as a matrix-vector product.",
          "Practice DSA at easy-to-hard range with attention to complexity and edge cases.",
          "Be ready to explain a systems or performance-related project in depth.",
          "Review operating system and concurrency fundamentals.",
          "Tell your recruiter which team areas interest you, since team matching drives the later rounds.",
        ],
      },
    ],
    sources: [
      { label: "CleverPrep: NVIDIA software engineer", url: "https://www.cleverprep.com/companies/nvidia/software-engineer" },
      { label: "PlacementPapers: NVIDIA interview experience", url: "https://placementpapers.app/nvidia/interview-experience/" },
      { label: "Glassdoor: NVIDIA interview report", url: "https://www.glassdoor.sg/Interview/NVIDIA-Interview-E7633-RVW86838147.htm" },
      { label: "Glassdoor: NVIDIA interview report 2", url: "https://www.glassdoor.ca/Interview/NVIDIA-Interview-E7633-RVW90437710.htm" },
      { label: "Glassdoor: NVIDIA interview report 3", url: "https://www.glassdoor.ca/Interview/NVIDIA-Interview-E7633-RVW3906439.htm" },
    ],
  },
  {
    companyId: "netflix",
    summary:
      "Netflix is team-specific and tends to prefer experienced engineers, though it runs a seasonal new-grad program whose official page describes a take-home assessment followed by two interview rounds. Experienced-hire loops are commonly reported to include a hiring manager conversation, a technical screen, a longer onsite, and strong attention to culture fit. Public detail is mostly from prep sites, so confidence is moderate.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter screen",
            format: "About 30 minutes by phone",
            what: "Background, motivation and basic culture alignment. Recruiters may share material on Netflix's values beforehand.",
          },
          {
            name: "Take-home assessment (new grad)",
            format: "Take-home task, per Netflix's new-grad page",
            what: "Used in the new-grad program before interviews. Postings for new grad roles are typically described as appearing in late September or October.",
          },
          {
            name: "Hiring manager screen (experienced)",
            format: "45 to 60 minutes",
            what: "Deep dive into past projects, technical decisions and domain expertise relevant to the team.",
          },
          {
            name: "Technical screen",
            format: "About 60 minutes, live coding in a shared environment",
            what: "Practical coding tied to what the team builds, with a senior engineer observing your reasoning.",
          },
          {
            name: "Interview rounds",
            format: "Two rounds for new grads per Netflix; a longer virtual onsite of several 45 to 60 minute sessions is reported for experienced hires",
            what: "Coding, system design, behavioral and culture conversations, and sometimes a skip-level or director chat. Sources disagree on the exact structure.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Culture carries real weight. Some teams anchor on the Netflix culture memo, others ask more conventional 'tell me about a time' questions. Official new-grad material says interviews assess technical, role-specific and behavioral skills.",
          themes: ["Candor and feedback", "Judgment and independence", "Impact over process", "Ownership", "Collaboration with high-performing peers"],
          examples: [
            "Tell me about a time you gave blunt feedback to a teammate.",
            "Describe a decision you made independently without detailed direction.",
            "When did you push back on a plan you thought was wrong?",
            "What does high-performing teamwork look like to you from experience?",
          ],
        },
        technical: {
          share: "Roughly half or more, depending on role and level",
          topics: ["Practical coding", "Data structures and algorithms", "System design (more for experienced)", "Domain depth for the team", "Recommendation or data-heavy systems for some teams"],
          style:
            "Pair-style coding in a shared environment, with tasks closer to team work than pure puzzles. One new-grad candidate recalled a recommendation-system design prompt; treat that as a single report.",
        },
        projects:
          "Substantial for experienced hires, where the manager screen is a project deep dive. New grads should be ready to defend a take-home and discuss projects in detail.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "Netflix is reported to hire at senior levels by default; entry-level openings come through the seasonal new-grad program. Check jobs.netflix.com in autumn.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "Little reliable public detail on ML engineer loops. Teams around personalization and recommendation likely mix coding with ML design; confirm with the recruiter.",
          },
        ],
        prep: [
          "Read Netflix's culture memo and prepare examples that show its themes, not buzzwords.",
          "Watch jobs.netflix.com from late September if you want the new-grad program.",
          "Prepare to explain your take-home decisions, testing and trade-offs.",
          "Practice practical coding tasks, not just puzzles, in a shared editor.",
          "Have two project deep dives ready with metrics and your specific contribution.",
          "Prepare to discuss candid feedback you have given and received.",
        ],
      },
    ],
    sources: [
      { label: "Netflix: new grad program", url: "https://jobs.netflix.com/new-grad-program" },
      { label: "TechPrep: Netflix's interview process", url: "https://www.techprep.app/blog/netflix-interview-process" },
      { label: "Exponent: Netflix software engineer interview", url: "https://www.tryexponent.com/guides/netflix-software-engineer-interview" },
      { label: "IGotAnOffer: Netflix interview questions", url: "https://igotanoffer.com/en/advice/netflix-interview-questions" },
      { label: "Interview Kickstart: Netflix software engineer interview", url: "https://interviewkickstart.com/blogs/companies/netflix-software-engineer-interview" },
      { label: "Simplify: Netflix new grad software engineer guide", url: "https://simplify.jobs/blog/netflix-new-grad-software-engineer-guide" },
      { label: "1Point3Acres: Netflix SWE phone screen", url: "https://www.1point3acres.com/interview/thread/1157088" },
    ],
  },
  {
    companyId: "stripe",
    summary:
      "Stripe is known for practical, work-like interviews: a collaborative coding round, a bug-fixing round in an unfamiliar codebase, and an API integration round, usually open-book. These are reportedly graded on methodology and communication more than speed. Descriptions come from candidate reports and prep guides, not Stripe itself.",
    asOf: "2026-10",
    confidence: "medium",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter screen",
            format: "Short call",
            what: "Background, interests, level and process overview.",
          },
          {
            name: "Online assessment or technical screen",
            format: "Live collaborative coding of about an hour; some guides mention an earlier assessment",
            what: "A practical coding problem rather than a pure puzzle: feature implementation, parsing or payments-style logic. Reports describe difficulty from easy non-LeetCode to LeetCode medium.",
          },
          {
            name: "Bug squash round",
            format: "About an hour in an IDE on a real codebase",
            what: "You debug failing tests in unfamiliar code, often an open-source library. Systematic approach and use of tools matter more than fixing every bug.",
          },
          {
            name: "Integration round",
            format: "About an hour, open-book with docs",
            what: "Call real APIs, parse JSON and build against an existing system. Reports say it is easy for everyone, so execution needs to be clean.",
          },
          {
            name: "Design and behavioral / manager rounds",
            format: "Separate interviews; design reported for some levels only",
            what: "Behavioral conversation covering collaboration and ownership; system design for more experienced candidates. Interviewers submit written feedback and the decision is based on the packet.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "One behavioral or manager conversation in the loop, reported to probe ownership, user focus and clarity of communication. Practical rounds also assess how you collaborate while working.",
          themes: ["Users first", "Rigor and attention to detail", "Clear written and spoken communication", "Ownership", "Working with ambiguity"],
          examples: [
            "Describe a bug you tracked down in code you did not write.",
            "Tell me about a time you improved something for users without being asked.",
            "How do you decide when to ship versus keep polishing?",
            "Walk me through a project where you had to learn an external API.",
          ],
        },
        technical: {
          share: "Most of the loop, about three or four practical technical rounds",
          topics: ["Practical coding", "Debugging and reading unfamiliar code", "REST APIs and JSON handling", "Idempotency and payments-style logic", "Testing", "System design (experienced)"],
          style:
            "Your own laptop or an IDE, and candidates report being allowed to search documentation and the web. Interviewers observe your method, how you navigate the code, and how you communicate.",
        },
        projects:
          "Moderate. Resume projects come up in the recruiter and behavioral conversations, but most signal comes from live practical work.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "Candidates report that fixing one bug well while explaining your method can still earn a positive round. Use your own comfortable language and set up your environment beforehand.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "Little public evidence on ML-specific Stripe loops. Expect practical coding rounds as above plus team-specific ML questions; ask the recruiter.",
          },
        ],
        prep: [
          "Practice debugging failing tests in an open-source repository you have not seen, narrating your plan as you go.",
          "Build a small program that calls a public API, parses JSON and handles errors and retries.",
          "Set up and test your editor, language and terminal before the interview.",
          "Practice reading docs fast and say what you are searching for.",
          "Learn the idea of idempotency and basic payments flows at a conceptual level.",
          "Write tests as you code; reports say attention to correctness is valued.",
          "Prepare behavioral stories that show care for users and precise communication.",
        ],
      },
    ],
    sources: [
      { label: "Leon Staff: Stripe bug squash and integration guide", url: "https://leonstaff.com/blogs/stripe-technical-interview-bug-squash-integration-guide/" },
      { label: "Blind: Stripe integration and bug squash rounds", url: "https://www.teamblind.com/post/stripe-full-loop-what-to-expect-in-integration-and-bug-squash-rounds-havq2jl1" },
      { label: "PracHub: Stripe SWE interview experience", url: "https://prachub.com/interview-experiences/stripe-software-engineer-interview-with-coding-bug-squash-api-integration-and-bq-rounds-cf992a00e3" },
      { label: "1Point3Acres: Stripe onsite experience", url: "https://www.1point3acres.com/interview/post/7298079" },
      { label: "Blind: Stripe SWE interview process", url: "https://www.teamblind.com/post/whats-the-interview-process-like-for-swe-role-at-stripe-vyggfhqh" },
      { label: "Interview Query: Stripe software engineer", url: "https://www.interviewquery.com/guides/stripe-software-engineer?exp_page=2" },
    ],
  },
  {
    companyId: "uber",
    summary:
      "Uber is commonly reported to start with an online assessment or recruiter screen, a one-hour technical phone screen, and then a loop of roughly three interviews covering coding, project or specialization depth, and behavioral. System design appears in some loops. Public evidence is anecdotal and varies by team and location.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter screen",
            format: "Short call",
            what: "Background, interests and team areas such as maps, marketplace or platform.",
          },
          {
            name: "Online assessment (some candidates)",
            format: "About 70 minutes, reported on CodeSignal",
            what: "Timed coding used as a pre-screen, reported by an early-career candidate in Toronto.",
          },
          {
            name: "Technical phone screen",
            format: "About one hour on video",
            what: "LeetCode-style coding, sometimes with a short design or project-discussion portion. Explaining your reasoning aloud is reported to matter.",
          },
          {
            name: "Interview loop",
            format: "Reported as around three interviews for new grads (two technical, one behavioral); longer for experienced hires",
            what: "Algorithmic coding, a round discussing your technologies or specialization (sometimes front-end focused), and a behavioral conversation. System design is reported for some roles.",
          },
          {
            name: "Decision and offer",
            format: "Recruiter call",
            what: "Timelines are reported at about one to two months. I found no evidence of a Bar Raiser at Uber.",
          },
        ],
        behavioral: {
          star: "helpful",
          style:
            "Usually one behavioral round in the loop plus project questions inside technical rounds. Reported as a moderate share of the process.",
          themes: ["Ownership and bias for action", "Working at pace", "Collaboration", "Learning from mistakes", "Customer and rider/driver impact"],
          examples: [
            "Describe a project you owned from idea to launch.",
            "Tell me about a time you had to move fast with incomplete information.",
            "How did you handle disagreement within your team?",
            "What would you do differently on your biggest past project?",
          ],
        },
        technical: {
          share: "Most of the loop; two of roughly three interviews for new grads",
          topics: ["Arrays, strings, hash maps", "Trees and graphs", "Dynamic programming and heaps", "Project and technology deep dives", "System design for experienced candidates", "Front-end topics for some teams"],
          style:
            "Shared online editor with LeetCode-style problems, and follow-ups on optimality. Design discussions may appear as part of a technical interview rather than a separate round for new grads.",
        },
        projects:
          "Moderate to substantial. Project walkthroughs come up often, including a round that probes the technologies you chose.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "Loop content varies by team and location. For new grads, expect coding to dominate and a light design discussion; confirm the round list with your recruiter.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "I could not retrieve reliable public detail on Uber ML engineer loops. Expect coding plus team-dependent ML questions and verify with the recruiter.",
          },
        ],
        prep: [
          "Practice timed LeetCode-style problems and explain each step aloud; reports cite under-explaining as a failure point.",
          "Prepare a detailed project walkthrough including technology choices and trade-offs.",
          "Review basic system design: APIs, storage choices and failure modes.",
          "Prepare behavioral stories on ownership and moving quickly.",
          "Practice an online assessment format with a strict timer.",
          "Ask your recruiter which team and what each loop round covers.",
        ],
      },
    ],
    sources: [
      { label: "Glassdoor: Uber new grad SWE interview questions", url: "https://static.glassdoor.ca/Interview/Uber-New-Graduate-Software-Engineer-Interview-Questions-EI_IE575263.0,4_KO5,35.htm" },
      { label: "Glassdoor: Uber interview report", url: "https://www.glassdoor.co.nz/Interview/Uber-Interview-E575263-RVW20451256.htm" },
      { label: "Glassdoor: Uber interview report 2", url: "https://www.glassdoor.co.nz/Interview/Uber-Interview-E575263-RVW29535346.htm" },
      { label: "Glassdoor: Uber interview report 3", url: "https://www.glassdoor.co.in/Interview/Uber-Interview-E575263-RVW90275720.htm" },
      { label: "1Point3Acres: Uber full onsite experience", url: "https://www.1point3acres.com/interview/thread/1150529" },
      { label: "Blind: Uber new grad interview", url: "https://www.teamblind.com/post/uber-new-grad-interview-6zpakzfy" },
    ],
  },
  {
    companyId: "airbnb",
    summary:
      "Airbnb is commonly reported to combine a recruiter call and live coding screen with an onsite of coding, a code review exercise, system design for mid-level and up, and dedicated core-values interviews. Coding is expected to run in CoderPad rather than stay as pseudocode. Evidence comes from prep sites and varies in round counts.",
    asOf: "2026-10",
    confidence: "low",
    tracks: [
      {
        group: "computer-science",
        label: "Software engineer",
        stages: [
          {
            name: "Recruiter call",
            format: "Short phone call",
            what: "Checks background and motivation; reportedly listens for why Airbnb specifically rather than any top tech employer.",
          },
          {
            name: "Technical screen",
            format: "About 60 minutes in CoderPad, or an automated HackerRank or CodeSignal assessment",
            what: "A coding problem you are expected to run and pass with working code. Quality, edge cases and tests are noticed.",
          },
          {
            name: "Onsite coding rounds",
            format: "Several 45 to 60 minute sessions with execution enabled",
            what: "Data structure and algorithm problems, described as leaning to dynamic programming dressed in booking or listing scenarios.",
          },
          {
            name: "Code review round",
            format: "About an hour",
            what: "You read existing code and critique it, looking for logic or security problems and giving useful feedback. Reported as unusual among big employers.",
          },
          {
            name: "System design and core-values interviews",
            format: "Design for mid-level and up; values sessions of about 45 to 60 minutes, sometimes with people outside the team",
            what: "Design emphasizes product thinking and ambiguity. Values interviews check mission alignment and collaboration; one guide says they can outweigh a strong technical result, which is unverified.",
          },
        ],
        behavioral: {
          star: "expected",
          style:
            "Dedicated core-values and cross-functional sessions that carry real weight in the decision according to prep guides. Prepare stories rather than recited values.",
          themes: ["Championing the mission", "Being a host", "Embracing the adventure", "Cross-functional collaboration", "Why Airbnb"],
          examples: [
            "Tell me about a time you made someone feel welcome or supported.",
            "Describe a risk you took on a project that was unfamiliar.",
            "Give an example of working with a designer or product manager on a tough trade-off.",
            "What about travel or community made you apply to Airbnb?",
          ],
        },
        technical: {
          share: "About half or more of the loop",
          topics: ["Dynamic programming and graphs", "Hash maps and strings", "Code review", "Testing and code quality", "System design (mid-level and above)"],
          style:
            "CoderPad with execution on; pseudocode is reported not to pass. Expect to produce compiling, tested code in the time and to explain trade-offs.",
        },
        projects:
          "Moderate. Past work is probed in values and cross-functional sessions, so prepare a project story that shows collaboration and user impact.",
        roleNotes: [
          {
            roleId: "software-engineer",
            notes:
              "New grad loops likely omit or lighten system design. Round counts vary by source, so confirm the schedule with your recruiter.",
          },
          {
            roleId: "ml-engineer",
            notes:
              "I did not find reliable public detail on Airbnb ML engineer loops. Expect coding plus team-specific ML and ranking or search questions; verify with the recruiter.",
          },
        ],
        prep: [
          "Practice problems in CoderPad or a similar online editor and make sure your solution actually runs.",
          "Practice dynamic programming specifically, including scheduling and booking-style variants.",
          "Do mock code reviews: read a snippet and find bugs, security issues and style problems.",
          "Prepare five or six values stories without naming the values awkwardly.",
          "Prepare an honest, specific answer for why Airbnb.",
          "Write tests and handle edge cases during coding; code quality is stressed.",
        ],
      },
    ],
    sources: [
      { label: "TechPrep: Airbnb's interview process", url: "https://www.techprep.app/blog/airbnb-interview-process" },
      { label: "TechInterview: how Airbnb interviews engineers", url: "https://www.techinterview.org/post/3233476842/airbnb-interview-guide/" },
      { label: "Interview Kickstart: Airbnb software engineer process", url: "https://interviewkickstart.com/blogs/companies/airbnb-software-engineer-interview-process" },
      { label: "Morehouse Career Development: deep dive into Airbnb interviews", url: "https://careerdevelopment.morehouse.edu/blog/2023/04/24/a-deep-dive-into-the-airbnb-interview-process/" },
    ],
  },
];
