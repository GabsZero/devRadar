const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        const devs = await Dev.find()

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, longitude, latitude } = request.body

        let dev = await Dev.findOne({github_username})

        //checando se já existe um dev com o username passado
        if(!dev){
            const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const {login, avatar_url, bio } = githubResponse.data
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name: login,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
    
        return response.json({
            dev
        })
    },
    async update(request, response){
        const { name } = request.params
        const { techs, latitude, longitude } = request.body

        const techArray = parseStringAsArray(techs)
        
        const dev = await Dev.findOne({
            name
        })
        console.log(dev)
        Dev.findOneAndUpdate({name}, request.body, {new: true},
        (err, dev) => {
            console.log(err, dev)
        })
       
        console.log(res)
        return response.json({
            dev
        })
    }
}