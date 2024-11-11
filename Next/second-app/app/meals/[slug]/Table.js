// "use client";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const TABLE_HEAD = ["Key", "Value"];

export default function DefaultTable(props) {
  // console.log(props);
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="purple">
          <TableCaption>So sweet!</TableCaption>
          {/* <Thead>
            <Tr>
              <Th>K</Th>
              <Th>V</Th>
            </Tr>
          </Thead> */}
          <Tbody>
            {Object.entries(props).map(([key, value]) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td>{value}</Td>
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </>
  );
}
