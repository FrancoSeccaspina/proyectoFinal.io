import  cron  from  'node-cron' ;
import reservaController from '../controllers/reservaController'

cron.schedule('* * * * *', () => {
  reservaController.devolverStockReservasVencidas();
});