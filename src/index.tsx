import { ApolloProvider } from '@apollo/client';
import 'nprogress/nprogress.css';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import AlertProvider from 'src/contexts/AlertProvider';
import LoaderProvider from 'src/contexts/LoaderProvider';
import { client } from 'src/graphql/getClient';
import 'src/utils/chart';
import App from './App';
import { SidebarProvider } from './contexts/SidebarContext';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { ChatSidebarProvider } from './contexts/ChatSidebarContext';

ReactDOM.render(
  <ApolloProvider client={client}>
    <LoaderProvider>
      <AlertProvider>
        <HelmetProvider>
          <SidebarProvider>
            <ChatSidebarProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ChatSidebarProvider>
          </SidebarProvider>
        </HelmetProvider>
      </AlertProvider>
    </LoaderProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
