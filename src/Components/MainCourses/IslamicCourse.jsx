import React from "react";
import Footer from "../footer/footer";
import style from "./MainCourse.module.css";
import islamic_name from "./Courses_assets/All.svg";
import islamic_img from "./Courses_assets/Layer_22.svg";
import { Link } from "react-router-dom";
import Footer2 from "../Footer2/Footer2";
import "animate.css";

export default function IslamicCourse() {
  const islamicTopics = [
    "Aqeedah",
    "5 pillars of Islam",
    "6 beliefs in Islam",
    "99 Names of Allah",
    "Angels",
    "Holy Books",
    "Islamic History",
    "Stories of the Prophets AS",
    "Islam in different times",
    "Challenges that Muslims faced",
    "Seerah",
    "Stories about Prophet Muhammad SAWW",
    "His companions and Family",
    "His Wives",
    "His manners, ethics, and personality",
    "His Wars",
    "Fiqh",
    "Wodua",
    "The conditions of Wudhu",
    "The obligations of Wudhu",
    "Nullifiers of the Wudhu",
    "Salah",
    "Pillars of salah",
    "Zakat",
    "Fasting",
    "Hajj",
    "Umrah",
  ];

  return (
    <>
      <section className={`courses mt-3 p-3 p-md-4 ${style.course_section}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className={`d-flex flex-wrap align-items-center justify-content-center gap-4 ${style.course_header}`}>
                <img
                  src={islamic_name}
                  alt="Islamic Course"
                  className={`img-fluid ${style.course_name_img}`}
                  loading="eager"
                  decoding="async"
                />
                <img
                  src={islamic_img}
                  alt="Islamic Illustration"
                  className={`img-fluid ${style.img_size}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                className={`row justify-content-center mt-4 ${style.course_description}`}
              >
                <div className="col-lg-10 col-md-12">
                  <div className={style.course_text_box}>
                    <h3 className={style.course_title}>
                      Islamic studies courses offer a comprehensive exploration
                      of Islam, its history, traditions, and practices.
                    </h3>

                    <p className={style.course_paragraph}>
                      At Burhan Academy, each student follows a personalized
                      learning journey based on their age and level. Beginners
                      start from the basics and gradually build strong Islamic
                      knowledge.
                    </p>

                    <p className={style.course_paragraph}>
                      Parents receive monthly reports to track their children's
                      progress.
                    </p>

                    <hr className={style.course_divider} />

                    <h4 className={style.section_subtitle}>
                      What will you learn?
                    </h4>

                    <ul className={style.course_list}>
                      {islamicTopics.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className={style.course_link_wrapper}>
                      <h2 className="m-0">
                        <Link
                          to="/islamic-courses"
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
