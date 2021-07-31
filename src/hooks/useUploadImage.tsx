import { useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { useState } from "react";
import { StoragePath } from "../constants";
import { storage } from "../services";
import { getExtFile } from "../utils";

interface IuseUploadImageOptions {
  storagePath: StoragePath;
}
export const useUploadImage = ({ storagePath }: IuseUploadImageOptions) => {
  const toast = useToast();
  const storageRef = storage().ref();
  const [error, setError] = useState();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [listImagesUrl, setListImagesUrl] = useState<string[]>([]);
  const [listFiles, setListFiles] = useState<File[]>([]);
  const [isLoading, setIsloading] = useState(false);

  const handleSetPreviewImages = (files: File[]) => {
    const listPreviewImagesUrl = files.map((file) => URL.createObjectURL(file));
    setListFiles(files);
    setPreviewImages(listPreviewImagesUrl);
  };

  const handleUploadImage = async () => {
    setIsloading(true);

    const listChildRefs: string[] = [];
    const listPublicImageUrl: string[] = [];
    try {
      const listUploadCall = listFiles.map((file) => {
        const filename = `${nanoid()}.${getExtFile(file.name)}`;
        const childRefPath = `/${storagePath}/${filename}`;
        listChildRefs.push(childRefPath);
        return storageRef.child(childRefPath).put(file);
      });

      await Promise.all(listUploadCall);
      const listGetUrlCall = listChildRefs.map((childPath) =>
        storageRef.child(childPath).getDownloadURL()
      );

      const listUrls: string[] = await Promise.all(listGetUrlCall);
      listPublicImageUrl.push(...listUrls);
      setListImagesUrl(listUrls);
      toast({
        status: "success",
        description: "upload file completed",
      });
    } catch (e) {
      setError(e);
      console.error("[Upload image] => ", e);
      toast({
        status: "error",
        description: "upload failed, please try again",
      });
    } finally {
      setIsloading(false);
    }

    return listPublicImageUrl;
  };

  return useMemo(
    () => ({
      handleUploadImage,
      handleSetPreviewImages,
      previewImages,
      listImagesUrl,
      isLoading,
      error,
    }),
    [error, previewImages, listImagesUrl, isLoading]
  );
};
