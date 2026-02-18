from rest_framework import serializers
from .models import Question,Quiz,QuizAttempt,Answer,Option


#Option Serializers      
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "text", "is_correct"]
        
        extra_kwargs = {
            "is_correct": {"write_only": True}  # hide correct answer from students
        }

#Question Serializers
class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "quiz", "text", "options"]
        
#Quiz Serializers        
class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Quiz
        fields = ["id", "title", "description", "duration_minute", "created_by", "created_at", "questions"]
   
#Answer Serializers        
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "question", "selected_option", "is_correct"]
        read_only_fields = ["is_correct"]
           
#Quiz Attempt Serializers        
class QuizAttemptSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField()
    quiz = serializers.StringRelatedField()
    class Meta:
        model = QuizAttempt
        fields = ["id", "user", "quiz", "score", "started_at", "email_sent"]
        
