document.addEventListener('DOMContentLoaded', () => {
    const openPackBtn = document.getElementById('openPackBtn');
    const packResult = document.getElementById('packResult');
    const catalog = document.getElementById('catalog');
    const catalogCount = document.getElementById('catalog-count');

    let items = [];
    let catalogItems = {};

    // Disable button initially
    openPackBtn.disabled = true;

    // Fetch items from JSON file
    fetch('items.json') // Zorg ervoor dat dit het juiste pad is naar je items.json bestand
        .then(response => response.json())
        .then(data => {
            items = data;
            updateCatalogCount();

            // Enable button after items are loaded
            openPackBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error fetching items:', error);
            packResult.textContent = 'Failed to load items';
        });

    openPackBtn.addEventListener('click', () => {
        if (items.length > 0) {
            const randomItem = getRandomItem(items);
            packResult.innerHTML = `You got: <img class="item-image" src="${randomItem.image_url}" alt="${randomItem.name}"> <span class="${randomItem.rarity}">${randomItem.name}</span>`;
            addToCatalog(randomItem);
        } else {
            packResult.textContent = 'No items available';
        }
    });

    function getRandomItem(items) {
        const rarityChances = {
            legendary: 1,
            epic: 2,
            rare: 4,
            uncommon: 8,
            common: 85
        };

        const totalWeight = Object.values(rarityChances).reduce((a, b) => a + b, 0);
        let randomNum = Math.random() * totalWeight;

        for (const rarity in rarityChances) {
            if (randomNum < rarityChances[rarity]) {
                const filteredItems = items.filter(item => item.rarity === rarity);
                return filteredItems[Math.floor(Math.random() * filteredItems.length)];
            }
            randomNum -= rarityChances[rarity];
        }
    }

    function addToCatalog(item) {
        if (catalogItems[item.name]) {
            catalogItems[item.name].count += 1;
            const itemCountElement = document.getElementById(`count-${item.name}`);
            itemCountElement.textContent = `x${catalogItems[item.name].count}`;
        } else {
            catalogItems[item.name] = { ...item, count: 1 };
            const catalogItem = document.createElement('div');
            catalogItem.classList.add('catalog-item');
            catalogItem.innerHTML = `
                <img class="item-image" src="${item.image_url}" alt="${item.name}">
                <div class="${item.rarity}">${item.name}</div>
                <div id="count-${item.name}" class="catalog-item-count">x1</div>
            `;
            catalog.appendChild(catalogItem);
        }
        updateCatalogCount();
    }

    function updateCatalogCount() {
        const totalItems = items.length;
        const collectedItems = Object.keys(catalogItems).length;
        catalogCount.textContent = `Collected ${collectedItems} of ${totalItems} items`;
    }

});
