import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { IBlameMessage } from "../../@types";

type IProps = IBlameMessage;

interface IListImagesProps {
  listImages: string[];
}

const ListImages = ({ listImages }: IListImagesProps) => {
  if (!listImages) return null;

  return (
    <Flex flexWrap="wrap">
      {listImages.map((image) => (
        <Image w="100px" h="100px" src={image} mx={4} my={4} />
      ))}
    </Flex>
  );
};

export const MessageCard = ({ imagesUrl, message, voiceUrl }: IProps) => {
  return (
    <Box
      w={["100%", "30%"]}
      border="2px solid"
      borderColor="gray.400"
      mx={4}
      my={4}
      borderRadius="10px"
    >
      <ListImages listImages={imagesUrl} />
      {voiceUrl && (
        <Box mx="auto">
          <audio controls>
            <source src={voiceUrl} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
      <Text textAlign="center" fontSize="4xl">
        {message}
      </Text>
    </Box>
  );
};
