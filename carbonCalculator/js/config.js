/* js/config.js */

/**
 * CONFIG
 * Objeto global de configuração e inicialização de dependências.
 */
const CONFIG = {
    // Constantes de negócio
    EMISSION_FACTORS: Object.freeze({
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    }),

    TRANSPORT_MODES: Object.freeze({
        bicycle: { label: "Bicicleta", icon: "🚲", color: "#10b981" },
        car: { label: "Carro", icon: "🚗", color: "#3b82f6" },
        bus: { label: "Ônibus", icon: "🚌", color: "#f59e0b" },
        truck: { label: "Caminhão", icon: "🚛", color: "#ef4444" }
    }),

    CARBON_CREDIT: Object.freeze({
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50.00,
        PRICE_MAX_BRL: 150.00
    }),

    /**
     * Preenche o <datalist> com as cidades disponíveis.
     */
    populateDatalist: function() {
        try {
            const cities = RoutesDB.getAllCities();
            const dataList = document.getElementById('cities-list');
            
            if (!dataList) throw new Error("Elemento 'cities-list' não encontrado no DOM.");

            const fragment = document.createDocumentFragment();
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                fragment.appendChild(option);
            });
            
            dataList.innerHTML = '';
            dataList.appendChild(fragment);
        } catch (error) {
            console.error("Erro ao popular cidades:", error);
        }
    },

    /**
     * Configura a lógica de autopreenchimento de distância.
     */
    setupDistanceAutofill: function() {
        const els = {
            origin: document.getElementById('origin'),
            destination: document.getElementById('destination'),
            distance: document.getElementById('distance'),
            manualCheck: document.getElementById('manual-distance'),
            helper: document.querySelector('#distance + .helper-text') || document.querySelector('.helper-text')
        };

        // Verificação de segurança: se algum elemento faltar, aborta
        if (Object.values(els).some(el => !el)) {
            console.warn("Alguns elementos do formulário não foram encontrados. Autopreenchimento desativado.");
            return;
        }

        const updateState = (msg, color, isReadonly, val = null) => {
            if (val !== null) els.distance.value = val;
            if (isReadonly) els.distance.setAttribute('readonly', true);
            else els.distance.removeAttribute('readonly');
            
            if (els.helper) {
                els.helper.textContent = msg;
                els.helper.style.color = color;
                els.helper.style.fontWeight = color === 'var(--primary)' ? '600' : '400';
            }
        };

        const checkRoute = () => {
            if (els.manualCheck.checked) return;

            const origin = els.origin.value.trim();
            const destination = els.destination.value.trim();

            if (origin && destination) {
                const dist = RoutesDB.findDistance(origin, destination);
                if (dist) {
                    updateState("Distância calculada automaticamente! ✅", "var(--primary)", true, dist);
                } else {
                    updateState("Rota não encontrada. Insira manualmente ou marque a caixa.", "var(--text-light)", true, '');
                }
            }
        };

        // Event Listeners
        ['change', 'input'].forEach(evt => {
            els.origin.addEventListener(evt, checkRoute);
            els.destination.addEventListener(evt, checkRoute);
        });

        els.manualCheck.addEventListener('change', () => {
            if (els.manualCheck.checked) {
                updateState("Modo manual ativado. Insira a distância.", "var(--text-light)", false, '');
                els.distance.focus();
            } else {
                checkRoute();
            }
        });
    }
};