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

- `queryset`: Retrive all user objects
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

### Commands

1. `pip install -r requirements.txt`
2. `django-admin startproject backend`
3. `python manage.py startapp api`
4. `python manage.py makemigrations`
5. `python manage.py migrate`
6. `python manage.py runserver <port>`
