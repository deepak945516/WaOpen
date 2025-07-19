if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function () {
            console.log('ServiceWorker Registered')
        })
        .catch(function (error) {
            console.log('SW Regitration Failed:', error)
        })
} else {
    console.log('SW not present in navigator')
}

const inputFieldsContainer = document.querySelector(".input-fields-container")
const openWhatsApppButton = document.querySelector(".primary-button")


const fields = [
    { label: "Mobile Number", value: "", error: "Please enter a valid mobile number.", isRequired: true, type: "mobile-number", id: "mobile-number" },
]

const showInputFields = () => {
    let output = ""

    fields.forEach(
        ({ label, value, error, isRequired, type, id }) => {
            output += `
                <div class="outer-container">
                  <div class="inner-container">

                    <div class="field-label-container">
                    <p class="field-label">${label}<sup>${isRequired ? "*" : ""}</sup></p>
                    </div>

                    <div class="input-field-container">
                        <input id=${id} class="input-field" type=${type} placeholder="${label}">
                    </div>

                  </div>
                </div>
                `
        }
    )

    inputFieldsContainer.innerHTML = output
}

document.addEventListener("DOMContentLoaded", onContentLoaded)

function onContentLoaded() {
    showInputFields()
}

openWhatsApppButton.addEventListener('click', (event) => {
    const mobileNumber = document.getElementById('mobile-number').value.trim()
    const updatedMobileNumber = getLast10CharsWithoutSpaces(mobileNumber)

    console.log('Open WhatsApp button tapped', mobileNumber)
    console.log('Open WhatsApp button tapped', updatedMobileNumber)

    if (updatedMobileNumber.length === 10) {
        const url = `https://wa.me/${updatedMobileNumber}`
        window.location.href = url
    } else {
        alert(`Please enter a valid mobile number`)
    }
})

function getLast10CharsWithoutSpaces(inputString) {
    // Remove all spaces and all character except numbers
    const stringWithoutSpaces = inputString.replace(/\D+/g, '');

    // Get the last 10 characters
    // If string is shorter than 10 chars, it will return the whole string
    const last10Chars = stringWithoutSpaces.slice(-10);

    return last10Chars;
}
