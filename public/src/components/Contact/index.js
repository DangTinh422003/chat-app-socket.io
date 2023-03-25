import { useEffect, useState } from "react";
import styles from "./Contact.module.scss";
import logo from "../../image/logo.png";
import avt from "../../image/avt.jpg";

function Contact({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentSelected, setCurrentSelected] = useState();
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && (
        <div className={styles.container}>
          <div className={styles.container_left}>
            <div className={styles.brand}>
              <img src={logo} alt="logo" />
              <h3>ChatApp</h3>
            </div>

            <div className={styles.contacts}>
              {contacts.users &&
                contacts.users.map((contact, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => changeCurrentChat(index, contact)}
                      className={`${styles.contact} ${
                        index === currentSelected ? styles.selected : ""
                      }`}
                    >
                      <div className={styles.avatar}>
                        <img src={avt} alt="avatar" />
                      </div>
                      <div className={styles.username}>
                        <h3>{contact.userName}</h3>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={styles.currentUser}>
              <div className={styles.avatar}>
                <img src={avt} alt="avatar" />
              </div>
              <div className={styles.username}>
                <h3>{currentUserName}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
