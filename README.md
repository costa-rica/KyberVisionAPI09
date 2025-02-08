![Logo](./docs/images/kyberVisionLogo01.png)

# API v0.7.0

## Description

Serve files and other heavy logic for the Kyber Vision Mobile 07 app.

- database reconstructed to resemble the database schema from KV2-BDD-2025-01-22 - BDD.drawio.png

## Key changes from API v0.6.0

- Database modified
- Based on the KyberVision /backend from: git@github.com:Priax/KyberVision.git

## Route name changes
- `/matchs` is `/matches`

### test
- /users
- /videos
- /scripts


## Environmental Variables

.env

```env
APP_NAME=KyberVisionMobileAPI07
DB_CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.8puct.mongodb.net/kyber_vision_07
PROJECT_RESOURCES=/Users/nick/Documents/_project_resources/kyber-vision-07
```

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
