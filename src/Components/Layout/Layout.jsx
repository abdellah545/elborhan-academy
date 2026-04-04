import React, { useEffect } from 'react'
import Header from '../Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import DevNavBar from '../DevNavBar'
import "animate.css"

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Add light scroll animations globally
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", "animate__fadeInUp");
            entry.target.style.opacity = 1;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Using a timeout allows Outlet content to be fully rendered in DOM first
    const setupObserver = setTimeout(() => {
      const elements = document.querySelectorAll("section:not(.header):not(.footer), .card, img.img-fluid:not([class*='logo']):not([alt*='logo'])");
      elements.forEach((el) => {
        if (!el.classList.contains("animate__animated") && !el.closest('header') && !el.closest('nav') && !el.closest('.footer')) {
          el.style.opacity = 0;
          observer.observe(el);
        }
      });
    }, 150);

    return () => {
      clearTimeout(setupObserver);
      const prevElements = document.querySelectorAll("section:not(.header):not(.footer), .card, img.img-fluid:not([class*='logo']):not([alt*='logo'])");
      prevElements.forEach(el => observer.unobserve(el));
    };
  }, [pathname]);

  return (
    <div>
      <DevNavBar />
      <Header />
      <div className="layout-content" style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
    </div>
  )
}
