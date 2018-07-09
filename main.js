'use strict';

/* global window:false document:false CONFIG:false WebSocket:false SentiCloud:false
          LineChart:false */
/* eslint-disable indent */ // Stops eslint complaining about indentation in switch statement

function sortObjectKeys(object) {
    const orderedObject = {};
    Object.keys(object).sort().forEach((key) => {
        orderedObject[key] = object[key];
    });
    return orderedObject;
}

window.onload = () => {
    // document.getElementById('website-name').innerText = CONFIG.name;
    // document.getElementById('website-tagline').innerText = CONFIG.tagline;

    const lc = new LineChart(document.getElementById('sentiment-graph'), CONFIG.topic1, CONFIG.topic2);
    const repealCloud = new SentiCloud(CONFIG.topic1.name, document.getElementById('repeal-cloud'), {
        backgroundColor: CONFIG.topic1.colour,
    });
    const saveCloud = new SentiCloud(CONFIG.topic2.name, document.getElementById('save-cloud'), {
        backgroundColor: CONFIG.topic2.colour,
    });

    fetch("/data/vp-senti.json")
    .then(data => data.json())
    .then(json => {
        const orderedData = sortObjectKeys(json.data);
        lc.updateGraph(Object.keys(orderedData), null, Object.values(orderedData));
    });

    fetch("/data/vn-senti.json")
    .then(data => data.json())
    .then(json => {
        const orderedData = sortObjectKeys(json.data);
        lc.updateGraph(Object.keys(orderedData), Object.values(orderedData), null);
    });

    fetch("/data/vp-cloud.json")
    .then(data => data.json())
    .then(json => repealCloud.updateGraph(Object.entries(json.data)));

    fetch("/data/vn-cloud.json")
    .then(data => data.json())
    .then(json => saveCloud.updateGraph(Object.entries(json.data)));

    document.getElementById('loading-bar').classList.remove('loader-bar');
};
