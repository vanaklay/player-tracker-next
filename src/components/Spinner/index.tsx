import { Oval } from 'react-loader-spinner';

type SpinnerProps = {
  color?: string;
  height?: number;
  width?: number;
  secondaryColor?: string;
};

const Spinner = ({
  color = 'white',
  height = 80,
  width = 80,
  secondaryColor = '#2D4283',
}: SpinnerProps) => {
  return (
    <Oval
      color={color}
      secondaryColor={secondaryColor}
      height={height}
      width={width}
      ariaLabel="oval-loading"
    />
  );
};

export default Spinner;
