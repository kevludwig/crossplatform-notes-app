cp .env.example .env

npm i

docker compose up -d

npx prisma generate

npx prisma db push

npm run dev