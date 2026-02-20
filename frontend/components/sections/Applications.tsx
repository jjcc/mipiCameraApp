"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const applications = [
  {
    title: "Industrial Automation",
    description: "Precision imaging for quality control and machine vision systems",
    image: "/app-industrial.jpg",
  },
  {
    title: "Medical Imaging",
    description: "High-resolution cameras for diagnostic equipment",
    image: "/app-medical.jpg",
  },
  {
    title: "Automotive ADAS",
    description: "Reliable vision systems for advanced driver assistance",
    image: "/app-automotive.jpg",
  },
  {
    title: "Robotics",
    description: "Embedded vision for autonomous navigation",
    image: "/app-robotics.jpg",
  },
  {
    title: "Security & Surveillance",
    description: "24/7 monitoring with superior image quality",
    image: "/app-security.jpg",
  },
  {
    title: "IoT & Embedded",
    description: "Compact cameras for smart devices",
    image: "/app-iot.jpg",
  },
];

const staggerClasses = ["stagger-1", "stagger-2", "stagger-3", "stagger-1", "stagger-2", "stagger-3"] as const;

export default function Applications() {
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
    <section id="applications" ref={sectionRef} className="section-padding bg-white">
      <div className="container-main">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="animate-on-scroll text-brand-dark mb-4">Industry Applications</h2>
          <p
            className="animate-on-scroll stagger-1 text-lg text-brand-text"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Camera modules engineered for diverse industries.
            Proven performance in demanding environments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, i) => (
            <div
              key={app.title}
              className={`animate-on-scroll ${staggerClasses[i] ?? ""} group relative overflow-hidden rounded-xl cursor-pointer`}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h4
                    className="text-xl font-medium text-white mb-2 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    {app.title}
                  </h4>
                  <p
                    className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {app.description}
                  </p>
                  <div
                    className="flex items-center text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
