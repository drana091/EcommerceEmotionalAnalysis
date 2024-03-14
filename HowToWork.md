# How to work on the project
## Testing
### Backend
1. Run `python manage.py runserver`
1. Website url is `localhost:8000`

## Editing or adding code
### Making redirects and views
If you want a function or a view to happen when a user requests a website.
1. Make the view in the views.py. This will be the functions or views that you are able to return to the user.
1. Make the url redirection in urls.py. If the user request /login, /account/..., etc, it will fetch the function from views.py.
1. Run `python manage.py migrate`