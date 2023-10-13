export type Player = {
  lastName: string;
  firstName: string;
  daysAttendance: Record<string, boolean>;
  id: string;
};

export type TodayPlayer = Omit<Player, 'daysAttendance'> & {
  attendance: boolean;
};

export type UpdatedAttendancePlayer = Pick<TodayPlayer, 'attendance' | 'id'>;
