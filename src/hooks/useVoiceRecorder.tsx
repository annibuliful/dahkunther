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
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [isRecording, setIsRecording] = useState(false);
  const [isSupportVoiceRecoreder, setIsSupportVoiceRecoreder] = useState(false);
  const toast = useToast();

  const handleRecordVoice = async () => {
    if (!navigator.mediaDevices) {
      setIsSupportVoiceRecoreder(true);
      toast({
        status: "error",
        description: "media device not found",
      });
      return;
    }

    const _mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setMediaStream(_mediaStream);
    const _mediaRecord = new MediaRecorder(_mediaStream, {
      mimeType: audioType,
    });
    setMediaRecorder(_mediaRecord);
    _mediaRecord.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        setVoiceChunks((prev) => [...prev, e.data]);
      }
    };
    return mediaStream;
  };

  const saveAudio = useCallback(() => {
    const blob = new Blob(voiceChunks, { type: audioType });

    const filename = `${nanoid()}.webm`;
    const _audioFile = new File([blob], filename, {
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

    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
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
