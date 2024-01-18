import React from "react";
import { Box } from "@mui/material";

const Message = ({ variant, children }) => {
    let alert = `alert ${variant}`;

    return <Box className={alert}>{children}</Box>;
};

Message.defaultProps = {
    variant: "alert-info",
};

export default Message;