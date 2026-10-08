import type { GroupGuide } from "./types";

// Generic, field-level briefings compiled from public sources (career-center pages, prep resources,
// anonymous candidate reports). Formats vary by employer and year; never insider information.
export const groupGuides: GroupGuide[] = [
  {
    group: "engineering",
    summary:
      "Engineering hiring for new grads usually runs through campus career fairs and online applications, then a short screen and one or more interviews with hiring managers and engineers. Behavioral questions are common and often carry as much weight as technical ones, and the technical portion tends to follow your discipline's coursework and your own projects.",
    asOf: "2026-10",
    stages: [
      {
        name: "Campus event or online application",
        format: "Career fair, info session, or portal submission with resume",
        what: "Recruiters sort by major, GPA, relevant projects or internships, and work authorization. Some roles state U.S.-person or citizenship requirements up front.",
      },
      {
        name: "Recorded or short screening",
        format: "Phone, Zoom, or recorded video questions, roughly 20 to 30 minutes",
        what: "Often mostly behavioral: why this company, what you did on a project, and a check that your resume holds up. Some employers use video-response platforms.",
      },
      {
        name: "Hiring-manager interview",
        format: "30 to 60 minutes, virtual or on site",
        what: "A manager or senior engineer probes your projects, teamwork, and fit with the group. Technical depth varies a lot; some managers ask little beyond your own work.",
      },
      {
        name: "Technical and panel round",
        format: "One or more sessions, sometimes with several interviewers at once",
        what: "Discipline fundamentals (for example statics, thermodynamics, circuits) mixed with behavioral questions. Panels expect you to address each person and talk through your reasoning aloud.",
      },
      {
        name: "Project or design walk-through",
        format: "Informal presentation or discussion of a capstone, lab, or internship project",
        what: "You explain goals, your specific contribution, trade-offs, and results. Interviewers test whether you truly did and understand the work.",
      },
      {
        name: "Background checks and offer",
        format: "HR call, written offer, and screening paperwork",
        what: "Defense and aerospace roles may require ITAR eligibility, background checks, or a clearance process. Offers often include a note about taking the FE exam.",
      },
    ],
    behavioral: {
      star: "expected",
      style:
        "Behavioral questions appear in almost every round and sometimes make up most of the first screen. Career centers and recruiters commonly recommend structuring answers as situation, task, action, result, using your own contribution rather than the team's.",
      themes: [
        "teamwork and conflict",
        "handling deadlines and pressure",
        "problem solving on a real project",
        "failure and learning",
        "why this company and this role",
        "communication with non-engineers",
      ],
      examples: [
        "Tell me about a time a teammate disagreed with your design and how you handled it.",
        "Describe a project that did not work the first time and what you changed.",
        "How did you manage competing deadlines during your capstone or an internship?",
        "Why are you interested in this product area or industry?",
      ],
    },
    technical: {
      share:
        "Varies widely: from a mostly behavioral conversation to about half technical, depending on the employer and discipline",
      topics: [
        "mechanical: statics, mechanics of materials, thermodynamics, fluids, manufacturing, CAD",
        "electrical: Ohm's and Kirchhoff's laws, AC and DC circuits, components, digital logic, embedded basics",
        "tools and software from your coursework (CAD, MATLAB, simulation)",
        "applying fundamentals to a practical scenario",
        "your own design and lab work",
      ],
      style:
        "Conversational questions at a whiteboard or on a video call, either conceptual (explain stress versus strain) or a short worked problem. Admitting a gap and reasoning forward is generally received better than guessing.",
    },
    projects:
      "Expect real depth on capstone, lab, club, and internship work, since many interviewers ask you to explain the design, your role, and what you would change. Be ready to sketch the system, justify material or component choices, and quantify results. Know every line of your resume well enough to talk about it for several minutes.",
    prep: [
      "Review core coursework for your discipline (statics, thermo, circuits, controls, whichever applies) and practice explaining it out loud.",
      "Write down three to five STAR stories covering teamwork, conflict, failure, leadership, and technical problem solving, and reuse them across questions.",
      "Prepare a two-minute and a five-minute walk-through of your capstone or best project, including your specific role and the numbers.",
      "Read each posting for terms like ITAR, U.S. person, citizenship, or clearance, and state your work authorization clearly on your application.",
      "Plan to take the FE exam near graduation if your field and state path call for licensure, since it is the first step toward the PE; ask employers whether they support it.",
      "Research the company's products, plants, or programs so you can answer why this employer with specifics.",
      "Practice with a career-center mock interview, ideally including a panel format where you speak to every interviewer.",
      "Prepare questions for the interviewers about the team, mentoring, and what a first-year engineer actually works on.",
    ],
    sources: [
      { label: "NAU engineering career center: prepare for an interview", url: "https://scecareer.nau.edu/channels/prepare-for-an-interview/" },
      { label: "Guide to interviews and assessment centres for engineering graduates", url: "https://postgradaustralia.com.au/interviews/a-guide-to-interviews-and-assessment-centres-for-engineering-graduates" },
      { label: "University at Buffalo: Professional Engineer licensure", url: "https://engineering.buffalo.edu/home/academics/beyond/licensure.html" },
      { label: "Calvin University: FE and PE exams and licensure", url: "https://www.calvin.edu/academics/school-stem/engineering/careers-outcomes/professional-licensing" },
      { label: "Aerospace jobs and the ITAR citizenship wall", url: "https://www.f1jobs.io/resources/blog/aerospace-jobs-international-students-itar" },
      { label: "Raytheon new-grad interview report (Glassdoor)", url: "https://static.glassdoor.ch/Interview/Raytheon-Interview-E3300024-RVW73762286.htm" },
      { label: "Complete guide to panel interviews", url: "https://www.interviewkickstart.com/blog/complete-guide-to-ace-panel-interviews" },
    ],
  },
  {
    group: "computer-science",
    summary:
      "Software hiring for new grads typically moves from a recruiter conversation to an online coding assessment, then a live coding screen and a final loop of several coding and behavioral rounds. Algorithms and data structures dominate; system design is mostly for experienced candidates, and some large companies add a separate team-matching step.",
    asOf: "2026-10",
    stages: [
      {
        name: "Application or referral",
        format: "Online portal, campus recruiting, or referral",
        what: "Resume screen on projects, internships, languages, and coursework. Campus pipelines and referrals can shortcut the queue.",
      },
      {
        name: "Recruiter screen",
        format: "Short call, about 15 to 30 minutes",
        what: "Covers your background, interests, timing, location, and process logistics. Usually conversational, but your answers can still screen you out.",
      },
      {
        name: "Online assessment",
        format: "Timed coding platform session, often two problems in roughly an hour, sometimes with job-related or behavioral add-ons",
        what: "Automated check of problem solving and correctness on algorithmic problems; some companies add a work-style or behavioral section.",
      },
      {
        name: "Live technical screen",
        format: "45 to 60 minutes in a shared editor with an engineer",
        what: "One or two LeetCode-style problems where you explain your approach, complexity, and trade-offs while coding, and respond to hints.",
      },
      {
        name: "Final loop",
        format: "Three to five interviews of about an hour, usually virtual",
        what: "Mostly coding, plus a behavioral round and sometimes a project deep-dive. Experienced hires also get a system design round; new grads often do not.",
      },
      {
        name: "Team match and offer",
        format: "Calls with hiring managers, then recruiter offer discussion",
        what: "At some companies a passed loop still needs a team to take you, so match is a separate step with its own uncertainty. Others hire straight into a team.",
      },
    ],
    behavioral: {
      star: "expected",
      style:
        "Usually one dedicated behavioral round in the loop, plus a few questions in other rounds. Some companies build questions around written values or leadership principles, and STAR-style stories with concrete data are widely recommended. Interviews can be loose, chaining follow-ups from one story.",
      themes: [
        "teamwork and conflict",
        "ownership and initiative",
        "dealing with ambiguity or setbacks",
        "learning from mistakes",
        "impact of your projects",
        "why this company",
      ],
      examples: [
        "Tell me about a project you are proud of and what you personally built.",
        "Describe a disagreement with a teammate over a technical decision.",
        "When did you have to learn something quickly to ship on time?",
        "Tell me about a bug or failure you caused and what you did next.",
      ],
    },
    technical: {
      share: "Most of the process: typically three of four or five loop rounds, plus the online assessment and screen",
      topics: [
        "arrays, strings, hash maps, linked lists",
        "trees, graphs, recursion, BFS and DFS",
        "sorting, searching, dynamic programming basics",
        "time and space complexity",
        "object-oriented design and core language fluency",
        "system design for experienced candidates (scalability, trade-offs)",
      ],
      style:
        "Timed online coding, then live problem solving in a shared editor. Interviewers score communication, testing, and how you use hints as well as the final solution.",
    },
    projects:
      "Resume projects and internships come up in the recruiter call, in behavioral rounds, and sometimes in a dedicated project-dive round. Be ready to explain the architecture, why you chose the tools, what was hard, your exact contribution, and what you would do differently. Do not list technologies you cannot discuss.",
    prep: [
      "Practice core data-structure and algorithm problems on a coding platform, grouped by pattern, and time yourself to mimic an assessment.",
      "Solve problems out loud: restate, ask clarifying questions, outline an approach, code, then test with examples and state complexity.",
      "Pick one language you can write fluently without looking up syntax.",
      "Prepare four to six behavioral stories in STAR form with measurable results, mapped to the company's stated values.",
      "Rehearse a clear three-minute explanation of your two strongest projects, including trade-offs and your own role.",
      "Do mock interviews with peers or your career center, including at least one where you accept and use a hint.",
      "Learn the basics of how web services, databases, and caching work; you may need them for project questions and later for system design.",
      "Ask your recruiter about the exact stages and whether team match follows the loop so you are not surprised.",
    ],
    sources: [
      { label: "New-grad software engineer interview guide (Final Round AI)", url: "https://www.finalroundai.com/blog/new-grad-software-engineer-interview" },
      { label: "Google software engineer interview: online coding and team matching (candidate report)", url: "https://prachub.com/interview-experiences/google-software-engineer-interview-online-coding-and-team-matching-8a38aa83df" },
      { label: "Amazon front end engineer interview report (Taro)", url: "https://www.jointaro.com/interviews/companies/amazon/work-experiences/front-end-engineer-january-20-2022-4-2316d6c3" },
      { label: "Grammarly software engineer interview report (Taro)", url: "https://www.jointaro.com/interviews/companies/grammarly/work-experiences/software-engineer-berlin-april-24-2025-4-893bde2c/" },
      { label: "University of St. Thomas: software engineering internship interview questions", url: "https://career.stthomas.edu/resources/software-engineering-internship-interview-questions/" },
      { label: "Princeton: preparing for software engineering interviews", url: "https://www.princeton.edu/events/2025/preparing-software-engineering-interviews" },
      { label: "Texas A&M career center: the STAR method", url: "https://careercenter.tamu.edu/blog-graduate-students-career-readiness/april-2020/the-s-t-a-r-method-for-behavioral-interviews" },
    ],
  },
  {
    group: "investment-banking",
    summary:
      "Investment banking recruiting is early and calendar-driven: students network from freshman or sophomore year, apply for junior-summer programs, then pass a video or phone screen and a Superday of back-to-back interviews. Interviews blend technical finance questions with a heavily weighted fit assessment.",
    asOf: "2026-10",
    stages: [
      {
        name: "Networking and info sessions",
        format: "Coffee chats, campus events, virtual sessions, diversity or insight programs",
        what: "Builds contacts and firm knowledge. Sophomore-year programs can be an early route in, and networking is often the first step in published school timelines.",
      },
      {
        name: "Application",
        format: "Firm portal with resume, often opening in the winter or spring of sophomore year, sometimes earlier",
        what: "Screens on school, GPA, finance exposure, and signals of interest. Timing differs by firm, so confirm deadlines directly.",
      },
      {
        name: "HireVue or phone screen",
        format: "Recorded video with a few timed questions (about three minutes each), or a short call",
        what: "Mostly why banking and why this firm, plus situational or brief technical questions.",
      },
      {
        name: "First-round interview",
        format: "30 to 45 minutes with one to three bankers, on video or in person",
        what: "A mix of resume walk-through, fit, and core technicals such as accounting and valuation.",
      },
      {
        name: "Superday",
        format: "Several back-to-back 30-minute interviews in a few hours, often four to eight, with analysts through senior bankers",
        what: "Technical and fit questions repeated across interviewers; consistency and stamina matter. Seniors often weigh whether they would want to work with you.",
      },
      {
        name: "Offer and decision window",
        format: "Phone call within days, with a short window to respond",
        what: "Large banks often move early on a rolling basis, with smaller banks recruiting later. Exact dates vary by year.",
      },
    ],
    behavioral: {
      star: "helpful",
      style:
        "Fit questions usually come first in each interview and can be decisive; senior interviewers often care more about fit than technical polish. Concise structured stories help, but interviewers mostly want a clear, genuine narrative about motivation, interest in the firm, and how you work.",
      themes: [
        "why investment banking",
        "why this firm and group",
        "walk me through your resume",
        "teamwork and working under pressure",
        "attention to detail",
        "knowledge of markets and recent deals",
      ],
      examples: [
        "Walk me through your background and why it leads to banking.",
        "Why do you want to work at this firm rather than another bank?",
        "Tell me about a time you had to work long hours with a team on a tight deadline.",
        "Tell me about a deal or market trend you have followed recently.",
      ],
    },
    technical: {
      share:
        "Roughly half of the content for most interviews, heavier with junior interviewers and for finance majors; fit carries the rest",
      topics: [
        "three-statement accounting and how the statements link",
        "enterprise value versus equity value",
        "DCF, comparable companies, precedent transactions",
        "M&A basics such as accretion and dilution",
        "LBO fundamentals, often at a basic level for undergraduates",
        "current markets and recent deals",
      ],
      style:
        "Verbal questions, sometimes with a number-based mini-problem; some firms use a modeling test or case in later rounds. A wrong basic answer can hurt, so say what you know and reason through the rest.",
    },
    projects:
      "Interviewers walk through your resume line by line, so every internship, club, and finance activity should be ready for follow-ups. If you list a deal, a stock pitch, or a valuation project, know the numbers, your role, and the key assumptions. Be able to discuss a recent transaction in depth.",
    prep: [
      "Start networking early and keep notes on each conversation so you can reference specifics in later interviews.",
      "Learn accounting and valuation fundamentals thoroughly from a recognized technical guide, and practice answering aloud in a minute or two.",
      "Be able to walk through the three statements, a simple DCF, and a basic LBO without notes.",
      "Prepare a crisp 'walk me through your resume' and clear answers for why banking and why this firm.",
      "Follow current markets and pick two or three deals you can discuss, including rationale and valuation.",
      "Practice HireVue-style recording with a timer, looking at the camera and keeping each answer under the time limit.",
      "Do full-length mock Superdays so your energy and answers stay consistent from the first to the last interview.",
      "Check each firm's application timing yourself, since sources disagree and the calendar shifts yearly.",
    ],
    sources: [
      { label: "Wall Street Prep: Superday guide", url: "https://www.wallstreetprep.com/knowledge/superday/" },
      { label: "UMD Smith career center: Investment banking interview prep (2026 guide)", url: "https://careers.rhsmith.umd.edu/blog/2026/02/02/investment-banking-interview-prep-2026-guide/" },
      { label: "Clemson career office: investment banking timeline (PDF)", url: "https://clemson.edu/business/students/career-global-engagement/documents/invest-bank-timeline.pdf" },
      { label: "Wall Street Playbook: investment banking Superday, what to expect", url: "https://wallstreetplaybook.org/blog/investment-banking-superday-what-to-expect" },
      { label: "Investment banking recruiting: sophomore programs, Superdays, and timelines", url: "https://www.uni2study.com/articles/investment-banking-recruiting-timeline" },
      { label: "Leland: investment banking recruiting timeline and process", url: "https://www.joinleland.com/library/a/investment-banking-recruiting" },
      { label: "Wall Street Oasis: 2025 BofA investment banking internship interview report", url: "https://www.wallstreetoasis.com/company/bank-of-america-merrill-lynch/interview/2025-investment-banking-internship" },
    ],
  },
  {
    group: "consulting",
    summary:
      "Strategy consulting hiring screens resumes, often adds an online assessment, then runs rounds of interviews that each combine a case with a behavioral or fit segment. Cases test structure, math, and judgment, while fit tests motivation, leadership, and how you work with others.",
    asOf: "2026-10",
    stages: [
      {
        name: "Resume and application screen",
        format: "Portal application with resume, sometimes a cover letter",
        what: "Very selective. Looks for academic strength, leadership, quantified impact, and evidence of problem solving.",
      },
      {
        name: "Online assessment",
        format: "Timed digital test, which varies by firm and region",
        what: "Examples reported include a game-style problem-solving test, a chatbot-style case, or firm-specific cognitive tests. Formats have changed, so verify the current one with the firm.",
      },
      {
        name: "First-round interviews",
        format: "Typically two interviews, around 30 to 60 minutes each, virtual or in person",
        what: "Each usually contains a fit portion plus a case, with an interviewer who scores structure, quantitative skill, and communication.",
      },
      {
        name: "Final round",
        format: "Two to three interviews, often with senior leaders such as partners",
        what: "More cases and more fit, with seniors more likely to let you lead. The overall process often takes several weeks.",
      },
      {
        name: "Offer",
        format: "Call from recruiting or a partner, often within days of the final round",
        what: "Decision combines case and fit scores across all interviewers.",
      },
    ],
    behavioral: {
      star: "helpful",
      style:
        "Fit is a distinct segment in almost every interview and is judged more subjectively than the case; coaches estimate it carries substantial weight, though estimates differ. Some firms use a structured experience interview, such as McKinsey's, probing one story deeply. Clear structure like STAR helps but follow-up depth matters more.",
      themes: [
        "why consulting and why this firm",
        "leadership and impact",
        "teamwork and handling disagreement",
        "dealing with ambiguity and failure",
        "persuading others",
        "personal drive and curiosity",
      ],
      examples: [
        "Tell me about a time you led a group through a difficult situation.",
        "Describe a time you changed someone's mind.",
        "Why consulting, and why our firm in particular?",
        "Tell me about a time you worked on a problem with no clear answer.",
      ],
    },
    technical: {
      share:
        "About half or more of each interview is the case; the rest is fit, so the quantitative and structuring parts are the core assessment",
      topics: [
        "structuring an open-ended business problem",
        "profitability, market entry, growth, and market-sizing case types",
        "estimating market size from first principles",
        "mental math: percentages, growth, margins, break-even",
        "interpreting charts and tables",
        "synthesizing a recommendation",
      ],
      style:
        "Interviewer-led cases give you a sequence of questions and the interviewer controls the pace; candidate-led cases expect you to set the structure and decide what to analyze next. McKinsey is most associated with interviewer-led, while many other firms lean candidate-led, but it varies by interviewer and round.",
    },
    projects:
      "Interviewers dig into a few of your experiences rather than every line, especially in fit. Choose two or three stories with clear leadership, quantifiable impact, and challenges, and be ready for follow-ups on what you did, why, and what happened next. Clubs and campus leadership are used as evidence of impact.",
    prep: [
      "Learn the main case types and practice structuring each with a short, tailored framework rather than reciting a memorized template.",
      "Drill mental math daily, including percentages, growth rates, and rounding, until it is fast and accurate.",
      "Practice market sizing aloud: clarify scope, state assumptions, compute cleanly, sanity-check, and give an insight.",
      "Do many live mock cases with partners, practicing both interviewer-led and candidate-led styles.",
      "Prepare three to five detailed fit stories on leadership, teamwork, conflict, and impact, plus a sharp 'why consulting and why this firm'.",
      "Find out which online assessment each firm uses in your region and practice that exact format.",
      "End each case with a short synthesis: recommendation, key reasons, risks, and next steps.",
      "Use free career-center resources and consulting club case books before paying for outside coaching.",
    ],
    sources: [
      { label: "PrepLounge: candidate-led versus interviewer-led cases", url: "https://www.preplounge.com/en/candidate-led-cases-vs-interviewer-led-cases" },
      { label: "Hacking the Case Interview: case interview process", url: "https://www.hackingthecaseinterview.com/pages/case-interview-process" },
      { label: "Hacking the Case Interview: interviewer-led case interviews", url: "https://www.hackingthecaseinterview.com/pages/interviewer-led-case-interview" },
      { label: "Case Star: fit interview definition", url: "https://www.casestar.io/definitions/fit-interview" },
      { label: "StrategyCase: consulting fit interviews", url: "https://strategycase.com/consulting-personal-fit-interviews-the-only-guide-you-need-to-read/" },
      { label: "Management Consulted: market sizing framework", url: "https://managementconsulted.com/market-sizing/" },
      { label: "IGotAnOffer: McKinsey problem solving test", url: "https://igotanoffer.com/blogs/mckinseypst" },
    ],
  },
];
