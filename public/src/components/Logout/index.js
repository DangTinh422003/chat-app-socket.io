import styles from "./Logout.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function Logout() {
  const navigate = useNavigate();
  const handleClick = async (e) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button className={styles.button} onClick={handleClick}>
      <BiPowerOff></BiPowerOff>
    </button>
  );
}

export default Logout;
