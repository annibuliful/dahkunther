import { useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { useState } from "react";
import { BlameMessageData } from "../@types";
import {
  firestore,
  firestoreBlameColletion,
  firestorePersonCollection,
} from "../services";

export const useCreateBlameMessage = () => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const handleCreateBlameMessage = async (blameData: BlameMessageData) => {
    setIsLoading(true);
    try {
      const blamessageId = nanoid();
      await firestoreBlameColletion
        .doc(blamessageId)
        .set({ id: blamessageId, ...blameData });
      const increment = firestore.FieldValue.increment(1);
      await firestorePersonCollection
        .doc(blameData.personId)
        .update({ blameCount: increment });
      toast({
        status: "success",
        description: "ส่งคำด่าสำเร็จ",
      });
    } catch (e) {
      setError(e);
      console.error("[Create blame message] => ", e);
      toast({
        status: "error",
        description: "Failed to create blame message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return useMemo(
    () => ({ isLoading, error, handleCreateBlameMessage }),
    [isLoading, error]
  );
};
