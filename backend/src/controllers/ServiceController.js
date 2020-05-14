const connection = require('../database/connection');

module.exports ={
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('services').count();

        const services = await connection('services')
            .join('users', 'users.id', '=', 'services.user_id')
            .limit(5)
            .offset((page-1)*5)
            .select(['services.*',
                     'users.name',
                     'users.email',
                     'users.whatsapp',
                     'users.city',
                     'users.uf']);

        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(services);
    },

    async create(request,response){
        const {title, description, budget} = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('services').insert({
            title,
            description,
            budget,
            user_id
        });

        return response.json({id});
    },

    async delete(request, response) {
        const {id} = request.params;
        const user_id = request.headers.authorization;

        const service = await connection('services')
            .where('id',id)
            .select('user_id')
            .first();

        if(service.user_id !== user_id){
            return response.status(401).json({error: 'Operação não permitida.'});
        }
    
        await connection('services').where('id',id).delete();

        return response.status(204).send();
    },
};