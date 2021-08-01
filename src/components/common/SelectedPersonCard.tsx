import { Box, Text, Avatar, BoxProps } from "@chakra-ui/react";
import React from "react";
import { IPerson, ISelectValue } from "../../@types";
import { BorderColor, TextColor } from "../../@types/style";

interface ISelectBoxProps extends IPerson {
  onSelectBox: (value: ISelectValue["value"]) => void;
  isSelected?: boolean;
  ranking: number;
}

const LIMIT_SHOW_RANK = 3;
export const SelectedPersonCard = ({
  isSelected = false,
  id,
  name,
  blameCount,
  image,
  ranking,
  onSelectBox,
  ...boxStyle
}: ISelectBoxProps & BoxProps) => {
  const handleClickBox = () => {
    onSelectBox(id as string);
  };

  const borderColor: BorderColor = isSelected ? "blue.500" : "gray.300";
  const nameColor: TextColor = isSelected ? "black" : "gray.600";
  const blameCountColor: TextColor = isSelected ? "gray.500" : "gray.400";

  const isShowRank = ranking <= LIMIT_SHOW_RANK;
  return (
    <Box
      {...boxStyle}
      cursor="pointer"
      p={2}
      m={4}
      borderRadius="10px"
      border="2px solid"
      borderColor={borderColor}
      onClick={handleClickBox}
      position="relative"
    >
      {isShowRank && (
        <Box
          position="absolute"
          border="1px solid"
          right="20px"
          top="10px"
          borderRadius="50%"
          borderColor="gray.600"
          p={2}
        >
          {ranking}
        </Box>
      )}
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
