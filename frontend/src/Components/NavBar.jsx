import React from "react";
import { Container, HStack, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  Flex,
  Text,
  Button,
  PopoverHeader,
  PopoverBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import {
  PlusSquareIcon,
  MoonIcon,
  PopoverArrow,
  PopoverCloseButton,
  SunIcon,
} from "@chakra-ui/icons";
import { FaCircleUser } from "react-icons/fa6";
const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          bgGradient="linear(to-l,rgb(148, 77, 219),rgb(223, 107, 165))"
          bgClip="text"
          fontWeight="extrabold"
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to={"/"}>Blog</Link>
        </Text>

        <HStack>
          <Link to={"/create"}>
            <Button px={1}>
              <PlusSquareIcon boxSize={6} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} px={1}>
            {colorMode == "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Popover isLazy>
            <PopoverTrigger>
              <Button px={3}>
                <FaCircleUser fontSize={21} />
              </Button>
            </PopoverTrigger>
            <PopoverContent w={350}>
              <PopoverHeader fontWeight="semibold" fontSize={16}>
                Authentication Feature not available yet.
              </PopoverHeader>
              <PopoverCloseButton />
            </PopoverContent>
          </Popover>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
