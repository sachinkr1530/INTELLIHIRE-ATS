import React, { useState } from "react";
import axios from "axios";
import { context } from "../App";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = React.useContext(context);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = name;
        const formData = { email, password };

        try {
          const res = await axios.post(
            "http://localhost:8080/auth/login",
            formData
          );
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          setUser(res.data.user);
        } catch (err) {
          console.log(err);

          alert("Error occured during signup");
        }
      }}
      className="flex flex-col gap-4 mt-4 items-center"
    >
      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          required
          placeholder="Username"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minLength="3"
          maxLength="30"
          title="Only letters, numbers or dash"
          className="peer"
        />
      </label>
      <p className="validator-hint hidden peer-invalid:block mt-1 text-sm text-red-400">
        Must be 3 to 30 characters
      </p>

      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={visible ? "text" : "password"}
          required
          placeholder="Password"
          minLength="8"
          title="Must be more than 8 characters"
          className="peer"
        />
      </label>
      <p className="validator-hint hidden peer-invalid:block mt-1 text-sm text-red-400">
        Must be more than 8 characters,
      </p>
      <div className="flex gap-2 items-center">
        <input
          id="pwd"
          type="checkbox"
          onClick={() => {
            setVisible(!visible);
          }}
        ></input>
        <label for="pwd" className="select-none">
          Show Password
        </label>
      </div>
      <input
        type="submit"
        value="Login"
        disabled={name.length < 3 || password.length < 8}
        className="btn btn-success w-full "
      />
    </form>
  );
};

export default Login;
