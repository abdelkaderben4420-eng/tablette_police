const data = JSON.parse(JSON.stringify(window.MDT_DATA));
let currentAgent = null;

const $ = (id) => document.getElementById(id);

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

function switchView(view){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.nav-btn[data-view="${view}"]`).classList.add('active');
  $(`view-${view}`).classList.add('active');

  const titles = {
    home:["Tableau de bord opérationnel","Contrôle rapide des opérations, unités et alertes actives."],
    agents:["Hiérarchie police","Vue complète des grades, rôles et autorisations."],
    citizens:["Base citoyenne","Recherches et consultation des casiers en temps réel."],
    vehicles:["Fichier véhicules","Plaques, modèles, propriétaires et statuts."],
    reports:["Rapports d'intervention","Archive complète des comptes-rendus terrain."],
    robberies:["Braquages reliés","Suivi opérationnel des alertes et liens suspects."],
    fines:["Amendes & points","Gestion rapide des sanctions administratives."],
    wanted:["Avis de recherche","Suivi des individus activement recherchés."]
  };
  $('pageTitle').textContent = titles[view][0];
  $('pageSubtitle').textContent = titles[view][1];
}

function initials(prenom, nom){
  return `${prenom[0] || ''}${nom[0] || ''}`.toUpperCase();
}

function formatTags(tags){
  return tags.map(tag => `<span class="tag ${tag.color}">${tag.text}</span>`).join('');
}

function renderHome(){
  $('statAgents').textContent = data.agents.length;
  $('statRobberies').textContent = data.robberies.length;
  $('statReports').textContent = data.reports.length;
  $('statWanted').textContent = data.wanted.length;

  $('homeRobberies').innerHTML = data.robberies.map(r => `
    <div class="list-item">
      <h4>${r.type} • ${r.location}</h4>
      <p>${r.details}</p>
      <div class="kv"><span>${r.time}</span><span>${r.priority}</span></div>
      ${formatTags([{text:r.link, color:'red'}])}
    </div>
  `).join('');

  $('homeHierarchy').innerHTML = data.agents.map(a => `
    <div class="list-item">
      <h4>${a.prenom} ${a.nom}</h4>
      <p>${a.grade} • ${a.matricule}</p>
      ${formatTags([{text:a.status, color:'green'}])}
    </div>
  `).join('');
}

function renderAgents(){
  $('agentsList').innerHTML = data.hierarchy.map(h => `
    <div class="card">
      <h4>${h.grade}</h4>
      <p>${h.role}</p>
      <div class="small">${h.rights}</div>
    </div>
  `).join('');
}

function renderCitizens(query=''){
  const list = data.citizens.filter(c => c.nom.toLowerCase().includes(query.toLowerCase()));
  $('citizensList').innerHTML = list.map(c => `
    <div class="card">
      <h4>${c.nom}</h4>
      <p>${c.casier}</p>
      <div class="kv"><span>Points</span><b>${c.points}</b></div>
      <div class="kv"><span>Amendes</span><b>${c.amendes}$</b></div>
      ${formatTags([
        {text:`GAV : ${c.gav}`, color:c.gav === 'Oui' ? 'red' : 'green'},
        {text:`Danger : ${c.danger}`, color:'blue'}
      ])}
    </div>
  `).join('') || `<div class="card"><h4>Aucun résultat</h4><p>Aucun citoyen trouvé.</p></div>`;
}

function renderVehicles(query=''){
  const list = data.vehicles.filter(v => 
    v.plaque.toLowerCase().includes(query.toLowerCase()) ||
    v.modele.toLowerCase().includes(query.toLowerCase()) ||
    v.proprietaire.toLowerCase().includes(query.toLowerCase())
  );
  $('vehiclesList').innerHTML = list.map(v => `
    <div class="card">
      <h4>${v.modele}</h4>
      <p>Plaque : ${v.plaque}</p>
      <div class="kv"><span>Propriétaire</span><b>${v.proprietaire}</b></div>
      ${formatTags([{text:v.statut, color:v.statut === 'Signalé' ? 'red' : 'blue'}])}
    </div>
  `).join('') || `<div class="card"><h4>Aucun résultat</h4><p>Aucun véhicule trouvé.</p></div>`;
}

function renderReports(){
  $('reportsList').innerHTML = data.reports.map(r => `
    <div class="list-item">
      <h4>${r.title}</h4>
      <p>${r.content}</p>
      <div class="kv"><span>Cible : ${r.target}</span><span>${r.author} • ${r.date}</span></div>
    </div>
  `).join('');
}

function renderRobberies(){
  $('robberiesList').innerHTML = data.robberies.map(r => `
    <div class="list-item">
      <h4>${r.type} • ${r.location}</h4>
      <p>${r.details}</p>
      ${formatTags([
        {text:`Priorité : ${r.priority}`, color:'red'},
        {text:r.link, color:'blue'}
      ])}
      <div class="kv"><span>Créé</span><span>${r.time}</span></div>
    </div>
  `).join('');
}

function renderFines(){
  $('finesList').innerHTML = data.fines.map(f => `
    <div class="list-item">
      <h4>${f.citizen}</h4>
      <p>${f.reason}</p>
      <div class="kv"><span>${f.amount}$ • ${f.points} point(s)</span><span>${f.author} • ${f.date}</span></div>
    </div>
  `).join('');
}

function renderWanted(){
  $('wantedList').innerHTML = data.wanted.map(w => `
    <div class="list-item">
      <h4>${w.name}</h4>
      <p>${w.reason}</p>
      ${formatTags([{text:`Dangerosité : ${w.level}`, color:'red'}])}
      <div class="kv"><span>Émis par ${w.author}</span><span>${w.date}</span></div>
    </div>
  `).join('');
}

function refreshAll(){
  renderHome();
  renderAgents();
  renderCitizens();
  renderVehicles();
  renderReports();
  renderRobberies();
  renderFines();
  renderWanted();
}

function applyPermissions(){
  const perms = currentAgent.permissions.includes('all') ? ['all'] : currentAgent.permissions;
  const lockMap = {
    agents:'hierarchie',
    fines:'amendes',
    wanted:'wanted'
  };
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const view = btn.dataset.view;
    if(lockMap[view]){
      const allowed = perms.includes('all') || perms.includes(lockMap[view]);
      btn.style.display = allowed ? '' : 'none';
    } else {
      btn.style.display = '';
    }
  });
}

$('loginBtn').addEventListener('click', () => {
  const username = $('loginUsername').value.trim().toLowerCase();
  const password = $('loginPassword').value.trim();
  const found = data.agents.find(a => a.username === username && a.password === password);
  if(!found){
    $('loginError').textContent = "Identifiants invalides. Vérifie puis recommence.";
    return;
  }
  $('loginError').textContent = "";
  currentAgent = found;
  $('agentAvatar').textContent = initials(found.prenom, found.nom);
  $('agentName').textContent = `${found.prenom} ${found.nom}`;
  $('agentRank').textContent = found.grade;
  $('agentMatricule').textContent = `Matricule : ${found.matricule}`;
  $('permissionLabel').textContent = found.permissions.includes('all') ? "Accès total" : `Niveau ${found.grade}`;
  applyPermissions();
  showScreen('dashboardScreen');
  switchView('home');
  refreshAll();
});

$('logoutBtn').addEventListener('click', () => {
  currentAgent = null;
  showScreen('loginScreen');
});

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

$('citizenSearch').addEventListener('input', e => renderCitizens(e.target.value));
$('vehicleSearch').addEventListener('input', e => renderVehicles(e.target.value));

$('reportForm').addEventListener('submit', e => {
  e.preventDefault();
  data.reports.unshift({
    title:$('reportTitle').value.trim(),
    target:$('reportTarget').value.trim(),
    content:$('reportContent').value.trim(),
    author:`${currentAgent.prenom} ${currentAgent.nom}`,
    date:new Date().toLocaleString('fr-FR')
  });
  e.target.reset();
  renderReports();
  renderHome();
});

$('robberyForm').addEventListener('submit', e => {
  e.preventDefault();
  data.robberies.unshift({
    location:$('robberyLocation').value.trim(),
    type:$('robberyType').value,
    priority:$('robberyPriority').value,
    details:$('robberyDetails').value.trim(),
    link:"Alerte liée à l'intervention active",
    time:"À l'instant"
  });
  e.target.reset();
  renderRobberies();
  renderHome();
});

$('fineForm').addEventListener('submit', e => {
  e.preventDefault();
  const citizen = $('fineCitizen').value.trim();
  const amount = Number($('fineAmount').value);
  const points = Number($('finePoints').value);
  const reason = $('fineReason').value.trim();

  data.fines.unshift({
    citizen, amount, points, reason,
    author:`${currentAgent.prenom} ${currentAgent.nom}`,
    date:new Date().toLocaleString('fr-FR')
  });

  const c = data.citizens.find(x => x.nom.toLowerCase() === citizen.toLowerCase());
  if(c){
    c.amendes += amount;
    c.points += points;
  } else {
    data.citizens.push({ nom:citizen, points, amendes:amount, gav:"Non", casier:reason, danger:"Faible" });
  }

  e.target.reset();
  renderFines();
  renderCitizens();
});

$('wantedForm').addEventListener('submit', e => {
  e.preventDefault();
  data.wanted.unshift({
    name:$('wantedName').value.trim(),
    level:$('wantedLevel').value.trim(),
    reason:$('wantedReason').value.trim(),
    author:`${currentAgent.prenom} ${currentAgent.nom}`,
    date:new Date().toLocaleString('fr-FR')
  });
  e.target.reset();
  renderWanted();
  renderHome();
});

$('quickReportBtn').addEventListener('click', () => switchView('reports'));
$('quickIncidentBtn').addEventListener('click', () => switchView('robberies'));

showScreen('loginScreen');