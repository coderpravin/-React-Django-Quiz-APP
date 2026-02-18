from django.db import models
from django.contrib.auth.models import User

# Create Quiz models here.
class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration_minute = models.PositiveIntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"The Quiz Title is {self.title}"
    
# Create Question models here.
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()
    
    def __str__(self):
        return f"{self.quiz.title} --> {self.text[:50]}"
    

# Create Multiple Choice models here.
class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct= models.BooleanField(default=False)
    
    def __str__(self):
        return f"The text is {self.text}"
    
#Student Attempt Quiz models here.
class QuizAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.PositiveIntegerField(default=0)
    started_at = models.DateTimeField(auto_now_add=True)
    
    #✅ Track whether score email was sent
    email_sent = models.BooleanField(default=False)
    
    def __str__(self):
        return f"The student name is{self.user.username} and The Quiz is{self.quiz.title}"
    
#Choice Answer By Student models here
class Answer(models.Model):
    attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Option, on_delete=models.CASCADE)
    is_correct = models.BooleanField()
    
    def __str__(self):
        return f"The student name is {self.attempt.user.username}"