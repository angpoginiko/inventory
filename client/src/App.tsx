import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import { Flex, VStack } from '@chakra-ui/react';
import Dashboard from './routes/dashboard';
import Pos from './routes/pos';
import Inventory from './routes/inventory';
import { useEffect, useRef, useState } from 'react';
import { Cart, Item, Status } from './constants';
import { socket } from './socket';

function App() {
  const [inventory, setInventory] = useState<Item[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const isMounted = useRef(true);

  const getStatus = (quantity: number): Status => {
    if (quantity <= 0) {
      return 'Out of stock';
    } else if (quantity <= 50) {
      return 'Limited Stock';
    } else {
      return 'In Stock';
    }
  };
  
  useEffect(() => {
    socket.connect();
    if (isMounted.current) {
      socket.on('cart', (newItem: Cart) => {
        setCart((prevCart) => {
          const itemIndex = prevCart.findIndex((item) => item.id === newItem.id);
          if (itemIndex !== -1) {
            const updatedCart = [...prevCart];
            updatedCart[itemIndex].quantity += newItem.quantity;
            return updatedCart;
          } else {
            return [...prevCart, newItem];
          }
        });
      });
    }
    

    socket.on('inventoryData', (i: Item[]) => {
      const updatedItems = i.map((item) => ({ ...item, status: getStatus(item.quantity) }));
      setInventory(updatedItems);
    });

    return () => {
      socket.disconnect();
      isMounted.current = false;
    };
  }, [isMounted]);
  return (
    <VStack spacing='none'>
      <Header/>
      <Flex width="100%" paddingX="none" aria-label="content">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard items={inventory}/>} />
            <Route path="pos" element={<Pos cart={cart} setCart={setCart}/>} />
            <Route path="inventory" element={<Inventory items={inventory} setInventory={setInventory}/>} />
          </Route>
        </Routes>
      </Flex>
    </VStack>
  );
}


function Layout() {
  return (
    <Flex w="100%" bg="#EDF1D6" minH="100%" alignContent={'left'} aria-label="layout">
      <VStack aria-label="layout-stack" p={10} w="100%">
        <Outlet />
      </VStack>
    </Flex>
  );
}

export default App;
