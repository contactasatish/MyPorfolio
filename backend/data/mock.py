# Mock portfolio data for fallback
from models import PortfolioData, PersonalInfo, AboutInfo, SkillCategory, Experience, Project

portfolioData = PortfolioData(
    personal=PersonalInfo(
        name="Satish Kumar",
        title="IT Analyst / Product Manager / Product Owner",
        tagline="SaaS | Machine Learning | Procurement | Cross-Functional Leadership | Driving $10M+ Digital Transformation Initiatives",
        location="Dallas–Fort Worth, TX (Remote/Hybrid, open to 25% travel)",
        email="contactasatish@gmail.com",
        phone="347-341-7341",
        linkedin="linkedin.com/in/asatishkr",
        heroImage="https://images.unsplash.com/photo-1649406458887-2b6561c36a4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MHx8fHwxNzU3MDE3NTc5fDA&ixlib=rb-4.1.0&q=85"
    ),
    about=AboutInfo(
        title="About Me",
        description="Dynamic IT Analyst and Product Manager with 15+ years of experience leading digital transformation initiatives across SaaS, travel, telecom, and waste management sectors. Proven track record of driving $10M+ technology programs, implementing enterprise CRM and Big Data platforms, and spearheading cross-functional teams that deliver measurable business outcomes. Adept at bridging business needs and technical solutions, ensuring compliance, efficiency, and innovation.",
        backgroundImage="https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MHx8fHwxNzU3MDE3NTc5fDA&ixlib=rb-4.1.0&q=85"
    ),
    skills=[
        SkillCategory(
            category="Product Management",
            items=["Roadmaps", "Agile/Scrum", "Product Lifecycle", "Requirements Gathering"]
        ),
        SkillCategory(
            category="Technical Expertise",
            items=["Salesforce", "GCP", "Snowflake", "Hadoop/Hive", "Python", "SQL", "Tableau"]
        ),
        SkillCategory(
            category="Business Impact",
            items=["Digital Transformation", "Procurement Optimization", "Data Migration", "Compliance (RCRA, EPA, HIPAA)"]
        ),
        SkillCategory(
            category="Leadership & Collaboration",
            items=["Stakeholder Management", "Cross-Functional Leadership", "Change Management", "Training & Adoption"]
        )
    ],
    experience=[
        Experience(
            title="IT Technical Analyst",
            company="Clean Earth",
            type="Contract",
            period="Jun 2023 – Present",
            location="Remote, Philadelphia, PA",
            achievements=[
                "Designed profile management system for 500+ waste facilities ensuring 100% RCRA & EPA compliance",
                "Led 12-person cross-functional team delivering CRM modernization, reducing inefficiencies by 30%",
                "Directed UAT achieving 98% user satisfaction rate",
                "Trained 200+ stakeholders for smooth system adoption"
            ]
        ),
        Experience(
            title="Principal Technical Business Analyst",
            company="Sabre Corporation",
            type="Full-time",
            period="Jun 2016 – May 2023",
            location="Southlake, TX",
            achievements=[
                "Architected Salesforce solutions for global airline requirements across 15+ GDS integrations",
                "Managed $2M+ Agile projects, delivering 95% on time and under budget",
                "Optimized workflows via GCP services, cutting processing time by 40%",
                "Partnered with 50+ airline and hospitality stakeholders to define technical roadmaps"
            ]
        ),
        Experience(
            title="Principal Technical Product Manager",
            company="Verizon",
            type="Contract",
            period="May 2014 – May 2016",
            location="Irving, TX",
            achievements=[
                "Spearheaded Big Data migration for 10TB+ daily volumes",
                "Developed predictive analytics models improving insights by 35%",
                "Introduced Agile frameworks across 8 dev teams, boosting velocity by 25%",
                "Built Tableau dashboards enabling data-driven C-level decisions"
            ]
        )
    ],
    projects=[
        Project(
            id=1,
            title="GenAI OCR Model Implementation",
            description="Automated invoice and document processing system using advanced OCR and machine learning technologies",
            impact="Saved 260+ man-hours by automating invoice/document processing",
            technologies=["Machine Learning", "OCR", "Python", "AI/ML Models", "Document Processing"],
            image="https://images.unsplash.com/photo-1684610529682-553625a1ffed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category="AI/ML"
        ),
        Project(
            id=2,
            title="SaaS Procurement to Production Transformation",
            description="End-to-end digital transformation of procurement processes with enterprise-scale SaaS implementation",
            impact="Delivered $5M+ efficiency improvements through streamlined procurement workflows",
            technologies=["SaaS Platforms", "Process Automation", "Digital Transformation", "Workflow Optimization"],
            image="https://images.unsplash.com/photo-1756756736901-a2bf24f2d2de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category="Digital Transformation"
        ),
        Project(
            id=3,
            title="Compliance Automation System",
            description="Comprehensive regulatory compliance system ensuring adherence to industry standards and regulations",
            impact="Achieved 99% adherence to regulatory standards with automated compliance monitoring",
            technologies=["Compliance Management", "Automation", "Regulatory Systems", "Quality Assurance"],
            image="https://images.unsplash.com/photo-1728995025396-b5141e209455?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2glMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTcwMTc1NzN8MA&ixlib=rb-4.1.0&q=85",
            category="Compliance"
        )
    ]
)