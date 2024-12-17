import styles from './Post.module.css';
import { Comment } from './Comment'
import { Avatar } from './Avatar';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';


interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}
interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps{
  author: Author;
  content: Content[];
}

export function Post({ author, content }: PostProps) {
  {
    const [comments, setComments] = useState([
      'Comentário 1',
    ])

    //estado = variaveis que eu quero que o componente monitore

    const [newCommentText, setNewCommentText] = useState('');
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('Esse campo é obrigatório');
    }
    console.log(newCommentText)

    function handleCreateNewComment(event: FormEvent) {
      event.preventDefault()


      setComments([...comments, newCommentText]);
      setNewCommentText('');
    }
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('');
      setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete:string) {
      const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);

      setComments(commentsWithoutDeletedOne);
    }


    return (
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
            <Avatar src={author.avatarUrl} />
            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>

          <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:00">Publicado há 1h</time>
        </header>

        <div className={styles.content}>
          {content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === 'link') {
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
          })}
        </div>

        <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>
          <textarea
            name="comment"
            placeholder="Deixe um comentário"
            value={newCommentText}
            onChange={handleNewCommentChange}
            required
            onInvalid={handleNewCommentInvalid}
          />
          <footer>
            <button type="submit" disabled={newCommentText.length === 0}>
              Publicar
            </button>
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map(comment => {
            return <Comment content={comment} key={comment} deleteComment={deleteComment} />
          })}
        </div>
      </article>
    )
  }
}