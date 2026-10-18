// Função para controlar o efeito sanfona e destaque dos cards
function toggleCard(cardElement) {
    const grid = cardElement.closest('.cards-grid');
    
    // Se o card clicado já estiver expandido, ele fecha e remove o foco dos outros
    if (cardElement.classList.contains('card-expanded')) {
        cardElement.classList.remove('card-expanded');
        grid.classList.remove('has-active');
    } else {
        // Remove a expansão de qualquer outro card na mesma grade
        grid.querySelectorAll('.skill-card').forEach(card => {
            card.classList.remove('card-expanded');
        });
        
        // Ativa o card clicado e escurece os demais da grade
        cardElement.classList.add('card-expanded');
        grid.classList.add('has-active');
    }
}

// Iguala a altura de todos os cards à altura dos cards da última seção
function equalizeCards() {
    const root = document.documentElement;
    root.style.removeProperty('--card-height');

    const grids = document.querySelectorAll('.cards-grid');
    const lastGrid = grids[grids.length - 1];
    let maxHeight = 0;

    lastGrid.querySelectorAll('.skill-card').forEach(card => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    root.style.setProperty('--card-height', maxHeight + 'px');
}

window.addEventListener('load', equalizeCards);
window.addEventListener('resize', equalizeCards);
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(equalizeCards);
}

// Foto de perfil: clique alterna entre círculo e retângulo
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
    profilePic.addEventListener('click', () => {
        profilePic.classList.toggle('profile-expanded');
    });
}