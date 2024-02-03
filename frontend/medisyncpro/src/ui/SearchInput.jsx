import styled from "styled-components";
import {HiXMark} from "react-icons/hi2";

const StyledSearchInput = styled.div`
    position: relative;

    input {
        border: 1px solid var(--color-grey-300);
        background-color: var(--color-grey-0);
        border-radius: var(--border-radius-sm);
        padding: 0.8rem 1.2rem;
        box-shadow: var(--shadow-sm);
        width: 100%;
    }

    /* Icon styling */

    .icon {

        width: 3rem;
        height: 3rem;
        color: var(--color-grey-0);

    }
`;

const StyleBackground = styled.div`
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: var(--color-brand-700);
    border-bottom-right-radius: var(--border-radius-sm);
    border-top-right-radius: var(--border-radius-sm);
    padding: 0.35rem 1rem;
    display: flex;
    align-items: center;
    border: 2px solid var(--color-brand-700);


    &:hover {
        background-color: var(--color-primary-1400);
        border: 2px solid var(--color-primary-1400);
    }

`

const SearchInput = (props) => {

    return (
        <StyledSearchInput>
            <input type="text" placeholder="Search..." value={props.value} onChange={props.onChange}/>

            <StyleBackground>
                <HiXMark className="icon" onClick={() => props.onChange('')}/>
            </StyleBackground>

        </StyledSearchInput>
    );
};

export default SearchInput;