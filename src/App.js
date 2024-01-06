import { useState } from "react";

import GlobalComment from "./components/GlobalComment";
import CommentRenderer from "./components/CommentRenderer";
import styles from "./app.module.css";

const App = () => {
  const [commentData, setCommentData] = useState([]);

  return (
    <div className={styles.parentContainer}>
      <GlobalComment setCommentData={setCommentData} />
      <CommentRenderer
        commentData={commentData}
        setCommentData={setCommentData}
      />
    </div>
  );
};

export default App;
