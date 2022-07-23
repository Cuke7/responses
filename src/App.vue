<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import Response from "./components/Response.vue";
// @ts-ignore
import { GoogleCharts } from "google-charts";

interface People {
    day: string;
    hour: String;
    name: string;
    present: string;
    ress: string;
    plusone: string;
    message: string;
}

const peoples = ref<People[]>([]);

let yes = 0;
let no = 0;

onMounted(() => {
    axios("https://docs.google.com/spreadsheets/d/e/2PACX-1vQNtXWM55ragJpdSldfTjr_CVHMvDOQHDImRzHwLtn7zyk8u6_E_waAc-euXpWdSMLALau1iZsR38wU/pub?output=csv").then((response) => parse(response));
});

function parse(str: any) {
    // console.log(str)
    let regex = /(?<=")[^"]+?(?="(?:\s*?,|\s*?$))|(?<=(?:^|,)\s*?)(?:[^,"\s][^,"]*[^,"\s])|(?:[^,"\s])(?![^"]*?"(?:\s*?,|\s*?$))(?=\s*?(?:,|$))/gm;
    let lines = str.data.split("\r\n");
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        var arr = line.match(regex);
        peoples.value.push({
            day: arr[0].split(" ")[0],
            hour: arr[0].split(" ")[1],
            name: arr[1],
            present: arr[4],
            ress: arr[5],
            plusone: arr[7],
            message: arr[8],
        });

        if (arr[5] == "Bof") {
            no++;
        } else {
            yes++;
        }
    }

    peoples.value.reverse();

    // google.charts.load("current", { packages: ["corechart"] });
    // google.charts.setOnLoadCallback(drawChart);

    GoogleCharts.load(drawChart);

    function drawChart() {
        var data = GoogleCharts.api.visualization.arrayToDataTable([
            ["Ressemblance", "Percentage"],
            ["Oui 👍", yes],
            ["Non 👎", no],
        ]);

        var options = {
            title: "Grosse ressemblance ?",
            backgroundColor: { fill: "transparent" },
            legend: "none",
            width: 400,
            height: 400,
            pieSliceText: "label",
            pieSliceTextStyle: { fontSize: 20 },
            titleTextStyle: { color: "white", fontSize: 18, bold: true },
        };

        var chart = new GoogleCharts.api.visualization.PieChart(document.getElementById("piechart"));

        chart.draw(data, options);
    }
}
</script>

<template>
    <div class="flex justify-center">
        <div id="piechart"></div>
    </div>
    <div v-for="(people, index) in peoples" :key="index">
        <Response :people="people" />
    </div>
</template>

<style>
body {
    background-color: #282a36;
}
</style>
