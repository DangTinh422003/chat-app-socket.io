import styles from "./Chat.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllUsersRoute } from "../../utils/APIRoutes";
import Contact from "../../components/Contact";
import Welcome from "../../components/Welcome";
import ChatContainer from "../../components/ChatContainer";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
  }, [navigate]);
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const response = await axios.get(`${AllUsersRoute}/${currentUser._id}`);
        setContacts(response.data);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.container}>
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        ></Contact>
        {isLoaded && !currentChat ? (
          <Welcome currentUser={currentUser}></Welcome>
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
          ></ChatContainer>
        )}
      </div>
    </div>
  );
}

export default Chat;
