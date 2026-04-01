import React, { useEffect, useState } from "react";
import style from "./Footer2.module.css";
import { Link } from "react-router-dom";

export default function Footer2() {
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollTop + windowHeight >= scrollHeight - 50) {
        setHideFooter(true);
      } else {
        setHideFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${style.footerWrapper} ${hideFooter ? style.hide : ""}`}>

      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        className={`${style.fabBtn} ${style.fabFacebook}`}
        data-tooltip="Facebook"
        aria-label="Facebook"
      >
        <i className="fa-brands fa-facebook-f"></i>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/+201029312621"
        target="_blank"
        rel="noreferrer"
        className={`${style.fabBtn} ${style.fabWhatsapp}`}
        data-tooltip="WhatsApp"
        aria-label="WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Free Trial */}
      <Link
        to="/free-trial"
        className={`${style.fabBtn} ${style.fabTrial}`}
        data-tooltip="Free Trial"
        aria-label="Start Free Trial"
      >
        <i className="fa-solid fa-graduation-cap"></i>
      </Link>

    </div>
  );
}
