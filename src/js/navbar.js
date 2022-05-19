document.querySelectorAll('.navbar .toggler').forEach(el => {
	el.addEventListener('click', () => {
		const menu = el.parentNode.querySelector('.links');
		menu.classList.toggle('open');
		if (menu.classList.contains('open')) {
			menu.style.maxHeight = menu.scrollHeight + 'px';
			el.classList.add('open');
		} else {
			menu.style.maxHeight = null;
			el.classList.remove('open');
		}
	});
});
