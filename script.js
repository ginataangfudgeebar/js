// 1. Select the form elements
const form = document.getElementById('registrationForm');
const successBox = document.getElementById('success-box');
const errorBox = document.getElementById('error-box');

// 2. Add an event listener for the 'submit' event
form.addEventListener('submit', function(event) {
    // Prevent the default form submission (prevents page reload)
    event.preventDefault();
    
    // Always hide boxes initially when submitting
    successBox.style.display = 'none';
    errorBox.style.display = 'none';

    // Run the validation function
    if (validateForm()) {
        // Kapag TAMA lahat:
        showSuccess();
    } else {
        // Kapag MALI o KULANG:
        showError();
    }
});

// Function to show Red Error Box
function showError() {
    // Show the red box
    errorBox.style.display = 'block';
    
    // Show alert popup
    alert("Submission Failed! Please check the red fields.");
    
    // Scroll to top so user sees the red box
    window.scrollTo(0, 0);
}

// 3. Main Validation Function
function validateForm() {
    let isValid = true; // Assume form is valid initially

    // --- Validate Full Name ---
    const fullName = document.getElementById('fullName');
    if (fullName.value.trim() === "") {
        setError(fullName, "Full Name is required.");
        isValid = false;
    } else {
        setSuccess(fullName);
    }

    // --- Validate Contact Number ---
    const contactNumber = document.getElementById('contactNumber');
    const contactValue = contactNumber.value.trim();
    const phonePattern = /^[0-9]{11}$/; 
    
    if (contactValue === "") {
        setError(contactNumber, "Contact number is required.");
        isValid = false;
    } else if (!phonePattern.test(contactValue)) {
        setError(contactNumber, "Must be exactly 11 digits (numbers only).");
        isValid = false;
    } else {
        setSuccess(contactNumber);
    }

    // --- Validate Email ---
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (email.value.trim() === "") {
        setError(email, "Email address is required.");
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        setError(email, "Please enter a valid email (e.g., name@email.com).");
        isValid = false;
    } else {
        setSuccess(email);
    }

    // --- Validate Address (Single Textarea) ---
    const address = document.getElementById('address');
    if (address.value.trim() === "") {
        setError(address, "Address is required.");
        isValid = false;
    } else {
        setSuccess(address);
    }

    // --- Validate Gender ---
    const genderGroup = document.getElementsByName('gender');
    const genderError = document.getElementById('error-gender');
    let genderSelected = false;

    for (let i = 0; i < genderGroup.length; i++) {
        if (genderGroup[i].checked) {
            genderSelected = true;
            break;
        }
    }

    if (!genderSelected) {
        genderError.innerText = "Please select a gender.";
        genderError.classList.add('visible');
        isValid = false;
    } else {
        genderError.classList.remove('visible');
    }

    // --- Validate Academic Program ---
    const academicInfo = document.getElementById('academicInfo');
    if (academicInfo.value.trim() === "") {
        setError(academicInfo, "Academic Program is required.");
        isValid = false;
    } else {
        setSuccess(academicInfo);
    }

    // --- Validate Year Level ---
    const year = document.getElementById('year');
    if (year.value === "") {
        setError(year, "Please select a year level.");
        isValid = false;
    } else {
        setSuccess(year);
    }

    return isValid;
}

// Helper functions
function setError(inputElement, message) {
    const errorDisplay = document.getElementById('error-' + inputElement.id);
    inputElement.classList.add('input-error');
    if(errorDisplay) {
        errorDisplay.innerText = message;
        errorDisplay.classList.add('visible');
    }
}

function setSuccess(inputElement) {
    const errorDisplay = document.getElementById('error-' + inputElement.id);
    inputElement.classList.remove('input-error');
    if(errorDisplay) {
        errorDisplay.classList.remove('visible');
    }
}

function showSuccess() {
    // Hide red box if visible
    errorBox.style.display = 'none';

    // Show alert popup
    alert("SUCCESS! \n\nRegistration Complete. Your information has been submitted.");

    // Show Green Box
    successBox.style.display = 'block';
    
    window.scrollTo(0, 0);

    setTimeout(() => {
        successBox.style.display = 'none';
        form.reset();
        const inputs = document.querySelectorAll('.input-error');
        inputs.forEach(input => input.classList.remove('input-error'));
    }, 3000);
}

function resetForm() {
    form.reset();
    successBox.style.display = 'none';
    errorBox.style.display = 'none'; // Hide error box on reset
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
    const errorMsgs = document.querySelectorAll('.error-message');
    errorMsgs.forEach(msg => msg.classList.remove('visible'));
}