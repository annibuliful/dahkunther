import { Box, Button, Divider } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/common/loadingSpinner";
import { PersonCard } from "../components/common/personCard";
import { Routes } from "../constants/routes";
import { useGetPersonDetail } from "../hooks/useGetPersonDetail";

export const PersonDetailPage = () => {
  const { personId } = useParams<{ personId: string }>();
  const router = useHistory();
  const { personInfo, isLoading } = useGetPersonDetail({ personId });

  const handleClickBack = () => {
    router.push(Routes.HOME);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box>
      <Button m={4} onClick={handleClickBack}>
        Back
      </Button>
      <PersonCard
        name={personInfo.name}
        image={personInfo.image}
        blameCount={personInfo.blameCount}
      />
      <Divider />
    </Box>
  );
};
