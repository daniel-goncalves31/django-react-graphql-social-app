from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Post, User

# Add photo field to the admin user panel
fieldsets = list(UserAdmin.fieldsets)
fieldsets[1] = ('Personal Info', {
    'fields': ('name', 'email', 'photo', 'back_image')})
fieldsets = tuple(fieldsets)


class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = fieldsets
    list_display = ('username', 'email', 'name', 'is_staff')
    search_fields = ('username', 'email', 'name')
    ordering = ('username', 'email', 'name', 'is_staff')


admin.site.register(User, CustomUserAdmin)
admin.site.register(Post)
