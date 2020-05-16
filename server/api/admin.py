from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

# Add photo field to the admin user panel
fieldsets = list(UserAdmin.fieldsets)
fieldsets[1] = ('Personal Info', {
    'fields': ('first_name', 'last_name', 'email', 'photo', 'back_image')})
fieldsets = tuple(fieldsets)


class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = fieldsets


admin.site.register(User, CustomUserAdmin)
