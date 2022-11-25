from django.urls import path
from . import views
from .views import CreateUser,Index,BlackListToken

urlpatterns=[
    path('',Index.as_view(),name="index"),
    path('register/',CreateUser.as_view(),name="register"),
    path('logout/blacklist/',BlackListToken.as_view(),name="blacklisttokens"),
    path('foods/create/',views.createFood,name="create food"),
    path('foods/disp/<str:category>/',views.dispFoodOnCat,name="disp food based on cat"),
    path('verify/<str:phone>',views.verifyPhone,name="OTP"),
    path('foods/orders/',views.save_order),
    path('admin/data/',views.admin_send_details_users),
]
