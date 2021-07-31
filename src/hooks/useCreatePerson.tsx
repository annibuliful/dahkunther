import { useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useMemo } from "react";
import { PersonData } from "../@types";
import { firestorePersonCollection } from "../services";

export const useCreatePerson = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNewPerson = async (person: PersonData) => {
    setIsLoading(true);
    try {
      await firestorePersonCollection.add({ ...person, id: nanoid() });
      toast({
        status: "success",
        description: "create an imagine person completed",
      });
    } catch (e) {
      console.error("[Create person] => ", e);
      toast({
        status: "error",
        description: "create an imaging person failed, please try again ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return useMemo(() => ({ handleCreateNewPerson, isLoading }), [isLoading]);
};
