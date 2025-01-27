const API_URL = 'http://localhost:5000/api/links';

// Obtener todos los enlaces
async function fetchLinks() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener los enlaces');
    const data = await response.json();
    console.log(data); // Verifica que llegan los enlaces
    return data;
}


// Crear un nuevo enlace
async function createLink(link) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link),
    });
    if (!response.ok) throw new Error('Error al crear el enlace');
    return response.json();
}

// Votar por un enlace
async function voteLink(id) {
    const response = await fetch(`${API_URL}/${id}/vote`, {
        method: 'PATCH',
    });
    if (!response.ok) throw new Error('Error al votar por el enlace');
    return response.json();
}

// Agregar comentario a un enlace
async function addComment(id, comment) {
    const response = await fetch(`${API_URL}/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
    });
    if (!response.ok) throw new Error('Error al agregar comentario');
    return response.json();
}

async function fetchLinkDetails(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`); // GET /api/links/:id
        if (!response.ok) throw new Error('Error al obtener detalles del enlace');
        const link = await response.json();

        // Asegurarse de que los comentarios sean al menos un array vacío
        link.comments = link.comments || [];
        renderLinkDetails(link); // Renderizar detalles
    } catch (error) {
        alert('No se pudieron cargar los detalles: ' + error.message);
    }
}



async function fetchFilteredLinks(tag) {
    const response = await fetch(`${API_URL}/search?tag=${tag}`);
    if (!response.ok) throw new Error('Error al filtrar enlaces por tag');
    return response.json();
}

async function handleVote(id) {
    try {
        await voteLink(id);
        alert('Voto registrado correctamente.');
        const links = await fetchLinks();
        renderLinkList(links);
    } catch (error) {
        alert('Error al votar: ' + error.message);
    }
}

async function viewComments(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`); // Obtener detalles del enlace
        if (!response.ok) throw new Error('Error al obtener detalles del enlace');
        const link = await response.json();


    } catch (error) {
        alert('Error al cargar comentarios: ' + error.message);
    }
}
