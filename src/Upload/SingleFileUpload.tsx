import { Grid, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { FileHeader } from './FileHeader';
import { uploadFile } from '../Utils/UploadFile';

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

export function SingleFileUpload({ file, onDelete, onUpload }: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const response = await uploadFile(file, setProgress);

      if (response) {
        onUpload(file, response.url);
      }
    }
    upload();
  }, [file, onUpload]);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

export default SingleFileUpload;
