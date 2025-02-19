export async function loadMovies() {
  const [movies, actors, emmy, oscar] = await Promise.all([
    fetchEntity("movies"),
    fetchEntity("actors"),
    fetchEntity("emmy"),
    fetchEntity("oscar"),
  ]);

  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = "";
  for (const movie of movies) {
    appendTitle(movie, moviesDiv);
    const list = appendList(moviesDiv);
    for (const actorId of movie.actorIds) {
      const actor = actors.find((actor) => actor.id === actorId);
      if (actor) {
        const wonOscar = oscar.some((award) => award === actorId);
        const wonEmmy = emmy.some((award) => award === actorId);
        const li = createListItem(actor, wonOscar, wonEmmy);
        list.appendChild(li);
      }
    }
  }
}

function createListItem(actor, wonOscar, wonEmmy) {
  const li = document.createElement("li");
  li.innerText = `${actor.name}${wonOscar || wonEmmy ? ` (🏆)` : ""}`;
  return li;
}

function appendList(moviesDiv) {
  const ul = document.createElement("ul");
  moviesDiv.appendChild(ul);
  return ul;
}

function appendTitle(movie, moviesDiv) {
  const title = document.createElement("h2");
  title.innerText = movie.title;
  moviesDiv.appendChild(title);
}

async function fetchEntity(entity) {
  const response = await fetch(`/api/${entity}.json`);
  return response.json();
}
