import clsx from "clsx";
import { TodayPlayer, UpdatedAttendancePlayer } from "../../../types/players";

type PlayerItemProps = TodayPlayer & {
  handlePlayerChange: ({ id, attendance }: UpdatedAttendancePlayer) => void;
};
const PlayerItem = ({
  firstName,
  lastName,
  attendance,
  id,
  handlePlayerChange,
}: PlayerItemProps): JSX.Element => {
  const toggleAttendance = () => {
    handlePlayerChange({ id, attendance: !attendance });
  };
  return (
    <div
      className={clsx(
        "flex border border-white border-solid rounded space-x-2 p-2",
        {
          "border-green-500 bg-green-500 text-black": attendance,
        }
      )}
      onClick={toggleAttendance}
    >
      <p className="m-0 text-base">{firstName}</p>
      <p className="m-0 text-base">{lastName}</p>
    </div>
  );
};

export default PlayerItem;
