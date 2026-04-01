import React from "react";
import { useNavigate } from "react-router-dom";
import CardStyles from "./Blog.module.css";
const Card = ({ ID, Title, imageURL, Desc }) => {
  const navigate = useNavigate();

  const getDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };

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

  const handleClick = () => {
    const saltedID = addSaltToID(ID); // Adding salt to the original ID
    navigate(`/The-blog-itself/${saltedID}`);
  };

  const titleDirection = getDirection(Title);
  const descDirection = getDirection(Desc);

  return (
    <div className="col-lg-4 col-md-12 col-sm-12 mb-5">
      <div className="card">
        <img
          style={{ height: "300px", width: "100%",cursor: "pointer" }}
          src={imageURL}
          className="card-img-top"
          alt="..."
          onClick={handleClick}
        />
        <div
          className={`card-body ${CardStyles.Card}`}
          style={{
            transition: "background-color 0.3s",
            cursor: "pointer",

          }}
          onClick={handleClick}
        >
          {/* <Editor title={Title} desc={Desc} /> */}
          <h3
            className="card-title text-truncate"
            dangerouslySetInnerHTML={{ __html: Title }}
            id="title"
            dir={titleDirection} // Set the direction here
            // style={{
            //   overflow: "hidden",
            //   textOverflow: "ellipsis",
            //   WebkitLineClamp: "1", // Number of lines to show
            //   WebkitBoxOrient: "vertical",
            // }}
          ></h3>
          <p
            dangerouslySetInnerHTML={{ __html: Desc }}
            className="text-truncate"
            id="desc"
            dir={descDirection} // Set the direction here
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Card;
