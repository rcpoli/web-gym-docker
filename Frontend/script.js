document.getElementById('formContacto').addEventListener('submit', async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email  = document.getElementById('email').value;
  const mensaje= document.getElementById('mensaje').value;

  const resp = await fetch('/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, mensaje })
  });
  const data = await resp.json();
  document.getElementById('respuesta').innerHTML =
    `<div class="alert alert-success">${data.mensaje}</div>`;
  e.target.reset();
});

