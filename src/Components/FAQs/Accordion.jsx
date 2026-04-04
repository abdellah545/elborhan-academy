import React, { useState, useRef } from "react";
import accordionStyles from "./Accordion.module.css";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  const panelRef = useRef(null);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`${accordionStyles.accordionItem} ${isActive ? accordionStyles.active : ""}`}>
      <button
        className={accordionStyles.accordionHeader}
        onClick={toggleAccordion}
        aria-expanded={isActive}
      >
        <span className={accordionStyles.qMarker}>Q</span>
        <span className={accordionStyles.titleText}>{title}</span>
        <span className={accordionStyles.icon}>
          {isActive ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          )}
        </span>
      </button>
      <div
        className={accordionStyles.panel}
        style={{ 
          maxHeight: isActive ? `${panelRef.current?.scrollHeight}px` : "0",
          opacity: isActive ? "1" : "0"
        }}
      >
        <div className={accordionStyles.panelInner} ref={panelRef}>
          <div className={accordionStyles.contentText}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
