-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2025 a las 06:33:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gimnasio_activa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autenticacion`
--

CREATE TABLE `autenticacion` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasenia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autenticacion`
--

INSERT INTO `autenticacion` (`id`, `email`, `contrasenia`) VALUES
(1, 'admin@activafitness.com', 'admin123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Creatina'),
(2, 'Proteina'),
(3, 'Barra Cereal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_recetas`
--

CREATE TABLE `categoria_recetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `grupo_muscular_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_musculares`
--

CREATE TABLE `grupos_musculares` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `membresia`
--

CREATE TABLE `membresia` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `categoriaId` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `categoriaId`, `imagen`, `stock`) VALUES
(8, 'Proteina Truemade Vainilla', 'Post entrenamiento: Ideal para recuperación muscular. Consumir dentro de los 30-60 minutos después de entrenar.Desayuno o entre comidas: Si necesitás aumentar tu ingesta de proteínas diarias.Antes de dormir: En el caso de caseína (de absorción lenta), ayuda a evitar el catabolismo nocturno. Mezclar 1 scoop (medida del envase, aprox. 25-30g de proteína) en: 250-300 ml de agua, leche o bebida vegetal.Podés usar una licuadora o shaker. Si querés sumar calorías, podés agregar banana, avena, mantequi', 40000, 2, 'proteinaTruemade.jpg', 100),
(9, 'Proteina Platinum Frutilla', 'Post entrenamiento: Ideal para recuperación muscular. Consumir dentro de los 30-60 minutos después de entrenar.Desayuno o entre comidas: Si necesitás aumentar tu ingesta de proteínas diarias.Antes de dormir: En el caso de caseína (de absorción lenta), ayuda a evitar el catabolismo nocturno. Mezclar 1 scoop (medida del envase, aprox. 25-30g de proteína) en: 250-300 ml de agua, leche o bebida vegetal.Podés usar una licuadora o shaker. Si querés sumar calorías, podés agregar banana, avena, mantequi', 45000, 2, 'Wheyproteina_Frutilla.jpg', 110),
(10, 'Creatina ENA', '5 gramos por día, todos los días, a la misma hora (preferiblemente con una comida o postentreno).No hace falta cargar(es decir, tomar grandes dosis al principio). Pero si querés acelerar la saturación muscular, podés ver más abajo la fase de carga. Cuándo tomarla Postentreno (después de entrenar) es ideal, ya que el cuerpo absorbe mejor nutrientes después del ejercicio. También podés tomarla en cualquier momento del día si no entrenás.Con qué tomarla con agua, jugo o un batido postentreno. Si la', 35000, 1, 'creatinaEna.jpg', 95),
(11, 'Poteina Bar Banana Split', 'Comerlas Post entrenamiento si no podés tomar batido. Colación entre comidas, especialmente si estás lejos de casa. Antes de entrenar, si no comiste nada.\r\nRecomendaciones:\r\nFijate en la cantidad de proteína por barra (ideal 15g o más). Revisá los ingredientes: algunas tienen mucho azúcar o grasa saturada.No las uses como reemplazo total de comidas, sino como complemento.', 40000, 3, 'EnaProteinBar_banansplit.jpg', 85),
(12, 'IronBar Frutilla', 'Comerlas Post entrenamiento si no podés tomar batido. Colación entre comidas, especialmente si estás lejos de casa. Antes de entrenar, si no comiste nada.\r\nRecomendaciones:\r\nFijate en la cantidad de proteína por barra (ideal 15g o más). Revisá los ingredientes: algunas tienen mucho azúcar o grasa saturada.No las uses como reemplazo total de comidas, sino como complemento.', 20000, 3, 'Ironbar_frutilla.jpg', 99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_membresia` int(11) DEFAULT NULL,
  `id_autenticacion` int(11) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `apellido`, `nombre`, `rol`, `imagen`, `id_membresia`, `id_autenticacion`, `fecha_nacimiento`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 1, 1, '2025-04-09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autenticacion`
--
ALTER TABLE `autenticacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria_recetas`
--
ALTER TABLE `categoria_recetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grupo_muscular_id` (`grupo_muscular_id`);

--
-- Indices de la tabla `grupos_musculares`
--
ALTER TABLE `grupos_musculares`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `membresia`
--
ALTER TABLE `membresia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoriaId` (`categoriaId`);

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_membresia` (`id_membresia`),
  ADD KEY `fk_autenticacion` (`id_autenticacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autenticacion`
--
ALTER TABLE `autenticacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoria_recetas`
--
ALTER TABLE `categoria_recetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `grupos_musculares`
--
ALTER TABLE `grupos_musculares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `membresia`
--
ALTER TABLE `membresia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autenticacion`
--
ALTER TABLE `autenticacion`
  ADD CONSTRAINT `autenticacion_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id_autenticacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD CONSTRAINT `ejercicios_ibfk_1` FOREIGN KEY (`grupo_muscular_id`) REFERENCES `grupos_musculares` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `membresia`
--
ALTER TABLE `membresia`
  ADD CONSTRAINT `membresia_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id_membresia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_recetas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
