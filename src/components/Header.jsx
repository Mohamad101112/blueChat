export function Hero(props) {

    const {setPage} = props;

    return(
        <div className="hero">
            <div className="description">
            <h1>Welcome to BlueChat</h1>
            <p>A simple messaging chat application</p>
            <button 
            className="loginCta"
            onClick={() => { setPage("login")}}
            >Get started</button>
            </div>
            <img src="public/hero.png" />
        </div>
    )
}