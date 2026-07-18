let appData = { current: {}, history: [] };

// Inisialisasi awal saat DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    setupImportListener();
    setupDragAndDrop();
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

function loadDataToUI() {
    const cur = appData.current;
    document.getElementById('ar').value = cur.ar;
    document.getElementById('wl').value = cur.wl;
    document.getElementById('quest').value = cur.quest;
    document.getElementById('primo').value = cur.resources.primogem;
    document.getElementById('mora').value = cur.resources.mora;
    document.getElementById('fragile').value = cur.resources.fragile_resin;
    document.getElementById('exp-mondstadt').value = cur.exploration.mondstadt;
    document.getElementById('exp-liyue').value = cur.exploration.liyue;

    renderRoster();
}

function updateDataFromUI() {
    appData.current.ar = parseInt(document.getElementById('ar').value);
    appData.current.wl = parseInt(document.getElementById('wl').value);
    appData.current.quest = document.getElementById('quest').value;
    appData.current.resources.primogem = parseInt(document.getElementById('primo').value);
    appData.current.resources.mora = parseInt(document.getElementById('mora').value);
    appData.current.resources.fragile_resin = parseInt(document.getElementById('fragile').value);
    appData.current.exploration.mondstadt = document.getElementById('exp-mondstadt').value;
    appData.current.exploration.liyue = document.getElementById('exp-liyue').value;
}

function renderRoster() {
    const container = document.getElementById('roster-list');
    container.innerHTML = '';
    appData.current.roster.forEach((char, index) => {
        const div = document.createElement('div');
        div.style.marginBottom = '8px';
        div.innerHTML = `<strong>${char.name}</strong> (Lv${char.level}, Wpn${char.weapon_level}, T:${char.talents})`;
        container.appendChild(div);
    });
}

function addCharacter() {
    const nameInput = document.getElementById('new-char-name');
    if(!nameInput.value) return;

    appData.current.roster.push({
        name: nameInput.value,
        level: 1,
        weapon_level: 1,
        talents: "1/1/1"
    });
    nameInput.value = '';
    renderRoster();
}

function exportData() {
    updateDataFromUI();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "progress.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function generateAnalysisPrompt() {
    updateDataFromUI();
    const cur = appData.current;

    let rosterStr = cur.roster.map(c => `- ${c.name} (Lv${c.level}, Wpn Lv${c.weapon_level}, Talent ${c.talents})`).join('\n');

    const prompt = `You are my Genshin guide.

    Tujuan bermain:
    - Solo
    - F2P
    - Story First

    === CURRENT PROGRESS ===
    AR: ${cur.ar}
    WL: ${cur.wl}
    Quest: ${cur.quest}

    [Resources]
    Primogem: ${cur.resources.primogem}
    Mora: ${cur.resources.mora}
    Fragile Resin: ${cur.resources.fragile_resin}

    [Exploration]
    Mondstadt: ${cur.exploration.mondstadt}
    Liyue: ${cur.exploration.liyue}

    [Roster]
    ${rosterStr}

    Analyze:
    - Efficiency
    - Mistakes
    - Next objective
    - Medium target
    - Long target`;

    navigator.clipboard.writeText(prompt);
    alert("Prompt untuk Nova telah disalin ke clipboard! Tinggal paste.");
}

function setupDragAndDrop() {
    const dropZone = document.getElementById('drop-zone');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
        if(files.length > 0) {
            dropZone.innerText = `Image loaded: ${files[0].name}`;
            // Penyimpanan lokal file biner/base64 bisa diintegrasikan di sini jika diperlukan nanti
        }
    }
}

function logSession() {
    updateDataFromUI();
    // Salin deep copy status saat ini ke array history
    appData.history.push(JSON.parse(JSON.stringify(appData.current)));
    alert("Session disimpan ke riwayat internal. Jangan lupa eksport JSON sebelum menutup aplikasi!");
}
