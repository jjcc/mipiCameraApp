"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Products", href: "#categories" },
  { label: "Browse", href: "#browse" },
  { label: "Solutions", href: "#applications" },
  { label: "About", href: "#why-choose-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[75px]">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg leading-none"
                style={{ fontFamily: "Fraunces, serif" }}>
                C
              </span>
            </div>
            <span
              className="font-semibold text-xl text-brand-dark"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              MetaVue
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="link-underline text-[15px] text-brand-text hover:text-primary transition-colors duration-200 py-1 bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-primary text-sm animate-pulse-glow"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-brand-dark bg-transparent border-none cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-brand-silver py-4 animate-slide-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-[15px] text-brand-text hover:text-primary transition-colors duration-200 text-left px-4 py-2 bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="btn-primary w-full text-sm"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
