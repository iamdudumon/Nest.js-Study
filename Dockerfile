# 1. Node.js 베이스 이미지 사용
FROM node:20-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 복사 및 설치
COPY package*.json ./
RUN npm install

# 4. 소스코드 복사
COPY . .

# 5. NestJS 빌드 (ts → js)
RUN npm run build

# 6. 앱 실행
CMD ["node", "dist/main.js"]