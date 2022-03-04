#!/bin/sh
git pull
npm run build
systemctl restart ulabeler.service