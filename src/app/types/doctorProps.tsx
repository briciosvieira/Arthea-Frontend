export interface DoctorProps {
    id:string
    name: string
    crm: string
    specialty: string
    about: string
    photoUrl: string
    active: boolean
    hiredAt: Date | string
}