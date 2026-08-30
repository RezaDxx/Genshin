let trackerData = {
    roster: [
        { name: "Tighnari", lvl: "80/80", const: "C0", weapon: "Slingshot R5 Lv80", talentsCurr: "6/6/6", talentsTarg: "8/6/6", status: "Active Build" },
        { name: "Yelan", lvl: "90/90", const: "C0", weapon: "Favonius Warbow R5 Lv90", talentsCurr: "1/9/10", talentsTarg: "1/10/10", status: "Ready / Built" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    calculatePulls();
    renderRoster();
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

function calculatePulls() {
    const primo = parseInt(document.getElementById('w-primo').value) || 0;
    const fates = parseInt(document.getElementById('w-if').value) || 0;
    const total = Math.floor(primo / 160) + fates;
    document.getElementById('w-effective').value = `${total} Pulls (Effective)`;
}

function addCharacter() {
    const name = document.getElementById('b-name').value;
    if (!name) return;

    trackerData.roster.push({
        name: name,
        lvl: document.getElementById('b-lvl').value || "80/80",
        const: document.getElementById('b-const').value || "C0",
        weapon: document.getElementById('b-weapon').value || "-",
        talentsCurr: document.getElementById('b-talents-curr').value || "1/1/1",
        talentsTarg: document.getElementById('b-talents-targ').value || "6/6/6",
        status: document.getElementById('b-status').value
    });

    document.getElementById('b-name').value = '';
    renderRoster();
}

function renderRoster() {
    const list = document.getElementById('roster-list');
    list.innerHTML = '';
    trackerData.roster.forEach((c, idx) => {
        const div = document.createElement('div');
        div.className = 'char-card';
        div.innerHTML = `
            <div>
                <strong style="color:var(--text-bold)">${c.name}</strong> (${c.lvl} | ${c.const}) - <span style="color:var(--accent)">${c.status}</span><br>
                <span>Weapon: ${c.weapon} | Talents: ${c.talentsCurr} → Target: ${c.talentsTarg}</span>
            </div>
            <button type="button" style="padding:2px 6px; color:var(--highlight); border:none; background:none; cursor:pointer;" onclick="trackerData.roster.splice(${idx},1); renderRoster();">✕</button>
        `;
        list.appendChild(div);
    });
}

function generateReport() {
    let rosterStr = trackerData.roster.map(c => 
`${c.name} | ${c.lvl} | ${c.const} | ${c.weapon} | ${c.talentsCurr} (Target: ${c.talentsTarg}) | ${c.status}`
    ).join('\n');

    const promptText = `You are my permanent Genshin guide.

PLAYSTYLE
Efficient resin utilization, decision-driven progression, no fluff.

ACCOUNT RULES
Strictly use recorded data for decisions. Prioritize bottlenecks.

━━━━━━━━━━━━━━━━
NEXT MISSION
━━━━━━━━━━━━━━━━

Main: ${document.getElementById('m-main').value}
Today: ${document.getElementById('m-today').value}
Build: ${document.getElementById('m-build').value}
Weekly: ${document.getElementById('m-weekly').value}

━━━━━━━━━━━━━━━━
ACCOUNT
━━━━━━━━━━━━━━━━

AR: ${document.getElementById('acc-ar').value}
WL: ${document.getElementById('acc-wl').value}
Ascension Quest: ${document.getElementById('acc-asc').value}

Server: ${document.getElementById('acc-server').value}
Current Location: ${document.getElementById('acc-loc').value}
Story Mode: ${document.getElementById('acc-mode').value}

Current Archon Quest: ${document.getElementById('acc-aq').value}
Objective: ${document.getElementById('acc-aq-obj').value}

Current Story Quest: ${document.getElementById('acc-sq').value}
Active World Quest Count: ${document.getElementById('acc-wq-count').value}
Important World Quests: ${document.getElementById('acc-wq-imp').value}

━━━━━━━━━━━━━━━━
CHARACTER PRIORITY
━━━━━━━━━━━━━━━━

Build Priority:
1. ${document.getElementById('bp-1').value}
2. ${document.getElementById('bp-2').value}
3. ${document.getElementById('bp-3').value}
4. ${document.getElementById('bp-4').value}

Saving For: ${document.getElementById('w-saving').value}

━━━━━━━━━━━━━━━━
WISH
━━━━━━━━━━━━━━━━

Primogem: ${document.getElementById('w-primo').value}
Intertwined Fate: ${document.getElementById('w-if').value}
Acquaint Fate: ${document.getElementById('w-af').value}
Total Effective Pulls: ${document.getElementById('w-effective').value}

Character Banner Pity: ${document.getElementById('w-pity-char').value}
Character Banner Guaranteed: ${document.getElementById('w-guar-char').value}
Last 5★ Character: ${document.getElementById('w-last5star').value}

Standard Banner Pity: ${document.getElementById('w-pity-std').value}

━━━━━━━━━━━━━━━━
RESOURCES
━━━━━━━━━━━━━━━━

Original Resin: ${document.getElementById('r-resin').value}/160
Fragile Resin: ${document.getElementById('r-fragile').value}

Mora: ${document.getElementById('r-mora').value}
Hero's Wit: ${document.getElementById('r-wit').value}
Mystic Enhancement Ore: ${document.getElementById('r-ore').value}
Sanctifying Essence: ${document.getElementById('r-se').value}
Sanctifying Unction: ${document.getElementById('r-su').value}
Dream Solvent: ${document.getElementById('r-solvent').value}
Crowns: ${document.getElementById('r-crowns').value}

━━━━━━━━━━━━━━━━
CURRENT PARTY
━━━━━━━━━━━━━━━━

1. ${document.getElementById('pt-1').value}
2. ${document.getElementById('pt-2').value}
3. ${document.getElementById('pt-3').value}
4. ${document.getElementById('pt-4').value}

Details: ${document.getElementById('pt-details').value}

━━━━━━━━━━━━━━━━
ROSTER
━━━━━━━━━━━━━━━━

Character | Lv | C | Weapon | Talent (Current -> Target) | Status
${rosterStr || 'No characters added.'}

━━━━━━━━━━━━━━━━
WEAPONS
━━━━━━━━━━━━━━━━

5★
${document.getElementById('wep-5star').value}

4★
${document.getElementById('wep-4star').value}

3★
${document.getElementById('wep-3star').value}

━━━━━━━━━━━━━━━━
ARTIFACT
━━━━━━━━━━━━━━━━

Current Domain: ${document.getElementById('art-domain').value}
Strongbox Target: ${document.getElementById('art-strongbox').value}
Desired Sets: ${document.getElementById('art-desired').value}
Artifact EXP Fodder: ${document.getElementById('art-fodder').value}

━━━━━━━━━━━━━━━━
EXPLORATION & SYSTEMS
━━━━━━━━━━━━━━━━

Mondstadt: ${document.getElementById('e-mond').value}%
Liyue: ${document.getElementById('e-liyue').value}%
Dragonspine: ${document.getElementById('e-drag').value}%
Inazuma: ${document.getElementById('e-ina').value}%
Enkanomiya: ${document.getElementById('e-enka').value}%
Chasm: ${document.getElementById('e-chasm').value}%
Sumeru: ${document.getElementById('e-sumeru').value}%
Fontaine: ${document.getElementById('e-font').value}%
Chenyu Vale: ${document.getElementById('e-chenyu').value}%
Remuria: ${document.getElementById('e-remuria').value}%
Natlan: ${document.getElementById('e-natlan').value}%
Nod Krai: ${document.getElementById('e-nodkrai').value}%
Snezhnaya: ${document.getElementById('e-snezhnaya').value}%

Adventure Handbook: ${document.getElementById('e-handbook').value}

━━━━━━━━━━━━━━━━
PROGRESSION
━━━━━━━━━━━━━━━━

Spiral Abyss: ${document.getElementById('end-abyss').value}
IT: ${document.getElementById('end-it').value}

Statue: ${document.getElementById('end-statue').value}

━━━━━━━━━━━━━━━━
WEEKLY
━━━━━━━━━━━━━━━━

Weekly Boss Discount: ${document.getElementById('w-disc').value}
Bosses Reasoning:
${document.getElementById('w-bosses').value}

Reputation: ${document.getElementById('w-rep').value}

━━━━━━━━━━━━━━━━
GOALS
━━━━━━━━━━━━━━━━

Current Goal: ${document.getElementById('g-current').value}
Medium Goal: ${document.getElementById('g-medium').value}
Long Goal: ${document.getElementById('g-long').value}`;

    const sec = document.getElementById('output-section');
    const area = document.getElementById('text-output');
    sec.style.display = 'block';
    area.value = promptText;
}

function copyReport() {
    const area = document.getElementById('text-output');
    if (!area.value) return alert("Generate prompt first!");
    navigator.clipboard.writeText(area.value);
    alert("Copied to clipboard!");
}

function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trackerData));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "genshin_master_state.json");
    dlAnchorElem.click();
}

function setupImport() {
    document.getElementById('importFile').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(event) {
            trackerData = JSON.parse(event.target.result);
            renderRoster();
            alert("State imported successfully!");
        };
        reader.readAsText(e.target.files[0]);
    });
}
