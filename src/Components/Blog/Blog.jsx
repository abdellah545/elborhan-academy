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
      // ⚠️ DEV MODE BYPASS: Preventing ERR_NAME_NOT_RESOLVED
      setBlogs([{ blogId: 1, blogName: "Understanding Tajweed", blogImageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=400&q=80", blogDescription: "A deep dive into the rules of Tajweed and how to perfect your Quranic recitation." }, { blogId: 2, blogName: "The Importance of Arabic Language", blogImageUrl: "https://images.unsplash.com/photo-1560087701-a6e50efecae8?auto=format&fit=crop&w=400&q=80", blogDescription: "Why learning Arabic is essential for understanding Islamic texts deeply." }, { blogId: 3, blogName: "Stories of the Prophets", blogImageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80", blogDescription: "Fascinating lessons from Islamic history and the lives of the Prophets." }]);
      setblogNames(["Understanding Tajweed", "The Importance of Arabic Language", "Stories of the Prophets"]);
      setblogImages(["https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1560087701-a6e50efecae8?auto=format&fit=crop&w=400&q=80", "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80"]);
      setblogIDs([1, 2, 3]);
      setblogDesc(["A deep dive into the rules of Tajweed and how to perfect your Quranic recitation.", "Why learning Arabic is essential for understanding Islamic texts deeply.", "Fascinating lessons from Islamic history and the lives of the Prophets."]);
      return;
      /*
      axios
        .get(`${baseURL}/Blog/GetAllBlogs`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response === null) {

          } else {
            const received = response.data;
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
          }
        });
      */
    };

    getBlogs();
  }, []);

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
      <section className={style.pageWrapper}>
        <div className={style.title}>
          <h1>Featured Articles</h1>
          <p>
            Exploring the cutting-edge insights and updates on our blog.
            Explore some of our most popular content and learn something new.
          </p>
          <hr />
        </div>
        
        <div className="container mt-5">
          <div className="row g-4 justify-content-center">
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
                <div className="col-12 text-center text-muted py-5">
                  <h2>No blogs found</h2>
                </div>
              )}
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
