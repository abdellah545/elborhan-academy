import qualityContentStyles from "./Qualitycontent.module.css";
import MainImg from "../../assets/QualitycontentAssets/Medal.svg";
import SecondaryImg from "../../assets/QualitycontentAssets/Jewel.svg";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";
import educatedTutors from "../../assets/QualitycontentAssets/educatedTutors.svg";
import StarBook from "../../assets/QualitycontentAssets/Star&Book.svg";
import progressReports from "../../assets/QualitycontentAssets/progressReports.svg";
import oldReports from "../../assets/QualitycontentAssets/oldReports.svg";

const Qualitycontent = () => {
  return (
    <>
      <div className={`container mb-5 ${qualityContentStyles.qualityContent}`}>
        <div className={qualityContentStyles.title}>
          <div
            className={`d-flex justify-content-center align-items-center ${qualityContentStyles.TitleImgContainer}`}
          >
            <img
              src={MainImg}
              alt="qualityimage"
              className={qualityContentStyles.mainImg}
            ></img>
          </div>
          <div>
            <h3
              className={`${qualityContentStyles.titleContent} text-center my-5`}
            >
              We are more concerned with providing Quality Assurance in Quran
              Teaching at Burhan Academy Online Classes, We try our best to
              deliver quality classes by educated, trained, and expert Tutors.{" "}
              <br />
              <hr />
              However, we do have the following ways to ensure the best learning
              platform for you and your kids. <br /> <hr /> This is because most
              of the parents have no idea of a Good Tutor and the process of
              teaching online. <br /> <hr /> So, to ensure the utmost level of
              Online Quran Classes we have the following procedure:
            </h3>
          </div>
        </div>

        <div className={qualityContentStyles.contents}>
          <h1 className={qualityContentStyles.question}>
            <b>Online Learning Quality Assurance at Burhan Academy</b>
          </h1>

          {/* -------------------------01------------------------------- */}
          <div className={qualityContentStyles.content}>
            <div className={qualityContentStyles.contentImg}>
              <img
                src={educatedTutors}
                alt="qualityimage"
                className={qualityContentStyles.diamond}
              ></img>
            </div>
            <h3 className={`${qualityContentStyles.answers} text-center`}>
              <span className="fw-bold">1) Hiring educated Tutors: </span>{" "}
              Well-trained Tutors are graduates from Alazhar University with
              Profound knowledge.
            </h3>
          </div>
          <br />
          {/* -------------------------02------------------------------- */}
          <div className={qualityContentStyles.content}>
            <div className={qualityContentStyles.contentImg}>
              <img
                src={StarBook}
                alt="qualityimage"
                className={qualityContentStyles.diamond}
              ></img>
            </div>
            <h3 className={`${qualityContentStyles.answers} text-center`}>
              <span className="fw-bold">
                2) Certified Professional Tutors have full command over the
                subjects they teach:{" "}
              </span>
              Burhan Academy hires experts to train our Tutors so that they can
              give you the best quality classes ever.
            </h3>
          </div>
          <br />
          {/* -------------------------03------------------------------- */}
          <div className={qualityContentStyles.content}>
            <div className={qualityContentStyles.contentImg}>
              <img
                src={progressReports}
                alt="qualityimage"
                className={qualityContentStyles.diamond}
              ></img>
            </div>
            <h3 className={`${qualityContentStyles.answers} text-center`}>
              <span className="fw-bold">3) Progress Reports: </span>Our Quality
              Assurance Staff evaluates the Students’ Performance and the
              shortcomings if any. The report generated on such evaluation is
              then worked on by the Tutors and improvement is monitored through
              this process.
            </h3>
          </div>
          <br />
          {/* -------------------------04------------------------------- */}
          <div className={qualityContentStyles.content}>
            <div className={qualityContentStyles.contentImg}>
              <img
                src={oldReports}
                alt="qualityimage"
                className={qualityContentStyles.diamond}
              ></img>
            </div>
            <h3 className={`${qualityContentStyles.answers} text-center`}>
              <span className="fw-bold">4) Comparison of Old Reports: </span>We
              compare every month’s report with the old one and measure the
              level of improvement in learning
            </h3>
          </div>
          <br />
          {/* -------------------------05------------------------------- */}
          {/* <div className={qualityContentStyles.content}>
            <div className={qualityContentStyles.contentImg}>
              <img
                src={SecondaryImg}
                alt="qualityimage"
                className={qualityContentStyles.diamond}
              ></img>
            </div>
            <p className={qualityContentStyles.answers}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div> */}
          {/* -------------------------06------------------------------- */}
          {/* <div className={qualityContentStyles.content}>
            <div className={qualityContentStyles.contentImg}>
              <img
                src={SecondaryImg}
                alt="qualityimage"
                className={qualityContentStyles.diamond}
              ></img>
            </div>
            <p className={qualityContentStyles.answers}>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div> */}
        </div>
      </div>
      <Footer />
      <Footer2 />
    </>
  );
};

export default Qualitycontent;
