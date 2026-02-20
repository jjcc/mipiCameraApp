"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    const els = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-brand-yellow/40 rounded-lg animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-brand-pink/40 rounded-full animate-float-slow pointer-events-none" />
      <div
        className="absolute top-1/2 right-1/4 w-8 h-8 bg-brand-cyan/40 rounded-full animate-float pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="animate-on-scroll text-brand-dark mb-6">Ready to Get Started?</h2>
          <p
            className="animate-on-scroll stagger-1 text-lg text-brand-text mb-10 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Contact our team for a customized quote and technical consultation for your
            camera module requirements. We&apos;re here to help you find the perfect solution.
          </p>

          <div className="animate-on-scroll stagger-2 flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => scrollTo("#browse")}
              className="btn-primary group animate-pulse-glow"
            >
              Get a Quote
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollTo("#browse")} className="btn-secondary">
              View All Products
            </button>
          </div>

          <div className="animate-on-scroll stagger-3">
            <p
              className="text-sm text-brand-gray"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Free technical consultation • Fast response within 24 hours • Custom solutions
              available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
