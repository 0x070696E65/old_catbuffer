# Important
This is out of date and no longer recommended.
Please keep this as a reference only.

# catbuffer-generators

[![Build Status](https://api.travis-ci.com/nemtech/catbuffer-generators.svg?branch=main)](https://travis-ci.com/nemtech/catbuffer-generators)

Set of code generators to serialize and deserialize Catapult entities in different programming languages.

In combination with the [catbuffer-parser](https://github.com/symbol/catbuffer-parser) project and [catbuffer-schemas](https://github.com/symbol/catbuffer-schemas) developers can generate builder classes for a given set of programming languages. For example, the [Symbol SDKs](https://docs.symbolplatform.com/sdk) use the generated code to operate with the entities in binary form before announcing them to the network.

## Supported programming languages

- C++
- Java
- TypeScript/JavaScript
- Python

## Requirements

- Python >= 3.6

### Java generator

- openjdk-8-jdk or openjdk-11-jdk

### Typescript generator

- nvm
- `nvm install --lts`

### Python generator

Currently python generator requires python 3.7

### Cpp transaction builders generator

No additional requirements.

## Installation

1. Clone the ``catbuffer-generators`` repository:

```bash
git clone https://github.com/symbol/catbuffer-generators
```

2. Clone ``catbuffer-schemas`` repository

```bash
cd catbuffer-generators
git clone --depth 1 --branch v1.0.1 https://github.com/symbol/catbuffer-schemas.git 
```

3. Install the package requirements:

```bash
cd catbuffer-generators
python3 -m pip install -r requirements.txt
```

## Usage

Use language-specific `generate` script inside `scripts` directory. For example:

```bash
scripts/generate_java.sh
```

Most of these scripts, after producing the code will compile it into an output artifact in the ``build`` folder.

> **NOTE:**
> These scripts require Bash 4 or higher.

### Run the linter

```bash
python3 -m pip install -r test_requirements.txt
python3 -m pip install -r lint_requirements.txt
pylint --load-plugins pylint_quotes generators
pycodestyle --config=.pycodestyle .
```
