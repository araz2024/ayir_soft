/**
 * AIRSOFT - JavaScript
 * Languages: AZ, EN, RU
 */

// =========================================
// LANGUAGE SYSTEM
// =========================================

let currentLanguage = 'az';

const messages = {
    az: {
        formSuccess: 'Təşəkkür edirik! Tezliklə sizinlə əlaqə saxlayacağıq!',
        regSuccess: 'Qeydiyyat uğurla tamamlandı! AIRSOFT-a xoş gəlmisiniz!',
        formError: 'Zəhmət olmasa bütün tələb olunan sahələri düzgün doldurun.',
        sending: 'Göndərilir...',
        dataTransmission: 'MƏLUMAT ÖTÜRÜLMƏSİ'
    },
    en: {
        formSuccess: 'Thank you! We will contact you soon!',
        regSuccess: 'Registration successful! Welcome to AIRSOFT!',
        formError: 'Please fill in all required fields correctly.',
        sending: 'Sending...',
        dataTransmission: 'DATA TRANSMISSION'
    },
    ru: {
        formSuccess: 'Спасибо! Мы свяжемся с вами в ближайшее время!',
        regSuccess: 'Регистрация успешна! Добро пожаловать в AIRSOFT!',
        formError: 'Пожалуйста, заполните все обязательные поля корректно.',
        sending: 'Отправка...',
        dataTransmission: 'ПЕРЕДАЧА ДАННЫХ'
    }
};

// =========================================
// GALLERY FUNCTIONS (Global)
// =========================================

const galleryImages = [
    'images/gallery-1.jpg',
    'images/gallery-2.jpg',
    'images/gallery-3.jpg',
    'images/gallery-4.jpg',
    'images/gallery-5.jpg',
    'images/gallery-6.jpg',
    'images/gallery-7.jpg',
    'images/gallery-8.jpg',
    'images/gallery-9.jpg',
    'images/gallery-10.jpg',
    'images/gallery-11.jpg',
    'images/gallery-12.jpg',
    'images/gallery-13.jpg',
    'images/gallery-14.jpg',
    'images/gallery-15.jpg',
    'images/gallery-16.jpg',
    'images/gallery-17.jpg',
    'images/gallery-18.jpg',
    'images/gallery-19.jpg',
    'images/gallery-20.jpg',
    'images/gallery-21.jpg'
];

let currentImageIndex = 0;

function openGallery(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    
    lightboxImg.src = galleryImages[index];
    document.getElementById('currentIndex').textContent = index + 1;
    document.getElementById('totalImages').textContent = galleryImages.length;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightboxImage');
    lightboxImg.src = galleryImages[currentImageIndex];
    document.getElementById('currentIndex').textContent = currentImageIndex + 1;
}

// =========================================
// MODAL FUNCTIONS (Global)
// =========================================

function openModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Применяем текущий язык к модальному окну
        modal.querySelectorAll('[data-az]').forEach(element => {
            const text = element.getAttribute('data-' + currentLanguage);
            if (text) {
                element.textContent = text;
            }
        });
    }
}

function closeModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Меняет язык интерфейса
 * @param {string} lang - Код языка (en, az)
 * @param {HTMLElement} btn - Кнопка, которая была нажата
 */
function changeLanguage(lang, btn) {
    currentLanguage = lang;

    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.remove('active');
    });
    if (btn) {
        btn.classList.add('active');
    }

    // Переводим все элементы с data-атрибутами
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Обновляем lang атрибут html
    document.documentElement.lang = lang;

    // Обновляем заголовок формы
    const formContainers = document.querySelectorAll('.form-container');
    formContainers.forEach(container => {
        container.setAttribute('data-title', messages[lang].dataTransmission);
    });

    // Сохраняем выбор языка
    localStorage.setItem('preferredLanguage', lang);
}

// =========================================
// FORM HANDLING
// =========================================

/**
 * Валидация email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Валидация телефона
 */
function isValidPhone(phone) {
    if (!phone) return true;
    const re = /^[0-9+\-\s()]{7,20}$/;
    return re.test(phone);
}

/**
 * Показывает ошибку
 */
function showError(field) {
    field.classList.add('error');
    field.closest('.form-group').classList.add('has-error');
}

/**
 * Скрывает ошибку
 */
function hideError(field) {
    field.classList.remove('error');
    field.closest('.form-group').classList.remove('has-error');
}

/**
 * Валидация контактной формы
 */
function validateContactForm(form) {
    let isValid = true;
    
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const message = form.querySelector('#message');

    if (!name.value.trim()) {
        showError(name);
        isValid = false;
    } else {
        hideError(name);
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email);
        isValid = false;
    } else {
        hideError(email);
    }

    if (phone && phone.value && !isValidPhone(phone.value)) {
        showError(phone);
        isValid = false;
    } else if (phone) {
        hideError(phone);
    }

    if (!message.value.trim()) {
        showError(message);
        isValid = false;
    } else {
        hideError(message);
    }

    return isValid;
}

/**
 * Валидация формы регистрации
 */
function validateRegistrationForm(form) {
    let isValid = true;
    
    const name = form.querySelector('#reg-name');
    const phone = form.querySelector('#reg-phone');
    const email = form.querySelector('#reg-email');
    const experience = form.querySelector('#reg-experience');

    if (!name.value.trim()) {
        showError(name);
        isValid = false;
    } else {
        hideError(name);
    }

    if (!phone.value.trim() || !isValidPhone(phone.value)) {
        showError(phone);
        isValid = false;
    } else {
        hideError(phone);
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email);
        isValid = false;
    } else {
        hideError(email);
    }

    if (!experience.value) {
        showError(experience);
        isValid = false;
    } else {
        hideError(experience);
    }

    return isValid;
}

/**
 * Обработчик контактной формы
 */
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    if (!validateContactForm(form)) {
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = messages[currentLanguage].sending;

    setTimeout(() => {
        alert(messages[currentLanguage].formSuccess);
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1000);
}

/**
 * Обработчик формы регистрации
 */
function handleRegistrationForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    if (!validateRegistrationForm(form)) {
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = messages[currentLanguage].sending;

    setTimeout(() => {
        alert(messages[currentLanguage].regSuccess);
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        closeModal();
    }, 1000);
}

// =========================================
// COUNTER ANIMATION
// =========================================

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// =========================================
// SMOOTH SCROLL
// =========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =========================================
// INITIALIZATION
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохранённый язык
    const savedLang = localStorage.getItem('preferredLanguage') || 'az';
    const langButtons = document.querySelectorAll('.lang-btn');
    const langIndex = { az: 0, en: 1, ru: 2 };
    
    if (langButtons[langIndex[savedLang]]) {
        changeLanguage(savedLang, langButtons[langIndex[savedLang]]);
    }

    // Форма регистрации
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationForm);
        registrationForm.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('input', () => hideError(field));
            field.addEventListener('change', () => hideError(field));
        });
    }

    // Закрытие модального окна по клику вне окна
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('registrationModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие модального окна по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeGallery();
        }
        // Стрелки для галереи
        if (document.getElementById('galleryLightbox').classList.contains('active')) {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });

    // Закрытие галереи по клику на фон
    const lightbox = document.getElementById('galleryLightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeGallery();
            }
        });
    }

    // Счётчики
    initCounters();

    // Плавный скролл
    initSmoothScroll();
});

// =========================================
// SCROLL ANIMATIONS
// =========================================

window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.card, .achievement');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
