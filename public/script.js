document.getElementById('searchForm').addEventListener('submit', function(event){
    event.preventDefault();

    const searchTitle = document.getElementById('searchTitle').value;

    fetch(`/search?title=${searchTitle}`)
    .then((response => response.json()))
    .then(data => {
        console.log(data);
        displayEvents(data);

    }).catch(error => console.error('Error:', error));
});  

// filter by date
document.getElementById('filterForm').addEventListener('submit', function(event){
event.preventDefault();

const start_date = document.getElementById('startDate').value;
const end_date = document.getElementById('endDate').value;

fetch(`/filter?startDate=${start_date}&endDate=${end_date}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    displayEvents(data);
})
.catch(error => { console.error('Error:', error) });
});

function displayEvents(events) {
const eventsContainer = document.querySelector(".event-container");
eventsContainer.innerHTML = '';

events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = "event-card";

    eventCard.innerHTML = `
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <p>Participants: ${event.participants}</p>
        <p>Start Date: ${event.start_date}</p>
        <p>End Date: ${event.end_date}</p>
        ${user && user.id === event.user_id ? `
            <a href="/update/${event.id}" class="btn btn-warning">Update</a>
            <form action="/delete/${event.id}" method="POST" class="d-inline">
                <button type="submit" class="btn btn-danger">Delete</button>
            </form>
        ` : ''}
    `;

    eventsContainer.appendChild(eventCard);
});
}

document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        const confirmation = confirm('Are you sure you want to delete this event?');
        if (!confirmation) {
            event.preventDefault();
        }
    });
});
