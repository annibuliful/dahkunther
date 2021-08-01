import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Divider,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { IPerson } from "../@types";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { MessageCard } from "../components/common/MessageCard";
import { SelectedPersonCard } from "../components/common/SelectedPersonCard";
import { AddPersonForm } from "../components/form/addPerson";
import { Routes } from "../constants/routes";
import { useGetAllBlameMessages } from "../hooks/useGetAllBlameMessage";
import { useGetListPersons } from "../hooks/useGetListPersons";

interface IListSelectPersonsProps {
  listPersons: IPerson[];
}

const ListSelectPersons = ({ listPersons }: IListSelectPersonsProps) => {
  const router = useHistory();

  return (
    <Flex justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
      {listPersons.map((person, index) => {
        return (
          <SelectedPersonCard
            ranking={index + 1}
            width={["100%", "25%"]}
            key={person.id}
            onSelectBox={() => router.push(`${Routes.PERSON}/${person.id}`)}
            name={person.name as string}
            image={person.image}
            id={person.id as string}
            blameCount={person.blameCount}
          />
        );
      })}
    </Flex>
  );
};

export const HomePage = () => {
  const {
    onClose: handleCloseModal,
    onOpen: handleOpenModal,
    isOpen,
  } = useDisclosure();

  const { listMessages } = useGetAllBlameMessages();
  const { listPersons, isLoading } = useGetListPersons();

  return (
    <Box mt={4}>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new person</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddPersonForm onTakeActionAfterCreate={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Text fontSize="5xl" textAlign="center" fontWeight="bold">
        ด่าอย่างสร้างสรรค์เพื่อสรรสร้างสิ่งใหม่ๆ
      </Text>
      <Button
        variant="primary"
        onClick={handleOpenModal}
        display="block"
        mx="auto"
      >
        สร้างคนในจินตนาการ
      </Button>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ListSelectPersons listPersons={listPersons} />
      )}
      <Divider />
      <Text my={6} textAlign="center" fontSize="3xl">
        คำด่า real time
      </Text>

      <Flex flexWrap="wrap">
        {listMessages.map((message) => (
          <MessageCard {...message} />
        ))}
      </Flex>
    </Box>
  );
};
