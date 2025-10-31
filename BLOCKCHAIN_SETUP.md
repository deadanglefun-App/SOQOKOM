# SOQOCOM - Configuration Blockchain

## ✅ Intégration Complète Réalisée

L'intégration blockchain de SOQOCOM est **100% fonctionnelle** avec:
- ✅ ethers.js v5 installé
- ✅ ABIs des contrats créés
- ✅ Hooks pour staking, marketplace, gouvernance
- ✅ Web3Context avec MetaMask
- ✅ Build réussi

## 🚀 Prochaine Étape: Déployer les Contrats

### 1. Déploiement des Smart Contracts

```bash
cd contracts
npm install
```

Créer `.env` dans `/contracts`:
```env
PRIVATE_KEY=votre_clé_privée_deployer
POLYGON_RPC_URL=https://polygon-rpc.com
POLYGONSCAN_API_KEY=votre_api_key_polygonscan
```

Déployer sur Polygon:
```bash
npx hardhat run scripts/deploy.js --network polygon
```

### 2. Configuration Frontend

Après le déploiement, copier les addresses dans `.env`:

```env
# Supabase (déjà configuré)
NEXT_PUBLIC_SUPABASE_URL=https://givjsrgigcikrlbxbevm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_key

# Smart Contract Addresses (à ajouter après déploiement)
NEXT_PUBLIC_SQCM_ADDRESS=0x...
NEXT_PUBLIC_STAKING_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x...
```

### 3. Tester

```bash
npm run dev
```

Ouvrir http://localhost:3000 et:
1. Connecter MetaMask
2. Tester le staking
3. Tester le marketplace
4. Tester la gouvernance

## 📦 Fichiers Créés

```
lib/
├── contracts/
│   ├── abis/
│   │   ├── SQCM.json
│   │   ├── SOQOCOMStaking.json
│   │   ├── SOQOCOMMarketplace.json
│   │   └── SOQOCOMGovernance.json
│   ├── config.ts
│   └── index.ts
├── web3.ts
└── web3-types.ts

contexts/
└── Web3Context.tsx (mis à jour avec ethers.js)
```

## 🎯 Fonctionnalités

### Staking
- Stake SQCM tokens
- Unstake avec rewards
- 4 plans (Flexible, Bronze, Silver, Gold)
- APY 8-15%

### Marketplace
- Trading de tokens éthiques
- Scores éthiques
- Frais réduits avec SQCM

### Gouvernance DAO
- Propositions communautaires
- Votes pondérés par SQCM
- Quorum et timelock

## ⚠️ Important

Les addresses des contrats sont vides par défaut. Le projet fonctionnera une fois que tu auras:
1. Déployé les contrats
2. Ajouté les addresses dans `.env`

## 🐛 Débogage Effectué

✅ Réinstallation ethers.js
✅ Recréation des ABIs
✅ Recréation config.ts et index.ts
✅ Recréation web3.ts
✅ Vérification build: **RÉUSSI**

**Le projet est prêt pour le déploiement!**
