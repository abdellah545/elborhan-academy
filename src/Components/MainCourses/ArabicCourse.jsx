import React from "react";
import Footer from "../footer/footer";
import style from "./MainCourse.module.css";
import arabic_name from "./Courses_assets/Arabic_course.svg";
import arabic_img from "./Courses_assets/Layer_27.svg";
import { Link } from "react-router-dom";
import Footer2 from "../Footer2/Footer2";
import "animate.css";

export default function ArabicCourse() {
  return (
    <>
      <section className={`courses p-3 p-md-4 ${style.course_section}`}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12 col-md-12">
              {/* HEADER */}
              <div className={`d-flex flex-wrap align-items-center justify-content-center gap-4 ${style.course_header}`}>
                <img
                  src={arabic_name}
                  alt="Arabic course"
                  className={`img-fluid ${style.course_name_img}`}
                />
                <img
                  src={arabic_img}
                  alt="Arabic illustration"
                  className={`img-fluid ${style.img_size}`}
                />
              </div>

              {/* DESCRIPTION */}
              <div
                className={`row justify-content-center mt-4 text-lg-start text-center ${style.course_description}`}
              >
                <div className="col-lg-10 col-md-12">
                  <div className={style.course_text_box}>
                    <h3 className={style.course_title}>
                      Arabic language is the language of the Holy Quran, so it
                      is important for all Muslims to learn it.
                    </h3>

                    <p className={style.course_paragraph}>
                      Burhan Academy teaches Arabic from beginner to advanced
                      levels using interactive and practical methods.
                    </p>

                    <p className={style.course_paragraph}>
                      You will improve vocabulary, grammar, pronunciation, and
                      communication skills quickly.
                    </p>

                    <hr className={style.course_divider} />

                    {/* TIMELINE */}
                    <div className={style.timeline}>
                      <div className={style.timeline_item}>
                        <div className={style.timeline_dot}></div>
                        <div className={style.timeline_content}>
                          <h4>Level 1 – Beginners</h4>
                          <p>
                            Learn letters, pronunciation, and word formation.
                          </p>
                        </div>
                      </div>

                      <div className={style.timeline_item}>
                        <div className={style.timeline_dot}></div>
                        <div className={style.timeline_content}>
                          <h4>Level 2 – Intermediate</h4>
                          <p>
                            Develop reading, writing, speaking, and basic
                            conversations.
                          </p>
                        </div>
                      </div>

                      <div className={style.timeline_item}>
                        <div className={style.timeline_dot}></div>
                        <div className={style.timeline_content}>
                          <h4>Level 3 – Advanced</h4>
                          <p>
                            Practice real conversations and daily Arabic
                            expressions.
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr className={style.course_divider} />

                    <p className={style.course_paragraph}>
                      By the end of the course, you will confidently speak,
                      read, and write Arabic.
                    </p>

                    {/* CTA */}
                    <div className={style.course_link_wrapper}>
                      <h2 className="m-0">
                        <Link
                          to="/arabic-courses"
                          className={style.course_link}
                        >
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
