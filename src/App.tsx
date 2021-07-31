import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { IPerson } from "./@types";
import { SelectedPersonCard } from "./components/common/SelectedPersonCard";

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
            id={person.id as string}
            blameCount={person.blameCount}
            isSelected={isSelected}
          />
        );
      })}
    </SimpleGrid>
  );
};

const App = () => {
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
    <Box>
      <ListSelectPersons
        listPersons={mockListPerson}
        onSelectPerson={onSelectPerson}
        selectedPerson={selectedPerson}
      />
    </Box>
  );
};

export default App;
