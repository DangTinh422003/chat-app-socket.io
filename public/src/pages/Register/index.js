import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Register.module.scss";
import tdtuLogo from "../../image/output-onlinepngtools.png";
import { RegisterRoute } from "../../utils/APIRoutes";

function Register() {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOption = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const hanleValidation = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const { password, email, confirmPassword, userName } = values;
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin", toastOption);
      return false;
    } else if (userName.length < 6) {
      toast.error("Tên đăng nhập phải lớn hơn 6 ký tự", toastOption);
      return false;
    } else if (!validateEmail(email)) {
      toast.error("Email không đúng định dạng", toastOption);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp", toastOption);
      return false;
    } else if (password < 6 || confirmPassword < 6) {
      toast.error("Mật khẩu phải lớn hơn 6 ký tự", toastOption);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hanleValidation()) {
      const { data } = await axios.post(RegisterRoute, { ...values });
      console.log("🚀 ~ file: index.js:67 ~ handleSubmit ~ data:", data);
      if (!data.status) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
    }
  };

  const hanleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.register}>
      <form>
        <div className={styles.headingForm}>
          <div className={styles.logo}>
            <img src={tdtuLogo} alt="" />
          </div>
          <h1>TDT Register</h1>
        </div>
        <input
          require="true"
          onChange={hanleChange}
          type="text"
          placeholder="Username"
          name="userName"
          value={values.userName}
        />
        <input
          require="true"
          onChange={hanleChange}
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
        />
        <input
          require="true"
          onChange={hanleChange}
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
        />
        <input
          require="true"
          onChange={hanleChange}
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
        />
        <p className={styles.desc}>
          Nếu đã có tài khoản{" "}
          <Link className={styles.link} to="/login">
            login
          </Link>{" "}
          tại đây!
        </p>
        <button onClick={handleSubmit}>Đăng ký</button>
      </form>

      {/* animation */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Register;
