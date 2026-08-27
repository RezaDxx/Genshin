let masterData = {
    priority: { main: "", resin: "", weekly: "", target: "" },
    account: { ar: 56, wl: 8, server: "Asia", teapot: 10 },
    exploration: { statues: "", rep: "", quests: "", map: "" },
    resources: { primo: 0, fatesEvent: 0, fatesStandard: 0, resin: 160, fragile: 0, transient: 0, mora: 0, wit: 0, crown: 0, crownUsed: 0, solvent: 0, azoth: 0 },
    pity: { char: 0, statusChar: "50/50", weapon: 0, fatePoints: 0, standard: 0, chronicled: 0 },
    artifacts: { domain: "", strongbox: "", fodder: "Medium", needed: "" },
    endgame: { abyssStars: "", abyssT1: "", abyssT2: "", itDiff: "Hard", itStars: "", itReadyCount: 0 },
    builds: [],
    history: []
};

document.addEventListener('DOMContentLoaded', () => {
    setupImport();
});

function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        btn.innerText = '🌙 Dark Mode';
    } else {
        html.setAttribute('data-theme', 'dark');
        btn.innerText = '☀️ Light Mode';
    }
}

function updateFromUI() {
    masterData.priority = {
        main: document.getElementById('p-main').value,
        resin: document.getElementById('p-resin').value,
        weekly: document.getElementById('p-weekly').value,
        target: document.getElementById('p-target').value
    };
    masterData.account = {
        ar: parseInt(document.getElementById('acc-ar').value) || 0,
        wl: parseInt(document.getElementById('acc-wl').value) || 0,
        server: document.getElementById('acc-server').value,
        teapot: parseInt(document.getElementById('acc-teapot').value) || 0
    };
    masterData.exploration = {
        statues: document.getElementById('exp-statues').value,
        rep: document.getElementById('exp-rep').value,
        quests: document.getElementById('exp-quests').value,
        map: document.getElementById('exp-map').value
    };
    masterData.resources = {
        primo: parseInt(document.getElementById('res-primo').value) || 0,
        fatesEvent: parseInt(document.getElementById('res-fates-event').value) || 0,
        fatesStandard: parseInt(document.getElementById('res-fates-standard').value) || 0,
        resin: parseInt(document.getElementById('res-resin').value) || 0,
        fragile: parseInt(document.getElementById('res-fragile').value) || 0,
        transient: parseInt(document.getElementById('res-transient').value) || 0,
        mora: parseInt(document.getElementById('res-mora').value) || 0,
        wit: parseInt(document.getElementById('res-wit').value) || 0,
        crown: parseInt(document.getElementById('res-crown').value) || 0,
        crownUsed: parseInt(document.getElementById('res-crown-used').value) || 0,
        solvent: parseInt(document.getElementById('res-solvent').value) || 0,
        azoth: parseInt(document.getElementById('res-azoth').value) || 0
    };
    masterData.pity = {
        char: parseInt(document.getElementById('pity-char').value) || 0,
        statusChar: document.getElementById('status-char').value,
        weapon: parseInt(document.getElementById('pity-weapon').value) || 0,
        fatePoints: parseInt(document.getElementById('fate-points').value) || 0,
        standard: parseInt(document.getElementById('pity-standard').value) || 0,
        chronicled: parseInt(document.getElementById('pity-chronicled').value) || 0
    };
    masterData.artifacts = {
        domain: document.getElementById('art-domain').value,
        strongbox: document.getElementById('art-strongbox').value,
        fodder: document.getElementById('art-fodder').value,
        needed: document.getElementById('art-needed').value
    };
    masterData.endgame = {
        abyssStars: document.getElementById('abyss-stars').value,
        abyssT1: document.getElementById('abyss-t1').value,
        abyssT2: document.getElementById('abyss-t2').value,
        itDiff: document.getElementById('it-diff').value,
        itStars: document.getElementById('it-stars').value,
        itReadyCount: parseInt(document.getElementById('it-ready-count').value) || 0
    };
}

function addBuildDetail() {
    const name = document.getElementById('b-name').value;
    if (!name) return;

    masterData.builds.push({
        name: name,
        const: document.getElementById('b-const').value,
        weapon: document.getElementById('b-weapon').value,
        artifact: document.getElementById('b-artifact').value,
        stats: document.getElementById('b-stats').value,
        talents: document.getElementById('b-talents').value
    });

    document.getElementById('b-name').value = '';
    renderBuilds();
}

function renderBuilds() {
    const list = document.getElementById('build-list');
    list.innerHTML = '';
    masterData.builds.forEach((b, idx) => {
        const div = document.createElement('div');
        div.className = 'char-card';
        div.innerHTML = `
            <div>
                <strong style="color:var(--text-bold)">${b.name}</strong> (${b.const}) - ${b.weapon}<br>
                <span style="color:var(--text-muted)">Set: ${b.artifact} | Stats: ${b.stats} | Talents: ${b.talents}</span>
            </div>
            <button type="button" style="padding:2px 6px; color:var(--highlight); border:none; background:none; cursor:pointer;" onclick="masterData.builds.splice(${idx},1); renderBuilds();">✕</button>
        `;
        list.appendChild(div);
    });
}

function generateReport() {
    updateFromUI();
    const p = masterData.priority;
    const acc = masterData.account;
    const exp = masterData.exploration;
    const r = masterData.resources;
    const pit = masterData.pity;
    const art = masterData.artifacts;
    const eg = masterData.endgame;

    const totalPulls = Math.floor(r.primo / 160) + r.fatesEvent;

    let buildStr = masterData.builds.map(b => 
`- ${b.name} (${b.const}): ${b.weapon} | Set: ${b.artifact} | Target Stats: ${b.stats} | Talents: ${b.talents}`
    ).join('\n');

    const output = `You are my Genshin Impact Master Advisor.

ACCOUNT OVERVIEW
- Adventure Rank: AR${acc.ar} | World Level: WL${acc.wl} | Server: ${acc.server} | Teapot: Lv${acc.teapot}

ACTIVE PRIORITIES
- Main Focus: ${p.main}
- Today's Resin: ${p.resin}
- Weekly Bosses: ${p.weekly}
- Savings Target: ${p.target}

EXPLORATION & QUESTS
- Statues of the Seven: ${exp.statues}
- Reputation: ${exp.rep}
- Unfinished Quests: ${exp.quests || 'None'}
- Map Exploration: ${exp.map || 'Not specified'}

RESOURCES & PITY
- Primogems: ${r.primo} | Event Fates: ${r.fatesEvent} (Total Pulls: ${totalPulls})
- Event Pity: ${pit.char} (${pit.statusChar})
- Weapon Pity: ${pit.weapon} (Fate Points: ${pit.fatePoints}/1)
- Standard Pity: ${pit.standard} | Chronicled Pity: ${pit.chronicled}
- Resin Inventory: ${r.resin}/160 | Fragile: ${r.fragile} | Transient: ${r.transient}
- Core Mats: Mora ${r.mora} | Hero's Wit: ${r.wit} | Crowns: ${r.crown} (Used: ${r.crownUsed}) | Solvent: ${r.solvent}

ARTIFACT MANAGEMENT
- Domain Target: ${art.domain}
- Strongbox Target: ${art.strongbox}
- Artifact EXP Fodder: ${art.fodder}
- Desired Artifact Sets: ${art.needed}

COMBAT & ENDGAME STATUS
- Spiral Abyss: ${eg.abyssStars}
  • Team 1: ${eg.abyssT1}
  • Team 2: ${eg.abyssT2}
- Imaginarium Theater: ${eg.itDiff} (${eg.itStars}) | Ready Roster (Lv80+): ${eg.itReadyCount} Characters

ROSTER BUILD TARGETS
${buildStr || 'No active character builds listed.'}`;

    showOutput(output);
}

function logSession() {
    updateFromUI();
    masterData.history.push(JSON.parse(JSON.stringify(masterData)));
    alert("Account state saved!");
}

function compareSessions() {
    if (masterData.history.length < 2) {
        showOutput("Save at least 2 states to generate a comparison.");
        return;
    }
    const prev = masterData.history[masterData.history.length - 2];
    const curr = masterData.history[masterData.history.length - 1];

    let diff = `=== GENSHIN PROGRESS COMPARISON ===\n`;
    diff += `AR Level: ${prev.account.ar} → ${curr.account.ar}\n`;
    diff += `Primogems: ${prev.resources.primo} → ${curr.resources.primo} (${curr.resources.primo - prev.resources.primo})\n`;
    diff += `Event Pity: ${prev.pity.char} → ${curr.pity.char}\n`;
    diff += `Abyss Progress: ${curr.endgame.abyssStars}\n`;

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
    if (!area.value) return alert("Generate prompt first!");
    navigator.clipboard.writeText(area.value);
    alert("Prompt copied to clipboard!");
}

function setupImport() {
    document.getElementById('importFile').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(event) {
            masterData = JSON.parse(event.target.result);
            alert("Account state loaded successfully!");
        };
        reader.readAsText(e.target.files[0]);
    });
}

function exportJSON() {
    updateFromUI();
    const blob = new Blob([JSON.stringify(masterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'genshin_master_state.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
