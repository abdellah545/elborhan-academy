import React, { useState, useEffect, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import { useParams } from "react-router-dom";
import BlogSkeleton from "./SpecificBlogSkeleton";
import styles from "./EachBlog.module.css";
import Footer from "../../footer/footer";
import Footer2 from "../../Footer2/Footer2";

const TheCourse = () => {
  const { blogID } = useParams();


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
  const getBlog = useCallback(() => {
    // const originalID = removeSaltFromID(blogID); // Removing salt from the salted ID

    // ⚠️ DEV MODE BYPASS: Preventing ERR_NAME_NOT_RESOLVED
    const fakeContent = {
      time: 1680000000000,
      blocks: [
        { type: "paragraph", data: { text: "This is a detailed placeholder content for the blog post since the backend is currently disabled. Enjoy the premium UI layout!" } },
        { type: "paragraph", data: { text: "Learning the rules of reading accurately provides numerous cognitive and spiritual benefits." } }
      ],
      version: "2.8.1"
    };
    
    setReceivedResponse({
      userName: "El-Burhan Admin",
      createdAt: "2024-04-01T10:00:00Z",
      content: JSON.stringify(fakeContent),
      name: "Understanding Tajweed",
      imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80"
    });
    
    setContent(fakeContent);
    setTitleLanguage("ltr");
    setBlogs([{ id: blogID, name: "Understanding Tajweed", imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80" }]);
    
    return;
    /*
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

          setReceivedResponse(received);

          const unescapedBlogcontent = received.content.replace(/\\\\/g, "\\");
          const originalContent = JSON.parse(unescapedBlogcontent);

          setContent(originalContent);
          const titleDirection = getDirection(received.name);

          setTitleLanguage(titleDirection);
          setBlogs([{ id: blogID, name: received.name, imageUrl: received.imageUrl }]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    */
  }, [blogID]);

  const getDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };

  useEffect(() => {
    getBlog(); // Call getBlog when the component mounts
  }, [getBlog]); // Added getBlog as dependency

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
              },
            },
          },
        },
      });
    }
  }, [content, titleLanguage]); // Added titleLanguage to dependencies

  return (
    <>
      <div className={styles.blogContainer}>
        {Blogs.length > 0 ? (
          Blogs.map((course) => (
            <div key={course.id} className={styles.heroSection}>
              <h1 id="courseName" className={styles.title}>{course.name}</h1>
              <div className={styles.meta} style={{ direction: "ltr" }}>
                <span>Created by <b>{receivedResponse.userName}</b></span>
                <span className={styles.metaDivider}>•</span>
                <span><b>{formatDate(receivedResponse.createdAt)}</b></span>
              </div>
              <div className={styles.heroImageWrap}>
                <img src={course.imageUrl} alt={course.name} id="courseImg" />
              </div>
            </div>
          ))
        ) : (
          <BlogSkeleton />
        )}

        {content && Object.keys(content).length > 0 && (
          <div id="editorjs" className={styles.contentWrapper}></div>
        )}
      </div>
      <Footer />
      <Footer2 />
    </>
  );
};

export default TheCourse;
