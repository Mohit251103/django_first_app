from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User, Note
from .serializers import UserSerializer, NoteSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth import logout
from django.shortcuts import redirect

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
                max_age=30*24*60*60,
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
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)
        note.delete()
        return Response("Note deleted successfully", status=200)
    except Note.DoesNotExist:
        return Response("Note does not exist", status=404)
    
@api_view(['PUT'])
def updateNote(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)
    except Note.DoesNotExist:
        return Response("Note does not exist", status=404)
    serializer = NoteSerializer(instance=note, data=request.data)
    if(serializer.is_valid()):
        serializer.save()
        return Response("Note Updated Successfully", status=200)
    return Response(serializer.errors, status=400)

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

@api_view(['GET'])
def logout_custom(request):
    refresh_token = request.COOKIES.get("refresh_token")
    response = Response()
    # response = redirect("http://localhost:5173")
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            response.data = {"message":"User logged out successfully"}
            response.status_code = status.HTTP_200_OK
            return response 
        except TokenError:
            return Response({"message": "Token invalid or expired"}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.user.is_authenticated:
        logout(request._request)
        response.delete_cookie("csrf_token")
        response.delete_cookie("sessionid")
        response.data = {"message":"User logged out successfully"}
        response.status_code = status.HTTP_200_OK
        return response

    response.data = {"message": "No valid user"}
    response.status_code = status.HTTP_400_BAD_REQUEST
    return response

