import Sidebar from "./Sidebar";
import Header from "./Header";
import styled, {css} from "styled-components";
import {Outlet} from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100lvh;
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;

    ${(props) =>
    props.user &&
    css`
        grid-column: 1 / -1;
      `}
`;

function AppLayout() {
    /*const {roles,isLoading:isLoadingRole} = useGetRole();
    const hasAdminRole = roles.includes("ROLE_ADMIN");*/

    return (
        <StyledAppLayout>
            <Header/>
            <Sidebar/>

            <Main>
                <Outlet/>
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;
