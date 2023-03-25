import styles from "./ChatContainer.module.scss";
import avt from "../../image/avt.jpg";
import Logout from "../Logout";
import ChatInput from "../ChatInput";
import Messages from "../Messages";

function ChatContainer({ currentChat }) {
  const handleSendMsg = async (msg) => {
    alert(msg);
  };

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
      <Messages />
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ChatContainer;
