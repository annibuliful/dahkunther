import { Box, Input, Avatar, Button, Center, Icon } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { PersonData } from "../../@types";
import { StoragePath } from "../../constants";
import { useCreatePerson } from "../../hooks/useCreatePerson";
import { useUploadFile } from "../../hooks/useUploadFile";
import { MdPhotoCamera } from "react-icons/md";

interface IAddPersonFormProps {
  onTakeActionAfterCreate: (data: PersonData) => void;
}

export const AddPersonForm = ({
  onTakeActionAfterCreate,
}: IAddPersonFormProps) => {
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
    onTakeActionAfterCreate(personData);
  };

  const personImagePreviewUrl = previewImages?.[0];

  return (
    <Box>
      <Avatar
        name={personData.name as string}
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
      <Input
        onChange={handleChangePersonData("name")}
        mt={4}
        placeholder="name"
      />
      <Button
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
