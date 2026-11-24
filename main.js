const defaultColor = {
    'N. Virginia': '#e6194b',
    Ohio: '#3cb44b',
    'N. California': '#e58e00',
    Oregon: '#4363d8',
    'Cape Town': '#16ab3e',
    'Hong Kong': '#FFD700',
    Hyderabad: '#f7c8e0',
    Jakarta: '#FF4500',
    Melbourne: '#8A2BE2',
    Mumbai: '#9932CC',
    Osaka: '#00CED1',
    Seoul: '#FF1493',
    Singapore: '#FF8C00',
    Sydney: '#7CFC00',
    Tokyo: '#4682B4',
    Central: '#D2691E',
    Calgary: '#20B2AA',
    Frankfurt: '#9370DB',
    Ireland: '#2E8B57',
    London: '#4B0082',
    Milan: '#8B4513',
    Paris: '#CD5C5C',
    Spain: '#008B8B',
    Stockholm: '#d2cb75',
    Zurich: '#800000',
    Bahrain: '#6B8E23',
    UAE: '#008080',
    'Tel Aviv': '#000080',
    'São Paulo': '#B22222',
    'US-Gov-East': '#556B2F',
    'US-Gov-West': '#483D8B',
    'Beijing': '#BE1619',
    'Ningxia': '#d88794'
};


// Function to apply color to navbar
function applyNavbarColor() {
    const regionButton = document.querySelector('[data-testid="awsc-nav-regions-menu-button"] > span');
    if (regionButton) {
        const region = regionButton.innerText.trim().replace(/^.*\(([^)]+)\)$/, '$1');
        console.log(region);

        browser.storage.local.get(region, function(results) {
            let color = results[region];
            if (color === undefined) {
                color = defaultColor[region];
            }
            if (color) {
                document.querySelector("#awsc-top-level-nav").style.backgroundColor = color;
            }
        });
    }
}

// Observe region changes and replaced navbar nodes in AWS' dynamic console.
function observeDOM() {
    let previousRegion = null;
    let previousNavbar = null;

    function refresh() {
        const regionButton = document.querySelector(
            '[data-testid="awsc-nav-regions-menu-button"] > span'
        );
        const navbar = document.querySelector("#awsc-top-level-nav");

        if (!regionButton || !navbar) return;

        const region = regionButton.textContent.trim();

        if (
            region !== previousRegion ||
            navbar !== previousNavbar ||
            !navbar.style.backgroundColor
        ) {
            previousRegion = region;
            previousNavbar = navbar;
            applyNavbarColor();
        }
    }

    const observer = new MutationObserver(refresh);

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true
    });

    refresh();
}

observeDOM();
