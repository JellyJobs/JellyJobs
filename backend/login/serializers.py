from rest_framework import serializers
from django.contrib.auth import authenticate


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(self.context.get('request'), email=email, password=password)
        if not user:
            raise serializers.ValidationError('Credenciales inválidas.')

        attrs['user'] = user
        return attrs