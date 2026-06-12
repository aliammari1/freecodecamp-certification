<!-- SPDX-License-Identifier: MIT -->

# File Metadata Microservice

Part of the [freeCodeCamp Backend API Portfolio](../README.md). An Express 5
service that accepts a file upload and returns its name, MIME type, and size.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/fileanalyse` | Upload a file in the `upfile` field (multipart) |
| `GET` | `/api/fileanalyse` | Metadata of the last uploaded file |
| `GET` | `/api-docs` | Scalar interactive reference |
| `GET` | `/api-docs.json` | Raw OpenAPI 3.0 spec |

```bash
curl -F "upfile=@notes.txt" localhost:3000/api/fileanalyse
# {"name":"notes.txt","type":"text/plain","size":18}
```

## Run & test

```bash
bun run dev
bun test
```

## Security note

`multer` stores uploads under a **random generated filename** in `uploads/`;
the on-disk path is never derived from the untrusted `originalname`, so a crafted
filename (e.g. `../../etc/passwd`) cannot escape the upload directory. Uploads are
capped at 10 MB. A regression test pins this behaviour.

## What you'll learn

- Handling `multipart/form-data` with `multer` and `upload.single()`.
- A real-world **path-traversal** defence (don't trust `originalname` for the
  storage path) and how to size-limit uploads.
- Documenting a file-upload endpoint in OpenAPI (`format: binary`).
