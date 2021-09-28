# Setup

## Installing `virtualenv`

```bash
$ pip3 install virtualenv
$ virtualenv -p python3.9 venv_ha
$ ls
./          .git/       README.md
../         .gitignore  venv_ha/
```

## Using this `virtualenv`

```bash
$ source ./venv_ha/bin/activate
$ which python .../holiday_acres/ha_venv/bin/python

```

## Setting up precommit hook

To setup precommit hook, run `yarn` to install node packages and `pip install -r requirements.txt`.
