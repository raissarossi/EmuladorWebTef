import BotaoBack from "./BotaoBack";

const Title = ({ title, style }) => {
    //<Title title={""} style={1} />
    return (
        <>
            {style === 1 ?
                <div className="pb-10 pl-5">
                    <BotaoBack color={"text-bosch-grau4"} />
                    <text className="text-3xl font-semibold pl-2 text-bosch-grau4">{title}</text>
                </div>
                :
                style === 1.2 ?
                    <div className="pb-10 pl-5">
                        <BotaoBack color={"text-white"} />
                        <text className="text-3xl font-semibold pl-2 text-white">{title}</text>
                    </div>
                    :
                    style === 2 ?
                        <div className="absolute top-32 left-5">
                            <BotaoBack color={"text-bosch-grau4"} />
                            <text className="text-3xl font-semibold pl-2 text-bosch-grau4">{title}</text>
                        </div>
                        :
                        style === 3 ?
                            <text className="text-3xl font-semibold pl-2 text-bosch-grau4 absolute top-32 left-5">{title}</text>
                            :
                            <></>
            }
        </>
    );
}

export default Title;