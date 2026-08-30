# ZapScript.me - Modelo Financeiro Customizado (24 Meses)

## Sumário Executivo

Projeção financeira realista para ZapScript.me sobre os próximos 24 meses, incluindo receita, custos, burn, runway e caminhos para rentabilidade.

**Key Assumptions:**
- Começar com $250k Seed investimento
- Crescimento gradual: 30-50% MoM nos primeiros 6 meses
- Unit economics conservadores
- Foco em agências + podcasters inicialmente
- Expansão a outros nichos a partir de mês 7

---

## 1. Projeção de Receita (24 Meses)

### Modelo de Crescimento Customer

**Assumindo:**
- MoM customer growth: 30-40% (desacelerando com tempo)
- ARPU médio: $100-$150
- Mix inicial: Agências 60%, Podcasters 40%

| Mês | Clientes | Churn | Clientes Netos | MRR | ARR |
|-----|----------|-------|-----------------|-----|-----|
| 1 | 10 | 0% | 10 | $1,200 | $14k |
| 2 | 15 | 2% | 14 | $1,750 | $21k |
| 3 | 22 | 3% | 21 | $2,800 | $34k |
| 4 | 35 | 4% | 32 | $4,500 | $54k |
| 5 | 50 | 5% | 46 | $6,800 | $82k |
| 6 | 70 | 5% | 65 | $10,000 | $120k |
| 7 | 100 | 6% | 91 | $14,500 | $174k |
| 8 | 135 | 6% | 123 | $19,500 | $234k |
| 9 | 175 | 6% | 162 | $25,000 | $300k |
| 10 | 220 | 6% | 205 | $31,000 | $372k |
| 11 | 270 | 6% | 250 | $37,500 | $450k |
| 12 | 320 | 6% | 300 | $45,000 | $540k |
| **Q2 2027** |  |  |  |  |  |
| 13 | 370 | 6% | 347 | $52,000 | $624k |
| 14 | 420 | 6% | 395 | $59,000 | $708k |
| 15 | 470 | 6% | 443 | $66,500 | $798k |
| 16 | 520 | 6% | 490 | $74,000 | $888k |
| 17 | 570 | 7% | 536 | $81,000 | $972k |
| 18 | 620 | 7% | 584 | $88,000 | $1.056M |
| **H2 2027** |  |  |  |  |  |
| 19 | 670 | 7% | 629 | $95,000 | $1.14M |
| 20 | 720 | 7% | 675 | $102,000 | $1.224M |
| 21 | 770 | 7% | 720 | $109,000 | $1.308M |
| 22 | 820 | 7% | 767 | $116,000 | $1.392M |
| 23 | 870 | 7% | 814 | $123,000 | $1.476M |
| 24 | 920 | 7% | 860 | $130,000 | $1.56M |

**Observations:**
- Mês 6: Atinge $10k MRR (ready for Series A conversations)
- Mês 12: Atinge $45k MRR (10x inicial)
- Mês 18: Atinge $88k MRR (Series A closed, expanding)
- Mês 24: Atinge $130k MRR (1.56M ARR)

---

## 2. Estrutura de Custos

### 2.1 Cost of Goods Sold (COGS)

**Infraestrutura & APIs:**

| Item | Custo por min de áudio | Escalabilidade |
|------|------------------------|-----------------|
| AWS S3 storage | $0.001/min | Linear |
| AWS Transcribe (via API) | $0.02/min | Linear |
| LLM API (summarization) | $0.01/min | Linear |
| Database + backups | $200 + $0.001/minute | Linear |
| CDN/Networking | $0.001/min | Linear |
| **Total** | **$0.032/min** | ~3% of ARPU |

**Assumptions:**
- Usuário médio = 50 min de áudio/mês
- COGS por usuário = 50 × $0.032 = $1.60/mês
- Gross Margin = (ARPU - COGS) / ARPU = ($125 - $1.60) / $125 = **98.7%** 🚀

| Mês | MRR | COGS (%) | COGS Value | Gross Profit |
|-----|-----|---------|------------|--------------|
| 6 | $10,000 | 2% | $200 | $9,800 |
| 12 | $45,000 | 2.5% | $1,125 | $43,875 |
| 18 | $88,000 | 3% | $2,640 | $85,360 |
| 24 | $130,000 | 3.5% | $4,550 | $125,450 |

---

### 2.2 Operating Expenses (Opex)

#### Salaries (Maior despesa)

| Posição | Mês 1 | Crescimento | Mês 12 | Mês 24 |
|---------|-------|------------|--------|--------|
| Founder/CEO | $2,000 | — | $4,000 | $8,000 |
| Growth/Sales | — | Contrata mês 4 | $5,000 | $8,000 |
| Engineer | — | Contrata mês 5 | $4,500 | $7,000 |
| Engineer 2 | — | Contrata mês 9 | $2,000 | $6,000 |
| Customer Success | — | Contrata mês 8 | $2,000 | $4,000 |
| Contractor (misc) | $500 | Aumenta | $1,000 | $2,000 |
| **Total Salaries** | **$2,500** | — | **$18,500** | **$35,000** |

**Headcount:**
- Mês 1-3: 1 pessoa (founder)
- Mês 4-6: 2 pessoas (+ sales)
- Mês 7-12: 3-4 pessoas
- Mês 13-24: 5-6 pessoas

---

#### Marketing & Sales

| Item | Mês 1-3 | Mês 4-6 | Mês 7-12 | Mês 13-24 |
|------|---------|---------|----------|-----------|
| Google Ads | $0 | $500 | $1,000 | $2,000 |
| Facebook/LinkedIn Ads | $0 | $500 | $1,500 | $3,000 |
| Content/Blog | $200 | $200 | $500 | $1,000 |
| Events/Sponsorships | $0 | $500 | $1,000 | $2,000 |
| Tools (HubSpot, etc) | $100 | $200 | $500 | $1,000 |
| **Total Marketing** | **$300** | **$1,900** | **$4,500** | **$9,000** |

---

#### Product & Infrastructure

| Item | Mês 1-6 | Mês 7-12 | Mês 13-24 |
|------|---------|----------|-----------|
| Cloud hosting (AWS, etc) | $500 | $1,000 | $2,000 |
| Monitoring/Logs (DataDog, etc) | $100 | $300 | $500 |
| Database (PlanetScale, Firebase) | $200 | $500 | $1,000 |
| Security & SSL | $50 | $100 | $200 |
| **Total** | **$850** | **$1,900** | **$3,700** |

---

#### Admin & Misc

| Item | Monthly |
|------|---------|
| Legal/Accounting | $300 |
| Office space (co-working) | $200 |
| Subscriptions (tools) | $200 |
| Travel/Conferences | $300 |
| Insurance | $100 |
| **Total** | **$1,100** |

---

### 2.3 Total Operating Expenses by Period

| Period | Salaries | Marketing | Infrastructure | Admin | **Total Opex** |
|--------|----------|-----------|-----------------|-------|----------------|
| **Mês 1-3** | $2,500 | $300 | $850 | $1,100 | **$4,750** |
| **Mês 4-6** | $8,000 | $1,900 | $850 | $1,100 | **$11,850** |
| **Mês 7-12** | $15,500 | $4,500 | $1,900 | $1,100 | **$23,000** |
| **Mês 13-18** | $24,000 | $6,000 | $2,500 | $1,100 | **$33,600** |
| **Mês 19-24** | $32,000 | $8,000 | $3,500 | $1,100 | **$44,600** |

---

## 3. Projeção de Lucro/Prejuízo (P&L)

### 24-Month P&L

| Período | Receita (MRR Média) | COGS | Gross Profit | Opex | **EBIT** | Cum. Burn |
|---------|-------------------|------|--------------|------|---------|-----------|
| Q3 2026 (meses 1-3) | $1,917 | -$38 | $1,879 | $14,250 | **-$12,371** | -$37,113 |
| Q4 2026 (meses 4-6) | $5,767 | -$115 | $5,652 | $35,550 | **-$29,898** | -$126,711 |
| Q1 2027 (meses 7-9) | $19,500 | -$390 | $19,110 | $69,000 | **-$49,890** | -$275,391 |
| Q2 2027 (meses 10-12) | $37,667 | -$940 | $36,727 | $69,000 | **-$32,273** | -$372,727 |
| **H1 2027** | — | — | — | — | **-$82,163** | -$372,727 |
| Q3 2027 (meses 13-15) | $72,500 | -$1,815 | $70,685 | $100,800 | **-$30,115** | -$402,842 |
| Q4 2027 (meses 16-18) | $94,333 | -$2,360 | $91,973 | $100,800 | **-$8,827** | -$411,669 |
| **H2 2027** | — | — | — | — | **-$38,942** | -$411,669 |
| Q1 2028 (meses 19-21) | $116,000 | -$2,900 | $113,100 | $133,800 | **-$20,700** | -$432,369 |
| Q2 2028 (meses 22-24) | $125,000 | -$3,125 | $121,875 | $133,800 | **-$11,925** | -$444,294 |
| **Total 24 Meses** | — | — | — | — | **-$121,578** | -$444,294 |

**Key Insights:**
- **Sem profitabilidade em 24 meses** com este modelo (expectativa: 30+ meses)
- **Burn rate desacelera** (meses 1-12 = $126k burn, meses 13-24 = $32k burn)
- **Precisa de Series A** para runway meses 7-18

---

## 4. Runway & Cash Analysis

### Runway Projection

| Período | Starting Cash | Monthly Burn | Runway |
|---------|----------------|--------------|--------|
| Mês 1-3 (seed) | $250,000 | -$12,371 | 20 meses |
| Mês 4-6 | $200,000 | -$29,898 | 6.7 meses |
| Mês 7 (critical) | $91,000 | -$23,000 | 4 meses ⚠️ |

**Conclusão:** **Precisa levantar Series A entre meses 6-9**, não meses 12+

---

### Cash Flow by Month

| Mês | Beginning Cash | Revenue | COGS | Opex | Net Burn | Ending Cash |
|-----|-----------------|---------|------|------|----------|------------|
| 1 | $250,000 | $1,200 | -$38 | -$4,750 | -$3,588 | $246,412 |
| 2 | $246,412 | $1,500 | -$48 | -$4,750 | -$3,298 | $243,114 |
| 3 | $243,114 | $2,100 | -$67 | -$4,750 | -$2,717 | $240,397 |
| 4 | $240,397 | $3,200 | -$102 | -$11,850 | -$8,752 | $231,645 |
| 5 | $231,645 | $4,500 | -$144 | -$11,850 | -$7,494 | $224,151 |
| 6 | $224,151 | $9,300 | -$297 | -$11,850 | -$2,847 | $221,304 |
| 7 | $221,304 | $14,000 | -$448 | -$23,000 | -$9,448 | $211,856 |
| 8 | $211,856 | $18,500 | -$592 | -$23,000 | -$5,092 | $206,764 |
| 9 | $206,764 | $27,500 | -$880 | -$23,000 | $3,620 | $210,384 |
| 10 | $210,384 | $31,000 | -$992 | -$23,000 | $7,008 | $217,392 |
| 11 | $217,392 | $36,500 | -$1,168 | -$23,000 | $12,332 | $229,724 |
| 12 | $229,724 | $45,000 | -$1,440 | -$23,000 | $20,560 | $250,284 |

**Key Moment: Mês 9** = Burnout atinge bottom, começa recuperação com revenue crescendo

---

## 5. Cenários de Diferentes Investimentos

### Cenário 1: $200k Seed (Conservador)

```
Mês 1:      $200k → Runway = 16.5 meses
Mês 7:      $91k → PROBLEM! Precisa Series A urgente
Necessário: Series A até mês 8 (RISKY)
```

### Cenário 2: $250k Seed (Recomendado - Base Case)

```
Mês 1:      $250k → Runway = 20 meses
Mês 7:      $212k → Runway = 9 meses (confortável)
Mês 12:     $250k → BREAKEVEN! Não precisa mais Seed
Resultado: Pode negociar Series A de posição forte
```

### Cenário 3: $350k Seed (Otimista)

```
Mês 1:      $350k → Runway = 28 meses
Mês 12:     $350k → CASH POSITIVE!
Resultado: Pode levantar Series A sem pressão, negociar termo bom
```

**Recomendação:** Almejar $250k (realista) ou $300k (confortável)

---

## 6. Unit Economics Refinement

### Customer Acquisition Cost (CAC)

**Calculation:**
```
Marketing spend (Month 1-6): $1,900/mês × 6 = $11,400
Customers acquired (Month 1-6): 65 net
CAC = $11,400 / 65 = $175

But: Expected to decrease as referrals grow
Target Q4 2026: CAC = $150
Target Q1 2027: CAC = $100
```

| Métrica | Q3 2026 | Q4 2026 | 2027 |
|---------|---------|---------|------|
| **CAC** | $250 | $175 | $100 |
| **Payback Period** | 8 meses | 4 meses | 2 meses |
| **Trend** | ↓ Improving | ↓ Improving | ↓ Improving |

---

### Customer Lifetime Value (LTV)

**Calculation:**
```
Assumptions:
- ARPU: $125/mês
- Gross Margin: 98.5%
- GM $: $123/cliente/mês

Churn scenarios:
- Q3 2026: 3% mensal → 32 meses lifetime
- Q4 2026: 5% mensal → 20 meses lifetime
- 2027: 6% mensal → 16.7 meses lifetime

LTV (6% churn) = $123 × 16.7 = $2,054
```

| Scenario | Churn | Lifetime (meses) | LTV |
|----------|-------|------------------|-----|
| Pessimista | 10% | 10 | $1,230 |
| Base | 6% | 16.7 | $2,054 |
| Optimista | 3% | 33 | $4,059 |

**LTV/CAC Ratio:**
- Q3 2026: $2,054 / $250 = **8.2x** ✓ (excellent)
- Q4 2026: $2,054 / $175 = **11.7x** ✓ (great)
- 2027: $2,054 / $100 = **20.5x** 🚀 (amazing)

---

## 7. Breakeven Analysis

### When Does ZapScript Break Even?

**Definition:** Quando MRR > Opex

| Scenario | Month | MRR | Opex | Status |
|----------|-------|-----|------|--------|
| **Base Case** | 18 | $88,000 | $33,600 | ✓ Profitable |
| **Conservative** | 24 | $130,000 | $44,600 | ✓ Profitable |

**Observation:** Breakeven em EBIT (contábil) é mês 18-24, mas **breakeven em cash é antes** (mês 12, se Series A fechado mês 7)

---

## 8. Series A Financing Assumptions

### Series A Entry (Mês 6-9)

**Assumptions:**
- Valuation: $3M-$5M (baseado em $100-200k ARR)
- Size: $500k-$1M
- Use of funds: Hiring (3-4 pessoas), Marketing ($100k), Runway (6-12 meses)
- Post-money: $4M-$6M

**Financial impact:**
- Brings $500k-$1M cash
- Extends runway 12+ meses
- Allows aggressive hiring/marketing

**Path to Series B:**
- Year 2 target: $500k-$1M ARR
- Valuation: $10M-$20M
- Size: $2M-$5M

---

## 9. Profitability Projection (36 Meses)

### What if runway allows to Profitability?

```
If Series A closed mês 9 com $750k:
- Total cash: $1M
- Burn rate (mês 13-24): $44,600/mês

Runway até profitability (mês 18): 
$1M / $44,600 = 22 meses ✓

Conclusion: Series A + revenue growth = path to profitability clear
```

---

## 10. Key Financial Assumptions Summary

| Assumption | Value | Confidence | Risk |
|------------|-------|------------|------|
| ARPU | $125 | High | Low (market validated) |
| Churn | 6% | Medium | Medium (6-8% range likely) |
| CAC | $150-$200 | Medium | Low (direct channel is cheap) |
| Growth rate | 35% MoM | Medium | High (could be faster or slower) |
| Gross Margin | 98% | High | Low (COGS fixed, predictable) |
| Opex growth | Gradual | Medium | Medium (team scaling variable) |

---

## 11. Sensitivity Analysis

### What changes MRR by month 12?

| Scenario | Growth Rate | Churn | MRR | Variance |
|----------|-------------|-------|-----|----------|
| **Base Case** | 35% MoM | 6% | $45k | 0% |
| Growth +20% | 42% MoM | 6% | $62k | +38% |
| Growth -20% | 28% MoM | 6% | $28k | -38% |
| Churn +3% | 35% MoM | 9% | $32k | -29% |
| Churn -3% | 35% MoM | 3% | $58k | +29% |
| ARPU +20% | 35% MoM | 6% | $54k | +20% |
| ARPU -20% | 35% MoM | 6% | $36k | -20% |

**Conclusion:** Growth rate é mais impactante que churn ou ARPU

---

## 12. Financial Dashboard (Mês 1-12)

```
MONTH 1                          MONTH 6                          MONTH 12
┌─────────────────────┐         ┌──────────────────────┐         ┌──────────────────────┐
│ MRR: $1.2k          │         │ MRR: $10k            │         │ MRR: $45k ✓          │
│ ARR: $14k           │         │ ARR: $120k           │         │ ARR: $540k           │
│ Customers: 10       │         │ Customers: 65        │         │ Customers: 300       │
│ Churn: 0%           │         │ Churn: 5%            │         │ Churn: 6%            │
│ CAC: $250           │         │ CAC: $175            │         │ CAC: $150            │
│ Cash: $246k         │         │ Cash: $221k          │         │ Cash: $250k ✓        │
│ Runway: 20 meses    │         │ Runway: 9 meses ⚠️   │         │ Runway: Infinite ✓   │
│ Status: Starting    │         │ Status: Hiring       │         │ Status: Series A     │
└─────────────────────┘         └──────────────────────┘         └──────────────────────┘
```

---

## 13. Key Milestones & Financial Targets

| Milestone | Timeline | Target Metrics |
|-----------|----------|-----------------|
| MVP Paid Launch | Month 1-2 | 10+ clientes teste, $1k MRR |
| Product-Market Fit | Month 3-6 | 50+ clientes, $5-10k MRR, NPS >50 |
| Series A Conversation | Month 6-9 | $10-15k MRR, 100+ customers, CAC payback <4m |
| Series A Close | Month 9 | $500k-$1M raised |
| Scale Phase | Month 10-12 | $30-50k MRR, 200+ customers |
| Profitability Path | Month 18+ | Clear path to EBIT positive |

---

## 14. Red Flags & Mitigation

### Red Flag 1: Growth stalls at month 6-9

**Mitigation:**
- Validate new niches (Jurídico, Contact Centers)
- Increase marketing spend
- Launch referral program

### Red Flag 2: Churn spikes (>10%)

**Mitigation:**
- Product improvements
- Better onboarding
- Customer success hire

### Red Flag 3: CAC increases faster than revenue

**Mitigation:**
- Pivot to product-led growth (PLG)
- Increase viral coefficient
- Focus on organic/referral

### Red Flag 4: Series A doesn't close on time (mês 9+)

**Mitigation:**
- Plan to stretch runway (reduce burn)
- Bootstrap profitability
- Alternative: Revenue-based financing

---

## 15. Conclusão & Recomendações Finais

### Modelo Viável? **SIM ✓**

ZapScript tem:
1. **Unit economics excelentes** (98%+ gross margin)
2. **CAC payback rápido** (2-4 meses)
3. **LTV/CAC muito alto** (8-20x)
4. **Runway claro para profitabilidade**

### Investimento Recomendado

**Alvo:** $250k-$300k Seed
- $250k = confortável, precisa Series A mês 7-9
- $300k = robusto, pode escolher Series A timing

### Sequência Financeira

```
Mês 1-6:    MVP → Validação → $10k MRR
Mês 7-9:    Pitch Series A
Mês 9:      Series A Closes ($500k-$1M)
Mês 10-18:  Escala → $50k-$100k MRR
Mês 18+:    Profitável ou Series B
```

### Próximos Passos

1. [ ] Validar ARPU com primeiros 6 clientes pagantes
2. [ ] Revisar projeções com dados reais (mês 1-3)
3. [ ] Preparar Series A pitch (mês 5-6)
4. [ ] Começar investor conversations (mês 6-7)

---

**Modelo criado:** Agosto 2026  
**Próxima revisão:** Setembro 2026 (com dados reais)  
**Confidencial:** Apenas para propósitos internos + investidores sob NDA
