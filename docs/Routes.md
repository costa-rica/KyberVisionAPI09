# Routes

## GET /videos

returns:

```json
{
  "videos": [
    {
      "id": "675c9ef30d51cfad7f13fcf9 <-- Mongo ObjID",
      "filename": "1734123247972-JTvPAN_01.mp4",
      "matchName": "JT vs PAN",
      "date": "2022-03-23",
      "scripted": false,
      "duration": "13 mins"
    }
  ]
}
```

## GET /:filename

returns: video file

## POST /upload-video

expects:

- req.body

```json
{
  "teamHome": "String",
  "teamAway": "String",
  "dateOfMatch": "String",
  "teamHome": "String"
}
```

- req.file.path
