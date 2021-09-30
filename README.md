## Package Management Setup

### Poetry Python Package Management

[Python Poetry](https://python-poetry.org/docs/) is used for package management. That link will bring you to the instructions page for installing for Windows or Unix.

On Mac install, if you get the error:

```bash
[SSL: CERTIFICATE_VERIFY_FAILED]
```

You may need to [create a symlink from the OS certs to python](https://github.com/python-poetry/poetry/issues/680#issuecomment-743921693).

### Yarn JS Package Installation

[yarn](https://classic.yarnpkg.com/lang/en/docs/install/) is used to manage JS packages used for linting and pre-commit hooks. This can usually be installed directly via `npm`:

```bash
npm install --global yarn
```

After installing `yarn`, simply run:

```bash
$ yarn
```

to install the required JS packages.

## Django Setup

### Initial DB migration

Currently only setup to use SQLite. Run `python manage.py migrate` to put in base tables.

### Create dummy initial admin account

```bash

python manage.py createsuperuser --email admin@example.com --username admin

```

Using password "testing".
