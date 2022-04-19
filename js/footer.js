const current_year = new Date().getFullYear();
document.querySelectorAll('footer .year').forEach(el => {
	if (el.innerText != current_year) {
		el.innerText += ' – ' + current_year;
	}
});
