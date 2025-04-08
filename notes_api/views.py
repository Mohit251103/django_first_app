from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Note
from .serializers import UserSerializer, NoteSerializer

@api_view(['GET'])
def getNotes(request, user_id):
    notes = Note.objects.filter(user__id=user_id)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createNotes(request, user_id):
    serializer = NoteSerializer(data=request.data)
    if(serializer.is_valid()):
        serializer.save()
    return Response(serializer.data)

