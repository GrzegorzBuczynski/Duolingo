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

function showView(viewId) {
    document.getElementById('homeView').classList.toggle('hidden', viewId !== 'homeView');
    document.getElementById('quizView').classList.toggle('hidden', viewId !== 'quizView');
}

function showHome() {
    showView('homeView');
    renderLessonTree();
}