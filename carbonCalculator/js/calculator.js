/* js/calculator.js */

/**
 * Calculator
 * Lógica de negócios pura para cálculos de emissão e finanças.
 */
const Calculator = {
    /**
     * Calcula emissão de CO2.
     * @param {number} distanceKm 
     * @param {string} mode 
     * @returns {number}
     */
    calculateEmission: function(distanceKm, mode) {
        const factor = CONFIG.EMISSION_FACTORS[mode] ?? 0;
        return Number((distanceKm * factor).toFixed(2));
    },

    /**
     * Gera dados comparativos para todos os modos.
     * @param {number} distanceKm 
     * @returns {Array} Lista ordenada por emissão
     */
    calculateAllModes: function(distanceKm) {
        const carEmission = this.calculateEmission(distanceKm, 'car');

        return Object.keys(CONFIG.EMISSION_FACTORS)
            .map(mode => {
                const emission = this.calculateEmission(distanceKm, mode);
                // Evita divisão por zero
                const percentage = carEmission > 0 ? (emission / carEmission) * 100 : (mode === 'car' ? 100 : 0);
                
                return {
                    mode,
                    emission,
                    percentageVsCar: Number(percentage.toFixed(1))
                };
            })
            .sort((a, b) => a.emission - b.emission);
    },

    /**
     * Calcula economia em relação ao carro.
     * @param {number} emission 
     * @param {number} baseline (Carro)
     * @returns {Object}
     */
    calculateSavings: function(emission, baseline) {
        const savedKg = Math.max(0, baseline - emission);
        const percentage = baseline > 0 ? (savedKg / baseline) * 100 : 0;
        
        return {
            savedKg: Number(savedKg.toFixed(2)),
            percentage: Number(percentage.toFixed(1))
        };
    },

    /**
     * Calcula créditos de carbono necessários.
     * @param {number} emissionKg 
     * @returns {number}
     */
    calculateCarbonCredits: function(emissionKg) {
        return Number((emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT).toFixed(4));
    },

    /**
     * Estima preço dos créditos.
     * @param {number} credits 
     * @returns {Object}
     */
    estimateCreditPrice: function(credits) {
        const min = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        const max = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        
        return {
            min: Number(min.toFixed(2)),
            max: Number(max.toFixed(2)),
            average: Number(((min + max) / 2).toFixed(2))
        };
    }
};