
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2404-FTB-MT_WEB_PT/events`;

const state = {
  events: [],
  event:""
};

const eventsList = document.querySelector("#eventsList");
const addEventForm = document.querySelector("div");
addEventForm.addEventListener('submit', (e) => addOrEditEvent(e));
console.log(addEventForm)
const getEvents = async() => {
  try{
    const response = await fetch(API_URL);
    const result = await response.json();
    state.events = result.data;
    console.log(result);
  } catch(err){
    console.log(err);
  }
}

// Create-Post
const createEvent = async(newEvent) => {
  console.log(newEvent)
  try{
    const response = await fetch(API_URL, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent)
    })
    const result = await response.json();
    console.log('This is the result: ', result);
    state.events.push(result.data);
    render();
  }catch(err){
    console.log(err);
  }
}

//Delete
const deleteEvent = async (deletedId) => {
  console.log(deletedId);
  try{
    response = await fetch(`${API_URL}/${deletedId}`,{
      method: "DELETE",
    })
    const index = state.events.findIndex((event) => event.id === deletedId)
    state.events.splice(index, 1);
    render();
  }catch(err){
    console.log(err);
  }
}

const render = async() => {
  const eventElements = [];
  console.log(state.events, 'here in render')
  for(let i = 0; i < state.events.length; i++){
    const eventContainer = document.createElement('li');
    const eventName = document.createElement('h3');
    const eventDateTime = document.createElement('p');
    const eventLocation = document.createElement('p');
    const eventDescription = document.createElement('p');
    eventName.textContent = state.events[i].name;
    eventDateTime.textContent = state.events[i].date;
    eventLocation.textContent = state.events[i].location;
    eventDescription.textContent =state.events[i].description;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => {
      deleteEvent(state.events[i].id);
    })
    eventContainer.append(eventName, eventDateTime, eventLocation, eventDescription, deleteButton);
    // eventsList.append(eventContainer);
    eventElements.push(eventContainer);
  }
  eventsList.replaceChildren(...eventElements);
} 

async function addOrEditEvent (e){
 console.log(e.targeet);
 e.preventDefault();
 if(e.target.getAttribute("id") === "addEvent"){
  const newEventObj = {
    name:addEventForm.name.value,
    date: addEventForm.date.value,
    location: addEventForm.location.value,
    description: addEventForm.description.value
  }
  createEvent(newEventObj)
 }else{

 }
};

const addForm =  () => {
  
  const form = document.createElement('form');

  const nameLabel = document.createElement('label');
  const nameInput = document.createElement('input');
  
  const dateLabel = document.createElement('label');
  const dateInput = document.createElement('input');
  
  const locationLabel = document.createElement('label');
  const locationInput = document.createElement('input');

  const descriptionLabel = document.createElement('label');
  const descriptionInput = document.createElement('input');
  
  nameLabel.textContent = "Name";
  dateLabel.textContent = "Date";
  locationLabel.textContent = "Location";
  descriptionLabel.textContent = "Description";

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Event';

  addButton.addEventListener('click', (event)=>{
    event.preventDefault();
     const newEvent = {
      name: nameInput.value,
      date: dateInput.value,
      location: locationInput.value,
      description: descriptionInput.value
  }
    createEvent(newEvent)


  
})
form.append(nameLabel, nameInput, dateLabel, dateInput, locationLabel, locationInput, descriptionLabel, descriptionInput, addButton)
addEventForm.append(form);
}

async function init(){
  await getEvents();
  console.log(state);
  render();
  addForm();
}

init();