import axios from "axios";

export default axios.create({
  baseURL: "https://633a7661e02b9b64c6104a06.mockapi.io/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});