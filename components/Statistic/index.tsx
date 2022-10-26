import {
  Box,
  chakra,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { GoVersions } from "react-icons/go";
import useWindowSize from "../../utils/windowSize";
import IStatistic from "./Interface";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;

  return (
    <Stat
      minW={180}
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

function StatsCardMobile(props: StatsCardProps) {
  const { stat, icon } = props;
  return (
    <Box
      w="100px"
      h="60px"
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex w="100%">
        <Box w="55%" pt={4}>
          <Text align={"center"}>{stat}</Text>
        </Box>
        <Spacer />
        <Box pt={4} px={2}>
          {icon}
        </Box>
      </Flex>
    </Box>
  );
}

export default function BasicStatistics(props: IStatistic) {
  const size = useWindowSize();

  return (
    <>
      {size.width > 475 ? (
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"Hits"}
              stat={props?.hits?.toString() || ""}
              icon={<GoThumbsup size={"32px"} />}
            />
            <StatsCard
              title={"Misses"}
              stat={props?.misses?.toString() || ""}
              icon={<GoThumbsdown size={"32px"} />}
            />
            <StatsCard
              title={"Remaining"}
              stat={props?.remaining?.toString() || ""}
              icon={<GoVersions size={"32px"} />}
            />
          </SimpleGrid>
        </Box>
      ) : (
        <Box maxW="7xl" mx={"auto"} pt={1} px={{ base: 2, sm: 12, md: 17 }}>
          <HStack spacing="12px">
            <StatsCardMobile
              title={"Hits"}
              stat={props?.hits?.toString() || ""}
              icon={<GoThumbsup size={"24px"} />}
            />
            <StatsCardMobile
              title={"Misses"}
              stat={props?.misses?.toString() || ""}
              icon={<GoThumbsdown size={"24px"} />}
            />
            <StatsCardMobile
              title={"Remaining"}
              stat={props?.remaining?.toString() || ""}
              icon={<GoVersions size={"24px"} />}
            />
          </HStack>
        </Box>
      )}
    </>
  );
}
