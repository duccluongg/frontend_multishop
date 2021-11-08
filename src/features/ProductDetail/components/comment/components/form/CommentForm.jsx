import React from 'react';
import styles from './CommentForm.module.css';
const CommentForm = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.img}>
        <img
          alt="ava"
          className={styles.img}
          src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114764528-stock-illustration-man-avatar-character.jpg"
        />
      </div>
      <div className={styles.commentRight}>
        <div className={styles.commentContent}>
          <div className={styles.commentAuthor}>{comment.user.name}</div>
          <div className={styles.date}>
            {comment.created_at.substring(0, 10)}
          </div>
          <div className={styles.star}>
            {Array(comment.rate).fill(<i class="fas fa-star "></i>)}
            {Array(5 - comment.rate).fill(<i class="far fa-star"></i>)}
          </div>
        </div>
        <div className={styles.commentText}>{comment.comment}</div>
        <div className={styles.replies}>
          {comment.responses.map((item1) => (
            <div key={item1.id} className={styles.contain}>
              <img
                alt="ava"
                className={styles.img}
                src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114764528-stock-illustration-man-avatar-character.jpg"
              />
              <div className={styles.info}>
                <div className={styles.name}>
                  {' '}
                  Phản hồi của
                  <span className={styles.name1}>{item1.user.name}</span>
                  {item1.user.role === 'admin' ? (
                    <span className={styles.QTV}>QTV</span>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className={styles.date}>
                  {item1.created_at.substring(0, 10)}
                </div>
                <div className={styles.infoComment}>{item1.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
