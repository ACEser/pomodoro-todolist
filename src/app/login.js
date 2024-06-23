import axios from "axios";
import { useDispatch } from "react-redux";
import { saveToken } from "./authActions";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import "./login.css";
import { Link } from "react-router-dom";
import AppRouter from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function Login() {
  const initialValues = {
    username: "",
    password: "",
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
        .post("http://localhost:800/src/api/util/login.php", formValues)
        .then((response) => {
          if (response.data.success) {
/*             console.log(response.data.message); // 打印 "登录成功。"
            console.log(response.data.token); // 打印 token */
            const token = response.data.token;

            dispatch(saveToken(token));
          }
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
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  return (
    <>
      <div className="bgImg"></div>
      <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">登录成功</div>
        ) : (
          console.log("Entered Details", formValues)
        )}

        <form onSubmit={handleSubmit}>
          <h1>登录</h1>
          <div className="ui divider">
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
            <button className="fluid ui button blue">登录</button>
          </div>
        </form>

        <div className="text">
          没有账号{" "}
          <AppRouter>
            <span>
              <Link to="/register">注册</Link>
            </span>
          </AppRouter>
        </div>
      </div>
    </>
  );
}

export default Login;
