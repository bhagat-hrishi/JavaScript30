const addButton = document.getElementById('add__button');
const noteInput = document.querySelector('.noteInput');
const noteButtons = noteInput.querySelectorAll('button')
const submitInputNote = noteButtons[0]
const zeroNote = document.querySelector('.no-note')
const noteList = document.querySelector('.inbox');
const textNote  =  document.getElementById('note');



const notes = [];


function displayNoteInput()
{
    console.log('calling display note function')
    noteInput.classList.toggle('invisible');

}

const renderNote = (note,date)=>{
    const newNoteElement = document.createElement('li');

    newNoteElement.className = 'note-element';
    newNoteElement.innerHTML = `
    <input type="checkbox"></input>
    <p class="note--text" >${note}</p>
    <p class="note--date" >${date}</p>
    
    `
    // console.dir(newNoteElement)
    noteList.append(newNoteElement);
    console.log(allNotes);

}

function submitAndAddNote()
{
    zeroNote.classList.toggle('invisible');
    let data = textNote.value;
    let date = new Date();
    const currentDate = String(date.getDay())+ " / "+String(date.getMonth())+" / " +String(date.getFullYear()) ;
    console.log(currentDate);
    let note = {
        'noteData': data,
        'noteDate' :  currentDate
    }
    notes.push(note);
    console.log(notes);
    renderNote(note.noteData , note.noteDate);

}   

// function handleCheck(event){
//     console.log(event)
// }

// checkboxes.forEach(checkbox => checkbox.addEventListener('click',handleCheck) );



addButton.addEventListener('click',displayNoteInput);
submitInputNote.addEventListener('click',submitAndAddNote);