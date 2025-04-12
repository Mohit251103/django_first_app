from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import User, Note
from .serializers import UserSerializer, NoteSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code==200:
            data = response.data
            access_token = data["access"]
            refresh_token = data["refresh"]

            response = Response({'message': "Login successful"})

            response.set_cookie(
                key="access_token",
                value=access_token,
                secure=False,
                httponly=True,
                samesite='Lax'
            )

            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                secure=False,
                httponly=True,
                samesite='Lax'
            )

            return response
        return response

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.filter(user__id=request.user.id)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createNotes(request):
    serializer = NoteSerializer(data=request.data)
    if(serializer.is_valid()):  
        serializer.save(user=request.user)
    print(serializer.is_valid())
    print(serializer.errors)
    print(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if(serializer.is_valid()):
        serializer.save()
    return Response(serializer.data, status=200)

@api_view(['GET'])
def getUser(request):
    if request.user.is_authenticated:
        return Response({
            "id": request.user.id,
            "username": request.user.username
        })
    return Response({"error": "Unauthorized"}, status=401)

