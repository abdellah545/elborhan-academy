import React from "react";
import MainDetailed from "./MainDetailed";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";

export default function QuranDetailedCourses() {
  return (
    <>
      <MainDetailed
        courses_name="Quran"
        courses_description="Quran Courses"
        course1="Quran1"
        course1_description="Quran Courses"
        course2="Quran2"
        course2_description="Quran Courses"
        course3="Quran3"
        course3_description="Quran Courses"
        course4="Quran4"
        course4_description="Quran Courses"
        course5="Quran5"
        course5_description="Quran Courses"
        course6="Quran6"
        course6_description="Quran Courses"
        course7="Quran7"
        course7_description="Quran Courses"
        course8="Quran8"
        course8_description="Quran Courses"
        // اللي تحت دي مهمه
        category="HolyQuran"
      />

      <Footer />
      <Footer2 />
    </>
  );
}
