// basic tools: position size calculator + notes saved to localStorage
document.addEventListener('DOMContentLoaded', () => {
  const accountSize = document.getElementById('accountSize');
  const riskPercent = document.getElementById('riskPercent');
  const stopPips = document.getElementById('stopPips');
  const calcBtn = document.getElementById('calcPosition');
  const result = document.getElementById('positionResult');

  calcBtn?.addEventListener('click', () => {
    const account = parseFloat(accountSize.value) || 0;
    const riskP = parseFloat(riskPercent.value) || 0;
    const stop = parseFloat(stopPips.value) || 0;
    if (!account || !riskP || !stop) {
      result.textContent = 'Please enter account, risk% and stop pips.';
      return;
    }
    // very simplified: position size = (account * (risk%/100)) / stop
    const riskAmount = account * (riskP / 100);
    const perPip = riskAmount / stop;
    result.textContent = `Risk amount: ${riskAmount.toFixed(2)} USD — approx ${perPip.toFixed(2)} USD per pip.`;
  });

  // notes storage
  const notes = document.getElementById('notes');
  const saveNotes = document.getElementById('saveNotes');
  const clearNotes = document.getElementById('clearNotes');

  // load
  try {
    const saved = localStorage.getItem('fta_notes');
    if (saved && notes) notes.value = saved;
  } catch {}

  saveNotes?.addEventListener('click', () => {
    try {
      localStorage.setItem('fta_notes', notes.value);
      alert('Notes saved locally.');
    } catch (e) {
      console.error(e);
    }
  });

  clearNotes?.addEventListener('click', () => {
    if (notes) notes.value = '';
    localStorage.removeItem('fta_notes');
  });
});
