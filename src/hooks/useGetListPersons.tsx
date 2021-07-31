import { orderBy, uniqBy } from "lodash";
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
            setListPersons((prev) =>
              uniqBy([personData, ...prev], (person) => person.id)
            );
          }

          if (changeType === "modified") {
            const newPersonData = [...listPersons];
            const personIndex = newPersonData.findIndex(
              (person) => (person.id = personData.id)
            );
            newPersonData[personIndex] = personData;
            setListPersons(
              orderBy(newPersonData, (person) => person.blameCount, "desc")
            );
          }

          console.debug("[Subscribe Person collection] => ", {
            changeType,
            personData,
          });
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
