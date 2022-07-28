import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
// import Home from './pages/Home';
const httpLink = createHttpLink({
    uri: "/graphql",
})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token")
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    }
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                {/* <div> */}
                {/* <Nav />
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
                {/* </Switch> */}
                {/* </div> */}
            </Router>
        </ApolloProvider>
    )
}
export default App
