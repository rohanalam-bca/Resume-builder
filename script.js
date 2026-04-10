let currentTemplate = 1;
let projectCount = 0;
let internshipCount = 0;
let certCount = 0;
let photoData = '';

const templates = [
  { id: 1, name: 'Classic Elegant', color: '#1a2744' },
  { id: 2, name: 'Modern Minimal', color: '#e63946' },
  { id: 3, name: 'Creative Bold', color: '#2d1b69' },
  { id: 4, name: 'Corporate Pro', color: '#1c3a5e' },
  { id: 5, name: 'Sleek Dark', color: '#151518' },
  { id: 6, name: 'Vibrant Duo', color: '#ff6b6b' },
];

// ═══════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  buildTemplateGrid();
  addProject();
  addInternship();
  addCert();
  addDynamicItem('achievements-list','Achievement (e.g. Won Hackathon 2024)');
  addDynamicItem('softskills-list','e.g. Team Leadership');
  addSkill();
  addSkill();

  // Summary counter
  document.getElementById('f-summary').addEventListener('input', function(){
    document.getElementById('summaryCount').textContent = this.value.length + '/500';
    updateProgress();
  });
});

// ═══════════════════════════════════════════
//  TEMPLATE GRID
// ═══════════════════════════════════════════
function buildTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = templates.map(t => `
    <div class="template-card ${t.id === currentTemplate ? 'active' : ''}" onclick="selectTemplate(${t.id}, this)">
      <svg class="template-thumb" viewBox="0 0 100 143" xmlns="http://www.w3.org/2000/svg">
        ${getTemplateSVG(t)}
      </svg>
      <div class="template-label">${t.name}</div>
    </div>
  `).join('');
}

function getTemplateSVG(t) {
  const c = t.color;
  const thumbs = {
    1: `<rect width="100" height="143" fill="#f3f4f8"/>
        <rect width="100" height="40" fill="${c}"/>
        <circle cx="20" cy="20" r="12" fill="rgba(255,255,255,0.3)"/>
        <rect x="36" y="12" width="50" height="6" rx="2" fill="rgba(255,255,255,0.8)"/>
        <rect x="36" y="22" width="35" height="4" rx="1" fill="rgba(255,255,255,0.5)"/>
        <rect x="0" y="40" width="35" height="103" fill="#e8e9f0"/>
        <rect x="5" y="48" width="25" height="3" rx="1" fill="${c}"/>
        <rect x="5" y="55" width="20" height="2" rx="1" fill="#bbb"/>
        <rect x="5" y="60" width="22" height="2" rx="1" fill="#bbb"/>
        <rect x="40" y="48" width="55" height="3" rx="1" fill="${c}"/>
        <rect x="40" y="55" width="50" height="2" rx="1" fill="#ccc"/>
        <rect x="40" y="60" width="45" height="2" rx="1" fill="#ccc"/>
        <rect x="40" y="68" width="55" height="3" rx="1" fill="${c}"/>
        <rect x="40" y="75" width="50" height="2" rx="1" fill="#ccc"/>`,
    2: `<rect width="100" height="143" fill="#fff"/>
        <rect x="8" y="10" width="60" height="8" rx="2" fill="#1a1a1a"/>
        <rect x="8" y="22" width="35" height="4" rx="1" fill="${c}"/>
        <rect x="0" y="34" width="100" height="3" fill="${c}"/>
        <rect x="8" y="44" width="84" height="3" rx="1" fill="${c}"/>
        <rect x="8" y="51" width="80" height="2" rx="1" fill="#eee"/>
        <rect x="8" y="56" width="75" height="2" rx="1" fill="#eee"/>
        <rect x="8" y="66" width="84" height="3" rx="1" fill="${c}"/>
        <rect x="8" y="73" width="45" height="16" rx="3" fill="#f5f5f5"/>
        <rect x="57" y="73" width="35" height="16" rx="3" fill="#f5f5f5"/>`,
    3: `<rect width="100" height="143" fill="#fff"/>
        <rect width="100" height="42" fill="url(#g3)"/>
        <defs><linearGradient id="g3" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#2d1b69"/><stop offset="1" stop-color="#11998e"/></linearGradient></defs>
        <circle cx="20" cy="21" r="13" fill="rgba(255,255,255,0.2)"/>
        <rect x="38" y="13" width="45" height="5" rx="2" fill="rgba(255,255,255,0.9)"/>
        <rect x="38" y="22" width="30" height="3" rx="1" fill="rgba(255,255,255,0.6)"/>
        <rect x="5" y="50" width="55" height="3" rx="1" fill="#2d1b69"/>
        <rect x="5" y="57" width="50" height="2" rx="1" fill="#ddd"/>
        <rect x="64" y="48" width="32" height="90" fill="#f8f9ff"/>
        <rect x="68" y="55" width="22" height="2" rx="1" fill="#ddd"/>
        <rect x="68" y="60" width="18" height="2" rx="1" fill="#ddd"/>`,
    4: `<rect width="100" height="143" fill="#fff"/>
        <rect width="100" height="38" fill="${c}"/>
        <rect x="8" y="12" width="55" height="6" rx="2" fill="rgba(255,255,255,0.9)"/>
        <rect x="8" y="22" width="35" height="3" rx="1" fill="#ffc947"/>
        <rect x="0" y="38" width="100" height="4" fill="url(#g4)"/>
        <defs><linearGradient id="g4" x1="0" x2="1"><stop offset="0" stop-color="#ffc947"/><stop offset=".5" stop-color="#ff6b35"/><stop offset="1" stop-color="${c}"/></linearGradient></defs>
        <rect x="5" y="50" width="63" height="2" rx="1" fill="${c}"/>
        <rect x="5" y="56" width="58" height="2" rx="1" fill="#eee"/>
        <rect x="72" y="48" width="24" height="90" fill="#f5f8ff"/>`,
    5: `<rect width="100" height="143" fill="#151518"/>
        <rect x="8" y="12" width="55" height="7" rx="2" fill="#ffffff"/>
        <rect x="8" y="23" width="30" height="3" rx="1" fill="#7c6af5"/>
        <rect x="8" y="32" width="20" height="5" rx="10" fill="#1e1e24"/>
        <rect x="32" y="32" width="20" height="5" rx="10" fill="#1e1e24"/>
        <rect x="0" y="44" width="65" height="99" fill="#151518"/>
        <rect x="65" y="44" width="35" height="99" fill="#1a1a1f"/>
        <rect x="5" y="52" width="55" height="3" rx="1" fill="#7c6af5"/>
        <rect x="5" y="59" width="50" height="12" rx="4" fill="#1a1a1f" stroke="#2a2a30" stroke-width="0.5"/>
        <rect x="5" y="75" width="55" height="12" rx="4" fill="#1a1a1f" stroke="#2a2a30" stroke-width="0.5"/>`,
    6: `<rect width="100" height="143" fill="#fff"/>
        <rect width="100" height="38" fill="#ff6b6b"/>
        <circle cx="82" cy="19" r="12" fill="rgba(255,255,255,0.2)"/>
        <rect x="8" y="12" width="50" height="6" rx="2" fill="rgba(255,255,255,0.95)"/>
        <rect x="8" y="22" width="35" height="3" rx="1" fill="rgba(255,255,255,0.7)"/>
        <rect x="0" y="38" width="32" height="105" fill="#2c2c3e"/>
        <rect x="36" y="46" width="59" height="3" rx="1" fill="#ff6b6b"/>
        <rect x="36" y="53" width="55" height="2" rx="1" fill="#eee"/>
        <rect x="4" y="46" width="22" height="2" rx="1" fill="#ff6b6b"/>
        <rect x="4" y="52" width="18" height="2" rx="1" fill="#444"/>`,
  };
  return thumbs[t.id] || thumbs[1];
}

function selectTemplate(id, el) {
  currentTemplate = id;
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  if (document.getElementById('resumeWrapper').style.display !== 'none') {
    generateResume();
  }
}

// ═══════════════════════════════════════════
//  TABS
// ═══════════════════════════════════════════
function switchTab(tab, el) {
  document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-form').style.display = tab === 'form' ? 'block' : 'none';
  document.getElementById('tab-template').style.display = tab === 'template' ? 'block' : 'none';
}

// ═══════════════════════════════════════════
//  SECTION COLLAPSE
// ═══════════════════════════════════════════
function toggleSection(header) {
  header.classList.toggle('open');
  const body = header.nextElementSibling;
  body.classList.toggle('open');
}

// ═══════════════════════════════════════════
//  SKILLS (flat list)
// ═══════════════════════════════════════════
function addSkill() {
  const list = document.getElementById('skills-list');
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `<input type="text" placeholder="e.g. Java, Excel, Leadership"><button class="remove-btn" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(div);
}

function getSkills() {
  return Array.from(document.querySelectorAll('#skills-list input'))
    .map(i => i.value.trim()).filter(Boolean);
}

// ═══════════════════════════════════════════
//  DYNAMIC ITEMS
// ═══════════════════════════════════════════
function addDynamicItem(listId, placeholder) {
  const list = document.getElementById(listId);
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `<input type="text" placeholder="${placeholder}"><button class="remove-btn" onclick="this.parentElement.remove()">✕</button>`;
  list.appendChild(div);
}

function getListValues(listId) {
  return Array.from(document.querySelectorAll('#' + listId + ' input'))
    .map(i => i.value.trim()).filter(Boolean);
}

// ═══════════════════════════════════════════
//  PROJECTS
// ═══════════════════════════════════════════
function addProject() {
  projectCount++;
  const n = projectCount;
  const container = document.getElementById('projects-container');
  const div = document.createElement('div');
  div.className = 'project-card';
  div.id = 'proj-' + n;
  div.innerHTML = `
    <div class="project-card-header">
      <div class="project-num">Project #${n}</div>
      <button class="btn btn-danger" onclick="document.getElementById('proj-${n}').remove()">Remove</button>
    </div>
    <div class="form-group"><label>Title</label><input type="text" id="p${n}-title" placeholder="My Awesome Project"></div>
    <div class="form-group"><label>Description</label><textarea id="p${n}-desc" rows="2" placeholder="Brief description..."></textarea></div>
    <div class="form-group"><label>Tech Stack</label><input type="text" id="p${n}-tech" placeholder="React, Node.js, MongoDB"></div>
    <div class="form-group"><label>Features (one per line)</label><textarea id="p${n}-feat" rows="2" placeholder="Feature 1&#10;Feature 2"></textarea></div>
    <div class="form-group"><label>GitHub Link</label><input type="url" id="p${n}-gh" placeholder="github.com/user/repo"></div>
  `;
  container.appendChild(div);
}

function getProjects() {
  return Array.from(document.querySelectorAll('.project-card')).map(card => {
    const id = card.id.replace('proj-', '');
    const title = (document.getElementById('p' + id + '-title') || {}).value?.trim() || '';
    const desc = (document.getElementById('p' + id + '-desc') || {}).value?.trim() || '';
    const tech = (document.getElementById('p' + id + '-tech') || {}).value?.trim() || '';
    const feat = ((document.getElementById('p' + id + '-feat') || {}).value || '').split('\n').map(f => f.trim()).filter(Boolean);
    const gh = (document.getElementById('p' + id + '-gh') || {}).value?.trim() || '';
    if (!title && !desc) return null;
    return { title, description: desc, techStack: tech, features: feat, github: gh };
  }).filter(Boolean);
}

// ═══════════════════════════════════════════
//  INTERNSHIPS
// ═══════════════════════════════════════════
function addInternship() {
  internshipCount++;
  const n = internshipCount;
  const container = document.getElementById('internships-container');
  const div = document.createElement('div');
  div.className = 'project-card';
  div.id = 'int-' + n;
  div.innerHTML = `
    <div class="project-card-header">
      <div class="project-num">Internship #${n}</div>
      <button class="btn btn-danger" onclick="document.getElementById('int-${n}').remove()">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Organization</label><input type="text" id="i${n}-org" placeholder="Company Name"></div>
      <div class="form-group"><label>Role</label><input type="text" id="i${n}-role" placeholder="Frontend Developer"></div>
    </div>
    <div class="form-group"><label>Duration</label><input type="text" id="i${n}-dur" placeholder="June 2024 – Aug 2024"></div>
    <div class="form-group"><label>Description</label><textarea id="i${n}-desc" rows="2" placeholder="What you did..."></textarea></div>
  `;
  container.appendChild(div);
}

function getInternships() {
  return Array.from(document.querySelectorAll('[id^="int-"]')).map(card => {
    const id = card.id.replace('int-', '');
    const org = (document.getElementById('i' + id + '-org') || {}).value?.trim() || '';
    const role = (document.getElementById('i' + id + '-role') || {}).value?.trim() || '';
    const dur = (document.getElementById('i' + id + '-dur') || {}).value?.trim() || '';
    const desc = (document.getElementById('i' + id + '-desc') || {}).value?.trim() || '';
    if (!org && !role) return null;
    return { organization: org, role, duration: dur, description: desc };
  }).filter(Boolean);
}

// ═══════════════════════════════════════════
//  CERTIFICATIONS
// ═══════════════════════════════════════════
function addCert() {
  certCount++;
  const n = certCount;
  const container = document.getElementById('certs-container');
  const div = document.createElement('div');
  div.className = 'project-card';
  div.id = 'cert-' + n;
  div.innerHTML = `
    <div class="project-card-header">
      <div class="project-num">Certificate #${n}</div>
      <button class="btn btn-danger" onclick="document.getElementById('cert-${n}').remove()">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Course Name</label><input type="text" id="c${n}-name" placeholder="Web Development Bootcamp"></div>
      <div class="form-group"><label>Platform</label><input type="text" id="c${n}-plat" placeholder="Udemy / Coursera"></div>
    </div>
  `;
  container.appendChild(div);
}

function getCerts() {
  return Array.from(document.querySelectorAll('[id^="cert-"]')).map(card => {
    const id = card.id.replace('cert-', '');
    const name = (document.getElementById('c' + id + '-name') || {}).value?.trim() || '';
    const plat = (document.getElementById('c' + id + '-plat') || {}).value?.trim() || '';
    if (!name) return null;
    return { course: name, platform: plat };
  }).filter(Boolean);
}

// ═══════════════════════════════════════════
//  PHOTO UPLOAD
// ═══════════════════════════════════════════
function handlePhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    photoData = e.target.result;
    document.getElementById('photoPreview').src = photoData;
    document.getElementById('photoPreview').classList.add('show');
    document.getElementById('photoPlaceholder').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════
//  PROGRESS
// ═══════════════════════════════════════════
function updateProgress() {
  const fields = ['f-name','f-phone','f-email','f-summary','edu-10-board'];
  const filled = fields.filter(id => document.getElementById(id)?.value?.trim()).length;
  const pct = Math.round((filled / fields.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '%';
}

// ═══════════════════════════════════════════
//  VALIDATION
// ═══════════════════════════════════════════
function validate() {
  let ok = true;
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();

  // Name
  const errName = document.getElementById('err-name');
  if (!name) { errName.classList.add('show'); document.getElementById('f-name').classList.add('error'); ok = false; }
  else { errName.classList.remove('show'); document.getElementById('f-name').classList.remove('error'); }

  // Email
  const errEmail = document.getElementById('err-email');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!email || !emailOk) { errEmail.classList.add('show'); document.getElementById('f-email').classList.add('error'); ok = false; }
  else { errEmail.classList.remove('show'); document.getElementById('f-email').classList.remove('error'); }

  // Phone
  const errPhone = document.getElementById('err-phone');
  if (!phone || !/^[\d\s\+\-\(\)]{7,}$/.test(phone)) { errPhone.classList.add('show'); document.getElementById('f-phone').classList.add('error'); ok = false; }
  else { errPhone.classList.remove('show'); document.getElementById('f-phone').classList.remove('error'); }

  if (!ok) { showToast('Please fill all required fields correctly.', 'error'); }
  return ok;
}

// ═══════════════════════════════════════════
//  DATA COLLECTION (for analytics)
// ═══════════════════════════════════════════
function collectData() {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    personalInfo: {
      name: document.getElementById('f-name').value.trim(),
      phone: document.getElementById('f-phone').value.trim(),
      email: document.getElementById('f-email').value.trim(),
      linkedin: document.getElementById('f-linkedin').value.trim(),
      github: document.getElementById('f-github').value.trim(),
      photo: photoData,
      profession: document.getElementById('f-profession').value.trim(),
    },
    summary: document.getElementById('f-summary').value.trim(),
    skills: getSkills(),
    projects: getProjects(),
    education: {
      class10: {
        board: document.getElementById('edu-10-board').value.trim(),
        year: document.getElementById('edu-10-year').value.trim(),
        percentage: document.getElementById('edu-10-pct').value.trim(),
      },
      class12: {
        board: document.getElementById('edu-12-board').value.trim(),
        year: document.getElementById('edu-12-year').value.trim(),
        percentage: document.getElementById('edu-12-pct').value.trim(),
      },
      degree: {
        course: document.getElementById('edu-deg-course').value.trim(),
        college: document.getElementById('edu-deg-college').value.trim(),
        year: document.getElementById('edu-deg-year').value.trim(),
        percentage: document.getElementById('edu-deg-pct').value.trim(),
      },
    },
    internships: getInternships(),
    achievements: getListValues('achievements-list'),
    certifications: getCerts(),
    softSkills: getListValues('softskills-list'),
    extra: {
      languages: document.getElementById('f-langs').value.split(',').map(l => l.trim()).filter(Boolean),
      hobbies: document.getElementById('f-hobbies').value.split(',').map(h => h.trim()).filter(Boolean),
    },
    templateUsed: currentTemplate,
  };
}

function saveToStorage(data) {
  let users = [];
  try { users = JSON.parse(localStorage.getItem('resumeUsers') || '[]'); } catch(e) {}
  users.push(data);
  localStorage.setItem('resumeUsers', JSON.stringify(users));
}

// ═══════════════════════════════════════════
//  GENERATE RESUME
// ═══════════════════════════════════════════
function generateResume() {
  if (!validate()) return;
  const data = collectData();
  saveToStorage(data);
  const html = buildResumeHTML(data, currentTemplate);
  document.getElementById('resumeOutput').innerHTML = html;
  document.getElementById('resumeWrapper').style.display = 'block';
  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('downloadBtn').style.display = 'flex';
  document.getElementById('downloadBtn2').style.display = 'flex';
  document.getElementById('resumeWrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Resume generated and saved!', 'success');
}

// ═══════════════════════════════════════════
//  RESUME HTML BUILDERS
// ═══════════════════════════════════════════
function buildResumeHTML(d, template) {
  const builders = { 1: buildT1, 2: buildT2, 3: buildT3, 4: buildT4, 5: buildT5, 6: buildT6 };
  return (builders[template] || builders[1])(d);
}

function photoHTML(src, cls, placeholderCls) {
  if (src) return `<img src="${src}" class="${cls}" alt="Photo">`;
  return `<div class="${placeholderCls}">👤</div>`;
}

function skillTagsHTML(skills, tagCls) {
  if (!skills || !skills.length) return '';
  return skills.map(s => `<span class="${tagCls}-tag">${s}</span>`).join('');
}

function contactLine(d, sep=' | ') {
  const parts = [d.personalInfo.email, d.personalInfo.phone];
  if (d.personalInfo.linkedin) parts.push(d.personalInfo.linkedin);
  if (d.personalInfo.github) parts.push(d.personalInfo.github);
  return parts.filter(Boolean).join(sep);
}

// ─── TEMPLATE 1: Classic Elegant ───
function buildT1(d) {
  const p = d.personalInfo;
  const e = d.education;
  return `<div class="resume-t1">
  <div class="t1-header">
    ${photoHTML(p.photo,'t1-photo','t1-photo-placeholder')}
    <div>
      <div class="t1-name">${p.name}</div>
      ${p.profession?`<div class="t1-department">${p.profession}</div>`:''}
      <div class="t1-contacts">
        <span>📧 ${p.email}</span><span>📱 ${p.phone}</span>
        ${p.linkedin?`<span>🔗 ${p.linkedin}</span>`:''}
        ${p.github?`<span>💻 ${p.github}</span>`:''}
      </div>
    </div>
  </div>
  <div class="t1-body">
    <div class="t1-left">
      ${d.skills && d.skills.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Skills</div>
        ${d.skills.map(s=>`<span class="t1-skill-tag">${s}</span>`).join('')}
      </div>` : ''}
      ${e.class10.board ? `
      <div class="t1-section">
        <div class="t1-section-title">Education</div>
        ${e.degree.course ? `<div class="t1-edu-item"><div class="t1-edu-degree">${e.degree.course}</div><div class="t1-edu-detail">${e.degree.college || ''}</div><div class="t1-edu-detail">${e.degree.year||''} ${e.degree.percentage?'• '+e.degree.percentage:''}</div></div>`:''}
        ${e.class12.board ? `<div class="t1-edu-item"><div class="t1-edu-degree">Class XII</div><div class="t1-edu-detail">${e.class12.board} | ${e.class12.year}</div><div class="t1-edu-detail">${e.class12.percentage}</div></div>`:''}
        <div class="t1-edu-item"><div class="t1-edu-degree">Class X</div><div class="t1-edu-detail">${e.class10.board} | ${e.class10.year}</div><div class="t1-edu-detail">${e.class10.percentage}</div></div>
      </div>` : ''}
      ${d.softSkills.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Soft Skills</div>
        ${d.softSkills.map(s=>`<div class="t1-bullet-item">${s}</div>`).join('')}
      </div>` : ''}
      ${d.extra.languages.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Languages</div>
        ${d.extra.languages.map(l=>`<div class="t1-bullet-item">${l}</div>`).join('')}
      </div>` : ''}
      ${d.extra.hobbies.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Hobbies</div>
        ${d.extra.hobbies.map(h=>`<div class="t1-bullet-item">${h}</div>`).join('')}
      </div>` : ''}
      ${d.certifications.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Certifications</div>
        ${d.certifications.map(c=>`<div class="t1-cert-item"><span>${c.course}</span><span style="color:#888;font-size:0.72rem">${c.platform}</span></div>`).join('')}
      </div>` : ''}
    </div>
    <div class="t1-right">
      ${d.summary ? `
      <div class="t1-section">
        <div class="t1-section-title">Career Objective</div>
        <div class="t1-summary">${d.summary}</div>
      </div>` : ''}
      ${d.projects.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Projects</div>
        ${d.projects.map(pr=>`
        <div class="t1-project">
          <div class="t1-project-title">${pr.title} ${pr.github?`<a href="${pr.github}" style="font-size:0.7rem;color:#888;font-weight:400">[GitHub]</a>`:''}</div>
          <div class="t1-project-tech">${pr.techStack}</div>
          <div class="t1-project-desc">${pr.description}</div>
          ${pr.features.map(f=>`<div class="t1-bullet-item">${f}</div>`).join('')}
        </div>`).join('')}
      </div>` : ''}
      ${d.internships.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Internships & Training</div>
        ${d.internships.map(i=>`
        <div class="t1-intern">
          <div class="t1-intern-role">${i.role}</div>
          <div class="t1-intern-org">${i.organization} | ${i.duration}</div>
          <div class="t1-project-desc">${i.description}</div>
        </div>`).join('')}
      </div>` : ''}
      ${d.achievements.length ? `
      <div class="t1-section">
        <div class="t1-section-title">Achievements</div>
        ${d.achievements.map(a=>`<div class="t1-bullet-item">${a}</div>`).join('')}
      </div>` : ''}
    </div>
  </div>
</div>`;
}

// ─── TEMPLATE 2: Modern Minimal ───
function buildT2(d) {
  const p = d.personalInfo;
  const e = d.education;
  return `<div class="resume-t2">
  <div class="t2-header">
    <div>
      <div class="t2-name">${p.name}</div>
      ${p.profession?`<div class="t2-department">${p.profession}</div>`:''}
    </div>
    <div style="display:flex;align-items:center;gap:16px">
      <div class="t2-contacts-right">
        <div>📧 ${p.email}</div><div>📱 ${p.phone}</div>
        ${p.linkedin?`<div>🔗 ${p.linkedin}</div>`:''}
        ${p.github?`<div>💻 ${p.github}</div>`:''}
      </div>
      ${photoHTML(p.photo,'t2-photo','t2-photo-placeholder')}
    </div>
  </div>
  <div class="t2-body">
    ${d.summary?`<div class="t2-section"><div class="t2-section-title">Professional Summary</div><div class="t2-summary">${d.summary}</div></div>`:''}
    <div class="t2-two-col">
      ${d.skills && d.skills.length ? `
      <div class="t2-section">
        <div class="t2-section-title">Skills</div>
        <div class="t2-skill-tags">${d.skills.map(s=>`<span class="t2-skill-tag">${s}</span>`).join('')}</div>
      </div>`:' '}
      <div>
        ${e.class10.board ? `<div class="t2-section"><div class="t2-section-title">Education</div>
          ${e.degree.course?`<div class="t2-edu-row"><div><div class="t2-edu-name">${e.degree.course}</div><div class="t2-edu-detail">${e.degree.college||''}</div></div><div class="t2-edu-detail">${e.degree.year||''} ${e.degree.percentage?'• '+e.degree.percentage:''}</div></div>`:''}
          ${e.class12.board?`<div class="t2-edu-row"><div><div class="t2-edu-name">Class XII - ${e.class12.board}</div></div><div class="t2-edu-detail">${e.class12.year} • ${e.class12.percentage}</div></div>`:''}
          <div class="t2-edu-row"><div><div class="t2-edu-name">Class X - ${e.class10.board}</div></div><div class="t2-edu-detail">${e.class10.year} • ${e.class10.percentage}</div></div>
        </div>` : ''}
        ${d.softSkills.length?`<div class="t2-section"><div class="t2-section-title">Soft Skills</div>${d.softSkills.map(s=>`<div class="t2-bullet">${s}</div>`).join('')}</div>`:''}
        ${d.extra.languages.length?`<div class="t2-section"><div class="t2-section-title">Languages</div><div class="t2-edu-detail">${d.extra.languages.join(' • ')}</div></div>`:''}
      </div>
    </div>
    ${d.projects.length?`<div class="t2-section"><div class="t2-section-title">Projects</div>${d.projects.map(pr=>`
      <div class="t2-project">
        <div class="t2-project-title">${pr.title}${pr.github?`<a href="${pr.github}" class="t2-project-link">[GitHub ↗]</a>`:''}</div>
        <div class="t2-project-tech">${pr.techStack}</div>
        <div class="t2-project-desc">${pr.description}</div>
        ${pr.features.map(f=>`<div class="t2-bullet">${f}</div>`).join('')}
      </div>`).join('')}</div>`:''}
    ${d.internships.length?`<div class="t2-section"><div class="t2-section-title">Internships</div>${d.internships.map(i=>`
      <div class="t2-intern"><div class="t2-intern-header"><div class="t2-intern-role">${i.role} @ ${i.organization}</div><div class="t2-intern-dur">${i.duration}</div></div>
      <div class="t2-project-desc">${i.description}</div></div>`).join('')}</div>`:''}
    ${d.achievements.length?`<div class="t2-section"><div class="t2-section-title">Achievements</div>${d.achievements.map(a=>`<div class="t2-bullet">${a}</div>`).join('')}</div>`:''}
    ${d.certifications.length?`<div class="t2-section"><div class="t2-section-title">Certifications</div>${d.certifications.map(c=>`<div class="t2-cert"><span>${c.course}</span><span style="color:#888">${c.platform}</span></div>`).join('')}</div>`:''}
  </div>
</div>`;
}

// ─── TEMPLATE 3: Creative Bold ───
function buildT3(d) {
  const p = d.personalInfo;
  const e = d.education;
  return `<div class="resume-t3">
  <div class="t3-header">
    <div class="t3-header-inner">
      ${photoHTML(p.photo,'t3-photo','t3-photo-placeholder')}
      <div>
        <div class="t3-name">${p.name}</div>
        ${p.profession?`<div class="t3-department">${p.profession}</div>`:''}
        <div class="t3-contacts">
          <span class="t3-contact-chip">📧 ${p.email}</span>
          <span class="t3-contact-chip">📱 ${p.phone}</span>
          ${p.linkedin?`<span class="t3-contact-chip">🔗 ${p.linkedin}</span>`:''}
          ${p.github?`<span class="t3-contact-chip">💻 ${p.github}</span>`:''}
        </div>
      </div>
    </div>
  </div>
  <div class="t3-body">
    <div class="t3-left">
      ${d.summary?`<div class="t3-section"><div class="t3-section-title">Summary</div><div class="t3-summary">${d.summary}</div></div>`:''}
      ${d.projects.length?`<div class="t3-section"><div class="t3-section-title">Projects</div>${d.projects.map(pr=>`
        <div class="t3-project">
          <div class="t3-project-title">${pr.title}</div>
          <span class="t3-project-tech">${pr.techStack}</span>
          <div class="t3-project-desc">${pr.description}</div>
          ${pr.features.map(f=>`<div class="t3-bullet">${f}</div>`).join('')}
          ${pr.github?`<div style="font-size:0.72rem;color:#11998e;margin-top:3px">${pr.github}</div>`:''}
        </div>`).join('')}</div>`:''}
      ${d.internships.length?`<div class="t3-section"><div class="t3-section-title">Internships</div>${d.internships.map(i=>`
        <div class="t3-intern"><div class="t3-intern-role">${i.role}</div><div class="t3-intern-org">${i.organization} · ${i.duration}</div>
        <div style="font-size:0.78rem;color:#555;margin-top:3px">${i.description}</div></div>`).join('')}</div>`:''}
      ${d.achievements.length?`<div class="t3-section"><div class="t3-section-title">Achievements</div>${d.achievements.map(a=>`<div class="t3-bullet">${a}</div>`).join('')}</div>`:''}
    </div>
    <div class="t3-right">
      ${d.skills && d.skills.length ? `
      <div class="t3-section">
        <div class="t3-section-title">Skills</div>
        ${d.skills.map(s=>`<span class="t3-skill-tag">${s}</span>`).join('')}
      </div>` : ''}
      ${e.class10.board ? `<div class="t3-section"><div class="t3-section-title">Education</div>
        ${e.degree.course?`<div class="t3-edu-item"><div class="t3-edu-degree">${e.degree.course}</div><div class="t3-edu-detail">${e.degree.college||''} · ${e.degree.year||''}</div><div class="t3-edu-detail">${e.degree.percentage||''}</div></div>`:''}
        ${e.class12.board?`<div class="t3-edu-item"><div class="t3-edu-degree">Class XII</div><div class="t3-edu-detail">${e.class12.board} · ${e.class12.year}</div><div class="t3-edu-detail">${e.class12.percentage}</div></div>`:''}
        <div class="t3-edu-item"><div class="t3-edu-degree">Class X</div><div class="t3-edu-detail">${e.class10.board} · ${e.class10.year}</div><div class="t3-edu-detail">${e.class10.percentage}</div></div>
      </div>` : ''}
      ${d.softSkills.length?`<div class="t3-section"><div class="t3-section-title">Soft Skills</div>${d.softSkills.map(s=>`<div class="t3-bullet">${s}</div>`).join('')}</div>`:''}
      ${d.certifications.length?`<div class="t3-section"><div class="t3-section-title">Certifications</div>${d.certifications.map(c=>`<div class="t3-cert"><div class="t3-cert-name">${c.course}</div><div class="t3-cert-platform">${c.platform}</div></div>`).join('')}</div>`:''}
      ${d.extra.languages.length?`<div class="t3-section"><div class="t3-section-title">Languages</div>${d.extra.languages.map(l=>`<div class="t3-bullet">${l}</div>`).join('')}</div>`:''}
      ${d.extra.hobbies.length?`<div class="t3-section"><div class="t3-section-title">Hobbies</div><div style="font-size:0.75rem;color:#666">${d.extra.hobbies.join(' · ')}</div></div>`:''}
    </div>
  </div>
</div>`;
}

// ─── TEMPLATE 4: Corporate Pro ───
function buildT4(d) {
  const p = d.personalInfo;
  const e = d.education;
  return `<div class="resume-t4">
  <div class="t4-header">
    ${photoHTML(p.photo,'t4-photo','t4-photo-placeholder')}
    <div>
      <div class="t4-name">${p.name}</div>
      ${p.profession?`<div class="t4-dept">${p.profession}</div>`:''}
      <div class="t4-contacts">
        <span>📧 ${p.email}</span><span>📱 ${p.phone}</span>
        ${p.linkedin?`<span>🔗 ${p.linkedin}</span>`:''}
        ${p.github?`<span>💻 ${p.github}</span>`:''}
      </div>
    </div>
  </div>
  <div class="t4-stripe"></div>
  <div class="t4-body">
    <div class="t4-left">
      ${d.summary?`<div class="t4-section"><div class="t4-section-title">Professional Summary</div><div class="t4-summary">${d.summary}</div></div>`:''}
      ${d.projects.length?`<div class="t4-section"><div class="t4-section-title">Key Projects</div>${d.projects.map(pr=>`
        <div class="t4-project">
          <div class="t4-project-title">${pr.title} ${pr.github?`<a href="${pr.github}" style="color:#ffc947;font-size:0.72rem">[↗]</a>`:''}</div>
          <div class="t4-project-tech">${pr.techStack}</div>
          <div class="t4-project-desc">${pr.description}</div>
          ${pr.features.map(f=>`<div class="t4-bullet">${f}</div>`).join('')}
        </div>`).join('')}</div>`:''}
      ${d.internships.length?`<div class="t4-section"><div class="t4-section-title">Internships</div>${d.internships.map(i=>`
        <div class="t4-intern"><div class="t4-intern-role">${i.role}</div><div class="t4-intern-org">${i.organization} · ${i.duration}</div>
        <div class="t4-summary">${i.description}</div></div>`).join('')}</div>`:''}
      ${d.achievements.length?`<div class="t4-section"><div class="t4-section-title">Achievements</div>${d.achievements.map(a=>`<div class="t4-bullet">${a}</div>`).join('')}</div>`:''}
    </div>
    <div class="t4-right">
      ${d.skills && d.skills.length ? `
      <div class="t4-section">
        <div class="t4-section-title">Skills</div>
        ${d.skills.map(s=>`<span class="t4-skill-tag">${s}</span>`).join('')}
      </div>` : ''}
      ${e.class10.board ? `<div class="t4-section"><div class="t4-section-title">Education</div>
        ${e.degree.course?`<div class="t4-edu-item"><div class="t4-edu-degree">${e.degree.course}</div><div class="t4-edu-detail">${e.degree.college||''}</div><div class="t4-edu-detail">${e.degree.year||''} • ${e.degree.percentage||''}</div></div>`:''}
        ${e.class12.board?`<div class="t4-edu-item"><div class="t4-edu-degree">Class XII</div><div class="t4-edu-detail">${e.class12.board} • ${e.class12.year}</div><div class="t4-edu-detail">${e.class12.percentage}</div></div>`:''}
        <div class="t4-edu-item"><div class="t4-edu-degree">Class X</div><div class="t4-edu-detail">${e.class10.board} • ${e.class10.year}</div><div class="t4-edu-detail">${e.class10.percentage}</div></div>
      </div>` : ''}
      ${d.softSkills.length?`<div class="t4-section"><div class="t4-section-title">Soft Skills</div>${d.softSkills.map(s=>`<div class="t4-bullet">${s}</div>`).join('')}</div>`:''}
      ${d.certifications.length?`<div class="t4-section"><div class="t4-section-title">Certifications</div>${d.certifications.map(c=>`<div class="t4-cert">${c.course}<br><span style="color:#888;font-size:0.72rem">${c.platform}</span></div>`).join('')}</div>`:''}
      ${d.extra.languages.length?`<div class="t4-section"><div class="t4-section-title">Languages</div><div class="t4-edu-detail">${d.extra.languages.join(', ')}</div></div>`:''}
      ${d.extra.hobbies.length?`<div class="t4-section"><div class="t4-section-title">Interests</div><div class="t4-edu-detail">${d.extra.hobbies.join(', ')}</div></div>`:''}
    </div>
  </div>
</div>`;
}

// ─── TEMPLATE 5: Sleek Dark ───
function buildT5(d) {
  const p = d.personalInfo;
  const e = d.education;
  return `<div class="resume-t5">
  <div class="t5-header">
    <div class="t5-left-h">
      <div class="t5-name">${p.name}</div>
      ${p.profession?`<div class="t5-dept">${p.profession}</div>`:''}
      <div class="t5-contacts">
        <span class="t5-contact-chip">📧 ${p.email}</span>
        <span class="t5-contact-chip">📱 ${p.phone}</span>
        ${p.linkedin?`<span class="t5-contact-chip">🔗 ${p.linkedin}</span>`:''}
        ${p.github?`<span class="t5-contact-chip">💻 ${p.github}</span>`:''}
      </div>
    </div>
    ${photoHTML(p.photo,'t5-photo','t5-photo-placeholder')}
  </div>
  <div class="t5-body">
    <div class="t5-left">
      ${d.summary?`<div class="t5-section"><div class="t5-section-title">About Me</div><div class="t5-summary">${d.summary}</div></div>`:''}
      ${d.projects.length?`<div class="t5-section"><div class="t5-section-title">Projects</div>${d.projects.map(pr=>`
        <div class="t5-project">
          <div class="t5-project-title">${pr.title} ${pr.github?`<span style="font-size:0.7rem;color:#7c6af5;font-weight:400">[${pr.github}]</span>`:''}</div>
          <div class="t5-project-tech">${pr.techStack}</div>
          <div class="t5-project-desc">${pr.description}</div>
          ${pr.features.map(f=>`<div class="t5-bullet">${f}</div>`).join('')}
        </div>`).join('')}</div>`:''}
      ${d.internships.length?`<div class="t5-section"><div class="t5-section-title">Experience</div>${d.internships.map(i=>`
        <div class="t5-intern"><div class="t5-intern-role">${i.role}</div><div class="t5-intern-org">${i.organization} · ${i.duration}</div>
        <div class="t5-summary">${i.description}</div></div>`).join('')}</div>`:''}
      ${d.achievements.length?`<div class="t5-section"><div class="t5-section-title">Achievements</div>${d.achievements.map(a=>`<div class="t5-bullet">${a}</div>`).join('')}</div>`:''}
    </div>
    <div class="t5-right">
      ${d.skills && d.skills.length ? `
      <div class="t5-section">
        <div class="t5-section-title">Skills</div>
        ${d.skills.map(s=>`<span class="t5-skill-tag">${s}</span>`).join('')}
      </div>` : ''}
      ${e.class10.board ? `<div class="t5-section"><div class="t5-section-title">Education</div>
        ${e.degree.course?`<div class="t5-edu-item"><div class="t5-edu-degree">${e.degree.course}</div><div class="t5-edu-detail">${e.degree.college||''} · ${e.degree.year||''}</div></div>`:''}
        ${e.class12.board?`<div class="t5-edu-item"><div class="t5-edu-degree">Class XII</div><div class="t5-edu-detail">${e.class12.board} · ${e.class12.year}</div></div>`:''}
        <div class="t5-edu-item"><div class="t5-edu-degree">Class X</div><div class="t5-edu-detail">${e.class10.board} · ${e.class10.year}</div></div>
      </div>` : ''}
      ${d.softSkills.length?`<div class="t5-section"><div class="t5-section-title">Soft Skills</div>${d.softSkills.map(s=>`<div class="t5-bullet">${s}</div>`).join('')}</div>`:''}
      ${d.certifications.length?`<div class="t5-section"><div class="t5-section-title">Certifications</div>${d.certifications.map(c=>`<div class="t5-cert"><div class="t5-cert-name">${c.course}</div><div class="t5-cert-platform">${c.platform}</div></div>`).join('')}</div>`:''}
      ${d.extra.languages.length?`<div class="t5-section"><div class="t5-section-title">Languages</div><div class="t5-summary">${d.extra.languages.join(' · ')}</div></div>`:''}
    </div>
  </div>
</div>`;
}

// ─── TEMPLATE 6: Vibrant Duo ───
function buildT6(d) {
  const p = d.personalInfo;
  const e = d.education;
  return `<div class="resume-t6">
  <div class="t6-header">
    <div class="t6-header-row">
      <div>
        <div class="t6-name">${p.name}</div>
        ${p.profession?`<div class="t6-dept">${p.profession}</div>`:''}
        <div class="t6-contacts">
          <div>📧 ${p.email} &nbsp; 📱 ${p.phone}</div>
          ${p.linkedin?`<div>🔗 ${p.linkedin}</div>`:''}
          ${p.github?`<div>💻 ${p.github}</div>`:''}
        </div>
      </div>
      ${photoHTML(p.photo,'t6-photo','t6-photo-placeholder')}
    </div>
  </div>
  <div class="t6-body">
    <div class="t6-left">
      ${d.skills && d.skills.length ? `
      <div class="t6-section">
        <div class="t6-section-title-left">Skills</div>
        ${d.skills.map(s=>`<span class="t6-skill-tag">${s}</span>`).join('')}
      </div>` : ''}
      ${e.class10.board ? `<div class="t6-section"><div class="t6-section-title-left">Education</div>
        ${e.degree.course?`<div class="t6-edu-item"><div class="t6-edu-degree">${e.degree.course}</div><div class="t6-edu-detail">${e.degree.college||''}</div><div class="t6-edu-detail">${e.degree.year||''}</div></div>`:''}
        ${e.class12.board?`<div class="t6-edu-item"><div class="t6-edu-degree">Class XII</div><div class="t6-edu-detail">${e.class12.board} · ${e.class12.year}</div></div>`:''}
        <div class="t6-edu-item"><div class="t6-edu-degree">Class X</div><div class="t6-edu-detail">${e.class10.board} · ${e.class10.year}</div></div>
      </div>` : ''}
      ${d.softSkills.length?`<div class="t6-section"><div class="t6-section-title-left">Soft Skills</div>${d.softSkills.map(s=>`<div class="t6-bullet-left">${s}</div>`).join('')}</div>`:''}
      ${d.certifications.length?`<div class="t6-section"><div class="t6-section-title-left">Certs</div>${d.certifications.map(c=>`<div class="t6-cert"><span class="t6-cert-name">${c.course}</span><br><span style="font-size:0.7rem;color:#aaa">${c.platform}</span></div>`).join('')}</div>`:''}
      ${d.extra.languages.length?`<div class="t6-section"><div class="t6-section-title-left">Languages</div>${d.extra.languages.map(l=>`<div class="t6-bullet-left">${l}</div>`).join('')}</div>`:''}
      ${d.extra.hobbies.length?`<div class="t6-section"><div class="t6-section-title-left">Hobbies</div>${d.extra.hobbies.map(h=>`<div class="t6-bullet-left">${h}</div>`).join('')}</div>`:''}
    </div>
    <div class="t6-right">
      ${d.summary?`<div class="t6-section"><div class="t6-section-title-right">Summary</div><div class="t6-summary">${d.summary}</div></div>`:''}
      ${d.projects.length?`<div class="t6-section"><div class="t6-section-title-right">Projects</div>${d.projects.map(pr=>`
        <div class="t6-project">
          <div class="t6-project-title">${pr.title}${pr.github?`<a href="${pr.github}" style="font-size:0.7rem;color:#ff6b6b">[↗]</a>`:''}</div>
          <div class="t6-project-tech">${pr.techStack}</div>
          <div class="t6-project-desc">${pr.description}</div>
          ${pr.features.map(f=>`<div class="t6-bullet-right">${f}</div>`).join('')}
        </div>`).join('')}</div>`:''}
      ${d.internships.length?`<div class="t6-section"><div class="t6-section-title-right">Internships</div>${d.internships.map(i=>`
        <div class="t6-intern"><div class="t6-intern-role">${i.role} @ ${i.organization}</div>
        <div style="font-size:0.74rem;color:#888">${i.duration}</div>
        <div class="t6-project-desc">${i.description}</div></div>`).join('')}</div>`:''}
      ${d.achievements.length?`<div class="t6-section"><div class="t6-section-title-right">Achievements</div>${d.achievements.map(a=>`<div class="t6-bullet-right">${a}</div>`).join('')}</div>`:''}
    </div>
  </div>
</div>`;
}

// ═══════════════════════════════════════════
//  PDF DOWNLOAD
// ═══════════════════════════════════════════
function downloadPDF() {
  const el = document.getElementById('resumeOutput');
  if (!el || !el.innerHTML) { showToast('Generate a resume first!', 'error'); return; }
  const name = document.getElementById('f-name').value.trim() || 'Resume';
  const opt = {
    margin: 0,
    filename: name.replace(/\s+/g, '_') + '_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  showToast('Generating PDF…');
  html2pdf().set(opt).from(el).save().then(() => showToast('PDF downloaded!', 'success'));
}

// ═══════════════════════════════════════════
//  THEME TOGGLE
// ═══════════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.querySelector('.theme-toggle').textContent = isDark ? '🌙' : '☀️';
}

// ═══════════════════════════════════════════
//  RESET FORM
// ═══════════════════════════════════════════
function resetForm() {
  if (!confirm('Reset all form data?')) return;
  ['f-name','f-phone','f-email','f-linkedin','f-github','f-profession','f-summary','f-langs','f-hobbies',
   'edu-10-board','edu-10-year','edu-10-pct','edu-12-board','edu-12-year','edu-12-pct',
   'edu-deg-course','edu-deg-college','edu-deg-year','edu-deg-pct'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  photoData = '';
  document.getElementById('photoPreview').src = '';
  document.getElementById('photoPreview').classList.remove('show');
  document.getElementById('photoPlaceholder').style.display = 'block';
  document.querySelectorAll('#skills-list, #achievements-list, #softskills-list').forEach(l => l.innerHTML = '');
  document.getElementById('projects-container').innerHTML = '';
  document.getElementById('internships-container').innerHTML = '';
  document.getElementById('certs-container').innerHTML = '';
  projectCount = 0; internshipCount = 0; certCount = 0;
  addProject(); addInternship(); addCert();
  addDynamicItem('achievements-list','Achievement (e.g. Won Hackathon 2024)');
  addDynamicItem('softskills-list','e.g. Team Leadership');
  addSkill(); addSkill();
  document.getElementById('resumeWrapper').style.display = 'none';
  document.getElementById('emptyState').style.display = 'block';
  document.getElementById('downloadBtn').style.display = 'none';
  document.getElementById('downloadBtn2').style.display = 'none';
  updateProgress();
  showToast('Form has been reset.', 'success');
}

// ═══════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════
function showToast(msg, type='') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = (type === 'success' ? '✅ ' : type === 'error' ? '❌ ' : '💡 ') + msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}
