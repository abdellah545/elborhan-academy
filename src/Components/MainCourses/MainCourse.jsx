// import React from "react";
// import Footer from "../footer/footer";
// import style from "./MainCourse.module.css";
// import quranImage from "./Courses_assets/Quran.png";
// import quran__image from "./Courses_assets/Course_quran.png";
// import { Link } from "react-router-dom";
// import Footer2 from "../Footer2/Footer2";
// import "animate.css";

// export default function MainCourses(props) {
//   return (
//     <>
//       <section className="courses mt-5 p-5">
//         <div className="container">
//           <div className="row align-items-center justify-content-center">
//             <div className="col-lg-12 col-md-12">
//               <div className="row align-items-center">
//                 <div className="col-lg-10 col-md-12">
//                   <img src={props.course_title} alt="" className="img-fluid" />
//                 </div>
//                 <div className="col-lg-2 d-none d-lg-block ">
//                   <div className="img">
//                     <img src={props.course_img} alt="" className="img-fluid" />
//                   </div>
//                 </div>
//               </div>
//               <div className="course_desc row justify-content-center mt-4 text-lg-start text-xs-center text-sm-center">
//                 <div className="col-lg-10 col-md-12">
//                   <h3>
//                     {props.course_desc1} <br />
//                     <br />
//                     <hr />
//                     <br />
//                     {props.course_desc2}
//                     <br />
//                     <br />
//                   </h3>
//                   <hr />
//                   <br />
//                   <div className="arabic_course_states">
//                     {
//                       props.course_state_paragraph &&
//                       <>
//                         <h4 className="fw-bold fs-2 text-center text-danger">
//                           {props.course_state_paragraph}
//                         </h4>
//                         <ul className="fw-bold fs-2">
//                           <li>{props.list1}</li>
//                           <li>{props.list2}</li>
//                           <li>{props.list3}</li>
//                           <li>{props.list4}</li>
//                           <li>{props.list5}</li>
//                           <li>{props.list6}</li>
//                           <li>{props.list7}</li>
//                           <li>{props.list8}</li>
//                           <li>{props.list9}</li>
//                           <li>{props.list10}</li>
//                           <li>{props.list11}</li>
//                           <li>{props.list12}</li>
//                           <li>{props.list13}</li>
//                           <li>{props.list14}</li>
//                           <li>{props.list15}</li>
//                           <li>{props.list16}</li>
//                           <li>{props.list17}</li>
//                           <li>{props.list18}</li>
//                           <li>{props.list19}</li>
//                           <li>{props.list20}</li>
//                           <li>{props.list21}</li>
//                           <li>{props.list22}</li>
//                           <li>{props.list23}</li>
//                           <li>{props.list24}</li>
//                           <li>{props.list25}</li>
//                           <li>{props.list26}</li>
//                           <li>{props.list27}</li>
//                         </ul>
//                       </>
//                     }
//                     {/* <br /> */}
//                     <h2 className="text-danger text-decoration-underline fw-bold">
//                       {props.level1_title}
//                     </h2>
//                     <h3>{props.level1_desc}</h3>
//                     <br />
//                     <h2 className="text-danger text-decoration-underline fw-bold">
//                       {props.level2_title}
//                     </h2>
//                     <h3>{props.level2_desc}</h3>
//                     <br />
//                     <h2 className="text-danger text-decoration-underline fw-bold">
//                       {props.level3_title}
//                     </h2>
//                     <h3>{props.level3_desc}</h3>
//                     <br />
//                     <h2>{props.Footer}</h2>
//                     {/* <br /> */}
//                   </div>
//                   <h1 className="animate__animated animate__headShake animate__infinite">
//                     <Link
//                       to={props.detailed_Course}
//                       className="text-black text-decoration-underline fw-bold"
//                     >
//                       Click here to see{" "}
//                       <span className={`${style.text_color}`}>
//                         Our Courses!
//                       </span>
//                     </Link>
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <section className={`teachers pt-5`}>
//           <h1 className="text-center fw-bold">
//             Course’s <span className={`${style.text_color}`}>Teachers</span>
//           </h1>
//           <div className="container my-5">
//             <div className="row justify-content-center">
//               <div className="col-lg-12">
//                 <div id="carouselExample" class="carousel slide">
//                   <div class={`carousel-inner ${style.cardBorder}`}>
//                     <div class="carousel-item active">
//                       <div class={`card bg-transparent ${style.cardBorder}`}>
//                         <div class="card-body">
//                           <h5 class="card-title text-center">
//                             <div className="image">
//                               <img
//                                 src="https://via.placeholder.com/100x100"
//                                 alt=""
//                                 className="rounded-circle"
//                               />
//                             </div>
//                           </h5>
//                           <h6 class="card-subtitle mb-2 text-muted text-center">
//                             Teacher
//                           </h6>
//                           <div className="w-75 mx-auto">
//                             <p class="card-text text-center mt-3 fs-5">
//                               Lorem ipsum dolor sit amet consectetur adipisicing
//                               elit. Porro, praesentium accusantium excepturi
//                               adipisci aliquam explicabo perspiciatis nisi,
//                               temporibus voluptatum quasi, dicta corporis! Earum
//                               voluptas molestiae dignissimos mollitia quod
//                               dolorum assumenda eum quaerat, debitis cum quos
//                               optio. Totam vero quam eum autem voluptate
//                               corporis error quod eaque eius, aut corrupti
//                               nobis, delectus sed quia, magnam ea? Nostrum
//                               impedit tenetur debitis ducimus reiciendis optio
//                               fugit, iure, eius, eaque non tempora! Ipsum ullam
//                               labore blanditiis inventore doloremque fugit
//                               corrupti voluptas itaque laudantium deleniti
//                               aliquid nobis nemo, veniam velit necessitatibus,
//                               ipsa delectus nam vitae! Qui cumque debitis sunt
//                               sint in esse eveniet placeat repellat?
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div class="carousel-item">
//                       <div
//                         class={`card px-5 bg-transparent ${style.cardBorder}`}
//                       >
//                         <div class="card-body">
//                           <h5 class="card-title text-center">
//                             <div className="image">
//                               <img
//                                 src="https://via.placeholder.com/100x100"
//                                 alt=""
//                                 className="rounded-circle"
//                               />
//                             </div>
//                           </h5>
//                           <h6 class="card-subtitle mb-2 text-muted text-center">
//                             Teacher
//                           </h6>
//                           <div className="w-75 mx-auto">
//                             <p class="card-text text-center mt-3 fs-5">
//                               Lorem ipsum dolor sit amet consectetur adipisicing
//                               elit. Porro, praesentium accusantium excepturi
//                               adipisci aliquam explicabo perspiciatis nisi,
//                               temporibus voluptatum quasi, dicta corporis! Earum
//                               voluptas molestiae dignissimos mollitia quod
//                               dolorum assumenda eum quaerat, debitis cum quos
//                               optio. Totam vero quam eum autem voluptate
//                               corporis error quod eaque eius, aut corrupti
//                               nobis, delectus sed quia, magnam ea? Nostrum
//                               impedit tenetur debitis ducimus reiciendis optio
//                               fugit, iure, eius, eaque non tempora! Ipsum ullam
//                               labore blanditiis inventore doloremque fugit
//                               corrupti voluptas itaque laudantium deleniti
//                               aliquid nobis nemo, veniam velit necessitatibus,
//                               ipsa delectus nam vitae! Qui cumque debitis sunt
//                               sint in esse eveniet placeat repellat?
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div class="carousel-item">
//                       <div
//                         class={`card px-5 bg-transparent ${style.cardBorder}`}
//                       >
//                         <div class="card-body">
//                           <h5 class="card-title text-center">
//                             <div className="image">
//                               <img
//                                 src="https://via.placeholder.com/100x100"
//                                 alt=""
//                                 className="rounded-circle"
//                               />
//                             </div>
//                           </h5>
//                           <h6 class="card-subtitle mb-2 text-muted text-center">
//                             Teacher
//                           </h6>
//                           <div className="w-75 mx-auto">
//                             <p class="card-text text-center mt-3 fs-5">
//                               Lorem ipsum dolor sit amet consectetur adipisicing
//                               elit. Porro, praesentium accusantium excepturi
//                               adipisci aliquam explicabo perspiciatis nisi,
//                               temporibus voluptatum quasi, dicta corporis! Earum
//                               voluptas molestiae dignissimos mollitia quod
//                               dolorum assumenda eum quaerat, debitis cum quos
//                               optio. Totam vero quam eum autem voluptate
//                               corporis error quod eaque eius, aut corrupti
//                               nobis, delectus sed quia, magnam ea? Nostrum
//                               impedit tenetur debitis ducimus reiciendis optio
//                               fugit, iure, eius, eaque non tempora! Ipsum ullam
//                               labore blanditiis inventore doloremque fugit
//                               corrupti voluptas itaque laudantium deleniti
//                               aliquid nobis nemo, veniam velit necessitatibus,
//                               ipsa delectus nam vitae! Qui cumque debitis sunt
//                               sint in esse eveniet placeat repellat?
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     class="carousel-control-prev"
//                     type="button"
//                     data-bs-target="#carouselExample"
//                     data-bs-slide="prev"
//                   >
//                     <span
//                       class="carousel-control-prev-icon bg-dark"
//                       aria-hidden="true"
//                     ></span>
//                     <span class="visually-hidden">Previous</span>
//                   </button>
//                   <button
//                     class="carousel-control-next"
//                     type="button"
//                     data-bs-target="#carouselExample"
//                     data-bs-slide="next"
//                   >
//                     <span
//                       class="carousel-control-next-icon bg-dark"
//                       aria-hidden="true"
//                     ></span>
//                     <span class="visually-hidden">Next</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section> */}
//         {/* <section className="plan">
//           <h1 className={`text-center my-5 ${style.font_weight}`}>Plans</h1>
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-4 col-md-6">
//                 <div className="card border border-black mb-md-4 mb-sm-4">
//                   <div className="card-body">
//                     <h5 className={`card-title text-center mb-5 ${style.h5_}`}>
//                       <span className={`${style.h5_span} position-relative`}>
//                         5
//                       </span>{" "}
//                       per hour
//                     </h5>
//                     <ul className="mb-5">
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                     </ul>
//                     <p className="text-center">
//                       <Link to="/enroll" className={`${style.a_}`}>
//                         Choose Plan
//                       </Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6">
//                 <div className="card border border-black mb-md-4 mb-sm-4 bg-black text-white">
//                   <div className="card-body">
//                     <h5 className={`card-title text-center mb-5 ${style.h5_}`}>
//                       <span className={`${style.h5_span} position-relative`}>
//                         5
//                       </span>{" "}
//                       per hour
//                     </h5>
//                     <ul className="mb-5">
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                     </ul>
//                     <p className="text-center">
//                       <Link
//                         to="/enroll"
//                         className={`${style.a_} bg-white text-black`}
//                       >
//                         Choose Plan
//                       </Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6">
//                 <div className="card border border-black mb-md-4 mb-sm-4">
//                   <div className="card-body">
//                     <h5 className={`card-title text-center mb-5 ${style.h5_}`}>
//                       <span className={`${style.h5_span} position-relative`}>
//                         5
//                       </span>{" "}
//                       per hour
//                     </h5>
//                     <ul className="mb-5">
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                       <li>
//                         <h4>blblblblblblblblblb</h4>
//                       </li>
//                     </ul>
//                     <p className="text-center">
//                       <Link to="/enroll" className={`${style.a_}`}>
//                         Choose Plan
//                       </Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section> */}
//       </section>
//       <Footer />
//       <Footer2 />
//     </>
//   );
// }
