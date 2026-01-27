const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const contactList = document.getElementById("contactList");
const errorMessage = document.getElementById("errorMessage");
const jsExplanation = document.getElementById("jsExplanation");

document.getElementById("addBtn").addEventListener("click", createContact);
document.getElementById("clearBtn").addEventListener("click", clearList);

function explain(text) {
  jsExplanation.textContent = text;
}

function createContact() {
  explain(
    "createContact() körs. " +
    "Inputfälten kontrolleras. " +
    "En ny kontakt skapas i DOM:en och sparas i Local Storage."
  );

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const nameRegex = /^[A-Za-zÅÄÖåäö\s]+$/;
  const phoneRegex = /^[0-9]+$/;

if (!name || !phone) {
  errorMessage.textContent =
    "Båda fälten måste vara ifyllda.";
  return;
}

if (!nameRegex.test(name)) {
  errorMessage.textContent =
    "Namnet får endast innehålla bokstäver.";
  return;
}

if (!phoneRegex.test(phone)) {
  errorMessage.textContent =
    "Telefonnumret får endast innehålla siffror.";
  return;
}
  errorMessage.textContent = "";

  const contactDiv = document.createElement("div");
  contactDiv.className = "contact";

  const nameField = document.createElement("input");
  nameField.value = name;
  nameField.disabled = true;

  const phoneField = document.createElement("input");
  phoneField.value = phone;
  phoneField.disabled = true;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Ändra";
  editBtn.addEventListener("click", () =>
    toggleEdit(nameField, phoneField, editBtn)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Radera";
  deleteBtn.addEventListener("click", () =>
    deleteContact(contactDiv)
  );

  contactDiv.append(nameField, phoneField, editBtn, deleteBtn);
  contactList.appendChild(contactDiv);

  saveToLocalStorage();
  nameInput.value = "";
  phoneInput.value = "";
}

function toggleEdit(nameField, phoneField, button) {
  if (nameField.disabled) {
    explain(
      "toggleEdit() körs. Inputfälten låses upp."
    );
    nameField.disabled = false;
    phoneField.disabled = false;
    button.textContent = "Spara";
  } else {
    explain(
      "toggleEdit() körs igen. Uppgifterna valideras och sparas."
    );

    if (!nameField.value.trim() || !phoneField.value.trim()) {
      errorMessage.textContent =
        "En befintlig kontakt får inte sparas tom.";
      return;
    }
    

    errorMessage.textContent = "";
    nameField.disabled = true;
    phoneField.disabled = true;
    button.textContent = "Ändra";
    saveToLocalStorage();
  }
}

function deleteContact(contactDiv) {
  explain(
    "deleteContact() körs. Kontakten tas bort."
  );
  contactDiv.remove();
  saveToLocalStorage();
}

function clearList() {
  explain(
    "clearList() körs. Alla kontakter raderas."
  );
  contactList.innerHTML = "";
  localStorage.removeItem("contacts");
}

function saveToLocalStorage() {
  const contacts = [];

  document.querySelectorAll(".contact").forEach(contact => {
    const inputs = contact.querySelectorAll("input");
    contacts.push({
      name: inputs[0].value,
      phone: inputs[1].value
    });
  });

  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("contacts"));
  if (!data) return;

  data.forEach(contact => {
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    createContact();
  });
}

loadFromLocalStorage();