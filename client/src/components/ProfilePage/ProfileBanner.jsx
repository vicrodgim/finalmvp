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
        <p>
          <b>
            {userInfo.first_name} {userInfo.last_name}
          </b>
        </p>
        <p>@{userInfo.username}</p>
        <p>{userInfo.location}</p>
      </div>
      <div className="profile-description-container">
        <p>{userInfo.description}</p>
      </div>
      <div className="profile-edit-container">
        <button onClick={handleClick}>
          <b>ADD SKILLS</b>
        </button>
      </div>
    </div>
  );
};
