import React, { useEffect, useState } from "react";
import Footer from "../footer/footer";
import style from "./Teachers.module.css";
import main_image from "./Teachers_assets/Layer_24-enhance-3.9x.svg";
import star_icon from "./Teachers_assets/5 Point Star 1 copy 3.png";
import star__icon from "./Teachers_assets/5 Point Star 1 copy 4.png";
import joinUS from "./Teachers_assets/Group 8 copy-enhance-4x.png";
import { Link } from "react-router-dom";
import Footer2 from "../Footer2/Footer2";
import axios from "axios";
import "animate.css";
export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const handleGetOurTeachers = async () => {
    try {
      const res = await axios.get(
        `https://el-burhanacademy.azurewebsites.net/MainPage/GetOurTeachers`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTeachers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetOurTeachers();
  }, []);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <section className="teachers">
        <div className="main_image text-center">
          <img src={main_image} alt="" className="img-fluid" />
        </div>
        <section className={`teachers py-5 ${style.bg}`}>
          <div className="h1_container w-75 mx-auto">
            <h1
              className={`text-center fw-bold animate__animated animate__pulse animate__slower animate__infinite ${style.font_size}`}
            >
              Our Teachers
            </h1>
          </div>
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className={`col-lg-12 ${style.bg}`}>
                <div
                  id="carouselExample"
                  className={`carousel slide ${style.bg}`}
                >
                  <div
                    className={`carousel-inner text-center ${style.cardBorder} ${style.bg}`}
                  >
                    {teachers.length > 0 ? (
                      teachers.map((teacher, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${style.bg} ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <div
                          className={`card p-5 ${style.cardBorder} ${style.bg}`}
                        >
                          <div className="card-body">
                            <h5 className="card-title text-center">
                              <div className="image w-50 text-center mx-auto">
                                <img
                                  src={
                                    teacher.imgPath
                                      ? teacher.imgPath
                                      : "https://via.placeholder.com/90x90"
                                  }
                                  alt=""
                                  className="rounded rounded-circle"
                                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                              </div>
                            </h5>
                            <h6 className="card-subtitle mb-2 text-dark fw-bold text-center fs-1">
                              {teacher.name}
                            </h6>
                            <p className="card-text fs-5">{teacher.aboutMe}</p>
                          </div>
                        </div>
                      </div>
                    ))
                    ) : (
                      <div className={`carousel-item active ${style.bg}`}>
                        <div className={`card p-5 ${style.cardBorder} border-0 shadow-sm ${style.bg}`}>
                          <div className="card-body text-center py-5">
                            <i className="fa-solid fa-chalkboard-user fs-1 text-secondary mb-3"></i>
                            <h5 className="text-muted fs-4">Coming Soon</h5>
                            <p className="text-muted">Currently uploading our excellent teachers. Stay tuned!</p>
                          </div>
                        </div>
                      </div>
                    )}
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
              </div>
            </div>
          </div>
          <div className="desc">
            <div className="container">
              <div className="row">
                <div className={`col-lg-12 col-md-12 p-5 ${style.bg}`}>
                  {/* <div className="star_images d-flex justify-content-between">
                    <img src={star__icon} alt="" loading="lazy" />
                    <img src={star__icon} alt="" loading="lazy" />
                    <img src={star__icon} alt="" loading="lazy" />
                    <img src={star__icon} alt="" loading="lazy" />
                    <img src={star__icon} alt="" loading="lazy" />
                    <img src={star__icon} alt="" loading="lazy" />
                    <img src={star__icon} alt="" loading="lazy" />
                  </div> */}
                  <div className="become_a_teacher">
                    <h1 className={`my-5 text-center ${style.font__size}`}>
                      DO YOU WANT TO JOIN US AS A TEACHER ?
                    </h1>
                  </div>
                  <div className="star_images d-flex justify-content-between">
                    {/* <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" /> */}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 bg-black p-5">
                  {/* <div className="star_images d-flex justify-content-between">
                    <img src={star_icon} alt="" loading="lazy" />
                    <img src={star_icon} alt="" loading="lazy" />
                    <img src={star_icon} alt="" loading="lazy" />
                    <img src={star_icon} alt="" loading="lazy" />
                    <img src={star_icon} alt="" loading="lazy" />
                    <img src={star_icon} alt="" loading="lazy" />
                    <img src={star_icon} alt="" loading="lazy" />
                  </div> */}
                  <h2 className="fw-bold text-white mb-5 text-center">
                    <i className="fa-solid fa-clipboard-list me-2 fs-3 text-warning"></i>
                    Requirements to Join
                  </h2>
                  <div className="row g-4 justify-content-center">
                    {[
                      "Full Name (First and Last name)",
                      "Email Address",
                      "Whatsapp Number",
                      "Age, Gender, Grade and Graduation Status",
                      "Communication language and levels",
                      "Ijazah URL (if applicable)",
                      "Job type (Part time or Full time)",
                      "If you have another job",
                      "Available time (Morning or Night)",
                      "Years of experience",
                      "Preferred age group to teach",
                      "CV URL & How did you hear about us"
                    ].map((req, idx) => (
                      <div className="col-lg-6 col-md-12" key={idx}>
                        <div className="d-flex align-items-center bg-dark p-3 rounded shadow-sm border border-secondary transition-hover">
                          <i className="fa-solid fa-check-circle text-success fs-4 me-3"></i>
                          <h6 className="text-white m-0 fs-5">{req}</h6>
                        </div>
                      </div>
                    ))}
                    
                    <div className="col-lg-12 col-md-12 mt-5 bg-black d-flex justify-content-center">
                      <Link
                        to="/join-as-teacher"
                        className="text-black fs-4 fw-bold btn btn-light px-5 py-3 rounded-pill shadow"
                        onClick={scrollToTop}
                      >
                        Join As A Teacher Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </section>
      <Footer />
      <Footer2 />
    </>
  );
}
