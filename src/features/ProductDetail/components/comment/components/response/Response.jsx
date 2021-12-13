import React, { useState, useRef, useEffect } from 'react';
import styles from './response.module.css';
import axios from 'axios';
import storageUser from '../../../../../../constants/storageUser';
const Response = ({ comment }) => {
  const rating_id = comment?.id;
  console.log(rating_id);
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState('');
  const inputEl = useRef(null);
  const postResponse = (e) => {
    e.preventDefault();
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/ratings/${rating_id}/response`;
    axios
      .post(
        getApi,
        {
          comment: response,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
              storageUser.TOKEN
            )}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
    setResponse('');
  };
  return (
    <div>
      <div
        onClick={() => {
          setModal(!modal);
          if (modal === true) {
            inputEl?.current?.focus();
          }
        }}
        className={styles.response}
      >
        Phản hồi
      </div>
      {modal && (
        <div className={styles.modalResponse}>
          <img
            alt="ava"
            className={styles.ava}
            src="https://st2.depositphotos.com/2703645/11476/v/450/depositphotos_114764528-stock-illustration-man-avatar-character.jpg"
          />
          <form onSubmit={postResponse}>
            <div className={styles.responseInput}>
              <input
                ref={inputEl}
                value={response}
                onChange={(e) => {
                  setResponse(e.target.value);
                }}
                type="text"
                placeholder={`Trả lời bình luận của ${comment?.user?.name}`}
              ></input>
              <button type="submit">
                <i className="far fa-comment-dots"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Response;
