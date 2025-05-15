import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  ModalBody,
  Input,
  VStack,
  useDisclosure,
  Button,
  useColorModeValue,
  useToast,
  ModalFooter,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { createEntryState } from "../store/entry";

const EntryCard = ({ entry }) => {
  const [newEntry, setNewEntry] = React.useState(entry);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();

  const { deleteEntry, updateEntry, fetchEntries } = createEntryState(); // ✅ include fetchEntries

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleDeleteEntry = async (eid) => {
    const { success, message } = await deleteEntry(eid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  const handleUpdateEntry = async (eid, updatedEntry) => {
    const result = await updateEntry(eid, updatedEntry);
    if (result.success) {
      toast({
        title: "Updated",
        description: "Entry updated successfully",
        status: "success",
        isClosable: true,
      });
      await fetchEntries();
      onClose();
    } else {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setNewEntry(entry);
    }
  }, [isOpen, entry]);

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      p={4}
    >
      <Heading as="h3" size="md" mb={2} textAlign="center">
        {entry.title}
      </Heading>
      <Text fontWeight="normal" fontSize="md" color={textColor} mb={4}>
        {truncateText(entry.description, 100)}
      </Text>
      <HStack spacing={2}>
        <IconButton
          icon={<EditIcon />}
          onClick={onOpen}
          colorScheme="blue"
          aria-label="Edit"
        />
        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          aria-label="Delete"
          onClick={() => handleDeleteEntry(entry._id)}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                placeholder="Description"
                name="description"
                type="text"
                value={newEntry.description}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, description: e.target.value })
                }
              />
              <Input
                placeholder="Tags (comma-separated)"
                name="tags"
                value={newEntry.tags}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, tags: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              <Button
                colorScheme="blue"
                onClick={() => handleUpdateEntry(entry._id, newEntry)}
              >
                Edit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EntryCard;
