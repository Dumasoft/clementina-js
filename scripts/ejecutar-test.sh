#!/bin/bash

usage() {
	echo
	echo 'Uso: ejecutar-test.sh'
	echo
	echo '  -t Ejecutar tests de typescript'
	echo '  -h Ver la ayuda'
}

test_typescript() {
    clear
	npm run test
}

final_message() {
	if [ $? -eq 0 ]; then
	    tput setaf 2; echo '-------------------------------------------'
	    tput setaf 2; echo '|  Todos los tests han pasado con éxito.  |'
	    tput setaf 2; echo '-------------------------------------------'
	else
	    tput setaf 1; echo '-------------------------------------------'
	    tput setaf 1; echo '|      Todos o algún test ha fallado.      |'
	    tput setaf 1; echo '-------------------------------------------'
	fi
}

change_amd_common() {
	sed -i -e 's/"module": "amd"/"module": "commonjs"/g' tsconfig.json
}

change_common_amd() {
	sed -i -e 's/"module": "commonjs"/"module": "amd"/g' tsconfig.json
	# tsc
}

case $1 in
	-h)
		usage
		;;
	-a)
		change_amd_common
		test_typescript
		test_python
		change_common_amd
		# final_message
		;;
	-t)
		change_amd_common
		test_typescript
		change_common_amd
		# final_message
		;;
    *)
        echo 'ejecuta el script con -h para obtener ayuda'
        ;;
esac










