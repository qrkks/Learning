import NewPost from "./NewPost";
import Post from "./Post";
import {useState} from 'react';

export default function PostsList() {
  const [enteredText, setEnteredText] = useState('');
  const handleTextInput = (e) => {
    console.log(e.target.value);
    setEnteredText(e.target.value);
  };
  const [enteredAuthor, setEnteredAuthor] = useState('');
  const handleAuthorInput = (e) => {
    console.log(e.target.value);
    setEnteredAuthor(e.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <NewPost enteredText={enteredText} handleTextInput={handleTextInput} handleAuthorInput={handleAuthorInput} enteredAuthor={enteredAuthor}/>
      <hr />
      <Post author={enteredAuthor} body={enteredText}></Post>
      <Post author="pp" body="body"></Post>
    </div>
  );
}
