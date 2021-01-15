const editButton = document.querySelector('.profile__edit'); 
const closeButton = document.querySelector('.modal__button'); 
const form = document.querySelector('.form'); 



form.addEventListener('submit',(event) => {
    event.preventDefault();      
   

    const titleInput = document.querySelector('.form__input_type_title'); 
    const descriptionInput = document.querySelector('.form__input_type_description'); 



    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

     

    profileTitle.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;


    toggleModal()



    console.log('submit!!',titleInput.value, descriptionInput.value)    
} )

function toggleModal(){
    const modal = document.querySelector('.modal');
    modal.classList.toggle('modal_open');
}

editButton.addEventListener('click', toggleModal)
closeButton.addEventListener('click', toggleModal)
