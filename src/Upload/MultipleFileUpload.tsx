import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { Button, Grid, Typography, styled } from '@mui/material';
import Image from 'next/image';
import uploadIcon from '../../public/feather_upload-cloud.svg';
import { SingleFileUpload } from './SingleFileUpload';
import { ValidationError } from './ValidationError';

interface UploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

const DropzoneContainer = styled('div')(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  gap: '24px',
  borderRadius: theme.spacing(1),
  border: '1px dashed rgba(0, 0, 0, 0.25)',
  padding: '16px 24px 16px 32px',
}));

function MultipleFileUpload({ name }: { name: string }) {
  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const mappedAccepted = acceptedFiles.map((file) => ({ file, errors: [] }));

    setFiles((curr) => [...curr, ...mappedAccepted, ...fileRejections]);
  }, []);

  const onDelete = useCallback((file: File) => {
    setFiles((curr) => curr.filter((f) => f.file !== file));
  }, []);

  const onUpload = useCallback((file: File, url: string) => {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024,
    accept: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <DropzoneContainer>
        <Image src={uploadIcon} alt="Picture of the author" />
        {isDragActive ? (
          <Typography variant="body1" component="p">
            Drop the files here ...
          </Typography>
        ) : (
          <div>
            <Typography variant="body1" component="p">
              Select a file or drag and drop here
            </Typography>

            <Typography variant="caption" component="p">
              JPG, PNG or PDF, file size no more than 10MB
            </Typography>
          </div>
        )}
        <Button size="large" variant="outlined">
          Select File
        </Button>
      </DropzoneContainer>
      <Grid container flexDirection="column" sx={{ marginTop: '10px' }}>
        {files.length > 0 && (
          <Typography variant="h6" component="p">
            File Added
          </Typography>
        )}
        {files.map((fileWrapper) => {
          return fileWrapper.errors.length > 0 ? (
            <ValidationError
              file={fileWrapper.file}
              onDelete={onDelete}
              key={fileWrapper.file.name}
              errors={fileWrapper.errors}
            />
          ) : (
            <SingleFileUpload
              onUpload={onUpload}
              onDelete={onDelete}
              key={fileWrapper.file.name}
              file={fileWrapper.file}
            />
          );
        })}
      </Grid>
    </div>
  );
}

export default MultipleFileUpload;
