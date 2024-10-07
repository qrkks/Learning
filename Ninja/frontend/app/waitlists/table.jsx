import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export function TableDemo({data}) {
    const router = useRouter();
    
  return (
    <Table>
      <TableCaption>A list of your recent waitlists.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} onClick={() => router.push(`/waitlists/${item.id}`)} className="cursor-pointer">
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{new Date(item.updated).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {new Date(item.timestamp).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
    </Table>
  );
}
