from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework import routers

router = routers.SimpleRouter()

router = DefaultRouter()
router.register('pedidos', views.PedidosListarDetalhar)
router.register('setor', views.SetorListarDetalhar)
router.register('tipo_debito', views.TipoDebitoListarDetalhar)
router.register('local_debito', views.LocalDebitoListarDetalhar)
router.register('categoria', views.CategoriaListarDetalhar)
router.register('tipo_servico', views.TipoServicoListarDetalhar)
router.register('files', views.FilesListarDetalhar)
router.register('reset_password', views.UserForgetPassword)
router.register('user_activate', views.UsersActivate)

urlpatterns = [
    # path('isadmin/', view=views.UserIsAdmin.as_view()),
    ] + router.urls


