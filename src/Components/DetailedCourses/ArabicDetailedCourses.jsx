import React from "react";
import MainDetailed from "./MainDetailed";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";

export default function ArabicDetailedCourses() {
  return (
    <>
      <MainDetailed
        courses_name="Arabic"
        courses_description="Arabic Courses"
        course1="Arabic1"
        course1_description="Arabic Courses"
        course2="Arabic2"
        course2_description="Arabic Courses"
        course3="Arabic3"
        course3_description="Arabic Courses"
        course4="Arabic4"
        course4_description="Arabic Courses"
        course5="Arabic5"
        course5_description="Arabic Courses"
        course6="Arabic6"
        course6_description="Arabic Courses"
        course7="Arabic7"
        course7_description="Arabic Courses"
        course8="Arabic8"
        course8_description="Arabic Courses"
        // اللي تحت دي مهمه
        category="Arabiclanguage"
      />
      <Footer />
      <Footer2 />
    </>
  );
}
