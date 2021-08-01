import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { MessageCard } from "../components/common/MessageCard";
import { PersonCard } from "../components/common/PersonCard";
import { BlameMessageForm } from "../components/form/addBlameMessage";
import { Routes } from "../constants/routes";
import { useGerListMessagesByPersonId } from "../hooks/useGetListMessagesByPersonId";
import { useGetPersonDetail } from "../hooks/useGetPersonDetail";

export const PersonDetailPage = () => {
  const {
    isOpen,
    onClose: handleCloseModal,
    onOpen: handleOpenModal,
  } = useDisclosure();
  const { personId } = useParams<{ personId: string }>();
  const router = useHistory();
  const { personInfo, isLoading } = useGetPersonDetail({ personId });
  const { listMessages, isLoading: isMessagesLoading } =
    useGerListMessagesByPersonId({ personId });
  console.log("listMessages", listMessages);
  const handleClickBack = () => {
    router.push(Routes.HOME);
  };

  if (isLoading || isMessagesLoading) return <LoadingSpinner />;

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new blame message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BlameMessageForm
              onTakeActionAfterCreate={handleCloseModal}
              personId={personId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button m={4} onClick={handleClickBack}>
        Back
      </Button>
      <PersonCard
        name={personInfo.name}
        image={personInfo.image}
        blameCount={personInfo.blameCount}
      />
      <Divider />
      <Button
        my={4}
        variant="primary"
        onClick={handleOpenModal}
        display="block"
        mx="auto"
      >
        Create new blame
      </Button>

      <Flex flexWrap="wrap">
        {listMessages.map((message) => (
          <MessageCard {...message} />
        ))}
      </Flex>
    </Box>
  );
};
