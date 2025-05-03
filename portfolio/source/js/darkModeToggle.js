function initializeDarkModeToggle() {
    const toggleCheckbox = document.getElementById('dark-mode-toggle-checkbox');
    const body = document.body;

    // Check if the checkbox exists
    if (!toggleCheckbox) {
        console.warn("Dark mode toggle checkbox not found.");
        return; // Stop if the element isn't found
    }

    const applyThemeVisuals = (theme) => {
      if (theme === 'dark') {
        body.classList.add('dark-mode');
        toggleCheckbox.checked = true; // Ensure checkbox matches state
      } else {
        body.classList.remove('dark-mode');
        toggleCheckbox.checked = false; // Ensure checkbox matches state
      }
    };

    // Set the default state on load
    body.classList.remove('dark-mode'); 
    toggleCheckbox.checked = false;     

    toggleCheckbox.addEventListener('change', () => {
      // Toggle theme based on the checkbox's current state AFTER the change
      applyThemeVisuals(toggleCheckbox.checked ? 'dark' : 'light');
    });

    console.log("Dark mode toggle switch initialized (no initial theme detection).");
}
document.addEventListener('DOMContentLoaded', initializeDarkModeToggle);