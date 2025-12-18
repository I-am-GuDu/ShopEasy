from django.shortcuts import render

def home(request):
    return render(request, "home.html")

def electronics(request):
    return render(request, "electronics.html")

def clothing(request):
    return render(request, "clothing.html")

def kitchen(request):
    return render(request, "kitchen.html")

def beauty(request):
    return render(request, "beauty.html")

def sports(request):
    return render(request, "sports.html")

def deals(request):
    return render(request, "deals.html")

def about(request):
    return render(request, "about.html")

def contact(request):
    return render(request, "contact.html")
