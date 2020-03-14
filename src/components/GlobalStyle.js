import { createGlobalStyle } from "styled-components";
import normalize from "normalize.css";

export default createGlobalStyle`
    ${normalize}
    *, *:before, *:after {
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
        margin: 0;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        background-color: #fff;
        line-height: 1.4;
    }
`;