import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { IPerson } from "../@types";
import { firestorePersonCollection } from "../services";

export const useGetListPersons = () => {
  const [listPersons, setListPersons] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const handleGetListPersons = async () => {
    try {
      const listPersonsData: IPerson[] = [];
      const callFirestore = await firestorePersonCollection.get();

      callFirestore.forEach((personData) => {
        listPersonsData.push(personData.data() as IPerson);
      });
      setListPersons(listPersonsData);
    } catch (e) {
      console.error("[Get List Person Hook] => ", e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleObservePersonValuesChange = () => {
    const unsubscribe = firestorePersonCollection.onSnapshot(
      (querySnapshot) => {
        querySnapshot.docChanges().forEach((docChange) => {
          const personData = docChange.doc.data() as IPerson;
          const changeType = docChange.type;

          if (changeType === "added") {
            console.log("New city: ", personData);
            setListPersons((prev) => [...prev, personData]);
            return;
          }

          if (changeType === "modified") {
            console.log("Modified city: ", personData);
            const newPersonData = [...listPersons];
            const personIndex = newPersonData.findIndex(
              (person) => (person.id = personData.id)
            );
            newPersonData[personIndex] = personData;
            setListPersons(newPersonData);
          }
        });
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    handleGetListPersons();
    const unsub = handleObservePersonValuesChange();
    return () => {
      unsub();
    };
  }, []);

  return useMemo(
    () => ({ listPersons, isLoading, error }),
    [isLoading, listPersons, error]
  );
};
