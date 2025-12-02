export interface Job {
  id: string
  title: string
  company: string
  location: string
  locationType: 'remote' | 'onsite' | 'hybrid'
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead'
  salary?: {
    min: number
    max: number
    currency: string
  }
  description: string
  requirements: string[]
  niceToHave?: string[]
  techStack: string[]
  applyUrl: string
  source: string
  postedAt: Date
  companyLogo?: string
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Backend Engineer (Java/Spring)',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salary: {
      min: 140000,
      max: 180000,
      currency: 'USD',
    },
    description: 'We are seeking a Senior Backend Engineer to design and build scalable microservices using Java and Spring Boot. You will work on high-traffic systems serving millions of users, collaborating with cross-functional teams to deliver robust solutions.',
    requirements: [
      '5+ years of Java development experience',
      'Strong expertise in Spring Boot and microservices architecture',
      'Experience with PostgreSQL and database optimization',
      'Proficiency with Kafka or similar message queuing systems',
      'Strong understanding of REST API design',
    ],
    niceToHave: [
      'Experience with Kubernetes and container orchestration',
      'Knowledge of cloud platforms (AWS, GCP, Azure)',
      'Contributions to open-source projects',
    ],
    techStack: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Kafka', 'Docker'],
    applyUrl: 'https://linkedin.com/jobs/techcorp-senior-java',
    source: 'LinkedIn',
    postedAt: new Date('2025-01-12'),
  },
  {
    id: '2',
    title: 'Go Developer - Cloud Infrastructure',
    company: 'CloudScale Inc',
    location: 'Austin, TX',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD',
    },
    description: 'Join our platform team to build cloud infrastructure tools in Go. You will be responsible for developing and maintaining distributed systems that power our cloud platform.',
    requirements: [
      '3+ years of Go programming experience',
      'Strong understanding of distributed systems',
      'Experience with Docker and containerization',
      'Knowledge of cloud platforms (AWS or GCP)',
      'Proficiency with gRPC and protocol buffers',
    ],
    niceToHave: [
      'Kubernetes administration experience',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Experience with service mesh technologies',
    ],
    techStack: ['Go', 'Kubernetes', 'Docker', 'AWS', 'gRPC', 'Terraform'],
    applyUrl: 'https://cloudscale.com/careers/go-developer',
    source: 'Company Website',
    postedAt: new Date('2025-01-11'),
  },
  {
    id: '3',
    title: 'Full Stack Developer (React/Node.js)',
    company: 'StartupHub',
    location: 'New York, NY',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 110000,
      max: 150000,
      currency: 'USD',
    },
    description: 'Build modern web applications using React and Node.js. Work directly with founders on product development in a fast-paced startup environment with significant equity opportunities.',
    requirements: [
      '3+ years of full-stack development experience',
      'Expert-level React and modern JavaScript/TypeScript',
      'Strong Node.js and Express.js knowledge',
      'Experience with MongoDB or similar NoSQL databases',
      'Understanding of frontend performance optimization',
    ],
    niceToHave: [
      'Next.js framework experience',
      'Experience with real-time features (WebSockets)',
      'Mobile development (React Native)',
    ],
    techStack: ['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB', 'Redis'],
    applyUrl: 'https://startuphub.com/join-us',
    source: 'AngelList',
    postedAt: new Date('2025-01-10'),
  },
  {
    id: '4',
    title: 'Java Architect - Enterprise Systems',
    company: 'Global Financial Services',
    location: 'London, UK',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'lead',
    salary: {
      min: 90000,
      max: 120000,
      currency: 'GBP',
    },
    description: 'Lead the architecture and design of enterprise-scale financial systems. Mentor team members and define technical standards for mission-critical applications processing billions in transactions.',
    requirements: [
      '10+ years of Java enterprise development',
      'Proven experience as a solution architect',
      'Deep knowledge of Spring framework ecosystem',
      'Experience with microservices and domain-driven design',
      'Strong understanding of financial systems and regulations',
    ],
    niceToHave: [
      'AWS certification (Solutions Architect)',
      'Experience with event sourcing and CQRS',
      'Knowledge of blockchain technologies',
    ],
    techStack: ['Java', 'Spring', 'Microservices', 'AWS', 'Oracle', 'Kafka'],
    applyUrl: 'https://globalfinance.com/careers/java-architect',
    source: 'Indeed',
    postedAt: new Date('2025-01-09'),
  },
  {
    id: '5',
    title: 'Junior Backend Developer (Go)',
    company: 'DevTools Co',
    location: 'Berlin, Germany',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'junior',
    salary: {
      min: 45000,
      max: 60000,
      currency: 'EUR',
    },
    description: 'Start your career building developer tools with Go. We provide mentorship and opportunities to work on open-source projects. Perfect for new graduates or career changers.',
    requirements: [
      '1-2 years of Go programming experience',
      'Understanding of REST API principles',
      'Basic knowledge of SQL databases',
      'Familiarity with Git and version control',
      'Strong problem-solving skills',
    ],
    niceToHave: [
      'Contributions to open-source Go projects',
      'Docker and containerization knowledge',
      'Experience with CI/CD pipelines',
    ],
    techStack: ['Go', 'PostgreSQL', 'Docker', 'REST API', 'Git'],
    applyUrl: 'https://devtools.co/jobs/junior-go-dev',
    source: 'Stack Overflow Jobs',
    postedAt: new Date('2025-01-08'),
  },
  {
    id: '6',
    title: 'DevOps Engineer - Kubernetes Platform',
    company: 'InfraScale',
    location: 'Seattle, WA',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD',
    },
    description: 'Build and maintain our Kubernetes platform. Automate infrastructure provisioning and improve deployment pipelines for hundreds of microservices.',
    requirements: [
      '5+ years of DevOps/SRE experience',
      'Expert-level Kubernetes knowledge',
      'Strong scripting skills (Go, Python, Bash)',
      'Experience with Terraform or similar IaC tools',
      'Deep understanding of AWS services',
    ],
    niceToHave: [
      'CKA/CKAD certification',
      'Service mesh experience (Istio, Linkerd)',
      'Monitoring and observability expertise (Prometheus, Grafana)',
    ],
    techStack: ['Kubernetes', 'Go', 'Terraform', 'AWS', 'CI/CD', 'Prometheus'],
    applyUrl: 'https://infrascale.com/careers',
    source: 'LinkedIn',
    postedAt: new Date('2025-01-07'),
  },
  {
    id: '7',
    title: 'Spring Boot Developer',
    company: 'E-Commerce Giant',
    location: 'Mumbai, India',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 1500000,
      max: 2500000,
      currency: 'INR',
    },
    description: 'Develop and maintain Spring Boot microservices for our e-commerce platform. Work with a team of experienced developers on high-impact projects serving millions of customers.',
    requirements: [
      '3-5 years of Spring Boot development',
      'Strong Java fundamentals and OOP principles',
      'Experience with MySQL and database design',
      'Knowledge of Redis and caching strategies',
      'REST API development and documentation',
    ],
    niceToHave: [
      'Experience with high-traffic e-commerce systems',
      'Knowledge of payment gateway integrations',
      'Microservices architecture experience',
    ],
    techStack: ['Spring Boot', 'Java', 'MySQL', 'Redis', 'REST API', 'AWS'],
    applyUrl: 'https://ecommercegiant.in/careers/spring-boot',
    source: 'Naukri',
    postedAt: new Date('2025-01-06'),
  },
  {
    id: '8',
    title: 'Contract Go Developer - Payment Systems',
    company: 'FinTech Innovators',
    location: 'Toronto, Canada',
    locationType: 'remote',
    employmentType: 'contract',
    experienceLevel: 'senior',
    salary: {
      min: 80,
      max: 100,
      currency: 'CAD/hour',
    },
    description: '6-month contract to build payment processing services in Go. Must have experience with financial systems and compliance requirements (PCI-DSS).',
    requirements: [
      '5+ years of Go development',
      'Experience with payment systems or financial services',
      'Knowledge of PCI-DSS compliance',
      'Strong understanding of security best practices',
      'Experience with high-availability systems',
    ],
    niceToHave: [
      'Blockchain or cryptocurrency experience',
      'Knowledge of fraud detection systems',
      'Experience with Stripe or similar payment APIs',
    ],
    techStack: ['Go', 'PostgreSQL', 'Redis', 'Security', 'Payment APIs'],
    applyUrl: 'https://fintechinnovators.ca/contract-go',
    source: 'LinkedIn',
    postedAt: new Date('2025-01-05'),
  },
  {
    id: '9',
    title: 'Lead Backend Engineer (Java)',
    company: 'Social Media Platform',
    location: 'Los Angeles, CA',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'lead',
    salary: {
      min: 160000,
      max: 200000,
      currency: 'USD',
    },
    description: 'Lead a team of backend engineers building scalable social features. Define technical roadmap, mentor junior developers, and drive architectural decisions for systems serving 100M+ users.',
    requirements: [
      '8+ years of backend development with Java',
      '3+ years of technical leadership experience',
      'Expertise in distributed systems and scalability',
      'Experience with Cassandra or similar NoSQL databases',
      'Strong mentoring and communication skills',
    ],
    niceToHave: [
      'Experience building social networking features',
      'Knowledge of recommendation systems',
      'Real-time messaging system experience',
    ],
    techStack: ['Java', 'Cassandra', 'Kafka', 'Redis', 'Distributed Systems'],
    applyUrl: 'https://socialmedia.com/careers/lead-java',
    source: 'Glassdoor',
    postedAt: new Date('2025-01-04'),
  },
  {
    id: '10',
    title: 'Backend Engineer (Python/Django)',
    company: 'EdTech Solutions',
    location: 'Boston, MA',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD',
    },
    description: 'Build APIs and backend services for our online learning platform using Django. Work on features that help millions of students learn effectively.',
    requirements: [
      '3+ years of Python/Django development',
      'Strong understanding of Django ORM and migrations',
      'Experience with PostgreSQL and query optimization',
      'REST API design and implementation',
      'Knowledge of asynchronous task processing (Celery)',
    ],
    niceToHave: [
      'Experience with video streaming platforms',
      'Knowledge of Django Channels for real-time features',
      'ML/AI integration experience',
    ],
    techStack: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Celery', 'AWS'],
    applyUrl: 'https://edtechsolutions.com/jobs/python-backend',
    source: 'Indeed',
    postedAt: new Date('2025-01-03'),
  },
  {
    id: '11',
    title: 'Staff Engineer - Platform (Go/Java)',
    company: 'Enterprise SaaS',
    location: 'San Jose, CA',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'lead',
    salary: {
      min: 180000,
      max: 230000,
      currency: 'USD',
    },
    description: 'Own critical platform services written in Go and Java. Drive technical excellence across multiple teams and systems, influencing architecture decisions at the highest level.',
    requirements: [
      '10+ years of software engineering experience',
      'Deep expertise in both Go and Java',
      'Proven track record of building scalable platforms',
      'Experience with Kubernetes and cloud-native architectures',
      'Strong system design and architecture skills',
    ],
    niceToHave: [
      'Experience with multi-region deployments',
      'Published technical articles or conference talks',
      'Open-source project maintainer experience',
    ],
    techStack: ['Go', 'Java', 'Kubernetes', 'AWS', 'Architecture', 'Distributed Systems'],
    applyUrl: 'https://enterprisesaas.com/careers/staff-engineer',
    source: 'LinkedIn',
    postedAt: new Date('2025-01-02'),
  },
  {
    id: '12',
    title: 'Backend Developer (Node.js/TypeScript)',
    company: 'HealthTech Startup',
    location: 'Remote (US Only)',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD',
    },
    description: 'Build healthcare applications with Node.js and TypeScript. Work on HIPAA-compliant systems that improve patient care and medical outcomes.',
    requirements: [
      '3+ years of Node.js development',
      'Strong TypeScript skills',
      'Experience with PostgreSQL',
      'Understanding of healthcare data standards (HL7, FHIR)',
      'Knowledge of security and compliance requirements',
    ],
    niceToHave: [
      'HIPAA compliance experience',
      'Experience with EHR/EMR systems',
      'Healthcare domain knowledge',
    ],
    techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'HIPAA', 'REST API'],
    applyUrl: 'https://healthtech.com/jobs/nodejs-backend',
    source: 'AngelList',
    postedAt: new Date('2025-01-01'),
  },
  {
    id: '13',
    title: 'Junior Full Stack Developer (JavaScript)',
    company: 'Web Agency Pro',
    location: 'Chicago, IL',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'junior',
    salary: {
      min: 55000,
      max: 75000,
      currency: 'USD',
    },
    description: 'Join our agency team building websites and web applications for diverse clients. Learn modern web development practices while working on real projects.',
    requirements: [
      '1-2 years of JavaScript development',
      'Familiarity with React or Vue.js',
      'Basic understanding of Node.js',
      'HTML, CSS, and responsive design skills',
      'Willingness to learn and adapt quickly',
    ],
    niceToHave: [
      'Experience with WordPress or headless CMS',
      'Basic design skills (Figma)',
      'Portfolio of personal projects',
    ],
    techStack: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git'],
    applyUrl: 'https://webagencypro.com/careers/junior-dev',
    source: 'Indeed',
    postedAt: new Date('2024-12-30'),
  },
  {
    id: '14',
    title: 'Python Data Engineer',
    company: 'DataFlow Analytics',
    location: 'Remote (Global)',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 95000,
      max: 135000,
      currency: 'USD',
    },
    description: 'Build and maintain data pipelines using Python and modern data stack tools. Work with large-scale datasets and help derive insights for our clients.',
    requirements: [
      '3+ years of Python programming',
      'Experience with data pipeline tools (Airflow, Prefect)',
      'Strong SQL skills and database knowledge',
      'Experience with cloud data warehouses (Snowflake, BigQuery)',
      'Understanding of data modeling concepts',
    ],
    niceToHave: [
      'Experience with dbt (data build tool)',
      'Knowledge of Spark or similar big data frameworks',
      'Machine learning familiarity',
    ],
    techStack: ['Python', 'Airflow', 'SQL', 'Snowflake', 'dbt', 'AWS'],
    applyUrl: 'https://dataflow.com/jobs/python-data-engineer',
    source: 'LinkedIn',
    postedAt: new Date('2024-12-28'),
  },
  {
    id: '15',
    title: 'System Design Architect',
    company: 'Cloud Infrastructure Corp',
    location: 'Singapore',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'SGD',
    },
    description: 'Design and architect large-scale distributed systems for our cloud platform. Lead system design reviews and define technical standards across the organization.',
    requirements: [
      '7+ years of software engineering experience',
      'Proven experience designing large-scale systems',
      'Deep understanding of distributed systems patterns',
      'Experience with multiple programming languages',
      'Strong communication and documentation skills',
    ],
    niceToHave: [
      'Experience with multi-cloud architectures',
      'Published system design content or books',
      'Experience with global-scale applications',
    ],
    techStack: ['System Design', 'Architecture', 'Distributed Systems', 'Cloud', 'Scalability'],
    applyUrl: 'https://cloudinfra.sg/careers/architect',
    source: 'LinkedIn',
    postedAt: new Date('2024-12-27'),
  },
  {
    id: '16',
    title: 'Frontend Engineer (React)',
    company: 'Design Systems Inc',
    location: 'Portland, OR',
    locationType: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 105000,
      max: 145000,
      currency: 'USD',
    },
    description: 'Build and maintain our design system and component library using React and TypeScript. Work closely with designers to create exceptional user experiences.',
    requirements: [
      '4+ years of React development',
      'Expert-level JavaScript/TypeScript',
      'Strong CSS skills and attention to detail',
      'Experience building component libraries',
      'Understanding of accessibility standards (WCAG)',
    ],
    niceToHave: [
      'Experience with Storybook',
      'Knowledge of design tokens',
      'Familiarity with Figma or similar design tools',
    ],
    techStack: ['React', 'TypeScript', 'CSS', 'Storybook', 'Design Systems'],
    applyUrl: 'https://designsystems.com/jobs/react-frontend',
    source: 'Stack Overflow Jobs',
    postedAt: new Date('2024-12-26'),
  },
  {
    id: '17',
    title: 'Junior Java Developer',
    company: 'Banking Solutions Ltd',
    location: 'Dublin, Ireland',
    locationType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'junior',
    salary: {
      min: 40000,
      max: 55000,
      currency: 'EUR',
    },
    description: 'Begin your career in fintech by developing banking applications with Java and Spring. Work in a supportive environment with experienced mentors.',
    requirements: [
      '1-2 years of Java programming',
      'Basic understanding of Spring framework',
      'Knowledge of SQL and relational databases',
      'Strong willingness to learn financial systems',
      'Good analytical and problem-solving skills',
    ],
    niceToHave: [
      'Internship experience in financial services',
      'Understanding of banking regulations',
      'Spring Boot knowledge',
    ],
    techStack: ['Java', 'Spring', 'MySQL', 'Banking', 'REST API'],
    applyUrl: 'https://bankingsolutions.ie/careers/junior-java',
    source: 'Indeed',
    postedAt: new Date('2024-12-25'),
  },
  {
    id: '18',
    title: 'Site Reliability Engineer (Go/Python)',
    company: 'Gaming Platform',
    location: 'Vancouver, Canada',
    locationType: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    salary: {
      min: 110000,
      max: 150000,
      currency: 'CAD',
    },
    description: 'Ensure reliability and performance of our gaming platform serving millions of concurrent users. Build automation tools in Go and Python to improve system observability.',
    requirements: [
      '5+ years of SRE or DevOps experience',
      'Strong programming skills in Go and Python',
      'Experience with monitoring and alerting systems',
      'Knowledge of load balancing and CDN',
      'Incident response and on-call experience',
    ],
    niceToHave: [
      'Gaming industry experience',
      'Experience with real-time multiplayer systems',
      'Knowledge of DDoS mitigation',
    ],
    techStack: ['Go', 'Python', 'Kubernetes', 'Prometheus', 'Grafana', 'AWS'],
    applyUrl: 'https://gamingplatform.com/careers/sre',
    source: 'LinkedIn',
    postedAt: new Date('2024-12-24'),
  },
]

// Helper functions
export function getJobsByExperience(level: string): Job[] {
  if (level === 'all') return mockJobs
  return mockJobs.filter(job => job.experienceLevel === level)
}

export function getJobsByEmploymentType(type: string): Job[] {
  if (type === 'all') return mockJobs
  return mockJobs.filter(job => job.employmentType === type)
}

export function getJobsByLocationType(locationType: string): Job[] {
  if (locationType === 'all') return mockJobs
  return mockJobs.filter(job => job.locationType === locationType)
}

export function getJobsByTechStack(tech: string): Job[] {
  return mockJobs.filter(job =>
    job.techStack.some(t => t.toLowerCase() === tech.toLowerCase())
  )
}

export function searchJobs(query: string): Job[] {
  const lowercaseQuery = query.toLowerCase()
  return mockJobs.filter(job =>
    job.title.toLowerCase().includes(lowercaseQuery) ||
    job.company.toLowerCase().includes(lowercaseQuery) ||
    job.techStack.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    job.description.toLowerCase().includes(lowercaseQuery)
  )
}

export function getAllTechStacks(): string[] {
  const techSet = new Set<string>()
  mockJobs.forEach(job => {
    job.techStack.forEach(tech => techSet.add(tech))
  })
  return Array.from(techSet).sort()
}
