const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container'); // 1. Ensure you have a container in your HTML with this ID

    //clear phone container cards before adding new card

    phoneContainer.textContent = '';

    //display show all button if there are more than 20 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 20){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    //display only 20 phones
    phones = phones.slice(0, 20);

    phones.forEach(phone => {
        // 2. Create a div for each phone card
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-base-100 w-96 shadow-xl';
        
        // 3. Use template literals for multi-line HTML
        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="${phone.phone_name}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>Brand: ${phone.brand}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-black">Buy Now</button>
                </div>
            </div>
        `;
        
        // 4. Append the card(child) to the container
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//handle search button
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
    loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }

}
