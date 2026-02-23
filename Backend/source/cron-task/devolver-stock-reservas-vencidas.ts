import cron from 'node-cron';
import reservaController from '../controllers/reservaController';
import { TIEMPO_CONTROL_STOCK_MINUTOS, IS_PRODUCTION } from '../configEnv';

const intervaloMinutos = parseInt(TIEMPO_CONTROL_STOCK_MINUTOS ?? '5', 10);
const minutos = isNaN(intervaloMinutos) || intervaloMinutos < 1 ? 5 : intervaloMinutos;
const expresionCron = `*/${minutos} * * * *`;

console.log(`[cron] Devolución de stock configurada cada ${minutos} minutos`);

cron.schedule(expresionCron, () => {
  if (!IS_PRODUCTION) {
    console.log(`[cron] Ejecutando devolución de stock de reservas vencidas`);
  }
  reservaController.devolverStockReservasVencidas();
});