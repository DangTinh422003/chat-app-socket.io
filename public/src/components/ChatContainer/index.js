import { useEffect, useState } from "react";
import ChatInput from "../ChatInput";
import Logout from "../Logout";
import avt from "../../image/avt.jpg";
import axios from "axios";
import styles from "./ChatContainer.module.scss";
import { sendMessageRoute, getAllMessageRoute } from "../../utils/APIRoutes";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessenges] = useState({ projectMessages: null });
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages.projectMessages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });
    const newMessages = { ...messages };
    newMessages.projectMessages = msgs;
    setMessenges(newMessages);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        if (data.from === currentChat._id) {
          const msgs = [].concat(messages.projectMessages);
          msgs.push({
            fromSelf: false,
            message: data.message,
          });
          const newMessages = { ...messages };
          newMessages.projectMessages = msgs;
          setMessenges(newMessages);
        }
      });
    }
  }, [currentChat, messages, socket]);

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
        {messages?.projectMessages?.map((item, index) => {
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
