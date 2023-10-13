import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { Player } from '../../../types/players';
import { MONTH, generateDate, getDate, getDatesByMonth } from '../../../utils/date';

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    width: 'auto',
    borderCollapse: 'collapse',
    marginBottom: 10,
  },
  tableRow: {
    marginLeft: '10px',
    flexDirection: 'row',
  },
  tableCell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    width: '45px',
    alignSelf: 'center',
    fontSize: '8px',
  },
  playerTableCell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    width: '120px',
    fontSize: '8px',
  },
  present: {
    color: 'green',
  },
  notPresent: {
    color: 'red',
  },
  center: {
    alignSelf: 'center',
  },
});

type AttendanceTableProps = {
  data: Player[];
  month: string;
};
const AttendanceTable = ({ data, month }: AttendanceTableProps) => {
  const dates = getDate(data);

  const filteredDates = getDatesByMonth(dates, month);

  const total = filteredDates.map((date) => {
    return data.reduce((acc, player) => {
      if (player.daysAttendance[date]) {
        return acc + 1;
      }
      return acc;
    }, 0);
  });

  return (
    <>
      <View style={styles.header}>
        <Text>
          Présence des joueurs au mois : {MONTH[month as keyof typeof MONTH]}
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.playerTableCell}>
            <Text>Joueurs</Text>
          </View>
          {filteredDates.map((date) => (
            <View key={date} style={styles.tableCell}>
              <Text style={styles.center}>{generateDate(date)}</Text>
            </View>
          ))}
        </View>
        {data.map((player) => (
          <View key={player.id} style={styles.tableRow}>
            <View style={styles.playerTableCell}>
              <Text>
                {player.firstName} {player.lastName}
              </Text>
            </View>
            {filteredDates.map((date) => (
              <View key={date} style={styles.tableCell}>
                {player.daysAttendance[date] ? (
                  <Text style={[styles.present, styles.center]}>Oui</Text>
                ) : (
                  <Text style={[styles.notPresent, styles.center]}>Non</Text>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={styles.tableRow}>
          <View style={styles.playerTableCell}>
            <Text>Totaux</Text>
          </View>
          {total.map((number) => (
            <View key={`${Date.now() + Math.random()}`} style={styles.tableCell}>
              <Text style={styles.center}>{number}</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default AttendanceTable;
