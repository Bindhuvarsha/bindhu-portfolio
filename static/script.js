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
});
