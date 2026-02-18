from django.contrib import admin
from .models import Question, Quiz, QuizAttempt, Answer, Option
# Register your models here.
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['quiz', 'text']
admin.site.register(Question, QuestionAdmin)

class QuizAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'duration_minute', 'created_by']
    search_fields = ['title', 'duration_minute', 'created_by']
admin.site.register(Quiz, QuizAdmin)

class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ['get_username', 'get_quiz_title', 'score']
    
    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = "User"
    
    def get_quiz_title(self, obj):
        return obj.quiz.title
    get_quiz_title.short_description = "Quiz"
    
admin.site.register(QuizAttempt, QuizAttemptAdmin)

class AnswerAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'question', 'selected_option', 'is_correct']

admin.site.register(Answer, AnswerAdmin)

admin.site.register(Option)