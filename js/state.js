// --- STAN APLIKACJI ---
// Ładowany jako pierwszy — pozostałe moduły korzystają z tych zmiennych.

let manifest = null;
let progress = JSON.parse(localStorage.getItem('mojelingo_progress') || '{}');
let settings = JSON.parse(localStorage.getItem('mojelingo_settings') || '{"types":["multiple_choice","word_blocks","typing"]}');

let currentCourseId = null;
let currentLessonData = null;
let currentLessonId = null;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let isAnswered = false;
let correctCount = 0;
let selectedBlocks = [];