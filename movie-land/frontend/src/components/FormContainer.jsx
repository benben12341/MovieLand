import React from "react";
import { Box } from "@mui/material";

const FormContainer = ({ children }) => {
    return (
        <Box className="container">
            <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                {children}
            </Box>
        </Box>
    );
};

export default FormContainer;