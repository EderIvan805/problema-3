window.addEventListener("load", function () {
    datosSalarioBM.inicializar();
});

var datosSalarioBM = {
    btnDSCalcular: document.getElementById("btnDSCalcular"),
    btnDSCancelar: document.getElementById("btnDSCancelar"),

    limpiarCampos: function () {
        document.getElementById("txtNombre").value = "";
        document.getElementById("txtPagaXHora").value = "";
        document.getElementById("txtHorasSemanales").value = "";
        document.getElementById('formDatosSalarioBM').classList.remove('was-validated');
    },

    guardar: function () {
        var nombre = document.getElementById("txtNombre").value;
        var salario = document.getElementById("txtPagaXHora").value;
        var horasTrabajadas = document.getElementById("txtHorasSemanales").value;
        var salarioBruto = datosSalarioBM.calcularSalarioBruto(horasTrabajadas, salario);

        var row = "";
        row += '<tr><td>' + nombre + '</td><td>' + salario + '</td><td>' + horasTrabajadas + '</td><td>' + salarioBruto + '</td>';

        var html = document.getElementById("tblDatosSalario").innerHTML + row;
        document.getElementById("tblDatosSalario").innerHTML = html;

        datosSalarioBM.limpiarCampos();
    },

    calcularSalarioBruto: function (horasSemanales, precioPorHora) {
        const horasOrdinarias = Math.min(horasSemanales, 40);
        const horasExtra = Math.max(horasSemanales - 40, 0);
        const salarioOrdinario = horasOrdinarias * precioPorHora;
        const salarioExtra = horasExtra * precioPorHora * 1.5;
        return salarioOrdinario + salarioExtra;
    },

    validar: function () {

        var form = document.getElementById('formDatosSalarioBM');

        if (form.checkValidity()) {
            datosSalarioBM.guardar();
        }
        form.classList.add('was-validated')
    },

    cargarEventos: function () {
        datosSalarioBM.btnDSCalcular.onclick = datosSalarioBM.validar;
        datosSalarioBM.btnDSCancelar.onclick = datosSalarioBM.limpiarCampos;
    },

    inicializar: function () {
        datosSalarioBM.cargarEventos();
    },
}