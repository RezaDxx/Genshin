let appData = {
    account: { 
        ar: 31, wl: 3, server: "Asia", birthday: "-", region: "Nod Krai", 
        archon_quest: "Chapter I Act IV", story_quest: "-", 
        world_quest_count: 3, world_quest_important: "Aranyaka, Golden Slumber" 
    },
    wish: {
        pity_char: 0,
        guaranteed_char: "No",
        last_5star_char: "None",
        pity_standard: 0,
        last_5star_standard: "None"
    },
    resources: { 
        primo: 4699, genesis: 0, intertwined: 8, acquaint: 1, resin: 99, fragile: 22, mora: 841556, herowit: 37, mystic_ore: 100, dream_solvent: 0, crown: 0 
    },
    billets: {
        sword: "0 / 0",
        claymore: "0 / 0",
        polearm: "0 / 0",
        bow: "0 / 0",
        catalyst: "0 / 0"
    },
    party: ["Traveler", "Xiangling", "Kaeya", "Barbara"],
    partyDetails: [],
    roster: [],
    weapons: { star5: "None", star4: "Favonius Sword R2 Lv50\nFavonius Warbow R1 Lv50", star3: "Slingshot R4\nTTDS R4" },
    exploration: { mondstadt: "38%", liyue: "10%", dragonspine: "0%", inazuma: "0%", enkanomiya: "0%", chasm: "0%", sumeru: "0%", fontaine: "0%", chenyu: "0%", remuria: "0%", natlan: "0%", nodkrai: "0%" },
    progression: { abyss: "Floor 3 Chamber 3", statue: { mondstadt: "7/7", liyue: "5/5", inazuma: "0/10", sumeru: "1/7", fontaine: "0/10", natlan: "0/10" } },
    weekly: { 
        boss: { dvalin: false, andrius: false, childe: false, azhdaha: false, signora: false, raiden: false, scara: false, apep: false, whale: false, knave: false, natlan: false }, 
        reputation: { mondstadt: 3, liyue: 2, inazuma: 0, sumeru: 0, fontaine: 0, natlan: 0 } 
    },
    goals: { current: "Finish Liyue", medium: "Unlock Inazuma", long: "Nahida, Zhongli" },
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
    // Account
    appData.account.ar = parseInt(document.getElementById('ar').value) || 0;
    appData.account.wl = parseInt(document.getElementById('wl').value) || 0;
    appData.account.server = document.getElementById('server').value;
    appData.account.birthday = document.getElementById('birthday').value;
    appData.account.region = document.getElementById('current-region').value;
    appData.account.archon_quest = document.getElementById('archon-quest').value;
    appData.account.story_quest = document.getElementById('story-quest').value;
    appData.account.world_quest_count = parseInt(document.getElementById('world-quest-count').value) || 0;
    appData.account.world_quest_important = document.getElementById('world-quest-important').value;

    // Wish
    appData.wish.pity_char = parseInt(document.getElementById('pity-char').value) || 0;
    appData.wish.guaranteed_char = document.getElementById('guaranteed-char').value;
    appData.wish.last_5star_char = document.getElementById('last-5star-char').value || "None";
    appData.wish.pity_standard = parseInt(document.getElementById('pity-standard').value) || 0;
    appData.wish.last_5star_standard = document.getElementById('last-5star-standard').value || "None";

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
    appData.resources.dream_solvent = parseInt(document.getElementById('dream-solvent').value) || 0;
    appData.resources.crown = parseInt(document.getElementById('crown').value) || 0;

    // Billets
    appData.billets.sword = document.getElementById('billet-sword').value;
    appData.billets.claymore = document.getElementById('billet-claymore').value;
    appData.billets.polearm = document.getElementById('billet-polearm').value;
    appData.billets.bow = document.getElementById('billet-bow').value;
    appData.billets.catalyst = document.getElementById('billet-catalyst').value;

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

    // Exploration
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

    // Progression
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

    // Weekly Reputation
    const rep = appData.weekly.reputation;
    rep.mondstadt = parseInt(document.getElementById('rep-mondstadt').value) || 0;
    rep.liyue = parseInt(document.getElementById('rep-liyue').value) || 0;
    rep.inazuma = parseInt(document.getElementById('rep-inazuma').value) || 0;
    rep.sumeru = parseInt(document.getElementById('rep-sumeru').value) || 0;
    rep.fontaine = parseInt(document.getElementById('rep-fontaine').value) || 0;
    rep.natlan = parseInt(document.getElementById('rep-natlan').value) || 0;

    // Goals
    appData.goals.current = document.getElementById('goal-current').value;
    appData.goals.medium = document.getElementById('goal-medium').value;
    appData.goals.long = document.getElementById('goal-long').value;
}

function addPartyDetail() {
    const name = document.getElementById('cp-name').value;
    if (!name) return;

    const norm = document.getElementById('cp-t-norm').value || "1";
    const skill = document.getElementById('cp-t-skill').value || "1";
    const burst = document.getElementById('cp-t-burst').value || "1";

    appData.partyDetails.push({
        name: name,
        level: parseInt(document.getElementById('cp-level').value) || 1,
        constellation: document.getElementById('cp-const').value || "C0",
        friendship: parseInt(document.getElementById('cp-friend').value) || 1,
        weapon: document.getElementById('cp-weapon').value || "-",
        talent: `${norm} / ${skill} / ${burst}`,
        artifact: document.getElementById('cp-artifact').value || "Temporary"
    });

    document.getElementById('cp-name').value = '';
    renderPartyDetails();
}

function renderPartyDetails() {
    const list = document.getElementById('party-build-list');
    list.innerHTML = '';
    appData.partyDetails.forEach((c, index) => {
        const div = document.createElement('div');
        div.className = 'char-card';
        div.innerHTML = `
            <div>
                <strong>${c.name}</strong> (Lv${c.level} ${c.constellation})<br>
                <span style="color:var(--text-muted)">Wpn: ${c.weapon} | Talent: ${c.talent}</span>
            </div>
            <button type="button" style="padding:2px 6px; color:#f38ba8; border:none; background:none; cursor:pointer;" onclick="appData.partyDetails.splice(${index},1); renderPartyDetails();">✕ Delete</button>
        `;
        list.appendChild(div);
    });
}

function addCharacter() {
    const name = document.getElementById('c-name').value;
    if (!name) return;

    appData.roster.push({
        name: name,
        level: parseInt(document.getElementById('c-level').value) || 1,
        constellation: document.getElementById('c-const').value || "C0"
    });

    document.getElementById('c-name').value = '';
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
                <strong>${c.name}</strong> Lv${c.level} ${c.constellation}
            </div>
            <button type="button" style="padding:2px 6px; color:#f38ba8; border:none; background:none; cursor:pointer;" onclick="appData.roster.splice(${index},1); renderRoster();">✕ Delete</button>
        `;
        list.appendChild(div);
    });
}

function generateReport() {
    updateDataFromUI();
    const acc = appData.account;
    const wsh = appData.wish;
    const res = appData.resources;
    const blt = appData.billets;
    const exp = appData.exploration;
    const prog = appData.progression;
    const wkl = appData.weekly;

    let rosterStr = appData.roster.map(c => `${c.name} Lv${c.level} ${c.constellation}`).join('\n');

    let partyStr = appData.partyDetails.map(c => 
`${c.name}
Lv${c.level}
${c.constellation}
Friendship ${c.friendship}

Weapon
${c.weapon}

Talent
${c.talent}

Artifact
${c.artifact}
`).join('\n---------\n\n');

    const prompt = `You are my permanent Genshin guide.

Playstyle
- Solo
- Full F2P
- Story First
- Long-term account
- No spoilers
- No Weapon Banner
- No Artifact farming before AR45
- Save Fragile Resin until AR45

━━━━━━━━━━━━━━━━
ACCOUNT
━━━━━━━━━━━━━━━━

AR: ${acc.ar}
WL: ${acc.wl}

Server: ${acc.server}
Birthday: ${acc.birthday}

Current Archon Quest: ${acc.archon_quest}
Current Story Quest: ${acc.story_quest}
Active World Quest Count: ${acc.world_quest_count}
Important World Quests: ${acc.world_quest_important}

Current Region: ${acc.region}

━━━━━━━━━━━━━━━━
WISH
━━━━━━━━━━━━━━━━

Character Banner Pity: ${wsh.pity_char}
Character Banner Guaranteed: ${wsh.guaranteed_char}
Last 5★ Character: ${wsh.last_5star_char}
Standard Banner Pity: ${wsh.pity_standard}
Last 5★ Standard Character: ${wsh.last_5star_standard}

━━━━━━━━━━━━━━━━
RESOURCES
━━━━━━━━━━━━━━━━

Primogem: ${res.primo}
Genesis Crystal: ${res.genesis}

Intertwined Fate: ${res.intertwined}
Acquaint Fate: ${res.acquaint}

Original Resin: ${res.resin}
Fragile Resin: ${res.fragile}

Mora: ${res.mora}
Hero's Wit: ${res.herowit}
Mystic Ore: ${res.mystic_ore}

Dream Solvent: ${res.dream_solvent}
Crown: ${res.crown}

━━━━━━━━━━━━━━━━
BILLETS (Northlander / Midlander)
━━━━━━━━━━━━━━━━

Sword Billet: ${blt.sword}
Claymore Billet: ${blt.claymore}
Polearm Billet: ${blt.polearm}
Bow Billet: ${blt.bow}
Catalyst Billet: ${blt.catalyst}

━━━━━━━━━━━━━━━━
CURRENT PARTY (Detailed Build)
━━━━━━━━━━━━━━━━

1. ${appData.party[0]}
2. ${appData.party[1]}
3. ${appData.party[2]}
4. ${appData.party[3]}

${partyStr ? 'Details:\n' + partyStr : ''}

━━━━━━━━━━━━━━━━
ROSTER
━━━━━━━━━━━━━━━━

${rosterStr || 'None'}

━━━━━━━━━━━━━━━━
WEAPONS
━━━━━━━━━━━━━━━━

5★

${appData.weapons.star5 || 'None'}

4★

${appData.weapons.star4 || 'None'}

3★

${appData.weapons.star3 || 'None'}

━━━━━━━━━━━━━━━━
EXPLORATION
━━━━━━━━━━━━━━━━

Mondstadt: ${exp.mondstadt}
Liyue: ${exp.liyue}
Dragonspine: ${exp.dragonspine}
Inazuma: ${exp.inazuma}
Enkanomiya: ${exp.enkanomiya}
Chasm (Underground): ${exp.chasm}
Sumeru: ${exp.sumeru}
Fontaine: ${exp.fontaine}
Chenyu Vale: ${exp.chenyu}
Remuria: ${exp.remuria}
Natlan: ${exp.natlan}
Nod Krai: ${exp.nodkrai}

━━━━━━━━━━━━━━━━
PROGRESSION
━━━━━━━━━━━━━━━━

Spiral Abyss

${prog.abyss}

Statue

Mondstadt ${prog.statue.mondstadt}
Liyue ${prog.statue.liyue}
Inazuma ${prog.statue.inazuma}
Sumeru ${prog.statue.sumeru}
Fontaine ${prog.statue.fontaine}
Natlan ${prog.statue.natlan}

━━━━━━━━━━━━━━━━
WEEKLY
━━━━━━━━━━━━━━━━

Weekly Boss

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

Reputation

Mondstadt: ${wkl.reputation.mondstadt}
Liyue: ${wkl.reputation.liyue}
Inazuma: ${wkl.reputation.inazuma}
Sumeru: ${wkl.reputation.sumeru}
Fontaine: ${wkl.reputation.fontaine}
Natlan: ${wkl.reputation.natlan}

━━━━━━━━━━━━━━━━
GOALS
━━━━━━━━━━━━━━━━

Current Goal

${appData.goals.current}

Medium Goal

${appData.goals.medium}

Long Goal

${appData.goals.long}`;

    showOutput(prompt);
}

function logSession() {
    updateDataFromUI();
    appData.history.push(JSON.parse(JSON.stringify(appData)));
    alert("Session saved!");
}

function compareSessions() {
    if (appData.history.length < 2) {
        showOutput("Save at least 2 sessions to compare.");
        return;
    }
    const prev = appData.history[appData.history.length - 2];
    const curr = appData.history[appData.history.length - 1];

    let diff = `=== COMPARISON ===\n`;
    diff += `AR: ${prev.account.ar} → ${curr.account.ar}\n`;
    diff += `Primogems: ${prev.resources.primo} → ${curr.resources.primo}\n`;
    diff += `Char Pity: ${prev.wish.pity_char} → ${curr.wish.pity_char}\n`;

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
    alert("Report copied to clipboard!");
}

function setupImportListener() {
    document.getElementById('importFile').addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(event) {
            appData = JSON.parse(event.target.result);
            alert("Data loaded successfully!");
        };
        reader.readAsText(e.target.files[0]);
    });
}

function exportJSON() {
    updateDataFromUI();
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'genshin_account_state.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}