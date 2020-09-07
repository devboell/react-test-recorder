module.exports = (testid) => {
  const selector = `'[data-testid="${testid}"]'`
  return `
    {
      // puppeteer workaround
      const checkbox = document.body.querySelector(${selector})
      if (checkbox.checked) checkbox.setAttribute('checked', '')
      else checkbox.removeAttribute('checked')
    }`
}
