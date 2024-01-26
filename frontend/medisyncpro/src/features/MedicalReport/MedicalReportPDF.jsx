import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet,Image,Svg,Font } from '@react-pdf/renderer';
import Spinner from "../../ui/Spinner.jsx";
import {useGetMedicalReportById} from "./useMedicalReport.js";

Font.register({
    family: 'Arial'
})
// Define styles for PDF
const styles = StyleSheet.create({
    body:{
        fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
        width: '100%',
        height: '100vh'
    },
    container: {
        padding: 20,
        borderRadius: 5
    },
    header: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:30,
        marginBottom:20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        textAlign: 'center',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        gap: 100,
        marginBottom: 20
    },
    infoColumn: {
        width: '50%',
        padding: 10,
    },
    infoHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoFlex: {
        display: 'flex',
        flexDirection: "row",
        gap: 5
    },
    infoText: {
        fontSize: 14,
        fontWeight: ""
    },
    infoTitle:{
        fontSize: 14,

        fontWeight: "bold"
    },
    reportInfo: {
        marginBottom: 20,
    },
    table: {
        flexDirection: 'column',
        flexGrow: 1,
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 20
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        textAlign: 'left',
        gap: 75,
        width: '100%',

    },
    tableText:{
      fontSize:12
    },
    tableHeader: {
        padding: 8,
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        textAlign: 'left',
    },
    totalPriceRow: {
        textAlign: 'right',
    },
    card: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 10,
        width: '100%',
    },
    footer: {
        marginTop: 40,
        textAlign: 'center',
        display:"flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    signature: {
        textAlign: 'right',
    },
});

// Define the MedicalReportPDF component
const MedicalReportPDF = () => {
    const {data, isLoading} = useGetMedicalReportById();

    /*if (isLoading) return <Spinner/>*/

    return (
        <PDFViewer style={styles.body}>
            <Document >
                <Page size="A4" style={styles.container}>

                        <View style={styles.header}>
                            <Image style={styles.logo} src="http://localhost:5173/logo.png"/>
                            <Text style={styles.title}>Medical Report</Text>
                        </View>

                    <View style={styles.reportInfo}>
                        <View style={styles.info}>
                            <View>
                                <View style={styles.infoFlex}>
                                    <Text style={styles.infoTitle}>
                                        Patient id:
                                    </Text>
                                    <Text style={styles.infoText}>
                                       4
                                    </Text>
                                </View>
                                <View style={styles.infoFlex}>
                                    <Text style={styles.infoTitle}>
                                    Patient Name:
                                </Text>
                                    <Text style={styles.infoText}>
                                        Test
                                    </Text>
                                </View>
                                <View style={styles.infoFlex}>
                                    <Text style={styles.infoTitle}>
                                        Patient email:
                                    </Text>
                                    <Text style={styles.infoText}>
                                        test@test.com
                                    </Text>
                                </View>
                                <View style={styles.infoFlex}>
                                    <Text style={styles.infoTitle}>
                                        Appointment date:
                                    </Text>
                                    <Text style={styles.infoText}>
                                        26.01.2024
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.infoFlex}>
                                    <Text style={styles.infoTitle}>
                                        Doctor name:
                                    </Text>
                                    <Text style={styles.infoText}>
                                        Dr.Smith
                                    </Text>
                                </View>
                                <View style={styles.infoFlex}>
                                    <Text style={styles.infoTitle}>
                                        Doctor email:
                                    </Text>
                                    <Text style={styles.infoText}>
                                        doctor@test.com
                                    </Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.table}>
                            <View>
                                <View>
                                    <View style={styles.tableRow}>
                                        <Text style={[styles.infoText,{padding:8}]}>Disease & Instructions:</Text>
                                        <Text style={[styles.tableText,styles.card]}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum mattis nisl eget lacinia. Proin ut tristique leo. Sed sed urna auctor, dignissim lacus sit amet, accumsan elit. Nulla facilisi.
                                            Aliquam varius eros eu risus vehicula, in varius ipsum placerat.
                                        </Text>
                                    </View>
                                    <View style={[styles.tableRow,{gap:50}]}>
                                        <Text style={[styles.infoText,{width: '35%',padding: 8}]}>Medicine Names & Quantity:</Text>
                                        <Text style={[styles.tableText,styles.card,{borderTopLeftRadius:0,borderTopRightRadius:0}]}>
                                        Paracetamol (2x1)
                                        Iburofen (2x1)
                                        </Text>
                                    </View>
                                    <View style={[styles.tableRow,{gap:15}]}>
                                        <Text style={[styles.infoText,{width: '30%',padding: 8}]}>Next Appointment Date & Number of Rest Days:</Text>
                                        <Text style={[styles.tableText]}>
                                            2024-02-10 (7 days)
                                            </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.table}>
                            <View style={[styles.tableRow,{backgroundColor: '#f2f2f2',justifyContent: 'space-between',gap:0}]}>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.infoText}>Service Name</Text>
                                </View>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.infoText}>Duration (minutes)</Text>
                                </View>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.infoText}>Price</Text>
                                </View>
                            </View>

                            <View style={[styles.tableRow,{justifyContent: 'space-between',gap:0,padding: 8}]}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>Consultation</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>30</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>50$</Text>
                                </View>


                            </View>


                            <View style={[styles.tableRow,{justifyContent: 'space-between',gap:0,padding: 8}]}>
                                <View style={[styles.tableCell,{width: '16%}'}]}>
                                    <Text style={styles.infoText}>Consultation x ray</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>30</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>500$</Text>
                                </View>
                            </View>
                            <View style={[styles.tableRow,{justifyContent: 'flex-end'  ,gap:0,padding: 8,rowGap:2}]}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>Total price: 150$</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={[styles.infoText,{marginBottom: 30}]}>Report generated on: 26.01.2024</Text>

                        <View style={styles.footer}>
                            <Text style={styles.infoText}>Thank you for choosing our service.</Text>
                            <Text style={[styles.infoText,styles.signature]}>Signature</Text>
                        </View>
                    </View>

                </Page>
            </Document>
        </PDFViewer>
    );
}

export default MedicalReportPDF;
