import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Header.module.css";
import logo from "../../assets/footerAssets/Borhan-logo.svg";
import { cookieExists, deleteCookie } from "../../Helper/CookieHelper";
import "animate.css";

export default function Header() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { pathname } = useLocation();

  useEffect(() => {
    // Auto-close navbar collapse on route change (Mobile)
    const navbarCollapse = document.getElementById("navbarNavDropdown");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      // Create a dummy click on the toggler or use native Bootstrap hide if available
      const toggler = document.querySelector(`.${style.togglerBtn}`);
      if (toggler) toggler.click();
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("AccessToken");
    sessionStorage.removeItem("Full_Name");
    deleteCookie("refreshToken");
    deleteCookie("Full_Name");
    deleteCookie("AccessToken");
    window.location.href = "";
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <header className={`sticky-top ${style.headerWrapper}`}>
      <nav className={`navbar navbar-expand-lg ${style.navbarCustom}`}>
        <div className="container-fluid">
          <Link
            className={`navbar-brand ${style.brand} animate__animated animate__fadeInDown`}
            onClick={scrollToTop}
            to="/"
          >
            <img
              src={logo}
              alt="El-Burhan Academy logo"
              className={style.logo}
            />
            <span className={style.brandText}>El-Burhan Academy</span>
          </Link>

          <div className="d-flex align-items-center ms-auto pe-2 d-lg-none">
            <button 
               className="btn border-0 d-flex align-items-center justify-content-center" 
               onClick={toggleTheme} 
               style={{background: 'transparent', width: '40px', height: '40px'}}
               title="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                 <i className="fa-solid fa-sun fs-4" style={{color: '#f1c40f'}}></i>
              ) : (
                 <i className="fa-solid fa-moon fs-4" style={{color: '#34495e'}}></i>
              )}
            </button>
            <button
              className={`navbar-toggler ${style.togglerBtn} ms-2`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${style.navCollapse}`}
            id="navbarNavDropdown"
          >
            <ul className={`navbar-nav m-auto ${style.navList}`}>
              <li className={`nav-item dropdown ${style.navItem}`}>
                <button
                  className={`btn btn-light dropdown-toggle bg-transparent border-0 ${style.navButton}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Courses
                </button>
                <ul className="dropdown-menu dropdown-menu-light">
                  <li>
                    <Link className="dropdown-item" to="/quran">
                      Quran Course
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/islamic">
                      Islamic Course
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/arabic">
                      Arabic Course
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={`nav-item dropdown ${style.navItem}`}>
                <button
                  className={`btn btn-light dropdown-toggle bg-transparent border-0 ${style.navButton}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Education
                </button>
                <ul className="dropdown-menu dropdown-menu-light">
                  <li>
                    <Link className="dropdown-item" to="/scholarships">
                      Scholarships
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/quality-assurance">
                      Quality Assurance
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/teaching-methodology">
                      Teaching Methodology
                    </Link>
                  </li>
                </ul>
              </li>



              <li className={`nav-item ${style.single_link} ${style.navItem}`}>
                <Link className={`nav-link active ${style.navLink}`} to="/blog">
                  Blog
                </Link>
              </li>

              <li className={`nav-item ${style.single_link} ${style.navItem}`}>
                <Link
                  className={`nav-link active ${style.navLink}`}
                  to="/teachers"
                >
                  Teachers
                </Link>
              </li>

              <li className={`nav-item dropdown ${style.navItem}`}>
                <button
                  className={`btn btn-light dropdown-toggle bg-transparent border-0 ${style.navButton}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </button>
                <ul className="dropdown-menu dropdown-menu-light">
                  <li>
                    <Link className="dropdown-item" to="/join-as-teacher">
                      Join as a Teacher
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/free-trial">
                      Get Free Trial
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/faqs">
                      FAQs
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <button 
               className="btn border-0 mx-2 align-items-center justify-content-center d-none d-lg-flex" 
               onClick={toggleTheme} 
               style={{background: 'transparent', transition: 'all 0.3s ease', width: '40px', height: '40px'}}
               title="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                 <i className="fa-solid fa-sun fs-4" style={{color: '#f1c40f'}}></i>
              ) : (
                 <i className="fa-solid fa-moon fs-4" style={{color: '#34495e'}}></i>
              )}
            </button>

            {!cookieExists("refreshToken") ? (
              <div
                className={`${style.login_container} navbar-nav ${style.authButtons}`}
              >
                <Link to="/login" className={style.authLink}>
                  <button
                    className={`btn btn-light ${style.contact_btn} ${style.login}`}
                  >
                    Login
                  </button>
                </Link>

                <Link to="/signup" className={style.authLink}>
                  <button
                    className={`btn btn-light ${style.contact_btn} ${style.signup}`}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <div
                className={`${style.login_container} navbar-nav ${style.authButtons}`}
              >
                <Link
                  className={`btn btn-light ${style.contact_btn} ${style.contact} ${style.authLinkBtn}`}
                  to="/FamilyDashboard"
                >
                  Dashboard
                </Link>

                <Link
                  className={`btn btn-light ${style.contact_btn} ${style.contact} ${style.authLinkBtn}`}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
