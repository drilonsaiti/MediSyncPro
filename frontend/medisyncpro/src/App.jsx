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
import {Toaster} from "react-hot-toast";
import ClinicSettings from "./pages/ClinicSettings.jsx";
import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import {DarkModeProvider} from "./context/DarkModeContext.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Account from "./pages/Account.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import MyMedicalReport from "./pages/MyMedicalReport.jsx";
import MyAppointment from "./pages/MyAppointment.jsx";


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
                            <ProtectedRoute adminOnly={true} ownerOnly={true} receptionistOnly={true} doctorOnly={true}
                                            patientOnly={true}>
                                <AppLayout/>
                            </ProtectedRoute>
                        }>

                            <Route index element={<Navigate replace to={"/appointment"}/>}/>
                            <Route index path="appointment"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={false}><Appointment/></ProtectedRoute>}/>
                            <Route index path="appointmentUser"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={false}
                                                            doctorOnly={false}
                                                            patientOnly={true}><AppointmentsForUsers/></ProtectedRoute>}/>
                            <Route index path="myAppointment"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={false} receptionistOnly={false}
                                                            doctorOnly={false}
                                                            patientOnly={true}><MyAppointment/></ProtectedRoute>}/>

                            <Route path="clinics"
                                   element={<ProtectedRoute adminOnly={true} ownerOnly={true} receptionistOnly={false}
                                                            doctorOnly={false} patientOnly={false}><Clinic/>
                                   </ProtectedRoute>}/>

                            <Route path="clinics/:clinicId" element={<ClinicDetails/>}/>
                            <Route path="clinic-schedule"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={false}><ClinicSchedule/></ProtectedRoute>}/>
                            <Route path="clinicService"
                                   element={<ProtectedRoute ownerOnly={true} receptionistOnly={true} doctorOnly={true}
                                                            patientOnly={false}><ClinicServices/></ProtectedRoute>}/>
                            <Route path="doctors"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={false}><Doctor/></ProtectedRoute>}/>
                            <Route path="doctors/:doctorId" element={<DoctorDetails/>}/>
                            <Route path="medicalReports"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={false}><MedicalReport/></ProtectedRoute>}/>
                            <Route path="myMedicalReports"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={false} receptionistOnly={false}
                                                            doctorOnly={false}
                                                            patientOnly={true}><MyMedicalReport/></ProtectedRoute>}/>

                            <Route path="patient"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={false}><Patient/></ProtectedRoute>}/>
                            <Route path="receptionist"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={false}><Receptionist/></ProtectedRoute>}/>
                            <Route path="receptionist/:receptionistId" element={<ReceptionistDetails/>}/>
                            <Route path="specializations"
                                   element={<ProtectedRoute adminOnly={true} ownerOnly={false} receptionistOnly={false}
                                                            doctorOnly={false}
                                                            patientOnly={false}><Specializations/></ProtectedRoute>}/>
                            <Route path="patient/:patientId" element={<PatientDetails/>}/>
                            <Route path="settingsProfile"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={true}><Account/></ProtectedRoute>}/>
                            <Route path="settings"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={false}
                                                            patientOnly={false}><Settings/></ProtectedRoute>}/>

                            <Route path="clinicSettings"
                                   element={<ProtectedRoute adminOnly={false} ownerOnly={true} receptionistOnly={true}
                                                            doctorOnly={true}
                                                            patientOnly={false}><ClinicSettings/></ProtectedRoute>}/>
                            <Route path="profile" element={<Profile/>}/>
                        </Route>
                        <Route path="medicalReports/:reportId" element={<MedicalReportPDF/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="signup" element={<Signup/>}/>

                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
                <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}}
                         toastOptions={{
                             success: {
                                 duration: 3000
                             },
                             error: {
                                 duration: 5000
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
