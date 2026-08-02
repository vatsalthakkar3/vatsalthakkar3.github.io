import {
  SiPython, SiJavascript, SiCplusplus, SiTypescript,
  SiPytorch, SiTensorflow, SiScikitlearn, SiNumpy, SiPandas, SiLangchain, SiMlflow,
  SiMysql, SiMongodb, SiPostgresql, SiRedis,
  SiFlask, SiReact, SiFastapi,
  SiGit, SiDocker,
  SiKubernetes, SiTerraform, SiHelm, SiDatabricks,
  SiApacheairflow, SiApachekafka, SiGooglecloud,
} from 'react-icons/si'
import { FaJava, FaAws, FaMicrosoft } from 'react-icons/fa6'
import {
  FiCloud, FiCpu, FiMessageSquare, FiCode, FiBox, FiServer, FiZap,
} from 'react-icons/fi'

export const profile = {
  name: 'Vatsal Thakkar',
  roles: [
    'Cloud Infra Engineer · ASML',
    'MCP & Agentic AI Developer',
    'AI Platform & MLOps Engineer',
    'LLM & GenAI Engineer',
    'ML Researcher · UGA',
  ],
  avatar: '/images/my-avatar-3.png',
  email: 'vatsalthakkar3.vt@gmail.com',
  location: 'San Francisco Bay Area, CA, USA',
  university: 'University of Georgia',
  gpa: '3.89 / 4.0',
  available: true,
  links: {
    linkedin: 'https://www.linkedin.com/in/vatsal-thakkar-880320161/',
    github:   'https://github.com/vatsalthakkar3',
    leetcode: 'https://leetcode.com/Vatsalthakkar3/',
    twitter:  'https://twitter.com/VatsalThakkar33',
    resume:   '/resume.pdf',
  },
}

export const stats = [
  { value: '3.89', label: 'GPA' },
  { value: '3+',   label: 'Yrs Exp' },
  { value: '10+',  label: 'Projects' },
  { value: '2',    label: 'Publications' },
]

export const services = [
  {
    title: 'Cloud Infrastructure & MLOps',
    desc: 'Architecting enterprise IaC platforms with Terraform, Kubernetes, Azure Databricks, and GitOps — reducing environment provisioning time by 60-70% and configuration drift by 80%.',
    Icon: FiCloud,
    color: 'sky',
    category: 'cloud',
  },
  {
    title: 'AI Platform Engineering',
    desc: 'Deploying GPU-accelerated LLM inference clusters with NVIDIA NIM and vLLM; managing ML platforms on AKS with optimized batching and quantization for production workloads.',
    Icon: FiServer,
    color: 'blue',
    category: 'cloud',
  },
  {
    title: 'Agentic Cloud Cost Optimization',
    desc: 'LLM agents that ingest savings plans, quota limits, current usage metrics, and workload patterns to reason holistically and deliver actionable cost recommendations to engineering teams.',
    Icon: FiZap,
    color: 'emerald',
    category: 'cloud',
  },
  {
    title: 'LLM & GenAI Engineering',
    desc: 'Building RAG pipelines, fine-tuning models with LoRA, and deploying inference stacks with NVIDIA NIM, vLLM, and Triton.',
    Icon: FiCpu,
    color: 'violet',
    category: 'ml',
  },
  {
    title: 'Deep Learning',
    desc: 'Designing and training transformers, diffusion models, and multimodal architectures with PyTorch and HuggingFace.',
    Icon: FiBox,
    color: 'rose',
    category: 'ml',
  },
  {
    title: 'Multimodal AI Research',
    desc: 'Integrating heterogeneous data — DNA sequences, natural language, images — into unified language models for scientific tasks.',
    Icon: FiMessageSquare,
    color: 'amber',
    category: 'ml',
  },
]

export const education = [
  {
    degree: 'M.S. Computer Science',
    school: 'University of Georgia',
    period: '2022 — 2024',
    location: 'Athens, GA',
    gpa: '3.89 / 4.0',
    courses: 'Computer Vision & Deep Learning, Representation Learning, Data Science, Distributed Systems, Database Management.',
  },
  {
    degree: 'B.E. Computer Engineering',
    school: 'L. D. College of Engineering',
    period: '2017 — 2021',
    location: 'Ahmedabad, India',
    gpa: '3.93 / 4.0',
    courses: 'Data Structures & Algorithms, Software Engineering, OOP, Artificial Intelligence, Operating Systems.',
  },
]

/* Experience — grouped by employer where applicable.
   isGroup:true → EmployerGroup component in Resume.jsx
   isGroup:false → standalone TimelineItem                */
export const experience = [
  {
    id: 'asml',
    isGroup: true,
    employer: 'ASML Holding',
    totalPeriod: 'Nov 2024 — Present',
    roles: [
      {
        role: 'Cloud Infrastructure Engineer',
        period: 'Dec 2025 — Present',
        bullets: [
          'Architected and delivered enterprise-scale Managed Infrastructure Platforms enabling secure self-service onboarding for compute, database, storage, IaaS/PaaS, and AI/ML workloads, reducing environment provisioning time by ~60-70%.',
          'Designed and scaled a modular Terraform-based IaC architecture standardizing provisioning for AKS, VMs, Databricks, Data Lakes, Azure OpenAI, managed databases, storage, and GPU workloads, reducing configuration drift by ~80%.',
          'Standardized Kubernetes operations by implementing GitOps workflows and automated security policies, achieving 99.99% system availability and zero-downtime deployments for critical microservices.',
          'Driving cloud infrastructure cost optimization through automated resource right-sizing and utilization monitoring; supporting GPU-accelerated LLM inference and model serving workloads on Kubernetes clusters.',
        ],
        highlights: ['60-70%', '80%', '99.99%'],
      },
      {
        role: 'AI Engineer — DevOps/MLOps',
        period: 'Nov 2024 — Nov 2025',
        bullets: [
          'Led migration of internal DevOps tools (Bitbucket, Bamboo, SonarQube, Ray) using Terraform, K8s, and Helm, reducing developer cycle time by 70%.',
          'Built an internal Confluence GPT agent using RAG pipelines and LLMs to improve documentation discovery and developer productivity.',
          'Deployed latency-optimized LLM inference workloads on AKS using GPU-accelerated NVIDIA NIM containers; standardized GitOps workflows achieving 99.99% system availability.',
        ],
        highlights: ['70%', '99.99%'],
      },
    ],
  },
  {
    id: 'colomboai',
    isGroup: false,
    role: 'LLM & AI Engineer',
    org: 'ColomboAI',
    period: 'Dec 2023 — Nov 2024',
    bullets: [
      'Architected a low-latency RAG pipeline with Mixture-of-Experts strategy, enabling dynamic model selection and mitigating hallucination in LLM-generated responses.',
      'Deployed throughput/latency-optimized Generative models (Diffusion, LLM, VLMs) on GCP Vertex AI using vLLM and Triton inference server.',
      'Fine-tuned LLMs using LoRA on NVIDIA accelerators, boosting search retrieval accuracy by 12%.',
    ],
    highlights: ['12%'],
  },
  {
    id: 'hoarfrost',
    isGroup: false,
    role: 'ML Research Associate',
    org: 'The Hoarfrost Lab, University of Georgia',
    period: 'Aug 2023 — Jun 2024',
    bullets: [
      'Designed a multimodal language model integrating textual and DNA sequence data using GPT-4 and Llama-2, enabling biological insight generation from structured genomic data.',
      'Developed an ETL Pipeline to process extensive DNA sequence and textual description data using Apache Airflow.',
    ],
    highlights: [],
  },
  {
    id: 'ecpl',
    isGroup: false,
    role: 'Junior Software Engineer',
    org: 'ECPL Edtech, India',
    period: 'Jan 2021 — Jul 2022',
    bullets: [
      'Developed a hybrid course recommendation system with collaborative filtering, content-based algorithms, and RNNs, increasing user engagement by 10%.',
      'Built an RNN model to predict student course completion likelihood, achieving a 15% improvement in overall completion rates.',
      'Created RESTful API-powered dashboards enabling data-driven insights, resulting in a 25% reduction in data analysis time.',
    ],
    highlights: ['10%', '15%', '25%'],
  },
]

export const certifications = [
  { name: 'Machine Learning', issuer: 'Stanford University / Coursera' },
  { name: 'Neural Networks and Deep Learning', issuer: 'DeepLearning.AI / Coursera' },
  { name: 'Improving Deep Neural Networks', issuer: 'DeepLearning.AI / Coursera' },
]

export const skillCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Python',     Icon: SiPython,     color: '#3776AB' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Java',       Icon: FaJava,       color: '#ED8B00' },
      { name: 'C++',        Icon: SiCplusplus,  color: '#00599C' },
      { name: 'SQL',        Icon: null,         emoji: '🗄️' },
    ],
  },
  {
    name: 'AI / ML',
    skills: [
      { name: 'PyTorch',      Icon: SiPytorch,    color: '#EE4C2C' },
      { name: 'TensorFlow',   Icon: SiTensorflow, color: '#FF6F00' },
      { name: 'Transformers', Icon: null,         emoji: '🤗' },
      { name: 'LangChain',    Icon: SiLangchain,  color: '#1DC39A' },
      { name: 'LlamaIndex',   Icon: null,         emoji: '🦙' },
      { name: 'vLLM',         Icon: null,         emoji: '⚡' },
      { name: 'Triton',       Icon: null,         emoji: '🔺' },
      { name: 'Ray',          Icon: null,         emoji: '☀️' },
      { name: 'Scikit-learn', Icon: SiScikitlearn,color: '#F7931E' },
      { name: 'NumPy',        Icon: SiNumpy,      color: '#4DABCF' },
      { name: 'Pandas',       Icon: SiPandas,     color: '#9b59b6' },
      { name: 'WandB',        Icon: null,         emoji: '🐝' },
      { name: 'MLflow',       Icon: SiMlflow,     color: '#0194E2' },
    ],
  },
  {
    name: 'Cloud & Infrastructure',
    skills: [
      { name: 'AWS',         Icon: FaAws,          color: '#FF9900' },
      { name: 'GCP',         Icon: SiGooglecloud,  color: '#4285F4' },
      { name: 'Azure',       Icon: FaMicrosoft,    color: '#0078D4' },
      { name: 'Kubernetes',  Icon: SiKubernetes,   color: '#326CE5' },
      { name: 'Terraform',   Icon: SiTerraform,    color: '#7B42BC' },
      { name: 'Helm',        Icon: SiHelm,         color: '#0F1689' },
      { name: 'Docker',      Icon: SiDocker,       color: '#2496ED' },
      { name: 'Databricks',  Icon: SiDatabricks,   color: '#FF3621' },
      { name: 'Airflow',     Icon: SiApacheairflow,color: '#017CEE' },
      { name: 'Kafka',       Icon: SiApachekafka,  color: '#888888' },
    ],
  },
  {
    name: 'Databases & Frameworks',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
      { name: 'MySQL',      Icon: SiMysql,      color: '#4479A1' },
      { name: 'Redis',      Icon: SiRedis,      color: '#DC382D' },
      { name: 'FastAPI',    Icon: SiFastapi,    color: '#009688' },
      { name: 'Flask',      Icon: SiFlask,      color: '#888888' },
      { name: 'React',      Icon: SiReact,      color: '#61DAFB' },
      { name: 'Git',        Icon: SiGit,        color: '#F05032' },
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Stable Diffusion Explainability',
    category: 'deep learning',
    featured: true,
    image: '/images/Diffusion.jpg',
    desc: 'Investigating which image regions are most influenced by individual text tokens in Stable Diffusion outputs using DAAM attention-map analysis and XAI techniques.',
    tags: ['PyTorch', 'Diffusers', 'DAAM', 'XAI'],
    links: [{ label: 'GitHub', url: 'https://github.com/vatsalthakkar3', icon: 'github' }],
  },
  {
    id: 2,
    title: 'Multimodal DNA + Text AI',
    category: 'deep learning',
    featured: true,
    image: '/images/Attention.png',
    desc: 'Multimodal model integrating DNA sequences with natural language via GPT-4 / Llama-2 for biological function prediction at UGA\'s Hoarfrost Lab.',
    tags: ['PyTorch', 'GPT-4', 'Llama-2', 'Multimodal'],
    links: [{ label: 'GitHub', url: 'https://github.com/vatsalthakkar3', icon: 'github' }],
  },
  {
    id: 3,
    title: 'PKL Sports Data Analysis',
    category: 'applications',
    image: 'https://socialify.git.ci/vatsalthakkar3/PKL-Sports-Data-Analysis/image?name=1&owner=1&pattern=Overlapping%20Hexagons&theme=Dark',
    desc: 'End-to-end EDA and visualization of Pro Kabaddi League match data — player stats, team performance trends, and raid success analysis.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    links: [{ label: 'GitHub', url: 'https://github.com/vatsalthakkar3/PKL-Sports-Data-Analysis', icon: 'github' }],
  },
  {
    id: 4,
    title: 'Ease My Bank',
    category: 'web development',
    image: '/images/EaseMyBank.png',
    desc: 'A modern banking landing page with account overview, transaction history, and fully responsive UI.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    links: [{ label: 'Live Demo', url: 'https://easemybank.netlify.app/', icon: 'globe' }],
  },
  {
    id: 5,
    title: 'Activity Track',
    category: 'web development',
    image: '/images/ActivityTrack2.png',
    desc: 'Habit and activity tracking app with daily check-ins, streak tracking, and progress visualization.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    links: [{ label: 'Live Demo', url: 'https://activitytrack.netlify.app/', icon: 'globe' }],
  },
  {
    id: 6,
    title: 'The Dice Game',
    category: 'web development',
    image: '/images/DiceGame.png',
    desc: 'Two-player browser dice game with real-time score tracking and interactive CSS animations.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    links: [{ label: 'Live Demo', url: 'https://thedicegamebyvt.netlify.app/', icon: 'globe' }],
  },
]

const _mdx = import.meta.glob('../posts/*.mdx', { eager: true })
export const blogPosts = Object.values(_mdx)
  .filter(m => m.frontmatter?.slug)
  .map((m, i) => ({ id: 100 + i, ...m.frontmatter }))
  .sort((a, b) => {
    const d = new Date(b.date) - new Date(a.date)
    return d !== 0 ? d : (a.seriesOrder ?? 999) - (b.seriesOrder ?? 999)
  })

export const research = [
  {
    id: 1,
    title: 'BioTalk: A Benchmark Dataset for Multimodal Prediction of Enzymatic Function Coupling DNA Sequences and Natural Language',
    venue: 'arXiv 2024 · The University of Georgia',
    badge: 'arXiv · 2024',
    authors: [
      'Yuchen Zhang',
      'Ratish Kumar Chandrakant Jha*',
      'Soumya Bharadwaj*',
      'Vatsal Sanjaykumar Thakkar*',
      'Adrienne Hoarfrost',
      'Jin Sun',
    ],
    desc: 'A novel benchmark dataset and suite enabling exploration of large multimodal neural network models on gene DNA sequences paired with natural language descriptions of enzymatic function. Demonstrates that incorporating multi-modal data types improves function prediction over DNA sequences alone.',
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2407.15888', icon: 'paper' },
      { label: 'Code', url: 'https://github.com/Hoarfrost-Lab/BioTalk', icon: 'github' },
      { label: 'Dataset', url: 'https://drive.google.com/drive/folders/1lDpdfMCbW5MSgWoo7ZeAlAUFWkpbegYs', icon: 'dataset' },
    ],
  },
  {
    id: 2,
    title: 'Decoding the Absence: Exploring the Influence of Negative Prompts in Stable Diffusion',
    venue: 'CVPR 2024 Submission · University of Georgia',
    badge: 'CVPR 2024',
    authors: ['Daniel Redder', 'Vaibhav Goyal', 'Jane Odum', 'Rajat Mhetre', 'Vatsal Thakkar', 'Jin Sun'],
    desc: 'Investigates how negative prompts semantically transform Stable Diffusion outputs beyond simple object removal. Proposes fused prompt optimization and discrete token optimization (PEZ) to approximate a single merged prompt that replicates classifier-free guidance behavior, and constructs a COCO-derived explorative dataset with CLIPSeg verification.',
    links: [
      { label: 'Paper', url: '/decoding-the-absence.pdf', icon: 'paper' },
      { label: 'Code', url: 'https://github.com/daniel-redder/difXplain', icon: 'github' },
    ],
  },
]
