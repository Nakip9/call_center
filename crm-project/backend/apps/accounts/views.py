from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegistrationSerializer, UserSerializer, JWTTokenSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = JWTTokenSerializer


class RefreshView(TokenRefreshView):
    pass


class LogoutView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:  # noqa: B902
                return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Logged out'}, status=status.HTTP_205_RESET_CONTENT)


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAdminUser]
    search_fields = ['username', 'email', 'first_name', 'last_name']


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
