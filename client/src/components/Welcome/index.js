import styles from "./Welcome.module.scss";
import robot from "../../image/robot.gif";
function Welcome({ currentUser }) {
  return (
    <div className={styles.container}>
      <img src={robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser && currentUser.userName}</span>
      </h1>
      <h3>Vui lòng chọn để bắt đầu CHAT!</h3>
    </div>
  );
}

export default Welcome;
