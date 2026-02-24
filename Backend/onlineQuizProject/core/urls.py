from django.urls import path
from  .import views

urlpatterns = [
    path('quiz-list/', views.quiz_list, name='quiz-list'),
    path('question-list/<int:pk>/', views.question_list, name='question-list'),
    path('option-list/<int:pk>/', views.option_list, name='option-list'),
    path('quizattempt-list/<int:pk>/', views.quizattempt_list, name='quizattempt-list'),
    path('answer-list/<int:pk>/', views.answer_list, name='answer-list'),
    path('user-login/', views.login_user, name='user-login'),
    path('user-logout/', views.logout_user, name='user-logout'),
    path('user-signup/', views.signup_user, name='user-signup'),
    path('quiz/<int:pk>/', views.quiz_detail, name='quiz-detail'),
    path('quiz-submit/', views.submit_quiz, name='quiz-submit'),
    

]
