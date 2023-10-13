import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import Spinner from '../../components/Spinner';
import MonthSelector from './MonthSelector';
import { Player } from '../../types/players';
import { getSortedPlayersByFirstName } from '../../utils/players';
import { useFetchPlayersQuery } from '@/src/lib/query/queries';
import toast from 'react-hot-toast';
import { getYear } from '@/src/utils/date';

const PDFGenerator = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const { data, isLoading, isError } = useFetchPlayersQuery();

  if (isLoading)
    return (
      <div className="flex content-center items-center justify-center">
        <Spinner />
      </div>
    );

  if (isError) {
    toast.error('Pas de joueurs disponible');
    return;
  }

  const players = getSortedPlayersByFirstName(data as Player[]) as Player[];
  const year = getYear();

  return (
    <div className="flex flex-col items-center justify-start gap-y-4 px-2">
      <h2>Pour télécharger un mois de présence ⬇️</h2>
      <MonthSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {selectedMonth && (
        <div className="flex flex-col">
          <PDFViewer>
            <PDFDocument data={players} month={selectedMonth} />
          </PDFViewer>
          <PDFDownloadLink
            document={<PDFDocument data={players} month={selectedMonth} />}
            fileName={`${selectedMonth}_${year}.pdf`}
          >
            {({ loading }) => (
              <button className="my-8 rounded bg-blue-950 p-2">
                {loading ? 'Chargement' : 'Télécharger'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default PDFGenerator;
