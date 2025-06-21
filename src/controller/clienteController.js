const { default: Message } = require('tedious/lib/message');
const {clienteModel} = require('../models/clienteModel');
const { Op } = require('sequelize');

const clienteController = {
    listarClientes: async(req, res)=>{
        try {
            let {ID_Cliente, nomeCliente} = req.query;

            let conditions = {};
            
            if (ID_Cliente) {
                conditions.ID_Cliente = ID_Cliente;
            }
            if (nomeCliente) {
                conditions.nomeCliente = nomeCliente;
            }

            let clientes = await clienteModel.findAll({
                where: conditions
            });
            return res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao listar clientes', error)
            return res.status(500).json({message: 'Erro ao listar clientes'})
        }
    }, 
    cadastrarCliente: async(req, res)=>{
        try {
            
            const {nomeCliente, emailCliente, cpfCliente, telefoneCliente, cepCliente} = req.body;

            if (!nomeCliente || !cpfCliente || !emailCliente){
                return res.status(400).json({message: "Campos obrigatórios não preenchidos!"});
            } 

            let cliente = await clienteModel.findOne({where: {
                [Op.or]: [
                    {cpfCliente},
                    {emailCliente}
                ]
            }});

            if(cliente){
                return res.status(409).json({message: 'Cliente já cadastrado!'});
            }

            await clienteModel.create({nomeCliente, cpfCliente, emailCliente, telefoneCliente, cepCliente});

            return res.status(201).json({message: 'Cliente cadastrado com sucesso!'});

        } catch (error) {
            console.error("Erro ao cadastrar cliente!", error);
            return res.status(500).json({message: "Erro ao cadastrar cliente!"})
        }
    },
   atualizarCliente: async (req, res) => {
    try {
        const { ID_Cliente } = req.params;
        const { nomeCliente, cpfCliente, emailCliente, telefoneCliente, cepCliente } = req.body;

        let cliente = await clienteModel.findByPk(ID_Cliente);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' });
        }

        if (cpfCliente) {
            const cpfExistente = await clienteModel.findOne({
                where: { cpfCliente, ID_Cliente: { [Op.ne]: ID_Cliente } }
            });

            if (cpfExistente) {
                return res.status(409).json({ message: 'CPF já está em uso por outro cliente.' });
            }
        }
        if (emailCliente) {
            const emailExistente = await clienteModel.findOne({
                where: { emailCliente, ID_Cliente: { [Op.ne]: ID_Cliente } }
            });

            if (emailExistente) {
                return res.status(409).json({ message: 'Email já está em uso por outro cliente.' });
            }
        }

        let dadosAtualizado = {
            nomeCliente,
            cpfCliente,
            emailCliente,
            telefoneCliente,
            cepCliente
        };

        await clienteModel.update(dadosAtualizado, { where: { ID_Cliente } });

        cliente = await clienteModel.findByPk(ID_Cliente);
        return res.status(200).json({ message: 'Cliente atualizado com sucesso', Cliente: cliente });

    } catch (error) {
        console.error("Erro ao atualizar cliente!", error);
        return res.status(500).json({ message: "Erro ao atualizar cliente!" });
    };
  },
    deletarCliente: async(req, res)=>{

       try {

        const {ID_Cliente} = req.params;
        let cliente = await clienteModel.findByPk(ID_Cliente);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' });
        }

        let nomeCliente = cliente.nomeCliente;

        let result = await clienteModel.destroy({where: {ID_Cliente}});

        if (result>0) {
            return res.status(200).json({message: `${nomeCliente} foi excluido com sucesso!`});
        } else{
            return res.status(404).json({message: 'Erro ao Excluir cliente!'});
        }

        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            return res.status(500).json({message: 'Erro ao excluir cliente'});
        }

    }
};

module.exports= {clienteController};