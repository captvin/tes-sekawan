import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // Lakukan logika login di sini, misalnya memeriksa kecocokan username dan password dengan data yang valid.
    // Anda dapat menggunakan state, Redux, atau backend API untuk proses autentikasi sesuai kebutuhan.

    // Contoh sederhana: Jika username dan password benar, tampilkan pesan berhasil login.
    if (username === "admin" && password === "password") {
      alert("Login berhasil!");
      setErrorMessage("");
    } else {
      setErrorMessage("Login gagal. Silakan cek kembali username dan password Anda.");
    }
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
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;