import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { PublicLayout } from "./components/Layouts/PublicLayout/PublicLayout";
import { AppLayout } from "./components/Layouts/AppLayout/AppLayout";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./styles/style.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Sobre = lazy(() => import("./pages/Sobre/Sobre"));
const Integrantes = lazy(() => import("./pages/Integrantes/Integrantes"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const Cadastro = lazy(() => import("./pages/Auth/Cadastro/Cadastro"));
const Dashboard = lazy(() => import("./pages/App/Dashboard/Dashboard"));
const NovaRegiao = lazy(() => import("./pages/App/Regioes/NovaRegiao/NovaRegiao"));
const RegiaoDetalhe = lazy(() => import("./pages/App/Regioes/RegiaoDetalhe/RegiaoDetalhe"));
const Alertas = lazy(() => import("./pages/App/Alertas/Alertas"));
const Explorar = lazy(() => import("./pages/App/Explorar/Explorar"));

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense
                    fallback={
                        <div
                            className="min-h-screen flex items-center justify-center"
                            style={{ background: "var(--interface-darkest)" }}
                        >
                            <div
                                className="w-10 h-10 rounded-full border-2 animate-spin"
                                style={{
                                    borderColor: "var(--brand-primary)",
                                    borderTopColor: "transparent",
                                }}
                            />
                        </div>
                    }
                >
                    <Routes>
                        {/* Rotas públicas */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/sobre" element={<Sobre />} />
                            <Route path="/integrantes" element={<Integrantes />} />
                            <Route path="/faq" element={<FAQ />} />
                        </Route>

                        {/* Auth — sem layout */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />

                        {/* Rotas privadas */}
                        <Route element={<PrivateRoutes />}>
                            <Route element={<AppLayout />}>
                                <Route path="/app" element={<Dashboard />} />
                                <Route path="/app/regioes/nova" element={<NovaRegiao />} />
                                <Route path="/app/regioes/:id" element={<RegiaoDetalhe />} />
                                <Route path="/app/alertas" element={<Alertas />} />
                                <Route path="/app/explorar" element={<Explorar />} />
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
