// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Horizontal scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Scroll horizontally instead of vertically
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  });
});

// Navbar scroll behavior
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  if (!navbar) return;

  // Simple approach: check scroll position relative to each section
  let current = "home"; // Default to home

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    // If section is in the top half of viewport, it's current
    if (rect.top <= 100 && rect.bottom > 100) {
      current = section.getAttribute("id");
    }
  });

  // Show navbar bar when not in home section
  const isInHome = current === "home";
  navbar.classList.toggle("scrolled-from-home", !isInHome);

  // Update active navigation links
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

// Trigger once on load
window.addEventListener("load", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  if (!navbar) return;

  // Simple approach: check scroll position relative to each section
  let current = "home"; // Default to home

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    // If section is in the top half of viewport, it's current
    if (rect.top <= 100 && rect.bottom > 100) {
      current = section.getAttribute("id");
    }
  });

  // Show navbar bar when not in home section
  const isInHome = current === "home";
  navbar.classList.toggle("scrolled-from-home", !isInHome);

  // Update active navigation links
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".section-title, .about-content, .skills-grid, .projects-grid, .contact-content"
  );

  elementsToAnimate.forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Creative animation for job titles
function animateJobTitles() {
  const jobTitles = document.querySelectorAll(".job-title");
  const container = document.getElementById("animated-titles");

  // Create a typewriter-like effect with random delays
  let currentIndex = 0;

  function showNextTitle() {
    if (currentIndex >= jobTitles.length) {
      // After all titles are shown, create a subtle pulse effect
      container.style.animation = "subtlePulse 2s ease-in-out infinite";
      return;
    }

    const title = jobTitles[currentIndex];
    title.style.display = "inline";

    // Random delay between 800-1500ms for more natural feel
    const randomDelay = Math.random() * 700 + 800;

    // Typewriter effect for each title
    const text = title.textContent;
    title.textContent = "";
    title.style.opacity = "1";

    let charIndex = 0;
    const typeSpeed = Math.random() * 50 + 30; // Random typing speed

    function typeChar() {
      if (charIndex < text.length) {
        title.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typeSpeed);
      } else {
        // Add a subtle glow effect when typing is complete
        title.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.3)";
        setTimeout(() => {
          title.style.textShadow = "none";
        }, 500);

        currentIndex++;
        setTimeout(showNextTitle, randomDelay);
      }
    }

    typeChar();
  }

  // Start the animation
  showNextTitle();
}

// Add subtle pulse animation to CSS
const pulseAnimation = document.createElement("style");
pulseAnimation.textContent = `
  @keyframes subtlePulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.9;
    }
    50% { 
      transform: scale(1.02);
      opacity: 1;
    }
  }
`;
document.head.appendChild(pulseAnimation);

// Start job title animation after hero title finishes
window.addEventListener("load", () => {
  setTimeout(() => {
    animateJobTitles();
  }, 1500); // Start slightly earlier for better flow
});

// Removed parallax effect for normal scrolling

// Skill items hover effect
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Project cards tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});

// Get API URL from meta tag or environment
function getApiUrl() {
  // Check for meta tag first
  const metaTag = document.querySelector('meta[name="contact-api-url"]');
  if (metaTag && metaTag.content && metaTag.content.trim()) {
    return metaTag.content.trim();
  }

  // Check for window variable
  if (window.CONTACT_API_URL) {
    return window.CONTACT_API_URL;
  }

  // Auto-detect: if not localhost, assume same origin for API
  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "http://localhost:3001";
  }

  // In production, try same origin (useful if backend is on same domain)
  // Otherwise, you need to set the meta tag with your backend URL
  return window.location.origin;
}

// Contact form handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Client-side validation, then POST to backend
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      return;
    }

    const apiUrl = getApiUrl();
    const endpoint = `${apiUrl}/api/contact`;

    // Debug logging (remove in production if needed)
    console.log("API URL:", apiUrl);
    console.log("Endpoint:", endpoint);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      // Try to read response body to show a helpful message when available
      let data = null;
      try {
        const text = await res.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch (e) {
        // If response is not JSON, that's okay
        console.warn("Response is not JSON:", e);
      }

      if (!res.ok) {
        let errMsg = "Failed to send message. Please try again later.";

        if (res.status === 0 || res.status >= 500) {
          errMsg =
            "Server error. Please check if the backend is running and try again.";
        } else if (res.status === 404) {
          errMsg =
            "API endpoint not found. Please check the API URL configuration.";
        } else if (res.status === 400) {
          errMsg =
            data?.errors?.[0]?.msg ||
            data?.error ||
            data?.message ||
            "Invalid form data. Please check your input.";
        } else if (data?.error || data?.message) {
          errMsg = data.error || data.message;
        }

        showNotification(errMsg, "error");
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        return;
      }

      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      this.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    } catch (err) {
      // Network-level or unexpected error
      let errMsg = "Failed to send message. Please try again later.";

      if (err.name === "TypeError" && err.message.includes("fetch")) {
        errMsg = `Cannot connect to the server. Please check if the backend is running at ${apiUrl}. If deployed, make sure the API URL is configured correctly.`;
      } else if (err.message) {
        errMsg = err.message;
      }

      console.error("Contact form error:", err);
      showNotification(errMsg, "error");
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add loading styles
const loadingStyles = document.createElement("style");
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(loadingStyles);

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat h3");

  counters.forEach((counter) => {
    const originalText = counter.textContent;

    // Skip animation for infinity symbol and other non-numeric content
    if (
      originalText.includes("∞") ||
      isNaN(parseInt(originalText.replace(/\D/g, "")))
    ) {
      return; // Don't animate non-numeric stats
    }

    const target = parseInt(originalText.replace(/\D/g, ""));
    const suffix = originalText.replace(/\d/g, "");
    let current = 0;
    const increment = target / 50;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add smooth reveal animation for project cards
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
  card.classList.add("fade-in");
  observer.observe(card);
});

// Add hover effect to social links
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.1)";
  });

  link.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effect to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation styles
const rippleStyles = document.createElement("style");
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Note: Scroll handling is now done above with the navbar scroll behavior
