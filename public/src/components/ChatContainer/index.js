import { useEffect, useState } from "react";
import ChatInput from "../ChatInput";
import Logout from "../Logout";
import avt from "../../image/avt.jpg";
import axios from "axios";
import styles from "./ChatContainer.module.scss";
import { sendMessageRoute, getAllMessageRoute } from "../../utils/APIRoutes";

function ChatContainer({ currentChat, currentUser }) {
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };

  const [messages, setMessenges] = useState([]);
  useEffect(() => {
    const fetchChatData = async () => {
      if (currentChat && currentUser) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessenges(response.data);
      }
    };
    fetchChatData();
  }, [currentChat, currentUser]);

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>
        <ul className={styles.userDetail}>
          {/* avatar */}
          <li className={styles.avatar}>
            <img src={avt} alt="avatar" />
          </li>

          {/* userName */}
          <li className={styles.userName}>
            <h3>{currentChat.userName}</h3>
          </li>
        </ul>
        <Logout></Logout>
      </div>

      {/* chat */}
      <div className={styles.chatContainer}>
        {messages.projectMessages?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.message} ${
                item.fromSelf ? styles.sended : styles.recieved
              }`}
            >
              <div className={styles.content}>
                <p>{item.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ChatContainer;
