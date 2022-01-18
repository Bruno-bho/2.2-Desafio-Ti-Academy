const express = require('express');
const cors = require('cors');
const {Sequelize} = require('./models');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let pedido = models.Pedido;
let servico = models.Servico;
let itempedido = models.ItemPedido;
let produto = models.Produto;
let compra = models.Compra;
let itemcompra = models.ItemCompra;

app.get('/', function(req,res){
    res.send('Olá mundo!');
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//SERVIÇO

//Inserir serviço

app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message:"Serviço criado com sucesso!"
        });
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar"
        });
    });
});    

//listar servicos

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll()
    .then(serv =>{
        return res.json({
            error: false,
            serv
        });
    })
    .catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão"
        });
    });
});

//contar servicos

app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

//pesquisar serviço

// app.get('/servico/:id', async(req, res)=>{
//     await servico.findByPk(req.params.id)
//     .then(serv => {
//         return res.json({
//             error: false,
//             serv
//         });
//     }).catch(function(){
//         return res.status(400).json({
//             error: true,
//             message: "Erro: não foi possível conectar."
//         });
//     });
// });

// alterar dados findByPk

// app.get('/atualizaservico', async(req,res)=>{
//     await servico.findByPk(1)
//     .then(serv =>{
//         serv.nome = 'HTML/CSS/JS',
//         serv.descricao = 'Páginas estáticas e dinâmicas estilizadas';
//         //salvar os dados na raiz
//         serv.save();
//         return res.json({serv});
//     });
// });

// alterar serviço com put

app.put('/atualizaservico', async(req,res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            erro: false,
            message: "Serviço foi alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço"
        });
    });
});

//Excluir Serviço

app.get('/excluirservico/:id', async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir serviço."
        });
    });
});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CLIENTES

// Criar clientes

app.post('/clientes', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(cli =>{
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
            cli
        })        
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o cliente."
        });
    });
});

// Listar clientes

app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll()
    .then(cli =>{
        return res.json({
            error: false,
            cli
        });
    })
    .catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão"
        });
    });
});

//Alterar dados de Clientes

app.put('/atualizacliente', async(req,res)=>{
    await cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            erro: false,
            message: "Cliente foi atualizado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na atualização do cliente"
        });
    });
});

//Excluir cliente

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir cliente."
        });
    });
});

// quantidade de clientes

app.get('/ofertaclientes', async(req, res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});

// excluir cliente

// app.get('/excluircliente/:id', async(req, res) =>{
//     await cliente.destroy({
//         where: {id: req.params.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Cliente foi excluído com sucesso!"
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro ao excluir o cliente."
//         });
//     });
// });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//PEDIDOS

// Adicionar pedidos

app.post('/cliente/pedido', async(req, res)=>{
    const ped = {
        data: req.body.data,
        ClienteId: req.body.ClienteId
    };

    if(!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.create(ped)
    .then(order=>{
        return res.json({
            error: false,
            message: "Pedido inserido com sucesso.",
            order
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o pedido."
        });
    });
});

// Listar Pedidos

app.get('/clientes-pedidos', async(req, res)=>{
    await pedido.findAll({include:[{all:true}]})
    .then(listaPedido =>{
        return res.json({
            error: false,
            listaPedido
        });
    })
    .catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão"
        });
    });
});

//alterar pedido com busca no ClienteId

app.put('/alterarpedido/:id', async (req, res) => {
    const ped = {
        id: req.params.id,
        ClienteId: req.body.ClienteId,
        data: req.body.data
    };

    if (!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.update(ped,{
        where: Sequelize.and({ClienteId: req.body.ClienteId},
            {id: req.params.id})
    }).then(pedidos=>{
        return res.json({
            error: false,
            mensagem: 'Pedido foi alterado com sucesso.',
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});




//obter pedido

app.get('/pedido/:id', async(req, res) =>{  
    pedido.findByPk(req.params.id,{include:[{all:true}]})
    .then(ped =>{
      return res.json({
        error: false,
        ped
      });
    }).catch(function(erro){
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível acessar a API!"
      });
    });
  });


// procura pelo ClienteId e apresenta os dados do pedido

app.get('/cliente/:id/pedidos', async(req, res)=>{
    await pedido.findAll({
        where: {ClienteId: req.params.id}
    }).then(pedidos=>{
        return res.json({
            error: false,            
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

//Quantidade de pedidos

app.get('/ofertapedidos', async(req, res)=>{
    await pedido.count('id').then(function(pedidos){
        res.json({pedidos});
    });
});

//Excluir Pedidos

app.get('/excluirpedido/:id', async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir pedido."
        });
    });
});


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// item pedidos

app.post('/pedido/:id/item-pedido', async(req, res)=>{
    const itemped = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        PedidoId: req.params.id,
        ServicoId: req.body.ServicoId
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'pedido não existe.'
        });
    };
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };
    await itempedido.create(itemped, {
        where: Sequelize.and({ServicoId: req.body.ServicoId}, 
        {PedidoId: req.params.id})
    }).then(order=>{
        return res.json({
            error: false,
            message: 'Item inserido no pedido com sucesso.',
            order
            
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o item no pedido."
        });
    });
});

//Alterar item Pedido com busca no pedidoId

app.put('/pedidos/:id/editaritem', async(req, res)=>{
    const item = {
        quantidade: req. body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId}, 
        {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Pedido foi alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possível alterar'
        });
    });
});

//Excluir itens-Pedidos

// app.get('/excluir-item-pedido/:id', async(req, res)=>{
//     await pedido.destroy({
//         where: {itempedidoId: req.params.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "item do pedido excluído com sucesso."
//         });
//     }).catch(erro=>{
//         return res.status(400).json({
//             error: true,
//             message: "Erro: impossível excluir item do pedido."
//         });
//     });
// });


app.get('/excluir-item-pedido/:id', async(req, res)=>{
    const item = {
        ServicoId: req.body.ServicoId
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço dentro do pedido não foi encontrado.'
        });
    };

    await servico.destroy(item, {
        where: Sequelize.and({PedidoId: req.params.id}, 
        {ServicoId: req.body.Servicoid})
    }).then(function(){
        return res.json({
            error: false,
            message: 'Item pedido foi excluido com sucesso!',
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possível excluir'
        });
    });
});

// Listar item pedidos

app.get('/listar-item-pedido', async(req, res)=>{
    await itempedido.findAll({include:[{all:true}]})
    .then(listaItens=>{
        return res.json({
            error: false,
            listaItens
        });
    });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//PRODUTOS

//Inserir produto

app.post('/produtos', async(req,res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message:"Produto criado com sucesso!"
        });
    }).catch (function(erro){
        return res.status(400).json({
            error: true,
            message:"Foi impossível se conectar"
        });
    });
}); 

//listar produtos

app.get('/listaprodutos', async(req, res)=>{
    await produto.findAll()
    .then(prod =>{
        return res.json({
            error: false,
            prod
        });
    })
    .catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão"
        });
    });
});

// alterar produto com put

app.put('/atualizaproduto', async(req,res)=>{
    await produto.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            erro: false,
            message: "Produto foi alterado com sucesso"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do produto"
        });
    });
});

//Excluir Produto

app.get('/excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir produto."
        });
    });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Compras

// Adicionar compras

app.post('/cliente/compra', async(req, res)=>{
    const comp = {
        data: req.body.data,
        ClienteId: req.body.ClienteId
    };

    if(!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await compra.create(comp)
    .then(order=>{
        return res.json({
            error: false,
            message: "Compra inserida com sucesso.",
            order
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir a compra."
        });
    });
});

// Listar Compras

app.get('/clientes-compras', async(req, res)=>{
    await compra.findAll({include:[{all:true}]})
    .then(listaCompra =>{
        return res.json({
            error: false,
            listaCompra
        });
    })
    .catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão"
        });
    });
});

//alterar compra com busca no ClienteId

app.put('/alterarcompra/:id', async (req, res) => {
    const comp = {
        id: req.params.id,
        ClienteId: req.body.ClienteId,
        data: req.body.data
    };

    if (!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await compra.update(comp,{
        where: Sequelize.and({ClienteId: req.body.ClienteId},
            {id: req.params.id})
    }).then(compras=>{
        return res.json({
            error: false,
            mensagem: 'Compra foi alterada com sucesso.',
            compras
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});




//obter compras

app.get('/compras/:id', async(req, res) =>{  
    compra.findByPk(req.params.id,{include:[{all:true}]})
    .then(comp =>{
      return res.json({
        error: false,
        comp
      });
    }).catch(function(erro){
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível acessar a API!"
      });
    });
  });


// procura pelo ClienteId e apresenta os dados das compras

app.get('/cliente/:id/compras', async(req, res)=>{
    await compra.findAll({
        where: {ClienteId: req.params.id}
    }).then(compras=>{
        return res.json({
            error: false,            
            compras
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

//Quantidade de compras

app.get('/ofertacompras', async(req, res)=>{
    await compra.count('id').then(function(compras){
        res.json({compras});
    });
});

//Excluir Compra

app.get('/excluircompra/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra excluída com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir compra."
        });
    });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ITEM COMPRAS


app.post('/compra/:id/item-compra', async(req, res)=>{
    const itemcomp = {
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        CompraId: req.params.id,
        ProdutoId: req.body.ProdutoId
    };

    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Compra não existe.'
        });
    };
    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };
    await itemcompra.create(itemcomp, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId}, 
        {CompraId: req.params.id})
    }).then(order=>{
        return res.json({
            error: false,
            message: 'Item inserido na compra com sucesso.',
            order
            
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o item na compra."
        });
    });
});

//Alterar Pedido com busca no pedidoId

app.put('/compras/:id/editaritem', async(req, res)=>{
    const itemcomp = {
        quantidade: req. body.quantidade,
        valor: req.body.valor
    };

    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Compra não foi encontrada.'
        });
    };

    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };

    await itemcompra.update(itemcomp, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId}, 
        {CompraId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Compra foi alterada com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Erro: não foi possível alterar'
        });
    });
});

//Excluir itens-Compras

app.get('/excluir-item-compra/:id', async(req, res)=>{
    await itemcompra.destroy({
        where: {id: req.params.itemcompra}
    }).then(function(){
        return res.json({
            error: false,
            message: "item da compra excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir item da compra."
        });
    });
});

// Listar item pedidos

app.get('/listar-item-compra', async(req, res)=>{
    await itemcompra.findAll({include:[{all:true}]})
    .then(listaItens=>{
        return res.json({
            error: false,
            listaItens
        });
    });
});


let port = process.env.PORT || 3001;

app.listen(port, (req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});