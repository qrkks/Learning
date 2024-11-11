"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {useRouter} from "next/navigation";

export default function CardDefault(props) {
  const router = useRouter();
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={props.image} alt="card-image" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.name}
        </Typography>
        <Typography>{props.description}</Typography>
        <Typography variant="small" color="gray" className="mt-1">{new Date(props.created_at).toLocaleString()}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={() => router.push(`/meals/${props.slug}`)}>
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
