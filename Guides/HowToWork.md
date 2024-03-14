# How to work on the project
## Testing
### Backend
1. Run `python manage.py runserver`
1. Website url is `localhost:8000`
### Frontend
1. Run `npm run dev`
1. Website url is `localhost:3000`

## Editing or adding code
**I will not be including imports, but they are required.**<br>
**Import when necessary, such as models, functions, etc.**

### Making redirects and views
If you want a function or a view to happen when a user requests a website.
1. Make the view in the views.py. This will be the functions, classes, or views that you are able to return to the user.
1. Make the url redirection in urls.py. If the user request /login, /account/..., etc, it will fetch the function from views.py.
1. Run `python manage.py makemigrations`
1. Run `python manage.py migrate`

### Database
If you want to work on the database model
1. Edit the databse in `emotionalAnaylsis/api/models.py`
1. Run `python manage.py makemigrations`
1. Run `python manage.py migrate`

How to retrieve the info from the database
1. Have your model in `models.py`
1. Create your serializer in `serializers.py`. A serializer is a class that formats what values should be obtained from the database.
1. Output this in `api/views.py`. This is so when a request is sent, the view of the database can be returned.
