/**
 * CodeTech - Main JavaScript
 * Delegação de eventos no document para compatibilidade com conteúdo dinâmico
 */

(function() {
    'use strict';

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mainNav = document.querySelector('.header__nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isOpen = mainNav.classList.toggle('is-open');
            this.setAttribute('aria-expanded', isOpen);
        });
    }

    // ===== DROPDOWN - Event Delegation =====
    // Usa delegação no document para garantir que handlers não quebrem
    // mesmo se elementos forem recriados dinamicamente
    document.addEventListener('click', function(event) {
        const dropdownToggle = event.target.closest('.nav__dropdown-toggle');
        
        if (dropdownToggle) {
            event.preventDefault();
            const dropdownItem = dropdownToggle.closest('.nav__item--dropdown');
            
            if (dropdownItem) {
                const isOpen = dropdownItem.classList.toggle('is-open');
                dropdownToggle.setAttribute('aria-expanded', isOpen);
            }
            return;
        }

        // Fecha dropdowns ao clicar fora
        const openDropdowns = document.querySelectorAll('.nav__item--dropdown.is-open');
        openDropdowns.forEach(function(dropdown) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('is-open');
                const toggle = dropdown.querySelector('.nav__dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ===== CLOSE MOBILE MENU ON LINK CLICK =====
    document.addEventListener('click', function(event) {
        const navLink = event.target.closest('.nav__link:not(.nav__dropdown-toggle)');
        
        if (navLink && mainNav && mainNav.classList.contains('is-open')) {
            mainNav.classList.remove('is-open');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ===== ESCAPE KEY HANDLER =====
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Fecha menu mobile
            if (mainNav && mainNav.classList.contains('is-open')) {
                mainNav.classList.remove('is-open');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.focus();
                }
            }

            // Fecha dropdowns
            const openDropdowns = document.querySelectorAll('.nav__item--dropdown.is-open');
            openDropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('is-open');
                const toggle = dropdown.querySelector('.nav__dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });
        }
    });
})();