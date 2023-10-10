import { useEffect, useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import Spinner from "../../components/Spinner";
import styles from "./index.module.css";
import MonthSelector from "./MonthSelector";
import { Player } from "../../types/players";
import { getPlayers } from "../../db/players";
import { getSortedPlayersByFirstName } from "../../utils/players";

const PDFGenerator = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const getPlayersMap = async () => {
      try {
        const playersData = await getPlayers();
        if (!playersData) return;
        const sortedPlayers = getSortedPlayersByFirstName(playersData);
        setPlayers(sortedPlayers as Player[]);
      } catch (error) {
        alert(`Fetch players error with ${error}`);
      }
    };

    return () => {
      getPlayersMap();
    };
  }, []);

  if (!players || players.length === 0)
    return (
      <div className="centered-spinner">
        <Spinner />
      </div>
    );

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
                {loading ? "Chargement" : "Télécharger"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
};

export default PDFGenerator;
