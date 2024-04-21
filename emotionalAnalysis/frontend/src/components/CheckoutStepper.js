import { Button, Grid, Box, Typography, Paper } from '@mui/material'; 
import React from 'react';
import InputField from './InputField';
import AddressCheckoutForm from './AddressCheckoutForm';
import PaymentCheckoutForm from './PaymentCheckoutForm';
import ConfirmationCheckoutForm from './ConfirmationCheckoutForm';
import { Stepper, Step, StepLabel } from '@mui/material';


export default function CheckoutStepper({ formData, handleInputChange, buttonPressed }) {
    const steps = ['Address', 'Payment', 'Confirmation'];
    function getStepContent(step) 
    {
        switch (step) 
        {
            case 0:
                return <AddressCheckoutForm formData={formData} handleInputChange={handleInputChange} buttonPressed={buttonPressed} />;
            case 1:
                return <PaymentCheckoutForm formData={formData} handleInputChange={handleInputChange} buttonPressed={buttonPressed} />;
            case 2:
                return <ConfirmationCheckoutForm formData={formData} handleInputChange={handleInputChange} buttonPressed={buttonPressed} />;
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <React.Fragment>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </React.Fragment>
        </React.Fragment>
    );
}
