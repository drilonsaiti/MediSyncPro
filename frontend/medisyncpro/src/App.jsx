import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Appointment from "./pages/Appointment.jsx";
import Clinic from "./pages/Clinic.jsx";
import ClinicSchedule from "./pages/ClinicSchedule.jsx";
import ClinicServices from "./pages/ClinicServices.jsx";
import Doctor from "./pages/Doctor.jsx";
import MedicalReport from "./pages/MedicalReport.jsx";
import Patient from "./pages/Patient.jsx";
import Receptionist from "./pages/Receptionist.jsx";
import Specializations from "./pages/Specializations.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import PatientDetails from "./features/Patient/PatientDetails.jsx";
import MedicalReportPDF from "./features/MedicalReport/MedicalReportPDF.jsx";


const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: 0
        }

    }
});

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}/>
      <GlobalStyles/>

          <BrowserRouter>
              <Routes>
                  <Route element={<AppLayout/>}>

                      <Route index element={<Navigate replace to={"/appointment"}/>}/>
                  <Route index path="appointment" element={<Appointment/>} />
                  <Route path="clinics" element={<Clinic/>} />
                  <Route path="clinic-schedule" element={<ClinicSchedule/>} />
                  <Route path="clinicService" element={<ClinicServices/>} />
                  <Route path="doctors" element={<Doctor/>} />
                  <Route path="medicalReports" element={<MedicalReport/>} />
                  <Route path="patient" element={<Patient/>} />
                  <Route path="receptionist" element={<Receptionist/>} />
                  <Route path="specializations" element={<Specializations/>} />
                      <Route path="patient/:patientId" element={<PatientDetails />} />
                  </Route>
                  <Route path="medicalReports/:reportId" element={<MedicalReportPDF/>} />

                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
