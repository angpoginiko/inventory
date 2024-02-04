import { Box, HStack, VStack, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Link } from '@chakra-ui/react';
import { Cart } from '../constants';

interface IPos {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
}

const Pos: React.FC<IPos> = ({ cart, setCart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <>
      <HStack width="100%" spacing="none" paddingX="none" aria-label="dashboard-title">
        <Text fontSize='4xl' color="#40513B" fontWeight="bold">POINT OF SALE</Text>
      </HStack>
      <TableContainer border={'1px'}>
        <Table variant='striped' colorScheme='green' size={'lg'}>
          <Thead>
            <Tr>
              <Th>ITEM DESCRIPTION</Th>
              <Th>QUANTITY</Th>
              <Th>PRICE</Th>
              <Th>TOTAL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((item) => (
              <Tr key={item.id}>
                  <Td>{item.description}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.quantity * item.price}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={4}>
                <Flex justify='space-between' p='20px' aria-label='computation'>
                  <VStack align='left'>
                    <Text fontSize='xl'>TOTAL AMOUNT: P{totalPrice}</Text>
                  </VStack>
                  <HStack align='right'>
                    <Box borderColor='black' borderWidth='1px' borderRadius='sm' py='10px' px='30px' bg={'#40513B'}>
                      <Link onClick={onOpen}>
                        <VStack pt='0px' spacing={'none'} mt='5px'>
                          <Text color={'white'}>Process</Text>
                          <Text color={'white'}>Transaction</Text>
                        </VStack>
                      </Link>
                    </Box>
                  </HStack>
                </Flex>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent backgroundColor={'#EDF1D6'}>
          <ModalHeader alignItems={'center'}>ORDER SUMMARY</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <HStack>
                <Text>
                  TOTAL: P{totalPrice}
                </Text>
              </HStack>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() =>{
              cart = [];
              setCart(cart);
              onClose();
            }}>
              DONE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Pos;
