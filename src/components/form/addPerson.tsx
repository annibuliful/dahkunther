import { Box, Input, Avatar, Button, Center, Icon } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { PersonData } from "../../@types";
import { StoragePath } from "../../constants";
import { useCreatePerson } from "../../hooks/useCreatePerson";
import { useUploadImage } from "../../hooks/useUploadImage";
import { MdPhotoCamera } from "react-icons/md";

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

      <Box my={4}>
        <label htmlFor="upload" style={{ cursor: "pointer" }}>
          <Center
            width="100%"
            style={{
              padding: "10px",
              width: "100%",
              color: "#113476",
              cursor: "pointer",
            }}
          >
            <Input
              type="file"
              onChange={handleChangePersonImage}
              id="upload"
              hidden
            />
            <Icon as={MdPhotoCamera} w={8} h={8} />
          </Center>
        </label>
      </Box>
      <Input onChange={handleChangePersonName} mt={4} placeholder="name" />
      <Button
        isLoading={isLoading}
        onClick={handleClickCreateNewPerson}
        variant="primary"
        display="block"
        mx="auto"
        my={4}
      >
        Create
      </Button>
    </Box>
  );
};
