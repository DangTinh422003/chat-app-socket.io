import styles from "./ChatContainer.module.scss";
import avt from "../../image/avt.jpg";
import Logout from "../Logout";

function ChatContainer({ currentChat }) {
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
      <div className={styles.chatMessenger}></div>
      <div className={styles.chatInput}></div>
    </div>
  );
}

export default ChatContainer;
