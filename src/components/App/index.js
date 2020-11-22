import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { Router, RouterProvider } from '../Router'
import { UiContextProvider } from '../UiContext'
import QueueingContextProvider from '../../contexts/QueueingContext'
import { TranslateContextProvider, useTranslateContext } from '../../components/Translate'
import Navbar from '../Navbar';
import { Toast } from '../Toast';
import { Modal } from '../Modal';
import Home from '../../pages/home';
import About from '../../pages/about';
import Dashboard from '../../pages/dashboard';
import Settings from '../../pages/settings';

const routes = {
    DEFAULT: {
        component: <Home />,
        path: '/',
    },
    HOME: {
        component: <Home />,
        path: '/',
    },
    DASHBOARD: {
        component: <Dashboard />,
        path: '/dashboard',
    },
    ABOUT: {
        component: <About />,
        path: '/about',
    },
    SETTINGS: {
        component: <Settings />,
        path: '/settings',
    },
}

const App = () => {
    return (
        <div id="app">
            <RouterProvider>
                <QueueingContextProvider>
                    <TranslateContextProvider>
                        <UiContextProvider>
                            <Toast />
                            <Modal />
                            <Navbar />
                            <div id="main-container">
                                <Router routes={routes} />
                            </div>
                        </UiContextProvider>
                    </TranslateContextProvider>
                </QueueingContextProvider>
            </RouterProvider>
        </div>
    )
}

export { App }
