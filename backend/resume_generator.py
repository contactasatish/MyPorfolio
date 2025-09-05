from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from io import BytesIO
import os

def generate_resume_pdf():
    """Generate a professional PDF resume for Satish Kumar"""
    
    # Create a BytesIO buffer to store the PDF
    buffer = BytesIO()
    
    # Create the PDF document
    doc = SimpleDocTemplate(buffer, pagesize=letter, 
                          rightMargin=72, leftMargin=72, 
                          topMargin=36, bottomMargin=18)
    
    # Get default styles and create custom styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=6,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1f2937')
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=20,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#6b7280')
    )
    
    section_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=6,
        spaceBefore=12,
        textColor=colors.HexColor('#1f2937'),
        borderWidth=0,
        borderColor=colors.HexColor('#ef4444'),
        borderPadding=0,
        leftIndent=0
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=6,
        alignment=TA_LEFT
    )
    
    # Story list to hold all content
    story = []
    
    # Header
    story.append(Paragraph("Satish", title_style))
    story.append(Paragraph("IT Analyst / Product Manager / Product Owner", subtitle_style))
    
    # Contact Information
    contact_info = """
    <para alignment="center">
    Dallas–Fort Worth, TX (Remote/Hybrid, open to 25% travel)<br/>
    Email: contactasatish@gmail.com | Phone: 347-341-7341<br/>
    LinkedIn: linkedin.com/in/asatishkr
    </para>
    """
    story.append(Paragraph(contact_info, body_style))
    story.append(Spacer(1, 20))
    
    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
    summary = """
    Dynamic IT Analyst and Product Manager with 15+ years of experience leading digital transformation 
    initiatives across SaaS, travel, telecom, and waste management sectors. Proven track record of driving 
    $10M+ technology programs, implementing enterprise CRM and Big Data platforms, and spearheading 
    cross-functional teams that deliver measurable business outcomes. Adept at bridging business needs 
    and technical solutions, ensuring compliance, efficiency, and innovation.
    """
    story.append(Paragraph(summary, body_style))
    story.append(Spacer(1, 12))
    
    # Skills
    story.append(Paragraph("CORE COMPETENCIES", section_style))
    skills_data = [
        ["Product Management", "Technical Expertise"],
        ["• Roadmaps, Agile/Scrum", "• Salesforce, GCP, Snowflake"],
        ["• Product Lifecycle", "• Hadoop/Hive, Python, SQL"],
        ["• Requirements Gathering", "• Tableau, Machine Learning"],
        ["", ""],
        ["Business Impact", "Leadership & Collaboration"],
        ["• Digital Transformation", "• Stakeholder Management"],
        ["• Procurement Optimization", "• Cross-Functional Leadership"],
        ["• Data Migration", "• Change Management"],
        ["• Compliance (RCRA, EPA, HIPAA)", "• Training & Adoption"]
    ]
    
    skills_table = Table(skills_data, colWidths=[3*inch, 3*inch])
    skills_table.setStyle(TableStyle([
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 12))
    
    # Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_style))
    
    experiences = [
        {
            "title": "IT Technical Analyst",
            "company": "Clean Earth",
            "period": "Jun 2023 – Present",
            "location": "Remote, Philadelphia, PA",
            "achievements": [
                "Designed profile management system for 500+ waste facilities ensuring 100% RCRA & EPA compliance",
                "Led 12-person cross-functional team delivering CRM modernization, reducing inefficiencies by 30%",
                "Directed UAT achieving 98% user satisfaction rate",
                "Trained 200+ stakeholders for smooth system adoption"
            ]
        },
        {
            "title": "Principal Technical Business Analyst",
            "company": "Sabre Corporation",
            "period": "Jun 2016 – May 2023",
            "location": "Southlake, TX",
            "achievements": [
                "Architected Salesforce solutions for global airline requirements across 15+ GDS integrations",
                "Managed $2M+ Agile projects, delivering 95% on time and under budget",
                "Optimized workflows via GCP services, cutting processing time by 40%",
                "Partnered with 50+ airline and hospitality stakeholders to define technical roadmaps"
            ]
        },
        {
            "title": "Principal Technical Product Manager",
            "company": "Verizon",
            "period": "May 2014 – May 2016",
            "location": "Irving, TX",
            "achievements": [
                "Spearheaded Big Data migration for 10TB+ daily volumes",
                "Developed predictive analytics models improving insights by 35%",
                "Introduced Agile frameworks across 8 dev teams, boosting velocity by 25%",
                "Built Tableau dashboards enabling data-driven C-level decisions"
            ]
        }
    ]
    
    for exp in experiences:
        # Job header
        job_header = f"<b>{exp['title']}</b> | {exp['company']} | {exp['period']} | {exp['location']}"
        story.append(Paragraph(job_header, body_style))
        
        # Achievements
        for achievement in exp['achievements']:
            story.append(Paragraph(f"• {achievement}", body_style))
        story.append(Spacer(1, 8))
    
    # Key Projects
    story.append(Paragraph("KEY PROJECTS", section_style))
    
    projects = [
        {
            "title": "Travel/Airline Solutions Implementation",
            "impact": "Delivered 38 live NDC airline integrations, facilitated 30M+ incremental bookings, achieved 5-20% airfare savings and 15-20% workflow improvements"
        },
        {
            "title": "GenAI OCR Model Implementation", 
            "impact": "Saved 260+ man-hours by automating invoice/document processing"
        },
        {
            "title": "SaaS Procurement to Production Transformation",
            "impact": "Delivered $5M+ efficiency improvements through streamlined procurement workflows"
        },
        {
            "title": "Compliance Automation System",
            "impact": "Achieved 99% adherence to regulatory standards with automated compliance monitoring"
        }
    ]
    
    for project in projects:
        story.append(Paragraph(f"<b>{project['title']}</b>", body_style))
        story.append(Paragraph(f"• {project['impact']}", body_style))
        story.append(Spacer(1, 4))
    
    # Government & Regulatory Experience
    story.append(Spacer(1, 8))
    story.append(Paragraph("GOVERNMENT & REGULATORY EXPERTISE", section_style))
    
    gov_text = """
    Extensive experience with government agencies and regulatory compliance including ATPCO, IATA, SITA, 
    DOT, RCRA, EPA, State EPA, and Federal EPA. Deep expertise in aviation industry standards, 
    environmental regulations, and compliance management across 500+ regulated facilities.
    """
    story.append(Paragraph(gov_text, body_style))
    
    # Build the PDF
    doc.build(story)
    
    # Get the PDF data
    pdf_data = buffer.getvalue()
    buffer.close()
    
    return pdf_data