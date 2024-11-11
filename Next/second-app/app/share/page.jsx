import {Button, Input, Stack} from "@chakra-ui/react";

function Share() {
  return (
    <>
      <form className="flex-col space-y-5 ">
        <Input variant="outline" placeholder="Outline" />
        <Input variant="filled" placeholder="Filled" />
        <Input variant="flushed" placeholder="Flushed" />
        <Input
          variant="flushed"
          placeholder="Flushed"
          type="file"
          accept="image/*"
          name="image"
        />
        <Button colorScheme="yellow">Submit</Button>
      </form>
    </>
  );
}

export default Share;
