import styled from "styled-components";
import HeaderMenu from "./HeaderMenu.jsx";

/*
* ${(props) =>
      props.user  &&
      css`
        padding: 1.2rem 4.8rem;
        grid-column: 1 / -1;
        justify-content: center;
        display: grid;
        gap: 0;
        grid-template-columns: 1fr auto; /* Two columns: one taking available space, the other for the div */
/*align-items: center;
justify-items: center;
`}*/


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
    justify-self: flex-end; /* Align to the end */
  }
`;

function Header() {


    return <StyledHeader>
        <div>
            {/*<UserAvatar src={profileData?.profileImage !== "" ? profileData.profileImage : "http://localhost:5173/default-user.jpg"} alt="Avatar"/>*/}
            <HeaderMenu/>
        </div>
    </StyledHeader>;

}

export default Header;
