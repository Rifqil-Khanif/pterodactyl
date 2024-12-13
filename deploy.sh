# File: deploy.sh

# Instalasi dependencies
composer install --no-dev --prefer-dist

# Instalasi Wings
bash <(curl -s -L https://github.com/Pterodactyl/Wings/releases/download/v1.1.0/wings.sh)

# Instalasi FFmpeg
sudo apt-get update && sudo apt-get install ffmpeg -y

# Konfigurasi Pterodactyl
cp .env.example .env
sed -i 's/DB_HOST=127.0.0.1/DB_HOST=railway/g' .env
sed -i 's/DB_PASSWORD=/DB_PASSWORD=your_database_password/g' .env
sed -i 's/DB_USERNAME=/DB_USERNAME=your_database_username/g' .env

# Buat database
php artisan migrate --seed

# Buat akun admin
php artisan p:user:create --username admin --email admin@gmail.com --password @Userzeroyt7 --admin

# Jalankan Pterodactyl
php artisan serve --host 0.0.0.0 --port 3000
