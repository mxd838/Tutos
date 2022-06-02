import Countries from "../components/Countries"
import Logo from "../components/Logo"
import Navigation from "../components/Navigation"

function Home(){
    return (
        <div>
            <Logo />
            <Navigation />  
            <Countries />
        </div>
        
    )
}

export default Home