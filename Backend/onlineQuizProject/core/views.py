from django.shortcuts import render,get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Quiz, Question, Option, QuizAttempt, Answer
from .serializers import QuizSerializer, QuestionSerializer, OptionSerializer, QuizAttemptSerializer, AnswerSerializer
from django.contrib.auth import authenticate, logout, login
# Create your views here.

@api_view(["GET"])
def quiz_list(request):
    quizz= Quiz.objects.all()
    serializer = QuizSerializer(quizz, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def question_list(request, pk):
    quiz =get_object_or_404(Question, pk=pk)
    questions = Question.objects.filter(quiz=quiz)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def option_list(request, pk):
    question = get_object_or_404(Question, pk=pk)
    options = Option.objects.filter(question=question)
    serializer = OptionSerializer(options, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def quizattempt_list(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    attempts = QuizAttempt.objects.filter(quiz=quiz, user=request.user)
    serializer = QuizAttemptSerializer(attempts,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def answer_list(request, pk):
    attempt = get_object_or_404(QuizAttempt, pk=pk)
    answers = Answer.objects.filter(attempt=attempt)
    serializer = AnswerSerializer(answers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({'message':"Email and password are important"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'message':"Invalid Email or Password"}, status=status.HTTP_401_UNAUTHORIZED)

    #Authenticate user with admin panel username
    user_auth = authenticate(username=user.username, password=password)

    if user_auth is not None:
        login(request, user_auth)
        return Response({"success": True, 'message':"Login Success"}, status=status.HTTP_200_OK)
    else:
        return Response({"success": False, 'message':"Invalid Username or password"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["POST"])
def logout_user(request):
    logout(request)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

    
@api_view(["POST"])
def signup_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    
    #check Empty
    if not username or not email or not password:
        return Response({"success": False, "message": "All Fields requrid"}, status=status.HTTP_400_BAD_REQUEST)

    #Email Exists
    if User.objects.filter(email=email).exists():
        return Response({"success": False, "message":"Email is already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    #User Crate
    User.objects.create_user(username=username, email=email, password=password)
    return Response({"success": True, "message" :"User Created"}, status=status.HTTP_201_CREATED)
        
@api_view(["GET"])
def quiz_detail(request, pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    serializer = QuizSerializer(quiz)
    return Response(serializer.data, status=status.HTTP_200_OK)
