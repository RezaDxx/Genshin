#!/bin/bash

# Masuk ke direktori (memastikan script berjalan di tempat yang benar)
cd /home/larzy/Documents/genshin

# Cek status git
git add .

# Gunakan argumen pertama sebagai pesan commit, jika kosong gunakan waktu saat ini
if [ -z "$1" ]
then
    COMMIT_MSG="Auto-deploy: $(date +'%Y-%m-%d %H:%M:%S')"
else
    COMMIT_MSG="$1"
fi

git commit -m "$COMMIT_MSG"

# Push ke branch utama (sesuaikan 'main' atau 'master')
git push origin main

