function Card({name, img, cap, pop}){
    return(
        <li className="card">
            <img src={img} alt={"drapeau " + name} />
            <div className="infos">
                <h2>{name}</h2>
                <h4>{cap}</h4>
                <p>{pop.toLocaleString()}</p>
            </div>
        </li>
    )
}

export default Card