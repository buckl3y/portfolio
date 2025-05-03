function initializeExperienceSlider() {
    const sliderContainer = document.querySelector(".experience-slider-container");
    const timeline = sliderContainer?.querySelector(".experience-timeline"); // Find timeline inside container
    const prevButton = document.getElementById("exp-prev-btn");
    const nextButton = document.getElementById("exp-next-btn");

    // Check if essential slider elements exist
    if (!sliderContainer || !timeline || !prevButton || !nextButton) {
        console.warn("Experience slider elements not found. Slider functionality disabled.");
        if (prevButton) prevButton.disabled = true;
        if (nextButton) nextButton.disabled = true;
        return; // Stop if elements are missing
    }

    const items = timeline.querySelectorAll(".experience-item");
    if (items.length === 0) {
        console.warn("No experience items found in the timeline.");
        prevButton.disabled = true;
        nextButton.disabled = true;
        return; // Stop if no items
    }

    // Get the timeline's left padding value (e.g., "1vw") and convert it to pixels
    let timelinePaddingLeftPx = 0;
    try {
        const timelineStyle = window.getComputedStyle(timeline);
        // Use getPropertyValue for reliability, parseFloat to handle "px", "vw" etc.
        // Note: vw calculation depends on viewport width at calculation time.
        // For simplicity here, we'll parse it, but a ResizeObserver might be needed
        // if the padding value *itself* needs recalculation on resize.
        // However, offsetLeft should account for this dynamically anyway.
        // Let's simplify: targetScroll = item.offsetLeft should work directly
        // because offsetLeft is relative to the timeline, and we scroll the container.
        // No, need to account for the visual offset. Let's calculate it once.
        timelinePaddingLeftPx = parseFloat(timelineStyle.paddingLeft) || 0;
    } catch (e) {
        console.error("Could not compute timeline padding:", e);
    }


    // --- Button State Update Function (Remains largely the same) ---
    const updateButtonStates = () => {
        requestAnimationFrame(() => {
            const currentScroll = sliderContainer.scrollLeft;
            const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;
            const tolerance = 2; // Allow for slight calculation inaccuracies

            prevButton.disabled = currentScroll <= tolerance;
            nextButton.disabled = currentScroll >= maxScroll - tolerance;

            // console.log(`Scroll: ${currentScroll.toFixed(1)}, MaxScroll: ${maxScroll.toFixed(1)}, Prev: ${prevButton.disabled}, Next: ${nextButton.disabled}`);
        });
    };

    // --- Scroll To Target Item Function ---
    const scrollToItem = (item) => {
        if (!item) return;

        // Calculate the target scroll position for the container.
        // We want the item's left edge (item.offsetLeft relative to the timeline)
        // to align visually near the container's left edge. Since the timeline
        // has padding, the item's visual start is offsetLeft + timelinePadding.
        // We want scrollLeft to equal item.offsetLeft.
        const targetScrollLeft = item.offsetLeft - timelinePaddingLeftPx;


        sliderContainer.scrollTo({
            left: targetScrollLeft,
            behavior: "smooth",
        });
    };

    // --- Event Listeners ---
    nextButton.addEventListener("click", () => {
        const currentScroll = sliderContainer.scrollLeft;
        let nextItem = null;

        // Find the first item whose left edge is significantly past the current scroll position + padding
        const searchThreshold = currentScroll + timelinePaddingLeftPx + 10; // Add tolerance (10px)

        for (const item of items) {
            if (item.offsetLeft > searchThreshold) {
                nextItem = item;
                break; // Found the first item that's "next"
            }
        }

        // If we found a next item, scroll to it
        if (nextItem) {
            scrollToItem(nextItem);
        } else {
            // Optional: If no item is strictly "next", maybe scroll fully to the end?
             sliderContainer.scrollTo({ left: sliderContainer.scrollWidth, behavior: 'smooth' });
        }
    });

    prevButton.addEventListener("click", () => {
        const currentScroll = sliderContainer.scrollLeft;
        let prevItem = null;

        // Find the last item whose left edge is before the current scroll position + padding
        const searchThreshold = currentScroll + timelinePaddingLeftPx - 10; // Subtract tolerance

        // Iterate backwards through items
        for (let i = items.length - 1; i >= 0; i--) {
            if (items[i].offsetLeft < searchThreshold) {
                prevItem = items[i];
                break; // Found the closest item that's "previous"
            }
        }

         // If we found a previous item, scroll to it
        if (prevItem) {
            scrollToItem(prevItem);
        } else {
             // Optional: If no item is strictly "previous", scroll to the beginning
             sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }
    });

    // Update button states on scroll
    sliderContainer.addEventListener("scroll", updateButtonStates, { passive: true });

    // Optional: Update on resize if layout might change significantly
    const resizeObserver = new ResizeObserver(() => {
        // Recalculate padding if it's viewport-dependent and critical? Usually offsetLeft handles this.
        // Primarily update button states as clientWidth/scrollWidth changes.
        updateButtonStates();
    });
    resizeObserver.observe(sliderContainer);


    // Initial check when the page loads
    // Use timeout to ensure layout is stable after potential font loading etc.
    setTimeout(updateButtonStates, 150);

    console.log("Experience slider initialized (Scroll-to-Item mode).");
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', initializeExperienceSlider);