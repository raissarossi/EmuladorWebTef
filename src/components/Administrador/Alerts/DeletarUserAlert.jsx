import Swal from "sweetalert2"
import api from "../../Gerais/Api"
import getToken from "../../Gerais/GetToken"

const DeletarUserAlert = (id, atualizar, nome) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: `Excluir  ${nome}?`,
        text: "Esta ação será permanente, tem certeza?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        confirmButtonColor: "#D50005",
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    })
        .then((result) => {
            if (result.isConfirmed) {
                api.delete("solicitacoes/user_activate/" + id + "/", {
                    headers: {
                        Authorization: "JWT " + getToken()
                    }
                }).then(() => {
                    swalWithBootstrapButtons.fire(
                        'Excluido!',
                        'Esta solicitação foi excluida.',
                        'success'
                    ).then((res) => {

                    })
                    atualizar()
                }).catch(() => {
                    Swal.fire(
                        {
                            title: 'Erro',
                            text: 'Não é possível excluir, a conta está em uso no momento',
                            icon: 'error',
                            confirmButtonColor: '#006EAD',
                        }
                    )

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

export default DeletarUserAlert;