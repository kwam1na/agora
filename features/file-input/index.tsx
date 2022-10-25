import {
  Button,
  FileButton,
  Group,
  LoadingOverlay,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import styles from "./fileInput.module.scss";
import * as React from "react";
import InputContainer from "@/components/input-container";
import Image from "next/image";

const FileInput = () => {
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const resetRef = React.useRef<() => void>(null);

  const clearFiles = () => {
    setFiles(null);
    resetRef.current?.();
  };

  const handleUploadImage = (payload: File[]) => {
    setUploading(true);
    setFiles((prev) => (prev ? [...prev, ...payload] : [...payload]));

    setTimeout(() => setUploading(false), 800);
  };

  const handleRemoveImage = (index: number) => {
    setUploading(true);
    setFiles((prev) => prev?.filter((e, i) => i != index) || null);
    setTimeout(() => setUploading(false), 900);
  };
  return (
    <InputContainer>
      <div className={styles.content}>
        <div className={styles.title}>
          <Text>Media</Text>
        </div>
        <FileButton
          onChange={handleUploadImage}
          accept="image/png,image/jpeg,image/jpg"
          multiple
          resetRef={resetRef}
        >
          {(props) => (
            <div className={styles.actionButtons}>
              <div className={files ? styles.upload : styles.uploadFull}>
                <Button {...props} style={{ width: "100%" }} variant="subtle">
                  Upload images
                </Button>
              </div>

              {files && (
                <div className={styles.reset}>
                  <Button
                    color="gray"
                    variant="outline"
                    style={{ width: "100%" }}
                    onClick={clearFiles}
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          )}
        </FileButton>

        <div className={styles.images}>
          <LoadingOverlay visible={uploading} />
          {files?.map((file, index) => (
            <Tooltip label="Remove" key={index}>
              <div
                className={styles.image}
                onClick={() => handleRemoveImage(index)}
              >
                <Image
                  style={{ borderRadius: "8px" }}
                  src={URL.createObjectURL(file)}
                  alt="yup"
                  layout="responsive"
                  width={"160px"}
                  height={"160px"}
                  objectFit="cover"
                />
                <div className={styles.imageTitle}>
                  <Text color={"dimmed"}>{file.name}</Text>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </InputContainer>
  );
};

export default FileInput;
