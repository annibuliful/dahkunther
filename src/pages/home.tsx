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
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { IPerson } from "../@types";
import { LoadingSpinner } from "../components/common/loadingSpinner";
import { SelectedPersonCard } from "../components/common/selectedPersonCard";
import { AddPersonForm } from "../components/form/addPerson";
import { Routes } from "../constants/routes";
import { useGetListPersons } from "../hooks/useGetListPersons";

interface IListSelectPersonsProps {
  listPersons: IPerson[];
}

const ListSelectPersons = ({ listPersons }: IListSelectPersonsProps) => {
  const router = useHistory();

  return (
    <Flex justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
      {listPersons.map((person) => {
        return (
          <SelectedPersonCard
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
      <Button
        variant="primary"
        onClick={handleOpenModal}
        display="block"
        mx="auto"
      >
        Create new person
      </Button>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ListSelectPersons listPersons={listPersons} />
      )}
    </Box>
  );
};
