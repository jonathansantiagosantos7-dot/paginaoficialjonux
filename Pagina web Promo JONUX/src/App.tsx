import { type FormEvent, useEffect, useMemo, useState } from "react";

type Service = {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
};

const SERVICES: Service[] = [
  {
    title: "Ventas e Inventario con Código de Barras / QR",
    tagline: "Control total en tiempo real",
    description: "Aplicación móvil para registrar productos, escanear códigos, controlar entradas y salidas, manejar tallas, colores y stock con respaldo automático en la nube.",
    features: [
      "Escaneo de código de barras y QR",
      "Inventario por talla, color y modelo",
      "Entradas, salidas y ventas",
      "Sincronización con Google Sheets",
      "Reportes y respaldos automáticos",
    ],
    icon: "📦",
    gradient: "from-amber-300 via-yellow-300 to-amber-400",
  },
  {
    title: "Catálogo Web de Productos",
    tagline: "Tu tienda en línea sincronizada",
    description: "Página web profesional con tus productos, imágenes, tallas y precios. Carrito de compras que envía el pedido directo al WhatsApp del negocio.",
    features: [
      "Diseño premium estilo luxury",
      "Sincronización en tiempo real",
      "Carrito de compras integrado",
      "Pedidos automáticos por WhatsApp",
      "Filtros, búsqueda y galería de fotos",
    ],
    icon: "🛍️",
    gradient: "from-violet-400 via-fuchsia-400 to-pink-400",
  },
  {
    title: "Dashboard de Ganancias",
    tagline: "Tu negocio en una sola vista",
    description: "Tablero ejecutivo con KPIs en tiempo real, ganancias del día y del mes, calendario de ventas, alertas de stock crítico y exportación de inventario.",
    features: [
      "KPIs en vivo cada 30 segundos",
      "Ganancia diaria y mensual",
      "Calendario interactivo de ventas",
      "Alertas de stock crítico",
      "Exportación a Excel/CSV",
    ],
    icon: "📊",
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
  },
];

const PROCESS_STEPS = [
  { number: "01", title: "Reunión inicial", description: "Analizamos tu negocio, productos y necesidades para diseñar la solución a tu medida." },
  { number: "02", title: "Configuración", description: "Creamos tu app personalizada, conectada a la nube y lista para empezar a usarse." },
  { number: "03", title: "Capacitación", description: "Te enseñamos cómo usar cada función paso a paso, con manuales y videos." },
  { number: "04", title: "Soporte", description: "Acompañamiento de lunes a viernes, mantenimiento y mejoras continuas." },
];

const STATS = [
  { value: "100%", label: "En la nube" },
  { value: "24/7", label: "Disponibilidad" },
  { value: "📈", label: "Ganancias Garantizadas" },
  { value: "+3", label: "Apps integradas" },
];

const CLIENT_LOGOS = [
  { name: "Zapatería El Puerto", icon: "👞" },
  { name: "Moda Urbana GT", icon: "👟" },
  { name: "Boutique Elegancia", icon: "👗" },
  { name: "Deportivos X", icon: "⚽" },
  { name: "Calzado Real", icon: "👑" },
  { name: "Estilo & Confort", icon: "✨" },
];

const TESTIMONIALS = [
  { quote: "JonuX transformó la manera de manejar mi inventario. Antes lo hacía a mano, ahora todo está sincronizado.", name: "Carlos Méndez", handle: "@carlosm_boutique", role: "Tienda de calzado" },
  { quote: "El catálogo web me ayudó a vender más por WhatsApp sin tener que estar enviando fotos a cada cliente.", name: "Andrea Rojas", handle: "@andrea_moda_gt", role: "Boutique Clara" },
  { quote: "El dashboard me muestra mis ganancias en vivo. Sé exactamente cuánto gano cada día.", name: "Sergio Velásquez", handle: "@sergio_v_digital", role: "Emprendedor" },
];

const FAQ = [
  { q: "¿En qué consiste el servicio?", a: "Ofrecemos 3 aplicaciones integradas: control de inventario móvil, catálogo web sincronizado y dashboard de ganancias. Todo conectado a la nube de Google con servidores compatibles con iOS, Android y Windows." },
  { q: "¿Cuánto cuesta?", a: "Q400 mensuales por las 3 aplicaciones. Sin costo de instalación. Compromiso mínimo de 3 meses." },
  { q: "¿Necesito conocimientos técnicos?", a: "No. Nosotros configuramos todo y te capacitamos. Tú solo usas el sistema desde tu teléfono o computadora." },
  { q: "¿Funciona sin internet?", a: "Las apps móviles tienen modo offline. El catálogo y dashboard sí requieren conexión a internet para sincronización en tiempo real." },
  { q: "¿Puedo personalizar el catálogo con mi marca?", a: "Sí. Cada cliente recibe su propio catálogo con su logo, nombre, colores, WhatsApp y dominio personalizado opcional." },
  { q: "¿Qué pasa si tengo dudas o problemas?", a: "Brindamos soporte de lunes a viernes de 8:00 a.m. a 5:00 p.m. por WhatsApp y correo. Las consultas se resuelven en menos de 24 horas hábiles." },
];

const TECH_STACK = [
  { 
    name: "iOS", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91 1.51.05 2.11.54 3 1.26-2.09 1.22-1.77 4.54.43 5.43-.51 1.34-1.25 2.68-1.64 3.97M15.97 3c-.87 1.07-2.3 1.83-3.6 1.76-.17-1.32.48-2.67 1.32-3.66C14.54 1 16 2.2 16.14 3c.01.12.01.24-.17-.3Z"/></svg>
  },
  { 
    name: "Android", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9997.9993-.9997c.5511 0 .9993.4486.9993.9997s-.4482.9997-.9993.9997m-7.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9997.9993-.9997c.5511 0 .9993.4486.9993.9997s-.4482.9997-.9993.9997m7.1685-6.0736 1.4398-2.5036a.4344.4344 0 0 0-.1585-.5917.4332.4332 0 0 0-.5907.1588L16.883 8.8475A10.8715 10.8715 0 0 0 12 8c-1.7821 0-3.449.4357-4.883 1.2015L5.6772 6.6713a.4332.4332 0 0 0-.5907-.1588.4344.4344 0 0 0-.1585.5917l1.4398 2.5036C3.123 11.455 1.0553 14.5024 1 18h22c-.0553-3.4976-2.123-6.545-5.3545-8.7322"/></svg>
  },
  { 
    name: "Windows", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449 9.75 2.1l.01 9.459-9.75.051zM0 12.409l9.75.049.01 9.449-9.75-1.465zm10.749-10.45 13.251-1.82v11.14l-13.25-.03zM10.749 12.448l13.251-.01v11.127l-13.251-1.876z"/></svg>
  },
  { 
    name: "Sheets", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM7 8h5v2H7V8zm10 10H7v-2h10v2zm0-4H7v-2h10v2zm-2-5.5V3.5l4.5 4.5H15z"/></svg>
  },
  { 
    name: "React", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14.4c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM22.8 11.23c-.32-1.32-1.63-2.48-3.32-3.13 1.02-1.6 1.48-3.15.86-4-1.07-1.48-4.48-.48-7.34 2.14-2.86-2.62-6.27-3.62-7.34-2.14-.62.85-.16 2.4.86 4-1.69.65-3 1.81-3.32 3.13-.67 2.76 1.46 5.6 5 6.74-.18.89-.27 1.8-.27 2.63 0 5.14 2.8 9.3 6.25 9.3s6.25-4.16 6.25-9.3c0-.83-.09-1.74-.27-2.63 3.54-1.14 5.67-3.98 5-6.74zM12 19.3c-2.4 0-4.35-3.04-4.35-6.8s1.95-6.8 4.35-6.8 4.35 3.04 4.35 6.8-1.95 6.8-4.35 6.8z"/></svg>
  },
  { 
    name: "Tailwind", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1.2.45 2.1 1.35 3.067 2.317C14.8 11.667 16.5 13.5 20.001 13.5c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1.2-.45-2.1-1.35-3.067-2.317C17.2 6.833 15.5 5 12.001 5zM6.001 13.5c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1.2.45 2.1 1.35 3.067 2.317C8.8 20.367 10.5 22.2 14.001 22.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1.2-.45-2.1-1.35-3.067-2.317C11.2 15.533 9.5 13.7 6.001 13.5z"/></svg>
  },
  { 
    name: "WhatsApp API", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.393-.883-.785-1.48-1.757-1.653-2.056-.174-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.136 1.36.116 1.871.05.57-.074 1.758-.463 2.006-1.093.248-.63.248-1.171.174-1.272-.074-.101-.27-.161-.568-.31l-.001-.001ZM12.01 21.142c-1.649 0-3.259-.444-4.671-1.286l-.335-.2-3.473.911.927-3.388-.22-.35a9.308 9.308 0 0 1-1.428-4.963c0-5.143 3.361-9.327 7.48-9.327 4.119 0 7.48 4.184 7.48 9.327 0 5.144-3.361 9.327-7.48 9.327Zm7.243-16.581C17.397 2.923 14.817 2 12.01 2 5.38 2 0 7.387 0 14c0 2.112.551 4.174 1.595 5.992L0 22l6.147-1.613c1.774.968 3.771 1.479 5.858 1.48 6.629 0 12.01-5.387 12.01-12 0-3.204-1.248-6.216-3.511-8.471h-.002Z"/></svg>
  },
  { 
    name: "Google Drive", 
    icon: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.74 3.522h8.52l6.74 11.668-4.26 7.378H2l4.26-7.378 1.48-2.544zm1.96 1.748L3.715 15.19l4.253 7.36 5.986-10.368-4.254-7.361zm8.56 0l-4.254 7.36h8.508l-4.254-7.36zm-3.15 8.528H6.55l-3.3 5.71h13.064l-3.204-5.71z"/></svg>
  }
];

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Proceso" },
  { id: "nosotros", label: "Nosotros" },
  { id: "precios", label: "Precios" },
  { id: "contacto", label: "Contacto" },
];

function smoothScrollTo(id: string) {
  if (typeof document === "undefined") return;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
}

declare global {
  interface Window {
    JONUX_CONFIG?: {
      customLogo?: string;
    };
  }
}

// Opción 1: Base64 en el config. Opción 2: Archivo logo.png en la misma carpeta.
const CUSTOM_LOGO = window.JONUX_CONFIG?.customLogo || "logo.png";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [form, setForm] = useState({ name: "", business: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  const whatsappLink = useMemo(() => {
    const lines = [
      `Hola JonuX, me interesa conocer sus servicios.`,
      "",
      form.name ? `Nombre: ${form.name}` : "",
      form.business ? `Negocio: ${form.business}` : "",
      form.phone ? `Teléfono: ${form.phone}` : "",
      form.message ? `Mensaje: ${form.message}` : "",
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n") || "Hola JonuX, me interesa conocer sus servicios.");
    return `https://wa.me/50251635253?text=${text}`;
  }, [form]);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappLink, "_blank", "noopener");
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  return (
    <main className="jonux-bg min-h-screen text-white device-entry">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-amber-300/15 bg-slate-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => smoothScrollTo("inicio")} className="flex items-center gap-4" aria-label="Inicio">
            {CUSTOM_LOGO ? (
              <img src={CUSTOM_LOGO} alt="JonuX Logo" className="h-14 w-14 object-contain shadow-2xl" />
            ) : (
              <div className="jonux-logo-mark relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] bg-[#0a0d14] shadow-2xl ring-1 ring-white/10 transition hover:ring-amber-300/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <span className="jonux-logo-text relative z-10 select-none text-2xl font-black uppercase leading-none tracking-[-0.16em]">JX</span>
              </div>
            )}
            <div className="text-left leading-none">
              <p className="luxury-title text-2xl font-black uppercase tracking-tight">JonuX</p>
              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.35em] text-amber-300/70">Diseño y Experiencia</p>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <button key={item.id} type="button" onClick={() => smoothScrollTo(item.id)} className="rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:bg-white/5 hover:text-amber-200">
                {item.label}
              </button>
            ))}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="ml-3 rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-amber-300/40 transition hover:-translate-y-0.5 hover:shadow-amber-300/70">
              Cotizar
            </a>
          </nav>

          <button type="button" className="lg:hidden" aria-label="Menu" onClick={() => setNavOpen((v) => !v)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/30 bg-white/5 text-amber-200">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                {navOpen ? <><path d="M18 6 6 18M6 6l12 12" /></> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
              </svg>
            </div>
          </button>
        </div>
        {navOpen ? (
          <div className="border-t border-amber-300/15 bg-slate-950/95 px-4 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <button key={item.id} type="button" onClick={() => { smoothScrollTo(item.id); setNavOpen(false); }} className="rounded-full px-4 py-2.5 text-left text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:bg-white/5 hover:text-amber-200">
                  {item.label}
                </button>
              ))}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setNavOpen(false)} className="mt-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-slate-950">Cotizar</a>
            </nav>
          </div>
        ) : null}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-[#12141a] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.32em] text-amber-200 shadow-lg">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
              Disponible para nuevos clientes
            </span>
            <h1 className="luxury-title mt-7 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              Transformamos tu negocio<br />en una <span className="tech-highlight">experiencia digital</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Apps de inventario, catálogo web y dashboards de ganancias hechos a la medida para tiendas, boutiques y emprendedores. Servidores de apps compatibles con iOS, Android y Windows con sincronización en tiempo real.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 shadow-2xl shadow-amber-300/40 transition hover:-translate-y-0.5 hover:shadow-amber-300/70">
                Pedir cotización
              </a>
              <button type="button" onClick={() => smoothScrollTo("servicios")} className="rounded-full border border-amber-300/40 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-amber-100 backdrop-blur transition hover:bg-amber-300/10">
                Ver servicios
              </button>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-amber-300/20 bg-[#0f1117] p-4 shadow-xl shadow-black/20">
                  <div className="luxury-title flex justify-center text-3xl font-black sm:text-4xl">
                    {stat.value === "📈" ? (
                      <svg className="h-10 w-10 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-amber-200/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center transition hover:border-amber-300/40 hover:bg-white/10">
                <div className="text-amber-400">
                  {tech.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LOGOS DE CLIENTES (MARQUEE) */}
        <div className="mt-24 border-y border-white/5 bg-white/[0.02] py-10 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Empresas que confían en nuestra tecnología</p>
            <div className="mt-8 overflow-hidden relative">
              <div className="flex marquee-content gap-12 sm:gap-20 items-center">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
                  <div key={`${client.name}-${idx}`} className="flex items-center gap-3 shrink-0 grayscale opacity-40 transition duration-500 hover:grayscale-0 hover:opacity-100 group cursor-default">
                    <span className="text-2xl sm:text-3xl filter group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] transition duration-500">
                      {client.icon}
                    </span>
                    <span className="text-sm sm:text-base font-black uppercase tracking-[0.2em] text-white transition duration-500 group-hover:text-amber-300">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* Fade masks for the edges */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#05070d] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#05070d] to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-300/80">Servicios</p>
            <h2 className="luxury-title mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">3 aplicaciones que potencian tu negocio</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60">Diseñadas para trabajar en conjunto. Una sola fuente de datos, tres herramientas profesionales.</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <article key={service.title} className="motion-fade-up group relative overflow-hidden rounded-[2rem] border border-amber-300/25 bg-gradient-to-br from-[#0b0d12] via-[#11141d] to-[#1a1024] p-8 shadow-2xl shadow-amber-300/15 transition duration-500 hover:-translate-y-1.5 hover:border-amber-300/60 hover:shadow-amber-300/40">
                <div className="luxury-shine pointer-events-none absolute inset-0" />
                <div className="relative">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-3xl shadow-lg`}>
                    {service.icon}
                  </div>
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.32em] text-amber-300/80">{String(index + 1).padStart(2, "0")} · {service.tagline}</p>
                  <h3 className="luxury-title mt-3 text-2xl font-black leading-tight">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{service.description}</p>
                  <ul className="mt-5 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs font-bold text-white/75">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>



      {/* PROCESO */}
      <section id="proceso" className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-300/80">Nuestro proceso</p>
            <h2 className="luxury-title mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">De idea a producto en 4 pasos</h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="motion-fade-up relative rounded-[1.75rem] border border-amber-300/20 bg-[#0f1117] p-6 transition hover:border-amber-300/60 hover:bg-[#1a1c24]">
                <span className="luxury-title block text-5xl font-black leading-none">{step.number}</span>
                <h3 className="mt-4 text-base font-black uppercase tracking-[0.16em] text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-300/80">Sobre JonuX</p>
              <h2 className="luxury-title mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">Tecnología que entiende tu negocio</h2>
              <p className="mt-6 text-base leading-relaxed text-white/70">
                Somos un equipo enfocado en crear soluciones digitales prácticas, elegantes y rentables para negocios reales. Diseñamos apps que cualquier persona puede usar, sin importar si conoce o no de tecnología.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Nuestra misión es <strong className="luxury-title">poner la tecnología premium al alcance de pequeños, medianos y grandes emprendedores</strong>, con precios justos, soporte cercano y una experiencia visual a la altura de las grandes marcas.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { v: "+3 años", l: "De experiencia" },
                  { v: "100%", l: "Personalizable" },
                  { v: "GT", l: "Hecho con orgullo" },
                ].map((item) => (
                  <div key={item.l} className="rounded-2xl border border-amber-300/25 bg-white/5 p-4">
                    <p className="luxury-title text-2xl font-black">{item.v}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.24em] text-amber-200/80">{item.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="luxury-shine pointer-events-none absolute inset-0 rounded-[2rem]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/30 bg-gradient-to-br from-[#0a0d14] via-[#11141d] to-[#1a1024] p-8 shadow-2xl shadow-amber-300/15 sm:p-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-amber-300/25 bg-white/5 p-5">
                    <div className="text-3xl">💡</div>
                    <p className="mt-3 text-sm font-black text-white">Innovación constante</p>
                    <p className="mt-1 text-xs text-white/60">Mejoras cada mes sin costo extra.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-300/25 bg-white/5 p-5">
                    <div className="text-3xl">🤝</div>
                    <p className="mt-3 text-sm font-black text-white">Soporte humano</p>
                    <p className="mt-1 text-xs text-white/60">Hablas con personas, no con bots.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-300/25 bg-white/5 p-5">
                    <div className="text-3xl">⚡</div>
                    <p className="mt-3 text-sm font-black text-white">Tiempo real</p>
                    <p className="mt-1 text-xs text-white/60">Datos sincronizados al instante.</p>
                  </div>
                  <div className="rounded-2xl border border-amber-300/25 bg-white/5 p-5">
                    <div className="text-3xl">🔒</div>
                    <p className="mt-3 text-sm font-black text-white">Datos seguros</p>
                    <p className="mt-1 text-xs text-white/60">Respaldados en la nube de Google.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-300/80">Lo que dicen</p>
            <h2 className="luxury-title mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl">Clientes que confían en nosotros</h2>
          </div>

          <div className="relative mt-12">
            <div className="luxury-shine pointer-events-none absolute inset-0 rounded-[2rem]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-300/30 bg-gradient-to-br from-[#0a0d14] via-[#11141d] to-[#1a1024] p-8 shadow-2xl shadow-amber-300/15 sm:p-12">
              <svg className="h-10 w-10 text-amber-300/40" viewBox="0 0 24 24" fill="currentColor"><path d="M9.17 6C7.42 6 6 7.42 6 9.17v5.66C6 16.58 7.42 18 9.17 18H10c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1H8v-3.83C8 8.52 8.52 8 9.17 8H10c.55 0 1-.45 1-1V6zm9 0c-1.75 0-3.17 1.42-3.17 3.17v5.66c0 1.75 1.42 3.17 3.17 3.17H19c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-2v-3.83c0-.65.52-1.17 1.17-1.17H19c.55 0 1-.45 1-1V6z"/></svg>
              <p className="mt-6 text-xl font-bold leading-relaxed text-white/85 sm:text-2xl">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-400 to-fuchsia-600 p-0.5 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-[10px] font-black">
                      {TESTIMONIALS[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="luxury-title text-base font-black">{TESTIMONIALS[activeTestimonial].name}</p>
                      <span className="text-[10px] font-bold text-amber-200/60">{TESTIMONIALS[activeTestimonial].handle}</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{TESTIMONIALS[activeTestimonial].role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, idx) => (
                    <button key={idx} type="button" onClick={() => setActiveTestimonial(idx)} aria-label={`Ver testimonio ${idx + 1}`} className={`h-2 w-8 rounded-full transition ${idx === activeTestimonial ? "bg-gradient-to-r from-amber-300 to-amber-400" : "bg-white/15 hover:bg-white/30"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-300/80">Precios</p>
            <h2 className="luxury-title mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">Plan único · Todo incluido</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">Las 3 aplicaciones, soporte y mejoras por una sola mensualidad.</p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-amber-300/60 bg-gradient-to-br from-[#0a0d14] via-[#11141d] to-[#1a1024] p-1 shadow-[0_30px_100px_rgba(251,191,36,0.25)]">
              <div className="luxury-shine pointer-events-none absolute inset-0" />
              <div className="relative rounded-[2.3rem] bg-[#0a0d14] p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.32em] text-amber-300/80">Plan Premium</p>
                    <h3 className="luxury-title mt-2 text-3xl font-black uppercase">JonuX Apps Total</h3>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-950">Más popular</span>
                </div>

                <div className="mt-8 flex flex-wrap items-baseline gap-3">
                  <span className="text-xl font-black text-white/40 line-through decoration-rose-400/70 decoration-2">Q650</span>
                  <span className="luxury-title text-6xl font-black leading-none sm:text-7xl">Q400</span>
                  <span className="text-base font-bold text-white/55">/mes</span>
                  <span className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-lg shadow-rose-500/40">Ahorra 38%</span>
                </div>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-200/70">Permanencia mínima de 3 meses</p>

                <ul className="mt-8 space-y-3 text-sm text-white/75">
                  {[
                    "App de Inventario por Código QR / Barras",
                    "Catálogo web sincronizado con WhatsApp",
                    "Dashboard de ganancias en tiempo real",
                    "Hasta 3 dispositivos autorizados",
                    "Capacitación incluida",
                    "Soporte L-V de 8:00 a.m. a 5:00 p.m.",
                    "Respaldos automáticos en la nube",
                    "Mejoras y actualizaciones sin costo",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="mt-1 h-4 w-4 shrink-0 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 shadow-xl shadow-amber-300/40 transition hover:-translate-y-0.5 hover:shadow-amber-300/70">
                  Comenzar ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-300/80">Preguntas frecuentes</p>
            <h2 className="luxury-title mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl">Resolvemos tus dudas</h2>
          </div>

          <div className="mt-12 space-y-3">
            {FAQ.map((item, index) => {
              const open = activeFaq === index;
              return (
                <div key={item.q} className={`overflow-hidden rounded-2xl border transition ${open ? "border-amber-300/60 bg-white/5" : "border-amber-300/15 bg-white/[0.03] hover:bg-white/[0.05]"}`}>
                  <button type="button" onClick={() => setActiveFaq(open ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="text-sm font-black text-white sm:text-base">{item.q}</span>
                    <svg className={`h-5 w-5 shrink-0 transition ${open ? "rotate-45 text-amber-300" : "text-white/55"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                  {open ? <div className="border-t border-amber-300/15 px-5 py-4 text-sm leading-relaxed text-white/70">{item.a}</div> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-300/30 bg-gradient-to-br from-[#0a0d14] via-[#11131d] to-[#1d0f24] p-8 shadow-2xl shadow-amber-300/15 sm:p-12">
            <div className="luxury-shine pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.42em] text-amber-300/80">Contacto</p>
                <h2 className="luxury-title mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl">Hablemos de tu negocio</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70">Cuéntanos sobre tu emprendimiento y te armaremos una propuesta personalizada sin compromiso.</p>

                <div className="mt-8 space-y-4">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-amber-300/25 bg-white/5 p-4 transition hover:border-amber-300/60 hover:bg-white/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                      <svg className="h-6 w-6" viewBox="0 0 32 32" fill="currentColor"><path d="M19.11 17.51c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.84-2-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.96 4.68 4.04.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.58-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.06-.11-.25-.18-.52-.32zM16 4.62C9.7 4.62 4.62 9.7 4.62 16c0 2 .52 3.96 1.52 5.69L4.5 27.5l5.96-1.56A11.36 11.36 0 0 0 16 27.38C22.3 27.38 27.38 22.3 27.38 16S22.3 4.62 16 4.62z"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300/80">WhatsApp</p>
                      <p className="text-base font-black text-white">+502 5163 5253</p>
                    </div>
                  </a>

                  <a href="mailto:jonuxapps@gmail.com" className="flex items-center gap-4 rounded-2xl border border-amber-300/25 bg-white/5 p-4 transition hover:border-amber-300/60 hover:bg-white/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/20 text-amber-200">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-300/80">Correo</p>
                      <p className="text-sm font-black text-white">jonuxapps@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 rounded-2xl border border-amber-300/25 bg-white/5 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/20 text-blue-200">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-300/80">Horario de atención</p>
                      <p className="text-sm font-black text-white">Lunes a Viernes · 8:00 a.m. – 5:00 p.m.</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 rounded-3xl border border-amber-300/25 bg-[#0f1117] p-6 sm:p-8 shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-amber-300/80">Solicitar cotización</p>
                <h3 className="luxury-title text-2xl font-black uppercase">Envíanos tus datos</h3>
                <div className="space-y-3 pt-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.22em] text-amber-200/80">
                    Nombre completo *
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: Maria Lopez" className="mt-1 w-full rounded-xl border border-amber-300/25 bg-white/5 px-3 py-2.5 text-sm font-bold text-white placeholder:text-white/40 outline-none focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/20" />
                  </label>
                  <label className="block text-[10px] font-black uppercase tracking-[0.22em] text-amber-200/80">
                    Negocio o emprendimiento
                    <input type="text" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Ej: Zapatería Maria" className="mt-1 w-full rounded-xl border border-amber-300/25 bg-white/5 px-3 py-2.5 text-sm font-bold text-white placeholder:text-white/40 outline-none focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/20" />
                  </label>
                  <label className="block text-[10px] font-black uppercase tracking-[0.22em] text-amber-200/80">
                    Teléfono / WhatsApp
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+502 ..." className="mt-1 w-full rounded-xl border border-amber-300/25 bg-white/5 px-3 py-2.5 text-sm font-bold text-white placeholder:text-white/40 outline-none focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/20" />
                  </label>
                  <label className="block text-[10px] font-black uppercase tracking-[0.22em] text-amber-200/80">
                    Cuéntanos qué necesitas
                    <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Ej: Quiero un catálogo y dashboard para mi tienda de zapatos..." className="mt-1 w-full resize-none rounded-xl border border-amber-300/25 bg-white/5 px-3 py-2.5 text-sm font-bold text-white placeholder:text-white/40 outline-none focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/20" />
                  </label>
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 px-5 py-3.5 text-sm font-black uppercase tracking-[0.18em] text-slate-950 shadow-xl shadow-amber-300/40 transition hover:-translate-y-0.5 hover:shadow-amber-300/70">
                  <svg className="h-5 w-5" viewBox="0 0 32 32" fill="currentColor"><path d="M19.11 17.51c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.84-2-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.96 4.68 4.04.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.58-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.06-.11-.25-.18-.52-.32zM16 4.62C9.7 4.62 4.62 9.7 4.62 16c0 2 .52 3.96 1.52 5.69L4.5 27.5l5.96-1.56A11.36 11.36 0 0 0 16 27.38C22.3 27.38 27.38 22.3 27.38 16S22.3 4.62 16 4.62z"/></svg>
                  Enviar por WhatsApp
                </button>
                {sent ? <p className="text-center text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">Abriendo WhatsApp...</p> : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative mt-32 sm:mt-40">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="luxury-title text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">¿Listo para llevar tu negocio al siguiente nivel?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/65">Únete a los emprendedores que ya están automatizando su negocio con JonuX.</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 px-10 py-5 text-sm font-black uppercase tracking-[0.22em] text-slate-950 shadow-2xl shadow-amber-300/50 transition hover:-translate-y-0.5 hover:shadow-amber-300/80">
            Comenzar hoy mismo
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative mt-32 border-t border-amber-300/15 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                {CUSTOM_LOGO ? (
                  <img src={CUSTOM_LOGO} alt="JonuX Logo" className="h-12 w-12 object-contain shadow-2xl" />
                ) : (
                  <div className="jonux-logo-mark relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#0a0d14] shadow-xl ring-1 ring-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                    <span className="jonux-logo-text relative z-10 text-xl font-black uppercase leading-none tracking-[-0.16em]">JX</span>
                  </div>
                )}
                <p className="luxury-title text-2xl font-black uppercase tracking-tight">JonuX</p>
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">Apps premium para inventario, catálogo web y dashboards en tiempo real. Hecho con orgullo en Guatemala.</p>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-amber-300/80">Navegación</p>
              <ul className="mt-4 space-y-2">
                {NAV.map((item) => (
                  <li key={item.id}><button type="button" onClick={() => smoothScrollTo(item.id)} className="text-sm font-bold text-white/65 transition hover:text-amber-200">{item.label}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-amber-300/80">Contacto</p>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                <li>WhatsApp: <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="font-bold text-amber-200 hover:text-amber-100">+502 5163 5253</a></li>
                <li>Email: <a href="mailto:jonuxapps@gmail.com" className="font-bold text-amber-200 hover:text-amber-100">jonuxapps@gmail.com</a></li>
                <li>Horario: L–V · 8 a.m. – 5 p.m.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-amber-300/10 pt-6 sm:flex-row">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">© {new Date().getFullYear()} JonuX Apps · Todos los derechos reservados</p>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-300/60">Diseñado y desarrollado con ❤ en Guatemala</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-300/40 transition hover:-translate-y-0.5 hover:bg-[#1ebe5b]">
        <svg className="h-7 w-7" viewBox="0 0 32 32" fill="currentColor"><path d="M19.11 17.51c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.84-2-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.96 4.68 4.04.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.58-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.06-.11-.25-.18-.52-.32zM16 4.62C9.7 4.62 4.62 9.7 4.62 16c0 2 .52 3.96 1.52 5.69L4.5 27.5l5.96-1.56A11.36 11.36 0 0 0 16 27.38C22.3 27.38 27.38 22.3 27.38 16S22.3 4.62 16 4.62z"/></svg>
      </a>
    </main>
  );
}
