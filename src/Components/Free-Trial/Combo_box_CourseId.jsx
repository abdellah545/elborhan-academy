import { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
// import axiosInterceptor from "./axiosInterceptor";
import axios from "axios";

const StudentSelect2 = ({
  onCategoryChange,
  selectedCategoryId,
  selectedCourseId,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!selectedCategoryId) return;
    // setSelectedCourseId(null);
    // setOptions([]);

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://el-burhanacademy.azurewebsites.net/Course/GetAllCoursesOfCategory/${selectedCategoryId.value}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "text/plain",
            },
          }
        );

        const courses = response.data.map((course) => {
          const nameObject = JSON.parse(course.name);
          const courseName = nameObject.blocks[0].data.text;

          return {
            value: course.courseId,
            label: courseName,
          };
        });
        setOptions(courses);
      } catch (error) {

      }
    };

    fetchCourses();
  }, [selectedCategoryId]);

  const handleChange = (selectedOption) => {
    onCategoryChange(selectedOption.value, true);
  };

  return (
    <>
      {selectedCategoryId ? (
        <Select
          value={selectedCourseId}
          onChange={handleChange}
          options={options}
          placeholder="Select specific course"
          styles={{
            container: (provided) => ({
              ...provided,
              width: "100%",
              marginBottom: "15px",
            }),
            menu: (provided) => ({
              ...provided,
              width: "100%",
              zIndex: "99",
              color: "black",
            }),

            placeholder: (styles) => ({
              ...styles,
              color: "black",
            }),
          }}
        />
      ) : (
        <>
          <Select
            isDisabled
            value={selectedCourseId}
            onChange={handleChange}
            options={options}
            placeholder="Select specific course"
            styles={{
              container: (provided) => ({
                ...provided,
                width: "100%",
                marginBottom: "15px",
              }),
              menu: (provided) => ({
                ...provided,
                width: "100%",
                zIndex: "99",
                color: "black",
              }),
              option: (styles) => ({
                ...styles,
                color: "black",
              }),
              placeholder: (styles) => ({
                ...styles,
                color: "black",
              }),
            }}
          />
        </>
      )}
    </>
  );
};
StudentSelect2.propTypes = {
  selectedCategoryId: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  selectedCourseId: PropTypes.string.isRequired,
};
export default StudentSelect2;
