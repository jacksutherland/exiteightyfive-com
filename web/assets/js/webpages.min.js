class Exit85
{
	constructor()
	{
		this.addHeaderEvents();
	}

	addHeaderEvents()
	{
		const header = document.querySelector('header');

		if(header)
		{
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting)
					{
						header.classList.remove("sticky");
					}
					else
					{
						header.classList.add("sticky");
					}
				});
			},
			{
				rootMargin: '0px 0px 0px 0px'
			});

			const sentinel = document.createElement('div');
			sentinel.style.position = 'absolute';
			sentinel.style.top = '100px';
			sentinel.style.height = '1px';
			sentinel.style.width = '1px';
			document.body.append(sentinel);
			observer.observe(sentinel);
		}
	}

	addForms()
	{
		document.getElementById('contact-form').addEventListener('submit', function(e)
		{
			e.preventDefault();

			var frm = this;
			var error = '';

			frm.querySelector('.info').classList.remove('is-error');
			frm.querySelector('.info').textContent = '';

			if(frm.querySelector('[name=first]').value.trim() === '')
			{
				error = 'First name is required';
			} 
			else if(frm.querySelector('[name=last]').value.trim() === '')
			{
				error = 'Last name is required';
			} 
			else if(frm.querySelector('[name=phone]').value.trim() === '' && !frm.querySelector('[name=email]').value.includes('@'))
			{
				error = 'A valid phone number or email address is required';
			}

			if (error === '')
			{
				fetch('/php/mailer.php',
				{
				 	method: 'POST',
					headers: {
				    	'Content-Type': 'application/x-www-form-urlencoded'
				  	},
				  	body: new URLSearchParams(new FormData(frm))
				})
				.then(response => response.text())
				.then(data => {
					if(data === 'success')
				  	{
				    	frm.reset();
				    	frm.querySelector('.info').textContent = 'Message Sent. We will be in touch. Thank you.';
				  	} 
				  	else
				  	{
				    	frm.querySelector('.info').classList.add('is-error');
				    	frm.querySelector('.info').textContent = 'Error encountered. Please call us at 704-996-3439.';
				  	}
				});

			} 
			else
			{
				frm.querySelector('.info').classList.add('is-error');
				frm.querySelector('.info').textContent = error;
			}

			return false;
		});
	}

	addPhotos()
	{
		const photos = document.querySelectorAll('section.photos figure');

		if(photos.length)
		{
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if(entry.isIntersecting)
					{
						entry.target.classList.add('in-view');
					}
					else
					{
						entry.target.classList.remove('in-view');
					}
				});
			}, { threshold: [0], rootMargin: '-45% 0% -45% 0%' });

			photos.forEach((photo) => {
				observer.observe(photo);
			});
		}
	}

	addSongs()
	{
		const photos = document.querySelectorAll('section.songs figure');

		if(photos.length)
		{
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if(entry.isIntersecting)
					{
						entry.target.classList.add('in-view');
					}
					else
					{
						entry.target.classList.remove('in-view');
					}
				});
			}, { threshold: [0], rootMargin: '-40% 0% -40% 0%' });

			photos.forEach((photo) => {
				observer.observe(photo);
			});
		}
	}
}

