import clsx from "clsx";

type SubmitProps = {
  inputValue: string;
  size: "small" | "large";
};
const Submit = ({ inputValue, size }: SubmitProps): JSX.Element => (
  <input
    type="submit"
    value={inputValue}
    className={clsx("border rounded mt-4 p-2 self-center bg-slate-900", {
      "w-1/2": size === "small",
      "w-9/12": size === "large",
    })}
  />
);

export default Submit;
