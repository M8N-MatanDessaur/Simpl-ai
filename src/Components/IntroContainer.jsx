import React from "react";
import styled from "styled-components";
import simpl from "../logo.png";

export default function IntroContainer() {
    return (
        <Container>
            <Image src={simpl} alt="simpl logo" width="200px" height="200px" />
            <Title>simpl</Title>
            <SubTitle>The simple ai chatbot <br/> chat or ask questions <br/>as if you spoke to a person</SubTitle>
            <Exemples>
                <Exemple>How can I ask a girl out ?</Exemple>
                <Exemple>What is the meaning of life ?</Exemple>
                <Exemple>What is the capital of France ?</Exemple>
                <Exemple>What is the element C</Exemple>
                <Exemple>Where can I buy cheap shoes</Exemple>
            </Exemples>
        </Container>
    )
}

const Container = styled.div`
  width:50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Image = styled.img`
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #d331e0;
`;

const Title = styled.h1` 
  font-size: 4rem;
  color: #fe4aff;

`;

const SubTitle = styled.h2`
  font-size: 0.9rem;
  color: #8446a5;
  text-align: justify;
  margin-bottom: 10px;
`;

const Exemples = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const Exemple = styled.p`
    font-size: 0.8rem;
    color: #fff;
    text-align: justify;
    background-color: #d331e050;
    padding: 5px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #fe4aff;
        font-weight: bold;
        font-size: 0.9rem;
        transform: scale(1.1);
    }
`;
