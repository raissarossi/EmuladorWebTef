import Swal from "sweetalert2"
import api from "../../Gerais/Api"
import getToken from "../../Gerais/GetToken"

const AprovarUserAlert = (id, atualizar, nome) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            cancelButton: 'btn btn-danger',
            confirmButton: 'btn btn-success',
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: `Aprovar  ${nome}?`,
        text: "Deseja aprovar esse usuário?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, aprovar!',
        confirmButtonColor: "#219557",
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                {
                    title: 'Aprovado!',
                    text: 'O usuário receberá a senha para acesso via e-mail.',
                    icon: 'success',
                    confirmButtonColor: '#006EAD',
                }
            )
                .then(() => {
                    api.patch("solicitacoes/user_activate/" + id + "/", {
                        is_active: true
                    }, {
                        headers: {
                            Authorization: "JWT " + getToken()
                        }
                    }).then(() => {
                        atualizar()
                    })
                })

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                {
                    title: 'Cancelado',
                    text: 'Ação cancelada.',
                    icon: 'error',
                    confirmButtonColor: '#006EAD',
                }
            );
        }
    })
}

export default AprovarUserAlert;