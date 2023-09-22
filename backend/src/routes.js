import { Router } from 'express'
import { prisma } from './prisma.js'
//bAn4VgDnoHdTEJle senha mongoDB
const routes = Router()



routes.post('/checkin', async (req, res) => {


   const { checkin, firstName, lastName, ticket } = req.body

   //pegando a data do check in que foi setada no input e transformando na variavel date
   const date = new Date(checkin);
   //pegando a data em formato de horas e jogando dentro da variavel numericData
   const numericData = date.getTime()

   //aplicando o formato desejado que a data será exibida
   const formatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });

   //jogando a data já formatada dentro da variavel formattedDate
   const formattedDate = formatter.format(date);

   //garantindo que o checkin seja feito na data atual, não possibilitando realizar um checkin para uma data futura
   if(numericData > new Date().getTime()) {
      return res.status(400).json({ message: 'Check-in date is invalid' })
   }

   //verificar se o TICKET já existe
   const ticketExists = await prisma.checkin.findUnique({
      where: {
         ticket
      }
   })
   

   //se existir, retorna um status de CODE 409 que é o de conflito, e uma mensagem.
   //esse return não irá executar o restante do código
   if (ticketExists) {
      return res.status(409).json({ message: 'Ticket already exists' })
   }

   const checkIn = await prisma.checkin.create({
      data: {
         checkin: formattedDate,
         firstName,
         lastName,
         ticket

      }
   })



   return res.json(checkIn)
})


routes.get('/checkin', async (req, res) => {
   try { //usamos o try catch aqui para se por acaso tiver algum erro ele não parar a execução do servidor

      const checkin = await prisma.checkin.findMany() //utilizamos o findMany para procurar todos os checkin

      if (!checkin) {
         return json.status(404).json({ message: 'Checkin not found' })
      }

      return res.status(200).json(checkin)
   } catch (e) {
      console.log(e)
      throw new Error('Error getting checkin') //e aqui devolvemos para o cliente uma informação de que algo deu errado
   }
})

routes.post('/checkout/:id', async (req, res) => {
   try {
      //aqui pegamos os dados do front
      const { id } = req.params;

      //pegando a data de hoje ano/mes/dia hora:minuto:segundo
      const date = new Date();

      //formatando a data o padrão brasileiro
      const formatter = new Intl.DateTimeFormat('pt-BR', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric'
      })

      //aplicando a formatação na data
      const formattedDate = formatter.format(date)

      //e aqui vamos verificar se o ticket existe no banco de dados
      const ticketAlreadyExists = await prisma.checkin.findUnique({
         where: {
            //aqui comparamos se o ticket da esquerda (que é o que vem do banco de dados) é igual ao ticket da direita (que é o que vem do front-end)
            ticket: id
         }
      })

      if (!ticketAlreadyExists) {
         return res.status(404).json({ message: 'Ticket not found' })
      }

      const ch = await prisma.checkin.update({
         where: {
            ticket: id
         },
         data: {
            checkout: formattedDate
         }
      })

      return res.status(200).json(ch)


   } catch (e) {
      console.log(e)
   }
})



export default routes