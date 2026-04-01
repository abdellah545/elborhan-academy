import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import { useParams, useNavigate } from "react-router-dom";
import "./EachBlog.css";
import BlogSkeleton from "./SpecificBlogSkeleton";
import CourseStyle from "../../DetailedCourses/EachCourse/NormalCoursePage.module.css";
import Footer from "../../footer/footer";
import baseURL from "../../../BaseURL/BaseURL";
import Footer2 from "../../Footer2/Footer2";

const TheCourse = () => {
  const navigate = useNavigate();
  const { blogID } = useParams();
  const removeSaltFromID = (encodedID) => {
    const decodedID = atob(encodedID); // Decoding Base64
    const parts = decodedID.split(".");
    const originalID = parts[0];
    return originalID;
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const [Blogs, setBlogs] = useState([]);
  const [content, setContent] = useState({});
  const [receivedResponse, setReceivedResponse] = useState({});
  const [titleLanguage, setTitleLanguage] = useState("");
  const getBlog = () => {
    const originalID = removeSaltFromID(blogID); // Removing salt from the salted ID

    console.log(blogID);
    axios
      .get(`${baseURL}/Blog/GetBlogDetails/${originalID}`, {
        params: {
          blogId: blogID,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          navigate("/blog");
        } else {
          const received = response.data;
          console.log(received);
          setReceivedResponse(received);

          const unescapedBlogcontent = received.content.replace(/\\\\/g, "\\");


          const originalContent = JSON.parse(unescapedBlogcontent);



          setContent(originalContent);


          const titleDirection = getDirection(received.name);
          console.log(titleDirection);
          setTitleLanguage(titleDirection);
          setBlogs([{ id: blogID, name: received.name, imageUrl: received.imageUrl }]);
        }
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const getDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };

  useEffect(() => {
    getBlog(); // Call getBlog when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    if (content && document.getElementById("editorjs")) {
      // Function to determine if a block contains Arabic text

      // Find the first text block
      const textBlock = content.blocks.find(
        (block) =>
          block.type === "paragraph" ||
          block.type === "header" ||
          block.type === "list"
      );
      console.log(textBlock.data.text);
      const editorContainer = document.getElementById("editorjs");
      // Determine the direction based on the first text block
      const direction = textBlock.data.text
        ? getDirection(textBlock.data.text)
        : "ltr";
      editorContainer.style.direction = direction;

      document.getElementById("courseName").style.direction = titleLanguage;

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
              },
            },
          },
        },
      });
    }
  }, [content]);

  return (
    <>
      <div className={CourseStyle.EachCourse}>
        <div className={CourseStyle.innerCourse}>
          {Blogs.length > 0 ? (
            Blogs.map((course) => (
              <div key={course.id} className={CourseStyle.title}>
                <h1 id="courseName">{course.name}</h1>
                <hr></hr>
                <p style={{ direction: "ltr" }}>
                  {" "}
                  created by <b> {receivedResponse.userName}</b> <br></br>{" "}
                  created at <b>{formatDate(receivedResponse.createdAt)}</b>
                </p>
                <img src={course.imageUrl} alt={course.name} id="courseImg" />
              </div>
            ))
          ) : (
            <BlogSkeleton />
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
