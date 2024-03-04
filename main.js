

// ---------------------- formulaire inscription----------------------------------------




// Je dois créer mes variables
const form = document.querySelector("#signup")

const nameEl = document.forms.formValidate.name
const firstNameEl = document.forms.formValidate.firstname
const emailEl = document.forms.formValidate.email
const destinationEl = document.forms.formValidate.destination
const typeVoyageAllerRetour = document.querySelector('input[value="allerRetour"]');
const typeVoyageAllerSimple = document.querySelector('input[value="allerSimple"]');
const departEl = document.forms.formValidate.depart
const retourEl = document.forms.formValidate.retour
const nombreEl = document.forms.formValidate.nombre



const PRIX_ALLER_SIMPLE = 50;
const PRIX_ALLER_RETOUR = 80;
const prixTotal = document.querySelector('#prixTotal');


// J'ai besoin d'une fonction qui vérifie si la valeur d'un input est vide
function isRequired(elementValue) {
    if (elementValue == "") {
        return false
    } else {
        return true
    }
}
// J'ai besoin d'une fonction de vérification de taille
function isBetween(length, min, max) {
    if (length < min || length > max) {
        return false
    } else {
        return true
    }
}
// J'ai besoin d'une fonction qui interdit les mots "root", "afpa", "deus" et qui n'autorise que la saisie de lettre
function isNameValid(elementValue) {
    const re = /^(?!.\b)[a-zA-Z]+$/;
    return re.test(elementValue);
}
// J'ai besoin d'une fonction pour valider le format email ainsi qu'interdire les entrées de type "@yopmail.com", "root@afpa.fr", "afpa@afpa.com", "deus@afpa.org"
function isValidEmail(email) {
    const regex = /^(?!.*@yopmail\.com$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// ----------- fonction nombre de 1 à 10 places---------------

function isNombreValid(elementValue) {
    const re = /^(?:[1-9]|10)$/; // Accepte uniquement les nombres de 1 à 10
    return re.test(elementValue);
}

// ------------------------------------
// J'ai besoin d'une fonction qui permette d'afficher les erreurs en rouge
function showError(input, message) {
    const formField = input.parentElement;
    formField.classList.remove("success")// class css
    formField.classList.add("error")// class css
    const errorEl = formField.querySelector("small")
    errorEl.textContent = message
}
// J'ai besoin d'une fonction qui permette d'afficher l'element valide en vert
function showSuccess(input) {
    const formField = input.parentElement;
    formField.classList.remove("error")// class css
    formField.classList.add("success")// class css
    const errorEl = formField.querySelector("small")
    errorEl.textContent = ""
}

const checkName = () => {
    let valid = false
    const min = 3,
        max = 25
    const name = nameEl.value.trim()// permet de supprimer les espaces
    if (!isRequired(name)) {
        showError(nameEl, "Le nom d'utilisateur ne peut pas être vide");
    } else if (!isBetween(name.length, min, max)) {
        showError(
            nameEl,
            `Le nom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
        )
    } else if (!isNameValid(name)) {
        showError(
            nameEl,
            `Le nom d'utilisateur ne doit contenir que des lettres.`
        )
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;

}
const checkFirstName = () => {
    let valid = false
    const min = 3,
        max = 25
    const firstName = firstNameEl.value.trim()// permet de supprimer les espaces
    if (!isRequired(firstName)) {
        showError(firstNameEl, "Le prénom d'utilisateur ne peut pas être vide");
    } else if (!isBetween(firstName.length, min, max)) {
        showError(
            firstNameEl,
            `Le prénom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
        )
    } else if (!isNameValid(firstName)) {
        showError(
            firstNameEl,
            `Le prénom d'utilisateur ne doit contenir que des lettres.`
        )
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;

}
const checkEmail = () => {
    let valid = false
    const email = emailEl.value.trim()
    if (!isRequired(email)) {
        showError(
            emailEl,
            `l'email ne peut être vide.`
        )
    } else if (!isValidEmail(email)) {
        showError(
            emailEl,
            `l'email doit respecter le format email et ne peut un yopmail.com.`
        )
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}


// // --------------------------------------------------------

const checkDepart = () => {
    let valid = false;
    const departVal = departEl.value;
    const depart = new Date(departVal);
    const today = new Date();

    // Mettre à jour la date de départ minimale à aujourd'hui
    const minDepartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (depart < minDepartDate) {
        showError(departEl, "La date de départ ne peut pas être antérieure à aujourd'hui");
    } else if (!isRequired(departVal)) {
        showError(departEl, "Vous devez renseigner votre date de départ");
    } else {
        showSuccess(departEl);
        valid = true;
    }

    return valid;
};

const checkRetour = () => {
    let valid = false;
    const departVal = departEl.value;
    const retourVal = retourEl.value;
    const depart = new Date(departVal);
    const retour = new Date(retourVal);
    
    if (retour < depart) {
        showError(retourEl, "La date de retour ne peut pas être antérieure à la date de départ");
    }  else {
        showSuccess(retourEl);
        valid = true;
    }

    return valid;
};

// Fonction pour désactiver ou activer la date de retour en fonction du type de voyage sélectionné
const gererDateRetour = () => {
    if (typeVoyageAllerSimple.checked) {
        retourEl.disabled = true;
        checkRetour.disabled = true;
    } else {
        retourEl.disabled = false;
    }
};

// Écouteurs d'événements pour détecter les changements dans les boutons radio
typeVoyageAllerRetour.addEventListener('change', gererDateRetour);
typeVoyageAllerSimple.addEventListener('change', gererDateRetour);

// Appel initial pour s'assurer que l'état est correct au chargement de la page
gererDateRetour();


//----------- destination  -----------
const checkDestination = () => {
    let valid = false
    const destination = destinationEl.value
    if (!isRequired(destination)) {
        showError(destinationEl, "Choisissez une déstination")
    } else {
        showSuccess(destinationEl);
        valid = true;
    }
    return valid;
}




// -------test 2 nombre-------------------------
const checkNombre = () => {
    let valid = false;
    const nombre = nombreEl.value.trim();

    if (!isRequired(nombre)) {
        showError(nombreEl, "Veuillez saisir le nombre de places (de 1 à 10).");
    } else if (!isNombreValid(nombre)) {
        showError(nombreEl, "Le nombre de places doit être compris entre 1 et 10.");
    } else {
        showSuccess(nombreEl);
        valid = true;
    }

    return valid;
}



// ----------------- calcul prix total ---------------

function calculerPrix(typeVoyage, nombre) {
    let prixTotal = 0;
    if (typeVoyage === "allerSimple") {
        prixTotal = PRIX_ALLER_SIMPLE * nombre;
    } else if (typeVoyage === "allerRetour") {
        prixTotal = PRIX_ALLER_RETOUR * nombre;
    }
    return prixTotal;
}

function updatePrix() {
    const typeVoyage = document.querySelector('input[name="typeVoyage"]:checked').value;
    const nombre = parseInt(document.getElementById('nombre').value);
    const prix = calculerPrix(typeVoyage, nombre);
    
    // Mettre à jour le contenu de l'élément span avec le prix calculé
    prixTotal.textContent = `Prix ttc : ${prix} €`;
}

// Écouter les changements dans le formulaire et mettre à jour le prix
document.getElementById('signup').addEventListener('change', updatePrix)


// -----------vider formulaire---------------------------



function clearForm() {
    form.reset();
}




// Je dois mettre en place un ecouteur d'évenement sur le submit de ma forme qui doit empecher la soumission du formulaire au serveur afin de pouvoir emettre les erreurs coté front sans rechargement de la page
form.addEventListener('submit', () => {
    // e.preventDefault()
    let nameOk = checkName(),
        firstNameOk = checkFirstName(),
        emailOk = checkEmail(),
        departOk = checkDepart(),
        retourOk = checkRetour(),
        destinationOk = checkDestination(),
        nombreOk = checkNombre(),
        prixOk = prixTotal.textContent; 


    let isFormValid = nameOk && firstNameOk && emailOk && destinationOk && departOk && retourOk && nombreOk && prixOk;
    if (isFormValid) {
        console.log('Tout est Ok pour l\'envoi');
        saveFormData();
        clearForm();
    }
})

// ----------debounce-----------------

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};


form.addEventListener(
    "input",
    debounce(function (e) {
        switch (e.target.id) {
            case "name":
                checkName();
                break;
            case "firstname":
                checkFirstName();
                break;
            case "email":
                checkEmail();
                break;
            case "depart":
                checkDepart();
                break;
            case "retour":
                checkRetour();
                break;
            case "destination":
                checkDestination();
                break;
            case "nombre":
                checkNombre();
                break;
            case "prixTotal":
                calculerPrix();
                break;
        }
    })
);


// -------------local storage-------------------------


// Pour sauvegarder les données du formulaire dans le localStorage, 
// vous pouvez créer un objet contenant toutes les informations nécessaires et le stocker sous forme de chaîne JSON dans le localStorage.
// //  Voici comment vous pouvez faire cela :

// Fonction pour sauvegarder les données du formulaire dans le localStorage

function saveFormData() {
    const formData = {
        name: nameEl.value,
        firstName: firstNameEl.value,
        email: emailEl.value,
        destination: destinationEl.value,
        typeVoyage: typeVoyageAllerRetour.checked ? "allerRetour" : "allerSimple",
        depart: departEl.value,
        retour: retourEl.value,
        nombre: nombreEl.value,
        prix: prixTotal.textContent // Récupérer la valeur du prix total depuis le span
    };
    const formD = JSON.stringify(formData);
    const form = "form";
    const formId = localStorage.length+1;
    localStorage[form + formId] = formD;

}


// Fonction pour récupérer les données du formulaire depuis le localStorage

// function getFormData() {
//     const formData = localStorage.getItem('formData');
//     if (formData) {
//         const parsedData = JSON.parse(formData);
//         // Restaurer les valeurs des champs du formulaire avec les données récupérées
//         nameEl.value = parsedData.name;
//         firstNameEl.value = parsedData.firstName;
//         emailEl.value = parsedData.email;
//         destinationEl.value = parsedData.destination;
//         if (parsedData.typeVoyage === "allerRetour") {
//             typeVoyageAllerRetour.checked = true;
//         } else {
//             typeVoyageAllerSimple.checked = true;
//         }
//         departEl.value = parsedData.depart;
//         retourEl.value = parsedData.retour;
//         nombreEl.value = parsedData.nombre;
//     }
// }

// // Appel initial pour restaurer les données du formulaire depuis le localStorage
// getFormData();


// Avec ces modifications, les données du formulaire seront sauvegardées dans le localStorage lors de la soumission du formulaire si toutes les validations sont réussies.
//  De plus, les données seront restaurées dans le formulaire lorsque la page sera rechargée, permettant ainsi à l'utilisateur de voir ses saisies précédentes.


