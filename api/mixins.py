from django.conf import settings
from twilio.rest import Client
from django.conf import settings
class MessageHandler:

    phone_number = None
    otp = None

    def __init__(self,phone_number,otp)->None:
        self.phone_number=phone_number
        self.otp=otp

    def send_otp_on_phone(self):

        client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)

        message = client.messages.create(
            body=f"Your OTP is {self.otp}",
            from_='+19498284219',
            to=f'+91{self.phone_number}'
        )

        print(message.sid)
