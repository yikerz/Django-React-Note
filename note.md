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

### Protected Route Component

51. Create `ProtectedRoute.jsx` in `frontend/src/components`
52. Import the following modules in `ProtectedRoute.jsx`

- `react-router-dom.{Navigate}`
- `jwt-decode.{jwtDecode}`
- `../api.api`
- `../constants.{REFRESH_TOKEN, ACCESS_TOKEN}`
- `react.{useState, useEffect}`

53. Create a function `ProtectedRoute`

- Accept `{children}` as the input
- Setup react state `isAuthorized` (`null`)
- Render `<div>Loading...</div>` if the `isAuthorized` state is `null`
- Render child components if the user is authorized, otherwise navigate to `/login`
- Export the `ProtectedRoute` as default
- Create async inner function `auth`
  - Get `ACCESS_TOKEN` from local storage and set it to `token`
  - If no token, set `isAuthorized` state to `false` and return nothing
  - Decode `token` using `jwtDecode` and set it to `decoded`
  - If `decoded` has expired, call `refreshToken`, otherwise set `isAuthorized` state to `true`
- Create async inner function `refreshToken`
  - Get `REFRESH_TOKEN` from local storage and set it to `refreshToken`
  - Try:
    - Send POST request to `/api/token/refresh/` through `api` using `refreshToken`
    - If `res.status` is `200`, set `res.data.access` to `ACCESS_TOKEN` in local storage and set `isAuthorized` state to `true`, otherwise to `false`
  - Catch `error`:
    - Console log display `error` and set `isAuthorized` state to `false`
- Call `auth` with `useEffect`, set `isAuthorized` state to `false` if error is caught

### Frontend Pages

54. Create the following files in `frontend/src/pages` with basic rendering

- `Home.jsx`
- `Register.jsx`
- `Login.jsx`
- `NotFound.jsx`

55. Implement routes in `App.jsx` for (i.e. return `<BrowserRouter>`)

- `Home` (wrapped by `ProtectedRoute`)
- `Login`
- `RegisterAndLogout`
- `NotFound` (for `path="*"`)
- `Logout`

56. Create functions `Logout` and `RegisterAndLogout`

- Clear the local storage
- Return to `<Navigate to="/login" />` and `<Register />` respectively

### Implement "Not Found" Page

57. Modify `NotFound.jsx` such that the page displays

- `h1`: "404 Not Found"
- `p`: "The page you're looking for doesn't exist!"

58. Run and test the frontend ([cmd 9](#commands))

### User Forms

59. Create `Form.jsx` in `frontend/src/components` with function `Form`

- Accept `{route, method}` as the inputs
- Create react states
  - `username` (`""`)
  - `password` (`""`)
  - `loading` (`false`)
- Create `useNavigate` instance as `navigate`
- Return `<form>` with
  - `onSubmit`: `{handleSubmit}`
  - `className`: `form-container`
- Inside the form
  - Display `{method}` as `h1`
  - Add text `<input className="form-input" />` for state `username`
  - Add text `<input className="form-input" />` for state `password`
- Create an async inner function `handleSubmit`
  - Set `Loading` state to `true`
  - Prevent default page refresh
  - Try:
    - Send POST request `{username, password}` to route through `api`
    - For `login` page
      - Save `res.data.access` as `ACCESS_TOKEN` in local storage
      - Save `res.data.refresh` as `REFRESH_TOKEN` in local storage
      - Navigate to `home` page
    - For `register` page
      - Navigate to `login` page
  - Catch `error`:
    - Console log display `error`
  - Finally:
    - Set `loading` to `false`

60. Add style to `Form.jsx` using `frontend/src/styles/Form.css` (simply import `Form.css`)

### Implement "Register" and "Login" Pages

61. For both functions `Register()` and `Login()`, return `<Form />` with specific `route` and `method`

### Implement "Home" Page

62. For `Home()` in `Home.jsx`

- Create react states
  - `notes` (`[]`)
  - `content` (`""`)
  - `title` (`""`)

63. Create an inner function `getNotes` in `Home()`

- Send GET request to `/api/notes/` through `api`
- Set state `notes` as `res.data` and console log the data
- Catch `error` and console log the error
- Call `getNotes` with `useEffect`

64. Create an inner function `deleteNotes` in `Home()`

- Accept `id` as the input
- Send DELETE request to `/api/notes/delete/${id}/` through `api`
- If `res.status` is `204`, console log display "Note deleted!", otherwise "Failed to delete note."
- Call `getNotes`
- Catch `error` and console log the error

65. Create an inner function `createNote` in `Home()`

- Prevent default refresh
- Send POST request `{content, title}` to `/api/notes/` through `api`
- If `res.status` is `201`, console log display "Note created!", otherwise "Failed to make note."
- Call `getNotes`
- Catch `error` and console log the error

66. Build the HTML for the home page

- `<h2>Note</h2>`
- `<h2>Create a Note</h2>`
- Create a form with three elements:
  - Title input (with label)
  - Content text area (with label)
  - Submit button

### Build Note Component

67. Create `Note.jsx` in `frontend/src/components` with function `Note`

- Accept `{note, onDelete}` as the inputs
- Create `formattedDate` using `Date().toLocaleDateString("en-US")`
- `<div className="note-container">`
  - `<p className="note-title">`: `{note.title}`
  - `<p className="note-content">`: `{note.content}`
  - `<p className="note-date">`: `{formattedDate}`
  - `<button className="delete-button" onClick>`: "Delete"
- Export the `Note` as default

68. In `Home.jsx` under `<h2>Notes</h2>`, use `notes.map` to display all `Note` components

69. Import `Note.css` into `Note.jsx`

### Commands

1. `pip install -r requirements.txt`
2. `django-admin startproject backend`
3. `python manage.py startapp api`
4. `python manage.py makemigrations`
5. `python manage.py migrate`
6. `python manage.py runserver <port>`
7. `npm create vite@latest frontend -- --template react`
8. `npm install axios react-router-dom jwt-decode`
9. `npm run dev`
