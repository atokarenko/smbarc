#!/bin/bash
# SMB Arc — One-time server setup for Ubuntu 24.04 LTS (DigitalOcean)
# Usage: ssh root@<IP> 'bash -s' < deploy/setup-server.sh
set -euo pipefail

APP_DIR="/opt/smbarc"
DEPLOY_USER="deploy"

echo "=== SMB Arc Server Setup ==="

# ─── System updates ──────────────────────────────────────────────
apt-get update && apt-get upgrade -y
apt-get install -y curl git ufw fail2ban

# ─── Firewall ────────────────────────────────────────────────────
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ─── Deploy user ─────────────────────────────────────────────────
if ! id "$DEPLOY_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
  usermod -aG docker "$DEPLOY_USER" 2>/dev/null || true
  mkdir -p /home/$DEPLOY_USER/.ssh
  cp ~/.ssh/authorized_keys /home/$DEPLOY_USER/.ssh/
  chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
  chmod 700 /home/$DEPLOY_USER/.ssh
  chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
fi

# ─── Docker ──────────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker "$DEPLOY_USER"
fi

# Docker log rotation
cat > /etc/docker/daemon.json << 'DJSON'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
DJSON
systemctl restart docker

# ─── Swap (2GB) ──────────────────────────────────────────────────
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# ─── App directory ───────────────────────────────────────────────
mkdir -p "$APP_DIR"
chown $DEPLOY_USER:$DEPLOY_USER "$APP_DIR"

# ─── Generate .env ───────────────────────────────────────────────
if [ ! -f "$APP_DIR/.env" ]; then
  AUTH_SECRET=$(openssl rand -hex 32)
  cat > "$APP_DIR/.env" << ENVFILE
DATABASE_URL=file:/app/data/prod.db
BETTER_AUTH_SECRET=$AUTH_SECRET
BETTER_AUTH_URL=https://smbarc.raccoonsoft.dev
AI_BASE_URL=https://api.openai.com/v1
AI_API_KEY=sk-CHANGE-ME
AI_MODEL=gpt-4o-mini
NODE_ENV=production
PORT=3000
ENVFILE
  chown $DEPLOY_USER:$DEPLOY_USER "$APP_DIR/.env"
  chmod 600 "$APP_DIR/.env"
  echo ">>> .env created at $APP_DIR/.env — edit AI_API_KEY!"
fi

echo ""
echo "=== Setup complete ==="
echo "Next steps:"
echo "  1. Edit $APP_DIR/.env — set AI_API_KEY"
echo "  2. Clone repo: su - $DEPLOY_USER -c 'git clone <repo> $APP_DIR/app'"
echo "  3. Symlink .env: ln -s $APP_DIR/.env $APP_DIR/app/.env"
echo "  4. Build & start: cd $APP_DIR/app && docker compose -f docker-compose.prod.yml up -d --build"
echo "  5. Configure Cloudflare DNS: smbarc.raccoonsoft.dev → $(curl -s ifconfig.me)"
