from django.db.models.aggregates import Sum
from django.shortcuts import render
from rest_framework.decorators import api_view

from trackerapp.models import Activity
from trackerapp.serializers import ActivitySerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET', 'POST'])
def activity_view(request):
    if request.method == 'GET':
        data = Activity.objects.all()
        serializer = ActivitySerializer(data, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = ActivitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def activity_summary(request):
    total_entries=Activity.objects.count()
    total_hours=Activity.objects.aggregate(total=Sum('hours'))['total'] or 0
    most_active=Activity.objects.values('student_name').annotate(total_hours=Sum('hours')).order_by('-total_hours','student_name').first()
    return Response({
        'total_entries': total_entries,
        'total_hours': total_hours,
        'most_active_user': (
            most_active['student_name'] if most_active else None
        )
    })

@api_view(['GET','DELETE'])
def activity_delete(request, id):
    try:
        activity = Activity.objects.get(id=id)
    except Activity.DoesNotExist:
        return Response({"error": "Activity not found"},status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        activity.delete()
        return Response({"message": "Activity deleted successfully"},status=status.HTTP_200_OK)

