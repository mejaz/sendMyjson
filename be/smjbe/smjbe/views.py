import os
import json
import requests
import time
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View


class RegisterUser(View):

    def _check_robot(self, g_response):
        g_recaptcha_url = "https://www.google.com/recaptcha/api/siteverify"
        g_secret_key = os.environ.get('GOOGLE_SECRET_KEY')
        check_url = f"{g_recaptcha_url}?secret={g_secret_key}&response={g_response}"

        r = requests.get(check_url).json()
        print(r)

        if r["success"]:
            return True
        else:
            return False

    def _create_user(self, email, password):
        try:
            chk_user = User.objects.filter(username=email)
            if len(chk_user) > 0:
                return {'status': 1, 'msg': f"Error - {chk_user[0].email} user already registered." }

            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                is_superuser=False,
                is_staff=False
            )
            user.save()

            return {'status': 0, 'msg': f"{user.email} successfully registered." }

        except Exception as e:
            return {'status': 1, 'msg': "Error creating user - %s" % str(e)}

    def post(self, request):
        try:
            if request.body:
                time.sleep(5)
                body = json.loads(request.body)

                email = body.get('email').strip()
                password = body.get('password').strip()
                recaptcha_response = body.get('recaptchaToken').strip()

                if email == '' or password == '' or recaptcha_response == '':
                    return JsonResponse({
                        'status': 1,
                        'msg': "Error - Incomplete info, all fields are mandatory."
                    })

                if self._check_robot(recaptcha_response):
                    user_create_response = self._create_user(email, password)
                    return JsonResponse(user_create_response)
                else:
                    return JsonResponse({'status': 1, 'msg': "Error - SignUp allowed only through form."})

            return JsonResponse({'status': 1, 'msg': 'Error - Request body is empty!'})

        except Exception as e:
            return JsonResponse({'status': 1, 'msg': 'Error - %s' % str(e)})
