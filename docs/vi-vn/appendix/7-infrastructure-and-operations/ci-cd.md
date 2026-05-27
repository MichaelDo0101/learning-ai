# CI / CD Automation

::: tip Mở đầu
**Trước**: code xong, SSH server, `git pull`, `npm install`, `npm run build`, restart service... 20 phút, đau khổ, error-prone.

**Sau (CI/CD)**: push code → auto build → test → deploy. 5 phút, không touch server.

CI/CD = quan trọng nhất ops modern.
:::

---

## 1. Sao "deploy service"?

Process truyền thống manual:
1. SSH server
2. Pull latest code
3. Install dep
4. Build
5. Stop old service
6. Start new
7. Test
8. Có sai → manual rollback

Pain:
- **Slow**: 15-30 phút mỗi deploy
- **Error-prone**: typo command, dependency conflict
- **Inconsistent**: dev env ≠ prod env
- **Risky**: midday deploy → downtime
- **Difficult**: rollback hard, multi-server cùng deploy phức tạp

**CI/CD** = automation toàn process.

| Term | Full | Note |
|------|------|------|
| **CI** | Continuous Integration | Tự build + test code mỗi push |
| **CD** | Continuous Delivery / Deployment | Tự deploy build pass test |

---

## 2. Build: code thành "package transportable"

Build = transform source code thành executable artifact:
- **JS/TS**: `npm run build` → dist/ (bundled JS)
- **Java**: `mvn package` → .jar
- **Go**: `go build` → binary
- **Docker**: `docker build` → image

```bash
# JS variant
npm install && npm run build   # npm
yarn install && yarn build     # yarn
pnpm install && pnpm build     # pnpm

# Docker (recommended)
docker build -t my-app:1.0 .
```

**Docker image** = ideal artifact: contain code + runtime + dep, chạy ở đâu cũng nhất quán.

---

## 3. Server: nhà "không bao giờ đóng cửa"

Cần server "luôn online" để host app. Options:
- **VPS**: AWS EC2, DigitalOcean Droplet (tự manage)
- **PaaS**: Vercel, Railway, Fly.io (PaaS manage)
- **Container**: K8s, ECS
- **Serverless**: Lambda, Cloud Run

### Connect SSH

```bash
ssh -i key.pem ubuntu@<IP>
# Hoặc với password:
ssh ubuntu@<IP>
# Nhập password
```

---

## 4. Deploy: chuyển code vào "nhà"

### Method 1: SSH + script

```bash
# Trên server (vd Ubuntu)
# Tạo dir
sudo mkdir -p /var/www/myapp
sudo chown $USER:$USER /var/www/myapp
cd /var/www/myapp

# Clone repo
git clone https://github.com/user/repo.git .

# Install dep
npm install --production

# Build
npm run build

# PM2 install
sudo npm install -g pm2

# Start
pm2 start dist/index.js --name myapp

# Auto start on reboot
pm2 startup
pm2 save

# Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/myapp
```

```nginx
server {
    listen 80;
    server_name myapp.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t  # Test config
sudo systemctl restart nginx

# HTTPS với Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d myapp.example.com
```

### Method 2: Docker

```bash
# Build local
docker build -t my-app:1.0 .

# Push registry
docker tag my-app:1.0 myregistry.com/my-app:1.0
docker push myregistry.com/my-app:1.0

# Pull + run trên server
ssh server "docker pull myregistry.com/my-app:1.0 && docker stop my-app && docker run -d --name my-app -p 80:3000 myregistry.com/my-app:1.0"
```

### Method 3: PaaS (đơn giản nhất)

```bash
# Vercel
vercel

# Railway
railway up

# Fly.io
fly deploy
```

---

## 5. CI/CD pipeline

### GitHub Actions example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t my-app:${{ github.sha }} .
      - name: Push to registry
        run: |
          echo ${{ secrets.REGISTRY_TOKEN }} | docker login -u ${{ secrets.REGISTRY_USER }} --password-stdin
          docker push my-app:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: SSH deploy
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull my-app:${{ github.sha }}
            docker stop my-app || true
            docker rm my-app || true
            docker run -d --name my-app -p 80:3000 my-app:${{ github.sha }}
```

### Flow

```
Push code → GitHub Actions trigger
            │
            ├─→ Test (unit + integration)
            ├─→ Lint + format check
            ├─→ Build (compile + bundle)
            ├─→ Build Docker image
            ├─→ Push to registry
            └─→ Deploy to server
```

---

## 6. Deployment strategies

| Strategy | Note | Use |
|------|------|------|
| **Recreate** | Stop old + start new | Dev, downtime OK |
| **Rolling update** | Replace dần | Default K8s, no downtime |
| **Blue-Green** | 2 env, switch traffic | Critical, easy rollback |
| **Canary** | Cho ít traffic version mới, monitor | Risk averse |
| **A/B testing** | Traffic theo rule (geo, user segment) | Feature test |

---

## 7. Best practices

| Practice | Note |
|------|------|
| **Pipeline as code** | YAML trong repo, version-controlled |
| **Fast feedback** | Test trước build, build trước deploy |
| **Cache dep** | Cache `node_modules`, Docker layer |
| **Parallel jobs** | Test + lint + build song song |
| **Secret management** | GitHub Secrets, Vault, không hardcode |
| **Environment promotion** | dev → staging → prod, không skip |
| **Notifications** | Slack notify success/fail |
| **Rollback ready** | Tag image, có thể rollback trong giây |

---

## 8. Tổng kết

CI/CD = critical capability cho team modern. Không phải optional.

1. **CI**: auto build + test mỗi push
2. **CD**: auto deploy artifact pass
3. **Pipeline as code**: YAML trong repo
4. **Strategies**: rolling, blue-green, canary
5. **Tool**: GitHub Actions, GitLab CI, Jenkins, CircleCI

::: tip 2026 cho VN dev
- **Tool**:
  - **GitHub Actions**: free cho public repo, ecosystem mạnh
  - **GitLab CI**: enterprise full
  - **CircleCI**: parallel mạnh
  - **Jenkins**: legacy, on-prem
  - **Drone, Woodpecker**: lightweight self-host
- **Deploy targets**:
  - **PaaS**: Vercel, Railway, Render, Fly.io (đơn giản nhất)
  - **Container**: AWS ECS, Cloud Run
  - **K8s**: ArgoCD, FluxCD cho GitOps
- **VN context**:
  - Startup → GitHub Actions + Vercel/Railway
  - Mid-size → GitLab CI + Docker + K8s
  - Enterprise → Jenkins + on-prem
- **AI scenario**: AI assist viết CI YAML (Cursor, Claude Code)
:::
