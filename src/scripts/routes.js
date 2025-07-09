function buildRoute(componentName) {
  return `../components/${componentName}/${componentName}.html`;
}

export function goTo(componentName) {
  const path = buildRoute(componentName);

  fetch(path, { method: "HEAD" })
    .then((res) => {
      if (res.ok) {
        window.location.href = path;
      } else {
        alert(`La ruta "${componentName}" no existe.`);
      }
    })
    .catch((err) => {
      alert("Error al verificar ruta.");
    });
}
