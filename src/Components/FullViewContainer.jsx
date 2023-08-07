import React from "react";
import styled from "styled-components";

export default function FullViewContainer({ children, theme }) {
    return <Container bgColor={theme}>{children}</Container>;
}

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: ${(props) => props.bgColor};

    @media (max-width: 768px) {
        padding: 15px;
    }

    @media (max-width: 480px) {
        padding: 5px;
    }

    @media (max-width: 320px) {
        padding: 0px;
    }
  `;