document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        {
            src: 'seimei.jpg',
            title: '生命の樹',
            detail: '第三回AIアートフェスティバル佳作'
        },
        {
            src: '72.jpg',
            title: 'カードゲームスターフロンティア',
            detail: '' 
        },
        {
            src: '0_1_8.jpg',
            title: '龍尊王',
            detail: 'BuddhaDrawingアプリ用AIイラスト'
        }
    ];

    let currentIndex = 0;
    const totalSlides = slides.length;

    // DOM Elements
    const mainImage = document.getElementById('current-image');
    const imageTitle = document.getElementById('image-title');
    const imageDetail = document.getElementById('image-detail');
    const bgLayer = document.getElementById('bg-layer');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('indicators');

    // Initialize Indicators
    slides.forEach((_, index) => {
        const span = document.createElement('span');
        span.classList.add('indicator');
        if (index === 0) span.classList.add('active');
        span.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(span);
    });

    const indicators = document.querySelectorAll('.indicator');

    function updateSlide(index) {
        // Update Content
        const slide = slides[index];
        mainImage.src = slide.src;
        imageTitle.textContent = slide.title;
        imageDetail.textContent = slide.detail;

        // Update Background (Blurred)
        bgLayer.style.backgroundImage = `url('${slide.src}')`;

        // Update Indicators
        indicators.forEach((ind, i) => {
            if (i === index) ind.classList.add('active');
            else ind.classList.remove('active');
        });

        // Trigger Animations
        triggerTextAnimation();
    }

    function triggerTextAnimation() {
        // Reset animation by removing and re-adding class
        imageTitle.classList.remove('fade-in-up');
        imageDetail.classList.remove('fade-in-up');
        
        void imageTitle.offsetWidth; // Trigger reflow
        
        imageTitle.classList.add('fade-in-up');
        imageDetail.classList.add('fade-in-up');
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }
        updateSlide(currentIndex);
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        }
    });

    // Auto Play
    let autoPlayInterval;

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Initial Load
    updateSlide(0);
    startAutoPlay();
});
