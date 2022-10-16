let shortenButton = document.querySelector('.link-btn');
let inputField = document.getElementById('input-link');
let alertMessage = document.querySelector('.alert-msg');
let mainContent = document.querySelector('.content');
let mainWrapper = document.querySelector('.main-wrapper');
let branchSection = document.querySelector('.branch-section')
let menuBar = document.querySelector('.menu');
const modalOverlay = document.querySelector('.modal-overlay');
const navDetails = document.querySelector('.nav_details');

async function fetchShortenLink() {
    let text = inputField.value , url = 'https://api.shrtco.de/v2/shorten?url=';
    console.log("text : ", text);

    if(text.length <= 0) {
        inputField.classList.add('alert');
        inputField.classList.add('placeholder');
        return;
    } else {
        url += text;
        let response = await fetch(url);
        if(!response.ok) {
            alertMessage.textContent += 'Please add a link';
            inputField.value = "";
            inputField.classList.add('alert');
            inputField.classList.add('placeholder');;
        }

        const data = await response.json();
        const result = data.result;
        let resultLayout = `<div class="link-resut">
                            <span class="original">${result.original_link}</span>
                            <span class="shorten-link">${result.full_short_link}</span>
                            <button class="copy">Copy</button>
                            </div>`;
        branchSection.insertAdjacentHTML('afterbegin', resultLayout);

        // reset input element
        alertMessage.textContent = "";
        inputField.classList.remove('alert');
        inputField.value = "";
        inputField.classList.remove('placeholder');
    }
}

shortenButton.addEventListener('click', fetchShortenLink);

function showModal () {
    navDetails.classList.toggle('display-flex');
    modalOverlay.classList.toggle('display-block');
}

if(menuBar) menuBar.addEventListener('click', showModal);

modalOverlay.addEventListener('click', () => {
    navDetails.classList.toggle('display-flex');
    modalOverlay.classList.toggle('display-block');
})
