import { Box, Input, Avatar, Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { PersonData } from "../../@types";
import { StoragePath } from "../../constants";
import { useCreatePerson } from "../../hooks/useCreatePerson";
import { useUploadImage } from "../../hooks/useUploadImage";
import { UploadInput } from "../common/uploadInput";

interface IAddPersonFormProps {
  onTakeActionAfterCreate: (data: PersonData) => void;
}

export const AddPersonForm = ({
  onTakeActionAfterCreate,
}: IAddPersonFormProps) => {
  const [personName, setPersonName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleSetPreviewImages, handleUploadImage, previewImages } =
    useUploadImage({
      storagePath: StoragePath.PERSON,
    });
  const { handleCreateNewPerson } = useCreatePerson();

  const handleChangePersonName = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonName(e.target.value);
  };

  const handleChangePersonImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    handleSetPreviewImages(Array.from(e.target.files));
  };
  const handleClickCreateNewPerson = async () => {
    setIsLoading(true);
    const personImage = (await handleUploadImage())?.[0] ?? null;
    const personData = {
      name: personName,
      image: personImage,
      blameCount: 0,
    };

    await handleCreateNewPerson(personData);
    setIsLoading(false);
    onTakeActionAfterCreate(personData);
  };

  const personImagePreviewUrl = previewImages?.[0];
  const isDisableCreateButton = personName.length < 1;

  return (
    <Box>
      <Avatar
        name={personName}
        src={personImagePreviewUrl}
        my={4}
        display="block"
        mx="auto"
        size="lg"
      />

      <UploadInput
        handleChangeUploadImage={handleChangePersonImage}
        icon={MdPhotoCamera}
      />
      <Input onChange={handleChangePersonName} mt={4} placeholder="name" />
      <Button
        isLoading={isLoading}
        onClick={handleClickCreateNewPerson}
        variant="primary"
        display="block"
        mx="auto"
        my={4}
        isDisabled={isDisableCreateButton}
      >
        Create
      </Button>
    </Box>
  );
};
