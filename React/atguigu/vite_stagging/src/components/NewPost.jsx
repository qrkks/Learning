import {Input} from "@material-tailwind/react";
import {Textarea} from "@material-tailwind/react";

function NewPost({handleTextInput, handleAuthorInput}) {
  return (
    <div className="w-1/2 mt-5">
      <form className="space-y-5 " action="">
        <Input
          onChange={handleAuthorInput}
          variant="standard"
          label="Your Name"
        />
        <Textarea
          onChange={handleTextInput}
          variant="outlined"
          label="New Post"
          className=""
        />
      </form>
    </div>
  );
}

export default NewPost;
