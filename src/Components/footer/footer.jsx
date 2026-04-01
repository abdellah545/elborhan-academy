import React from "react";
import { Link } from "react-router-dom";
import style from "./footer.module.css";
import footerLogo from "../../assets/footerAssets/Borhan-logo.svg";

const Footer = () => {
  function scrollUp() {
    window.scrollTo(0, 0);
  }

  return (
    <section
      className={`footer p-3 text-center text-lg-start text-white-50 ${style.bg_dark}`}
    >
      <div className="container">
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-md-8 col-lg-9">
            <h1 className="fw-bold mb-4">El-Burhan Academy</h1>

            <div className="container pt-3 fs-6">
              <div className="row">
                <div className="col-6 col-md-6 col-lg-3">
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/aboutus"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/whyus"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Why us
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-md-6 col-lg-3">
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/free-trial"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Start Free Trial
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teachers"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Our Teachers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/join-as-teacher"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Join as a teacher
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-md-6 col-lg-3">
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/scholarships"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Scholarships
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/quality-assurance"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Quality assurance
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teaching-methodology"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Teaching methodology
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-6 col-md-6 col-lg-3">
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/blog"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/faqs"
                        onClick={scrollUp}
                        className="text-white-50 text-decoration-none"
                      >
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="row mt-4">
                <div className="col-12">
                  <div className={style.socialIcons}>
                    <a href="#" style={{ color: "#EE1D51" }}>
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                    <a href="#" style={{ color: "#3b5998" }}>
                      <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="#" style={{ color: "#CD201F" }}>
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="#" style={{ color: "#3949AB" }}>
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-4 col-lg-3 d-flex flex-column align-items-center justify-content-start text-center">
            <div className={style.image}>
              <img src={footerLogo} alt="footer logo" />
            </div>

            <p className={style.copyRight}>
              © 2024 El-Burhan Academy. All Rights Reserved -
              <a
                href="https://www.facebook.com/ArtOfCoding339"
                target="_blank"
                rel="noreferrer"
                className={style.copyLink}
              >
                Art of coding
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
