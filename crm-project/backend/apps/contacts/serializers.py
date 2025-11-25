from rest_framework import serializers
from .models import Company, Contact


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), source='company', write_only=True)

    class Meta:
        model = Contact
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'company', 'company_id', 'owner', 'status', 'tags', 'created_at', 'updated_at']
        read_only_fields = ['owner', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class ContactBulkSerializer(serializers.Serializer):
    contacts = ContactSerializer(many=True)

    def create(self, validated_data):
        contacts_data = validated_data['contacts']
        user = self.context['request'].user
        instances = [Contact(owner=user, **item) for item in contacts_data]
        return Contact.objects.bulk_create(instances)
