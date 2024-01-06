import { useState } from "react";

import _size from "lodash/size";

import PropertyControlledComponent from "../PropertyControlledComponent";
import styles from "./commentBox.module.css";

const CommentBox = (props) => {
  const { id, value, onCommentDelete, onCommentEdit, onCommentReply } = props;
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editInputText, setEditInputText] = useState(value);
  const [replyInputText, setReplyInputText] = useState("");

  const handleCommentDelete = () => {
    onCommentDelete(id);
  };

  const handleCommentEdit = () => {
    setIsEditMode(false);
    onCommentEdit(id, editInputText);
  };

  const handleCommentReply = () => {
    setIsReplyMode(false);
    onCommentReply(id, replyInputText);
    setReplyInputText("");
  };

  const handleEnterOnEditInput = (event) => {
    if (_size(editInputText) === 0 || event?.key !== "Enter") return;

    handleCommentEdit();
  };

  const handleEnterOnReplyInput = (event) => {
    if (_size(replyInputText) === 0 || event?.key !== "Enter") return;

    handleCommentReply();
  };

  return (
    <div className={styles.parentContainer}>
      <PropertyControlledComponent controllerProperty={!isEditMode}>
        <p className={styles.commentText}>{value}</p>
      </PropertyControlledComponent>
      <PropertyControlledComponent
        controllerProperty={!isReplyMode && !isEditMode}
      >
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => setIsReplyMode(true)}
          >
            REPLY
          </button>
          <button className={styles.button} onClick={() => setIsEditMode(true)}>
            EDIT
          </button>
          <button className={styles.button} onClick={handleCommentDelete}>
            DELETE
          </button>
        </div>
      </PropertyControlledComponent>
      <PropertyControlledComponent controllerProperty={isEditMode}>
        <div className={styles.editContainer}>
          <input
            className={styles.input}
            value={editInputText}
            onChange={(event) => setEditInputText(event.target.value)}
            onKeyDown={handleEnterOnEditInput}
            autoFocus
          />
          <div className={styles.editButtonContainer}>
            <button className={styles.button} onClick={handleCommentEdit}>
              SAVE
            </button>
            <button
              className={styles.button}
              onClick={() => setIsEditMode(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </PropertyControlledComponent>
      <PropertyControlledComponent controllerProperty={isReplyMode}>
        <div className={styles.replyContainer}>
          <input
            className={styles.input}
            value={replyInputText}
            onChange={(event) => setReplyInputText(event.target.value)}
            onKeyDown={handleEnterOnReplyInput}
            autoFocus
          />
          <p className={styles.secondaryButton} onClick={handleCommentReply}>
            REPLY
          </p>
          <p
            className={styles.secondaryButton}
            onClick={() => setIsReplyMode(false)}
          >
            CANCEL
          </p>
        </div>
      </PropertyControlledComponent>
    </div>
  );
};

export default CommentBox;
