import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>
                    Welcome to <span className="nowrap">My shop Repairs!</span>
                </h1>
            </header>
            <main className="public__main">
                <p>
                    Located in Beautiful Downtown Lisbon City, My shop Repairs
                    provides a trained staff ready to meet your tech repair
                    needs.
                </p>
                <address className="public__addr">
                    My shop Repairs
                    <br />
                    555 Foo Drive
                    <br />
                    Lisbob City, PT 1000
                    <br />
                    <a href="tel:+15555555555">(351) 555-5555</a>
                </address>
                <br />
                <p>Owner: @scrodrig</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content
}
export default Public
