import React, { useState } from 'react';
import styles from './CommentInput.module.css';
const CommentInput = ({ handleSubmit }) => {
  const [text, setText] = useState('');
  const isTextDisable = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText('');
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className={styles.form}
        value={text}
        onChange={(e) => {
          // console.log(e.target.value);
          return setText(e.target.value);
        }}
      />
      <button disabled={isTextDisable} className={styles.btn}>
        viết bình luận
      </button>
    </form>
  );
};

export default CommentInput;
