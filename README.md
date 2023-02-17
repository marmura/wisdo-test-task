# wisdo-test-task

### Installation

```bash
yarn install
```

### Run app dev mode

```bash
yarn run dev
```

### Run tests

```bash
yarn test:unit
```

```bash
yarn test:coverage
```

### Implemented endpoints

GET /health \
POST /community \
authorized POST /community/:id/join \
POST /user \
authorized POST /post \
authorized POST /post/:id/like \
authorized GET  /post/community/:id/feed

to access to authorized endpoints need to set header 'userId' from existing user

Postman collection example:

https://api.postman.com/collections/91575-e6299c8d-e9b8-415f-88ef-03f3d762b5ac?access_key=PMAT-01GSFFHCK95KPSXQCPA94E4NK9

### Default watchlist

["apple", "table"]
