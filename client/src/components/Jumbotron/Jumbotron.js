import React from "react";

const Jumbotron = ({ children }) => (
    <div
        style={{ height: 100, clear: "both", paddingTop: 12, textAlign: "center" }}
        className="jumbotron"
    >
        {children}
    </div>
);

export default Jumbotron;
