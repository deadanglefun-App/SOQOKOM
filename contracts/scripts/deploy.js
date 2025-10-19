const hre = require("hardhat");

async function main() {
  console.log("🚀 Déploiement des contrats SOQOCOM - Finance Éthique 3.0\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Déploiement avec le compte:", deployer.address);
  console.log("Balance du compte:", (await deployer.getBalance()).toString(), "\n");

  console.log("📝 Déploiement SQCM Token...");
  const SQCM = await hre.ethers.getContractFactory("SQCM");
  const sqcm = await SQCM.deploy();
  await sqcm.deployed();
  console.log("✅ SQCM déployé à:", sqcm.address);

  console.log("\n🪙 Déploiement DHSL Stablecoin...");
  const DHSL = await hre.ethers.getContractFactory("DHSL");
  const dhsl = await DHSL.deploy();
  await dhsl.deployed();
  console.log("✅ DHSL déployé à:", dhsl.address);

  console.log("\n💰 Déploiement SOQOCOMStaking...");
  const Staking = await hre.ethers.getContractFactory("SOQOCOMStaking");
  const staking = await Staking.deploy(sqcm.address);
  await staking.deployed();
  console.log("✅ Staking déployé à:", staking.address);

  console.log("\n🏛️ Déploiement SOQOCOMGovernance...");
  const TimelockController = await hre.ethers.getContractFactory("TimelockController");
  const timelock = await TimelockController.deploy(
    86400,
    [deployer.address],
    [deployer.address],
    deployer.address
  );
  await timelock.deployed();
  console.log("✅ Timelock déployé à:", timelock.address);

  const Governance = await hre.ethers.getContractFactory("SOQOCOMGovernance");
  const governance = await Governance.deploy(sqcm.address, timelock.address);
  await governance.deployed();
  console.log("✅ Governance déployé à:", governance.address);

  console.log("\n🛒 Déploiement SOQOCOMMarketplace...");
  const Marketplace = await hre.ethers.getContractFactory("SOQOCOMMarketplace");
  const marketplace = await Marketplace.deploy(sqcm.address);
  await marketplace.deployed();
  console.log("✅ Marketplace déployé à:", marketplace.address);

  console.log("\n🔮 Déploiement SOQOCOMOracle...");
  const Oracle = await hre.ethers.getContractFactory("SOQOCOMOracle");
  const oracle = await Oracle.deploy();
  await oracle.deployed();
  console.log("✅ Oracle déployé à:", oracle.address);

  console.log("\n\n📋 RÉSUMÉ DES DÉPLOIEMENTS");
  console.log("═══════════════════════════════════════════════════════");
  console.log("SQCM Token:         ", sqcm.address);
  console.log("DHSL Stablecoin:    ", dhsl.address);
  console.log("Staking:            ", staking.address);
  console.log("Timelock:           ", timelock.address);
  console.log("Governance:         ", governance.address);
  console.log("Marketplace:        ", marketplace.address);
  console.log("Oracle:             ", oracle.address);
  console.log("═══════════════════════════════════════════════════════");

  console.log("\n💾 Sauvegarde des adresses...");
  const fs = require("fs");
  const addresses = {
    network: hre.network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      SQCM: sqcm.address,
      DHSL: dhsl.address,
      Staking: staking.address,
      Timelock: timelock.address,
      Governance: governance.address,
      Marketplace: marketplace.address,
      Oracle: oracle.address,
    },
  };

  fs.writeFileSync(
    `deployments-${hre.network.name}.json`,
    JSON.stringify(addresses, null, 2)
  );

  console.log("✅ Adresses sauvegardées dans deployments-" + hre.network.name + ".json");
  console.log("\n🎉 Déploiement terminé avec succès!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
