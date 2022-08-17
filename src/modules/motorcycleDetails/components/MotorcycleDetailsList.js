import { Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import {
  StyledProperty,
  StyledPropertyValue,
} from './MotorcycleDetails.styled';

export default function MotorcycleDetailsList(props) {
  const { motorcycle } = props;

  const properties = [
    {
      label: 'Model',
      value: motorcycle.model,
    },
    {
      label: 'Location',
      value: motorcycle.location,
    },
    {
      label: 'Color',
      value: motorcycle.color,
    },
    {
      label: 'Model',
      value: motorcycle.model,
    },
    {
      label: 'Available from',
      value: motorcycle.availableFrom,
    },
    {
      label: 'Available to',
      value: motorcycle.availableTo,
    },
    {
      label: 'Rating',
      value: <Rating value={motorcycle.rating} disabled />,
    },
  ];

  return (
    <Stack spacing={3} alignItems='center' mt={5}>
      {properties.map((property) => (
        <StyledProperty key={property.label}>
          <Typography>{property.label}:</Typography>
          <StyledPropertyValue>{property.value}</StyledPropertyValue>
        </StyledProperty>
      ))}
    </Stack>
  );
}
