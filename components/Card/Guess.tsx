import { useState, useEffect } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  FormErrorMessage,
  Box,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import ICard from "./Interface";
import IStatistic from "../Statistic/Interface";
import { Field, Form, Formik } from "formik";
import Statistic from "../Statistic";
import useWindowSize from "../../utils/windowSize";
import Loading from "./Loading";

const api_get_all_cards = process.env.NEXT_PUBLIC_API_GET_ALL_CARDS;
const authorization_value = process.env.NEXT_PUBLIC_API_AUTHORIZATION_VALUE;

let cardGuess: ICard = {};

export default function Simple() {
  const [numberCard, setNumberCard] = useState(0);
  const [cards, setCards] = useState<ICard[]>([]);
  const [statistic, setStatistic] = useState<IStatistic>({
    size: { width: 0, height: 0 },
    hits: 0,
    misses: 0,
    remaining: "",
  });
  const [state, setState] = useState<"initial" | "success" | "error">(
    "initial"
  );
  const [error, setError] = useState(false);
  const size = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageReady, setIsImageReady] = useState(false);

  useEffect(() => {
    const getAllWords = async () => {
      const { data: res } = await axios.get(api_get_all_cards ?? "", {
        headers: {
          "x-hasura-admin-secret": authorization_value,
        },
      });
      setIsLoading(false);
      res?.words
        .sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
        .map((item: ICard) => {
          cardGuess = {
            id: item?.id,
            image_reference: item?.image_reference,
            original_word: item?.original_word,
            region_language: item?.region_language,
            translate_word: item?.translate_word,
          };
          setStatistic({
            hits: 0,
            misses: 0,
            remaining: `1 / ${res?.words.length}`,
          });
          setCards((arr) => [...arr, cardGuess]);
        });
    };
    getAllWords();
  }, []);

  const handlerAnswer = (card: ICard, values: any, totalCards: number) => {
    let words = card?.translate_word?.split(",");

    if (words?.includes(values.name.toLowerCase().trim())) {
      setIsImageReady(false);
      setState("success");
      setNumberCard(numberCard + 1);

      if (!error) {
        setStatistic({
          ...statistic,
          hits: (statistic?.hits || 0) + 1,
          remaining: `${numberCard + 2} / ${totalCards}`,
        });
      }
      setError(false);
    } else {
      setError(true);
      setStatistic({
        ...statistic,
        misses: (statistic?.misses || 0) + 1,
        remaining: `${numberCard + 1} / ${totalCards}`,
      });
      setState("error");
    }
  };

  function validateName(value: any) {
    let error;

    return error;
  }

  const feedback = () => {
    if (state == "success") {
      return (
        <Text mt={2} textAlign={"center"} color={"green.500"}>
          Very good! 😉
        </Text>
      );
    } else if (state == "error") {
      return (
        <Text mt={2} textAlign={"center"} color={"red.500"}>
          Oops! good luck the next time. 😥
        </Text>
      );
    }
  };

  const inputWithFeedback = (field: any) => {
    switch (state) {
      case "error":
        return (
          <Input
            {...field}
            placeholder={"Your answer"}
            isInvalid
            focusBorderColor="red.500"
          />
        );
      case "success":
        return (
          <Input
            {...field}
            placeholder={"Your answer"}
            isInvalid
            focusBorderColor="#48BB78"
            errorBorderColor="#48BB78"
          />
        );

      default:
        return <Input {...field} placeholder={"Your answer"} />;
    }
  };

  const color = useColorModeValue("white", "whiteAlpha.100");

  return (
    <>
      {isLoading ? (
        <Loading size={size} />
      ) : (
        <Stack
          spacing={{ base: 8, md: 14 }}
          py={{ base: size.width > 475 ? 20 : 12, md: 36 }}
        >
          <Statistic {...statistic} />
          <Flex align={"center"} justify={"center"}>
            <Container
              maxW={size.width > 475 ? "xl" : "xs"}
              bg={color}
              boxShadow={"xl"}
              rounded={"lg"}
              p={6}
            >
              <Flex align={"center"} justify={"center"} mb={5}>
                <Box>
                  {!isImageReady && (
                    <Box px={12}>
                      <Skeleton minW={"280px"} height="180px" />
                    </Box>
                  )}
                  <Image
                    style={{ visibility: !isImageReady ? "hidden" : "visible" }}
                    maxH={230}
                    maxW={282}
                    src={cards[numberCard]?.image_reference}
                    alt={cards[numberCard]?.original_word}
                    onLoad={(e: any) => {
                      setIsImageReady(true);
                    }}
                  />
                </Box>
              </Flex>

              <Heading
                as={"h2"}
                fontSize={{ base: "xl", sm: "2xl" }}
                textAlign={"center"}
                mb={5}
              >
                {cards[numberCard]?.original_word}
              </Heading>

              <Formik
                initialValues={{ name: "" }}
                onSubmit={(values, actions) => {
                  handlerAnswer(cards[numberCard], values, cards.length);
                  setTimeout(() => {
                    setState("initial");
                    actions.setSubmitting(false);
                    actions.resetForm({ values: { name: "" } });
                  }, 2000);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="name" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          {inputWithFeedback(field)}
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Flex align={"center"} justify={"center"}>
                      <Button
                        mt={4}
                        colorScheme="teal"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Send
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
              {feedback()}
            </Container>
          </Flex>
        </Stack>
      )}
    </>
  );
}
