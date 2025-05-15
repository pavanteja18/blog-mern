import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { createEntryState } from "../store/entry";
import EntryCard from "../Components/EntryCard";

const HomePage = () => {
  const { entries, fetchEntries } = createEntryState();

  useEffect(() => {
    const fetchData = async () => {
      if (fetchEntries) {
        await fetchEntries();
      }
    };
    fetchData();
  }, [fetchEntries]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack>
        <Text
          fontSize={{ base: "20", sm: "26" }}
          color={"white"}
          fontWeight="extrabold"
          textAlign={"center"}
        >
          Current Entries
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {entries
            ?.filter((entry) => entry && entry._id)
            .map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
        </SimpleGrid>

        {entries.length === 0 && (
          <Text
            fontSize="md"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No Entries found. 😣
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
                pl={2}
              >
                Create new Entry
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
