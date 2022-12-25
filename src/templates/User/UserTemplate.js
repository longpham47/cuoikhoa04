import { Fragment } from "react"
import Footer from "../../components/User/FooterComponent/Footer"
import Header from "../../components/User/HeaderComponent/Header"
import { Route } from "react-router-dom"

export const UserTemplate = (props) => {

  return <Route exact path={props.path} render={(propsRouter) => {
    return <Fragment>
      {window.location.pathname !== '/' ? <>
        <Header />
      </> : null}
      <props.component {...propsRouter} />
      <Footer />
    </Fragment>
  }} />
}