import { Box, Center, Input, Icon } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { IconType } from "react-icons";
import { MdPhotoCamera } from "react-icons/md";

interface IUploadInputProps {
  handleChangeUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: IconType;
  isMultiple?: boolean;
}
export const UploadInput = ({
  handleChangeUploadImage,
  icon,
  isMultiple = false,
}: IUploadInputProps) => {
  return (
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
            onChange={handleChangeUploadImage}
            id="upload"
            hidden
            multiple={isMultiple}
          />
          <Icon as={icon} w={8} h={8} />
        </Center>
      </label>
    </Box>
  );
};
