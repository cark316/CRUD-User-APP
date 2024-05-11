import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditUser = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3333/api/users/${id}`)
      .then((response) => {
        setEmail(response.data.email);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured");
        console.log(error);
      });
  }, []);

  const handleEditUser = () => {
    const data = {
      email,
      username,
      password,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3333/api/users/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("User edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error occured, please check console");
        enqueueSnackbar("Error", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create User</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <label className="text-xl mr-4 text-gray-500">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditUser}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
