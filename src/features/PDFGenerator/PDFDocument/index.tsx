import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Player } from "../../../types/players";
import AttendanceTable from "../AttendanceTable";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  subTitle: {
    fontSize: "2rem",
    lineHeight: "1.1",
  },
  title: {
    fontSize: "30px",
  },
  heading: {
    flexDirection: "column",
    textAlign: "center",
    marginBottom: "16px",
    marginTop: "16px",
  },
  section: {
    flexDirection: "column",
  },
});

type PDFDocumentProps = {
  data: Player[];
  month: string;
};
const PDFDocument = ({ data, month }: PDFDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.heading]}>
          <Text style={styles.title}>CS Ternes U-18</Text>
          <Text style={styles.subTitle}>Présence des joueurs</Text>
        </View>
        <AttendanceTable data={data} month={month} />
      </Page>
    </Document>
  );
};

export default PDFDocument;
