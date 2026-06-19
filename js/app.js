// --- INICJALIZACJA APLIKACJI I BINDOWANIE ZDARZEŃ ---

async function initApp() {
    try {
        const response = await fetch('manifest.json');
        manifest = await response.json();
        currentCourseId = manifest.courses[0].id;
        syncDifficultyCheckboxes();
        renderLessonTree();
    } catch (error) {
        document.getElementById('lessonTree').innerText = "Błąd ładowania manifestu!";
    }
}

// Bindowanie eventów (zastępuje atrybuty onclick w HTML)
document.addEventListener('DOMContentLoaded', () => {
    // Przyciski nagłówka — panele
    document.getElementById('btnCourse').onclick = () => togglePanel('coursePanel');
    document.getElementById('btnDifficulty').onclick = () => togglePanel('diffPanel');

    // Przyciski nagłówka — zapis / wczytaj / reset
    document.getElementById('btnExport').onclick = exportData;
    document.getElementById('btnImport').onclick = () => document.getElementById('importFile').click();
    document.getElementById('btnReset').onclick = resetProgress;

    // Import pliku
    document.getElementById('importFile').onchange = handleFileImport;

    // Checkboxy trudności
    document.getElementById('diff_multiple').onchange = () => toggleQuestionType('multiple_choice');
    document.getElementById('diff_word').onchange = () => toggleQuestionType('word_blocks');
    document.getElementById('diff_typing').onchange = () => toggleQuestionType('typing');

    // Przycisk powrotu w quizie
    document.getElementById('btnBack').onclick = showHome;

    // Przycisk sprawdzania odpowiedzi
    document.getElementById('submitBtn').onclick = handleSubmit;
});

// Uruchomienie aplikacji
initApp();
