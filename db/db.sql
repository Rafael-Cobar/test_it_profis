CREATE DATABASE transporte;
USE transporte;

CREATE TABLE tipos_carga(
	id INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    CONSTRAINT pk_tipos_carga PRIMARY KEY (id)
);

CREATE TABLE marcas(
	id INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    CONSTRAINT pk_marcas PRIMARY KEY (id)
);

CREATE TABLE vehiculos(
	id INT AUTO_INCREMENT NOT NULL,
    placa VARCHAR(15) NOT NULL,
    modelo VARCHAR(20) NOT NULL,
    capacidad FLOAT NOT NULL,
    consumo FLOAT NOT NULL,
    depreciacion FLOAT NOT NULL,
    posicion_actual VARCHAR(200) NULL,
    url_imagen VARCHAR(250) NULL,
    eliminado BOOLEAN NOT NULL,
	id_marca INT NOT NULL,
    CONSTRAINT uk_vehiculos_placa UNIQUE KEY (placa),
    CONSTRAINT fk_vehiculos_id_marca FOREIGN KEY (id_marca) REFERENCES marcas(id),
    CONSTRAINT pk_vehiculos PRIMARY KEY (id)	
);

CREATE TABLE cargas_transportar(
    id_vehiculo INT NOT NULL,
	id_tipo_carga INT NOT NULL,
    CONSTRAINT fk_cargas_transportar_id_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id),
    CONSTRAINT fk_cargas_transportar_id_tipocarga FOREIGN KEY (id_tipo_carga) REFERENCES tipos_carga(id),
    CONSTRAINT pk_cargas_transportar PRIMARY KEY (id_vehiculo, id_tipo_carga)
);

-- insertar tipos de carga
INSERT INTO tipos_carga(nombre) VALUES ("refrigerado");
INSERT INTO tipos_carga(nombre) VALUES ("mudanza");
INSERT INTO tipos_carga(nombre) VALUES ("entrega de paquetes");
INSERT INTO tipos_carga(nombre) VALUES ("carga frágil");

-- Insertar marcas
INSERT INTO marcas(nombre) VALUES ("ford");
INSERT INTO marcas(nombre) VALUES ("mercedes benz");
INSERT INTO marcas(nombre) VALUES ("volvo");
INSERT INTO marcas(nombre) VALUES ("isuzu");
INSERT INTO marcas(nombre) VALUES ("nissan");



--  insertar nuevo vehiculo
INSERT INTO vehiculos(placa, modelo, capacidad, consumo, depreciacion, id_marca, eliminado) 
VALUES ("placa", "modelo", capacidad, consumo, depreciacion, id_marca, FALSE);


-- Procedimiento para obtener todos los vehiculos

DROP PROCEDURE getAllVehiculos;
DELIMITER $$
CREATE PROCEDURE getAllVehiculos()
BEGIN
	SELECT v.id, v.placa, v.modelo, v.capacidad, v.consumo, v.depreciacion, m.nombre "marca"
	FROM vehiculos v
	INNER JOIN marcas m ON m.id = v.id_marca
	WHERE eliminado = FALSE
    ORDER BY m.nombre;
END$$


-- Llamar a procedimiento
CALL getAllVehiculos();

-- Obtener un vehiculo en especifico
SELECT v.id, v.placa, v.modelo, v.capacidad, v.consumo, v.depreciacion, m.nombre "marca"
FROM vehiculos v
INNER JOIN marcas m ON m.id = v.id_marca
WHERE v.id = 1;

-- actualizar vehiculo
UPDATE vehiculo
INSERT INTO vehiculos(placa, modelo, capacidad, consumo, depreciacion, id_marca, eliminado) 
VALUES ("placa", "modelo", capacidad, consumo, depreciacion, id_marca, FALSE);
WHERE placa = "";










