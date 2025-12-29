/* js/app.js */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização segura
    try {
        CONFIG.populateDatalist();
        CONFIG.setupDistanceAutofill();
        console.log("✅ EcoTrip Calculator v2.0 Inicializada.");
    } catch (e) {
        console.error("Falha na inicialização:", e);
    }

    const form = document.getElementById('calculator-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Coleta e sanitização de dados
        const formData = {
            origin: document.getElementById('origin')?.value.trim(),
            destination: document.getElementById('destination')?.value.trim(),
            distance: parseFloat(document.getElementById('distance')?.value),
            mode: document.querySelector('input[name="transport"]:checked')?.value
        };

        // Validação
        if (!formData.origin || !formData.destination) {
            alert("Por favor, preencha as cidades de origem e destino.");
            return;
        }
        if (!formData.mode) {
            alert("Selecione um meio de transporte.");
            return;
        }
        if (isNaN(formData.distance) || formData.distance <= 0) {
            alert("A distância deve ser um número válido maior que zero.");
            document.getElementById('distance')?.focus();
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        
        // UX: Loading State
        UI.setLoadingState(submitBtn, true);
        UI.hideElement('result-container');

        // Simulação de processamento assíncrono (API call)
        await new Promise(resolve => setTimeout(resolve, 1200));

        try {
            // Lógica de Cálculo
            const emission = Calculator.calculateEmission(formData.distance, formData.mode);
            const carBaseline = Calculator.calculateEmission(formData.distance, 'car');
            const savings = Calculator.calculateSavings(emission, carBaseline);
            const allModes = Calculator.calculateAllModes(formData.distance);
            const credits = Calculator.calculateCarbonCredits(emission);
            const prices = Calculator.estimateCreditPrice(credits);

            // Renderização
            const containers = {
                results: document.getElementById('results-content'),
                comparison: document.getElementById('comparison-content'),
                credits: document.getElementById('carbon-credits-content')
            };

            if (containers.results) {
                containers.results.innerHTML = UI.renderResults({
                    ...formData, emission, savings
                });
            }
            
            if (containers.comparison) {
                containers.comparison.innerHTML = UI.renderComparison(allModes, formData.mode);
            }

            if (containers.credits) {
                containers.credits.innerHTML = UI.renderCarbonCredits({
                    credits, price: prices
                });
            }

            // Exibir e Scrollar
            UI.showElement('result-container');
            UI.scrollToElement('result-container');

        } catch (error) {
            console.error("Erro de processamento:", error);
            alert("Ocorreu um erro ao processar os dados. Tente novamente.");
        } finally {
            UI.setLoadingState(submitBtn, false);
        }
    });
});