document.addEventListener('DOMContentLoaded', async () => {
    const typeSelect = document.getElementById('pokemon-type');
    const regionSelect = document.getElementById('pokemon-region');
    const abilitySelect = document.getElementById('pokemon-ability');

    // Carrega todos os tipos de Pokémon para o select de tipos
    const typeResponse = await fetch('https://pokeapi.co/api/v2/type/');
    const typeData = await typeResponse.json();
    typeData.results.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name;
        typeSelect.appendChild(option);
    });

    // Carrega todas as regiões de Pokémon para o select de regiões
    const regionResponse = await fetch('https://pokeapi.co/api/v2/region/');
    const regionData = await regionResponse.json();
    regionData.results.forEach((region, index) => {
        const option = document.createElement('option');
        option.value = index + 1; 
        option.textContent = region.name;
        regionSelect.appendChild(option);
    });

    // Carrega habilidades para o select de habilidades
    const abilityResponse = await fetch('https://pokeapi.co/api/v2/ability/');
    const abilityData = await abilityResponse.json();
    abilityData.results.forEach(ability => {
        const option = document.createElement('option');
        option.value = ability.name;
        option.textContent = ability.name;
        abilitySelect.appendChild(option);
    });
});

// Função para abrir o modal com informações detalhadas do Pokémon
function openPokemonModal(pokemonData) {
    const modal = document.getElementById('pokemon-modal');
    const modalContent = document.getElementById('pokemon-modal-content');

    // Popula o modal com dados do Pokémon
    modalContent.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p><strong>Height:</strong> ${pokemonData.height / 10} m</p>
        <p><strong>Weight:</strong> ${pokemonData.weight / 10} kg</p>
        <p><strong>Type(s):</strong> ${pokemonData.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Abilities:</strong> ${pokemonData.abilities.map(a => a.ability.name).join(', ')}</p>
        <p><strong>Base Experience:</strong> ${pokemonData.base_experience}</p>
        <p><strong>Stats:</strong> ${pokemonData.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</p>
    `;

    // Exibe o modal
    modal.style.display = 'block';

    // Fecha o modal ao clicar no "X"
    const closeButton = modal.querySelector('.close');
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    // Fecha o modal ao clicar fora do conteúdo
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Função de busca por nome de Pokémon
document.getElementById('pokemon-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.ok) {
        const data = await response.json();
        document.getElementById('pokemon-data').innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Height:</strong> ${data.height / 10} m</p>
            <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
            <p><strong>Type(s):</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
            <p><strong>Base Experience:</strong> ${data.base_experience}</p>
            <p><strong>Stats:</strong> ${data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</p>
        `;
    } else {
        document.getElementById('pokemon-data').innerHTML = '<p>Pokémon não encontrado</p>';
    }
});

// Função de busca por tipo de Pokémon
document.getElementById('type-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const type = document.getElementById('pokemon-type').value;
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();

    const gallery = document.getElementById('pokemon-gallery');
    gallery.innerHTML = '';

    data.pokemon.slice(0, 10).forEach(async (entry) => {
        const pokemonResponse = await fetch(entry.pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card', 'flip-card');
        pokemonCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <p>${pokemonData.name}</p>
                </div>
                <div class="flip-card-back">
                    <img src="https://i.pinimg.com/736x/a7/3d/fd/a73dfd9ed11cc31bacad96a8d789b588.jpg" alt="Verso da Carta Pokemon">
                </div>
            </div>
        `;

        // Adiciona evento de clique para abrir o modal
        pokemonCard.addEventListener('click', () => openPokemonModal(pokemonData));
        gallery.appendChild(pokemonCard);
    });
});

// Função de busca por região
document.getElementById('region-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const region = document.getElementById('pokemon-region').value;
    const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`);
    const data = await response.json();
    const gallery = document.getElementById('pokemon-region-gallery');
    gallery.innerHTML = '';

    // Para cada Pokémon encontrado na região
    data.pokemon_entries.forEach(async (entry) => {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`);
        const pokemonData = await pokemonResponse.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card', 'flip-card');
        pokemonCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <p>${pokemonData.name}</p>
                </div>
                <div class="flip-card-back">
                    <img src="https://i.pinimg.com/736x/a7/3d/fd/a73dfd9ed11cc31bacad96a8d789b588.jpg" alt="Verso da Carta Pokemon">
                </div>
            </div>
        `;

        // Adiciona evento de clique para abrir o modal
        pokemonCard.addEventListener('click', () => openPokemonModal(pokemonData));
        gallery.appendChild(pokemonCard);
    });
});

// Função de busca por habilidade
document.getElementById('ability-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const ability = document.getElementById('pokemon-ability').value;
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`);
    const data = await response.json();

    const gallery = document.getElementById('pokemon-ability-gallery');
    gallery.innerHTML = '';

    data.pokemon.slice(0, 10).forEach(async (entry) => {
        const pokemonResponse = await fetch(entry.pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card', 'flip-card');
        pokemonCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <p>${pokemonData.name}</p>
                </div>
                <div class="flip-card-back">
                    <img src="https://i.pinimg.com/736x/a7/3d/fd/a73dfd9ed11cc31bacad96a8d789b588.jpg" alt="Verso da Carta Pokemon">
                </div>
            </div>
        `;

        // Adiciona evento de clique para abrir o modal
        pokemonCard.addEventListener('click', () => openPokemonModal(pokemonData));
        gallery.appendChild(pokemonCard);
    });
});
// Função para inicializar os formulários com o evento reset
function initializeResetButtons() {
    // Reseta a seção de dados do Pokémon por nome
    document.getElementById("pokemon-form").addEventListener("reset", () => {
        document.getElementById("pokemon-data").innerHTML = "";
    });

    // Reseta a galeria de Pokémon por tipo
    document.getElementById("type-form").addEventListener("reset", () => {
        document.getElementById("pokemon-gallery").innerHTML = "";
    });

    // Reseta a galeria de Pokémon por região
    document.getElementById("region-form").addEventListener("reset", () => {
        document.getElementById("pokemon-region-gallery").innerHTML = "";
    });

    // Reseta a galeria de Pokémon por habilidade
    document.getElementById("ability-form").addEventListener("reset", () => {
        document.getElementById("pokemon-ability-gallery").innerHTML = "";
    });
}

// Chame a função de inicialização após o carregamento do DOM
document.addEventListener("DOMContentLoaded", initializeResetButtons);
