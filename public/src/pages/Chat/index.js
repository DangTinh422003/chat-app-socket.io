import styles from "./Chat.module.scss";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AllUsersRoute } from "../../utils/APIRoutes";
import Contact from "../../components/Contact";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, [navigate, setCurrentUser]);
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const response = await axios.get(
            `${AllUsersRoute}/${currentUser._id}`
          );
          setContacts(response.data);
        } else {
          navigate("/setavatar");
        }
      }
    };
    fetchData();
  }, [currentUser,navigate]);

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        <Contact contacts={contacts} currentUser={currentUser}></Contact>
      </div>
    </div>
  );
}

export default Chat;
