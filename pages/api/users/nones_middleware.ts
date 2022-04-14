import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest, res: NextResponse){
  //let tmp = localStorage.getItem('user')
  if(req.method === 'GET'){
    console.log(req.cookies['token'])
    let response = NextResponse.next()
    response.cookie('token', 'pruebavalue',{
      path:'/user/userProfile',
      httpOnly: true,
      sameSite: 'strict',
    })
    //console.log(response.cookies)
    return response
  }

  return NextResponse.next()

}
