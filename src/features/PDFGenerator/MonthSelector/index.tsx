import { ChangeEvent } from 'react';
import { MONTH } from '../../../utils/date';

type MonthSelectorProps = {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
};
const MonthSelector = ({ selectedMonth, setSelectedMonth }: MonthSelectorProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <label className="mr-8">Sélectionnez un mois :</label>
      <select
        className="rounded bg-blue-950 p-1"
        value={selectedMonth}
        onChange={handleChange}
      >
        <option value="">-</option>
        {Object.entries(MONTH).map(([monthNumber, monthName]) => (
          <option key={monthNumber} value={monthNumber}>
            {monthName}
          </option>
        ))}
      </select>
      {selectedMonth && (
        <p>
          Vous avez sélectionné le mois {MONTH[selectedMonth as keyof typeof MONTH]}
        </p>
      )}
    </div>
  );
};

export default MonthSelector;
