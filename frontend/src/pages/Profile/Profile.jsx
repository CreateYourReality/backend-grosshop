import "./Profile.css";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import FooterNav from "../../components/FooterNav/FooterNav";
import camera from "../../assets/img/camera.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import defaultAvatar from "../../assets/img/defaultAvatar.gif";

import defaultAvatar from "../../assets/img/camera.svg" //TODO AUSTAUSCHEN!

const Profile = () => {
  const { user, refetch, isLoggedIn, logout } = useContext(UserContext);
  console.log(isLoggedIn);
  // console.log(user);
  // console.log(user._id);

  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || " ",
    email: user.email || " ",
    address: user.address || " ",
    phone: user.phone,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData(event.target);
      console.log(formDataToSend);
      for (const per of formDataToSend.entries()) {
        console.log(`${per[0]},${per[1]}`);
      }
      await axios.put(`/api/users/${user._id}`, formDataToSend);
      refetch();
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error while saving the data:", error);
    }
  };
  return (
    <>
      <form action="#" onSubmit={handleSubmit} className="profile-section">
        <section className="avatar-section">
          <HeaderNav />
          <article className="addImg-section">
            <div className="photo-box">
              <label htmlFor="upload-button">
                <div className="user-avatar">
                  {isLoggedIn && user.image ? (
                    <img src={user.image.url} alt="User Avatar" />
                  ) : (
                    <img src={defaultAvatar} alt="Default Avatar" />
                  )}
                </div>
                <span className="upload-icon">
                  <img src={camera} alt="camera" />
                </span>
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                id="upload-button"
                style={{ display: "none" }}
              />
            </div>
          </article>
        </section>
        <section className="profile-data">
          <article className="user-content">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </article>
          <article className="user-content">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </article>
          <article className="user-content">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              name="address"
              id="address"
              cols="2"
              rows="2"
              value={formData.address}
              onChange={handleChange}
            />
          </article>
          <article className="user-content">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </article>
          {showNotification && (
            <div className="notification">Profile updated succesfully!</div>
          )}
          <article className="profile-btn-box">
            <button>Update Profile</button>
          </article>
        </section>
        <FooterNav />
      </form>
    </>
  );
};

export default Profile;
