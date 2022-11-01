import {
  Stack,
  FormControl,
  Input,
  Button,
  Container,
  Flex,
  FormErrorMessage,
  useColorModeValue,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import useWindowSize from "../utils/windowSize";
import axios, { AxiosError } from "axios";
import Router from "next/router";
import { useToast } from "@chakra-ui/react";

const api_set_card = process.env.NEXT_PUBLIC_API_ADD_CARD;
const authorization_value = process.env.NEXT_PUBLIC_API_AUTHORIZATION_VALUE;

export default function CreateCard() {
  const size = useWindowSize();
  const color = useColorModeValue("white", "whiteAlpha.100");

  function validateOriginalWord(value: any) {
    let error;

    if(!value){
      error = "Blank field is not allowed"
    }

    return error;
  }

  function validateTranslateWord(value: any) {
    let error;

    if(!value){
      error = "Blank field is not allowed"
    }

    return error;
  }

  function validateImageReference(value: any) {
    let error;

    if(!value){
      error = "Blank field is not allowed"
    }
    
    return error;
  }

  const toast = useToast();

  return (
    <Stack
      spacing={{ base: 8, md: 14 }}
      py={{ base: size.width > 475 ? 20 : 12, md: 36 }}
    >
      <Flex align={"center"} justify={"center"}>
        <Container
          maxW={size.width > 475 ? "xl" : "xs"}
          bg={color}
          boxShadow={"xl"}
          rounded={"lg"}
          p={6}
        >
          <Formik
            initialValues={{
              original_word: "",
              translate_word: "",
              image_reference: "",
            }}
            onSubmit={async (values: any, actions: any) => {
              try {
                const result = await axios.post(
                  api_set_card || "",
                  {
                    image_reference: values.image_reference,
                    original_word: values.original_word,
                    translate_word: values.translate_word,
                  },
                  {
                    headers: {
                      "x-hasura-admin-secret": authorization_value,
                    },
                  }
                );
                toast({
                  title: "Card created successfully",
                  description: "Your card has been created successfully",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                Router.push("/");
              } catch (error: any) {
                if (error?.response?.data?.error.includes("duplicate")) {
                  toast({
                    title: "Oops! Something went wrong",
                    description: "This card already exists",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }
            }}
          >
            {(props: any) => (
              <Form>
                <Field name="original_word" validate={validateOriginalWord}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.original_word && form.touched.original_word
                      }
                    >
                      <Box py={2}>
                        <FormLabel>Original word</FormLabel>
                        <Input
                          {...field}
                          placeholder={"Word to be translated"}
                        />
                      </Box>

                      <FormErrorMessage>
                        {form.errors.original_word}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="translate_word" validate={validateTranslateWord}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.translate_word &&
                        form.touched.translate_word
                      }
                    >
                      <Box py={2}>
                        <FormLabel>Translated word</FormLabel>
                        <Input
                          {...field}
                          placeholder={"The translation of the word"}
                        />
                      </Box>
                      <FormErrorMessage>
                        {form.errors.translate_word}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="image_reference" validate={validateImageReference}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.image_reference &&
                        form.touched.image_reference
                      }
                    >
                      <Box py={2}>
                        <FormLabel>Image reference</FormLabel>
                        <Input {...field} placeholder={"Just copy a url"} />
                      </Box>

                      <FormErrorMessage>
                        {form.errors.image_reference}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex align={"right"} justify={"right"}>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Create
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Container>
      </Flex>
    </Stack>
  );
}
