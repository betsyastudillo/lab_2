const agendaForm = document.getElementById("form-agenda");
const eventList = document.getElementById('list-events');

loadEvents();

agendaForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const nameEvent = document.getElementById('nameEvent').value;
  const detailEvent = document.getElementById('detailEvent').value;
  const dateEvent = document.getElementById('dateEvent').value;
  
  if(nameEvent && detailEvent && dateEvent){
    
    const eventCard = createEventCard(nameEvent, detailEvent, dateEvent);
    eventList.appendChild(eventCard);

    storeEventinLocalStorage(nameEvent, detailEvent, dateEvent);

    // Limpiar los campos del formulario
    document.getElementById('nameEvent').value = "";
    document.getElementById('detailEvent').value = "";
    document.getElementById('dateEvent').value = "";

  }
});

function createEventCard(nameEvent, detailEvent, dateEvent) {

    const card = document.createElement("div");
    card.classList.add('card');

    const internalCard = document.createElement("div");
    card.classList.add('card-internal');  

    const nameTask = document.createElement('h5');
    const detailsTask = document.createElement('p');
    const dateTask = document.createElement('p');

    nameTask.textContent = nameEvent;
    detailsTask.textContent = detailEvent;
    dateTask.textContent = dateEvent;

    const completeBtn = createButton("✔", "completed-btn");
    const deleteBtn = createButton("X", "delete-btn");

    completeBtn.addEventListener("click", () => {
      card.classList.toggle("completed");
    });

    deleteBtn.addEventListener("click", () => {

      if(confirm("¿Segur@ que quieres borrar este evento?")){

        card.remove();

        removeEventFromLocalStorage(nameEvent); 

      }
    });

    
    internalCard.append(completeBtn, nameTask, detailsTask, dateTask, deleteBtn);

    card.appendChild(internalCard);

    return card;
}

function createButton(text, className) {

    const btn = document.createElement("span");

    btn.textContent = text;
    btn.className = className;

    return btn;
}

function storeEventinLocalStorage(nameEvent, detailEvent, dateEvent) {

  const events = JSON.parse(localStorage.getItem('events')) || [];

  events.push({ name: nameEvent, detail: detailEvent, date: dateEvent });

  localStorage.setItem('events', JSON.stringify(events));
}

function loadEvents() {

  const events = JSON.parse(localStorage.getItem('events')) || [];

  events.forEach(event => {

    const { name, detail, date } = event;
    const eventCard = createEventCard(name, detail, date);

    eventList.appendChild(eventCard);

  });
}

function removeEventFromLocalStorage(nameEvent) {

  const events = JSON.parse(localStorage.getItem('events')) || [];
  const updatedEvents = events.filter(event => event.name !== nameEvent);

  localStorage.setItem('events', JSON.stringify(updatedEvents));

}

function filterEvents() {

  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const eventCards = document.querySelectorAll('#list-events .card');

  eventCards.forEach(card => {

    const name = card.querySelector('h5').textContent.toLowerCase();
    const details = card.querySelector('p').textContent.toLowerCase();

    if (name.includes(searchInput) || details.includes(searchInput)) {

      card.style.display = '';
      
    } else {

      card.style.display = 'none';

    }

  });
  
}
