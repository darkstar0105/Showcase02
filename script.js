const showcase = document.querySelector('#studio-showcase');
const nav = showcase.querySelector('nav');
const knobs = showcase.querySelectorAll('.knobs button');

knobs.forEach(button => button.addEventListener('click', () => {
  knobs.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  showcase.querySelector('#selected').textContent = `${button.dataset.name} / ${button.dataset.value}`;
}));

const revealTargets = showcase.querySelectorAll('.statement, .feature, .controls, .plugin, .buy, .end');
revealTargets.forEach(section => section.setAttribute('data-reveal', ''));
showcase.querySelector('.grid').setAttribute('data-reveal', '');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

showcase.querySelectorAll('[data-reveal]').forEach(target => observer.observe(target));

window.addEventListener('scroll', () => nav.classList.toggle('nav-is-scrolled', window.scrollY > 20), { passive: true });

const orb = showcase.querySelector('.orb');
showcase.querySelector('.hero').addEventListener('pointermove', event => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - .5;
  const y = (event.clientY - box.top) / box.height - .5;
  orb.style.translate = `${x * 16}px ${y * 12}px`;
});
showcase.querySelector('.hero').addEventListener('pointerleave', () => { orb.style.translate = ''; });

const priceCard = showcase.querySelector('.price-card');
priceCard.addEventListener('pointermove', event => {
  const box = priceCard.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - .5;
  const y = (event.clientY - box.top) / box.height - .5;
  priceCard.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-5px)`;
});
priceCard.addEventListener('pointerleave', () => { priceCard.style.transform = ''; });
