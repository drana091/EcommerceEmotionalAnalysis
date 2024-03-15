# How to work on the project
## Conventions and Standards
MaterialUI library will be used for the interface construction.

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

---
### Making redirects and views
If you want a function or a view to happen when a user requests a website.
1. Make the view in the views.py. This will be the functions, classes, or views that you are able to return to the user.
1. Make the url redirection in urls.py. If the user request /login, /account/..., etc, it will fetch the function from views.py.
1. Run `python manage.py makemigrations`
1. Run `python manage.py migrate`

### How URLs work
The first file the project searches for URL redirection in is `emotionalAnalysis/urls.py`.<br>
Then, if it ends in `/api/...`, it will go to `api/urls.py`,<br>
or if it ends in anything else, it will go to `frontend/urls.py`.

---
### Database
**If you want to work on the database model**
1. Edit the databse in `emotionalAnaylsis/api/models.py`
1. Run `python manage.py makemigrations`
1. Run `python manage.py migrate`

**How to retrieve info from the database**
1. Make a view to view the data.

**How to send info to the databse**
1. Make a view to send data.
1. In the component file you will be using, in the constructor, set the state of each data to send.
1. Make methods to change this state when user inputs data.
1. Make method to send this data when user submits.
1. In the submit method, fetch the url corresponding to the view you made, and send the data.

**Make a view**
1. Have your model in `models.py`
1. Create your serializer in `serializers.py`. A serializer is a class that model into a readable format.
1. Make a class to view the data in `api/view.py`. This defines what happens to the data.
1. Update `api/urls.py` for the new view you made. This defines what url will show the view.

---
### Adding websites
There's three main files you have to edit. The new component you want to render, a `url.py` file, and the page where it will be rendered on.
1. Build any new components if needed
1. In one of the three urls.py files, add the path for the website, and which file it will take you to.
1. In that file you will be redirected to, add a new route for the user request and which component it will show.

**For example:** <br>
I want to add a cart page. If the url ends with `.../cart`, render the cart page.<br>
1. Make `CartPage.js` component in `frontend/src/components`. 
1. In `frontend/urls.py`, add the code `path('cart', index)`. This means that if the url ends with `/cart`, then go to `index.js`.
1. In the `HomePage.js`, add the route `<Route path= '/cart' element={<ViewProductPage />} />`. This will render the page if the url ends with `/cart`.