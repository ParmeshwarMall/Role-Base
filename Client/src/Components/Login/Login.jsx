import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css";

let isAdLog = false;

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submit = (e) => {
    e.preventDefault();
    const { username, password } = user;

    const toastId = toast.loading("Logging in, please wait...", {
      position: "top-center",
    });

    try {
      if (username === "admin") {
        if (password === "1234") {
          toast.update(toastId, {
            render: "Login Successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          isAdLog = true;
          navigate("/dashboard");
        } else {
          toast.update(toastId, {
            render: "Invalid Password!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
      } else {
        toast.update(toastId, {
          render: "Invalid Username!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.update(toastId, {
        render: "Something went wrong, please try again.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login">
      <h1 className="head">Role Base Access Control</h1>

      <form onSubmit={submit} className="login__form">
        <h1 className="login__title">Admin Login</h1>

        <div className="login__content">
          <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>
            <div className="login__box-input">
              <input
                type="text"
                required
                className="login__input"
                id="login-email"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder=" "
              />
              <label htmlFor="login-email" className="login__label">
                Username
              </label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input
                type={passwordVisible ? "text" : "password"}
                required
                className="login__input"
                id="login-pass"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder=" "
              />
              <label htmlFor="login-pass" className="login__label">
                Password
              </label>

              <span
                className="login__eye"
                onClick={handlePasswordVisibilityToggle}
                style={{ cursor: "pointer" }}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    </div>
  );
}

export { isAdLog };
