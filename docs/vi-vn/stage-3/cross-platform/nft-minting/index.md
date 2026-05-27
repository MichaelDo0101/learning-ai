# Cách dev và mint NFT nhanh — bản 10 phút

::: tip Cập nhật 2026
- **Ethereum gas fee đã giảm mạnh** từ EIP-4844 (blob transactions, 2024) và Pectra upgrade (2025) — mint mainnet giờ ~$1-5 thay vì $50-200
- **L2 (Layer 2)** giờ là default cho NFT: **Base, Arbitrum, Optimism, zkSync** — gas <$0.01
- **OpenSea** vẫn lớn nhất nhưng **Blur, Magic Eden** đang cạnh tranh mạnh
- **AI-generated NFT** rất phổ biến — tích hợp với NanoBanana, Midjourney
- **VN context**: NFT marketplace VN có **Naver NFT, Sky Mavis** (Axie Infinity), nhưng chủ yếu dùng platform global
:::

# Chương 1: NFT và smart contract là gì

Trong tutorial này, ta đi đầy đủ 1 closed loop: từ 0 viết NFT smart contract, deploy lên Ethereum testnet, mint NFT của riêng bạn, xem trên OpenSea. Toàn process dùng tool online browser, không cài env local, 10 phút xong.

Bạn ít nhất cần:
- Chrome browser (cài MetaMask wallet extension)
- 1 MetaMask wallet account
- 1 chút Sepolia testnet ETH (lấy free, hướng dẫn dưới)

> **Zero cost, zero config**: toàn process dùng tool online (Remix IDE), không cài Node.js / Hardhat; code dùng template security của OpenZeppelin official; sau mint thấy NFT trên OpenSea testnet.

## 1.1 NFT là gì?

NFT (Non-Fungible Token) là 1 dạng tài sản số trên blockchain. Khác Bitcoin, Ether và các token "fungible", mỗi NFT là unique — như không có 2 bức tranh giống hệt nhau trên thế giới.

Bạn có thể hiểu NFT là **"chứng nhận sưu tầm thế giới số"**. Có thể đại diện cho:

* Quyền sở hữu 1 tác phẩm số
* 1 vé event
* 1 item game
* 1 chứng chỉ học
* Thậm chí 1 tweet

Giá trị core của NFT: **dùng blockchain chứng minh "item số này thuộc về bạn", chứng minh này public, transparent, không thể tamper**.

## 1.2 Smart contract là gì?

Smart contract là 1 đoạn code chạy trên blockchain. Có thể hiểu là **"hợp đồng tự execute"** — 1 khi deploy lên blockchain, nó tự chạy theo logic code, không ai tamper được.

NFT được tạo và quản lý qua smart contract. Khi bạn "mint" 1 NFT, thực ra là gọi 1 function trong smart contract, cho nó record trên blockchain: "NFT số #0 thuộc về wallet address của bạn".

Ta dùng **Solidity** viết smart contract. Đừng lo, nhờ template sẵn của OpenZeppelin, bạn chỉ cần viết <15 dòng code.

## 1.3 Ta sẽ mint NFT gì?

Ta sẽ mint 1 NFT **"Vibe Coder Learning Certificate"** — chứng minh bạn xong tutorial này, nắm cơ bản dev blockchain. NFT này sẽ:

* Có Token ID unique
* Record trên Ethereum Sepolia testnet
* Xem được và display trên OpenSea testnet
* (Tuỳ chọn) kèm 1 ảnh custom

Bạn cũng có thể đổi sang chủ đề khác — 1 tác phẩm AI-gen, 1 thẻ kỷ niệm event, 1 pixel avatar... Content NFT hoàn toàn do bạn.

## 1.4 Tại sao dùng testnet?

Ethereum có "mainnet" và "testnet":

| Tiêu chí | Mainnet | Testnet (Sepolia) |
|------|----------------|------------------|
| Giá trị ETH | Tiền thật | Free, không giá trị thật |
| Cost deploy | Cần tiền thật (gas fee) | Hoàn toàn free |
| Scenario phù hợp | Release chính thức | Học, test, dev |
| Khác biệt function | Không | Giống mainnet hoàn toàn |

Function testnet và mainnet giống nhau, chỉ khác là ETH testnet không có giá trị thật. Nên ta có thể yên tâm học và experiment, không lo tốn tiền.

## 1.5 Roadmap tutorial này

Ta sẽ qua các bước:

1. **Chuẩn bị wallet và test coin** (2 phút): cài MetaMask, lấy free test ETH
2. **Viết và deploy smart contract** (4 phút): trong Remix IDE viết NFT contract và deploy lên Sepolia
3. **Mint NFT và xem kết quả** (4 phút): call contract mint NFT, verify trên OpenSea và Etherscan
4. **Nâng cao: thêm ảnh cho NFT** (tuỳ chọn): dùng IPFS lưu ảnh, NFT hoàn chỉnh hơn

# Chương 2: chuẩn bị wallet và test coin (2 phút)

## 2.1 Cài MetaMask wallet

MetaMask là wallet Ethereum phổ biến nhất, là browser extension cho phép bạn tương tác với app blockchain.

1. Mở Chrome, truy cập [MetaMask official](https://metamask.io/)
2. Click "Download", cài Chrome extension
3. Sau cài xong, click icon cáo MetaMask góc trên phải browser
4. Chọn "Create new wallet", set password
5. **Quan trọng**: lưu giữ kỹ recovery phrase (12 từ tiếng Anh). Wallet testnet mất không sao, nhưng tạo thói quen tốt rất quan trọng

## 2.2 Switch sang Sepolia testnet

MetaMask default connect mainnet Ethereum. Ta cần switch sang Sepolia:

1. Click dropdown network ở top MetaMask (default "Ethereum Mainnet")
2. Click "Show test networks"
3. Chọn "Sepolia test network"

Nếu không thấy Sepolia, click "Add network", add tay:

| Config | Value |
|-------|-----|
| Network Name | Sepolia test network |
| RPC URL | `https://rpc.sepolia.org` |
| Chain ID | 11155111 |
| Currency Symbol | ETH |
| Block Explorer | `https://sepolia.etherscan.io` |

## 2.3 Lấy test ETH free

Cần 1 chút Sepolia ETH để pay gas fee. Lấy free từ "faucet":

**Cách 1: Alchemy Sepolia Faucet** (khuyến nghị)
1. Truy cập https://sepoliafaucet.com/
2. Đăng nhập Alchemy account (free)
3. Paste wallet address của bạn
4. Click "Send Me ETH" — nhận 0.5 Sepolia ETH

**Cách 2: Infura Sepolia Faucet**
1. https://www.infura.io/faucet/sepolia
2. Đăng nhập Infura
3. Lấy ETH

**Cách 3: Google Cloud Faucet** (mới, không cần đăng nhập)
1. https://cloud.google.com/application/web3/faucet/ethereum/sepolia
2. Paste address, captcha
3. Nhận ETH instant

Đợi 1-2 phút, check balance trong MetaMask → có Sepolia ETH.

# Chương 3: viết và deploy smart contract (4 phút)

## 3.1 Mở Remix IDE

Remix là online IDE cho Solidity, không cần cài gì:

1. Truy cập https://remix.ethereum.org/
2. Đợi load xong, thấy giao diện 3 cột

## 3.2 Tạo file contract

1. Trong file explorer (cột trái), tạo file mới `MyNFT.sol`
2. Paste code dưới:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract VibeCoderCertificate is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("Vibe Coder Certificate", "VIBE")
        Ownable(initialOwner)
    {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
```

**Giải thích code**:
- `ERC721`: tiêu chuẩn NFT chính của Ethereum
- `Ownable`: chỉ owner contract mới mint được
- `safeMint`: function tạo NFT mới và assign cho address `to`
- `_nextTokenId++`: mỗi NFT có ID unique tăng dần

## 3.3 Compile contract

1. Click tab "Solidity Compiler" bên trái (icon thứ 2)
2. Chọn version compiler: `0.8.20` hoặc mới hơn
3. Click "Compile MyNFT.sol"
4. Nếu thành công, hiện ✅ xanh

## 3.4 Deploy contract

1. Click tab "Deploy & Run Transactions" (icon thứ 3 bên trái)
2. Environment: chọn "Injected Provider - MetaMask"
3. MetaMask popup hỏi connect — confirm
4. Đảm bảo Account hiện wallet bạn, Network là Sepolia
5. Trong dropdown Contract, chọn `VibeCoderCertificate`
6. Trong field `initialOwner`, paste wallet address của bạn
7. Click "Deploy"
8. MetaMask popup hỏi confirm transaction — confirm (tốn ~0.001 Sepolia ETH gas)
9. Đợi 10-30 giây, contract deploy xong

🎉 Bạn vừa deploy smart contract đầu tiên!

# Chương 4: mint NFT và xem kết quả (4 phút)

## 4.1 Call function safeMint

1. Trong Remix, scroll xuống "Deployed Contracts"
2. Expand contract vừa deploy
3. Tìm function `safeMint`
4. Field `to`: paste wallet address của bạn (mint NFT cho chính mình)
5. Click "transact"
6. MetaMask popup confirm — confirm

Đợi 10-30s. Bạn đã mint NFT đầu tiên!

## 4.2 Verify trên Etherscan

1. Trong Remix, click vào transaction hash dưới console
2. Mở trên Sepolia Etherscan
3. Thấy transaction confirmed, NFT đã được mint

Hoặc trực tiếp:
1. Truy cập https://sepolia.etherscan.io/
2. Paste wallet address
3. Tab "NFT Transfers" → thấy NFT vừa mint

## 4.3 Xem trên OpenSea testnet

1. Truy cập https://testnets.opensea.io/
2. Click "Sign in" → connect MetaMask
3. Vào "Profile"
4. Thấy NFT "Vibe Coder Certificate" của bạn

🎉 Hoàn thành! NFT đầu tiên của bạn đã sống trên Ethereum blockchain.

# Chương 5: nâng cao — thêm ảnh cho NFT (tuỳ chọn)

NFT hiện chỉ có ID, chưa có metadata (tên, ảnh, mô tả). Để hoàn chỉnh:

## 5.1 Upload ảnh lên IPFS

IPFS (InterPlanetary File System) là storage decentralized. Cách dễ nhất: dùng **Pinata** (free 1GB):

1. Đăng ký https://www.pinata.cloud/
2. Click "Upload" → upload ảnh JPG/PNG
3. Copy CID (Content Identifier), ví dụ `QmXxxxx...`

## 5.2 Tạo metadata JSON

Tạo file `metadata.json`:

```json
{
  "name": "Vibe Coder Certificate #0",
  "description": "Certificate for completing the NFT tutorial",
  "image": "ipfs://QmXxxxx.../your-image.png",
  "attributes": [
    { "trait_type": "Course", "value": "Học AI Full A-Z" },
    { "trait_type": "Stage", "value": "3 - Advanced" }
  ]
}
```

Upload file này lên Pinata. Lấy CID metadata.

## 5.3 Update contract với tokenURI

Sửa contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract VibeCoderCertificate is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("Vibe Coder Certificate", "VIBE")
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function tokenURI(uint256 tokenId) 
        public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) 
        public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
```

Re-compile và deploy lại. Khi mint, pass `uri` là `ipfs://QmYyyyy.../metadata.json`.

Reload OpenSea sẽ thấy NFT có ảnh và metadata.

# Chương 6: bước tiếp theo

Bạn đã hoàn thành flow NFT đầu tiên. Bước tiếp:

## 6.1 Deploy lên mainnet (cẩn thận với cost)

Mainnet thực sự tốn tiền. Workflow:
1. Test kỹ trên testnet trước
2. Audit code (đặc biệt nếu collection commercial)
3. Có đủ ETH cho gas (~$50-200 cho deploy)
4. Switch MetaMask sang Ethereum Mainnet
5. Deploy lại từ Remix

**Khuyến nghị mạnh**: dùng **L2 (Layer 2)** thay mainnet:
- **Base** (Coinbase L2): cheap, growing
- **Arbitrum**: mature, lớn nhất
- **Optimism**: friendly với dev
- **zkSync Era**: technology mới
- Gas fee L2: ~$0.01-0.1 thay $50-200 mainnet

## 6.2 Build NFT collection 10,000 piece

Pattern này cần:
- Generate ảnh batch (AI: NanoBanana, Midjourney)
- Upload IPFS batch
- Smart contract có `mint(uint256 quantity)`
- Random reveal logic
- Reveal sau soldout
- Royalty cho creator (EIP-2981)

## 6.3 Add marketplace function

- Listing/buying built-in trong contract
- Auction system
- Royalty enforcement

## 6.4 Connect frontend

- Next.js + ethers.js / viem
- Wallet connect (RainbowKit, ConnectKit)
- Display NFT collection
- Mint UI

# Câu hỏi thường gặp

### Q1: NFT có legal ở VN không?

Hiện chưa có luật rõ. Crypto/NFT là grey area. Cá nhân giao dịch nhỏ OK, nhưng marketplace lớn cần cẩn thận pháp lý.

### Q2: NFT có giá trị thật không?

Giá trị NFT = giá trị thị trường gán cho nó. Có project value cao (BAYC, CryptoPunks), có project zero. **Đừng đầu tư hơn số tiền bạn mất được**.

### Q3: AI tạo art có làm NFT được không?

Được, nhưng:
- Check ToS của AI tool (Midjourney cho commercial, NanoBanana cho output ownership)
- Disclose nếu AI-generated (tránh fraud)
- Đảm bảo style không infringe artist khác

### Q4: Cost mint trên mainnet 2026?

- Ethereum mainnet: $1-10 (giảm mạnh từ EIP-4844)
- Base/Arbitrum/Optimism L2: $0.01-0.10
- Polygon (sidechain): $0.001-0.01

### Q5: Marketplace nào tốt nhất 2026?

| Marketplace | Best for |
|---|---|
| OpenSea | Tổng hợp, lớn nhất |
| Blur | Pro trader, low fee |
| Magic Eden | Multichain (Bitcoin Ordinals, Solana, Ethereum) |
| Foundation | High-end art |
| Zora | Music NFT, social |

# Tài liệu tham khảo

- [OpenZeppelin Wizard](https://wizard.openzeppelin.com/) - gen contract template no-code
- [Remix IDE](https://remix.ethereum.org/) - online Solidity IDE
- [Pinata](https://www.pinata.cloud/) - IPFS storage
- [Ethers.js docs](https://docs.ethers.org/) - JS library
- [Anthropic + Solidity](https://github.com/anthropics) - dùng Claude assist Solidity dev

---

# Phụ lục: NFT ecosystem 2026

## A. L2 đã thay mainnet cho 90% use case

| L2 | TVL | Best for |
|---|---|---|
| Base | $15B+ | Coinbase ecosystem, retail |
| Arbitrum | $20B+ | DeFi, mature |
| Optimism | $10B+ | Public goods funding |
| zkSync Era | $5B+ | ZK technology |
| Linea | $3B | ConsenSys ecosystem |
| Polygon zkEVM | $2B | Polygon ecosystem |

**Khuyến nghị**: build NFT trên **Base** hoặc **Arbitrum** thay mainnet — same security, 100x cheaper.

## B. AI + NFT trend 2026

- **AI-generated NFT** với verifiable provenance (Story Protocol, Optimum)
- **Generative on-chain art**: code chạy trên-chain (như Art Blocks)
- **Dynamic NFT**: NFT thay đổi theo time, weather, user action
- **AI agent owning NFT**: trend mới — agent có wallet, own NFT, trade

## C. VN dev opportunity 2026

- **VN art NFT marketplace**: chưa có dominant player. Cơ hội build niche cho artist VN
- **POAP cho event VN**: certificate dạng NFT cho conference, course, workshop
- **Membership NFT**: thay loyalty card truyền thống
- **Real estate tokenization**: pilot project ở 1 số nước, cơ hội cho VN
- **Gaming + NFT**: Sky Mavis (Axie) là VN-built, pattern proven

## D. Cảnh báo

⚠️ **NFT scam phổ biến**:
- Fake project nhái BAYC
- Phishing site claim "free mint"
- Wallet drainer khi sign random transaction
- Rug pull (creator bỏ project sau mint)

**Best practice security**:
- Dùng hardware wallet (Ledger, Trezor) cho holding lớn
- Read transaction trước sign
- Không click link unsolicited
- Revoke approval định kỳ (revoke.cash)

## Sources

- [Ethereum.org NFT docs](https://ethereum.org/en/nft/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [L2 Beat](https://l2beat.com/)
- [NFT market data Q1/2026](https://dappradar.com/nft)
