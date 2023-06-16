import axios from "axios";

export default axios.create({
  baseURL: "https://zabtkar.tooska-co.ir/api",

  headers: {
    "Content-type": "application/json"
  }
});