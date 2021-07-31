import { Box, Text, Avatar } from "@chakra-ui/react";
import React from "react";
import { IPerson, ISelectValue } from "../../@types";
import { BorderColor, TextColor } from "../../@types/style";

interface ISelectBoxProps extends IPerson {
  onSelectBox: (value: ISelectValue["value"]) => void;
  isSelected?: boolean;
}

export const SelectedPersonCard = ({
  isSelected = false,
  id,
  name,
  blameCount,
  image,
  onSelectBox,
}: ISelectBoxProps) => {
  const handleClickBox = () => {
    onSelectBox(id as string);
  };

  const borderColor: BorderColor = isSelected ? "blue.500" : "gray.300";
  const nameColor: TextColor = isSelected ? "black" : "gray.600";
  const blameCountColor: TextColor = isSelected ? "gray.500" : "gray.400";

  return (
    <Box
      cursor="pointer"
      p={2}
      m={4}
      borderRadius="10px"
      border="2px solid"
      borderColor={borderColor}
      onClick={handleClickBox}
    >
      <Avatar
        name={name as string}
        src={image}
        my={4}
        display="block"
        mx="auto"
        size="lg"
      />

      <Text fontWeight="bold" textAlign="center" color={nameColor}>
        {name}
      </Text>
      <Text color={blameCountColor} textAlign="center">
        {blameCount}
      </Text>
    </Box>
  );
};
