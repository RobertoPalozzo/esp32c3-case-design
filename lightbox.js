(function () {
    // Build overlay DOM
    const overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.innerHTML =
        '<button id="lightbox-close" aria-label="Close">&times;</button>' +
        '<figure>' +
        '<img id="lightbox-img" src="" alt="" />' +
        '<figcaption id="lightbox-caption"></figcaption>' +
        '</figure>';
    document.body.appendChild(overlay);

    const img     = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const btn     = document.getElementById('lightbox-close');

    function open(src, alt, text) {
        img.src         = src;
        img.alt         = alt;
        caption.textContent = text;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        img.src = '';
    }

    // Attach click to every photo-item image
    document.querySelectorAll('.photo-item img').forEach(function (el) {
        el.style.cursor = 'zoom-in';
        el.addEventListener('click', function () {
            const caption = el.closest('figure').querySelector('figcaption');
            open(el.src, el.alt, caption ? caption.textContent : '');
        });
    });

    // Close on button, overlay background, or Escape
    btn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });
})();
