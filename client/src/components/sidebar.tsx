import {
    Box,
    Button,
    VStack,
    Icon,
    Text, 
    HStack
  } from '@chakra-ui/react'
import { IconType } from 'react-icons';
  import { HiClipboardList } from "react-icons/hi";
  import { MdOutlinePointOfSale } from "react-icons/md";
  import { VscDashboard } from "react-icons/vsc";
import { Link } from 'react-router-dom';

interface ISidebarNav{
  text: string;
  icon: IconType
  redirectLink: string;
}
  
const SidebarContent = () => (
  <VStack padding="none" aria-label="sidebar">
    <SidebarNav text="DASHBOARD" icon={VscDashboard} redirectLink='/'/>
    <SidebarNav text="POINT OF SALE" icon={MdOutlinePointOfSale} redirectLink='/pos'/>
    <SidebarNav text="INVENTORY" icon={HiClipboardList} redirectLink='/inventory'/>
  </VStack>
)

const SidebarNav: React.FC<ISidebarNav> = ({ text, icon, redirectLink }) => {
  return(
    <Button color="white" w="100%" variant='ghost' padding="none" justifyContent={'left'}>
    <Link to={redirectLink}>
      <HStack>
          <Box w="50%"><Icon as={icon} w={8} h={8}/></Box>
          <Text>{text}</Text>
      </HStack>
    </Link>
  </Button>
  )
}
  
const Sidebar = () => {
  return (
      <Box
      pt={5}
      w="20%"
      bg="#40513b"
      minH="90vh" 
    >
      <SidebarContent />
    </Box>
  )
}
  
  export default Sidebar