// Menu hamburger (mobile)
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
const menuLinks = menu.querySelectorAll('a');

menuBtn.addEventListener('click', () => {
  const terbuka = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', terbuka);
});
menuLinks.forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// Tema gelap/terang, pilihan disimpan di localStorage
const root = document.documentElement;
const temaTersimpan = localStorage.getItem('tema');
if (temaTersimpan) {
  root.dataset.theme = temaTersimpan;
} else if (matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark';
}
document.getElementById('themeBtn').addEventListener('click', () => {
  const berikut = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = berikut;
  localStorage.setItem('tema', berikut);
});

// Jam di kartu profil
const jam = document.getElementById('clock');
function perbaruiJam() {
  jam.textContent = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta'
  }) + ' WIB';
}
perbaruiJam();
setInterval(perbaruiJam, 30000);

// Penanda menu aktif saat scroll
const sections = document.querySelectorAll('main section[id]');
const pengamat = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    menuLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => pengamat.observe(s));

// Filter pengalaman
const chips = document.querySelectorAll('.chip');
const baris = document.querySelectorAll('.row');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const pilihan = chip.dataset.filter;
  baris.forEach(b => b.classList.toggle('hide', pilihan !== 'semua' && b.dataset.cat !== pilihan));
}));

// Validasi formulir kontak
const form = document.getElementById('form');
const notif = document.getElementById('notif');

function tandaiError(input, pesan) {
  input.classList.toggle('invalid', Boolean(pesan));
  input.nextElementSibling.textContent = pesan;
  return !pesan;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const { nama, email, pesan } = form.elements;
  const okNama = tandaiError(nama, nama.value.trim().length < 3 ? 'Isi nama minimal 3 huruf.' : '');
  const okEmail = tandaiError(email, /^\S+@\S+\.\S+$/.test(email.value) ? '' : 'Masukkan email yang valid, contoh: nama@email.com.');
  const okPesan = tandaiError(pesan, pesan.value.trim().length < 10 ? 'Tulis pesan minimal 10 karakter.' : '');
  notif.textContent = '';
  if (okNama && okEmail && okPesan) {
    notif.textContent = `Terima kasih, ${nama.value.trim()}. Pesanmu sudah terkirim.`;
    form.reset();
  }
});

// Tahun di footer
document.getElementById('year').textContent = new Date().getFullYear();
