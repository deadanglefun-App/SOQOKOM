# SOQOCOM Smart Contracts

Smart contracts pour l'écosystème SOQOCOM - Finance Éthique 3.0

## 📦 Contrats

### 1. **SQCM.sol** - Token Principal
- Supply: 500,000,000 SQCM
- Standard ERC20 avec extensions
- Fonctionnalités: Burn, Permit, Pause
- Vesting intégré pour équipe
- Blacklist pour sécurité

### 2. **DHSL.sol** - Stablecoin Argent
- 1 DHSL = 1 gramme d'argent physique
- KYC/AML intégré
- Oracle pour prix de l'argent
- Mint/Redeem avec vérification
- Roles: Minter, Burner, Oracle

### 3. **SOQOCOMStaking.sol** - Staking
- 4 plans de staking (Flexible, Bronze, Silver, Gold)
- APY: 8-15% selon durée
- Lock periods: 0, 3, 6, 12 mois
- Calcul automatique des récompenses
- Claim rewards sans unstake

### 4. **SOQOCOMGovernance.sol** - DAO
- Gouvernance décentralisée
- Vote basé sur SQCM holdings
- Timelock pour sécurité
- Quorum: 4% des tokens
- Threshold: 1000 SQCM pour proposer

### 5. **SOQOCOMMarketplace.sol** - Marketplace
- Trading de tokens éthiques
- Scoring éthique intégré
- Frais réduits avec SQCM (1.5% vs 2.5%)
- Minimum ethical score: 70/100
- P2P trading sécurisé

### 6. **SOQOCOMOracle.sol** - Oracle Éthique
- Scoring ESG décentralisé
- 5 dimensions: Environment, Social, Governance, Transparency, Compliance
- Multi-validateurs (minimum 3)
- Période de validité: 30 jours
- Sources de données agrégées

## 🚀 Installation

```bash
cd contracts
npm install
```

## ⚙️ Configuration

Créer un fichier `.env`:

```env
POLYGON_RPC_URL=https://polygon-rpc.com
DEPLOYER_PRIVATE_KEY=your_private_key_here
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

## 🔨 Compilation

```bash
npm run compile
```

## 🧪 Tests

```bash
npm run test
```

## 📤 Déploiement

### Testnet (Mumbai)
```bash
npm run deploy:mumbai
```

### Mainnet (Polygon)
```bash
npm run deploy:polygon
```

## 🔐 Vérification des Contrats

```bash
npx hardhat verify --network polygon ADRESSE_DU_CONTRAT
```

## 📊 Architecture

```
SQCM (ERC20)
├── SOQOCOMStaking (staking SQCM)
├── SOQOCOMGovernance (DAO voting)
└── SOQOCOMMarketplace (frais réduits)

DHSL (Stablecoin)
└── Oracle (prix argent)

SOQOCOMOracle
└── SOQOCOMMarketplace (scoring éthique)
```

## 🔒 Sécurité

- ✅ OpenZeppelin Contracts v5.0
- ✅ ReentrancyGuard sur toutes les fonctions critiques
- ✅ Pausable pour emergency stop
- ✅ AccessControl pour rôles
- ✅ SafeERC20 pour tous les transferts

## 📝 Tokenomics SQCM

### Distribution (500M total)
- 25% Réserve Écosystème (125M)
- 20% Liquidité Initiale (100M)
- 15% Équipe & Dev (75M) - Vesting 36 mois
- 15% Pré-vente Stratégique (75M)
- 15% Programme Communauté (75M)
- 10% Trésorerie DAO (50M)

## 🎯 Plans de Staking

| Plan | Durée | APY | Minimum |
|------|-------|-----|---------|
| Flexible | 0 | 8% | 100 SQCM |
| Bronze | 3 mois | 10% | 500 SQCM |
| Silver | 6 mois | 12% | 1,000 SQCM |
| Gold | 12 mois | 15% | 5,000 SQCM |

## 📈 Scoring Éthique (Oracle)

### Dimensions (100 points max)
- 🌍 Environnement: 25%
- 👥 Social: 20%
- 🏛️ Gouvernance: 25%
- 📊 Transparence: 15%
- ⚖️ Conformité: 15%

### Minimum requis: 70/100

## 🌐 Réseaux Supportés

- Polygon PoS (Mainnet)
- Mumbai Testnet
- Migration zkEVM prévue (Q4 2025)

## 📚 Documentation

- [Whitepaper v2.0](../app/whitepaper)
- [Tokenomics](../app/tokenomics)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Hardhat Docs](https://hardhat.org/docs)

## 🤝 Contribution

Les contributions sont bienvenues ! Merci de suivre:
1. Fork le repo
2. Créer une branche feature
3. Commit les changements
4. Push et créer une PR

## 📄 Licence

MIT License - voir LICENSE

## 🔗 Liens Utiles

- Website: https://soqocom.com
- Twitter: @SOQOCOM
- Discord: discord.gg/soqocom
- Telegram: t.me/soqocom

---

**SOQOCOM - Finance Éthique 3.0** 🌍
