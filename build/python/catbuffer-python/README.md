# catbuffer

This is the Python version of the catbuffer library. It is generated using [catbuffer-generators](https://github.com/symbol/catbuffer-generators) from the [catbuffer](https://github.com/symbol/catbuffer-schemas) specification.

The generated code is in Python version 3.7.

This library helps serialize and deserialize NEM's Catapult entities in Python applications.

The library's main client is (symbol-sdk-core-python). We suggest not using this library directly.

Right now only transactions and related objects are generated in a sensible manner, support for state-related objects will be added in future.

## Installation & Usage

### pip install

The python catbuffer package is hosted on [PyPI](https://pypi.org/project/catbuffer).

To install the latest release:

```sh
pip install catbuffer
```

(you may need to run `pip` with root permission: `sudo pip install catbuffer`)

To install a specific version or a snapshot:

```sh
pip install catbuffer=={version}
```

Example:

```sh
pip3 install catbuffer==1.0.0.20210413.152059a1
```
