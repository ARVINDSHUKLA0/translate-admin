// import { NextResponse } from 'next/server'

// export function middleware(request) {

//     const { pathname } = request.nextUrl

//     const auth = request.cookies.get('admin-auth')?.value

//     if (pathname === '/login') { 
//         if (auth === '1') {
//             return NextResponse.redirect(
//                 new URL('/', request.url)
//             )
//         }

//         return NextResponse.next()
//     }

 
//     if (pathname === '/forgot-password') {
//         return NextResponse.next()
//     }


//     if (auth !== '1') {
//         return NextResponse.redirect(
//             new URL('/login', request.url)
//         )
//     }


//     return NextResponse.next()
// }


// export const config = {
//     matcher: [
//         '/((?!_next/static|_next/image|favicon.ico).*)',
//     ],
// }





import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Login and forgot-password pages are public.
  if (pathname === '/login' || pathname === '/forgot-password') {
    return NextResponse.next()
  }

  // Authentication is verified by AdminShell using
  // the backend /api/auth/me endpoint.
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
