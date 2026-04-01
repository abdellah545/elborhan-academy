import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import { TimezoneOptions } from "./newData";
import baseURL from "../../BaseURL/BaseURL";

const timeZoneLabels = TimezoneOptions.reduce((acc, curr) => {
  acc[curr.value] = curr.label;
  return acc;
}, {});
export default function Profile() {
  const [familyProfile, setFamilyProfile] = useState("");
  useEffect(() => {
    const fetchFamilyProfile = async () => {
      try {
        const response = await axiosinterceptor.get(
          `${baseURL}/Family/GetFamilyprofile`
        );
        setFamilyProfile(response.data);
      } catch (error) {
        console.error("Error fetching family profile:", error);
      }
    };

    fetchFamilyProfile();
  }, []);
  return (
    <>
      <div className={`container ${style.Container}`}>
        <div className="row py-5 justify-content-center">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className={`parent ${style.cardBorder} ${style.parent_width}`}>
              <div className="child mt-3">
                <h1
                  className={`text-center fw-bold text-decoration-underline ${style.font_size}`}
                >
                  Profile
                </h1>
                <br />
                <br />

                <div className="container d-flex flex-column">
                  <div className="">
                    <label htmlFor="" className="h3 fw-bold">
                      Full Name :
                    </label>

                    <label
                      htmlFor=""
                      className="h5 fw-bold mx-3 text-capitalize"
                    >
                      {familyProfile.name}
                    </label>

                    <hr />

                    <label htmlFor="" className="h3 fw-bold">
                      Email :
                    </label>

                    <label htmlFor="" className="h5 fw-bold mx-3">
                      {familyProfile.email}
                    </label>

                    <hr />

                    <label htmlFor="" className="h3 fw-bold">
                      Whatsapp Number :
                    </label>

                    <label htmlFor="" className="h5 fw-bold mx-3">
                      {familyProfile.whatsAppNumber}
                    </label>

                    <hr />

                    <label htmlFor="" className="h3 fw-bold">
                      Time Zone :
                    </label>

                    <label htmlFor="" className="h5 fw-bold mx-3">
                      {timeZoneLabels[familyProfile.timeZone]}
                    </label>

                    <hr />

                    <label htmlFor="" className="h3 fw-bold">
                      Country :
                    </label>

                    <label htmlFor="" className="h5 fw-bold mx-3">
                      {familyProfile.country}
                    </label>

                    <hr />
                    <div className="buttons text-center">
                      <div
                        class="btn-group gap-1"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Link
                          to="/FamilyDashboard/profile"
                          type="button"
                          class="btn btn-dark"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/FamilyDashboard/updateProfile"
                          type="button"
                          class="btn btn-dark"
                        >
                          Update Profile
                        </Link>
                        <Link
                          to="/FamilyDashboard/updateEmail"
                          type="button"
                          class="btn btn-dark"
                        >
                          Change Email
                        </Link>
                        <Link
                          to="/FamilyDashboard/ChangePassword"
                          type="button"
                          class="btn btn-dark"
                        >
                          Change Password
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
