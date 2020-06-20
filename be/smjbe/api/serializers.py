from rest_framework import serializers

from .models import Projects, Apis


class ProjectsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Projects
        fields = ['id', 'name', 'date_created']


class ApisSerializer(serializers.ModelSerializer):

    class Meta:
        model = Apis
        fields = [
            'id',
            'name',
            'method',
            'endpoint',
            'resource',
            'parameters',
            'date_created',
            'project_id',
        ]
