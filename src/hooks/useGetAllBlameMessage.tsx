import { uniqBy } from "lodash";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IBlameMessage } from "../@types";
import { firestoreBlameColletion } from "../services";

const LIMIT_ITEM = 20;
export const useGetAllBlameMessages = () => {
  const [listMessages, setListMessages] = useState<IBlameMessage[]>([]);

  const handleObserveBlameMessages = () => {
    const unsubscribe = firestoreBlameColletion.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        const messageData = docChange.doc.data() as IBlameMessage;
        const changeType = docChange.type;

        if (changeType !== "added") return;

        setListMessages((prev) => [messageData, ...listMessages]);

        console.debug("[Subscribe Message collection] => ", {
          changeType,
          messageData,
        });
      });
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsub = handleObserveBlameMessages();

    return () => {
      unsub();
    };
  }, []);

  return useMemo(() => ({ listMessages }), [listMessages]);
};
