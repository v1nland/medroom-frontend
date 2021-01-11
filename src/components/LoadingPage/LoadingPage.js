import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core/";

class LoadingPage extends Component {
    render() {
        return (
            <Typography component="div">
                <Box display="flex" justifyContent="center" style={{ marginTop: "200px" }}>
                    <img src={require("../../images/loading1.gif")} alt="loading..." />
                </Box>
            </Typography>
        );
    }
}

export default LoadingPage;
