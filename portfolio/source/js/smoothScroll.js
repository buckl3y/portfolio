function initializeSmoothScroll() {
    // Back to Top
    const backToTopLink = document.querySelector(".back-to-top");

    if (backToTopLink) {
        backToTopLink.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
        console.log("Back to Top link initialized.");
    } else {
        console.warn("Back to Top link not found.");
    }

    // Scroll Buttons
    const scrollButtons = document.querySelectorAll("button[data-scroll-target]");

    if (scrollButtons.length > 0) {
        scrollButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const targetSelector = button.dataset.scrollTarget;
                if (!targetSelector) {
                    //console.warn("Button missing data-scroll-target attribute:", button);
                    return;
                }

                const targetElement = document.querySelector(targetSelector);

                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                } else {
                    //console.warn(`Scroll target element not found: ${targetSelector}`);
                }
            });
        });
    } else {
    }
}