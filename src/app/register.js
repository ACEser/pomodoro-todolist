import axios from "axios";
import { useDispatch } from "react-redux";
import { saveToken } from "./authActions";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import "./login.css";
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:800/src/api/util/register.php", formValues)
        .then((response) => {
          console.log(response.data);
        })
        .catch(() => {
          console.log("error");
        });
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Those passwords didn’t match. Try again.";
    }
    return errors;
  };

  return (
    <>
      <div className="bgImg"></div>
      <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">注册成功</div>
        ) : (
          console.log("Entered Details", formValues)
        )}

        <form onSubmit={handleSubmit}>
          <h1>注册</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>用户名</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="field">
              <label>邮箱</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>密码</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className="field">
              <label>确认密码</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.confirmPassword}</p>
            <button className="fluid ui button blue">创建账户</button>
          </div>
        </form>
        <div className="text">
          我已有账户{" "}
          <span>
            <Link to="/login">登录</Link>
          </span>
        </div>
      </div>{" "}
    </>
  );
}

export default Register;
