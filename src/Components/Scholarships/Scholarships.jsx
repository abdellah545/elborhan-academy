import scholarShipsStyles from "./Scholarships.module.css";
import MainImg from "../../assets/scholarShipsAssets/ScholarshipsImg.svg";
import Footer from "../footer/footer";
import Footer2 from "../Footer2/Footer2";
import emptyWallet from "../../assets/scholarShipsAssets/empty-wallet.svg"
import recentConverts from "../../assets/scholarShipsAssets/recent-converts.svg"
import incarnatedMuslims from "../../assets/scholarShipsAssets/incarnated-muslims.svg"
import childrenIncarnatedMuslims from "../../assets/scholarShipsAssets/Children-of-incaranatedMuslims.svg"
import Widows from "../../assets/scholarShipsAssets/Widows.svg"
import Orphans from "../../assets/scholarShipsAssets/Orphans.svg"
import Disabilities from "../../assets/scholarShipsAssets/MajorDisabilities.svg"

import seniorCitizen from "../../assets/scholarShipsAssets/seniorCitizen.svg"

const Scholarships = () => {
  return (
    <>
      <div className={`container mb-5 ${scholarShipsStyles.scholarShips}`}>
        <div className={scholarShipsStyles.title}>
          <div className={scholarShipsStyles.TitleImgContainer}>
            <img
              src={MainImg}
              alt="scholarshipImage"
              className={scholarShipsStyles.scholarMainImg}
            ></img>
          </div>
          <h3
            className={`${scholarShipsStyles.ScholartitleContent} text-center my-5`}
          >
            Burhan Academy prides itself on providing Quranic courses and
            workshops to everyone willing to learn. <br /> <hr /> We do not turn
            anyone away due to financial reasons, thus providing the resource to
            individuals or families who otherwise would not be able to afford
            any paid service.
          </h3>
        </div>
        <hr></hr>
        <div className={scholarShipsStyles.contents}>
          <div className="text-center mb-5">
            <h1 className={`${scholarShipsStyles.scholarShipsHeader} fw-bold`}>
              Our Scholarships
            </h1>
            <h3 className={scholarShipsStyles.ScholartitleContent}>
              This scholarship fund allows us to support students who are not in
              the current financial state to pay for a class. We can help:
            </h3>
          </div>

          <div className={scholarShipsStyles.cardsGrid}>
            {/* -------------------------01------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={emptyWallet}
                  alt="Low income"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Low income individuals or families
              </h3>
            </div>
            {/* -------------------------02------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={recentConverts}
                  alt="Recent converts"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Recent converts
              </h3>
            </div>
            {/* -------------------------03------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={incarnatedMuslims}
                  alt="Formerly incarcerated"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Recent formerly incarcerated Muslims
              </h3>
            </div>
            {/* -------------------------04------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={childrenIncarnatedMuslims}
                  alt="Children of incarcerated"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Children of incarcerated Muslims
              </h3>
            </div>
            {/* -------------------------05------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={Widows}
                  alt="Widows"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Widows
              </h3>
            </div>
            {/* -------------------------06------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={Orphans}
                  alt="Orphans"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Orphans/Foster care children
              </h3>
            </div>
            {/* -------------------------07------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={Disabilities}
                  alt="Major disabilities"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Muslims with major disabilities
              </h3>
            </div>
            {/* -------------------------08------------------------------- */}
            <div className={scholarShipsStyles.content}>
              <div className={scholarShipsStyles.contentImg}>
                <img
                  src={seniorCitizen}
                  alt="Senior Citizens"
                ></img>
              </div>
              <h3 className={scholarShipsStyles.offers}>
                Senior Citizens
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Footer2 />
    </>
  );
};

export default Scholarships;
