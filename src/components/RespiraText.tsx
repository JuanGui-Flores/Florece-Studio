'use client';

import { CSSProperties, useEffect, useRef } from 'react';

interface RespiraTextProps {
  text: string;
  className?: string;
  ancho?: string;
  alto?: string;
  radio?: string;
}

interface LetraItem {
  el: HTMLSpanElement;
  ch: string;
  v: number;
  m: number;
  pintado: number;
  x: number;
  xv: number;
  y: number;
  u: number;
  crece: number;
  letra: boolean;
}

interface LineaItem {
  el: HTMLSpanElement;
  letras: LetraItem[];
  hueco: number;
}

interface BloqueData {
  el: HTMLDivElement;
  letras: LetraItem[];
  lineas: LineaItem[];
  R: number;
  cR: number[];
  cP: number[];
  anchoAttr: string;
  altoAttr: string;
  radioAttr: string;
}

const activeBlocks: BloqueData[] = [];
let globalInitialized = false;
let globalAnimId: number;

const REPOSO = { w: 250, d: 45 };
const PICO = { w: 900, d: 110 }; // Rango ajustado para evitar deformaciones extremas
const SUBIDA = 7.5;
const BAJADA = 1.9;
const INACTIVO = 2500;

let rx = -9999;
let ry = -9999;
let ratonX = -9999;
let ratonY = -9999;
let dentro = false;
let ratonT = -1e9;

if (typeof window !== 'undefined') {
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    ratonX = e.clientX;
    ratonY = e.clientY;
    dentro = true;
    ratonT = performance.now();
  };
  window.addEventListener('pointermove', onMove, { passive: true });
}

function globalFrame(now: number) {
  const dt = Math.min(0.1, (now - globalFrame.lastT) / 1000);
  globalFrame.lastT = now;

  const targetAmpR = (dentro && (now - ratonT < INACTIVO)) ? 1 : 0;
  globalFrame.ampR += (targetAmpR - globalFrame.ampR) * (1 - Math.exp(-dt * 5));
  const ampR = globalFrame.ampR;
  const ampA = Math.max(0, 1 - ampR);

  const t = now / 1000;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const sy = window.scrollY;
  const sx = window.scrollX;

  rx += (ratonX - rx) * (1 - Math.exp(-dt * 14));
  ry += (ratonY - ry) * (1 - Math.exp(-dt * 14));

  activeBlocks.forEach((b) => {
    b.lineas.forEach((ln) => {
      let sumaV = 0;
      ln.letras.forEach((L) => {
        let inf = 0;
        if (ampR > 0.001) {
          const dx = L.xv - (rx + sx);
          const dy = L.y - (ry + sy);
          const q = (dx * dx + (dy * 1.25) * (dy * 1.25)) / (b.R * b.R);
          if (q < 5) inf = Math.max(inf, ampR * Math.exp(-1.4 * q));
        }
        if (ampA > 0.001) {
          const dy = L.y - (H / 2 + sy);
          const qVert = (dy / b.R) * (dy / b.R);
          const gaussVert = Math.exp(-1.4 * qVert);
          const ola = 0.5 + 0.5 * Math.sin(t * 1.8 - (L.x / W) * 7);
          const mod = 0.25 + 0.75 * (ola * ola);
          inf = Math.max(inf, ampA * gaussVert * mod);
        }
        const fondo = 0.04 + 0.06 * (0.5 + 0.5 * Math.sin(t * 0.9 - L.u * 5.2));
        const target = Math.max(inf, fondo);
        const k = target > L.v ? SUBIDA : BAJADA;
        L.v += (target - L.v) * (1 - Math.exp(-dt * k));
        sumaV += L.crece * L.v;
      });

      let escalaLinea = 1;
      if (ln.hueco > 0 && sumaV > ln.hueco) escalaLinea = ln.hueco / sumaV;
      ln.letras.forEach((L) => {
        L.m = L.v * escalaLinea;
        pintarLetra(b, L);
      });
    });
  });

  globalAnimId = requestAnimationFrame(globalFrame);
}
globalFrame.lastT = typeof performance !== 'undefined' ? performance.now() : 0;
globalFrame.ampR = 0;

const vfs = (w: number, d: number) => `"opsz" 144, "wght" ${w}, "wdth" ${d}`;

function pintarLetra(b: BloqueData, L: LetraItem) {
  const v = L.m;
  if (Math.abs(v - L.pintado) < 0.002) return;
  L.pintado = v;
  const w = REPOSO.w + (PICO.w - REPOSO.w) * v;
  const d = REPOSO.d + (PICO.d - REPOSO.d) * v;
  L.el.style.fontVariationSettings = vfs(w, d);
  const m = Math.pow(v, 1.4) * 0.9;
  const c = b.cR.map((r, i) => Math.round(r + (b.cP[i] - r) * m));
  L.el.style.color = `rgb(${c[0]},${c[1]},${c[2]})`;
}

export default function RespiraText({
  text,
  className = '',
  ancho = '0.6',
  alto = '0.5',
  radio = '0.9',
}: RespiraTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const frases = text.split('|');
    el.textContent = '';
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = frases.map((f) => f.replace(/\//g, ' ')).join(' ');
    el.appendChild(sr);

    const letras: LetraItem[] = [];
    const lineas: LineaItem[] = [];

    frases.forEach((f) => {
      const partes = [f.replace(/\//g, ' ')];
      partes.forEach((p) => {
        const linea = document.createElement('span');
        linea.className = 'block whitespace-nowrap overflow-visible py-1'; // Evita cortes verticales
        const palabras = p.trim().split(' ');
        const enLinea: LetraItem[] = [];

        palabras.forEach((w) => {
          const pal = document.createElement('span');
          pal.className = 'inline-block whitespace-nowrap overflow-visible';
          for (const ch of w) {
            const s = document.createElement('span');
            // Añadimos inline-block y relative para que los glifos con tildes o colas no se solapen
            s.className = 'inline-block relative text-center';
            s.textContent = ch;
            pal.appendChild(s);
            const L: LetraItem = {
              el: s,
              ch,
              v: 0,
              m: 0,
              pintado: -1,
              x: 0,
              xv: 0,
              y: 0,
              u: 0,
              crece: 0,
              letra: /\p{L}/u.test(ch),
            };
            letras.push(L);
            enLinea.push(L);
          }
          pal.appendChild(document.createTextNode('\u00A0'));
          linea.appendChild(pal);
        });
        lineas.push({ el: linea, letras: enLinea, hueco: 0 });
        el.appendChild(linea);
      });
    });

    letras.forEach((L, i) => (L.u = letras.length > 1 ? i / (letras.length - 1) : 0));

    const hex = (h: string) => {
      const cleanH = h.trim().replace('#', '');
      return [0, 2, 4].map((i) => parseInt(cleanH.slice(i, i + 2), 16));
    };

    const cs = getComputedStyle(el);
    const cR = hex(cs.getPropertyValue('--c-reposo') || '#0b3c8a');
    const cP = hex(cs.getPropertyValue('--c-pico') || '#e58a67');

    const bloqueObj: BloqueData = {
      el,
      letras,
      lineas,
      R: 100,
      cR,
      cP,
      anchoAttr: ancho,
      altoAttr: alto,
      radioAttr: radio,
    };

    const medir = () => {
      const H = window.innerHeight;
      const sx = window.scrollX;
      const sy = window.scrollY;
      const reposo = () => letras.forEach((L) => { L.el.style.fontVariationSettings = vfs(REPOSO.w, REPOSO.d); });
      reposo();
      el.style.fontSize = '100px';
      const domLineas = [...el.querySelectorAll('.block')];
      const maxAncho = Math.max(...domLineas.map((l) => l.getBoundingClientRect().width));
      const caja = el.clientWidth;
      const parsedAncho = parseFloat(ancho);
      const porAncho = (caja * parsedAncho) / maxAncho * 100;
      const porAlto = (H * parseFloat(alto)) / (domLineas.length * 0.84);
      const fs = Math.max(30, Math.min(porAncho, porAlto, 300));
      el.style.fontSize = fs.toFixed(1) + 'px';
      bloqueObj.R = fs * parseFloat(radio);
      const borde = el.getBoundingClientRect().right;

      letras.forEach((L) => {
        const r = L.el.getBoundingClientRect();
        L.x = L.xv = r.left + r.width / 2 + sx;
        L.y = r.top + r.height / 2 + sy;
        L.crece = -r.width;
      });
      lineas.forEach((ln) => {
        const r = ln.el.getBoundingClientRect();
        ln.hueco = Math.max(0, (borde - r.left) * 0.985 - r.width);
      });
      letras.forEach((L) => { L.el.style.fontVariationSettings = vfs(PICO.w, PICO.d); });
      letras.forEach((L) => { L.crece += L.el.getBoundingClientRect().width; });
      reposo();
      letras.forEach((L) => pintarLetra(bloqueObj, L));
    };

    medir();
    activeBlocks.push(bloqueObj);

    if (!globalInitialized) {
      globalInitialized = true;
      globalAnimId = requestAnimationFrame(globalFrame);
    }

    window.addEventListener('resize', medir);
    window.addEventListener('scroll', medir, { passive: true });

    return () => {
      window.removeEventListener('resize', medir);
      window.removeEventListener('scroll', medir);
      const idx = activeBlocks.indexOf(bloqueObj);
      if (idx > -1) activeBlocks.splice(idx, 1);
      if (activeBlocks.length === 0 && globalAnimId) {
        cancelAnimationFrame(globalAnimId);
        globalInitialized = false;
      }
    };
  }, [text, ancho, alto, radio]);

  return (
    <div
      ref={containerRef}
      className={`font-normal leading-[1.1] tracking-normal select-none overflow-visible ${className}`}
      style={
        {
          fontFamily: '"Roboto Flex", system-ui, sans-serif',
          fontVariationSettings: '"opsz" 144, "wght" 250, "wdth" 45',
          '--c-reposo': '#0b3c8a',
          '--c-pico': '#e58a67',
        } as CSSProperties
      }
    />
  );
}