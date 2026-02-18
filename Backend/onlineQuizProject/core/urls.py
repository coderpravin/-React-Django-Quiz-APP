from django.urls import path
from  .import views

urlpatterns = [
    path('quiz-list/', views.quiz_list, name='quiz-list'),
    path('question-list/<int:pk>/', views.question_list, name='question-list'),
    path('option-list/<int:pk>/', views.option_list, name='option-list'),
    path('quizattempt-list/<int:pk>/', views.quizattempt_list, name='quizattempt-list'),
    path('answer-list/<int:pk>/', views.answer_list, name='answer-list'),
    
    
]
