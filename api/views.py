# Create your views here.
import random

from rest_framework import status
from django.db import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from .models import NewUser, Foods, Categories, VerifyPhone,Orders
from django.core.exceptions import ObjectDoesNotExist
from .serializers import FoodsSerialier,OrderSerializer,UserSerializer
from .mixins import MessageHandler


class Index(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response("Working...")


class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.data)
        myDict = request.data
        print(myDict)
        try:
            user = NewUser.objects.get(phone=myDict['phone'])
            return Response({"message": "Phone number already present"})
        except ObjectDoesNotExist:
            user = NewUser.objects.create_user(user_name=myDict['user_name'], password=myDict['password'],
                                               phone=myDict['phone'])
            return Response({"message": "Successfully created"})


class BlackListToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def createFood(request):
    print(request.user)
    name = request.data["name"]
    price = request.data["price"]
    category = request.data["category"]
    image = request.data['image']
    c = Categories.objects.get(category_name=category)
    food = Foods.objects.create(food_name=name, price=price, category=c, image=image)
    f = FoodsSerialier(food, many=False)
    return Response(f.data)

# get objects based on category
@api_view(['GET'])
def dispFoodOnCat(request, category):
    category = category.lower()
    if category != "all":
        c = Categories.objects.get(category_name=category)
        foods = Foods.objects.filter(category=c)
    else:
        foods = Foods.objects.all()
    serializer = FoodsSerialier(foods, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# OTP VERIFICATION
@api_view(['POST', 'GET'])
def verifyPhone(request, phone):
    user = NewUser.objects.filter(phone = phone)
    if user.exists():
        if request.method == 'POST':
            data = request.data
            print(user[0].is_superuser)

            ver_ph = VerifyPhone.objects.filter(phone=phone)
            if ver_ph.exists():
                if data['otp'] == ver_ph[0].otp:
                    ver_ph[0].delete()
                    user[0].is_active = True
                    return Response({"msg": "OTP MATCHES"},status=status.HTTP_200_OK)
                return Response({"msg": "OTP DOES NOT MATCH"},status=status.HTTP_406_NOT_ACCEPTABLE)
            return Response({"msg": "Phone number not created in VerifyDb(first get then post req)"},status=status.HTTP_404_NOT_FOUND)
        else:
            otp = random.randint(1000, 9999)
            vp = VerifyPhone.objects.create(phone=phone, otp=otp)
            # ----Uncomment this to send message---

            # obj = MessageHandler(phone_number=phone,otp=otp).send_otp_on_phone()
            return Response({"msg": "Sent OTP"}, status=status.HTTP_200_OK)
    else:
        return Response({"msg":"Invalid Phone number Entered"})

#order details
@api_view(['POST'])
def save_order(request):
    data = request.data
    order = Orders.objects.create(phone=data['phone'],food=data['food'])
    orderserializer = OrderSerializer(order,many=False)
    return Response(orderserializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
def admin_send_details_users(request):
    users = NewUser.objects.all()
    orders = Orders.objects.all()
    data = {}
    data['users']=UserSerializer(users,many=True).data
    data['orders']=OrderSerializer(orders,many=True).data
    return Response(data)

@api_view(['POST'])
def userdetails(request):
    data = request.data
    user = NewUser.objects.filter(phone=data['phone'])
    print(user)
    if user.exists():
        return Response({"is_admin":user[0].is_superuser})
    return Response("InVALID",status=status.HTTP_404_NOT_FOUND)


