# simple-webapp-with-reactjs-koa2
simple SPA with reactjs and koa2

## 설치 방법

### 사전 설치 사항
* [docker](https://www.docker.com/community-edition)
* [nodejs](https://nodejs.org/ko/download/) 최신 LTS 버전: 8.10.0 (includes npm 5.6.0) 이상

### 설치 방법
1. `git clone https://github.com/muphy/simple-webapp-with-reactjs-koa2.git`
2. `cd simple-webapp-with-reactjs-koa2`
3. `mkdir -p devops/dp-data && mkdir -p devops/dump-data`
4. `devops/dump-data` 폴더에 `dump.sql` 파일을 위치시킨다. (`dump.sql.gz` 압축해제). * 참고 github 에 dump.sql 를 올리려니 실제 존재하는 개인정보인 거 같아서 .gitignore 에 추가함
5. `sh scripts/deploy.sh` backend 및 frontend 관련 모듈 설치. dump.sql 실행

### 실행 방법
1. `cd devops && docker-compose up` 을 통해 postgresql 을 실행
2. root 폴더에서 `npm run start:dev`를 통해 웹서버 실행
3. `http://localhost:3000/`으로 접속

## Web API 목록
### 회원 관련
1. 회원 가입 
- url: [http://localhost:3000/api/public/users]
- method: `GET`
- headers
```
Content-Type: application/json
```
- request query params
```
current_page=1
limit=10
```
- 참고: `current_page 는 현재 페이지. 기본값은 1, limit 은 한 번에 가져올 목록수 기본값은 10`
- 예시
```
http://localhost:3000/api/public/users?current_page=2&limit=15
```

## Technologies used:

### backend
* [Typescript](https://www.typescriptlang.org/)
* [typescript-ioc](https://www.npmjs.com/package/typescript-ioc)
* [typeorm](https://www.npmjs.com/package/typeorm)
* [docker](https://www.docker.com/)
* [koa](https://www.npmjs.com/package/koa)

### todo list
- [ ] 설치 자동화 스크립트 작성하기
- [ ] 사용자 목록 결과 페이지 결과값 손보기