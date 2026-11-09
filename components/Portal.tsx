"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { animate, motion, useMotionTemplate, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// The way in. One continuous camera move rendered on the GPU: the camera
// pushes into the window of the desk photo, the daylight blooms, and the old
// room dissolves along a liquid edge into the new world.

const VERT = `attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}`;
const FRAG = `precision highp float;
varying vec2 v;
uniform sampler2D u_tex;uniform vec2 u_res,u_img,u_focus,u_pos;uniform float u_p,u_t,u_grid;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*n(p);p=p*2.03+7.1;a*=.5;}return s;}
void main(){
  vec2 px=vec2(v.x,1.-v.y)*u_res;
  float sc=max(u_res.x/u_img.x,u_res.y/u_img.y);vec2 d=u_img*sc;vec2 off=(u_res-d)*u_pos;
  vec2 F=off+u_focus*d;vec2 C=u_res*.5;float m0=min(u_res.x,u_res.y);
  float pz=smoothstep(.02,.82,u_p);
  float z=exp(log(16.)*pow(pz,1.7));
  vec2 A=mix(F,C,smoothstep(0.,.55,pz));
  vec2 q=(px-A)/m0;float k=.55*pz;vec2 dir=(px-A)*(1.+k*dot(q,q));
  float blur=.16*smoothstep(.04,.35,pz)*(1.-smoothstep(.75,.95,pz));
  float ca=.012*smoothstep(.05,.5,pz);
  vec3 col=vec3(0.);
  for(int i=0;i<8;i++){
    float f=1.+blur*float(i)/7.;
    vec2 pr=F+dir/(z*f*(1.+ca)),pg=F+dir/(z*f),pb=F+dir/(z*f*(1.-ca));
    col.r+=texture2D(u_tex,clamp((pr-off)/d,0.,1.)).r;
    col.g+=texture2D(u_tex,clamp((pg-off)/d,0.,1.)).g;
    col.b+=texture2D(u_tex,clamp((pb-off)/d,0.,1.)).b;
  }
  col/=8.;
  float ex=1.+9.*pow(smoothstep(.3,.82,u_p),2.);
  col=mix(col,1.-exp(-col*ex*1.15),smoothstep(.18,.45,u_p));
  col*=mix(vec3(1.),vec3(1.06,1.,.9),smoothstep(.2,.6,u_p));
  vec2 g=(px-C)/m0;float dist=length(g);
  float nz=fbm(g*2.6+vec2(u_t*.06,-u_t*.04));
  float field=dist*.85+nz*.6;
  float r=mix(-.25,1.85,smoothstep(.5,.9,u_p));
  float inside=1.-smoothstep(r-.035,r,field);
  float edge=exp(-pow((field-r)/.03,2.))*step(.001,r);
  vec3 honey=vec3(.922,.722,.29),teal=vec3(.502,.82,.757),deep=vec3(.078,.639,.545);
  float ang=atan(g.y,g.x);
  vec3 glow=mix(honey,mix(teal,deep,.35),.5+.5*sin(ang*2.+nz*6.+u_t*.5));
  vec3 nw=vec3(.961,.969,.965);
  vec2 gm=mod(px-C,u_grid);float line=step(gm.x,1.)+step(gm.y,1.);
  nw=mix(nw,vec3(.059,.098,.086),.035*min(line,1.));
  col+=(h(px+fract(u_t)*91.)-.5)*.035*(1.-inside);
  vec3 o=mix(col,nw,inside);
  o=mix(o,glow*1.15+.15,edge*.9);
  gl_FragColor=vec4(o,1.);
}`;

function useShader(canvas: React.RefObject<HTMLCanvasElement | null>, p: MotionValue<number>) {
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "high-performance" });
    if (!gl) return;
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (k: string) => gl.getUniformLocation(prog, k);
    const uRes = U("u_res"), uImg = U("u_img"), uFocus = U("u_focus"), uPos = U("u_pos"), uP = U("u_p"), uT = U("u_t"), uGrid = U("u_grid");

    const phone = window.matchMedia("(max-width: 767px)").matches;
    const img = new Image();
    img.decoding = "async";
    img.src = phone ? "/hero/desk-phone.webp" : "/hero/desk.webp";
    // Centre of the lower window pane in each crop.
    const focus = phone ? [0.76, 0.34] : [0.667, 0.36];
    let ready = false, raf = 0, visible = true;
    const t0 = performance.now();

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(el.clientWidth * dpr), h = Math.round(el.clientHeight * dpr);
      if (el.width !== w || el.height !== h) { el.width = w; el.height = h; }
      gl.viewport(0, 0, w, h);
      return dpr;
    };
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!ready || !visible) return;
      const v = p.get();
      if (v <= 0.002) return;
      const dpr = size();
      gl.uniform2f(uRes, el.width, el.height);
      gl.uniform1f(uP, v);
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.uniform1f(uGrid, (phone ? 48 : 72) * dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    img.onload = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(uImg, img.naturalWidth, img.naturalHeight);
      gl.uniform2f(uFocus, focus[0], focus[1]);
      gl.uniform2f(uPos, 0.58, 0.4);
      ready = true;
      el.dataset.ready = "1";
    };
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [canvas, p]);
}

const ramp = (a: number, b: number, from: number, to: number) => (v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return from + (to - from) * t;
};

function Desk({ children }: { children?: ReactNode }) {
  return (
    <div className="room-desk">
      <picture>
        <source media="(max-width: 767px)" srcSet="/hero/desk-phone.webp" />
        <img src="/hero/desk-1920.webp" srcSet="/hero/desk-1920.webp 1920w, /hero/desk.webp 2560w" sizes="100vw"
          alt="" width={2560} height={1344} loading="eager" fetchPriority="high" decoding="async" />
      </picture>
      {children}
    </div>
  );
}

export default function Portal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useShader(canvas, p);

  const glOn = useTransform(p, (v) => (v > 0.002 ? 1 : 0));
  const shade = useTransform(p, ramp(0.02, 0.4, 1, 0));
  const copyOpacity = useTransform(p, ramp(0.02, 0.22, 1, 0));
  const copyY = useTransform(p, ramp(0.02, 0.3, 0, -70));
  const copyBlur = useTransform(p, ramp(0.02, 0.22, 0, 10));
  const copyFilter = useMotionTemplate`blur(${copyBlur}px)`;
  const stage = useTransform(p, ramp(0.9, 0.97, 1, 0));
  const stageVis = useTransform(p, (v) => (v > 0.97 ? "hidden" : "visible"));

  if (reduced) {
    return <div className="portal portal-still"><div className="portal-stage"><div className="room"><Desk><div className="room-desk-shade" /></Desk></div>{children}</div></div>;
  }

  return (
    <div ref={ref} className="portal">
      <motion.div className="portal-stage" style={{ opacity: stage, visibility: stageVis }}>
        <div className="room" aria-hidden="true">
          <Desk>
            <motion.canvas ref={canvas} className="portal-gl" style={{ opacity: glOn }} />
            <motion.div className="room-desk-shade" style={{ opacity: shade }} />
          </Desk>
          <motion.div className="room-grain" style={{ opacity: useTransform(p, ramp(0, 0.5, 0.06, 0)) }} />
        </div>
        <motion.div className="portal-copy" style={{ opacity: copyOpacity, y: copyY, filter: copyFilter }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

// "Come inside" plays the way in rather than jumping past it.
export function ComeInside({ className, children }: { className?: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("what");
    if (!target || reduced) return;
    e.preventDefault();
    const to = target.getBoundingClientRect().top + window.scrollY;
    animate(window.scrollY, to, {
      duration: 3.4, ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => window.scrollTo(0, v),
    });
  };
  return <a href="#what" className={className} onClick={onClick}>{children}</a>;
}
