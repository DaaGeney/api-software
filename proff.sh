#!/bin/sh
clear

function mainAction() {
    SALIR_MAIN=0
    OPCION_MAIN=0
    while [ $SALIR_MAIN -eq 0 ]; do
        echo "Menu: "
        echo "1. COMANDOS GENERALES"
        echo "2. USUARIOS"
        echo "3. SISTEMA DE ARCHIVOS"
        echo "9. TERMINAR"
        echo "Opcion seleccionada: "
        read OPCION_MAIN

        case $OPCION_MAIN in
        1)
            echo "COMANDOS GENERALES"
            userActions
            ;;
        2)
            echo "USUARIOS"
            userCheck
            ;;
        3)
            echo "SISTEMA DE ARCHIVOS"
            filesActions
            ;;
        9)
            SALIR_MAIN=1
            ;;
        *)
            echo "Opcion incorrecta"
            ;;
        esac
    done
}

function userActions() {
    SALIR=0
    OPCION=0
    while [ $SALIR -eq 0 ]; do
        echo "Menu:"
        echo "1. VISUALIZAR HORA DEL SISTEMA"
        echo "2. PATH O RUTA ACTUAL"
        echo "3. CAMBIO DE PASSWORD"
        echo "4. MOSTRAR DISCO LIBRE"
        echo "5. MOSTRAR DISCO UTILIZADO"
        echo "6. VISUALIZAR PROCESOS ACTIVOS"
        echo "9. REGRESAR"
        read OPCION
        echo "Opcion seleccionada: $OPCION"

        case $OPCION in
        1)
            echo "La hora del sistema es:"
            date
            ;;
        2)
            echo "La ruta actual es;"
            pwd
            ;;
        3)
            echo "Ha seleccionado cambio de password"
            passwd
            ;;

        4)
            echo "El disco libre es:"
            df
            ;;
        5)
            echo "El disco utilizado es:"
            du
            ;;
        6)
            echo "Los procesos activos son:"
            ps
            ;;
        9)
            SALIR=1
            ;;
        *)
            echo "Opcion incorrecta"
            ;;
        esac
    done
}

function filesActions() {
    SALIR_FILES=0
    OPCION_FILES=0
    while [ $SALIR_FILES -eq 0 ]; do
        echo "Menu: "
        echo "Selecciona una opcion del menu: "
        echo "1. CREAR DIRECTORIO"
        echo "2. COPIAR ARCHIVOS"
        echo "3. MODIFICAR PERMISOS A UN ARCHIVO"
        echo "4. VISUALIZAR EL CONTENIDO DE UN ARCHIVO"
        echo "5. BORRAR UN ARCHIVO"
        echo "6. CAMBIAR EL NOMBRE DE UN ARCHIVO"
        echo "7. BORRAR UN DIRECTORIO"
        echo "9. TERMINAR"
        read OPCION_FILES
        echo -e "Opcion seleccionada: $OPCION_FILES\n"

        case $OPCION_FILES in
        1)
            echo "CREAR DIRECTORIO"
            echo -e "INGRESE EL NOMBRE DEL DIRECTORIO \n"
            NOMBRE=""
            read NOMBRE

            if [ ! -d $NOMBRE ]; then
                mkdir $NOMBRE
                ls
            else
                echo -e "EL DIRECTORIO YA EXISTE \n"
            fi
            ;;
        2)
            echo "COPIAR ARCHIVOS"
            echo -e "SELECCIONE EL ARCHIVO QUE DESEA COPIAR \n"
            ls
            echo

            NOMBRE=""
            read NOMBRE

            if [ -f $NOMBRE ]; then
                NOMBRE_DESTINO=""
                echo -e "SELECCIONE EL ARCHIVO DE  DESTINO\n"
                read NOMBRE_DESTINO

                if [ -f $NOMBRE_DESTINO ]; then
                    cp $NOMBRE ./"$NOMBRE_DESTINO"
                    echo -e "ARCHIVO COPIADO EXITOSAMENTE \n"
                else
                    echo -e "EL ARCHIVO NO EXISTE \n"
                fi
            else
                echo -e "EL ARCHIVO NO EXISTE \n"
            fi
            ;;
        3)
            changePermissions
            ;;
        4)
            echo "VISUALIZAR EL CONTENIDO DE UN ARCHIVO"
            echo -e "INGRESE EL NOMBRE DEL ARCHIVO QUE DESEA VISUALIZAR \n"
            ls
            NOMBRE=""
            read NOMBRE

            if [ -f $NOMBRE ]; then
                cat $NOMBRE
            else
                echo -e "EL ARCHIVO NO EXISTE \n"
            fi
            ;;
        5)

            echo "BORRAR UN ARCHIVO"
            echo -e "SELECCIONE EL NOMBRE DE ARCHIVO QUE DESEA ELIMINAR \n"
            ls
            NOMBRE=""
            read NOMBRE

            if [ -f $NOMBRE ]; then
                rm $NOMBRE
                ls
                echo -e "ARCHIVO BORRADO EXITOSAMENTE\n"
            else
                echo -e "EL ARCHIVO NO EXISTE\n"
            fi
            ;;
        6)
            echo "CAMBIAR EL NOMBRE DE UN ARCHIVO"
            echo -e "SELECCIONE EL ARCHIVO QUE DESEA RENOMBRAR\n"
            ls
            NOMBRE=""
            read NOMBRE

            if [ -f $NOMBRE ]; then
                echo "ESCRIBA EL NUEVO NOMBRE DEL ARCHIVO"
                NUEVO_NOMBRE=""
                read NUEVO_NOMBRE

                mv $NOMBRE $NUEVO_NOMBRE
                ls
                echo -e "NOMBRE CAMBIADO EXITOSAMENTE\n"
            else
                echo -e "EL ARCHIVO NO EXISTE\n"
            fi
            ;;

        7)
            echo "BORRAR UN DIRECTORIO"
            echo -e "SELECCIONE EL DIRECCTORIO QUE DESEA BORRAR"
            ls
            NOMBRE=""
            read NOMBRE

            if [ -d $NOMBRE ]; then
                rm -r $NOMBRE
                ls
                echo -e "NOMBRE CAMBIADO EXITOSAMENTE\n"
            else
                echo -e "EL ARCHIVO NO EXISTE\n"
            fi
            ;;
        9)
            SALIR_FILES=1
            ;;
        *)
            echo -e "Opcion incorrecta \n"
            ;;
        esac
    done

    echo "\n"
}

function changePermissions() {
    echo "CAMBIAR PERSMISOS DE UN USUARIO"
    echo "SELECCIONE EL ARCHIVO EN EL CUAL DESEA CAMBIAR LOS PERMISOS"
    ls -l
    echo
    ARCHIVO=""
    read ARCHIVO

    if [ ! -f $ARCHIVO ]; then
        echo "El archivo no existe"
        return
    fi

    echo "0 PARA DEJAR SIN PERMISO"
    echo "1 PARA PERMITIR EJECUTAR"
    echo "2 PARA PERMITIR ESCRIBIR"
    echo "3 PARA PERMITIR EJECUTAR Y ESCRIBIR"
    echo "4 PARA PERMITIR LEER"
    echo "5 PARA PERMITIR LEER Y EJECUTAR"
    echo "6 PARA PERMITIR LEER Y ESCRIBIR"
    echo "7 PARA PERMITIR TODAS LAS ACCIONES AL ARCHIVO"

    while :; do
        echo "Ingrese permiso para el usuario"
        read PERMISO_USUARIO

        [[ $PERMISO_USUARIO =~ ^[0-9]+$ ]] || {
            echo -e "INGRESA UN NUMERO VALIDO \n"
            continue
        }

        if ((PERMISO_USUARIO >= 0 && PERMISO_USUARIO <= 7)); then
            break
        else
            echo "Opcion no valida, ingrese permiso para el usuario"
        fi
    done

    while :; do
        echo "Ingrese permiso para el grupo"
        read PERMISO_GRUPO

        [[ $PERMISO_GRUPO =~ ^[0-9]+$ ]] || {
            echo -e "INGRESA UN NUMERO VALIDO \n"
            continue
        }

        if ((PERMISO_GRUPO >= 0 && PERMISO_GRUPO <= 7)); then
            break
        else
            echo "Opcion no valida, ingrese permiso para el grupo"
        fi
    done

    while :; do
        echo "Ingrese permiso para otros"
        read PERMISO_OTROS

        [[ $PERMISO_OTROS =~ ^[0-9]+$ ]] || {
            echo -e "INGRESA UN NUMERO VALIDO \n"
            continue
        }

        if ((PERMISO_OTROS >= 0 && PERMISO_OTROS <= 7)); then
            break
        else
            echo "Opcion no valida, ingrese permiso para otros"
        fi
    done

    chmod $PERMISO_USUARIO$PERMISO_GRUPO$PERMISO_OTROS $ARCHIVO

    ls -l
    echo
}

function userCheck() {
    SALIR_USER=0
    OPCION_USER=0
    while [ $SALIR_USER -eq 0 ]; do
        echo "Menu: "
        echo "1. MOSTRAR NOMBRE DE USUARIOS CONECTADOS"
        echo "2. MOSTRAR NUMERO DE USUARIOS CONECTADOS"
        echo "3. AVERIGUAR SI UN USUARIO ESTA CONECTADO"
        echo "4. ENVIAR MENSAJE A UN USUARIO"
        echo "9. REGRESAR"
        read OPCION_USER
        echo -e "Opcion seleccionada: $OPCION_USER\n"

        case $OPCION_USER in
        1)
            echo "MOSTRAR NOMBRE DE USUARIOS CONECTADOS"
            who -u
            ;;
        2)
            echo "MOSTRAR NUMERO DE USUARIOS CONECTADOS"
            echo "El numero de usuario conectados es:"
            who | wc -l
            echo
            ;;
        3)
            echo "AVERIGUAR SI UN USUARIO ESTA CONECTADO"
            echo "Ingrese el nombre del usuario"
            who -u
            echo
            read NOMBRE

            USUARIO=$(who | grep $NOMBRE)
            if [ ! -z "$USUARIO" ]; then
                echo -e "El usuario $NOMBRE esta conectado"
            else
                echo -e "El usuario $NOMBRE no esta conectado"
            fi
            ;;
        4)
            echo "ENVIAR MENSAJE A UN USUARIO"
            echo "Ingrese el nombre del usuario"
            who -u
            echo
            read NOMBRE

            write $NOMBRE
            echo "MENSAJE ENVIADO EXITOSAMENTE"
            ;;
        9)
            SALIR_USER=1
            ;;
        *)
            echo "Opcion incorrecta"
            ;;
        esac
    done
}

mainAction
