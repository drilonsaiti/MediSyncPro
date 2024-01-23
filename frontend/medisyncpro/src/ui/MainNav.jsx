
import styled, {css} from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

import {FaCalendarDays, FaGear, FaHouseMedical, FaUserDoctor, FaUserPen} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import {FaAtom, FaAward, FaCalendarCheck, FaClipboardList, FaHospitalUser} from "react-icons/fa";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  ${(props) =>
      props.user  &&
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
    color: var(--color-grey-800);
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
  return (
    <nav>

        <NavList>

            <li>
                <StyledNavLink to="/appointment">
                    <FaCalendarCheck />
                    <span>Appointment</span>
                </StyledNavLink>
            </li>

            <li>
                <StyledNavLink to="/clinics">
                    <FaHouseMedical />
                    <span>Clinics</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/clinic-schedule">
                    <FaCalendarDays />
                    <span>Schedule</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/clinicService">
                    <FaGear />
                    <span>Services</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/doctors">
                    <FaUserDoctor />
                    <span>Doctors</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/medicalReports">
                    <FaClipboardList />
                    <span>Medical reports</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/patient">
                    <FaHospitalUser />
                    <span>Patient</span>
                </StyledNavLink>
            </li>

            <li>
                <StyledNavLink to="/receptionist">
                    <FaUserPen />
                    <span>Receptionist</span>
                </StyledNavLink>
            </li>

            <li>
                <StyledNavLink to="/specializations">
                    <FaAtom  />
                    <span>Specializations</span>
                </StyledNavLink>
            </li>

        </NavList>
    </nav>
  );
}

export default MainNav;
