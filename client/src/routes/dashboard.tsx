import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { Item } from '../constants';

interface IDashboard {
  items: Item[];
}

const Dashboard: React.FC<IDashboard> = ({ items }) => {
  const hasLowStockCount =  items.filter((item) => item.status === 'Limited Stock').length;
  const hasNoStockCount = items.filter((item) => item.status === 'Out of stock').length;
  const calculateProfit = (quantity: number, price : number) => {
    const maxPrice = price * 100;
    const remainingPrice = quantity * price;
    const profitPerItem = maxPrice - remainingPrice;
    return profitPerItem;
  };
  
  const calculateTotalProfit = () => {
    return items.reduce((totalProfit, item) => {
      const profitForItem = calculateProfit(item.quantity, item.price);
      return totalProfit + profitForItem;
    }, 0);
  };
  return (
    <>
      <HStack width="100%" spacing="none" paddingX="none" aria-label="dashboard-title">
        <Text fontSize='4xl' color="#40513B" fontWeight="bold">DASHBOARD</Text>
      </HStack>
      <VStack border={1} align="left" w="100%" aria-label="dashboard-content">
        <VStack bg="white" width="100%" aria-label="inventory-dashboard" border="1px" padding="10px" align="left">
            <Text textAlign="left" fontWeight="bold">
                INVENTORY
            </Text>
            <HStack spacing="20px">
                <Box bg="#9DC08B" border="1px" px="50px" py="20px" alignItems="center">
                    <Text textColor={'white'}>Total Products</Text>
                    <Heading textColor={'white'} textAlign={'center'}>{items.length}</Heading>
                </Box>
                <Box bg="#609966" border="1px" px="50px" py="20px" alignItems="center">
                    <Text textColor={'white'}>LOW STOCK PRODUCTS</Text>
                    <Heading textColor={'white'} textAlign={'center'}>{hasLowStockCount}</Heading>
                </Box>
                <Box bg="#40513B" border="1px" px="50px" py="20px" alignItems="center">
                    <Text textColor={'white'}>OUT OF STOCK PRODUCTS</Text>
                    <Heading textColor={'white'} textAlign={'center'}>{hasNoStockCount}</Heading>
                </Box>
            </HStack>
        </VStack>

        <VStack bg="white" width="100%" aria-label="sales-dashboard" border="1px" padding="10px" align="center">
            <Text textAlign="left" fontWeight="bold">
                SALES SUMMARY
            </Text>
            <HStack spacing="20px">
                <Box bg="#9DC08B" border="1px" px="50px" py="20px" alignItems="center">
                    <Text textColor={'white'}>Total Profit</Text>
                    <Heading textColor={'white'} textAlign={'center'}>P{calculateTotalProfit().toLocaleString("en-US")}</Heading>
                </Box>
            </HStack>
        </VStack>
      </VStack>
    </>
  );
}

export default Dashboard;
