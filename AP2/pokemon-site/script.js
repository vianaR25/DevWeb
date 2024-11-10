document.addEventListener('DOMContentLoaded', async () => {
    const typeSelect = document.getElementById('pokemon-type');
    const regionSelect = document.getElementById('pokemon-region');

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
        option.value = index + 1; // As regiões começam no ID 1
        option.textContent = region.name;
        regionSelect.appendChild(option);
    });
});

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
    gallery.innerHTML = ''; // Limpa a galeria

    // Exibe os primeiros 10 Pokémon do tipo selecionado
    data.pokemon.slice(0, 10).forEach(async (entry) => {
        const pokemonResponse = await fetch(entry.pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        // Estrutura do Flip Card
        pokemonCard.innerHTML = `
            <div class="card">
                <!-- Frente do card -->
                <div class="card-front">
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <p class="pokemon-name">${pokemonData.name}</p>
                </div>
                <!-- Parte de trás do card (Imagem da carta oficial) -->
                <div class="card-back">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/cards/${pokemonData.id}.png" alt="Carta de ${pokemonData.name}">
                </div>
            </div>
        `;
        gallery.appendChild(pokemonCard);

        // Evento para abrir modal com detalhes
        pokemonCard.addEventListener('click', () => openModal(pokemonData));
    });
});

// Função de busca por região de Pokémon
document.getElementById('region-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const regionId = document.getElementById('pokemon-region').value;
    const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${regionId}`);
    const data = await response.json();

    const gallery = document.getElementById('pokemon-region-gallery');
    gallery.innerHTML = ''; // Limpa a galeria

    // Exibe os primeiros 10 Pokémon da região selecionada
    data.pokemon_entries.slice(0, 10).forEach(async (entry) => {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`);
        const pokemonData = await pokemonResponse.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        // Estrutura do Flip Card
        pokemonCard.innerHTML = `
            <div class="card">
                <!-- Frente do card -->
                <div class="card-front">
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <p class="pokemon-name">${pokemonData.name}</p>
                </div>
                <!-- Parte de trás do card (Imagem da carta oficial) -->
                <div class="card-back">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/cards/${pokemonData.id}.png" alt="Carta de ${pokemonData.name}">
                </div>
            </div>
        `;
        gallery.appendChild(pokemonCard);

        // Evento para abrir modal com detalhes
        pokemonCard.addEventListener('click', () => openModal(pokemonData));
    });
});

// Função para abrir o modal com detalhes do Pokémon
// Função para abrir a modal com informações detalhadas do Pokémon
function openModal(pokemonData) {
    document.getElementById('modal-pokemon-img').src = pokemonData.sprites.front_default;
    document.getElementById('modal-pokemon-name').textContent = pokemonData.name;
    document.getElementById('modal-pokemon-type').textContent = `Type(s): ${pokemonData.types.map(t => t.type.name).join(', ')}`;
    document.getElementById('modal-pokemon-height').textContent = `Height: ${pokemonData.height / 10} m`;
    document.getElementById('modal-pokemon-weight').textContent = `Weight: ${pokemonData.weight / 10} kg`;
    document.getElementById('modal-pokemon-abilities').textContent = `Abilities: ${pokemonData.abilities.map(a => a.ability.name).join(', ')}`;
    document.getElementById('modal-pokemon-stats').textContent = `Stats: ${pokemonData.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}`;

    document.getElementById('pokemon-modal').style.display = 'flex';
}

// Função para fechar a modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('pokemon-modal').style.display = 'none';
});

// Fecha a modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    const modal = document.getElementById('pokemon-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

