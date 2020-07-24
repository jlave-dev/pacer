export function getSavedDocuments() {
  const documents = localStorage.getItem('documents') || '[]';
  return JSON.parse(documents);
}

export function setSavedDocuments(documents = {}) {
  localStorage.setItem('documents', JSON.stringify(documents));
}
