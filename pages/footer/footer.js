document.querySelectorAll('.footer-socialmedia-links').forEach(link => {
    link.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        window.open(url, '_blank');
    });
});