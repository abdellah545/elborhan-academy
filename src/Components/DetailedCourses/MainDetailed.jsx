import React, { useState, useEffect } from "react";
import style from "./MainDetailed.module.css";
import Card from "./Card";
import axios from "axios";
import CourseSkeleton from "./CourseSkeleton";
import baseURL from "../../BaseURL/BaseURL";
export default function MainDetailed(props) {
  const [courses, setCourses] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [courseImages, setCourseImages] = useState([]);

  const [courseIDs, setCourseIDs] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const category = props.category;

      try {
        const response = await axios.get(
          `${baseURL}/Course/GetAllCoursesOfCategory/${category}`,
          {
            params: {
              category: category,
            },
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const received = response.data;


        // Transform the received data into the desired format
        const transformedData = received.map((item) => ({
          id: item.courseId,

          name: item.name,
          imageUrl: item.imageUrl,
        }));

        // Update state with the transformed data
        setCourses(transformedData);
        setCourseNames(transformedData.map((item) => item.name));
        setCourseImages(transformedData.map((item) => item.imageUrl));
        setCourseIDs(transformedData.map((item) => item.id));
      } catch (error) {

      }
    };

    getCourses();
  }, []);

  return (
    <>
      <section className="books py-5">
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-12">
              <h1 className={`text-center fw-bold mb-5 ${style.header}`}>
                {props.courses_name} Courses
              </h1>
              <p className="text-center fs-5 my-3">
                {/* {props.courses_description} */}
              </p>
              <hr />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <Card
                  key={course.id}
                  ID={courseIDs[index]}
                  Title={courseNames[index]}
                  imageURL={courseImages[index]}
                />
              ))
            ) : (
              <>
                <h1 className="text-center">Course Not Found</h1>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
