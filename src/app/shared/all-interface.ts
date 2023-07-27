export interface AllInterface {


}
export interface UserData {
    id: number,
    username: string,
    password: string,
    type: string,
    firstName: string,
    lastName: string,
    isEditable?: Boolean
}
export interface User {
    username: string,
    password: string,
}