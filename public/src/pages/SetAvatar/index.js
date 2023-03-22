import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import axios from "axios";
import styles from "./SetAvatar.module.scss";
import loader from "../../image/loader.gif";
import { SetAvatarRoute } from "../../utils/APIRoutes";

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async (e) => {
    if (!selectedAvatar) {
      toast.error("Vui lòng chọn hình đại diện!", toastOption);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const data = await axios.post(`${SetAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!", toastOption);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatars();
  }, []);

  return (
    <div className={styles.SetAvatar}>
      {isLoading ? (
        <img
          src={loader}
          alt="loader"
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        />
      ) : (
        <>
          <div className={styles.title}>
            <h1>Chọn hình đại diện</h1>
          </div>

          <div className={styles.avatars}>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.avatar} ${
                    selectedAvatar === index ? styles.selected : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={(e) => {
                      setSelectedAvatar(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <button className={styles.submitBtn} onClick={setProfilePicture}>
            Chọn Avatar
          </button>
        </>
      )}

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

export default SetAvatar;
