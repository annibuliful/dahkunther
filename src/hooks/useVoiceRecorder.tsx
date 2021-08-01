import { useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

const audioType = "audio/webm";
export const useVoiceRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [voiceChunks, setVoiceChunks] = useState<Blob[]>([]);
  const [audioFile, setAudioFile] = useState<File>();
  const [isRecording, setIsRecording] = useState(false);
  const [isSupportVoiceRecoreder, setIsSupportVoiceRecoreder] = useState(false);
  const toast = useToast();

  const handleRecordVoice = async () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!navigator.mediaDevices) {
      setIsSupportVoiceRecoreder(true);
      toast({
        status: "error",
        description: "media device not found",
      });
      return;
    }

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const _mediaRecord = new MediaRecorder(mediaStream, {
      mimeType: audioType,
    });
    setMediaRecorder(_mediaRecord);
    _mediaRecord.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        setVoiceChunks((prev) => [...prev, e.data]);
      }
    };
  };
  const saveAudio = useCallback(() => {
    const blob = new Blob(voiceChunks, { type: audioType });

    const _audioFile = new File([blob], `${nanoid()}.webm`, {
      type: audioType,
    });
    setAudioFile(_audioFile);
    return _audioFile;
  }, [voiceChunks]);

  const handleStart = useCallback(() => {
    if (!mediaRecorder) return;
    mediaRecorder.start(10);
    setIsRecording(true);
  }, [mediaRecorder]);

  const handleStop = useCallback(() => {
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    const _audioFile = saveAudio();
    setIsRecording(false);
    return _audioFile;
  }, [mediaRecorder, saveAudio]);

  useEffect(() => {
    handleRecordVoice();
  }, []);

  return useMemo(
    () => ({
      handleStart,
      handleStop,
      audioFile,
      isRecording,
      isSupportVoiceRecoreder,
    }),
    [audioFile, handleStart, handleStop, isRecording, isSupportVoiceRecoreder]
  );
};
