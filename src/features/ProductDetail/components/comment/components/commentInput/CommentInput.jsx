import React, { useState } from 'react';
import styles from './CommentInput.module.css';
import Rating from '@mui/material/Rating';
const CommentInput = ({ handleSubmit }) => {
  const [text, setText] = useState('');
  const [star, setStar] = React.useState(null);
  const isTextDisable = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text, star);
    setText('');
    setStar(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <Rating
        name="simple-controlled"
        value={star}
        onChange={(event, newValue) => {
          setStar(newValue);
          console.log(newValue);
        }}
      />
      <div className={styles.textAreaStyle}>
        <textarea
          className={styles.form}
          value={text}
          onChange={(e) => {
            // console.log(e.target.value);
            return setText(e.target.value);
          }}
        />
      </div>
      <button disabled={isTextDisable} className={styles.btn}>
        viết bình luận
      </button>
    </form>
  );
};

export default CommentInput;
