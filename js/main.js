/**
 * Portfolio Website - Main JavaScript File
 * Author: Mae Cacao
 * Description: Handles carousel, dark mode, navigation, and typewriter effects
 */

// =============================================================================
// DOM CONTENT LOADED - Initialize all functionality
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeDarkMode();
    initializeBurgerMenu();
    initializeTypewriter();
});

// =============================================================================
// CAROUSEL FUNCTIONALITY
// =============================================================================
let currentSlide = 0;
const totalSlides = 3;

function initializeCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Check if carousel elements exist
    if (!carouselTrack || !prevBtn || !nextBtn) {
        console.warn('Carousel elements not found');
        return;
    }

    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners for arrow buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
}

// =============================================================================
// DARK MODE FUNCTIONALITY
// =============================================================================
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    const html = document.documentElement;

    // Check if dark mode elements exist
    if (!darkModeToggle || !toggleIcon) {
        console.warn('Dark mode elements not found');
        return;
    }

    // SVG paths for moon and sun icons
    const moonPath = 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z';
    const sunPath = 'M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z';

    // Check for saved dark mode preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        html.classList.add('dark');
        toggleIcon.querySelector('path').setAttribute('d', sunPath);
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        
        if (html.classList.contains('dark')) {
            toggleIcon.querySelector('path').setAttribute('d', sunPath);
            localStorage.setItem('theme', 'dark');
        } else {
            toggleIcon.querySelector('path').setAttribute('d', moonPath);
            localStorage.setItem('theme', 'light');
        }
    });
}

// =============================================================================
// BURGER MENU FUNCTIONALITY
// =============================================================================
function initializeBurgerMenu() {
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');
    const closeButton = document.getElementById('close');

    // Check if burger menu elements exist
    if (!burger || !mobileNav || !closeButton) {
        console.warn('Burger menu elements not found');
        return;
    }

    // Open mobile menu when burger is clicked
    burger.addEventListener('click', () => {
        console.log('Burger clicked!');
        mobileNav.classList.remove('hidden');
        mobileNav.classList.add('flex', 'flex-col');
        burger.setAttribute('aria-expanded', 'true');
        console.log('Menu opened');
    });

    // Close mobile menu when close button is clicked
    closeButton.addEventListener('click', () => {
        console.log('Close button clicked!');
        mobileNav.classList.add('hidden');
        mobileNav.classList.remove('flex', 'flex-col');
        burger.setAttribute('aria-expanded', 'false');
        console.log('Menu closed');
    });

    // Close menu when a navigation link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Menu link clicked, closing menu');
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('flex', 'flex-col');
            burger.setAttribute('aria-expanded', 'false');
        });
    });
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Smooth scroll to section with offset for fixed navigation
 * @param {string} targetId - The ID of the target section
 */
function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const offset = 80; // Adjust based on your navigation height
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Log initialization status
 */
console.log('Portfolio JavaScript initialized successfully');
