from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import NewUser,Foods,Categories,Orders

class FoodsSerialier(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields="__all__"
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields="__all__"
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields="__all__"


