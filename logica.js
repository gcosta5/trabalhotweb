// ===============================
// TABS (Carros / Carrinhas)
// ===============================
const buttons = document.querySelectorAll('.tab');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===============================
// BOOKING FIXO AO SCROLL
// ===============================
const bookingBox = document.querySelector('.booking-box');
const bookingTrigger = window.innerHeight * 0.6;

window.addEventListener('scroll', () => {
    if (window.scrollY > bookingTrigger) {
        bookingBox.classList.add('fixed');
    } else {
        bookingBox.classList.remove('fixed');
    }
});

// ===============================
// MENU SANDUÍCHE (FUNCIONAL)
// ===============================
const hamburgerBtn = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('menu-overlay');

hamburgerBtn.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
});

document.querySelectorAll('.side-menu a').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  });
});
