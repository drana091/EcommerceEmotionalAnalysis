# What each file does

## api folder
### api/views.py
Contains the views for the project. Views are functions that takes a web request and returns a web response.

**Example:** When the website request www.website/**hello**.com, the `/hello` part gets taken and a view gets returned.

### api/models.py
This is the database model of your application

### api/serializer.py
Takes the database model from models.py, and outputs the actual values stored in them.

### urls.py
Handles the redirection of urls.<br>
`api/urls.py` handles the views of the database.<br>
`emotionalAnalysis/urls.py` handles the main redirection.<br>
`frontend/urls.py` handles the frontend website urls.<br>

**Example:** If the url ends with **/admin/...**, it gets send to the admin file.

## emotionalAnalysis Folder

## frontend Folder
### src/components
This is where you make your components. Components are pieces of code that can be used like a template.<br>
### static/css/index.css
This is the stylesheet