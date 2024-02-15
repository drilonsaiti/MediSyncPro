import MedicalReportPDF from './MedicalReportPDF';
import {PDFDownloadLink} from "@react-pdf/renderer";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {FaFileDownload} from "react-icons/fa"; // Replace with the correct path

const DownloadButton = ({reportId, medicalReport}) => {
    /*  const downloadPDF = useCallback(async () => {


          const pdfBlob = await pdf(<MedicalReportPDF data={medicalReport}/>).toBlob();
          saveAs(pdfBlob, `MedicalReport_${reportId}.pdf`);
         /!* document.body.removeChild(a);
          window.URL.revokeObjectURL(url);*!/
      }, []);*/

    return (
        <PDFDownloadLink document={<MedicalReportPDF data={medicalReport} isDownload/>}
                         fileName={`MedicalReport_${medicalReport.reportId}_${medicalReport.patientName}.pdf`}>
            {({blob, url, loading, error}) =>
                loading ? <SpinnerMini/> : <FaFileDownload/>
            }
        </PDFDownloadLink>
    );
};

export default DownloadButton;