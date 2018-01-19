const escapeHtml = string => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#96;'
  }
  return string.replace(/[&<>"'`]/g, t => map[t])
}

export default escapeHtml
