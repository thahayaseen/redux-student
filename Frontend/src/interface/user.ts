export  interface User{
    email:string
    fullname:string
    password:string
}
export interface reduxudata{
    token:string|null,
    name:string|null,
    email:string|null,
    image?:string|null,
    role:string|null
}