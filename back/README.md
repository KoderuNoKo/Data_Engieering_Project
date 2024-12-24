# Backend

## Install

### 1. Create a virtual environment
```bash
python -m venv <name>
```

### 2. Activate the virtual environment
```bash
source <name>/Scripts/activate
```
or
```bash
source <name>/bin/activate
```

### 3. Install the required packages

#### NOTE: install TA-Lib dependency manually
- Go to https://sourceforge.net/projects/talib-whl/files/ta_lib_0.4.28/
- Download the .whl file, the cp312 is for python 3.12
- In the requirements.txt, replace TA-Lib path part with the path to the .whl file

#### Now install the required packages
```bash
pip install -r requirements.txt
```

## Run

### 1. Obtain the API key
- Create api_key.txt file in the back folder
- Paste the API key into the file

### 2. Activate the virtual environment 
```bash
source venv/bin/activate
```

### 3. Run the application
```bash
python app.py
```
Server will now run on http://localhost:5000

### 4. Stop the application
```bash
Ctrl + C
```
