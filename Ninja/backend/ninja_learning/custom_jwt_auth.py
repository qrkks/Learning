from ninja_jwt.authentication import JWTBaseAuthentication, JWTAuth

from ninja.errors import HttpError


class CookieJWTAuth(JWTBaseAuthentication):
    def authenticate(self, request):
        # 先检查是否有 Cookie 中的 auth-token
        token = request.COOKIES.get('auth-token')

        if token:
            print('Token from cookie:', token)
            return self.jwt_authenticate(request, token=token)

        # 如果没有 Cookie，检查 Authorization 头
        authorization_header = request.headers.get('Authorization')
        if authorization_header:
            token = authorization_header.split(' ')[1]  # 提取 token
            print('Token from Authorization header:', token)
            return self.jwt_authenticate(request, token=token)

        # 如果没有找到 token，则返回 401 Unauthorized
        raise HttpError(
            401, "Unauthorized: No token found in cookies or Authorization header")

    def __call__(self, request):
        return self.authenticate(request)
