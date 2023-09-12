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
			// sentinel.style.background = '#ffffff';
			document.body.append(sentinel);
			observer.observe(sentinel);
		}
	}
}

new Exit85();