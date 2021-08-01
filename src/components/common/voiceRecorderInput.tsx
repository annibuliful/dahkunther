import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { Box, Button, Icon } from "@chakra-ui/react";
import { MdSettingsVoice } from "react-icons/md";

interface IVoiceRecrderInputProps {
  saveAudioFile: (audioFile: File) => void;
}

export const VoiceRecorderInput = ({
  saveAudioFile,
}: IVoiceRecrderInputProps) => {
  const { handleStart, handleStop, isRecording } = useVoiceRecorder();

  const handleToggleRecord = () => {
    if (isRecording) {
      const audioFile = handleStop();
      saveAudioFile(audioFile as File);
      return;
    }

    handleStart();
  };

  return (
    <Box>
      <Button
        variant="primary"
        onClick={handleToggleRecord}
        leftIcon={<Icon as={MdSettingsVoice} />}
        display="block"
        mx="auto"
      >
        {isRecording ? "Save" : "Record"}
      </Button>
    </Box>
  );
};
