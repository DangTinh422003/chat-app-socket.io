import styles from "./Chat.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={styles.chat}>
      <h1>Chat</h1>
    </div>
  );
}

export default Chat;
