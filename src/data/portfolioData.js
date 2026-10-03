// Source of truth strictly verified against Abhilekh Borah's CV and actual repository assets

const BASE = import.meta.env.BASE_URL;

export const PERSONAL_INFO = {
  name: "ABHILEKH BORAH",
  role: "Software Developer",
  subroles: "Backend • APIs • Systems",
  location: "Assam, India",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Jorhat Engineering College",
    period: "2024 – 2028",
    schooling: "HS Science (93.6%), Ramanujan Senior Secondary School (2022 – 2024)",
  },
  bio: "I build high-throughput backend services, real-time distributed APIs, and scalable database architectures — and when I'm not tracing concurrency bugs, I fill sketchbooks with pencil and ink.",
  introShort: "Hi, I'm Abhilekh.\nI build backend systems, APIs and software,\nand sometimes I sketch things.",
  interests: [
    "Backend Architecture",
    "Real-time WebSockets",
    "High-Performance APIs",
    "PostgreSQL Optimization",
    "Generative AI & GANs",
    "Competitive Programming",
  ],
  links: {
    email: "abhilekhborah428@gmail.com",
    github: "https://github.com/abhiilekhborah",
    leetcode: "https://leetcode.com/abhiilekhborah/",
    codeforces: "https://codeforces.com/profile/abhiilekhborah",
    linkedin: "https://www.linkedin.com/in/abhilekh-borah-1a4aa6334",
  }
};

export const EXPERIENCE_DATA = [
  {
    role: "Intern – Lead Backend Developer (SDE)",
    company: "Advenx Entertainment LLP",
    period: "March 16 – September 16, 2026",
    summary: "Led backend infrastructure development for a real-time multiplayer game, built from scratch in a collaborative team setting.",
    achievements: [
      "Built WebSocket connection management, an async database layer, centralized routing, and Pydantic schemas.",
      "Worked with FastAPI, Async SQLAlchemy, WebSockets, and PostgreSQL/asyncpg to develop the core infrastructure.",
      "Collaborated with another developer handling module-level business logic and produced formal technical documentation and reports."
    ],
    tech: ["FastAPI", "Async SQLAlchemy", "WebSockets", "PostgreSQL", "asyncpg", "Pydantic"]
  },
  {
    role: "Machine Learning, Deep Learning & Generative AI Workshop",
    period: "September 7 – 28, 2025",
    summary: "Completed a three-week workshop covering ML, Deep Learning, and Generative AI fundamentals, with hands-on experience in basic model building and neural networks."
  }
];

export const PROJECTS_DATA = [
  {
    id: "01",
    title: "YOJANA.SEARCH",
    category: "AI Semantic Search Engine",
    annotation: "government schemes meet semantic search →",
    description: "An intelligent search platform indexing over 3,400 Indian government welfare schemes. Replaces rigid keyword matching with dense vector semantic search, achieving 92% retrieval accuracy and cutting citizen search latency by 60%.",
    tech: ["Python", "Semantic Search", "Sentence Transformers", "Flask", "NLP"],
    image: `${BASE}projects/Yojana_search.JPG`,
    githubUrl: "https://github.com/abhiilekhborah",
    demoUrl: "https://drive.google.com/file/d/1Ty7ctoCpFRQLo_IOG8MIleYIWKUW3otJ/view?usp=sharing",
    metrics: "3,400+ Schemes • 92% Accuracy • 60% Faster",
    wireframeLabel: "SCHEME_INDEX_v2.bin"
  },
  {
    id: "02",
    title: "MEDIQUICK",
    category: "Rural Health Triage Platform",
    annotation: "accessible healthcare for underserved clinics →",
    description: "An AI-powered telemedicine triage application engineered for rural healthcare centers. Integrates proactive disease symptom risk modeling, streamlined teleconsultation queuing, and automated preliminary patient triage.",
    tech: ["Python", "AI / ML", "FastAPI", "Medical Triage", "WebRTC"],
    image: null, // Editorial wireframe presentation
    githubUrl: "https://github.com/abhiilekhborah",
    demoUrl: null,
    metrics: "Automated Symptom Risk Scoring • Realtime Triage",
    wireframeLabel: "CLINIC_NODE_API"
  },
  {
    id: "03",
    title: "ARIM AI",
    category: "Autonomous Fitness & Nutrition Bot",
    annotation: "real-time macros & workouts via Telegram →",
    description: "An intelligent conversational fitness bot deployed on Telegram. Powered by n8n workflow pipelines and cloud database synchronization, allowing users to log meals, calculate dynamic macro splits, and receive adaptive workout routines.",
    tech: ["Python", "Telegram Bot API", "n8n Automation", "Google Sheets API", "LLM"],
    image: `${BASE}projects/ArimAI.WEBP`,
    githubUrl: "https://github.com/abhiilekhborah",
    demoUrl: "https://drive.google.com/file/d/1LAoZlFC4Vm0-yRD1IYYCJlZM_Kz5udyS/view?usp=sharing",
    metrics: "Automated Macro Ledger • Realtime Bot Responses",
    wireframeLabel: "N8N_WEBHOOK_SYNC"
  },
  {
    id: "04",
    title: "FACE GENERATOR (GAN)",
    category: "Deep Generative Adversarial Network",
    annotation: "synthesizing human faces from pure noise →",
    description: "Deep Convolutional GAN (DCGAN) developed in TensorFlow/Keras. Implements a minimax game between deep convolutional Generator and Discriminator networks, synthesizing photorealistic 64x64/128x128 human faces from Gaussian noise vectors.",
    tech: ["Python", "TensorFlow", "Keras", "DCGAN", "Computer Vision"],
    image: `${BASE}projects/Face_generator.JPG`,
    githubUrl: "https://github.com/abhiilekhborah",
    demoUrl: null,
    metrics: "Minimax Loss Convergence • Custom Transpose Convolutions",
    wireframeLabel: "LATENT_VECTOR_Z ~ N(0, I)"
  },
  {
    id: "05",
    title: "OXFORD FLOWERS",
    category: "Computer Vision",
    annotation: "a study in flowers & features →",
    description: "Computer vision classification system utilizing transfer learning on Oxford Flowers dataset, achieving high precision cataloging.",
    tech: ["Python", "TF", "CNNs", "Vision"],
    image: `${BASE}projects/Oxford_flowers.AVIF`,
    githubUrl: null,
    demoUrl: null
  }
];

export const SKILLS_DATA = {
  languages: [
    { name: "C", note: "memory & fundamentals" },
    { name: "C++", note: "DSA & competitive programming" },
    { name: "Java", note: "OOP & multi-threading" },
    { name: "Python", note: "primary systems & AI language" },
    { name: "SQL", note: "relational queries & joins" },
    { name: "HTML/CSS", note: "web fundamentals" }
  ],
  backend: [
    { name: "FastAPI", note: "asynchronous REST APIs" },
    { name: "WebSockets", note: "bi-directional real-time feeds" },
    { name: "Async SQLAlchemy", note: "non-blocking ORM & pools" },
    { name: "Pydantic v2", note: "schema validation & parsing" },
    { name: "RESTful Architecture", note: "idempotency & pagination" }
  ],
  databasesAndTools: [
    { name: "PostgreSQL", note: "production relational store" },
    { name: "asyncpg", note: "high-speed async PG driver" },
    { name: "Docker", note: "containerization & compose" },
    { name: "Linux / Shell", note: "zsh, bash, deployment" },
    { name: "Git & GitHub", note: "version control & CI" },
    { name: "n8n", note: "workflow automation" },
    { name: "TensorFlow", note: "machine learning" },
    { name: "Kaggle", note: "datasets" },
    { name: "Google Colab", note: "notebooks" },
    { name: "VS Code", note: "editor" },
    { name: "Hugging Face", note: "models" }
  ],
  domains: [
    { name: "Data Structures & Algorithms", note: "competitive programming" },
    { name: "Real-time Systems", note: "event-driven state sync" },
    { name: "System Design", note: "scalability & fault tolerance" },
    { name: "Machine Learning / GANs", note: "neural network modeling" },
    { name: "Deep Learning", note: "neural networks" },
    { name: "Web Development", note: "web applications" },
    { name: "Data Science", note: "data analysis" }
  ]
};

export const SKETCHES_DATA = [
  {
    id: "01",
    title: "Monsoon Reverie",
    caption: "Children sharing an umbrella in the rain",
    annotation: "paper, 2B graphite",
    image: `${BASE}sketches/IMG_2355.jpg`,
    aspect: "portrait",
    rotation: -1.8,
  },
  {
    id: "02",
    title: "The Amazing Spider-Man",
    caption: "Andrew Garfield's Peter Parker in ink & wash",
    annotation: "felt tip pen & hatch lines",
    image: `${BASE}sketches/IMG_2799.jpg`,
    aspect: "portrait",
    rotation: 1.5,
  },
  {
    id: "03",
    title: "Violet Evergarden",
    caption: "Intricate portrait study of Violet",
    annotation: "mechanical pencil 0.5mm",
    image: `${BASE}sketches/IMG_4478.jpg`,
    aspect: "portrait",
    rotation: -1.2,
  },
  {
    id: "04",
    title: "A Silent Voice (Koe no Katachi)",
    caption: "Shoko Nishimiya & Shoya Ishida on the river bridge",
    annotation: "fine liner & crosshatch",
    image: `${BASE}sketches/E9CB0056-C30B-4E18-A87C-7DC040DE7BF2.jpg`,
    aspect: "landscape",
    rotation: 2.1,
  },
  {
    id: "05",
    title: "Riff & Distortion",
    caption: "Electric guitarist in full stage shred",
    annotation: "dynamic motion study",
    image: `${BASE}sketches/IMG_0061.jpg`,
    aspect: "portrait",
    rotation: -2.3,
  },
  {
    id: "06",
    title: "The Stray on the Arch",
    caption: "Solitary cat perched over stone archway",
    annotation: "atmospheric graphite",
    image: `${BASE}sketches/IMG_4186.jpg`,
    aspect: "portrait",
    rotation: 1.2,
  },
  {
    id: "07",
    title: "The Last of Us",
    caption: "Joel & Ellie traversing the ruins",
    annotation: "storyboard tone study",
    image: `${BASE}sketches/IMG_6992.jpg`,
    aspect: "portrait",
    rotation: -1.5,
  },
  {
    id: "08",
    title: "The Promised Neverland",
    caption: "Norman's quiet resolve under pressure",
    annotation: "character ink drawing",
    image: `${BASE}sketches/IMG_7134.jpg`,
    aspect: "portrait",
    rotation: 2.0,
  }
];
