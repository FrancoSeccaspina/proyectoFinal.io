import '../css/redireccionamientoFlotante.css';

function RedireccionFlotante(){
    return (
            <div class="flotante">
                <div>
                    <span>Usá estos accesos rápidos para cambiar entre interfaces:</span>
                </div>
                <nav>
                    <ol class="texto_redireccion">
                        <li class="texto_redireccion-item">
                            <a href={`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}`} class="texto_redireccion-link">Cliente</a>
                        </li>

                        <li class="texto_redireccion-separator">
                            <svg class="texto_redireccion-icon" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9 20.247 6-16.5" />
                            </svg>
                        </li>

                        <li class="texto_redireccion-item">
                            <a href={`${process.env.REACT_APP_FRONTEND_DOMAIN_HOST}`} class="texto_redireccion-link">Admin</a>
                        </li>
                    </ol>
                </nav>
            </div>
    )
}

export default RedireccionFlotante