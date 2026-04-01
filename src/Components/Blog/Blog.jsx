import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import Blogskeleton from "./BlogSkeleton";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";
import style from "./Blog.module.css";
import baseURL from "../../BaseURL/BaseURL";
import { usePagination } from './Pagination-hook(custom)';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [blogNames, setblogNames] = useState([]);
  const [blogImages, setblogImages] = useState([]);
  const [blogDesc, setblogDesc] = useState([]);
  const [blogIDs, setblogIDs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(9); // Adjust this number as needed
  const paginationRange = usePagination({
    currentPage,
    totalCount: blogs.length, // Assuming blogs is the array holding all your blogs
    siblingCount: 1, // Number of pages to show on either side of the current page
    pageSize: blogsPerPage, // Number of blogs per page
   });

  useEffect(() => {
    const getBlogs = () => {
      axios
        .get(`${baseURL}/Blog/GetAllBlogs`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response === null) {
            console.log("response is null");
          } else {
            const received = response.data;
            console.log(received);
            console.log(response.data[0].blogId);

            setBlogs(received);
            const names = [];
            const images = [];
            const IDs = [];
            const Desc = [];

            received.forEach((item) => {




              names.push(item.blogName);
              images.push(item.blogImageUrl);
              IDs.push(item.blogId);
              Desc.push(item.blogDescription);
            });
            setblogNames(names);
            setblogImages(images);
            setblogIDs(IDs);
            setblogDesc(Desc);

            console.log("after data was got", names);
            console.log("after data was got", images);
            console.log("after data was got", IDs);
            console.log("after data was got", Desc);
          }
        });
    };

    getBlogs();
  }, []); // Empty array means this effect runs once on mount

  // Calculate total pages
  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Function to handle page change
 const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
  // Update pagination range

};

// Function to handle next page
const nextPage = () => {
  if (currentPage < totalPages) {
    paginate(currentPage + 1);
  }
};

// Function to handle previous page
const previousPage = () => {
  if (currentPage > 1) {
    paginate(currentPage - 1);
  }
};

 // Calculate total pages

 // Calculate the start and end indices for the pagination range


  // Calculate current blogs based on currentPage
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  let startIndex = currentPage - 1;
  let endIndex = currentPage + 2;

  // Adjust startIndex and endIndex to ensure the current page is centered
if (startIndex < 1) {
  startIndex = 1;
  endIndex = Math.min(3, totalPages);
 } else if (endIndex > totalPages) {
  endIndex = totalPages;
  startIndex = Math.max(totalPages - 2, 1);
 }

  const paginationRangeforUI = [];
  for (let i = startIndex; i <= endIndex; i++) {
    paginationRangeforUI.push(i);
  }

  return (
    <>
      <section className="blog mt-5">
        <div className={`${style.title} m-auto`}>
          <h1 className="text-center fw-bold">Featured Articles</h1>
          <p className="text-center fs-3">
            We’re a leading Academy for learning and teaching online. Explore
            some of our most popular content and learn something new.
          </p>
          <p className="text-center fs-3">
            Exploring the cutting-edge insights and updates on our blog
          </p>
          <hr className="w-25 mx-auto" />
        </div>
        <div className="blog_content mt-5 pt-5">
          <div className="container">
            <div className="row">
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => (
                  <BlogCard
                    key={blog.blogId}
                    ID={blogIDs[indexOfFirstBlog + index]}
                    Title={blogNames[indexOfFirstBlog + index]}
                    imageURL={blogImages[indexOfFirstBlog + index]}
                    Desc={blogDesc[indexOfFirstBlog + index]}
                  />
                ))
              ) : (
                <>
                  <h1 className="text-center">No blogs found</h1>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className={style.pagination}>
        <button onClick={previousPage} disabled={currentPage === 1}>Previous</button>
        {paginationRange.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={currentPage === pageNumber ? `${style.currentPage}` : ""}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      <Footer />
      <Footer2 />
    </>
  );
}
