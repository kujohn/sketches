#!/bin/bash
DIR=$1

if [ -z "${DIR}" ]; then
	DIR=template-p5svg
	echo "Creating from template-p5svg"
fi

NAME=$(superheroes | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
rsync -r ./$DIR/ $NAME
echo "New Project is ${NAME}"
