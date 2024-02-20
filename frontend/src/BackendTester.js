import axios from "axios";
import axiosInstance from "./api/AxiosConfig";
 

function BackendTester() {
    axiosInstance.get("/test")
    .then(function (response) {
        console.log("Response from backend: ", response.data);
    })
    .catch(function (error) {
        console.error("Error fetching data: ", error);
    });
}

export default BackendTester; 