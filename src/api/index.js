import axios from "axios";

export default axios.create({
  baseURL: "http://zabtkar.tooska-co.ir/api",
  timeout : 4000,
  headers: {
    "Content-type": "application/json"
  }
});