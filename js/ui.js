// --- POMOCNICZE FUNKCJE UI ---

function toggleSubmitState(isActive) {
    const submit = document.getElementById('submitBtn');
    submit.disabled = !isActive;
    submit.classList.toggle('active', isActive);
    if (!isAnswered) submit.innerText = 'Sprawdź';
}

function resetFeedbackUI() {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback hidden';
    feedback.innerText = '';
    toggleSubmitState(false);
}

// Przełącza topbar na tryb domowy (zakładki) i pokazuje panel lekcji
function showHome() {
    document.getElementById('topbarHome').classList.remove('hidden');
    document.getElementById('topbarQuiz').classList.add('hidden');
    document.getElementById('quizView').classList.add('hidden');
    showTab('lessons');
    renderLessonTree();
}

// Przełącza topbar na tryb lekcji i pokazuje panel quizu
function enterQuiz() {
    document.getElementById('topbarHome').classList.add('hidden');
    document.getElementById('topbarQuiz').classList.remove('hidden');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('show'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('quizView').classList.remove('hidden');
    document.getElementById('quizView').classList.add('show');
}