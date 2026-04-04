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
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
      <div 
        className={`card w-100 ${CardStyles.Card} border-0 bg-transparent`}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className={CardStyles.cardImgWrap}>
          <img
            src={imageURL}
            alt={Title}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={CardStyles.cardBody}>
          <h3
            dangerouslySetInnerHTML={{ __html: Title }}
            dir={titleDirection}
          ></h3>
          <p
            dangerouslySetInnerHTML={{ __html: Desc }}
            dir={descDirection}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Card;
