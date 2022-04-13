const fetch = require('node-fetch')
const baseURL = `https://announcekit-cdn.s3.amazonaws.com`
const Query = {
    user: async (parent, args, { User }) => {
        return await User.findById(args.id);
    },
    users: async (parent, args, { User }) => {
        return await User.find({}).sort({ createdAt: 'asc' })
    },

    activeUser: async (parent, args, { User, activeUser }) => {
        return await User.findOne({username: activeUser.username});
    },

    vehicle: async (parent, args) => {
      const result = await fetch(`${baseURL}/bikes.json`).then(res => res.json())
      var bike_id = args.id;
      if(bike_id){
      return result?.data?.bikes.filter(bike => bike.bike_id === args.id);
      }
      return result?.data?.bikes;
    },
    vehicles: async () => {
      const result = await fetch(`${baseURL}/bikes.json`).then(res => res.json())
      return result?.data?.bikes;
    }
};

module.exports = Query;