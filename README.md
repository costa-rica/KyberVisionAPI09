![Logo](./docs/images/kyberVisionLogo01.png)

# API v0.9.0

## Description

- Currently the Development API
- Database connection and other logic for the Kyber Vision web and mobile apps. This version based on the git@github.com:Priax/KyberVision.git.
- database reconstructed to resemble the database schema from KV2-BDD-2025-01-22 - BDD.drawio.png

## Key changes from API v0.8.0

???

## .env

```
APP_NAME=KyberVisionAPI09
JWT_SECRET=<your_code_here>
PORT=<your_port_here>
PATH_DATABASE=/home/dashanddata_user/databases/KyberVisionAPI08/
PATH_VIDEOS=/home/dashanddata_user/project_resources/KyberVisionAPI08/match_videos
NAME_DB=kv08.db
```

- APP_NAME, PATH_DATABASE and PATH_VIDEOS can by anything this is just what is on the dev server.

## Route name changes

- `/matchs` is `/matches`

### test

- /users
- /videos
- /scripts

## Test request to upload video

```bash
curl -X POST http://localhost:8000/videos/upload-video \
  -F "video=@/Users/nick/Documents/_testData/testVideos/ProblemStatement15.mp4" \
  -F "teamHome=Team A" \
  -F "teamAway=Team B" \
  -F "dateOfMatch=2024-12-15"
```

```bash
curl -X POST http://192.168.1.18:8001/videos/upload-video \
  -F "video=@/Users/nick/Documents/_testData/testVideos/ProblemStatement15.mp4" \
  -F "teamHome=Team AUC" \
  -F "teamAway=Team B" \
  -F "dateOfMatch=2024-12-13"
```

## video installations

`npm install multer ffmpeg ffmpeg-static fluent-ffmpeg`
`yarn add multer ffmpeg ffmpeg-static fluent-ffmpeg`

### more

- mac `brew install ffmpeg`
- Ubuntu/Debian:

```
sudo apt update
sudo apt install ffmpeg
```

## Folder structure

```
.
├── README.md
├── app.js
├── bin
│   └── www
├── docs
│   ├── Routes.md
│   └── images
├── middleware
│   └── auth.js
├── models
│   ├── Action.js
│   ├── CompetitionContract.js
│   ├── Complex.js
│   ├── GroupContract.js
│   ├── League.js
│   ├── Match.js
│   ├── OpponentServeTimestamp.js
│   ├── Player.js
│   ├── PlayerContract.js
│   ├── Point.js
│   ├── Script.js
│   ├── SyncContract.js
│   ├── Team.js
│   ├── User.js
│   ├── Video.js
│   └── _connection.js
├── modules
│   ├── common.js
│   ├── match.js
│   ├── userAuthentication.js
│   └── videoProcessing.js
├── node_modules
├── package.json
├── public
│   ├── images
│   ├── index.html
│   └── stylesheets
├── routes
│   ├── actions.js
│   ├── adminDb.js
│   ├── groups.js
│   ├── index.js
│   ├── matches.js
│   ├── players.js
│   ├── scripts.js
│   ├── syncContracts.js
│   ├── teams.js
│   ├── users.js
│   └── videos.js
├── server.js
└── yarn.lock
```

## [Routes](./docs/Routes.md)

## Troubleshooting

### 1. Error: `Error reading video metadata`

- install the ffmpeg package
