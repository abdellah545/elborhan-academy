import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import CourseStyle from "./NormalCoursePage.module.css";
import { useParams } from "react-router-dom";
import "./EachCourse.css";
import CourseSkeleton from "./SpecificCourseSkeleton";
import Footer from "../../footer/footer";
import baseURL from "../../../BaseURL/BaseURL";
import Footer2 from "../../Footer2/Footer2";

const TheCourse = () => {
  const {courseID} = useParams();
  const removeSaltFromID = useCallback((encodedID) => {
    const decodedID = atob(encodedID); // Decoding Base64
    const parts = decodedID.split(".");
    const originalID = parts[0];
    return originalID;
  }, []);
  const [courses, setCourses] = useState([]);
  const [content, setContent] = useState({});
  const [titleLanguage, setTitleLanguage] = useState("");


  const getDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };
  const getCourses = useCallback(() => {
    const originalID = removeSaltFromID(courseID); // Removing salt from the salted ID

    axios
      .get(
        `${baseURL}/Course/GetCoursesByID/${originalID}`,
        {
          params: {
            courseId: courseID,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (!response.data) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } else {
          const received = response.data;

            
          const unescapedCoursecontent = received.content
            .replace(/\\\\/g, "\\")


          const originalContent = JSON.parse(unescapedCoursecontent);

          setContent(originalContent);


          const titleDirection = getDirection(received.name);

          setTitleLanguage(titleDirection);
          setCourses([{ id: courseID, name: received.name, imageUrl: received.imageUrl }]);
        }
      })
      .catch((error) => {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }, [courseID, removeSaltFromID]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    if (content && document.getElementById("editorjs")) {

      const textBlock = content.blocks.find(
        (block) =>
          block.type === "paragraph" ||
          block.type === "header" ||
          block.type === "list"
      );

      const editorContainer = document.getElementById("editorjs");
      // Determine the direction based on the first text block
      const direction = textBlock.data.text
        ? getDirection(textBlock.data.text)
        : "ltr";
      editorContainer.style.direction = direction;

      document.getElementById("courseName").style.direction = titleLanguage;



      // eslint-disable-next-line no-unused-vars
      const editor = new EditorJS({
        holder: "editorjs",
        readOnly: true,
        data: content,
        tools: {
          header: Header,
          table: Table,
          list: List,
          image: SimpleImage,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                codepen: {
                  regex:
                    /https?:\/\/codepen.io\/([^/?&]*)\/pen\/([^/?&]*)/,
                  embedUrl:
                    "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
                  html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                  height: 300,
                  width: 600,
                  id: (groups) => groups.join("/embed/"),
                },
              },
            },
          },
        },
      });
    }
  }, [content, titleLanguage]); // Added titleLanguage to dependencies

  return (
    <>
      <div className={CourseStyle.EachCourse}>
        <div className={CourseStyle.innerCourse}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className={CourseStyle.title}>
                <h1 id="courseName">{course.name}</h1>
                <hr></hr>
                <img src={course.imageUrl} alt={course.name} id="courseImg" />

              </div>
            ))
          ) : (
            <CourseSkeleton />
          )}
          {content && Object.keys(content).length > 0 && (
            <div id="editorjs" className={CourseStyle.content}></div>
          )}
        </div>
      </div>
      <Footer />
      <Footer2 />
    </>
  );
};

export default TheCourse;
