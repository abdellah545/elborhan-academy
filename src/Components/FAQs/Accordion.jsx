import React, { useState } from "react";
import accordionStyles from "./Accordion.module.css"; // Assuming you have a separate CSS file for styling

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  // Function to toggle the accordion
  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  // Calculate the max-height of the panel based on the content
  const calculateMaxHeight = () => {
    if (isActive) {
      // You might need to adjust this value based on your content's height
      return "500px"; // Example value
    } else {
      return "0";
    }
  };

  return (
    <div className={accordionStyles.accordionItem}>
      <button
        className={`${accordionStyles.accordion} ${
          isActive ? accordionStyles.active : ""
        }`}
        onClick={toggleAccordion}
      >
        <pre><b>Q:</b> </pre>{title}
      </button>
      <div
        className={accordionStyles.panel}
        style={{ maxHeight: calculateMaxHeight() }} // Dynamically set the max-height
      >
        <pre><b>A:</b> </pre>{content}
      </div>
    </div>
  );
};

export default Accordion;
