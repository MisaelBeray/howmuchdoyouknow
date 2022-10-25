import { FormEvent, ChangeEvent, useState, useEffect } from "react";
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
  FormLabel,
  FormErrorMessage,
  Box,
  Image,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
import ICard from "./Interface";
import { Field, Form, Formik } from "formik";

const api_get_all_cards = process.env.NEXT_PUBLIC_API_GET_ALL_CARDS;
const authorization_value = process.env.NEXT_PUBLIC_API_AUTHORIZATION_VALUE;

let cardGuess: ICard = {};

export default function Simple(windowSize: any) {
  const [numberCard, setNumberCard] = useState(0);
  const [cards, setCards] = useState<ICard[]>([]);
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"initial" | "success" | "error">(
    "initial"
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllWords = async () => {
      const { data: res } = await axios.get(api_get_all_cards ?? "", {
        headers: {
          "x-hasura-admin-secret": authorization_value,
        },
      });

      res?.words.map((item: ICard) => {
        cardGuess = {
          id: item?.id,
          image_reference: item?.image_reference,
          original_word: item?.original_word,
          region_language: item?.region_language,
          translate_word: item?.translate_word,
        };

        setCards((arr) => [...arr, cardGuess]);
      });
    };
    getAllWords();
  }, []);

  const handlerAnswer = (card: ICard, values: any) => {
    if (card?.translate_word?.toLowerCase() === values.name.toLowerCase()) {
      setState("success");
      setNumberCard(numberCard + 1);
    } else {
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
        <Text
          mt={2}
          textAlign={"center"}
          color={error ? "red.500" : "gray.500"}
        >
          Very good! 😉
        </Text>
      );
    } else if (state == "error") {
      return (
        <Text
          mt={2}
          textAlign={"center"}
          color={error ? "red.500" : "gray.500"}
        >
          Oops! good luck the next time. 😥
        </Text>
      );
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container
        maxW={windowSize.size.width > 375 ? "xl" : "xs"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
      >
        <Flex align={"center"} justify={"center"} mb={5}>
          <Box>
            <Image
              maxH={230}
              maxW={282}
              src={cards[numberCard]?.image_reference}
              alt={cards[numberCard]?.original_word}
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
            handlerAnswer(cards[numberCard], values);
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
                    <Input {...field} placeholder={"Your answer"} />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
  );
}
