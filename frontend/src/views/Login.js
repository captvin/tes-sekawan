import React, { useState } from "react";
import axios from '../axios'
import { Redirect } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const Login = async () => {
      try {
        const response = await axios.post('/login', {
          username: username,
          password: password
        });
        console.log(response.data)

        

        if (response.data.logged === true) {
          // Arahkan pengguna ke halaman dashboard
          sessionStorage.setItem('loginData', JSON.stringify(response.data));
          sessionStorage.setItem('token', JSON.stringify(response.data.token));
          window.location.href = '/dashboard'
        }
      } catch (error) {
        console.log("Terjadi kesalahan:", error);
      }
    }
    Promise.all([Login()])
  };

  return (
    <div>
      <h2>Halaman Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>


  );
};

export default Login;