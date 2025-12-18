from django.urls import path
from file1 import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home/',views.home, name= 'home'),
    path('electronics/',views.electronics, name='electronics'),
    path('clothing/',views.clothing, name='clothing'),
    path('kitchen/',views.clothing, name='kitchen'),
    path('beauty/',views.clothing, name='beauty'),
    path('sports/',views.clothing, name='sports'),
    path('deals/',views.deals, name='deals'),
    path('about/',views.about, name='about'),
    path('contact/',views.contact, name='contact'),
]
