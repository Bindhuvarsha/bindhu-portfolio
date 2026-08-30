# Bindhu Shree K.R — Developer Portfolio

A responsive personal developer portfolio website for **Bindhu Shree K.R** (Backend Developer & Machine Learning Enthusiast) built with **Python Flask**, **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## 🚀 Features

- **Modern Aesthetic**: Dark navy / charcoal background with electric blue (`#38bdf8`) and soft lavender (`#c084fc`) accents, ambient glow mesh, and glassmorphism.
- **Pure CSS Technology Graphic**: Terminal & interactive code card with glowing live status metrics and animated syntax.
- **Complete Candidate Portfolio**:
  1. **Hero Section**: Bio, instant badges, direct CTAs, resume download.
  2. **About Section**: Engineering vision, core philosophy, and quick contact details.
  3. **Skills Section**: Categorized badges and proficiency meters for Programming, Backend & Systems, Cloud & Database, Machine Learning, Web, Design, and Tools.
  4. **Experience Section**: Interactive timeline for Backend Internship at AES Company.
  5. **Projects Section**: Healthcare AI Chatbot & Smart Heritage Tourism Ideathon winner concept.
  6. **Education Section**: B.E. (Information Science & Engineering), PU Course, and SSLC metrics.
  7. **Certifications Section**: 8 credential cards from AWS Skill Builder, IBM, Infosys Springboard, and Coursera.
  8. **Leadership Section**: Class Representative and Ideathon Team Lead milestones.
  9. **Contact Section**: Interactive AJAX contact form with client/server-side validation and instant feedback.
- **RESTful Endpoints**:
  - `GET /` — Dynamic Jinja2 portfolio page rendering.
  - `GET /resume` — Direct resume PDF download endpoint.
  - `POST /contact` — JSON/Form validation API endpoint with status feedback.
- **Performance & Usability**:
  - Mobile-responsive navigation drawer.
  - Active ScrollSpy navigation highlight.
  - IntersectionObserver reveal-on-scroll animations.
  - High accessibility contrast and semantic HTML5.

---

## 🛠️ Project Structure

```
bindhu-portfolio/
├── app.py                                  # Flask web server, dynamic data dictionary & API routes
├── requirements.txt                        # Project dependencies (Flask, etc.)
├── README.md                               # Setup and documentation
├── templates/
│   └── index.html                          # Semantic Jinja2 template for all 9 sections
└── static/
    ├── style.css                           # Custom dark theme, glassmorphism & responsive CSS
    ├── script.js                           # Vanilla JavaScript for nav, animations & AJAX form
    └── Bindhu_Shree_KR_Resume2026.pdf      # Downloadable candidate resume PDF
```

---

## 💻 Setup & Local Development

### 1. Clone or Open the Repository
```bash
cd bindhu-portfolio
```

### 2. Create and Activate a Virtual Environment
**On Windows:**
```powershell
python -m venv venv
venv\Scripts\activate
```

**On macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Flask Application
```bash
python app.py
```

### 5. Open in Browser
Visit **[http://127.0.0.1:5000](http://127.0.0.1:5000)** in your browser.

---

## 📬 Contact Information

- **Name**: Bindhu Shree K.R
- **Role**: Backend Developer & Machine Learning Enthusiast
- **Location**: Bangalore, Karnataka, India
- **Phone**: +91 6363539715
- **Email**: [bindhushreebindhushree28@gmail.com](mailto:bindhushreebindhushree28@gmail.com)
- **LinkedIn**: [linkedin.com/in/bindhu-shree-k-r](https://linkedin.com/in/bindhu-shree-k-r)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
