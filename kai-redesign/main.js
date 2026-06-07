/* ================================================================
   KAI REDESIGN — main.js
   jQuery + Vanilla JS interactions
   ================================================================ */

$(document).ready(function () {

  /* ── Navbar scroll ─────────────────────────────────────────── */
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 20);
  });

  /* ── Hamburger mobile menu ──────────────────────────────────── */
  $('#hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('#mobileMenu').toggleClass('open');
  });

  /* ── Close mobile menu on link click ───────────────────────── */
  $('#mobileMenu a').on('click', function () {
    $('#hamburger').removeClass('open');
    $('#mobileMenu').removeClass('open');
  });

  /* ── Search tabs (Sekali Jalan / Pulang Pergi) ──────────────── */
  $(document).on('click', '.stab', function () {
    $(this).siblings('.stab').removeClass('active');
    $(this).addClass('active');
  });

  /* ── Promo filter tabs ──────────────────────────────────────── */
  $(document).on('click', '.pfbtn', function () {
    $(this).siblings('.pfbtn').removeClass('active');
    $(this).addClass('active');
  });

  /* ── Swap stasiun asal ↔ tujuan ─────────────────────────────── */
  $(document).on('click', '.swap-btn', function () {
    var $form = $(this).closest('.sform, .filter-form');
    var $inputs = $form.find('input[type="text"]');
    if ($inputs.length >= 2) {
      var tmp = $inputs.eq(0).val();
      $inputs.eq(0).val($inputs.eq(1).val());
      $inputs.eq(1).val(tmp);
    }
  });

  /* ── Train card select ──────────────────────────────────────── */
  $(document).on('click', '.btn-pilih', function () {
    var $card = $(this).closest('.tcard');
    $('.tcard').removeClass('picked');
    $card.addClass('picked');
    // update summary name
    var name = $card.find('.tname').text();
    var price = $card.find('.tprice').text();
    $('#sum-kereta').text(name);
    $('#sum-harga').text(price);
    updateTotal();
  });

  /* ── Update total price ─────────────────────────────────────── */
  function updateTotal() {
    var harga = parseInt($('#sum-harga').text().replace(/\D/g, '')) || 185000;
    var admin = 7500;
    var total = harga + admin;
    $('#sum-admin').text('Rp ' + admin.toLocaleString('id-ID'));
    $('#sum-total').text('Rp ' + total.toLocaleString('id-ID'));
  }

  /* ── FAQ accordion ──────────────────────────────────────────── */
  $(document).on('click', '.fq', function () {
    var $item = $(this).closest('.fitem');
    var isOpen = $item.hasClass('open');
    $('.fitem').removeClass('open');
    if (!isOpen) $item.addClass('open');
  });

  /* ── Set default date = today ───────────────────────────────── */
  var today = new Date().toISOString().split('T')[0];
  $('input[type="date"]').each(function () {
    if (!$(this).val()) $(this).val(today);
  });

  /* ── Animate sections on scroll (IntersectionObserver) ─────── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target).css({ opacity: 1, transform: 'translateY(0)' });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    $('.pcard, .icard, .bcard, .tcard, .kcard, .pcard-full, .ccard').each(function () {
      $(this).css({ opacity: 0, transform: 'translateY(20px)', transition: 'opacity .5s ease, transform .5s ease' });
      io.observe(this);
    });
  }

  /* ── Smooth scroll anchor links ─────────────────────────────── */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');
    if ($(target).length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(target).offset().top - 80 }, 500);
    }
  });

  /* ── Booking: step progression ──────────────────────────────── */
  $('#btn-lanjut').on('click', function () {
    window.location.href = 'booking.html';
  });

});
