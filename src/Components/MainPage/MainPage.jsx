import React, { useEffect, useState } from "react";
import kidImg from "../../assets/Kid.svg";
import style from "./MainPage.module.css";
import Footer from "../footer/footer";
import { Link } from "react-router-dom";
import islamicIcon from "../../assets/islamic.svg";
import quranIcon from "../../assets/quran.svg";
import arabicIcon from "../../assets/3en.svg";
import kidDarkImg from "../../assets/illustration_dark_mode.svg";
import kid2 from "../../assets/Kid2.svg";
import stat1 from "../../assets/Layer 12.png";
import stat2 from "../../assets/Layer 13.png";
import stat3 from "../../assets/Layer 14.png";
import stat4 from "../../assets/Layer 15.png";
import Footer2 from "../Footer2/Footer2";
import axios from "axios";
import CountUp from "react-countup";
import "animate.css";

export default function MainPage() {
  const [teachers, setTeachers] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark",
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = document.getElementById("statistics");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleGetOurTeachers = async () => {
    try {
      // ⚠️ DEV MODE BYPASS: Preventing ERR_NAME_NOT_RESOLVED
      setTeachers([]);
      return;
      /*
      const res = await axios.get(
        "https://el-burhanacademy.azurewebsites.net/MainPage/GetOurTeachers",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setTeachers(Array.isArray(res.data) ? res.data : []);
      */
    } catch (error) {}
  };

  useEffect(() => {
    handleGetOurTeachers();
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <div
            className={`row align-items-center justify-content-center ${style.padding}`}
          >
            <div className="col-lg-6 col-md-12 text-lg-start text-md-center text-center">
              <h1
                className={`animate__animated animate__fadeInRight fw-bold ${style.header}`}
              >
                Narrated `Uthman bin `Affan
              </h1>

              <h3
                className="animate__animated animate__fadeInUp text-muted"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  lineHeight: "1.7",
                }}
              >
                The Prophet (ﷺ) said, "The most superior among you (Muslims) are
                those who learn the Qur'an and teach it to others." (Bukhari)
              </h3>
            </div>

            <div className="col-lg-6 col-md-12 text-center">
              <img
                src={kidImg}
                alt="Kid"
                className={`img-fluid ${style.heroImg}`}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </main>

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className={`${style.outer_border} p-0 col-lg-6 col-md-12`}>
              <div
                className={`${style.inner_border} p-0 d-flex justify-content-center align-items-center`}
              >
                <div className={style.videoWrapper}>
                  <iframe
                    src="https://www.youtube.com/embed/2by1k1gAdxY?modestbranding=1&rel=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Courses */}
      <section className="courses mt-5 bg-white py-5">
        <div className="h2_container text-center w-100">
          <h2 className={`text-center ${style.header}`}>
            Our <span className={style._span}>Courses</span>
          </h2>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className={`card my-4 ${style.cardBorder} ${style.card}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <img
                      src={quranIcon}
                      alt="quran"
                      className={style.width_img}
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <h4 className="card-title text-center mt-3 fw-bold">
                    Quran Course
                  </h4>

                  <p
                    className="card-text text-center text-muted mb-3"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Learn Quran with tajweed.
                  </p>

                  <div className="d-flex justify-content-center">
                    <Link
                      to="/quran"
                      className="btn text-decoration-underline small"
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className={`card my-4 ${style.cardBorder} ${style.card}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <img
                      src={islamicIcon}
                      alt="islamic"
                      className={style.width__img}
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <h4 className="card-title text-center mt-3 fw-bold">
                    Islamic Course
                  </h4>

                  <p
                    className="card-text text-center text-muted mb-3"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Learn Islamic studies.
                  </p>

                  <div className="d-flex justify-content-center">
                    <Link
                      to="/islamic"
                      className="btn text-decoration-underline small"
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className={`card my-4 ${style.cardBorder} ${style.card}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <img
                      src={arabicIcon}
                      alt="arabic"
                      className={style.width__img}
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <h4 className="card-title text-center mt-3 fw-bold">
                    Arabic Course
                  </h4>

                  <p
                    className="card-text text-center text-muted mb-3"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Learn Arabic language.
                  </p>

                  <div className="d-flex justify-content-center">
                    <Link
                      to="/arabic"
                      className="btn text-decoration-underline small"
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Courses */}

      {/* Why Us ? */}
      <section className="whyUs mt-5">
        <div className="h2_container w-75 mx-auto">
          <h2 className={`text-center ${style.header}`}>
            Why <span className={style._span2}>Us ?</span>
          </h2>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className={`${style.__desc} my-3`}>
                <h5 className="p-3 text-black text-md-center m-0">
                  Free trail sessions
                </h5>
              </div>

              <div className={`${style.__desc} my-3`}>
                <h5 className="p-3 text-black text-md-center m-0">
                  1 to 1 live Quran, Arabic and Islamic classes
                </h5>
              </div>

              <div className={`${style.__desc} my-3`}>
                <h5 className="p-3 text-black text-md-center m-0">
                  Personal teacher deals with individual student in the class
                </h5>
              </div>

              <div className={`${style.__desc} my-3`}>
                <h5 className="p-3 text-black text-md-center m-0">
                  Timing that suit you
                </h5>
              </div>

              <div className={`${style.__desc} my-3`}>
                <h5 className="p-3 text-black text-md-center m-0">
                  Qualified male and female Teachers from Alazhar University
                </h5>
              </div>

              <div className={`${style.__desc} my-3`}>
                <h5 className="p-3 text-black text-md-center m-0">
                  Special focus on slow learners
                </h5>
              </div>

              <div className={`${style.__desc} my-3`}>
                <h5 className="p-3 text-black text-md-center m-0">
                  Daily progress assessment and feedback
                </h5>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 text-center">
              <img
                src={kid2}
                alt="Kid2"
                className="img-fluid"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Why Us ? */}

      {/* customer voice */}
      <section className="customerVoice my-5 bg-white py-5">
        <div className="h2_container w-100">
          <h2 className={`text-center ${style.header}`}>
            Customer <span className={style._span}>Voice</span>
          </h2>
        </div>

        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div
                  className={`carousel-inner text-center ${style.cardBorder}`}
                >
                  <div className="carousel-item active">
                    <div
                      className={`card p-5 ${style.cardBorder} border-0 shadow-sm`}
                    >
                      <div className="card-body text-center py-5">
                        <i className="fa-solid fa-comments fs-1 text-secondary mb-3"></i>
                        <h5 className="text-muted fs-4">Coming Soon</h5>
                        <p className="text-muted">
                          We are collecting our customers' reviews. Stay tuned!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* customer voice */}

      {/* statistics */}
      <section className="statistics my-5" id="statistics">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <img
                    src={stat1}
                    alt="teachers stat"
                    className="text-center m-2 img-fluid"
                    loading="lazy"
                    decoding="async"
                  />
                  <h2 className="card-title fw-bold display-6">
                    +{startCounting ? <CountUp end={70} duration={1.5} /> : 0}
                  </h2>
                  <p
                    className="text-black-50 mb-0"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Teachers
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <img
                    src={stat2}
                    alt="students stat"
                    className="text-center m-2 img-fluid"
                    loading="lazy"
                    decoding="async"
                  />
                  <h2 className="card-title fw-bold display-6">
                    +{startCounting ? <CountUp end={3000} duration={1.5} /> : 0}
                  </h2>
                  <p
                    className="text-black-50 mb-0"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Students
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <img
                    src={stat3}
                    alt="families stat"
                    className="text-center m-2 img-fluid"
                    loading="lazy"
                    decoding="async"
                  />
                  <h2 className="card-title fw-bold display-6">
                    +{startCounting ? <CountUp end={1500} duration={1.5} /> : 0}
                  </h2>
                  <p
                    className="text-black-50 mb-0"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Families
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <img
                    src={stat4}
                    alt="countries stat"
                    className="text-center m-2 img-fluid"
                    loading="lazy"
                    decoding="async"
                  />
                  <h2 className="card-title fw-bold display-6">
                    +{startCounting ? <CountUp end={40} duration={1.5} /> : 0}
                  </h2>
                  <p
                    className="text-black-50 mb-0"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Countries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* statistics */}

      {/* Our Teachers */}
      <section className="teachers my-5 bg-white py-3">
        <div className="h2_container w-75 mx-auto">
          <h2 className={`text-center ${style.header}`}>
            Meet our <span className={style._span2}>Teachers</span>
          </h2>
        </div>

        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div id="carouselExample" className="carousel slide">
                {teachers.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="text-muted">
                      No teachers available at the moment.
                    </h5>
                    <p className="text-muted small">Please check back later.</p>
                  </div>
                ) : (
                  <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner text-center">
                      {teachers.map((teacher, index) => (
                        <div
                          key={teacher.id || teacher.name || index}
                          className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                          <div className="card p-4 p-md-5">
                            <div className="card-body">
                              <h5 className="card-title text-center">
                                <div className="image w-50 text-center mx-auto">
                                  <img
                                    src={
                                      teacher.imgPath
                                        ? teacher.imgPath
                                        : "https://via.placeholder.com/90x90"
                                    }
                                    alt={teacher.name || "teacher"}
                                    className="rounded rounded-circle"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                    }}
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                              </h5>

                              <h6
                                className="card-subtitle mb-2 text-dark fw-bold text-center"
                                style={{
                                  fontSize: "clamp(1.25rem, 2vw, 2rem)",
                                }}
                              >
                                {teacher.name}
                              </h6>

                              <p className="card-text fs-6 text-muted">
                                {teacher.aboutMe}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon bg-dark"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon bg-dark"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                )}

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon bg-dark"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Teachers */}

      <Footer />
      <Footer2 />
    </>
  );
}
