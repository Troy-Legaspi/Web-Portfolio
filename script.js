document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.project-card');
    const btnRight = document.querySelector('.arrow.right');
    const btnLeft = document.querySelector('.arrow.left');

    let index = 0;

    function updateActiveCard() {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        // --- MOBILE FIX: disable forced centering ---
        if (window.innerWidth <= 480) {
            // Do NOT center cards on mobile (allows natural carousel)
            return;
        }

        // --- DESKTOP ONLY: center active card ---
        cards[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    btnRight.addEventListener('click', () => {
        index = (index + 1) % cards.length;
        updateActiveCard();
    });

    btnLeft.addEventListener('click', () => {
        index = (index - 1 + cards.length) % cards.length;
        updateActiveCard();
    });

    updateActiveCard();
});
