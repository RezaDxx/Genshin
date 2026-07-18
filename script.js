let appData = {
    current: {
        ar: 27, wl: 2, quest: "", region: "",
        resources: { primogem: 0, acquaint: 0, intertwined: 0, resin: 0, fragile: 0, mora: 0, herowit: 0 },
        team: ["", "", "", ""],
        roster: [],
        progress: { abyss: "", exploration: { mondstadt: "", liyue: "", inazuma: "", sumeru: "", fontaine: "", natlan: "" } }
    },
    history: []
};

document.addEventListener('DOMContentLoaded', () => {
    setupImportListener();
});

function setupImportListener() {
    document.getElementById('importFile').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(event) {
            appData = JSON.parse(event.target.result);
            loadDataToUI();
        };
        reader.readAsText(e.target.files[0]);
    });
}

function updateDataFromUI() {
    const cur = appData.current;
    cur.ar = parseInt(document.getElementById('ar').value) || 0;
    cur.wl = parseInt(document.getElementById('wl').value) || 0;
    cur.quest = document.getElementById('quest').value;
    cur.region = document.getElementById('current-region').value;

    cur.resources.primogem = parseInt(document.getElementById('primo').value) || 0;
    cur.resources.acquaint = parseInt(document.getElementById('acquaint').value) || 0;
    cur.resources.intertwined = parseInt(document.getElementById('intertwined').value) || 0;
    cur.resources.resin = parseInt(document.getElementById('resin').value) || 0;
    cur.resources.fragile = parseInt(document.getElementById('fragile').value) || 0;
    cur.resources.mora = parseInt(document.getElementById('mora').value) || 0;
    cur.resources.herowit = parseInt(document.getElementById('herowit').value) || 0;

    cur.team = [
        document.getElementById('team1').value,
        document.getElementById('team2').value,
        document.getElementById('team3').value,
        document.getElementById('team4').value
    ];

    cur.progress.abyss = document.getElementById('abyss').value;
    cur.progress.exploration.mondstadt = document.getElementById('exp-mondstadt').value;
    cur.progress.exploration.liyue = document.getElementById('exp-liyue').value;
    cur.progress.exploration.inazuma = document.getElementById('exp-inazuma').value;
    cur.progress.exploration.sumeru = document.getElementById('exp-sumeru').value;
    cur.progress.exploration.fontaine = document.getElementById('exp-fontaine').value;
    cur.progress.exploration.natlan = document.getElementById('exp-natlan').value;
}

function loadDataToUI() {
    const cur = appData.current;
    document.getElementById('ar').value = cur.ar;
    document.getElementById('wl').value = cur.wl;
    document.getElementById('quest').value = cur.quest;
    document.getElementById('current-region').value = cur.region || "";

    document.getElementById('primo').value = cur.resources.primogem;
    document.getElementById('acquaint').value = cur.resources.acquaint;
    document.getElementById('intertwined').value = cur.resources.intertwined;
    document.getElementById('resin').value = cur.resources.resin;
    document.getElementById('fragile').value = cur.resources.fragile;
    document.getElementById('mora').value = cur.resources.mora;
    document.getElementById('herowit').value = cur.resources.herowit;

    document.getElementById('team1').value = cur.team[0] || "";
    document.getElementById('team2').value = cur.team[1] || "";
    document.getElementById('team3').value = cur.team[2] || "";
    document.getElementById('team4').value = cur.team[3] || "";

    document.getElementById('abyss').value = cur.progress.abyss;
    document.getElementById('exp-mondstadt').value = cur.progress.exploration.mondstadt;
    document.getElementById('exp-liyue').value = cur.progress.exploration.liyue;
    document.getElementById('exp-inazuma').value = cur.progress.exploration.inazuma;
    document.getElementById('exp-sumeru').value = cur.progress.exploration.sumeru;
    document.getElementById('exp-fontaine').value = cur.progress.exploration.fontaine;
    document.getElementById('exp-natlan').value = cur.progress.exploration.natlan;

    renderRoster();
}

function addCharacter() {
    const name = document.getElementById('new-char-name').value;
    const level = parseInt(document.getElementById('new-char-level').value) || 1;
    const weapon = document.getElementById('new-char-weapon').value;
    const talent = document.getElementById('new-char-talent').value;

    if (!name) return;

    appData.current.roster.push({ name, level, weapon, talent });

    document.getElementById('new-char-name').value = '';
    document.getElementById('new-char-weapon').value = '';

    renderRoster();
}

function removeCharacter(index) {
    appData.current.roster.splice(index, 1);
    renderRoster();
}

function renderRoster() {
    const list = document.getElementById('roster-list');
    list.innerHTML = '';
    appData.current.roster.forEach((c, index) => {
        const div = document.createElement('div');
        div.className = 'char-item';
        div.innerHTML = `
        <span>${c.name}</span>
        <span>Lv.${c.level}</span>
        <span>Wpn: ${c.weapon}</span>
        <span>T: ${c.talent}</span>
        <button type="button" style="padding:2px 6px; color:red;" onclick="removeCharacter(${index})">X</button>
        `;
        list.appendChild(div);
    });
}

function logSession() {
    updateDataFromUI();
    appData.history.push(JSON.parse(JSON.stringify(appData.current)));
    alert("Session saved to local array.");
}

function generateReport() {
    updateDataFromUI();
    const cur = appData.current;
    let rosterStr = cur.roster.map(c => `- ${c.name} (Lv.${c.level}, Wpn: ${c.weapon}, Talent: ${c.talent})`).join('\n');

    const report = `You are my Genshin guide.

    Tujuan bermain:
    - Solo
    - F2P
    - Story First

    === CURRENT PROGRESS ===
    AR: ${cur.ar}
    WL: ${cur.wl}
    Quest: ${cur.quest}
    Region: ${cur.region}

    [Resources]
    Primogem: ${cur.resources.primogem}
    Acquaint Fate: ${cur.resources.acquaint}
    Intertwined Fate: ${cur.resources.intertwined}
    Resin: ${cur.resources.resin}
    Fragile Resin: ${cur.resources.fragile}
    Mora: ${cur.resources.mora}
    Hero's Wit: ${cur.resources.herowit}

    [Current Team]
    ${cur.team.filter(Boolean).join(', ')}

    [Roster]
    ${rosterStr || 'No custom characters added.'}

    [Progress]
    Spiral Abyss: ${cur.progress.abyss}
    Exploration:
    - Mondstadt: ${cur.progress.exploration.mondstadt}
    - Liyue: ${cur.progress.exploration.liyue}
    - Inazuma: ${cur.progress.exploration.inazuma}
    - Sumeru: ${cur.progress.exploration.sumeru}
    - Fontaine: ${cur.progress.exploration.fontaine}
    - Natlan: ${cur.progress.exploration.natlan}

    Analyze:
    - Efficiency
    - Mistakes
    - Next objective
    - Medium target
    - Long target`;

    showOutput(report);
}

function compareSessions() {
    if (appData.history.length < 2) {
        showOutput("Need at least 2 saved sessions to compare.");
        return;
    }
    const prev = appData.history[appData.history.length - 2];
    const curr = appData.history[appData.history.length - 1];

    let diff = `=== SESSION COMPARISON ===\n`;
    diff += `AR: ${prev.ar} → ${curr.ar} (${(curr.ar - prev.ar) >= 0 ? '+' : ''}${curr.ar - prev.ar})\n`;
    diff += `Primogem: ${prev.resources.primogem} → ${curr.resources.primogem} (${(curr.resources.primogem - prev.resources.primogem) >= 0 ? '+' : ''}${curr.resources.primogem - prev.resources.primogem})\n`;
    diff += `Story: ${prev.quest || '-'} → ${curr.quest || '-'}\n`;

    showOutput(diff);
}

function showOutput(text) {
    const sec = document.getElementById('output-section');
    const area = document.getElementById('text-output');
    sec.style.display = 'block';
    area.value = text;
}

function copyReport() {
    const area = document.getElementById('text-output');
    if(!area.value) return alert("Generate report or compare first!");
    navigator.clipboard.writeText(area.value);
    alert("Copied to clipboard!");
}

function exportJSON() {
    updateDataFromUI();
    const blob = new Blob([JSON.stringify(appData, null, 2)], {type : 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
