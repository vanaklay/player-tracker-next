type SubmitProps = {
  inputValue: string;
};
const Submit = ({ inputValue }: SubmitProps): JSX.Element => (
  <input type="submit" value={inputValue} />
);

export default Submit;
