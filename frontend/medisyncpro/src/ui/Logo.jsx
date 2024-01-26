import styled from "styled-components";
import Heading from "./Heading.jsx";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="http://localhost:5173/logo.png" alt="Logo" />
        <Heading type="h3">Eclectic retreat heaven</Heading>
    </StyledLogo>
  );
}

export default Logo;
