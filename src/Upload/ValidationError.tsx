import { Grid, LinearProgress } from '@mui/material';
import { FileError } from 'react-dropzone';
import { FileHeader } from './FileHeader';

interface ValidationErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}

export function ValidationError({ file, onDelete, errors }: ValidationErrorProps) {
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={100} color="error" />
      {errors.map((e) => (
        <span key={e.code}>{e.message}</span>
      ))}
    </Grid>
  );
}

export default ValidationError;
