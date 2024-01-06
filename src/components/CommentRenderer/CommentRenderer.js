import { v4 as uuidv4 } from "uuid";

import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _compact from "lodash/compact";

import CommentBox from "../CommentBox";
import styles from "./commentRenderer.module.css";

const CommentRenderer = (props) => {
  const { commentData, setCommentData } = props;

  const handleCommentDelete = (id) => {
    setCommentData((currentData) => {
      const recursion = (data) => {
        return _compact(
          _map(data, (currentData) => {
            const { id: currentId, repliesData } = currentData;

            if (id === currentId) return null;

            const updatedRepliedData = recursion(repliesData) || [];
            return {
              ...currentData,
              repliesData: updatedRepliedData,
            };
          })
        );
      };

      return recursion(currentData);
    });
  };

  const handleCommentEdit = (id, editInputText) => {
    setCommentData((currentData) => {
      const recursion = (data) => {
        return _map(data, (currentData) => {
          const { id: currentId, repliesData } = currentData;

          if (id === currentId)
            return {
              ...currentData,
              value: editInputText,
            };

          const updatedRepliedData = recursion(repliesData) || [];
          return {
            ...currentData,
            repliesData: updatedRepliedData,
          };
        });
      };

      return recursion(currentData);
    });
  };

  const handleCommentReply = (id, replyInputText) => {
    setCommentData((currentData) => {
      const recursion = (data) => {
        return _map(data, (currentData) => {
          const { id: currentId, repliesData } = currentData;

          if (id === currentId) {
            return {
              ...currentData,
              repliesData: [
                ...repliesData,
                { id: uuidv4(), value: replyInputText, repliesData: [] },
              ],
            };
          }

          const updatedRepliedData = recursion(repliesData) || [];
          return {
            ...currentData,
            repliesData: updatedRepliedData,
          };
        });
      };

      return recursion(currentData);
    });
  };

  if (_isEmpty(commentData)) return null;

  return (
    <>
      {_map(commentData, (comment) => {
        const { id, value, repliesData = [] } = comment;
        return (
          <div key={id}>
            <CommentBox
              id={id}
              value={value}
              onCommentDelete={handleCommentDelete}
              onCommentEdit={handleCommentEdit}
              onCommentReply={handleCommentReply}
            />
            <div className={styles.replyContainer}>
              <CommentRenderer
                commentData={repliesData}
                setCommentData={setCommentData}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommentRenderer;
