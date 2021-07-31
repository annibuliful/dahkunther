import { Box } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { IBlameMessage } from "../../@types";
import { StoragePath } from "../../constants";
import { useUploadImage } from "../../hooks/useUploadImage";
interface IAddBlameMessageFormProps {
  onTakeActionAfterCreate: (data: IBlameMessage) => void;
}

export const BlameMessageForm = ({}: IAddBlameMessageFormProps) => {
  const { handleSetPreviewImages, handleUploadImage } = useUploadImage({
    storagePath: StoragePath.BLAME_COMMENT,
  });

  const handleChangeBlameImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    handleSetPreviewImages(Array.from(e.target.files));
  };
  return <Box>sdfsfsfsdfsdf</Box>;
};
