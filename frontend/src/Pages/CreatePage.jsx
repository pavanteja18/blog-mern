import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { createEntryState } from "../store/entry";

const CreatePage = () => {
  const [newEntry, setNewEntry] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const { createEntry } = createEntryState();
  const toast = useToast();
  const handleAddEntry = async () => {
    const result = await createEntry(newEntry);
    console.log(result);
    if (!result.success) {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    }
    setNewEntry({ title: "", description: "", tags: "" });
  };
  return (
    <Container>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a New Entry
        </Heading>
        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Title"
              name="title"
              value={newEntry.title}
              onChange={(e) =>
                setNewEntry({ ...newEntry, title: e.target.value })
              }
            />
            <Input
              placeholder="Description."
              name="description"
              type="text"
              value={newEntry.description}
              onChange={(e) =>
                setNewEntry({ ...newEntry, description: e.target.value })
              }
            />
            <Input
              placeholder="Tags (comma-seperated)"
              name="tags"
              value={newEntry.tags}
              onChange={(e) =>
                setNewEntry({ ...newEntry, tags: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddEntry} w={"full"}>
              Add Entry
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
