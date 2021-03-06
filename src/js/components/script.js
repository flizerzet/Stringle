const body = document.body;

const searchHeader = document.querySelector('.search-header')

if (searchHeader) {
	searchHeader.querySelector('.search-header__btn__wrapper').addEventListener('click', e => {
		searchHeader.classList.toggle('active')
		searchHeader.querySelector('.search-header__btn').classList.toggle('active');
		document.querySelector('.search-header__input').classList.toggle('active');
	})
}

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]

let d = new Date();


const year = d.getFullYear()
const date = d.getDate()
const dayName = days[d.getDay()]
const monthName = months[d.getMonth()]

const formatted = `${date} ${monthName} ${year}, ${dayName}`

document.querySelector('.header__date').textContent = formatted;


const progresses = document.querySelectorAll('.result__progress');

if (progresses) {
	progresses.forEach(progress => {
		const progressElem =  progress.querySelector('progress');
		const progressValue =  progress.querySelector('.result__progress_value');

		if (progressValue) {
			progressValue.textContent = progressElem.value * 100 + '%';
		}


		if (progressElem.value <= 25/100) {
			progress.classList.add('_red')
		}
	})
}

const userBtn = document.querySelector('.header__user');
const userMenu = document.querySelector('.user-menu');
const closeUserMenuBtn = document.querySelector('.user-menu__close')

if (userBtn && userMenu) {
	userBtn.addEventListener('click', () => {
		userMenu.classList.toggle('_active')
		body.classList.toggle('_lock')
	})

	closeUserMenuBtn.addEventListener('click', () => {
		userMenu.classList.remove('_active')
		body.classList.remove('_lock')
	})	
}