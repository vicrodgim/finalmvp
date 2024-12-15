import "./ProfileBanner.css";

export const ProfileBanner = () => {
  return (
    <div className="profile-banner">
      <div className="profile-photo-container">
        <img className="profile-photo"></img>
      </div>
      <div className="profile-data-container">DATA</div>
      <div className="profile-description-container">
        <p>DESCRIPTION</p>
      </div>
      <div className="profile-edit-container">
        <button>EDIT</button>
      </div>
    </div>
  );
};
