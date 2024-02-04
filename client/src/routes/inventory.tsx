import { HStack, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td} from '@chakra-ui/react';
import { Item } from '../constants';

interface IInventory {
  items: Item[];
  setInventory: (items: Item[]) => void;
}

const Inventory: React.FC<IInventory> = ({ items, setInventory }) => {
  return (
    <>
      <HStack width="100%" spacing="none" paddingX="none" aria-label="dashboard-title">
        <Text fontSize='4xl' color="#40513B" fontWeight="bold">INVENTORY</Text>
      </HStack>
      <TableContainer border={'1px'}>
        <Table variant='striped' colorScheme='green' size={'lg'}>
          <Thead>
            <Tr>
              <Th>ITEM DESCRIPTION</Th>
              <Th>PRODUCT ID</Th>
              <Th>IN STOCK</Th>
              <Th>PRICE</Th>
              <Th>STATUS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr key={item.id}>
                  <Td>{item.description}</Td>
                  <Td>{item.id}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Inventory;
