/** Baut Links, die auch unter einem Unterpfad (z. B. GitHub Pages) funktionieren. */
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}
