import express from 'express'
import routes from './routes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//middleware de autenticação, o middleware vai criar uma proteção pra rotas e impedir que um usuário não logado consiga acessar o site, o middleware vai ficar entre a requisição e a resposta. Literalmente atuando como um porteiro verificando se você tem permissão para acessar o local ou não. Nesse caso a permissão é você estar logado.

// function authMiddleware(req, res, next) {
//    const isLogged = false
//    if (isLogged) {

//       next() //o next permite o acesso a rota e passa para a próxima requisição
//    } else {
//       res.status(401).json({ message: 'Unauthenticated user' }) //aqui estamos negando a permissão pelo motivo do usuário não estar logado
//    }
// }


// app.get('/', (req, res) => {
//    //req é a requisição que o usuário faz, então quando o usuário chamar essa rota, todos os dados da requisição estarão dentro do req

//    //res é a resposta que o servidor vai dar pra cada usuário, então quando o usuário chamar essa rota, todos os dados da erpsosta estarão dentro do res
//    try { //é sempre bom colocar um TRY CATCH ERROR para quando houver algum problema no código, ele não parar a execução do mesmo, e dar continuidade, apenas reportando o erro no console
//       res.json({ message: 'Hello World' })
//    } catch (error) {
//       console.log(error)
//    }
// })

// app.get('/profile', authMiddleware, (req, res) => { //aqui é exatamente onde se coloca o auth middleware, entre a requisição de acesso ao site (nesse caso o prifle) e a resposta
//    res.json({ message: 'Profile' })
// })


app.use(routes)

app.listen(3333, () => console.log('Server is running on port 3333'))