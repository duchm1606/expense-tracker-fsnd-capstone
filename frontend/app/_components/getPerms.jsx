import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
const jwt = require('jsonwebtoken')

export const getPermissions = async (perms) => {
    const {user} = useUser()
    if (perms && user)
        const { data: response } = await axios.get('/api/users')

    //   await axios.get('/api/users')
    //   .then(response => {
    //     const decode = jwt.decode(response.data.user, { complete: true });
    //     return decode.payload.permissions.includes(perms)
    //   });
  }