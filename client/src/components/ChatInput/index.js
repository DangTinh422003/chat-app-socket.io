import styles from "./ChatInput.module.scss";
import "./ChatInput.css";
import { useState, useRef } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";

function ChatInput({ handleSendMsg, chatContainerRef }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const inputRef = useRef();
  const iconPickerRef = useRef();

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(true);
  };

  useClickOutside(iconPickerRef, () => {
    setShowEmojiPicker(false);
  });

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji) => {
    inputRef.current.focus();
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={`emoji ${styles.emoji}`} ref={iconPickerRef}>
          {showEmojiPicker && (
            <Picker
              autoFocusSearch={false}
              onEmojiClick={handleEmojiClick}
              previewConfig={{
                showPreview: showEmojiPicker,
              }}
            />
          )}
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
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
