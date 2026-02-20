"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "MIPI CSI-2 Modules",
    description: "High-speed serial interface for embedded vision applications",
    image: "/category-mipi.jpg",
    specs: "2–4 Lane | Up to 48MP",
  },
  {
    title: "USB Camera Modules",
    description: "Plug-and-play imaging for consumer devices",
    image: "/category-usb.jpg",
    specs: "USB 2.0/3.0 | UVC Compatible",
  },
  {
    title: "DVP Parallel Modules",
    description: "Traditional parallel interface solutions",
    image: "/category-dvp.jpg",
    specs: "8/10/12-bit | Low Latency",
  },
  {
    title: "Global Shutter",
    description: "Motion-blur free imaging for industrial applications",
    image: "/category-global.jpg",
    specs: "High Speed | No Distortion",
  },
  {
    title: "Auto-Focus Modules",
    description: "Dynamic focusing for versatile applications",
    image: "/category-autofocus.jpg",
    specs: "VCM Actuator | Fast AF",
  },
  {
    title: "Custom Solutions",
    description: "Tailored camera modules for specific requirements",
    image: "/category-custom.jpg",
    specs: "OEM/ODM | Full Customization",
  },
];

const staggerClasses = [
  "stagger-1",
  "stagger-2",
  "stagger-3",
  "stagger-4",
  "stagger-5",
  "stagger-6",
] as const;

export default function ProductCategories() {
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

  return (
    <section id="categories" ref={sectionRef} className="section-padding bg-brand-bg">
      <div className="container-main">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="animate-on-scroll text-brand-dark mb-4">Product Categories</h2>
          <p
            className="animate-on-scroll stagger-1 text-lg text-brand-text"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Comprehensive camera module solutions for every application.
            From standard interfaces to custom designs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`animate-on-scroll ${staggerClasses[i] ?? ""} group`}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-card card-hover h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-medium text-primary rounded-full"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {cat.specs}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4
                    className="text-xl font-medium text-brand-dark mb-2"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    {cat.title}
                  </h4>
                  <p
                    className="text-brand-text text-sm mb-4 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {cat.description}
                  </p>
                  <button
                    className="inline-flex items-center text-primary font-medium text-sm group/btn bg-transparent border-none cursor-pointer p-0"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
