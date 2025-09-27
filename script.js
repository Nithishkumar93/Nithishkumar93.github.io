// --- Initialize AOS (Animate on Scroll) ---
AOS.init({
    duration: 1000, // animation duration in milliseconds
    once: true,     // whether animation should happen only once
});

// --- Particles.js Configuration ---
particlesJS("particles-js", {
  "particles": {
    "number": {"value": 50, "density": {"enable": true, "value_area": 800}},
    "color": {"value": "#00aaff"},
    "shape": {"type": "circle"},
    "opacity": {"value": 0.5, "random": true},
    "size": {"value": 3, "random": true},
    "line_linked": {"enable": true, "distance": 150, "color": "#073b4c", "opacity": 0.4, "width": 1},
    "move": {"enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false}
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {"onhover": {"enable": true, "mode": "grab"}, "onclick": {"enable": true, "mode": "push"},"resize": true},
    "modes": {"grab": {"distance": 140, "line_linked": {"opacity": 1}},"push": {"particles_nb": 4}}
  },
  "retina_detect": true
});