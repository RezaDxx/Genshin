let appData = {
    dashboard: {
        main_mission: "Continue Archon Quest: Chapter II Act I",
        priority_build: "1. Fischl Skill -> Lv6\n2. Tighnari Ascension\n3. Spend Original Resin",
        warnings: "⚠ Original Resin almost full\n⚠ Mora below 200k",
        next_pull: "SAVE - Target: Nahida"
    },
    account: { 
        ar: 31, wl: 3, server: "Asia", birthday: "-", region: "Nod Krai", 
        archon_quest: "Chapter I Act IV",
        rules: "✔ Story First | ✔ No Quick Start | ✔ No Weapon Banner | ✔ No Artifact Farming before AR45 | ✔ Save Fragile Resin | ✔ Focus only 4 Characters | ✔ Skip spoilers | ✔ No exploration 100% before story"
    },
    wish: { char_pity: 15, char_guaranteed: "No", wpn_pity: 0, std_pity: 42, wishlist: "Nahida (5★) - Priority 1\nZhongli (5★) - Priority 2" },
    daily: { comms: true, resin: true, weekly: false, event: true, session_log: "AR32->33 | +400 Primo | Finished Liyue | Unlocked Inazuma" },
    resources: { primo: 4699, genesis: 0, intertwined: 8, acquaint: 1, resin: 99, fragile: 22, mora: 841556, herowit: 37, mystic_ore: 100 },
    inventory: { boss_mats: "Majestic Hooked Beak: 21", talent_books: "Admonition: 3 Teachings, 7 Guides, 0 Philosophies", billets: "Sword: 2 | Bow: 1 | Claymore: 0 | Polearm: 1 | Catalyst: 0", handbook: "Talent: Open | Weapon: Open | Boss: Need" },
    party: ["Traveler", "Xiangling", "Kaeya", "Barbara"],
    roster: [],
    weapons: { star5: "None", star4: "Favonius Sword R2 Lv50\nFavonius Warbow R1 Lv50", star3: "Slingshot R4\nTTDS R4" },
    exploration: { mondstadt: "38%", liyue: "10%", dragonspine: "0%", inazuma: "0%", enkanomiya: "0%", chasm: "0%", sumeru: "0%", fontaine: "0%", chenyu: "0%", remuria: "0%", natlan: "0%", nodkrai: "0%" },
    progression: { abyss: "Floor 3 Chamber 3", statue: { mondstadt: "7/7", liyue: "5/5", inazuma: "0/10", sumeru: "1/7", fontaine: "0/10", natlan: "0/10" } },
    weekly: { boss: { dvalin: false, andrius: false, childe: false, azhdaha: false, signora: false, raiden: false, scara: false, apep: false, whale: false, knave: false, natlan: false } },
    history: []
};

document.addEventListener('DOMContentLoaded', () => {
    setupImportListener();
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

function updateDataFromUI() {
    // Dashboard
    appData.dashboard.main_mission = document.getElementById('m-main').value;
    appData.dashboard.priority_build = document.getElementById('m-priority').value;
    appData.dashboard.warnings = document.getElementById('m-warnings').value;
    appData.dashboard.next_pull = document.getElementById('m-pull').value;

    // Account
    appData.account.ar = parseInt(document.getElementById('ar').value) || 0;
    appData.account.wl = parseInt(document.getElementById('wl').value) || 0;
    appData.account.server = document.getElementById('server').value;
    appData.account.birthday = document.getElementById('birthday').value;
    appData.account.region = document.getElementById('current-region').value;
    appData.account.archon_quest = document.getElementById('archon-quest').value;
    appData.account.rules = document.getElementById('acc-rules').value;

    // Wish
    appData.wish.char_pity = parseInt(document.getElementById('w-char-pity').value) || 0;
    appData.wish.char_guaranteed = document.getElementById('w-char-guaranteed').value;
    appData.wish.wpn_pity = parseInt(document.getElementById('w-wpn-pity').value) || 0;
    appData.wish.std_pity = parseInt(document.getElementById('w-std-pity').value) || 0;
    appData.wish.wishlist = document.getElementById('wishlist').value;

    // Daily
    appData.daily.comms = document.getElementById('d-daily').checked;
    appData.daily.resin = document.getElementById('d-resin').checked;
    appData.daily.weekly = document.getElementById('d-weekly').checked;
    appData.daily.event = document.getElementById('d-event').checked;
    appData.daily.session_log = document.getElementById('session-log').value;

    // Resources
    appData.resources.primo = parseInt(document.getElementById('primo').value) || 0;
    appData.resources.genesis = parseInt(document.getElementById('genesis').value) || 0;
    appData.resources.intertwined = parseInt(document.getElementById('intertwined').value) || 0;
    appData.resources.acquaint = parseInt(document.getElementById('acquaint').value) || 0;
    appData.resources.resin = parseInt(document.getElementById('resin').value) || 0;
    appData.resources.fragile = parseInt(document.getElementById('fragile').value) || 0;
    appData.resources.mora = parseInt(document.getElementById('mora').value) || 0;
    appData.resources.herowit = parseInt(document.getElementById('herowit').value) || 0;
    appData.resources.mystic_ore = parseInt(document.getElementById('mystic-ore').value) || 0;

    // Inventory
    appData.inventory.boss_mats = document.getElementById('inv-boss-mats').value;
    appData.inventory.talent_books = document.getElementById('inv-talent-books').value;
    appData.inventory.billets = document.getElementById('inv-billets').value;
    appData.inventory.handbook = document.getElementById('handbook-domains').value;

    // Party
    appData.party = [
        document.getElementById('team1').value,
        document.getElementById('team2').value,
        document.getElementById('team3').value,
        document.getElementById('team4').value
    ];

    // Weapons
    appData.weapons.star5 = document.getElementById('wpn-5star').value;
    appData.weapons.star4 = document.getElementById('wpn-4star').value;
    appData.weapons.star3 = document.getElementById('wpn-3star').value;

    // Exploration & Progression
    const exp = appData.exploration;
    exp.mondstadt = document.getElementById('exp-mondstadt').value;
    exp.liyue = document.getElementById('exp-liyue').value;
    exp.dragonspine = document.getElementById('exp-dragonspine').value;
    exp.inazuma = document.getElementById('exp-inazuma').value;
    exp.enkanomiya = document.getElementById('exp-enkanomiya').value;
    exp.chasm = document.getElementById('exp-chasm').value;
    exp.sumeru = document.getElementById('exp-sumeru').value;
    exp.fontaine = document.getElementById('exp-fontaine').value;
    exp.chenyu = document.getElementById('exp-chenyu').value;
    exp.remuria = document.getElementById('exp-remuria').value;
    exp.natlan = document.getElementById('exp-natlan').value;
    exp.nodkrai = document.getElementById('exp-nodkrai').value;

    appData.progression.abyss = document.getElementById('abyss').value;
    appData.progression.statue.mondstadt = document.getElementById('statue-mond').value;
    appData.progression.statue.liyue = document.getElementById('statue-liyue').value;
    appData.progression.statue.inazuma = document.getElementById('statue-inazuma').value;
    appData.progression.statue.sumeru = document.getElementById('statue-sumeru').value;
    appData.progression.statue.fontaine = document.getElementById('statue-fontaine').value;
    appData.progression.statue.natlan = document.getElementById('statue-natlan').value;

    // Weekly Bosses
    const wb = appData.weekly.boss;
    wb.dvalin = document.getElementById('wb-dvalin').checked;
    wb.andrius = document.getElementById('wb-andrius').checked;
    wb.childe = document.getElementById('wb-childe').checked;
    wb.azhdaha = document.getElementById('wb-azhdaha').checked;
    wb.signora = document.getElementById('wb-signora').checked;
    wb.raiden = document.getElementById('wb-raiden').checked;
    wb.scara = document.getElementById('wb-scara').checked;
    wb.apep = document.getElementById('wb-apep').checked;
    wb.whale = document.getElementById('wb-whale').checked;
    wb.knave = document.getElementById('wb-knave').checked;
    wb.natlan = document.getElementById('wb-natlan').checked;
}

function addCharacter() {
    const name = document.getElementById('c-name').value;
    if (!name) return;

    // Check if character already exists -> Update
    const existingIndex = appData.roster.findIndex(c => c.name.toLowerCase() === name.toLowerCase());

    const charObj = {
        name: name,
        level: document.getElementById('c-level').value || "50/60",
        exp: document.getElementById('c-exp').value || "0 / 0",
        constellation: document.getElementById('c-const').value || "C0",
        weapon: document.getElementById('c-weapon').value || "-",
        talent: document.getElementById('c-talent').value || "1 / 1 / 1",
        artifact: document.getElementById('c-artifact').value || "Temporary"
    };

    if (existingIndex >= 0) {
        appData.roster[existingIndex] = charObj;
    } else {
        appData.roster.push(charObj);
    }

    document.getElementById('c-name').value = '';
    renderRoster();
}

function removeCharacter(index) {
    appData.roster.splice(index, 1);
    renderRoster();
}

function renderRoster() {
    const list = document.getElementById('roster-list');
    list.innerHTML = '';
    appData.roster.forEach((c, index) => {
        const div = document.createElement('div');
        div.className = 'char-card';
        div.innerHTML = `
            <div>
                <strong>${c.name}</strong> (Lv${c.level} ${c.constellation}) | EXP: ${c.exp}<br>
                <span style="color:var(--text-muted)">Wpn: ${c.weapon} | Talent (N/S/B): ${c.talent}</span><br>
                <span style="color:var(--accent)">Artifact: ${c.artifact}</span>
            </div>
            <button type="button" style="padding:2px 6px; color:#f38ba8; border:none; background:none; cursor:pointer;" onclick="removeCharacter(${index})">✕ Delete</button>
        `;
        list.appendChild(div);
    });
}

function generateReport() {
    updateDataFromUI();
    const dash = appData.dashboard;
    const acc = appData.account;
    const wish = appData.wish;
    const dly = appData.daily;
    const res = appData.resources;
    const inv = appData.inventory;
    const exp = appData.exploration;
    const prog = appData.progression;
    const wkl = appData.weekly;

    let charStr = appData.roster.map(c => 
`${c.name}
Lv${c.level} (EXP: ${c.exp})
${c.constellation}

Weapon: ${c.weapon}
Talent (N / S / B): ${c.talent}
Artifact: ${c.artifact}
`).join('\n---------\n\n');

    const prompt = `You are my permanent Genshin guide.

━━━━━━━━━━━━━━━━━━
TODAY'S MISSION & DASHBOARD
━━━━━━━━━━━━━━━━━━

🎯 Main Mission
${dash.main_mission}

Priority Build
${dash.priority_build}

Warnings
${dash.warnings}

Next Pull
${dash.next_pull}

━━━━━━━━━━━━━━━━━━
LAST SESSION LOG
━━━━━━━━━━━━━━━━━━

${dly.session_log || 'None'}

━━━━━━━━━━━━━━━━━━
ACCOUNT & RULES
━━━━━━━━━━━━━━━━━━

AR: ${acc.ar} | WL: ${acc.wl} | Server: ${acc.server}
Current Region: ${acc.region}
Current Archon Quest: ${acc.archon_quest}

Rules:
${acc.rules}

━━━━━━━━━━━━━━━━━━
WISH & PITY
━━━━━━━━━━━━━━━━━━

Character Banner
Pity: ${wish.char_pity}
Guaranteed: ${wish.char_guaranteed}

Weapon Banner
Pity: ${wish.wpn_pity}

Standard Banner
Pity: ${wish.std_pity}

Wishlist / Priority Pull:
${wish.wishlist}

━━━━━━━━━━━━━━━━━━
DAILY & HANDBOOK STATUS
━━━━━━━━━━━━━━━━━━

Daily Comms: ${dly.comms ? '☑' : '☒'}
Resin Spent: ${dly.resin ? '☑' : '☒'}
Weekly Boss: ${dly.weekly ? '☑' : '☒'}
Events: ${dly.event ? '☑' : '☒'}

Domains Today:
${inv.handbook}

━━━━━━━━━━━━━━━━━━
RESOURCES & INVENTORY
━━━━━━━━━━━━━━━━━━

Primogem: ${res.primo} | Genesis: ${res.genesis}
Intertwined Fate: ${res.intertwined} | Acquaint Fate: ${res.acquaint}
Original Resin: ${res.resin} | Fragile Resin: ${res.fragile}
Mora: ${res.mora} | Hero's Wit: ${res.herowit} | Mystic Ore: ${res.mystic_ore}

Boss Materials:
${inv.boss_mats}

Talent Books:
${inv.talent_books}

Billets:
${inv.billets}

━━━━━━━━━━━━━━━━━━
CURRENT PARTY
━━━━━━━━━━━━━━━━━━

1. ${appData.party[0]}
2. ${appData.party[1]}
3. ${appData.party[2]}
4. ${appData.party[3]}

━━━━━━━━━━━━━━━━━━
CHARACTER DATABASE (ALL CHARACTERS)
━━━━━━━━━━━━━━━━━━

${charStr || 'None'}

━━━━━━━━━━━━━━━━━━
WEAPONS
━━━━━━━━━━━━━━━━━━

5★: ${appData.weapons.star5 || 'None'}
4★: ${appData.weapons.star4 || 'None'}
3★: ${appData.weapons.star3 || 'None'}

━━━━━━━━━━━━━━━━━━
EXPLORATION & PROGRESSION
━━━━━━━━━━━━━━━━━━

Mondstadt: ${exp.mondstadt} | Liyue: ${exp.liyue} | Dragonspine: ${exp.dragonspine}
Inazuma: ${exp.inazuma} | Enkanomiya: ${exp.enkanomiya} | Chasm: ${exp.chasm}
Sumeru: ${exp.sumeru} | Fontaine: ${exp.fontaine} | Chenyu Vale: ${exp.chenyu}
Remuria: ${exp.remuria} | Natlan: ${exp.natlan} | Nod Krai: ${exp.nodkrai}

Spiral Abyss: ${prog.abyss}
Statues: Mond ${prog.statue.mondstadt} | Liyue ${prog.statue.liyue} | Inazuma ${prog.statue.inazuma} | Sumeru ${prog.statue.sumeru} | Fontaine ${prog.statue.fontaine} | Natlan ${prog.statue.natlan}

━━━━━━━━━━━━━━━━━━
WEEKLY BOSSES
━━━━━━━━━━━━━━━━━━

${wkl.boss.dvalin ? '■' : '□'} Stormterror (Dvalin)
${wkl.boss.andrius ? '■' : '□'} Wolf (Andrius)
${wkl.boss.childe ? '■' : '□'} Childe
${wkl.boss.azhdaha ? '■' : '□'} Azhdaha
${wkl.boss.signora ? '■' : '□'} La Signora
${wkl.boss.raiden ? '■' : '□'} Magatsu Mitake Narukami
${wkl.boss.scara ? '■' : '□'} Shouki no Kami
${wkl.boss.apep ? '■' : '□'} Guardian of Apep's Oasis
${wkl.boss.whale ? '■' : '□'} All-Devouring Narwhal
${wkl.boss.knave ? '■' : '□'} The Knave
${wkl.boss.natlan ? '■' : '□'} Natlan Boss

━━━━━━━━━━━━━━━━━━
QUESTIONS FOR AI GUIDE
━━━━━━━━━━━━━━━━━━

Analyze:
1. Validate Mission & Priorities based on Resin/Materials today.
2. Evaluate Wish readiness for Wishlist targets based on current Pity + Primogems.
3. Recommend exact Resin spent for today.
4. Provide immediate Next Objective.`;

    showOutput(prompt);
}

function logSession() {
    updateDataFromUI();
    appData.history.push(JSON.parse(JSON.stringify(appData)));
    alert("Session saved to local history!");
}

function compareSessions() {
    if (appData.history.length < 2) {
        showOutput("Save at least 2 sessions to run comparison.");
        return;
    }
    const prev = appData.history[appData.history.length - 2];
    const curr = appData.history[appData.history.length - 1];

    let diff = `=== SESSION COMPARISON ===\n`;
    diff += `AR: ${prev.account.ar} → ${curr.account.ar} (${(curr.account.ar - prev.account.ar) >= 0 ? '+' : ''}${curr.account.ar - prev.account.ar})\n`;
    diff += `Primogems: ${prev.resources.primo} → ${curr.resources.primo} (${(curr.resources.primo - prev.resources.primo) >= 0 ? '+' : ''}${curr.resources.primo - prev.resources.primo})\n`;
    diff += `Char Banner Pity: ${prev.wish.char_pity} → ${curr.wish.char_pity}\n`;
    diff += `Archon Quest: ${prev.account.archon_quest} → ${curr.account.archon_quest}\n`;

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
    if (!area.value) return alert("Generate report first!");
    navigator.clipboard.writeText(area.value);
    alert("Save file report copied to clipboard!");
}

// Auto-Migration untuk file JSON lama
function setupImportListener() {
    document.getElementById('importFile').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                // Schema Migration: Menggabungkan data lama dengan struktur baru
                appData = mergeDeep(appData, imported);
                loadDataToUI();
                alert("JSON imported successfully with updated schema!");
            } catch (err) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(e.target.files[0]);
    });
}

function mergeDeep(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], mergeDeep(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

function loadDataToUI() {
    // Sync Dashboard
    if(appData.dashboard) {
        document.getElementById('m-main').value = appData.dashboard.main_mission || '';
        document.getElementById('m-priority').value = appData.dashboard.priority_build || '';
        document.getElementById('m-warnings').value = appData.dashboard.warnings || '';
        document.getElementById('m-pull').value = appData.dashboard.next_pull || '';
    }
    
    // Sync Wish
    if(appData.wish) {
        document.getElementById('w-char-pity').value = appData.wish.char_pity || 0;
        document.getElementById('w-char-guaranteed').value = appData.wish.char_guaranteed || 'No';
        document.getElementById('w-wpn-pity').value = appData.wish.wpn_pity || 0;
        document.getElementById('w-std-pity').value = appData.wish.std_pity || 0;
        document.getElementById('wishlist').value = appData.wish.wishlist || '';
    }

    // Sync Account
    document.getElementById('ar').value = appData.account.ar || 31;
    document.getElementById('wl').value = appData.account.wl || 3;
    document.getElementById('server').value = appData.account.server || 'Asia';
    document.getElementById('birthday').value = appData.account.birthday || '-';
    document.getElementById('current-region').value = appData.account.region || 'Nod Krai';
    document.getElementById('archon-quest').value = appData.account.archon_quest || '';
    document.getElementById('acc-rules').value = appData.account.rules || '';

    // Sync Resources
    document.getElementById('primo').value = appData.resources.primo || 0;
    document.getElementById('genesis').value = appData.resources.genesis || 0;
    document.getElementById('intertwined').value = appData.resources.intertwined || 0;
    document.getElementById('acquaint').value = appData.resources.acquaint || 0;
    document.getElementById('resin').value = appData.resources.resin || 0;
    document.getElementById('fragile').value = appData.resources.fragile || 0;
    document.getElementById('mora').value = appData.resources.mora || 0;
    document.getElementById('herowit').value = appData.resources.herowit || 0;
    document.getElementById('mystic-ore').value = appData.resources.mystic_ore || 0;

    // Sync Inventory
    if(appData.inventory) {
        document.getElementById('inv-boss-mats').value = appData.inventory.boss_mats || '';
        document.getElementById('inv-talent-books').value = appData.inventory.talent_books || '';
        document.getElementById('inv-billets').value = appData.inventory.billets || '';
        document.getElementById('handbook-domains').value = appData.inventory.handbook || '';
    }

    renderRoster();
}

function exportJSON() {
    updateDataFromUI();
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'genshin_savefile.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}