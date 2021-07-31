import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { BlameMessageData } from "../../@types";
import { StoragePath } from "../../constants";
import { useCreateBlameMessage } from "../../hooks/useCreateBlameMessage";
import { useUploadImage } from "../../hooks/useUploadImage";
import { UploadInput } from "../common/uploadInput";
interface IAddBlameMessageFormProps {
  onTakeActionAfterCreate: (data: BlameMessageData) => void;
  personId: string;
}
export const BlameMessageForm = ({
  personId,
  onTakeActionAfterCreate,
}: IAddBlameMessageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSetPreviewImages, handleUploadImage } = useUploadImage({
    storagePath: StoragePath.BLAME_COMMENT,
  });

  const { handleCreateBlameMessage } = useCreateBlameMessage();
  const [message, setMessage] = useState("");
  const handleChangeBlameImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    handleSetPreviewImages(Array.from(e.target.files));
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClickCreate = async () => {
    setIsLoading(true);

    const listImagesUrl = await handleUploadImage();
    const blameMessageData: BlameMessageData = {
      message,
      personId,
      imagesUrl: listImagesUrl,
      voiceUrl: null,
    };

    await handleCreateBlameMessage(blameMessageData);

    setIsLoading(false);
    onTakeActionAfterCreate(blameMessageData);
  };

  const isDisableCreateButton = message.length < 1;

  return (
    <Box>
      <UploadInput
        handleChangeUploadImage={handleChangeBlameImages}
        icon={MdPhotoCamera}
      />
      <Input
        placeholder="message"
        onChange={handleChangeMessage}
        value={message}
        my={4}
      />

      <Button
        my={4}
        variant="primary"
        display="block"
        mx="auto"
        isLoading={isLoading}
        disabled={isDisableCreateButton}
        onClick={handleClickCreate}
      >
        Create
      </Button>
    </Box>
  );
};
