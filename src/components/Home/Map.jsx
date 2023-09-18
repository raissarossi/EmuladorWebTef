import Title from "../Gerais/Title";
import mapa from "../Images/mapa.png"
const Map = () => {
    return (
        <div className="-mt-8">
            <Title title={"Mapa para Retirada das Peças"} style={1.2} />
            <text className="text-white text-3xl pl-14">D54 - CA/169</text>
            <div className="bg-[#536A6] h-screen w-full flex overflow-hidden absolute -z-50 justify-center top-1">
                <img src={mapa} alt="" className="scale-150 sm:pt-16 sm:pl-20 -z-40" />
            </div>
        </div>
    );
}

export default Map;