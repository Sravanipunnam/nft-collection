# 🖼️ NFT Collection – ERC-721 Smart Contract with Full Automated Test Suite

## 📌 Overview  
This project implements a **secure, production-ready ERC-721 NFT smart contract** with support for minting, safe transfers, metadata, access control, max supply constraints, and administrative features.  

It includes:

- A **comprehensive automated test suite** (Hardhat + Mocha/Chai)  
- A **Dockerized environment** ensuring reproducible builds and isolated test execution  
- Full event validation, revert-condition tests, and gas-usage checks  
- A clean, modular, professional on-chain architecture designed for real-world NFT collections  

This repository follows strong development practices including test-driven development, access-controlled logic, predictable metadata handling, and reliable DevOps workflows.

---

## ⭐ Features

### ✅ Core ERC-721 Functionality
- Unique token IDs with guaranteed single ownership  
- Safe transfers (`safeTransferFrom`) with full ERC-721 compliance  
- Minting with strict authorization  
- Approval system (`approve`, `setApprovalForAll`)  
- Token metadata via `tokenURI`  
- Proper emission of required events:  
  - `Transfer`  
  - `Approval`  
  - `ApprovalForAll`

---

### 🔐 Access Control
- Admin-only minting  
- Admin-controlled pause/unpause for minting  
- Centralized permission enforcement  
- Secure handling of unauthorized operations  

---

### 📊 Collection Rules
- Fixed **maximum supply**  
- Automatic tracking of **totalSupply**  
- Validation of token existence and valid ID ranges  
- Optional burning functionality with consistent state updates  

---

## 🧪 Automated Test Suite

The test suite covers:

### ✔️ Valid Scenarios
- Successful contract deployment  
- Valid minting + ownership assignment  
- Transfer and safe transfer validation  
- Approvals and operator permissions  
- Metadata retrieval (`tokenURI`)  
- Correct state updates for balances and totalSupply  

### ❌ Failure Scenarios
- Unauthorized minting or transfers  
- Minting beyond max supply  
- Using invalid or duplicate tokenId  
- Zero-address interactions  
- Approved operators misusing permissions  
- Transfer attempts of non-existent tokens  

### 🔍 Additional Checks
- Proper event emission  
- Revoking approvals  
- Operator approval edge cases  
- Gas usage validation for mint + transfer  

---

## 🐳 Docker-Based Execution

This project includes a fully functional Docker environment to ensure evaluators can run the full test suite without installing dependencies.

## 👨‍💻 Author
**Sravani Punnam**  
