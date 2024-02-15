import styled from "styled-components";
import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineUser} from 'react-icons/hi2';
import DarkModeToggle from "./DarkModeToggle.jsx";
import Logout from "../features/Authentication/Logout.jsx";


const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

const HeaderMenu = () => {

    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon>
                    <HiOutlineUser/>
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle/>

            </li>
            <li>
                <Logout/>
            </li>
        </StyledHeaderMenu>
    );
};

export default HeaderMenu;