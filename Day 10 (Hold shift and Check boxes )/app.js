const addNoteBtn = document.getElementById('add-note-btn')
const noteInputSection = document.querySelector('.note-input-section');
const inputNoteSubmit = document.querySelector('.note-submit');
const inputNoteCancel = document.querySelector('.note-cancel');
const allnotesList = document.querySelector('.note-list');
const noNote = document.querySelector('.no-note')
const inputNoteTitle = document.getElementById('title')
const inputNoteText = document.getElementById('note');
const showAllNoteBtn = document.querySelector('.all-notes')

const searchInput = document.getElementById('search');



searchInput.focus();

//Array to store all notes


class Note{
    constructor(description,date,id,noteTitle){
        this.noteId = id
        this.tittle = noteTitle
        this.note = description
        this.noteDate = date 
    }
}

class AllNotes{
    constructor(){
        this.id = -1;
        this.notes = [];
        this.increaseAnimationDelay = 0.5;
        this.originalAnimation = 0.5;
    }
    deleteNote(id){
        console.log(this.notes)
        let noteIndex = 0;
        for(const note of this.notes){
            if(note.noteId === id)
                break;
            noteIndex++;
        }
        console.log(noteIndex);
        this.notes.splice(noteIndex , 1);//remove element from array
       allnotesList.children[noteIndex].remove(); // remove item from DOM
    //    console.log(this.notes)
    }
    submitInputNote(){ 
        let desc = inputNoteText.value;
        let title = inputNoteTitle.value;
        title.toUpperCase();
        if(title.trim()=='')
            title = 'UNTITLED'
        if(desc.trim() === ''){
            alert('Please enter somethig');
        }else{
            let date = new Date();
            console.log((new Date() ))
            const currentDate = date.getDay()+' / '+date.getMonth()+' / '+date.getFullYear();
            this.id ++;
            let inputNote = new Note(desc,currentDate,this.id,title);
            
            this.notes.push(inputNote);
            // notes[0] = inputNote;
            console.log(this.notes)
             let noteElement = document.createElement('li');
                        noteElement.classList.add('single-note');
                        noteElement.innerHTML = `
                        <h2 class="note-title">${inputNote.tittle}</h2>
                        <li>${inputNote.note}</li>
                        <li class="note-date">${inputNote.noteDate}</li>            
                        <button class="note-delete">Delete</button>
                        `

            noteElement.style.animationDelay = `${this.originalAnimation}s`;
            console.log(noteElement.style.animationDelay)
            
            // Increasing animation dealy for next item
            this.originalAnimation += this.increaseAnimationDelay;
            this.increaseAnimationDelay = this.increaseAnimationDelay + 1;
            let noteDeleteButton = noteElement.querySelector('.note-delete');
            noteDeleteButton.addEventListener('click',this.deleteNote.bind(this,this.id));
            allnotesList.append(noteElement);
            noteInputSection.classList.toggle('hide-element');
        }
    }
    renderAndUpdateUi(){
        console.log('inside render')

        //if noteInput section is visible then hide that
        if( ! noteInputSection.classList.contains('hide-element'))
            noteInputSection.classList.add('hide-element');

        if(this.notes.length === 0){
        
            noNote.classList.toggle('invisible');
        }else{
            allnotesList.classList.toggle('invisible');
        }
        for(let i=0 ;i<this.notes.length ;i++ ){
            console.log(allnotesList.children[i].children[0]);
        }
    }
    clearInputNode(){
        noteInputSection.classList.toggle('hide-element')
    }
    renderAddNote(){

        searchInput.blur();//remove focus
        inputNoteText.focus();


        //if noNote text present add invisible class to it to hide
        if(! noNote.classList.contains('invisible'))
            noNote.classList.add('invisible')
        
        //if notes are showing then hide it

        if(! allnotesList.classList.contains('invisible'))
            allnotesList.classList.add('invisible')

        
        searchInput.value = '';//remove text from search box 
        noteInputSection.classList.toggle('hide-element');
        
        console.log(noteInputSection.className);
    }
    getNotesCount(){
        return this.notes.length;
    }

}


let allnotes = new AllNotes();

function searchMatches(){
    
    let searchText = searchInput.value;
    let noteData ;
    let listElement ;
    let title ;
    for(let i=0 ;i<allnotes.getNotesCount() ;i++ ){
            title = allnotesList.children[i].children[0].innerHTML
            listElement = allnotesList.children[i].children[1];

           
            noteData = listElement.innerHTML;
            //  console.log('title :',title , 'value' , noteData);
            //remove invisible 
            listElement.parentElement.classList.remove('invisible')
            if(searchText)
            {
                //
                if(!noteData.includes(searchText) || !!title.includes(searchText))
                {
                    listElement.parentElement.classList.add('invisible')
                }
                    
            }
            // if(allnotesList.children[i].children[0])
        }
}

showAllNoteBtn.addEventListener('click',allnotes.renderAndUpdateUi.bind(allnotes))
addNoteBtn.addEventListener('click',allnotes.renderAddNote.bind(allnotes))
inputNoteSubmit.addEventListener('click',allnotes.submitInputNote.bind(allnotes))
inputNoteCancel.addEventListener('click',allnotes.clearInputNode)

