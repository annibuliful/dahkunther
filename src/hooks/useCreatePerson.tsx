import { useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useMemo } from "react";
import { PersonData } from "../@types";
import { firestorePersonCollection } from "../services";

export const useCreatePerson = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState();
  const handleCreateNewPerson = async (person: PersonData) => {
    setIsLoading(true);
    try {
      const personId = nanoid();
      await firestorePersonCollection
        .doc(personId)
        .set({ ...person, id: personId });

      toast({
        status: "success",
        description: "สร้างบุคคลในจินตนาการสำเร็จ",
      });
    } catch (e) {
      setError(e);
      console.error("[Create person] => ", e);
      toast({
        status: "error",
        description: "สร้างไม่ได้ง่ะ ลองใหม่นะ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return useMemo(
    () => ({ handleCreateNewPerson, isLoading, error }),
    [isLoading, error]
  );
};
