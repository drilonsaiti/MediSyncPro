import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        &, &.light-mode {
            /* Grey */
            --color-greys-50: #333;
            --color-grey-0: #fff;
            --color-grey-50: #f9fafb;
            --color-grey-100: #f3f4f6;
            --color-grey-200: #e5e7eb;
            --color-grey-300: #d1d5db;
            --color-grey-400: #9ca3af;
            --color-grey-500: #6b7280;
            --color-grey-600: #24282A;
            --color-grey-700: #1C1F21;
            --color-grey-800: #141618;
            --color-grey-900: #0C0E0F;
            --color-grey-1000: #141618;


            --color-blue-100: #e0f2fe;
            --color-blue-700: #0369a1;
            --color-green-100: #dcfce7;
            --color-green-700: #264026;
            --color-yellow-100: #fef9c3;
            --color-yellow-700: #a16207;
            --color-silver-100: #e5e7eb;
            --color-silver-700: #374151;
            --color-indigo-100: #e0e7ff;
            --color-indigo-700: #4338ca;

            --color-red-100: #fee2e2;
            --color-red-700: #b91c1c;
            --color-red-800: #991b1b;

            --backdrop-color: rgba(255, 255, 255, 0.1);
            --backdrop-color-black: rgba(0, 0, 0, 0.5);
            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
            --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

            --hover-doctor-color: #FFF;
            --hover-clinic-color: #FFF;


            --image-grayscale: 0;
            --image-opacity: 100%;
        }

        &.dark-mode {
            --color-grey-55: #12171e;
            --color-grey-0: #0C0E0F;
            --color-grey-50: #090b0c;
            --color-grey-100: #141618;

            --color-grey-200: #1C1F21;
            --color-grey-300: #24282A;
            --color-grey-400: #6b7280;
            --color-grey-500: #9ca3af;
            --color-grey-600: #d1d5db;
            --color-grey-700: #e5e7eb;
            --color-grey-800: #141618;
            --color-grey-900: #f9fafb;
            --color-grey-1000: #fff;

            --color-blue-100: #075985;
            --color-blue-700: #e0f2fe;
            --color-green-100: #166534;
            --color-green-700: #dcfce7;
            --color-yellow-100: #854d0e;
            --color-yellow-700: #fef9c3;
            --color-silver-100: #374151;
            --color-silver-700: #f3f4f6;
            --color-indigo-100: #3730a3;
            --color-indigo-700: #e0e7ff;

            --color-brand-600: #087f5b;
            --color-brand-700: #087f5b;
            --color-red-100: #fee2e2;
            --color-red-700: #b91c1c;
            --color-red-800: #991b1b;

            --backdrop-color: rgba(0, 0, 0, 0.3);

            --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
            --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
            --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
            --hover-doctor-color: #1A1A1AFF;
            --hover-clinic-color: #101010;
            --image-grayscale: 10%;
            --image-opacity: 90%;
        }

        --color-brand-50: #eefff6;
        --color-primary-50: #AAEAD3;
        --color-primary-100: #9CE7CB;
        --color-primary-200: #8FE3C4;
        --color-primary-300: #81E0BD;
        --color-primary-400: #66D9AF;
        --color-primary-500: #58D6A8;
        --color-primary-600: #4AD3A1;
        --color-primary-700: #32C992;
        --color-primary-800: #2EBC88;
        --color-primary-900: #2BAE7E;
        --color-primary-1000: #28A074;
        --color-primary-1100: #24936A;
        --color-primary-1200: #218560;
        --color-primary-1300: #1D7856;
        --color-primary-1400: #1A6A4D;
        --color-primary-1500: #175C43;
        --color-brand-600: #134F39;
        --color-brand-700: #10412F;
        --color-brand-500: #087f5b;

        --border-radius-tiny: 3px;
        --border-radius-sm: 5px;
        --border-radius-md: 7px;
        --border-radius-lg: 9px;


    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        /* Creating animations for dark mode */
        transition: background-color 0.3s, border 0.3s;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: "Poppins", sans-serif;
        color: var(--color-grey-600);

        transition: color 0.3s, background-color 0.3s;
        min-height: 100lvh;
        line-height: 1.5;
        font-size: 1.6rem;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    *:disabled {
        cursor: not-allowed;
    }

    select:disabled,
    input:disabled {
        background-color: var(--color-grey-200);
        color: var(--color-grey-500);
    }

    input:focus,
    button:focus,
    textarea:focus,
    select:focus {
        outline: 2px solid var(--color-brand-600);
        outline-offset: -1px;
    }

    /* Parent selector, finally 😃 */
    button:has(svg) {
        line-height: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }

    img {
        max-width: 100%;

        /* For dark mode */
        filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
    }

`;

export default GlobalStyles;

