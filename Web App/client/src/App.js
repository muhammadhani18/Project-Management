import Header from "./components/header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import AddClientModel from "./components/AddClientModel";
import Clients from "./components/clients";

const  cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModel/>
          <Clients />
        </div>
      </ApolloProvider>
    </>    
  );
}

export default App;

