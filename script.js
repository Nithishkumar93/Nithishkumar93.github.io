(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- CONTENT (edit here) ---------- */
const D = {
  stats: [[75, '+', 'teams beaten, Genesis AI Hackathon'], [95, '%', 'accuracy, PARC-AI volume model'], [450, 'ms', 'API response time'], [8.24, '', 'CGPA, B.Tech IT']],
  exp: [
    ['Application Developer', 'Rikun Manufacturing · Kanchipuram · May 2026 – Present', 'Enterprise apps for manufacturing operations and supply-chain tracking. Real-time inventory tracking. Backend and query tuning for uptime and data accuracy.', ['Oracle APEX', 'PL/SQL', 'Java', 'SQL']],
    ['AI/ML Intern', 'Novitech R&D · Coimbatore · May – Oct 2025', 'Tuned scikit-learn classifiers. Automated preprocessing pipelines for large structured datasets.', ['Python', 'scikit-learn', 'Pandas']],
    ['Data Analytics Intern', 'Brainwave Matrix · Jun – Jul 2025', 'Power BI dashboards that lifted reporting efficiency by 25%.', ['Power BI', 'Excel']]
  ],
  proj: [
    ['Genesis AI Hackathon', '1st place · 75+ teams', 'Led prototype development of the winning AI-powered solution.', ['Generative AI', 'Python', 'scikit-learn'], 'https://github.com/Nithishkumar93/Genesis-AI-Hackathon', 1],
    ['Smart Busstand', 'Real-time · Jan 2026', 'Passenger, driver and admin sync with live map tracking.', ['React Native', 'Supabase', 'PostgreSQL']],
    ['RAG Knowledge Retrieval', 'Generative AI', 'Chunking, embeddings, similarity search, context injected into Claude prompts. n8n orchestrates queries.', ['Claude API', 'Embeddings', 'n8n']],
    ['PARC-AI', 'Computer vision · Apr 2025', 'Parcel dimensions from images for shipping cost. 95% accuracy at 450ms.', ['Python', 'Google Vision'], 'https://github.com/Nithishkumar93/PARC-AI', 1],
    ['Learn-ED', 'Full-stack', 'Gemini API auto-generates quiz questions. 25% faster authoring.', ['Java', 'Gemini API', 'MySQL'], 'https://github.com/Nithishkumar93/Learn-ED'],
    ['Royal Group E-Commerce', 'Full-stack · Oct 2024', 'OTP login, live inventory, admin sales dashboard.', ['Java', 'MySQL']]
  ],
  stack: ['Oracle APEX', 'PL/SQL', 'Java', 'Python', 'SQL', 'JavaScript', 'React Native', 'React', 'Supabase', 'Docker', 'scikit-learn', 'Claude API', 'RAG', 'n8n'],
  creds: [['fa-trophy', '1st Place, Genesis AI Hackathon', '75+ teams'], ['fa-terminal', 'Claude Code in Action', 'Certification'], ['fa-rocket', 'Antigravity AI', 'Certification'], ['fa-brain', 'Machine Learning with Python', 'Simplilearn'], ['fa-flask', 'AI in Data Science', 'Infosys'], ['fa-building', 'Job simulations', 'JPMorgan · EA · British Airways · Deloitte']]
};

/* ---------- RENDER ---------- */
const tags = t => t ? `<div class="tags">${t.map(x => `<span>${x}</span>`).join('')}</div>` : '';
$('#stats').innerHTML = D.stats.map(s => `<div><strong data-n="${s[0]}" data-s="${s[1]}">0${s[1]}</strong><span>${s[2]}</span></div>`).join('');
$('#exp').innerHTML = D.exp.map((e, i) => `<div class="job rv" style="--d:${i}"><div class="card" data-tilt><h3>${e[0]}</h3><div class="d">${e[1]}</div><p>${e[2]}</p>${tags(e[3])}</div></div>`).join('');
$('#proj').innerHTML = D.proj.map((p, i) => {
  const a = p[4], t = a ? 'a' : 'div';
  return `<${t} class="card rv ${p[5] ? 'w' : ''}" style="--d:${i % 3}" data-tilt${a ? ` href="${a}" target="_blank" rel="noopener"` : ''}>${a ? '<i class="fas fa-arrow-up-right-from-square go"></i>' : ''}<h3>${p[0]}</h3><div class="d">${p[1]}</div><p>${p[2]}</p>${tags(p[3])}</${t}>`;
}).join('');
$('#mq').innerHTML = [...D.stack, ...D.stack].map(s => `<span>${s}</span>`).join('');
$('#creds').innerHTML = D.creds.map((c, i) => `<div class="card rv" style="--d:${i % 3}"><i class="fas ${c[0]}"></i><div><strong>${c[1]}</strong><small>${c[2]}</small></div></div>`).join('');

/* ---------- WORD-MASK REVEAL ---------- */
$$('[data-split]').forEach(el => {
  el.innerHTML = el.textContent.split(' ').map((w, i) => `<span class="m"><span style="--i:${i}">${w}</span></span>`).join(' ');
});

/* ---------- REVEAL, COUNTERS, TIMELINE ---------- */
const count = el => {
  const n = +el.dataset.n, s = el.dataset.s, f = n % 1 ? 2 : 0, t0 = performance.now();
  const step = t => { const k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 4); el.textContent = (n * e).toFixed(f) + s; if (k < 1) requestAnimationFrame(step); };
  RM ? el.textContent = n + s : requestAnimationFrame(step);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('on');
  e.target.querySelectorAll('[data-n]').forEach(count);
  io.unobserve(e.target);
}), { threshold: .2 });
$$('.rv,[data-split]').forEach(e => io.observe(e));
setTimeout(() => $('h1').classList.add('on'), 100);

const tl = $('.tl');
const onScroll = () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  $('#bar').style.transform = `scaleX(${scrollY / h})`;
  const r = tl.getBoundingClientRect();
  tl.style.setProperty('--tp', Math.max(0, Math.min(1, (innerHeight * .6 - r.top) / r.height)));
  scrollP = scrollY / h;
};
let scrollP = 0;
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ---------- POINTER FX: glow, card spotlight + tilt, magnetic buttons ---------- */
let mx = .5, my = .5;
const glow = $('#glow');
addEventListener('pointermove', e => {
  mx = e.clientX / innerWidth; my = e.clientY / innerHeight;
  glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
});
if (!RM) {
  $$('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      c.style.setProperty('--x', x + 'px'); c.style.setProperty('--y', y + 'px');
      if (c.hasAttribute('data-tilt')) c.style.transform = `perspective(900px) rotateX(${(.5 - y / r.height) * 8}deg) rotateY(${(x / r.width - .5) * 8}deg) translateZ(0)`;
    });
    c.addEventListener('pointerleave', () => c.style.transform = '');
  });
  $$('.mag').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('pointerleave', () => b.style.transform = '');
  });
}

/* ---------- WEBGL: iridescent morphing orb + shell + particles ---------- */
try {
  const R = new THREE.WebGLRenderer({ canvas: $('#stage'), alpha: true, antialias: true });
  R.setPixelRatio(Math.min(devicePixelRatio, 2));
  const S = new THREE.Scene(), C = new THREE.PerspectiveCamera(45, 1, .1, 100);
  C.position.z = 7;
  const U = { t: { value: 0 } };
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 5), new THREE.ShaderMaterial({
    uniforms: U,
    vertexShader: `uniform float t;varying vec3 vN;varying vec3 vP;
      void main(){vec3 p=position+normal*.2*sin(position.y*2.4+t)*sin(position.x*2.2+t*.8)*sin(position.z*2.+t*.6);
      vN=normalize(normalMatrix*normal);vP=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
    fragmentShader: `uniform float t;varying vec3 vN;varying vec3 vP;
      void main(){float f=pow(1.-abs(dot(normalize(vN),vec3(0.,0.,1.))),2.);
      vec3 a=vec3(.22,.74,.97),b=vec3(.55,.36,.96),c=vec3(.96,.45,.71);
      vec3 col=mix(a,b,.5+.5*sin(vP.y*1.6+t));col=mix(col,c,.5+.5*sin(vP.x*2.-t*.7));
      gl_FragColor=vec4(col*(.18+f*1.5),.55+f*.45);}`,
    transparent: true
  }));
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.35, 1), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: .22 }));
  const pg = new THREE.BufferGeometry(), N = 700, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const r = 3 + Math.random() * 6, a = Math.random() * 6.28, b = Math.acos(2 * Math.random() - 1); pos.set([r * Math.sin(b) * Math.cos(a), r * Math.sin(b) * Math.sin(a), r * Math.cos(b)], i * 3); }
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: .03, color: 0xb9c2ff, transparent: true, opacity: .7 }));
  const G = new THREE.Group(); G.add(orb, shell); S.add(G, pts);

  let k = 1;
  const fit = () => { C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix(); R.setSize(innerWidth, innerHeight, false); k = innerWidth < 760 ? .55 : 1; G.scale.setScalar(k); if (RM) R.render(S, C); };
  addEventListener('resize', fit); fit();

  if (!RM) {
    let sp = 0, last = 0, cx = 0, cy = 0;
    (function loop(ts) {
      requestAnimationFrame(loop);
      U.t.value = ts * .001;
      const v = Math.abs(scrollP - last); last += (scrollP - last) * .08; sp += (v * 40 - sp) * .1;
      cx += (mx - .5 - cx) * .05; cy += (my - .5 - cy) * .05;
      const wide = innerWidth > 760;
      G.position.x = (wide ? 2.6 * Math.cos(last * 6.28) : 0) + cx * .8;
      G.position.y = (wide ? -last * 1.5 : 1.8) - cy * .8 + Math.sin(ts * .001) * .15;
      G.position.z = -last * 3;
      G.rotation.y += .003 + sp * .05; G.rotation.x = cy * .6 + last * 2;
      shell.rotation.y -= .004;
      pts.rotation.y += .0007 + sp * .01;
      R.render(S, C);
    })(0);
  }
} catch (e) { console.warn('WebGL unavailable, 3D stage skipped', e); }
})();
