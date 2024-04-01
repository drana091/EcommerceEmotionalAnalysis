import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Slide, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

const messages = [
    "Buy One Get One Free",
    "$5 Off Purchases of $50 or More",
    "Refer Someone Get $20 off"
];

const PromotionContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        padding: '40px 0px 40px 0px'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
    overflow: 'hidden',
    //Tint of Boarder
    background: pink[200]
}));

const MessageText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Montez", "cursive"',
    [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
    },
    color: theme.palette.common.white,
    fontSize: "1.5rem",
}));

 
export default function Promotion() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {

        setTimeout (() => {
            setShow(false)

        },3000);


    //Controls How Quickly Messages Move Accross Screen
        const intervalId = setInterval(() => {
            setMessageIndex(i => (i + 1) % messages.length);

            setShow(true);
            
            setTimeout (() => {
                setShow(false)
    
            },   3000);


        },   4000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <PromotionContainer>
            <Slide direction="left" in={show}>
                <MessageText>
                    {messages[messageIndex]}
                </MessageText>
            </Slide>
        </PromotionContainer>
    );
}
