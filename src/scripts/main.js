
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    const technologies = [
        { name: 'HTML', src: 'https://cdn.simpleicons.org/html5/E34F26' },
        { name: 'CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', src: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'Tailwind', src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { name: 'PHP', src: 'https://cdn.simpleicons.org/php/777BB4' },
        { name: 'Laravel', src: 'https://cdn.simpleicons.org/laravel/FF2D20' },
        { name: 'MySQL', src: 'https://cdn.simpleicons.org/mysql/4479A1' },
        { name: 'SQL Server', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
        { name: 'MongoDB', src: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Selenium', src: 'https://cdn.simpleicons.org/selenium/43B02A' },
        { name: 'Cucumber', src: 'https://cdn.simpleicons.org/cucumber/23D96C' }
    ];

    const heroBg = document.getElementById('heroBg');
    const heroSection = document.getElementById('hero');
    const heroPhoto = document.getElementById('heroPhoto');

    if (!heroBg || !heroSection) return;

    function createTechLogos() {
        technologies.forEach((tech) => {
            const logo = document.createElement('div');
            logo.className = 'tech-logo';
            logo.style.left = `${8 + Math.random() * 84}%`;
            logo.style.top = `${8 + Math.random() * 84}%`;

            const img = document.createElement('img');
            img.className = 'tech-logo-img';
            img.src = tech.src;
            img.alt = tech.name;
            img.loading = 'lazy';

            logo.appendChild(img);
            heroBg.appendChild(logo);
        });
    }

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        heroSection.style.setProperty('--mouse-x', `${x}%`);
        heroSection.style.setProperty('--mouse-y', `${y}%`);

        const logos = heroSection.querySelectorAll('.tech-logo');
        logos.forEach(logo => {
            const logoRect = logo.getBoundingClientRect();
            const logoCenterX = logoRect.left + logoRect.width / 2;
            const logoCenterY = logoRect.top + logoRect.height / 2;
            const distance = Math.hypot(e.clientX - logoCenterX, e.clientY - logoCenterY);

            if (distance < 140) {
                const angle = Math.atan2(logoCenterY - e.clientY, logoCenterX - e.clientX);
                const pushDistance = 22;
                logo.style.transform = `translate(${Math.cos(angle) * pushDistance}px, ${Math.sin(angle) * pushDistance}px) scale(1.08)`;
            } else {
                logo.style.transform = 'translate(0, 0) scale(1)';
            }
        });

        if (heroPhoto) {
            const dx = (x - 50) * 0.12;
            const dy = (y - 50) * 0.10;
            heroPhoto.style.transform = `translate(${dx}px, ${dy}px)`;
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        heroSection.querySelectorAll('.tech-logo').forEach(logo => {
            logo.style.transform = 'translate(0, 0) scale(1)';
        });

        if (heroPhoto) {
            heroPhoto.style.transform = 'translate(0, 0)';
        }
    });

    createTechLogos();
});