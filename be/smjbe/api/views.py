from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Projects, Apis

from .serializers import ProjectsSerializer, ApisSerializer
# Create your views here.


class UserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({ 'name': request.user.username })

class Project(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Projects.objects.filter(user__id=request.user.id).all()
        projects_list = []

        for project in projects:
            temp = ProjectsSerializer(project).data
            api = Apis.objects.filter(project__id=project.id).all()
            temp['apis'] = ApisSerializer(api, many=True).data
            projects_list.append(temp)

        return Response(projects_list)


    def post(self, request):
        serializer = ProjectsSerializer(
            data={
                'name': request.data.get('name'),
            }
        )

        if serializer.is_valid():
            chk_project = Projects.objects.filter(
                user__id=request.user.id,
                name=request.data.get('name').strip()
            )

            if len(chk_project) > 0:
                return Response({
                    'status': 1,
                    'msg': 'Project %s already exist, choose another name' % request.data.get('name')
                })

            serializer.save(user=request.user)

            projects_list = []
            project = serializer.data
            print('-- project --', project)
            apis = Apis.objects.filter(project__id=project['id']).all()
            print('-- apis --', apis)
            project['apis'] = ApisSerializer(apis, many=True).data
            print('-- project after--', project)
            projects_list.append(project)

            return Response(projects_list)

        else:
            return Response(serializer.errors)


class ProjectOne(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, project_id):
        project = Projects.objects.filter(
            id=project_id, user__id=request.user.id).first()
        serializer = ProjectsSerializer(data=request.data, instance=project, partial=True)

        if serializer.is_valid():
            serializer.save()
            # all_projects = Projects.objects.filter(user__id=request.user.id).all()
            # all_projects = ProjectsSerializer(all_projects, many=True)

            projects_list = []
            project = serializer.data
            print('-- project --', project)
            apis = Apis.objects.filter(project__id=project_id).all()
            print('-- apis --', apis)
            project['apis'] = ApisSerializer(apis, many=True).data
            print('-- project after--', project)
            # projects_list.append(project)

            return Response(project)
        else:
            return Response(serializer.errors)


    def delete(self, request, project_id):
        try:
            project = Projects.objects.filter(
                id=project_id,
                user__id=request.user.id
            ).first()

            project.delete()

            return Response([])
        except Exception as e:
            return Response({'status': 1, 'msg': str(e)})


class Api(APIView):
    permission_classes = [IsAuthenticated]

    # def get(self, request):
    #     all_apis = Apis.objects.filter(user__id=request.user.id).all()
    #     serializer = ApisSerializer(all_apis, many=True)
    #     return Response(serializer.data)


    def post(self, request, project_id):

        p = Projects.objects.filter(id=project_id)

        if len(p) == 0:
            return Response({
                'status': 1,
                'msg': '%s project id not found' % project_id
            })

        serializer = ApisSerializer(data=request.data)

        if serializer.is_valid():
            chk_api = Apis.objects.filter(
                user__id=request.user.id,
                name=request.data.get('name').strip(),
                project__id=project_id,
            )

            if len(chk_api) > 0:
                return Response({
                    'status': 1,
                    'msg': '%s api name already exist in this project' % serializer.data.name
                })

            serializer.save(
                user=request.user,
                project=Projects.objects.get(id=project_id))

            return Response(serializer.data)

            # all_projects = Projects.objects.filter(user__id=request.user.id).all()
            # all_projects = ProjectsSerializer(all_projects, many=True)
            # return Response(all_projects.data)


        else:
            return Response(serializer.errors)
