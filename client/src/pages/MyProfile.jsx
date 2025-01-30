import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileBanner } from "../components/ProfilePage/ProfileBanner";
import { ProfileSkills } from "../components/ProfilePage/ProfileSkills";
import "./MyProfile.css";

export const MyProfile = () => {
  const [currentUser, setCurrentUser] = useState([]);

  const fetchUserProfile = async () => {
    try {
      let response = await axios.get(
        "http://localhost:4000/api/users/profile",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="my-profile-page">
      <h2>MY PROFILE</h2>
      <ProfileBanner />
      <ProfileSkills />
    </div>
  );
};

export default MyProfile;
