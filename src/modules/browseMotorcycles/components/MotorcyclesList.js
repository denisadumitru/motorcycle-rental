import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  Stack,
  Rating,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function MotorcyclesList(props) {
  const { motorcycles = [], onRatingChange, onReserveClick } = props;

  return (
    <Grid container spacing={3}>
      {motorcycles.map((motorcycle) => (
        <Grid item xs={12} md={4} key={motorcycle.id}>
          <Card
            key={motorcycle.model}
            sx={{
              height: '100%',
              borderRadius: '12px',
              bgcolor: 'secondary.light',
              background:
                'linear-gradient(270deg, rgba(252,219,216,0.3) 0%, rgba(240,248,254,1) 100%);',
            }}
          >
            <CardContent>
              <Typography variant='h6' mb={2} fontWeight='bold'>
                {motorcycle.model}
              </Typography>
              <Typography my={2}>{motorcycle.color}</Typography>
              <Stack direction='row' spacing={1}>
                <LocationOnIcon />
                <Typography>{motorcycle.location}</Typography>
              </Stack>
              <Stack direction='row' spacing={1} mt={2}>
                <AccessTimeIcon />
                <Typography>
                  {motorcycle.availableFrom} - {motorcycle.availableTo}
                </Typography>
              </Stack>
              <Rating
                sx={{ mt: 2 }}
                value={motorcycle.rating}
                onChange={(evt, newValue) =>
                  onRatingChange(motorcycle.id, newValue)
                }
              />
            </CardContent>
            <CardActions sx={{ mb: 2 }}>
              {motorcycle.available ? (
                <Button onClick={() => onReserveClick(motorcycle)}>
                  Reserve
                </Button>
              ) : (
                <Typography p={1} color='error'>
                  Unavailable
                </Typography>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
