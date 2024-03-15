# How the project was build
## Step 1
### In the project folder

You want to make the project folder.

    django-admin startproject 'applicationName'

Then make an api folder in that project.

    django-admin startapp api    

So now your directory should look like this
> main folder <br> -projectfolder<br>--apifolder<br>--projectfolder

## Step 2
1. Add the api to the projectFolder/settings.py installed_apps

## Step 3
1. Make database with `python manage.py makemigrations`

## Step 4
1. Make frontend with `npm init -y`
1. Run
```
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm install @mui/material
npm install @babel/plugin-proposal-class-properties
npm install react-router-dom
npm install @mui/icons-material
```