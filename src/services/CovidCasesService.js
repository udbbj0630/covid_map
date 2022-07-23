import axios from "axios";

export const CovidCasesService = {
  getAllCountyCases: function () {
    return axios.get("https://corona.lmao.ninja/v2/jhucsse/counties");
  },
};
