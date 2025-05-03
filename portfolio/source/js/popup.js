function initializePopup() {
    const projectItems = document.querySelectorAll('.project-item');
    const popup = document.getElementById('project-popup');
    const popupOverlay = document.getElementById('project-popup-overlay');
    const popupCloseBtn = document.getElementById('popup-close');
    const popupImage = document.getElementById('popup-image');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupSkillsList = document.getElementById('popup-skills');

    // Check if essential popup elements exist
    if (!popup || !popupOverlay || !popupCloseBtn || !popupImage || !popupTitle || !popupDescription || !popupSkillsList) {
        console.warn("Popup elements not found. Popup functionality disabled.");
        return; // Stop if elements are missing
    }

    //Function to open the popup
    function openPopup(projectData) {
        popupTitle.textContent = projectData.title;
        popupImage.src = projectData.img;
        popupImage.alt = `${projectData.title} Screenshot`;
        popupDescription.textContent = projectData.desc;

        // Clear previous skills
        popupSkillsList.innerHTML = '';

        // Populate skills list
        if (projectData.skills) {
            const skills = projectData.skills.split(',').map(skill => skill.trim());
            skills.forEach(skill => {
                if (skill) {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    popupSkillsList.appendChild(li);
                }
            });
        }

        // Show the popup and overlay
        popup.removeAttribute('hidden');
        popupOverlay.removeAttribute('hidden');
        popupCloseBtn.focus(); // Focus close button
    }

    // Function to close the popup
    function closePopup() {
        popup.setAttribute('hidden', true);
        popupOverlay.setAttribute('hidden', true);
    }

    //Event Listeners for Popup

    // Add click listener to each project item
    projectItems.forEach(item => {
        // Ensure the item has the necessary data attributes before adding listener
        if (item.dataset.title && item.dataset.img && item.dataset.desc && item.dataset.skills) {
            item.addEventListener('click', () => {
                const projectData = {
                    title: item.dataset.title || 'Project Details',
                    img: item.dataset.img || '',
                    desc: item.dataset.desc || 'No description available.',
                    skills: item.dataset.skills || ''
                };
                openPopup(projectData);
            });

            // Allow opening with Enter/Space key
            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const projectData = {
                        title: item.dataset.title || 'Project Details',
                        img: item.dataset.img || '',
                        desc: item.dataset.desc || 'No description available.',
                        skills: item.dataset.skills || ''
                    };
                    openPopup(projectData);
                }
            });
        } else {
            console.warn("Project item missing data attributes:", item);
        }
    });

    // Close button listener
    popupCloseBtn.addEventListener('click', closePopup);

    // Overlay click listener
    popupOverlay.addEventListener('click', closePopup);

    // Escape key listener
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !popup.hasAttribute('hidden')) {
            closePopup();
        }
    });
}