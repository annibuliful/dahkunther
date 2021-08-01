import { Avatar, Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { BlameMessageData } from "../../@types";
import { StoragePath } from "../../constants";
import { useCreateBlameMessage } from "../../hooks/useCreateBlameMessage";
import { useUploadImage } from "../../hooks/useUploadImage";
import { UploadInput } from "../common/uploadInput";
import { VoiceRecorderInput } from "../common/voiceRecorderInput";
interface IAddBlameMessageFormProps {
  onTakeActionAfterCreate: (data: BlameMessageData) => void;
  personId: string;
}
export const BlameMessageForm = ({
  personId,
  onTakeActionAfterCreate,
}: IAddBlameMessageFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSetPreviewImages, handleUploadImage, previewImages } =
    useUploadImage({
      storagePath: StoragePath.BLAME_COMMENT,
    });

  const {
    handleSetPreviewImages: handleSetPreviewAudio,
    handleUploadImage: handleUploadAudioFile,
  } = useUploadImage({
    storagePath: StoragePath.BLAME_COMMENT,
  });
  const { handleCreateBlameMessage } = useCreateBlameMessage();
  const [message, setMessage] = useState("");
  const handleChangeBlameImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    handleSetPreviewImages(Array.from(e.target.files));
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSaveAudioFile = (file: File) => {
    handleSetPreviewAudio([file]);
  };

  const handleClickCreate = async () => {
    setIsLoading(true);

    const listImagesUrl = await handleUploadImage();
    const audiFileUrl = (await handleUploadAudioFile())?.[0];
    const blameMessageData: BlameMessageData = {
      message,
      personId,
      imagesUrl: listImagesUrl,
      voiceUrl: audiFileUrl ? audiFileUrl : null,
    };

    await handleCreateBlameMessage(blameMessageData);

    setIsLoading(false);
    onTakeActionAfterCreate(blameMessageData);
  };

  const isDisableCreateButton = message.length < 1;

  return (
    <Box>
      <Flex flexWrap="wrap">
        {previewImages.map((image, index) => {
          return (
            <Avatar
              key={index.toString()}
              mx={4}
              w={["50%", "20%"]}
              name={message}
              src={image}
              my={4}
              size="lg"
            />
          );
        })}
      </Flex>

      <UploadInput
        handleChangeUploadImage={handleChangeBlameImages}
        icon={MdPhotoCamera}
        isMultiple={true}
      />

      <VoiceRecorderInput saveAudioFile={handleSaveAudioFile} />
      <Textarea
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
