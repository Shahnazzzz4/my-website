/**
 * Travel India Website - JavaScript
 * Handles navigation, form validation, FAQ accordion, mobile menu, page transitions, and smooth scrolling
 */

// ========================================
// DOM Elements (with null checks)
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const faqItems = document.querySelectorAll('.faq-item');

// ========================================
// Navbar Scroll Effect
// ========================================
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// Form Validation Functions
// ========================================

/**
 * Validate name field
 * @param {string} name - Name value to validate
 * @returns {boolean} - True if valid
 */
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
}

/**
 * Validate email field
 * @param {string} email - Email value to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone value to validate
 * @returns {boolean} - True if valid
 */
function validatePhone(phone) {
    // Accepts: +91XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, XXXXXXXXXX (10 digits)
    const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate subject field
 * @param {string} subject - Subject value to validate
 * @returns {boolean} - True if valid
 */
function validateSubject(subject) {
    return subject.trim().length >= 5 && subject.trim().length <= 200;
}

/**
 * Validate message field
 * @param {string} message - Message value to validate
 * @returns {boolean} - True if valid
 */
function validateMessage(message) {
    return message.trim().length >= 10 && message.trim().length <= 1000;
}

/**
 * Show error message for a form field
 * @param {string} fieldId - ID of the field
 * @param {string} message - Error message to display
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = '#ef4444';
    }
}

/**
 * Clear error message for a form field
 * @param {string} fieldId - ID of the field
 */
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = '';
    }
}

// ========================================
// Real-time Form Validation (Contact Page Only)
// ========================================
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Name validation
if (nameInput) {
    nameInput.addEventListener('blur', () => {
        const name = nameInput.value;
        if (name && !validateName(name)) {
            showError('name', 'Please enter a valid name (2-50 characters, letters only)');
        } else {
            clearError('name');
        }
    });

    nameInput.addEventListener('input', () => {
        if (nameInput.value) {
            clearError('name');
        }
    });
}

// Email validation
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        if (email && !validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
        } else {
            clearError('email');
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value) {
            clearError('email');
        }
    });
}

// Phone validation
if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
        const phone = phoneInput.value;
        if (phone && !validatePhone(phone)) {
            showError('phone', 'Please enter a valid 10-digit Indian phone number');
        } else {
            clearError('phone');
        }
    });

    phoneInput.addEventListener('input', () => {
        if (phoneInput.value) {
            clearError('phone');
        }
    });
}

// Subject validation
if (subjectInput) {
    subjectInput.addEventListener('blur', () => {
        const subject = subjectInput.value;
        if (subject && !validateSubject(subject)) {
            showError('subject', 'Subject must be between 5 and 200 characters');
        } else {
            clearError('subject');
        }
    });

    subjectInput.addEventListener('input', () => {
        if (subjectInput.value) {
            clearError('subject');
        }
    });
}

// Message validation
if (messageInput) {
    messageInput.addEventListener('blur', () => {
        const message = messageInput.value;
        if (message && !validateMessage(message)) {
            showError('message', 'Message must be between 10 and 1000 characters');
        } else {
            clearError('message');
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value) {
            clearError('message');
        }
    });
}

// ========================================
// Form Submission Handler (Contact Page Only)
// ========================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(name)) {
        showError('name', 'Please enter a valid name (2-50 characters, letters only)');
        isValid = false;
    } else {
        clearError('name');
    }
    
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }
    
    if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid 10-digit Indian phone number');
        isValid = false;
    } else {
        clearError('phone');
    }
    
    if (!validateSubject(subject)) {
        showError('subject', 'Subject must be between 5 and 200 characters');
        isValid = false;
    } else {
        clearError('subject');
    }
    
    if (!validateMessage(message)) {
        showError('message', 'Message must be between 10 and 1000 characters');
        isValid = false;
    } else {
        clearError('message');
    }
    
    // If form is valid, show success popup
    if (isValid) {
        // In a real application, you would send the data to a server here
        // For now, we'll just show the success popup
        
        // Simulate form submission delay
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success modal
            modalOverlay.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Reset submit button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    } else {
            // Scroll to first error
        const firstError = contactForm.querySelector('.form-error[style*="block"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    });
}

// ========================================
// FAQ Accordion Functionality (Contact Page Only)
// ========================================
if (faqItems.length > 0) {
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other open FAQ items
                faqItems.forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
            });
        }
    });
}

// ========================================
// Modal/Popup Functionality (Contact Page Only)
// ========================================
if (closeModal && modalOverlay) {
    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            modalOverlay.classList.remove('show');
        }
    });
}

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#' || href === '#!') {
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Add Animation on Scroll (Optional Enhancement)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
// document.querySelectorAll('.contact-card, .feature-card, .faq-item, .destination-card, .highlight-card, .food-card, .info-card').forEach(el => {
//     el.style.opacity = '0';
//     el.style.transform = 'translateY(20px)';
//     el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//     observer.observe(el);
// });

// ========================================
// Page Transition Enhancement for Read Now Buttons
// ========================================
document.querySelectorAll('.read-now-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add smooth transition effect
        this.style.transform = 'scale(0.95)';
        
        // The page navigation will happen naturally via the href attribute
        // This just adds a visual feedback
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// ========================================
// Smooth Scroll to Top on Page Load (Destination Pages)
// ========================================
window.addEventListener('load', () => {
    // Smooth scroll to top with slight delay for better UX
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 100);
});

// ========================================
// Console Log (for debugging - remove in production)
// ========================================
console.log('Travel India Website - JavaScript Loaded Successfully');



(function(){
      const prevBtn = document.getElementById('prev');
      const nextBtn = document.getElementById('next');
      const track = document.getElementById('track');
      const carousel = document.getElementById('carousel');
      const cards = Array.from(track.children);

      // card width calculation (including gap)
      function cardStride() {
        const cardStyle = getComputedStyle(cards[0]);
        const gap = parseFloat(getComputedStyle(track).gap || 20);
        const w = cards[0].getBoundingClientRect().width;
        return w + gap;
      }

      let currentIndex = 0;

      function updateButtons() {
        // disable prev when first visible card is 0; disable next when last fully visible
        prevBtn.disabled = currentIndex <= 0;
        // compute max index allowed so that last card can be aligned left
        const visibleArea = carousel.getBoundingClientRect().width;
        const stride = cardStride();
        const maxIndex = Math.max(0, Math.ceil((track.scrollWidth - visibleArea) / stride));
        nextBtn.disabled = currentIndex >= maxIndex;
      }

      function scrollToIndex(idx, smooth=true){
        const stride = cardStride();
        const x = Math.round(idx * stride);
        track.style.transform = `translateX(${-x}px)`;
        currentIndex = idx;
        updateButtons();
      }

      // init
      window.addEventListener('load', ()=>{ updateButtons(); });

      nextBtn.addEventListener('click', ()=>{
        const visibleArea = carousel.getBoundingClientRect().width;
        const stride = cardStride();
        const maxIndex = Math.max(0, Math.ceil((track.scrollWidth - visibleArea) / stride));
        const nextIndex = Math.min(maxIndex, currentIndex + 1);
        scrollToIndex(nextIndex);
      });

      prevBtn.addEventListener('click', ()=>{
        const prevIndex = Math.max(0, currentIndex - 1);
        scrollToIndex(prevIndex);
      });

      // handle window resize (recalculate)
      let resizeTimer;
      window.addEventListener('resize', ()=>{
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(()=> {
          // keep current card aligned after resize
          scrollToIndex(currentIndex);
        },120);
      });

      // touch (swipe) support for mobile
      let startX = 0;
      let isTouch = false;
      carousel.addEventListener('touchstart', (e)=>{
        isTouch = true;
        startX = e.touches[0].clientX;
      }, {passive:true});

      carousel.addEventListener('touchmove', (e)=>{
        if(!isTouch) return;
        const dx = e.touches[0].clientX - startX;
        // gentle move while swiping
        track.style.transform = `translateX(${ -currentIndex * cardStride() + ( -dx ) }px)`;
      }, {passive:true});

      carousel.addEventListener('touchend', (e)=>{
        isTouch = false;
        const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
        const dx = endX - startX;
        const threshold = 50; // px to trigger swipe
        if(dx < -threshold) { // swipe left -> next
          nextBtn.click();
        } else if(dx > threshold) { // swipe right -> prev
          prevBtn.click();
        } else {
          // just snap back
          scrollToIndex(currentIndex);
        }
      });

      // keyboard support (Left/Right)
      carousel.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowRight') nextBtn.click();
        if(e.key === 'ArrowLeft') prevBtn.click();
      });

      // ensure initial transform is set (in case CSS transitions)
      scrollToIndex(0);
    })();
