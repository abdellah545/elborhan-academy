import Accordion from "./Accordion";
import FAQsStyles from "./FAQs.module.css";
import Footer from "../footer/footer";

const FAQs = () => {
  return (
    <>
      <div className={FAQsStyles.faqsContainer}>
        <div className="container">
          <div className={FAQsStyles.headerSection}>
            <h1 className={FAQsStyles.mainTitle}>FAQs</h1>
            <p className={FAQsStyles.subTitle}>Frequently Asked Questions</p>
            <div className={FAQsStyles.accentLine}></div>
          </div>
          
          <div className={FAQsStyles.accordionWrapper}>
            <Accordion
              title="Do you offer free trail?"
              content="Yes, we offer one free trail class to experience our online teaching methodology and service."
            />
            <Accordion
              title="Do you take fee advance or at the end of the month?"
              content="We take the fee at the end of the month."
            />
            <Accordion
              title="When and what age group of students do you teach?"
              content="We teach 24 hours 7 days and teach every age male and female students."
            />
            <Accordion
              title="Do you provide certificates on completion of the course?"
              content="Yes, we provide a certificate on completion of the course."
            />
            <Accordion
              title="How do i access my course?"
              content="Our course is one on one online classes with one of our teachers over zoom. All what you need is to book your weekly classes, set up zoom app on our device, then leave the rest on us."
            />
            <Accordion
              title="Can i take more than one course at a time?"
              content="Yes, you can do that. For example, you can enroll in Arabic course and also study Quran at the same time."
            />
            <Accordion
              title="What payment system do you use to receive fee?"
              content="We use a variety of secure payment methods including credit cards and international transfers to make the process as easy as possible for you."
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;
