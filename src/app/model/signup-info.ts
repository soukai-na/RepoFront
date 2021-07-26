export class SignUpInfo {
    nom: string;
    prenom:string
    username: string;
    email: string;
    role: string[];
    password: string;
 
    constructor(nom: string,prenom:string , username: string, email: string, password: string) {
        this.nom = nom;
        this.prenom=prenom;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = ['user'];
    }
}