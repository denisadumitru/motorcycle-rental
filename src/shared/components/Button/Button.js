import { StyledFilledButton, StyledOutlinedButton } from './Button.styled';

export default function Button(props) {
  const { variant } = props;

  return variant === 'outlined' ? (
    <StyledOutlinedButton {...props} />
  ) : (
    <StyledFilledButton {...props} />
  );
}
