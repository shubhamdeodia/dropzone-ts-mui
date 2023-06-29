import { Button, Grid } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  const isPdf = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');

  return (
    <Grid container alignItems="center" justifyContent="space-between" flexDirection="row" sx={{ marginTop: '20px' }}>
      <Grid item>
        {isPdf && <PictureAsPdfIcon />}
        {isImage && <ImageIcon />}
      </Grid>
      <Grid item>{file.name}</Grid>
      <Grid item>
        <Button
          size="small"
          onClick={(evt) => {
            evt.stopPropagation();
            onDelete(file);
          }}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
