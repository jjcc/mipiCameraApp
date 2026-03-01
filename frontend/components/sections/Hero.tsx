"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";


export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    const els = contentRef.current?.querySelectorAll(".animate-on-scroll");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-[#f7fbfd] to-[#e6f4fa]">
      {/* Background blurs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-brand-yellow rounded-lg animate-float opacity-60 pointer-events-none" />
      <div
        className="absolute bottom-1/3 left-[20%] w-6 h-6 bg-brand-pink rounded-full animate-float-slow opacity-60 pointer-events-none"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-4 h-4 bg-primary-light rounded-full animate-float opacity-40 pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div className="container-main relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div ref={contentRef} className="max-w-xl">
            <div className="animate-on-scroll">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Professional Camera Solutions
              </span>
            </div>

            <h1 className="animate-on-scroll stagger-1 text-brand-dark mb-6">
              Advanced{" "}
              <span className="text-primary">MIPI Camera</span>{" "}
              Modules for Precision Imaging
            </h1>

            <p
              className="animate-on-scroll stagger-2 text-lg text-brand-text leading-relaxed mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              High-performance imaging solutions engineered for industrial automation,
              medical devices, and embedded vision systems. Experience unmatched quality
              and reliability.
            </p>

            <div className="animate-on-scroll stagger-3 flex flex-wrap gap-4 mb-12">
              <button onClick={() => scrollTo("#browse")} className="btn-primary group">
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => scrollTo("#contact")} className="btn-secondary">
                Contact Sales
              </button>
            </div>

            {/* Stats */}
            <div className="animate-on-scroll stagger-4 grid grid-cols-3 gap-6">
              {[
                { value: "500+", label: "Products" },
                { value: "50+", label: "Engineers" },
                { value: "10+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-3xl font-semibold text-primary"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-brand-text" style={{ fontFamily: "Inter, sans-serif" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product image */}
          <div className="relative animate-on-scroll stagger-2">
            <div className="relative z-10">
              <img
                src="/hero-product.jpg"
                alt="MIPI Camera Module"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl animate-float-slow"
              />
            </div>

            {/* Orbiting decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none">
              <div
                className="absolute w-8 h-8 bg-brand-yellow/80 rounded-lg animate-orbit"
                style={{ animationDuration: "20s" }}
              />
              <div
                className="absolute w-6 h-6 bg-brand-pink/80 rounded-full animate-orbit"
                style={{ animationDuration: "25s", animationDirection: "reverse" }}
              />
              <div
                className="absolute w-4 h-4 bg-brand-cyan/80 rounded-full animate-orbit"
                style={{ animationDuration: "18s", animationDelay: "5s" }}
              />
            </div>

            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10 scale-75" />
          </div>
        </div>

      </div>
    </section>
  );
}
