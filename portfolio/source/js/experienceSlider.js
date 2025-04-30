function initializeExperienceSlider() {
    const sliderContainer = document.querySelector(".experience-slider-container");
    const prevButton = document.getElementById("exp-prev-btn");
    const nextButton = document.getElementById("exp-next-btn");

    // Check if essential slider elements exist
    if (!sliderContainer || !prevButton || !nextButton) {
        console.warn("Experience slider elements not found. Slider functionality disabled.");
        return; // Stop if elements are missing
    }

    // --- Configuration ---
    let scrollAmount = 400; // Default scroll amount
    const firstItem = sliderContainer.querySelector(".experience-item");

    if (firstItem) {
        const itemWidth = firstItem.offsetWidth; // Includes padding/border if box-sizing: border-box
        const itemStyle = window.getComputedStyle(firstItem);
        const itemMarginRight = parseInt(itemStyle.marginRight, 10) || 0; // Get margin or 0
        scrollAmount = itemWidth + itemMarginRight; // Scroll by item width + gap
    } else {
        console.warn("Could not find an experience item to calculate scroll amount. Using default.");
    }


    // --- Button State Update Function ---
    const updateButtonStates = () => {
        // Debounce or throttle might be good here for performance if needed,
        // but for simple cases, this is usually fine.
        requestAnimationFrame(() => { // Use rAF for smoother updates tied to rendering
            const currentScroll = sliderContainer.scrollLeft;
            const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;
            const tolerance = 1; // Tolerance for floating point inaccuracies

            prevButton.disabled = currentScroll <= tolerance;
            nextButton.disabled = currentScroll >= maxScroll - tolerance;
        });
    };

    // --- Event Listeners ---
    nextButton.addEventListener("click", () => {
        sliderContainer.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    });

    prevButton.addEventListener("click", () => {
        sliderContainer.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    });

    // Update button states on scroll
    sliderContainer.addEventListener("scroll", updateButtonStates, { passive: true }); // Use passive listener

    // Initial check when the page loads
    updateButtonStates();

    console.log("Experience slider initialized."); // Confirmation
}