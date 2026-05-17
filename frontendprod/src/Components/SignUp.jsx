import React, { useState } from "react";

import { FaUser } from "react-icons/fa";
import { IoIosKey, IoMdText } from "react-icons/io";

import { MdOutlineFormatColorText } from "react-icons/md";
import { context } from "../App";
import axios from "axios";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setFullName] = useState("");
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = React.useContext(context);
  return (
    <>
      {" "}
      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <FaUser className="size-4 me-2 " />
        Sign Up
      </label>
      <div className="tab-content p-6">
        <div className="flex flex-col gap-4 justify-center items-center"></div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = {
              name,
              email,
              password,
            };
            try {
              const res = await axios.post(
                "http://localhost:8080/auth/sign",
                formData
              );
              console.log(res.data);
              localStorage.setItem("token", res.data.token);
              setUser(res.data.user);
              localStorage.setItem("user", JSON.stringify(res.data.user));
            } catch (err) {
              console.log(err);
              alert("Error occured during signup");
            }
          }}
          className="flex flex-col gap-4 mt-4 items-center"
        >
          {
            //"name"
          }
          <label className="input validator">
            <MdOutlineFormatColorText></MdOutlineFormatColorText>
            <input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              type="text"
              required
              placeholder="Full Name"
            />
          </label>

          {/* username */}
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
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>
          <p className="validator-hint hidden peer-invalid:block mt-1 text-sm text-red-400">
            Must be 3 to 30 characters
          </p>
          {/* password */}
          {/* Password Field */}
          <label
            className={`${
              password !== confirmPassword ? "outline-red-400" : ""
            } input validator`}
          >
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
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              minLength="8"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="peer"
            />
          </label>
          <p className="validator-hint hidden peer-invalid:block mt-1 text-sm text-red-400">
            Must be more than 8 characters
          </p>
          {/* Confirm Password Field */}
          <label className="input validator ">
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
                setConfirmPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              required
              placeholder="Confirm Password"
              minlength="8"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          {password !== confirmPassword && (
            <p className="text-red-400 text-sm">
              Password and Confirm Password do not match{" "}
            </p>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />{" "}
            show password
          </div>
          <input
            type="submit"
            value="Sign Up"
            disabled={
              name.length < 1 ||
              email.length < 3 ||
              password.length < 8 ||
              password !== confirmPassword
            }
            className="btn btn-primary w-full "
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;
