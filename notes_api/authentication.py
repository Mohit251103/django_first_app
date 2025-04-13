from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError, AuthenticationFailed, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get("access_token")
        refresh_token = request.COOKIES.get("refresh_token")
        if access_token:
            try:
                validated_token = self.get_validated_token(access_token)
                return self.get_user(validated_token), validated_token
            except InvalidToken:
                if not refresh_token:
                    raise AuthenticationFailed("Refresh token not present")
                
                try:
                    refresh = RefreshToken(token=refresh_token)
                    new_access_token = str(refresh.access_token)
                    request.new_access_token = new_access_token

                    return self.get_user(refresh.access_token), refresh.access_token
                except TokenError:
                    raise AuthenticationFailed("Refresh token invalid or expired")

        return None