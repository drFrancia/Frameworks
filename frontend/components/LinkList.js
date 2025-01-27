function renderLinkList(links) {
    const app = document.getElementById('app');
    app.innerHTML = '<h2>Lista de Enlaces</h2>';

    if (links.length === 0) {
        app.innerHTML += '<p>No hay enlaces disponibles.</p>';
        return;
    }

    const list = document.createElement('ul');
    links.forEach(link => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="${link.url}" target="_blank">${link.url}</a>
            <p>Tags: ${link.tags.join(', ')}</p>
            <p>Votos: ${link.votes}</p>
        `;

        const voteButton = document.createElement('button');
        voteButton.textContent = 'Votar';
        voteButton.addEventListener('click', () => handleVote(link._id));

        const commentsButton = document.createElement('button');
        commentsButton.textContent = 'Comentarios';
        commentsButton.addEventListener('click', () => fetchLinkDetails(link._id));

        listItem.appendChild(voteButton);
        listItem.appendChild(commentsButton);
        list.appendChild(listItem);
    });
    app.appendChild(list);
}
