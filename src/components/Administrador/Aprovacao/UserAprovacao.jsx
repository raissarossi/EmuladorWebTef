import Swal from "sweetalert2";

const UserAprovacao = ({ user, index, trocaAdm, aprovar, excluir }) => {
    
    return (
        <tr key={user.id}>
            <td className="px-6 py-4 text-left text-sm text-gray-800 whitespace-nowrap font-medium">
                {user.name}
            </td>
            <td className="px-6 py-4 text-left text-sm text-gray-800 whitespace-nowrap">
                {user.email}
            </td>
            <td className="px-6 py-4 text-left text-sm text-gray-800 whitespace-nowrap">
                {user.bosch_user}
            </td>
            <td className="px-6 py-4 flex justify-center text-sm">
            <button onClick={() => Swal.fire({
                confirmButtonColor:'#006EAD',
                title: `Justificativa - ${user.bosch_user}`,
                text: user.justificativa,
                confirmButtonText: 'Fechar',
                })}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-bosch-grau4 hover:text-bosch-grau3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
            </button>
            </td>
            <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                <input
                    type="checkbox"
                    checked={user.is_superuser}
                    onChange={() => trocaAdm(index, user.id)}
                />
            </td>
            {user.is_active?
            <div></div>:
                <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                <button onClick={()=>aprovar(user.id, user.bosch_user)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-bosch-grun3 hover:text-bosch-grun1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </td>
            }
            <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                <button onClick={()=>excluir(user.id, user.bosch_user)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-bosch-rot3 hover:text-bosch-rot1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

            </td>
        </tr>
    );
}

export default UserAprovacao;