document.getElementById('view-links').addEventListener('click', async () => {
    try {
        const links = await fetchLinks();
        renderLinkList(links);
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('add-link').addEventListener('click', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2>Añadir Enlace</h2>
        <form id="add-link-form">
            <input type="url" id="url" placeholder="URL" required>
            <input type="text" id="tags" placeholder="Tags (separados por comas)" required>
            <button type="submit">Guardar</button>
        </form>
    `;
    
    document.getElementById('add-link-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = document.getElementById('url').value;
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
        try {
            await createLink({ url, tags });
            alert('Enlace creado correctamente');
        const links = await fetchLinks();
            renderLinkList(links);
        } catch (error) {
            alert(error.message);
    }
    });
});

document.getElementById('filter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tag = document.getElementById('filter-tag').value.trim();
    if (!tag) {
        alert('Por favor, ingresa un tag para buscar.');
        return;
    }

    try {
        const filteredLinks = await fetchFilteredLinks(tag);
        renderLinkList(filteredLinks);
    } catch (error) {
        alert(error.message);
    }
});


const app = document.getElementById('app');
app.innerHTML = `
    <h2>Comentarios</h2>
    <ul>
        ${link.comments.length > 0 
            ? link.comments.map(comment => `<li>${comment}</li>`).join('')
            : '<li>No hay comentarios</li>'}
    </ul>
    <form id="add-comment-form">
        <textarea id="comment-text" placeholder="Escribe tu comentario" required></textarea>
        <button type="submit">Agregar Comentario</button>
    </form>
    <button onclick="loadLinkList()">Volver</button>
`;

// Agregar manejador para el formulario de nuevo comentario
document.getElementById('add-comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const comment = document.getElementById('comment-text').value.trim();
    if (!comment) {
        alert('El comentario no puede estar vacío.');
        return;
    }

    try {
        await addComment(linkId, comment);
        alert('Comentario agregado exitosamente.');
        viewComments(linkId); // Recargar comentarios
    } catch (error) {
        alert('Error al agregar comentario: ' + error.message);
    }
});
