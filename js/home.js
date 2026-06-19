// --- WIDOK GŁÓWNY: zakładki, drzewo lekcji ---

function showTab(tabName) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('show'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const panelMap = { lessons: 'lessonsPanel', courses: 'coursePanel', difficulty: 'diffPanel', settings: 'settingsPanel' };
    const panelId = panelMap[tabName];
    if (panelId) document.getElementById(panelId).classList.add('show');
    document.getElementById('tab-' + tabName).classList.add('active');
}

function toggleQuestionType(type) {
    const idx = settings.types.indexOf(type);
    if (idx > -1) settings.types.splice(idx, 1);
    else settings.types.push(type);
    saveLocalState();
    renderLessonTree();
}

function syncDifficultyCheckboxes() {
    document.getElementById('diff_multiple').checked = settings.types.includes('multiple_choice');
    document.getElementById('diff_word').checked = settings.types.includes('word_blocks');
    document.getElementById('diff_typing').checked = settings.types.includes('typing');
}

function renderCourseList() {
    const list = document.getElementById('courseList');
    list.innerHTML = '';
    manifest.courses.forEach(course => {
        const item = document.createElement('div');
        item.className = 'course-item';
        item.innerText = `${course.icon} ${course.name}`;
        item.onclick = () => {
            currentCourseId = course.id;
            renderLessonTree();
        };
        list.appendChild(item);
    });
    showTab('courses');
}

function renderLessonTree() {
    const tree = document.getElementById('lessonTree');
    tree.innerHTML = '';
    const course = manifest.courses.find(c => c.id === currentCourseId);
    if (!course) return;
    let prevCompleted = true;
    course.lessons.forEach((lesson, index) => {
        tree.appendChild(createNode(lesson, index, prevCompleted));
        prevCompleted = progress[currentCourseId]?.[lesson.id]?.completed;
    });
}

function createNode(lesson, index, isUnlocked) {
    const node = document.createElement('div');
    const prog = progress[currentCourseId]?.[lesson.id] || {};
    node.className = `node ${prog.completed ? 'completed' : ''}`;
    node.style.opacity = isUnlocked ? '1' : '0.5';
    node.innerHTML = `${index + 1}<span class="tooltip">${prog.completed ? `Poprawność: ${prog.accuracy}%` : 'Nieukończona'}</span>`;
    if (isUnlocked) node.onclick = () => startLesson(lesson);
    return node;
}