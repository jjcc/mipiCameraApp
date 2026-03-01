"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "MetaVue's MIPI modules exceeded our expectations. The image quality and reliability are outstanding for our industrial vision systems. Their technical support team was instrumental in helping us integrate the modules seamlessly.",
    author: "John Mitchell",
    role: "CTO, TechVision Inc.",
    avatar: "/avatar-1.jpg",
  },
  {
    quote:
      "The custom camera module they developed for our diagnostic equipment was perfect. Excellent technical support throughout integration. Their attention to detail and commitment to quality is unmatched in the industry.",
    author: "Sarah Chen",
    role: "Product Manager, MediTech Solutions",
    avatar: "/avatar-2.jpg",
  },
  {
    quote:
      "We've been using MetaVue modules in our ADAS products for 3 years. Their consistency and quality are unmatched. The modules perform flawlessly in extreme temperatures and challenging conditions.",
    author: "Michael Rodriguez",
    role: "Lead Engineer, AutoVision Systems",
    avatar: "/avatar-3.jpg",
  },
  {
    quote:
      "Fast delivery, competitive pricing, and exceptional product quality. MetaVue is our go-to camera module supplier. Their team understands our requirements and always delivers beyond expectations.",
    author: "Emily Watson",
    role: "Director, RoboTech Industries",
    avatar: "/avatar-4.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-play
  useEffect(() => {
    const timer = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () =>
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goToNext = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section ref={sectionRef} className="section-padding bg-brand-bg">
      <div className="container-main">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="animate-on-scroll text-brand-dark mb-4">What Our Clients Say</h2>
          <p
            className="animate-on-scroll stagger-1 text-lg text-brand-text"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Trusted by industry leaders worldwide.
            See how our camera modules power their success.
          </p>
        </div>

        {/* Carousel */}
        <div className="animate-on-scroll stagger-2 relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote icon decoration */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-primary/30" />
            </div>

            <div className="relative z-10" style={{ minHeight: "180px" }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === activeIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 absolute inset-0 translate-x-8"
                  }`}
                >
                  <p
                    className="text-lg md:text-xl text-brand-text leading-relaxed mb-8"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <div
                        className="font-medium text-brand-dark"
                        style={{ fontFamily: "Fraunces, serif" }}
                      >
                        {t.author}
                      </div>
                      <div
                        className="text-sm text-brand-gray"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-brand-text hover:text-primary hover:shadow-lg transition-all duration-300 cursor-pointer border-none"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                    i === activeIndex
                      ? "bg-primary w-8"
                      : "w-2.5 bg-brand-silver hover:bg-brand-gray"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-brand-text hover:text-primary hover:shadow-lg transition-all duration-300 cursor-pointer border-none"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
