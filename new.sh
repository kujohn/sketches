#!/bin/bash
NAME=$1
DIR=template-p5svg

if [ -z "${NAME}" ]; then
	NAME=$(superheroes | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
fi

rsync -r ./$DIR/ $NAME
echo "New Project is ${NAME}"
