/**
 * BINDHU SHREE K.R — PORTFOLIO JAVASCRIPT
 * Vanilla JS logic for responsive navigation, scroll reveal, scrollspy, and AJAX contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STICKY HEADER & ACTIVE NAVIGATION SCROLLSPY
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScrollEffects = () => {
    const scrollY = window.scrollY;

    // Header blur effect
    if (scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects(); // Trigger once on load

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU TOGGLE
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('open');
    });

    // Close mobile menu on nav link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mainNav.classList.remove('open');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. REVEAL-ON-SCROLL ANIMATIONS (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Reveal only once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    // Fallback for older browsers
    revealItems.forEach((item) => {
      item.classList.add('revealed');
    });
  }

  // --------------------------------------------------------------------------
  // 4. CONTACT FORM VALIDATION & ASYNC AJAX SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const alertIcon = document.getElementById('alert-icon');
  const alertMessage = document.getElementById('alert-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  // Input elements
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  // Error span elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const clearErrors = () => {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    nameInput.style.borderColor = '';
    emailInput.style.borderColor = '';
    messageInput.style.borderColor = '';
  };

  const showAlert = (type, message) => {
    formAlert.className = `alert-banner ${type}`;
    formAlert.style.display = 'flex';
    alertIcon.textContent = type === 'success' ? '✓' : '⚠';
    alertMessage.textContent = message;

    // Auto scroll alert into view if needed
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const hideAlert = () => {
    formAlert.style.display = 'none';
  };

  // Real-time input clearing
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        clearErrors();
        hideAlert();
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();
      hideAlert();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput.value.trim();

      // Client-side Validation
      let isValid = true;

      if (!name) {
        nameError.textContent = 'Please enter your name.';
        nameInput.style.borderColor = '#f43f5e';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        emailError.textContent = 'Please enter your email address.';
        emailInput.style.borderColor = '#f43f5e';
        isValid = false;
      } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.style.borderColor = '#f43f5e';
        isValid = false;
      }

      if (!message) {
        messageError.textContent = 'Please enter your message.';
        messageInput.style.borderColor = '#f43f5e';
        isValid = false;
      } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters long.';
        messageInput.style.borderColor = '#f43f5e';
        isValid = false;
      }

      if (!isValid) return;

      // Loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      const btnArrow = submitBtn.querySelector('.btn-arrow');

      if (btnText) btnText.textContent = 'Sending...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnArrow) btnArrow.style.display = 'none';
      submitBtn.disabled = true;

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showAlert('success', result.message || 'Message sent successfully!');
          contactForm.reset();
        } else {
          showAlert('error', result.error || 'Failed to send message. Please try again.');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        showAlert('error', 'Network error encountered. Please check your internet connection or email directly.');
      } finally {
        // Reset loading state
        if (btnText) btnText.textContent = 'Send Message';
        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnArrow) btnArrow.style.display = 'inline-block';
        submitBtn.disabled = false;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. SMOOTH SCROLLING FOR INTERNAL LINKS
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. INTERACTIVE IDE CODE SANDBOX & TAB SWITCHER
  // --------------------------------------------------------------------------
  const codeSnippets = {
    fastapi: {
      filename: 'backend-inspector.py',
      code: `<span class="code-comment"># Python Backend - RESTful Healthcare Chatbot Endpoint</span>
<span class="code-keyword">from</span> <span class="code-lib">fastapi</span> <span class="code-keyword">import</span> FastAPI, HTTPException, status
<span class="code-keyword">from</span> <span class="code-lib">pydantic</span> <span class="code-keyword">import</span> BaseModel
<span class="code-keyword">from</span> <span class="code-lib">nlp_engine</span> <span class="code-keyword">import</span> analyze_symptoms, detect_emergency

app = FastAPI(title=<span class="code-string">"Healthcare Assist API"</span>, version=<span class="code-string">"1.0.0"</span>)

<span class="code-keyword">class</span> <span class="code-class">HealthQuery</span>(BaseModel):
    user_id: <span class="code-type">str</span>
    symptoms: <span class="code-type">list[str]</span>
    language: <span class="code-type">str</span> = <span class="code-string">"en"</span>

<span class="code-decorator">@app.post</span>(<span class="code-string">"/api/v1/triage"</span>, status_code=status.HTTP_200_OK)
<span class="code-keyword">async def</span> <span class="code-func">triage_symptoms</span>(query: HealthQuery):
    <span class="code-keyword">if</span> detect_emergency(query.symptoms):
        <span class="code-keyword">return</span> {<span class="code-string">"status"</span>: <span class="code-string">"EMERGENCY"</span>, <span class="code-string">"action"</span>: <span class="code-string">"ALERT_DISPATCH"</span>}
    result = <span class="code-keyword">await</span> analyze_symptoms(query.symptoms, query.language)
    <span class="code-keyword">return</span> {<span class="code-string">"status"</span>: <span class="code-string">"SUCCESS"</span>, <span class="code-string">"guidance"</span>: result}`,
      raw: `# Python Backend - RESTful Healthcare Chatbot Endpoint
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from nlp_engine import analyze_symptoms, detect_emergency

app = FastAPI(title="Healthcare Assist API", version="1.0.0")

class HealthQuery(BaseModel):
    user_id: str
    symptoms: list[str]
    language: str = "en"

@app.post("/api/v1/triage", status_code=status.HTTP_200_OK)
async def triage_symptoms(query: HealthQuery):
    if detect_emergency(query.symptoms):
        return {"status": "EMERGENCY", "action": "ALERT_DISPATCH"}
    result = await analyze_symptoms(query.symptoms, query.language)
    return {"status": "SUCCESS", "guidance": result}`,
      output: `{ "status": "SUCCESS", "triage_score": 0.94, "emergency_detected": false, "latency_ms": 14.2 }`
    },
    sql: {
      filename: 'query-optimizer.sql',
      code: `<span class="code-comment">-- Optimized Multi-Table Patient Index &amp; Triage Lookup</span>
<span class="code-keyword">EXPLAIN ANALYZE</span>
<span class="code-keyword">SELECT</span> 
    p.patient_id,
    p.full_name,
    COUNT(t.triage_id) <span class="code-keyword">AS</span> total_visits,
    MAX(t.created_at) <span class="code-keyword">AS</span> last_triage_timestamp
<span class="code-keyword">FROM</span> patients p
<span class="code-keyword">INNER JOIN</span> triage_records t <span class="code-keyword">ON</span> p.patient_id = t.patient_id
<span class="code-keyword">WHERE</span> t.emergency_status = <span class="code-string">'CLEARED'</span>
  <span class="code-keyword">AND</span> t.created_at &gt;= NOW() - <span class="code-keyword">INTERVAL</span> <span class="code-string">'30 days'</span>
<span class="code-keyword">GROUP BY</span> p.patient_id, p.full_name
<span class="code-keyword">ORDER BY</span> last_triage_timestamp <span class="code-keyword">DESC</span>
<span class="code-keyword">LIMIT</span> 25;`,
      raw: `-- Optimized Multi-Table Patient Index & Triage Lookup
EXPLAIN ANALYZE
SELECT 
    p.patient_id,
    p.full_name,
    COUNT(t.triage_id) AS total_visits,
    MAX(t.created_at) AS last_triage_timestamp
FROM patients p
INNER JOIN triage_records t ON p.patient_id = t.patient_id
WHERE t.emergency_status = 'CLEARED'
  AND t.created_at >= NOW() - INTERVAL '30 days'
GROUP BY p.patient_id, p.full_name
ORDER BY last_triage_timestamp DESC
LIMIT 25;`,
      output: `[Query Plan] Index Scan using idx_triage_date on triage_records (cost=0.42..8.45 rows=25 width=48) (actual time=0.042..1.185 rows=25 loops=1) Execution Time: 1.28 ms`
    },
    aws: {
      filename: 'dynamodb_service.py',
      code: `<span class="code-comment"># AWS Boto3 Serverless DynamoDB Async Session Store</span>
<span class="code-keyword">import</span> boto3
<span class="code-keyword">from</span> botocore.exceptions <span class="code-keyword">import</span> ClientError

dynamodb = boto3.resource(<span class="code-string">'dynamodb'</span>, region_name=<span class="code-string">'ap-south-1'</span>)
table = dynamodb.Table(<span class="code-string">'HealthcareChatSessions'</span>)

<span class="code-keyword">def</span> <span class="code-func">persist_chat_session</span>(session_id: <span class="code-type">str</span>, metadata: <span class="code-type">dict</span>):
    <span class="code-keyword">try</span>:
        response = table.put_item(
            Item={
                <span class="code-string">'SessionId'</span>: session_id,
                <span class="code-string">'TriageHistory'</span>: metadata,
                <span class="code-string">'TTL'</span>: 1735689600
            }
        )
        <span class="code-keyword">return</span> response[<span class="code-string">'ResponseMetadata'</span>][<span class="code-string">'HTTPStatusCode'</span>] == 200
    <span class="code-keyword">except</span> ClientError <span class="code-keyword">as</span> e:
        <span class="code-keyword">raise</span> RuntimeError(f<span class="code-string">"DynamoDB write failed: {e}"</span>)`,
      raw: `# AWS Boto3 Serverless DynamoDB Async Session Store
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
table = dynamodb.Table('HealthcareChatSessions')

def persist_chat_session(session_id: str, metadata: dict):
    try:
        response = table.put_item(
            Item={
                'SessionId': session_id,
                'TriageHistory': metadata,
                'TTL': 1735689600
            }
        )
        return response['ResponseMetadata']['HTTPStatusCode'] == 200
    except ClientError as e:
        raise RuntimeError(f"DynamoDB write failed: {e}")`,
      output: `AWS DynamoDB PutItem 200 OK | ConsumedCapacity: 1.0 WCU | SessionId: "sess_99a81f" persisted successfully.`
    }
  };

  const editorTabs = document.querySelectorAll('.editor-tab');
  const editorFilename = document.getElementById('editor-filename');
  const codeDisplay = document.getElementById('code-display');
  const btnRunTest = document.getElementById('btn-run-test');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const copyText = document.getElementById('copy-text');
  const editorOutput = document.getElementById('editor-output');
  const closeOutput = document.getElementById('close-output');

  let currentTabKey = 'fastapi';

  editorTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      if (!tabKey || !codeSnippets[tabKey]) return;

      editorTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentTabKey = tabKey;

      const data = codeSnippets[tabKey];
      if (editorFilename) editorFilename.textContent = data.filename;
      if (codeDisplay) {
        codeDisplay.innerHTML = `<code>${data.code}</code>`;
      }
      if (editorOutput) {
        editorOutput.style.display = 'none';
      }
    });
  });

  if (btnRunTest) {
    btnRunTest.addEventListener('click', () => {
      if (!editorOutput) return;
      const data = codeSnippets[currentTabKey];
      const outputBody = editorOutput.querySelector('.output-body code');
      if (outputBody) {
        outputBody.textContent = data.output;
      }
      editorOutput.style.display = 'block';
    });
  }

  if (closeOutput && editorOutput) {
    closeOutput.addEventListener('click', () => {
      editorOutput.style.display = 'none';
    });
  }

  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', async () => {
      const data = codeSnippets[currentTabKey];
      try {
        await navigator.clipboard.writeText(data.raw);
        if (copyText) copyText.textContent = 'Copied!';
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });
  }
});
