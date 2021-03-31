import React from "react";
import ReactDOM from "react-dom";
import MemoryMatch from "./MemoryMatch";
import "./MemoryMatch/memory-match-styles.css";

ReactDOM.hydrate(<MemoryMatch />, document.getElementById("mountNode"));
