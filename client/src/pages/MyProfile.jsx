import axios from "axios";
import { useState, useEffect } from "react";
import { ProfileBanner } from "../components/ProfilePage/ProfileBanner";
import { ProfileSkills } from "../components/ProfilePage/ProfileSkills";
import "./MyProfile.css";

export const MyProfile = () => {
  //variable to store current user info
  const [currentUser, setCurrentUser] = useState([]);

  //function to fetch all jobs and set result to 'jobs' array. Returns username, first_name, last_name, description, location, email, imageUrl
  const fetchUserProfile = async () => {
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
      setCurrentUser(response.data);
    } catch (error) {
      // handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    //call fetchItems function
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
