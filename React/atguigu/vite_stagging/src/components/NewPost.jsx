import {Input} from "@material-tailwind/react";
import {Textarea} from "@material-tailwind/react";
import {Button} from "@material-tailwind/react";

function NewPost({handleTextInput, handleAuthorInput, props}) {
  return (
    <div className="w-full ">
      <form className="flex-col space-y-5 " action="">
        <Input
          onChange={handleAuthorInput}
          variant="standard"
          label="Your Name"
        />
        <Textarea
          onChange={handleTextInput}
          variant="standard"
          // variant="outlined"
          label="New Post"
          className=""
        />
        <div className="flex justify-end gap-5">

        <Button onClick={() => props.handleModal(false)} 
        variant="text" className="font-bold">
          Cancel
        </Button>
        <Button className="font-bold">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
