let appData = {
    account: { ar: 31, wl: 3, server: "Asia", birthday: "-", region: "Nod Krai", archon_quest: "Chapter I Act IV", story_quest: "-", world_quest: "-" },
    resources: { primo: 4699, genesis: 0, intertwined: 8, acquaint: 1, resin: 99, fragile: 22, mora: 841556, herowit: 37, mystic_ore: 100, dream_solvent: 0, crown: 0 },
    party: ["Traveler", "Xianling", "Kaeya", "Barbara"],
    roster: [],
    weapons: { star5: "None", star4: "Favonius Sword R2 Lv50\nFavonius Warbow R1 Lv50", star3: "Slingshot R4\nTTDS R4" },
    exploration: { mondstadt: "38%", liyue: "10%", inazuma: "0%", sumeru: "0%", fontaine: "0%", natlan: "0%" },
    progression: { abyss: "Floor 3 Chamber 3", statue: { mondstadt: "7/7", liyue: "5/5", sumeru: "1/7" } },
    weekly: { boss: { stormterror: false, andrius: false, childe: false }, reputation: { mondstadt: 3, liyue: 2 } },
    goals: { current: "Finish Liyue", medium: "Unlock Inazuma", long: "Nahida, Zhongli" },
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
    // Account
    appData.account.ar = parseInt(document.getElementById('ar').value) || 0;
    appData.account.wl = parseInt(document.getElementById('wl').value) || 0;
    appData.account.server = document.getElementById('server').value;
    appData.account.birthday = document.getElementById('birthday').value;
    appData.account.region = document.getElementById('current-region').value;
    appData.account.archon_quest = document.getElementById('archon-quest').value;
    appData.account.story_quest = document.getElementById('story-quest').value;
    appData.account.world_quest = document.getElementById('world-quest').value;

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
    appData.exploration.mondstadt = document.getElementById('exp-mondstadt').value;
    appData.exploration.liyue = document.getElementById('exp-liyue').value;
    appData.exploration.inazuma = document.getElementById('exp-inazuma').value;
    appData.exploration.sumeru = document.getElementById('exp-sumeru').value;
    appData.exploration.fontaine = document.getElementById('exp-fontaine').value;
    appData.exploration.natlan = document.getElementById('exp-natlan').value;

    appData.progression.abyss = document.getElementById('abyss').value;
    appData.progression.statue.mondstadt = document.getElementById('statue-mond').value;
    appData.progression.statue.liyue = document.getElementById('statue-liyue').value;
    appData.progression.statue.sumeru = document.getElementById('statue-sumeru').value;

    // Weekly
    appData.weekly.boss.stormterror = document.getElementById('wb-stormterror').checked;
    appData.weekly.boss.andrius = document.getElementById('wb-andrius').checked;
    appData.weekly.boss.childe = document.getElementById('wb-childe').checked;
    appData.weekly.reputation.mondstadt = parseInt(document.getElementById('rep-mondstadt').value) || 0;
    appData.weekly.reputation.liyue = parseInt(document.getElementById('rep-liyue').value) || 0;

    // Goals
    appData.goals.current = document.getElementById('goal-current').value;
    appData.goals.medium = document.getElementById('goal-medium').value;
    appData.goals.long = document.getElementById('goal-long').value;
}

function loadDataToUI() {
    // Account
    document.getElementById('ar').value = appData.account.ar;
    document.getElementById('wl').value = appData.account.wl;
    document.getElementById('server').value = appData.account.server;
    document.getElementById('birthday').value = appData.account.birthday;
    document.getElementById('current-region').value = appData.account.region;
    document.getElementById('archon-quest').value = appData.account.archon_quest;
    document.getElementById('story-quest').value = appData.account.story_quest;
    document.getElementById('world-quest').value = appData.account.world_quest;

    // Resources
    document.getElementById('primo').value = appData.resources.primo;
    document.getElementById('genesis').value = appData.resources.genesis;
    document.getElementById('intertwined').value = appData.resources.intertwined;
    document.getElementById('acquaint').value = appData.resources.acquaint;
    document.getElementById('resin').value = appData.resources.resin;
    document.getElementById('fragile').value = appData.resources.fragile;
    document.getElementById('mora').value = appData.resources.mora;
    document.getElementById('herowit').value = appData.resources.herowit;
    document.getElementById('mystic-ore').value = appData.resources.mystic_ore;
    document.getElementById('dream-solvent').value = appData.resources.dream_solvent;
    document.getElementById('crown').value = appData.resources.crown;

    // Party
    document.getElementById('team1').value = appData.party[0] || "";
    document.getElementById('team2').value = appData.party[1] || "";
    document.getElementById('team3').value = appData.party[2] || "";
    document.getElementById('team4').value = appData.party[3] || "";

    // Weapons
    document.getElementById('wpn-5star').value = appData.weapons.star5;
    document.getElementById('wpn-4star').value = appData.weapons.star4;
    document.getElementById('wpn-3star').value = appData.weapons.star3;

    // Exploration & Progression
    document.getElementById('exp-mondstadt').value = appData.exploration.mondstadt;
    document.getElementById('exp-liyue').value = appData.exploration.liyue;
    document.getElementById('exp-inazuma').value = appData.exploration.inazuma;
    document.getElementById('exp-sumeru').value = appData.exploration.sumeru;
    document.getElementById('exp-fontaine').value = appData.exploration.fontaine;
    document.getElementById('exp-natlan').value = appData.exploration.natlan;

    document.getElementById('abyss').value = appData.progression.abyss;
    document.getElementById('statue-mond').value = appData.progression.statue.mondstadt;
    document.getElementById('statue-liyue').value = appData.progression.statue.liyue;
    document.getElementById('statue-sumeru').value = appData.progression.statue.sumeru;

    // Weekly
    document.getElementById('wb-stormterror').checked = appData.weekly.boss.stormterror;
    document.getElementById('wb-andrius').checked = appData.weekly.boss.andrius;
    document.getElementById('wb-childe').checked = appData.weekly.boss.childe;
    document.getElementById('rep-mondstadt').value = appData.weekly.reputation.mondstadt;
    document.getElementById('rep-liyue').value = appData.weekly.reputation.liyue;

    // Goals
    document.getElementById('goal-current').value = appData.goals.current;
    document.getElementById('goal-medium').value = appData.goals.medium;
    document.getElementById('goal-long').value = appData.goals.long;

    renderRoster();
}

function addCharacter() {
    const name = document.getElementById('c-name').value;
    if (!name) return;

    appData.roster.push({
        name: name,
        level: parseInt(document.getElementById('c-level').value) || 1,
        constellation: document.getElementById('c-const').value || "C0",
        friendship: parseInt(document.getElementById('c-friend').value) || 1,
        weapon: document.getElementById('c-weapon').value || "-",
        talent: document.getElementById('c-talent').value || "1/1/1",
        artifact: document.getElementById('c-artifact').value || "Temporary"
    });

    document.getElementById('c-name').value = '';
    document.getElementById('c-weapon').value = '';
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
                <strong>${c.name}</strong> (Lv${c.level} ${c.constellation})<br>
                <span style="color:var(--text-muted)">Wpn: ${c.weapon} | Talent: ${c.talent}</span>
            </div>
            <button type="button" style="padding:2px 6px; color:#f38ba8;" onclick="removeCharacter(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
}

function generateReport() {
    updateDataFromUI();
    const acc = appData.account;
    const res = appData.resources;
    const exp = appData.exploration;
    const prog = appData.progression;
    const wkl = appData.weekly;

    let charStr = appData.roster.map(c => 
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
Current World Quest: ${acc.world_quest}

Current Region: ${acc.region}

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
CURRENT PARTY
━━━━━━━━━━━━━━━━

1. ${appData.party[0]}
2. ${appData.party[1]}
3. ${appData.party[2]}
4. ${appData.party[3]}

━━━━━━━━━━━━━━━━
CHARACTERS
━━━━━━━━━━━━━━━━

${charStr || 'None'}

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
STORY
━━━━━━━━━━━━━━━━

Archon Quest

${acc.archon_quest}

Story Quest

${acc.story_quest}

Hangout

None

━━━━━━━━━━━━━━━━
EXPLORATION
━━━━━━━━━━━━━━━━

Mondstadt

${exp.mondstadt}

Liyue

${exp.liyue}

Inazuma

${exp.inazuma}

Sumeru

${exp.sumeru}

Fontaine

${exp.fontaine}

Natlan

${exp.natlan}

━━━━━━━━━━━━━━━━
PROGRESSION
━━━━━━━━━━━━━━━━

Spiral Abyss

${prog.abyss}

Statue

Mondstadt ${prog.statue.mondstadt}

Liyue ${prog.statue.liyue}

Sumeru ${prog.statue.sumeru}

━━━━━━━━━━━━━━━━
WEEKLY
━━━━━━━━━━━━━━━━

Weekly Boss

${wkl.boss.stormterror ? '■' : '□'} Stormterror

${wkl.boss.andrius ? '■' : '□'} Andrius

${wkl.boss.childe ? '■' : '□'} Childe

Reputation

Mondstadt

${wkl.reputation.mondstadt}

Liyue

${wkl.reputation.liyue}

━━━━━━━━━━━━━━━━
GOALS
━━━━━━━━━━━━━━━━

Current Goal

${appData.goals.current}

Medium Goal

${appData.goals.medium}

Long Goal

${appData.goals.long}

━━━━━━━━━━━━━━━━
QUESTIONS
━━━━━━━━━━━━━━━━

Analyze

- Efficiency
- Mistakes
- Resin Priority
- Build Priority
- Story Priority
- Pull Recommendation
- Next Objective
- Medium Target
- Long Target`;

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
    alert("Report copied to clipboard!");
}

function exportJSON() {
    updateDataFromUI();
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}