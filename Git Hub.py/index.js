
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            if (mobileMenuToggle) {
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Testimonials Carousel Functionality
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const indicators = Array.from(document.querySelectorAll('.indicator'));

        const updateSlidePosition = (slideWidth, targetSlide) => {
            track.style.transform = `translateX(-${targetSlide.style.left})`
        };

        // Arrange slides next to one another
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });

        const moveToSlide = (currentSlide, targetSlide, targetIndex) => {
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const updateIndicators = (targetIndex) => {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('current-indicator', index === targetIndex);
            });
        };

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                const currentSlide = track.querySelector('.current-slide');
                let nextSlide = currentSlide.nextElementSibling;
                let targetIndex = slides.indexOf(nextSlide);

                if (!nextSlide) {
                    nextSlide = slides[0];
                    targetIndex = 0;
                }

                moveToSlide(currentSlide, nextSlide, targetIndex);
                updateIndicators(targetIndex);
            });

            prevButton.addEventListener('click', () => {
                const currentSlide = track.querySelector('.current-slide');
                let prevSlide = currentSlide.previousElementSibling;
                let targetIndex = slides.indexOf(prevSlide);

                if (!prevSlide) {
                    prevSlide = slides[slides.length - 1];
                    targetIndex = slides.length - 1;
                }

                moveToSlide(currentSlide, prevSlide, targetIndex);
                updateIndicators(targetIndex);
            });

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    const currentSlide = track.querySelector('.current-slide');
                    const targetSlide = slides[index];
                    moveToSlide(currentSlide, targetSlide, index);
                    updateIndicators(index);
                });
            });
        }
    }

    // Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});