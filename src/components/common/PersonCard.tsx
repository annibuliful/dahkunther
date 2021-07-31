import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { IPerson } from "../../@types";

type IProps = Omit<IPerson, "id">;

export const PersonCard = ({ image, name, blameCount }: IProps) => {
  return (
    <Flex alignItems="center" justifyContent="center" my={4}>
      <Box mx={16}>
        <Image
          borderRadius="50%"
          src={image as string}
          w={["150px", "250px"]}
          h={["150px", "250px"]}
          display="block"
          mx="auto"
        />
      </Box>

      <Box>
        <Text fontWeight="bold" fontSize="3xl">
          {name}
        </Text>
        <Text color="gray.500" fontSize="5xl">
          {blameCount}
        </Text>
      </Box>
    </Flex>
  );
};
