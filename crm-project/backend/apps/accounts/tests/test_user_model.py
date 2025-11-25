from django.test import TestCase
from django.contrib.auth import get_user_model


class UserModelTest(TestCase):
    def test_create_user_with_role(self):
        User = get_user_model()
        user = User.objects.create_user(username='tester', password='pass', role='agent')
        self.assertEqual(user.role, 'agent')
