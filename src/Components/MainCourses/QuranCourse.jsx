import React from "react";
import Footer from "../footer/footer";
import style from "./MainCourse.module.css";
import quran_name from "./Courses_assets/Layer_29.svg";
import quran_img from "./Courses_assets/Layer_30.svg";
import { Link } from "react-router-dom";
import Footer2 from "../Footer2/Footer2";
import "animate.css";

export default function QuranCourse() {
  return (
    <>
      <section className={`courses p-6 p-md-4 ${style.course_section}`}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12 col-md-12">
              <div className={`d-flex flex-wrap align-items-center justify-content-center gap-4 ${style.course_header}`}>
                <img
                  src={quran_name}
                  alt="Quran course title"
                  className={`img-fluid ${style.course_name_img}`}
                  loading="eager"
                  decoding="async"
                />
                <img
                  src={quran_img}
                  alt="Quran course illustration"
                  className={`img-fluid ${style.img_size}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                className={`row justify-content-center mt-4 text-lg-start text-center ${style.course_description}`}
              >
                <div className="col-lg-10 col-md-12">
                  <div className={style.course_text_box}>
                    <h3 className={style.course_title}>
                      We are pleased to be with you in your Quran memorization
                      journey. This course is designed to help you memorize the
                      Holy Quran from memory and apply tajweed rules.
                    </h3>

                    <p className={style.course_paragraph}>
                      Master the rules of Tajweed, ensuring your recitation
                      adheres perfectly. Discover efficient Quran methods and
                      techniques and master learning the Quran. Enhance your
                      recitation skills by practicing accurately and
                      continuously.
                    </p>

                    <hr className={style.course_divider} />

                    <p className={style.course_paragraph}>
                      Immerse yourself in the beauty of the Quran by memorizing
                      it with a deep understanding of its Tafsir
                      (interpretation). Develop the proficiency to flawlessly
                      recite from any part of the Quran, showcasing your
                      expertise in Hifz.
                    </p>

                    <p className={style.course_paragraph}>
                      Acquire the ability to impart your Quranic knowledge to
                      others with valuable tips and techniques for easy Hifz.
                    </p>

                    <div className={style.course_link_wrapper}>
                      <h2 className="m-0">
                        <Link to="/quran-courses" className={style.course_link}>
                          Click here to see{" "}
                          <span className={style.text_color}>Our Courses!</span>
                        </Link>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Footer2 />
    </>
  );
}
