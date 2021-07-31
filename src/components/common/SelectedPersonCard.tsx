import { Box, BoxProps, Text } from "@chakra-ui/react";
import React from "react";
import { IPerson, ISelectValue } from "../../@types";

interface ISelectBoxProps extends IPerson {
  onSelectBox: (value: ISelectValue["value"]) => void;
  isSelected?: boolean;
}
type BorderColor = BoxProps["borderColor"];
export const SelectedPersonCard = ({
  isSelected = false,
  id,
  name,
  blameCount,
  onSelectBox,
}: ISelectBoxProps) => {
  const handleClickBox = () => {
    onSelectBox(id as string);
  };

  const borderColor: BorderColor = isSelected ? "blue.500" : "gray.300";

  return (
    <Box
      cursor="pointer"
      p={4}
      m={4}
      borderRadius="10px"
      border="2px solid"
      borderColor={borderColor}
      onClick={handleClickBox}
    >
      <Text fontWeight="bold" textAlign="center">
        {name}
      </Text>
      <Text color="gray.400" textAlign="center">
        {blameCount}
      </Text>
    </Box>
  );
};
