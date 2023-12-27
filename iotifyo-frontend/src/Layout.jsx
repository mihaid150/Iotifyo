import { Header } from './components/HeaderAndFooter/Header/Header'
export function Layout({children}) {
    return (
        <>
            <Header />
            {children}
            {/*<Footer />*/}
            {/*<ScrollToTop />*/}
        </>
    )
}