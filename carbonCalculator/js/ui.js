/* js/ui.js */

/**
 * UI
 * Manipulação do DOM e Renderização de Templates.
 */
const UI = {
    // Formatadores (Helpers)
    _formatNumber: (num) => num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    _formatCurrency: (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),

    // Utilitários de DOM
    showElement: (id) => document.getElementById(id)?.classList.remove('hidden'),
    hideElement: (id) => document.getElementById(id)?.classList.add('hidden'),
    
    scrollToElement: (id) => {
        const el = document.getElementById(id);
        if (el) {
            // Pequeno delay para garantir que o layout renderizou
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    },

    // Estado de Carregamento
    setLoadingState: function(btn, isLoading) {
        if (!btn) return;
        
        if (isLoading) {
            btn.dataset.originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner"></span> Calculando...`;
            btn.classList.add('btn-loading');
        } else {
            btn.disabled = false;
            btn.innerHTML = btn.dataset.originalText || 'Calcular';
            btn.classList.remove('btn-loading');
        }
    },

    // --- RENDERIZADORES ---

    renderResults: function(data) {
        const meta = CONFIG.TRANSPORT_MODES[data.mode];
        if (!meta) return '<p class="error">Modo de transporte inválido.</p>';

        const savingsHTML = (data.mode !== 'car' && data.savings.savedKg > 0) 
            ? `<div class="results__savings">
                 <div style="font-size: 2rem;">🎉</div>
                 <div>
                   <strong>Ótima escolha!</strong><br>
                   Você economizou <strong>${this._formatNumber(data.savings.savedKg)} kg</strong> de CO₂ 
                   (${data.savings.percentage}% a menos que um carro).
                 </div>
               </div>` 
            : '';

        return `
            <div class="results-grid">
                <div class="results__card">
                    <div class="results__label">Rota</div>
                    <div class="results__value" style="font-size: 1rem; line-height: 1.4;">
                        ${data.origin} <br><span style="color:var(--text-light); font-size:0.8em">➝</span><br> ${data.destination}
                    </div>
                </div>
                <div class="results__card">
                    <div class="results__label">Distância</div>
                    <div class="results__value">${this._formatNumber(data.distance)} km</div>
                </div>
                <div class="results__card" style="border-bottom: 4px solid ${meta.color}">
                    <div class="results__label">Emissão de CO₂</div>
                    <div class="results__icon">🍃</div>
                    <div class="results__value" style="color: ${meta.color}">
                        ${this._formatNumber(data.emission)} kg
                    </div>
                </div>
                <div class="results__card">
                    <div class="results__label">Transporte</div>
                    <div class="results__icon">${meta.icon}</div>
                    <div class="results__value" style="font-size: 1.25rem;">${meta.label}</div>
                </div>
                ${savingsHTML}
            </div>
        `;
    },

    renderComparison: function(modes, selectedMode) {
        const maxEmission = Math.max(...modes.map(m => m.emission));

        const rows = modes.map(item => {
            const meta = CONFIG.TRANSPORT_MODES[item.mode];
            const isSelected = item.mode === selectedMode;
            const width = maxEmission > 0 ? (item.emission / maxEmission) * 100 : 0;
            
            // Lógica de cor da barra
            let barColor = width <= 25 ? '#10b981' : (width <= 75 ? '#f59e0b' : '#ef4444');
            if (width > 100) barColor = '#ef4444'; // Fallback

            return `
                <div class="comparison__item ${isSelected ? 'comparison__item--selected' : ''}">
                    <div class="comparison__header">
                        <div class="comparison__mode">
                            <span class="comparison__icon">${meta.icon}</span>
                            <span class="comparison__label">${meta.label}</span>
                            ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ''}
                        </div>
                        <div class="comparison__stats">
                            <span class="comparison__emission">${this._formatNumber(item.emission)} kg</span>
                            <small class="comparison__percentage">${item.percentageVsCar}% do carro</small>
                        </div>
                    </div>
                    <div class="comparison__bar-container" title="${item.percentageVsCar}%">
                        <div class="comparison__bar" style="width: ${width}%; background-color: ${barColor};"></div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="comparison-list">
                ${rows}
                <div style="margin-top: 1.5rem; padding: 1rem; background-color: #eff6ff; border-radius: var(--radius); border-left: 4px solid var(--info); font-size: 0.9rem;">
                    💡 <strong>Dica:</strong> Em viagens curtas (< 5km), bicicleta ou caminhada emitem <strong>0 kg</strong> de CO₂!
                </div>
            </div>
        `;
    },

    renderCarbonCredits: function(data) {
        return `
            <div class="carbon-credits__grid">
                <div class="carbon-credits__card">
                    <div class="results__label">Créditos Necessários</div>
                    <div class="carbon-credits__value">${data.credits.toFixed(4).replace('.', ',')}</div>
                    <div class="carbon-credits__hint">Base: 1 crédito = 1 tonelada CO₂</div>
                </div>
                <div class="carbon-credits__card">
                    <div class="results__label">Estimativa de Custo</div>
                    <div class="carbon-credits__value" style="color: var(--secondary);">
                        ~${this._formatCurrency(data.price.average)}
                    </div>
                    <div class="carbon-credits__hint">
                        Min: ${this._formatCurrency(data.price.min)} | Max: ${this._formatCurrency(data.price.max)}
                    </div>
                </div>
            </div>
            <div class="carbon-credits__info">
                <strong>🌱 Compense sua pegada:</strong><br>
                A aquisição de créditos de carbono financia projetos de reflorestamento e energia renovável. O valor apresentado é uma estimativa de mercado.
            </div>
            <button class="carbon-credits__btn" onclick="alert('Integração com gateway de pagamento em breve!')">
                🛒 Compensar Emissões Agora
            </button>
        `;
    }
};