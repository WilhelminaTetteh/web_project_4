const showErrorMessage = function(input, form, {errorClass,inputErrorClass, ...rest}){
    const error = document.querySelector('#' + '-error');

    error.textContent = input.validationMessage;
    error.classList.add(errorClass)
    input.classList.add(inputErrorClass)
}

const checkInputValidity = function(input, form, rest){
    if(input.validity.valid){
        //hideErrorMessage
    } else {
        showErrorMessage(input, form, rest);
    }
}




const enableValidation =  function({formSelector,inputSelector, submitButtonSelector, ...rest}){
    const forms = [...document.querySelectorAll(formSelector)];
    console.log("form", forms)
    forms.forEach((form) =>{
        form.addEventListener('submit', ((e) => {
            e.preventDefault()
        }))
        const inputs = [...form.querySelectorAll(inputSelector)];
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                checkInputValidity(input, form, rest);
                // toggleButtonState
            })
        })
    })
}


enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible"
  }); 