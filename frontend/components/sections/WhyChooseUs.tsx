"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Settings, Headphones, Truck, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Quality Assurance",
    description:
      "Rigorous testing and ISO-certified manufacturing processes ensure every module meets the highest standards.",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Custom Solutions",
    description:
      "Tailored designs to meet your specific requirements, from form factor to image processing.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Technical Support",
    description:
      "Expert engineering team provides seamless integration support throughout your project.",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Fast Delivery",
    description:
      "Streamlined production with global logistics network for on-time delivery worldwide.",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Products" },
  { value: 50, suffix: "+", label: "Engineers" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
];

function Counter({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span
      className="text-4xl md:text-5xl font-semibold text-primary"
      style={{ fontFamily: "Fraunces, serif" }}
    >
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setCountersStarted(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    const els = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text + features */}
          <div>
            <h2 className="animate-on-scroll text-white mb-6">Why Choose MetaVue</h2>
            <p
              className="animate-on-scroll stagger-1 text-lg text-white/80 mb-10 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Your trusted partner for camera module solutions. We combine cutting-edge
              technology with exceptional service to deliver imaging solutions that exceed
              expectations.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`animate-on-scroll stagger-${i + 2} flex items-start gap-4`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-white">
                    {feat.icon}
                  </div>
                  <div>
                    <h4
                      className="text-lg font-medium text-white mb-1"
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {feat.title}
                    </h4>
                    <p
                      className="text-white/70 text-sm leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-on-scroll stagger-6">
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center px-8 py-3 bg-white text-primary font-medium rounded-lg transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] group cursor-pointer border-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Get a Quote
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="animate-on-scroll stagger-3">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 text-center hover:bg-white/15 transition-colors duration-300"
                >
                  <Counter value={stat.value} suffix={stat.suffix} started={countersStarted} />
                  <div
                    className="text-white/70 text-sm mt-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
