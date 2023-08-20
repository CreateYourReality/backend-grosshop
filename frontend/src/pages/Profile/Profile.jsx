import "./Profile.css";

import HeaderNav from "../../components/HeaderNav/HeaderNav";
import FooterNav from "../../components/FooterNav/FooterNav";
import camera from "../../assets/img/camera.svg";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  console.log(isLoggedIn);
  return (
    <form action="#" className="profile-section">
      <section className="avatar-section">
        <HeaderNav />
        <article className="addImg-section">
          <div className="photo-box">
            <label htmlFor="upload-button">
              {"" ? (
                <img src="" alt="dummy" width="30" height="30" />
              ) : (
                <span>
                  <img src={camera} alt="camera" />
                </span>
              )}
            </label>
            <input type="file" id="upload-button" style={{ display: "none" }} />
          </div>
        </article>
      </section>
      <section className="profile-data">
        <article className="user-content">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />
        </article>
        <article className="user-content">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </article>
        <article className="user-content">
          <label htmlFor="address">Shipping Address</label>
          <textarea
            name="address"
            id="address"
            cols="2"
            rows="2"
            required></textarea>
        </article>
        <article className="user-content">
          <label htmlFor="phone">Phone Number</label>
          <input type="number" id="phone" required />
        </article>
        <article className="profile-btn-box">
          <button>Update Profile</button>
          {isLoggedIn && (
            <button type="button" onClick={logout}>
              Logout
            </button>
          )}
        </article>
      </section>
      <FooterNav />
    </form>
  );
};

export default Profile;
