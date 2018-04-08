import {Request, Response} from 'express'

import {User, users} from './users'

export const handleAuthentication = (req: Request, res: Response) =>{
  const user = req.body;

  if(isValid(user)){
    const dbUser: User = users[user.email]
    res.json(dbUser)
  }else{
    res.status(403).json({message: 'Dados inválidos.'})
  }
}

function isValid(user): boolean{
  if(!user){
    return false;
  }
  const dbUser = users[user.email]
  return dbUser !== undefined && dbUser.matches(user)
}
