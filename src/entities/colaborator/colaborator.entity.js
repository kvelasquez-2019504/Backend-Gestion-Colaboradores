export class Colaborator {
    constructor(IDCOLABORADOR,NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL) {
        this.IDCOLABORADOR = IDCOLABORADOR;
        this.NOMBRE = NOMBRE;
        this.APELLIDO = APELLIDO;
        this.DIRECCION = DIRECCION;
        this.EDAD = EDAD;
        this.PROFESION = PROFESION;
        this.ESTADOCIVIL = ESTADOCIVIL;
    }

    getNombre() {
        return this.NOMBRE;
    }
    setNombre(NOMBRE) {
        this.NOMBRE = NOMBRE;
    }
    getApellido() {
        return this.APELLIDO;
    }
    setApellido(APELLIDO) {
        this.APELLIDO = APELLIDO;
    }
    getDireccion() {
        return this.DIRECCION;
    }
    setDireccion(DIRECCION) {
        this.DIRECCION = DIRECCION;
    }
    getEdad() {
        return this.EDAD;
    }
    setEdad(EDAD) {
        this.EDAD = EDAD;
    }
    getProfesion() {
        return this.PROFESION;
    }
    setProfesion(PROFESION) {
        this.PROFESION = PROFESION;
    }
    getEstadoCivil() {
        return this.ESTADOCIVIL;
    }
}
