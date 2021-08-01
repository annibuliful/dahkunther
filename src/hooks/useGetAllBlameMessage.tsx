import { uniqBy } from "lodash";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IBlameMessage } from "../@types";
import { firestoreBlameColletion } from "../services";

export const useGetAllBlameMessages = () => {
  const [listMessages, setListMessages] = useState<IBlameMessage[]>([]);

  const handleObserveBlameMessages = () => {
    const unsubscribe = firestoreBlameColletion.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        const messageData = docChange.doc.data() as IBlameMessage;
        const changeType = docChange.type;

        if (changeType === "added") {
          setListMessages((prev) => [messageData, ...prev]);
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
    const unsub = handleObserveBlameMessages();

    return () => {
      unsub();
    };
  }, []);

  return useMemo(() => ({ listMessages }), [listMessages]);
};
