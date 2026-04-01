import React from "react";
import MainDetailed from "./MainDetailed";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";

export default function IslamicDetailedCourses() {
  return (
    <>
      <MainDetailed
        courses_name="Islamic"
        courses_description="Islamic Courses"
        course1="Islamic1"
        course1_description="Islamic Courses"
        course2="Islamic2"
        course2_description="Islamic Courses"
        course3="Islamic3"
        course3_description="Islamic Courses"
        course4="Islamic4"
        course4_description="Islamic Courses"
        course5="Islamic5"
        course5_description="Islamic Courses"
        course6="Islamic6"
        course6_description="Islamic Courses"
        course7="Islamic7"
        course7_description="Islamic Courses"
        course8="Islamic8"
        course8_description="Islamic Courses"
        // اللي تحت دي مهمه
        category="Forensicscience"
      />
      <Footer />
      <Footer2 />
    </>
  );
}
