import styled, {css} from "styled-components";

import {FaCalendarDays, FaGear, FaHouseMedical, FaUser, FaUserDoctor, FaUserPen} from "react-icons/fa6";
import {NavLink} from "react-router-dom";
import {FaAtom, FaCalendarCheck, FaClipboardList, FaHospitalUser} from "react-icons/fa";
import {Roles} from "../utils/services.js";
import {TbCalendarUser} from "react-icons/tb";
import {HiOutlineCog6Tooth} from "react-icons/hi2";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    ${(props) =>
    props.user &&
    css`
        flex-direction: row;
        
      `}
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    /* This works because react-router places the active class on the active NavLink */

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-1000);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

function MainNav() {

    const role = Roles();
    const ROLE_OWNER_DOCTOR_RECP = role?.includes("OWNER") || role?.includes("DOCTOR") || role?.includes("RECEPTIONIST");
    const ROLE_ADMIN = role.includes("ADMIN");
    let nav;


    if (ROLE_OWNER_DOCTOR_RECP) {
        nav = (
            <>
                <li>
                    <StyledNavLink to="/appointment">
                        <FaCalendarCheck/>
                        <span>Appointment</span>
                    </StyledNavLink>
                </li>


                <li>
                    <StyledNavLink to="/clinic-schedule">
                        <FaCalendarDays/>
                        <span>Schedule</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/doctors">
                        <FaUserDoctor/>
                        <span>Doctors</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/medicalReports">
                        <FaClipboardList/>
                        <span>Medical reports</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/patient">
                        <FaHospitalUser/>
                        <span>Patient</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/receptionist">
                        <FaUserPen/>
                        <span>Receptionist</span>
                    </StyledNavLink>
                </li>


                <li>
                    <StyledNavLink to="/profile">
                        <FaUser/>
                        <span>Profile</span>
                    </StyledNavLink>
                </li>
                {role.includes("OWNER") &&
                    <li>
                        <StyledNavLink to="/clinicSettings">
                            <HiOutlineCog6Tooth/>
                            <span>Settings</span>
                        </StyledNavLink>
                    </li>
                }
                {role.includes("RECEPTIONIST") &&
                    <li>
                        <StyledNavLink to="/settings">
                            <HiOutlineCog6Tooth/>
                            <span>Settings of Clinic</span>
                        </StyledNavLink>
                    </li>

                }
                <li>
                    <StyledNavLink to="/settingsProfile">
                        <HiOutlineCog6Tooth/>
                        <span>Settings profile</span>
                    </StyledNavLink>
                </li>
            </>
        )
    }

    if (!ROLE_OWNER_DOCTOR_RECP) {
        nav = (
            <>
                <li>
                    <StyledNavLink to="/appointmentUser">
                        <FaCalendarCheck/>
                        <span>Appointments</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/myAppointment">
                        <TbCalendarUser/>
                        <span>My appointments</span>
                    </StyledNavLink>
                </li>

                <li>
                    <StyledNavLink to="/myMedicalReports">
                        <FaClipboardList/>
                        <span>My medical reports</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/profile">
                        <FaUser/>
                        <span>Profile</span>
                    </StyledNavLink>
                </li>


                <li>
                    <StyledNavLink to="/settingsProfile">
                        <HiOutlineCog6Tooth/>
                        <span>Settings</span>
                    </StyledNavLink>
                </li>


            </>
        )
    }

    if (ROLE_ADMIN) {
        nav = (
            <>
                <li>
                    <StyledNavLink to="/clinics">
                        <FaHouseMedical/>
                        <span>Clinics</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/specializations">
                        <FaAtom/>
                        <span>Specializations</span>
                    </StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/clinicService">
                        <FaGear/>
                        <span>Services</span>
                    </StyledNavLink>
                </li>
            </>
        )
    }
    return (
        <nav>

            <NavList>
                {nav}

            </NavList>
        </nav>
    );
}

export default MainNav;
