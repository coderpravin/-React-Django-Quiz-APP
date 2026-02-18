from django.shortcuts import render,get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Quiz, Question, Option, QuizAttempt, Answer
from .serializers import QuizSerializer, QuestionSerializer, OptionSerializer, QuizAttemptSerializer, AnswerSerializer
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

