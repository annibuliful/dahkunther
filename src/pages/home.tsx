import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { IPerson } from "../@types";
import { SelectedPersonCard } from "../components/common/SelectedPersonCard";
import { AddPersonForm } from "../components/form/addPerson";
import { ROUTES } from "../constants/routes";

const DEFAULT_VALUE: IPerson = {
  id: null,
  name: null,
  blameCount: 0,
};

const mockListPerson: IPerson[] = [
  {
    id: "1",
    name: "ประยวนหัวครุท",
    blameCount: 100,
    image:
      "https://static.thairath.co.th/media/dFQROr7oWzulq5FZWt5uOWxNqVgnUIRnnhFngXa2ttHqDnSclT4eKMvFn6UPjnX1dZU.jpg",
  },
  {
    id: "2",
    name: "อนุทน ทนมานานละ",
    blameCount: 100,
  },
  {
    id: "3",
    name: "ไม่รู้ๆ รู้อะไรบ้างมั๊ย",
    blameCount: 100,
  },
];

interface IListSelectPersonsProps {
  listPersons: IPerson[];
  onSelectPerson: (id: IPerson["id"]) => void;
  selectedPerson: IPerson;
}

const ListSelectPersons = ({
  onSelectPerson,
  listPersons,
  selectedPerson,
}: IListSelectPersonsProps) => {
  return (
    <SimpleGrid columns={[1, 3, 3]}>
      {listPersons.map((person) => {
        const isSelected = selectedPerson.id === person.id;
        return (
          <SelectedPersonCard
            key={person.id}
            onSelectBox={onSelectPerson}
            name={person.name as string}
            image={person.image}
            id={person.id as string}
            blameCount={person.blameCount}
            isSelected={isSelected}
          />
        );
      })}
    </SimpleGrid>
  );
};

export const HomePage = () => {
  const {
    onClose: handleCloseModal,
    onOpen: handleOpenModal,
    isOpen,
  } = useDisclosure();
  const [selectedPerson, setSelectedPerson] = useState<IPerson>(DEFAULT_VALUE);

  const onSelectPerson = (id: IPerson["id"]) => {
    // deselect person
    if (id === selectedPerson.id) {
      setSelectedPerson(DEFAULT_VALUE);
      return;
    }

    const selectedPersonInfo = mockListPerson.find(
      (person) => person.id === id
    );
    setSelectedPerson(selectedPersonInfo ?? DEFAULT_VALUE);
  };

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
      <ListSelectPersons
        listPersons={mockListPerson}
        onSelectPerson={onSelectPerson}
        selectedPerson={selectedPerson}
      />
    </Box>
  );
};
