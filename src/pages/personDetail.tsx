import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { useGetPersonDetail } from "../hooks/useGetPersonDetail";

export const PersonDetailPage = () => {
  const { personId } = useParams<{ personId: string }>();

  const { personInfo, isLoading } = useGetPersonDetail({ personId });

  if (isLoading) return <LoadingSpinner />;

  return <Box>Person Detail Page</Box>;
};
