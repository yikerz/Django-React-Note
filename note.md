### Install Dependencies

1. Create a `requirements.txt` and list all dependencies
2. Install dependencies ([cmd 1](#commands))

### Django Project Setup

3. Create a new Django project called `backend` ([cmd 2](#commands))
4. Create a new app called `api` within the project ([cmd 3](#commands))

### Backend Configuration

5. Import below modules into `backend/backend/settings.py`

- `datetime.timedelta`
- `dotenv.load_dotenv`
- `os`

6. Call `load_dotenv()` at the top to load environment variables
7. Add `"*"` to `ALLOWED_HOSTS` for hosting flexibility
8. Configure JWT for REST API by adding `REST_FRAMEWORK` and `SIMPLE_JWT`
9. Add below items to `INSTALLED_APPS`

- `api`
- `rest_framework`
- `corsheaders`

10. Add `corsheaders.middleware.CorsMiddleware` to `MIDDLEWARE`
11. Set `CORS_ALLOW_ALL_ORIGINS` and `CORS_ALLOW_CREDENTIALS` to `True` at the end of the file
12. Move `requirements.txt` into the `backend` directory

### User Serializer

13. Create `serializers.py` in `backend/api` for ORM mapping
14. Import below modules into `serializers.py`

- `django.contrib.auth.models.User`
- `rest_framework.serializers`

15. Create `UserSerializer` class

- Inherit from `serializers.ModelSerializer`
- Define an inner class `Meta` with the following attributes:
  - `model`: Specify the model being serialized
  - `fields`: List the fields (e.g. `id`, `username`) to be included in the serialization
  - `extra_kwargs`: Configure `password` as `write_only`
- Define a `create` function
  - Accept `validated_data` as input
  - Create a new user using `User.objects.create_user`
  - Return the newly created user

### User View

16. Import below modules in `backend/api/views.py`

- `django.contrib.auth.models.User`
- `rest_framework.generics`
- `.serializers.UserSerializer`
- `rest_framework.permissions.IsAuthenticated`
- `rest_framework.permissions.AllowAny`

17. Create `CreateUserView` class with the following attributes

- `queryset`: Retrieve all user objects
- `serializer_class`: Specify the serializer used for this view
- `permission_classes`: Defines the permission rules for the view

### URL Configuration

18. Import below modules in `backend/backend/urls.py`

- `django.urls.include`
- `api.views.CreateUserView`
- `rest_framework_simplejwt.views.TokenObtainPairView`
- `rest_framework_simplejwt.views.TokenRefreshView`

19. Add paths for

- `api/user/register`
- `api/token/`
- `api/token/refresh/`
- `api/auth`

### Database Migration

20. Make migrations ([cmd 4](#commands))
21. Apply migrations([cmd 5](#commands))
22. Run the application([cmd 6](#commands))

### Create a User

23. Go to `127.0.0.1:<port>/api/user/register/` to create a user
24. Use `127.0.0.1:<port>/api/token/` to obtain a token
25. Refresh the token at `127.0.0.1:<port>/api/token/refresh/`

### Custom Model and Serializer

26. Import `django.contrib.auth.models.User` into `backend/api/models.py`
27. Create `Note` model class

- Inherit from `models.Model`
- Define the following attributes
  - `title`: `models.CharField`
  - `content`: `models.TextField`
  - `created_at`: `models.DateTimeField`
  - `author`: `models.ForeignKey`
- Create a `__str__` function to return the title

28. Import `.models.Note` into `backend/api/serializers.py`
29. Create `NoteSerializer` class

- Inherit from `serializers.ModelSerializer`
- Define an inner class `Meta` with the following attributes:
  - `model`: Specify the model being serialized
  - `fields`: List the fields (e.g. `title`, `content`) to be included in the serialization
  - `extra_kwargs`: Configure `author` as `read_only`

### Note Views

30. Import below modules into `backend/api/views.py`

- `.models.Note`
- `.serializer.NoteSerializer`

31. Create the `NoteListCreate` class for listing and creating notes

- Inherit from `generics.ListCreateAPIView`
- Define the following attributes
  - `serializer_class`: Specify the serializer used for this view
  - `permission_classes`: Sets the permission rules (e.g., `IsAuthenticated`)
- Implement the `get_queryset` function
  - Retrieve the `User` author
  - Retrieve all notes created by the `User`
- Implement the `perform_create` function
  - Accept `serializer` as the input
  - Call `serializer.save` if the serializer is valid
  - Print `serializer.errors` if the serializer is invalid

32. Create the `NoteDelete` class for deleting note

- Inherit from `generics.DestroyAPIView`
- Define the following attributes
  - `serializer_class`: Specify the serializer used for this view
  - `permission_classes`: Sets the permission rules (e.g., `IsAuthenticated`)
- Implement the `get_queryset` function
  - Retrieve the `User` author
  - Retrieve all notes created by the `User`

### Note URL Setup

33. Create `urls.py` in `backend/api`
34. Import below modules in `backend/api/urls.py`

- `django.urls.path`
- `.views`

35. Add routes in `backend/api/urls.py` for

- `notes/`
- `notes/delete/<int:pk>`

36. Update `backend/backend/urls.py` to include `api/`

### Migrations and Testing

37. Run migrations and start the server

### Frontend Setup

38. Create a React project using `npm` ([cmd 7](#commands))
39. Install `axios`, `react-router-dom` and `jwt-decode` ([cmd 8](#commands))
40. Clean up by removing all `.css` files in `frontend/src`
41. Remove all imports in `App.jsx` (except `react.react`)
42. Set up a basic `App.jsx` (`App` only returns empty `<></>`)
43. Remove import `./index.css` from `main.jsx`
44. Create the following items

- Directories
  - `frontend/src/styles`
  - `frontend/src/pages`
  - `frontend/src/components`
- Files
  - `frontend/src/constants.js`
  - `frontend/src/api.js`
  - `frontend/.env`

### Define API in React

45. Export constants `ACCESS_TOKEN` and `REFRESH_TOKEN` constants in `constants.js`
46. Define base endpoint `VITE_API_URL` in `frontend/src/.env`
47. Import below modules in `api.js`

- `axios.axios`
- `./constants.{ACCESS_TOKEN}`

48. Create an Axios instance in `api.js` to handle token-based requests

- `baseURL`: `import.meta.env.VITE_API_URL`

49. Use axios request interceptor to attach `ACCESS_TOKEN` as Bearer token to the header of all requests
50. Export the `api` as default

### Commands

1. `pip install -r requirements.txt`
2. `django-admin startproject backend`
3. `python manage.py startapp api`
4. `python manage.py makemigrations`
5. `python manage.py migrate`
6. `python manage.py runserver <port>`
7. `npm create vite@latest frontend -- --template react`
8. `npm install axios react-router-dom jwt-decode`
