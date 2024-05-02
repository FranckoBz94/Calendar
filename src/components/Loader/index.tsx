import React from "react";
import { Box } from "@mui/material";
import "./loader.css"; // Asegúrate de importar el CSS del loader

const Loader = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999, // Asegura que el loader esté en la parte superior
            }}
        >
            <div className="panWrapper">
                <div className="pan">
                    <div className="food"></div>
                    <div className="panBase"></div>
                    <div className="panHandle"></div>
                </div>
                <div className="panShadow"></div>
            </div>
        </Box>
    );
};

export default Loader;
