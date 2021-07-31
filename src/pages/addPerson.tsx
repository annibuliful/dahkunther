import { Box, Input, Avatar, Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { PersonData } from "../@types";
import { StoragePath } from "../constants";
import { useCreatePerson } from "../hooks/useCreatePerson";
import { useUploadFile } from "../hooks/useUploadFile";

export const AddPersonPage = () => {
  const [personData, setPersonData] = useState<PersonData>({
    name: "",
    image: "",
    blameCount: 0,
  });

  const { handleSetPreviewImages, handleUploadImage, previewImages } =
    useUploadFile({
      storagePath: StoragePath.PERSON,
    });
  const { handleCreateNewPerson } = useCreatePerson();

  const handleChangePersonData =
    (field: keyof PersonData) => (e: ChangeEvent<HTMLInputElement>) => {
      setPersonData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleChangePersonImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    handleSetPreviewImages(Array.from(e.target.files));
  };
  const handleClickCreateNewPerson = async () => {
    const personImage = (await handleUploadImage())?.[0] ?? null;
    await handleCreateNewPerson({ ...personData, image: personImage });
  };

  const personImagePreviewUrl = previewImages?.[0];

  return (
    <Box>
      {personImagePreviewUrl && (
        <Avatar
          name={personData.name as string}
          src={personImagePreviewUrl}
          my={4}
          display="block"
          mx="auto"
          size="lg"
        />
      )}
      <Input type="file" onChange={handleChangePersonImage} />
      <Input onChange={handleChangePersonData("name")} />
      <Button onClick={handleClickCreateNewPerson} display="block" mx="auto">
        Create new Person
      </Button>
    </Box>
  );
};
