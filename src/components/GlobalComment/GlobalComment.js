import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import _size from "lodash/size";

import styles from "./globalComment.module.css";

const GlobalComment = (props) => {
  const { setCommentData } = props;
  const [inputText, setInputText] = useState("");

  const handleAddNewComment = () => {
    setCommentData((commentData) => [
      ...commentData,
      { id: uuidv4(), value: inputText, repliesData: [] },
    ]);
    setInputText("");
  };

  const handleEnterPress = (event) => {
    if (_size(inputText) === 0 || event?.key !== "Enter") return;

    setCommentData((commentData) => [
      ...commentData,
      { id: uuidv4(), value: inputText, repliesData: [] },
    ]);
    setInputText("");
  };

  return (
    <div className={styles.parentContainer}>
      <input
        className={styles.inputContainer}
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        onKeyDown={handleEnterPress}
        autoFocus
      />
      <button className={styles.commentButton} onClick={handleAddNewComment}>
        Comment
      </button>
    </div>
  );
};

export default GlobalComment;
