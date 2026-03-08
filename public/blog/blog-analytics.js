(function () {
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) return;

  // Derive current post slug from URL path
  var parts = window.location.pathname.replace(/\/$/, '').split('/');
  var slug = parts[parts.length - 1] || 'blog-index';

  function track(name, data) {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(name, data);
    }
  }

  document.addEventListener('click', function (e) {
    var t = e.target;

    // Sticky bar CTA button
    if (t.closest('.sticky-bar-btn') || (t.closest('.sticky-bar') && t.closest('a'))) {
      track('blog_cta_sticky', { post: slug });
      return;
    }

    // CTA block button
    if (t.closest('.cta-block') && t.closest('a')) {
      track('blog_cta_block', { post: slug });
      return;
    }

    // Inline CTA button
    if (t.closest('.inline-cta') && t.closest('a')) {
      track('blog_cta_inline', { post: slug });
      return;
    }

    // Blog index card click — extract target post slug from href
    var card = t.closest('.blog-card');
    if (card) {
      var href = card.getAttribute('href') || '';
      var cardSlug = (href.split('/blog/')[1] || '').replace(/\/$/, '') || 'unknown';
      track('blog_card_click', { post: cardSlug });
      return;
    }

    // Related post card click
    var relCard = t.closest('.related-card');
    if (relCard) {
      var relHref = relCard.getAttribute('href') || '';
      var relSlug = (relHref.split('/blog/')[1] || '').replace(/\/$/, '') || 'unknown';
      track('blog_related_click', { from: slug, to: relSlug });
    }
  });
})();
