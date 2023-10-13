import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import Spinner from '../../components/Spinner';
import styles from './index.module.css';
import MonthSelector from './MonthSelector';
import { Player } from '../../types/players';
import { getSortedPlayersByFirstName } from '../../utils/players';
import { useFetchPlayersQuery } from '@/src/lib/query/queries';
import toast from 'react-hot-toast';

const PDFGenerator = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const { data, isLoading, isError } = useFetchPlayersQuery();

  if (isLoading)
    return (
      <div className="centered-spinner">
        <Spinner />
      </div>
    );

  if (isError) {
    toast.error('Pas de joueurs disponible');
    return;
  }

  const players = getSortedPlayersByFirstName(data as Player[]) as Player[];

  return (
    <>
      <h2>Pour télécharger un mois de présence ⬇️</h2>
      <MonthSelector
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {selectedMonth && (
        <div className={styles.section}>
          <PDFViewer>
            <PDFDocument data={players} month={selectedMonth} />
          </PDFViewer>
          <PDFDownloadLink
            document={<PDFDocument data={players} month={selectedMonth} />}
            fileName="example.pdf"
          >
            {({ loading }) => (
              <button className={styles.downloadButton}>
                {loading ? 'Chargement' : 'Télécharger'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
};

export default PDFGenerator;
