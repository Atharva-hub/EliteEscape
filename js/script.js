// Runs once the page has loaded
document.addEventListener('DOMContentLoaded', () => {
	setupNavigation();
	setupBookingButtons();
	setupBookingForm();
	setupDestinationSearch();
	setupPackageFilters();
	login();
});

function login(){
	// Login Function
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "avedpathak60@gmail.com" && password === "080403") {
        // Save login status
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        // Redirect to home page
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password!");
    }
});
}



// Which category each package belongs to
const packageCategories = {
	'kashmir paradise': 'luxury',
	'kerala backwaters': 'romantic',
	'rajasthan royal tour': 'family',
	'himachal adventure': 'adventure',
	'goa beach escape': 'budget',
	'uttarakhand spiritual': 'family',
	'north east explorer': 'adventure',
	'andaman islands': 'luxury',
};


function setupNavigation() {
	const nav = document.querySelector('nav');
	const toggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');
	if (!nav || !toggle || !navLinks) return;

	toggle.addEventListener('click', () => {
		nav.classList.toggle('nav-open');
	});


	navLinks.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => nav.classList.remove('nav-open'));
	});
}


function setupBookingButtons() {
	document.querySelectorAll('.book-now, button').forEach((button) => {
		if (button.textContent.trim().toLowerCase() === 'book now' || button.classList.contains('book-now')) {
			button.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.href = 'booking.html';
			});
		}
	});
}

function setupBookingForm() {
	const form = document.querySelector('.booking-form');
	if (!form) return;

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		alert('You will be contacted by our executive');
		form.reset();
	});
}


function setupDestinationSearch() {
	const searchInput = document.querySelector('#searchInput');
	const cards = document.querySelectorAll('.destination-card');
	if (!searchInput || !cards.length) return;

	searchInput.addEventListener('input', () => {
		const query = searchInput.value.trim().toLowerCase();

		cards.forEach((card) => {
			const matches = card.textContent.toLowerCase().includes(query);
			card.style.display = matches ? '' : 'none';
		});
	});
}

function setupPackageFilters() {
	const cards = document.querySelectorAll('.package-card');
	const buttons = document.querySelectorAll('.filter-btn');
	if (!cards.length || !buttons.length) return;

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const category = button.textContent.trim().toLowerCase();

			cards.forEach((card) => {
				const title = card.querySelector('.package-content h3')?.textContent.trim().toLowerCase() || '';
				const matches = category === 'all packages' || packageCategories[title] === category;
				card.style.display = matches ? '' : 'none';
			});

			// Highlight the active button
			buttons.forEach((b) => b.classList.toggle('active', b === button));
		});
	});
}