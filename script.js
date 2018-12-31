document.addEventListener('DOMContentLoaded', () => {
    main();
});

async function main() {
    const listElement = document.querySelector('#project-list');

    const projects = await getProjectsData();
    document.querySelector('#loading').style.display = 'none';

    for (const project of projects) {
        listElement.append(createProjectCard(project));
    }
}

async function getProjectsData() {
    const res = await fetch('projects.json');
    const json = await res.json();
    return json.projects;
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project';
    card.innerHTML = `
    <div class='project-thumb-image'>
        <img alt='${project.name}' src='${project.path}screenshot.png'/>
    </div>
    <div class='project-info'>
        <div class='project-name'>${project.name}</div>
        <div class='project-des'>${project.description}</div>
    </div>
    <div class='project-link'>
        <a href='${project.path}' target='_self' rel='noopenner noreferrer'>See project</a>
    </div>
    `;

    return card;
}
