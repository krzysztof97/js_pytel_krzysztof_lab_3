class Note {
    constructor(title, description, color, attach) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.attach = attach;
        this.createdTime = new Date();
    }
}

let notka = new Note('Tak', 'Fajna', '#aaa', false);

notka.noga = 'reka';

console.log(notka);

// let addNoteModal = document.querySelector("#addNoteModal");

// let newNoteButton = document.querySelector("#newNoteButton");

// newNoteButton.addEventListener('click', function(e) {
//     addNoteModal.classList.add('modal--visible');
// });