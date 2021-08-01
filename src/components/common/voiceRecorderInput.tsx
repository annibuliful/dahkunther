import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { Box, Button } from "@chakra-ui/react";

interface IVoiceRecrderInputProps {
  saveAudioFile: (audioFile: File) => void;
}

export const VoiceRecorderInput = ({
  saveAudioFile,
}: IVoiceRecrderInputProps) => {
  const { handleStart, handleStop, isSupportVoiceRecoreder, isRecording } =
    useVoiceRecorder();

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
        isDisabled={!isSupportVoiceRecoreder}
        variant="primary"
        onClick={handleToggleRecord}
      >
        {isRecording ? "Save" : "Record"}
      </Button>
    </Box>
  );
};
