/* js/app.js */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de íconos Lucide
  lucide.createIcons();
});

// Variables de estado global
let formStep = 1;
let formType = 'dolor';
let isDoneEx = false;

// --- NAVEGACIÓN Y VISTAS PRINCIPALES ---
function showSection(id) {
  const sections = ['landing', 'questionnaire', 'checkout', 'portal', 'kine-admin', 'academy-portal'];
  sections.forEach(sec => {
    const el = document.getElementById(`section-${sec}`);
    if (el) el.classList.add('hidden');
  });
  
  const targetEl = document.getElementById(`section-${id}`);
  if (targetEl) {
    targetEl.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
  }
}

// --- MODALES Y MENÚS ---
function openPatientLogin() { 
  document.getElementById('loginPatientModal').classList.remove('hidden'); 
  lucide.createIcons(); 
}

function openSpecialistLogin() { 
  document.getElementById('loginSpecialistModal').classList.remove('hidden'); 
  lucide.createIcons(); 
}

function openAcademyLogin() { 
  document.getElementById('loginAcademyModal').classList.remove('hidden'); 
  lucide.createIcons(); 
}

function openAgendaModal() { 
  document.getElementById('agendaModal').classList.remove('hidden'); 
  lucide.createIcons(); 
}

function toggleMobileMenu() { 
  document.getElementById('mobileMenu').classList.toggle('hidden'); 
}

function closeGeneralModal() { 
  document.getElementById('generalModal').classList.add('hidden'); 
}

// --- LÓGICA DEL CUESTIONARIO (ETAPA 1) ---
function startQuestionnaire() { 
  formStep = 1; 
  updateStepUIForm(); 
  showSection('questionnaire'); 
}

function updateFormBranch() {
  const selected = document.querySelector('input[name="consultaTipo"]:checked');
  if (selected) formType = selected.value;
}

function nextStepForm() {
  if (formStep === 1) { 
    formStep = 2; 
  } else if (formStep === 2) { 
    formStep = 3; 
  } else {
    // Al finalizar el formulario (Paso 3)
    const name = document.getElementById('evalName').value;
    alert(`¡Gracias ${name || 'por tu solicitud'}!\n\nTu evaluación ha sido enviada. En breve recibirás un correo con el Diagnóstico Gratuito de uno de nuestros profesionales y los pasos a seguir.`);
    showSection('landing');
  }
  updateStepUIForm();
}

function prevStepForm() {
  if (formStep > 1) {
    formStep--;
    updateStepUIForm();
  }
}

function updateStepUIForm() {
  // Ocultar todas las secciones del formulario
  document.getElementById('formStep1').classList.add('hidden');
  document.getElementById('formStep2A').classList.add('hidden');
  document.getElementById('formStep2B').classList.add('hidden');
  document.getElementById('formStep3').classList.add('hidden');

  // Mostrar la sección correspondiente según el paso y el tipo de consulta
  if (formStep === 1) document.getElementById('formStep1').classList.remove('hidden');
  if (formStep === 2 && formType === 'dolor') document.getElementById('formStep2A').classList.remove('hidden');
  if (formStep === 2 && formType === 'prevencion') document.getElementById('formStep2B').classList.remove('hidden');
  if (formStep === 3) document.getElementById('formStep3').classList.remove('hidden');

  // Actualizar indicadores visuales de progreso
  const pct = Math.round((formStep / 3) * 100);
  document.getElementById('stepIndicator').innerText = `Paso ${formStep} de 3`;
  document.getElementById('progressBar').style.width = `${pct}%`;
  
  // Ocultar botón de retroceso en el paso 1
  document.getElementById('prevStepBtn').classList.toggle('hidden', formStep === 1);
  
  // Cambiar texto del botón final
  const nxtBtn = document.getElementById('nextStepBtn');
  if (nxtBtn) {
    nxtBtn.innerHTML = formStep === 3 
      ? `<span>Solicitar Diagnóstico Gratis</span><i data-lucide="check" class="w-4 h-4"></i>`
      : `<span>Siguiente</span><i data-lucide="arrow-right" class="w-4 h-4"></i>`;
  }
  
  lucide.createIcons();
}

// --- SIMULADORES (ETAPAS 2 Y 3) ---
function simulateEmailLink() { 
  showSection('checkout'); 
}

function simulatePayment() {
  alert("Procesando pago en pasarela segura...\n\n¡Pago Exitoso! Tu plan ha sido creado. En 2 a 3 días hábiles tu pauta estará lista. Te enviaremos tus credenciales al correo.");
  showSection('portal');
}

// --- LÓGICA DEL PORTAL PACIENTE (ETAPA 4) ---
function switchPatientTab(tabName) {
  // Ocultar todas las pestañas y resetear botones
  ['rutina', 'progreso', 'asistente'].forEach(tab => {
    const tabEl = document.getElementById(`tab-${tab}`);
    if(tabEl) tabEl.classList.add('hidden');
    
    const btnEl = document.getElementById(`tab-btn-${tab}`);
    if(btnEl) btnEl.className = 'flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl text-slate-500 hover:text-slate-700';
  });
  
  // Mostrar la pestaña seleccionada y activar su botón
  const targetTab = document.getElementById(`tab-${tabName}`);
  if(targetTab) targetTab.classList.remove('hidden');
  
  const targetBtn = document.getElementById(`tab-btn-${tabName}`);
  if(targetBtn) targetBtn.className = 'flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl transition-all bg-white text-primary-700 shadow-sm';
}

function toggleExercise(num) {
  isDoneEx = !isDoneEx;
  const btn = document.getElementById(`btn-ex-${num}`);
  
  if (btn) {
    if (isDoneEx) {
      btn.innerHTML = `<i data-lucide="check-circle-2" class="w-5 h-5"></i> Sesión Registrada`;
      btn.className = 'w-full py-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-black text-sm uppercase transition-all flex justify-center items-center gap-2';
      alert('¡Excelente! Has registrado tu sesión. Sumamos avance a tu progreso general.');
    } else {
      btn.innerHTML = `<i data-lucide="circle" class="w-5 h-5"></i> Registrar Sesión Completada`;
      btn.className = 'w-full py-4 rounded-xl border-2 border-slate-300 bg-slate-50 text-slate-600 font-black text-sm uppercase transition-all flex justify-center items-center gap-2';
    }
  }
  lucide.createIcons();
}

function playExerciseDemo(title, description) {
  const titleEl = document.getElementById('modalTitle');
  if(titleEl) titleEl.innerText = title;
  
  const descEl = document.getElementById('modalBodyText');
  if(descEl) descEl.innerText = description;
  
  const modal = document.getElementById('generalModal');
  if(modal) modal.classList.remove('hidden');
  
  lucide.createIcons();
}