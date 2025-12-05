// simple localStorage helpers
const STORAGE_KEY = 'fta_bookmarks';

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProgress(strategyId) {
  try {
    const arr = loadProgress();
    if (!arr.includes(strategyId)) arr.push(strategyId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error('storage error', e);
  }
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

