document.addEventListener('DOMContentLoaded', () => {
	initNavigation();
	initBookingButtons();
	initBookingForm();
	initDestinationSearch();
	initPackageFiltering();
});

const packageCategoryMap = {
	'kashmir paradise': ['luxury'],
	'kerala backwaters': ['romantic'],
	'rajasthan royal tour': ['family'],
	'himachal adventure': ['adventure'],
	'goa beach escape': ['budget'],
	'uttarakhand spiritual': ['family'],
	'north east explorer': ['adventure'],
	'andaman islands': ['luxury'],
};

function initNavigation() {
	const nav = document.querySelector('nav');
	const toggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');

	if (!nav || !toggle || !navLinks) {
		return;
	}

	const closeMenu = () => {
		nav.classList.remove('nav-open');
		toggle.setAttribute('aria-expanded', 'false');
	};

	toggle.addEventListener('click', () => {
		const isOpen = nav.classList.toggle('nav-open');
		toggle.setAttribute('aria-expanded', String(isOpen));
	});

	navLinks.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			closeMenu();
		}
	});
}

function initBookingButtons() {
	document.addEventListener('click', (event) => {
		const clickedButton = event.target.closest('button');

		if (!clickedButton) {
			return;
		}

		const buttonLabel = clickedButton.textContent.trim().toLowerCase();
		const isBookNowButton = clickedButton.classList.contains('book-now') || buttonLabel === 'book now';

		if (!isBookNowButton) {
			return;
		}

		event.preventDefault();
		window.location.href = 'booking.html';
	});
}

function initBookingForm() {
	const bookingForm = document.querySelector('.booking-form');

	if (!bookingForm) {
		return;
	}

	bookingForm.addEventListener('submit', (event) => {
		event.preventDefault();
		alert('You will be contacted by our executive');
		bookingForm.reset();
	});
}

function initDestinationSearch() {
	const searchInput = document.querySelector('#searchInput');
	const searchButton = document.querySelector('.search-box button');
	const destinationCards = Array.from(document.querySelectorAll('.destination-card'));

	if (!searchInput || !destinationCards.length) {
		return;
	}

	const updateResults = () => {
		filterDestinationCards(destinationCards, searchInput.value);
		updateDestinationStatus(destinationCards, searchInput.value);
	};

	searchInput.addEventListener('input', updateResults);

	if (searchButton) {
		searchButton.addEventListener('click', updateResults);
	}

	updateResults();
}

function initPackageFiltering() {
	const packageCards = Array.from(document.querySelectorAll('.package-card'));
	const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

	if (!packageCards.length || !filterButtons.length) {
		return;
	}

	const updatePackages = (category) => {
		filterPackageCards(packageCards, category);
		updatePackageStatus(packageCards, category);
		setActiveFilterButton(filterButtons, category);
	};

	filterButtons.forEach((button) => {
		button.addEventListener('click', () => {
			updatePackages(button.textContent.trim());
		});
	});

	updatePackages('All Packages');
}

function filterDestinationCards(destinationCards, query) {
	const normalizedQuery = query.trim().toLowerCase();

	destinationCards.forEach((card) => {
		const cardText = card.textContent.toLowerCase();
		const isVisible = !normalizedQuery || cardText.includes(normalizedQuery);
		card.style.display = isVisible ? '' : 'none';
	});
}

function updateDestinationStatus(destinationCards, query) {
	const normalizedQuery = query.trim();
	let statusElement = document.querySelector('.search-status');

	if (!statusElement) {
		statusElement = createStatusElement('search-status');
		const searchContainer = document.querySelector('.search-container');
		searchContainer?.insertAdjacentElement('afterend', statusElement);
	}

	const visibleCount = destinationCards.filter((card) => card.style.display !== 'none').length;

	statusElement.textContent = normalizedQuery
		? visibleCount
			? `Showing ${visibleCount} destination${visibleCount === 1 ? '' : 's'} for "${normalizedQuery}".`
			: `No destinations match "${normalizedQuery}".`
		: `Showing all ${destinationCards.length} destinations.`;
}

function filterPackageCards(packageCards, category) {
	const normalizedCategory = category.toLowerCase();

	packageCards.forEach((card) => {
		const title = card.querySelector('.package-content h3')?.textContent.trim().toLowerCase() || '';
		const categories = packageCategoryMap[title] || [];
		const matches = normalizedCategory === 'all packages' || categories.includes(normalizedCategory);
		card.style.display = matches ? '' : 'none';
	});
}

function updatePackageStatus(packageCards, category) {
	const normalizedCategory = category.toLowerCase();
	let statusElement = document.querySelector('.packages-status');

	if (!statusElement) {
		statusElement = createStatusElement('packages-status');
		const filterSection = document.querySelector('.filter-section');
		filterSection?.insertAdjacentElement('afterend', statusElement);
	}

	const visibleCount = packageCards.filter((card) => card.style.display !== 'none').length;

	statusElement.textContent = normalizedCategory === 'all packages'
		? `Showing all ${packageCards.length} packages.`
		: visibleCount
			? `Showing ${visibleCount} package${visibleCount === 1 ? '' : 's'} in ${normalizedCategory}.`
			: `No packages found for ${normalizedCategory}.`;
}

function setActiveFilterButton(filterButtons, category) {
	const normalizedCategory = category.toLowerCase();

	filterButtons.forEach((button) => {
		button.classList.toggle('active', button.textContent.trim().toLowerCase() === normalizedCategory);
	});
}

function createStatusElement(className) {
	const statusElement = document.createElement('p');
	statusElement.className = className;
	statusElement.setAttribute('aria-live', 'polite');
	statusElement.style.margin = '0 auto 16px';
	statusElement.style.width = 'min(1200px, calc(100% - 40px))';
	statusElement.style.color = '#555';
	statusElement.style.fontSize = '15px';
	statusElement.style.textAlign = 'center';
	return statusElement;
}
