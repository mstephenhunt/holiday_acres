### To start service:

```bash
$ poetry run uvicorn main:app --reload
```

Will also need to copy existing Django db:

```bash
$ cp ../api/db.sqlite3 .
```
