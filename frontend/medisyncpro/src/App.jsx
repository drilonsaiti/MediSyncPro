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
import DoctorDetails from "./features/Doctor/DoctorDetails.jsx";
import ReceptionistDetails from "./features/Receptionist/ReceptionistDetails.jsx";
import ClinicDetails from "./features/Clinic/ClinicDetails.jsx";
import AppointmentsForUsers from "./pages/AppointmentsForUsers.jsx";
import AccountDoctorSettings from "./features/Settings/AccountDoctorSettings.jsx";
import AccountReceptionistSettings from "./features/Settings/AccountReceptionistSettings.jsx";
import {Toaster} from "react-hot-toast";
import ClinicSettings from "./pages/ClinicSettings.jsx";
import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import {DarkModeProvider} from "./context/DarkModeContext.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0
        }

    }
});

function App() {

    return (
        <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>

            <GlobalStyles/>

            <BrowserRouter>
                <Routes>
                    <Route element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }>

                        <Route index element={<Navigate replace to={"/appointment"}/>}/>
                        <Route index path="appointment" element={<Appointment/>}/>
                        <Route index path="appointmentUser" element={<AppointmentsForUsers/>}/>
                        <Route path="clinics" element={<Clinic/>}/>
                        <Route path="clinics/:clinicId" element={<ClinicDetails/>}/>
                        <Route path="clinic-schedule" element={<ClinicSchedule/>}/>
                        <Route path="clinicService" element={<ClinicServices/>}/>
                        <Route path="doctors" element={<Doctor/>}/>
                        <Route path="doctors/:doctorId" element={<DoctorDetails/>}/>
                        <Route path="medicalReports" element={<MedicalReport/>}/>
                        <Route path="patient" element={<Patient/>}/>
                        <Route path="receptionist" element={<Receptionist/>}/>
                        <Route path="receptionist/:receptionistId" element={<ReceptionistDetails/>}/>
                        <Route path="specializations" element={<Specializations/>}/>
                        <Route path="patient/:patientId" element={<PatientDetails/>}/>
                        <Route path="clinicSettings" element={<ClinicSettings/>}/>
                    </Route>
                    <Route path="medicalReports/:reportId" element={<MedicalReportPDF/>}/>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />

                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}}
                     toastOptions={{
                         success: {
                             duration:3000
                         },
                         error:{
                             duration:5000
                         },
                         style: {
                             fontSize: '16px',
                             maxWidth: '500px',
                             padding: '16px 24px',
                             backgroundColor: "var(--color-grey-0)",
                             color: "var(--color-grey-700)"
                         }
                     }}/>
        </QueryClientProvider>
        </DarkModeProvider>
    )
}

export default App
