export async function loadMovies() {
  const [movies, actors, emmy, oscar] = await Promise.all([
    fetchEntity("movies"),
    fetchEntity("actors"),
    fetchEntity("emmy"),
    fetchEntity("oscar"),
  ]);

  const before = performance.now();
  const moviesDiv = document.getElementById("movies");
  const timeDiv = document.getElementById("time");
  moviesDiv.innerHTML = "";

  const actorMap = new Map(actors.map(actor => [actor.id, actor]));
  const oscarSet = new Set(oscar);
  const emmySet = new Set(emmy);

  for (const movie of movies) {
    const actorList = appendMovie(movie, moviesDiv);
    for (const actorId of movie.actorIds) {
      const actor = actorMap.get(actorId);
      if (actor) {
        const wonOscar = oscarSet.has(actorId);
        const wonEmmy = emmySet.has(actorId);
        actorList.appendChild(createListItem(actor, wonOscar, wonEmmy));
      }
    }
  }
  const after = performance.now();
  timeDiv.innerText = `Took: ${after - before}ms`;
}

function createListItem(actor, wonOscar, wonEmmy) {
  const li = document.createElement("li");
  li.innerText = `${actor.name}${wonOscar || wonEmmy ? ` (🏆)` : ""}`;
  return li;
}

function appendMovie(movie, moviesDiv) {
  const title = document.createElement("h2");
  title.innerText = movie.title;
  moviesDiv.appendChild(title);
  const ul = document.createElement("ul");
  moviesDiv.appendChild(ul);
  return ul;
}

async function fetchEntity(entity) {
  const response = await fetch(`/api/${entity}.json`);
  return response.json();
}
