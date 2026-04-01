import Accordion from "./Accordion";
import FAQsStyles from "./FAQs.module.css";

import rightMosque from "../../assets/contactUsAssets/Right.svg";
import leftMosque from "../../assets/contactUsAssets/Left.svg";
import cloudAndLantern from "../../assets/contactUsAssets/CloudwithLantern.svg";
import cloud from "../../assets/contactUsAssets/Cloud.svg";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";

const FAQs = () => {
  return (
    <>
      <div className={FAQsStyles.faqs}>
        <div className={FAQsStyles.left}>
          <img
            src={leftMosque}
            className={FAQsStyles.leftImage}
            alt="left mosque"
          ></img>
          <img
            src={cloudAndLantern}
            className={FAQsStyles.cloudwithlantern}
            alt="clouds with lantern"
          ></img>
        </div>
        <div className={FAQsStyles.questions}>
          {/* This is the title for the questions */}
          <div>
            <h1>
              <b> FAQs </b>{" "}
            </h1>
            <h4>Frequently Asked Questions</h4>
          </div>
          {/* Them questions babyyyyyyyy */}
          <div>
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
              title="What payment system do you use to receive fee ?"
              content="classes that we use to style each element. These classes controlthe overall appearance"
            />
          </div>
          {/* Contact us. Will you ? */}
          {/* <div>
            <p>
              Have a question? <a href="#">Contact Us</a>
            </p>
          </div> */}
        </div>

        <div className={FAQsStyles.right}>
          <img src={cloud} className={FAQsStyles.cloud} alt="cloud"></img>
          <img
            src={rightMosque}
            className={FAQsStyles.rightImage}
            alt="right mosque"
          ></img>
        </div>
      </div>
      <Footer />
      <Footer2 />
    </>
  );
};

export default FAQs;
