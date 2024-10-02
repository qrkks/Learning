import {Modal} from "./Modal";
import NewPost from "./NewPost";
import Post from "./Post";
import {useState} from "react";

export default function PostsList(props) {
  // for newpost
  const [enteredText, setEnteredText] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const handleTextInput = (e) => {
    console.log(e.target.value);
    setEnteredText(e.target.value);
  };
  const handleAuthorInput = (e) => {
    console.log(e.target.value);
    setEnteredAuthor(e.target.value);
  };
console.log('postlist',props)
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {props.isModalVisible && (
        <Modal handleModal={props.handleModal}>
          <NewPost props={props}
            handleTextInput={handleTextInput}
            handleAuthorInput={handleAuthorInput}
          />
        </Modal>
      )}
      <hr />
      <Post author={enteredAuthor} body={enteredText}></Post>
      <Post author="pp" body="body"></Post>

    </div>
  );
}
