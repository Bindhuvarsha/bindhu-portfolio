import os
import re
import shutil
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'bindhu-portfolio-secret-key-2026')

# Ensure profile photo exists in static directory
_src_img = r'C:\Users\Bindhu Shree KR\.gemini\antigravity-ide\brain\1a2ce856-43bc-4538-aa66-afbad0301c43\bindhu_profile_photo_1788092670032.jpg'
_dst_img = os.path.join(os.path.dirname(__file__), 'static', 'profile.jpg')
if os.path.exists(_src_img) and not os.path.exists(_dst_img):
    shutil.copyfile(_src_img, _dst_img)

# Structured portfolio profile data
PORTFOLIO_DATA = {
    "profile": {
        "name": "Bindhu Shree K.R",
        "role": "Backend Developer & Machine Learning Enthusiast",
        "avatar": "profile.jpg",
        "short_bio": "Information Science and Engineering student focused on building scalable backend architectures, robust REST APIs, cloud databases, and machine learning solutions.",
        "location": "Bangalore, Karnataka",
        "phone": "6363539715",
        "email": "bindhushreebindhushree28@gmail.com",
        "linkedin": "https://linkedin.com/in/bindhu-shree-k-r",
        "github": "https://github.com/Bindhuvarsha",
        "available_for_hire": True
    },
    "about": {
        "headline": "Bridging Robust Backend Architectures with Intelligent Machine Learning",
        "paragraphs": [
            "I am an Information Science and Engineering student with a deep passion for backend development, designing scalable RESTful APIs, modern database systems, cloud architectures, and machine learning models including Natural Language Processing (NLP).",
            "I am continuously eager to learn emerging technologies, solve challenging engineering problems, and contribute to impactful software products that deliver real-world value.",
            "With hands-on experience in production-grade backend systems and hackathon-winning ideations, I combine solid computer science fundamentals with an agile problem-solving mindset."
        ],
        "highlights": [
            {"label": "Current Focus", "value": "Backend Systems & ML/NLP"},
            {"label": "Education", "value": "B.E. Information Science (2027)"},
            {"label": "Current Role", "value": "Backend Intern @ AES Company"},
            {"label": "Location", "value": "Bangalore, Karnataka, India"}
        ]
    },
    "skills": {
        "Programming": [
            {"name": "Python", "level": 90, "icon": "python"},
            {"name": "Java", "level": 82, "icon": "java"}
        ],
        "Backend & Systems": [
            {"name": "RESTful APIs", "level": 88, "icon": "api"},
            {"name": "SQL Databases", "level": 85, "icon": "database"},
            {"name": "Data Structures & Algorithms", "level": 82, "icon": "cpu"}
        ],
        "Cloud & Database": [
            {"name": "Amazon S3", "level": 80, "icon": "cloud"},
            {"name": "Amazon DynamoDB", "level": 78, "icon": "database"},
            {"name": "AWS API Gateway", "level": 75, "icon": "network"}
        ],
        "Machine Learning & AI": [
            {"name": "Machine Learning with Python", "level": 84, "icon": "brain"},
            {"name": "Natural Language Processing (NLP)", "level": 80, "icon": "message-square"}
        ],
        "Web Technologies": [
            {"name": "HTML5", "level": 90, "icon": "code"},
            {"name": "CSS3", "level": 88, "icon": "palette"},
            {"name": "JavaScript (ES6+)", "level": 80, "icon": "zap"}
        ],
        "Design & Prototyping": [
            {"name": "Figma", "level": 82, "icon": "figma"},
            {"name": "Canva", "level": 85, "icon": "image"}
        ],
        "Productivity & Tools": [
            {"name": "Microsoft Word", "level": 92, "icon": "file-text"},
            {"name": "Microsoft Excel", "level": 86, "icon": "table"},
            {"name": "Microsoft PowerPoint", "level": 90, "icon": "monitor"}
        ]
    },
    "experience": [
        {
            "role": "Backend Intern",
            "company": "AES Company",
            "location": "Tiruchirappalli, Tamil Nadu",
            "status": "Ongoing Internship",
            "period": "2024 - Present",
            "type": "Internship",
            "responsibilities": [
                "Developing and maintaining reliable, scalable backend application components.",
                "Assisting with RESTful API design, implementation, and endpoint documentation.",
                "Working with SQL databases for schema design, query optimization, and efficient data management.",
                "Debugging, unit testing, and profiling backend functionality for peak performance.",
                "Participating actively in code reviews and adhering to software engineering best practices."
            ],
            "technologies": ["Python", "REST APIs", "SQL", "Git", "Clean Architecture"]
        }
    ],
    "projects": [
        {
            "title": "AI-Based Chatbot for Healthcare Using Machine Learning",
            "status": "Ongoing Project",
            "badge": "Machine Learning & NLP",
            "featured": True,
            "description": "An intelligent healthcare support chatbot capable of symptom analysis, preliminary medical guidance, multilingual communication, and real-time emergency triage detection during critical health situations.",
            "technologies": ["Python", "Machine Learning", "NLP", "HTML5", "CSS3", "JavaScript"],
            "highlights": [
                "Automated symptom screening with confidence-weighted guidance.",
                "Multilingual natural language understanding for patient accessibility.",
                "Critical situation and emergency prompt detection triggers."
            ]
        },
        {
            "title": "Smart Heritage Tourism Solution",
            "status": "Ideathon Winner Concept",
            "event": "MyMysuru Ideathon — Vision 2030",
            "badge": "Smart Cities & UI/UX",
            "featured": True,
            "description": "A smart heritage tourism solution designed to support sustainable city development, elevate tourist exploration engagement, preserve historical culture, and ensure accessible navigation for visitors.",
            "technologies": ["Figma", "Canva", "PowerPoint", "Google Maps API Concepts"],
            "highlights": [
                "Designed end-to-end interactive mobile user flows and accessibility features.",
                "Proposed localized landmark discovery algorithms and heritage story integration.",
                "Presented comprehensive pitch deck for the Vision 2030 smart city initiative."
            ]
        }
    ],
    "education": [
        {
            "degree": "Bachelor of Engineering — Information Science & Engineering",
            "institution": "Gopalan College of Engineering and Management, VTU",
            "period": "2023 — 2027 (Expected)",
            "score": "CGPA: 7.65 / 10.0",
            "score_type": "CGPA",
            "status": "In Progress",
            "description": "Core coursework: Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering."
        },
        {
            "degree": "Pre-University Course (PCMB)",
            "institution": "Samrudhi PU College",
            "period": "2021 — 2023",
            "score": "72.32%",
            "score_type": "Percentage",
            "status": "Completed",
            "description": "Focus on Physics, Chemistry, Mathematics, and Biology with strong analytical grounding."
        },
        {
            "degree": "Secondary School Leaving Certificate (SSLC - 10th)",
            "institution": "Sri Sharada Vidyalaya",
            "period": "2020 — 2021",
            "score": "92.32%",
            "score_type": "Distinction",
            "status": "Completed",
            "description": "Graduated with Academic Distinction and recognized for active scholastic participation."
        }
    ],
    "certifications": [
        {
            "title": "Introduction to Amazon S3",
            "issuer": "AWS Skill Builder",
            "category": "Cloud & Storage",
            "icon": "aws"
        },
        {
            "title": "Introduction to Amazon DynamoDB",
            "issuer": "AWS Skill Builder",
            "category": "Cloud & NoSQL",
            "icon": "aws"
        },
        {
            "title": "Introduction to Amazon API Gateway",
            "issuer": "AWS Skill Builder",
            "category": "Cloud & Serverless",
            "icon": "aws"
        },
        {
            "title": "Machine Learning with Python",
            "issuer": "IBM",
            "category": "AI & Machine Learning",
            "icon": "ibm"
        },
        {
            "title": "Data Analysis with Python",
            "issuer": "IBM",
            "category": "Data Science",
            "icon": "ibm"
        },
        {
            "title": "Data Structures and Algorithms using Java",
            "issuer": "Infosys Springboard",
            "category": "Core CS & Algorithms",
            "icon": "infosys"
        },
        {
            "title": "Machine Learning using Python",
            "issuer": "Coursera",
            "category": "AI & Machine Learning",
            "icon": "coursera"
        },
        {
            "title": "Prompt Engineering",
            "issuer": "Infosys Springboard",
            "category": "Generative AI",
            "icon": "infosys"
        }
    ],
    "leadership": [
        {
            "role": "Class Representative",
            "organization": "Gopalan College of Engineering and Management",
            "tenure": "3 Semesters (Ongoing)",
            "description": "Serving as the bridge between faculty and 60+ engineering peers. Responsible for organizing academic schedules, student feedback sessions, resolving grievances, and coordinating departmental workshops.",
            "skills": ["Team Communication", "Problem Resolution", "Academic Coordination", "Event Planning"]
        },
        {
            "role": "Team Leader",
            "organization": "MyMysuru Ideathon — Vision 2030",
            "tenure": "Competition Event",
            "description": "Led an interdisciplinary team through fast-paced ideation, sprint execution, prototype design, and final jury presentation for the smart heritage tourism initiative.",
            "skills": ["Task Allocation", "Presentation Leadership", "Cross-functional Collaboration", "Time Management"]
        }
    ]
}


@app.route('/')
def index():
    """Renders the main portfolio page with all dynamic data."""
    return render_template('index.html', data=PORTFOLIO_DATA)


@app.route('/resume')
def download_resume():
    """Serves the candidate resume PDF for download."""
    static_dir = os.path.join(app.root_path, 'static')
    filename = 'Bindhu_Shree_KR_Resume2026.pdf'
    return send_from_directory(
        directory=static_dir,
        path=filename,
        as_attachment=True,
        download_name='Bindhu_Shree_KR_Resume2026.pdf'
    )


@app.route('/contact', methods=['POST'])
def contact():
    """Handles contact form submissions with validation and returns JSON."""
    if request.is_json:
        payload = request.get_json() or {}
    else:
        payload = request.form.to_dict()

    name = payload.get('name', '').strip()
    email = payload.get('email', '').strip()
    message = payload.get('message', '').strip()
    subject = payload.get('subject', 'Portfolio Contact Inquiry').strip()

    # Validation checks
    if not name:
        return jsonify({
            "success": False,
            "error": "Please enter your name."
        }), 400

    if not email:
        return jsonify({
            "success": False,
            "error": "Please enter your email address."
        }), 400

    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, email):
        return jsonify({
            "success": False,
            "error": "Please enter a valid email address."
        }), 400

    if not message:
        return jsonify({
            "success": False,
            "error": "Please enter your message."
        }), 400

    if len(message) < 10:
        return jsonify({
            "success": False,
            "error": "Message is too short. Please provide at least 10 characters."
        }), 400

    # In production, message can be forwarded via SMTP / webhook / DB storage
    return jsonify({
        "success": True,
        "message": f"Thank you, {name}! Your message has been received. Bindhu will get back to you shortly."
    }), 200


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
