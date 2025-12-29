/* js/routes-data.js */

/**
 * RoutesDB
 * Banco de dados estático de rotas e utilitários de busca.
 * Padrão: Singleton Object
 */
const RoutesDB = {
    // Banco de dados de rotas (Simulado)
    routes: [
        // NOVAS ROTAS ADICIONADAS
        { origin: "Curitiba, PR", destination: "Sinop, MT", distanceKm: 2340 },

        // Sudeste
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "Rio de Janeiro, RJ", destination: "Vitória, ES", distanceKm: 521 },
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Vitória, ES", destination: "Vila Velha, ES", distanceKm: 12 },

        // Sul
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
        { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 637 },
        { origin: "Florianópolis, SC", destination: "Porto Alegre, RS", distanceKm: 476 },
        { origin: "Porto Alegre, RS", destination: "Gramado, RS", distanceKm: 103 },

        // Centro-Oeste
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Goiânia, GO", destination: "Cuiabá, MT", distanceKm: 934 },
        { origin: "Campo Grande, MS", destination: "Cuiabá, MT", distanceKm: 694 },
        
        // Nordeste e Norte
        { origin: "Salvador, BA", destination: "Aracaju, SE", distanceKm: 356 },
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 805 },
        { origin: "Recife, PE", destination: "Maceió, AL", distanceKm: 257 },
        { origin: "Recife, PE", destination: "Natal, RN", distanceKm: 286 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        { origin: "Manaus, AM", destination: "Boa Vista, RR", distanceKm: 785 },
        { origin: "Belém, PA", destination: "São Luís, MA", distanceKm: 806 }
    ],

    /**
     * Normaliza strings para comparação (remove acentos e converte para minúsculas).
     * @param {string} str 
     * @returns {string}
     */
    _normalize: function(str) {
        return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
    },

    /**
     * Retorna lista única de cidades ordenadas.
     * @returns {string[]}
     */
    getAllCities: function() {
        const cities = new Set();
        this.routes.forEach(route => {
            cities.add(route.origin);
            cities.add(route.destination);
        });
        return Array.from(cities).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    },

    /**
     * Encontra a distância entre duas cidades (busca bidirecional).
     * @param {string} origin 
     * @param {string} destination 
     * @returns {number|null} Distância em km ou null
     */
    findDistance: function(origin, destination) {
        if (!origin || !destination) return null;

        const normOrigin = this._normalize(origin);
        const normDest = this._normalize(destination);

        const route = this.routes.find(r => {
            const rOrigin = this._normalize(r.origin);
            const rDest = this._normalize(r.destination);
            // Verifica ida OU volta (o que cobre Sinop -> Curitiba automaticamente)
            return (rOrigin === normOrigin && rDest === normDest) ||
                   (rOrigin === normDest && rDest === normOrigin);
        });

        return route?.distanceKm ?? null;
    }
};

// Congelar objeto para evitar mutações acidentais
Object.freeze(RoutesDB);