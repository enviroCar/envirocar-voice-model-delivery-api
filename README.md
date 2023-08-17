# enviroCar Voice Model Delivery API ⚙

A Voice-Model delivery API created for enviroCar: Voice Command wake-word detection feature.

Stack:
- NodeJS
- ExpressJS
- Winston

## Installation
- Install dependencies
    ```sh
    npm i
    ```
- Create `.env` (take reference from `.env-sample`)

## Deploy
- Start server
    ```sh
    node run start
    ```

## Endpoints

| Endpoint | Request Type | Description |
| --- | --- | --- |
| `latest` | `GET` | Returns the latest model file |
| `models` | `GET` | Returns a list of available models |
| `models/:name` | `GET` | Returns model file with the name `name` if it exists else returns a `404`. Eg: `.../models/Vosk-Model-Latest.7z` returns `Vosk-Model-Latest.7z` model file |
| `refresh` | `GET` | Refreshes the models list and returns the operation result (Useful when new models are added) |

## Logs
Logs are collected for every request in two files:
- `app.log`
- `error.log`