import {
  Card,
  CardBody,
//   CardFooter,
  Typography,
//   Button,
} from "@material-tailwind/react";

function Post({author, body}) {
  return (
    <div className="z-0 w-1/2">
      <Card className="w-full ">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {author}
          </Typography>
          <Typography>
            {body}
          </Typography>
        </CardBody>
        {/* <CardFooter className="pt-0">
          <Button>Read More</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default Post;
