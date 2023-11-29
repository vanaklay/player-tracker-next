import clsx from 'clsx';

type SubmitProps = {
  inputValue: string;
  size: 'small' | 'large';
};
const Submit = ({ inputValue, size }: SubmitProps): JSX.Element => (
  <input
    type="submit"
    value={inputValue}
    className={clsx(
      'mt-4 self-center rounded bg-primary p-2 text-primary-foreground shadow hover:bg-primary/90',
      {
        'w-1/2': size === 'small',
        'w-9/12': size === 'large',
      }
    )}
  />
);

export default Submit;
