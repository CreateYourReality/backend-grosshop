import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const UserProfileData = () => {
  const { user, refetch } = useContext(UserContext);
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

      // formDataToSend.append("name", formData.name);
      // formDataToSend.append("email", formData.email);
      // formDataToSend.append("address", formData.address);
      // formDataToSend.append("phone", formData.phone);
      // formDataToSend.append("image", formData.image);
      console.log(formDataToSend);
      for (const per of formDataToSend.entries()) {
        console.log(`${per[0]},${per[1]}`);
      }
      await axios.put(`/api/users/${user._id}`, formDataToSend);
      refetch();
      console.log("Daten erfolgreich gespeichert!");
    } catch (error) {
      console.error("Fehler beim Speichern der Daten:", error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Avatar:</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        {user.image && <img src={user.image.url} alt="User Avatar" />}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfileData;
