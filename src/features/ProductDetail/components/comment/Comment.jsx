import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styles from './Comment.module.css';
import CommentForm from './components/form/CommentForm';
import CommentInput from './components/commentInput/CommentInput';
import storageUser from '../../../../constants/storageUser';
const Comment = ({ currentUserId, user }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [reponse, setReponse] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/products/${id}`;
    axios.get(getApi).then((response) => {
      setBackendComments(response.data.ratings);
    });
  }, []);
  const addComment = (text, star) => {
    const getApi = `https://yshuynh.pythonanywhere.com/api/user/ratings`;
    axios
      .post(
        getApi,
        {
          product: id,
          comment: text,
          rate: star,
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
        const getApi = `https://yshuynh.pythonanywhere.com/api/products/${id}`;
        axios.get(getApi).then((response) => {
          setBackendComments(response.data.ratings);
        });
      });
  };
  return (
    <div className={styles.comment}>
      <h3 className={styles.commentTitle}>Đánh giá sản phẩm</h3>
      <div className={styles.commentFormTitle}>Nhận xét của bạn</div>
      {user?.id ? (
        <CommentInput handleSubmit={addComment} />
      ) : (
        <div className={styles.needToLogin}>
          {' '}
          Bạn cần phải đăng nhập để nhận xét
        </div>
      )}

      {backendComments.map((item) => (
        <CommentForm key={item.id} user={user} comment={item} />
      ))}
    </div>
  );
};
export default Comment;
