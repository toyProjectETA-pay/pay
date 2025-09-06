from django.http import HttpResponse

def index(request):
    return HttpResponse("Pay App Index Page")
