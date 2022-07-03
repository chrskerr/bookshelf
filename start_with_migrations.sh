#!/bin/sh

set -ex
npm run seed
npx prisma migrate deploy
npm run start
