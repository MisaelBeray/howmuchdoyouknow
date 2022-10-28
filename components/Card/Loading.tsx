import {
  Box,
  Flex,
  HStack,
  Skeleton,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const Loading = (windowSize: any) => {
  const size = windowSize.size;
  const color = useColorModeValue("white", "whiteAlpha.100");

  return (
    <Stack
      spacing={{ base: 8, md: 8 }}
      py={{ base: size.width > 475 ? 20 : 12, md: 36 }}
    >
      {size.width > 475 ? (
        <>
          <Box maxW="7xl" mx={"auto"} pt={24} px={{ base: 2, sm: 12, md: 17 }}>
            <HStack spacing="12px">
              <Skeleton
                w="100px"
                h="60px"
                shadow={"xl"}
                border={"1px solid"}
                borderColor={color}
                rounded={"lg"}
              />

              <Skeleton
                w="100px"
                h="60px"
                shadow={"xl"}
                border={"1px solid"}
                borderColor={color}
                rounded={"lg"}
              />

              <Skeleton
                w="100px"
                h="60px"
                shadow={"xl"}
                border={"1px solid"}
                borderColor={color}
                rounded={"lg"}
              />
            </HStack>
          </Box>
          <Flex align={"center"} justify={"center"}>
            <Box
              minW={"380px"}
              minH={"280px"}
              padding="6"
              boxShadow="lg"
              bg="white"
            >
              <Box px={20}>
                <Skeleton maxW={"180px"} height="180px" />
              </Box>
              <Spacer height={5} />
              <Skeleton height="20px" />
              <Spacer height={5} />
              <Box px={32}>
                <Skeleton height="20px" width={"60px"} />
              </Box>
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <Box maxW="7xl" mx={"auto"} pt={24} px={{ base: 2, sm: 12, md: 17 }}>
            <HStack spacing="12px">
              <Skeleton
                w="100px"
                h="60px"
                shadow={"xl"}
                border={"1px solid"}
                borderColor={color}
                rounded={"lg"}
              />

              <Skeleton
                w="100px"
                h="60px"
                shadow={"xl"}
                border={"1px solid"}
                borderColor={color}
                rounded={"lg"}
              />

              <Skeleton
                w="100px"
                h="60px"
                shadow={"xl"}
                border={"1px solid"}
                borderColor={color}
                rounded={"lg"}
              />
            </HStack>
          </Box>
          <Flex align={"center"} justify={"center"}>
            <Box
              maxW={"320px"}
              minH={"280px"}
              padding="6"
              boxShadow="lg"
              bg="white"
            >
              <Box px={12}>
                <Skeleton minW={"180px"} height="180px" />
              </Box>
              <Spacer height={5} />
              <Skeleton height="20px" />
              <Spacer height={5} />
              <Box px={32}>
                <Skeleton height="20px" width={"60px"} />
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </Stack>
  );
};

export default Loading;
