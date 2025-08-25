'use strict';

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add blinking cursor after typing is complete
      element.innerHTML += '<span class="typewriter-cursor"></span>';
    }
  }
  
  type();
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
let currentTheme = 'light';
try {
  // Use a simple variable instead of localStorage
  if (body.classList.contains('dark-mode')) {
    currentTheme = 'dark';
  }
} catch (e) {
  // Fallback if storage isn't available
  currentTheme = 'light';
}

// Theme toggle event listener
themeToggle.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
  
  // Add animation effect
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 200);
});

// Initialize typewriter effect when page loads
document.addEventListener('DOMContentLoaded', function() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    typeWriter(typewriterElement, "Hi, I'm Nihar Atri!", 250); // Even slower typing speed
  }
});

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Remove active class from all pages and nav links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(link => link.classList.remove("active"));
    
    // Add active class to clicked nav link and corresponding page
    const targetPage = this.innerHTML.toLowerCase();
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === targetPage) {
        pages[j].classList.add("active");
        this.classList.add("active");
        window.scrollTo(0, 0);
        
        // Trigger progressive loading animation for the active page
        setTimeout(() => {
          animatePageContent(pages[j]);
        }, 100);
        break;
      }
    }
  });
}

// Portfolio filter functionality
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Filter function
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Add event to all filter buttons
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Expand/Collapse functionality for timeline items
function toggleExpand(contentId, button) {
  const content = document.getElementById(contentId);
  const icon = button.querySelector('ion-icon');
  const text = button.querySelector('span');
  
  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    button.classList.remove('expanded');
    text.textContent = 'Show Details';
  } else {
    content.classList.add('expanded');
    button.classList.add('expanded');
    text.textContent = 'Hide Details';
  }
}

// Contact form functionality
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // Check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state to button
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      formBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Message Sent!</span>';
      formBtn.style.background = '#4caf50';
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
        formBtn.style.background = '';
        formBtn.disabled = true;
      }, 2000);
    }, 1500);
  });
}

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Progressive loading animation function
function animatePageContent(page) {
  // Get all elements to animate
  const skillsItems = page.querySelectorAll('.skills-item');
  const timelineItems = page.querySelectorAll('.timeline-item');
  const hobbyCards = page.querySelectorAll('.hobby-card');
  const projectItems = page.querySelectorAll('.project-item');
  const courseworkCategories = page.querySelectorAll('.coursework-category');
  const profileSection = page.querySelector('.profile-section');
  const aboutContent = page.querySelector('.about-content');
  const experienceNavSidebar = page.querySelector('.experience-nav-sidebar');
  
  // Reset all elements to initial state
  const allElements = [...skillsItems, ...timelineItems, ...hobbyCards, ...projectItems, ...courseworkCategories, profileSection, aboutContent, experienceNavSidebar].filter(Boolean);
  allElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'none';
  });
  
  // Animate ALL elements simultaneously after a brief delay
  setTimeout(() => {
    allElements.forEach((element) => {
      element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
    
    // Also animate experience nav sidebar if it exists
    if (experienceNavSidebar) {
      experienceNavSidebar.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      experienceNavSidebar.style.opacity = '1';
      experienceNavSidebar.style.transform = 'translateX(0)';
    }
  }, 100);
  
  // Special handling for skill bars - animate after all content has appeared
  const skillsSection = page.querySelector('.skills-list');
  if (skillsSection && skillsItems.length > 0) {
    setTimeout(() => {
      const skillBars = skillsSection.querySelectorAll('.skill-progress-fill');
      skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100 + (index * 50)); // Faster skill bar animation
      });
    }, 900); // Start after all content has appeared (100ms + 800ms animation duration)
  }
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  // Initially hide all content elements
  const allContentElements = document.querySelectorAll('.timeline-item, .skills-item, .hobby-card, .project-item, .coursework-category, .profile-section, .about-content, .experience-nav-sidebar');
  allContentElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'none';
  });
  
  // Animate the initially active page (About Me)
  const activePage = document.querySelector('[data-page].active');
  if (activePage) {
    setTimeout(() => {
      animatePageContent(activePage);
    }, 500); // Start animation after typewriter effect begins
  }
  
  // Ensure experience nav sidebar is properly positioned
  const experienceSidebar = document.querySelector('.experience-nav-sidebar');
  if (experienceSidebar) {
    experienceSidebar.style.top = '50%';
    experienceSidebar.style.transform = 'translateY(-50%) translateX(-20px)';
  }
  
  // Remove the old individual element animations since they're now handled by animatePageContent
  // The hobby cards and project items will be animated by the new function
  
  // Animate skill bars when they come into view
  const skillsSection = document.querySelector('.skills-list');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-progress-fill');
          skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 200 + (index * 100));
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    skillObserver.observe(skillsSection);
  }
  
  // Note: Hobby cards and project items are now animated by animatePageContent function
  // when their respective pages become active
});

// Add hover effect to social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.1)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Toggle theme with keyboard shortcut (Ctrl/Cmd + Shift + L)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
    themeToggle.click();
  }
  
  // Navigate between tabs with arrow keys
  const activeNavIndex = Array.from(navigationLinks).findIndex(link => 
    link.classList.contains('active')
  );
  
  if (e.key === 'ArrowRight' && activeNavIndex < navigationLinks.length - 1) {
    navigationLinks[activeNavIndex + 1].click();
  } else if (e.key === 'ArrowLeft' && activeNavIndex > 0) {
    navigationLinks[activeNavIndex - 1].click();
  }
});

// Experience Navigation Functionality
const experienceNavLinks = document.querySelectorAll('.experience-nav-link');

experienceNavLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from all links
    experienceNavLinks.forEach(l => l.classList.remove('active'));
    
    // Add active class to clicked link
    this.classList.add('active');
    
    // Get target section
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Update active nav link based on scroll position
function updateExperienceNav() {
  const sections = document.querySelectorAll('#professional-experience, #extracurricular-experience, #teaching-experience');
  const navLinks = document.querySelectorAll('.experience-nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSection = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Add scroll event listener for experience page
document.addEventListener('scroll', function() {
  const experiencePage = document.querySelector('[data-page="experience"]');
  if (experiencePage && experiencePage.classList.contains('active')) {
    updateExperienceNav();
  }
});

console.log('Portfolio initialized successfully! Theme:', currentTheme);

// Project Modal Functionality
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const projectItems = document.querySelectorAll('.project-item');

// Project data
const projectData = {
  'Amazon Recommendation Engine': {
    description: 'Built a recommendation system that recommends products to Amazon customers based on their review history.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'NumPy', 'Seaborn', 'LightFM'],
    github: 'https://github.com/NiharAtri03/Amazon-Product-Recommendation-System'
  },
  'NFL Injury Predictor': {
    description: 'Built a machine learning model that predicts NFL player injury severity based on historical data, player statistics, and game conditions.',
    technologies: ['Python', 'Pandas', 'Numpy', 'Scikit-learn', 'Seaborn'],
    github: 'https://github.com/NiharAtri03/NFL-Injury-Analysis'
  },
  'Eventura': {
    description: 'Developed a event management platform where users can buy/sell tickets for nearby events.',
    technologies: ['Python', 'SQLAlchemy', 'SQLite', 'Streamlit'],
    github: 'https://github.com/NiharAtri03/Eventura'
  },
  'Shell Project': {
    description: 'Built a Linux Shell replica that handles basic Shell functionality (commands, subshells, background processing, signal handling, wildcarding).',
    technologies: ['C', 'C++', 'Flex (lexer)', 'Bison (parser)', 'Linux'],
    github: 'https://github.com/NiharAtri03/Custom_Linux_Shell'
  },
  'HIV/AIDS Life Expectancy Analysis': {
    description: 'Analyzed the statistical relationship between HIV/AIDS and life expectancy.',
    technologies: ['R'],
    github: 'https://docs.google.com/presentation/d/1HreWP0Z-ZPmHmlTcjcmTvY_vENw6M6Agfcdsa2x1iT8/edit?usp=sharing'
  },
  'Text Summarizer': {
    description: 'Built a text summarizer that uses natural language processing to generate concise and coheren summaries.',
    technologies: ['Python', 'Pandas', 'spaCy', 'NLTK', 'Streamlit'],
  },
  'My GPT': {
    description: 'Implemented a basic transformer architecture (based on GPT) from scratch to create a chatbot.',
    technologies: ['Python', 'PyTorch', 'Tiktoken (tokenizer)'],
    github: 'https://github.com/NiharAtri03/my_gpt'
  }
};

// Function to open modal
function openProjectModal(projectTitle, imageSrc) {
  const project = projectData[projectTitle];
  if (project) {
    // Set modal content
    document.getElementById('modal-title').textContent = projectTitle;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal-image').alt = projectTitle;
    document.getElementById('github-link').href = project.github;
    
    // Create technology tags
    const techTagsContainer = document.getElementById('tech-tags');
    techTagsContainer.innerHTML = '';
    project.technologies.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      techTagsContainer.appendChild(tag);
    });
    
    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Function to close modal
function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Add click event listeners to project items
projectItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const projectTitle = item.querySelector('.project-title').textContent;
    const imageSrc = item.querySelector('img').src;
    openProjectModal(projectTitle, imageSrc);
  });
});

// Close modal events
modalClose.addEventListener('click', closeProjectModal);

projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});
