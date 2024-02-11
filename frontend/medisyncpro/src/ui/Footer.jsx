import styled from "styled-components";

const Footer = styled.footer`
    height: 20lvh;
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

export default Footer;