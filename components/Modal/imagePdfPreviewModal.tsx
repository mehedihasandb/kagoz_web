import React, { useEffect, useMemo, useState } from "react";
import { Image, Modal, Spin } from "antd";
import { getBaseUrl } from "@/helpers/config/envConfig";
interface imagPdfProps {
  isModal: boolean;
  setIsModal: any;
  selectedFile?: any;
  getPdfFile?: any;
  urlFileType?: any;
}

const ImagePdfPreviewModal = ({
  isModal,
  setIsModal,
  selectedFile,
  getPdfFile,
  urlFileType,
}: imagPdfProps) => {
  const baseUrl = getBaseUrl();
  const [isPdf, setIsPdf] = useState<boolean | null>(null);
  const [fullUrl, setFullUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const defaultFile = baseUrl + getPdfFile;

  const fileUrl = useMemo<any>(() => {
    if (!selectedFile && !getPdfFile) return null;

    if (selectedFile instanceof File) {
      return URL.createObjectURL(selectedFile);
    }
    if (typeof selectedFile === "string") {
      return selectedFile;
    }

    if (getPdfFile) {
      return baseUrl + getPdfFile;
    }

    return null;
  }, [selectedFile, getPdfFile, baseUrl]);

  const isImage = fileUrl?.match(/\.(jpeg|jpg|png|gif)$/i);
  console.log(isPdf, 'file')

  useEffect(() => {
    if (getPdfFile) {
      const completeUrl = `${baseUrl}${getPdfFile}`;
      setFullUrl(completeUrl);
    }
  }, [getPdfFile, baseUrl]);

  useEffect(() => {
    const checkFileType = async () => {
      if (!fullUrl) return;
      try {
        setLoading(true);
        const res = await fetch(fullUrl, { method: "GET" });
        const contentType = res.headers.get("content-type") || "";
        setIsPdf(contentType.includes("pdf"));
      } catch (error) {
        console.error("Failed to check file type:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isModal && fullUrl) checkFileType();
  }, [isModal, fullUrl]);

  return (
    <Modal
      title="File Viewer"
      open={isModal}
      onCancel={() => setIsModal(false)}
      footer={null}
      destroyOnClose
      style={{
        minWidth: isPdf ? "50%" : "40%",
        minHeight: isPdf ? "70%" : "60%",
      }}
    >
      {(selectedFile || defaultFile) && (
        <div
          className="file-embed-container w-full h-full flex items-center justify-center"
          style={{
            width: "100%",
            height: isPdf ? "100%" : "auto",
            overflow: isPdf ? "auto" : "hidden",
          }}
        >
          {isImage ? (
            <Image
              src={fileUrl}
              alt="Embedded file"
              className="max-w-full max-h-full object-contain"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              preview={false}
            />
          ) : loading ? (
            <div className="flex justify-center items-center h-96">
              <Spin size="large" />
            </div>
          ) : isPdf ? (
            <embed
              src={defaultFile}
              type={
                selectedFile instanceof File
                  ? selectedFile.type
                  : "application/pdf"
              }
              className="w-full h-full"
              style={{
                minWidth: isPdf ? "100%" : "auto",
                minHeight: isPdf ? "650px" : "550px",
              }}
            />
          ) : (
            <Image
              src={defaultFile}
              // type={"application/pdf"}
              alt="Image type"
              className="w-full h-full"
              style={{
                minWidth: defaultFile ? "100%" : "auto",
                minHeight: defaultFile ? "650px" : "550px",
              }}
              preview={false}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ImagePdfPreviewModal;
