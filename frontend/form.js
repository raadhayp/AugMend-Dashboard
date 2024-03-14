document.addEventListener("DOMContentLoaded", function() {
    const medicationsYes = document.getElementById("medicationsYes");
    const medicationDetails = document.getElementById("medicationDetails");
    const addMedicationButton = document.getElementById("addMedicationButton");
    const medicationInputs = document.getElementById("medicationInputs");

    medicationsYes.addEventListener("change", function() {
        if (medicationsYes.checked) {
            medicationDetails.style.display = "block";
        } else {
            medicationDetails.style.display = "none";
            clearMedicationInputs();
        }
    });

    addMedicationButton.addEventListener("click", function() {
        const newMedicationInput = document.createElement("div");
        newMedicationInput.classList.add("medication-input");

        const input = document.createElement("input");
        input.type = "text";
        input.name = "medication";
        input.required = true;
        input.placeholder = "Enter medication details";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");

        newMedicationInput.appendChild(input);
        newMedicationInput.appendChild(deleteButton);
        medicationInputs.appendChild(newMedicationInput);

        deleteButton.addEventListener("click", function() {
            newMedicationInput.remove();
        });
    });

    function clearMedicationInputs() {
        medicationInputs.innerHTML = '';
    }

    const maritalStatusDropdown = document.getElementById("maritalStatus");
    const otherMaritalStatusInput = document.getElementById("otherMaritalStatus");

    maritalStatusDropdown.addEventListener("change", function() {
        if (maritalStatusDropdown.value === "other") {
            otherMaritalStatusInput.style.display = "block";
            otherMaritalStatusInput.setAttribute("required", true);
        } else {
            otherMaritalStatusInput.style.display = "none";
            otherMaritalStatusInput.removeAttribute("required");
        }
    });

    const surveyForm = document.getElementById("surveyForm");

    surveyForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            surveyForm.submit();
        } else {
            alert("Please fill out all required fields.");
        }
    });

    function validateForm() {
        const inputs = document.querySelectorAll("input, select");
        for (const input of inputs) {
            if (input.required && !input.value) {
                return false;
            }
        }
        return true;
    }
});
