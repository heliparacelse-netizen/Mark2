@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Cormorant Garamond';
  --font-body: 'DM Sans';
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-card: #16161f;
  --gold: #c9a84c;
  --gold-light: #f0c96e;
  --purple: #6c47ff;
  --text-primary: #f5f5f0;
  --text-secondary: #9999aa;
  --border: #2a2a3a;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body), 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes gradientShift {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes pulse-gold {
  0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
  50% { box-shadow: 0 0 20px 4px rgba(201,168,76,0.3); }
}
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
@keyframes grain {
  0%,100% { transform: translate(0,0); }
  10% { transform: translate(-2%,-3%); }
  20% { transform: translate(3%,2%); }
  30% { transform: translate(-1%,4%); }
  40% { transform: translate(4%,-1%); }
  50% { transform: translate(-3%,3%); }
  60% { transform: translate(2%,-4%); }
  70% { transform: translate(-4%,1%); }
  80% { transform: translate(3%,-2%); }
  90% { transform: translate(-2%,4%); }
}

.animate-fadeInUp { animation: fadeInUp 0.7s ease forwards; }
.animate-float { animation: float 4s ease-in-out infinite; }
.animate-pulse-gold { animation: pulse-gold 2s ease-in-out infinite; }

.gradient-text {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 40%, var(--purple) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
  color: #0a0a0f;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
  font-family: var(--font-body), sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 200% 100%;
  animation: shimmer 2.5s infinite;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(201,168,76,0.4); }

.btn-outline {
  background: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
  padding: 0.75rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body), sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
}
.btn-outline:hover { background: rgba(201,168,76,0.1); box-shadow: 0 0 20px rgba(201,168,76,0.2); }

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s;
}
.card:hover { border-color: rgba(201,168,76,0.4); box-shadow: 0 8px 40px rgba(0,0,0,0.4); }

.noise-bg::before {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
  animation: grain 0.5s steps(1) infinite;
  z-index: 9999;
}

.glass {
  background: rgba(22,22,31,0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(42,42,58,0.8);
}

input, textarea, select {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  width: 100%;
  font-family: var(--font-body), sans-serif;
  transition: border-color 0.2s;
  outline: none;
}
input:focus, textarea:focus, select:focus { border-color: var(--gold); }

.watermark-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
}
.watermark-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: rgba(201,168,76,0.35);
  transform: rotate(-35deg);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}
