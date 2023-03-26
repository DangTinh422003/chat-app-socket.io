import styles from "./ChatInput.module.scss";
import "./ChatInput.css";
import { useState, useRef } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const inputRef = useRef();

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleEmojiClick = (emoji, event) => {
    inputRef.current.focus();
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={`emoji ${styles.emoji}`}>
          {showEmojiPicker ? (
            <Picker
              autoFocusSearch={false}
              onEmojiClick={handleEmojiClick}
              previewConfig={{
                showPreview: false,
              }}
            />
          ) : (
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          )}
        </div>
      </div>
      <form
        className={styles.inputContainer}
        onSubmit={(e) => {
          sendChat(e);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập ở đây..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className={styles.submit} onClick={sendChat}>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
