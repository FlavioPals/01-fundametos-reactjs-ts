import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { ThumbsUp, Trash } from 'phosphor-react';

interface CommentProps {
  content: string;
  deleteComment: (commentToDelete: string) => void;
}


export function Comment({content, deleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleLikeComment() {
    setLikeCount(likeCount + 1);
  }
  function handleDeleteComment() {
    deleteComment(content);
  }
  return (
    <div className={styles.comment}>
      <Avatar hasBorder ={false} src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{'Flavio Pals'}</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">Cerca de 1h atrás</time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )

}