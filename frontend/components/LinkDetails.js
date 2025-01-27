function renderLinkDetails(link) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2>Detalles del Enlace</h2>
        <a href="${link.url}" target="_blank">${link.url}</a>
        <p>Tags: ${link.tags.join(', ')}</p>
        <p>Votos: ${link.votes}</p>
        <h3>Comentarios</h3>
        <ul>
            ${link.comments.length > 0 
                ? link.comments.map(comment => `<li>${comment}</li>`).join('') 
                : '<li>No hay comentarios</li>'}
        </ul>
        <button onclick="loadLinkList()">Volver</button>
    `;
}
