import React from 'react';
import {Document, Font, Image, Page, PDFViewer, StyleSheet, Text, View} from '@react-pdf/renderer';
import {useGetMedicalReportById} from "./useMedicalReport.js";
import Spinner from "../../ui/Spinner.jsx";
import {formatCurrency, formatDate} from "../../utils/helpers.js";

Font.register({
    family: 'Arial, sans-serif',

    fonts: [
        {src: 'http://localhost:5173/arial.ttf', fontWeight: 'normal'},
        {src: 'http://localhost:5173/arial_bold.ttf', fontWeight: 'bold'},
        // Add more font weights or styles as needed
    ],
});
// Define styles for PDF
const styles = StyleSheet.create({
    body: {
        family: 'Arial, sans-serif',

        margin: 0,
        padding: 0,
        width: '100%',
        height: '100lvh'
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
        marginTop: 30,
        marginBottom: 20,
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
    infoTitle: {
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
    tableText: {
        fontSize: 12
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
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    signature: {
        textAlign: 'right',
    },
});

const PdfRender = ({data}) => {
    return (

        <Document title={`MedicalReport_${data?.reportId}_${data?.patientName}.pdf`}>
            <Page size="A4" style={[styles.body, styles.container]}>

                <View style={styles.header}>
                    <Image style={styles.logo} src="http://localhost:5173/logo.png"/>
                    <Text style={styles.title}>Medical Report #{data.reportId}</Text>
                </View>

                <View style={styles.reportInfo}>
                    <View style={styles.info}>
                        <View>
                            <View style={styles.infoFlex}>
                                <Text style={styles.infoTitle}>
                                    Patient id:
                                </Text>
                                <Text style={styles.infoText}>
                                    {data.patientId}
                                </Text>
                            </View>
                            <View style={styles.infoFlex}>
                                <Text style={styles.infoTitle}>
                                    Patient Name:
                                </Text>
                                <Text style={styles.infoText}>
                                    {data.patientName}
                                </Text>
                            </View>
                            <View style={styles.infoFlex}>
                                <Text style={styles.infoTitle}>
                                    Patient email:
                                </Text>
                                <Text style={styles.infoText}>
                                    {data.patientEmail}
                                </Text>
                            </View>
                            <View style={styles.infoFlex}>
                                <Text style={styles.infoTitle}>
                                    Appointment date:
                                </Text>
                                <Text style={styles.infoText}>
                                    {formatDate(data.appointmentDate)}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.infoFlex}>
                                <Text style={styles.infoTitle}>
                                    Doctor name:
                                </Text>
                                <Text style={styles.infoText}>
                                    {data.doctorName}
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
                                    <Text style={[styles.infoText, {padding: 8}]}>Disease & Instructions:</Text>
                                    <Text style={[styles.tableText, styles.card]}>
                                        {data.disease}
                                    </Text>
                                </View>
                                <View style={[styles.tableRow, {gap: 50}]}>
                                    <Text style={[styles.infoText, {width: '35%', padding: 8}]}>Medicine Names &
                                        Quantity:</Text>
                                    <Text style={[styles.tableText, styles.card, {
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0
                                    }]}>
                                        {data.medicine}
                                    </Text>
                                </View>
                                <View style={[styles.tableRow, {gap: 15}]}>
                                    <Text style={[styles.infoText, {width: '30%', padding: 8}]}>Next Appointment
                                        Date</Text>
                                    <Text style={[styles.tableText]}>
                                        {formatDate(data.nextAppointment)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={[styles.tableRow, {
                            backgroundColor: '#f2f2f2',
                            justifyContent: 'space-between',
                            gap: 0
                        }]}>
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
                        {data.services.map(service => (
                            <View key={service.name}
                                  style={[styles.tableRow, {justifyContent: 'space-between', gap: 0, padding: 8}]}>


                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>{service.name}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>{service.duration}</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text style={styles.infoText}>{formatCurrency(service.price)}</Text>
                                </View>
                            </View>
                        ))}
                        <View
                            style={[styles.tableRow, {justifyContent: 'flex-end', gap: 0, padding: 8, rowGap: 2}]}>
                            <View style={styles.tableCell}>
                                <Text style={styles.infoText}>Total price: {formatCurrency(data.totalPrice)}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={[styles.infoText, {marginBottom: 30}]}>Report generated
                        on: {formatDate(data.reportDate)}</Text>

                    <View style={styles.footer}>
                        <Text style={styles.infoText}>Thank you for choosing our service.</Text>
                        <Text style={[styles.infoText, styles.signature]}>Signature</Text>
                    </View>
                </View>

            </Page>
        </Document>
    );
};

const PDFLink = () => {
    const {data, isLoading} = useGetMedicalReportById();

    if (isLoading) return <Spinner/>;

    return (
        <PDFViewer style={styles.body}>
            <PdfRender data={data}/>
        </PDFViewer>
    );
};

const PDFDownload = ({data}) => {
    return (
        <PdfRender data={data}/>
    );
};

// Define the MedicalReportPDF component
const MedicalReportPDF = ({data, isDownload}) => {
    return (
        !isDownload ? <PDFLink/> : <PDFDownload data={data}/>
    );
};
export default MedicalReportPDF;
