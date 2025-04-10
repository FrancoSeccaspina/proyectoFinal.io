## Comando para iniciar como desarrollador

```
npm run start:dev
```


controlador

        <ul class="burger-user">
          <% if(userLogged && userLogged.perfil=='Admin') { %>
            <li class="dashboard-style"><a href="http://localhost:5173/" class="fa-solid fa-chart-line" target="_blank"><p>Dashboard</p></a></li>
            <% } %>
      <% if(userLogged){%>
        <li class="user-name"> <p id="name-user"><%=  userLogged.fullName %></p> 
          <a href="/profile">
            <img src="/images/avatars/<%= userLogged.image %> " class="userImage">
          </a>
        

              <% if(userLogged){%>
        <li class="user-name"> <p id="name-user"><%=  userLogged.fullName %></p> 
          <a href="/profile">
            <img src="/images/avatars/<%= userLogged.image %> " class="userImage">
          </a>
        
        <!-- menu hamburguesa empieza -->
        <li class="hamburger-button">
          <a id="btn-h"href="#"><i class="fa-solid fa-bars"></i></a>
        </li>
        <nav id="mobile-nav">
          <a href="/logOut" class="icons-userMenu-burger"><i class="fa-solid fa-right-from-bracket" title="LogOut"></i>SALIR</a>
          <a href="/contacto" class="icons-userMenu-burger"><i class="fa fa-envelope"></i>CONTACTO</a><!--REALIZA VISTA DE CONTACTO-->
          <a href="/preguntasFrecuentes" class="icons-userMenu-burger"><i class="fa fa-question-circle"></i>PREGUNTAS FRECUENTES</a><!--REALIZAR VISTA Y VER EN OTRAS PAGINAS QUE HAY EN PREGUNTAS FRECUENTES-->
          <div id="links-hb">
            <a href="https://api.whatsapp.com/send?phone=5491166601356"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://www.instagram.com/activa.fitness_/"><i class="fa-brands fa-instagram"></i></a>	          
        </div>
        </nav>
        <!-- menu hamburguesa termina -->

      </li>
        <li class="icons-userMenu"><a href="/logOut"><i class="fa-solid fa-right-from-bracket" title="LogOut"></i> </a></li>
        <% } else {%>

          <!-- menu hamburguesa empieza -->
          <li class="hamburger-button">
            <a id="btn-h"href="#"><i class="fa-solid fa-bars"></i></a>
          </li>
          <nav id="mobile-nav">
              <a href="/login" class="icons-userMenu-burger"><i class="fa-solid fa-user" title="Login"></i>INGRESAR</a>
              <a href="/register" class="icons-userMenu-burger"><i class="fa-regular fa-id-card" title="Register"></i>REGISTRATE</a>
              <a href="/contacto" class="icons-userMenu-burger"><i class="fa fa-envelope"></i>CONTACTO</a><!--REALIZA VISTA DE CONTACTO-->
              <a href="/preguntasFrecuentes" class="icons-userMenu-burger"><i class="fa fa-question-circle"></i>PREGUNTAS FRECUENTES</a><!--REALIZAR VISTA Y VER EN OTRAS PAGINAS QUE HAY EN PREGUNTAS FRECUENTES-->
            <div id="links-hb">
                <a href="https://api.whatsapp.com/send?phone=5491166601356"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="https://www.instagram.com/activa.fitness_/"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </nav>
          <!-- menu hamburguesa termina -->
          <li class="icons-userMenu"><a href="/register"><i class="fa-regular fa-id-card" title="Register"></i></a></li>
          <li class="icons-userMenu"><a href="/login"><i class="fa-solid fa-user" title="Login"></i></a></li>
          <%}%>