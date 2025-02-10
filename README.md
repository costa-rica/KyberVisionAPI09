![Logo](./docs/images/kyberVisionLogo01.png)

# API v0.8.0

## Description

Database connection and other logic for the Kyber Vision web and mobile apps. This version based on the git@github.com:Priax/KyberVision.git.

- database reconstructed to resemble the database schema from KV2-BDD-2025-01-22 - BDD.drawio.png

## Key changes from API v0.7.0

- /Register route body key name modified
- Based on the KyberVision /backend from: git@github.com:Priax/KyberVision.git
- User Schema property names changed
- property naming convention camelCase
- adding field property for the SQL naming convention.

## .env

```
APP_NAME=KyberVisionAPI08
JWT_SECRET=<your_code_here>
PORT=<your_port_here>
PATH_DATABASE=/home/dashanddata_user/databases/KyberVisionAPI08/
PATH_VIDEOS=/home/dashanddata_user/project_resources/KyberVisionAPI08/match_videos
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
├── node_modules
├── package.json
├── public
│   ├── images
│   ├── index.html
│   ├── javascripts
│   └── stylesheets
├── routes
│   ├── index.js
│   ├── users.js
│   └── videos.js
├── server.js
└── yarn.lock
```

## [Routes](./docs/Routes.md)

## Troubleshooting

### 1. Error: `Error reading video metadata`

- install the ffmpeg package
