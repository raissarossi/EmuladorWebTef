import Swal from "sweetalert2"

const AddItemAlert = () => {
  Swal.fire(
    {
      title: 'Adicionado',
      text: 'Item adicionado com sucesso!',
      icon: 'success',
      confirmButtonColor: '#006EAD',
    }
  )
}

export default AddItemAlert;