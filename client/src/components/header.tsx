'use client'

import {
  Flex,
  Image
} from '@chakra-ui/react'
import logo from './logo.png';

const Header = () => {

  return (
      <Flex align={'left'} aria-label="logo" width="100%" maxH="20%">
        <Image src={logo} alt='logo' boxSize="15%"/>
      </Flex>
  )
}

export default Header;