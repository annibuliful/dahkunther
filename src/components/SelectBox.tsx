import { Box, BoxProps, Text } from "@chakra-ui/react";
import React from "react";
import { ISelectValue } from "../@types";

interface ISelectBoxProps extends ISelectValue {
  onSelectBox: (value: ISelectValue["value"]) => void;
  isSelected?: boolean;
}
type BorderColor = BoxProps["borderColor"];
export const SelectBox = ({
  isSelected = false,
  label,
  value,
  onSelectBox,
}: ISelectBoxProps) => {
  const handleClickBox = () => {
    onSelectBox(value);
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
        {label}
      </Text>
    </Box>
  );
};
