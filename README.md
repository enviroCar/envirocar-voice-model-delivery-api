# enviroCar Voice Model Delivery API ⚙

Voice-Model delivery API created for enviroCar: Voice Command wake-word detection feature, responsible for providing Language Models remotely.

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
- Create `assets` folder in the project directory and add model files in it.
Latest released model file must contain the word `latest` (Case Insensitive) in it's filename, so that it is served at `/latest` endpoint. Eg: `Vosk-Model-Latest.7z` 

## Deploy
- Start server
    ```sh
    npm run start
    ```
OR

- Build docker image
    ```sh
    docker build . -t <TAG>
    ```
- Run container
    ```sh
    docker run -d --name <CONTAINER_NAME> -p <HOST_PORT>:8000 --mount type=bind,source=$(pwd)/assets,target=/usr/src/app/assets <IMAGE_TAG>
    ```

## Endpoints

| Endpoint | Request Type | Description |
| --- | --- | --- |
| `latest` | `GET` | Returns the latest model file |
| `models` | `GET` | Returns a JSON list of available models |
| `models/:name` | `GET` | Returns model file with the filename `name` if it exists else returns a `404`. Eg: `<address>/models/Vosk-Model-Latest.7z` returns `Vosk-Model-Latest.7z` model file |
| `refresh` | `GET` | Refreshes the models list and returns the operation result (Useful when new models are added) |

## Logs
Logs are collected for every request and saved in two files in the project root dirctory:
- `app.log`
- `error.log`