from rest_framework import serializers

from trackerapp.models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model=Activity
        fields=('student_name','activity','hours')
    