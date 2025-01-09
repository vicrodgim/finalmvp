import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileBanner.css";

export const ProfileBanner = () => {
  //variable to store userInfo
  const [userInfo, setUserInfo] = useState([]);

  //function to fetch user info and set result to userInfo array
  const fetchUserInfo = async () => {
    try {
      //communcate with databasa
      let response = await axios.get(
        "http://localhost:4000/api/users/profile",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUserInfo(response.data);
      console.log(userInfo);
    } catch (error) {
      // handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    //call fetchItems function
    fetchUserInfo();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit-profile");
  };
  // http://localhost:4000/img/3bdcabba-361f-4f5d-af09-f3c5c302ea7b.jpeg

  return (
    <div className="profile-banner container">
      <div className="profile-photo-container">
        <img
          className="profile-photo"
          src={"http://localhost:4000/img/" + userInfo.imageUrl}
          alt="profile photo"
        />
      </div>
      <div className="profile-data-container">
        <p className="user-fullname">
          {userInfo.first_name} {userInfo.last_name}
        </p>
        <p className="userinfo-username">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ebfff4"
          >
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
          </svg>
          {userInfo.username}
        </p>
        <p className="userinfo-location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ebfff4"
          >
            <path d="M360-440h80v-110h80v110h80v-190l-120-80-120 80v190Zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
          </svg>
          {userInfo.location}
        </p>
      </div>
      <div className="profile-description-container">
        <p>{userInfo.description}</p>
      </div>
      <div className="profile-edit-container">
        <button onClick={handleClick}>ADD SKILLS</button>
      </div>
    </div>
  );
};
