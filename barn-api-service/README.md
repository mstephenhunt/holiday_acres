### To start service:

```bash
$ ~/barn-api-service/poetry run uvicorn main:app --reload
```

Will also need to copy existing Django db:

```bash
$ ~/barn-api-service$ cp ../api/db.sqlite3 .
```
