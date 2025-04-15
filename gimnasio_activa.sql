-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2025 at 05:41 AM
-- Server version: 8.0.38
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gimnasio_activa`
--

-- --------------------------------------------------------

--
-- Table structure for table `autenticacion`
--

CREATE TABLE `autenticacion` (
  `id` int NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contrasenia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_usuario` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autenticacion`
--

INSERT INTO `autenticacion` (`id`, `email`, `contrasenia`, `id_usuario`) VALUES
(1, 'admin@activafitness.com', 'admin123', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Creatina'),
(2, 'Proteina'),
(3, 'Barra Cereal');

-- --------------------------------------------------------

--
-- Table structure for table `categoria_recetas`
--

CREATE TABLE `categoria_recetas` (
  `id` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria_recetas`
--

INSERT INTO `categoria_recetas` (`id`, `nombre`) VALUES
(1, 'Ganancia Masa'),
(2, 'Veganos'),
(3, 'Pérdida Peso'),
(4, 'Definición'),
(5, 'Sin Gluten'),
(6, 'Rápidas y Fáciles');

-- --------------------------------------------------------

--
-- Table structure for table `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `grupo_muscular_id` int DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre`, `descripcion`, `grupo_muscular_id`, `video`, `titulo`) VALUES
(1, 'Comlumpio Ruso', 'Colocate de pie con los pies un poco más abiertos que el ancho de los hombros, con la pesa rusa en el suelo frente a vos.Flexioná ligeramente las rodillas, incliná el torso hacia adelante con la espalda recta y agarrá la kettlebell con ambas manos. Iniciá el movimiento llevando la pesa hacia atrás entre tus piernas, cargando la energía en tus caderas. Con un fuerte empuje de cadera (no con los brazos), impulsá la pesa hacia adelante y arriba hasta la altura del pecho. Dejá que la pesa vuelva hac', 1, 'https://www.youtube.com/watch?v=v7Yrc1brPI8', 'Mancuerna'),
(2, 'Rotación contura en landmine', 'Colocá un extremo de la barra en una base de landmine (o fijalo en una esquina firme).Parate con los pies separados al ancho de hombros, sujetando el otro extremo de la barra con ambas manos extendidas frente a vos. Con los brazos casi extendidos, girá la barra hacia un lado, rotando el torso y dejando que las caderas acompañen ligeramente el movimiento. Controlá el movimiento al volver al centro y luego girá hacia el otro lado. Repetí de forma alternada.', 1, 'https://www.youtube.com/watch?v=e5DP6961WEk', 'Polea y Maquina'),
(3, 'Rotación torso en maquina', 'Sentate en la máquina de rotación de torso con la espalda recta y los pies apoyados en el suelo o en los estribos. Ajustá el respaldo y los brazos de la máquina para que se adapten a tu cuerpo, Sujetá los manillares o apoyá los brazos según el diseño de la máquina y gira el torso lentamente hacia un lado, manteniendo el abdomen contraído; volvé al centro de manera controlada y repetí hacia el otro lado.', 1, 'https://www.youtube.com/watch?v=lazuT6aHEWA', 'Polea y Maquina'),
(4, 'Maquina Crunch Abdominales', 'Siéntate en la máquina y ajustá el asiento y el respaldo para que el eje de rotación de la máquina coincida con tu cintura y colocá los pies debajo de los rodillos y sujetá las agarraderas o apoyá los brazos (según el tipo de máquina). Contraé el abdomen y lleva el torso hacia adelante, flexionando la columna, como si hicieras un \"crunch\" y volvé lentamente a la posición inicial sin relajar completamente los músculos. Repetí el movimiento manteniendo siempre la tensión en los abdominales.', 1, 'https://www.youtube.com/watch?v=KSBSvo-5OD0', 'Polea y Maquina'),
(5, 'Maquina Lower Back', 'Siéntate en la máquina y coloca los pies firmemente sobre las plataformas (si la máquina las tiene) o bajo las correas de seguridad, manteniendo las rodillas ligeramente flexionadas.Comienza el movimiento flexionando lentamente el torso hacia adelante desde las caderas. Mantén siempre la espalda recta y el abdomen contraído. Evita que la flexión provenga de la espalda media o alta, ya que esto podría generar presión innecesaria sobre la columna vertebral.Baja el torso de forma controlada, sin fo', 1, 'https://www.youtube.com/watch?v=nGY2He0m1Y4', 'Polea y Maquina'),
(6, 'Maquiina Encogimiento Abdominal', 'Siéntate en la máquina de encogimientos abdominales con los pies firmemente apoyados en el suelo, ajusta la máquina para que las almohadillas estén a la altura de tus hombros o ligeramente por encima.Coloca las manos sobre las asas de la máquina o en el lugar destinado para la sujeción, asegurándote de mantener una postura recta; asegúrate de que la parte baja de la espalda se mantenga pegada al asiento durante todo el movimiento para evitar lesiones.Al llegar a la contracción máxima, mantén la ', 1, 'https://www.youtube.com/watch?v=z35Ka3jTw68', 'Polea y Maquina'),
(7, 'Extension Con Pierna En Banco', 'Siéntate en un banco abdominal, asegurándote de que tus caderas estén alineadas con el borde del banco.Coloca tus manos a los costados o detrás de la cabeza, dependiendo de la variante. Coloca las piernas sobre el banco, de modo que estén extendidas frente a ti, con los pies elevados y ligeramente flexionados.Desde la posición inicial, contrae los abdominales inferiores para elevar las piernas hacia el techo, manteniendo las rodillas extendidas. El movimiento debe ser controlado y lento para max', 1, 'https://www.youtube.com/watch?v=uq84CVslJaQ', 'Polea y Maquina'),
(8, 'Toque Talon', 'Acuéstate sobre tu espalda con las rodillas dobladas y los pies planos en el suelo, separados al ancho de los hombros. Coloca tus manos a los lados de la cabeza o extendidas hacia el frente , levanta ligeramente la cabeza y los hombros del suelo, activando los abdominales. Luego, gira el torso hacia un lado, intentando tocar con la mano el talón del pie del lado opuesto. Regresa a la posición inicial y repite hacia el otro lado. Alterna los movimientos, asegurándote de mantener la zona abdominal', 1, 'https://www.youtube.com/shorts/2xNfS78E1qE', 'Polea y Maquina'),
(9, 'Giro Ruso', 'Sentate en el suelo con las rodillas flexionadas. Incliná levemente el torso hacia atrás para activar el abdomen.Elevá ligeramente los pies (opcional para más intensidad). Sujetá un peso con ambas manos y girá el tronco hacia un lado, luego hacia el otro. El movimiento debe venir desde el core, no de los brazos..', 1, 'https://www.youtube.com/watch?v=GaS6v-9Rs2k', 'Polea y Maquina'),
(10, 'Abdominales Con Rueda', 'Arrodillate en el suelo con la rueda de abdominales frente a vos, sosteniéndola con ambas manos. Activá el abdomen y comenzá a rodar hacia adelante lentamente, extendiendo tu cuerpo mientras mantenés la espalda recta y los glúteos contraídos. Llegá lo más lejos posible sin perder la tensión en el core ni arquear la zona lumbar. Detenete un momento y luego regresá a la posición inicial contrayendo el abdomen.', 1, 'https://www.youtube.com/watch?v=76uV2p-733k', 'Polea y Maquina'),
(11, 'Abdominales En L', 'Agarrate de una barra fija con ambas manos, con un agarre ligeramente más ancho que los hombros, colgá el cuerpo completamente extendido, manteniendo los hombros activos (no colgando pasivamente). Piernas juntas y estiradas hacia abajo.Contraé el abdomen y levantá las piernas rectas hacia el frente, elevá las piernas hasta que queden paralelas al suelo, formando un ángulo de 90° con el torso (posición en “L”).Mantené la espalda recta y evitá balancearte.\r\nSostené la posición por 1-3 segundos si ', 1, 'https://www.youtube.com/watch?v=Ku0uk5qWdR8', 'Polea y Maquina'),
(12, 'Abdominales Oblicuos', 'Acostate boca arriba con las piernas flexionadas y los pies apoyados. Colocá las manos detrás de la cabeza sin tirar del cuello, elevá el torso y girá hacia un lado, intentando llevar el codo hacia la rodilla contraria, volvé a la posición inicial y repetí del otro lado. Mantené el abdomen contraído durante todo el movimiento..', 1, 'https://www.youtube.com/watch?v=OBjL7kS5VIw', 'Polea y Maquina'),
(13, 'Abdominales En V', 'Acostate boca arriba con las piernas estiradas y los brazos extendidos por detrás de la cabeza, contraé el abdomen y elevá simultáneamente las piernas y el torso, intentando tocar los pies con las manos; mantené una breve contracción en la parte superior y luego bajá de forma controlada y repetí el movimiento sin apoyar completamente las piernas ni el torso en el suelo entre repeticiones..', 1, 'https://www.youtube.com/watch?v=tHma30fr7yI', 'Polea y Maquina'),
(14, 'Plancha', 'Colocate boca abajo en el suelo o sobre una colchoneta. Apoyá los antebrazos en el suelo, con los codos alineados justo debajo de los hombros, estirá las piernas hacia atrás y apoyá solo las puntas de los pies en el suelo. El cuerpo debe formar una línea recta desde la cabeza hasta los talones y contraé los abdominales, glúteos y piernas para mantener el cuerpo firme. Evitá que las caderas se hundan o se eleven. Por ultimo, mirada al suelo para mantener el cuello neutro. Mantené la posición el t', 1, 'https://www.youtube.com/shorts/3AM7L2k7BEw', 'Polea y Maquina'),
(15, 'Empuje Press En Banco', 'Acuéstate en un banco plano, asegurándote de que tu espalda y cabeza estén completamente apoyadas en el banco, mantener los pies firmemente apoyados en el suelo, ligeramente separados para estabilizar tu cuerpo. Toma una mancuerna en cada mano. Con los brazos extendidos y las palmas hacia adelante, comienza con las mancuernas sobre tu pecho (en una posición de \"inicio\" de press de banca).Inicia el movimiento doblando los codos y bajando las mancuernas hacia los lados de tu pecho. Mantén un contr', 2, 'https://www.youtube.com/shorts/48L0oQApm_0', 'Mancuerna'),
(16, 'Press Declinado', 'Ajusta el banco a una inclinación declinada de unos 15-30 grados. Asegúrate de que esté bien fijo y estable. Acuéstate en el banco declinado con la espalda completamente pegada a él, sostén una mancuerna en cada mano y coloca las mancuernas sobre tus muslos y coloca los pies firmemente en el suelo, con las piernas dobladas en un ángulo de 90 grados para mantener la estabilidad; lleva las mancuernas a la altura de tus hombros, con los codos doblados y las palmas de las manos mirando hacia tus pie', 2, 'https://www.youtube.com/watch?v=2uWdrii0ZG8', 'Mancuerna'),
(17, 'Apertura Banco', 'Siéntate en un banco plano con un par de mancuernas en cada mano, recuéstate de espaldas sobre el banco, asegurándote de que tu espalda esté completamente apoyada en el banco y tus pies firmemente plantados en el suelo y sostén las mancuernas con las palmas enfrentadas entre sí y los codos ligeramente flexionados, formando un ángulo de 90 grados en los codos.Baja las mancuernas lentamente hacia los lados de tu cuerpo, manteniendo los codos ligeramente doblados en todo momento. Baja hasta que tus', 2, 'https://www.youtube.com/watch?v=OrlXQdNwNwM', 'Mancuerna'),
(18, 'Apertura Banco Inclinado', 'Siéntate en un banco inclinado, ajustado a un ángulo de aproximadamente 30-45 grados; sostén una mancuerna en cada mano. Los brazos deben estar flexionados y las mancuernas cerca del pecho, con las palmas de las manos mirando hacia adelante (al frente).Mantén los pies firmemente apoyados en el suelo y la espalda recta, exhala y empuja las mancuernas hacia arriba, extendiendo completamente los codos. Los codos no deben bloquearse al final del movimiento.Asegúrate de que las mancuernas se muevan e', 2, 'https://www.youtube.com/shorts/mdPEoDmMvNE', 'Mancuerna'),
(19, 'Press Acostado En El Piso con Barra', 'Acuéstate en el suelo con las rodillas dobladas y los pies firmemente apoyados en el suelo y colocar una barra con pesas sobre el suelo frente a ti, agarra la barra con las manos ligeramente más anchas que el ancho de los hombros, asegurándote de que las muñecas estén en una posición cómoda y recta. Asegúrate de que los codos estén alineados con los hombros cuando la barra esté en la posición inicial.Con control, baja la barra hacia tu pecho, manteniendo los codos ligeramente doblados, no comple', 2, 'https://www.youtube.com/shorts/fD5Kxrh9h2Y', 'Barra'),
(20, 'Press Peso Plano', 'Acostate boca arriba en un banco plano, los pies firmes en el suelo, la espalda ligeramente arqueada pero con los glúteos y hombros tocando el banco; tomá la barra con un agarre un poco más ancho que el ancho de tus hombros, con las palmas hacia adelante.Despegá la barra del soporte con cuidado y sostenela directamente sobre el pecho con los brazos extendidos (posición inicial).Bajá lentamente la barra hasta el centro del pecho (línea de los pezones), controlando el peso.Los codos deben moverse ', 2, 'https://www.youtube.com/shorts/g4Ah9uYn8pI', 'Barra'),
(21, 'Press Pecho Declinado', 'Acostate en un banco declinado (aproximadamente 15° a 30° hacia abajo), asegurate de fijar bien los pies en los soportes o correas para mantener estabilidad y tomá la barra con un agarre un poco más ancho que el ancho de hombros (agarre pronado, palmas hacia adelante).Con ayuda de un compañero (opcional), retirás la barra del soporte y la llevás directamente sobre el pecho con los brazos extendidos.Bajá la barra lentamente hacia la parte baja del pecho, justo por debajo de los pezones. Mantené l', 2, 'https://www.youtube.com/watch?v=L1U8yy4OqbQ', 'Barra'),
(22, 'Press Pecho Inclinado', 'Acostate boca arriba en un banco inclinado (entre 30° y 45°). Asegurate de que tus pies estén firmes sobre el suelo, tomá la barra con un agarre un poco más ancho que el ancho de tus hombros.Mantené la espalda ligeramente arqueada (sin despegar los glúteos del banco). Bajá la barra de forma lenta y controlada hacia la parte superior del pecho. Los codos deben ir hacia abajo y ligeramente hacia afuera, formando un ángulo de unos 45° respecto al torso.Empujá la barra hacia arriba hasta extender lo', 2, 'https://www.youtube.com/watch?v=L1U8yy4OqbQ', 'Barra'),
(23, 'Peck Deck Con Maquina', 'Regulá el asiento de manera que tus antebrazos o codos queden alineados con los agarres o apoyos, seleccioná un peso moderado que puedas controlar sin perder técnica.Sentate con la espalda completamente apoyada en el respaldo, colocá los antebrazos o codos en los soportes, según el diseño de la máquina.Mantené los pies apoyados en el suelo y el pecho ligeramente elevado.Contraé el pecho para cerrar los brazos hacia el centro, como si dieras un abrazo.Mantené una leve pausa al final del recorrido', 2, 'https://www.youtube.com/shorts/PXsMlvYxPfo', 'Polea y Maquina'),
(24, 'Hammer Inclinado Con Maquina', 'Si la máquina lo permite, ajustá el respaldo a un ángulo de aproximadamente 45 a 60 grados, sentate con la espalda bien apoyada en el respaldo.Tomá las manijas de la máquina con un agarre neutro (palmas enfrentadas).Brazos extendidos hacia abajo, hombros relajados y codos alineados al costado del torso (no los despegues durante el movimiento).Flexioná los codos y levantá las manijas de forma controlada, manteniendo las palmas enfrentadas todo el tiempo. Subí hasta que los antebrazos estén casi p', 2, 'https://www.youtube.com/shorts/Edj4blymFLo', 'Polea y Maquina'),
(25, 'Press Plano Hammer Con Maquina', 'Acostate boca arriba en un banco plano, sujetá una mancuerna en cada mano con un agarre neutro (las palmas enfrentadas entre sí, como si estuvieras haciendo un \"hammer curl\"). Apoyá los pies firmemente en el suelo y mantené la espalda en contacto con el banco (sin arquearla excesivamente).Desde la posición inicial con los codos flexionados a los lados del torso, empujá ambas mancuernas hacia arriba en línea recta, extendiendo los brazos casi por completo, sin bloquear los codos, controlá el movi', 2, 'https://www.youtube.com/watch?v=4J5Ww3gXSkI', 'Polea y Maquina'),
(26, 'Apertura Con Maquina', 'Sentate en la máquina con la espalda bien apoyada en el respaldo, ajustá la altura del asiento para que tus codos queden alineados con el centro de tu pecho; colocá los antebrazos o manos sobre los agarres, dependiendo del tipo de máquina.Mantené los codos ligeramente flexionados (sin bloquearlos). Abrí los brazos hacia los lados, sintiendo el estiramiento en el pecho.Empujá los agarres hacia adelante, cerrando los brazos como si abrazaras un barril, exhalá mientras hacés la contracción. Detenet', 2, 'https://www.youtube.com/shorts/QHrIO139sWc', 'Polea y Maquina'),
(27, 'Cruce Polea Alta', 'Colocate en el centro de una máquina de cruce de poleas, con ambas poleas ajustadas en una posición alta (por encima de la cabeza), agarrá una manija con cada mano, con las palmas mirando hacia abajo o ligeramente una hacia la otra, dTorso ligeramente inclinado hacia adelante. Brazos extendidos hacia los costados, codos levemente flexionados (no bloqueados), espalda recta y abdomen contraído.a un paso adelante para crear tensión en los cables. Colocá un pie adelante (posición de zancada) para ma', 2, 'https://www.youtube.com/shorts/iXWbc8SF9KA', 'Polea y Maquina'),
(28, 'Cruce Polea Medio', 'Colocate de pie entre dos poleas altas (una a cada lado), sujetando una manija en cada mano. Da un paso adelante con un pie, manteniendo una ligera flexión en las rodillas y el torso inclinado levemente hacia adelante.Extiende los brazos hacia los costados con una leve flexión en los codos. Esta es la posición inicial. Contraé el pecho y lleva ambas manos hacia el frente, cruzándolas ligeramente al nivel del pecho o justo frente al abdomen. Mantené la contracción por 1 segundo. Volvé lentamente ', 2, 'https://www.youtube.com/watch?v=l1GscXxZHWg', 'Polea y Maquina'),
(29, 'Cruce Polea Bajo', 'Colócate en el centro de la máquina de poleas. Ajusta las poleas para que estén en la parte más baja del equipo, toma las manijas con las manos (una en cada polea) y retrocede hasta que las poleas estén tensas, asegurándote de mantener los brazos extendidos a los lados. Da un paso atrás para tener una ligera inclinación hacia adelante, con los pies firmemente colocados en el suelo (aproximadamente al ancho de los hombros).Mantén una ligera flexión en los codos para evitar tensión innecesaria en ', 2, 'https://www.youtube.com/watch?v=j7VvOk7buL8', 'Polea y Maquina'),
(30, 'Press Pecho Inclinado En Smith', 'Coloca el banco en una posición inclinada entre 30° y 45°, dependiendo de tu nivel y confort, asegúrate de que el banco esté bien sujeto y estable. Ajusta la barra en la máquina Smith para que esté a la altura de tu pecho o ligeramente más abajo, de forma que al tumbarte sobre el banco, la barra quede alineada con tu pecho (a la altura de los pezones).Siéntate en el banco y recuéstate con los pies firmemente plantados en el suelo. Agarra la barra con las manos ligeramente más anchas que el ancho', 2, 'https://www.youtube.com/shorts/kuMPMzgEiJY', 'Polea y Maquina'),
(31, 'Flexiones Agarre Cerrado', 'Colócate en una posición de plancha, con las manos apoyadas en el suelo, las manos deben estar alineadas con tus hombros, pero más juntas de lo normal (aproximadamente al ancho de los codos o más estrechas).Los dedos pulgares e índices deben formar un triángulo en el suelo, con tus manos colocadas directamente debajo de tu pecho, asegúrate de que tu cuerpo forme una línea recta desde la cabeza hasta los talones. Aprieta los glúteos y el abdomen para mantener la estabilidad. Baja lentamente el cu', 2, 'https://www.youtube.com/shorts/cWrJFIdTje0', 'Peso Corporal'),
(32, 'Flexiones Con Libreación De Mano', 'Colócate en una posición de plancha, con las manos apoyadas en el suelo, alineadas a la altura de los hombros, y los pies ligeramente separados para mantener el equilibrio, mantén el cuerpo recto desde la cabeza hasta los talones, activando el core para evitar que la cadera se hunda o se levante.Baja lentamente el torso doblando los codos, manteniendo una línea recta desde la cabeza hasta los pies. Asegúrate de mantener el control y no dejar que los codos se abran hacia los lados, deben formar u', 2, 'https://www.youtube.com/watch?v=ZBWddc6mqJM', 'Peso Corporal'),
(33, 'Curl Martillo Con Mancuerna', 'Párate de manera erguida con los pies al ancho de los hombros, sostén una mancuerna en cada mano, manteniendo las palmas de las manos mirando hacia los costados del cuerpo (posición neutra), los codos deben estar pegados al torso, y los brazos deben colgar hacia abajo. Flexiona los codos y eleva las mancuernas hacia los hombros, manteniendo las palmas mirando hacia adentro (hacia tu cuerpo), evita mover los codos hacia adelante o hacia atrás, manteniéndolos fijos a los costados del torso, sube l', 3, 'https://www.youtube.com/shorts/Xfp9_TCvba0', 'Mancuerna'),
(34, 'Curl Alternado Con Mancuerna', 'Párate derecho con los pies a la altura de los hombros, sujeta una mancuerna en cada mano con un agarre supino (las palmas mirando hacia adelante), mantén los codos pegados a los costados de tu torso, sin dejarlos alejarse, relaja los hombros y mantén una ligera flexión en las rodillas para mayor estabilidad. Comienza el movimiento flexionando un codo mientras levantas una mancuerna hacia el hombro, girando la muñeca conforme subes, de modo que la palma de la mano se quede mirando hacia ti al fi', 3, 'https://www.youtube.com/shorts/9Q7Ncmr0bL', 'Mancuerna'),
(35, 'Curl Concentrado Unilateral Mancuerna', 'Siéntate en un banco plano con los pies firmemente apoyados en el suelo, sujeta una mancuerna con una mano (puedes comenzar con el brazo izquierdo o derecho), coloca el codo de la mano que sostiene la mancuerna en el interior del muslo de la misma pierna, cerca de la rodilla y mantener el torso erguido y la espalda recta. Asegúrate de que la muñeca esté recta y no doblada, ya que esto puede generar tensión innecesaria, inicia el movimiento levantando la mancuerna hacia el hombro, flexionando el ', 3, 'https://www.youtube.com/shorts/8HT2yNRllyI', 'Mancuerna'),
(36, 'Curl Scott Con Mancuerna', 'Sentate en el banco Scott con la parte superior del brazo apoyada completamente en el cojín inclinado, agarrá una mancuerna con una agarre supino (palma hacia arriba); el brazo debe estar completamente extendido, pero sin bloquear el codo.Inhalá y comenzá a flexionar el codo, levantando lentamente la mancuerna hacia el hombro. Mantené el brazo pegado al banco en todo momento y evitá usar impulso o balancear el peso.Al llegar al punto más alto del movimiento (cuando el antebrazo está casi vertica', 3, 'https://www.youtube.com/shorts/SpIX-V0ogQc', 'Mancuerna'),
(37, 'Curl Bicep Con Barra', 'De pie, con la espalda recta y los pies separados al ancho de los hombros, sujetá una barra con ambas manos, palmas hacia arriba (agarre supino) y las manos deben estar a una distancia similar al ancho de los hombros, los brazos completamente extendidos, con la barra descansando frente a los muslos.Contraé los bíceps y elevá la barra hacia los hombros flexionando los codos y mantené los codos pegados al torso, sin moverlos hacia adelante; evitá balancearte o usar impulso del cuerpo: todo el movi', 3, 'https://www.youtube.com/shorts/MqYBweUzDT4', 'Barra'),
(38, 'Curl Bicep Con Barra Z', 'De pie, con la espalda recta y los pies separados al ancho de los hombrosy sujetá la barra Z con ambas manos en un agarre supino (palmas hacia arriba), con las muñecas apoyadas en las partes anguladas de la barra, los brazos deben estar extendidos a los costados del cuerpo, codos cerca del torso.Inhalá y comenzá a flexionar los codos, elevando la barra hacia los hombros. Mantené los codos fijos, sin moverlos hacia adelante ni hacia los costados, contraé los bíceps al llegar arriba del movimiento', 3, 'https://www.youtube.com/shorts/lj0Ue9U0Rg8', 'Barra'),
(39, 'Curl Bicep Con Barra Scott En Banco', 'Siéntate en el banco Scott y apoya completamente los brazos sobre el soporte inclinado, agarrá la barra (recta o EZ) con un agarre supino (palmas hacia arriba), a una distancia similar al ancho de los hombros.Comenzá con los brazos estirados pero sin bloquear los codos. Flexioná los codos para subir la barra hacia tus hombros de forma controlada, mantené la contracción máxima del bíceps en la parte superior del movimiento por 1 segundo y bajá lentamente la barra hasta la posición inicial, contro', 3, 'https://www.youtube.com/shorts/YUhSi_sUGmM', 'Barra'),
(40, 'Curl Bicep Con Barra Romana', 'Colocate de pie con la espalda recta y los pies al ancho de los hombros.\r\nAgarrá la barra romana (barra Z) con un agarre supino (palmas hacia arriba), las manos deben colocarse en los ángulos inclinados de la barra (no en la parte recta del medio) y mantené los codos pegados al cuerpo.Inhalá y comenzá a levantar la barra flexionando los codos, subí la barra hasta que los antebrazos estén completamente contraídos (sin mover los codos hacia adelante), contraé los bíceps en la parte más alta del mo', 3, 'http://youtube.com/shorts/SUjWjEQLAB8', 'Barra'),
(41, 'Curl Bicep Con Polea Baja', 'Colocate de pie frente a la máquina con la espalda recta y los pies a la anchura de los hombros, sujetá la barra de la polea baja con un agarre en supinación (palmas hacia arriba), manteniendo los brazos extendidos y pegados al cuerpo.Flexioná los codos y levantá la barra hacia los hombros, concentrando la contracción en los bíceps. Mantené los codos fijos a los lados y evitá usar el impulso del cuerpo, exhalá al subir.Bajá la barra lentamente hasta volver a la posición inicial, controlando el p', 3, 'https://www.youtube.com/shorts/KiyMFeMg04o', 'Polea y Maquina'),
(42, 'Curl Bicep Convergente', 'Siéntate en la máquina y ajusta el asiento de forma que tus brazos queden alineados con el eje de rotación del aparato, apoya la parte posterior de los brazos sobre el cojín de soporte.Agarrá las manillas con las palmas hacia arriba (agarre supino).Los brazos deben estar completamente extendidos pero sin bloquear los codos.Flexioná los codos y llevá lentamente las manillas hacia tus hombros y contraé los bíceps en la parte alta del movimiento. Evitá impulsarte con la espalda o los hombros.Bajá l', 3, 'https://www.youtube.com/shorts/wFd07XX5TH4', 'Polea y Maquina'),
(43, 'Curl Bicep Concentrado Con Polea Baja', 'Sentate en un banco frente a una polea baja.\r\nAjustá el peso según tu nivel, sujetá la manija con una mano (agarre supino, es decir, palma hacia arriba).Apoyá el codo del brazo que trabaja sobre el muslo del mismo lado, manteniéndolo estable y fijo.Contraé el bíceps y elevá la manija hacia tu hombro, sin mover el codo de su posición, mantené la contracción máxima por un segundo en la parte superior del movimiento.Bajá lentamente la manija a la posición inicial, estirando completamente el brazo s', 3, 'https://www.youtube.com/shorts/90lb2VyvDwY', 'Polea y Maquina'),
(44, 'Jalon Para Bicep', 'Colocate de pie en el centro de una máquina de poleas con los cables en la posición más alta, agarrá una manija en cada mano con agarre supino (palmas hacia arriba), brazos extendidos hacia los lados en forma de \"T\", pero con una ligera flexión en los codos. Pies al ancho de los hombros, espalda recta y abdomen contraído.Sin mover los hombros ni el torso, flexioná los codos y llevá las manos hacia la cabeza (como si intentaras juntar las manos frente a tu cara).Asegurate de mantener los codos fi', 3, 'https://www.youtube.com/shorts/M7oJRjKHO6c', 'Polea y Maquina'),
(45, 'Curl Bicep Con Banda', 'Pisa el centro de la banda elástica con ambos pies separados al ancho de los hombros y asegurate de que la banda esté bien sujeta y en buen estado (sin grietas ni daños).Sostené un extremo de la banda con cada mano, los brazos deben estar completamente extendidos hacia abajo, a los costados del cuerpo, con las palmas mirando hacia adelante (supinadas) y mantén la espalda recta y el abdomen contraído. Flexioná los codos lentamente para llevar tus manos hacia los hombros, manteniendo los codos peg', 3, 'https://www.youtube.com/shorts/IPldpsvmzhQ', 'Peso Corporal'),
(46, 'Elevacón Posterior Con Mancuerna', 'Sostené una mancuerna en cada mano con un agarre neutral (palmas enfrentadas), inclinate hacia adelante desde la cadera hasta que el torso esté casi paralelo al suelo, manteniendo la espalda recta. Dejá los brazos colgando naturalmente frente a vos, con una ligera flexión en los codos. Elevá ambos brazos hacia los costados, como si estuvieras \"abriendo las alas\", concentrate en contraer los deltoides posteriores mientras subís las mancuernas. No balancees el cuerpo ni uses impulso. Detenete brev', 4, 'https://www.youtube.com/shorts/kPn1dUB8KDs', 'Mancuerna'),
(47, 'Vuelos Posterior Con Mancuerna', 'De pie con los pies separados al ancho de los hombros, sostené una mancuerna en cada mano con las palmas enfrentadas (agarre neutro) e incliná el torso hacia adelante desde la cintura, manteniendo la espalda recta y el core activado. Dejá los brazos colgando ligeramente flexionados, justo por debajo del pecho. Elevá ambos brazos hacia los lados, como si estuvieras abriendo las alas, mantené los codos ligeramente flexionados durante todo el recorrido. Subí hasta que tus brazos estén a la altura d', 4, 'https://www.youtube.com/shorts/AkNlVr1JqsI', 'Mancuerna'),
(48, 'Press Militar Con Mancuerna', 'Sentate en un banco con respaldo o quedate de pie con la espalda recta, sostené una mancuerna en cada mano a la altura de los hombros, con las palmas mirando hacia adelante, los codos deben estar flexionados y apuntando hacia abajo, formando un ángulo de 90°.Inhalá y empujá las mancuernas hacia arriba de manera controlada, extendiendo completamente los brazos por encima de la cabeza; mantené las muñecas rectas y no juntes las mancuernas en la parte superior y exhalá al llegar arriba.Bajá lentame', 4, 'https://www.youtube.com/shorts/yQBb5XN8wpo', 'Mancuerna'),
(49, 'Press Arnold Con Mancuerna', 'Sentate en un banco con respaldo (también se puede hacer de pie si tenés buena estabilidad), sujetá una mancuerna en cada mano, comenzá con las palmas mirando hacia vos (posición de curl de bíceps), codos flexionados y las mancuernas a la altura del pecho. Mientras empujás las mancuernas hacia arriba, rotá las muñecas hacia afuera de forma que, al final del movimiento, las palmas estén mirando hacia adelante (posición normal de press); estirá completamente los brazos sin bloquear los codos.Bajá ', 4, 'https://www.youtube.com/watch?v=6zUrUsCa3KQ', 'Mancuerna'),
(50, 'Vuelos Laterales Con Mancuerna', 'De pie, con una mancuerna en cada mano a los lados del cuerpo, palmas enfrentadas hacia el torso y pies a la altura de los hombros.Mantén el pecho erguido y una ligera flexión en las rodillas. Eleva ambos brazos hacia los lados con una ligera flexión en los codos, las mancuernas deben subir hasta la altura de los hombros (los brazos deben formar una \"T\"). Evitá subir más allá de esa altura para no comprometer la articulación del hombro, exhalá al subir. Bajá lentamente las mancuernas a la posici', 4, 'https://www.youtube.com/shorts/zBqZqAjCnR4', 'Mancuerna'),
(51, 'Vuelos Frontales Con Mancuerna', 'De pie, con una mancuerna en cada mano, pies separados al ancho de los hombros y brazos extendidos hacia abajo con un ligero ángulo en los codos, palmas mirando hacia los muslos. Eleva lentamente los brazos hacia el frente hasta que estén paralelos al suelo (a la altura de los hombros). Mantené una ligera flexión en los codos durante todo el movimiento, evitá balancear el cuerpo o usar impulso: el movimiento debe ser controlado. Inhalá al bajar las mancuernas. Exhalá al elevarlas,\r\nbajá los braz', 4, 'https://www.youtube.com/shorts/jk7YrK79ciA', 'Mancuerna'),
(52, 'Push Press Con Barra', 'De pie, con los pies al ancho de los hombros, sostené la barra sobre los hombros (posición de “rack”), con los codos ligeramente por delante de la barra y las palmas mirando hacia arriba. Activá el core y mantené la espalda recta. Flexioná ligeramente las rodillas (una pequeña sentadilla), desde esa posición, extendé rápidamente las piernas, transfiriendo la fuerza hacia los brazos; esta acción ayuda a impulsar la barra hacia arriba con más potencia. Con el impulso generado por las piernas, empu', 4, 'https://www.youtube.com/shorts/MRxd1LA4OYk', 'Barra'),
(53, 'Vuelo Frontal Con Barra', 'De pie, con los pies separados al ancho de los hombros, sujeta una barra con ambas manos al frente de tus muslos, con un agarre en pronación (palmas hacia ti) y brazos estirados. Mantén una ligera flexión de rodillas y activa el abdomen para mantener estabilidad y eleva la barra hacia el frente, manteniendo los brazos casi estirados (una ligera flexión en los codos está bien), levantá hasta que la barra quede más o menos a la altura de los hombros o un poco más abajo y evitá impulsarte con el to', 4, 'https://www.youtube.com/shorts/CaZaD7uMsvw', 'Barra'),
(54, 'Elevacón Posterior Con Polea Baja', 'Coloca la polea baja en la máquina de cable, asegúrate de que la polea esté a la altura de la parte inferior de tu torso o ligeramente más abajo. Sujeta el mango de la polea con una mano en cada cable (o un solo cable si haces el ejercicio con una mano), da un paso atrás para crear una ligera inclinación hacia adelante. Tira del cable para que las manos queden a la altura de tus muslos, con los codos ligeramente doblados, mantén los pies firmemente apoyados en el suelo, ligeramente separados par', 4, 'https://www.youtube.com/shorts/dsriiSXu1dQ', 'Polea y Maquina'),
(55, 'Elevacón Posterior Con Maquina Apertura', 'Si estás usando una máquina de elevación posterior, ajusta el asiento y los reposabrazos de manera que, cuando te sientes, tus hombros queden alineados con las palancas de la máquina, asegúrate de que tus codos estén alineados o ligeramente por debajo de los hombros cuando agarras las manijas de la máquina. Siéntate en la máquina y coloca tus pies firmemente en el suelo. Toma las manijas con las palmas hacia adentro (o las palancas, dependiendo del tipo de máquina) y asegúrate de que tus brazos ', 4, 'https://www.youtube.com/shorts/JyPNDIXjHsw', 'Polea y Maquina'),
(56, 'Vuelo Lateral Con Polea Baja', 'Colócate de pie junto a la máquina de polea baja y asegúrate de que la polea esté ajustada a la parte más baja de la máquina, agarra la manija con una mano, utilizando un agarre en pronación (con la palma mirando hacia abajo); da un paso lateral para alejarte de la máquina y mantener una ligera flexión en las rodillas. Mantén el torso erguido, con la espalda recta y los hombros relajados. Comienza con el brazo extendido hacia un lado, frente a ti, con el codo ligeramente doblado manteniendo el c', 4, 'https://www.youtube.com/shorts/7wiuBWONBKA', 'Polea y Maquina'),
(57, 'Press Hombro Maquina Smith', ' Colócate de pie en la máquina Smith, con los pies al ancho de los hombros y ligeramente hacia adelante, para mantener el equilibrio, ajusta la barra a la altura de tus hombros. La barra debe estar justo encima de la parte superior del pecho, para comenzar el movimiento; toma la barra con ambas manos, usando un agarre ligeramente más ancho que el de los hombros. Las palmas deben estar mirando hacia adelante. Tómate la barra con un agarre firme. Asegúrate de que tus muñecas estén rectas y tus cod', 4, 'http://youtube.com/watch?v=Ri5pkSWOcLY', 'Polea y Maquina'),
(58, 'Deltoide Cruzado Con Polea', 'Colócate de pie en el centro de la máquina, con los pies separados a la altura de los hombros ajusta las poleas a la altura más alta y toma las manijas con ambas manos, una en cada polea, y da un paso atrás para generar tensión en los cables. Inclina ligeramente el torso hacia adelante (pero sin encorvarte) y mantén los codos ligeramente doblados, la palma de las manos debe estar mirando hacia abajo, y los codos deben quedar ligeramente hacia afuera de tu cuerpo. Con un control total, comienza a', 4, 'https://www.youtube.com/shorts/4g54Ial_I08', 'Polea y Maquina'),
(67, 'Elevación Posterior Con Mancuerna', 'Colocate en posición de plancha alta con una mancuerna en cada mano, apoyadas en el suelo. Las manos deben estar alineadas con los hombros y el cuerpo bien recto, desde la cabeza hasta los talones, las piernas separadas al ancho de los hombros para mayor estabilidad. Realizá una flexión de brazos, manteniendo el cuerpo firme y alineado, sin arquear la espalda ni levantar la cadera y bajá controladamente y subí empujando con los brazos. Al volver a la posición de plancha, realizá un remo unilater', 5, 'https://www.youtube.com/shorts/b3VjHnoKXHs', 'Mancuerna'),
(68, 'Remo Al Menton Con Mancuerna', 'De pie, con los pies separados al ancho de los hombros, sostené una mancuerna en cada mano, con los brazos extendidos hacia abajo al frente del cuerpo y palmas mirando hacia tu cuerpo (agarre prono); espalda recta y abdomen activado. Inhalá y comenzá a elevar las mancuernas hacia el mentón, los codos deben subir más alto que las muñecas y mantenerse abiertos hacia los lados y mantené las mancuernas cerca del cuerpo durante todo el recorrido. Elevá hasta que las mancuernas lleguen a la altura del', 5, 'https://www.youtube.com/shorts/TOoiehyx-i8', 'Mancuerna'),
(69, 'Remo Con Mancuerna', 'Para realizarlo, apoyá una rodilla y la mano del mismo lado sobre un banco plano, manteniendo la espalda recta y el torso paralelo al suelo. Con la mano libre, sujetá una mancuerna y dejá el brazo extendido hacia abajo. Luego, llevá la mancuerna hacia la cintura manteniendo el codo cerca del cuerpo, apretando los omóplatos al final del movimiento. Bajá la mancuerna lentamente de nuevo a la posición inicial. Es importante controlar el peso, evitar giros en el torso y mantener una técnica correcta', 5, 'https://www.youtube.com/shorts/-RngKKzbEnI', 'Mancuerna'),
(70, 'Remo Vertical Con Barra', 'n ejercicio de fuerza que trabaja principalmente los músculos del trapecio, deltoides y la parte superior de la espalda, involucrando también los bíceps como estabilizadores. Para realizarlo, colócate de pie con los pies al ancho de los hombros. Sujeta una barra con ambas manos en pronación (palmas hacia el cuerpo), con un agarre un poco más cerrado que el ancho de hombros. La barra debe estar frente a los muslos con los brazos extendidos. Inhala y comienza a elevar la barra verticalmente hacia ', 5, 'https://www.youtube.com/shorts/W4UPiJyfn3w', 'Barra'),
(71, 'Elevacón Posterior Con Mancuerna', 'Para realizarlo, colocá una barra sobre la parte alta de la espalda (como en una sentadilla trasera), mantené el pecho erguido y los pies separados al ancho de los hombros. Desde esa posición, incliná el torso hacia adelante desde la cadera, manteniendo la espalda recta y una ligera flexión en las rodillas. Bajá el torso hasta que esté casi paralelo al suelo (sin perder la curvatura lumbar).', 5, 'https://www.youtube.com/shorts/gwUh4c-N7jA', 'Barra'),
(72, 'Remo Unilateral Con Barra', 'Para realizarlo, colocate al costado de una barra cargada en el suelo. Flexioná ligeramente las rodillas y llevá el torso hacia adelante, manteniendo la espalda recta. Con una mano, agarrá la barra y tirá de ella hacia tu cadera, manteniendo el codo cerca del cuerpo. Contraé los músculos de la espalda en la parte final del movimiento, luego bajá el peso de manera controlada. Realizá todas las repeticiones de un lado antes de cambiar al otro.Es importante evitar girar el torso durante el ejercici', 5, 'https://www.youtube.com/watch?v=_e7XSzrTIPM', 'Barra'),
(73, 'Encogimiento De Hombro Con Barra', 'Colócate de pie, con los pies alineados al ancho de los hombros y las rodillas ligeramente flexionadas, sostén la barra con un agarre prono (palmas hacia abajo) a la altura de los muslos, manteniendo los brazos completamente extendidos con la espalda recta, levanta los hombros hacia arriba, llevando los trapecios lo más cerca posible de las orejas y mantén la contracción en la parte superior durante un segundo y luego baja lentamente los hombros de nuevo a la posición inicial.', 5, 'https://www.youtube.com/shorts/TzPGjTzkxj4', 'Barra'),
(74, 'Remo Con Barra', 'Colócate de pie, con los pies a la altura de los hombros y agarra la barra con las manos en pronación (palmas hacia abajo), manteniendo las muñecas alineadas con los antebrazos, flexiona ligeramente las rodillas y lleva las caderas hacia atrás para inclinarte hacia adelante, manteniendo la espalda recta y sube la barra hacia tu abdomen, contrayendo los músculos de la espalda media. Mantén los codos cerca de tu cuerpo durante el movimiento; baja la barra lentamente a la posición inicial, controla', 5, 'https://www.youtube.com/shorts/VSdKfoQxj5o', 'Barra'),
(75, 'Remo Con Banda', 'Ponte de pie con las piernas ligeramente flexionada y coloca la banda de resistencia bajo los pies y sujeta un extremo con cada mano y mantén la espalda recta, los hombros relajados y los brazos extendidos hacia adelante. Tira de las bandas hacia atrás, doblando los codos y llevándolos hacia los lados de tu torso. Aprieta los omóplatos al final del movimiento y siente la contracción de los músculos de la espalda. Regresa lentamente a la posición inicial, manteniendo la tensión en la banda.', 5, 'https://www.youtube.com/shorts/SmQYikfOAUs', 'Peso Corporal'),
(76, 'Postura Superman Sostenida', 'Recuéstate boca abajo en una superficie plana (colchoneta o esterilla) y estira las piernas completamente, con los pies alineados a la altura de las caderas; extiende los brazos hacia adelante, alineados con los hombros, con las palmas de las manos hacia abajo. Levanta simultáneamente los brazos y las piernas del suelo y eleva los brazos lo más alto posible, como si estuvieras volando, mientras mantienes las piernas estiradas y elevadas sin doblar las rodillas contrae los glúteos y la parte baja', 5, 'https://www.youtube.com/shorts/0tYGURqAs48', 'Peso Corporal'),
(77, 'Remo Menton Con Polea', ' Para realizarlo, te colocas frente a la polea, agarras la barra con un agarre pronado (palmas hacia abajo) y, con los codos altos, tiras de la barra hacia tu mentón, manteniendo la espalda recta y controlando el movimiento. Es ideal para mejorar la postura y fortalecer la zona alta de la espalda.', 5, 'https://www.youtube.com/shorts/vbtGv-3JPPY', 'Polea y Maquina'),
(78, 'Jalon Dorsal Con Maquina', ' Se realiza en una máquina de poleas altas donde, sentado, tomas las asas o barra con las manos en agarre amplio. Con los pies apoyados en el suelo y el torso erguido, jalarás la barra hacia tu pecho mientras mantienes los codos cerca de tu cuerpo, asegurando una contracción eficiente en los músculos de la espalda. Este ejercicio es ideal para desarrollar fuerza y definición en la parte superior de la espalda, además de mejorar la postura.', 5, 'https://www.youtube.com/shorts/RD4t94XvKsU', 'Polea y Maquina'),
(79, 'Jalon Dorsal Con Agarre Supino En Maquina', 'Para realizarlo, se utiliza una barra en una máquina de polea alta, con las manos posicionadas en un agarre supino (palmas mirando hacia ti). El movimiento consiste en jalar la barra hacia el pecho mientras se mantiene la espalda recta y los codos cerca del cuerpo, activando los músculos de la espalda baja y media. Este ejercicio es excelente para mejorar la fuerza y el tamaño de los dorsales, así como para fortalecer los bíceps, ya que el agarre supino también los involucra de manera significat', 5, 'https://www.youtube.com/shorts/kCCXKVqYxvs', 'Polea y Maquina'),
(80, 'Jalon Dorsal Trasnuca En Maquina', 'Al realizar este movimiento, el usuario se sienta en la máquina, agarra las manijas a la altura de la cabeza y jala hacia atrás con los codos bien alineados. El ejercicio se realiza de forma controlada, asegurándose de que el movimiento sea suave y que se active correctamente la musculatura de la espalda. Este ejercicio es ideal para mejorar la fuerza y el tamaño de los dorsales, contribuyendo a un desarrollo más equilibrado de la parte superior del cuerpo.', 5, 'https://www.youtube.com/shorts/ox3LS6rSCqI', 'Polea y Maquina'),
(81, 'Remo Sentado Con Agarre Abierto', 'El remo sentado con agarre abierto es un ejercicio de tracción que se enfoca principalmente en trabajar los músculos de la espalda, especialmente el dorsal ancho, los romboides y el trapecio. Al utilizar un agarre más amplio, se incrementa la activación de la parte externa de la espalda y los hombros posteriores, promoviendo una postura más erguida y un desarrollo equilibrado del tren superior. Es ideal para mejorar la fuerza de la espalda y la estabilidad escapular, además de complementar otros', 5, 'https://www.youtube.com/shorts/iyOM6y5ADAQ', 'Polea y Maquina'),
(82, 'Remo Sentado Con Agarre Cerrado', 'El remo sentado con agarre cerrado es un ejercicio enfocado principalmente en el desarrollo de la musculatura de la espalda, especialmente el dorsal ancho, romboides y trapecios. Sentado en una máquina con cable, el movimiento consiste en jalar el agarre hacia el abdomen mientras se mantienen los codos cerca del cuerpo y la espalda recta, lo que permite una contracción efectiva de los músculos involucrados. Es ideal para mejorar la postura, la fuerza de tracción y el grosor de la espalda media.', 5, 'https://www.youtube.com/shorts/D_UXjlrZIBw', 'Polea y Maquina'),
(83, 'Dominadas Asistidas', 'Las dominadas asistidas son un ejercicio de tracción enfocado en fortalecer la espalda, los hombros y los brazos, especialmente el dorsal ancho y los bíceps. Se realizan con la ayuda de una máquina o bandas elásticas que reducen la carga del propio peso corporal, facilitando el movimiento y permitiendo una correcta técnica. Son ideales para principiantes o personas que están desarrollando la fuerza necesaria para realizar dominadas sin asistencia.', 5, 'https://www.youtube.com/shorts/cobFdsX0ck8', 'Polea y Maquina'),
(84, 'Dominadas Asistidas Agarre Abierto', 'Las dominadas asistidas con agarre abierto son un ejercicio ideal para desarrollar la fuerza en la parte superior del cuerpo, especialmente en la espalda y los bíceps, mientras se reduce la carga corporal gracias a la asistencia proporcionada por una máquina o banda elástica. Al utilizar un agarre más amplio que el ancho de los hombros, se pone un mayor énfasis en los dorsales, lo que mejora la amplitud y definición de la espalda. Este ejercicio es excelente para principiantes que aún no dominan', 5, '', 'Polea y Maquina'),
(85, 'Dominadas Asistidas Agarre Cerrado', 'Las dominadas asistidas con agarre cerrado son un ejercicio de tracción vertical que trabaja principalmente los dorsales, bíceps y músculos del core. Al utilizar un agarre más estrecho y asistencia mediante una máquina o banda elástica, se reduce la carga corporal permitiendo una ejecución controlada, ideal para quienes están desarrollando fuerza en la parte superior del cuerpo o perfeccionando la técnica antes de pasar a dominadas sin asistencia.', 5, '', 'Polea y Maquina'),
(86, 'Remo T', 'El remo T en máquina es un ejercicio de tracción que se enfoca principalmente en trabajar la parte media de la espalda, incluyendo el dorsal ancho, los romboides y los trapecios. Se realiza sentado o de pie, según el tipo de máquina, con una barra en forma de \"T\" o asas neutras que permiten un agarre cómodo. Durante el movimiento, se tira del peso hacia el torso manteniendo el pecho erguido y los codos cerca del cuerpo, lo que favorece una contracción muscular efectiva sin comprometer la zona lu', 5, 'https://www.youtube.com/shorts/udi--2PLXAQ', 'Polea y Maquina'),
(87, 'Extension Codo Alternado Con Mancuerna', 'La extensión de codo alternado con mancuerna para tríceps es un ejercicio enfocado en desarrollar fuerza y volumen en la parte posterior del brazo. Se realiza de pie o sentado, sosteniendo una mancuerna con una mano por detrás de la cabeza, con el codo flexionado. Desde esa posición, se extiende el brazo hacia arriba hasta que quede completamente recto, contrayendo el tríceps, y luego se baja de forma controlada. Al hacerlo de manera alternada, se trabaja cada brazo individualmente, permitiendo ', 6, 'https://www.youtube.com/shorts/oGTjAPFzNJk', 'Mancuerna'),
(88, 'Press Frances Sentado Unilateral', 'El Press Francés Sentado Unilateral con mancuerna es un ejercicio enfocado en trabajar los tríceps de forma aislada y controlada. Al realizarse de manera unilateral, permite corregir desequilibrios de fuerza entre ambos brazos. Sentado con la espalda recta, se extiende y flexiona el codo llevando la mancuerna desde detrás de la cabeza hacia arriba, concentrando el esfuerzo en el tríceps. Es ideal para mejorar la definición y fuerza del brazo, manteniendo una ejecución técnica para evitar lesione', 6, 'https://www.youtube.com/shorts/vlbDEKEKVBs', 'Mancuerna'),
(89, 'Press Frances', 'El Press Francés con mancuerna es un ejercicio enfocado en trabajar el tríceps, especialmente la porción larga del músculo. Se realiza generalmente acostado en un banco, sujetando una mancuerna con ambas manos por detrás de la cabeza y extendiendo los brazos hacia arriba. Es ideal para desarrollar fuerza y volumen en los brazos, siempre que se mantenga una técnica controlada, evitando mover los codos para aislar correctamente el tríceps durante el movimiento.', 6, 'https://www.youtube.com/shorts/u8w3Us_FWb4', 'Mancuerna'),
(90, 'Extension Tricep Con Mancuerna', 'La extensión de tríceps con mancuerna es un ejercicio de aislamiento que se enfoca en trabajar la parte posterior del brazo, específicamente el músculo tríceps braquial. Se realiza comúnmente sentado o de pie, sosteniendo una mancuerna con ambas manos por detrás de la cabeza y extendiendo los brazos hacia arriba. Este movimiento ayuda a mejorar la fuerza y la definición del tríceps, siendo ideal tanto para principiantes como para quienes buscan tonificar sus brazos de manera efectiva.', 6, 'https://www.youtube.com/shorts/8FNGBJUHfsA', 'Mancuerna'),
(91, 'Crush Tricep Con Barra', 'Crush Tricep con Barra: Este ejercicio se centra en el trabajo de los tríceps, específicamente en la porción larga de este músculo. Se realiza con una barra, donde se extiende los brazos frente al cuerpo mientras se mantiene un agarre cerrado. Al empujar la barra hacia arriba, los codos permanecen fijos y el movimiento se concentra en los tríceps. Es importante ejecutar el movimiento de manera controlada, evitando el uso de impulso y maximizando la contracción del músculo al final del recorrido.', 6, 'https://www.youtube.com/shorts/5Lafu9_9O_U', 'Barra'),
(92, 'Fondo Tricep Con Cajon', 'El fondo de triceps con cajón es un ejercicio excelente para trabajar los músculos del tricep. Para realizarlo, te apoyas con las manos sobre un banco o cajón detrás de ti, flexionas los codos y bajas el cuerpo controladamente hasta que los codos formen un ángulo de aproximadamente 90 grados. Luego, empujas el cuerpo hacia arriba utilizando la fuerza de los triceps, volviendo a la posición inicial. Este ejercicio es perfecto para mejorar la fuerza y la definición de los triceps, y se puede hacer', 6, 'https://www.youtube.com/shorts/cI6HMipOva4', 'Polea y Maquina'),
(93, 'Extension Tricep Con Maquina', 'La extensión de tríceps con máquina es un ejercicio de aislamiento diseñado para trabajar los músculos del tríceps. Al realizarlo, te posicionas frente a una máquina con un agarre que te permite empujar un peso hacia atrás, extendiendo los codos mientras mantienes los antebrazos estirados. Este movimiento activa principalmente la parte posterior del brazo, fortaleciendo y tonificando los tríceps. Es ideal para incluir en rutinas de entrenamiento de fuerza o para aquellos que buscan aumentar la m', 6, 'https://www.youtube.com/shorts/9rEA2Km8m_Y', 'Polea y Maquina');
INSERT INTO `ejercicios` (`id`, `nombre`, `descripcion`, `grupo_muscular_id`, `video`, `titulo`) VALUES
(94, 'Patada Tricep Polea', 'Se realiza utilizando una polea con cuerda o barra en una máquina de cables. El movimiento consiste en extender el brazo hacia atrás mientras se mantiene el codo fijo, utilizando únicamente el antebrazo para realizar la extensión. Este ejercicio es muy eficaz para incrementar la fuerza y la definición del tríceps, trabajando la parte posterior del brazo con un enfoque controlado, lo que permite una activación muscular eficiente y una óptima ejecución técnica.', 6, 'https://www.youtube.com/shorts/35_gCUE3SmM', 'Polea y Maquina'),
(95, 'Extension Codo Con Polea', ' Este ejercicio se realiza utilizando una polea alta y un cable, donde el objetivo es extender el codo mientras se mantiene una postura estable. Asegúrate de mantener los codos cerca de tu torso durante todo el movimiento y evita el uso de impulso para maximizar la activación muscular. Es ideal para fortalecer y desarrollar la parte posterior del brazo, logrando un trabajo específico en los músculos del tríceps.', 6, 'https://www.youtube.com/shorts/zXABgRNtuBQ', 'Polea y Maquina'),
(96, 'Tricep Trasnuca Polea', 'Se realiza utilizando una máquina de polea alta, donde el objetivo es empujar una barra hacia abajo, asegurando una completa extensión del brazo y contracción muscular. Este ejercicio ayuda a fortalecer los triceps, mejorar la estabilidad en los hombros y desarrollar fuerza en los brazos, siendo ideal tanto para principiantes como para deportistas avanzados. Además, al ser un movimiento controlado, permite una ejecución precisa y segura, reduciendo el riesgo de lesiones.', 6, 'https://www.youtube.com/shorts/p9zr-1Z67fU', 'Polea y Maquina'),
(97, 'Fondo En Paralelas', 'Se enfoca en trabajar los músculos del tren superior, especialmente los tríceps, hombros y pectorales. Durante la ejecución, el cuerpo desciende controladamente entre las barras y luego se empuja hacia arriba, lo que implica una gran activación de los músculos del torso superior. Este ejercicio puede adaptarse a diferentes niveles de habilidad, variando la profundidad del movimiento según la fuerza del practicante. Es excelente para mejorar la estabilidad del hombro y la fuerza de los brazos.', 6, '', 'Polea y Maquina'),
(98, 'Camilla Femoral', ' Este ejercicio se realiza en una camilla especializada que permite un rango de movimiento controlado mientras el individuo se acuesta boca abajo y realiza flexiones de pierna. La camilla femoral es excelente para mejorar la fuerza y la resistencia de los músculos isquiotibiales, lo que también ayuda en la prevención de lesiones y en el aumento del rendimiento deportivo, especialmente en actividades que implican movimientos explosivos o de sprint.', 7, 'https://www.youtube.com/shorts/lxrqWX_7KSw', 'Polea y Maquina'),
(99, 'Camilla Femoral Unilateral', 'Este ejercicio se realiza utilizando una máquina de camilla, donde el usuario se coloca de forma horizontal sobre la camilla y, mediante un movimiento controlado de flexión y extensión de la pierna, se activa de manera unilateral (es decir, trabajando una pierna a la vez). Es ideal para mejorar la fuerza y la estabilidad en la parte posterior de la pierna, ayudando en el desarrollo de la musculatura femoral, y es especialmente beneficioso para quienes buscan trabajar en la simetría de la fuerza ', 7, 'https://www.youtube.com/shorts/ReI5KlbS0nA', 'Polea y Maquina'),
(100, 'Femoral De Pie', 'Este ejercicio se ejecuta de pie, y la persona coloca uno de sus pies sobre una plataforma mientras una correa ajustada a los tobillos le proporciona resistencia. El movimiento implica flexionar la rodilla hacia atrás, elevando el pie hacia los glúteos, lo que activa intensamente la musculatura posterior del muslo. Es especialmente efectivo para mejorar la fuerza y la resistencia de los isquiotibiales, contribuyendo a una mayor estabilidad en las piernas y a la prevención de lesiones en la parte', 7, 'http://youtube.com/shorts/4F6DwcQsl00', 'Polea y Maquina'),
(101, 'Curl Femoral Polea', 'Este ejercicio se ejecuta estando en posición acostada o de pie, sujetando la polea con los pies y flexionando las rodillas para llevar los talones hacia los glúteos, realizando una contracción controlada. Es ideal para mejorar la fuerza y la flexibilidad de los músculos femorales, contribuyendo también a la estabilidad y el equilibrio de las piernas. Asegúrate de realizar el movimiento con una técnica adecuada para evitar lesiones y maximizar los beneficios.', 7, 'https://www.youtube.com/shorts/b0T-P_mQ8-c', 'Polea y Maquina'),
(102, 'Peso Muerto Rumano', 'Para realizarlo, comienza de pie con los pies al ancho de los hombros y una barra frente a ti. Manteniendo las piernas ligeramente dobladas, baja la barra hacia el suelo flexionando solo las caderas, mientras mantienes la espalda recta y el torso casi paralelo al suelo. Luego, regresa a la posición inicial empujando con los talones y apretando los glúteos al subir. Este ejercicio es excelente para mejorar la fuerza en la cadena posterior y aumentar la estabilidad del core.', 8, 'https://www.youtube.com/shorts/8qNrTuZ0rXM', 'Mancuerna'),
(103, 'Peso Muerto Con Mancuerna', 'Para realizarlo, se debe sostener una mancuerna con ambas manos, con los pies a la altura de los hombros. Desde una postura erguida, se debe bajar la mancuerna hacia el suelo manteniendo la espalda recta y flexionando las caderas, hasta que la mancuerna esté cerca del suelo o ligeramente por debajo de las rodillas. Luego, se debe regresar a la posición inicial, apretando los glúteos y la parte posterior de las piernas al subir. Es importante mantener una técnica adecuada para evitar lesiones y t', 8, 'https://www.youtube.com/shorts/SAdzug-v7D0', 'Mancuerna'),
(104, 'Empuje Cadera', 'Se realiza generalmente con una barra, colocando un peso sobre la cadera mientras el cuerpo está en una posición de puente. El movimiento consiste en empujar la cadera hacia arriba, manteniendo los pies firmemente apoyados en el suelo y la espalda recta. Este ejercicio no solo mejora la fuerza y la estabilidad en la parte inferior del cuerpo, sino que también contribuye a mejorar la postura y la funcionalidad en movimientos cotidianos.', 8, 'https://www.youtube.com/shorts/ee-YBNeKknU', 'Mancuerna'),
(105, 'Puente Gluteos', 'Para realizarlo, te acuestas sobre la espalda con las rodillas flexionadas y los pies apoyados en el suelo, a la altura de las caderas. Luego, debes levantar las caderas hacia arriba apretando los glúteos y manteniendo el abdomen contraído, formando una línea recta desde los hombros hasta las rodillas. Mantén la posición durante unos segundos antes de bajar lentamente las caderas al suelo, repitiendo el movimiento para fortalecer y tonificar la zona de los glúteos y la parte baja de la espalda.', 8, 'https://www.youtube.com/shorts/UACIKae85Sk', 'Mancuerna'),
(106, 'Hip Thrust', 'Al realizarlo, debes sentarte en el suelo con la parte superior de la espalda apoyada en un banco y una barra colocada sobre la cadera. Desde allí, debes empujar las caderas hacia arriba, extendiendo completamente las piernas y apretando los glúteos en la parte superior del movimiento. Este ejercicio permite un rango de movimiento amplio, lo que lo convierte en uno de los más efectivos para aumentar la fuerza y tamaño de los glúteos, además de involucrar también los isquiotibiales y los cuádrice', 8, 'https://www.youtube.com/shorts/bfT0eClO7bA', 'Barra'),
(107, 'Peso Muerto Con Barra', 'Consiste en levantar una barra cargada desde el suelo hasta la altura de las caderas, manteniendo una postura recta y una técnica adecuada para evitar lesiones. Durante el ejercicio, los pies deben estar a la altura de los hombros, con las rodillas ligeramente flexionadas, y el agarre de las manos debe ser firme sobre la barra. Este movimiento se realiza tanto de forma concentrada como explosiva, asegurándose de contraer los músculos de la espalda y los glúteos al momento de levantar el peso. El', 8, 'https://www.youtube.com/shorts/3EhkrUEEPOg', 'Barra'),
(108, 'Peso Sumo Con Barra', 'Se realiza con una barra cargada, en la que el practicante adopta una postura amplia con los pies hacia afuera, en un ángulo similar al de una sentadilla profunda. Desde esta posición, se baja la cadera, manteniendo la espalda recta y el pecho erguido, para luego levantar la barra utilizando principalmente la fuerza de las piernas y los glúteos. Este ejercicio mejora la fuerza en el tren inferior, la movilidad de la cadera y ayuda a corregir desequilibrios musculares. Además, se recomienda para ', 8, 'https://www.youtube.com/shorts/n66w4uMi9zk', 'Barra'),
(109, 'Puente Gluteo Con Barra', 'Para realizarlo, debes acostarte sobre el suelo con los pies apoyados y la barra colocada sobre la pelvis. Al levantar las caderas hacia arriba, manteniendo los hombros en el suelo y la barra sobre el abdomen, se activa principalmente el glúteo mayor, proporcionando una excelente tonificación y activación muscular. Este ejercicio es altamente efectivo para mejorar la fuerza y la resistencia de la cadera, así como para mejorar el rendimiento en otros movimientos de levantamiento.', 8, 'https://www.youtube.com/shorts/ldWuxyfoq2A', 'Barra'),
(110, 'Peso Muerto En Maquina', 'Se realiza en una máquina específica diseñada para trabajar los músculos principales de la cadena posterior, como los glúteos, isquiotibiales y la parte baja de la espalda. Este ejercicio se realiza de manera controlada, ayudando a mejorar la postura y la estabilidad en la zona lumbar, además de desarrollar la fuerza general de la parte inferior del cuerpo. A diferencia del peso muerto convencional con barra, la máquina ofrece un mayor control del movimiento, lo que puede ser beneficioso para aq', 8, 'https://www.youtube.com/shorts/IFwDoInXE6I', 'Polea y Maquina'),
(111, 'Maquina Gluteo Vertical', ' Al ejercitarlo debe posicionarse correctamente en la máquina, asegurando que la parte posterior de sus piernas esté alineada con el apoyo de la máquina. Al ejecutar el movimiento, se realiza una extensión controlada de la pierna hacia atrás, activando principalmente los glúteos. Este ejercicio es ideal para fortalecer y tonificar los músculos de los glúteos, mejorando tanto la fuerza como la forma de la zona. Además, al ser un movimiento aislado, permite un enfoque más directo y efectivo en la ', 8, 'https://www.youtube.com/shorts/7dAyon8VTz4', 'Polea y Maquina'),
(112, 'Hip Thrust En Maquina', 'Utilizando una máquina diseñada específicamente para este ejercicio, el movimiento consiste en empujar con las caderas una barra o peso que se encuentra sobre ellas, mientras mantienes la espalda apoyada en el respaldo. Este ejercicio es ideal para mejorar la fuerza y la resistencia en los glúteos, así como para trabajar la activación de los isquiotibiales y los músculos del core, todo mientras se mantiene un enfoque en la técnica adecuada para evitar lesiones.', 8, 'https://www.youtube.com/shorts/UjFMrWKMO0M', 'Polea y Maquina'),
(113, 'Pata Gluteo En Polea Baja', 'Para realizarlo, se utiliza una polea baja con una correa o tobilleras ajustables. El ejercicio consiste en colocar la pierna hacia atrás mientras se mantiene la postura erguida, utilizando la fuerza de la cadera y los glúteos para empujar la pierna contra la resistencia de la polea. Este ejercicio es excelente para aislar los glúteos y promover su tonificación y crecimiento, al tiempo que minimiza el esfuerzo en otros grupos musculares.', 8, 'https://www.youtube.com/shorts/B9Fqo0KqeWc', 'Polea y Maquina'),
(114, 'Patada Lateral En Polea', ' Se realiza utilizando una polea baja con un tobillo sujeto a la correa, lo que permite un rango de movimiento controlado y constante tensión en el músculo. Al realizar el movimiento de patada lateral, se activa principalmente el glúteo medio, ayudando a mejorar la fuerza, estabilidad y forma del área inferior del cuerpo. Es un ejercicio muy eficaz para tonificar y fortalecer la parte lateral de los glúteos y la cadera, y también ayuda a mejorar la movilidad en la zona de la pelvis.', 8, 'https://www.youtube.com/shorts/JbVhHdtqP5c', 'Polea y Maquina'),
(115, 'Sentadilla Cossback Con Peso', 'Para realizarlo, comienza de pie con los pies a la altura de los hombros. Da un paso amplio hacia un lado, flexionando la pierna de la pierna que da el paso mientras mantienes la pierna opuesta estirada. Baja el cuerpo hacia el suelo en un ángulo de 90 grados, asegurándote de que la rodilla no sobrepase los dedos del pie. Luego, empuja con la pierna que está doblada para regresar a la posición inicial y repite con la otra pierna. Este ejercicio no solo fortalece las piernas, sino que también mej', 9, 'https://www.youtube.com/shorts/n8eU-tUFrl4', 'Mancuerna'),
(116, 'Estocada Paso Atras', 'Consiste en dar un paso hacia atrás con una pierna mientras se flexionan ambas rodillas, bajando el cuerpo hasta que la rodilla trasera casi toque el suelo, manteniendo el torso erguido y el abdomen contraído. Luego, se impulsa el cuerpo de regreso a la posición inicial empujando con la pierna delantera. Es un movimiento ideal para mejorar el equilibrio, la estabilidad y fortalecer el tren inferior sin necesidad de equipamiento adicional.', 9, 'https://www.youtube.com/watch?v=Mf_LBbu36AM', 'Mancuerna'),
(117, 'Sentadilla Goblet', 'Se realiza sosteniendo una pesa (kettlebell o mancuerna) frente al pecho con ambas manos, lo que ayuda a mantener una postura erguida y facilita una técnica adecuada, especialmente útil para principiantes. Es ideal tanto para desarrollar fuerza como para mejorar la movilidad y la técnica de sentadilla.', 9, 'https://www.youtube.com/shorts/UiaS3Mnc6Sk', 'Mancuerna'),
(118, 'Sentadilla Sumo Con Mancuerna', ' Se realiza con una postura más amplia que una sentadilla tradicional, con los pies apuntando hacia afuera y sujetando una mancuerna con ambas manos entre las piernas. Esta variación permite un mayor enfoque en la parte interna de los muslos, al mismo tiempo que mejora la estabilidad del core y la movilidad de la cadera. Es ideal tanto para principiantes como para avanzados, y se puede ajustar fácilmente el nivel de intensidad cambiando el peso de la mancuerna.', 9, 'https://www.youtube.com/shorts/6N38tqZ-6F4', 'Mancuerna'),
(119, 'Sentadilla Frontal Con Barra', 'La sentadilla frontal con barra es un ejercicio de fuerza compuesto que se enfoca principalmente en los cuádriceps, glúteos y el core. A diferencia de la sentadilla trasera, la barra se coloca al frente, sobre los deltoides anteriores y las clavículas, lo que obliga a mantener el torso más erguido durante el movimiento. Esto reduce la tensión en la zona lumbar y mejora la activación del abdomen. Es ideal para mejorar la postura, fortalecer las piernas y desarrollar una base sólida para otros mov', 9, 'https://www.youtube.com/shorts/kSRJgJ98OCo', 'Barra'),
(120, 'Sentadilla Con Barra', 'Se realiza colocando una barra con peso sobre los trapecios, descendiendo en una posición de cuclillas manteniendo la espalda recta y las rodillas alineadas con los pies, y luego regresando a la posición inicial de pie. Este movimiento es clave para desarrollar fuerza, estabilidad y masa muscular en la parte inferior del cuerpo.', 9, 'https://www.youtube.com/shorts/4Gzv-EjUclo', 'Barra'),
(121, 'Zancada Con Barra', 'Consiste en colocar una barra sobre los trapecios, dar un paso hacia adelante con una pierna y descender controladamente hasta que ambas rodillas formen ángulos de 90 grados, manteniendo el torso erguido y evitando que la rodilla delantera sobrepase la punta del pie. Luego, se impulsa el cuerpo hacia arriba para volver a la posición inicial y se repite con la otra pierna, alternando en cada repetición.', 9, 'https://www.youtube.com/shorts/Wx2RTevIZLM', 'Barra'),
(122, 'Estocadas Con Barra', 'Se realiza colocando una barra sobre los trapecios (como en una sentadilla trasera), dando un paso hacia adelante y descendiendo hasta que ambas rodillas formen un ángulo de 90 grados, manteniendo la espalda recta y el abdomen contraído. Este movimiento promueve el equilibrio, la fuerza unilateral y la coordinación, siendo ideal tanto para rutinas de fuerza como de tonificación muscular.', 9, 'https://www.youtube.com/shorts/YinDJm8PLhg', 'Barra'),
(123, 'Sentadilla En Pared', 'La sentadilla en pared es un ejercicio isométrico que consiste en apoyar la espalda completamente contra una pared y descender hasta que las piernas formen un ángulo de 90 grados, como si estuvieras sentado en una silla invisible. Es excelente para fortalecer los músculos de los muslos, glúteos y el core, mejorando la resistencia y la estabilidad sin requerir equipo adicional. Ideal para todo tipo de niveles, este ejercicio también ayuda a mejorar la postura y la activación muscular.', 9, 'https://www.youtube.com/shorts/ZDpwIbKxy5o', 'Peso Corporal'),
(124, 'Sentadilla Pendulo En Maquina', 'La sentadilla péndulo es una variación dinámica de la sentadilla tradicional que combina fuerza, estabilidad y coordinación. Consiste en realizar una sentadilla mientras se balancea una pierna de un lado a otro, como un péndulo, lo que activa intensamente el núcleo, glúteos, cuádriceps y aductores. Este ejercicio mejora el equilibrio y el control corporal, siendo ideal tanto para entrenamientos funcionales como para rutinas enfocadas en piernas y core.', 9, 'https://www.youtube.com/shorts/OTVWfOqynK0', 'Polea y Maquina'),
(125, 'Prensa Oscilante', ' Se realiza en una máquina específica diseñada para trabajar principalmente los músculos del pecho, hombros y tríceps. Durante el movimiento, el cuerpo se mantiene estable mientras se empujan las pesas hacia arriba, utilizando la fuerza de los músculos del tren superior. Este ejercicio permite un rango de movimiento controlado, lo que reduce el riesgo de lesiones y mejora la fuerza en la parte superior del cuerpo. Es una excelente opción para quienes buscan aumentar la masa muscular en el torso,', 9, 'https://www.youtube.com/shorts/d-RBtJKPU_g', 'Polea y Maquina'),
(126, 'Sentadillas Hack En Maquina', 'Al realizar este ejercicio, el usuario se sienta en la máquina con los pies colocados en una plataforma y los hombros descansando contra los soportes. Luego, se baja la carga flexionando las rodillas hasta un ángulo de 90 grados o menos, y luego se extiende nuevamente las piernas para volver a la posición inicial. Este movimiento ayuda a aislar los músculos de las piernas, mejorando la fuerza y la hipertrofia muscular en los cuádriceps, glúteos y, en menor medida, en los isquiotibiales.', 9, 'https://www.youtube.com/shorts/Hb6z8e6fWJA', 'Polea y Maquina'),
(127, 'Sillon Cuadriceps', 'Al sentarse en la máquina y ajustar las almohadillas, el usuario extiende las piernas contra la resistencia, enfocándose en contraer el músculo cuádriceps durante todo el movimiento. Es ideal para mejorar la fuerza y tonificación de las piernas, especialmente cuando se busca un trabajo aislado en el cuádriceps sin involucrar otros grupos musculares. Además, permite realizar el ejercicio de manera controlada y segura, minimizando el riesgo de lesiones.', 9, 'https://www.youtube.com/shorts/S50jrJDzO4M', 'Polea y Maquina'),
(128, 'Femoral Sentado En Maquina', 'Este ejercicio se enfoca en trabajar los músculos isquiotibiales, que son los principales responsables de la flexión de la pierna. Al realizarlo, se debe ajustar el asiento de la máquina para que las piernas queden completamente estiradas antes de iniciar el movimiento. A medida que se realiza el movimiento, los talones se empujan hacia los glúteos, concentrándose en la contracción del músculo femoral. Es importante mantener una postura adecuada y evitar el uso de pesos excesivos que puedan comp', 9, 'https://www.youtube.com/shorts/oOE1vaDX71M', 'Polea y Maquina'),
(129, 'Sentadilla Smith En Maquina', 'Este ejercicio se realiza utilizando la máquina Smith, la cual proporciona un movimiento guiado y controlado, lo que permite a los usuarios centrarse en la técnica sin preocuparse por el equilibrio. Al realizar la sentadilla, el cuerpo desciende hacia abajo, manteniendo la espalda recta, y los pies deben estar posicionados a la altura de los hombros, asegurando una correcta alineación. Es ideal tanto para principiantes como para usuarios avanzados que buscan mejorar su fuerza y estabilidad en la', 9, 'https://www.youtube.com/shorts/pyY96rjR-HI', 'Polea y Maquina');

-- --------------------------------------------------------

--
-- Table structure for table `grupos_musculares`
--

CREATE TABLE `grupos_musculares` (
  `id` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grupos_musculares`
--

INSERT INTO `grupos_musculares` (`id`, `nombre`) VALUES
(1, 'Abdominales'),
(2, 'Pecho'),
(3, 'Bicep'),
(4, 'Hombro'),
(5, 'Espalda'),
(6, 'Triceps'),
(7, 'Femoral'),
(8, 'Gluteos'),
(9, 'Cuadriceps');

-- --------------------------------------------------------

--
-- Table structure for table `membresia`
--

CREATE TABLE `membresia` (
  `id` int NOT NULL,
  `tipo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio` int NOT NULL,
  `categoriaId` int NOT NULL,
  `imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `categoriaId`, `imagen`, `stock`) VALUES
(8, 'Proteina Truemade Vainilla', 'Post entrenamiento: Ideal para recuperación muscular. Consumir dentro de los 30-60 minutos después de entrenar.Desayuno o entre comidas: Si necesitás aumentar tu ingesta de proteínas diarias.Antes de dormir: En el caso de caseína (de absorción lenta), ayuda a evitar el catabolismo nocturno. Mezclar 1 scoop (medida del envase, aprox. 25-30g de proteína) en: 250-300 ml de agua, leche o bebida vegetal.Podés usar una licuadora o shaker. Si querés sumar calorías, podés agregar banana, avena, mantequi', 40000, 2, 'proteinaTruemade.jpg', 100),
(9, 'Proteina Platinum Frutilla', 'Post entrenamiento: Ideal para recuperación muscular. Consumir dentro de los 30-60 minutos después de entrenar.Desayuno o entre comidas: Si necesitás aumentar tu ingesta de proteínas diarias.Antes de dormir: En el caso de caseína (de absorción lenta), ayuda a evitar el catabolismo nocturno. Mezclar 1 scoop (medida del envase, aprox. 25-30g de proteína) en: 250-300 ml de agua, leche o bebida vegetal.Podés usar una licuadora o shaker. Si querés sumar calorías, podés agregar banana, avena, mantequi', 45000, 2, 'Wheyproteina_Frutilla.jpg', 110),
(10, 'Creatina ENA', '5 gramos por día, todos los días, a la misma hora (preferiblemente con una comida o postentreno).No hace falta cargar(es decir, tomar grandes dosis al principio). Pero si querés acelerar la saturación muscular, podés ver más abajo la fase de carga. Cuándo tomarla Postentreno (después de entrenar) es ideal, ya que el cuerpo absorbe mejor nutrientes después del ejercicio. También podés tomarla en cualquier momento del día si no entrenás.Con qué tomarla con agua, jugo o un batido postentreno. Si la', 35000, 1, 'creatinaEna.jpg', 95),
(11, 'Poteina Bar Banana Split', 'Comerlas Post entrenamiento si no podés tomar batido. Colación entre comidas, especialmente si estás lejos de casa. Antes de entrenar, si no comiste nada.\r\nRecomendaciones:\r\nFijate en la cantidad de proteína por barra (ideal 15g o más). Revisá los ingredientes: algunas tienen mucho azúcar o grasa saturada.No las uses como reemplazo total de comidas, sino como complemento.', 40000, 3, 'EnaProteinBar_banansplit.jpg', 85),
(12, 'IronBar Frutilla', 'Comerlas Post entrenamiento si no podés tomar batido. Colación entre comidas, especialmente si estás lejos de casa. Antes de entrenar, si no comiste nada.\r\nRecomendaciones:\r\nFijate en la cantidad de proteína por barra (ideal 15g o más). Revisá los ingredientes: algunas tienen mucho azúcar o grasa saturada.No las uses como reemplazo total de comidas, sino como complemento.', 20000, 3, 'Ironbar_frutilla.jpg', 99);

-- --------------------------------------------------------

--
-- Table structure for table `recetas`
--

CREATE TABLE `recetas` (
  `id` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `categoria_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recetas`
--

INSERT INTO `recetas` (`id`, `nombre`, `descripcion`, `categoria_id`) VALUES
(1, 'Tortilla de clara con espinaca y champiñón', '\r\nIngredientes:\r\n- 4 claras de huevo\r\n- 1 taza de espinacas frescas (puedes picarlas un poco)\r\n- 1/2', 1),
(2, 'Batido verde detox', '\r\nIngredientes:\r\n- 1 taza de espinaca fresca\r\n- 1/2 taza de pepino\r\n- 1 manzana verde \r\n- 1/2cuchara', 1),
(3, 'Batido proteína con avena y banana', '\r\nIngredientes:\r\n- 1 banana madura\r\n- 1/2 taza de avena\r\n- 1 scoop de proteína en polvo \r\n- 1 cuchar', 1),
(4, 'Pollo a la plancha con quinoa y brócoli', '\r\nIngredientes:\r\n- 200g de pechuga de pollo \r\n- 1 taza de quinoa \r\n- 1 taza de brocoli\r\n- Sal y pimi', 1),
(5, 'Taco pollo/pavo con aguacate/palta', '\r\nIngredientes:\r\n- 200g de pechuga de pollo o pavo \r\n- 1 aguacate/palta \r\n- 8-10 tortillas de maíz o', 1),
(6, 'Huevos revueltos con aguacate y pan integral', '\r\nIngredientes:\r\n- 4 huevos\r\n- 1 aguacate maduro\r\n- 2 rebanadas de pan integral\r\n- 1 cucharadita de ', 1),
(7, 'Tazón quinoa y verduras asadas', '\r\nIngredientes:\r\n- 1 taza de quinoa	\r\n- 2 tazas de agua o caldo de verduras\r\n- 1 berenjena, cortada ', 2),
(8, 'Ensalada de garbanzo y aguacate', '\r\nIngredientes:\r\n- 1 lata de garbanzos cocidos (400 g), escurridos y enjuagados\r\n- 1 aguacate grande', 2),
(9, 'Taco de lechuga con frijoles negros', '\r\nIngredientes:\r\n- 8 hojas grandes de lechuga romana o lechuga iceberg \r\n- 1 taza de frijoles negros', 2),
(10, 'Sopa de lentejas y espinaca', '\r\nIngredientes:\r\n- 1 taza de lentejas\r\n- 1 cebolla picada\r\n- 2 dientes de ajo picados\r\n- 1 zanahoria', 2),
(11, 'Curry garbanzo y espinaca', '\r\nIngredientes:\r\n- 2 cucharadas de aceite de oliva\r\n- 1 cebolla mediana, picada\r\n- 2 dientes de ajo,', 2),
(12, 'Burrito frijoles y aguacate', '\r\nIngredientes:\r\n- 2 tortillas grandes de harina\r\n- 1 taza de frijoles negros cocidos \r\n- 1 aguacate', 2),
(13, 'Ensalada quinoa y verduras', '\r\nIngredientes:\r\n- 1 taza de quinoa \r\n- 2 tazas de agua\r\n- 1 pepino, pelado y picado en cubos pequeñ', 2),
(14, 'Pasta con salsa de tomate y albahaca', '\r\nIngredientes:\r\n- 250g de pasta \r\n- 2 cucharadas de aceite de oliva\r\n- 4 dientes de ajo, picados fi', 2),
(15, 'Sándwich hummus y vegetales', '\r\nIngredientes:\r\n- 2 rebanadas de pan integral o pan de tu preferencia\r\n- 3 cucharadas de hummus\r\n- ', 2),
(16, 'Ensalada de pollo y aguacate', '\r\nIngredientes:\r\n- 200 g de tofu o seitán\r\n- 1 aguacate\r\n- 1 tomate grande, picado\r\n- 1 pepino\r\n- 1/', 3),
(17, 'Ensalada de pollo y aguacate', '\r\nIngredientes:\r\n- 200 g de tofu o seitán\r\n- 1 aguacate\r\n- 1 tomate grande, picado\r\n- 1 pepino\r\n- 1/', 4),
(18, 'Salmón al horno con espárragos', '\r\nIngredientes:\r\n- 4 filetes de salmón\r\n- 1 manojo de espárragos frescos\r\n- 2 cucharadas de aceite d', 3),
(19, 'Salmón al horno con espárragos', '\r\nIngredientes:\r\n- 4 filetes de salmón\r\n- 1 manojo de espárragos frescos\r\n- 2 cucharadas de aceite d', 4),
(20, 'Tazón quinoa con garbanzo y verduras', '\r\nIngredientes:\r\n- 1 taza de quinoa\r\n- 1 taza de garbanzos cocidos\r\n- 1 zanahoria mediana, pelada y ', 3),
(21, 'Tazón quinoa con garbanzo y verduras', '\r\nIngredientes:\r\n- 1 taza de quinoa\r\n- 1 taza de garbanzos cocidos\r\n- 1 zanahoria mediana, pelada y ', 4),
(22, 'Omelette de claras con espinaca y tomate', '\r\nIngredientes:\r\n- 4 claras de huevo\r\n- 1 taza de espinaca fresca\r\n- 1 tomate maduro\r\n- 1 cucharadit', 3),
(23, 'Omelette de claras con espinaca y tomate', '\r\nIngredientes:\r\n- 4 claras de huevo\r\n- 1 taza de espinaca fresca\r\n- 1 tomate maduro\r\n- 1 cucharadit', 4),
(24, 'Ensalada de atún con garbanzo', '\r\nIngredientes:\r\n- 1 lata de atún en agua o aceite\r\n- 1 taza de garbanzos cocidos\r\n- 1/2 cebolla roj', 3),
(25, 'Ensalada de atún con garbanzo', '\r\nIngredientes:\r\n- 1 lata de atún en agua o aceite\r\n- 1 taza de garbanzos cocidos\r\n- 1/2 cebolla roj', 4),
(26, 'Brocheta de pollo y vegetales', '\r\nIngredientes:\r\n- 500 g de pechuga de pollo\r\n- 1 pimiento rojo\r\n- 1 pimiento verde\r\n- 1 cebolla mor', 3),
(27, 'Brocheta de pollo y vegetales', '\r\nIngredientes:\r\n- 500 g de pechuga de pollo\r\n- 1 pimiento rojo\r\n- 1 pimiento verde\r\n- 1 cebolla mor', 4),
(28, 'Merluza a la plancha con verduras salteadas', '\r\nIngredientes:\r\n- 2 filetes de merluza\r\n- 1 diente de ajo\r\n- Jugo de 1/2 limón\r\n- Aceite de oliva v', 3),
(29, 'Merluza a la plancha con verduras salteadas', '\r\nIngredientes:\r\n- 2 filetes de merluza\r\n- 1 diente de ajo\r\n- Jugo de 1/2 limón\r\n- Aceite de oliva v', 4),
(30, 'Tacos de lechuga con pollo', '\r\nIngredientes:\r\n- 2 pechugas de pollo\r\n- 1 cucharada de aceite de oliva\r\n- 1 diente de ajo\r\n- 1/2 c', 3),
(31, 'Tacos de lechuga con pollo', '\r\nIngredientes:\r\n- 2 pechugas de pollo\r\n- 1 cucharada de aceite de oliva\r\n- 1 diente de ajo\r\n- 1/2 c', 4),
(32, 'Sopa verdura y pollo', '\r\nIngredientes:\r\n- 2 pechugas de pollo \r\n- 2 zanahorias, peladas y picadas\r\n- 2 papas medianas, pela', 3),
(33, 'Wrap pavo y verduras', '\r\nIngredientes:\r\n- 2 tortillas de trigo integral o normal \r\n- 150 g de pechuga de pavo\r\n- 1/2 pimien', 3),
(34, 'Pollo a la parrilla con verduras asadas', ' Ingredientes: \r\n- 4 pechugas de pollo\r\n- 3 cucharadas de aceite de oliva\r\n- 2 dientes de ajo picado', 5),
(35, 'Ensalada de quinoa y aguacate', ' Ingredientes: \r\n- 1 taza de quinoa\r\n- 2 tazas de agua\r\n- 1 aguacate grande \r\n- 1 pepino\r\n- 1/2 cebo', 5),
(36, 'Taco de lechuga y pollo con salsa de mango', ' Ingredientes: \r\n- 2 pechugas de pollo\r\n- 8 hojas grandes de lechuga \r\n- 1 cucharadita de aceite de ', 5),
(37, 'Sopa lenteja y espinaca', ' Ingredientes: \r\n- 1 taza de lentejas\r\n- 1 litro de caldo de verduras o agua\r\n- 1 cucharada de aceit', 5),
(38, 'Curry de garbanzos y espinaca', ' Ingredientes: \r\n- 1 taza de garbanzos cocidos \r\n- 200 g de espinaca fresca\r\n- 1 cebolla mediana, pi', 5),
(39, 'Ensalada de pollo y aguacate', ' Ingredientes: \r\n- 2 pechugas de pollo\r\n- 1 aguacate maduro\r\n- 1 taza de lechuga \r\n- 1 tomate grande', 5),
(40, 'Pimentón relleno de quinoa y verduras', ' Ingredientes: \r\n- 4 pimientos grandes \r\n- 1 taza de quinoa\r\n- 2 tazas de agua o caldo vegetal\r\n- 1 ', 5),
(41, 'Tazón de frutas y yogurt de coco', ' Ingredientes: \r\n- 1 taza de yogurt de coco (puedes usar yogurt de coco sin azúcar o endulzado, segú', 5),
(42, 'Fajitas de pollo sin tortilla', ' Ingredientes: \r\n- 2 pechugas de pollo deshuesadas y sin piel\r\n- 1 pimiento rojo, cortado en tiras\r\n', 5),
(43, 'Pasta con salsa de tomate y albahaca', ' \r\nIngredientes:\r\n- 250 g de pasta (espaguetis, penne, fusilli, o la que prefieras)\r\n- 500 g de toma', 6),
(44, 'Sándwich de pavo y queso', ' \r\nIngredientes:\r\n- 2 rebanadas de pan (puedes usar pan integral, blanco o el que prefieras)\r\n- 2 o ', 6),
(45, 'Ensalada caprese', ' \r\nIngredientes:\r\n- 4 tomates maduros\r\n- 250 g de mozzarella fresca\r\n- Unas hojas de albahaca fresc\r', 6),
(46, 'Omelette de jamón y queso', ' \r\nIngredientes:\r\n- 2 o 3 huevos\r\n- 2 lonchas de jamón\r\n- 1/4 taza de queso rallado (puedes usar que', 6),
(47, 'Pollo al limnón', ' \r\nIngredientes:\r\n- 4 piezas de pollo(muslos, pechugas o cualquier parte que prefieras)\r\n- 2 limones', 6),
(48, 'Batido de plátanos y fresas', ' \r\nIngredientes:\r\n- 1 plátano maduro\r\n- 1 taza de fresas frescas o congeladas\r\n- 1 taza de leche (va', 6),
(49, 'Tostadas de aguacate', ' \r\nIngredientes:\r\n- 2 rebanadas de pan (puede ser integral, de masa madre, o el que prefieras)\r\n- 1 ', 6),
(50, 'Brochetas de frutas', ' \r\nIngredientes:\r\n- 1 piña madura\r\n- 1 mango\r\n- 1 plátano\r\n- 1 melón\r\n- Uvas \r\n- Fresas\r\n- Palitos p', 6),
(51, 'Quesadillas con queso', ' \r\nIngredientes:\r\n- 4 tortillas de harina\r\n- 200 g de queso rallado (puedes usar queso tipo manchego', 6),
(52, 'Gazpacho', ' \r\nIngredientes:\r\n- 1 kg de tomates maduros\r\n- 1 pepino\r\n- 1 pimiento verde\r\n- 1 diente de ajo\r\n- 1/', 6);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `apellido` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rol` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_membresia` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `apellido`, `nombre`, `rol`, `imagen`, `id_membresia`, `fecha_nacimiento`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 1, '2025-04-09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `autenticacion`
--
ALTER TABLE `autenticacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categoria_recetas`
--
ALTER TABLE `categoria_recetas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grupo_muscular_id` (`grupo_muscular_id`);

--
-- Indexes for table `grupos_musculares`
--
ALTER TABLE `grupos_musculares`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membresia`
--
ALTER TABLE `membresia`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoriaId` (`categoriaId`);

--
-- Indexes for table `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_membresia` (`id_membresia`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `autenticacion`
--
ALTER TABLE `autenticacion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categoria_recetas`
--
ALTER TABLE `categoria_recetas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `grupos_musculares`
--
ALTER TABLE `grupos_musculares`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `membresia`
--
ALTER TABLE `membresia`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `autenticacion`
--
ALTER TABLE `autenticacion`
  ADD CONSTRAINT `autenticacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD CONSTRAINT `ejercicios_ibfk_1` FOREIGN KEY (`grupo_muscular_id`) REFERENCES `grupos_musculares` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `membresia`
--
ALTER TABLE `membresia`
  ADD CONSTRAINT `membresia_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id_membresia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`);

--
-- Constraints for table `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_recetas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
