export const IDEA_DOMAINS = [
  { label: 'Campus Mobility & Transit', tag: 'Smart Campus' },
  { label: 'Zero-Waste Hostel Dining', tag: 'CleanTech' },
  { label: 'Kerala Disaster Resilience', tag: 'GovTech' },
  { label: 'Peer-to-Peer Lab Hardware Sharing', tag: 'EdTech' },
  { label: 'Micro-Grid Solar Tracking', tag: 'Energy' },
  { label: 'Student Mental Wellness & Focus', tag: 'HealthTech' },
];

export const IDEA_TECHS = [
  { label: 'Edge Computer Vision', stack: 'Python + MediaPipe' },
  { label: 'Agentic AI Workflows', stack: 'LLM API + React' },
  { label: 'IoT Sensor Mesh', stack: 'ESP32 + MQTT' },
  { label: 'Progressive Web App', stack: 'React + Tailwind' },
  { label: 'Geospatial Heatmaps', stack: 'Leaflet + Node.js' },
  { label: 'Automated WhatsApp Triage', stack: 'Webhooks + FastAPI' },
];

export const IDEA_CHALLENGES = [
  { label: 'for 1,500+ engineering students at CEC', metric: 'Cut wait times by 60%' },
  { label: 'for local MSMEs and shops across Kerala', metric: '2x daily order efficiency' },
  { label: 'operating completely offline in low-network zones', metric: '<50ms local latency' },
  { label: 'under a ₹2,500 hardware BOM constraint', metric: '100% open-source build' },
  { label: 'gamified with real-time leaderboard rewards', metric: '85% weekly retention' },
];

export const ROLE_QUIZ = [
  {
    question: 'Hour 2 of the 24-hour sprint: Your team just picked a problem. What do you grab first?',
    options: [
      { text: 'Open VS Code, initialize Git, and wire up the core prototype.', role: 'Hacker' },
      { text: 'Sketch the user journey, wireframes, and interactive Figma flow.', role: 'Hipster' },
      { text: 'Talk to mentors, validate market size, and structure the revenue model.', role: 'Hustler' },
    ],
  },
  {
    question: 'Hour 14 (2:00 AM): The prototype hits a roadblock. How do you save the sprint?',
    options: [
      { text: 'Build a clean local fallback algorithm so the live demo never crashes.', role: 'Hacker' },
      { text: 'Redesign the workflow into an intuitive interactive walkthrough.', role: 'Hipster' },
      { text: 'Pivot the value proposition around the strongest working feature.', role: 'Hustler' },
    ],
  },
  {
    question: 'Hour 23: Final jury pitch is in 60 minutes. What are you perfecting?',
    options: [
      { text: 'Deploying to production and testing live latency on mobile.', role: 'Hacker' },
      { text: 'Polishing UI micro-interactions and slide visual hierarchy.', role: 'Hipster' },
      { text: 'Rehearsing the 3-minute hook, live demo transition, and Q&A defense.', role: 'Hustler' },
    ],
  },
];

export const ROLE_DETAILS = {
  Hacker: {
    title: 'The Systems Hacker (Engineering Lead)',
    badge: 'HACKER // BUILD & DEPLOY',
    description: 'You turn abstract ideas into working code. Focus on shipping a responsive MVP and stable live demo.',
  },
  Hipster: {
    title: 'The Product Hipster (UX & Design Lead)',
    badge: 'HIPSTER // UX & CRAFT',
    description: 'You make complex technology feel effortless. Focus on user empathy, clean layout, and visual storytelling.',
  },
  Hustler: {
    title: 'The Venture Hustler (Strategy & Pitch Lead)',
    badge: 'HUSTLER // PITCH & SCALE',
    description: 'You connect the build to real-world impact. Focus on problem validation, business model, and jury Q&A.',
  },
};

export const SCHEDULE_DATA = {
  day1: [
    {
      id: 'd1-1',
      time: '09:00 AM - 10:00 AM',
      title: 'Check-In, Kit Distribution & Team Sync',
      venue: 'Main Auditorium, CEC',
      category: 'Onboarding',
      details: 'Verify your Digital Builder Pass, collect NFC sprint badges, and set up at your assigned pod.',
      deliverable: 'Team Pod & Wi-Fi Configured',
    },
    {
      id: 'd1-2',
      time: '10:00 AM - 11:00 AM',
      title: 'Inauguration & Problem Statement Reveal',
      venue: 'Main Auditorium, CEC',
      category: 'Keynote',
      details: 'Opening address by IEDC BOOTCAMP CEC Nodal Officer and unveiling of the 2026 sprint tracks.',
      deliverable: 'Select Primary Track',
    },
    {
      id: 'd1-3',
      time: '11:30 AM - 02:30 PM',
      title: 'Sprint Block I: Problem Validation & Architecture',
      venue: 'IEDC Innovation Lab',
      category: 'Build',
      details: 'Define user personas, validate root causes, and lock your minimum viable technical stack.',
      deliverable: 'Submit 1-Page Problem Canvas',
    },
    {
      id: 'd1-4',
      time: '04:30 PM - 06:30 PM',
      title: 'Mentor Checkpoint 1: Brutal Empathy Review',
      venue: 'Sprint Pods 1–12',
      category: 'Mentoring',
      details: '1-on-1 validation rounds with startup founders and alumni engineers to eliminate weak assumptions.',
      deliverable: 'Lock MVP Feature Scope',
    },
    {
      id: 'd1-5',
      time: '09:00 PM - 11:59 PM',
      title: 'Night Build Jam & Midnight Red Bull Drop',
      venue: 'IEDC Innovation Lab',
      category: 'Build',
      details: 'High-energy coding, UI prototyping, and hardware testing accompanied by midnight snacks.',
      deliverable: 'Core Prototype Running Locally',
    },
  ],
  day2: [
    {
      id: 'd2-1',
      time: '12:00 AM - 03:30 AM',
      title: 'Overnight Sprint: Integration & Edge Testing',
      venue: 'IEDC Innovation Lab',
      category: 'Build',
      details: 'Connect frontend interfaces with core logic and test mobile responsiveness across devices.',
      deliverable: 'Deploy Live Staging URL',
    },
    {
      id: 'd2-2',
      time: '07:30 AM - 09:00 AM',
      title: 'Mentor Checkpoint 2: Pitch Deck & Demo Audit',
      venue: 'Sprint Pods 1–12',
      category: 'Mentoring',
      details: 'Refine your 3-minute narrative hook, live product walkthrough, and unit economics slide.',
      deliverable: 'Finalize 5-Slide Pitch Deck',
    },
    {
      id: 'd2-3',
      time: '10:00 AM - 11:00 AM',
      title: 'Code Freeze & GitHub Submission',
      venue: 'Online Portal',
      category: 'Milestone',
      details: 'Final push to GitHub, live deployment link verification, and slide deck upload.',
      deliverable: 'Submit Repo & Live URL',
    },
    {
      id: 'd2-4',
      time: '11:30 AM - 02:00 PM',
      title: 'The Grand Pitch: Top 10 Jury Finals',
      venue: 'Seminar Hall 1, CEC',
      category: 'Keynote',
      details: '3 minutes of live demo + 2 minutes of rapid-fire Q&A in front of angel investors and faculty.',
      deliverable: 'Live Stage Demonstration',
    },
    {
      id: 'd2-5',
      time: '02:30 PM - 03:30 PM',
      title: 'Valedictory Ceremony & Incubation Grants',
      venue: 'Main Auditorium, CEC',
      category: 'Milestone',
      details: 'Announcement of winners, ₹50,000 seed pre-incubation awards, and official certificates.',
      deliverable: 'Claim Builder Certificates',
    },
  ],
};