// --- ZAPIS / ODCZYT (localStorage + pliki JSON) ---

function saveLocalState() {
    localStorage.setItem('mojelingo_progress', JSON.stringify(progress));
    localStorage.setItem('mojelingo_settings', JSON.stringify(settings));
}

function exportData() {
    const data = { progress: progress, settings: settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mojelingo_zapis.json';
    a.click();
    URL.revokeObjectURL(url);
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.progress) progress = data.progress;
            if (data.settings) settings = data.settings;
            saveLocalState();
            syncDifficultyCheckboxes();
            renderLessonTree();
            alert("Wczytano pomyślnie!");
        } catch (err) {
            alert("Błąd wczytywania pliku JSON");
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function resetProgress() {
    localStorage.removeItem('mojelingo_progress');
    progress = {};
    renderLessonTree();
}