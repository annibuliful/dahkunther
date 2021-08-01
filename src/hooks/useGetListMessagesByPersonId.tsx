import { useToast } from "@chakra-ui/react";
import { uniqBy } from "lodash";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { IBlameMessage } from "../@types";
import { firestoreBlameColletion } from "../services";

interface IOptions {
  personId: string;
}
export const useGerListMessagesByPersonId = ({ personId }: IOptions) => {
  const toast = useToast();
  const [error, setError] = useState("");
  const [isLoading, setIsLoding] = useState(true);
  const [listMessages, setListMessages] = useState<IBlameMessage[]>([]);

  const handleGetListMessages = async () => {
    try {
      const listMessagesInfo: IBlameMessage[] = [];
      const callFirestore = await firestoreBlameColletion
        .where("personId", "==", personId)
        .get();
      callFirestore.forEach((blameData) => {
        listMessagesInfo.push(blameData.data() as IBlameMessage);
      });

      setListMessages(listMessagesInfo);
    } catch (e) {
      console.error("[Get list messages by person id] => ", e);
      setError(e);
      toast({
        status: "error",
        description: "failed to load list messages",
      });
    } finally {
      setIsLoding(false);
    }
  };

  const handleObserveBlameDataValueChanges = () => {
    const unsubscribe = firestoreBlameColletion
      .where("personId", "==", personId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((docChange) => {
          const messageData = docChange.doc.data() as IBlameMessage;
          const changeType = docChange.type;

          if (changeType === "added") {
            setListMessages((prev) =>
              uniqBy([messageData, ...prev], (message) => message.id)
            );
          }

          console.debug("[Subscribe Message collection] => ", {
            changeType,
            messageData,
          });
        });
      });
    return unsubscribe;
  };
  useEffect(() => {
    if (!personId) return;

    handleGetListMessages();
    const unsub = handleObserveBlameDataValueChanges();

    return () => {
      unsub();
    };
  }, [personId]);
  return useMemo(
    () => ({ error, isLoading, listMessages }),
    [isLoading, error, listMessages]
  );
};
