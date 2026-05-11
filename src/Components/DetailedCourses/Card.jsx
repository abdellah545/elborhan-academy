import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardStyles from "./MainDetailed.module.css";

const Card = ({ ID, Title, imageURL }) => {

  const[titleDirection, setTitleDirection] = useState('');
  const navigate = useNavigate();

  const generateSalt = (id) => {
    // Simple hash function example
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  };
  const addSaltToID = (originalID) => {
    const salt = generateSalt(originalID);
    const saltedID = originalID + "." + salt; // Embedding salt within the ID
    const encodedID = btoa(saltedID); // Encoding with Base64
    return encodedID;
  };

  const getDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };
  const handleClick = () => {
    const saltedID = addSaltToID(ID); // Adding salt to the original ID
    navigate(`/The-course-itself/${saltedID}`);
  };

  useEffect(() => {
    const titleElement = document.getElementById("title");
    if (titleElement) {

      const titleDirection = getDirection(Title);
      setTitleDirection(titleDirection);
      titleElement.dir = titleDirection;

    }
  }, [Title]); // Add Title as a dependency
  return (
    // <div className="col-lg-4 col-md-12 col-sm-12 ">
    //   <div class="card mb-3 customCardStyle">
    //     <div class="row g-0">
    //       <div class="col-md-4">
    //         <img
    //           style = {{height:"150px", width:"181px"}}
    //           className={CardStyles.cardImg}
    //           src={imageURL}
    //           class="rounded-start img-fluid"
    //           alt=""
    //         />
    //       </div>

    //       <div class="col-md-8">
    //         <div class="card-body pb-0">
    //           <h5 class="card-title fw-bold">{Title}</h5>
    //           <p class="card-text">
    //             <button class="btn btn-dark" onClick={handleClick} >Start Learning</button>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="col-lg-4 col-md-12 col-sm-12 mb-5">
      <div className="card h-100 shadow-sm">
        <div className={CardStyles.cardImgWrapper}>
          <img
            style={{ height: "300px", width: "100%", objectFit: "contain" }}
            src={imageURL}
            className="card-img-top"
            alt={Title}
          />
        </div>
        <div className={`card-body ${CardStyles.Card} d-flex flex-column`}>
          <h4
            id="title"
            style={{ textAlign: titleDirection === "rtl" ? "right" : "left" }}
            className="card-title fw-bold text-truncate"
          >
            {Title}
          </h4>
          <hr />
          <p className="card-text text-center mt-auto">
            <button className="btn btn-dark w-100" onClick={handleClick}>
              See Details
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
