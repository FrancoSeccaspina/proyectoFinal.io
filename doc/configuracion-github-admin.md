# Configuracion de GitHub — Guia para el Administrador del Repositorio

**Repositorio:** `FrancoSeccaspina/proyectoFinal.io`
**Referencia:** `doc/plan-de-deploy.md`
**Fecha:** 2026-02-08

> Este documento detalla todo lo que el administrador del repositorio debe configurar
> en la plataforma GitHub antes de poder ejecutar el plan de deploy automatizado.

---

## Indice

1. [Resumen de lo que se necesita](#1-resumen)
2. [GitHub Actions — Habilitar y verificar](#2-github-actions)
3. [GitHub Packages / Container Registry (GHCR)](#3-ghcr)
4. [Secretos del repositorio (Actions Secrets)](#4-secretos)
5. [Permisos del workflow (GITHUB_TOKEN)](#5-permisos-workflow)
6. [Clave SSH para el servidor de produccion](#6-clave-ssh)
7. [Checklist final del administrador](#7-checklist)

---

## 1. Resumen

| Herramienta GitHub | Para que se usa | Costo |
|---------------------|-----------------|-------|
| **GitHub Actions** | Ejecutar el build y deploy automatico en cada push a `main` | Gratis (2,000 min/mes en repos privados, ilimitado en publicos) |
| **GitHub Packages (GHCR)** | Almacenar las imagenes Docker compiladas (activa-backend, activa-nginx) | Gratis (500 MB storage, 1 GB transfer en plan free) |
| **Actions Secrets** | Guardar credenciales sensibles (SSH, host del servidor) de forma segura | Gratis (incluido) |
| **GITHUB_TOKEN** | Token automatico que el workflow usa para pushear imagenes al registry | Gratis (automatico, no requiere configuracion manual) |

**Costo total: $0** — Todo esta dentro del tier gratuito de GitHub.

---

## 2. GitHub Actions — Habilitar y verificar

GitHub Actions ya esta activo en el repositorio (existe `.github/workflows/deploy.yml`). Pero hay que verificar que no este deshabilitado.

### Pasos:

1. Ir a **github.com/FrancoSeccaspina/proyectoFinal.io**
2. Click en **Settings** (pestaña superior, necesitas ser admin)
3. En el menu lateral: **Actions > General**
4. Verificar que este seleccionado:
   - **"Allow all actions and reusable workflows"**
   - (O al menos "Allow actions created by GitHub" + "Allow specified actions")
5. En la seccion **"Workflow permissions"** (mas abajo en la misma pagina):
   - Seleccionar **"Read and write permissions"**
   - Marcar **"Allow GitHub Actions to create and approve pull requests"** (opcional)

```
Settings > Actions > General > Workflow permissions
  [x] Read and write permissions
```

> **Por que?** El workflow necesita permisos de escritura para pushear imagenes Docker
> al Container Registry usando el `GITHUB_TOKEN`.

---

## 3. GitHub Packages / Container Registry (GHCR)

GHCR (GitHub Container Registry) es donde se guardan las imagenes Docker compiladas. Viene habilitado por defecto, pero hay que verificarlo.

### Pasos:

1. Ir a **Settings > Packages** (en el menu lateral)
2. Verificar que **"GitHub Packages"** este habilitado
3. En **"Package creation"**: asegurar que este marcado **"Public"** o **"Inherit from repository"**

### Que se va a guardar ahi:

| Imagen | URL en GHCR | Contenido |
|--------|-------------|-----------|
| `activa-backend` | `ghcr.io/francoseccaspina/activa-backend` | API Node.js + Express compilada |
| `activa-nginx` | `ghcr.io/francoseccaspina/activa-nginx` | Nginx + Frontend React compilado |

### Como verificar que funciona (despues de configurar todo):

```bash
# Desde cualquier maquina con Docker
docker pull ghcr.io/francoseccaspina/activa-backend:latest
docker pull ghcr.io/francoseccaspina/activa-nginx:latest
```

### Limites del plan gratuito:

| Recurso | Limite Free |
|---------|-------------|
| Storage | 500 MB |
| Data transfer (salida) | 1 GB / mes |
| Repos publicos | Ilimitado |

> **Nota:** Si el repo es publico, storage y transfer son ilimitados.
> Si es privado, 500 MB es suficiente para ~10 versiones de las dos imagenes.

---

## 4. Secretos del repositorio (Actions Secrets)

Los secretos son variables encriptadas que el workflow usa para conectarse al servidor de produccion. **Solo los administradores del repo pueden crearlos.**

### Ruta para crearlos:

```
Settings > Secrets and variables > Actions > "New repository secret"
```

### Secretos necesarios:

| Nombre del secreto | Valor | Ejemplo | Requerido por |
|---------------------|-------|---------|---------------|
| `SERVER_HOST` | IP publica o dominio del servidor de produccion | `45.123.45.67` o `activafitness.com.ar` | Ticket 4.3 — SSH deploy |
| `SERVER_USER` | Usuario SSH con permisos para ejecutar Docker en el servidor | `deploy` o `root` | Ticket 4.3 — SSH deploy |
| `SERVER_SSH_KEY` | Clave privada SSH completa (ver seccion 6 para generarla) | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Ticket 4.3 — SSH deploy |

### Como crear cada secreto paso a paso:

1. Ir a **github.com/FrancoSeccaspina/proyectoFinal.io/settings/secrets/actions**
2. Click en **"New repository secret"**
3. En **Name**: escribir el nombre exacto (ej: `SERVER_HOST`)
4. En **Secret**: pegar el valor
5. Click en **"Add secret"**
6. Repetir para cada secreto

### Captura conceptual de la pantalla:

```
+--------------------------------------------------+
| Repository secrets                                |
+--------------------------------------------------+
| Name              | Updated          | Actions    |
|-------------------|------------------|------------|
| SERVER_HOST       | 2 minutes ago    | [Update]   |
| SERVER_USER       | 2 minutes ago    | [Update]   |
| SERVER_SSH_KEY    | 2 minutes ago    | [Update]   |
+--------------------------------------------------+
| [New repository secret]                           |
+--------------------------------------------------+
```

> **Importante:** Los secretos NO se pueden ver despues de guardarlos.
> Solo se pueden actualizar o eliminar. Si necesitas verificar el valor,
> debes reemplazarlo.

---

## 5. Permisos del workflow (GITHUB_TOKEN)

El `GITHUB_TOKEN` es un token automatico que GitHub genera para cada ejecucion del workflow. **No hay que crearlo manualmente.** Pero si hay que asegurar que tenga los permisos correctos.

### Que hace en nuestro caso:

```yaml
# En el workflow (deploy.yml)
- name: Login a GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}  # <-- Este token es automatico
```

### Configuracion necesaria:

```
Settings > Actions > General > Workflow permissions
```

| Opcion | Valor necesario |
|--------|-----------------|
| Workflow permissions | **Read and write permissions** |

Si esta en "Read repository contents only", el workflow **no podra pushear imagenes** al Container Registry y fallara con error `403 Forbidden`.

### Permisos declarados en el workflow:

El archivo `deploy.yml` ya declara los permisos minimos necesarios:

```yaml
jobs:
  build-and-push:
    permissions:
      contents: read     # Leer el codigo fuente
      packages: write    # Pushear imagenes a GHCR
```

> **No se necesita un Personal Access Token (PAT)** para el workflow.
> El `GITHUB_TOKEN` es suficiente si los permisos estan configurados correctamente.

---

## 6. Clave SSH para el servidor de produccion

El workflow se conecta al servidor via SSH para ejecutar `docker compose pull && up`. Para esto necesitamos un par de claves SSH dedicado.

### Paso 1 — Generar el par de claves (en tu maquina local)

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key -N ""
```

Esto genera dos archivos:
- `~/.ssh/github_deploy_key` — **Clave privada** (va a GitHub Secrets)
- `~/.ssh/github_deploy_key.pub` — **Clave publica** (va al servidor)

### Paso 2 — Copiar la clave publica al servidor

```bash
# Opcion A: con ssh-copy-id
ssh-copy-id -i ~/.ssh/github_deploy_key.pub USUARIO@IP_DEL_SERVIDOR

# Opcion B: manual
ssh USUARIO@IP_DEL_SERVIDOR
echo "CONTENIDO_DE_github_deploy_key.pub" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Paso 3 — Copiar la clave privada a GitHub Secrets

```bash
# Ver la clave privada
cat ~/.ssh/github_deploy_key
```

Copiar **todo el contenido** (incluyendo las lineas `-----BEGIN...` y `-----END...`) y pegarlo como valor del secreto `SERVER_SSH_KEY` en GitHub.

### Paso 4 — Probar la conexion desde tu maquina

```bash
ssh -i ~/.ssh/github_deploy_key USUARIO@IP_DEL_SERVIDOR "echo 'Conexion OK'"
```

### Requisitos del usuario SSH en el servidor:

| Requisito | Detalle |
|-----------|---------|
| Ejecutar Docker | El usuario debe estar en el grupo `docker` (`sudo usermod -aG docker USUARIO`) |
| Acceder al directorio del proyecto | Debe tener permisos de lectura/escritura en la carpeta donde esta `docker-compose.prod.yml` |
| Sin password interactivo | La conexion debe funcionar solo con la clave SSH (sin que pida password) |

### (Recomendado) Crear un usuario dedicado para deploy:

```bash
# En el servidor de produccion
sudo adduser --disabled-password deploy
sudo usermod -aG docker deploy
sudo mkdir -p /home/deploy/.ssh
sudo cp ~/.ssh/authorized_keys /home/deploy/.ssh/
sudo chown -R deploy:deploy /home/deploy/.ssh
```

---

## 7. Checklist final del administrador

Antes de ejecutar el primer deploy automatico, verificar que todo este configurado:

### En GitHub (plataforma web):

- [ ] **Actions habilitado:** Settings > Actions > General > "Allow all actions"
- [ ] **Workflow permissions:** Settings > Actions > General > "Read and write permissions"
- [ ] **Packages habilitado:** Settings > Packages > habilitado
- [ ] **Secreto `SERVER_HOST`:** Settings > Secrets > Actions > creado con IP del servidor
- [ ] **Secreto `SERVER_USER`:** Settings > Secrets > Actions > creado con usuario SSH
- [ ] **Secreto `SERVER_SSH_KEY`:** Settings > Secrets > Actions > creado con clave privada

### En el servidor de produccion:

- [ ] **Docker instalado:** `docker --version` responde correctamente
- [ ] **Docker Compose instalado:** `docker compose version` responde correctamente
- [ ] **Clave publica SSH copiada:** El archivo `~/.ssh/authorized_keys` tiene la clave de deploy
- [ ] **Usuario en grupo docker:** `groups USUARIO` muestra `docker`
- [ ] **Directorio del proyecto existe:** La ruta donde esta `docker-compose.prod.yml` existe y tiene permisos
- [ ] **Conexion SSH funciona:** `ssh -i clave USUARIO@HOST "echo OK"` responde "OK"

### Prueba final:

1. Ir a **github.com/FrancoSeccaspina/proyectoFinal.io/actions**
2. Seleccionar el workflow **"Build & Deploy"**
3. Click en **"Run workflow"** (boton manual)
4. Verificar que:
   - El job `build-and-push` compila y sube las imagenes a GHCR
   - El job `deploy` se conecta al servidor y actualiza los contenedores
   - Ambos jobs aparecen en verde

```
+-------------------------------------------+
| Build & Deploy                            |
+-------------------------------------------+
| build-and-push  ✅ (3m 42s)              |
|   > Checkout codigo                       |
|   > Login a GHCR                          |
|   > Build y Push - Backend                |
|   > Build y Push - Nginx                  |
|                                           |
| deploy          ✅ (45s)                  |
|   > Deploy via SSH al servidor            |
+-------------------------------------------+
```

---

## Resumen visual del flujo

```
Desarrollador          GitHub                    Servidor Produccion
     |                    |                              |
     |-- git push main -->|                              |
     |                    |-- GitHub Actions arranca ---->|
     |                    |   1. Build Backend image      |
     |                    |   2. Build Nginx image        |
     |                    |   3. Push a GHCR              |
     |                    |                              |
     |                    |-- SSH al servidor ----------->|
     |                    |   4. docker compose pull      |
     |                    |   5. docker compose up -d     |
     |                    |                              |
     |                    |<-- Deploy completado ---------|
     |<-- Workflow OK ----|                              |
```

---

## Preguntas frecuentes

**P: Necesito tarjeta de credito para algo?**
R: No. Todo esta dentro del tier gratuito de GitHub.

**P: Que pasa si el repo es privado?**
R: GitHub Actions da 2,000 minutos/mes gratis y GHCR da 500 MB de storage. Para este proyecto es mas que suficiente.

**P: Puedo ver las imagenes Docker que se suben?**
R: Si. En la pagina principal del repo, en la barra lateral derecha aparece la seccion "Packages" con las imagenes disponibles.

**P: Que pasa si alguien elimina un secreto por accidente?**
R: El workflow fallara en el paso de deploy. Solo hay que volver a crear el secreto con el mismo nombre y valor.

**P: Puedo limitar quien puede ejecutar el workflow manualmente?**
R: Si. Solo los usuarios con permisos de escritura en el repo pueden usar `workflow_dispatch` (ejecucion manual).
