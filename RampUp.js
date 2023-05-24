import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    stages:[
        { duration:  "1m", target: 10 },  // 10 usuarios concurrentes durante 1 minuto
        { duration:  "3m", target: 50 },  // Aumenta a 50 usuarios concurrentes durante 3 minutos
        { duration:  "2m", target: 50 },  // Mantiene 50 usuarios concurrentes durante 2 minutos
        { duration:  "1m", target: 0 },   // Disminuye gradualmente a 0 usuarios concurrentes durante 1 minuto
    ],
};

export default function (){
    http.get("https://temp.bancard.com.py");
    sleep(1);
}

export function handleSummary(result) {
    return {
      "report.html": htmlReport(result),
      stdout: textSummary(result, {indent: "", enableColors: true}),
    };
}


