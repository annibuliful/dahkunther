import { useToast } from "@chakra-ui/react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { IPerson } from "../@types";
import { Routes } from "../constants/routes";
import { firestorePersonCollection } from "../services";

interface IUserGetPersonDetailOptions {
  personId: string;
}

export const useGetPersonDetail = ({
  personId,
}: IUserGetPersonDetailOptions) => {
  const router = useHistory();
  const toast = useToast();
  const [personInfo, setPersonInfo] = useState<IPerson>({
    id: "",
    name: "",
    blameCount: 0,
    image: "",
  });

  const [isLoading, setIsLoadling] = useState(true);
  const [error, setError] = useState();
  const handleGetPersonDetail = async () => {
    try {
      const personInfo = (
        await firestorePersonCollection.doc(personId).get()
      ).data() as IPerson;
      if (!personInfo) {
        toast({
          status: "error",
          description: "Person not found",
        });
        router.push(Routes.HOME);
        return;
      }
      setPersonInfo(personInfo);
    } catch (e) {
      setError(e);
      console.error("[Get person detail] => ", e);
      toast({
        status: "error",
        description: "Somthing went wrong",
      });
    } finally {
      setIsLoadling(false);
    }
  };

  const handleObservePersonDetail = () => {
    const unsubscribe = firestorePersonCollection
      .where("id", "==", personId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((docChange) => {
          const personData = docChange.doc.data() as IPerson;
          const changeType = docChange.type;

          if (changeType === "modified") {
            setPersonInfo(personData);
          }

          console.debug("[Subscribe Person collection] => ", {
            changeType,
            personData,
          });
        });
      });
    return unsubscribe;
  };

  useEffect(() => {
    if (!personId) return;
    handleGetPersonDetail();
    const unsub = handleObservePersonDetail();
    return () => {
      unsub();
    };
  }, [personId]);
  return useMemo(
    () => ({ personInfo, isLoading, error }),
    [personInfo, isLoading, error]
  );
};
