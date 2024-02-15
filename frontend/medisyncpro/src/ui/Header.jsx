import styled from "styled-components";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/Authentication/UserAvatar.jsx";
import {useProfile} from "../features/Authentication/useUpdateUser.js";


const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;

  
  & > div {
    display: flex;
    gap: 2.4rem;
    justify-self: flex-end; 
  }
`;

function Header() {
    const {profileData, isLoading} = useProfile();

    if (!isLoading) {
        return <StyledHeader user>
            <div></div>
            <div>
                <UserAvatar
                    src={profileData?.profileImage !== "" ? profileData.profileImage : "http://localhost:5173/default-user.jpg"}
                    alt="Avatar"/>
                <HeaderMenu/>
            </div>
        </StyledHeader>;
    }

}

export default Header;
