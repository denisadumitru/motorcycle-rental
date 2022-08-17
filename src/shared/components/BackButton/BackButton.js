import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton(props) {
  const { onClick } = props;

  return (
    <IconButton onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}
