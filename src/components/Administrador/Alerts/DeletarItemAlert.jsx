import Swal from "sweetalert2"
import api from "../../Gerais/Api"
import getToken from "../../Gerais/GetToken"

async function DeletarItemAlert(id, value, atualizar) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

    await swalWithBootstrapButtons.fire({
        title: 'Excluir Item?',
        text: "Esta ação será permanente, tem certeza?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        confirmButtonColor: "#D50005",
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                {
                    title: 'Excluido!',
                    text: 'Esta solicitação foi excluida.',
                    icon: 'success',
                    confirmButtonColor: '#006EAD',
                }
            )
            api.delete("solicitacoes/" + value + "/" + id + "/", {
                headers: { Authorization: "JWT " + getToken() }
            }).then((res) => {
                atualizar()
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
            )

        }
    })
}

export default DeletarItemAlert;