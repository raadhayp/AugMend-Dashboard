// form.js

// Wait for the DOM content to be fully loaded before executing the JavaScript code
document.addEventListener("DOMContentLoaded", function() {
    // Get references to various elements in the form
    const medicationsYes = document.getElementById("medicationsYes");
    const medicationDetails = document.getElementById("medicationDetails");
    const addMedicationButton = document.getElementById("addMedicationButton");
    const medicationInputs = document.getElementById("medicationInputs");
    const maritalStatusDropdown = document.getElementById("maritalStatus");
    const otherMaritalStatusInput = document.getElementById("otherMaritalStatus");
    const surveyForm = document.getElementById("surveyForm");

    // Event listener for changes in medication input
    medicationsYes.addEventListener("change", function() {
        if (medicationsYes.checked) {
            medicationDetails.style.display = "block"; // Show medication details section
        } else {
            medicationDetails.style.display = "none"; // Hide medication details section
            clearMedicationInputs(); // Clear medication input fields
        }
    });

    // Event listener for "Add Medication" button
    addMedicationButton.addEventListener("click", function() {
        // Create a new medication input field
        const newMedicationInput = document.createElement("div");
        newMedicationInput.classList.add("medication-input");

        // Create input field for medication details
        const input = document.createElement("input");
        input.type = "text";
        input.name = "medication";
        input.required = true;
        input.placeholder = "Enter medication details";

        // Create button to delete medication input field
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");

        // Append input field and delete button to the medication input container
        newMedicationInput.appendChild(input);
        newMedicationInput.appendChild(deleteButton);
        medicationInputs.appendChild(newMedicationInput);

        // Event listener for deleting medication input field
        deleteButton.addEventListener("click", function() {
            newMedicationInput.remove(); // Remove the medication input field
        });
    });

    // Function to clear medication input fields
    function clearMedicationInputs() {
        medicationInputs.innerHTML = ''; // Clear the medication input container
    }

    // Event listener for changes in marital status dropdown
    maritalStatusDropdown.addEventListener("change", function() {
        if (maritalStatusDropdown.value === "other") {
            otherMaritalStatusInput.style.display = "block"; // Show "Other" marital status input field
            otherMaritalStatusInput.setAttribute("required", true); // Make "Other" marital status input field required
        } else {
            otherMaritalStatusInput.style.display = "none"; // Hide "Other" marital status input field
            otherMaritalStatusInput.removeAttribute("required"); // Remove required attribute
        }
    });

    // Event listener for form submission
    surveyForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        if (validateForm()) { // Validate the form before submission
            const formData = new FormData(surveyForm); // Get form data
            const surveyData = {
                name: formData.get('name'), // Get name from form data
                email: formData.get('email'), // Get email from form data
                age: formData.get('age'), // Get age from form data
                maritalStatus: formData.get('maritalStatus'), // Get marital status from form data
                otherMaritalStatus: formData.get('otherMaritalStatus') || '', // Get other marital status from form data (or empty string if not provided)
                seenTherapist: formData.get('seenTherapist'), // Get seen therapist from form data
                medications: formData.get('medications') // Get medications from form data
            };

            try {
                // Send survey data to the server
                const response = await fetch('http://localhost:3000/surveys', {
                    method: 'POST', // Use POST method
                    headers: {
                        'Content-Type': 'application/json' // Set content type to JSON
                    },
                    body: JSON.stringify(surveyData) // Convert survey data to JSON string
                });

                if (response.ok) {
                    const data = await response.json(); // Parse response JSON
                    console.log(data); // Log response data to the console
                    alert("Survey data submitted successfully!"); // Display success message
                    surveyForm.reset(); // Clear the form after submission
                } else {
                    console.error('Error submitting survey data:', response.statusText); // Log error message to the console
                    alert("Failed to submit survey data. Please try again."); // Display error message
                }
            } catch (error) {
                console.error('Error submitting survey data:', error); // Log error message to the console
                alert("An error occurred while submitting survey data."); // Display error message
            }
        } else {
            alert("Please fill out all required fields."); // Display error message for incomplete form
        }
    });

    // Function to validate the form
    function validateForm() {
        const inputs = document.querySelectorAll("input, select"); // Select all input and select elements in the form
        for (const input of inputs) {
            if (input.required && !input.value) { // Check if required input field is empty
                return false; // Return false if any required field is empty
            }
        }
        return true; // Return true if all required fields are filled out
    }
});
