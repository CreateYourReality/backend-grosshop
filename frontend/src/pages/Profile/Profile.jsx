import "./Profile.css";

import HeaderNav from "../../components/HeaderNav/HeaderNav";
import FooterNav from "../../components/FooterNav/FooterNav";

const Profile = () => {
  return (
    <section className="profile-section">
      <HeaderNav />
      <main>
        <h2>User Profile Page</h2>
      </main>
      <FooterNav />
    </section>
  );
};

export default Profile;
