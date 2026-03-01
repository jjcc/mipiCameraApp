"use client";

import { useEffect, useRef } from "react";
import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const productLinks = [
  "MIPI CSI-2 Modules",
  "USB Cameras",
  "DVP Modules",
  "Global Shutter",
  "Custom Solutions",
];

const companyLinks = ["About Us", "News & Events", "Careers", "Partners"];

const supportLinks = ["Documentation", "FAQs", "Contact Us", "Request Quote"];

const socialLinks = [
  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const els = footerRef.current?.querySelectorAll(".animate-on-scroll");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="bg-brand-bg pt-16 pb-8">
      <div className="container-main">
        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2 animate-on-scroll">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span
                  className="text-white font-bold text-lg leading-none"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  C
                </span>
              </div>
              <span
                className="font-semibold text-xl text-brand-dark"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                MetaVue
              </span>
            </div>
            <p
              className="text-brand-text text-sm leading-relaxed mb-6 max-w-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Advanced imaging solutions for the modern world. High-performance camera
              modules for industrial and consumer applications.
            </p>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                { icon: <Mail className="w-4 h-4 text-primary" />, text: "sales@camvista.com" },
                { icon: <Phone className="w-4 h-4 text-primary" />, text: "+1 (555) 123-4567" },
                { icon: <MapPin className="w-4 h-4 text-primary" />, text: "Shenzhen, China" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-brand-text"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-text hover:text-primary hover:shadow-md transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="animate-on-scroll stagger-1">
            <h6
              className="font-semibold text-brand-dark mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Products
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-brand-text hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="animate-on-scroll stagger-2">
            <h6
              className="font-semibold text-brand-dark mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Company
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-brand-text hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="animate-on-scroll stagger-3">
            <h6
              className="font-semibold text-brand-dark mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Support
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-brand-text hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="animate-on-scroll stagger-4 pt-8 border-t border-brand-silver">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-sm text-brand-gray"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              © 2025 MetaVue. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-brand-gray hover:text-primary transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
