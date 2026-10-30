from django.urls import path
from trackerapp import views


urlpatterns = [
    path('activity_view',views.activity_view,name='activity_view'),
    path('activity_summary',views.activity_summary,name='activity_summary'),
    path('activity_delete/<int:id>/',views.activity_delete,name='activity_delete')

]