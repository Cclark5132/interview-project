import type { CompanyGuide } from "./types";

export const engC: CompanyGuide[] = [
  {
    "companyId": "apple",
    "summary": "Apple hires hardware engineers team by team, so the exact loop varies by discipline; Apple's own pages describe the hardware groups and the skills postings ask for (lab debugging, schematics, signal and power integrity) but not interview steps. Candidates commonly report a hiring-manager conversation then a long day of technical sessions. That stage detail is anonymous and dated, so treat it as indicative.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Hardware / engineering (electrical, mechanical, ASIC)",
        "stages": [
          {
            "name": "Application and recruiter call",
            "format": "Short phone call",
            "what": "Confirms background, interest in Apple and the target team, and logistics. Roles are posted per team, so match your resume to the specific posting."
          },
          {
            "name": "Hiring manager conversation",
            "format": "30-60 min call",
            "what": "Commonly reported: discussion of your recent projects and tools, plus a few behavioral questions. Some candidates report little formal technical testing at this step."
          },
          {
            "name": "Technical phone screen",
            "format": "45-60 min call",
            "what": "Discipline fundamentals, for example circuits and signal integrity for electrical or mechanics of materials for mechanical. Occasionally a simple coding question appears even for hardware roles."
          },
          {
            "name": "Onsite or virtual loop",
            "format": "Roughly 4-5 hours, many 30-60 min sessions with different team members",
            "what": "Mix of whiteboard technical problems, detailed project deep dives and team-fit questions. Some reports describe up to ten shorter sessions over a day."
          },
          {
            "name": "Debrief and offer",
            "format": "Days to several weeks",
            "what": "Team decides after the loop; reports of total timelines range from about a month to over two months."
          }
        ],
        "behavioral": {
          "star": "helpful",
          "style": "Behavioral content is woven into technical sessions rather than run as a separate scripted round. Interviewers look for team fit, clear communication and how you handle teammates and setbacks. Formal STAR is not mandated but structured stories help.",
          "themes": [
            "Collaboration with difficult teammates",
            "Ownership of design decisions",
            "Why Apple and this team",
            "Attention to detail",
            "Communication across disciplines"
          ],
          "examples": [
            "Describe a time a teammate was not pulling their weight and what you did.",
            "Why do you want to work on this product area at Apple?",
            "Tell me about a design decision you made that you later regretted.",
            "How did you work with people from another discipline to ship something?",
            "Describe the hardest debugging problem you have solved."
          ]
        },
        "technical": {
          "share": "Most of the process",
          "topics": [
            "Digital design and basic circuits",
            "Signal and power integrity (such as decoupling placement)",
            "Mechanics of materials, beams and tolerance thinking for mechanical roles",
            "Tools and flows you used",
            "Occasional light coding",
            "ASIC roles (RTL, verification, SoC) are generally hired through separate Silicon Engineering postings"
          ],
          "style": "Whiteboard problems and diagramming with engineers from the team; rapid fundamentals questions; interviewers drill down until you reach the limit of your knowledge."
        },
        "projects": "Heavy. Hiring managers reportedly care about the specific tools, processes and details of your past work. Be ready to sketch the design you built, explain trade-offs, what failed and what you personally owned versus the team.",
        "roleNotes": [
          {
            "roleId": "hardware-engineer",
            "notes": "Expect circuit and board-level fundamentals: signal integrity, power delivery, decoupling, digital interfaces, and lab debugging stories."
          },
          {
            "roleId": "design-engineer",
            "notes": "For mechanical design, reviews mention beams, cantilevers and materials mechanics; bring CAD projects with tolerance and DFM reasoning."
          },
          {
            "roleId": "thermal-engineer",
            "notes": "Thermal roles are likely to probe heat transfer fundamentals in compact enclosures; evidence for this is limited, so confirm with the recruiter."
          },
          {
            "roleId": "systems-engineer",
            "notes": "Be prepared to reason across hardware and firmware boundaries and explain how you debug a failure end to end."
          }
        ],
        "prep": [
          "Pick your two or three strongest projects and be able to draw the architecture or mechanism from memory.",
          "Review fundamentals for your discipline and practice solving them on a whiteboard while talking aloud.",
          "Prepare to state exactly which parts of a team project you personally designed, simulated or tested.",
          "Practice power and signal integrity basics: decoupling placement, return paths, termination.",
          "Mechanical candidates: review statics, beam bending, stress concentrations and material selection.",
          "Search for the exact team posting and tailor your examples; ASIC applicants should apply to Silicon Engineering roles.",
          "Prepare an honest, specific answer for why Apple and why that product area.",
          "Keep a small coding refresher ready in case a simple problem appears."
        ]
      }
    ],
    "sources": [
      {
        "label": "Apple careers: Hardware teams (official; no interview steps)",
        "url": "https://www.apple.com/careers/us/hardware.html"
      },
      {
        "label": "Glassdoor Apple interview report (digital design, signal integrity, whiteboard)",
        "url": "https://www.glassdoor.ie/Interview/Apple-Interview-E1138-RVW15240281.htm"
      },
      {
        "label": "Glassdoor Apple interview report (phone screen, mechanics)",
        "url": "https://www.glassdoor.sg/Interview/Apple-Interview-E1138-RVW1773163.htm"
      },
      {
        "label": "CleverPrep Apple hardware engineer guide",
        "url": "https://www.cleverprep.com/companies/apple/hardware-engineer"
      },
      {
        "label": "Teamblind apple hardware engineer interview thread",
        "url": "https://www.teamblind.com/post/apple-hardware-engineer-interview-s81g6ptk"
      },
      {
        "label": "Glassdoor Apple interview report (full-day format)",
        "url": "https://www.glassdoor.sg/Interview/Apple-Interview-E1138-RVW728698.htm"
      }
    ]
  },
  {
    "companyId": "nvidia",
    "summary": "NVIDIA's university recruiting pages describe phone screens then virtual or in-person interviews with the hiring manager and team members (30 to 60 minutes each), phone-only for interns, and say technical candidates may do a coding exercise; those pages are dated, so confirm with your recruiter. Hardware topics (digital design, timing, architecture) come from candidate reports, often from India and Israel.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Hardware / ASIC (design, verification, physical design)",
        "stages": [
          {
            "name": "Application / campus shortlist",
            "format": "Online application or campus drive",
            "what": "Resume screening against the role, usually SystemVerilog/Verilog and digital design for ASIC postings."
          },
          {
            "name": "Online or written assessment",
            "format": "Timed test (common in campus pipelines)",
            "what": "Reported content includes digital design, CMOS properties, cache concepts and fault detection; not all US pipelines use it."
          },
          {
            "name": "Technical screen",
            "format": "45-60 min call",
            "what": "Digital logic, static timing, Verilog or RTL snippets and parts of your resume."
          },
          {
            "name": "Technical interview rounds",
            "format": "Two to four interviews, sometimes in one day",
            "what": "Deeper problems: setup/hold calculation, clocking, CMOS gates, computer architecture, verification approach, plus resume deep dives."
          },
          {
            "name": "Manager / HR conversation",
            "format": "Short final call",
            "what": "Fit, motivation, logistics and compensation; then decision."
          }
        ],
        "behavioral": {
          "star": "helpful",
          "style": "Behavioral content is lighter than at Amazon or the medtech firms and is often folded into the manager or HR conversation. Expect questions on teamwork, learning quickly and why NVIDIA, answered concisely.",
          "themes": [
            "Technical curiosity",
            "Collaboration with architects and designers",
            "Ownership under tight schedules",
            "Why NVIDIA"
          ],
          "examples": [
            "Tell me about a bug you chased across a design and how you found it.",
            "Why NVIDIA rather than another chip company?",
            "Describe a time you disagreed with a teammate about a design approach.",
            "How did you learn a tool or language quickly for a project?"
          ]
        },
        "technical": {
          "share": "Most of the loop",
          "topics": [
            "Digital design and logic",
            "Static timing (setup, hold, derates)",
            "Clock tree basics",
            "CMOS gates and inverter behavior",
            "Verilog/SystemVerilog and UVM concepts for verification",
            "Computer architecture and caches",
            "RTL-to-GDS flow for physical design",
            "Scripting in Python or Perl"
          ],
          "style": "Whiteboard or shared-document problems with team engineers; reasoning aloud counts more than memorized answers."
        },
        "projects": "Heavy. Candidates report that interviewers tested items listed on the resume and asked about architecture topics tied to projects, so anything on your resume is fair game.",
        "roleNotes": [
          {
            "roleId": "hardware-engineer",
            "notes": "ASIC design and verification roles center on digital logic, timing and SystemVerilog; know a project where you wrote and verified RTL."
          },
          {
            "roleId": "process-engineer",
            "notes": "Physical design candidates are quizzed on STA, CTS, congestion and floorplanning basics."
          },
          {
            "roleId": "systems-engineer",
            "notes": "Architecture-minded roles probe caches, memory hierarchy and how blocks fit in a GPU or SoC; limited public evidence."
          },
          {
            "roleId": "firmware-engineer",
            "notes": "Where a posting mixes hardware and low-level code, expect C/C++ and bring-up topics; evidence is thin."
          }
        ],
        "prep": [
          "Rehearse static timing: compute setup and hold slack from a drawn circuit with delays.",
          "Be fluent in SystemVerilog and know how a UVM testbench is structured.",
          "Review CMOS gate-level design and inverter characteristics.",
          "Study cache design: address splitting into tag, index and offset.",
          "Know every line of every project on your resume.",
          "Practice talking through your reasoning when you do not know the answer.",
          "Learn the RTL-to-GDS flow at a high level even for front-end roles.",
          "Check the specific posting, since NVIDIA postings list tool expectations such as VCS and Verdi.",
          "Apply online even if you met NVIDIA at a career fair, include your graduation month and year, and talk through your reasoning on technical problems, as NVIDIA's recruiter tips advise.",
          "Do not use outside tools such as AI assistants during an interview; NVIDIA's pages say this can lead to disqualification."
        ]
      }
    ],
    "sources": [
      {
        "label": "NVIDIA careers: How we hire (official, dated)",
        "url": "https://www.nvidia.com/en-us/about-nvidia/careers/how-we-hire/"
      },
      {
        "label": "NVIDIA careers: University recruiting and early-talent programs (official)",
        "url": "https://www.nvidia.com/en-us/about-nvidia/careers/university-recruiting/"
      },
      {
        "label": "NVIDIA blog: How to land an internship, tips from a recruiter (official)",
        "url": "https://blogs.nvidia.com/blog/nvidia-life-linh-nguyen/"
      },
      {
        "label": "Glassdoor NVIDIA interview (physical design, STA)",
        "url": "https://www.glassdoor.ca/Interview/NVIDIA-Interview-E7633-RVW80315143.htm"
      },
      {
        "label": "Glassdoor NVIDIA interview (campus drive)",
        "url": "https://www.glassdoor.co.in/Interview/NVIDIA-Interview-E7633-RVW1047194.htm"
      },
      {
        "label": "Glassdoor NVIDIA interview (Bengaluru, RTL)",
        "url": "https://www.glassdoor.ca/Interview/NVIDIA-Interview-E7633-RVW103918126.htm"
      },
      {
        "label": "NVIDIA ASIC Verification new grad posting (Anitab)",
        "url": "https://jobs.anitab.org/companies/nvidia/jobs/85654520-asic-verification-engineer-new-college-grad-2026"
      },
      {
        "label": "NVIDIA ASIC verification new grad posting (Muse)",
        "url": "https://themuse.com/jobs/nvidia/asic-verification-engineer-gpu-new-college-grad-2025"
      }
    ]
  },
  {
    "companyId": "amazon",
    "summary": "Amazon's hardware and robotics hiring (Lab126, Amazon Robotics, operations engineering) pairs role-specific technical questions with heavy Leadership Principles behavioral questions. Candidate accounts describe a recruiter or hiring-manager screen followed by a multi-interview loop, though public evidence for hardware and mechanical tracks is thinner than for software.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Hardware, robotics and operations engineering",
        "stages": [
          {
            "name": "Application and recruiter screen",
            "format": "Call or online form",
            "what": "Basic fit and logistics; some roles add an online assessment."
          },
          {
            "name": "Hiring manager / technical phone screen",
            "format": "About 45-60 min",
            "what": "Reported mix of a behavioral interview and a technical conversation about your discipline, such as circuits, mechanisms or battery design, plus why Amazon."
          },
          {
            "name": "Onsite or virtual loop",
            "format": "Several interviews, commonly up to a full day",
            "what": "Different interviewers each cover a Leadership Principle and a technical area; includes design or circuit questions and your projects."
          },
          {
            "name": "Bar raiser element",
            "format": "One interviewer from outside the team (reported mainly for general Amazon loops)",
            "what": "Assesses long-term bar and principles; not confirmed specifically for all hardware loops."
          },
          {
            "name": "Debrief and offer",
            "format": "Typically days to a couple of weeks",
            "what": "Interviewers compare written feedback and decide as a group."
          }
        ],
        "behavioral": {
          "star": "expected",
          "style": "Leadership Principles drive the behavioral half of nearly every interview; each interviewer typically owns specific principles and probes for detail and your personal contribution. Prepare many specific stories.",
          "themes": [
            "Ownership",
            "Customer obsession",
            "Dive deep",
            "Invent and simplify",
            "Bias for action",
            "Earn trust and disagree"
          ],
          "examples": [
            "Tell me about a time you owned a problem beyond your assigned scope.",
            "Describe when you disagreed with a decision and how you handled it.",
            "Give an example of simplifying a design or process.",
            "Tell me about a technical failure and what you learned.",
            "Describe a time you worked to a tight deadline with incomplete data.",
            "How would you improve a consumer device you use?"
          ]
        },
        "technical": {
          "share": "About half",
          "topics": [
            "Circuit fundamentals and schematic reading",
            "Hardware design questions",
            "Mechanisms, materials, tolerance and battery design for mechanical roles",
            "Product critique",
            "Process improvement and data reasoning for operations engineering"
          ],
          "style": "Conversational technical interviews with a hiring manager or senior engineer, with sketching and discussion of your own designs; some loops include a design or case-style question."
        },
        "projects": "Substantial. Interviewers ask about your own design work and follow up repeatedly to find what you did personally; the same stories often double as Leadership Principle examples.",
        "roleNotes": [
          {
            "roleId": "hardware-engineer",
            "notes": "Lab126-style roles reportedly include circuit design and diagram questions plus behavioral interviews."
          },
          {
            "roleId": "design-engineer",
            "notes": "Mechanical candidates report conversational technical sessions on design topics such as batteries and a question on why Amazon Robotics."
          },
          {
            "roleId": "systems-engineer",
            "notes": "Robotics and device teams value cross-discipline reasoning from requirement to test."
          },
          {
            "roleId": "project-engineer",
            "notes": "Operations engineering roles lean on ownership, data-driven decisions and process improvement stories."
          }
        ],
        "prep": [
          "Read the Leadership Principles and map 8 to 12 STAR stories onto them.",
          "Quantify results in each story with numbers, scope and your own role.",
          "Be ready to critique a consumer device and suggest improvements.",
          "Review circuit fundamentals and bring one design you can explain in depth.",
          "Mechanical applicants: prepare mechanisms, materials, and battery or thermal basics; confirm exam status such as FE/EIT if asked.",
          "Practice answering follow-up questions that ask why, what you personally did and what you would change.",
          "Ask your recruiter exactly which interviews your loop includes."
        ]
      }
    ],
    "sources": [
      {
        "label": "Amazon phone-screening prep page",
        "url": "https://amazon.jobs/content/en/how-we-hire/phone-screening"
      },
      {
        "label": "Glassdoor Amazon Lab126 interview report",
        "url": "https://www.glassdoor.com.br/Entrevista/Amazon-Lab126-Entrevista-E267709-RVW3786148.htm"
      },
      {
        "label": "Glassdoor Amazon Lab126 interview report (second)",
        "url": "https://www.glassdoor.com.mx/Entrevista/Amazon-Lab126-Entrevista-E267709-RVW7725375.htm"
      },
      {
        "label": "Jointaro Amazon mechanical engineer interview",
        "url": "https://www.jointaro.com/interviews/companies/amazon/work-experiences/mechanical-engineer-may-23-2022-5-25063cb2"
      },
      {
        "label": "Teamblind Amazon Robotics interview thread",
        "url": "https://www.teamblind.com/post/any-experienced-swes-interviewed-with-amazon-robotics-recently-mrkqbbhg"
      },
      {
        "label": "MentorCruise Amazon interview guide",
        "url": "https://mentorcruise.com/blog/acing-amazon-interview-questions/"
      }
    ]
  },
  {
    "companyId": "intel",
    "summary": "Intel states publicly that it uses both behavioral and technical interviews and encourages preparation around the job description, concrete examples and a short self-introduction. Candidate accounts describe a recruiter screen, a hiring manager discussion, and onsite or virtual one-on-ones, sometimes with a presentation, and technical questions tied to your major and resume.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Hardware / process / design engineering",
        "stages": [
          {
            "name": "Application and recruiter screen",
            "format": "Phone call",
            "what": "Background, interest and role match."
          },
          {
            "name": "Hiring manager discussion",
            "format": "30-45 min call",
            "what": "Discusses your projects and the team's work; sets expectations for the loop."
          },
          {
            "name": "Technical interview(s)",
            "format": "One to several 45-90 min sessions",
            "what": "Questions follow your major and resume: digital design and VLSI for hardware, materials, statistics and process topics for process roles."
          },
          {
            "name": "Onsite or virtual one-on-ones",
            "format": "Several sessions with team members",
            "what": "Mix of technical and behavioral; some candidates are asked to give a presentation."
          },
          {
            "name": "Decision",
            "format": "Days to weeks",
            "what": "Team feedback is combined; background checks follow an offer."
          }
        ],
        "behavioral": {
          "star": "expected",
          "style": "Behavioral questions are specific past-experience prompts; Intel's own guidance asks for concrete examples and a 2-5 minute introduction tied to its values. Safety, data-driven problem solving and teamwork recur.",
          "themes": [
            "Teamwork",
            "Attention to detail",
            "Data-driven problem solving",
            "Safety",
            "Alignment with Intel values"
          ],
          "examples": [
            "Tell me about a time you used data to diagnose and fix a problem.",
            "Describe a situation where a classmate or colleague acted unsafely and how you responded.",
            "Describe working with a difficult team member.",
            "Why Intel, and why this group?",
            "Tell me about a time you had to learn something fast."
          ]
        },
        "technical": {
          "share": "About half",
          "topics": [
            "Digital design, VLSI fundamentals, microprocessor and embedded concepts for hardware",
            "Materials science, semiconductor basics, design of experiments and statistics for process roles",
            "Mechanical fundamentals for equipment roles"
          ],
          "style": "Mostly conversational questions from your resume and discipline, occasionally with a presentation; interviewers say it is fine to admit gaps and are reported to walk you through them."
        },
        "projects": "Significant. Accounts say technical questions are drawn from what you list on your resume, so know each project and course in depth.",
        "roleNotes": [
          {
            "roleId": "process-engineer",
            "notes": "Reports mention statistics, design of experiments and basic chip function; review DOE and process control."
          },
          {
            "roleId": "hardware-engineer",
            "notes": "Digital design, VLSI basics and microprocessor topics are the commonly reported themes."
          },
          {
            "roleId": "quality-engineer",
            "notes": "Expect statistics, root cause analysis and data-driven decision stories."
          },
          {
            "roleId": "design-engineer",
            "notes": "Circuit or layout design candidates should be ready to discuss design flow and tools; evidence is limited."
          }
        ],
        "prep": [
          "Use the job description to select your strongest examples.",
          "Prepare a short introduction in the 2-5 minute range, tied to Intel's values.",
          "Write 4 or 5 STAR stories including one on safety or integrity.",
          "Refresh DOE, statistics and basic semiconductor device physics if applying for process roles.",
          "Practice a 10-15 minute project presentation.",
          "Prepare 3 to 5 questions for interviewers.",
          "Admit what you do not know and show how you would reason to an answer."
        ]
      }
    ],
    "sources": [
      {
        "label": "Intel hiring process and tips",
        "url": "https://intel.com/content/www/us/en/jobs/hiring/interviewing-for-a-job.html"
      },
      {
        "label": "Intel careers interview tips",
        "url": "https://jobs.intel.com/interview-tips"
      },
      {
        "label": "Glassdoor Intel interview report",
        "url": "https://www.glassdoor.com.mx/Entrevista/Intel-Corporation-Entrevista-E1519-RVW7267793.htm"
      },
      {
        "label": "Glassdoor Intel interview report (second)",
        "url": "https://www.glassdoor.com.mx/Entrevista/Intel-Corporation-Entrevista-E1519-RVW24336165.htm"
      },
      {
        "label": "FACE Prep Intel interview guide",
        "url": "https://faceprep.in/article/intel-interview-process-a-step-by-step-guide-for-aspiring-candidates/"
      }
    ]
  },
  {
    "companyId": "texas-instruments",
    "summary": "TI's careers site says interns and new college graduates typically have two virtual interviews of 30 to 45 minutes mixing behavioral and technical questions, with on-site visits less common, and it recommends the STAR method. Candidate reports add online tests or recorded video at some sites, panels and project presentations, with circuit and analog fundamentals recurring.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Analog / hardware / manufacturing engineering",
        "stages": [
          {
            "name": "Career fair or application",
            "format": "Campus event or online",
            "what": "Initial resume discussion or screen."
          },
          {
            "name": "Online test or recorded video",
            "format": "Varies by site",
            "what": "Some candidates report an aptitude and technical test, or short recorded answers sent to a hiring manager."
          },
          {
            "name": "Phone or video screen",
            "format": "30-45 min",
            "what": "Resume, interest in TI, and basic technical checks such as filters."
          },
          {
            "name": "Technical and panel interviews",
            "format": "One to three rounds, sometimes two 75-minute sessions with several managers",
            "what": "Discipline questions, op amps, ADCs, circuit analysis, and project deep dives."
          },
          {
            "name": "Project presentation",
            "format": "10-20 min talk (often reported)",
            "what": "Present a past project or internship and defend design choices and results."
          },
          {
            "name": "Offer",
            "format": "Reported anywhere from days to a few months",
            "what": "Decision after panel feedback."
          }
        ],
        "behavioral": {
          "star": "expected",
          "style": "Behavioral content is often combined with technical rounds or held as a final conversation, focusing on collaboration and problem solving. Interviewers press for specifics, so prepared stories matter.",
          "themes": [
            "Teamwork and influence",
            "Handling difficult teammates",
            "Problem solving",
            "Interest in TI and the role"
          ],
          "examples": [
            "Tell me about a time you worked with a difficult teammate.",
            "Describe how you influenced others without authority.",
            "Tell me about a time you overcame an obstacle on a project.",
            "Why TI and this product area?"
          ]
        },
        "technical": {
          "share": "Roughly half or more",
          "topics": [
            "Circuit analysis, op amps, filters, ADCs",
            "Analog and digital basics",
            "Semiconductor and device fundamentals",
            "Statistics and equipment basics for process or test roles",
            "Teaching a class concept clearly"
          ],
          "style": "Whiteboard or screen-shared circuit sketching, a project presentation, and panel questions."
        },
        "projects": "Very significant. A project or internship presentation is a repeated theme, with panels probing design choices, trade-offs and results.",
        "roleNotes": [
          {
            "roleId": "hardware-engineer",
            "notes": "Analog fundamentals dominate: op amps, filters, converters, and circuit analysis."
          },
          {
            "roleId": "process-engineer",
            "notes": "Fab and equipment roles ask specific scenario questions and stress real examples; evidence is thin."
          },
          {
            "roleId": "quality-engineer",
            "notes": "Expect structured problem solving and data-driven stories."
          },
          {
            "roleId": "design-engineer",
            "notes": "IC design candidates should know transistor-level behavior and be able to present a design project."
          }
        ],
        "prep": [
          "Build a 15 minute project presentation with clear problem, design choices and results.",
          "Review op amps, filters, ADC architectures and basic transistor circuits.",
          "Practice explaining a class concept simply, since teaching-style questions are reported.",
          "Prepare behavioral stories about conflict and influence.",
          "Ask recruiters which team you are interviewing for, since the role may not be fixed.",
          "Learn TI's product areas and the difference between analog and embedded processing.",
          "Practice sketching circuits while talking.",
          "List technical projects in detail on your resume, including class and personal work and the lab tools you used, as TI's resume guidance suggests.",
          "Apply online before the career fair and prepare a 30 second pitch, per TI's career fair tips."
        ]
      }
    ],
    "sources": [
      {
        "label": "TI careers: Hiring and interview process (official)",
        "url": "https://careers.ti.com/hiring-interview-process-2/"
      },
      {
        "label": "TI careers: How to land an interview (official)",
        "url": "https://careers.ti.com/how-to-land-interview/"
      },
      {
        "label": "Glassdoor TI interview report",
        "url": "https://www.glassdoor.com.mx/Entrevista/Texas-Instruments-Entrevista-E651-RVW17570742.htm"
      },
      {
        "label": "Glassdoor TI interview (Melaka, 2024)",
        "url": "https://www.glassdoor.com.mx/Entrevista/Texas-Instruments-Entrevista-E651-RVW91001987.htm"
      },
      {
        "label": "Glassdoor TI interview questions",
        "url": "https://static.glassdoor.com.mx/Interview/Texas-Instruments-Interview-Questions-E651_P482.htm"
      },
      {
        "label": "Indeed TI hiring process FAQ",
        "url": "https://ph.indeed.com/cmp/Texas-Instruments/faq/hiring-process"
      },
      {
        "label": "Glassdoor TI interview report (second)",
        "url": "https://www.glassdoor.com.ar/Entrevista/Texas-Instruments-Entrevista-E651-RVW30995443.htm"
      }
    ]
  },
  {
    "companyId": "amd",
    "summary": "AMD's student pages say a recruiter reviews applications and arranges a screening call, followed by phone, video or onsite interviews with the hiring team, framed as a two-way conversation about your skills and achievements. The technical content (digital design, architecture, Verilog/SystemVerilog, some Python or C) comes from anonymous reports whose formats vary by site and year.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Hardware / design verification engineering",
        "stages": [
          {
            "name": "Recruiter or HR call",
            "format": "Short phone call",
            "what": "Background questions and scheduling of a technical interview."
          },
          {
            "name": "Technical phone screen",
            "format": "45-60 min",
            "what": "Reported topics include digital design, computer architecture, Verilog/SV and basic scripting or coding."
          },
          {
            "name": "Technical interview(s)",
            "format": "One to three one-on-one or panel sessions",
            "what": "Deeper design and verification questions, for example how to verify a basic flip-flop, plus project discussion."
          },
          {
            "name": "Manager / behavioral round",
            "format": "About 30-60 min",
            "what": "Past work, teamwork and motivation."
          },
          {
            "name": "Decision",
            "format": "Reports vary from days to a few weeks",
            "what": "Feedback is gathered; offer follows."
          }
        ],
        "behavioral": {
          "star": "helpful",
          "style": "Behavioral questions are usually based on previous work experience and appear alongside technical rounds rather than as an extensive separate stage.",
          "themes": [
            "Verification mindset and attention to detail",
            "Teamwork",
            "Past project ownership",
            "Learning agility"
          ],
          "examples": [
            "Describe a project where you found a subtle bug.",
            "Tell me about a time you worked with a team to deliver a hardware design.",
            "How did you approach a problem you had not seen before?",
            "Why AMD?"
          ]
        },
        "technical": {
          "share": "Most of the process",
          "topics": [
            "Computer architecture",
            "Digital design, combinational versus sequential logic",
            "Flip-flops and timing",
            "Verilog/SystemVerilog",
            "Testbench and corner-case thinking",
            "Python or C basics",
            "Logic puzzles"
          ],
          "style": "Phone and panel conversations with shared-document or whiteboard tasks."
        },
        "projects": "Moderate to heavy. Candidates are asked to explain work they listed and verification or design choices.",
        "roleNotes": [
          {
            "roleId": "hardware-engineer",
            "notes": "Digital design and architecture fundamentals dominate the reported questions."
          },
          {
            "roleId": "design-engineer",
            "notes": "Design verification candidates should explain testbench strategy for simple blocks."
          },
          {
            "roleId": "firmware-engineer",
            "notes": "Where roles blend software and silicon, expect C or Python questions; limited evidence."
          },
          {
            "roleId": "systems-engineer",
            "notes": "System-level roles may probe architecture and integration; limited evidence."
          }
        ],
        "prep": [
          "Practice describing how you would verify a basic sequential block, including corner cases.",
          "Review computer architecture: pipelines, caches, memory hierarchy.",
          "Refresh Verilog/SystemVerilog and basic Python or C.",
          "Know setup, hold and clocking fundamentals.",
          "Prepare behavioral stories from academic or internship projects.",
          "Check the posting for the team and tool stack, then adapt your examples.",
          "Join AMD's university talent community and follow the regional application deadlines; recruiters do not give detailed interview feedback.",
          "Follow AMD's AI-use rules: fine for preparation, but not for generating or reading answers during live interviews."
        ]
      }
    ],
    "sources": [
      {
        "label": "AMD student programs (official)",
        "url": "https://www.amd.com/en/corporate/careers/student-programs.html"
      },
      {
        "label": "AMD careers FAQ (official)",
        "url": "https://careers.amd.com/faq"
      },
      {
        "label": "Glassdoor AMD DV interview report",
        "url": "https://www.glassdoor.com/Interview/AMD-Interview-E15-RVW19294052.htm"
      },
      {
        "label": "Glassdoor AMD interview report (Bengaluru)",
        "url": "https://www.glassdoor.co.in/Interview/AMD-Interview-E15-RVW92170108.htm"
      },
      {
        "label": "Glassdoor AMD interview report (third)",
        "url": "https://www.glassdoor.com/Interview/AMD-Interview-E15-RVW85698643.htm"
      },
      {
        "label": "Glassdoor AMD interview report (older)",
        "url": "https://www.glassdoor.com/Interview/AMD-Interview-E15-RVW2236253.htm"
      }
    ]
  },
  {
    "companyId": "qualcomm",
    "summary": "Qualcomm's public pages describe internships as the main early-career route and mention an AI-assisted resume-matching tool, but no interview steps. Hardware interviews are reported by candidates to be technical and architecture-heavy, often starting from your projects, with an online test in campus pipelines and several one-hour sessions for experienced hires. Evidence is anecdotal, spans many years and locations.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Hardware / ASIC design and verification",
        "stages": [
          {
            "name": "Resume screen and online test",
            "format": "Online assessment (campus and some pipelines)",
            "what": "Aptitude, digital and analog electronics, and sometimes coding multiple-choice."
          },
          {
            "name": "Technical interview 1",
            "format": "About 1 hour",
            "what": "Often opens with your projects, then digital design, state machines and Verilog."
          },
          {
            "name": "Technical interview 2",
            "format": "About 1-2 hours",
            "what": "Computer architecture such as CPU and cache design, timing, power, MOSFET and RC basics, design of a small block."
          },
          {
            "name": "Additional technical or manager rounds",
            "format": "One to several sessions, sometimes over multiple days",
            "what": "Whiteboard coding or design problems, verification topics, discussion of the team."
          },
          {
            "name": "HR round and offer",
            "format": "Short call",
            "what": "Fit, expectations and compensation."
          }
        ],
        "behavioral": {
          "star": "helpful",
          "style": "Behavioral content is generally a short HR or manager component; technical rounds carry most of the weight. Be ready to describe teamwork and your role in your final project.",
          "themes": [
            "Project ownership",
            "Teamwork",
            "Motivation for the role",
            "Learning quickly"
          ],
          "examples": [
            "Walk me through your final design project and your contribution.",
            "Tell me about a time a design did not work and how you recovered.",
            "Why Qualcomm and this team?",
            "How do you handle disagreements on technical direction?"
          ]
        },
        "technical": {
          "share": "Most of the process",
          "topics": [
            "Computer architecture (cache index, tag and offset calculations, CPU design)",
            "Digital design and state machines",
            "STA and power dissipation",
            "MOSFET and RC circuits",
            "Verilog and small block design such as an interrupt controller",
            "Logic puzzles",
            "C or scripting basics"
          ],
          "style": "Whiteboard-style design and calculation problems, often starting from your own project."
        },
        "projects": "Heavy. Several rounds begin with project discussion, including drawing and explaining a design you built.",
        "roleNotes": [
          {
            "roleId": "hardware-engineer",
            "notes": "Digital design, architecture and timing are the core reported topics."
          },
          {
            "roleId": "design-engineer",
            "notes": "RTL and verification candidates face Verilog and block design questions."
          },
          {
            "roleId": "firmware-engineer",
            "notes": "Embedded and driver roles may add C and low-level system questions; limited evidence."
          },
          {
            "roleId": "systems-engineer",
            "notes": "Architecture-oriented roles go deeper on CPU and memory design."
          }
        ],
        "prep": [
          "Practice cache and memory addressing math until it is automatic.",
          "Review state machines, flip-flops, STA and power basics.",
          "Write small Verilog blocks (FIFO, arbiter, interrupt controller) by hand.",
          "Prepare to draw and defend the architecture of your senior or capstone project.",
          "Take timed aptitude and electronics MCQs if you are in a campus pipeline.",
          "Be ready for multiple rounds over a few days and keep your energy up."
        ]
      }
    ],
    "sources": [
      {
        "label": "Qualcomm careers FAQs and application advice (official; contents not fully read)",
        "url": "https://www.qualcomm.com/company/careers/faqs"
      },
      {
        "label": "Qualcomm internships and early-in-career opportunities (official)",
        "url": "https://www.qualcomm.com/company/careers/internships-and-early-in-career-opportunities"
      },
      {
        "label": "Glassdoor Qualcomm interview (Hsinchu architecture)",
        "url": "https://www.glassdoor.sg/Interview/Qualcomm-Interview-E640-RVW51136658.htm"
      },
      {
        "label": "Glassdoor Qualcomm interview report",
        "url": "https://www.glassdoor.sg/Interview/Qualcomm-Interview-E640-RVW35866828.htm"
      },
      {
        "label": "Glassdoor Qualcomm interview report (second)",
        "url": "https://www.glassdoor.co.in/Interview/Qualcomm-Interview-E640-RVW15109891.htm"
      },
      {
        "label": "Glassdoor Qualcomm interview report (third)",
        "url": "https://www.glassdoor.ca/Interview/Qualcomm-Interview-E640-RVW11793284.htm"
      }
    ]
  },
  {
    "companyId": "medtronic",
    "summary": "Medtronic's engineering careers pages describe a telephone interview followed by possibly several interviews, with feedback after each round, and ask for authenticity, passion for the mission and questions of your own. Its US early-careers page lists first-round intern interviews in October and second rounds and offers in November and December. Behavioral emphasis and panels come from older anecdotal reports.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Medical device engineering (R&D, quality, manufacturing)",
        "stages": [
          {
            "name": "Application and recruiter screen",
            "format": "Phone or video",
            "what": "Background, interest in medical devices and logistics."
          },
          {
            "name": "Hiring manager conversation",
            "format": "About 1 hour call",
            "what": "Commonly focused on recent projects and some behavioral questions, with little formal technical testing in some reports."
          },
          {
            "name": "Panel or multiple interviews",
            "format": "Several people, often split into groups, about an hour each",
            "what": "Technical questions from the role and resume mixed with behavioral questions."
          },
          {
            "name": "Final conversations or presentation",
            "format": "Video or onsite",
            "what": "Fit with team; occasionally project-related discussion."
          },
          {
            "name": "Offer and checks",
            "format": "Days to weeks",
            "what": "Background and eligibility checks follow an offer."
          }
        ],
        "behavioral": {
          "star": "expected",
          "style": "Behavioral questions dominate many reports, and candidates recommend STAR answers. Interviewers want evidence of teamwork, leadership and a genuine reason for working in medical devices, where patient safety frames decisions.",
          "themes": [
            "Why medical devices and why Medtronic",
            "Conflict and teamwork",
            "Leadership",
            "Creative problem solving",
            "Patient safety and quality mindset"
          ],
          "examples": [
            "Why do you want to work at Medtronic?",
            "Tell me about a conflict in a group project and how you resolved it.",
            "Describe a time you led others.",
            "Tell me about a medical device or design project you worked on.",
            "How do you disagree with a colleague and still get work done?",
            "How would you approach changing a material in a device component?"
          ]
        },
        "technical": {
          "share": "About a third",
          "topics": [
            "Role-specific fundamentals",
            "Materials selection and biocompatibility basics",
            "Design controls and verification and validation concepts",
            "Risk management",
            "Root cause analysis",
            "FDA and quality-system awareness, probed lightly at entry level"
          ],
          "style": "Conversational technical discussion rooted in your resume, with the occasional design or materials scenario."
        },
        "projects": "Heavy. Hiring managers focus on recent projects, so be ready to explain requirements, testing and your personal contribution.",
        "roleNotes": [
          {
            "roleId": "design-engineer",
            "notes": "R&D candidates discuss device design projects and trade-offs such as materials changes."
          },
          {
            "roleId": "quality-engineer",
            "notes": "Know design controls, CAPA and root cause analysis at a conceptual level, and regulatory framing such as FDA and ISO 13485."
          },
          {
            "roleId": "process-engineer",
            "notes": "Manufacturing roles lean toward process validation, statistics and continuous improvement."
          },
          {
            "roleId": "systems-engineer",
            "notes": "Cross-functional device roles stress requirements, risk and verification thinking."
          }
        ],
        "prep": [
          "Prepare STAR stories for conflict, leadership, creativity and failure.",
          "Be ready with a clear answer on why medical devices.",
          "Learn the basics of FDA design controls (user needs, design input, verification, validation).",
          "Know ISO 13485 and risk management concepts at a high level.",
          "Prepare a walkthrough of a capstone or lab project with testing and results.",
          "Practice a materials-selection reasoning example.",
          "Research Medtronic business units and the specific team.",
          "Check the US early-careers page for intern application windows (reported as August to mid-October), since first-round interviews follow quickly.",
          "Prepare your own questions about the role, manager and team; Medtronic invites them."
        ]
      }
    ],
    "sources": [
      {
        "label": "Medtronic early careers (official)",
        "url": "https://www.medtronic.com/en-us/our-company/careers/early-careers.html"
      },
      {
        "label": "Medtronic: Engineer your career (official, Ireland)",
        "url": "https://www.medtronic.com/en-ie/our-company/careers/engineering.html"
      },
      {
        "label": "Glassdoor Medtronic interview (panel)",
        "url": "https://www.glassdoor.ca/Interview/Medtronic-Interview-E436-RVW1009063.htm"
      },
      {
        "label": "Glassdoor Medtronic interview (Minneapolis)",
        "url": "https://clear.glassdoor.nl/Interview/Medtronic-Interview-E436-RVW28364526.htm"
      },
      {
        "label": "Glassdoor Medtronic interview report",
        "url": "https://static.glassdoor.at/Interview/Medtronic-Interview-E436-RVW6741306.htm"
      },
      {
        "label": "Glassdoor Medtronic interview report (older)",
        "url": "https://www.glassdoor.com.hk/Interview/Medtronic-Interview-E436-RVW640806.htm"
      }
    ]
  },
  {
    "companyId": "johnson-and-johnson",
    "summary": "J&J's careers site says interviews are digital, either pre-recorded answers to questions it sends or a live video interview of roughly 30 to 60 minutes, usually with the hiring manager and sometimes team members, using behavioral and competency questions. It says hiring is guided by Our Credo and values authenticity. MedTech engineering technical content is not published and rests on candidate reports.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Medical technology engineering",
        "stages": [
          {
            "name": "Application and assessments",
            "format": "Online",
            "what": "Resume screen; some pipelines include online or personality-style assessments."
          },
          {
            "name": "Recorded video interview",
            "format": "Pre-recorded responses (reported for some early-career pipelines)",
            "what": "Short answers to behavioral questions."
          },
          {
            "name": "Recruiter or hiring manager interview",
            "format": "30-60 min call",
            "what": "Background, motivation and basic technical fit."
          },
          {
            "name": "Panel or live interviews",
            "format": "One to several video or onsite sessions",
            "what": "STAR-style behavioral questions, Credo and ethics scenarios, and discipline technical questions."
          },
          {
            "name": "Decision",
            "format": "Reports range from one day to about a month",
            "what": "Offer after team consensus."
          }
        ],
        "behavioral": {
          "star": "expected",
          "style": "Behavioral and STAR questions are frequent, and interviewers may ask how you understand the Credo and how it would guide decisions, including ethical scenarios. Sessions can run long.",
          "themes": [
            "Credo and ethical decision making",
            "Collaboration",
            "Patient and customer focus",
            "Problem solving"
          ],
          "examples": [
            "How would the Credo guide you when quality and a deadline conflict?",
            "Tell me about a time you faced an ethical dilemma.",
            "Describe a team project where you had to influence others.",
            "Why Johnson & Johnson MedTech?",
            "Tell me about a time you used data to make a decision."
          ]
        },
        "technical": {
          "share": "About a third",
          "topics": [
            "Discipline fundamentals",
            "Design controls, verification and validation",
            "Risk management",
            "Regulatory awareness (FDA, ISO 13485)",
            "Root cause and statistics for quality and process roles"
          ],
          "style": "Conversational with project walkthroughs; technical depth rises with the role."
        },
        "projects": "Moderate to heavy. Be prepared to describe projects and explain decisions and ethics around them.",
        "roleNotes": [
          {
            "roleId": "design-engineer",
            "notes": "R&D roles expect design project explanations plus awareness of design controls."
          },
          {
            "roleId": "quality-engineer",
            "notes": "Quality interviews often probe regulatory mindset, CAPA and complaint handling concepts."
          },
          {
            "roleId": "process-engineer",
            "notes": "Manufacturing roles focus on validation and process capability."
          },
          {
            "roleId": "project-engineer",
            "notes": "Project roles stress cross-functional coordination and schedule trade-offs."
          }
        ],
        "prep": [
          "Read the J&J Credo and form a personal view you can articulate.",
          "Prepare STAR stories, including an ethical or quality-versus-speed trade-off.",
          "Practice recorded-video answers with a time limit.",
          "Learn the design control framework at a high level.",
          "Learn the specific MedTech business area and product lines you are applying to.",
          "Prepare a project walkthrough with measurable results.",
          "Verify the format with the recruiter, since it varies by business and location.",
          "Follow J&J's suggestion to prepare three stories: a challenge overcome, a setback learned from, and an accomplishment, told challenge first.",
          "Note J&J's recruiting calendar: full-time student roles roughly August to November, interns and co-ops roughly December to January."
        ]
      }
    ],
    "sources": [
      {
        "label": "J&J careers: Hiring and interview process (official)",
        "url": "https://www.careers.jnj.com/en/how-we-hire/"
      },
      {
        "label": "J&J careers: Application and interview tips (official)",
        "url": "https://www.careers.jnj.com/en/how-we-hire/application-tips/"
      },
      {
        "label": "J&J careers: Breaking down behavioral interview questions (official)",
        "url": "https://www.careers.jnj.com/en/employee-stories/career-tips/breaking-down-behavioral-interview-questions-in-4-simple-steps/"
      },
      {
        "label": "CleverPrep Johnson & Johnson guide",
        "url": "https://www.cleverprep.com/companies/johnson-johnson"
      },
      {
        "label": "Glassdoor J&J interview report",
        "url": "https://www.glassdoor.com.mx/Entrevista/Johnson-and-Johnson-Entrevista-E364-RVW97133297.htm"
      },
      {
        "label": "Glassdoor J&J interview report (campus)",
        "url": "https://www.glassdoor.com.mx/Entrevista/Johnson-and-Johnson-Entrevista-E364-RVW96957558.htm"
      },
      {
        "label": "Glassdoor J&J interview report (older)",
        "url": "https://www.glassdoor.com.br/Entrevista/Johnson-and-Johnson-Entrevista-E364-RVW3144068.htm"
      }
    ]
  },
  {
    "companyId": "abbott",
    "summary": "Abbott's hiring-process page describes a recruiter call of roughly 15 to 45 minutes (an on-demand video for some high-volume roles), then one or more virtual or in-person interviews, with case discussions, presentations or skills exercises for some roles, and pre-employment verification after an offer. Reports of mostly behavioral panels with technical questions at the end are small-sample.",
    "asOf": "2026-10",
    "confidence": "medium",
    "tracks": [
      {
        "group": "engineering",
        "label": "Medical device and diagnostics engineering",
        "stages": [
          {
            "name": "Application and recruiter screen",
            "format": "Phone call",
            "what": "Background, interest in Abbott's businesses, logistics."
          },
          {
            "name": "Hiring manager interview",
            "format": "30-60 min call",
            "what": "Projects, experiences and fit."
          },
          {
            "name": "Panel interview",
            "format": "About 3 rounds or a single panel, depending on site",
            "what": "Mostly STAR-style behavioral questions followed by technical questions about your discipline."
          },
          {
            "name": "Decision and offer",
            "format": "Reports range from about two weeks to two months",
            "what": "Offer, then background and medical or drug checks reported at some sites."
          }
        ],
        "behavioral": {
          "star": "expected",
          "style": "Most questions are behavioral and phrased around leadership, problem solving, teamwork and communication; hypothetical on-the-job situations are also reported.",
          "themes": [
            "Teamwork",
            "Leadership",
            "Problem solving",
            "Knowledge of Abbott",
            "Career goals"
          ],
          "examples": [
            "Tell me about a time you led a project from start to finish.",
            "Describe a disagreement with a supervisor.",
            "What do you know about Abbott's businesses?",
            "Where do you see yourself in five years?",
            "What would you do in this hypothetical workplace situation?"
          ]
        },
        "technical": {
          "share": "About a third",
          "topics": [
            "Role-based knowledge",
            "Design decisions, testing and validation approaches",
            "Quality and regulatory awareness (design controls, GMP)",
            "Process and root cause thinking"
          ],
          "style": "Panel Q&A; may include discussion of design choices and how you would test or validate."
        },
        "projects": "Heavy. Candidates are told to know their resume and describe their actions in detail; explaining design decisions and test approaches is reported.",
        "roleNotes": [
          {
            "roleId": "design-engineer",
            "notes": "Be able to justify design choices, tests and validation of past projects."
          },
          {
            "roleId": "quality-engineer",
            "notes": "Expect GMP-style and regulatory questions in regulated manufacturing; confirm with recruiter."
          },
          {
            "roleId": "process-engineer",
            "notes": "Manufacturing roles focus on process control and improvement."
          },
          {
            "roleId": "firmware-engineer",
            "notes": "Device or diagnostics software roles may add technical discussion; limited evidence."
          }
        ],
        "prep": [
          "Learn Abbott's business areas (diagnostics, devices, nutrition, pharma) and the one you apply to.",
          "Prepare STAR stories for leadership, disagreement and problem solving.",
          "Prepare an answer to where you want to be in five years.",
          "Know your resume deeply, with specifics.",
          "Review design controls, validation and GMP basics.",
          "Prepare for hypothetical situation questions by thinking about safety and quality first.",
          "Ask about the interview format and timeline, and whether your role includes a case, presentation or skills exercise, as Abbott says some do.",
          "Treat the interview as a problem-solving conversation, which is how Abbott describes it; Abbott also notes it cannot give individual feedback after a rejection."
        ]
      }
    ],
    "sources": [
      {
        "label": "Abbott careers: Interview process (official)",
        "url": "https://www.jobs.abbott/us/en/hiring-process"
      },
      {
        "label": "Abbott careers: Prep for these 5 interview questions (official)",
        "url": "https://www.abbott.com/en-us/careers/working-with-us/interview-prep"
      },
      {
        "label": "Glassdoor Abbott interview report",
        "url": "https://www.glassdoor.com/Interview/Abbott-Interview-E12-RVW92763888.htm"
      },
      {
        "label": "Glassdoor Abbott engineer interview questions",
        "url": "https://static.glassdoor.co.uk/Interview/Abbott-Engineer-Interview-Questions-EI_IE12.0,6_KO7,15.htm"
      },
      {
        "label": "Glassdoor Abbott interview report (second)",
        "url": "https://www.glassdoor.com.hk/Interview/Abbott-Interview-E12-RVW79764209.htm"
      },
      {
        "label": "Interview Query Abbott guide (software-focused)",
        "url": "https://www.interviewquery.com/guides/abbott-software-engineer"
      }
    ]
  },
  {
    "companyId": "stryker",
    "summary": "Stryker's hiring page lays out the sequence: a recruiter call, a hiring manager call, a strengths assessment with a trained analyst, then a series of interviews with team members. It suggests applying two to three months before graduation. Candidates describe the later interviews as mostly behavioral; technical depth varies by role and evidence is limited, mostly for quality roles.",
    "asOf": "2026-10",
    "confidence": "high",
    "tracks": [
      {
        "group": "engineering",
        "label": "Medical device engineering (R&D, quality, manufacturing)",
        "stages": [
          {
            "name": "Recruiter chat",
            "format": "Short call",
            "what": "Interest, background and logistics."
          },
          {
            "name": "Hiring manager conversation",
            "format": "About 30 min",
            "what": "Experience and fit with the team."
          },
          {
            "name": "Gallup-style assessment",
            "format": "Online",
            "what": "A strengths or personality assessment reported by several candidates."
          },
          {
            "name": "Team or panel interviews",
            "format": "One to several sessions, sometimes four team members at different times",
            "what": "Behavioral questions in STAR style plus role-based questions."
          },
          {
            "name": "Decision",
            "format": "Reports range from about two weeks to three months",
            "what": "Offer after feedback."
          }
        ],
        "behavioral": {
          "star": "expected",
          "style": "Questions are reported as mostly behavioral and structured, including taking on new challenges, disagreements with teammates and why Stryker.",
          "themes": [
            "Taking on challenges",
            "Disagreement and collaboration",
            "Why Stryker",
            "Quality and compliance awareness"
          ],
          "examples": [
            "Describe a time you took on a new challenge.",
            "Describe a time you and a teammate disagreed on the path forward.",
            "Why do you want to work for Stryker?",
            "What experience do you have in regulated or GMP environments?"
          ]
        },
        "technical": {
          "share": "About a third",
          "topics": [
            "Role fundamentals",
            "Design controls, risk management and documentation discipline for regulated medical devices (FDA, ISO 13485)",
            "Root cause analysis",
            "Manufacturing and quality tools"
          ],
          "style": "Conversational Q&A, with technical depth at the team interviews."
        },
        "projects": "Moderate. Be prepared to discuss resume projects, especially for work that involved testing, documentation or compliance.",
        "roleNotes": [
          {
            "roleId": "quality-engineer",
            "notes": "Likely questions about GMP, CAPA and compliance experience; reported for quality roles."
          },
          {
            "roleId": "design-engineer",
            "notes": "R&D candidates should connect design work to requirements and verification; limited evidence."
          },
          {
            "roleId": "process-engineer",
            "notes": "Manufacturing roles cover process validation and improvement; limited evidence."
          },
          {
            "roleId": "project-engineer",
            "notes": "Cross-functional roles stress ownership and planning stories."
          }
        ],
        "prep": [
          "Prepare STAR stories on taking initiative and disagreement.",
          "Understand Stryker's product lines and why you want that area.",
          "Be ready for a strengths assessment; answer honestly and consistently.",
          "Learn design controls and ISO 13485 vocabulary.",
          "Describe any lab, GMP or documentation experience.",
          "Prepare to meet several interviewers on one day.",
          "Ask the recruiter about steps and timeline.",
          "Make required qualifications obvious on your resume; Stryker says it uses automated checks and AI scheduling in hiring.",
          "Apply roughly two to three months before graduation, per Stryker's student guidance."
        ]
      }
    ],
    "sources": [
      {
        "label": "Stryker careers: Hiring at Stryker (official)",
        "url": "https://careers.stryker.com/hiring-at-stryker"
      },
      {
        "label": "Stryker careers: Students and graduates (official)",
        "url": "https://careers.stryker.com/students-and-graduates"
      },
      {
        "label": "Glassdoor Stryker interview (recruiter, Gallup)",
        "url": "https://www.glassdoor.co.uk/Interview/Stryker-Interview-E1918-RVW32511443.htm"
      },
      {
        "label": "Glassdoor Stryker interview report",
        "url": "https://static.glassdoor.ch/Interview/Stryker-Interview-E1918-RVW12625227.htm"
      },
      {
        "label": "Glassdoor Stryker interview report (second)",
        "url": "https://static.glassdoor.ch/Interview/Stryker-Interview-E1918-RVW23589385.htm"
      },
      {
        "label": "Glassdoor Stryker interview report (India)",
        "url": "https://www.glassdoor.co.in/Interview/Stryker-Interview-E1918-RVW63026434.htm"
      }
    ]
  }
];
