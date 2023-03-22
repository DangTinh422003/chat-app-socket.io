import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Login.module.scss";
import tdtuLogo from "../../image/output-onlinepngtools.png";
import { LoginRoute } from "../../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
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
    const { password, userName } = values;
    if (userName === "" || password === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin", toastOption);
      return false;
    } else if (userName.length < 6) {
      toast.error("Tên đăng nhập phải lớn hơn 6 ký tự", toastOption);
      return false;
    } else if (password < 6) {
      toast.error("Mật khẩu phải lớn hơn 6 ký tự", toastOption);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hanleValidation()) {
      const { data } = await axios.post(LoginRoute, { ...values });
      console.log("🚀 ~ file: index.js:47 ~ handleSubmit ~ data:", data)
      if (!data.status) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
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
          <h1>TDT Login</h1>
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
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
        />
        <p className={styles.desc}>
          Nếu chưa có tài khoản
          <Link className={styles.link} to="/register">
            {" "}đăng kí{" "}
          </Link>
          tại đây!
        </p>
        <button onClick={handleSubmit}>Đăng nhập</button>
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

export default Login;
