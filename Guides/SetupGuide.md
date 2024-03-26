# Setup Guide for Ecommerce Emotional Analysis
**This assumes you have basic knowledge of using a terminal and troubleshooting**
## Programs to install

### Applications from the internet
1. Python
2. npm
3. node js
### Download from terminal
1. pip install django djangorestframework
1. pip install 
### Run this in python
```
import nltk
nltk.download()
```
If that doesn't work:
```
import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download()
```

Download all for now
### In the project folder
1.