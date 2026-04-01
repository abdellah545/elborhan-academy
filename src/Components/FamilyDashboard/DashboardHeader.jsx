import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie } from "../../Helper/CookieHelper";
import baseURL from "../../BaseURL/BaseURL";
import "animate.css"

export default function DashboardHeader() {
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosinterceptor.get(
        `${baseURL}/Family/PaymentReport`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data) {
        setIsFound(true);
      }
    }
    fetchData();
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("AccessToken");
    deleteCookie("refreshToken");
    deleteCookie("AccessToken");
    deleteCookie("Full_Name");

    window.location.pathname = "";
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <header className={`bg-black text-white sticky-top`}>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <Link
              className="navbar-brand text-light"
              onClick={scrollToTop}
              to=""
            >
              El-burhan Academy |
            </Link>
            <span className="navbar-brand text-light">Family Dashboard</span>
            <button
              class="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div
                class="btn-group m-auto gap-2"
                role="group"
                aria-label="Basic example"
              >
                <Link to="/FamilyDashboard" type="button" class="btn btn-dark">
                  Family Report
                </Link>

                <Link to="/payment-report" type="button" class="btn btn-dark">
                  Payment Report
                  {isFound && (
                    <span className="animate__animated animate__flash animate__infinite animate__slow position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  )}
                </Link>
              </div>
              <form class="d-flex">
                <div class="dropdown">
                  <button
                    class="btn bg-dark text-white dropdown-toggle mx-5 my-sm-2 text-capitalize"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {getCookie("Full_Name")}
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <Link class="dropdown-item" to="/FamilyDashboard/profile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
