import { Oval } from "react-loader-spinner";

type SpinnerProps = {
  color?: string;
  height?: number;
  width?: number;
};

const Spinner = ({
  color = "white",
  height = 80,
  width = 80,
}: SpinnerProps) => {
  return (
    <Oval
      color={color}
      height={height}
      width={width}
      ariaLabel="oval-loading"
    />
  );
};

export default Spinner;
