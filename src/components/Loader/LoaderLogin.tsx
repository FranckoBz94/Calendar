import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderLogin = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
            <p style={{ marginLeft: "10px" }}>Iniciando sesión...</p>
        </div>
    );
};

export default LoaderLogin;
