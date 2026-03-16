"use client";

import Image from "next/image";
import { useState, useEffect, useRef, type ReactNode } from "react";

const projects = [
  {
    label: "Leadership Platform",
    type: "SaaS Landing Page",
    images: ["/screenshots/tpsi-hero.png", "/screenshots/tpsi-dashboard.png"],
  },
  {
    label: "Creative Portfolio",
    type: "Portfolio Website",
    images: [
      "/screenshots/denver-portfolio.png",
      "/screenshots/denver-services.png",
    ],
  },
  {
    label: "Consulting Website",
    type: "Professional Services",
    images: [
      "/screenshots/linda-hero.png",
      "/screenshots/linda-expertise.png",
    ],
  },
  {
    label: "Advisory Website",
    type: "Personal Brand",
    images: [
      "/screenshots/lynne-advisory.png",
      "/screenshots/lynne-section.png",
    ],
  },
];

const benefits = [
  {
    title: "Speed",
    description:
      "Your website delivered in under five days with a clear process from brief to launch.",
  },
  {
    title: "Clarity",
    description:
      "A clean structure that makes what you do and who you serve immediately clear.",
  },
  {
    title: "Content Support",
    description:
      "I help structure and write your website content so it reads clearly and confidently.",
  },
  {
    title: "Fair Pricing",
    description:
      "Professional websites without inflated agency fees and transparent pricing.",
  },
];

const steps = [
  {
    title: "Brief",
    description:
      "Tell me about your business and what you need your website to achieve.",
  },
  {
    title: "Design",
    description:
      "I structure the messaging and visual layout so your offer is immediately clear.",
  },
  {
    title: "Build",
    description:
      "Your website is built quickly using a modern, responsive framework.",
  },
  {
    title: "Launch",
    description: "Your site goes live — typically in under five days, dependent on scope.",
  },
];

const offerings = [
  "Personal brand websites",
  "Consultant & advisory websites",
  "Small business websites",
  "Portfolio & creative sites",
  "Professional landing pages",
];

function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function BrowserFrame({
  children,
  label,
  type,
}: {
  children: ReactNode;
  label: string;
  type: string;
}) {
  return (
    <div className="group">
      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
        <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="w-3 h-3 rounded-full bg-gray-300" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded-md h-6 max-w-xs mx-auto" />
          </div>
        </div>
        <div className="bg-white overflow-hidden">{children}</div>
      </div>
      {label && (
        <div className="mt-4 px-1">
          <p className="text-sm font-medium text-[var(--color-charcoal)]">
            {label}
          </p>
          {type && (
            <p className="text-xs text-gray-400 mt-0.5">{type}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await fetch("https://formspree.io/f/mnjgglae", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-light text-[var(--color-charcoal)]">
          Thank you.
        </p>
        <p className="text-gray-500 mt-2">
          I&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5 border border-gray-200 rounded-xl p-8">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600 mb-1.5"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600 mb-1.5"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-600 mb-1.5"
        >
          Tell me about the website you need
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[var(--color-charcoal)] text-white py-3.5 rounded-lg text-sm font-medium tracking-wide hover:bg-black transition-colors cursor-pointer"
      >
        Send project details
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-light tracking-[0.25em] text-[var(--color-charcoal)]">
            ELEVATED ONLINE PRESENCE
          </span>
          <a
            href="#contact"
            className="text-sm text-gray-500 hover:text-[var(--color-charcoal)] transition-colors"
          >
            Discuss your project
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[var(--color-charcoal)]">
              Professional websites
              <br />
              built in under{" "}
              <span className="text-[var(--color-accent)]">5 days.</span>
            </h1>
          </FadeIn>
          <FadeIn>
            <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
              For founders, consultants and small businesses who need a
              professional online presence — fast. Clear messaging, strong
              design, content support, and pricing that makes sense.
            </p>
          </FadeIn>
          <FadeIn>
            <p className="mt-7 text-sm text-gray-400 max-w-2xl italic">
              Designed and built by a senior executive with real business
              experience.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="mt-10 flex gap-4">
              <a
                href="#work"
                className="inline-flex items-center px-7 py-3.5 bg-[var(--color-charcoal)] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors tracking-wide"
              >
                See recent work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-3.5 border border-gray-200 text-sm font-medium rounded-lg hover:border-gray-400 transition-colors tracking-wide text-[var(--color-charcoal)]"
              >
                Discuss your project
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <div className="h-px bg-[#e2e2e2]" />
      </div>

      {/* Why Work With Me */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] uppercase mb-4">
              Why work with me
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-20">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <FadeIn key={b.title}>
                <div>
                  <div className="w-10 h-px bg-[var(--color-accent)]" />
                  <h3 className="mt-4 text-lg font-medium text-[var(--color-charcoal)]">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] text-[#5a5a5a] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <div className="h-px bg-[#e2e2e2]" />
      </div>

      {/* How it Works */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] uppercase mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-16">
              From brief to launch in four steps.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <FadeIn key={step.title}>
                <div className="space-y-3">
                  <div className="w-8 h-px bg-[var(--color-accent)]" />
                  <p className="text-xs text-gray-300 font-medium tracking-widest">
                    0{i + 1}
                  </p>
                  <h3 className="text-lg font-medium text-[var(--color-charcoal)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-[#5a5a5a] leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <div className="h-px bg-[#e2e2e2]" />
      </div>

      {/* Recent Websites */}
      <section id="work" className="py-20 md:py-32 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] uppercase mb-4">
              Recent work
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-16">
              Websites built for real businesses.
            </h2>
          </FadeIn>

          <div className="space-y-20">
            {projects.map((project) => (
              <FadeIn key={project.label}>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.images.map((img, i) => (
                    <BrowserFrame
                      key={i}
                      label={i === 0 ? project.label : ""}
                      type={i === 0 ? project.type : ""}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={img}
                          alt={`${project.label} screenshot`}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </BrowserFrame>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What I Build */}
      <section className="py-20 md:py-32 px-6 bg-[var(--color-warm)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] uppercase mb-4">
              What I build
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-12">
              Websites that work as hard as you do.
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {offerings.map((item) => (
                <span
                  key={item}
                  className="px-5 py-2.5 bg-white rounded-full text-sm text-[var(--color-charcoal)] border border-gray-100 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-12 text-gray-500 max-w-xl mx-auto leading-relaxed">
              Every website is designed mobile-first, built for speed, and
              structured to clearly communicate your value. You get a complete,
              launch-ready site — not a template with placeholder text.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-32 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)] uppercase mb-4">
              Discuss your project
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-4">
              Let&apos;s discuss your project
            </h2>
            <p className="text-gray-500 mb-12 max-w-md mx-auto">
              Describe the website you need and I&apos;ll get back to you within
              24 hours with a plan and a quote.
            </p>
          </FadeIn>
          <FadeIn>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs tracking-[0.15em] text-gray-400">
            ELEVATED ONLINE PRESENCE
          </span>
          <span className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </main>
  );
}
