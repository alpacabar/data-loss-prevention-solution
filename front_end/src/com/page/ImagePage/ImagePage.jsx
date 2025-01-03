import React, { useState } from "react";
import styled from "styled-components";
import { useRef } from "react";

import { TextInput } from "react-native-paper";

import "../Page.css";
import HighlightedText from "../../highlight/HightLighted";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Oval } from "react-loader-spinner";

//   border: 1px solid rgb(212, 210, 224);
const Div_txt = styled.div`
    width: 30%;
    height: 100%;
    float: left;
`;
const Div_txtShow = styled.div`
    width: 68%;
    height: 34%;
    float: left;

    margin: 0px 4px;
`;

const Div_NB = styled.div`
    width: 34%;
    height: 65%;
    float: left;

    margin: 20px 4px 0px 0px;
    isplay: flex;
    flex-direction: column;
`;

const Div_SVM = styled.div`
    width: 34%;
    height: 65%;
    float: left;

    margin: 20px 4px 0px 0px;
`;

export default function ImagePage(props) {
    const [conversionResult, setConversionResult] = useState('');
    const [inputValue, setInputValue] = useState("");

    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const [NBgraph, setNBGraph] = useState("");
    const [SVMgraph, setSVMGraph] = useState("");
    const [NBResult, setNBResult] = useState('');
    const [SVMResult, setSVMResult] = useState('');
    const [selectedResultType, setSelectedResultType] = useState("NB");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


//text
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Save selected file to state
const saveTextFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("No file selected");
        return;
    }

    setSelectedImageFile(file); // Save the file to state for uploading
    const reader = new FileReader();
    reader.onload = () => {
        console.log("File content preview:", reader.result); // Optional: Preview content
    };
    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };
    reader.readAsText(file); // Read the file as text
};

// Upload the file and display scan results
const upload_file = () => {
    if (!selectedImageFile) {
        alert("Please select a file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedImageFile); // Key name matches backend

    setLoading(true);
    setError(false);

    fetch("/upload", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error || "Unexpected error occurred");
                });
            }
            return response.json();
        })
        .then((data) => {
            if (data.results) {
                // Assuming the backend returns an array or object with the results
                setConversionResult(JSON.stringify(data.results, null, 2));
                console.log("Results:", data.results);
            } else {
                alert("No results found.");
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error("Upload error:", error);
            alert(`Error: ${error.message}`);
            setLoading(false);
            setError(true);
        });
};

    const handleNBResult = () => {
        setSelectedResultType("NB");
    };
    
    const handleSVMResult = () => {
        setSelectedResultType("SVM");
    };

    
    return (

        
        <div
            className="imageContainer"
            style={{
                //alignItems : "center",
                textAlign: "center",
                // justifyContent : "center",
                //display : "flex",
                fontSize: "1vw",
                margin: "0.5vw",
                width: "80vw",
                height: "95%",
            }}
        >

            <Div_txt>
                <div
                    style={{
                        margin: "1vw 1vw 1vw 1vw",
                        height: "10%",
                        width: "90%",
                        // border: "1px solid rgb(212, 210, 224)",
                        textAlign: "center",
                    }}
                >
                    <div class="filebox">
                        <label for="imgfile" style={{ width: "100px", height: "100%" }}>
                            Upload File
                        </label>
                        <input
                            type="file"
                            id="imgfile"
                            accept="*"
                            onChange={saveTextFile}
                        />
                    </div>
                </div>
                <div
                    style={{
                        margin: "1vw 1vw 1vw 1vw",
                        padding: "2vw 0vw 1vw 0vw",
                        height: "50%",
                        width: "90%",
                        // border: "1px solid rgb(212, 210, 224)",
                    }}
                >
                    <img
                        src={imgFile ? imgFile : "https://github.com/spamDosirak/Multimodal-Spam-Filtering/assets/82564901/702f20df-afd3-49cf-89bb-a4b6c9350502"}
                        style={{
                            height: "40vh",
                            width: "20vw",
                            // border: "1px solid rgb(212, 210, 224)",
                        }}
                        alt = "no image"
                    />
                </div>
                <button className="imageTestBtn" onClick={upload_file}>
                    VERIFY
                </button>
            </Div_txt>

            <Div_txtShow>
                <div
                    style={{
                        margin: "20px",
                        width: "90%",
                        height: "90%",
                        background: " #f8f8f8",
                        borderRadius: "32px",
                        boxShadow:
                            "-6px -6px 10px rgba(255, 255, 255, 0.8), 6px 6px 10px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div
                        style={{
                            //padding : "20px",
                            overflow: "scroll",
                            fontSize: "15px",
                            width: "90%",
                            height: "60%",
                            textAlign: "center",
                            lineHeight: "1.8",
                            padding: "1.5vw",
                        }}
                        className="scrollBar"
                    >
                        {(selectedResultType === "NB") && (conversionResult)
                            && (<HighlightedText text={conversionResult} result={NBResult} />)}
                        {(selectedResultType === "SVM") && (conversionResult)
                            && (<HighlightedText text={conversionResult} result={SVMResult} />)}
                    </div>
                    <div>
                        <button
                            onClick={handleNBResult}
                            style={{
                                backgroundColor: selectedResultType === "NB" ? "#FF5F6D" : "",
                                padding: "5px 10px 5px 10px",
                                margin: "0px 5px 10px 0px",
                                borderRadius: "32px",
                                border: "none",
                                boxShadow: "-6px -6px 10px rgba(255, 255, 255, 0.8), 6px 6px 10px rgba(0, 0, 0, 0.2)",
                                color: "#6f6cd",
                                cursor: "pointer",
                            }}
                        >
                            NB
                        </button>
                        <button
                            onClick={handleSVMResult}
                            style={{
                                backgroundColor: selectedResultType === "SVM" ? "#FFC371" : "",
                                padding: "5px 10px 5px 10px",
                                margin: "0px 0px 10px 5px",
                                borderRadius: "32px",
                                border: "none",
                                boxShadow: "-6px -6px 10px rgba(255, 255, 255, 0.8), 6px 6px 10px rgba(0, 0, 0, 0.2)",
                                color: "#6f6cd",
                                cursor: "pointer",
                            }}
                        >
                            SVM
                        </button>
                    </div>
                </div>
            </Div_txtShow>

        </div>
    );
}
